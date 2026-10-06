# WorldForge

An extensible world-engine framework for **Minecraft 1.21.1 / Forge 52.1.0**.

WorldForge is not a content mod. It is an integration and orchestration layer for large modpacks: it discovers what is actually installed, classifies how much of it can be inspected, and exposes a stable API for adapters that talk to other mods through **their official surfaces**.

If a mod provides an API, WorldForge uses the API.  
If it exposes registries, WorldForge counts them.  
If it provides nothing useful, WorldForge marks it **UNKNOWN**. It does not reverse-engineer.

## Status

**0.4.0 — player knowledge and loader honesty.** Vanilla combat is still bound through `Registries.DAMAGE_TYPE`. Player records persist in the world save (schema 3) and are dropped if the modpack fingerprint changes. Ars Nouveau and Iron's Spells stay unbound: their 1.21 APIs are published for NeoForge, and this project is Forge. `src/optional-ars` is in the tree and excluded from the jar.

| Phase | Scope | State |
| --- | --- | --- |
| 1 | Forge setup, config, logging, lifecycle | Done |
| 2 | Service architecture, events, data layer | Done |
| 3 | Mod discovery, registry census, knowledge | Done |
| 4 | Persistent world/modpack knowledge + versioning | Done |
| 5 | Generic adapters + integration manager | Done |
| 6 | World systems (regions, POIs, environment) | Done |
| 7–8 | Magic / combat integration | Done (vanilla combat bound; third-party magic detect-only) |
| 9 | Player knowledge, loader mismatch, disabled optional bridge | In progress (0.4.0) |
| 10 | Optimisation | Not started |

## Requirements

- JDK 21
- Minecraft 1.21.1
- Forge 52.1.0 (recommended)

## Build

Requires JDK 21 (`JAVA_HOME` pointing at it). Run from this `worldforge-mod/` directory:

```bash
./gradlew build
```

This produces `build/libs/worldforge-0.4.0.jar`. The Gradle wrapper is included. First run downloads Minecraft mappings and Forge — expect several minutes. There are no automated tests.

Optional dev tasks:

```bash
./gradlew genIntellijRuns   # generate IntelliJ run configurations
./gradlew runClient         # launch a dev Minecraft client with the mod
```

`./gradlew explainOptionalArs` prints why the Ars bridge is not compiled.

## In-game

Operator command (permission 2):

```
/worldforge status
/worldforge discover
/worldforge knowledge
/worldforge world
/worldforge region list
/worldforge region here
/worldforge poi list
/worldforge poi here
/worldforge event list
/worldforge event raid village_bell
/worldforge magic
/worldforge combat
/worldforge player
/worldforge compat
/worldforge bus
/worldforge descriptors
```

Common config (`worldforge-common.toml`):

- `debugMode` — verbose category logs
- `discoveryOnStartup` — scan mods during common setup
- `scanDatapackRegistries` — census biomes/enchantments/structures on server start
- `integrations.*` — enable/disable adapter families
- `experimentalFeatures` — reserved for high-volume events (off)

## Architecture

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md), [docs/COMPATIBILITY.md](docs/COMPATIBILITY.md), and [docs/ROADMAP.md](docs/ROADMAP.md).

Package layout:

```
net.worldforge
  api/           Stable types other mods may compile against
  api/combat/    Damage types, attributes, combat snapshot
  api/magic/     Magic descriptors and live MagicSystem surface
  api/event/     EngineEvent + public WorldForgeEventBus
  api/world/     Snapshot, Region, POI, WorldEvent
  api/knowledge/ Status, ModKnowledge, PlayerRecord
  core/          Bootstrap, config, logging, services
  discovery/     Loader metadata + registry census
  knowledge/     KNOWN / PARTIALLY_KNOWN / UNKNOWN
  persistence/   SavedData schema 3, fingerprint
  integration/   Adapter manager, loader mismatch catalog
  combat/        Vanilla combat census
  magic/         Detected magic catalog
  event/         Narrow Forge event router
  world/         World-state façade, player registry
  command/       Diagnostics
```

`src/optional-ars` is outside `src/main` and is not packaged.

## Compatibility

WorldForge has **no optional Maven dependencies**. Target mods are detected at runtime with `ModList.isLoaded`. A missing magic/tech/quest mod never crashes the loader. The combat adapter binds **vanilla only**. Ars Nouveau and Iron's Spells are recorded as NeoForge-published APIs and are not bound on Forge 1.21.1.

## License

MIT. Minecraft and Forge are property of their respective owners. Official mappings are used under Mojang's mapping license.
