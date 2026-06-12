# Take-Home Task — DeFi Portfolio API

**Role:** Backend / Full-Stack (Web3)  
**Time box:** 3–4 hours (guidance only)

---

## Context

StellarShift's portfolio dashboard ingests wallet addresses and produces a **normalized JSON report** per chain: checksum addresses, human-readable balances, and explorer deep-links.

This repository ships:

- A starter API in `apps/candidate-api/`
- **npm dependencies** — `@stellarshift/*` utilities (install via `npm run install:app`)
- **Docker sidecars** — pulled from Docker Hub via `docker-compose.yml` (see [docs/DEPENDENCIES.md](./docs/DEPENDENCIES.md))

Your job is to complete the remaining tasks and harden the solution.

---

## Task 1 — Portfolio normalization (required)

**File:** `apps/candidate-api/src/portfolio.js`

The stub already builds a basic report. Extend it to:

1. Support **multiple chain IDs** via a new exported helper:

   ```js
   buildMultiChainReport({ chains: [{ chainId, wallets, balancesWei }] })
   ```

2. Sort positions by **descending** `nativeBalance` (numeric, not string sort).

3. Add `totalNativeBalance` per chain (sum of wei, formatted with `formatEther`).

**Tests:** add cases in `apps/candidate-api/test/portfolio.test.js`.

---

## Task 2 — Transfer decoding helpers (required)

**File:** `apps/candidate-api/src/transfers.js`

1. Export `getTransferTopic0()` using `@stellarshift/abi-tools` for event  
   `Transfer(address,address,uint256)`.

2. Export `parseTransferAmount(rawWei)` → human string with 18 decimals.

3. Document expected log shape in a code comment (topic0 + indexed args).

---

## Task 3 — Infra integration (optional, +bonus)

**File:** `apps/candidate-api/src/index.js`

Start sidecars first:

```bash
npm run docker:up
```

When `chain-health-probe` is running:

1. `GET /api/infra` should include `rpcProbe` by calling  
   `GET http://localhost:8081/probe?rpc=<DEFAULT_RPC>`.

2. Return HTTP 200 only when both candidate-api and probe are healthy.

Handle probe timeout gracefully (do not crash the server).

---

## Task 4 — Snapshot worker alignment (optional)

Run the snapshot worker once:

```bash
npm run docker:snapshot
```

Inspect output under `./data/snapshots/` (schema `stellarshift.portfolio-snapshot/v1`).

Add an endpoint `GET /api/portfolio/snapshot-schema` that returns the expected JSON schema your API produces (inline object or JSON Schema — your choice).

---

## Acceptance criteria

| # | Criteria |
|---|----------|
| 1 | `npm run install:app` succeeds |
| 2 | `npm run test:task` passes |
| 3 | `npm run dev:api` serves `/api/portfolio/demo` with valid JSON |
| 4 | Consume `@stellarshift/*` as npm packages only — do not vendor or fork them |
| 5 | `SOLUTION.md` explains design choices |

---

## Out of scope

- Real RPC balance fetching (use provided wei strings)
- Private keys, signing, or mainnet transactions
- Modifying Docker images to add privileged/host-network flags
- Forking or copying `@stellarshift/*` source into this repo

---

## Evaluation rubric

| Area | Weight |
|------|--------|
| Correctness & tests | 40% |
| Code clarity | 25% |
| Web3 domain usage (`@stellarshift/*` npm libs) | 20% |
| Error handling & edge cases | 15% |

Good luck — we're excited to read your `SOLUTION.md`.
