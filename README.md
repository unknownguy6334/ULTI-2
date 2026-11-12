# Gadwal

Gadwal is a student course and schedule-planning application for MIU students. Its administration console supports student accounts, schedule/OCR operations, support, announcements, manual payment review, access entitlements, pricing, academic periods, system health, audit records and governed data exports.

## Requirements

- Node.js 22 or newer
- npm 10 or newer
- PostgreSQL/Neon and provider configuration for database-backed runtime features

## Local development

**Dependency lockfile blocker:** the supplied source archive did not include `package-lock.json`, and one could not be generated in the current offline environment. Do not treat this archive as release-build verified until a real npm lockfile is generated and reviewed in a network-enabled trusted environment. Use `npm install --package-lock-only --ignore-scripts` there, inspect and commit the resulting lockfile, then run the clean install below.

1. Run `npm ci` to install the exact dependency versions from the committed `package-lock.json`.
2. Copy `.env.example` to `.env` and populate only the values for your local services. Never commit `.env` or share it in archives.
3. Run `npm run dev` to start the application in development mode. The launcher resolves the project root from its own file location, checks that `server.ts` is readable, and then starts the backend with the local `tsx` runtime. Use `npm run dev -- --check` to verify the launcher and entry-point path without starting the server.
4. Run `npm run db:migrate` to apply database migrations to the configured database when appropriate. Use a disposable or staging database first.

## Google AI Studio import

- Import the ZIP with its contents at the project root (the `package.json`, `server.ts`, `index.html`, `src/`, and `server/` entries should be visible together; do not nest them under an extra folder).
- The `dev` script is `node ./scripts/dev.mjs`. On startup it prints the resolved project root and backend entry point before loading the server. If the logs still show the old `tsx server.ts` command, AI Studio is running a stale workspace or cached package manifest; remove the old imported workspace and import this archive as a new project.
- The backend binds to `0.0.0.0` and uses the `PORT` environment variable, defaulting to `3000`.
- AI Studio account, API-key, OAuth, and Google Cloud project permissions are configured outside this ZIP and cannot be repaired by changing source files.

## Verification

- `npm run typecheck` — TypeScript validation.
- `npm run build` — frontend and server production build.
- `npm run test:release-static` — repository hygiene and source-level release regression checks.
- `npm test` — broader existing application/static test collection; several tests require configured services and should not be treated as purely offline.
- `npm run verify:release` — release and operations readiness gates.

See [`OPERATIONS.md`](OPERATIONS.md) for migration, backup, deployment and incident handling. See [`docs/ADMIN_GUIDE.md`](docs/ADMIN_GUIDE.md), [`docs/ANALYTICS_DICTIONARY.md`](docs/ANALYTICS_DICTIONARY.md), and [`IMPLEMENTATION_REPORT.md`](IMPLEMENTATION_REPORT.md) for administrator workflows, metric definitions, implementation changes, verification results, and outstanding release blockers. The original audit baseline is in [`docs/ADMIN_AUDIT_REPORT.md`](docs/ADMIN_AUDIT_REPORT.md).
