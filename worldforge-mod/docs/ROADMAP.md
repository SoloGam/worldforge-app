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

## Next — Phase 9 remainder

- A real magic bind only if a Forge-published API exists. Do not add NeoForge to this jar
- Compatibility test pack

## Later — Phase 10

- Profiling pass (allocation, registry census cost on 200-mod packs)
- High-volume combat events behind `experimentalFeatures`

## Non-goals for 0.x

- Shipping gameplay content
- Mixins against other mods
- Downloading code at runtime
- Pretending to understand closed systems
