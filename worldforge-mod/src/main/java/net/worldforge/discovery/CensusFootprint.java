package net.worldforge.discovery;

/**
 * Size of what a census keeps. Count fields only.
 * Object headers, maps, and the strings that were discarded are not included.
 * This is not a heap dump and not a measurement of a 200-mod pack.
 */
public final class CensusFootprint {
    /** Ints on one {@code RegistryCensus}: five Forge counts and four datapack counts. */
    public static final int COUNT_FIELDS = 9;

    /** Bytes of those ints. Four bytes each. */
    public static final int PAYLOAD_BYTES_PER_RECORD = COUNT_FIELDS * 4;

    private CensusFootprint() {}

    public static long countFieldBytes(int retainedRecords) {
        if (retainedRecords <= 0) {
            return 0L;
        }
        return (long) retainedRecords * PAYLOAD_BYTES_PER_RECORD;
    }
}
