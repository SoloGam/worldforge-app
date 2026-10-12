# Compatibility

WorldForge must keep running when other mods are missing, added, removed, updated, or only partially inspectable.

## Rules

1. **No hard optional dependencies.** Target mods are detected with `ModList.isLoaded`. They are never Maven `implementation` lines.
2. **Adapters fail closed.** `tryBind()` is wrapped by `IntegrationManager`. A thrown exception unbinds that adapter and is logged under `[WorldForge:Integration]`.
3. **Fingerprint isolation.** World saved data stores the pack fingerprint. A mismatch clears world integration state and player records. Authored regions stay.
4. **Honest status.** UNKNOWN is a valid, stable result. It is not a bug and not a prompt to scrape private classes.
5. **Config kill-switches.** Each adapter family can be disabled by operators without removing the jar.
6. **Bound target is specific.** `isIntegrationBound(modId)` is true when some adapter is bound and that mod id is its `boundTarget()`. Combat bound to vanilla does not claim Apotheosis. Worldgen bound to vanilla does not claim Terralith. Quest bound to vanilla does not claim FTB Quests. Technology bound to vanilla does not claim Create.

## 1.1.0

Technology binds `minecraft` recipe serializers only. Create, Immersive Engineering, and Mekanism are not `KNOWN`. Magic is unchanged. SavedData stays schema 3. Surface 1 is unchanged. No new census field.

| Mod | Published loader for 1.21.1 | WorldForge state |
| --- | --- | --- |
| create | NeoForge (Create 6.x, `com.simibubi.create.api`) | `PARTIALLY_KNOWN`, not compiled |
| immersiveengineering | NeoForge on the 1.21.1 line | `PARTIALLY_KNOWN`, not compiled |
| mekanism | NeoForge (10.7) | `PARTIALLY_KNOWN`, not compiled |

## 1.0.0

Surface 1. Schema 3. Combat, worldgen, and quest bind `minecraft` only. Magic and technology do not bind. No new save fields.

## 0.9.0

Quest binds `minecraft` advancements only. FTB Quests and Heracles are not `KNOWN`. Technology and magic are unchanged. SavedData stays schema 3. Census records gained an advancements count; the save layout did not.

## 0.8.0

Worldgen binds `minecraft` only. Terralith, Biomes O' Plenty, and Alex's Caves are not `KNOWN`. Technology, quest, and magic are unchanged. SavedData stays schema 3.

## 0.7.0

No new loader bindings. `/worldforge profile` adds a retained-payload line. SavedData stays schema 3. The combat probe still stores one damage id.

## 0.6.0

No new loader bindings. Census walks and the experimental combat probe changed. SavedData stays schema 3.

## 0.5.0 loader notes

| Mod | Published loader for 1.21.1 | WorldForge state |
| --- | --- | --- |
| ars_nouveau | NeoForge (`ArsNouveauAPI`) | `PARTIALLY_KNOWN`, not compiled |
| irons_spellbooks | NeoForge (Forge API documented only through 1.20.1) | `PARTIALLY_KNOWN`, not compiled |
| spell_engine | Fabric and NeoForge. No Forge module in the 1.21.1 tree | `PARTIALLY_KNOWN`, not compiled |

`compat-pack/` is a datapack. It adds `worldforge:compat_probe` and binds nothing. `/worldforge compat` reports whether that descriptor was loaded.

`src/optional-ars` is not a source set. `./gradlew explainOptionalArs` prints why.

## 0.4.0 loader notes

| Mod | Published loader for 1.21 | WorldForge state |
| --- | --- | --- |
| ars_nouveau | NeoForge (`ArsNouveauAPI`) | `PARTIALLY_KNOWN`, not compiled |
| irons_spellbooks | NeoForge (Forge API documented only through 1.20.1) | `PARTIALLY_KNOWN`, not compiled |

`src/optional-ars` is not a source set. `./gradlew explainOptionalArs` prints why.

## 0.3.0 adapter policy

| Adapter | When loaded | State |
| --- | --- | --- |
| Combat | always (vanilla) | `BOUND` → `minecraft` |
| Combat extras | apotheosis / bettercombat | detected, not bound |
| Magic | ars_nouveau / irons_spellbooks / spell_engine | `SKIPPED_NO_API` |
| Technology / quest / worldgen | listed targets | `SKIPPED_NO_API` if present |

Until a documented third-party API is compiled as an isolated optional module, WorldForge will not call into those mods.
