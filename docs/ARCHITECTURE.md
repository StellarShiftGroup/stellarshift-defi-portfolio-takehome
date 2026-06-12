# Architecture

```text
┌──────────────────────────────────────────┐
│  apps/candidate-api                        │
│  npm install → @stellarshift/* (npmjs.org) │
└──────────────────┬───────────────────────┘
                   │
     optional      │  docker compose pull
                   ▼
┌──────────────────────────────────────────┐
│  Docker Hub sidecars (stellarshift/*)    │
│  :8081 health-probe  :8082 metadata-api   │
└──────────────────────────────────────────┘
```

## Principles

1. **No vendored libs** — `@stellarshift` packages come from npm.
2. **No local Docker build** — sidecars pulled from Docker Hub.
3. **Candidate code** lives only under `apps/candidate-api/`.
