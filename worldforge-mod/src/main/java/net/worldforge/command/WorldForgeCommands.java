package net.worldforge.command;

import com.mojang.brigadier.Command;
import com.mojang.brigadier.arguments.StringArgumentType;
import com.mojang.brigadier.builder.LiteralArgumentBuilder;
import com.mojang.brigadier.exceptions.CommandSyntaxException;
import net.minecraft.commands.CommandSourceStack;
import net.minecraft.commands.Commands;
import net.minecraft.core.BlockPos;
import net.minecraft.network.chat.Component;
import net.minecraft.server.level.ServerPlayer;
import net.minecraftforge.event.RegisterCommandsEvent;
import net.minecraftforge.eventbus.api.SubscribeEvent;
import net.minecraftforge.fml.ModList;
import net.worldforge.WorldForge;
import net.worldforge.api.combat.CombatSnapshot;
import net.worldforge.api.integration.LoaderNote;
import net.worldforge.api.knowledge.PlayerRecord;
import net.worldforge.api.combat.DamageTypeInfo;
import net.worldforge.api.combat.EntityCategoryCount;
import net.worldforge.api.integration.AdapterDescriptor;
import net.worldforge.api.knowledge.KnowledgeStatus;
import net.worldforge.api.knowledge.ModKnowledge;
import net.worldforge.api.magic.MagicSystemDescriptor;
import net.worldforge.api.world.DimensionSnapshot;
import net.worldforge.api.world.PointOfInterest;
import net.worldforge.api.world.Region;
import net.worldforge.api.world.WorldEvent;
import net.worldforge.core.WorldForgeCore;

import java.util.Collection;
import java.util.function.Function;

/**
 * Operator diagnostics. Keep output short so it is usable on a busy server.
 */
public final class WorldForgeCommands {
    @SubscribeEvent
    public void onRegister(RegisterCommandsEvent event) {
        event.getDispatcher().register(root());
    }

    private LiteralArgumentBuilder<CommandSourceStack> root() {
        return Commands.literal("worldforge")
                .requires(src -> src.hasPermission(2))
                .then(Commands.literal("status").executes(ctx -> status(ctx.getSource())))
                .then(Commands.literal("discover").executes(ctx -> discover(ctx.getSource())))
                .then(Commands.literal("knowledge").executes(ctx -> knowledge(ctx.getSource())))
                .then(Commands.literal("world").executes(ctx -> world(ctx.getSource())))
                .then(Commands.literal("region")
                        .then(Commands.literal("list").executes(ctx -> regionList(ctx.getSource())))
                        .then(Commands.literal("here").executes(ctx -> regionHere(ctx.getSource()))))
                .then(Commands.literal("poi")
                        .then(Commands.literal("list").executes(ctx -> poiList(ctx.getSource())))
                        .then(Commands.literal("here").executes(ctx -> poiHere(ctx.getSource()))))
                .then(Commands.literal("event")
                        .then(Commands.literal("list").executes(ctx -> eventList(ctx.getSource())))
                        .then(Commands.argument("type", StringArgumentType.word())
                                .then(Commands.argument("payload", StringArgumentType.greedyString())
                                        .executes(ctx -> eventPost(
                                                ctx.getSource(),
                                                StringArgumentType.getString(ctx, "type"),
                                                StringArgumentType.getString(ctx, "payload"))))))
                .then(Commands.literal("magic").executes(ctx -> magic(ctx.getSource())))
                .then(Commands.literal("combat").executes(ctx -> combat(ctx.getSource())))
                .then(Commands.literal("player").executes(ctx -> players(ctx.getSource())))
                .then(Commands.literal("compat").executes(ctx -> compat(ctx.getSource())))
                .then(Commands.literal("bus").executes(ctx -> bus(ctx.getSource())))
                .then(Commands.literal("descriptors").executes(ctx -> descriptors(ctx.getSource())));
    }

