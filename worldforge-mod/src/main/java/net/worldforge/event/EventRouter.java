package net.worldforge.event;

import net.minecraft.server.level.ServerLevel;
import net.minecraft.server.level.ServerPlayer;
import net.minecraftforge.event.entity.player.PlayerEvent;
import net.minecraftforge.event.server.ServerStartedEvent;
import net.minecraftforge.event.server.ServerStoppingEvent;
import net.minecraftforge.eventbus.api.SubscribeEvent;
import net.worldforge.api.event.EngineEvent;
import net.worldforge.core.WorldForgeCore;
import net.worldforge.core.config.WorldForgeConfig;
import net.worldforge.core.logging.LogCategory;
import net.worldforge.core.logging.WorldForgeLog;

/**
 * Narrow Forge subscription set. High-volume events stay behind the
 * experimental config flag and are not registered in this class at all
 * until that work lands — avoiding a hidden tick cost.
 */
public final class EventRouter {
    private final WorldForgeCore core;

    public EventRouter(WorldForgeCore core) {
        this.core = core;
    }

    @SubscribeEvent
    public void onServerStarted(ServerStartedEvent event) {
        WorldForgeLog.info(LogCategory.WORLD, "Server started");
        core.onServerStarted(event.getServer());
        core.emit(EngineEvent.SERVER_START, "server");
    }

    @SubscribeEvent
    public void onServerStopping(ServerStoppingEvent event) {
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

    public static boolean experimentalEnabled() {
        return WorldForgeConfig.experimentalFeatures();
    }
}
