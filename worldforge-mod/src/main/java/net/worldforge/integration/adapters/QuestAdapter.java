package net.worldforge.integration.adapters;

import net.minecraftforge.fml.ModList;
import net.worldforge.api.integration.AdapterState;
import net.worldforge.api.integration.IntegrationDomain;
import net.worldforge.core.logging.LogCategory;
import net.worldforge.core.logging.WorldForgeLog;
import net.worldforge.integration.NoOpAdapter;

import java.util.Set;

/**
 * Quest adapter. Vanilla advancements are an official registry, so this
 * adapter binds that surface. FTB Quests and Heracles stay detected-only.
 * An advancement count is not a quest graph.
 */
public final class QuestAdapter extends NoOpAdapter {
    public QuestAdapter(boolean enabled) {
        super("worldforge:quest", IntegrationDomain.QUEST, Set.of("minecraft", "ftbquests", "heracles"), enabled);
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
                "%s bound vanilla advancement registry%s",
                id(),
                extra.isEmpty() ? "" : "; detected extra (unbound):" + extra);
        return true;
    }
}
