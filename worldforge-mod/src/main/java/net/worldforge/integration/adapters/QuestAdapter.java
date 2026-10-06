package net.worldforge.integration.adapters;

import net.worldforge.api.integration.IntegrationDomain;
import net.worldforge.integration.NoOpAdapter;

import java.util.Set;

public final class QuestAdapter extends NoOpAdapter {
    public QuestAdapter(boolean enabled) {
        super("worldforge:quest", IntegrationDomain.QUEST, Set.of("ftbquests", "heracles"), enabled);
    }
}
