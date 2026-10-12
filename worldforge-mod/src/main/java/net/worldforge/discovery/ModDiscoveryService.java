package net.worldforge.discovery;

import net.minecraft.server.MinecraftServer;
import net.minecraftforge.fml.ModList;
import net.minecraftforge.forgespi.language.IModInfo;
import net.worldforge.api.discovery.DiscoveredMod;
import net.worldforge.api.discovery.RegistryCensus;
import net.worldforge.core.config.WorldForgeConfig;
import net.worldforge.core.logging.LogCategory;
import net.worldforge.core.logging.WorldForgeLog;

import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * Discovers installed mods from Forge's loader metadata, then optionally
 * censuses registries. Never assumes a mod's mechanics from its id alone.
 */
public final class ModDiscoveryService {
    private final RegistryProbe probe = new RegistryProbe();
    private final Map<String, DiscoveredMod> mods = new LinkedHashMap<>();
    private final Map<String, RegistryCensus> censuses = new LinkedHashMap<>();
    private String fingerprint = "";
    private long loaderMillis = -1L;
    private long forgeCensusMillis = -1L;
    private long datapackCensusMillis = -1L;
    private CensusPass forgePass = CensusPass.none();
    private CensusPass datapackPass = CensusPass.none();

    public synchronized List<DiscoveredMod> discoverLoaderMetadata() {
        mods.clear();
        censuses.clear();
        forgePass = CensusPass.none();
        datapackPass = CensusPass.none();
        long start = System.nanoTime();

        for (IModInfo info : ModList.get().getMods()) {
            DiscoveredMod discovered = toDiscovered(info);
            mods.put(discovered.modId(), discovered);
        }

        fingerprint = computeFingerprint();
        loaderMillis = (System.nanoTime() - start) / 1_000_000L;
        WorldForgeLog.info(LogCategory.DISCOVERY, "Loader metadata: %d mods, fingerprint %s (%d ms)",
                mods.size(), fingerprint, loaderMillis);
        return List.copyOf(mods.values());
    }

    public synchronized void censusForgeRegistries() {
        long start = System.nanoTime();
        RegistryProbe.Batch batch = probe.censusForge(mods.keySet());
        censuses.clear();
        censuses.putAll(batch.censuses());
        forgePass = batch.pass();
        forgeCensusMillis = (System.nanoTime() - start) / 1_000_000L;
        WorldForgeLog.info(LogCategory.PERFORMANCE,
                "Forge registry census: %d namespaces, %d walks, %d keys visited, %d count-records retained (%d ms). A per-namespace walk would have read %d keys.",
                mods.size(), forgePass.passes(), forgePass.keysVisited(), forgePass.retained(), forgeCensusMillis, forgePass.repeatedShapeVisits());
    }

    public synchronized void censusDatapackRegistries(MinecraftServer server) {
        if (!WorldForgeConfig.scanDatapackRegistries() || server == null) {
            datapackCensusMillis = -1L;
            datapackPass = CensusPass.none();
            return;
        }
        long start = System.nanoTime();
        RegistryProbe.Batch batch = probe.enrichDatapack(censuses, server.registryAccess(), mods.keySet());
        censuses.clear();
        censuses.putAll(batch.censuses());
        datapackPass = batch.pass();
        datapackCensusMillis = (System.nanoTime() - start) / 1_000_000L;
        WorldForgeLog.info(LogCategory.PERFORMANCE,
                "Datapack registry census: %d walks, %d keys visited, %d count-records retained (%d ms). A per-namespace walk would have read %d keys.",
                datapackPass.passes(), datapackPass.keysVisited(), datapackPass.retained(), datapackCensusMillis, datapackPass.repeatedShapeVisits());
    }

    public Collection<DiscoveredMod> mods() {
        return List.copyOf(mods.values());
    }

    public Optional<DiscoveredMod> get(String modId) {
        return Optional.ofNullable(mods.get(modId));
    }

    public RegistryCensus census(String modId) {
        return censuses.getOrDefault(modId, RegistryCensus.empty());
    }

    public String fingerprint() {
        return fingerprint;
    }

    /** Milliseconds, or {@code -1} if that pass has not run. */
    public long loaderMillis() {
        return loaderMillis;
    }

    public long forgeCensusMillis() {
        return forgeCensusMillis;
    }

    public long datapackCensusMillis() {
        return datapackCensusMillis;
    }

    public CensusPass forgePass() {
        return forgePass;
    }

    public CensusPass datapackPass() {
        return datapackPass;
    }

    public boolean isLoaded(String modId) {
        return ModList.get().isLoaded(modId);
    }

    private static DiscoveredMod toDiscovered(IModInfo info) {
        List<DiscoveredMod.Dependency> deps = new ArrayList<>();
        for (IModInfo.ModVersion dep : info.getDependencies()) {
            deps.add(new DiscoveredMod.Dependency(
                    dep.getModId(),
                    String.valueOf(dep.getVersionRange()),
                    dep.isMandatory()
            ));
        }
        return new DiscoveredMod(
                info.getModId(),
                info.getDisplayName(),
                String.valueOf(info.getVersion()),
                info.getDescription() == null ? "" : info.getDescription(),
                deps
        );
    }

    private String computeFingerprint() {
        StringBuilder sb = new StringBuilder(mods.size() * 16);
        mods.values().stream()
                .sorted((a, b) -> a.modId().compareTo(b.modId()))
                .forEach(mod -> sb.append(mod.modId()).append('@').append(mod.version()).append(';'));
        return Integer.toHexString(sb.toString().hashCode());
    }
}
