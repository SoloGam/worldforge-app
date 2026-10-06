package net.worldforge.api.combat;

import java.util.Collection;
import java.util.List;

/**
 * One-shot vanilla combat census. Third-party combat mods are never inferred here.
 */
public final class CombatSnapshot {
    private final boolean vanillaBound;
    private final int damageTypeCount;
    private final int attributeCount;
    private final List<EntityCategoryCount> entityCategories;
    private final List<String> extraDetectedMods;

    public CombatSnapshot(
            boolean vanillaBound,
            int damageTypeCount,
            int attributeCount,
            Collection<EntityCategoryCount> entityCategories,
            Collection<String> extraDetectedMods
    ) {
        this.vanillaBound = vanillaBound;
        this.damageTypeCount = damageTypeCount;
        this.attributeCount = attributeCount;
        this.entityCategories = List.copyOf(entityCategories);
        this.extraDetectedMods = List.copyOf(extraDetectedMods);
    }

    public static CombatSnapshot empty() {
        return new CombatSnapshot(false, 0, 0, List.of(), List.of());
    }

    public boolean vanillaBound() {
        return vanillaBound;
    }

    public int damageTypeCount() {
        return damageTypeCount;
    }

    public int attributeCount() {
        return attributeCount;
    }

    public List<EntityCategoryCount> entityCategories() {
        return entityCategories;
    }

    public List<String> extraDetectedMods() {
        return extraDetectedMods;
    }
}
