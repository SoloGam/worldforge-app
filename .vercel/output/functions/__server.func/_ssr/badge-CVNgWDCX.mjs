import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { o as cn } from "./router-B5oZzaYJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/badge-CVNgWDCX.js
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide", {
	variants: { tone: {
		default: "bg-bg-subtle text-muted border border-border",
		accent: "bg-accent/15 text-accent",
		known: "bg-known/15 text-known",
		partial: "bg-partial/15 text-partial",
		unknown: "bg-bg-subtle text-unknown border border-border"
	} },
	defaultVariants: { tone: "default" }
});
function Badge({ className, tone, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ tone }), className),
		...props
	});
}
//#endregion
export { Badge as t };
