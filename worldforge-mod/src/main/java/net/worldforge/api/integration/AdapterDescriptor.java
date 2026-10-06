package net.worldforge.api.integration;

import java.util.List;
import java.util.Objects;

/**
 * Data-driven adapter descriptor. Loaded from
 * {@code data/worldforge/adapters/*.json}. Presence of a target id is not a binding.
 */
public final class AdapterDescriptor {
    private final String id;
    private final IntegrationDomain domain;
    private final List<String> targets;
    private final String bindPolicy;
    private final String notes;

    public AdapterDescriptor(
            String id,
            IntegrationDomain domain,
            List<String> targets,
            String bindPolicy,
            String notes
    ) {
        this.id = Objects.requireNonNull(id);
        this.domain = Objects.requireNonNull(domain);
        this.targets = List.copyOf(targets);
        this.bindPolicy = bindPolicy == null ? "documented-api-only" : bindPolicy;
        this.notes = notes == null ? "" : notes;
    }

    public String id() {
        return id;
    }

    public IntegrationDomain domain() {
        return domain;
    }

    public List<String> targets() {
        return targets;
    }

    public String bindPolicy() {
        return bindPolicy;
    }

    public String notes() {
        return notes;
    }
}
