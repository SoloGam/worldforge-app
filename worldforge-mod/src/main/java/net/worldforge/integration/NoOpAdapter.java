package net.worldforge.integration;

import net.minecraftforge.fml.ModList;
import net.worldforge.api.integration.Adapter;
import net.worldforge.api.integration.AdapterState;
import net.worldforge.api.integration.IntegrationDomain;
import net.worldforge.core.logging.LogCategory;
import net.worldforge.core.logging.WorldForgeLog;

import java.util.Set;

/**
 * Adapter that records a target as present/absent without calling into it.
 * Used when WorldForge recognises a domain but has no official API binding yet.
 */
public class NoOpAdapter implements Adapter {
    private final String id;
    private final IntegrationDomain domain;
    private final Set<String> targets;
    private final boolean enabled;
    private AdapterState state = AdapterState.UNBOUND;
    private String boundTarget;

    public NoOpAdapter(String id, IntegrationDomain domain, Set<String> targets, boolean enabled) {
        this.id = id;
        this.domain = domain;
        this.targets = Set.copyOf(targets);
        this.enabled = enabled;
    }

    @Override
    public String id() {
        return id;
    }

    @Override
    public IntegrationDomain domain() {
        return domain;
    }

    @Override
    public Set<String> targetModIds() {
        return targets;
    }

    @Override
    public boolean isBound() {
        return state == AdapterState.BOUND;
    }

    @Override
    public String boundTarget() {
        return boundTarget;
    }

    public AdapterState state() {
        return state;
    }

    @Override
    public boolean tryBind() {
        if (!enabled) {
            state = AdapterState.SKIPPED_DISABLED;
            WorldForgeLog.debug(LogCategory.INTEGRATION, "%s disabled by config", id);
            return false;
        }
        String present = firstLoadedTarget();
        if (present == null) {
            state = AdapterState.SKIPPED_MISSING_TARGET;
            WorldForgeLog.debug(LogCategory.INTEGRATION, "%s: no target loaded among %s", id, targets);
            return false;
        }
        // Honest: presence is not an API. Subclasses that actually bind should override.
        state = AdapterState.SKIPPED_NO_API;
        WorldForgeLog.info(LogCategory.INTEGRATION,
                "%s found %s but has no official API binding yet — leaving PARTIALLY_KNOWN", id, present);
        return false;
    }

    @Override
    public void unbind() {
        state = AdapterState.UNBOUND;
        boundTarget = null;
    }

    protected boolean enabled() {
        return enabled;
    }

    protected void setState(AdapterState state) {
        this.state = state;
    }

    protected String firstLoadedTarget() {
        for (String target : targets) {
            if (ModList.get().isLoaded(target)) {
                return target;
            }
        }
        return null;
    }

    protected void markBound(String target) {
        this.state = AdapterState.BOUND;
        this.boundTarget = target;
    }
}
