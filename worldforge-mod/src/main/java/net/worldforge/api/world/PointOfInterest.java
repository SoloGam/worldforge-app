package net.worldforge.api.world;

import java.util.Objects;

public final class PointOfInterest {
    private final String id;
    private final String regionId;
    private final String kind;
    private final String label;
    private final String dimension;
    private final int x;
    private final int y;
    private final int z;

    public PointOfInterest(
            String id,
            String regionId,
            String kind,
            String label,
            String dimension,
            int x,
            int y,
            int z
    ) {
        this.id = Objects.requireNonNull(id);
        this.regionId = regionId == null ? "" : regionId;
        this.kind = kind == null || kind.isBlank() ? "marker" : kind;
        this.label = label == null || label.isBlank() ? id : label;
        this.dimension = dimension == null || dimension.isBlank() ? "minecraft:overworld" : dimension;
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public String id() { return id; }
    public String regionId() { return regionId; }
    public String kind() { return kind; }
    public String label() { return label; }
    public String dimension() { return dimension; }
    public int x() { return x; }
    public int y() { return y; }
    public int z() { return z; }
}
