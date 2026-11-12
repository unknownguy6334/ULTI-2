# Gadwal Launch Setup

This checklist is the controlled path from the source archive to a verified deployment. Do not treat a successful preview as proof that database, authentication, Gemini, payments, or production access are configured.

## 1. Runtime and installation

- Use Node.js 22+ and npm 10.9.8+. The project uses a Vite 6-compatible pinned React plugin.
- Ensure the complete project root contains `package.json`, `server.ts`, `index.html`, `src/`, and `server/`.
- In a network-enabled trusted environment, generate the real npm lockfile with `npm install --package-lock-only --ignore-scripts`, review it, and commit it. Do not fabricate a lockfile.
- Run `npm ci`, `npm run typecheck`, `npm run build`, and `npm run test:release-static` from a clean checkout.
- In Google AI Studio, import the project root (not a nested folder) and confirm the `dev` command is `node ./scripts/dev.mjs`. The launcher prints the root and the exact backend entrypoint. If the log still shows `tsx server.ts`, the old manifest/workspace is still running.

## 2. Secrets and access

- Configure `DATABASE_URL`, `NEON_AUTH_URL`, and `GEMINI_API_KEY` in the production secret manager.
- Configure a valid HTTPS `APP_ORIGIN`, exact `ALLOWED_ORIGINS`, and the required OAuth settings.
- The original hardcoded proxy value has been restored as a compatibility fallback. For production, generate a unique high-entropy `GADWAL_PROXY_SECRET` (which overrides the fallback) and configure the trusted proxy to send the matching `x-gadwal-proxy-secret` header. Treat the legacy fallback as compromised and rotate away from it.
- Set `REQUIRE_TRUSTED_PROXY=true` only when the exact proxy CIDRs are configured in `TRUSTED_PROXY_CIDRS`. Never trust arbitrary forwarded headers.
- Rotate any credentials that may have appeared in previously shared files or source history.

## 3. Database and service readiness

- Back up the intended database and verify a restore into an isolated environment.
- Apply migrations to staging first with `npm run db:migrate`. Review the migration plan before production.
- Verify `/health` and `/api/health/ready`; the latter must report required service dependencies as ready.
- Test sign-in, student-owned data access, schedule/OCR flow, payment review using test records only, entitlement changes, support workflows, and role-based admin access.

## 4. Release, monitoring, and rollback

- Run `npm run verify:predeploy` and preserve the outputs with the release record.
- Deploy the generated `dist/` output only after build and typecheck succeed.
- Configure uptime checks, Cloud Monitoring alerts, and error correlation using the server `errorId` and `requestId`. Do not log credentials or customer data.
- Before rollout, identify the last known-good application artifact and database backup.
- If a release fails, route traffic back to the last known-good artifact. Restore the database only when a reviewed recovery plan requires it; do not automatically reverse migrations or discard newer writes.
- Perform a periodic restore drill in an isolated database and document the verified restore point and recovery steps.
