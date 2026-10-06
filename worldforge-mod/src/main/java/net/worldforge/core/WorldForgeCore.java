package net.worldforge.core;

import net.minecraft.server.MinecraftServer;
import net.worldforge.api.WorldForgeAPI;
import net.worldforge.api.combat.CombatSnapshot;
import net.worldforge.api.combat.DamageTypeInfo;
import net.worldforge.api.discovery.DiscoveredMod;
import net.worldforge.api.event.EngineEvent;
import net.worldforge.api.event.WorldForgeEventBus;
import net.worldforge.api.integration.Adapter;
import net.worldforge.api.integration.AdapterDescriptor;
import net.worldforge.api.integration.AdapterState;
import net.worldforge.api.integration.IntegrationDomain;
import net.worldforge.api.integration.LoaderNote;
import net.worldforge.api.knowledge.ModKnowledge;
import net.worldforge.api.knowledge.PlayerRecord;
import net.worldforge.api.magic.MagicSystemDescriptor;
import net.worldforge.api.world.DimensionSnapshot;
import net.worldforge.api.world.PointOfInterest;
import net.worldforge.api.world.Region;
import net.worldforge.api.world.WorldEvent;
import net.worldforge.combat.CombatCatalog;
import net.worldforge.core.config.WorldForgeConfig;
import net.worldforge.core.logging.LogCategory;
import net.worldforge.core.logging.WorldForgeLog;
import net.worldforge.core.services.ServiceRegistry;
import net.worldforge.discovery.ModDiscoveryService;
import net.worldforge.integration.IntegrationManager;
import net.worldforge.integration.LoaderCompatibilityCatalog;
import net.worldforge.knowledge.KnowledgeLayer;
import net.worldforge.magic.MagicCatalog;
import net.worldforge.world.WorldStateService;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

/**
 * Orchestrates discovery, knowledge, adapters, and world persistence.
 * Deliberately not a god-object: each concern is a dedicated service.
 */
public final class WorldForgeCore implements WorldForgeAPI {
    public static final String VERSION = "0.4.0";

    private final ServiceRegistry services = new ServiceRegistry();
    private final ModDiscoveryService discovery = new ModDiscoveryService();
    private final KnowledgeLayer knowledge = new KnowledgeLayer();
    private final MagicCatalog magic = new MagicCatalog();
    private final CombatCatalog combat = new CombatCatalog();
    private final IntegrationManager integrations = new IntegrationManager(magic, combat);
    private final WorldStateService world = new WorldStateService();
    private final WorldForgeEventBus bus = new WorldForgeEventBus();
    private boolean bootstrapped;

    public WorldForgeCore() {
        services.register(ModDiscoveryService.class, discovery);
        services.register(KnowledgeLayer.class, knowledge);
        services.register(MagicCatalog.class, magic);
        services.register(CombatCatalog.class, combat);
        services.register(IntegrationManager.class, integrations);
        services.register(WorldStateService.class, world);
        services.register(WorldForgeEventBus.class, bus);
        bus.subscribe((event, detail) -> WorldForgeLog.debug(LogCategory.CORE, "bus %s %s", event, detail));
    }

    public ServiceRegistry services() {
        return services;
    }

    public synchronized void bootstrap() {
        if (bootstrapped) {
            return;
        }
        WorldForgeLog.info(LogCategory.CORE, "WorldForge %s — player knowledge + loader mismatch catalog", VERSION);
        if (WorldForgeConfig.discoveryOnStartup()) {
            runDiscovery();
        }
        bootstrapped = true;
    }

    public synchronized void runDiscovery() {
        discovery.discoverLoaderMetadata();
        discovery.censusForgeRegistries();
        integrations.registerDefaults();
        integrations.bindAll();
        rebuildKnowledge();
        for (Adapter adapter : integrations.adapters()) {
            AdapterState state = integrations.stateOf(adapter);
            if (state == AdapterState.BOUND) {
                emit(EngineEvent.ADAPTER_BOUND, adapter.id() + " -> " + adapter.boundTarget());
            } else {
                emit(EngineEvent.ADAPTER_SKIPPED, adapter.id() + " " + state);
            }
        }
        emit(EngineEvent.DISCOVERY_COMPLETE, discovery.fingerprint());
    }

    public synchronized void onServerStarted(MinecraftServer server) {
        discovery.censusDatapackRegistries(server);
        if (WorldForgeConfig.combatEnabled()) {
            combat.attach(server.registryAccess());
        }
        rebuildKnowledge();
        world.attach(server, discovery);
        emit(EngineEvent.KNOWLEDGE_RECONCILED, discovery.fingerprint());
        emit(EngineEvent.WORLD_LOAD, world.snapshot().map(DimensionSnapshot::dimension).orElse("overworld"));
    }

    public synchronized void onServerStopping() {
        emit(EngineEvent.WORLD_SAVE, "overworld");
        world.detach();
        combat.clear();
    }

    public void emit(EngineEvent event, String detail) {
        WorldForgeLog.debug(LogCategory.CORE, "%s %s", event, detail == null ? "" : detail);
        bus.publish(event, detail);
    }