    private int status(CommandSourceStack source) {
        WorldForgeCore core = WorldForge.core();
        int mods = core.discoveredMods().size();
        long known = core.knowledgeLayer().count(KnowledgeStatus.KNOWN);
        long partial = core.knowledgeLayer().count(KnowledgeStatus.PARTIALLY_KNOWN);
        long unknown = core.knowledgeLayer().count(KnowledgeStatus.UNKNOWN);
        CombatSnapshot combat = core.combatSnapshot();
        source.sendSuccess(() -> Component.literal(
                "WorldForge " + WorldForgeCore.VERSION
                        + " | mods " + mods
                        + " | known " + known
                        + " | partial " + partial
                        + " | unknown " + unknown
                        + " | regions " + core.regions().size()
                        + " | players " + core.players().size()
                        + " | magic " + core.magicSystems().size()
                        + " | damage-types " + combat.damageTypeCount()
                        + " | bus " + core.eventBus().subscriberCount()
                        + " | fingerprint " + core.discovery().fingerprint()
        ), false);
        return Command.SINGLE_SUCCESS;
    }

    private int discover(CommandSourceStack source) {
        WorldForge.core().runDiscovery();
        source.sendSuccess(() -> Component.literal("Discovery complete. " + WorldForge.core().discoveredMods().size() + " mods."), false);
        return Command.SINGLE_SUCCESS;
    }

    private int knowledge(CommandSourceStack source) {
        for (ModKnowledge entry : WorldForge.core().knowledgeLayer().all()) {
            String line = entry.mod().modId() + " @ " + entry.mod().version() + " — " + entry.status();
            source.sendSuccess(() -> Component.literal(line), false);
        }
        return Command.SINGLE_SUCCESS;
    }

    private int world(CommandSourceStack source) {
        DimensionSnapshot snap = WorldForge.core().dimensionSnapshot().orElse(null);
        if (snap == null) {
            source.sendFailure(Component.literal("No dimension snapshot — server world is not attached."));
            return 0;
        }
        source.sendSuccess(() -> Component.literal(
                snap.dimension() + " day " + snap.day()
                        + " t=" + snap.timeOfDay()
                        + " " + snap.weather()
                        + " " + snap.difficulty()
        ), false);
        return Command.SINGLE_SUCCESS;
    }

    private int regionList(CommandSourceStack source) {
        writeLines(source, WorldForge.core().regions(),
                r -> r.id() + " " + r.name() + " @ " + r.x() + "," + r.z() + " r=" + r.radius());
        return Command.SINGLE_SUCCESS;
    }

    private int regionHere(CommandSourceStack source) throws CommandSyntaxException {
        ServerPlayer player = source.getPlayerOrException();
        BlockPos pos = player.blockPosition();
        String dim = player.level().dimension().location().toString();
        String id = "region-" + pos.getX() + "-" + pos.getZ();
        WorldForge.core().registerRegion(new Region(id, "Marked " + id, dim, pos.getX(), pos.getZ(), 48, ""));
        source.sendSuccess(() -> Component.literal("Registered " + id), false);
        return Command.SINGLE_SUCCESS;
    }

    private int poiList(CommandSourceStack source) {
        writeLines(source, WorldForge.core().pointsOfInterest(),
                p -> p.id() + " " + p.kind() + " " + p.label() + " @ " + p.x() + "," + p.y() + "," + p.z());
        return Command.SINGLE_SUCCESS;
    }

    private int poiHere(CommandSourceStack source) throws CommandSyntaxException {
        ServerPlayer player = source.getPlayerOrException();
        BlockPos pos = player.blockPosition();
        String dim = player.level().dimension().location().toString();
        String regionId = WorldForge.core().world().regionAt(dim, pos.getX(), pos.getZ()).map(Region::id).orElse("");
        String id = "poi-" + pos.getX() + "-" + pos.getY() + "-" + pos.getZ();
        WorldForge.core().registerPointOfInterest(
                new PointOfInterest(id, regionId, "marker", "Marked location", dim, pos.getX(), pos.getY(), pos.getZ())
        );
        source.sendSuccess(() -> Component.literal("Registered " + id), false);
        return Command.SINGLE_SUCCESS;
    }

    private int eventList(CommandSourceStack source) {
        writeLines(source, WorldForge.core().recentWorldEvents(),
                e -> e.gameTime() + " " + e.type() + " " + e.payload());
        return Command.SINGLE_SUCCESS;
    }

    private int eventPost(CommandSourceStack source, String type, String payload) {
        WorldEvent posted = WorldForge.core().postWorldEvent(type, payload);
        source.sendSuccess(() -> Component.literal("Posted " + posted.id() + " " + posted.type()), false);
        return Command.SINGLE_SUCCESS;
    }

