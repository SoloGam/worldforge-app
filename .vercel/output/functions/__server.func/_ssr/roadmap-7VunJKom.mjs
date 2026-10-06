import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Badge } from "./badge-CVNgWDCX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/roadmap-7VunJKom.js
var import_jsx_runtime = require_jsx_runtime();
var PHASES = [
	{
		n: 1,
		title: "Project foundation",
		state: "done",
		body: "Forge 1.21.1 workspace, Gradle, main mod class, config, logging, lifecycle."
	},
	{
		n: 2,
		title: "Core architecture",
		state: "done",
		body: "Service registry, event router, API façade, data layer."
	},
	{
		n: 3,
		title: "Mod discovery",
		state: "done",
		body: "Loader metadata, registry census, knowledge representation."
	},
	{
		n: 4,
		title: "Persistent knowledge",
		state: "done",
		body: "SavedData, schema version, modpack fingerprint, save/load."
	},
	{
		n: 5,
		title: "Integration API",
		state: "done",
		body: "Generic adapters, integration manager, fail-closed optional targets."
	},
	{
		n: 6,
		title: "World systems",
		state: "done",
		body: "Dimension snapshot, authored regions, POIs, pack-authored world events. Schema 2."
	},
	{
		n: 7,
		title: "Magic framework",
		state: "done",
		body: "Descriptor catalog. Ars Nouveau / Iron's Spells detected, not compiled against."
	},
	{
		n: 8,
		title: "Combat framework",
		state: "done",
		body: "Vanilla damage types, attributes, entity categories. Extra combat mods stay unbound."
	},
	{
		n: 9,
		title: "Advanced systems",
		state: "next",
		body: "0.4.0 persists player knowledge and ships a disabled Ars bridge. A real magic bind still needs a Forge-published API."
	},
	{
		n: 10,
		title: "Optimisation",
		state: "later",
		body: "Profile 200-mod packs. Allocation, census cost, log volume."
	}
];
function RoadmapPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mb-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-[0.18em] text-muted",
					children: "SoloGam / WorldForge"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-4xl tracking-tight",
					children: "Roadmap"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-muted",
					children: "0.4.0 adds player records (schema 3) and writes down the loader mismatch: Ars Nouveau and Iron's Spells 1.21 are NeoForge. They stay unbound. Optimisation is still later."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "space-y-3",
			children: PHASES.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "rounded-xl border border-border bg-bg-elevated p-5 flex gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-xs text-subtle tabular-nums pt-1",
					children: String(p.n).padStart(2, "0")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl",
								children: p.title
							}),
							p.state === "done" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "known",
								children: "Done"
							}),
							p.state === "next" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "partial",
								children: "Next"
							}),
							p.state === "later" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "Later" })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: p.body
					})]
				})]
			}, p.n))
		})]
	});
}
//#endregion
export { RoadmapPage as component };
