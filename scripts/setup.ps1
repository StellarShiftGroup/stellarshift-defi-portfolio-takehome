$ErrorActionPreference = "Stop"
Set-Location (Join-Path $PSScriptRoot "..")
Write-Host "== StellarShift take-home setup ==" -ForegroundColor Cyan
node -v
npm install
npm run test:task
Write-Host "Done. Optional: npm run docker:up; npm run dev:api" -ForegroundColor Green
