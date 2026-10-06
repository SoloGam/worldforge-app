package net.worldforge.integration.adapters;

import net.worldforge.api.integration.IntegrationDomain;
import net.worldforge.integration.NoOpAdapter;

import java.util.Set;

/**
 * Worldgen mods are often datapack-only. Registries can be counted; mechanics
 * stay UNKNOWN/PARTIAL unless an API exists.
 */
public final class WorldgenAdapter extends NoOpAdapter {
    public WorldgenAdapter(boolean enabled) {
        super("worldforge:worldgen", IntegrationDomain.WORLDGEN, Set.of("terralith", "biomesoplenty", "alexscaves"), enabled);
    }
}
