/**
 * Pick the broker OAuth client for `server.ts` (pure, dependency-free, so it is
 * unit-testable without loading Better Auth / pg / PGLite).
 *
 * - `VITE_AUTH_ENABLED=false` -> auth off (unchanged).
 * - Both `GROK_AUTH_CLIENT_ID` and `GROK_AUTH_CLIENT_SECRET` set -> per-app client.
 * - Only one of them set -> fail closed. Never mixed with the preview values.
 * - Neither set -> the shared preview client ONLY in the sandbox live preview or
 *   local dev, i.e. under `vite dev` (`NODE_ENV === "development"`) with no
 *   deployer marker (`GROK_PROJECT_ID`, see `isWorkspacePreview()`). Anywhere
 *   else -> fail closed.
 *
 * Why `NODE_ENV === "development"`: `vite dev` (what `npm run dev` / startup.sh
 * run for the live preview) sets it when unset, while `vite build` / `vite
 * preview` default to "production", and a `.env` file cannot set any other
 * value. It is a positive dev signal, so a production server that leaves
 * NODE_ENV unset still fails closed. It is also known at module init. A request
 * Host check (`*.grok-sandbox.com`) is per-request and spoofable, so it is not
 * used here. Better Auth's dynamic baseURL still pins callbacks to the preview
 * allowlist + loopback.
 */

export interface AuthClientCredentials {
  clientId: string;
  clientSecret: string;
}

export type AuthClientResolution =
  | ({ configured: true; source: "env" | "preview" } & AuthClientCredentials)
  | {
      configured: false;
      reason: "disabled" | "partial-env" | "missing-env";
      /** Server log line explaining the fail-closed state. Never contains a secret. */
      message?: string;
    };

export interface ResolveAuthClientOptions {
  /** `isWorkspacePreview()`: true unless the deployer marker GROK_PROJECT_ID is set. */
  workspacePreview: boolean;
}

/** Read an env var, treating empty/whitespace as unset. */
function read(env: Record<string, string | undefined>, key: string): string | undefined {
  const value = env[key]?.trim();
  return value ? value : undefined;
}

export function resolveAuthClient(
  env: Record<string, string | undefined>,
  preview: AuthClientCredentials,
  { workspacePreview }: ResolveAuthClientOptions,
): AuthClientResolution {
  if (read(env, "VITE_AUTH_ENABLED") === "false") {
    return { configured: false, reason: "disabled" };
  }

  const clientId = read(env, "GROK_AUTH_CLIENT_ID");
  const clientSecret = read(env, "GROK_AUTH_CLIENT_SECRET");
  if (clientId && clientSecret) {
    return { configured: true, source: "env", clientId, clientSecret };
  }
  if (clientId || clientSecret) {
    return {
      configured: false,
      reason: "partial-env",
      message:
        `[auth] Only ${clientId ? "GROK_AUTH_CLIENT_ID" : "GROK_AUTH_CLIENT_SECRET"} is set; ` +
        "both GROK_AUTH_CLIENT_ID and GROK_AUTH_CLIENT_SECRET are required. " +
        "Federated sign-in is OFF (fail closed); the shared preview client is not mixed in.",
    };
  }

  const nodeEnv = read(env, "NODE_ENV");
  if (nodeEnv === "development" && workspacePreview) {
    return { configured: true, source: "preview", ...preview };
  }
  return {
    configured: false,
    reason: "missing-env",
    message:
      "[auth] GROK_AUTH_CLIENT_ID / GROK_AUTH_CLIENT_SECRET are not set and this is not " +
      `the sandbox live preview or local dev (NODE_ENV=${nodeEnv ?? "unset"}, ` +
      `GROK_PROJECT_ID ${workspacePreview ? "unset" : "set"}). Federated sign-in is OFF ` +
      "(fail closed); the shared preview client is only used under `vite dev`.",
  };
}
