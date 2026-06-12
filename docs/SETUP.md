# Setup Guide

## Install

```bash
npm run install:app
npm run test:task
```

## npm mirror users (China)

If `npm install` fails for `@stellarshift/*`, add to `~/.npmrc`:

```ini
@stellarshift:registry=https://registry.npmjs.org/
```

Then retry `npm run install:app`.

## Docker sidecars

Requires Docker Desktop + `docker login` (only if pulling private images; these are public).

```bash
npm run docker:pull
npm run docker:up
```

No `docker build` in this repository.

## Ports

| Service | Port |
|---------|------|
| candidate-api | 3000 |
| chain-health-probe | 8081 |
| contract-metadata-api | 8082 |

## Optional jobs

```bash
npm run docker:init-indexer
npm run docker:snapshot
```
