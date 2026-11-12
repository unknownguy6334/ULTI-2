# Infrastructure Baseline

## Runtime

- Node.js 22 or newer and npm 10.9.8 or newer.
- The application is a full-stack Node.js/Express service with Vite middleware in development and a generated `dist/` frontend/server bundle in production.
- The service binds to `0.0.0.0` and uses `PORT` (default `3000`). The host must route HTTP traffic to that port.
- Use `npm run dev` for development, `npm run build` for a production artifact, and `npm start` to run that artifact.

## Required production configuration

- Supply `DATABASE_URL`, `NEON_AUTH_URL`, `GEMINI_API_KEY` (or `GOOGLE_API_KEY`), and a valid HTTPS `APP_ORIGIN` through the host's secret/environment manager.
- Set exact trusted `ALLOWED_ORIGINS` and `FRAME_ANCESTORS` values for the published domain.
- If requests to a production `run.app` host use the Gadwal proxy-header check, configure a unique `GADWAL_PROXY_SECRET` and inject the same value in `x-gadwal-proxy-secret` at the trusted proxy.
- When `REQUIRE_TRUSTED_PROXY=true`, provide explicit trusted network ranges in `TRUSTED_PROXY_CIDRS`; startup rejects an empty list.
- Never enable unrestricted proxy trust or put server secrets in `VITE_` variables.

## Deployment and operations

- Generate and commit a real npm `package-lock.json` from a network-enabled trusted environment before CI/release use. CI intentionally uses `npm ci` and refuses unlocked dependency resolution.
- Verify `npm run typecheck`, `npm run build`, and `npm run test:release-static` before deployment.
- Run database migrations against staging first, keep encrypted database backups, and perform a restore drill.
- Monitor `/health` and `/api/health/ready`, HTTP 5xx rates, and startup failures. Correlate server diagnostics with generated `requestId` and `errorId` fields.
- Keep the last known-good artifact and a reviewed database rollback/recovery procedure available for every release.
