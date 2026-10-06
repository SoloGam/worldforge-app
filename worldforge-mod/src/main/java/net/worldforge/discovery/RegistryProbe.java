package net.worldforge.discovery;

import net.minecraft.core.Registry;
import net.minecraft.core.RegistryAccess;
import net.minecraft.core.registries.Registries;
import net.minecraft.resources.ResourceLocation;
import net.minecraftforge.registries.ForgeRegistries;
import net.minecraftforge.registries.IForgeRegistry;
import net.worldforge.api.discovery.RegistryCensus;
import net.worldforge.core.logging.LogCategory;
import net.worldforge.core.logging.WorldForgeLog;

/**
 * One-shot registry census. Results are cached by the discovery service;
 * this class never ticks and never scans the whole world.
 */
public final class RegistryProbe {
    public RegistryCensus probeForgeRegistries(String namespace) {
        return new RegistryCensus(
                count(ForgeRegistries.BLOCKS, namespace),
                count(ForgeRegistries.ITEMS, namespace),
                count(ForgeRegistries.ENTITY_TYPES, namespace),
                count(ForgeRegistries.MOB_EFFECTS, namespace),
                count(ForgeRegistries.RECIPE_SERIALIZERS, namespace),
                0,
                0,
                0
        );
    }

    public RegistryCensus enrichDatapack(RegistryCensus base, RegistryAccess access, String namespace) {
        int biomes = countDatapack(access, Registries.BIOME, namespace);
        int enchantments = countDatapack(access, Registries.ENCHANTMENT, namespace);
        int structures = countDatapack(access, Registries.STRUCTURE, namespace);
        WorldForgeLog.debug(LogCategory.DISCOVERY, "Datapack census %s biomes=%d enchantments=%d structures=%d",
                namespace, biomes, enchantments, structures);
        return base.withDatapack(biomes, enchantments, structures);
    }

    private static int count(IForgeRegistry<?> registry, String namespace) {
        if (registry == null) {
            return 0;
        }
        int n = 0;
        for (ResourceLocation id : registry.getKeys()) {
            if (namespace.equals(id.getNamespace())) {
                n++;
            }
        }
        return n;
    }

    private static <T> int countDatapack(RegistryAccess access, net.minecraft.resources.ResourceKey<Registry<T>> key, String namespace) {
        return access.registry(key).map(registry -> {
            int n = 0;
            for (ResourceLocation id : registry.keySet()) {
                if (namespace.equals(id.getNamespace())) {
                    n++;
                }
            }
            return n;
        }).orElse(0);
    }
}
