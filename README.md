# DeFi Portfolio Engineering — Take-Home Assessment

[![Node 20+](https://img.shields.io/badge/node-%3E%3D20-339933?logo=node.js)](package.json)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Docker](https://img.shields.io/badge/docker-compose-2496ED?logo=docker)](docker-compose.yml)

**StellarShift Labs** backend engineering assessment for our **DeFi Portfolio** squad.

You will extend a small Node.js service using published **`@stellarshift/*`** npm utilities and optional **Docker Hub** sidecars.

Estimated time: **3–4 hours**.

---

## Repository layout

```text
defi-portfolio-takehome-work/
├── apps/candidate-api/     # ← your main workspace
├── docs/                   # Setup & architecture
├── scripts/                # Bootstrap helpers
├── docker-compose.yml      # Pull sidecar images (no local build)
├── TASK.md                 # Assignment spec
└── package.json            # Root scripts only
```

**Not in this repo:** internal npm package sources and Docker build contexts — they are published to **npm** and **Docker Hub** (see [docs/DEPENDENCIES.md](./docs/DEPENDENCIES.md)).

---

## Prerequisites

| Tool | Version |
|------|---------|
| Node.js | 20+ |
| npm | 9+ |
| Docker Desktop | optional (for sidecars) |

---

## Quick start

### 1. Clone & install

```bash
git clone https://github.com/StellarShiftGroup/stellarshift-defi-portfolio-takehome.git
cd stellarshift-defi-portfolio-takehome
npm run install:app
```

This installs `@stellarshift/*` from the **public npm registry** into `apps/candidate-api/`.

> If you use a mirror for `npm install`, ensure scoped packages resolve to `https://registry.npmjs.org` (see `docs/SETUP.md`).

### 2. Run tests

```bash
npm run test:task
```

### 3. Optional — pull Docker sidecars

```bash
npm run docker:up
# chain-health-probe   → http://localhost:8081/health
# contract-metadata-api → http://localhost:8082/v1/chains
```

Images are pulled from Docker Hub (`stellarshift/*`); no build step in this repo.

### 4. Run candidate API

```bash
npm run dev:api
# http://localhost:3000/api/portfolio/demo
# http://localhost:3000/api/infra
```

### 5. Tear down

```bash
npm run docker:down
```

---

## Published dependencies

### npm (`apps/candidate-api/package.json`)

| Package | Registry |
|---------|----------|
| `@stellarshift/evm-address-kit` | npmjs.org |
| `@stellarshift/chain-metadata` | npmjs.org |
| `@stellarshift/token-units` | npmjs.org |
| `@stellarshift/abi-tools` | npmjs.org |

### Docker (`docker-compose.yml`)

| Image | Hub |
|-------|-----|
| `stellarshift/chain-health-probe:1.0.0` | [Docker Hub](https://hub.docker.com/r/stellarshift/chain-health-probe) |
| `stellarshift/contract-metadata-api:1.0.0` | [Docker Hub](https://hub.docker.com/r/stellarshift/contract-metadata-api) |
| `stellarshift/portfolio-snapshot-worker:1.0.0` | [Docker Hub](https://hub.docker.com/r/stellarshift/portfolio-snapshot-worker) |
| `stellarshift/indexer-bootstrap:1.0.0` | [Docker Hub](https://hub.docker.com/r/stellarshift/indexer-bootstrap) |

---

## Submission

1. Work in a **private** fork
2. Complete [TASK.md](./TASK.md)
3. Ensure `npm run test:task` passes
4. Submit repo link + [SOLUTION.md](./SOLUTION.md)

---

## License

MIT © StellarShift Labs. Assessment materials only.
