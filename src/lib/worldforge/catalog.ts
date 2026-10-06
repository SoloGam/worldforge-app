import type { AdapterDescriptor, CatalogMod, DamageTypeInfo, EntityCategoryCount } from "./types";
import { EMPTY_CENSUS } from "./types";

const c = (
  partial: Partial<{
    blocks: number;
    items: number;
    entities: number;
    effects: number;
    recipeSerializers: number;
    biomes: number;
    enchantments: number;
    structures: number;
  }>,
) => ({ ...EMPTY_CENSUS, ...partial });

export const ADAPTERS = [
  {
    id: "worldforge:magic",
    domain: "MAGIC" as const,
    targetModIds: ["ars_nouveau", "irons_spellbooks"],
    bindPolicy: "documented-api-only",
    summary: "Detects magic mods. Their 1.21 APIs are NeoForge, so this Forge build records them and does not bind.",
  },
  {
    id: "worldforge:combat",
    domain: "COMBAT" as const,
    targetModIds: ["minecraft", "apotheosis", "bettercombat"],
    bindPolicy: "vanilla-registry-then-documented-api",
    summary: "Binds vanilla Registries.DAMAGE_TYPE. Extra combat mods stay detected-only.",
  },
  {
    id: "worldforge:technology",
    domain: "TECHNOLOGY" as const,
    targetModIds: ["create", "immersiveengineering", "mekanism"],
    bindPolicy: "documented-api-only",
    summary: "Machines, energy, contraptions. Create is detected, not reverse-engineered.",
  },
  {
    id: "worldforge:quest",
    domain: "QUEST" as const,
    targetModIds: ["ftbquests", "heracles"],
    bindPolicy: "documented-api-only",
    summary: "Quest graphs and completion events via official quest APIs when present.",
  },
  {
    id: "worldforge:worldgen",
    domain: "WORLDGEN" as const,
    targetModIds: ["terralith", "biomesoplenty", "alexscaves"],
    bindPolicy: "registry-census-only",
    summary: "Datapack-heavy worldgen. Registries can be counted; mechanics stay unknown.",
  },
];

export const ADAPTER_DESCRIPTORS: AdapterDescriptor[] = ADAPTERS.map((a) => ({
  id: a.id,
  domain: a.domain,
  targets: a.targetModIds,
  bindPolicy: a.bindPolicy,
  notes: a.summary,
}));

export const LOADER_NOTES: Record<string, string> = {
  ars_nouveau:
    "Loaded here, but Ars Nouveau 1.21.1 publishes ArsNouveauAPI for NeoForge (net.neoforged). WorldForge is Forge and does not compile that API. Capabilities stay empty.",
  irons_spellbooks:
    "Iron's Spells documents a Forge API only through 1.20.1. The 1.21 line is NeoForge. Recorded as PARTIALLY_KNOWN; not bound.",
};

