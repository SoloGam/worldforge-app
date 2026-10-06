import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { o as cn } from "./router-B5oZzaYJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/input-CiIcaYbQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Input = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
	ref,
	className: cn("flex h-11 w-full rounded-md border border-border bg-bg-elevated px-3 text-sm text-fg", "placeholder:text-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70", className),
	...props
}));
Input.displayName = "Input";
//#endregion
export { Input as t };
