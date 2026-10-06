import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as useEngine } from "./router-B5oZzaYJ.mjs";
import { t as AdapterChip } from "./status-chip-CYTXmPg9.mjs";
import { t as Switch } from "./switch-BKVqOMMq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/adapters-DhBcroA5.js
var import_jsx_runtime = require_jsx_runtime();
var KEYS = [
	{
		domain: "MAGIC",
		key: "magic"
	},
	{
		domain: "COMBAT",
		key: "combat"
	},
	{
		domain: "TECHNOLOGY",
		key: "technology"
	},
	{
		domain: "QUEST",
		key: "quest"
	},
	{
		domain: "WORLDGEN",
		key: "worldgen"
	}
];
function AdaptersPage() {
	const adapters = useEngine((s) => s.adapters);
	const config = useEngine((s) => s.config);
	const setIntegration = useEngine((s) => s.setIntegration);
	const mods = useEngine((s) => s.mods);
	const present = new Set(mods.map((m) => m.modId));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-4xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-[0.18em] text-muted",
					children: "Phase 5 + 7–8"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-4xl tracking-tight",
					children: "Adapters"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-muted",
					children: "Optional integrations are isolated from core. Combat binds vanilla through the official damage-type registry. Magic and the rest detect a target and refuse to bind — presence is not an API."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
			className: "space-y-3",
			children: [adapters.map((adapter) => {
				const toggle = KEYS.find((k) => k.domain === adapter.domain);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-xl border border-border bg-bg-elevated p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-xs text-subtle",
									children: adapter.id
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-1 font-display text-2xl",
									children: adapter.domain
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 font-mono text-[11px] text-subtle",
									children: adapter.bindPolicy
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdapterChip, { state: adapter.state }), toggle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									checked: config.integrations[toggle.key],
									onCheckedChange: (v) => setIntegration(toggle.key, v),
									"aria-label": `Enable ${adapter.domain} adapter`
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted",
							children: adapter.summary
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 flex flex-wrap gap-2",
							children: adapter.targetModIds.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "rounded-full border border-border px-3 py-1 font-mono text-xs",
								children: [id, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-subtle",
									children: [" ", present.has(id) ? adapter.boundTarget === id && adapter.state === "BOUND" ? "bound" : "loaded" : "absent"]
								})]
							}, id))
						}),
						adapter.state === "BOUND" && adapter.boundTarget && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-sm",
							children: [
								"Bound ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono",
									children: adapter.boundTarget
								}),
								adapter.extraDetected.length ? ` — extras detected, not bound: ${adapter.extraDetected.join(", ")}.` : "."
							]
						}),
						adapter.boundTarget && adapter.state === "SKIPPED_NO_API" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-sm",
							children: [
								"Saw ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono",
									children: adapter.boundTarget
								}),
								" — no official binding in this version."
							]
						})
					]
				}, adapter.id);
			}), adapters.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "text-muted",
				children: "Boot the engine to register adapters."
			})]
		})]
	});
}
//#endregion
export { AdaptersPage as component };
