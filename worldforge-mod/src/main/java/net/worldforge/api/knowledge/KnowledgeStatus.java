package net.worldforge.api.knowledge;

/**
 * Honesty contract: WorldForge never upgrades a mod to KNOWN unless it can
 * actually inspect or adapt it through a supported surface.
 */
public enum KnowledgeStatus {
    KNOWN,
    PARTIALLY_KNOWN,
    UNKNOWN;

    public boolean isKnown() {
        return this == KNOWN;
    }
}
