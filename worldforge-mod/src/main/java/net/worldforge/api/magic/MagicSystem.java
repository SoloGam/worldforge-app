package net.worldforge.api.magic;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

/**
 * Live magic surface. Only implemented when an official mod API is compiled in.
 * Default methods return empty so callers never have to special-case UNKNOWN.
 */
public interface MagicSystem {
    String modId();

    MagicSystemDescriptor descriptor();

    default Set<MagicCapability> capabilities() {
        return descriptor().capabilities();
    }

    default Optional<Integer> mana(UUID playerId) {
        return Optional.empty();
    }

    default List<String> spellIds() {
        return List.of();
    }

    default List<String> schoolIds() {
        return List.of();
    }
}
