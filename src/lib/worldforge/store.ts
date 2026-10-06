import { create } from "zustand";
import { CATALOG } from "./catalog";
import {
  DEFAULT_CONFIG,
  defaultEnabledMap,
  engineEvent,
  knowledgeCounts,
  logLine,
  runDiscovery,
} from "./engine";
import type {
  AdapterInfo,
  CombatSnapshot,
  DiscoveredMod,
  EngineEvent,
  EngineState,
  LogLine,
  MagicSystemInfo,
  ModKnowledge,
  WorldForgeConfig,
  WorldState,
} from "./types";

const MAX_LOGS = 200;
const MAX_EVENTS = 80;

const emptyCombat = (): CombatSnapshot => ({
  vanillaBound: false,
  damageTypeCount: 0,
  attributeCount: 0,
  entityCategories: [],
  extraDetectedMods: [],
  damageTypes: [],
});

export interface EngineStore {
  engine: EngineState;
  config: WorldForgeConfig;
  enabled: Record<string, boolean>;
  mods: DiscoveredMod[];
  adapters: AdapterInfo[];
  knowledge: ModKnowledge[];
  fingerprint: string;
  lastFingerprint: string;
  logs: LogLine[];
  events: EngineEvent[];
  world: WorldState;
  magic: MagicSystemInfo[];
  combat: CombatSnapshot;
  busSubscribers: number;
  selectedModId: string | null;
  selectedSource: string;
  boot: () => void;
  shutdown: () => void;
  discover: () => void;
  toggleMod: (modId: string) => void;
  setConfig: (patch: Partial<WorldForgeConfig>) => void;
  setIntegration: (key: keyof WorldForgeConfig["integrations"], value: boolean) => void;
  selectMod: (modId: string | null) => void;
  selectSource: (path: string) => void;
  tick: () => void;
  emitPlayer: (name: string, joining: boolean) => void;
  addRegion: (name: string) => void;
  addPoi: (label: string, kind: string) => void;
  postWorldEvent: (type: string, payload: string) => void;
  resetPack: () => void;
}

const initialWorld = (): WorldState => ({
  dimension: "minecraft:overworld",
  day: 1,
  timeOfDay: 1000,
  weather: "clear",
  difficulty: "normal",
  players: [
    {
      uuid: "sim-solo",
      name: "Solo",
      logins: 1,
      lastDimension: "minecraft:overworld",
      lastSeenDayTime: 1000,
      online: true,
    },
  ],
  schema: 3,
  regions: [
    { id: "spawn", name: "Spawn plateau", dimension: "minecraft:overworld", biome: "plains", x: 0, z: 0, radius: 96 },
    { id: "river-cut", name: "River cut", dimension: "minecraft:overworld", biome: "river", x: 240, z: -80, radius: 48 },
  ],
  pois: [
    { id: "spawn-stone", regionId: "spawn", kind: "landmark", label: "World origin", dimension: "minecraft:overworld", x: 0, y: 64, z: 0 },
  ],
  worldEvents: [{ id: "boot", type: "world.load", payload: "minecraft:overworld", gameTime: 1000 }],
});

function pushLog(logs: LogLine[], line: LogLine, debugMode: boolean): LogLine[] {
  if (line.level === "debug" && !debugMode) return logs;
  return [...logs, line].slice(-MAX_LOGS);
}

