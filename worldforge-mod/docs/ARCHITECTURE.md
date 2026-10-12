# WorldForge architecture

## Stable surface (1.0.0, still the contract in 1.1.0)

`net.worldforge.api` is surface 1. SavedData schema is 3. `/worldforge api` prints both.

A 1.x release may add a default method or a new type. It will not change an existing method signature or the meaning of a schema 3 field. 1.1.0 binds vanilla recipe serializers and does not add a census field. Magic stays unbound. NeoForge technology APIs stay unbound. The experimental probe stores one damage id. There is no 200-mod pack measurement in this release.

## Layering

```
Minecraft
  → Forge
    → WorldForge Core
      → World / simulation systems
        → Compatibility & integration layer
          → Other mods (via adapters)
```

Core never hard-codes support for a third-party mod. Adapters live beside the core and fail closed.

## Honesty contract

Every discovered mod is classified:

| Status | Meaning |
| --- | --- |
| `KNOWN` | Platform (minecraft/forge/worldforge) **or** a bound adapter whose `boundTarget()` is this mod |
| `PARTIALLY_KNOWN` | Registries or an integration point are visible; mechanics are not adapted |
| `UNKNOWN` | Loader metadata only |

WorldForge will not invent behaviour for UNKNOWN mods. An adapter that is BOUND to vanilla does **not** make every listed extra target KNOWN.

## Knowledge scopes

| Scope | Lives where | Travels with |
| --- | --- | --- |
| CORE | Code | The jar |
| MODPACK | Fingerprint of installed mod ids+versions | The pack |
| WORLD | `SavedData` (`worldforge`) | The save |
| PLAYER | `SavedData` player list (schema 3) | The save, cleared on pack change |

Opening a world under a different modpack fingerprint **clears** world integration state and player records. Authored regions stay.

## Discovery

Two cheap, one-shot passes. Each registry is walked **once**, then tallied by namespace:

1. **Common setup** — `ModList` metadata + Forge registries (blocks, items, entities, effects, recipe serializers).
2. **Server start** — datapack registries (biomes, enchantments, structures, advancements) via `RegistryAccess`, plus vanilla combat census.

0.5.0 walked every registry once per installed mod. That repeated the same keys. 0.6.0 does not. Results cached on `ModDiscoveryService` are counts (`RegistryCensus`), not id lists. No world scans. No per-tick reflection.

## Events

`EventRouter` subscribes only to lifecycle events (server start/stop, login/logout, dimension change) plus datapack reload. `LivingDamageEvent` is a separate object, `ExperimentalCombatProbe`, registered only while `experimentalFeatures` is true and unregistered when the server stops or the flag is off. It keeps a hit total, a summed amount, a one-second peak, and the registry id of the latest hit. It does not log per hit and it does not keep a list.

`WorldForgeEventBus` is a separate, public bus other mods may subscribe to. It is not Forge's bus. A throwing subscriber is ignored.

## Adapters

`IntegrationManager` owns domain adapters (magic, combat, technology, quest, worldgen). Each adapter lists target mod ids but those ids are **not** Forge dependencies. `tryBind()` must catch its own failures.

- **Combat** binds vanilla (`minecraft`) through `Registries.DAMAGE_TYPE`. Extra combat mods are recorded as detected extras.
- **Worldgen** binds vanilla (`minecraft`) through the biome and structure counts. Terralith, Biomes O' Plenty, and Alex's Caves stay detected extras.
- **Quest** binds vanilla (`minecraft`) through `Registries.ADVANCEMENT`. FTB Quests and Heracles stay detected extras. An advancement count is not a quest graph.
- **Technology** binds vanilla (`minecraft`) through the recipe-serializer count already kept by the Forge census. Create, Immersive Engineering, and Mekanism stay detected extras. A serializer count is not a machine graph.
- **Magic** records a loader mismatch and returns `SKIPPED_NO_API`. It does not import NeoForge. Targets: Ars Nouveau, Iron's Spells, Spell Engine.
- Descriptors load from `data/worldforge/adapters/*.json` on the classpath during common setup, then again from the server resource manager on start and `/reload`. A datapack can add one. `compat-pack/` ships `worldforge:compat_probe` and is not inside the jar.

## Persistence

`WorldForgeSavedData` stores schema version (currently 3), modpack fingerprint, a compound world-knowledge tag, authored regions, points of interest, and player records. Schema mismatches rewrite forward. Fingerprint mismatches discard integration state and player knowledge, not geography.

## World systems (Phase 6)

- **Dimension snapshot** — time, weather, difficulty, captured on demand (server start, login, `/worldforge world`). No ticker.
- **Regions** — operator- or API-authored circles. Never produced by a chunk scan.
- **POIs** — named points, optionally parented to a region.
- **World event bus** — pack-authored signals (`raid`, `season`, …). Ephemeral, capacity 64, not Forge's event bus.

## Combat (Phase 8)

Vanilla-only census on server start:

- Damage types (`exhaustion`, `scaling`, `effects`)
- Attributes
- Entity types grouped by `MobCategory`

## Magic (Phase 7, honesty pass in 0.4.0 and 0.5.0)

Informational descriptors only. The 1.21.1 public APIs for Ars Nouveau and Iron's Spells are NeoForge. Spell Engine 1.21.1 publishes Fabric and NeoForge modules and has no `forge/` tree. `src/optional-ars` is excluded from compilation so the Forge jar never depends on `net.neoforged`. `MagicSystem` still exists so a later Forge-published API can bind without changing callers. Default methods return empty. 0.6.0 does not change this.

## Performance (Phase 10)

- Event-driven, not ticker-driven
- Cache discovery as counts, not key lists
- Each registry is walked once per census. `/worldforge profile` reports walks, keys visited, retained records, and the per-mod shape those keys would have been read under
- The per-mod figure is arithmetic (`keys × namespaces`). It is not a measured 200-mod pack
- `/worldforge profile` also reports retained count-field bytes (`records × 36`). That is the nine ints on `RegistryCensus`, not a heap dump
- Debug logging only when `debugMode` is true. Census logs are one line per pass, not one line per mod
- The experimental combat probe does not log per hit and stores one damage id. A second id is not kept
- Never block the main thread on I/O beyond a single SavedData read/write and descriptor reload
