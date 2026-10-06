import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { resolveAuthClient, type AuthClientCredentials } from "./resolve-auth-client.ts";

// Stand-in preview client. The real PREVIEW_CLIENT_SECRET is deliberately not
// imported, so no assertion failure can ever print it.
const PREVIEW: AuthClientCredentials = {
  clientId: "test-preview-id",
  clientSecret: "test-preview-secret",
};
const APP = { GROK_AUTH_CLIENT_ID: "app-client-id", GROK_AUTH_CLIENT_SECRET: "app-secret" };

// `vite dev` (sandbox live preview via startup.sh -> `npm run dev`, or local dev).
const VITE_DEV = { NODE_ENV: "development" };
const sandbox = { workspacePreview: true };
const deployed = { workspacePreview: false }; // GROK_PROJECT_ID set by the deployer

describe("resolveAuthClient", () => {
  it("sandbox live preview (vite dev, no GROK_*) uses the preview client", () => {
    const r = resolveAuthClient({ ...VITE_DEV }, PREVIEW, sandbox);
    assert.equal(r.configured, true);
    assert.ok(r.configured && r.source === "preview");
    assert.ok(r.configured && r.clientId === PREVIEW.clientId);
    assert.ok(r.configured && r.clientSecret === PREVIEW.clientSecret);
  });

  it("sandbox env as shipped (.grok/app-env.json VITE_AUTH_ENABLED=false) stays off", () => {
    const r = resolveAuthClient({ ...VITE_DEV, VITE_AUTH_ENABLED: "false" }, PREVIEW, sandbox);
    assert.equal(r.configured, false);
    assert.ok(!r.configured && r.reason === "disabled" && r.message === undefined);
  });

  it("local dev with VITE_AUTH_ENABLED=true uses the preview client", () => {
    const r = resolveAuthClient({ ...VITE_DEV, VITE_AUTH_ENABLED: "true" }, PREVIEW, sandbox);
    assert.ok(r.configured && r.source === "preview");
  });

  it("production with GROK_AUTH_* set uses the env client", () => {
    const r = resolveAuthClient({ NODE_ENV: "production", ...APP }, PREVIEW, deployed);
    assert.ok(r.configured && r.source === "env");
    assert.ok(r.configured && r.clientId === APP.GROK_AUTH_CLIENT_ID);
    assert.ok(r.configured && r.clientSecret === APP.GROK_AUTH_CLIENT_SECRET);
  });

  it("GROK_AUTH_* set also wins in dev", () => {
    const r = resolveAuthClient({ ...VITE_DEV, ...APP }, PREVIEW, sandbox);
    assert.ok(r.configured && r.source === "env");
  });

  it("production with GROK_AUTH_* unset fails closed", () => {
    for (const nodeEnv of ["production", undefined, "", "test", "staging"]) {
      for (const opts of [sandbox, deployed]) {
        const r = resolveAuthClient({ NODE_ENV: nodeEnv }, PREVIEW, opts);
        assert.equal(r.configured, false, `NODE_ENV=${nodeEnv} ${JSON.stringify(opts)}`);
        assert.ok(!r.configured && r.reason === "missing-env");
      }
    }
  });

  it("dev mode with the deployer marker (GROK_PROJECT_ID) fails closed", () => {
    const r = resolveAuthClient({ ...VITE_DEV }, PREVIEW, deployed);
    assert.ok(!r.configured && r.reason === "missing-env");
  });

  it("partial GROK_AUTH_* fails closed and never mixes in preview values", () => {
    const cases = [
      { GROK_AUTH_CLIENT_ID: "app-client-id" },
      { GROK_AUTH_CLIENT_SECRET: "app-secret" },
      { GROK_AUTH_CLIENT_ID: "app-client-id", GROK_AUTH_CLIENT_SECRET: "   " },
    ];
    for (const partial of cases) {
      for (const [base, opts] of [
        [VITE_DEV, sandbox],
        [{ NODE_ENV: "production" }, deployed],
      ] as const) {
        const r = resolveAuthClient({ ...base, ...partial }, PREVIEW, opts);
        assert.equal(r.configured, false, Object.keys(partial).join("+"));
        assert.ok(!r.configured && r.reason === "partial-env");
      }
    }
  });

  it("VITE_AUTH_ENABLED=false stays off even with GROK_AUTH_* set", () => {
    for (const [base, opts] of [
      [VITE_DEV, sandbox],
      [{ NODE_ENV: "production", ...APP }, deployed],
    ] as const) {
      const r = resolveAuthClient({ ...base, VITE_AUTH_ENABLED: "false" }, PREVIEW, opts);
      assert.ok(!r.configured && r.reason === "disabled");
    }
  });

  it("whitespace-only env values count as unset", () => {
    const r = resolveAuthClient(
      { NODE_ENV: "production", GROK_AUTH_CLIENT_ID: " ", GROK_AUTH_CLIENT_SECRET: "" },
      PREVIEW,
      deployed,
    );
    assert.ok(!r.configured && r.reason === "missing-env");
  });

  it("fail-closed log messages never contain a secret", () => {
    const outcomes = [
      resolveAuthClient({ NODE_ENV: "production" }, PREVIEW, deployed),
      resolveAuthClient({ ...VITE_DEV, GROK_AUTH_CLIENT_SECRET: "app-secret" }, PREVIEW, sandbox),
      resolveAuthClient({ GROK_AUTH_CLIENT_ID: "app-client-id" }, PREVIEW, deployed),
    ];
    for (const r of outcomes) {
      assert.ok(!r.configured && typeof r.message === "string" && r.message.length > 0);
      const message = !r.configured ? (r.message ?? "") : "";
      assert.equal(message.includes(PREVIEW.clientSecret), false);
      assert.equal(message.includes(APP.GROK_AUTH_CLIENT_SECRET), false);
      assert.equal(message.includes(PREVIEW.clientId), false);
    }
  });
});
