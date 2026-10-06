package net.worldforge.integration;

import net.worldforge.api.integration.Adapter;
import net.worldforge.api.integration.AdapterDescriptor;
import net.worldforge.api.integration.AdapterState;
import net.worldforge.api.integration.IntegrationDomain;
import net.worldforge.combat.CombatCatalog;
import net.worldforge.core.config.WorldForgeConfig;
import net.worldforge.core.logging.LogCategory;
import net.worldforge.core.logging.WorldForgeLog;
import net.worldforge.integration.adapters.CombatSystemAdapter;
import net.worldforge.integration.adapters.MagicSystemAdapter;
import net.worldforge.integration.adapters.QuestAdapter;
import net.worldforge.integration.adapters.TechnologyAdapter;
import net.worldforge.integration.adapters.WorldgenAdapter;
import net.worldforge.magic.MagicCatalog;

import java.util.ArrayList;
import java.util.Collection;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * Owns optional adapters. A missing target never fails WorldForge load.
 */
public final class IntegrationManager {
    private final List<Adapter> adapters = new ArrayList<>();
    private final Map<IntegrationDomain, Adapter> byDomain = new EnumMap<>(IntegrationDomain.class);
    private final MagicCatalog magicCatalog;
    private final CombatCatalog combatCatalog;
    private final DescriptorCatalog descriptors = new DescriptorCatalog();

    public IntegrationManager(MagicCatalog magicCatalog, CombatCatalog combatCatalog) {
        this.magicCatalog = magicCatalog;
        this.combatCatalog = combatCatalog;
    }

    public void registerDefaults() {
        adapters.clear();
        byDomain.clear();
        descriptors.load();
        register(new MagicSystemAdapter(WorldForgeConfig.magicEnabled(), magicCatalog));
        register(new CombatSystemAdapter(WorldForgeConfig.combatEnabled(), combatCatalog));
        register(new TechnologyAdapter(WorldForgeConfig.technologyEnabled()));
        register(new QuestAdapter(WorldForgeConfig.questEnabled()));
        register(new WorldgenAdapter(WorldForgeConfig.worldgenEnabled()));
    }

    public void register(Adapter adapter) {
        adapters.add(adapter);
        byDomain.put(adapter.domain(), adapter);
    }

    public void bindAll() {
        int bound = 0;
        for (Adapter adapter : adapters) {
            try {
                if (adapter.tryBind()) {
                    bound++;
                }
            } catch (RuntimeException ex) {
                WorldForgeLog.error(LogCategory.INTEGRATION, "Adapter " + adapter.id() + " failed; continuing", ex);
                adapter.unbind();
            }
        }
        WorldForgeLog.info(LogCategory.INTEGRATION, "Adapters bound: %d / %d", bound, adapters.size());
    }

    public List<Adapter> adapters() {
        return List.copyOf(adapters);
    }

    public Optional<Adapter> byDomain(IntegrationDomain domain) {
        return Optional.ofNullable(byDomain.get(domain));
    }

    public AdapterState stateOf(Adapter adapter) {
        if (adapter instanceof NoOpAdapter noOp) {
            return noOp.state();
        }
        return adapter.isBound() ? AdapterState.BOUND : AdapterState.UNBOUND;
    }

    public MagicCatalog magic() {
        return magicCatalog;
    }

    public CombatCatalog combat() {
        return combatCatalog;
    }

    public Collection<AdapterDescriptor> descriptors() {
        return descriptors.all();
    }
}
