import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MOD_SOURCE } from "@/lib/worldforge/mod-source";
import { useEngine } from "@/lib/worldforge/store";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/source")({ component: SourcePage });

function SourcePage() {
  const selected = useEngine((s) => s.selectedSource);
  const selectSource = useEngine((s) => s.selectSource);
  const [query, setQuery] = useState("");
  const files = useMemo(() => {
    const q = query.trim().toLowerCase();
    const hide = new Set(["CREDITS.txt", "LICENSE.txt", ".gitattributes", "gradlew", "gradlew.bat"]);
    return MOD_SOURCE.filter((f) => !hide.has(f.path) && (!q || f.path.toLowerCase().includes(q)));
  }, [query]);
  const current = MOD_SOURCE.find((f) => f.path === selected) ?? files[0];

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-muted">net.worldforge</p>
          <h1 className="mt-2 font-display text-4xl tracking-tight">Forge source</h1>
          <p className="mt-3 max-w-xl text-muted">
            Production Java for Minecraft 1.21.1 / Forge 52.1.0. 0.4.0 persists player knowledge and refuses NeoForge
            magic APIs instead of compiling them into this Forge jar.
          </p>
        </div>
        <Button asChild>
          <a href="/downloads/worldforge-0.4.0-forge-1.21.1.zip">
            <Download className="size-4" />
            Download MDK
          </a>
        </Button>
      </header>

      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Filter files"
        aria-label="Filter source files"
        className="mb-4"
      />

      <div className="grid lg:grid-cols-[16rem_1fr] gap-4">
        <ul className="rounded-xl border border-border bg-bg-elevated max-h-[32rem] overflow-y-auto">
          {files.map((f) => (
            <li key={f.path}>
              <button
                type="button"
                onClick={() => selectSource(f.path)}
                className={cn(
                  "w-full truncate px-3 py-2.5 text-left font-mono text-[11px] border-b border-border last:border-0",
                  current?.path === f.path ? "bg-bg-subtle text-fg" : "text-muted hover:text-fg",
                )}
              >
                {f.path.replace(/^src\/main\/java\//, "")}
              </button>
            </li>
          ))}
        </ul>
        <article className="rounded-xl border border-border bg-bg-elevated overflow-hidden min-w-0">
          <header className="border-b border-border px-4 py-2 font-mono text-xs text-muted truncate">
            {current?.path}
          </header>
          <pre className="p-4 overflow-auto max-h-[32rem] text-[12px] leading-relaxed font-mono text-fg">
            {current?.content}
          </pre>
        </article>
      </div>
    </div>
  );
}
