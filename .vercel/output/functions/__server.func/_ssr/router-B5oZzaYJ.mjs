import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as lazyRouteComponent, b as Link, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, p as useRouterState, v as createFileRoute, x as useRouter, y as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { c as Map$1, f as Cog, h as BookOpen, i as SquareStack, l as LayoutGrid, m as Boxes, n as TriangleAlert, o as Radio, p as Cable, r as Swords, s as Menu, t as X, u as Globe } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { a as DialogPortal, i as DialogOverlay, n as DialogClose, o as DialogTitle, r as DialogContent, s as DialogTrigger, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-B5oZzaYJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var Sheet = Dialog;
var SheetTrigger = DialogTrigger;
function SheetContent({ className, children, side = "right", title, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-bg/70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
		className: cn("fixed z-50 flex flex-col bg-bg-elevated text-fg border-border shadow-panel", side === "right" ? "inset-y-0 right-0 h-full w-[min(100%,22rem)] border-l" : "inset-x-0 bottom-0 max-h-[85vh] rounded-t-xl border-t", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between border-b border-border px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
				className: "font-display text-lg",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
				className: "size-11 inline-flex items-center justify-center rounded-md text-muted hover:text-fg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sr-only",
					children: "Close"
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-1 overflow-y-auto p-4",
			children
		})]
	})] });
}
var EMPTY_CENSUS = {
	blocks: 0,
	items: 0,
	entities: 0,
	effects: 0,
	recipeSerializers: 0,
	biomes: 0,
	enchantments: 0,
	structures: 0
};
function censusTotal(c) {
	return c.blocks + c.items + c.entities + c.effects + c.recipeSerializers + c.biomes + c.enchantments + c.structures;
}
var c = (partial) => ({
	...EMPTY_CENSUS,
	...partial
});
var ADAPTERS = [
	{
		id: "worldforge:magic",
		domain: "MAGIC",
		targetModIds: ["ars_nouveau", "irons_spellbooks"],
		bindPolicy: "documented-api-only",
		summary: "Detects magic mods. Their 1.21 APIs are NeoForge, so this Forge build records them and does not bind."
	},
	{
		id: "worldforge:combat",
		domain: "COMBAT",
		targetModIds: [
			"minecraft",
			"apotheosis",
			"bettercombat"
		],
		bindPolicy: "vanilla-registry-then-documented-api",
		summary: "Binds vanilla Registries.DAMAGE_TYPE. Extra combat mods stay detected-only."
	},
	{
		id: "worldforge:technology",
		domain: "TECHNOLOGY",
		targetModIds: [
			"create",
			"immersiveengineering",
			"mekanism"
		],
		bindPolicy: "documented-api-only",
		summary: "Machines, energy, contraptions. Create is detected, not reverse-engineered."
	},
	{
		id: "worldforge:quest",
		domain: "QUEST",
		targetModIds: ["ftbquests", "heracles"],
		bindPolicy: "documented-api-only",
		summary: "Quest graphs and completion events via official quest APIs when present."
	},
	{
		id: "worldforge:worldgen",
		domain: "WORLDGEN",
		targetModIds: [
			"terralith",
			"biomesoplenty",
			"alexscaves"
		],
		bindPolicy: "registry-census-only",
		summary: "Datapack-heavy worldgen. Registries can be counted; mechanics stay unknown."
	}
];
ADAPTERS.map((a) => ({
	id: a.id,
	domain: a.domain,
	targets: a.targetModIds,
	bindPolicy: a.bindPolicy,
	notes: a.summary
}));
var LOADER_NOTES = {
	ars_nouveau: "Loaded here, but Ars Nouveau 1.21.1 publishes ArsNouveauAPI for NeoForge (net.neoforged). WorldForge is Forge and does not compile that API. Capabilities stay empty.",
	irons_spellbooks: "Iron's Spells documents a Forge API only through 1.20.1. The 1.21 line is NeoForge. Recorded as PARTIALLY_KNOWN; not bound."
};
var CATALOG = [
	{
		modId: "minecraft",
		displayName: "Minecraft",
		version: "1.21.1",
		description: "Base game. Fully inspectable through vanilla registries and lifecycle events.",
		dependencies: [],
		census: c({
			blocks: 1200,
			items: 1400,
			entities: 150,
			effects: 40,
			biomes: 64,
			enchantments: 40,
			structures: 20
		}),
		defaultEnabled: true,
		notes: "Platform. Always KNOWN. Combat adapter binds this surface."
	},
	{
		modId: "forge",
		displayName: "Minecraft Forge",
		version: "52.1.0",
		description: "Mod loader and event bus WorldForge sits on.",
		dependencies: [{
			modId: "minecraft",
			versionRange: "[1.21.1]",
			mandatory: true
		}],
		census: EMPTY_CENSUS,
		defaultEnabled: true,
		notes: "Platform. Always KNOWN."
	},
	{
		modId: "worldforge",
		displayName: "WorldForge",
		version: "0.4.0",
		description: "This framework.",
		dependencies: [{
			modId: "forge",
			versionRange: "[52,)",
			mandatory: true
		}, {
			modId: "minecraft",
			versionRange: "[1.21.1,1.22)",
			mandatory: true
		}],
		census: EMPTY_CENSUS,
		defaultEnabled: true,
		notes: "Platform. Always KNOWN."
	},
	{
		modId: "jei",
		displayName: "Just Enough Items",
		version: "19.21.2",
		description: "Recipe and ingredient index. Public API exists; WorldForge has not bound it yet.",
		dependencies: [{
			modId: "forge",
			versionRange: "[52,)",
			mandatory: true
		}],
		advertisedApi: "mezz.jei.api",
		census: c({ items: 0 }),
		defaultEnabled: true,
		notes: "API visible, no adapter — PARTIALLY_KNOWN."
	},
	{
		modId: "curios",
		displayName: "Curios API",
		version: "9.2.2",
		description: "Slot capability API used by many equipment mods.",
		dependencies: [{
			modId: "forge",
			versionRange: "[52,)",
			mandatory: true
		}],
		advertisedApi: "top.theillusivec4.curios.api",
		census: EMPTY_CENSUS,
		defaultEnabled: true,
		notes: "Loader-visible API, no WorldForge adapter yet."
	},
	{
		modId: "ars_nouveau",
		displayName: "Ars Nouveau",
		version: "5.8.1",
		description: "Spellcrafting magic system. The maintained 1.21 API is NeoForge.",
		dependencies: [{
			modId: "forge",
			versionRange: "[52,)",
			mandatory: true
		}],
		domain: "MAGIC",
		advertisedApi: "com.hollingsworth.arsnouveau.api",
		census: c({
			blocks: 180,
			items: 220,
			entities: 24,
			effects: 12,
			recipeSerializers: 8
		}),
		defaultEnabled: true,
		notes: "1.21.1 API is NeoForge (ArsNouveauAPI). PARTIALLY_KNOWN on this Forge build. Not compiled."
	},
	{
		modId: "irons_spellbooks",
		displayName: "Iron's Spells 'n Spellbooks",
		version: "1.21.1-3.8.1",
		description: "Spellbook combat-magic hybrid.",
		dependencies: [{
			modId: "forge",
			versionRange: "[52,)",
			mandatory: true
		}, {
			modId: "curios",
			versionRange: "[9,)",
			mandatory: true
		}],
		domain: "MAGIC",
		census: c({
			items: 160,
			entities: 18,
			effects: 20
		}),
		defaultEnabled: true,
		notes: "Forge API documented through 1.20.1. The 1.21 line is NeoForge. Not bound."
	},
	{
		modId: "create",
		displayName: "Create",
		version: "6.0.6",
		description: "Contraptions, kinetics, processing.",
		dependencies: [{
			modId: "forge",
			versionRange: "[52,)",
			mandatory: true
		}],
		domain: "TECHNOLOGY",
		advertisedApi: "com.simibubi.create.api",
		census: c({
			blocks: 420,
			items: 380,
			entities: 16,
			recipeSerializers: 24
		}),
		defaultEnabled: true,
		notes: "Tech adapter target. Presence ≠ kinetic simulation."
	},
	{
		modId: "ftbquests",
		displayName: "FTB Quests",
		version: "2101.1.4",
		description: "Quest book and chapter graphs.",
		dependencies: [{
			modId: "forge",
			versionRange: "[52,)",
			mandatory: true
		}],
		domain: "QUEST",
		advertisedApi: "dev.ftb.mods.ftbquests.api",
		census: c({ items: 12 }),
		defaultEnabled: true,
		notes: "Quest adapter target. Unbound until the official API is used."
	},
	{
		modId: "apotheosis",
		displayName: "Apotheosis",
		version: "8.2.1",
		description: "Adventure, enchanting, and mob affixes.",
		dependencies: [{
			modId: "forge",
			versionRange: "[52,)",
			mandatory: true
		}],
		domain: "COMBAT",
		census: c({
			items: 90,
			enchantments: 28,
			entities: 4
		}),
		defaultEnabled: true,
		notes: "Combat extra. Detected, not bound — vanilla is the bound combat target."
	},
	{
		modId: "bettercombat",
		displayName: "Better Combat",
		version: "1.21.1-2.0.4",
		description: "Attack animations and hitbox combat. Public API not compiled into WorldForge.",
		dependencies: [{
			modId: "forge",
			versionRange: "[52,)",
			mandatory: true
		}],
		domain: "COMBAT",
		census: EMPTY_CENSUS,
		defaultEnabled: false,
		notes: "Combat extra. Optional in the simulated pack."
	},
	{
		modId: "terralith",
		displayName: "Terralith",
		version: "2.5.7",
		description: "Overworld biome expansion. Mostly datapack.",
		dependencies: [{
			modId: "forge",
			versionRange: "[52,)",
			mandatory: true
		}],
		domain: "WORLDGEN",
		census: c({
			biomes: 86,
			structures: 12
		}),
		defaultEnabled: true,
		notes: "Worldgen adapter can count biomes. Mechanics stay unknown."
	},
	{
		modId: "farmersdelight",
		displayName: "Farmer's Delight",
		version: "1.2.7",
		description: "Cooking, crops, and kitchen blocks.",
		dependencies: [{
			modId: "forge",
			versionRange: "[52,)",
			mandatory: true
		}],
		census: c({
			blocks: 70,
			items: 140,
			recipeSerializers: 6
		}),
		defaultEnabled: true,
		notes: "Content visible through registries only."
	},
	{
		modId: "sophisticatedbackpacks",
		displayName: "Sophisticated Backpacks",
		version: "3.20.16",
		description: "Upgradeable backpacks. No WorldForge adapter.",
		dependencies: [{
			modId: "forge",
			versionRange: "[52,)",
			mandatory: true
		}],
		census: c({
			items: 40,
			blocks: 8
		}),
		defaultEnabled: false,
		notes: "Optional in the simulated pack."
	},
	{
		modId: "patchouli",
		displayName: "Patchouli",
		version: "1.21-87",
		description: "Guide book framework. Data-driven, little runtime API for WorldForge.",
		dependencies: [{
			modId: "forge",
			versionRange: "[52,)",
			mandatory: true
		}],
		census: EMPTY_CENSUS,
		defaultEnabled: true,
		notes: "Identity only unless a book registry is later probed."
	},
	{
		modId: "moonlight",
		displayName: "Moonlight Lib",
		version: "1.21-2.17.20",
		description: "Shared library. Not a gameplay system.",
		dependencies: [{
			modId: "forge",
			versionRange: "[52,)",
			mandatory: true
		}],
		advertisedApi: "net.mehvahdjukaar.moonlight.api",
		census: EMPTY_CENSUS,
		defaultEnabled: true,
		notes: "Library API detected, no domain adapter."
	},
	{
		modId: "supplementaries",
		displayName: "Supplementaries",
		version: "1.21-3.1.7",
		description: "Decorative and functional vanilla-style additions.",
		dependencies: [{
			modId: "forge",
			versionRange: "[52,)",
			mandatory: true
		}, {
			modId: "moonlight",
			versionRange: "[2.17,)",
			mandatory: true
		}],
		census: c({
			blocks: 110,
			items: 95
		}),
		defaultEnabled: false,
		notes: "Disabled in the default simulated pack."
	}
];
var PLATFORM_IDS = /* @__PURE__ */ new Set([
	"minecraft",
	"forge",
	"worldforge"
]);
var d = (id, exhaustion, scaling, effects) => ({
	id: `minecraft:${id}`,
	exhaustion,
	scaling,
	effects
});
/** Representative vanilla 1.21.1 damage types (official registry, not scraped from other mods). */
var VANILLA_DAMAGE_TYPES = [
	d("arrow", .1, "when_caused_by_living_non_player", "hurt"),
	d("bad_respawn_point", .1, "always", "hurt"),
	d("cactus", .1, "when_caused_by_living_non_player", "hurt"),
	d("campfire", .1, "when_caused_by_living_non_player", "burning"),
	d("cramming", 0, "when_caused_by_living_non_player", "hurt"),
	d("dragon_breath", 0, "when_caused_by_living_non_player", "hurt"),
	d("drown", 0, "when_caused_by_living_non_player", "drowning"),
	d("dry_out", .1, "when_caused_by_living_non_player", "hurt"),
	d("ender_pearl", 0, "when_caused_by_living_non_player", "hurt"),
	d("explosion", .1, "always", "hurt"),
	d("fall", 0, "when_caused_by_living_non_player", "hurt"),
	d("falling_anvil", .1, "when_caused_by_living_non_player", "hurt"),
	d("falling_block", .1, "when_caused_by_living_non_player", "hurt"),
	d("falling_stalactite", .1, "when_caused_by_living_non_player", "hurt"),
	d("fireball", .1, "when_caused_by_living_non_player", "burning"),
	d("fireworks", .1, "when_caused_by_living_non_player", "hurt"),
	d("fly_into_wall", 0, "when_caused_by_living_non_player", "hurt"),
	d("freeze", 0, "when_caused_by_living_non_player", "freezing"),
	d("generic", 0, "when_caused_by_living_non_player", "hurt"),
	d("generic_kill", 0, "when_caused_by_living_non_player", "hurt"),
	d("hot_floor", .1, "when_caused_by_living_non_player", "burning"),
	d("in_fire", .1, "when_caused_by_living_non_player", "burning"),
	d("in_wall", 0, "when_caused_by_living_non_player", "hurt"),
	d("indirect_magic", 0, "when_caused_by_living_non_player", "hurt"),
	d("lava", .1, "when_caused_by_living_non_player", "burning"),
	d("lightning_bolt", .1, "when_caused_by_living_non_player", "hurt"),
	d("mace_smash", .1, "when_caused_by_living_non_player", "hurt"),
	d("magic", 0, "when_caused_by_living_non_player", "hurt"),
	d("mob_attack", .1, "when_caused_by_living_non_player", "hurt"),
	d("mob_attack_no_aggro", .1, "when_caused_by_living_non_player", "hurt"),
	d("mob_projectile", .1, "when_caused_by_living_non_player", "hurt"),
	d("on_fire", 0, "when_caused_by_living_non_player", "burning"),
	d("out_of_world", 0, "when_caused_by_living_non_player", "hurt"),
	d("outside_border", 0, "when_caused_by_living_non_player", "hurt"),
	d("player_attack", .1, "when_caused_by_living_non_player", "hurt"),
	d("player_explosion", .1, "always", "hurt"),
	d("sonic_boom", 0, "always", "hurt"),
	d("spit", .1, "when_caused_by_living_non_player", "hurt"),
	d("stalagmite", 0, "when_caused_by_living_non_player", "hurt"),
	d("starve", 0, "when_caused_by_living_non_player", "hurt"),
	d("sting", .1, "when_caused_by_living_non_player", "hurt"),
	d("sweet_berry_bush", .1, "when_caused_by_living_non_player", "poking"),
	d("thorns", .1, "when_caused_by_living_non_player", "thorns"),
	d("thrown", .1, "when_caused_by_living_non_player", "hurt"),
	d("trident", .1, "when_caused_by_living_non_player", "hurt"),
	d("unattributed_fireball", .1, "when_caused_by_living_non_player", "burning"),
	d("wind_charge", 0, "when_caused_by_living_non_player", "hurt"),
	d("wither", 0, "when_caused_by_living_non_player", "hurt"),
	d("wither_skull", .1, "when_caused_by_living_non_player", "hurt")
];
var VANILLA_ENTITY_CATEGORIES = [
	{
		category: "monster",
		count: 70
	},
	{
		category: "creature",
		count: 42
	},
	{
		category: "ambient",
		count: 2
	},
	{
		category: "axolotls",
		count: 1
	},
	{
		category: "underground_water_creature",
		count: 1
	},
	{
		category: "water_creature",
		count: 5
	},
	{
		category: "water_ambient",
		count: 4
	},
	{
		category: "misc",
		count: 25
	}
];
var DEFAULT_CONFIG = {
	debugMode: false,
	discoveryOnStartup: true,
	scanDatapackRegistries: true,
	integrations: {
		magic: true,
		combat: true,
		technology: true,
		quest: true,
		worldgen: true
	},
	experimentalFeatures: false
};
function fingerprintOf(mods) {
	const key = [...mods].filter((m) => m.present).sort((a, b) => a.modId.localeCompare(b.modId)).map((m) => `${m.modId}@${m.version}`).join(";");
	let h = 0;
	for (let i = 0; i < key.length; i++) h = Math.imul(31, h) + key.charCodeAt(i) | 0;
	return (h >>> 0).toString(16);
}
function enabledToDiscovered(enabled, includeDatapack) {
	return CATALOG.filter((mod) => enabled[mod.modId]).map((mod) => toDiscovered(mod, includeDatapack));
}
function toDiscovered(mod, includeDatapack) {
	const census = includeDatapack ? mod.census : {
		...mod.census,
		biomes: 0,
		enchantments: 0,
		structures: 0
	};
	return {
		modId: mod.modId,
		displayName: mod.displayName,
		version: mod.version,
		description: mod.description,
		dependencies: mod.dependencies,
		census,
		present: true
	};
}
function domainEnabled(config, domain) {
	switch (domain) {
		case "MAGIC": return config.integrations.magic;
		case "COMBAT": return config.integrations.combat;
		case "TECHNOLOGY": return config.integrations.technology;
		case "QUEST": return config.integrations.quest;
		case "WORLDGEN": return config.integrations.worldgen;
		default: return true;
	}
}
function bindAdapters(presentIds, config) {
	return ADAPTERS.map((spec) => {
		if (!domainEnabled(config, spec.domain)) return {
			...spec,
			state: "SKIPPED_DISABLED",
			boundTarget: null,
			extraDetected: []
		};
		if (spec.domain === "COMBAT" && presentIds.has("minecraft")) {
			const extraDetected = spec.targetModIds.filter((id) => id !== "minecraft" && presentIds.has(id));
			return {
				...spec,
				state: "BOUND",
				boundTarget: "minecraft",
				extraDetected
			};
		}
		const boundTarget = spec.targetModIds.find((id) => presentIds.has(id)) ?? null;
		if (!boundTarget) return {
			...spec,
			state: "SKIPPED_MISSING_TARGET",
			boundTarget: null,
			extraDetected: []
		};
		return {
			...spec,
			state: "SKIPPED_NO_API",
			boundTarget,
			extraDetected: []
		};
	});
}
function classifyMod(mod, adapters, catalog) {
	const adapter = adapters.find((a) => a.targetModIds.includes(mod.modId));
	const raw = adapter?.state ?? "UNBOUND";
	const thisModBound = Boolean(adapter && raw === "BOUND" && adapter.boundTarget === mod.modId);
	const state = thisModBound ? "BOUND" : raw === "BOUND" ? "SKIPPED_NO_API" : raw;
	const detectedApis = [];
	if (catalog?.advertisedApi) detectedApis.push(catalog.advertisedApi);
	if (adapter && state === "SKIPPED_NO_API") detectedApis.push(`detected-target:${adapter.id}`);
	if (thisModBound && adapter) detectedApis.push(adapter.id);
	const hasApi = detectedApis.length > 0;
	const hasContent = censusTotal(mod.census) > 0;
	const isPlatform = PLATFORM_IDS.has(mod.modId);
	let status;
	let reason;
	if (isPlatform || thisModBound) {
		status = "KNOWN";
		reason = isPlatform ? "Platform surface: identity, registries, and lifecycle are fully inspectable." : "A WorldForge adapter bound through a supported public API.";
	} else if (hasApi || hasContent) {
		status = "PARTIALLY_KNOWN";
		reason = hasApi ? "An API or integration point was detected, but no complete adapter is bound." : "Registry content is visible; mechanics remain unadapted.";
	} else {
		status = "UNKNOWN";
		reason = "Only loader metadata is available. WorldForge will not invent behaviour for this mod.";
	}
	return {
		modId: mod.modId,
		status,
		census: mod.census,
		detectedApis,
		domains: adapter ? [adapter.domain] : [],
		adapterId: thisModBound ? adapter?.id ?? null : null,
		reason
	};
}
function detectMagic(mods, config) {
	if (!config.integrations.magic) return [];
	return mods.filter((m) => m.modId === "ars_nouveau" || m.modId === "irons_spellbooks").map((m) => ({
		modId: m.modId,
		status: "PARTIALLY_KNOWN",
		capabilities: [],
		note: LOADER_NOTES[m.modId] ?? "Mod loaded. No official magic API is compiled into WorldForge; capabilities stay empty."
	}));
}
function combatSnapshot(adapters, presentIds, config) {
	const combat = adapters.find((a) => a.domain === "COMBAT");
	if (!Boolean(config.integrations.combat && combat?.state === "BOUND")) return {
		vanillaBound: false,
		damageTypeCount: 0,
		attributeCount: 0,
		entityCategories: [],
		extraDetectedMods: [],
		damageTypes: []
	};
	return {
		vanillaBound: true,
		damageTypeCount: VANILLA_DAMAGE_TYPES.length,
		attributeCount: 15,
		entityCategories: VANILLA_ENTITY_CATEGORIES,
		extraDetectedMods: combat?.extraDetected.filter((id) => presentIds.has(id)) ?? [],
		damageTypes: VANILLA_DAMAGE_TYPES
	};
}
function runDiscovery(enabled, config) {
	const mods = enabledToDiscovered(enabled, config.scanDatapackRegistries);
	const presentIds = new Set(mods.map((m) => m.modId));
	const adapters = bindAdapters(presentIds, config);
	const byId = new Map(CATALOG.map((m) => [m.modId, m]));
	return {
		mods,
		adapters,
		knowledge: mods.map((m) => classifyMod(m, adapters, byId.get(m.modId))),
		fingerprint: fingerprintOf(mods),
		magic: detectMagic(mods, config),
		combat: combatSnapshot(adapters, presentIds, config)
	};
}
var seq = 0;
function nextId(prefix) {
	seq += 1;
	return `${prefix}-${seq}-${Date.now().toString(36)}`;
}
function logLine(category, message, level = "info") {
	return {
		id: nextId("log"),
		ts: Date.now(),
		category,
		level,
		message
	};
}
function engineEvent(name, detail) {
	return {
		id: nextId("evt"),
		ts: Date.now(),
		name,
		detail
	};
}
function defaultEnabledMap() {
	return Object.fromEntries(CATALOG.map((m) => [m.modId, m.defaultEnabled]));
}
function knowledgeCounts(knowledge) {
	return {
		known: knowledge.filter((k) => k.status === "KNOWN").length,
		partial: knowledge.filter((k) => k.status === "PARTIALLY_KNOWN").length,
		unknown: knowledge.filter((k) => k.status === "UNKNOWN").length
	};
}
var emptyCombat = () => ({
	vanillaBound: false,
	damageTypeCount: 0,
	attributeCount: 0,
	entityCategories: [],
	extraDetectedMods: [],
	damageTypes: []
});
var initialWorld = () => ({
	dimension: "minecraft:overworld",
	day: 1,
	timeOfDay: 1e3,
	weather: "clear",
	difficulty: "normal",
	players: [{
		uuid: "sim-solo",
		name: "Solo",
		logins: 1,
		lastDimension: "minecraft:overworld",
		lastSeenDayTime: 1e3,
		online: true
	}],
	schema: 3,
	regions: [{
		id: "spawn",
		name: "Spawn plateau",
		dimension: "minecraft:overworld",
		biome: "plains",
		x: 0,
		z: 0,
		radius: 96
	}, {
		id: "river-cut",
		name: "River cut",
		dimension: "minecraft:overworld",
		biome: "river",
		x: 240,
		z: -80,
		radius: 48
	}],
	pois: [{
		id: "spawn-stone",
		regionId: "spawn",
		kind: "landmark",
		label: "World origin",
		dimension: "minecraft:overworld",
		x: 0,
		y: 64,
		z: 0
	}],
	worldEvents: [{
		id: "boot",
		type: "world.load",
		payload: "minecraft:overworld",
		gameTime: 1e3
	}]
});
function pushLog(logs, line, debugMode) {
	if (line.level === "debug" && !debugMode) return logs;
	return [...logs, line].slice(-200);
}
var useEngine = create()((set, get) => ({
	engine: "IDLE",
	config: DEFAULT_CONFIG,
	enabled: defaultEnabledMap(),
	mods: [],
	adapters: [],
	knowledge: [],
	fingerprint: "",
	lastFingerprint: "",
	logs: [],
	events: [],
	world: initialWorld(),
	magic: [],
	combat: emptyCombat(),
	busSubscribers: 1,
	selectedModId: "worldforge",
	selectedSource: "src/main/java/net/worldforge/WorldForgeMod.java",
	boot: () => {
		const { config } = get();
		set((s) => ({
			engine: "BOOTING",
			busSubscribers: 1,
			logs: pushLog(s.logs, logLine("CORE", "WorldForge 0.4.0 — player knowledge + loader mismatch catalog"), config.debugMode)
		}));
		if (get().config.discoveryOnStartup) get().discover();
		set((s) => {
			return {
				engine: "RUNNING",
				events: [
					...s.events,
					engineEvent("SERVER_START", "integrated"),
					engineEvent("WORLD_LOAD", "minecraft:overworld")
				].slice(-80),
				logs: pushLog(s.logs, logLine("WORLD", "World systems attached (schema=3, regions=2, pois=1, players=1)"), s.config.debugMode)
			};
		});
	},
	shutdown: () => {
		set((s) => ({
			engine: "IDLE",
			magic: [],
			combat: emptyCombat(),
			events: [
				...s.events,
				engineEvent("WORLD_SAVE", "overworld"),
				engineEvent("SERVER_STOP", "integrated")
			].slice(-80),
			logs: pushLog(s.logs, logLine("CORE", "Engine idle"), s.config.debugMode)
		}));
	},
	discover: () => {
		const { enabled, config, lastFingerprint } = get();
		set({ engine: get().engine === "IDLE" ? "DISCOVERING" : "DISCOVERING" });
		const result = runDiscovery(enabled, config);
		const counts = knowledgeCounts(result.knowledge);
		const reconciled = lastFingerprint && lastFingerprint !== result.fingerprint;
		const extraEvents = [engineEvent("DISCOVERY_COMPLETE", result.fingerprint)];
		if (reconciled) extraEvents.push(engineEvent("KNOWLEDGE_RECONCILED", result.fingerprint));
		for (const adapter of result.adapters) extraEvents.push(engineEvent(adapter.state === "BOUND" ? "ADAPTER_BOUND" : "ADAPTER_SKIPPED", `${adapter.id} ${adapter.state}${adapter.boundTarget ? " (" + adapter.boundTarget + ")" : ""}`));
		set((s) => ({
			engine: "RUNNING",
			mods: result.mods,
			adapters: result.adapters,
			knowledge: result.knowledge,
			fingerprint: result.fingerprint,
			lastFingerprint: result.fingerprint,
			magic: result.magic,
			combat: result.combat,
			world: reconciled ? {
				...s.world,
				players: []
			} : s.world,
			events: [...s.events, ...extraEvents].slice(-80),
			logs: [
				...pushLog(s.logs, logLine("DISCOVERY", `Loader metadata: ${result.mods.length} mods, fingerprint ${result.fingerprint}`), config.debugMode),
				logLine("DISCOVERY", `Knowledge: ${counts.known} known, ${counts.partial} partial, ${counts.unknown} unknown`),
				logLine("INTEGRATION", result.combat.vanillaBound ? `Combat bound vanilla damage-type registry (${result.combat.damageTypeCount} types)` : "Combat adapter not bound"),
				logLine("INTEGRATION", result.magic.length ? `Magic recorded ${result.magic.length} system(s) as PARTIALLY_KNOWN — not bound` : "No magic systems detected"),
				...reconciled ? [logLine("COMPATIBILITY", `Modpack fingerprint changed (${lastFingerprint} -> ${result.fingerprint}). Clearing integration state and player knowledge.`, "warn")] : []
			].slice(-200)
		}));
	},
	toggleMod: (modId) => {
		if (modId === "minecraft" || modId === "forge" || modId === "worldforge") return;
		set((s) => ({ enabled: {
			...s.enabled,
			[modId]: !s.enabled[modId]
		} }));
		if (get().engine !== "IDLE") get().discover();
	},
	setConfig: (patch) => {
		set((s) => ({ config: {
			...s.config,
			...patch
		} }));
	},
	setIntegration: (key, value) => {
		set((s) => ({ config: {
			...s.config,
			integrations: {
				...s.config.integrations,
				[key]: value
			}
		} }));
		if (get().engine !== "IDLE") get().discover();
	},
	selectMod: (modId) => set({ selectedModId: modId }),
	selectSource: (path) => set({ selectedSource: path }),
	tick: () => {
		const { engine, world, config } = get();
		if (engine !== "RUNNING") return;
		let time = world.timeOfDay + 40;
		let day = world.day;
		if (time >= 24e3) {
			time -= 24e3;
			day += 1;
		}
		const events = [];
		let weather = world.weather;
		if (time === 0 || time === 40) events.push(engineEvent("TIME_PROGRESSION", `day ${day}`));
		if (config.experimentalFeatures && Math.random() < .02) {
			weather = weather === "clear" ? "rain" : "clear";
			events.push(engineEvent("WEATHER_CHANGE", weather));
		}
		set((s) => ({
			world: {
				...s.world,
				timeOfDay: time,
				day,
				weather
			},
			events: events.length ? [...s.events, ...events].slice(-80) : s.events
		}));
	},
	addRegion: (name) => {
		const id = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `region-${Date.now().toString(36)}`;
		const region = {
			id,
			name: name.trim() || id,
			dimension: "minecraft:overworld",
			biome: "plains",
			x: Math.round((Math.random() * 2 - 1) * 400),
			z: Math.round((Math.random() * 2 - 1) * 400),
			radius: 48
		};
		set((s) => ({
			world: {
				...s.world,
				regions: [...s.world.regions, region]
			},
			events: [...s.events, engineEvent("REGION_REGISTERED", id)].slice(-80),
			logs: pushLog(s.logs, logLine("WORLD", `Registered region ${id}`), s.config.debugMode)
		}));
	},
	addPoi: (label, kind) => {
		const id = `poi-${Date.now().toString(36)}`;
		set((s) => {
			const region = s.world.regions[0];
			const poi = {
				id,
				regionId: region?.id ?? "",
				kind: kind.trim() || "marker",
				label: label.trim() || "Marked location",
				dimension: region?.dimension ?? "minecraft:overworld",
				x: region?.x ?? 0,
				y: 64,
				z: region?.z ?? 0
			};
			return {
				world: {
					...s.world,
					pois: [...s.world.pois, poi]
				},
				events: [...s.events, engineEvent("POI_REGISTERED", id)].slice(-80),
				logs: pushLog(s.logs, logLine("WORLD", `Registered POI ${id}`), s.config.debugMode)
			};
		});
	},
	postWorldEvent: (type, payload) => {
		const event = {
			id: `we-${Date.now().toString(36)}`,
			type: type.trim() || "generic",
			payload: payload.trim(),
			gameTime: get().world.day * 24e3 + get().world.timeOfDay
		};
		set((s) => ({
			world: {
				...s.world,
				worldEvents: [...s.world.worldEvents, event].slice(-64)
			},
			events: [...s.events, engineEvent("WORLD_EVENT", `${event.type} ${event.payload}`)].slice(-80)
		}));
	},
	emitPlayer: (name, joining) => {
		set((s) => {
			const now = s.world.day * 24e3 + s.world.timeOfDay;
			const existing = s.world.players.find((p) => p.name === name);
			const players = joining ? existing ? s.world.players.map((p) => p.name === name ? {
				...p,
				online: true,
				logins: p.logins + 1,
				lastSeenDayTime: now,
				lastDimension: s.world.dimension
			} : p) : [...s.world.players, {
				uuid: `sim-${name.toLowerCase()}`,
				name,
				logins: 1,
				lastDimension: s.world.dimension,
				lastSeenDayTime: now,
				online: true
			}] : s.world.players.map((p) => p.name === name ? {
				...p,
				online: false,
				lastSeenDayTime: now
			} : p);
			return {
				world: {
					...s.world,
					players
				},
				events: [...s.events, engineEvent(joining ? "PLAYER_LOGIN" : "PLAYER_LOGOUT", name)].slice(-80)
			};
		});
	},
	resetPack: () => {
		set({
			enabled: defaultEnabledMap(),
			config: DEFAULT_CONFIG,
			world: initialWorld()
		});
		if (get().engine !== "IDLE") get().discover();
	}
}));
var NAV = [
	{
		to: "/",
		label: "Core",
		icon: LayoutGrid
	},
	{
		to: "/discovery",
		label: "Discovery",
		icon: Boxes
	},
	{
		to: "/knowledge",
		label: "Knowledge",
		icon: BookOpen
	},
	{
		to: "/adapters",
		label: "Adapters",
		icon: Cable
	},
	{
		to: "/systems",
		label: "Systems",
		icon: Swords
	},
	{
		to: "/world",
		label: "World",
		icon: Globe
	},
	{
		to: "/events",
		label: "Events",
		icon: Radio
	},
	{
		to: "/source",
		label: "Source",
		icon: SquareStack
	},
	{
		to: "/config",
		label: "Config",
		icon: Cog
	},
	{
		to: "/roadmap",
		label: "Roadmap",
		icon: Map$1
	}
];
var MOBILE_PRIMARY = [
	"/",
	"/discovery",
	"/systems",
	"/source"
];
function AppShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const engine = useEngine((s) => s.engine);
	const boot = useEngine((s) => s.boot);
	const tick = useEngine((s) => s.tick);
	(0, import_react.useEffect)(() => {
		if (useEngine.getState().engine === "IDLE") boot();
	}, [boot]);
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(() => tick(), 900);
		return () => window.clearInterval(id);
	}, [tick]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-dvh",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "hidden lg:flex w-56 shrink-0 flex-col border-r border-border bg-bg-elevated",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-5 pt-6 pb-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl leading-none tracking-tight",
							children: "WorldForge"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs text-muted",
							children: "Forge 1.21.1 · 0.4.0"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex-1 px-3 space-y-0.5",
						children: NAV.map((item) => {
							const active = pathname === item.to;
							const Icon = item.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: cn("flex h-11 items-center gap-3 rounded-md px-3 text-sm transition-colors duration-150", active ? "bg-bg-subtle text-fg" : "text-muted hover:text-fg hover:bg-bg-subtle/60"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									className: "size-4 shrink-0",
									strokeWidth: 1.7
								}), item.label]
							}, item.to);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnginePill, {
						engine,
						className: "m-4"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "lg:hidden sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-bg/95 px-4 backdrop-blur-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xl leading-none",
						children: "WorldForge"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-muted",
						children: "Forge 1.21.1 · 0.4.0"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnginePill, { engine }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetTrigger, {
							className: "size-11 inline-flex items-center justify-center rounded-md text-fg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "sr-only",
								children: "Menu"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetContent, {
							side: "bottom",
							title: "Navigate",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
								className: "grid grid-cols-2 gap-2",
								children: NAV.map((item) => {
									const Icon = item.icon;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: item.to,
										className: "flex h-12 items-center gap-3 rounded-md border border-border bg-bg-subtle px-3 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), item.label]
									}, item.to);
								})
							})
						})] })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-8 pb-24 lg:pb-8",
					children
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			className: "lg:hidden fixed bottom-0 inset-x-0 z-30 border-t border-border bg-bg-elevated/95 backdrop-blur-sm pb-[env(safe-area-inset-bottom)]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-4",
				children: NAV.filter((n) => MOBILE_PRIMARY.includes(n.to)).map((item) => {
					const Icon = item.icon;
					const active = pathname === item.to;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						className: cn("flex h-14 flex-col items-center justify-center gap-1 text-[11px]", active ? "text-fg" : "text-muted"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							className: "size-4",
							strokeWidth: 1.7
						}), item.label]
					}, item.to);
				})
			})
		})]
	});
}
function EnginePill({ engine, className }) {
	const live = engine === "RUNNING";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex items-center gap-2 rounded-full border border-border bg-bg px-3 py-1.5 text-xs text-muted", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-1.5 rounded-full", live ? "bg-known" : engine === "IDLE" ? "bg-subtle" : "bg-partial") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "tabular-nums uppercase tracking-wider",
			children: engine
		})]
	});
}
var styles_default = "/assets/styles-B2sD0k4t.css";
var APP_NAME = "WorldForge";
var Route$10 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#0c0d0c"
			},
			{
				name: "description",
				content: "WorldForge — an extensible world-engine framework for Minecraft Forge 1.21.1 modpacks."
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400&family=Instrument+Serif:ital@0;1&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$9 = () => import("./routes-CQb5ltc5.mjs");
var Route$9 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./adapters-DhBcroA5.mjs");
var Route$8 = createFileRoute("/adapters")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./config-Byfv9pm4.mjs");
var Route$7 = createFileRoute("/config")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./discovery-CDhyKBBC.mjs");
var Route$6 = createFileRoute("/discovery")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./events-C5TAhC4l.mjs");
var Route$5 = createFileRoute("/events")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./knowledge-CzjKlxtX.mjs");
var Route$4 = createFileRoute("/knowledge")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./roadmap-7VunJKom.mjs");
var Route$3 = createFileRoute("/roadmap")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./source-Co_zeC1R.mjs");
var Route$2 = createFileRoute("/source")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./systems-DNB9qY5j.mjs");
var Route$1 = createFileRoute("/systems")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./world-7lJpOIbF.mjs");
var Route = createFileRoute("/world")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$9.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$10
	}),
	AdaptersRoute: Route$8.update({
		id: "/adapters",
		path: "/adapters",
		getParentRoute: () => Route$10
	}),
	ConfigRoute: Route$7.update({
		id: "/config",
		path: "/config",
		getParentRoute: () => Route$10
	}),
	DiscoveryRoute: Route$6.update({
		id: "/discovery",
		path: "/discovery",
		getParentRoute: () => Route$10
	}),
	EventsRoute: Route$5.update({
		id: "/events",
		path: "/events",
		getParentRoute: () => Route$10
	}),
	KnowledgeRoute: Route$4.update({
		id: "/knowledge",
		path: "/knowledge",
		getParentRoute: () => Route$10
	}),
	RoadmapRoute: Route$3.update({
		id: "/roadmap",
		path: "/roadmap",
		getParentRoute: () => Route$10
	}),
	SourceRoute: Route$2.update({
		id: "/source",
		path: "/source",
		getParentRoute: () => Route$10
	}),
	SystemsRoute: Route$1.update({
		id: "/systems",
		path: "/systems",
		getParentRoute: () => Route$10
	}),
	WorldRoute: Route.update({
		id: "/world",
		path: "/world",
		getParentRoute: () => Route$10
	})
};
var routeTree = Route$10._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { censusTotal as a, CATALOG as i, useEngine as n, cn as o, knowledgeCounts as r, router_exports as t };
