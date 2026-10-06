import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { o as cn } from "./router-B5oZzaYJ.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/@radix-ui/react-switch+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/switch-BKVqOMMq.js
var import_jsx_runtime = require_jsx_runtime();
function Switch({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
		className: cn("peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-border transition-colors", "data-[state=checked]:bg-accent data-[state=unchecked]:bg-bg-subtle", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70", "disabled:cursor-not-allowed disabled:opacity-40", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: cn("pointer-events-none block size-5 rounded-full bg-fg shadow-sm transition-transform", "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0.5", "data-[state=checked]:bg-accent-fg") })
	});
}
//#endregion
export { Switch as t };
