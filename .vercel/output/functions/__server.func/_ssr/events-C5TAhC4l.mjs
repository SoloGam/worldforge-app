import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as useEngine } from "./router-B5oZzaYJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/events-C5TAhC4l.js
var import_jsx_runtime = require_jsx_runtime();
function EventsPage() {
	const events = useEngine((s) => s.events);
	const logs = useEngine((s) => s.logs);
	const debugMode = useEngine((s) => s.config.debugMode);
	const busSubscribers = useEngine((s) => s.busSubscribers);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.18em] text-muted",
						children: "Event router + public bus"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-4xl tracking-tight",
						children: "Events"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-2xl text-muted",
						children: "The Forge subscriber is deliberately narrow: server start/stop, login, logout, dimension change. Other mods subscribe to WorldForgeEventBus — not MinecraftForge.EVENT_BUS. High-volume block and entity events stay off unless experimental mode is enabled."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mb-4 text-sm text-muted",
				children: [
					"Public bus subscribers: ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular-nums text-fg",
						children: busSubscribers
					}),
					" (internal debug logger)"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid lg:grid-cols-2 gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl border border-border bg-bg-elevated p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "Engine bus"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-4 space-y-3 max-h-[28rem] overflow-y-auto",
						children: [[...events].reverse().map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "border-b border-border pb-3 last:border-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-mono text-xs text-subtle tabular-nums",
								children: [
									new Date(e.ts).toLocaleTimeString(),
									" · ",
									e.name
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm",
								children: e.detail
							})]
						}, e.id)), events.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "text-muted",
							children: "No events yet."
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl border border-border bg-bg-elevated p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl",
							children: "Log categories"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted",
							children: debugMode ? "Debug on" : "Debug hidden — enable in Config"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 space-y-2 max-h-[28rem] overflow-y-auto font-mono text-xs",
							children: [...logs].reverse().map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
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
							] }, line.id))
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { EventsPage as component };
