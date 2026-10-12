package net.worldforge.discovery;

/**
 * Cost of one census. Registry keys are visited and dropped.
 * Only per-namespace counts are retained.
 */
public final class CensusPass {
    private final int passes;
    private final long keysVisited;
    private final int retained;

    public CensusPass(int passes, long keysVisited, int retained) {
        this.passes = Math.max(0, passes);
        this.keysVisited = Math.max(0L, keysVisited);
        this.retained = Math.max(0, retained);
    }

    public static CensusPass none() {
        return new CensusPass(0, 0L, 0);
    }

    /** How many registries were walked. One walk, not one per mod. */
    public int passes() {
        return passes;
    }

    /** Keys read and discarded. Not stored. */
    public long keysVisited() {
        return keysVisited;
    }

    /** Count records kept afterwards. One per discovered namespace. */
    public int retained() {
        return retained;
    }

    /**
     * Keys the 0.5.0 loop would have read: each registry walked once per namespace.
     * This is {@code keysVisited * retained}, not a second measured run.
     */
    public long repeatedShapeVisits() {
        if (retained <= 0) {
            return 0L;
        }
        return keysVisited * retained;
    }
}
