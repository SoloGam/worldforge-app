package net.worldforge.integration;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import net.minecraft.resources.ResourceLocation;
import net.minecraft.server.packs.resources.Resource;
import net.minecraft.server.packs.resources.ResourceManager;
import net.worldforge.api.integration.AdapterDescriptor;
import net.worldforge.api.integration.IntegrationDomain;
import net.worldforge.core.logging.LogCategory;
import net.worldforge.core.logging.WorldForgeLog;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

/**
 * Loads adapter descriptors from {@code data/worldforge/adapters/*.json}.
 * Common setup reads the copies on the classpath. Server reload replaces that
 * set with whatever the resource manager sees, including datapacks.
 * Missing or malformed files never fail WorldForge load.
 */
public final class DescriptorCatalog {
    private static final String[] FILES = {
            "/data/worldforge/adapters/magic.json",
            "/data/worldforge/adapters/combat.json",
            "/data/worldforge/adapters/technology.json",
            "/data/worldforge/adapters/quest.json",
            "/data/worldforge/adapters/worldgen.json"
    };

    private final List<AdapterDescriptor> descriptors = new ArrayList<>();

    public void load() {
        descriptors.clear();
        for (String path : FILES) {
            try (InputStream in = DescriptorCatalog.class.getResourceAsStream(path)) {
                if (in == null) {
                    WorldForgeLog.debug(LogCategory.INTEGRATION, "Adapter descriptor missing: %s", path);
                    continue;
                }
                JsonObject obj = JsonParser.parseReader(new InputStreamReader(in, StandardCharsets.UTF_8)).getAsJsonObject();
                descriptors.add(parse(obj));
            } catch (Exception ex) {
                WorldForgeLog.error(LogCategory.INTEGRATION, "Failed to read adapter descriptor " + path + " — skipping", ex);
            }
        }
        WorldForgeLog.info(LogCategory.INTEGRATION, "Adapter descriptors loaded: %d", descriptors.size());
    }

    /**
     * Replace the catalog from the live resource manager. A datapack may add or
     * override {@code worldforge:adapters/<name>.json}. If nothing parses,
     * the previous set is kept.
     */
    public void loadFromResources(ResourceManager manager) {
        Map<ResourceLocation, Resource> found = manager.listResources(
                "adapters",
                location -> "worldforge".equals(location.getNamespace()) && location.getPath().endsWith(".json")
        );
        if (found.isEmpty()) {
            WorldForgeLog.warn(LogCategory.INTEGRATION, "No adapter descriptors in the resource manager — keeping the previous set");
            return;
        }
        List<ResourceLocation> keys = new ArrayList<>(found.keySet());
        keys.sort((a, b) -> a.toString().compareTo(b.toString()));
        List<AdapterDescriptor> next = new ArrayList<>();
        for (ResourceLocation id : keys) {
            Resource resource = found.get(id);
            if (resource == null) {
                continue;
            }
            try (InputStream in = resource.open()) {
                JsonObject obj = JsonParser.parseReader(new InputStreamReader(in, StandardCharsets.UTF_8)).getAsJsonObject();
                next.add(parse(obj));
            } catch (Exception ex) {
                WorldForgeLog.error(LogCategory.INTEGRATION, "Failed to read adapter descriptor " + id + " — skipping", ex);
            }
        }
        if (next.isEmpty()) {
            WorldForgeLog.warn(LogCategory.INTEGRATION, "Every adapter descriptor failed to parse — keeping the previous set");
            return;
        }
        descriptors.clear();
        descriptors.addAll(next);
        WorldForgeLog.info(LogCategory.INTEGRATION, "Adapter descriptors from resources: %d", descriptors.size());
    }

    public Collection<AdapterDescriptor> all() {
        return List.copyOf(descriptors);
    }

    private static AdapterDescriptor parse(JsonObject obj) {
        String id = obj.get("id").getAsString();
        IntegrationDomain domain = IntegrationDomain.valueOf(obj.get("domain").getAsString());
        List<String> targets = new ArrayList<>();
        JsonArray arr = obj.getAsJsonArray("targets");
        if (arr != null) {
            for (JsonElement el : arr) {
                targets.add(el.getAsString());
            }
        }
        String policy = obj.has("bindPolicy") ? obj.get("bindPolicy").getAsString() : "documented-api-only";
        String notes = obj.has("notes") ? obj.get("notes").getAsString() : "";
        return new AdapterDescriptor(id, domain, targets, policy, notes);
    }
}
