import { Link, useRouterState } from "@tanstack/react-router";
import {
  BookOpen,
  Boxes,
  Cable,
  Cog,
  Globe,
  LayoutGrid,
  Map,
  Menu,
  Radio,
  SquareStack,
  Swords,
} from "lucide-react";
import { type ReactNode, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useEngine } from "@/lib/worldforge/store";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Core", icon: LayoutGrid },
  { to: "/discovery", label: "Discovery", icon: Boxes },
  { to: "/knowledge", label: "Knowledge", icon: BookOpen },
  { to: "/adapters", label: "Adapters", icon: Cable },
  { to: "/systems", label: "Systems", icon: Swords },
  { to: "/world", label: "World", icon: Globe },
  { to: "/events", label: "Events", icon: Radio },
  { to: "/source", label: "Source", icon: SquareStack },
  { to: "/config", label: "Config", icon: Cog },
  { to: "/roadmap", label: "Roadmap", icon: Map },
] as const;

const MOBILE_PRIMARY = ["/", "/discovery", "/systems", "/source"] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const engine = useEngine((s) => s.engine);
  const boot = useEngine((s) => s.boot);
  const tick = useEngine((s) => s.tick);

  useEffect(() => {
    if (useEngine.getState().engine === "IDLE") boot();
  }, [boot]);

  useEffect(() => {
    const id = window.setInterval(() => tick(), 900);
    return () => window.clearInterval(id);
  }, [tick]);

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <div className="flex min-h-dvh">
        <aside className="hidden lg:flex w-56 shrink-0 flex-col border-r border-border bg-bg-elevated">
          <div className="px-5 pt-6 pb-5">
            <p className="font-display text-2xl leading-none tracking-tight">WorldForge</p>
            <p className="mt-2 text-xs text-muted">Forge 1.21.1 · 0.4.0</p>
          </div>
          <nav className="flex-1 px-3 space-y-0.5">
            {NAV.map((item) => {
              const active = pathname === item.to;
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex h-11 items-center gap-3 rounded-md px-3 text-sm transition-colors duration-150",
                    active ? "bg-bg-subtle text-fg" : "text-muted hover:text-fg hover:bg-bg-subtle/60",
                  )}
                >
                  <Icon className="size-4 shrink-0" strokeWidth={1.7} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <EnginePill engine={engine} className="m-4" />
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="lg:hidden sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-bg/95 px-4 backdrop-blur-sm">
            <div>
              <p className="font-display text-xl leading-none">WorldForge</p>
              <p className="text-[11px] text-muted">Forge 1.21.1 · 0.4.0</p>
            </div>
            <div className="flex items-center gap-2">
              <EnginePill engine={engine} />
              <Sheet>
                <SheetTrigger className="size-11 inline-flex items-center justify-center rounded-md text-fg">
                  <Menu className="size-5" />
                  <span className="sr-only">Menu</span>
                </SheetTrigger>
                <SheetContent side="bottom" title="Navigate">
                  <nav className="grid grid-cols-2 gap-2">
                    {NAV.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.to}
                          to={item.to}
                          className="flex h-12 items-center gap-3 rounded-md border border-border bg-bg-subtle px-3 text-sm"
                        >
                          <Icon className="size-4" />
                          {item.label}
                        </Link>
                      );
                    })}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-8 pb-24 lg:pb-8">{children}</main>
        </div>
      </div>

      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 border-t border-border bg-bg-elevated/95 backdrop-blur-sm pb-[env(safe-area-inset-bottom)]">
        <div className="grid grid-cols-4">
          {NAV.filter((n) => (MOBILE_PRIMARY as readonly string[]).includes(n.to)).map((item) => {
            const Icon = item.icon;
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex h-14 flex-col items-center justify-center gap-1 text-[11px]",
                  active ? "text-fg" : "text-muted",
                )}
              >
                <Icon className="size-4" strokeWidth={1.7} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

function EnginePill({ engine, className }: { engine: string; className?: string }) {
  const live = engine === "RUNNING";
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-full border border-border bg-bg px-3 py-1.5 text-xs text-muted",
        className,
      )}
    >
      <span
        className={cn("size-1.5 rounded-full", live ? "bg-known" : engine === "IDLE" ? "bg-subtle" : "bg-partial")}
      />
      <span className="tabular-nums uppercase tracking-wider">{engine}</span>
    </div>
  );
}
