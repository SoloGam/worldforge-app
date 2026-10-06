import {
  ADAPTERS,
  CATALOG,
  LOADER_NOTES,
  PLATFORM_IDS,
  VANILLA_ATTRIBUTE_COUNT,
  VANILLA_DAMAGE_TYPES,
  VANILLA_ENTITY_CATEGORIES,
} from "./catalog";
import type {
  AdapterInfo,
  AdapterState,
  CatalogMod,
  CombatSnapshot,
  DiscoveredMod,
  EngineEvent,
  KnowledgeStatus,
  LogLine,
  MagicSystemInfo,
  ModKnowledge,
  WorldForgeConfig,
} from "./types";
import { censusTotal } from "./types";

export const DEFAULT_CONFIG: WorldForgeConfig = {
  debugMode: false,
  discoveryOnStartup: true,
  scanDatapackRegistries: true,
  integrations: {
    magic: true,
    combat: true,
    technology: true,
    quest: true,
    worldgen: true,
  },
  experimentalFeatures: false,
};

export function fingerprintOf(mods: DiscoveredMod[]): string {
  const key = [...mods]
    .filter((m) => m.present)
    .sort((a, b) => a.modId.localeCompare(b.modId))
    .map((m) => `${m.modId}@${m.version}`)
    .join(";");
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (Math.imul(31, h) + key.charCodeAt(i)) | 0;
  return (h >>> 0).toString(16);
}

export function enabledToDiscovered(enabled: Record<string, boolean>, includeDatapack: boolean): DiscoveredMod[] {
  return CATALOG.filter((mod) => enabled[mod.modId]).map((mod) => toDiscovered(mod, includeDatapack));
}

function toDiscovered(mod: CatalogMod, includeDatapack: boolean): DiscoveredMod {
  const census = includeDatapack
    ? mod.census
    : { ...mod.census, biomes: 0, enchantments: 0, structures: 0 };
  return {
    modId: mod.modId,
    displayName: mod.displayName,
    version: mod.version,
    description: mod.description,
    dependencies: mod.dependencies,
    census,
    present: true,
  };
}

function domainEnabled(config: WorldForgeConfig, domain: AdapterInfo["domain"]): boolean {
  switch (domain) {
    case "MAGIC":
      return config.integrations.magic;
    case "COMBAT":
      return config.integrations.combat;
    case "TECHNOLOGY":
      return config.integrations.technology;
    case "QUEST":
      return config.integrations.quest;
    case "WORLDGEN":
      return config.integrations.worldgen;
    default:
      return true;
  }
}

export function bindAdapters(presentIds: Set<string>, config: WorldForgeConfig): AdapterInfo[] {
  return ADAPTERS.map((spec) => {
    if (!domainEnabled(config, spec.domain)) {
      return { ...spec, state: "SKIPPED_DISABLED" as AdapterState, boundTarget: null, extraDetected: [] };
    }
    if (spec.domain === "COMBAT" && presentIds.has("minecraft")) {
      const extraDetected = spec.targetModIds.filter((id) => id !== "minecraft" && presentIds.has(id));
      return { ...spec, state: "BOUND" as AdapterState, boundTarget: "minecraft", extraDetected };
    }
    const boundTarget = spec.targetModIds.find((id) => presentIds.has(id)) ?? null;
    if (!boundTarget) {
      return { ...spec, state: "SKIPPED_MISSING_TARGET" as AdapterState, boundTarget: null, extraDetected: [] };
    }
    return { ...spec, state: "SKIPPED_NO_API" as AdapterState, boundTarget, extraDetected: [] };
  });
}

