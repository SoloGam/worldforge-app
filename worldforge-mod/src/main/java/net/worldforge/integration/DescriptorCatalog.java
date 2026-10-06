package net.worldforge.integration;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
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

/**
 * Loads adapter descriptors from {@code /data/worldforge/adapters/*.json}.
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
