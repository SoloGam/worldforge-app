package net.worldforge.api.discovery;

/**
 * Counts of registry entries namespaced to a single mod.
 * Datapack registries are filled later, when a server is available.
 */
public final class RegistryCensus {
    private final int blocks;
    private final int items;
    private final int entities;
    private final int effects;
    private final int recipeSerializers;
    private final int biomes;
    private final int enchantments;
    private final int structures;

    public RegistryCensus(
            int blocks,
            int items,
            int entities,
            int effects,
            int recipeSerializers,
            int biomes,
            int enchantments,
            int structures
    ) {
        this.blocks = blocks;
        this.items = items;
        this.entities = entities;
        this.effects = effects;
        this.recipeSerializers = recipeSerializers;
        this.biomes = biomes;
        this.enchantments = enchantments;
        this.structures = structures;
    }

    public static RegistryCensus empty() {
        return new RegistryCensus(0, 0, 0, 0, 0, 0, 0, 0);
    }

    public RegistryCensus withDatapack(int biomes, int enchantments, int structures) {
        return new RegistryCensus(blocks, items, entities, effects, recipeSerializers, biomes, enchantments, structures);
    }

    public int blocks() { return blocks; }
    public int items() { return items; }
    public int entities() { return entities; }
    public int effects() { return effects; }
    public int recipeSerializers() { return recipeSerializers; }
    public int biomes() { return biomes; }
    public int enchantments() { return enchantments; }
    public int structures() { return structures; }

    public int totalKnown() {
        return blocks + items + entities + effects + recipeSerializers + biomes + enchantments + structures;
    }
}
