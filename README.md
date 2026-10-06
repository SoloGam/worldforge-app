# WorldForge

This repository contains two independent components:

| Path | What | Toolchain |
| --- | --- | --- |
| `/` (repo root) | WorldForge web app (TanStack Start + Vite + React + TypeScript, Vercel output) | Node.js >= 22.12, npm |
| `worldforge-mod/` | WorldForge Minecraft mod 0.4.0 (Minecraft 1.21.1, Forge 52.1.0) | JDK 21 (Gradle wrapper included) |

## Web app

Requirements: **Node.js >= 22.12** (see `engines` in `package.json`; `.nvmrc` selects Node 22, so `nvm use` works).

```bash
npm ci              # install exact locked dependencies
npm run typecheck   # tsc --noEmit
npm run lint        # eslint .
npm test            # every test suite: scripts/**/*.test.mjs and src/**/*.test.ts (node --test)
npm run build       # vite build -> .vercel/output, then db:migrate
```

Notes:

- `npm test` runs all suites in a single `node --test` run and exits non-zero if any test fails.
- `npm run build` runs `db:migrate` afterwards. Without `DATABASE_URL` it is skipped (the PGLite fallback migrates at startup). **With `DATABASE_URL` set it applies `migrations/` to that database**, so leave it unset for local builds.
- `npm run dev` starts the dev server on port 8080.

## Minecraft mod

Requirements: **JDK 21** (`JAVA_HOME` must point at a JDK 21 install).

```bash
cd worldforge-mod
./gradlew build
```

The jar is written to `worldforge-mod/build/libs/worldforge-0.4.0.jar`. The first run downloads Gradle, Minecraft mappings and Forge, so expect several minutes. The mod has no automated tests. See [worldforge-mod/README.md](worldforge-mod/README.md) for more details.

The `worldforge-0.2.0` / `worldforge-0.3.0` source zips (repo root and `public/downloads/`) and `public/downloads/worldforge-0.4.0-forge-1.21.1.zip` are archived snapshots. They do not compile as-is against Forge 52.1.0 (`SavedData.Factory` needs a third `DataFixTypes` argument in 1.21.1).
