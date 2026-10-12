package net.worldforge.api;

/**
 * What 1.0 promises other mods.
 *
 * Surface 1 is the types in {@code net.worldforge.api} and SavedData schema 3.
 * A later 1.x release may add a default method or a new type.
 * It will not change an existing method signature, remove a type, or change
 * what a schema 3 field means.
 *
 * Not promised: a bind for NeoForge technology or magic APIs,
 * a hit list, or a measurement of a 200-mod pack.
 * Vanilla recipe serializers are bound. That is not a machine graph.
 */
public final class ApiStability {
    public static final String SURFACE = "1";
    public static final int SAVED_DATA_SCHEMA = 3;

    private ApiStability() {}
}
