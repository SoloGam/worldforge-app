import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useEngine } from "@/lib/worldforge/store";

export const Route = createFileRoute("/config")({ component: ConfigPage });

function ConfigPage() {
  const config = useEngine((s) => s.config);
  const setConfig = useEngine((s) => s.setConfig);
  const setIntegration = useEngine((s) => s.setIntegration);
  const resetPack = useEngine((s) => s.resetPack);
  const discover = useEngine((s) => s.discover);

  return (
    <div className="mx-auto max-w-3xl">
      <header className="mb-6">
        <p className="text-xs uppercase tracking-[0.18em] text-muted">worldforge-common.toml</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight">Configuration</h1>
        <p className="mt-3 text-muted">
          These switches mirror the Forge common config. They are meant for operators, not programmers.
        </p>
      </header>

      <section className="rounded-xl border border-border bg-bg-elevated divide-y divide-border">
        <Toggle
          title="Debug mode"
          hint="Verbose [WorldForge:*] logs. Off on production servers."
          checked={config.debugMode}
          onChange={(v) => setConfig({ debugMode: v })}
        />
        <Toggle
          title="Discover on startup"
          hint="Scan installed mods during common setup."
          checked={config.discoveryOnStartup}
          onChange={(v) => setConfig({ discoveryOnStartup: v })}
        />
        <Toggle
          title="Datapack registries"
          hint="Census biomes, enchantments, and structures when a server starts."
          checked={config.scanDatapackRegistries}
          onChange={(v) => {
            setConfig({ scanDatapackRegistries: v });
            discover();
          }}
        />
        <Toggle
          title="Experimental events"
          hint="Reserved for high-volume block/entity events. Off by default."
          checked={config.experimentalFeatures}
          onChange={(v) => setConfig({ experimentalFeatures: v })}
        />
      </section>

      <h2 className="mt-8 font-display text-2xl">Integrations</h2>
      <section className="mt-3 rounded-xl border border-border bg-bg-elevated divide-y divide-border">
        {(
          [
            ["magic", "Magic adapter"],
            ["combat", "Combat adapter"],
            ["technology", "Technology adapter"],
            ["quest", "Quest adapter"],
            ["worldgen", "Worldgen adapter"],
          ] as const
        ).map(([key, title]) => (
          <Toggle
            key={key}
            title={title}
            hint="If the target mod is absent, WorldForge skips this adapter and keeps running."
            checked={config.integrations[key]}
            onChange={(v) => setIntegration(key, v)}
          />
        ))}
      </section>

      <div className="mt-8">
        <Button variant="secondary" onClick={resetPack}>
          Reset simulated pack
        </Button>
      </div>
    </div>
  );
}

function Toggle({
  title,
  hint,
  checked,
  onChange,
}: {
  title: string;
  hint: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-4 p-4">
      <span>
        <span className="block text-sm font-medium">{title}</span>
        <span className="block text-xs text-muted mt-1">{hint}</span>
      </span>
      <Switch checked={checked} onCheckedChange={onChange} />
    </label>
  );
}
