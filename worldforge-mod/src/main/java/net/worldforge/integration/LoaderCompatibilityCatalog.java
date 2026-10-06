package net.worldforge.integration;

import net.worldforge.api.integration.LoaderNote;
import net.worldforge.api.integration.PublishedLoader;
import net.worldforge.api.knowledge.KnowledgeStatus;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

/**
 * Static record of loader mismatches. WorldForge is a Forge 1.21.1 mod.
 * Compiling a NeoForge API into this jar would be a hard wrong-loader dependency,
 * so these entries stay PARTIALLY_KNOWN and are never bound.
 */
public final class LoaderCompatibilityCatalog {
    private static final List<LoaderNote> NOTES = List.of(
            new LoaderNote(
                    "ars_nouveau",
                    PublishedLoader.NEOFORGE,
                    KnowledgeStatus.PARTIALLY_KNOWN,
                    "Ars Nouveau 1.21.x publishes its API on NeoForge (net.neoforged), including ArsNouveauAPI. "
                            + "WorldForge targets Forge 52.1.0 and does not compile that API. Capabilities stay empty."
            ),
            new LoaderNote(
                    "irons_spellbooks",
                    PublishedLoader.NEOFORGE,
                    KnowledgeStatus.PARTIALLY_KNOWN,
                    "Iron's Spells documents a Forge API for 1.20.1 and below. The 1.21 line is NeoForge. "
                            + "WorldForge will not bind it on Forge 1.21.1."
            )
    );

    private LoaderCompatibilityCatalog() {}

    public static Collection<LoaderNote> all() {
        return NOTES;
    }

    public static Optional<LoaderNote> find(String modId) {
        if (modId == null) {
            return Optional.empty();
        }
        for (LoaderNote note : NOTES) {
            if (note.modId().equals(modId)) {
                return Optional.of(note);
            }
        }
        return Optional.empty();
    }
}
