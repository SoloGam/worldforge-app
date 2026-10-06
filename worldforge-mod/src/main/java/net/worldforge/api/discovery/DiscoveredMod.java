package net.worldforge.api.discovery;

import java.util.List;
import java.util.Objects;

public final class DiscoveredMod {
    public record Dependency(String modId, String versionRange, boolean mandatory) {}

    private final String modId;
    private final String displayName;
    private final String version;
    private final String description;
    private final List<Dependency> dependencies;

    public DiscoveredMod(
            String modId,
            String displayName,
            String version,
            String description,
            List<Dependency> dependencies
    ) {
        this.modId = Objects.requireNonNull(modId);
        this.displayName = displayName == null ? modId : displayName;
        this.version = version == null ? "unknown" : version;
        this.description = description == null ? "" : description;
        this.dependencies = List.copyOf(dependencies);
    }

    public String modId() {
        return modId;
    }

    public String displayName() {
        return displayName;
    }

    public String version() {
        return version;
    }

    public String description() {
        return description;
    }

    public List<Dependency> dependencies() {
        return dependencies;
    }
}
