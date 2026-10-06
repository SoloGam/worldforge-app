package net.worldforge.api.combat;

import java.util.Objects;

/**
 * Inspectable vanilla (or datapack) damage type. Built from the official
 * {@code Registries.DAMAGE_TYPE} registry — never from other mods' internals.
 */
public final class DamageTypeInfo {
    private final String id;
    private final float exhaustion;
    private final String scaling;
    private final String effects;

    public DamageTypeInfo(String id, float exhaustion, String scaling, String effects) {
        this.id = Objects.requireNonNull(id);
        this.exhaustion = exhaustion;
        this.scaling = scaling == null ? "" : scaling;
        this.effects = effects == null ? "" : effects;
    }

    public String id() {
        return id;
    }

    public float exhaustion() {
        return exhaustion;
    }

    public String scaling() {
        return scaling;
    }

    public String effects() {
        return effects;
    }
}
