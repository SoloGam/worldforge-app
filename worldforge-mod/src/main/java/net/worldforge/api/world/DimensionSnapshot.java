package net.worldforge.api.world;

import java.util.Objects;

/**
 * Cheap, point-in-time view of one dimension. Captured on demand — never by ticking the world.
 */
public final class DimensionSnapshot {
    private final String dimension;
    private final long dayTime;
    private final int day;
    private final long timeOfDay;
    private final String weather;
    private final String difficulty;

    public DimensionSnapshot(String dimension, long dayTime, String weather, String difficulty) {
        this.dimension = Objects.requireNonNull(dimension);
        this.dayTime = dayTime;
        this.day = (int) (dayTime / 24000L);
        this.timeOfDay = Math.floorMod(dayTime, 24000L);
        this.weather = weather == null ? "clear" : weather;
        this.difficulty = difficulty == null ? "normal" : difficulty;
    }

    public String dimension() { return dimension; }
    public long dayTime() { return dayTime; }
    public int day() { return day; }
    public long timeOfDay() { return timeOfDay; }
    public String weather() { return weather; }
    public String difficulty() { return difficulty; }
}
