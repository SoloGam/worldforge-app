# Optional Ars Nouveau bridge — disabled

This directory is **not** a Gradle source set. `./gradlew build` does not compile it and does not put it in `worldforge-*.jar`.

Ars Nouveau 1.21.x ships its public API on **NeoForge** (`net.neoforged`, `ArsNouveauAPI.getInstance()`). WorldForge is a **Forge 52.1.0** mod. Pulling that API in would be a hard dependency on the wrong loader.

`./gradlew explainOptionalArs` prints the same refusal.

Do not:

- add `maven.blamejared.com` or a NeoForge coordinate to `build.gradle`
- import `com.hollingsworth.arsnouveau` or `net.neoforged` from `src/main`
- reflection-scrape Ars internals to fake a binding

A Forge-published Ars API would be required before this bridge can do anything other than refuse.
