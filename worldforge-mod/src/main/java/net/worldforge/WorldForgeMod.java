package net.worldforge;

import net.minecraftforge.common.MinecraftForge;
import net.minecraftforge.eventbus.api.IEventBus;
import net.minecraftforge.fml.common.Mod;
import net.minecraftforge.fml.config.ModConfig;
import net.minecraftforge.fml.event.lifecycle.FMLCommonSetupEvent;
import net.minecraftforge.fml.javafmlmod.FMLJavaModLoadingContext;
import net.worldforge.command.WorldForgeCommands;
import net.worldforge.core.WorldForgeCore;
import net.worldforge.core.config.WorldForgeConfig;
import net.worldforge.core.logging.LogCategory;
import net.worldforge.core.logging.WorldForgeLog;
import net.worldforge.event.EventRouter;

/**
 * Forge entry point. Keep this class thin: lifecycle wiring only.
 * Runtime behaviour lives in {@link WorldForgeCore}.
 */
@Mod(WorldForgeMod.MOD_ID)
public final class WorldForgeMod {
    public static final String MOD_ID = "worldforge";

    public WorldForgeMod(FMLJavaModLoadingContext context) {
        IEventBus modBus = context.getModEventBus();
        context.registerConfig(ModConfig.Type.COMMON, WorldForgeConfig.SPEC);
        modBus.addListener(this::onCommonSetup);

        EventRouter router = new EventRouter(WorldForge.core());
        MinecraftForge.EVENT_BUS.register(router);
        MinecraftForge.EVENT_BUS.register(new WorldForgeCommands());
    }

    private void onCommonSetup(final FMLCommonSetupEvent event) {
        event.enqueueWork(() -> {
            WorldForgeLog.info(LogCategory.CORE, "Common setup — building environment knowledge");
            WorldForge.core().bootstrap();
        });
    }
}
