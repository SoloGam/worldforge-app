package net.worldforge.api.combat;

import java.util.Objects;

/**
 * Vanilla (or datapack) attribute id from the official attribute registry.
 */
public final class AttributeInfo {
    private final String id;

    public AttributeInfo(String id) {
        this.id = Objects.requireNonNull(id);
    }

    public String id() {
        return id;
    }
}
