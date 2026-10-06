package net.worldforge.optional.ars;

/**
 * Not on the default compile graph and not packaged in the Forge jar.
 *
 * Ars Nouveau 1.21.x publishes {@code ArsNouveauAPI} for NeoForge
 * ({@code net.neoforged}). WorldForge targets Forge 52.1.0. Importing that
 * API, or adding a NeoForge Maven coordinate, would make {@code ./gradlew build}
 * depend on the wrong loader.
 *
 * This class intentionally imports nothing from Ars or NeoForge. It exists so
 * the refusal is in the tree, not implied by a missing folder. Do not call it
 * from {@code src/main}.
 */
public final class ArsNouveauBridge {
    private ArsNouveauBridge() {}

    public static boolean available() {
        return false;
    }

    public static String refusal() {
        return "Ars Nouveau 1.21.1 API is NeoForge. WorldForge will not compile it into a Forge jar.";
    }
}
