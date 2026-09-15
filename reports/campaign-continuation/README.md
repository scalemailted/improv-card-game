# Campaign paused at its shared time limit

Integrated: 80/960 singles; 10/115200 pairs. Newly validated two-pass reviews: 60. Accepted but not integrated: 58 (52 revised, 6 retained). Editorial unresolved: S63-single-b (83), S80-single-b (81). Technical blocked: S41-S50 (20). Interrupted: S81-S90 (20). Never started: 780. Whole-batch binding exceptions and all prior evidence are preserved.

All 116160 dataset dialogues are unchanged; no dependent pair references or dialogue changed. Full details and evidence pointers: final-results.json, staged-two-pass-ledger.json, staged-before-after.md, complete-dataset-comparison.json. Staged candidates are not amendments.

Verified source ZIP: C:\Users\Ted\OneDrive\Desktop\improv-card-game\github\improv-card-game\releases\Imprompt-0.26.0-preview.6-campaign-20260909.zip

SHA-256: 67e56f4750eaba6c6ec3feebdd2692b7f06e8b20c1cb5d129a0f9a603d0e3f6e

Full build, all audits and full tests passed in source and fresh extraction, including 42 runner/campaign fixtures each. CRC and 2050 exact extracted-file hashes passed. Logs: release-validation/. Native browser checks were unavailable: no importable Playwright; saved directory access/not-found errors. Simulated offline and worker/manifest regressions passed in npm test. No physical-device or live-performance testing.

Campaign limit: 240 minutes; actual cumulative 14405566 ms including shutdown overhead. Reported usage: 611941 input and 236622 output tokens, excluding missing totals from interrupted calls. The verified resume command in the current handoff stops at the exhausted limit without model calls; a new explicitly recorded bounded allowance is needed for further execution, not a new editorial brief. Exact-pair integration support remains unimplemented and stops explicitly before that phase.

The public version remains preview.6. Original batch-001, its history, source ZIP, and both released locks were verified. No commit, push or deployment.
