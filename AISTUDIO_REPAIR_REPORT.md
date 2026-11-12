# Gadwal AI Studio Import Repair Report

Prepared: 2026-11-12

## Changes included in this archive

1. **ZIP extraction compatibility:** all regular project files are packaged as readable `0644` files, directories as traversable `0755` directories, and explicit directory entries are included. The project remains flat at the archive root; it is not nested inside an extra folder.
2. **Root-aware development startup:** `package.json` now runs `node ./scripts/dev.mjs`. The launcher resolves the project root from its own file path, verifies that `server.ts` exists and is readable, checks that `tsx` has been installed, honors a host-injected `--port`, changes to the project root, and launches the backend using Node's `--import tsx` loader. `npm run dev -- --check` tests the root and entry-point check without starting the app.
3. **Root-aware build and production startup:** the server bundler resolves input/output paths from its own location, and `npm start` uses a launcher that sets the working directory before loading `dist/server.cjs`.
4. **Vite ESM compatibility:** the Vite alias root is resolved from `import.meta.url` instead of relying on `__dirname` in an ES-module project.
5. **Hosted port alignment:** the example environment file now uses port `3000` consistently for `PORT`, `APP_ORIGIN`, and `ALLOWED_ORIGINS`.
6. **Proxy-secret compatibility:** the original hardcoded legacy proxy value has been restored as a fallback in `server.ts`, so the original configuration continues to work. `GADWAL_PROXY_SECRET` takes precedence when set, and comparison remains constant-time. The restored fallback is a known legacy credential and should be replaced with a unique value before production use.
7. **Proxy configuration validation:** `REQUIRE_TRUSTED_PROXY=true` or `DIRECT_DEPLOYMENT=false` now requires explicit `TRUSTED_PROXY_CIDRS`.
8. **Production database startup gate:** production no longer begins listening if the required database cannot be reached after bounded retries. Development and AI Studio previews can still start without database credentials.
9. **Dependency compatibility and toolchain metadata:** the React plugin is exact-pinned to `4.3.4`, which supports the project's Vite `6.4.3` line; the earlier audit expectation for plugin-react `6.1.1` was incompatible because plugin-react 6 dropped support for Vite 7 and below. Node/npm requirements and `packageManager` metadata are explicit.
10. **Documentation:** added an AI Studio import section, launch checklist, infrastructure baseline, and this repair report. Updated stale static checks to verify the intended compatible toolchain and the actual location of shared admin request timeouts.

## Verification performed

- ZIP integrity test: pass.
- Root-aware launcher check from project root and an unrelated working directory: pass.
- TypeScript/TSX syntax transpilation scan: 192 files, 0 syntax diagnostics.
- Relative application import scan: 504 imports checked, 0 unresolved.
- `package.json` script-local paths: 144 checked, 0 missing.
- Architecture/security/build contract: 22/22 pass.
- Deployment/observability checks: 20/20 pass.
- Resilience contract: 19/19 pass.
- Ultimate source audit: 38/38 pass.
- Secret/history scan, git/repository exposure, admin hardening, auth, server headers, and browser/environment static checks: pass.

## Remaining external/release gates

- **No `package-lock.json` is included.** The original project did not contain one. An authentic lockfile could not be generated because npm registry DNS resolution failed with `EAI_AGAIN`. A fake lockfile would make installation less trustworthy. Generate and review a real one in a network-enabled environment using `npm install --package-lock-only --ignore-scripts`, then run `npm ci`.
- **Full dependency installation, TypeScript typecheck, and production build were not completed** in this environment because the package registry was unreachable and dependencies were not installed. Static/syntax checks are not substitutes for those steps.
- **Google AI Studio account/project permission errors are outside the source archive.** This ZIP cannot grant Gemini Build Mode access, change Google Cloud IAM roles, accept Google terms, clear an account restriction, or repair an AI Studio service-side incident.
- Production deployment still requires real database/auth/Gemini settings. Set a unique `GADWAL_PROXY_SECRET` in the hosting secret manager to override the restored legacy fallback.

## Import note

Use Google AI Studio's File Explorer upload/import flow for a ZIP project, not the chat-message attachment area. Keep `package.json`, `server.ts`, `index.html`, `src/`, `server/`, and `scripts/` together at the project root. If the Build log still prints the old `tsx server.ts` command instead of `node ./scripts/dev.mjs`, AI Studio is using a stale project snapshot or manifest; import this archive into a fresh Build app/workspace and inspect the new launcher log.
