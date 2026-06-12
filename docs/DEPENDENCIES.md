# External dependencies (not vendored in this repo)

This assessment repo intentionally **does not** ship `packages/` or `services/` source trees.  
Candidates consume published artifacts only.

## npm — `@stellarshift/*`

Declared in `apps/candidate-api/package.json`:

```json
{
  "dependencies": {
    "@stellarshift/evm-address-kit": "^1.0.0",
    "@stellarshift/chain-metadata": "^1.0.0",
    "@stellarshift/token-units": "^1.0.0",
    "@stellarshift/abi-tools": "^1.0.0"
  }
}
```

Install:

```bash
npm run install:app
```

### Scoped registry (if using cnpm mirror)

Add to user `~/.npmrc`:

```ini
registry=https://registry.npmmirror.com
@stellarshift:registry=https://registry.npmjs.org/
```

---

## Docker Hub — sidecar images

`docker-compose.yml` pulls (no `build:`):

| Service | Image |
|---------|-------|
| chain-health-probe | `mang32/chain-health-probe:1.0.0` |
| contract-metadata-api | `mang32/contract-metadata-api:1.0.0` |
| portfolio-snapshot-worker | `mang32/portfolio-snapshot-worker:1.0.0` |
| indexer-bootstrap | `mang32/indexer-bootstrap:1.0.0` |

```bash
npm run docker:pull
npm run docker:up
```

Change the `mang32/` prefix in `docker-compose.yml` if your Hub namespace differs.
