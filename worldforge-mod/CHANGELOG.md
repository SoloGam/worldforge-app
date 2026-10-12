# Changelog

## 1.1.0 — 2026-10-12

### Added

- The technology adapter binds vanilla recipe serializers (`boundTarget=minecraft`). `/worldforge technology` prints that count
- Create, Immersive Engineering, and Mekanism are recorded when loaded and are not bound. Their 1.21.1 lines publish NeoForge
- No new census field. Serializers were already counted. Surface 1 and SavedData schema 3 are unchanged

### Honesty

- A recipe-serializer count is not a machine graph, a kinetic network, or an energy grid
- Magic stays unbound
- The 200-mod pack was not measured. The combat probe still stores one damage id

## 1.0.0 — 2026-10-12

### Stable

- Public surface is `net.worldforge.api`, surface 1. `/worldforge api` prints it
- SavedData stays schema 3. A 1.x release will not change what those fields mean
- A 1.x release may add a default method or a new type. It will not change an existing signature
- Combat, worldgen, and quest stay bound to `minecraft` only
- Magic and technology stay unbound

### Closed, not measured

- A 200-mod allocation pass is out of scope. WorldForge does not download or ship a pack. The profile line remains count-field bytes
- High-volume combat keeps one damage id. A hit list is not part of surface 1

## 0.9.0 — 2026-10-12

### Added

- Datapack census walks `Registries.ADVANCEMENT` once and keeps a per-namespace count. Keys are still dropped
- The quest adapter binds vanilla advancements (`boundTarget=minecraft`). `/worldforge quest` prints that count
- FTB Quests and Heracles are recorded when loaded and are not bound
- A census record is now nine ints, 36 count-field bytes. 0.7.0 was eight ints

### Honesty

- An advancement count is not a quest graph
- Technology stays unbound. Magic stays unbound
- SavedData stays schema 3

## 0.8.0 — 2026-10-12

### Added

- The worldgen adapter binds vanilla biomes and structures (`boundTarget=minecraft`). `/worldforge worldgen` prints those counts
- Terralith, Biomes O' Plenty, and Alex's Caves are recorded when loaded and are not bound
- `isIntegrationBound` is true when any adapter's bound target is that mod id, so a disabled combat adapter does not hide a vanilla worldgen bind

### Honesty

- Binding worldgen does not mark extra worldgen mods `KNOWN`
- Technology and quest stay unbound. Magic stays unbound
- SavedData stays schema 3. The retained-payload line from 0.7.0 is unchanged

## 0.7.0 — 2026-10-12

### Added

- `/worldforge profile` reports the retained census payload: one `RegistryCensus` per namespace, eight count fields, 32 bytes of those ints. Object headers and discarded keys are not included
- That figure is structural. It is not a heap dump and not a timing of a 200-mod pack

### Honesty

- A real 200-mod allocation pass is still not claimed. WorldForge does not download or ship a pack to measure
- High-volume combat still stores one damage id. A second id, and a hit list, are refused
- No magic mod is bound. SavedData stays schema 3

## 0.6.0 — 2026-10-12

### Changed

- Forge and datapack censuses walk each registry once and tally by namespace. 0.5.0 walked each registry once per mod. Counts are still what gets retained. Registry ids are not stored
- `/worldforge profile` reports walks, keys visited, retained count-records, and the per-mod shape those keys would have been read under. The per-mod figure is `keys × namespaces`. It is not a second measurement
- `experimentalFeatures` still subscribes to `LivingDamageEvent` only while the flag is on. It now also keeps a one-second peak and the registry id of the latest hit. Still no per-hit log, no damage rewrite, and no hit list

### Honesty

- There is still no 200-mod allocation benchmark. The walk count is structural. It was not timed against a 200-mod pack
- No magic mod is bound. Ars Nouveau, Iron's Spells, and Spell Engine stay `PARTIALLY_KNOWN`
- SavedData stays schema 3. This release does not change the save layout

## 0.5.0 — 2026-10-12

### Added

- `/worldforge profile` prints one-shot timings: loader metadata, Forge registry census, datapack census, vanilla combat census
- `experimentalFeatures` subscribes to `LivingDamageEvent` for the life of the server and keeps a hit counter. No per-hit log, no damage rewrite. Off by default, and the listener is not registered while the flag is off
- Datapack adapter descriptors. Server start and `/reload` read `data/worldforge/adapters/*.json` from the resource manager. Malformed files are skipped
- `compat-pack/` — a datapack whose only job is `worldforge:compat_probe`. `/worldforge compat` reports `probe=present` or `probe=absent`
- Spell Engine (`spell_engine`) in the loader-mismatch catalog. 1.21.1 publishes Fabric and NeoForge, not Forge

### Honesty

- No magic mod is bound. Ars Nouveau, Iron's Spells, and Spell Engine stay `PARTIALLY_KNOWN` with empty capabilities
- The compatibility pack does not bind a target and is not inside the jar
- Census timings are the passes WorldForge already ran. There is no 200-mod benchmark in this release

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
