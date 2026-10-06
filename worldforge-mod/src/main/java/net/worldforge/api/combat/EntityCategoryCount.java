package net.worldforge.api.combat;

import java.util.Objects;

/**
 * Count of entity types in one vanilla {@code MobCategory}.
 */
public final class EntityCategoryCount {
    private final String category;
    private final int count;

    public EntityCategoryCount(String category, int count) {
        this.category = Objects.requireNonNull(category);
        this.count = Math.max(0, count);
    }

    public String category() {
        return category;
    }

    public int count() {
        return count;
    }
}
