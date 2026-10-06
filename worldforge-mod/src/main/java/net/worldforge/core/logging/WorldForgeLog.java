package net.worldforge.core.logging;

import com.mojang.logging.LogUtils;
import net.worldforge.core.config.WorldForgeConfig;
import org.slf4j.Logger;

/**
 * Structured logging. Debug lines are gated so a busy modpack does not drown
 * the console during normal play.
 */
public final class WorldForgeLog {
    private static final Logger LOGGER = LogUtils.getLogger();

    private WorldForgeLog() {}

    public static void info(LogCategory category, String message, Object... args) {
        LOGGER.info("[{}] {}", category.prefix(), format(message, args));
    }

    public static void warn(LogCategory category, String message, Object... args) {
        LOGGER.warn("[{}] {}", category.prefix(), format(message, args));
    }

    public static void error(LogCategory category, String message, Throwable error) {
        LOGGER.error("[{}] {}", category.prefix(), message, error);
    }

    public static void debug(LogCategory category, String message, Object... args) {
        if (WorldForgeConfig.debugMode()) {
            LOGGER.debug("[{}] {}", category.prefix(), format(message, args));
        }
    }

    private static String format(String message, Object... args) {
        if (args == null || args.length == 0) {
            return message;
        }
        try {
            return String.format(message, args);
        } catch (RuntimeException ex) {
            return message;
        }
    }
}
