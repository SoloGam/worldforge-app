package net.worldforge.persistence;

import net.minecraft.core.HolderLookup;
import net.minecraft.nbt.CompoundTag;
import net.minecraft.nbt.ListTag;
import net.minecraft.nbt.Tag;
import net.minecraft.server.level.ServerLevel;
import net.minecraft.world.level.saveddata.SavedData;
import net.worldforge.core.logging.LogCategory;
import net.worldforge.core.logging.WorldForgeLog;

/**
 * World-scoped persistent knowledge. Survives restarts.
 * Modpack fingerprint is stored so a world opened under a different pack
 * does not inherit stale integration state.
 */
public final class WorldForgeSavedData extends SavedData {
    public static final String NAME = "worldforge";

    private int schema = DataSchemaVersion.CURRENT;
    private String modpackFingerprint = "";
    private CompoundTag worldKnowledge = new CompoundTag();
    private ListTag regions = new ListTag();
    private ListTag pois = new ListTag();
    private ListTag players = new ListTag();

    public static WorldForgeSavedData create() {
        return new WorldForgeSavedData();
    }

    public static WorldForgeSavedData load(CompoundTag tag, HolderLookup.Provider lookup) {
        WorldForgeSavedData data = new WorldForgeSavedData();
        data.schema = tag.getInt("Schema");
        data.modpackFingerprint = tag.getString("ModpackFingerprint");
        if (tag.contains("WorldKnowledge")) {
            data.worldKnowledge = tag.getCompound("WorldKnowledge");
        }
        if (tag.contains("Regions", Tag.TAG_LIST)) {
            data.regions = tag.getList("Regions", Tag.TAG_COMPOUND);
        }
        if (tag.contains("PointsOfInterest", Tag.TAG_LIST)) {
            data.pois = tag.getList("PointsOfInterest", Tag.TAG_COMPOUND);
        }
        if (tag.contains("Players", Tag.TAG_LIST)) {
            data.players = tag.getList("Players", Tag.TAG_COMPOUND);
        }
        if (data.schema != DataSchemaVersion.CURRENT) {
            WorldForgeLog.warn(LogCategory.WORLD, "Saved data schema %d != %d; keeping payload, marking dirty for rewrite",
                    data.schema, DataSchemaVersion.CURRENT);
            data.schema = DataSchemaVersion.CURRENT;
            data.setDirty();
        }
        return data;
    }

    public static WorldForgeSavedData get(ServerLevel level) {
        return level.getDataStorage().computeIfAbsent(
                new SavedData.Factory<>(WorldForgeSavedData::create, WorldForgeSavedData::load, null),
                NAME
        );
    }

    @Override
    public CompoundTag save(CompoundTag tag, HolderLookup.Provider lookup) {
        tag.putInt("Schema", schema);
        tag.putString("ModpackFingerprint", modpackFingerprint);
        tag.put("WorldKnowledge", worldKnowledge.copy());
        tag.put("Regions", regions.copy());
        tag.put("PointsOfInterest", pois.copy());
        tag.put("Players", players.copy());
        return tag;
    }

    public String modpackFingerprint() {
        return modpackFingerprint;
    }

    public void setModpackFingerprint(String fingerprint) {
        if (fingerprint == null) {
            fingerprint = "";
        }
        if (!fingerprint.equals(this.modpackFingerprint)) {
            this.modpackFingerprint = fingerprint;
            setDirty();
        }
    }

    public CompoundTag worldKnowledge() {
        return worldKnowledge;
    }

    public void setWorldKnowledge(CompoundTag tag) {
        this.worldKnowledge = tag == null ? new CompoundTag() : tag.copy();
        setDirty();
    }

    public ListTag regions() {
        return regions;
    }

    public void setRegions(ListTag list) {
        this.regions = list == null ? new ListTag() : list.copy();
        setDirty();
    }

    public ListTag pois() {
        return pois;
    }

    public void setPois(ListTag list) {
        this.pois = list == null ? new ListTag() : list.copy();
        setDirty();
    }

    public ListTag players() {
        return players;
    }

    public void setPlayers(ListTag list) {
        this.players = list == null ? new ListTag() : list.copy();
        setDirty();
    }

    /**
     * If the running pack does not match the world, drop integration state
     * and player records rather than applying incompatible adapters.
     * Authored regions stay — they are world geography, not pack-specific bindings.
     * Player records go because dimension ids are pack-specific.
     */
    public boolean reconcileFingerprint(String currentFingerprint) {
        if (modpackFingerprint.isEmpty()) {
            setModpackFingerprint(currentFingerprint);
            return true;
        }
        if (modpackFingerprint.equals(currentFingerprint)) {
            return true;
        }
        WorldForgeLog.warn(LogCategory.COMPATIBILITY,
                "Modpack fingerprint changed (%s -> %s). Clearing world integration state and player knowledge.",
                modpackFingerprint, currentFingerprint);
        worldKnowledge = new CompoundTag();
        players = new ListTag();
        setModpackFingerprint(currentFingerprint);
        return false;
    }
}
