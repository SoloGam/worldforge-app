package net.worldforge.world;

import net.worldforge.api.world.WorldEvent;
import net.worldforge.core.logging.LogCategory;
import net.worldforge.core.logging.WorldForgeLog;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;
import java.util.UUID;

/**
 * In-memory ring of pack-authored events. Not persisted: events are ephemeral
 * signals, world knowledge lives in SavedData.
 */
public final class WorldEventBus {
    private static final int CAPACITY = 64;
    private final Deque<WorldEvent> recent = new ArrayDeque<>(CAPACITY);

    public WorldEvent post(String type, String payload, long gameTime) {
        WorldEvent event = new WorldEvent(UUID.randomUUID().toString().substring(0, 8), type, payload, gameTime);
        if (recent.size() == CAPACITY) {
            recent.removeFirst();
        }
        recent.addLast(event);
        WorldForgeLog.debug(LogCategory.WORLD, "world event %s %s", event.type(), event.payload());
        return event;
    }

    public List<WorldEvent> recent() {
        return new ArrayList<>(recent);
    }

    public void clear() {
        recent.clear();
    }
}
