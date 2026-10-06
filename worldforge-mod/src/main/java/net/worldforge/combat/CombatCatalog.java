package net.worldforge.combat;

import net.minecraft.core.RegistryAccess;
import net.minecraft.core.registries.Registries;
import net.minecraft.resources.ResourceKey;
import net.minecraft.resources.ResourceLocation;
import net.minecraft.world.damagesource.DamageType;
import net.minecraft.world.entity.EntityType;
import net.minecraft.world.entity.ai.attributes.Attribute;
import net.minecraftforge.registries.ForgeRegistries;
import net.worldforge.api.combat.AttributeInfo;
import net.worldforge.api.combat.CombatSnapshot;
import net.worldforge.api.combat.DamageTypeInfo;
import net.worldforge.api.combat.EntityCategoryCount;
import net.worldforge.core.logging.LogCategory;
import net.worldforge.core.logging.WorldForgeLog;

import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * Vanilla combat census. One-shot on server start via {@link RegistryAccess}
 * and official Forge registries. Third-party combat mods are not reverse-engineered.
 */
public final class CombatCatalog {
    private final List<DamageTypeInfo> damageTypes = new ArrayList<>();
    private final List<AttributeInfo> attributes = new ArrayList<>();
    private final List<EntityCategoryCount> entityCategories = new ArrayList<>();
    private final List<String> extraDetected = new ArrayList<>();
    private boolean vanillaBound;

    public void clear() {
        damageTypes.clear();
        attributes.clear();
        entityCategories.clear();
        extraDetected.clear();
        vanillaBound = false;
    }

    public void attach(RegistryAccess access) {
        clear();
        long start = System.nanoTime();
        access.registry(Registries.DAMAGE_TYPE).ifPresent(registry -> {
            for (Map.Entry<ResourceKey<DamageType>, DamageType> entry : registry.entrySet()) {
                DamageType type = entry.getValue();
                damageTypes.add(new DamageTypeInfo(
                        entry.getKey().location().toString(),
                        type.exhaustion(),
                        type.scaling().getSerializedName(),
                        type.effects().getSerializedName()
                ));
            }
        });
        if (ForgeRegistries.ATTRIBUTES != null) {
            for (Attribute attribute : ForgeRegistries.ATTRIBUTES) {
                ResourceLocation id = ForgeRegistries.ATTRIBUTES.getKey(attribute);
                if (id != null) {
                    attributes.add(new AttributeInfo(id.toString()));
                }
            }
        }
        Map<String, Integer> cats = new LinkedHashMap<>();
        if (ForgeRegistries.ENTITY_TYPES != null) {
            for (EntityType<?> type : ForgeRegistries.ENTITY_TYPES) {
                String cat = type.getCategory().getName();
                cats.merge(cat, 1, Integer::sum);
            }
        }
        for (Map.Entry<String, Integer> entry : cats.entrySet()) {
            entityCategories.add(new EntityCategoryCount(entry.getKey(), entry.getValue()));
        }
        vanillaBound = !damageTypes.isEmpty();
        long ms = (System.nanoTime() - start) / 1_000_000L;
        WorldForgeLog.info(LogCategory.PERFORMANCE,
                "Vanilla combat census: %d damage types, %d attributes, %d entity categories (%d ms)",
                damageTypes.size(), attributes.size(), entityCategories.size(), ms);
    }

    public void recordExtra(String modId) {
        if (modId != null && !modId.isBlank() && !extraDetected.contains(modId)) {
            extraDetected.add(modId);
        }
    }

    public void markVanillaBound() {
        vanillaBound = true;
    }

    public Collection<DamageTypeInfo> damageTypes() {
        return List.copyOf(damageTypes);
    }

    public Collection<AttributeInfo> attributes() {
        return List.copyOf(attributes);
    }

    public Collection<EntityCategoryCount> entityCategories() {
        return List.copyOf(entityCategories);
    }

    public CombatSnapshot snapshot() {
        return new CombatSnapshot(
                vanillaBound,
                damageTypes.size(),
                attributes.size(),
                entityCategories,
                extraDetected
        );
    }
}
