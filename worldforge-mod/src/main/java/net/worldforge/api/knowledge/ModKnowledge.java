package net.worldforge.api.knowledge;

import net.worldforge.api.discovery.DiscoveredMod;
import net.worldforge.api.discovery.RegistryCensus;
import net.worldforge.api.integration.IntegrationDomain;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

/**
 * Structured, versioned knowledge about one installed mod.
 * This is informational unless a bound adapter exists.
 */
public final class ModKnowledge {
    private final DiscoveredMod mod;
    private final KnowledgeStatus status;
    private final RegistryCensus census;
    private final List<String> detectedApis;
    private final List<IntegrationDomain> domains;
    private final String adapterId;
    private final String reason;

    public ModKnowledge(
            DiscoveredMod mod,
            KnowledgeStatus status,
            RegistryCensus census,
            List<String> detectedApis,
            List<IntegrationDomain> domains,
            String adapterId,
            String reason
    ) {
        this.mod = Objects.requireNonNull(mod);
        this.status = Objects.requireNonNull(status);
        this.census = census == null ? RegistryCensus.empty() : census;
        this.detectedApis = List.copyOf(detectedApis);
        this.domains = List.copyOf(domains);
        this.adapterId = adapterId;
        this.reason = reason == null ? "" : reason;
    }

    public DiscoveredMod mod() {
        return mod;
    }

    public KnowledgeStatus status() {
        return status;
    }

    public RegistryCensus census() {
        return census;
    }

    public List<String> detectedApis() {
        return detectedApis;
    }

    public List<IntegrationDomain> domains() {
        return domains;
    }

    public Optional<String> adapterId() {
        return Optional.ofNullable(adapterId);
    }

    public String reason() {
        return reason;
    }
}
