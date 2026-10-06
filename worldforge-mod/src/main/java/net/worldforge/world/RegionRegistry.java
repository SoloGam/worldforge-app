package net.worldforge.world;

import net.minecraft.nbt.CompoundTag;
import net.minecraft.nbt.ListTag;
import net.minecraft.nbt.Tag;
import net.worldforge.api.world.Region;

import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public final class RegionRegistry {
    private final Map<String, Region> regions = new LinkedHashMap<>();

    public boolean register(Region region) {
        if (region == null || region.id().isBlank()) {
            return false;
        }
        regions.put(region.id(), region);
        return true;
    }

    public Optional<Region> get(String id) {
        return Optional.ofNullable(regions.get(id));
    }

    public Collection<Region> all() {
        return List.copyOf(regions.values());
    }

    public Optional<Region> at(String dimension, int x, int z) {
        for (Region region : regions.values()) {
            if (region.contains(dimension, x, z)) {
                return Optional.of(region);
            }
        }
        return Optional.empty();
    }

    public void clear() {
        regions.clear();
    }

    public ListTag save() {
        ListTag list = new ListTag();
        for (Region region : regions.values()) {
            CompoundTag tag = new CompoundTag();
            tag.putString("Id", region.id());
            tag.putString("Name", region.name());
            tag.putString("Dimension", region.dimension());
            tag.putInt("X", region.x());
            tag.putInt("Z", region.z());
            tag.putInt("Radius", region.radius());
            tag.putString("BiomeHint", region.biomeHint());
            list.add(tag);
        }
        return list;
    }

    public void load(ListTag list) {
        regions.clear();
        if (list == null) {
            return;
        }
        for (int i = 0; i < list.size(); i++) {
            CompoundTag tag = list.getCompound(i);
            register(new Region(
                    tag.getString("Id"),
                    tag.getString("Name"),
                    tag.getString("Dimension"),
                    tag.getInt("X"),
                    tag.getInt("Z"),
                    Math.max(1, tag.getInt("Radius")),
                    tag.getString("BiomeHint")
            ));
        }
    }

    public static final int LIST_TYPE = Tag.TAG_COMPOUND;
}
