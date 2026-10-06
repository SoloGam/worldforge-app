# Changelog

## 0.4.0 — 2026-10-06

### Added

- Player-scoped knowledge in SavedData schema 3: uuid, name, login count, last dimension, last seen day-time, online flag
- Written on login, logout, and dimension change. Cleared when the modpack fingerprint changes. Authored regions stay
- `/worldforge player`
- Loader mismatch catalog for magic mods whose 1.21 APIs are NeoForge, not Forge
- `/worldforge compat`
- `src/optional-ars` documents the refusal. It is **not** a Gradle source set and is not in the jar
- `./gradlew explainOptionalArs`

### Honesty

- Ars Nouveau 1.21.x (`ArsNouveauAPI`, `net.neoforged`) is not compiled in
- Iron's Spells Forge API is documented for 1.20.1 and below; the 1.21 line is NeoForge
- Both stay `PARTIALLY_KNOWN` with empty capabilities. No reflection scrape

## 0.3.0 — 2026-10-05

### Added

- Phase 7 magic framework: `MagicSystem`, `MagicCapability`, `MagicSystemDescriptor`, `MagicCatalog`
- Magic adapter records loaded targets as PARTIALLY_KNOWN and **refuses to bind** (no compiled third-party magic API)
- Phase 8 combat framework: vanilla `Registries.DAMAGE_TYPE` census, attribute registry, entity-category counts
- Combat adapter **binds vanilla** (`boundTarget=minecraft`). Apotheosis / Better Combat stay detected-only
- Public `WorldForgeEventBus` for other mods (`WorldForge.api().eventBus()`)
- Data-driven adapter descriptors under `data/worldforge/adapters/*.json`
- `/worldforge magic`
- `/worldforge combat`
- `/worldforge bus`
- `/worldforge descriptors`

### Honesty

- Binding the combat adapter does not mark extra combat mods KNOWN
- Magic capabilities stay empty until an isolated optional module compiles against a documented API
- Event-bus subscribers that throw never abort WorldForge

## 0.2.0 — 2026-09-28

### Added

- Phase 6 world systems: dimension snapshot, authored regions, points of interest, pack-authored world events
- Persistent regions and POIs in SavedData (schema 2)
- `/worldforge world`
- `/worldforge region list|here`
- `/worldforge poi list|here`
- `/worldforge event list|<type> <payload>`

### Notes

- Regions are never discovered by scanning chunks
- World events are ephemeral; geography persists across restarts
- A modpack fingerprint change still clears integration state, not authored geography

## 0.1.0 — 2026-09-25

### Added

- Phase 1–5 foundation for Minecraft 1.21.1 / Forge 52.1.0
- Mod discovery from Forge loader metadata
- One-shot Forge and datapack registry census
- Knowledge classification: KNOWN / PARTIALLY_KNOWN / UNKNOWN
- Persistent world knowledge with schema version and modpack fingerprint
- Integration manager with magic, combat, technology, quest, and worldgen adapters (detect-only)
- `/worldforge status|discover|knowledge`
- Common config for debug, discovery, integrations, and experimental features
