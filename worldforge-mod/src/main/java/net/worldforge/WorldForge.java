package net.worldforge;

import net.worldforge.api.WorldForgeAPI;
import net.worldforge.core.WorldForgeCore;

/**
 * Public static facade. Other mods should prefer {@link WorldForgeAPI}
 * obtained from {@link #api()} rather than reaching into core packages.
 */
public final class WorldForge {
    private static final WorldForgeCore CORE = new WorldForgeCore();

    private WorldForge() {}

    public static WorldForgeCore core() {
        return CORE;
    }

    public static WorldForgeAPI api() {
        return CORE;
    }
}