    private int magic(CommandSourceStack source) {
        Collection<MagicSystemDescriptor> systems = WorldForge.core().magicSystems();
        if (systems.isEmpty()) {
            source.sendSuccess(() -> Component.literal("No magic systems detected. Vanilla is not a magic mod."), false);
            return Command.SINGLE_SUCCESS;
        }
        writeLines(source, systems, s -> s.modId() + " " + s.status() + " caps=" + s.capabilities() + " — " + s.note());
        return Command.SINGLE_SUCCESS;
    }

    private int combat(CommandSourceStack source) {
        CombatSnapshot snap = WorldForge.core().combatSnapshot();
        Collection<DamageTypeInfo> types = WorldForge.core().damageTypes();
        if (types.isEmpty()) {
            source.sendSuccess(() -> Component.literal(
                    "Vanilla combat adapter is " + (snap.vanillaBound() ? "bound" : "unbound")
                            + " — load a world to census Registries.DAMAGE_TYPE."
            ), false);
            return Command.SINGLE_SUCCESS;
        }
        source.sendSuccess(() -> Component.literal(
                "Vanilla combat bound=" + snap.vanillaBound()
                        + " damage-types=" + snap.damageTypeCount()
                        + " attributes=" + snap.attributeCount()
                        + " extra=" + (snap.extraDetectedMods().isEmpty() ? "none" : snap.extraDetectedMods())
        ), false);
        for (EntityCategoryCount cat : snap.entityCategories()) {
            source.sendSuccess(() -> Component.literal("  entity " + cat.category() + "=" + cat.count()), false);
        }
        int n = 0;
        for (DamageTypeInfo type : types) {
            if (n++ >= 16) {
                source.sendSuccess(() -> Component.literal("… " + (types.size() - 16) + " more"), false);
                break;
            }
            String line = type.id() + " exh=" + type.exhaustion() + " " + type.scaling() + " " + type.effects();
            source.sendSuccess(() -> Component.literal(line), false);
        }
        return Command.SINGLE_SUCCESS;
    }

    private int players(CommandSourceStack source) {
        Collection<PlayerRecord> records = WorldForge.core().players();
        if (records.isEmpty()) {
            source.sendSuccess(() -> Component.literal("No player records. They are written on login."), false);
            return Command.SINGLE_SUCCESS;
        }
        writeLines(source, records, p -> p.name()
                + (p.online() ? " online" : " offline")
                + " logins=" + p.logins()
                + " dim=" + p.lastDimension()
                + " t=" + p.lastSeenDayTime());
        return Command.SINGLE_SUCCESS;
    }

    private int compat(CommandSourceStack source) {
        Collection<LoaderNote> notes = WorldForge.core().loaderNotes();
        if (notes.isEmpty()) {
            source.sendSuccess(() -> Component.literal("No loader notes."), false);
            return Command.SINGLE_SUCCESS;
        }
        for (LoaderNote note : notes) {
            boolean loaded = ModList.get().isLoaded(note.modId());
            String line = note.modId()
                    + " published=" + note.publishedLoader()
                    + " loaded=" + loaded
                    + " " + note.status()
                    + " — " + note.reason();
            source.sendSuccess(() -> Component.literal(line), false);
        }
        return Command.SINGLE_SUCCESS;
    }

    private int bus(CommandSourceStack source) {
        var eventBus = WorldForge.core().eventBus();
        source.sendSuccess(() -> Component.literal("WorldForge event bus subscribers=" + eventBus.subscriberCount()), false);
        writeLines(source, eventBus.recent(), s -> s);
        return Command.SINGLE_SUCCESS;
    }

    private int descriptors(CommandSourceStack source) {
        Collection<AdapterDescriptor> all = WorldForge.core().adapterDescriptors();
        if (all.isEmpty()) {
            source.sendSuccess(() -> Component.literal("No adapter descriptors loaded."), false);
            return Command.SINGLE_SUCCESS;
        }
        writeLines(source, all, d -> d.id() + " " + d.domain() + " policy=" + d.bindPolicy() + " targets=" + d.targets());
        return Command.SINGLE_SUCCESS;
    }

    private static <T> void writeLines(CommandSourceStack source, Collection<T> items, Function<T, String> line) {
        if (items.isEmpty()) {
            source.sendSuccess(() -> Component.literal("(none)"), false);
            return;
        }
        for (T item : items) {
            String text = line.apply(item);
            source.sendSuccess(() -> Component.literal(text), false);
        }
    }
}
