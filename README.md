# HelixAI

**AI-powered cloud infrastructure monitoring platform** — built as a portfolio project by Ravi Yadav 
HelixAI  ingests service logs, is designed to detect anomalies, and uses LLM agents to diagnose root causes automatically — instead of an engineer manually digging through logs to figure out why something broke. Results are meant to surface on a real-time dashboard.

> This is an actively developed portfolio project, not a finished product. See [Current Status](#current-status) below for exactly what's built vs. planned
---

## What it does (concept)

1. **Log ingestion** — services post logs to a central API
2. **Anomaly detection** — flag unusual patterns (error spikes, traffic surges, repeated failures)
3. **AI root-cause diagnosis** — an LLM agent (LangChain.js + Gemini) reasons about *why* the anomaly happened, using the actual log data
4. **Incident tracking** — diagnosis gets recorded as an incident (service, status, message)
5. **Real-time dashboard** — incidents and status changes push live to the UI via Socket.IO

The core idea: traditional monitoring tools show you *that* something broke. HelixAI aims to also explain *why*, automatically.

---

## Tech stack

| Layer | Tech |
|---|---|
| Frontend | React (Vite), Tailwind CSS |
| Backend | Node.js, Express |
| Database | MongoDB (Mongoose) |
| AI / diagnosis | LangChain.js + Gemini API (Google AI Studio) |
| Real-time | Socket.IO |
| Planned | JWT auth, Redis, AWS SDK, Docker, GitHub Actions |

---

## Current status

**✅ Done**
- Backend skeleton: Express server, MongoDB connection via Mongoose
- `Incident` model and REST API (`POST /api/incidents`, `GET /api/incidents`)
- `Log` model and REST API (`POST /api/logs`, `GET /api/logs`) — supports filtering by agent/level/tenant and pagination
- `log-simulator.js` — generates realistic fake log traffic (weighted info/warn/error) for testing the pipeline without a real cloud source
- Frontend skeleton: React + Vite + Tailwind, fetches and displays incidents as live status-colored agent boxes
- Dashboard: clicking an agent box selects it (`selectedAgent` state wired up)

**🚧 In progress**
- Dashboard: rendering the selected agent's incident history (the actual detail view)
- End-to-end verification of the log ingestion pipeline

**📋 Planned**
- Anomaly detection logic (rule-based to start — e.g. error-rate thresholds)
- LangChain.js + Gemini integration for AI-driven root-cause diagnosis
- Socket.IO real-time layer (push incidents/diagnoses to the dashboard live)
- JWT auth, Redis caching, real AWS CloudWatch log ingestion (replacing the simulator), Docker, CI/CD

---

## Architecture notes

- **Why MongoDB:** incident/log data varies in shape by service — a document store fits better than forcing a rigid relational schema.
- **Why LangChain + Gemini:** free-tier friendly (no credit card required via Google AI Studio), and LangChain makes it straightforward to compose a multi-step reasoning chain for diagnosis rather than relying on a single prompt.
- **Detection vs. prevention:** HelixAI is an observability/triage layer, not a security tool. It's designed to flag and explain anomalies (including malicious-traffic-shaped ones, like spikes correlated with failed auth attempts) — it does not block or prevent attacks. A real deployment would pair this with dedicated tooling (WAF, GuardDuty, rate limiting) for prevention.
- **Log source:** currently a local simulator standing in for a real feed. The `/api/logs` endpoint is designed so a real source (AWS CloudWatch Logs API, Fluent Bit/Fluentd) could post to the same endpoint without changing the rest of the pipeline.

---

## Project structure

```
projects/
├── backend/
│   ├── config/
│   ├── db/
│   ├── models/         # Incident, Log schemas
│   ├── routes/         # /api/incidents, /api/logs
│   ├── log-simulator.js
│   ├── app.js
│   └── server.js
└── frontend/
    ├── src/
    └── vite.config.js
```

---

## Running it locally

**Backend**
```bash
cd backend
npm install
node server.js
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

**Simulate log traffic** (in a separate terminal, backend must be running)
```bash
cd backend
node log-simulator.js
```

You'll need a MongoDB instance running locally (or a connection string in your config) and, once the AI layer is built, a Gemini API key from Google AI Studio.

---

## Roadmap

- [x] Backend + frontend skeleton
- [x] Incident API
- [x] Log ingestion API + simulator
- [ ] Dashboard: incident history view
- [ ] Anomaly detection logic
- [ ] AI diagnosis (LangChain + Gemini)
- [ ] Real-time updates (Socket.IO)
- [ ] Auth, caching, real cloud log source, containerization, CI/CD
