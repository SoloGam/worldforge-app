# Roadmap

## Done — 0.1.0 (Phases 1–5)

- Forge 1.21.1 / 52.1.0 workspace
- Config, structured logging, lifecycle
- Service registry
- Mod discovery + registry census
- Knowledge layer with honest status
- Persistent SavedData + schema + fingerprint
- Integration manager and domain adapter stubs
- `/worldforge` diagnostics

## Done — 0.2.0 (Phase 6)

- Dimension snapshot (time, weather, difficulty)
- Region registry (authored, not a world scan)
- Point-of-interest API
- Pack-authored world event bus
- SavedData schema 2

## Done — 0.3.0 (Phases 7–8, start of 9)

- Magic descriptor catalog; detect-only for Ars Nouveau / Iron's Spells
- Vanilla combat adapter bound through official damage-type / attribute / entity-category registries
- Public `WorldForgeEventBus`
- JSON adapter descriptors

## Done — 0.4.0 (Phase 9, partial)

- Player knowledge persisted in SavedData schema 3
- Cleared on modpack fingerprint change; regions kept
- Loader mismatch catalog: Ars Nouveau and Iron's Spells 1.21 APIs are NeoForge
- `src/optional-ars` present and excluded from `./gradlew build`

## Done — 0.5.0 (Phase 9 remainder + start of Phase 10)

- Spell Engine 1.21.1 checked. It publishes Fabric and NeoForge, not Forge, so it is recorded and not bound
- No Forge-published magic API was found. Nothing new is compiled into the jar
- `compat-pack/` datapack and resource-manager descriptor reload (`/worldforge compat` reports the probe)
- `/worldforge profile` for the censuses this mod already runs
- `experimentalFeatures` counts `LivingDamageEvent` and stays unregistered when off

## Done — 0.6.0 (Phase 10, census shape)

- Each Forge and datapack registry is walked once. Counts are retained. Keys are not
- `/worldforge profile` reports that walk, plus the per-mod key total it replaced. The old total is arithmetic, not a second run
- Experimental combat probe adds a one-second peak and one last damage-type id. Still no hit list

## Done — 0.7.0 (Phase 10, retained payload)

- `/worldforge profile` reports retained count-field bytes: records × 32
- Headers, maps, and discarded key strings are not part of that number
- The experimental probe still stores one damage id. Storing more is refused

## Done — 0.8.0 (vanilla worldgen)

- Worldgen adapter binds `minecraft` through the biome and structure registries already counted
- Extra worldgen mods stay detected. Their generation is not claimed
- `/worldforge worldgen`

## Done — 0.9.0 (vanilla advancements)

- Quest adapter binds `minecraft` through `Registries.ADVANCEMENT`
- FTB Quests and Heracles stay detected. Their quest graphs are not claimed
- `/worldforge quest`
- Census records grow from eight ints to nine. The payload line follows

## Done — 1.0.0 (stable surface)

- `net.worldforge.api` is surface 1. `/worldforge api`
- SavedData schema 3 is part of that promise
- Combat, worldgen, and quest bind `minecraft` only
- Magic and technology stay unbound
- The 200-mod pack measurement is out of scope, not claimed
- The combat probe keeps one damage id

## Done — 1.1.0 (vanilla technology)

- Technology adapter binds `minecraft` through the recipe-serializer count the Forge census already keeps
- Create, Immersive Engineering, and Mekanism stay detected. Their 1.21.1 lines are NeoForge
- `/worldforge technology`
- Surface 1 and schema 3 are unchanged. No tenth count field

## Non-goals

- Shipping gameplay content
- Mixins against other mods
- Downloading code at runtime
- Pretending to understand closed systems
