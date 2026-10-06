import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as RefreshCw, d as Download, g as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { n as useEngine, r as knowledgeCounts } from "./router-B5oZzaYJ.mjs";
import { t as Button } from "./button-Ce15jWVf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CQb5ltc5.js
var import_jsx_runtime = require_jsx_runtime();
var ZIP = "/downloads/worldforge-0.4.0-forge-1.21.1.zip";
var LAYERS = [
	{
		name: "Minecraft",
		hint: "Vanilla world, registries, lifecycle",
		to: "/world"
	},
	{
		name: "Forge",
		hint: "Loader, events, config, SavedData",
		to: "/events"
	},
	{
		name: "WorldForge Core",
		hint: "Services, logging, bootstrap, API façade",
		to: "/source"
	},
	{
		name: "World / simulation",
		hint: "State, persistence, fingerprint, regions",
		to: "/world"
	},
	{
		name: "Compatibility layer",
		hint: "Adapters that fail closed",
		to: "/adapters"
	},
	{
		name: "Other mods",
		hint: "Discovered, never assumed",
		to: "/discovery"
	}
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-[0.18em] text-muted",
							children: "Minecraft 1.21.1 · Forge 52.1.0"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-3 font-display text-4xl sm:text-5xl leading-[1.05] tracking-tight",
							children: "The integration layer for a modpack, not another content dump."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-muted",
							children: "WorldForge discovers what is installed, classifies what it can actually inspect, and refuses to invent the rest. 0.4.0 remembers who logged in, and it records that Ars Nouveau and Iron's Spells publish NeoForge APIs — so this Forge build does not bind them."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						engine === "IDLE" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: boot,
							children: "Boot engine"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							onClick: shutdown,
							children: "Suspend"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "secondary",
							onClick: discover,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-4" }), "Rediscover"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: ZIP,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), "Gradle project"]
							})
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid grid-cols-2 lg:grid-cols-4 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Mods",
						value: mods.length || "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Known",
						value: counts.known,
						tone: "known"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Partial",
						value: counts.partial,
						tone: "partial"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Unknown",
						value: counts.unknown
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid lg:grid-cols-[1.2fr_0.8fr] gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-bg-elevated p-4 sm:p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex items-baseline justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl",
							children: "Stack"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-muted tabular-nums",
							children: [
								"Adapters bound ",
								bound,
								"/",
								adapters.length || 5
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "space-y-2",
						children: LAYERS.map((layer, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: layer.to,
							className: "group flex items-center justify-between rounded-lg border border-border bg-bg px-4 py-3 transition-colors duration-150 hover:border-border-strong",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-baseline gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs text-subtle tabular-nums",
									children: String(i + 1).padStart(2, "0")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-sm font-medium",
									children: layer.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-xs text-muted",
									children: layer.hint
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4 text-subtle group-hover:text-fg" })]
						}) }, layer.name))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-bg-elevated p-4 sm:p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl",
							children: "Vitals"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-4 space-y-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									k: "Engine",
									v: engine
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									k: "Fingerprint",
									v: fingerprint || "—",
									mono: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									k: "Schema",
									v: String(world.schema)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									k: "Players",
									v: String(world.players.length)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									k: "Combat",
									v: combat.vanillaBound ? `${combat.damageTypeCount} vanilla types` : "unbound"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									k: "Magic",
									v: magic.length ? `${magic.length} detected, not bound` : "none"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									k: "Events this session",
									v: String(events.length)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									k: "Honesty rule",
									v: "UNKNOWN stays UNKNOWN"
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-bg-elevated p-4 sm:p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl",
							children: "Log"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-3 space-y-2 max-h-48 overflow-y-auto font-mono text-xs text-muted",
							children: [logs.slice(-8).reverse().map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-subtle",
									children: [
										"[",
										line.category,
										"]"
									]
								}),
								" ",
								line.message
							] }, line.id)), logs.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Waiting for bootstrap." })]
						})]
					})]
				})]
			})
		]
	});
}
function Stat({ label, value, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-border bg-bg-elevated px-4 py-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs uppercase tracking-wider text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: `mt-2 font-display text-3xl tabular-nums ${tone === "known" ? "text-known" : tone === "partial" ? "text-partial" : ""}`,
			children: value
		})]
	});
}
function Row({ k, v, mono }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-baseline justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-muted",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: mono ? "font-mono text-xs truncate max-w-[60%] text-right" : "tabular-nums",
			children: v
		})]
	});
}
//#endregion
export { CorePage as component };
