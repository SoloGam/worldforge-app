import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEngine } from "@/lib/worldforge/store";

export const Route = createFileRoute("/world")({ component: WorldPage });

function WorldPage() {
  const world = useEngine((s) => s.world);
  const fingerprint = useEngine((s) => s.fingerprint);
  const emitPlayer = useEngine((s) => s.emitPlayer);
  const addRegion = useEngine((s) => s.addRegion);
  const addPoi = useEngine((s) => s.addPoi);
  const postWorldEvent = useEngine((s) => s.postWorldEvent);
  const [regionName, setRegionName] = useState("");
  const [poiLabel, setPoiLabel] = useState("");
  const [eventType, setEventType] = useState("raid");
  const [eventPayload, setEventPayload] = useState("village_bell");
  const hour = Math.floor(world.timeOfDay / 1000);
  const clock = `${String((6 + hour) % 24).padStart(2, "0")}:${String(
    Math.floor(((world.timeOfDay % 1000) / 1000) * 60),
  ).padStart(2, "0")}`;

  return (
    <div className="mx-auto max-w-5xl">
      <header className="mb-6">
        <p className="text-xs uppercase tracking-[0.18em] text-muted">Schema 3</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight">World systems</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Dimension snapshot, authored regions, points of interest, and player records. Nothing here is produced by
          scanning chunks. A modpack fingerprint change drops player knowledge and keeps geography.
        </p>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <Fact label="Dimension" value={world.dimension} mono />
        <Fact label="Day" value={String(world.day)} />
        <Fact label="Clock" value={clock} />
        <Fact label="Weather" value={world.weather} />
        <Fact label="Difficulty" value={world.difficulty} />
        <Fact label="Players" value={String(world.players.length)} />
        <Fact label="Fingerprint" value={fingerprint || "—"} mono />
        <Fact label="Schema" value={String(world.schema)} />
      </div>

      <section className="rounded-xl border border-border bg-bg-elevated p-5 mb-6">
        <h2 className="font-display text-2xl">Players</h2>
        <ul className="mt-3 divide-y divide-border">
          {world.players.map((p) => (
            <li key={p.uuid} className="flex items-baseline justify-between gap-4 py-3">
              <div>
                <p className="font-medium">
                  {p.name}{" "}
                  <span className="text-xs text-muted">{p.online ? "online" : "offline"}</span>
                </p>
                <p className="text-xs text-muted">
                  {p.logins} login{p.logins === 1 ? "" : "s"} · {p.lastDimension}
                </p>
              </div>
              <p className="font-mono text-xs text-subtle tabular-nums">t={p.lastSeenDayTime}</p>
            </li>
          ))}
          {world.players.length === 0 && (
            <li className="py-3 text-sm text-muted">No player records. A pack change clears them.</li>
          )}
        </ul>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button size="sm" variant="secondary" onClick={() => emitPlayer("Ava", true)}>
            Player login
          </Button>
          <Button size="sm" variant="ghost" onClick={() => emitPlayer("Ava", false)}>
            Player logout
          </Button>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-bg-elevated p-5 mb-6">
        <h2 className="font-display text-2xl">Regions</h2>
        <p className="mt-1 text-sm text-muted">Authored circles. `/worldforge region here` does the same in-game.</p>
        <ul className="mt-4 divide-y divide-border">
          {world.regions.map((r) => (
            <li key={r.id} className="flex items-baseline justify-between py-3 gap-4">
              <div>
                <p className="font-medium">{r.name}</p>
                <p className="text-xs text-muted">
                  {r.biome} · r={r.radius}
                </p>
              </div>
              <p className="font-mono text-xs text-subtle tabular-nums">
                {r.x}, {r.z}
              </p>
            </li>
          ))}
        </ul>
        <form
          className="mt-4 flex flex-col sm:flex-row gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            addRegion(regionName);
            setRegionName("");
          }}
        >
          <Input
            value={regionName}
            onChange={(e) => setRegionName(e.target.value)}
            placeholder="Region name"
            aria-label="Region name"
          />
          <Button type="submit" variant="secondary" size="sm">
            Register region
          </Button>
        </form>
      </section>

      <section className="rounded-xl border border-border bg-bg-elevated p-5 mb-6">
        <h2 className="font-display text-2xl">Points of interest</h2>
        <ul className="mt-4 divide-y divide-border">
          {world.pois.map((p) => (
            <li key={p.id} className="flex items-baseline justify-between py-3 gap-4">
              <div>
                <p className="font-medium">{p.label}</p>
                <p className="text-xs text-muted">
                  {p.kind}
                  {p.regionId ? ` · ${p.regionId}` : ""}
                </p>
              </div>
              <p className="font-mono text-xs text-subtle tabular-nums">
                {p.x}, {p.y}, {p.z}
              </p>
            </li>
          ))}
        </ul>
        <form
          className="mt-4 flex flex-col sm:flex-row gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            addPoi(poiLabel, "marker");
            setPoiLabel("");
          }}
        >
          <Input
            value={poiLabel}
            onChange={(e) => setPoiLabel(e.target.value)}
            placeholder="POI label"
            aria-label="Point of interest label"
          />
          <Button type="submit" variant="secondary" size="sm">
            Register POI
          </Button>
        </form>
      </section>

      <section className="rounded-xl border border-border bg-bg-elevated p-5">
        <h2 className="font-display text-2xl">World events</h2>
        <p className="mt-1 text-sm text-muted">Pack-authored, ephemeral. Not Forge events and not a tick bus.</p>
        <ul className="mt-4 space-y-2 max-h-56 overflow-y-auto">
          {[...world.worldEvents].reverse().map((e) => (
            <li key={e.id} className="font-mono text-xs">
              <span className="text-subtle tabular-nums">{e.gameTime}</span> {e.type} {e.payload}
            </li>
          ))}
        </ul>
        <form
          className="mt-4 grid sm:grid-cols-[8rem_1fr_auto] gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            postWorldEvent(eventType, eventPayload);
          }}
        >
          <Input
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            placeholder="type"
            aria-label="Event type"
          />
          <Input
            value={eventPayload}
            onChange={(e) => setEventPayload(e.target.value)}
            placeholder="payload"
            aria-label="Event payload"
          />
          <Button type="submit" variant="secondary" size="sm">
            Post
          </Button>
        </form>
      </section>
    </div>
  );
}

function Fact({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="rounded-lg border border-border bg-bg-elevated px-4 py-4 min-w-0">
      <p className="text-xs uppercase tracking-wider text-muted">{label}</p>
      <p className={`mt-2 text-sm truncate ${mono ? "font-mono text-xs" : "tabular-nums"}`}>{value}</p>
    </div>
  );
}
