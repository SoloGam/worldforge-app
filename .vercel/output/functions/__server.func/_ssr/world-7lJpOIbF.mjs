import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as useEngine } from "./router-B5oZzaYJ.mjs";
import { t as Button } from "./button-Ce15jWVf.mjs";
import { t as Input } from "./input-CiIcaYbQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/world-7lJpOIbF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function WorldPage() {
	const world = useEngine((s) => s.world);
	const fingerprint = useEngine((s) => s.fingerprint);
	const emitPlayer = useEngine((s) => s.emitPlayer);
	const addRegion = useEngine((s) => s.addRegion);
	const addPoi = useEngine((s) => s.addPoi);
	const postWorldEvent = useEngine((s) => s.postWorldEvent);
	const [regionName, setRegionName] = (0, import_react.useState)("");
	const [poiLabel, setPoiLabel] = (0, import_react.useState)("");
	const [eventType, setEventType] = (0, import_react.useState)("raid");
	const [eventPayload, setEventPayload] = (0, import_react.useState)("village_bell");
	const hour = Math.floor(world.timeOfDay / 1e3);
	const clock = `${String((6 + hour) % 24).padStart(2, "0")}:${String(Math.floor(world.timeOfDay % 1e3 / 1e3 * 60)).padStart(2, "0")}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.18em] text-muted",
						children: "Schema 3"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-4xl tracking-tight",
						children: "World systems"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-2xl text-muted",
						children: "Dimension snapshot, authored regions, points of interest, and player records. Nothing here is produced by scanning chunks. A modpack fingerprint change drops player knowledge and keeps geography."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
						label: "Dimension",
						value: world.dimension,
						mono: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
						label: "Day",
						value: String(world.day)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
						label: "Clock",
						value: clock
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
						label: "Weather",
						value: world.weather
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
						label: "Difficulty",
						value: world.difficulty
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
						label: "Players",
						value: String(world.players.length)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
						label: "Fingerprint",
						value: fingerprint || "—",
						mono: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
						label: "Schema",
						value: String(world.schema)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-border bg-bg-elevated p-5 mb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "Players"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-3 divide-y divide-border",
						children: [world.players.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-baseline justify-between gap-4 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-medium",
								children: [
									p.name,
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-muted",
										children: p.online ? "online" : "offline"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: [
									p.logins,
									" login",
									p.logins === 1 ? "" : "s",
									" · ",
									p.lastDimension
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-mono text-xs text-subtle tabular-nums",
								children: ["t=", p.lastSeenDayTime]
							})]
						}, p.uuid)), world.players.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "py-3 text-sm text-muted",
							children: "No player records. A pack change clears them."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "secondary",
							onClick: () => emitPlayer("Ava", true),
							children: "Player login"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => emitPlayer("Ava", false),
							children: "Player logout"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-border bg-bg-elevated p-5 mb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "Regions"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Authored circles. `/worldforge region here` does the same in-game."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 divide-y divide-border",
						children: world.regions.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-baseline justify-between py-3 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: r.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: [
									r.biome,
									" · r=",
									r.radius
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-mono text-xs text-subtle tabular-nums",
								children: [
									r.x,
									", ",
									r.z
								]
							})]
						}, r.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "mt-4 flex flex-col sm:flex-row gap-2",
						onSubmit: (e) => {
							e.preventDefault();
							addRegion(regionName);
							setRegionName("");
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: regionName,
							onChange: (e) => setRegionName(e.target.value),
							placeholder: "Region name",
							"aria-label": "Region name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							variant: "secondary",
							size: "sm",
							children: "Register region"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-border bg-bg-elevated p-5 mb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "Points of interest"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 divide-y divide-border",
						children: world.pois.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-baseline justify-between py-3 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: p.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: [p.kind, p.regionId ? ` · ${p.regionId}` : ""]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-mono text-xs text-subtle tabular-nums",
								children: [
									p.x,
									", ",
									p.y,
									", ",
									p.z
								]
							})]
						}, p.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "mt-4 flex flex-col sm:flex-row gap-2",
						onSubmit: (e) => {
							e.preventDefault();
							addPoi(poiLabel, "marker");
							setPoiLabel("");
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: poiLabel,
							onChange: (e) => setPoiLabel(e.target.value),
							placeholder: "POI label",
							"aria-label": "Point of interest label"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							variant: "secondary",
							size: "sm",
							children: "Register POI"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-border bg-bg-elevated p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "World events"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Pack-authored, ephemeral. Not Forge events and not a tick bus."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-2 max-h-56 overflow-y-auto",
						children: [...world.worldEvents].reverse().map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "font-mono text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-subtle tabular-nums",
									children: e.gameTime
								}),
								" ",
								e.type,
								" ",
								e.payload
							]
						}, e.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "mt-4 grid sm:grid-cols-[8rem_1fr_auto] gap-2",
						onSubmit: (e) => {
							e.preventDefault();
							postWorldEvent(eventType, eventPayload);
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: eventType,
								onChange: (e) => setEventType(e.target.value),
								placeholder: "type",
								"aria-label": "Event type"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: eventPayload,
								onChange: (e) => setEventPayload(e.target.value),
								placeholder: "payload",
								"aria-label": "Event payload"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								variant: "secondary",
								size: "sm",
								children: "Post"
							})
						]
					})
				]
			})
		]
	});
}
function Fact({ label, value, mono }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-border bg-bg-elevated px-4 py-4 min-w-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs uppercase tracking-wider text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: `mt-2 text-sm truncate ${mono ? "font-mono text-xs" : "tabular-nums"}`,
			children: value
		})]
	});
}
//#endregion
export { WorldPage as component };
