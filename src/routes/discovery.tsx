import { createFileRoute } from "@tanstack/react-router";
import { CATALOG } from "@/lib/worldforge/catalog";
import { useEngine } from "@/lib/worldforge/store";
import { KnowledgeChip } from "@/components/engine/status-chip";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { censusTotal } from "@/lib/worldforge/types";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/discovery")({ component: DiscoveryPage });

function DiscoveryPage() {
  const enabled = useEngine((s) => s.enabled);
  const knowledge = useEngine((s) => s.knowledge);
  const mods = useEngine((s) => s.mods);
  const toggleMod = useEngine((s) => s.toggleMod);
  const selectMod = useEngine((s) => s.selectMod);
  const selectedModId = useEngine((s) => s.selectedModId);
  const fingerprint = useEngine((s) => s.fingerprint);
  const [query, setQuery] = useState("");

  const knowledgeById = useMemo(() => new Map(knowledge.map((k) => [k.modId, k])), [knowledge]);
  const selected = CATALOG.find((m) => m.modId === selectedModId) ?? CATALOG[0];
  const selectedKnowledge = selected ? knowledgeById.get(selected.modId) : undefined;
  const selectedLive = mods.find((m) => m.modId === selected?.modId);

  const filtered = CATALOG.filter((m) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return m.modId.includes(q) || m.displayName.toLowerCase().includes(q);
  });

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-6">
        <p className="text-xs uppercase tracking-[0.18em] text-muted">Phase 3</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight">Mod discovery</h1>
        <p className="mt-3 max-w-2xl text-muted">
          WorldForge reads Forge loader metadata, then censuses registries once. Toggle a mod to simulate it joining
          or leaving the pack — the fingerprint and knowledge layer update, they are not copied blindly.
        </p>
        <p className="mt-2 font-mono text-xs text-subtle">fingerprint {fingerprint || "—"} · {mods.length} present</p>
      </header>

      <div className="mb-4">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter by id or name"
          aria-label="Filter mods"
        />
      </div>

      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-4">
        <ul className="divide-y divide-border rounded-xl border border-border bg-bg-elevated overflow-hidden">
          {filtered.map((mod) => {
            const k = knowledgeById.get(mod.modId);
            const on = enabled[mod.modId];
            const locked = mod.modId === "minecraft" || mod.modId === "forge" || mod.modId === "worldforge";
            return (
              <li key={mod.modId}>
                <button
                  type="button"
                  onClick={() => selectMod(mod.modId)}
                  className={cn(
                    "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors duration-150",
                    selectedModId === mod.modId ? "bg-bg-subtle" : "hover:bg-bg-subtle/50",
                  )}
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{mod.displayName}</p>
                    <p className="truncate font-mono text-xs text-subtle">{mod.modId} · {mod.version}</p>
                  </div>
                  {k ? <KnowledgeChip status={k.status} /> : <span className="text-xs text-subtle">off</span>}
                  <Switch
                    checked={on}
                    disabled={locked}
                    onClick={(e) => e.stopPropagation()}
                    onCheckedChange={() => toggleMod(mod.modId)}
                    aria-label={`Include ${mod.displayName}`}
                  />
                </button>
              </li>
            );
          })}
        </ul>

        {selected && (
          <aside className="rounded-xl border border-border bg-bg-elevated p-5 h-fit">
            <p className="text-xs uppercase tracking-wider text-muted">Inspector</p>
            <h2 className="mt-1 font-display text-2xl">{selected.displayName}</h2>
            <p className="mt-1 font-mono text-xs text-subtle">{selected.modId}@{selected.version}</p>
            <p className="mt-4 text-sm text-muted">{selected.description}</p>
            <div className="mt-4">{selectedKnowledge && <KnowledgeChip status={selectedKnowledge.status} />}</div>
            <p className="mt-3 text-sm">{selectedKnowledge?.reason ?? selected.notes}</p>
            <h3 className="mt-6 text-xs uppercase tracking-wider text-muted">Registry census</h3>
            <CensusTable census={selectedLive?.census ?? selected.census} />
            <h3 className="mt-6 text-xs uppercase tracking-wider text-muted">Dependencies</h3>
            <ul className="mt-2 space-y-1 text-sm">
              {selected.dependencies.length === 0 && <li className="text-muted">None declared</li>}
              {selected.dependencies.map((d) => (
                <li key={d.modId} className="font-mono text-xs">
                  {d.modId} {d.versionRange} {d.mandatory ? "required" : "optional"}
                </li>
              ))}
            </ul>
            {selected.advertisedApi && (
              <p className="mt-4 font-mono text-xs text-partial">API {selected.advertisedApi}</p>
            )}
          </aside>
        )}
      </div>
    </div>
  );
}

function CensusTable({ census }: { census: { blocks: number; items: number; entities: number; effects: number; recipeSerializers: number; biomes: number; enchantments: number; structures: number } }) {
  const rows = [
    ["Blocks", census.blocks],
    ["Items", census.items],
    ["Entities", census.entities],
    ["Effects", census.effects],
    ["Recipe serializers", census.recipeSerializers],
    ["Biomes", census.biomes],
    ["Enchantments", census.enchantments],
    ["Structures", census.structures],
  ] as const;
  return (
    <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
      {rows.map(([k, v]) => (
        <div key={k} className="flex justify-between gap-2">
          <dt className="text-muted">{k}</dt>
          <dd className="tabular-nums">{v}</dd>
        </div>
      ))}
      <div className="col-span-2 flex justify-between border-t border-border pt-1 mt-1">
        <dt className="text-muted">Total</dt>
        <dd className="tabular-nums">{censusTotal(census)}</dd>
      </div>
    </dl>
  );
}
