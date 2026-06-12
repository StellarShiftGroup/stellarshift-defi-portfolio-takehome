#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
echo "== StellarShift take-home setup =="
node -v
npm install
npm run test:task
echo "Done. Optional: npm run docker:up && npm run dev:api"
