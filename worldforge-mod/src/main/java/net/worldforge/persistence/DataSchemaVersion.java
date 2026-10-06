package net.worldforge.persistence;

/**
 * Bump when the saved-data layout changes. Loaders must migrate or discard
 * incompatible world/modpack knowledge rather than crash.
 *
 * 1 — fingerprint + opaque world knowledge compound
 * 2 — adds authored Regions and PointsOfInterest lists
 * 3 — adds player-scoped records (cleared on fingerprint mismatch)
 */
public final class DataSchemaVersion {
    public static final int CURRENT = 3;

    private DataSchemaVersion() {}
}