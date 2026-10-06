package net.worldforge.world;

import net.minecraft.server.level.ServerLevel;
import net.worldforge.api.world.DimensionSnapshot;

public final class DimensionProbe {
    private DimensionProbe() {}

    public static DimensionSnapshot capture(ServerLevel level) {
        String weather = level.isThundering() ? "thunder" : level.isRaining() ? "rain" : "clear";
        return new DimensionSnapshot(
                level.dimension().location().toString(),
                level.getDayTime(),
                weather,
                level.getDifficulty().getSerializedName()
        );
    }
}
