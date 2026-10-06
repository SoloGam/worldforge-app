package net.worldforge.api;

import net.worldforge.api.combat.CombatSnapshot;
import net.worldforge.api.combat.DamageTypeInfo;
import net.worldforge.api.discovery.DiscoveredMod;
import net.worldforge.api.event.WorldForgeEventBus;
import net.worldforge.api.integration.Adapter;
import net.worldforge.api.integration.AdapterDescriptor;
import net.worldforge.api.integration.IntegrationDomain;
import net.worldforge.api.integration.LoaderNote;
import net.worldforge.api.knowledge.ModKnowledge;
import net.worldforge.api.knowledge.PlayerRecord;
import net.worldforge.api.magic.MagicSystemDescriptor;
import net.worldforge.api.world.DimensionSnapshot;
import net.worldforge.api.world.PointOfInterest;
import net.worldforge.api.world.Region;
import net.worldforge.api.world.WorldEvent;
import net.worldforge.knowledge.KnowledgeLayer;

import java.util.Collection;
import java.util.Optional;

/**
 * Stable surface for other mods. Implementation details stay in core packages.
 */
public interface WorldForgeAPI {
    Collection<DiscoveredMod> discoveredMods();

    Optional<DiscoveredMod> mod(String modId);

    Optional<ModKnowledge> knowledge(String modId);

    KnowledgeLayer knowledgeLayer();

    Optional<Adapter> adapter(IntegrationDomain domain);

    boolean isIntegrationBound(String modId);

    Optional<DimensionSnapshot> dimensionSnapshot();

    Collection<Region> regions();

    Optional<Region> region(String id);

    Collection<PointOfInterest> pointsOfInterest();

    Collection<WorldEvent> recentWorldEvents();

    Collection<PlayerRecord> players();

    Optional<PlayerRecord> player(String uuid);

    boolean registerRegion(Region region);

    boolean registerPointOfInterest(PointOfInterest poi);

    WorldEvent postWorldEvent(String type, String payload);

    Collection<MagicSystemDescriptor> magicSystems();

    Collection<DamageTypeInfo> damageTypes();

    CombatSnapshot combatSnapshot();

    WorldForgeEventBus eventBus();

    Collection<AdapterDescriptor> adapterDescriptors();

    Collection<LoaderNote> loaderNotes();
}
