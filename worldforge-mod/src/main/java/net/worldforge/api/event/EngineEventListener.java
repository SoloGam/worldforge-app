package net.worldforge.api.event;

/**
 * Subscriber for WorldForge's own event vocabulary.
 * This is not a Forge event listener — other mods register here through
 * {@link WorldForgeEventBus} without touching MinecraftForge.EVENT_BUS.
 */
@FunctionalInterface
public interface EngineEventListener {
    void onEngineEvent(EngineEvent event, String detail);
}
