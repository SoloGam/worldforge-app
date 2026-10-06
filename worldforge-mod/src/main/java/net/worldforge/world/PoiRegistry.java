package net.worldforge.world;

import net.minecraft.nbt.CompoundTag;
import net.minecraft.nbt.ListTag;
import net.minecraft.nbt.Tag;
import net.worldforge.api.world.PointOfInterest;

import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public final class PoiRegistry {
    private final Map<String, PointOfInterest> points = new LinkedHashMap<>();

    public boolean register(PointOfInterest poi) {
        if (poi == null || poi.id().isBlank()) {
            return false;
        }
        points.put(poi.id(), poi);
        return true;
    }

    public Optional<PointOfInterest> get(String id) {
        return Optional.ofNullable(points.get(id));
    }

    public Collection<PointOfInterest> all() {
        return List.copyOf(points.values());
    }

    public List<PointOfInterest> inRegion(String regionId) {
        return points.values().stream().filter(p -> p.regionId().equals(regionId)).toList();
    }

    public void clear() {
        points.clear();
    }

    public ListTag save() {
        ListTag list = new ListTag();
        for (PointOfInterest poi : points.values()) {
            CompoundTag tag = new CompoundTag();
            tag.putString("Id", poi.id());
            tag.putString("RegionId", poi.regionId());
            tag.putString("Kind", poi.kind());
            tag.putString("Label", poi.label());
            tag.putString("Dimension", poi.dimension());
            tag.putInt("X", poi.x());
            tag.putInt("Y", poi.y());
            tag.putInt("Z", poi.z());
            list.add(tag);
        }
        return list;
    }

    public void load(ListTag list) {
        points.clear();
        if (list == null) {
            return;
        }
        for (int i = 0; i < list.size(); i++) {
            CompoundTag tag = list.getCompound(i);
            register(new PointOfInterest(
                    tag.getString("Id"),
                    tag.getString("RegionId"),
                    tag.getString("Kind"),
                    tag.getString("Label"),
                    tag.getString("Dimension"),
                    tag.getInt("X"),
                    tag.getInt("Y"),
                    tag.getInt("Z")
            ));
        }
    }

    public static final int LIST_TYPE = Tag.TAG_COMPOUND;
}
