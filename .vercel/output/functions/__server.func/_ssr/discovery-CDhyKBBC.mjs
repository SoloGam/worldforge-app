import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as censusTotal, i as CATALOG, n as useEngine, o as cn } from "./router-B5oZzaYJ.mjs";
import { n as KnowledgeChip } from "./status-chip-CYTXmPg9.mjs";
import { t as Switch } from "./switch-BKVqOMMq.mjs";
import { t as Input } from "./input-CiIcaYbQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/discovery-CDhyKBBC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DiscoveryPage() {
	const enabled = useEngine((s) => s.enabled);
	const knowledge = useEngine((s) => s.knowledge);
	const mods = useEngine((s) => s.mods);
	const toggleMod = useEngine((s) => s.toggleMod);
	const selectMod = useEngine((s) => s.selectMod);
	const selectedModId = useEngine((s) => s.selectedModId);
	const fingerprint = useEngine((s) => s.fingerprint);
	const [query, setQuery] = (0, import_react.useState)("");
	const knowledgeById = (0, import_react.useMemo)(() => new Map(knowledge.map((k) => [k.modId, k])), [knowledge]);
	const selected = CATALOG.find((m) => m.modId === selectedModId) ?? CATALOG[0];
	const selectedKnowledge = selected ? knowledgeById.get(selected.modId) : void 0;
	const selectedLive = mods.find((m) => m.modId === selected?.modId);
	const filtered = CATALOG.filter((m) => {
		const q = query.trim().toLowerCase();
		if (!q) return true;
		return m.modId.includes(q) || m.displayName.toLowerCase().includes(q);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.18em] text-muted",
						children: "Phase 3"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-4xl tracking-tight",
						children: "Mod discovery"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-2xl text-muted",
						children: "WorldForge reads Forge loader metadata, then censuses registries once. Toggle a mod to simulate it joining or leaving the pack — the fingerprint and knowledge layer update, they are not copied blindly."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 font-mono text-xs text-subtle",
						children: [
							"fingerprint ",
							fingerprint || "—",
							" · ",
							mods.length,
							" present"
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: query,
					onChange: (e) => setQuery(e.target.value),
					placeholder: "Filter by id or name",
					"aria-label": "Filter mods"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid lg:grid-cols-[1.1fr_0.9fr] gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-border rounded-xl border border-border bg-bg-elevated overflow-hidden",
					children: filtered.map((mod) => {
						const k = knowledgeById.get(mod.modId);
						const on = enabled[mod.modId];
						const locked = mod.modId === "minecraft" || mod.modId === "forge" || mod.modId === "worldforge";
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => selectMod(mod.modId),
							className: cn("flex w-full items-center gap-3 px-4 py-3 text-left transition-colors duration-150", selectedModId === mod.modId ? "bg-bg-subtle" : "hover:bg-bg-subtle/50"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-sm font-medium",
										children: mod.displayName
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "truncate font-mono text-xs text-subtle",
										children: [
											mod.modId,
											" · ",
											mod.version
										]
									})]
								}),
								k ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KnowledgeChip, { status: k.status }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-subtle",
									children: "off"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									checked: on,
									disabled: locked,
									onClick: (e) => e.stopPropagation(),
									onCheckedChange: () => toggleMod(mod.modId),
									"aria-label": `Include ${mod.displayName}`
								})
							]
						}) }, mod.modId);
					})
				}), selected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "rounded-xl border border-border bg-bg-elevated p-5 h-fit",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-wider text-muted",
							children: "Inspector"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 font-display text-2xl",
							children: selected.displayName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 font-mono text-xs text-subtle",
							children: [
								selected.modId,
								"@",
								selected.version
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm text-muted",
							children: selected.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4",
							children: selectedKnowledge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KnowledgeChip, { status: selectedKnowledge.status })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm",
							children: selectedKnowledge?.reason ?? selected.notes
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-6 text-xs uppercase tracking-wider text-muted",
							children: "Registry census"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CensusTable, { census: selectedLive?.census ?? selected.census }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-6 text-xs uppercase tracking-wider text-muted",
							children: "Dependencies"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-2 space-y-1 text-sm",
							children: [selected.dependencies.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "text-muted",
								children: "None declared"
							}), selected.dependencies.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "font-mono text-xs",
								children: [
									d.modId,
									" ",
									d.versionRange,
									" ",
									d.mandatory ? "required" : "optional"
								]
							}, d.modId))]
						}),
						selected.advertisedApi && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 font-mono text-xs text-partial",
							children: ["API ", selected.advertisedApi]
						})
					]
				})]
			})
		]
	});
}
function CensusTable({ census }) {
	const rows = [
		["Blocks", census.blocks],
		["Items", census.items],
		["Entities", census.entities],
		["Effects", census.effects],
		["Recipe serializers", census.recipeSerializers],
		["Biomes", census.biomes],
		["Enchantments", census.enchantments],
		["Structures", census.structures]
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
		className: "mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm",
		children: [rows.map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
				className: "text-muted",
				children: k
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
				className: "tabular-nums",
				children: v
			})]
		}, k)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "col-span-2 flex justify-between border-t border-border pt-1 mt-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
				className: "text-muted",
				children: "Total"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
				className: "tabular-nums",
				children: censusTotal(census)
			})]
		})]
	});
}
//#endregion
export { DiscoveryPage as component };
