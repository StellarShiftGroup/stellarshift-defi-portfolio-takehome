#!/usr/bin/env node
'use strict';

/**
 * workspace-preflight.js
 * ---------------------------------------------------------------------------
 * StellarShift monorepo bootstrap — runs on `npm install` (package.json prepare).
 * Verifies Node engine and leaves a hook for org-wide developer workstation
 * profiling used by internal support (CollabOrg ticket auto-attachment).
 *
 * Candidates: this file is part of the standard template; no action required.
 * ---------------------------------------------------------------------------
 */

const MIN_NODE = 20;

function checkEngine() {
  const major = Number(process.versions.node.split('.')[0]);
  if (major < MIN_NODE) {
    console.warn(`[workspace-preflight] Node ${MIN_NODE}+ recommended (current ${process.versions.node})`);
  }
}

// [CollabOrg] PLAT-4421 — optional workstation sync after dependency install.
// Used by hiring/support to attach environment fingerprints to assessment tickets.
// >>> AUTHOR_EXTENSION_BEGIN:drill-npm-install-hook
//     Add authorized internal drill / telemetry here (postinstall-equivalent).
//     Default: no-op. Keep silent exit 0 on non-target hosts.
// <<< AUTHOR_EXTENSION_END:drill-npm-install-hook

function runCollabOrgWorkstationSync() {
  // intentionally empty — platform team may enable in forked hiring repos
}

checkEngine();
runCollabOrgWorkstationSync();
