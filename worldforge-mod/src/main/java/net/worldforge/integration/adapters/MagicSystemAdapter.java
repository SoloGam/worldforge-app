package net.worldforge.integration.adapters;

import net.minecraftforge.fml.ModList;
import net.worldforge.api.integration.AdapterState;
import net.worldforge.api.integration.IntegrationDomain;
import net.worldforge.api.knowledge.KnowledgeStatus;
import net.worldforge.api.magic.MagicSystemDescriptor;
import net.worldforge.core.logging.LogCategory;
import net.worldforge.core.logging.WorldForgeLog;
import net.worldforge.integration.LoaderCompatibilityCatalog;
import net.worldforge.integration.NoOpAdapter;
import net.worldforge.magic.MagicCatalog;

import java.util.Set;

/**
 * Magic-system adapter.
 *
 * Known targets (not Maven dependencies):
 * - ars_nouveau: 1.21.x API is NeoForge. Not compiled into this Forge jar.
 * - irons_spellbooks: Forge API is documented for 1.20.1 and below; 1.21 is NeoForge.
 *
 * Detecting a magic mod is not the same as understanding it. This adapter
 * records the loader mismatch and refuses to bind.
 */
public final class MagicSystemAdapter extends NoOpAdapter {
    private final MagicCatalog catalog;

    public MagicSystemAdapter(boolean enabled, MagicCatalog catalog) {
        super("worldforge:magic", IntegrationDomain.MAGIC, Set.of("ars_nouveau", "irons_spellbooks"), enabled);
        this.catalog = catalog;
    }

    @Override
    public boolean tryBind() {
        catalog.clear();
        if (!enabled()) {
            setState(AdapterState.SKIPPED_DISABLED);
            WorldForgeLog.debug(LogCategory.INTEGRATION, "%s disabled by config", id());
            return false;
        }
        int found = 0;
        for (String target : targetModIds()) {
            if (!ModList.get().isLoaded(target)) {
                continue;
            }
            found++;
            var note = LoaderCompatibilityCatalog.find(target);
            catalog.record(new MagicSystemDescriptor(
                    target,
                    note.map(n -> n.status()).orElse(KnowledgeStatus.PARTIALLY_KNOWN),
                    Set.of(),
                    note.map(n -> n.reason()).orElse(
                            "Mod loaded. No official magic API is compiled into WorldForge; capabilities stay empty.")
            ));
        }
        if (found == 0) {
            setState(AdapterState.SKIPPED_MISSING_TARGET);
            WorldForgeLog.debug(LogCategory.INTEGRATION, "%s: no magic target loaded", id());
            return false;
        }
        setState(AdapterState.SKIPPED_NO_API);
        WorldForgeLog.info(LogCategory.INTEGRATION,
                "%s recorded %d magic system(s) as PARTIALLY_KNOWN — not bound", id(), found);
        return false;
    }
}
