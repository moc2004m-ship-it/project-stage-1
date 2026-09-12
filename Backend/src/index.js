const express = require('express');
const pinoHttp = require('pino-http');
const logger = require('./logger');

const app = express();
const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || 'development';

// Every request is logged in structured JSON — this is what feeds
// the centralized log pipeline (see logging/README.md).
app.use(pinoHttp({ logger }));

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    env: ENV,
    service: 'backend',
    timestamp: new Date().toISOString(),
  });
});

app.get('/', (req, res) => {
  res.json({ message: `Backend instance running in ${ENV}` });
});

app.listen(PORT, () => {
  logger.info(`Backend instance listening on port ${PORT} [${ENV}]`);
});
