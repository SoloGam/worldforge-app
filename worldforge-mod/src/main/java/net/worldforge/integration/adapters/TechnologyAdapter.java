package net.worldforge.integration.adapters;

import net.minecraftforge.fml.ModList;
import net.worldforge.api.integration.AdapterState;
import net.worldforge.api.integration.IntegrationDomain;
import net.worldforge.core.logging.LogCategory;
import net.worldforge.core.logging.WorldForgeLog;
import net.worldforge.integration.NoOpAdapter;

import java.util.Set;

/**
 * Technology adapter. Vanilla recipe serializers are an official Forge registry,
 * already counted by the census, so this adapter binds that surface.
 * Create, Immersive Engineering, and Mekanism stay detected-only.
 * A serializer count is not a machine graph.
 */
public final class TechnologyAdapter extends NoOpAdapter {
    public TechnologyAdapter(boolean enabled) {
        super(
                "worldforge:technology",
                IntegrationDomain.TECHNOLOGY,
                Set.of("minecraft", "create", "immersiveengineering", "mekanism"),
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
                "%s bound vanilla recipe serializers%s",
                id(),
                extra.isEmpty() ? "" : "; detected extra (unbound):" + extra);
        return true;
    }
}
