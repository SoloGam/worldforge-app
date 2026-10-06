package net.worldforge.world;

import net.minecraft.nbt.CompoundTag;
import net.minecraft.nbt.ListTag;
import net.worldforge.api.knowledge.PlayerRecord;

import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * Player-scoped records keyed by UUID. Cleared when the modpack fingerprint changes.
 */
public final class PlayerRegistry {
    private final Map<String, PlayerRecord> players = new LinkedHashMap<>();

    public Optional<PlayerRecord> get(String uuid) {
        return Optional.ofNullable(players.get(uuid));
    }

    public Collection<PlayerRecord> all() {
        return List.copyOf(players.values());
    }

    public void clear() {
        players.clear();
    }

    public void login(String uuid, String name, String dimension, long dayTime) {
        if (uuid == null || uuid.isBlank()) {
            return;
        }
        PlayerRecord previous = players.get(uuid);
        int logins = previous == null ? 1 : previous.logins() + 1;
        players.put(uuid, new PlayerRecord(uuid, name, logins, dimension, dayTime, true));
    }

    public void logout(String uuid, long dayTime) {
        PlayerRecord previous = players.get(uuid);
        if (previous == null) {
            return;
        }
        players.put(uuid, new PlayerRecord(
                previous.uuid(),
                previous.name(),
                previous.logins(),
                previous.lastDimension(),
                dayTime,
                false
        ));
    }

    public void dimension(String uuid, String name, String dimension, long dayTime) {
        if (uuid == null || uuid.isBlank()) {
            return;
        }
        PlayerRecord previous = players.get(uuid);
        int logins = previous == null ? 1 : previous.logins();
        String resolvedName = name == null || name.isBlank()
                ? (previous == null ? uuid : previous.name())
                : name;
        players.put(uuid, new PlayerRecord(uuid, resolvedName, logins, dimension, dayTime, true));
    }

    public ListTag save() {
        ListTag list = new ListTag();
        for (PlayerRecord player : players.values()) {
            CompoundTag tag = new CompoundTag();
            tag.putString("Uuid", player.uuid());
            tag.putString("Name", player.name());
            tag.putInt("Logins", player.logins());
            tag.putString("LastDimension", player.lastDimension());
            tag.putLong("LastSeen", player.lastSeenDayTime());
            tag.putBoolean("Online", player.online());
            list.add(tag);
        }
        return list;
    }

    public void load(ListTag list) {
        players.clear();
        if (list == null) {
            return;
        }
        for (int i = 0; i < list.size(); i++) {
            CompoundTag tag = list.getCompound(i);
            String uuid = tag.getString("Uuid");
            if (uuid.isBlank()) {
                continue;
            }
            players.put(uuid, new PlayerRecord(
                    uuid,
                    tag.getString("Name"),
                    tag.getInt("Logins"),
                    tag.getString("LastDimension"),
                    tag.getLong("LastSeen"),
                    tag.getBoolean("Online")
            ));
        }
    }
}
