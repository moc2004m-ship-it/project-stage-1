// Centralized logger — structured JSON logs from day one.
// In dev: pretty-printed to stdout.
// In staging/production: raw JSON to stdout, which your log shipper
// (Grafana Loki agent, Better Stack, Datadog agent, CloudWatch agent, etc.)
// tails and forwards to a centralized log store.
//
// Set LOG_DRAIN_URL to also POST logs directly to a log ingestion endpoint
// (e.g. Better Stack / Logtail source token URL) — useful when you don't
// want to run a separate shipping agent yet.

const pino = require('pino');

const env = process.env.NODE_ENV || 'development';

const transport =
  env === 'development'
    ? { target: 'pino-pretty', options: { colorize: true } }
    : undefined;

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  base: { service: 'backend', env },
  transport,
});

module.exports = logger;
