package net.worldforge.knowledge;

/**
 * Knowledge is partitioned so a world cannot inherit incompatible
 * integration state from another modpack.
 */
public enum KnowledgeScope {
    CORE,
    MODPACK,
    WORLD,
    PLAYER
}
