package net.worldforge.integration.adapters;

import net.minecraftforge.fml.ModList;
import net.worldforge.api.integration.AdapterState;
import net.worldforge.api.integration.IntegrationDomain;
import net.worldforge.combat.CombatCatalog;
import net.worldforge.core.logging.LogCategory;
import net.worldforge.core.logging.WorldForgeLog;
import net.worldforge.integration.NoOpAdapter;

import java.util.Set;

/**
 * Combat adapter. Vanilla damage types are an official Minecraft registry, so
 * this adapter binds the vanilla surface. Apotheosis / Better Combat stay
 * detected-only until their public APIs are used.
 */
public final class CombatSystemAdapter extends NoOpAdapter {
    private final CombatCatalog catalog;

    public CombatSystemAdapter(boolean enabled, CombatCatalog catalog) {
        super("worldforge:combat", IntegrationDomain.COMBAT, Set.of("minecraft", "apotheosis", "bettercombat"), enabled);
        this.catalog = catalog;
    }

    @Override
    public boolean tryBind() {
        if (!enabled()) {
            setState(AdapterState.SKIPPED_DISABLED);
            WorldForgeLog.debug(LogCategory.INTEGRATION, "%s disabled by config", id());
            return false;
        }
        markBound("minecraft");
        catalog.markVanillaBound();
        StringBuilder extra = new StringBuilder();
        for (String target : targetModIds()) {
            if ("minecraft".equals(target)) {
                continue;
            }
            if (ModList.get().isLoaded(target)) {
                catalog.recordExtra(target);
                extra.append(' ').append(target);
            }
        }
        WorldForgeLog.info(LogCategory.INTEGRATION,
                "%s bound vanilla damage-type registry%s",
                id(),
                extra.isEmpty() ? "" : "; detected extra (unbound):" + extra);
        return true;
    }
}
