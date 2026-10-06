package net.worldforge.api.integration;

import java.util.Set;

/**
 * Optional integration with a third-party mod.
 * Adapters must fail closed: if the target is absent or unsafe, they stay unbound.
 */
public interface Adapter {
    String id();

    IntegrationDomain domain();

    /**
     * Mod IDs this adapter knows how to talk to through a public API.
     * Never use this as a hard Forge dependency.
     */
    Set<String> targetModIds();

    boolean isBound();

    /**
     * The mod id actually bound, if any. Presence of a listed target is not a binding.
     */
    default String boundTarget() {
        return null;
    }

    /**
     * Attempt to bind. Must not throw out of WorldForge.
     * @return true if an official, supported surface was bound
     */
    boolean tryBind();

    void unbind();
}
