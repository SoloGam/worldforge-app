export type KnowledgeStatus = "KNOWN" | "PARTIALLY_KNOWN" | "UNKNOWN";
export type IntegrationDomain = "MAGIC" | "COMBAT" | "TECHNOLOGY" | "QUEST" | "WORLDGEN" | "GENERIC";
export type AdapterState =
  | "UNBOUND"
  | "BOUND"
  | "SKIPPED_MISSING_TARGET"
  | "SKIPPED_DISABLED"
  | "SKIPPED_NO_API";
export type EngineState = "IDLE" | "BOOTING" | "RUNNING" | "DISCOVERING";

export type EngineEventName =
  | "WORLD_LOAD"
  | "WORLD_SAVE"
  | "SERVER_START"
  | "SERVER_STOP"
  | "PLAYER_LOGIN"
  | "PLAYER_LOGOUT"
  | "DIMENSION_CHANGE"
  | "DISCOVERY_COMPLETE"
  | "ADAPTER_BOUND"
  | "ADAPTER_SKIPPED"
  | "KNOWLEDGE_RECONCILED"
  | "WEATHER_CHANGE"
  | "TIME_PROGRESSION"
  | "REGION_REGISTERED"
  | "POI_REGISTERED"
  | "WORLD_EVENT";

export interface ModDependency {
  modId: string;
  versionRange: string;
  mandatory: boolean;
}

export interface RegistryCensus {
  blocks: number;
  items: number;
  entities: number;
  effects: number;
  recipeSerializers: number;
  biomes: number;
  enchantments: number;
  structures: number;
}

export interface CatalogMod {
  modId: string;
  displayName: string;
  version: string;
  description: string;
  dependencies: ModDependency[];
  domain?: IntegrationDomain;
  advertisedApi?: string;
  census: RegistryCensus;
  defaultEnabled: boolean;
  notes: string;
}

export interface DiscoveredMod {
  modId: string;
  displayName: string;
  version: string;
  description: string;
  dependencies: ModDependency[];
  census: RegistryCensus;
  present: boolean;
}

export interface ModKnowledge {
  modId: string;
  status: KnowledgeStatus;
  census: RegistryCensus;
  detectedApis: string[];
  domains: IntegrationDomain[];
  adapterId: string | null;
  reason: string;
}

export interface AdapterInfo {
  id: string;
  domain: IntegrationDomain;
  targetModIds: string[];
  state: AdapterState;
  boundTarget: string | null;
  extraDetected: string[];
  summary: string;
  bindPolicy: string;
}

export interface MagicSystemInfo {
  modId: string;
  status: KnowledgeStatus;
  capabilities: string[];
  note: string;
}

export interface DamageTypeInfo {
  id: string;
  exhaustion: number;
  scaling: string;
  effects: string;
}

export interface EntityCategoryCount {
  category: string;
  count: number;
}

export interface CombatSnapshot {
  vanillaBound: boolean;
  damageTypeCount: number;
  attributeCount: number;
  entityCategories: EntityCategoryCount[];
  extraDetectedMods: string[];
  damageTypes: DamageTypeInfo[];
}

export interface AdapterDescriptor {
  id: string;
  domain: IntegrationDomain;
  targets: string[];
  bindPolicy: string;
  notes: string;
}

export interface LogLine {
  id: string;
  ts: number;
  category: "CORE" | "DISCOVERY" | "INTEGRATION" | "WORLD" | "PERFORMANCE" | "COMPATIBILITY";
  level: "info" | "warn" | "debug";
  message: string;
}

export interface EngineEvent {
  id: string;
  ts: number;
  name: EngineEventName;
  detail: string;
}

export interface WorldRegion {
  id: string;
  name: string;
  dimension: string;
  biome: string;
  x: number;
  z: number;
  radius: number;
}

export interface WorldPoi {
  id: string;
  regionId: string;
  kind: string;
  label: string;
  dimension: string;
  x: number;
  y: number;
  z: number;
}

export interface PackWorldEvent {
  id: string;
  type: string;
  payload: string;
  gameTime: number;
}

export interface PlayerRecord {
  uuid: string;
  name: string;
  logins: number;
  lastDimension: string;
  lastSeenDayTime: number;
  online: boolean;
}

export interface WorldState {
  dimension: string;
  day: number;
  timeOfDay: number;
  weather: "clear" | "rain" | "thunder";
  difficulty: "peaceful" | "easy" | "normal" | "hard";
  players: PlayerRecord[];
  schema: number;
  regions: WorldRegion[];
  pois: WorldPoi[];
  worldEvents: PackWorldEvent[];
}

export interface WorldForgeConfig {
  debugMode: boolean;
  discoveryOnStartup: boolean;
  scanDatapackRegistries: boolean;
  integrations: {
    magic: boolean;
    combat: boolean;
    technology: boolean;
    quest: boolean;
    worldgen: boolean;
  };
  experimentalFeatures: boolean;
}

export const EMPTY_CENSUS: RegistryCensus = {
  blocks: 0,
  items: 0,
  entities: 0,
  effects: 0,
  recipeSerializers: 0,
  biomes: 0,
  enchantments: 0,
  structures: 0,
};

export function censusTotal(c: RegistryCensus): number {
  return (
    c.blocks +
    c.items +
    c.entities +
    c.effects +
    c.recipeSerializers +
    c.biomes +
    c.enchantments +
    c.structures
  );
}
