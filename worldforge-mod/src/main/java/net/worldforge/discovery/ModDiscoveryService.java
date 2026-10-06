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

    public synchronized List<DiscoveredMod> discoverLoaderMetadata() {
        mods.clear();
        censuses.clear();
        long start = System.nanoTime();

        for (IModInfo info : ModList.get().getMods()) {
            DiscoveredMod discovered = toDiscovered(info);
            mods.put(discovered.modId(), discovered);
        }

        fingerprint = computeFingerprint();
        long ms = (System.nanoTime() - start) / 1_000_000L;
        WorldForgeLog.info(LogCategory.DISCOVERY, "Loader metadata: %d mods, fingerprint %s (%d ms)",
                mods.size(), fingerprint, ms);
        return List.copyOf(mods.values());
    }

    public synchronized void censusForgeRegistries() {
        long start = System.nanoTime();
        for (String modId : mods.keySet()) {
            censuses.put(modId, probe.probeForgeRegistries(modId));
        }
        long ms = (System.nanoTime() - start) / 1_000_000L;
        WorldForgeLog.info(LogCategory.PERFORMANCE, "Forge registry census for %d namespaces in %d ms", mods.size(), ms);
    }

    public synchronized void censusDatapackRegistries(MinecraftServer server) {
        if (!WorldForgeConfig.scanDatapackRegistries()) {
            return;
        }
        long start = System.nanoTime();
        var access = server.registryAccess();
        for (String modId : mods.keySet()) {
            RegistryCensus base = censuses.getOrDefault(modId, RegistryCensus.empty());
            censuses.put(modId, probe.enrichDatapack(base, access, modId));
        }
        long ms = (System.nanoTime() - start) / 1_000_000L;
        WorldForgeLog.info(LogCategory.PERFORMANCE, "Datapack registry census in %d ms", ms);
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