export const useEngine = create<EngineStore>()((set, get) => ({
      engine: "IDLE",
      config: DEFAULT_CONFIG,
      enabled: defaultEnabledMap(),
      mods: [],
      adapters: [],
      knowledge: [],
      fingerprint: "",
      lastFingerprint: "",
      logs: [],
      events: [],
      world: initialWorld(),
      magic: [],
      combat: emptyCombat(),
      busSubscribers: 1,
      selectedModId: "worldforge",
      selectedSource: "src/main/java/net/worldforge/WorldForgeMod.java",

      boot: () => {
        const { config } = get();
        set((s) => ({
          engine: "BOOTING",
          busSubscribers: 1,
          logs: pushLog(s.logs, logLine("CORE", "WorldForge 0.4.0 — player knowledge + loader mismatch catalog"), config.debugMode),
        }));
        if (get().config.discoveryOnStartup) {
          get().discover();
        }
        set((s) => {
          const events = [
            ...s.events,
            engineEvent("SERVER_START", "integrated"),
            engineEvent("WORLD_LOAD", "minecraft:overworld"),
          ].slice(-MAX_EVENTS);
          return {
            engine: "RUNNING",
            events,
            logs: pushLog(
              s.logs,
              logLine("WORLD", "World systems attached (schema=3, regions=2, pois=1, players=1)"),
              s.config.debugMode,
            ),
          };
        });
      },

      shutdown: () => {
        set((s) => ({
          engine: "IDLE",
          magic: [],
          combat: emptyCombat(),
          events: [...s.events, engineEvent("WORLD_SAVE", "overworld"), engineEvent("SERVER_STOP", "integrated")].slice(
            -MAX_EVENTS,
          ),
          logs: pushLog(s.logs, logLine("CORE", "Engine idle"), s.config.debugMode),
        }));
      },

      discover: () => {
        const { enabled, config, lastFingerprint } = get();
        set({ engine: get().engine === "IDLE" ? "DISCOVERING" : "DISCOVERING" });
        const result = runDiscovery(enabled, config);
        const counts = knowledgeCounts(result.knowledge);
        const reconciled = lastFingerprint && lastFingerprint !== result.fingerprint;
        const extraEvents: EngineEvent[] = [engineEvent("DISCOVERY_COMPLETE", result.fingerprint)];
        if (reconciled) extraEvents.push(engineEvent("KNOWLEDGE_RECONCILED", result.fingerprint));
        for (const adapter of result.adapters) {
          extraEvents.push(
            engineEvent(
              adapter.state === "BOUND" ? "ADAPTER_BOUND" : "ADAPTER_SKIPPED",
              `${adapter.id} ${adapter.state}${adapter.boundTarget ? " (" + adapter.boundTarget + ")" : ""}`,
            ),
          );
        }
        set((s) => ({
          engine: "RUNNING",
          mods: result.mods,
          adapters: result.adapters,
          knowledge: result.knowledge,
          fingerprint: result.fingerprint,
          lastFingerprint: result.fingerprint,
          magic: result.magic,
          combat: result.combat,
          world: reconciled ? { ...s.world, players: [] } : s.world,
          events: [...s.events, ...extraEvents].slice(-MAX_EVENTS),
          logs: [
            ...pushLog(
              s.logs,
              logLine("DISCOVERY", `Loader metadata: ${result.mods.length} mods, fingerprint ${result.fingerprint}`),
              config.debugMode,
            ),
            logLine(
              "DISCOVERY",
              `Knowledge: ${counts.known} known, ${counts.partial} partial, ${counts.unknown} unknown`,
            ),
            logLine(
              "INTEGRATION",
              result.combat.vanillaBound
                ? `Combat bound vanilla damage-type registry (${result.combat.damageTypeCount} types)`
                : "Combat adapter not bound",
            ),
            logLine(
              "INTEGRATION",
              result.magic.length
                ? `Magic recorded ${result.magic.length} system(s) as PARTIALLY_KNOWN — not bound`
                : "No magic systems detected",
            ),
            ...(reconciled
              ? [
                  logLine(
                    "COMPATIBILITY",
                    `Modpack fingerprint changed (${lastFingerprint} -> ${result.fingerprint}). Clearing integration state and player knowledge.`,
                    "warn",
                  ),
                ]
              : []),
          ].slice(-MAX_LOGS),
        }));
      },

      toggleMod: (modId) => {
        if (modId === "minecraft" || modId === "forge" || modId === "worldforge") return;
        set((s) => ({ enabled: { ...s.enabled, [modId]: !s.enabled[modId] } }));
        if (get().engine !== "IDLE") get().discover();
      },

      setConfig: (patch) => {
        set((s) => ({ config: { ...s.config, ...patch } }));
      },

      setIntegration: (key, value) => {
        set((s) => ({ config: { ...s.config, integrations: { ...s.config.integrations, [key]: value } } }));
        if (get().engine !== "IDLE") get().discover();
      },

      selectMod: (modId) => set({ selectedModId: modId }),
      selectSource: (path) => set({ selectedSource: path }),

      tick: () => {
        const { engine, world, config } = get();
        if (engine !== "RUNNING") return;
        let time = world.timeOfDay + 40;
        let day = world.day;
        if (time >= 24000) {
          time -= 24000;
          day += 1;
        }
        const events: EngineEvent[] = [];
        let weather = world.weather;
        if (time === 0 || time === 40) {
          events.push(engineEvent("TIME_PROGRESSION", `day ${day}`));
        }
        if (config.experimentalFeatures && Math.random() < 0.02) {
          weather = weather === "clear" ? "rain" : "clear";
          events.push(engineEvent("WEATHER_CHANGE", weather));
        }
        set((s) => ({
          world: { ...s.world, timeOfDay: time, day, weather },
          events: events.length ? [...s.events, ...events].slice(-MAX_EVENTS) : s.events,
        }));
      },

      addRegion: (name) => {
        const id = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `region-${Date.now().toString(36)}`;
        const region = {
          id,
          name: name.trim() || id,
          dimension: "minecraft:overworld",
          biome: "plains",
          x: Math.round((Math.random() * 2 - 1) * 400),
          z: Math.round((Math.random() * 2 - 1) * 400),
          radius: 48,
        };
        set((s) => ({
          world: { ...s.world, regions: [...s.world.regions, region] },
          events: [...s.events, engineEvent("REGION_REGISTERED", id)].slice(-MAX_EVENTS),
          logs: pushLog(s.logs, logLine("WORLD", `Registered region ${id}`), s.config.debugMode),
        }));
      },

      addPoi: (label, kind) => {
        const id = `poi-${Date.now().toString(36)}`;
        set((s) => {
          const region = s.world.regions[0];
          const poi = {
            id,
            regionId: region?.id ?? "",
            kind: kind.trim() || "marker",
            label: label.trim() || "Marked location",
            dimension: region?.dimension ?? "minecraft:overworld",
            x: region?.x ?? 0,
            y: 64,
            z: region?.z ?? 0,
          };
          return {
            world: { ...s.world, pois: [...s.world.pois, poi] },
            events: [...s.events, engineEvent("POI_REGISTERED", id)].slice(-MAX_EVENTS),
            logs: pushLog(s.logs, logLine("WORLD", `Registered POI ${id}`), s.config.debugMode),
          };
        });
      },

      postWorldEvent: (type, payload) => {
        const event = {
          id: `we-${Date.now().toString(36)}`,
          type: type.trim() || "generic",
          payload: payload.trim(),
          gameTime: get().world.day * 24000 + get().world.timeOfDay,
        };
        set((s) => ({
          world: { ...s.world, worldEvents: [...s.world.worldEvents, event].slice(-64) },
          events: [...s.events, engineEvent("WORLD_EVENT", `${event.type} ${event.payload}`)].slice(-MAX_EVENTS),
        }));
      },

      emitPlayer: (name, joining) => {
        set((s) => {
          const now = s.world.day * 24000 + s.world.timeOfDay;
          const existing = s.world.players.find((p) => p.name === name);
          const players = joining
            ? existing
              ? s.world.players.map((p) =>
                  p.name === name
                    ? {
                        ...p,
                        online: true,
                        logins: p.logins + 1,
                        lastSeenDayTime: now,
                        lastDimension: s.world.dimension,
                      }
                    : p,
                )
              : [
                  ...s.world.players,
                  {
                    uuid: `sim-${name.toLowerCase()}`,
                    name,
                    logins: 1,
                    lastDimension: s.world.dimension,
                    lastSeenDayTime: now,
                    online: true,
                  },
                ]
            : s.world.players.map((p) =>
                p.name === name ? { ...p, online: false, lastSeenDayTime: now } : p,
              );
          return {
            world: { ...s.world, players },
            events: [...s.events, engineEvent(joining ? "PLAYER_LOGIN" : "PLAYER_LOGOUT", name)].slice(-MAX_EVENTS),
          };
        });
      },

      resetPack: () => {
        set({
          enabled: defaultEnabledMap(),
          config: DEFAULT_CONFIG,
          world: initialWorld(),
        });
        if (get().engine !== "IDLE") get().discover();
      },
}));

export function catalogById(modId: string) {
  return CATALOG.find((m) => m.modId === modId);
}
