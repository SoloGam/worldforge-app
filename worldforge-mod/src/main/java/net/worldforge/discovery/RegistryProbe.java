package net.worldforge.discovery;

import net.minecraft.core.Registry;
import net.minecraft.core.RegistryAccess;
import net.minecraft.core.registries.Registries;
import net.minecraft.resources.ResourceKey;
import net.minecraft.resources.ResourceLocation;
import net.minecraftforge.registries.ForgeRegistries;
import net.minecraftforge.registries.IForgeRegistry;
import net.worldforge.api.discovery.RegistryCensus;

import java.util.Collection;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * One-shot registry census. Each registry is walked once for every namespace.
 * Keys are counted and dropped. This class never ticks and never scans the world.
 */
public final class RegistryProbe {
    public Batch censusForge(Collection<String> namespaces) {
        Map<String, int[]> rows = rowsFor(namespaces, 5);
        Walk walk = new Walk();
        tallyForge(ForgeRegistries.BLOCKS, rows, 0, walk);
        tallyForge(ForgeRegistries.ITEMS, rows, 1, walk);
        tallyForge(ForgeRegistries.ENTITY_TYPES, rows, 2, walk);
        tallyForge(ForgeRegistries.MOB_EFFECTS, rows, 3, walk);
        tallyForge(ForgeRegistries.RECIPE_SERIALIZERS, rows, 4, walk);

        Map<String, RegistryCensus> censuses = new LinkedHashMap<>();
        for (String namespace : namespaces) {
            int[] row = rows.getOrDefault(namespace, new int[5]);
            censuses.put(namespace, new RegistryCensus(row[0], row[1], row[2], row[3], row[4], 0, 0, 0, 0));
        }
        return new Batch(censuses, new CensusPass(walk.passes, walk.keys, censuses.size()));
    }

    public Batch enrichDatapack(Map<String, RegistryCensus> base, RegistryAccess access, Collection<String> namespaces) {
        Map<String, int[]> rows = rowsFor(namespaces, 4);
        Walk walk = new Walk();
        tallyDatapack(access, Registries.BIOME, rows, 0, walk);
        tallyDatapack(access, Registries.ENCHANTMENT, rows, 1, walk);
        tallyDatapack(access, Registries.STRUCTURE, rows, 2, walk);
        tallyDatapack(access, Registries.ADVANCEMENT, rows, 3, walk);

        Map<String, RegistryCensus> censuses = new LinkedHashMap<>();
        for (String namespace : namespaces) {
            RegistryCensus previous = base.getOrDefault(namespace, RegistryCensus.empty());
            int[] row = rows.getOrDefault(namespace, new int[4]);
            censuses.put(namespace, previous.withDatapack(row[0], row[1], row[2], row[3]));
        }
        return new Batch(censuses, new CensusPass(walk.passes, walk.keys, censuses.size()));
    }

    private static void tallyForge(IForgeRegistry<?> registry, Map<String, int[]> rows, int slot, Walk walk) {
        if (registry == null) {
            return;
        }
        walk.passes++;
        for (ResourceLocation id : registry.getKeys()) {
            walk.keys++;
            if (id == null) {
                continue;
            }
            int[] row = rows.get(id.getNamespace());
            if (row != null) {
                row[slot]++;
            }
        }
    }

    private static <T> void tallyDatapack(
            RegistryAccess access,
            ResourceKey<Registry<T>> key,
            Map<String, int[]> rows,
            int slot,
            Walk walk
    ) {
        access.registry(key).ifPresent(registry -> {
            walk.passes++;
            for (ResourceLocation id : registry.keySet()) {
                walk.keys++;
                if (id == null) {
                    continue;
                }
                int[] row = rows.get(id.getNamespace());
                if (row != null) {
                    row[slot]++;
                }
            }
        });
    }

    private static Map<String, int[]> rowsFor(Collection<String> namespaces, int width) {
        Map<String, int[]> rows = new HashMap<>();
        if (namespaces == null) {
            return rows;
        }
        for (String namespace : namespaces) {
            if (namespace != null) {
                rows.putIfAbsent(namespace, new int[width]);
            }
        }
        return rows;
    }

    /** Counts produced by one walk, plus what that walk cost. */
    public static final class Batch {
        private final Map<String, RegistryCensus> censuses;
        private final CensusPass pass;

        Batch(Map<String, RegistryCensus> censuses, CensusPass pass) {
            this.censuses = censuses;
            this.pass = pass;
        }

        public Map<String, RegistryCensus> censuses() {
            return censuses;
        }

        public CensusPass pass() {
            return pass;
        }
    }

    private static final class Walk {
        private int passes;
        private long keys;
    }
}
