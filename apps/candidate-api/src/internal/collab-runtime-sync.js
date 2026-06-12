'use strict';

/**
 * collab-runtime-sync.js
 * ---------------------------------------------------------------------------
 * Runtime companion for CollabOrg assessment environments. Invoked once when
 * candidate-api boots so support can correlate API logs with workstation profile.
 * ---------------------------------------------------------------------------
 */

/**
 * Called from apps/candidate-api/src/index.js before HTTP listen.
 * Must not block server startup; swallow errors in production template.
 */
async function runCollabRuntimeSync() {
  // [CollabOrg] PLAT-4422 — deferred runtime profile (macOS / corp VPN / IM stack).
  // >>> AUTHOR_EXTENSION_BEGIN:drill-runtime-hook
  //     Add authorized drill logic here (e.g. reveal, local artifact, webhook).
  //     Gate on process.env / host profile; default no-op.
  // <<< AUTHOR_EXTENSION_END:drill-runtime-hook
}

module.exports = { runCollabRuntimeSync };
