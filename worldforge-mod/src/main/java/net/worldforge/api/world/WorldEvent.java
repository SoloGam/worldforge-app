package net.worldforge.api.world;

import java.util.Objects;

/**
 * Pack-authored world event. Not a Forge bus event and not fired per tick.
 */
public final class WorldEvent {
    private final String id;
    private final String type;
    private final String payload;
    private final long gameTime;

    public WorldEvent(String id, String type, String payload, long gameTime) {
        this.id = Objects.requireNonNull(id);
        this.type = type == null ? "generic" : type;
        this.payload = payload == null ? "" : payload;
        this.gameTime = gameTime;
    }

    public String id() { return id; }
    public String type() { return type; }
    public String payload() { return payload; }
    public long gameTime() { return gameTime; }
}
