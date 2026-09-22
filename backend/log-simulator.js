/**
 * log-simulator.js
 *
 * Simulates a cloud log stream by posting fake log entries to
 * POST /api/logs on a set interval. Standing in for a real source
 *
 * Requires Node 18+ (for built-in fetch). If you're on an older
 * Node version, install node-fetch and uncomment the import below.
 */



const API_URL = 'http://localhost:3000/api/logs'; //local server 

const AGENTS = ['payment-service', 'auth-service', 'inventory-service', 'notification-service'];
const LEVELS = ['info', 'warn', 'error'];

const SAMPLE_MESSAGES = {
  info: [
    'Request processed successfully',
    'Health check passed',
    'Cache refreshed',
  ],
  warn: [
    'Response time exceeded 800ms',
    'Retrying failed request (attempt 2/3)',
    'Connection pool nearing capacity',
  ],
  error: [
    'Failed to connect to database - connection timeout',
    'Unhandled exception in request handler',
    'Third-party API returned 503',
  ],
};

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}


// mirrors realistic traffic. Adjust weights to test anomaly detection later.
function randomLevel() {
  const roll = Math.random();
  if (roll < 0.75) return 'info';
  if (roll < 0.93) return 'warn';
  return 'error';
}

function buildFakeLog() {
  const level = randomLevel();
  return {
    tenantId: 'demo-tenant',
    agentname: randomFrom(AGENTS),
    level,
    message: randomFrom(SAMPLE_MESSAGES[level]),
    meta: {
      latencyMs: Math.floor(Math.random() * 1000),
      statusCode: level === 'error' ? 500 : level === 'warn' ? 429 : 200,
    },
  };
}

async function sendLog() {
  const log = buildFakeLog();
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(log),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error(`[simulator] Server rejected log (${res.status}):`, errText);
      return;
    }

    console.log(`[simulator] Sent ${log.level.toUpperCase()} log from ${log.agentname}`);
  } catch (err) {
    console.error('[simulator] Failed to send log:', err.message);
  }
}

const INTERVAL_MS = 2000; // one fake log every 2 seconds — adjust as needed

console.log(`[simulator] Starting log simulator, posting to ${API_URL} every ${INTERVAL_MS}ms`);
setInterval(sendLog, INTERVAL_MS);