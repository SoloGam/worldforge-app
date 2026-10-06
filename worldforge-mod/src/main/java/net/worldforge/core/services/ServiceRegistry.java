package net.worldforge.core.services;

import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Tiny in-process service locator for WorldForge internals.
 * Not a replacement for Forge registries.
 */
public final class ServiceRegistry {
    private final Map<Class<?>, Object> services = new ConcurrentHashMap<>();

    public <T> void register(Class<T> type, T instance) {
        services.put(Objects.requireNonNull(type), Objects.requireNonNull(instance));
    }

    public <T> Optional<T> get(Class<T> type) {
        return Optional.ofNullable(type.cast(services.get(type)));
    }

    public <T> T require(Class<T> type) {
        return get(type).orElseThrow(() -> new IllegalStateException("Missing WorldForge service: " + type.getName()));
    }
}
