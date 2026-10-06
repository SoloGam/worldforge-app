import { createFileRoute } from "@tanstack/react-router";
import { AdapterChip } from "@/components/engine/status-chip";
import { Switch } from "@/components/ui/switch";
import { useEngine } from "@/lib/worldforge/store";
import type { WorldForgeConfig } from "@/lib/worldforge/types";

export const Route = createFileRoute("/adapters")({ component: AdaptersPage });

const KEYS: { domain: string; key: keyof WorldForgeConfig["integrations"] }[] = [
  { domain: "MAGIC", key: "magic" },
  { domain: "COMBAT", key: "combat" },
  { domain: "TECHNOLOGY", key: "technology" },
  { domain: "QUEST", key: "quest" },
  { domain: "WORLDGEN", key: "worldgen" },
];

function AdaptersPage() {
  const adapters = useEngine((s) => s.adapters);
  const config = useEngine((s) => s.config);
  const setIntegration = useEngine((s) => s.setIntegration);
  const mods = useEngine((s) => s.mods);
  const present = new Set(mods.map((m) => m.modId));

  return (
    <div className="mx-auto max-w-4xl">
      <header className="mb-6">
        <p className="text-xs uppercase tracking-[0.18em] text-muted">Phase 5 + 7–8</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight">Adapters</h1>
        <p className="mt-3 text-muted">
          Optional integrations are isolated from core. Combat binds vanilla through the official damage-type
          registry. Magic and the rest detect a target and refuse to bind — presence is not an API.
        </p>
      </header>

      <ul className="space-y-3">
        {adapters.map((adapter) => {
          const toggle = KEYS.find((k) => k.domain === adapter.domain);
          return (
            <li key={adapter.id} className="rounded-xl border border-border bg-bg-elevated p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-xs text-subtle">{adapter.id}</p>
                  <h2 className="mt-1 font-display text-2xl">{adapter.domain}</h2>
                  <p className="mt-1 font-mono text-[11px] text-subtle">{adapter.bindPolicy}</p>
                </div>
                <div className="flex items-center gap-3">
                  <AdapterChip state={adapter.state} />
                  {toggle && (
                    <Switch
                      checked={config.integrations[toggle.key]}
                      onCheckedChange={(v) => setIntegration(toggle.key, v)}
                      aria-label={`Enable ${adapter.domain} adapter`}
                    />
                  )}
                </div>
              </div>
              <p className="mt-3 text-sm text-muted">{adapter.summary}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {adapter.targetModIds.map((id) => (
                  <li
                    key={id}
                    className="rounded-full border border-border px-3 py-1 font-mono text-xs"
                  >
                    {id}
                    <span className="text-subtle">
                      {" "}
                      {present.has(id) ? (adapter.boundTarget === id && adapter.state === "BOUND" ? "bound" : "loaded") : "absent"}
                    </span>
                  </li>
                ))}
              </ul>
              {adapter.state === "BOUND" && adapter.boundTarget && (
                <p className="mt-3 text-sm">
                  Bound <span className="font-mono">{adapter.boundTarget}</span>
                  {adapter.extraDetected.length
                    ? ` — extras detected, not bound: ${adapter.extraDetected.join(", ")}.`
                    : "."}
                </p>
              )}
              {adapter.boundTarget && adapter.state === "SKIPPED_NO_API" && (
                <p className="mt-3 text-sm">
                  Saw <span className="font-mono">{adapter.boundTarget}</span> — no official binding in this version.
                </p>
              )}
            </li>
          );
        })}
        {adapters.length === 0 && (
          <li className="text-muted">Boot the engine to register adapters.</li>
        )}
      </ul>
    </div>
  );
}
