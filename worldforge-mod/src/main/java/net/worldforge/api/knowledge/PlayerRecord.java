package net.worldforge.api.knowledge;

import java.util.Objects;

/**
 * Player-scoped knowledge. Identity and last-seen location only —
 * not inventory, spells, or anything WorldForge cannot honestly inspect.
 */
public final class PlayerRecord {
    private final String uuid;
    private final String name;
    private final int logins;
    private final String lastDimension;
    private final long lastSeenDayTime;
    private final boolean online;

    public PlayerRecord(String uuid, String name, int logins, String lastDimension, long lastSeenDayTime, boolean online) {
        this.uuid = Objects.requireNonNull(uuid);
        this.name = name == null || name.isBlank() ? uuid : name;
        this.logins = Math.max(0, logins);
        this.lastDimension = lastDimension == null || lastDimension.isBlank() ? "minecraft:overworld" : lastDimension;
        this.lastSeenDayTime = Math.max(0L, lastSeenDayTime);
        this.online = online;
    }

    public String uuid() { return uuid; }
    public String name() { return name; }
    public int logins() { return logins; }
    public String lastDimension() { return lastDimension; }
    public long lastSeenDayTime() { return lastSeenDayTime; }
    public boolean online() { return online; }
}
