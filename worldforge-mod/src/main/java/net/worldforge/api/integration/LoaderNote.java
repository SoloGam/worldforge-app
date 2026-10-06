package net.worldforge.api.integration;

import net.worldforge.api.knowledge.KnowledgeStatus;

import java.util.Objects;

/**
 * Why a detected mod stays unbound. Popularity never upgrades this to KNOWN.
 */
public final class LoaderNote {
    private final String modId;
    private final PublishedLoader publishedLoader;
    private final KnowledgeStatus status;
    private final String reason;

    public LoaderNote(String modId, PublishedLoader publishedLoader, KnowledgeStatus status, String reason) {
        this.modId = Objects.requireNonNull(modId);
        this.publishedLoader = publishedLoader == null ? PublishedLoader.UNKNOWN : publishedLoader;
        this.status = status == null ? KnowledgeStatus.UNKNOWN : status;
        this.reason = reason == null ? "" : reason;
    }

    public String modId() { return modId; }
    public PublishedLoader publishedLoader() { return publishedLoader; }
    public KnowledgeStatus status() { return status; }
    public String reason() { return reason; }
}
