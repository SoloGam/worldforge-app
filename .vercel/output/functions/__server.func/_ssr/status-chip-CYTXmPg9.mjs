import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Badge } from "./badge-CVNgWDCX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/status-chip-CYTXmPg9.js
var import_jsx_runtime = require_jsx_runtime();
function KnowledgeChip({ status }) {
	if (status === "KNOWN") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		tone: "known",
		children: "Known"
	});
	if (status === "PARTIALLY_KNOWN") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		tone: "partial",
		children: "Partial"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		tone: "unknown",
		children: "Unknown"
	});
}
function AdapterChip({ state }) {
	if (state === "BOUND") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		tone: "known",
		children: "Bound"
	});
	if (state === "SKIPPED_NO_API") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		tone: "partial",
		children: "No API yet"
	});
	if (state === "SKIPPED_DISABLED") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		tone: "unknown",
		children: "Disabled"
	});
	if (state === "SKIPPED_MISSING_TARGET") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		tone: "unknown",
		children: "Missing target"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "Unbound" });
}
//#endregion
export { KnowledgeChip as n, AdapterChip as t };
