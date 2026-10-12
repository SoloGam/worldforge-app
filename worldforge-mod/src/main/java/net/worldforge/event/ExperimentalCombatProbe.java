package net.worldforge.event;

import net.minecraft.world.damagesource.DamageSource;
import net.minecraft.world.entity.LivingEntity;
import net.minecraftforge.event.entity.living.LivingDamageEvent;
import net.minecraftforge.eventbus.api.SubscribeEvent;

/**
 * High-volume combat subscription. Registered only while
 * {@code experimentalFeatures} is on, and only for the lifetime of a running
 * server. Keeps a total, a one-second peak, and the latest damage-type id.
 * Does not log, cancel, rewrite damage, or store a hit list.
 */
public final class ExperimentalCombatProbe {
    private static final long WINDOW_NANOS = 1_000_000_000L;

    private boolean registered;
    private long hits;
    private double summedDamage;
    private long windowStartNanos;
    private int windowHits;
    private int peakPerSecond;
    private String lastDamageId = "";

    public boolean registered() {
        return registered;
    }

    public long hits() {
        return hits;
    }

    public double summedDamage() {
        return summedDamage;
    }

    /** Highest hits observed inside any one-second window since the counters were reset. */
    public int peakPerSecond() {
        return peakPerSecond;
    }

    /** Registry id of the latest server-side hit, or empty. One slot, overwritten. */
    public String lastDamageId() {
        return lastDamageId;
    }

    public void markRegistered() {
        registered = true;
    }

    /** Detach the flag. {@code reset} drops counters when the feature is turned off. */
    public void markUnregistered(boolean reset) {
        registered = false;
        if (reset) {
            hits = 0L;
            summedDamage = 0.0;
            windowStartNanos = 0L;
            windowHits = 0;
            peakPerSecond = 0;
            lastDamageId = "";
        }
    }

    @SubscribeEvent
    public void onLivingDamage(LivingDamageEvent event) {
        if (!registered) {
            return;
        }
        LivingEntity entity = event.getEntity();
        if (entity == null || entity.level().isClientSide()) {
            return;
        }
        hits++;
        summedDamage += event.getAmount();
        noteWindow(System.nanoTime());
        lastDamageId = damageId(event.getSource());
    }

    private void noteWindow(long now) {
        if (windowStartNanos == 0L || now - windowStartNanos >= WINDOW_NANOS) {
            windowStartNanos = now;
            windowHits = 0;
        }
        windowHits++;
        if (windowHits > peakPerSecond) {
            peakPerSecond = windowHits;
        }
    }

    private static String damageId(DamageSource source) {
        if (source == null || source.typeHolder() == null) {
            return "";
        }
        return source.typeHolder().unwrapKey()
                .map(key -> key.location().toString())
                .orElse("");
    }
}
