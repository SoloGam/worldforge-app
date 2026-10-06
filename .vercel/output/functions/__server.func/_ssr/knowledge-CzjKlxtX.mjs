import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as useEngine, o as cn, r as knowledgeCounts } from "./router-B5oZzaYJ.mjs";
import { n as KnowledgeChip } from "./status-chip-CYTXmPg9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/knowledge-CzjKlxtX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FILTERS = [
	{
		id: "ALL",
		label: "All"
	},
	{
		id: "KNOWN",
		label: "Known"
	},
	{
		id: "PARTIALLY_KNOWN",
		label: "Partial"
	},
	{
		id: "UNKNOWN",
		label: "Unknown"
	}
];
function KnowledgePage() {
	const knowledge = useEngine((s) => s.knowledge);
	const mods = useEngine((s) => s.mods);
	const [filter, setFilter] = (0, import_react.useState)("ALL");
	const counts = knowledgeCounts(knowledge);
	const byId = new Map(mods.map((m) => [m.modId, m]));
	const rows = knowledge.filter((k) => filter === "ALL" || k.status === filter);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.18em] text-muted",
						children: "Honesty contract"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-4xl tracking-tight",
						children: "Knowledge layer"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-2xl text-muted",
						children: "Known means WorldForge can inspect it. Partial means content or an API is visible but not adapted. Unknown means identity only. Status never inflates because a mod is popular. Combat bound to vanilla does not make Apotheosis Known."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-3 gap-3 mb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScopeCard, {
						title: "Core",
						body: "Code in the jar. Always travels with WorldForge."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScopeCard, {
						title: "Modpack",
						body: `Fingerprint of this pack. ${counts.known + counts.partial + counts.unknown} classified mods.`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScopeCard, {
						title: "World",
						body: "SavedData schema 2. Fingerprint mismatch clears integration, not geography."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2 mb-4",
				children: FILTERS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setFilter(f.id),
					className: cn("h-10 px-4 rounded-full border text-sm", filter === f.id ? "border-border-strong bg-bg-subtle text-fg" : "border-border text-muted"),
					children: f.label
				}, f.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: rows.map((k) => {
					const mod = byId.get(k.modId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-xl border border-border bg-bg-elevated p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-xs text-subtle",
									children: k.modId
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-1 text-sm font-medium",
									children: mod?.displayName ?? k.modId
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KnowledgeChip, { status: k.status })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: k.reason
							}),
							k.detectedApis.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-mono text-xs text-subtle",
								children: k.detectedApis.join(" · ")
							})
						]
					}, k.modId);
				})
			})
		]
	});
}
function ScopeCard({ title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-border bg-bg-elevated px-4 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs uppercase tracking-wider text-muted",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-xs text-muted",
			children: body
		})]
	});
}
//#endregion
export { KnowledgePage as component };
