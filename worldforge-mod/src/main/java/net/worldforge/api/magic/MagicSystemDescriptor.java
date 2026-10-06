package net.worldforge.api.magic;

import net.worldforge.api.knowledge.KnowledgeStatus;

import java.util.Objects;
import java.util.Set;

/**
 * Informational record of a detected magic system.
 * Binding a live API is a separate step; this never invents mana or spells.
 */
public final class MagicSystemDescriptor {
    private final String modId;
    private final KnowledgeStatus status;
    private final Set<MagicCapability> capabilities;
    private final String note;

    public MagicSystemDescriptor(String modId, KnowledgeStatus status, Set<MagicCapability> capabilities, String note) {
        this.modId = Objects.requireNonNull(modId);
        this.status = Objects.requireNonNull(status);
        this.capabilities = Set.copyOf(capabilities);
        this.note = note == null ? "" : note;
    }

    public String modId() {
        return modId;
    }

    public KnowledgeStatus status() {
        return status;
    }

    public Set<MagicCapability> capabilities() {
        return capabilities;
    }

    public String note() {
        return note;
    }
}
