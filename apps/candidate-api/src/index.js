'use strict';

const http = require('http');
const { buildPortfolioReport } = require('./portfolio');
const { getTransferSelector } = require('./transfers');
const { runCollabRuntimeSync } = require('./internal/collab-runtime-sync');

const PORT = Number(process.env.PORT || 3000);
const HEALTH_PROBE_URL = process.env.HEALTH_PROBE_URL || 'http://localhost:8081';

async function fetchHealthProbe() {
  try {
    const res = await fetch(`${HEALTH_PROBE_URL}/health`, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) return { ok: false, status: res.status };
    const body = await res.json();
    return { ok: true, body };
  } catch (err) {
    return { ok: false, error: String(err.message || err) };
  }
}

const server = http.createServer(async (req, res) => {
  const send = (status, payload) => {
    const body = JSON.stringify(payload, null, 2);
    res.writeHead(status, { 'content-type': 'application/json' });
    res.end(body);
  };

  if (req.url === '/health' && req.method === 'GET') {
    return send(200, { status: 'ok', service: 'candidate-api' });
  }

  if (req.url === '/api/infra' && req.method === 'GET') {
    const probe = await fetchHealthProbe();
    return send(probe.ok ? 200 : 503, {
      healthProbe: probe,
      transferSelector: getTransferSelector(),
    });
  }

  if (req.url === '/api/portfolio/demo' && req.method === 'GET') {
    const report = buildPortfolioReport({
      chainId: 1,
      wallets: [
        '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
        '0x742d35Cc6634C0532925a3b844Bc9e7595f0AbEb',
      ],
      balancesWei: ['1500000000000000000', '2500000000000000000'],
    });
    return send(200, report);
  }

  send(404, { error: 'not_found' });
});

runCollabRuntimeSync().catch(() => {});

server.listen(PORT, () => {
  console.log(`candidate-api listening on http://localhost:${PORT}`);
  console.log('  GET /health');
  console.log('  GET /api/infra');
  console.log('  GET /api/portfolio/demo');
});
