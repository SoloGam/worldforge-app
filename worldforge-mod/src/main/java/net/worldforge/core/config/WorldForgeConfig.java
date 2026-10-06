package net.worldforge.core.config;

import net.minecraftforge.common.ForgeConfigSpec;
import net.minecraftforge.eventbus.api.SubscribeEvent;
import net.minecraftforge.fml.common.Mod;
import net.minecraftforge.fml.event.config.ModConfigEvent;
import net.worldforge.WorldForgeMod;

@Mod.EventBusSubscriber(modid = WorldForgeMod.MOD_ID, bus = Mod.EventBusSubscriber.Bus.MOD)
public final class WorldForgeConfig {
    private static final ForgeConfigSpec.Builder BUILDER = new ForgeConfigSpec.Builder();

    private static final ForgeConfigSpec.BooleanValue DEBUG_MODE = BUILDER
            .comment("Verbose WorldForge logging. Leave off on production servers.")
            .define("debugMode", false);

    private static final ForgeConfigSpec.BooleanValue DISCOVERY_ON_STARTUP = BUILDER
            .comment("Scan installed mods and Forge registries during common setup.")
            .define("discoveryOnStartup", true);

    private static final ForgeConfigSpec.BooleanValue SCAN_DATAPACK_REGISTRIES = BUILDER
            .comment("When a server starts, census biomes, enchantments, and structures. Cheap; runs once per load.")
            .define("scanDatapackRegistries", true);

    private static final ForgeConfigSpec.BooleanValue MAGIC = BUILDER
            .comment("Allow the magic-system adapter to bind when a supported mod is present.")
            .define("integrations.magic", true);

    private static final ForgeConfigSpec.BooleanValue COMBAT = BUILDER
            .comment("Allow the combat adapter to bind when a supported mod is present.")
            .define("integrations.combat", true);

    private static final ForgeConfigSpec.BooleanValue TECHNOLOGY = BUILDER
            .comment("Allow the technology adapter to bind when a supported mod is present.")
            .define("integrations.technology", true);

    private static final ForgeConfigSpec.BooleanValue QUEST = BUILDER
            .comment("Allow the quest adapter to bind when a supported mod is present.")
            .define("integrations.quest", true);

    private static final ForgeConfigSpec.BooleanValue WORLDGEN = BUILDER
            .comment("Allow the worldgen adapter to bind when a supported mod is present.")
            .define("integrations.worldgen", true);

    private static final ForgeConfigSpec.BooleanValue EXPERIMENTAL = BUILDER
            .comment("Subscribe to high-volume Forge events (block/entity). Off by default for performance.")
            .define("experimentalFeatures", false);

    public static final ForgeConfigSpec SPEC = BUILDER.build();

    private static boolean debugMode;
    private static boolean discoveryOnStartup;
    private static boolean scanDatapackRegistries;
    private static boolean magic;
    private static boolean combat;
    private static boolean technology;
    private static boolean quest;
    private static boolean worldgen;
    private static boolean experimental;

    private WorldForgeConfig() {}

    public static boolean debugMode() { return debugMode; }
    public static boolean discoveryOnStartup() { return discoveryOnStartup; }
    public static boolean scanDatapackRegistries() { return scanDatapackRegistries; }
    public static boolean magicEnabled() { return magic; }
    public static boolean combatEnabled() { return combat; }
    public static boolean technologyEnabled() { return technology; }
    public static boolean questEnabled() { return quest; }
    public static boolean worldgenEnabled() { return worldgen; }
    public static boolean experimentalFeatures() { return experimental; }

    @SubscribeEvent
    static void onLoad(final ModConfigEvent event) {
        if (event.getConfig().getSpec() != SPEC) {
            return;
        }
        debugMode = DEBUG_MODE.get();
        discoveryOnStartup = DISCOVERY_ON_STARTUP.get();
        scanDatapackRegistries = SCAN_DATAPACK_REGISTRIES.get();
        magic = MAGIC.get();
        combat = COMBAT.get();
        technology = TECHNOLOGY.get();
        quest = QUEST.get();
        worldgen = WORLDGEN.get();
        experimental = EXPERIMENTAL.get();
    }
}
