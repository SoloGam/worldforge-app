package net.worldforge.api.event;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.CopyOnWriteArrayList;

/**
 * Public, fail-closed bus for other mods.
 * A throwing subscriber is dropped from the current publish and never
 * aborts WorldForge or other listeners.
 */
public final class WorldForgeEventBus {
    private static final int RECENT_CAP = 32;

    private final CopyOnWriteArrayList<EngineEventListener> listeners = new CopyOnWriteArrayList<>();
    private final ArrayDeque<String> recent = new ArrayDeque<>();

    public void subscribe(EngineEventListener listener) {
        if (listener != null) {
            listeners.addIfAbsent(listener);
        }
    }

    public void unsubscribe(EngineEventListener listener) {
        listeners.remove(listener);
    }

    public void publish(EngineEvent event, String detail) {
        Objects.requireNonNull(event);
        String line = event.name() + " " + (detail == null ? "" : detail);
        synchronized (recent) {
            recent.addLast(line.trim());
            while (recent.size() > RECENT_CAP) {
                recent.removeFirst();
            }
        }
        for (EngineEventListener listener : listeners) {
            try {
                listener.onEngineEvent(event, detail == null ? "" : detail);
            } catch (RuntimeException ignored) {
                // fail closed
            }
        }
    }

    public int subscriberCount() {
        return listeners.size();
    }

    public Collection<String> recent() {
        synchronized (recent) {
            return List.copyOf(recent);
        }
    }

    public List<EngineEventListener> snapshot() {
        return new ArrayList<>(listeners);
    }
}