export const CATALOG: CatalogMod[] = [
  {
    modId: "minecraft",
    displayName: "Minecraft",
    version: "1.21.1",
    description: "Base game. Fully inspectable through vanilla registries and lifecycle events.",
    dependencies: [],
    census: c({ blocks: 1200, items: 1400, entities: 150, effects: 40, biomes: 64, enchantments: 40, structures: 20 }),
    defaultEnabled: true,
    notes: "Platform. Always KNOWN. Combat adapter binds this surface.",
  },
  {
    modId: "forge",
    displayName: "Minecraft Forge",
    version: "52.1.0",
    description: "Mod loader and event bus WorldForge sits on.",
    dependencies: [{ modId: "minecraft", versionRange: "[1.21.1]", mandatory: true }],
    census: EMPTY_CENSUS,
    defaultEnabled: true,
    notes: "Platform. Always KNOWN.",
  },
  {
    modId: "worldforge",
    displayName: "WorldForge",
    version: "0.4.0",
    description: "This framework.",
    dependencies: [
      { modId: "forge", versionRange: "[52,)", mandatory: true },
      { modId: "minecraft", versionRange: "[1.21.1,1.22)", mandatory: true },
    ],
    census: EMPTY_CENSUS,
    defaultEnabled: true,
    notes: "Platform. Always KNOWN.",
  },
  {
    modId: "jei",
    displayName: "Just Enough Items",
    version: "19.21.2",
    description: "Recipe and ingredient index. Public API exists; WorldForge has not bound it yet.",
    dependencies: [{ modId: "forge", versionRange: "[52,)", mandatory: true }],
    advertisedApi: "mezz.jei.api",
    census: c({ items: 0 }),
    defaultEnabled: true,
    notes: "API visible, no adapter — PARTIALLY_KNOWN.",
  },
  {
    modId: "curios",
    displayName: "Curios API",
    version: "9.2.2",
    description: "Slot capability API used by many equipment mods.",
    dependencies: [{ modId: "forge", versionRange: "[52,)", mandatory: true }],
    advertisedApi: "top.theillusivec4.curios.api",
    census: EMPTY_CENSUS,
    defaultEnabled: true,
    notes: "Loader-visible API, no WorldForge adapter yet.",
  },
  {
    modId: "ars_nouveau",
    displayName: "Ars Nouveau",
    version: "5.8.1",
    description: "Spellcrafting magic system. The maintained 1.21 API is NeoForge.",
    dependencies: [{ modId: "forge", versionRange: "[52,)", mandatory: true }],
    domain: "MAGIC",
    advertisedApi: "com.hollingsworth.arsnouveau.api",
    census: c({ blocks: 180, items: 220, entities: 24, effects: 12, recipeSerializers: 8 }),
    defaultEnabled: true,
    notes: "1.21.1 API is NeoForge (ArsNouveauAPI). PARTIALLY_KNOWN on this Forge build. Not compiled.",
  },
  {
    modId: "irons_spellbooks",
    displayName: "Iron's Spells 'n Spellbooks",
    version: "1.21.1-3.8.1",
    description: "Spellbook combat-magic hybrid.",
    dependencies: [
      { modId: "forge", versionRange: "[52,)", mandatory: true },
      { modId: "curios", versionRange: "[9,)", mandatory: true },
    ],
    domain: "MAGIC",
    census: c({ items: 160, entities: 18, effects: 20 }),
    defaultEnabled: true,
    notes: "Forge API documented through 1.20.1. The 1.21 line is NeoForge. Not bound.",
  },
  {
    modId: "create",
    displayName: "Create",
    version: "6.0.6",
    description: "Contraptions, kinetics, processing.",
    dependencies: [{ modId: "forge", versionRange: "[52,)", mandatory: true }],
    domain: "TECHNOLOGY",
    advertisedApi: "com.simibubi.create.api",
    census: c({ blocks: 420, items: 380, entities: 16, recipeSerializers: 24 }),
    defaultEnabled: true,
    notes: "Tech adapter target. Presence ≠ kinetic simulation.",
  },
  {
    modId: "ftbquests",
    displayName: "FTB Quests",
    version: "2101.1.4",
    description: "Quest book and chapter graphs.",
    dependencies: [{ modId: "forge", versionRange: "[52,)", mandatory: true }],
    domain: "QUEST",
    advertisedApi: "dev.ftb.mods.ftbquests.api",
    census: c({ items: 12 }),
    defaultEnabled: true,
    notes: "Quest adapter target. Unbound until the official API is used.",
  },
  {
    modId: "apotheosis",
    displayName: "Apotheosis",
    version: "8.2.1",
    description: "Adventure, enchanting, and mob affixes.",
    dependencies: [{ modId: "forge", versionRange: "[52,)", mandatory: true }],
    domain: "COMBAT",
    census: c({ items: 90, enchantments: 28, entities: 4 }),
    defaultEnabled: true,
    notes: "Combat extra. Detected, not bound — vanilla is the bound combat target.",
  },
  {
    modId: "bettercombat",
    displayName: "Better Combat",
    version: "1.21.1-2.0.4",
    description: "Attack animations and hitbox combat. Public API not compiled into WorldForge.",
    dependencies: [{ modId: "forge", versionRange: "[52,)", mandatory: true }],
    domain: "COMBAT",
    census: EMPTY_CENSUS,
    defaultEnabled: false,
    notes: "Combat extra. Optional in the simulated pack.",
  },
  {
    modId: "terralith",
    displayName: "Terralith",
    version: "2.5.7",
    description: "Overworld biome expansion. Mostly datapack.",
    dependencies: [{ modId: "forge", versionRange: "[52,)", mandatory: true }],
    domain: "WORLDGEN",
    census: c({ biomes: 86, structures: 12 }),
    defaultEnabled: true,
    notes: "Worldgen adapter can count biomes. Mechanics stay unknown.",
  },
  {
    modId: "farmersdelight",
    displayName: "Farmer's Delight",
    version: "1.2.7",
    description: "Cooking, crops, and kitchen blocks.",
    dependencies: [{ modId: "forge", versionRange: "[52,)", mandatory: true }],
    census: c({ blocks: 70, items: 140, recipeSerializers: 6 }),
    defaultEnabled: true,
    notes: "Content visible through registries only.",
  },
  {
    modId: "sophisticatedbackpacks",
    displayName: "Sophisticated Backpacks",
    version: "3.20.16",
    description: "Upgradeable backpacks. No WorldForge adapter.",
    dependencies: [{ modId: "forge", versionRange: "[52,)", mandatory: true }],
    census: c({ items: 40, blocks: 8 }),
    defaultEnabled: false,
    notes: "Optional in the simulated pack.",
  },
  {
    modId: "patchouli",
    displayName: "Patchouli",
    version: "1.21-87",
    description: "Guide book framework. Data-driven, little runtime API for WorldForge.",
    dependencies: [{ modId: "forge", versionRange: "[52,)", mandatory: true }],
    census: EMPTY_CENSUS,
    defaultEnabled: true,
    notes: "Identity only unless a book registry is later probed.",
  },
  {
    modId: "moonlight",
    displayName: "Moonlight Lib",
    version: "1.21-2.17.20",
    description: "Shared library. Not a gameplay system.",
    dependencies: [{ modId: "forge", versionRange: "[52,)", mandatory: true }],
    advertisedApi: "net.mehvahdjukaar.moonlight.api",
    census: EMPTY_CENSUS,
    defaultEnabled: true,
    notes: "Library API detected, no domain adapter.",
  },
  {
    modId: "supplementaries",
    displayName: "Supplementaries",
    version: "1.21-3.1.7",
    description: "Decorative and functional vanilla-style additions.",
    dependencies: [
      { modId: "forge", versionRange: "[52,)", mandatory: true },
      { modId: "moonlight", versionRange: "[2.17,)", mandatory: true },
    ],
    census: c({ blocks: 110, items: 95 }),
    defaultEnabled: false,
    notes: "Disabled in the default simulated pack.",
  },
];

