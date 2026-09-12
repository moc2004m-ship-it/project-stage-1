# Centralized Logs — Stage 1

The backend already emits structured JSON logs for every request and startup
event (`Backend/src/logger.js`, using `pino`). To make these **centralized**
(searchable in one place across all instances), pick one path:

## Option A — Managed log drain (fastest, recommended for Stage 1)
1. Create a free account with a log ingestion service (e.g. Better Stack,
   Logtail, or your cloud provider's built-in log drain).
2. Get the ingestion token/URL.
3. Set `LOG_DRAIN_URL` as an environment variable / CI secret for Staging
   and Production.
4. Point your process manager or platform's log drain feature at stdout —
   most PaaS providers (Render, Fly.io, Railway) forward container stdout
   to a log drain automatically once configured in their dashboard.

## Option B — Self-hosted stack
Run Grafana Loki + Promtail (or the ELK stack) and have Promtail tail the
container's stdout/stderr. Heavier to operate — usually not worth it for
Stage 1.

## What "Definition of Done" requires
- [ ] Backend logs in structured JSON — **done** (`pino`).
- [ ] Logs from Development/Staging/Production reach ONE centralized place —
      requires you to complete Option A or B above with real
      credentials/account, which this sandbox cannot create on your behalf.
