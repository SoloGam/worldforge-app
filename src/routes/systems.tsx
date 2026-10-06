import { createFileRoute } from "@tanstack/react-router";
import { KnowledgeChip } from "@/components/engine/status-chip";
import { useEngine } from "@/lib/worldforge/store";

export const Route = createFileRoute("/systems")({ component: SystemsPage });

function SystemsPage() {
  const magic = useEngine((s) => s.magic);
  const combat = useEngine((s) => s.combat);
  const busSubscribers = useEngine((s) => s.busSubscribers);

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <header>
        <p className="text-xs uppercase tracking-[0.18em] text-muted">Phases 7–8 · honesty 0.4.0</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight">Magic & combat</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Vanilla combat is an official Minecraft registry, so WorldForge binds it. Ars Nouveau and Iron's Spells
          publish their 1.21 APIs for NeoForge. This Forge build records that mismatch and leaves capabilities empty.
        </p>
      </header>

      <section className="grid sm:grid-cols-3 gap-3">
        <Stat label="Damage types" value={combat.damageTypeCount || "—"} />
        <Stat label="Attributes" value={combat.vanillaBound ? combat.attributeCount : "—"} />
        <Stat label="Bus subscribers" value={busSubscribers} />
      </section>

      <section className="rounded-xl border border-border bg-bg-elevated p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-display text-2xl">Combat snapshot</h2>
          <p className="text-xs text-muted">
            {combat.vanillaBound ? "BOUND → minecraft" : "Unbound"}
          </p>
        </div>
        {combat.extraDetectedMods.length > 0 && (
          <p className="mt-2 text-sm text-muted">
            Extra combat mods detected, not bound: {combat.extraDetectedMods.join(", ")}
          </p>
        )}
        <ul className="mt-4 flex flex-wrap gap-2">
          {combat.entityCategories.map((cat) => (
            <li key={cat.category} className="rounded-full border border-border px-3 py-1 font-mono text-xs">
              {cat.category} <span className="text-subtle">{cat.count}</span>
            </li>
          ))}
        </ul>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="pb-2 font-medium">Damage type</th>
                <th className="pb-2 font-medium">Exhaustion</th>
                <th className="pb-2 font-medium">Scaling</th>
                <th className="pb-2 font-medium">Effects</th>
              </tr>
            </thead>
            <tbody>
              {combat.damageTypes.slice(0, 18).map((type) => (
                <tr key={type.id} className="border-t border-border">
                  <td className="py-2 font-mono text-xs">{type.id}</td>
                  <td className="py-2 tabular-nums text-muted">{type.exhaustion.toFixed(1)}</td>
                  <td className="py-2 font-mono text-xs text-muted">{type.scaling}</td>
                  <td className="py-2 text-muted">{type.effects}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {combat.damageTypes.length > 18 && (
            <p className="mt-3 text-xs text-muted">… {combat.damageTypes.length - 18} more in Registries.DAMAGE_TYPE</p>
          )}
          {combat.damageTypes.length === 0 && (
            <p className="mt-3 text-sm text-muted">Enable the combat adapter and boot the engine.</p>
          )}
        </div>
      </section>

      <section className="rounded-xl border border-border bg-bg-elevated p-5">
        <h2 className="font-display text-2xl">Magic systems</h2>
        <ul className="mt-4 space-y-3">
          {magic.map((system) => (
            <li key={system.modId} className="rounded-lg border border-border bg-bg px-4 py-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-mono text-sm">{system.modId}</p>
                <KnowledgeChip status={system.status} />
              </div>
              <p className="mt-2 text-sm text-muted">{system.note}</p>
              <p className="mt-1 font-mono text-xs text-subtle">
                capabilities: {system.capabilities.length ? system.capabilities.join(", ") : "(empty)"}
              </p>
            </li>
          ))}
          {magic.length === 0 && (
            <li className="text-sm text-muted">No magic systems detected. Vanilla is not a magic mod.</li>
          )}
        </ul>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-border bg-bg-elevated px-4 py-4">
      <p className="text-xs uppercase tracking-wider text-muted">{label}</p>
      <p className="mt-2 font-display text-3xl tabular-nums">{value}</p>
    </div>
  );
}
