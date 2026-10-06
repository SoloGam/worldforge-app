package net.worldforge.core.logging;

public enum LogCategory {
    CORE("WorldForge"),
    DISCOVERY("WorldForge:Discovery"),
    INTEGRATION("WorldForge:Integration"),
    WORLD("WorldForge:World"),
    PERFORMANCE("WorldForge:Performance"),
    COMPATIBILITY("WorldForge:Compatibility");

    private final String prefix;

    LogCategory(String prefix) {
        this.prefix = prefix;
    }

    public String prefix() {
        return prefix;
    }
}
