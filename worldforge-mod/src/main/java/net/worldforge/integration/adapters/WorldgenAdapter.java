package net.worldforge.integration.adapters;

import net.minecraftforge.fml.ModList;
import net.worldforge.api.integration.AdapterState;
import net.worldforge.api.integration.IntegrationDomain;
import net.worldforge.core.logging.LogCategory;
import net.worldforge.core.logging.WorldForgeLog;
import net.worldforge.integration.NoOpAdapter;

import java.util.Set;

/**
 * Worldgen adapter. Vanilla biomes and structures are official registries, so
 * this adapter binds that surface. Terralith, Biomes O' Plenty, and Alex's
 * Caves stay detected-only. Binding does not claim their generation logic.
 */
public final class WorldgenAdapter extends NoOpAdapter {
    public WorldgenAdapter(boolean enabled) {
        super(
                "worldforge:worldgen",
                IntegrationDomain.WORLDGEN,
                Set.of("minecraft", "terralith", "biomesoplenty", "alexscaves"),
                enabled
        );
    }

    @Override
    public boolean tryBind() {
        if (!enabled()) {
            setState(AdapterState.SKIPPED_DISABLED);
            WorldForgeLog.debug(LogCategory.INTEGRATION, "%s disabled by config", id());
            return false;
        }
        markBound("minecraft");
        StringBuilder extra = new StringBuilder();
        for (String target : targetModIds()) {
            if ("minecraft".equals(target)) {
                continue;
            }
            if (ModList.get().isLoaded(target)) {
                extra.append(' ').append(target);
            }
        }
        WorldForgeLog.info(LogCategory.INTEGRATION,
                "%s bound vanilla biome and structure registries%s",
                id(),
                extra.isEmpty() ? "" : "; detected extra (unbound):" + extra);
        return true;
    }
}
