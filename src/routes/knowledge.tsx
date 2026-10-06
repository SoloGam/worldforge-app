import { createFileRoute } from "@tanstack/react-router";
import { KnowledgeChip } from "@/components/engine/status-chip";
import { useEngine } from "@/lib/worldforge/store";
import { knowledgeCounts } from "@/lib/worldforge/engine";
import type { KnowledgeStatus } from "@/lib/worldforge/types";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/knowledge")({ component: KnowledgePage });

const FILTERS: { id: "ALL" | KnowledgeStatus; label: string }[] = [
  { id: "ALL", label: "All" },
  { id: "KNOWN", label: "Known" },
  { id: "PARTIALLY_KNOWN", label: "Partial" },
  { id: "UNKNOWN", label: "Unknown" },
];

function KnowledgePage() {
  const knowledge = useEngine((s) => s.knowledge);
  const mods = useEngine((s) => s.mods);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("ALL");
  const counts = knowledgeCounts(knowledge);
  const byId = new Map(mods.map((m) => [m.modId, m]));
  const rows = knowledge.filter((k) => filter === "ALL" || k.status === filter);

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-6">
        <p className="text-xs uppercase tracking-[0.18em] text-muted">Honesty contract</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight">Knowledge layer</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Known means WorldForge can inspect it. Partial means content or an API is visible but not adapted. Unknown
          means identity only. Status never inflates because a mod is popular. Combat bound to vanilla does not make
          Apotheosis Known.
        </p>
      </header>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <ScopeCard title="Core" body="Code in the jar. Always travels with WorldForge." />
        <ScopeCard title="Modpack" body={`Fingerprint of this pack. ${counts.known + counts.partial + counts.unknown} classified mods.`} />
        <ScopeCard title="World" body="SavedData schema 2. Fingerprint mismatch clears integration, not geography." />
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={cn(
              "h-10 px-4 rounded-full border text-sm",
              filter === f.id ? "border-border-strong bg-bg-subtle text-fg" : "border-border text-muted",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <ul className="space-y-2">
        {rows.map((k) => {
          const mod = byId.get(k.modId);
          return (
            <li key={k.modId} className="rounded-xl border border-border bg-bg-elevated p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-xs text-subtle">{k.modId}</p>
                  <h2 className="mt-1 text-sm font-medium">{mod?.displayName ?? k.modId}</h2>
                </div>
                <KnowledgeChip status={k.status} />
              </div>
              <p className="mt-2 text-sm text-muted">{k.reason}</p>
              {k.detectedApis.length > 0 && (
                <p className="mt-2 font-mono text-xs text-subtle">{k.detectedApis.join(" · ")}</p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function ScopeCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-lg border border-border bg-bg-elevated px-4 py-3">
      <p className="text-xs uppercase tracking-wider text-muted">{title}</p>
      <p className="mt-1 text-xs text-muted">{body}</p>
    </div>
  );
}
