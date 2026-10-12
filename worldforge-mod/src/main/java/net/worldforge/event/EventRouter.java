package net.worldforge.event;

import net.minecraft.server.level.ServerLevel;
import net.minecraft.server.level.ServerPlayer;
import net.minecraftforge.common.MinecraftForge;
import net.minecraftforge.event.AddReloadListenerEvent;
import net.minecraftforge.event.entity.player.PlayerEvent;
import net.minecraftforge.event.server.ServerStartedEvent;
import net.minecraftforge.event.server.ServerStoppingEvent;
import net.minecraftforge.eventbus.api.SubscribeEvent;
import net.worldforge.api.event.EngineEvent;
import net.worldforge.core.WorldForgeCore;
import net.worldforge.core.config.WorldForgeConfig;
import net.worldforge.core.logging.LogCategory;
import net.worldforge.core.logging.WorldForgeLog;
import net.worldforge.integration.DescriptorReloadListener;

/**
 * Narrow Forge subscription set. The living-damage counter is a separate
 * object and is registered only while {@code experimentalFeatures} is on.
 */
public final class EventRouter {
    private final WorldForgeCore core;
    private final ExperimentalCombatProbe probe;

    public EventRouter(WorldForgeCore core) {
        this.core = core;
        this.probe = core.combatProbe();
    }

    @SubscribeEvent
    public void onAddReloadListeners(AddReloadListenerEvent event) {
        event.addListener(new DescriptorReloadListener(core.integrations()));
    }

    @SubscribeEvent
    public void onServerStarted(ServerStartedEvent event) {
        WorldForgeLog.info(LogCategory.WORLD, "Server started");
        core.onServerStarted(event.getServer());
        attachProbe();
        core.emit(EngineEvent.SERVER_START, "server");
    }

    @SubscribeEvent
    public void onServerStopping(ServerStoppingEvent event) {
        detachProbe(false);
        core.onServerStopping();
        core.emit(EngineEvent.SERVER_STOP, "server");
    }

    @SubscribeEvent
    public void onPlayerLogin(PlayerEvent.PlayerLoggedInEvent event) {
        if (!(event.getEntity() instanceof ServerPlayer player)) {
            return;
        }
        core.world().refreshSnapshot();
        String name = player.getGameProfile().getName();
        String dimension = player.level().dimension().location().toString();
        core.world().noteLogin(player.getUUID().toString(), name, dimension, player.serverLevel().getDayTime());
        core.emit(EngineEvent.PLAYER_LOGIN, name);
    }

    @SubscribeEvent
    public void onPlayerLogout(PlayerEvent.PlayerLoggedOutEvent event) {
        if (!(event.getEntity() instanceof ServerPlayer player)) {
            return;
        }
        String name = player.getGameProfile().getName();
        long time = player.level() instanceof ServerLevel level ? level.getDayTime() : 0L;
        core.world().noteLogout(player.getUUID().toString(), time);
        core.emit(EngineEvent.PLAYER_LOGOUT, name);
    }

    @SubscribeEvent
    public void onPlayerChangeDimension(PlayerEvent.PlayerChangedDimensionEvent event) {
        if (!(event.getEntity() instanceof ServerPlayer player)) {
            return;
        }
        String name = player.getGameProfile().getName();
        String dimension = event.getTo().location().toString();
        core.world().noteDimension(player.getUUID().toString(), name, dimension, player.serverLevel().getDayTime());
        core.emit(EngineEvent.DIMENSION_CHANGE, name + " -> " + dimension);
    }

    /**
     * Subscribe only when the flag is on. Counters survive a clean server
     * stop so the next start with the flag still on keeps the process total.
     * Turning the flag off drops both the subscription and the counters.
     */
    private void attachProbe() {
        if (!WorldForgeConfig.experimentalFeatures()) {
            detachProbe(true);
            return;
        }
        if (probe.registered()) {
            return;
        }
        MinecraftForge.EVENT_BUS.register(probe);
        probe.markRegistered();
        WorldForgeLog.info(LogCategory.PERFORMANCE,
                "Experimental combat probe on — LivingDamageEvent peak and one last damage id, no per-hit log");
    }

    private void detachProbe(boolean reset) {
        boolean was = probe.registered();
        if (was) {
            MinecraftForge.EVENT_BUS.unregister(probe);
            probe.markUnregistered(reset);
        } else if (reset && probe.hits() != 0L) {
            probe.markUnregistered(true);
        }
        if (was && reset) {
            WorldForgeLog.info(LogCategory.PERFORMANCE, "Experimental combat probe off");
        }
    }

    public static boolean experimentalEnabled() {
        return WorldForgeConfig.experimentalFeatures();
    }
}