    private void rebuildKnowledge() {
        knowledge.clear();
        for (DiscoveredMod mod : discovery.mods()) {
            boolean platform = isPlatform(mod.modId());
            Adapter adapter = platform ? null : findAdapterFor(mod.modId());
            AdapterState raw = adapter == null ? AdapterState.UNBOUND : integrations.stateOf(adapter);
            boolean thisModBound = adapter != null
                    && raw == AdapterState.BOUND
                    && mod.modId().equals(adapter.boundTarget());
            AdapterState state = thisModBound
                    ? AdapterState.BOUND
                    : (raw == AdapterState.BOUND ? AdapterState.SKIPPED_NO_API : raw);
            String adapterId = thisModBound ? adapter.id() : null;
            List<IntegrationDomain> domains = adapter == null ? List.of() : List.of(adapter.domain());
            List<String> apis = detectApis(mod, adapter, state, thisModBound);
            knowledge.classify(mod, discovery.census(mod.modId()), apis, domains, state, adapterId);
        }
        WorldForgeLog.info(LogCategory.DISCOVERY, "Knowledge: %d known, %d partial, %d unknown",
                knowledge.count(net.worldforge.api.knowledge.KnowledgeStatus.KNOWN),
                knowledge.count(net.worldforge.api.knowledge.KnowledgeStatus.PARTIALLY_KNOWN),
                knowledge.count(net.worldforge.api.knowledge.KnowledgeStatus.UNKNOWN));
    }

    private static boolean isPlatform(String modId) {
        return "minecraft".equals(modId) || "forge".equals(modId) || "worldforge".equals(modId);
    }

    private Adapter findAdapterFor(String modId) {
        for (Adapter adapter : integrations.adapters()) {
            if (adapter.targetModIds().contains(modId)) {
                return adapter;
            }
        }
        return null;
    }

    private static List<String> detectApis(DiscoveredMod mod, Adapter adapter, AdapterState state, boolean thisModBound) {
        if (thisModBound) {
            return List.of(adapter.id());
        }
        if (adapter != null && state == AdapterState.SKIPPED_NO_API) {
            return List.of("detected-target:" + adapter.id());
        }
        if ("jei".equals(mod.modId()) || "curios".equals(mod.modId())) {
            return List.of("loader-visible-api");
        }
        return List.of();
    }

    @Override
    public Collection<DiscoveredMod> discoveredMods() {
        return discovery.mods();
    }

    @Override
    public Optional<DiscoveredMod> mod(String modId) {
        return discovery.get(modId);
    }

    @Override
    public Optional<ModKnowledge> knowledge(String modId) {
        return knowledge.get(modId);
    }

    @Override
    public KnowledgeLayer knowledgeLayer() {
        return knowledge;
    }

    @Override
    public Optional<Adapter> adapter(IntegrationDomain domain) {
        return integrations.byDomain(domain);
    }

    @Override
    public boolean isIntegrationBound(String modId) {
        Adapter adapter = findAdapterFor(modId);
        return adapter != null && adapter.isBound() && modId.equals(adapter.boundTarget());
    }

    @Override
    public Optional<DimensionSnapshot> dimensionSnapshot() {
        world.refreshSnapshot();
        return world.snapshot();
    }

    @Override
    public Collection<Region> regions() {
        return world.regions();
    }

    @Override
    public Optional<Region> region(String id) {
        return world.region(id);
    }

    @Override
    public Collection<PointOfInterest> pointsOfInterest() {
        return world.pointsOfInterest();
    }

    @Override
    public Collection<WorldEvent> recentWorldEvents() {
        return world.recentEvents();
    }

    @Override
    public Collection<PlayerRecord> players() {
        return world.players();
    }

    @Override
    public Optional<PlayerRecord> player(String uuid) {
        return world.player(uuid);
    }

    @Override
    public boolean registerRegion(Region region) {
        boolean ok = world.registerRegion(region);
        if (ok) {
            emit(EngineEvent.REGION_REGISTERED, region.id());
        }
        return ok;
    }

    @Override
    public boolean registerPointOfInterest(PointOfInterest poi) {
        boolean ok = world.registerPoi(poi);
        if (ok) {
            emit(EngineEvent.POI_REGISTERED, poi.id());
        }
        return ok;
    }

    @Override
    public WorldEvent postWorldEvent(String type, String payload) {
        WorldEvent event = world.postEvent(type, payload);
        emit(EngineEvent.WORLD_EVENT, event.type() + " " + event.payload());
        return event;
    }

    @Override
    public Collection<MagicSystemDescriptor> magicSystems() {
        return magic.detected();
    }

    @Override
    public Collection<DamageTypeInfo> damageTypes() {
        return combat.damageTypes();
    }

    @Override
    public CombatSnapshot combatSnapshot() {
        return combat.snapshot();
    }

    @Override
    public WorldForgeEventBus eventBus() {
        return bus;
    }

    @Override
    public Collection<AdapterDescriptor> adapterDescriptors() {
        return integrations.descriptors();
    }

    @Override
    public Collection<LoaderNote> loaderNotes() {
        return LoaderCompatibilityCatalog.all();
    }

    public ModDiscoveryService discovery() {
        return discovery;
    }

    public IntegrationManager integrations() {
        return integrations;
    }

    public WorldStateService world() {
        return world;
    }
}
