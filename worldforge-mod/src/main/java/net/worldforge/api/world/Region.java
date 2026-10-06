package net.worldforge.api.world;

import java.util.Objects;

/**
 * Authored area. WorldForge never invents regions by scanning chunks.
 */
public final class Region {
    private final String id;
    private final String name;
    private final String dimension;
    private final int x;
    private final int z;
    private final int radius;
    private final String biomeHint;

    public Region(String id, String name, String dimension, int x, int z, int radius, String biomeHint) {
        this.id = Objects.requireNonNull(id);
        this.name = name == null || name.isBlank() ? id : name;
        this.dimension = dimension == null || dimension.isBlank() ? "minecraft:overworld" : dimension;
        this.x = x;
        this.z = z;
        this.radius = Math.max(1, radius);
        this.biomeHint = biomeHint == null ? "" : biomeHint;
    }

    public String id() { return id; }
    public String name() { return name; }
    public String dimension() { return dimension; }
    public int x() { return x; }
    public int z() { return z; }
    public int radius() { return radius; }
    public String biomeHint() { return biomeHint; }

    public boolean contains(String dim, int px, int pz) {
        if (!this.dimension.equals(dim)) {
            return false;
        }
        long dx = (long) px - x;
        long dz = (long) pz - z;
        return dx * dx + dz * dz <= (long) radius * radius;
    }
}
