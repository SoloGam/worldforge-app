# Compatibility

WorldForge must keep running when other mods are missing, added, removed, updated, or only partially inspectable.

## Rules

1. **No hard optional dependencies.** Target mods are detected with `ModList.isLoaded`. They are never Maven `implementation` lines in 0.x.
2. **Adapters fail closed.** `tryBind()` is wrapped by `IntegrationManager`. A thrown exception unbinds that adapter and is logged under `[WorldForge:Integration]`.
3. **Fingerprint isolation.** World saved data stores the pack fingerprint. A mismatch clears world integration state and player records. Authored regions stay.
4. **Honest status.** UNKNOWN is a valid, stable result. It is not a bug and not a prompt to scrape private classes.
5. **Config kill-switches.** Each adapter family can be disabled by operators without removing the jar.
6. **Bound target is specific.** `isIntegrationBound(modId)` is true only when that mod id is the adapter's `boundTarget()`. Combat bound to vanilla does not claim Apotheosis.

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
| Magic | ars_nouveau / irons_spellbooks | `SKIPPED_NO_API` |
| Technology / quest / worldgen | listed targets | `SKIPPED_NO_API` if present |

Until a documented third-party API is compiled as an isolated optional module, WorldForge will not call into those mods.
