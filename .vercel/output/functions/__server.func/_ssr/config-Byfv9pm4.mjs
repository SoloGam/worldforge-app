import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as useEngine } from "./router-B5oZzaYJ.mjs";
import { t as Switch } from "./switch-BKVqOMMq.mjs";
import { t as Button } from "./button-Ce15jWVf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/config-Byfv9pm4.js
var import_jsx_runtime = require_jsx_runtime();
function ConfigPage() {
	const config = useEngine((s) => s.config);
	const setConfig = useEngine((s) => s.setConfig);
	const setIntegration = useEngine((s) => s.setIntegration);
	const resetPack = useEngine((s) => s.resetPack);
	const discover = useEngine((s) => s.discover);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.18em] text-muted",
						children: "worldforge-common.toml"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-4xl tracking-tight",
						children: "Configuration"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-muted",
						children: "These switches mirror the Forge common config. They are meant for operators, not programmers."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-border bg-bg-elevated divide-y divide-border",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
						title: "Debug mode",
						hint: "Verbose [WorldForge:*] logs. Off on production servers.",
						checked: config.debugMode,
						onChange: (v) => setConfig({ debugMode: v })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
						title: "Discover on startup",
						hint: "Scan installed mods during common setup.",
						checked: config.discoveryOnStartup,
						onChange: (v) => setConfig({ discoveryOnStartup: v })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
						title: "Datapack registries",
						hint: "Census biomes, enchantments, and structures when a server starts.",
						checked: config.scanDatapackRegistries,
						onChange: (v) => {
							setConfig({ scanDatapackRegistries: v });
							discover();
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
						title: "Experimental events",
						hint: "Reserved for high-volume block/entity events. Off by default.",
						checked: config.experimentalFeatures,
						onChange: (v) => setConfig({ experimentalFeatures: v })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-8 font-display text-2xl",
				children: "Integrations"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mt-3 rounded-xl border border-border bg-bg-elevated divide-y divide-border",
				children: [
					["magic", "Magic adapter"],
					["combat", "Combat adapter"],
					["technology", "Technology adapter"],
					["quest", "Quest adapter"],
					["worldgen", "Worldgen adapter"]
				].map(([key, title]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
					title,
					hint: "If the target mod is absent, WorldForge skips this adapter and keeps running.",
					checked: config.integrations[key],
					onChange: (v) => setIntegration(key, v)
				}, key))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					onClick: resetPack,
					children: "Reset simulated pack"
				})
			})
		]
	});
}
function Toggle({ title, hint, checked, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex items-center justify-between gap-4 p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block text-sm font-medium",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block text-xs text-muted mt-1",
			children: hint
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
			checked,
			onCheckedChange: onChange
		})]
	});
}
//#endregion
export { ConfigPage as component };
