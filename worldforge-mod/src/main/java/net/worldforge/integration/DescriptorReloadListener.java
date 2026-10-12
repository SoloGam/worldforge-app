package net.worldforge.integration;

import net.minecraft.server.packs.resources.PreparableReloadListener;
import net.minecraft.server.packs.resources.ResourceManager;
import net.minecraft.util.profiling.ProfilerFiller;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Executor;

/**
 * Re-reads {@code data/worldforge/adapters/*.json} on server start and on
 * {@code /reload}, so a datapack can add a descriptor without a new jar.
 */
public final class DescriptorReloadListener implements PreparableReloadListener {
    private final IntegrationManager integrations;

    public DescriptorReloadListener(IntegrationManager integrations) {
        this.integrations = integrations;
    }

    @Override
    public CompletableFuture<Void> reload(
            PreparationBarrier stage,
            ResourceManager manager,
            ProfilerFiller preparationsProfiler,
            ProfilerFiller reloadProfiler,
            Executor backgroundExecutor,
            Executor gameExecutor
    ) {
        return stage.wait(null).thenRunAsync(() -> integrations.reloadDescriptors(manager), gameExecutor);
    }

    @Override
    public String getName() {
        return "worldforge:adapter_descriptors";
    }
}
