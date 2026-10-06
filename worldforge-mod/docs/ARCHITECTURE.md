# WorldForge architecture

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

Two cheap, one-shot passes:

1. **Common setup** — `ModList` metadata + Forge registries (blocks, items, entities, effects, recipe serializers).
2. **Server start** — datapack registries (biomes, enchantments, structures) via `RegistryAccess`, plus vanilla combat census.

No world scans. No per-tick reflection. Results are cached on `ModDiscoveryService`.

## Events

`EventRouter` subscribes only to lifecycle events (server start/stop, login/logout, dimension change). High-volume block/entity events are not registered. An `experimentalFeatures` flag is reserved for later.

`WorldForgeEventBus` is a separate, public bus other mods may subscribe to. It is not Forge's bus. A throwing subscriber is ignored.

## Adapters

`IntegrationManager` owns domain adapters (magic, combat, technology, quest, worldgen). Each adapter lists target mod ids but those ids are **not** Forge dependencies. `tryBind()` must catch its own failures.

- **Combat** binds vanilla (`minecraft`) through `Registries.DAMAGE_TYPE`. Extra combat mods are recorded as detected extras.
- **Magic** records a loader mismatch and returns `SKIPPED_NO_API`. It does not import NeoForge.
- Descriptors load from `data/worldforge/adapters/*.json`.

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

## Magic (Phase 7, honesty pass in 0.4.0)

Informational descriptors only. The 1.21.1 public APIs for Ars Nouveau and Iron's Spells are NeoForge. `src/optional-ars` is excluded from compilation so the Forge jar never depends on `net.neoforged`. `MagicSystem` still exists so a later Forge-published API can bind without changing callers. Default methods return empty.

## Performance rules

- Event-driven, not ticker-driven
- Cache discovery
- Debug logging only when `debugMode` is true
- Never block the main thread on I/O beyond a single SavedData read/write
