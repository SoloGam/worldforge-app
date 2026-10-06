import { createFileRoute } from "@tanstack/react-router";
import { useEngine } from "@/lib/worldforge/store";

export const Route = createFileRoute("/events")({ component: EventsPage });

function EventsPage() {
  const events = useEngine((s) => s.events);
  const logs = useEngine((s) => s.logs);
  const debugMode = useEngine((s) => s.config.debugMode);
  const busSubscribers = useEngine((s) => s.busSubscribers);

  return (
    <div className="mx-auto max-w-5xl">
      <header className="mb-6">
        <p className="text-xs uppercase tracking-[0.18em] text-muted">Event router + public bus</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight">Events</h1>
        <p className="mt-3 max-w-2xl text-muted">
          The Forge subscriber is deliberately narrow: server start/stop, login, logout, dimension change. Other mods
          subscribe to WorldForgeEventBus — not MinecraftForge.EVENT_BUS. High-volume block and entity events stay off
          unless experimental mode is enabled.
        </p>
      </header>

      <p className="mb-4 text-sm text-muted">
        Public bus subscribers: <span className="tabular-nums text-fg">{busSubscribers}</span> (internal debug logger)
      </p>

      <div className="grid lg:grid-cols-2 gap-4">
        <section className="rounded-xl border border-border bg-bg-elevated p-5">
          <h2 className="font-display text-2xl">Engine bus</h2>
          <ul className="mt-4 space-y-3 max-h-[28rem] overflow-y-auto">
            {[...events].reverse().map((e) => (
              <li key={e.id} className="border-b border-border pb-3 last:border-0">
                <p className="font-mono text-xs text-subtle tabular-nums">
                  {new Date(e.ts).toLocaleTimeString()} · {e.name}
                </p>
                <p className="mt-1 text-sm">{e.detail}</p>
              </li>
            ))}
            {events.length === 0 && <li className="text-muted">No events yet.</li>}
          </ul>
        </section>
        <section className="rounded-xl border border-border bg-bg-elevated p-5">
          <h2 className="font-display text-2xl">Log categories</h2>
          <p className="mt-1 text-xs text-muted">{debugMode ? "Debug on" : "Debug hidden — enable in Config"}</p>
          <ul className="mt-4 space-y-2 max-h-[28rem] overflow-y-auto font-mono text-xs">
            {[...logs].reverse().map((line) => (
              <li key={line.id}>
                <span className="text-subtle">[{line.category}]</span> {line.message}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