export const PLATFORM_IDS = new Set(["minecraft", "forge", "worldforge"]);

const d = (id: string, exhaustion: number, scaling: string, effects: string): DamageTypeInfo => ({
  id: `minecraft:${id}`,
  exhaustion,
  scaling,
  effects,
});

/** Representative vanilla 1.21.1 damage types (official registry, not scraped from other mods). */
export const VANILLA_DAMAGE_TYPES: DamageTypeInfo[] = [
  d("arrow", 0.1, "when_caused_by_living_non_player", "hurt"),
  d("bad_respawn_point", 0.1, "always", "hurt"),
  d("cactus", 0.1, "when_caused_by_living_non_player", "hurt"),
  d("campfire", 0.1, "when_caused_by_living_non_player", "burning"),
  d("cramming", 0.0, "when_caused_by_living_non_player", "hurt"),
  d("dragon_breath", 0.0, "when_caused_by_living_non_player", "hurt"),
  d("drown", 0.0, "when_caused_by_living_non_player", "drowning"),
  d("dry_out", 0.1, "when_caused_by_living_non_player", "hurt"),
  d("ender_pearl", 0.0, "when_caused_by_living_non_player", "hurt"),
  d("explosion", 0.1, "always", "hurt"),
  d("fall", 0.0, "when_caused_by_living_non_player", "hurt"),
  d("falling_anvil", 0.1, "when_caused_by_living_non_player", "hurt"),
  d("falling_block", 0.1, "when_caused_by_living_non_player", "hurt"),
  d("falling_stalactite", 0.1, "when_caused_by_living_non_player", "hurt"),
  d("fireball", 0.1, "when_caused_by_living_non_player", "burning"),
  d("fireworks", 0.1, "when_caused_by_living_non_player", "hurt"),
  d("fly_into_wall", 0.0, "when_caused_by_living_non_player", "hurt"),
  d("freeze", 0.0, "when_caused_by_living_non_player", "freezing"),
  d("generic", 0.0, "when_caused_by_living_non_player", "hurt"),
  d("generic_kill", 0.0, "when_caused_by_living_non_player", "hurt"),
  d("hot_floor", 0.1, "when_caused_by_living_non_player", "burning"),
  d("in_fire", 0.1, "when_caused_by_living_non_player", "burning"),
  d("in_wall", 0.0, "when_caused_by_living_non_player", "hurt"),
  d("indirect_magic", 0.0, "when_caused_by_living_non_player", "hurt"),
  d("lava", 0.1, "when_caused_by_living_non_player", "burning"),
  d("lightning_bolt", 0.1, "when_caused_by_living_non_player", "hurt"),
  d("mace_smash", 0.1, "when_caused_by_living_non_player", "hurt"),
  d("magic", 0.0, "when_caused_by_living_non_player", "hurt"),
  d("mob_attack", 0.1, "when_caused_by_living_non_player", "hurt"),
  d("mob_attack_no_aggro", 0.1, "when_caused_by_living_non_player", "hurt"),
  d("mob_projectile", 0.1, "when_caused_by_living_non_player", "hurt"),
  d("on_fire", 0.0, "when_caused_by_living_non_player", "burning"),
  d("out_of_world", 0.0, "when_caused_by_living_non_player", "hurt"),
  d("outside_border", 0.0, "when_caused_by_living_non_player", "hurt"),
  d("player_attack", 0.1, "when_caused_by_living_non_player", "hurt"),
  d("player_explosion", 0.1, "always", "hurt"),
  d("sonic_boom", 0.0, "always", "hurt"),
  d("spit", 0.1, "when_caused_by_living_non_player", "hurt"),
  d("stalagmite", 0.0, "when_caused_by_living_non_player", "hurt"),
  d("starve", 0.0, "when_caused_by_living_non_player", "hurt"),
  d("sting", 0.1, "when_caused_by_living_non_player", "hurt"),
  d("sweet_berry_bush", 0.1, "when_caused_by_living_non_player", "poking"),
  d("thorns", 0.1, "when_caused_by_living_non_player", "thorns"),
  d("thrown", 0.1, "when_caused_by_living_non_player", "hurt"),
  d("trident", 0.1, "when_caused_by_living_non_player", "hurt"),
  d("unattributed_fireball", 0.1, "when_caused_by_living_non_player", "burning"),
  d("wind_charge", 0.0, "when_caused_by_living_non_player", "hurt"),
  d("wither", 0.0, "when_caused_by_living_non_player", "hurt"),
  d("wither_skull", 0.1, "when_caused_by_living_non_player", "hurt"),
];

export const VANILLA_ENTITY_CATEGORIES: EntityCategoryCount[] = [
  { category: "monster", count: 70 },
  { category: "creature", count: 42 },
  { category: "ambient", count: 2 },
  { category: "axolotls", count: 1 },
  { category: "underground_water_creature", count: 1 },
  { category: "water_creature", count: 5 },
  { category: "water_ambient", count: 4 },
  { category: "misc", count: 25 },
];

export const VANILLA_ATTRIBUTE_COUNT = 15;
