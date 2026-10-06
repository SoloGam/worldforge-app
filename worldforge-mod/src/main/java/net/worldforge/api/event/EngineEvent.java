package net.worldforge.api.event;

/**
 * Internal WorldForge event names. These are not Forge events;
 * the router translates selected Forge events into this vocabulary.
 */
public enum EngineEvent {
    WORLD_LOAD,
    WORLD_SAVE,
    SERVER_START,
    SERVER_STOP,
    PLAYER_LOGIN,
    PLAYER_LOGOUT,
    DIMENSION_CHANGE,
    DISCOVERY_COMPLETE,
    ADAPTER_BOUND,
    ADAPTER_SKIPPED,
    KNOWLEDGE_RECONCILED,
    REGION_REGISTERED,
    POI_REGISTERED,
    WORLD_EVENT
}
