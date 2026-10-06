package net.worldforge.api.magic;

/**
 * Capabilities a magic system may expose. Empty means we have not inspected
 * a public API — not that the mod has none.
 */
public enum MagicCapability {
    MANA,
    SPELLS,
    ABILITIES,
    RITUALS,
    SCHOOLS,
    EFFECTS,
    RESOURCES
}
