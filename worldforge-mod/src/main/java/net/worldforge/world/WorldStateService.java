package net.worldforge.world;

import net.minecraft.server.MinecraftServer;
import net.minecraft.server.level.ServerLevel;
import net.minecraft.world.level.Level;
import net.worldforge.api.knowledge.PlayerRecord;
import net.worldforge.api.world.DimensionSnapshot;
import net.worldforge.api.world.PointOfInterest;
import net.worldforge.api.world.Region;
import net.worldforge.api.world.WorldEvent;
import net.worldforge.core.logging.LogCategory;
import net.worldforge.core.logging.WorldForgeLog;
import net.worldforge.discovery.ModDiscoveryService;
import net.worldforge.persistence.DataSchemaVersion;
import net.worldforge.persistence.WorldForgeSavedData;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

/**
 * World façade: snapshot, authored regions, POIs, ephemeral world events.
 * No chunk scans. Persistence is SavedData keyed by modpack fingerprint.
 */
public final class WorldStateService {
    private final RegionRegistry regions = new RegionRegistry();
    private final PoiRegistry pois = new PoiRegistry();
    private final PlayerRegistry players = new PlayerRegistry();
    private final WorldEventBus events = new WorldEventBus();
    private ServerLevel overworld;
    private WorldForgeSavedData savedData;
    private DimensionSnapshot snapshot;

    public void attach(MinecraftServer server, ModDiscoveryService discovery) {
        this.overworld = server.getLevel(Level.OVERWORLD);
        if (overworld == null) {
            WorldForgeLog.warn(LogCategory.WORLD, "Overworld unavailable; persistent knowledge skipped");
            return;
        }
        this.savedData = WorldForgeSavedData.get(overworld);
        boolean compatible = savedData.reconcileFingerprint(discovery.fingerprint());
        regions.load(savedData.regions());
        pois.load(savedData.pois());
        players.load(savedData.players());
        if (regions.all().isEmpty()) {
            seedDefaults();
            persist();
        }
        refreshSnapshot();
        events.post("world.load", snapshot == null ? "overworld" : snapshot.dimension(), overworld.getDayTime());
        WorldForgeLog.info(LogCategory.WORLD,
                "World systems attached (compatible=%s, schema=%d, regions=%d, pois=%d, players=%d)",
                compatible, DataSchemaVersion.CURRENT, regions.all().size(), pois.all().size(), players.all().size());
    }

    public void detach() {
        persist();
        if (overworld != null) {
            events.post("world.save", "overworld", overworld.getDayTime());
        }
        overworld = null;
        savedData = null;
        snapshot = null;
        regions.clear();
        pois.clear();
        players.clear();
        events.clear();
    }

    public void refreshSnapshot() {
        if (overworld != null) {
            snapshot = DimensionProbe.capture(overworld);
        }
    }

    public boolean registerRegion(Region region) {
        boolean ok = regions.register(region);
        if (ok) {
            persist();
            long time = overworld == null ? 0L : overworld.getDayTime();
            events.post("region.register", region.id(), time);
        }
        return ok;
    }

    public boolean registerPoi(PointOfInterest poi) {
        boolean ok = pois.register(poi);
        if (ok) {
            persist();
            long time = overworld == null ? 0L : overworld.getDayTime();
            events.post("poi.register", poi.id(), time);
        }
        return ok;
    }

    public WorldEvent postEvent(String type, String payload) {
        long time = overworld == null ? 0L : overworld.getDayTime();
        return events.post(type, payload, time);
    }

    public void noteLogin(String uuid, String name, String dimension, long dayTime) {
        players.login(uuid, name, dimension, dayTime);
        persistPlayers();
        events.post("player.login", name == null ? uuid : name, dayTime);
    }

    public void noteLogout(String uuid, long dayTime) {
        players.logout(uuid, dayTime);
        persistPlayers();
        String name = players.get(uuid).map(PlayerRecord::name).orElse(uuid);
        events.post("player.logout", name, dayTime);
    }

    public void noteDimension(String uuid, String name, String dimension, long dayTime) {
        players.dimension(uuid, name, dimension, dayTime);
        persistPlayers();
        events.post("player.dimension", name == null ? uuid : name, dayTime);
    }

    public Optional<DimensionSnapshot> snapshot() {
        return Optional.ofNullable(snapshot);
    }

    public Collection<Region> regions() {
        return regions.all();
    }

    public Optional<Region> region(String id) {
        return regions.get(id);
    }

    public Optional<Region> regionAt(String dimension, int x, int z) {
        return regions.at(dimension, x, z);
    }

    public Collection<PointOfInterest> pointsOfInterest() {
        return pois.all();
    }

    public List<WorldEvent> recentEvents() {
        return events.recent();
    }

    public Collection<PlayerRecord> players() {
        return players.all();
    }

    public Optional<PlayerRecord> player(String uuid) {
        return players.get(uuid);
    }

    public ServerLevel overworld() {
        return overworld;
    }

    public WorldForgeSavedData savedData() {
        return savedData;
    }

    private void seedDefaults() {
        registerRegion(new Region("spawn", "Spawn plateau", "minecraft:overworld", 0, 0, 96, "minecraft:plains"));
        registerPoi(new PointOfInterest("spawn-stone", "spawn", "landmark", "World origin", "minecraft:overworld", 0, 64, 0));
        WorldForgeLog.info(LogCategory.WORLD, "Seeded default spawn region (authored, not scanned)");
    }

    private void persist() {
        if (savedData == null) {
            return;
        }
        savedData.setRegions(regions.save());
        savedData.setPois(pois.save());
        savedData.setPlayers(players.save());
    }

    private void persistPlayers() {
        if (savedData == null) {
            return;
        }
        savedData.setPlayers(players.save());
    }
}
