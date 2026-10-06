package net.worldforge.magic;

import net.worldforge.api.magic.MagicSystem;
import net.worldforge.api.magic.MagicSystemDescriptor;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

/**
 * Detected magic systems. Entries are informational unless a {@link MagicSystem}
 * implementation was bound through a public API.
 */
public final class MagicCatalog {
    private final List<MagicSystemDescriptor> detected = new ArrayList<>();
    private final List<MagicSystem> bound = new ArrayList<>();

    public void clear() {
        detected.clear();
        bound.clear();
    }

    public void record(MagicSystemDescriptor descriptor) {
        detected.removeIf(existing -> existing.modId().equals(descriptor.modId()));
        detected.add(descriptor);
    }

    public void bind(MagicSystem system) {
        bound.removeIf(existing -> existing.modId().equals(system.modId()));
        bound.add(system);
        record(system.descriptor());
    }

    public Collection<MagicSystemDescriptor> detected() {
        return List.copyOf(detected);
    }

    public Optional<MagicSystem> bound(String modId) {
        return bound.stream().filter(s -> s.modId().equals(modId)).findFirst();
    }
}
