package net.worldforge.knowledge;

import net.worldforge.api.discovery.DiscoveredMod;
import net.worldforge.api.discovery.RegistryCensus;
import net.worldforge.api.integration.AdapterState;
import net.worldforge.api.integration.IntegrationDomain;
import net.worldforge.api.knowledge.KnowledgeStatus;
import net.worldforge.api.knowledge.ModKnowledge;
import net.worldforge.core.logging.LogCategory;
import net.worldforge.core.logging.WorldForgeLog;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Classifies discovered mods. Classification is deterministic and conservative.
 */
public final class KnowledgeLayer {
    private final Map<String, ModKnowledge> byId = new ConcurrentHashMap<>();

    public void put(ModKnowledge knowledge) {
        byId.put(knowledge.mod().modId(), knowledge);
    }

    public Optional<ModKnowledge> get(String modId) {
        return Optional.ofNullable(byId.get(modId));
    }

    public Collection<ModKnowledge> all() {
        return List.copyOf(byId.values());
    }

    public void clear() {
        byId.clear();
    }

    public long count(KnowledgeStatus status) {
        return byId.values().stream().filter(k -> k.status() == status).count();
    }

    public ModKnowledge classify(
            DiscoveredMod mod,
            RegistryCensus census,
            List<String> detectedApis,
            List<IntegrationDomain> domains,
            AdapterState adapterState,
            String adapterId
    ) {
        KnowledgeStatus status;
        String reason;

        boolean isPlatform = "minecraft".equals(mod.modId()) || "forge".equals(mod.modId()) || "worldforge".equals(mod.modId());
        boolean bound = adapterState == AdapterState.BOUND;
        boolean hasApi = !detectedApis.isEmpty();
        boolean hasContent = census.totalKnown() > 0;

        if (isPlatform || bound) {
            status = KnowledgeStatus.KNOWN;
            reason = isPlatform
                    ? "Platform surface: identity, registries, and lifecycle are fully inspectable."
                    : "A WorldForge adapter bound through a supported public API.";
        } else if (hasApi || hasContent) {
            status = KnowledgeStatus.PARTIALLY_KNOWN;
            reason = hasApi
                    ? "An API or integration point was detected, but no complete adapter is bound."
                    : "Registry content is visible; mechanics remain unadapted.";
        } else {
            status = KnowledgeStatus.UNKNOWN;
            reason = "Only loader metadata is available. WorldForge will not invent behaviour for this mod.";
        }

        ModKnowledge knowledge = new ModKnowledge(mod, status, census, detectedApis, domains, adapterId, reason);
        put(knowledge);
        WorldForgeLog.debug(LogCategory.DISCOVERY, "%s -> %s (%s)", mod.modId(), status, reason);
        return knowledge;
    }
}
