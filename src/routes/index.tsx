import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { knowledgeCounts } from "@/lib/worldforge/engine";
import { useEngine } from "@/lib/worldforge/store";

export const Route = createFileRoute("/")({ component: CorePage });

const ZIP = "/downloads/worldforge-0.4.0-forge-1.21.1.zip";

const LAYERS = [
  {
    name: "Minecraft",
    hint: "Vanilla world, registries, lifecycle",
    to: "/world",
  },
  {
    name: "Forge",
    hint: "Loader, events, config, SavedData",
    to: "/events",
  },
  {
    name: "WorldForge Core",
    hint: "Services, logging, bootstrap, API façade",
    to: "/source",
  },
  {
    name: "World / simulation",
    hint: "State, persistence, fingerprint, regions",
    to: "/world",
  },
  {
    name: "Compatibility layer",
    hint: "Adapters that fail closed",
    to: "/adapters",
  },
  {
    name: "Other mods",
    hint: "Discovered, never assumed",
    to: "/discovery",
  },
];

function CorePage() {
  const engine = useEngine((s) => s.engine);
  const knowledge = useEngine((s) => s.knowledge);
  const mods = useEngine((s) => s.mods);
  const adapters = useEngine((s) => s.adapters);
  const fingerprint = useEngine((s) => s.fingerprint);
  const events = useEngine((s) => s.events);
  const logs = useEngine((s) => s.logs);
  const combat = useEngine((s) => s.combat);
  const magic = useEngine((s) => s.magic);
  const world = useEngine((s) => s.world);
  const discover = useEngine((s) => s.discover);
  const boot = useEngine((s) => s.boot);
  const shutdown = useEngine((s) => s.shutdown);
  const counts = knowledgeCounts(knowledge);
  const bound = adapters.filter((a) => a.state === "BOUND").length;

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">Minecraft 1.21.1 · Forge 52.1.0</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl leading-[1.05] tracking-tight">
            The integration layer for a modpack, not another content dump.
          </h1>
          <p className="mt-4 text-muted">
            WorldForge discovers what is installed, classifies what it can actually inspect, and refuses to invent
            the rest. 0.4.0 remembers who logged in, and it records that Ars Nouveau and Iron's Spells publish NeoForge
            APIs — so this Forge build does not bind them.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {engine === "IDLE" ? (
            <Button onClick={boot}>Boot engine</Button>
          ) : (
            <Button variant="secondary" onClick={shutdown}>
              Suspend
            </Button>
          )}
          <Button variant="secondary" onClick={discover}>
            <RefreshCw className="size-4" />
            Rediscover
          </Button>
          <Button variant="ghost" asChild>
            <a href={ZIP}>
              <Download className="size-4" />
              Gradle project
            </a>
          </Button>
        </div>
      </header>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Stat label="Mods" value={mods.length || "—"} />
        <Stat label="Known" value={counts.known} tone="known" />
        <Stat label="Partial" value={counts.partial} tone="partial" />
        <Stat label="Unknown" value={counts.unknown} />
      </section>

      <section className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
        <div className="rounded-xl border border-border bg-bg-elevated p-4 sm:p-5">
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="font-display text-2xl">Stack</h2>
            <span className="text-xs text-muted tabular-nums">Adapters bound {bound}/{adapters.length || 5}</span>
          </div>
          <ol className="space-y-2">
            {LAYERS.map((layer, i) => (
              <li key={layer.name}>
                <Link
                  to={layer.to}
                  className="group flex items-center justify-between rounded-lg border border-border bg-bg px-4 py-3 transition-colors duration-150 hover:border-border-strong"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-subtle tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      <span className="block text-sm font-medium">{layer.name}</span>
                      <span className="block text-xs text-muted">{layer.hint}</span>
                    </span>
                  </span>
                  <ArrowUpRight className="size-4 text-subtle group-hover:text-fg" />
                </Link>
              </li>
            ))}
          </ol>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-bg-elevated p-4 sm:p-5">
            <h2 className="font-display text-2xl">Vitals</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <Row k="Engine" v={engine} />
              <Row k="Fingerprint" v={fingerprint || "—"} mono />
              <Row k="Schema" v={String(world.schema)} />
              <Row k="Players" v={String(world.players.length)} />
              <Row k="Combat" v={combat.vanillaBound ? `${combat.damageTypeCount} vanilla types` : "unbound"} />
              <Row k="Magic" v={magic.length ? `${magic.length} detected, not bound` : "none"} />
              <Row k="Events this session" v={String(events.length)} />
              <Row k="Honesty rule" v="UNKNOWN stays UNKNOWN" />
            </dl>
          </div>
          <div className="rounded-xl border border-border bg-bg-elevated p-4 sm:p-5">
            <h2 className="font-display text-2xl">Log</h2>
            <ul className="mt-3 space-y-2 max-h-48 overflow-y-auto font-mono text-xs text-muted">
              {logs.slice(-8).reverse().map((line) => (
                <li key={line.id}>
                  <span className="text-subtle">[{line.category}]</span> {line.message}
                </li>
              ))}
              {logs.length === 0 && <li>Waiting for bootstrap.</li>}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string | number; tone?: "known" | "partial" }) {
  return (
    <div className="rounded-lg border border-border bg-bg-elevated px-4 py-4">
      <p className="text-xs uppercase tracking-wider text-muted">{label}</p>
      <p className={`mt-2 font-display text-3xl tabular-nums ${tone === "known" ? "text-known" : tone === "partial" ? "text-partial" : ""}`}>
        {value}
      </p>
    </div>
  );
}

function Row({ k, v, mono }: { k: string; v: string; mono?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-muted">{k}</dt>
      <dd className={mono ? "font-mono text-xs truncate max-w-[60%] text-right" : "tabular-nums"}>{v}</dd>
    </div>
  );
}