export function classifyMod(
  mod: DiscoveredMod,
  adapters: AdapterInfo[],
  catalog: CatalogMod | undefined,
): ModKnowledge {
  const adapter = adapters.find((a) => a.targetModIds.includes(mod.modId));
  const raw = adapter?.state ?? "UNBOUND";
  const thisModBound = Boolean(adapter && raw === "BOUND" && adapter.boundTarget === mod.modId);
  const state: AdapterState = thisModBound ? "BOUND" : raw === "BOUND" ? "SKIPPED_NO_API" : raw;
  const detectedApis: string[] = [];
  if (catalog?.advertisedApi) detectedApis.push(catalog.advertisedApi);
  if (adapter && state === "SKIPPED_NO_API") detectedApis.push(`detected-target:${adapter.id}`);
  if (thisModBound && adapter) detectedApis.push(adapter.id);

  const hasApi = detectedApis.length > 0;
  const hasContent = censusTotal(mod.census) > 0;
  const isPlatform = PLATFORM_IDS.has(mod.modId);

  let status: KnowledgeStatus;
  let reason: string;
  if (isPlatform || thisModBound) {
    status = "KNOWN";
    reason = isPlatform
      ? "Platform surface: identity, registries, and lifecycle are fully inspectable."
      : "A WorldForge adapter bound through a supported public API.";
  } else if (hasApi || hasContent) {
    status = "PARTIALLY_KNOWN";
    reason = hasApi
      ? "An API or integration point was detected, but no complete adapter is bound."
      : "Registry content is visible; mechanics remain unadapted.";
  } else {
    status = "UNKNOWN";
    reason = "Only loader metadata is available. WorldForge will not invent behaviour for this mod.";
  }

  return {
    modId: mod.modId,
    status,
    census: mod.census,
    detectedApis,
    domains: adapter ? [adapter.domain] : [],
    adapterId: thisModBound ? adapter?.id ?? null : null,
    reason,
  };
}

export function detectMagic(mods: DiscoveredMod[], config: WorldForgeConfig): MagicSystemInfo[] {
  if (!config.integrations.magic) return [];
  return mods
    .filter((m) => m.modId === "ars_nouveau" || m.modId === "irons_spellbooks")
    .map((m) => ({
      modId: m.modId,
      status: "PARTIALLY_KNOWN" as const,
      capabilities: [] as string[],
      note: LOADER_NOTES[m.modId] ?? "Mod loaded. No official magic API is compiled into WorldForge; capabilities stay empty.",
    }));
}

export function combatSnapshot(adapters: AdapterInfo[], presentIds: Set<string>, config: WorldForgeConfig): CombatSnapshot {
  const combat = adapters.find((a) => a.domain === "COMBAT");
  const vanillaBound = Boolean(config.integrations.combat && combat?.state === "BOUND");
  if (!vanillaBound) {
    return {
      vanillaBound: false,
      damageTypeCount: 0,
      attributeCount: 0,
      entityCategories: [],
      extraDetectedMods: [],
      damageTypes: [],
    };
  }
  return {
    vanillaBound: true,
    damageTypeCount: VANILLA_DAMAGE_TYPES.length,
    attributeCount: VANILLA_ATTRIBUTE_COUNT,
    entityCategories: VANILLA_ENTITY_CATEGORIES,
    extraDetectedMods: combat?.extraDetected.filter((id) => presentIds.has(id)) ?? [],
    damageTypes: VANILLA_DAMAGE_TYPES,
  };
}

export function runDiscovery(
  enabled: Record<string, boolean>,
  config: WorldForgeConfig,
): {
  mods: DiscoveredMod[];
  adapters: AdapterInfo[];
  knowledge: ModKnowledge[];
  fingerprint: string;
  magic: MagicSystemInfo[];
  combat: CombatSnapshot;
} {
  const mods = enabledToDiscovered(enabled, config.scanDatapackRegistries);
  const presentIds = new Set(mods.map((m) => m.modId));
  const adapters = bindAdapters(presentIds, config);
  const byId = new Map(CATALOG.map((m) => [m.modId, m]));
  const knowledge = mods.map((m) => classifyMod(m, adapters, byId.get(m.modId)));
  return {
    mods,
    adapters,
    knowledge,
    fingerprint: fingerprintOf(mods),
    magic: detectMagic(mods, config),
    combat: combatSnapshot(adapters, presentIds, config),
  };
}

let seq = 0;
export function nextId(prefix: string): string {
  seq += 1;
  return `${prefix}-${seq}-${Date.now().toString(36)}`;
}

export function logLine(
  category: LogLine["category"],
  message: string,
  level: LogLine["level"] = "info",
): LogLine {
  return { id: nextId("log"), ts: Date.now(), category, level, message };
}

export function engineEvent(name: EngineEvent["name"], detail: string): EngineEvent {
  return { id: nextId("evt"), ts: Date.now(), name, detail };
}

export function defaultEnabledMap(): Record<string, boolean> {
  return Object.fromEntries(CATALOG.map((m) => [m.modId, m.defaultEnabled]));
}

export function knowledgeCounts(knowledge: ModKnowledge[]) {
  return {
    known: knowledge.filter((k) => k.status === "KNOWN").length,
    partial: knowledge.filter((k) => k.status === "PARTIALLY_KNOWN").length,
    unknown: knowledge.filter((k) => k.status === "UNKNOWN").length,
  };
}
