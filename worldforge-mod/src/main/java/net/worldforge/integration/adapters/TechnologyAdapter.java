package net.worldforge.integration.adapters;

import net.worldforge.api.integration.IntegrationDomain;
import net.worldforge.integration.NoOpAdapter;

import java.util.Set;

public final class TechnologyAdapter extends NoOpAdapter {
    public TechnologyAdapter(boolean enabled) {
        super("worldforge:technology", IntegrationDomain.TECHNOLOGY, Set.of("create", "immersiveengineering", "mekanism"), enabled);
    }
}
