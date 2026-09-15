# First local-runner failure: diagnosis and recovery

Batch-001 (S31?S40) is NOT completed. The production queue and both original attempts remain byte-for-byte preserved. No canonical dialogue, cards, generated dataset, public version or review status has changed. Actual completed progress remains 60/960 singles and 10/115,200 pairs. S06+D49-b stays pending.

## Preservation

No non-interactive Codex child writer or runner lock was present at diagnosis. Existing Codex processes were editor app servers. Git status was saved before editing. The entire queue and attempt artifacts were copied to .checkpoint-work/runner-recovery-20260909/first-five, alongside git-status.txt and source-fingerprint.json. That initial fingerprint matched the queue guard exactly, including all pre-existing dirty-tree changes. Original attempts and counters have not been reset.

## First actionable error in each original attempt

Both commands used the installed Codex CLI 0.153.0 with -a never exec --sandbox read-only --ignore-user-config --ephemeral --skip-git-repo-check --json, separate temporary working directories, a schema file, and --output-last-message pointing to the correct absolute writer.json. Prompts prohibited tools and file edits; the CLI saved stdout/final artifacts. No read-only model was asked to create files. Exact arguments/cwd/output paths are preserved in each writer.process.json and writer.workspace.json.

- attempt-01: writer-validation first fails at S31-single-b / relationship. Evidence reads: ?B wants a less intrusive arrival and then advance notice, changing A's method twice.? It supplies no numbered turn citation. The existing gate requires A1, B2, A3, B4 or A5. Exit 0, no signal or timeout, 468579 ms, empty stderr, a completed turn, one final agent-message JSON with all 20 records, and no tool events. Per-record replay finds one completely valid record and nineteen with at least one contract failure; those are not nineteen semantic reviewer rejections.
- attempt-02: writer-validation first fails at S34-single-a / weightedTotal. Dimension ratings [4,2,4,3,3,3] calculate to 65, but the output says 64. S39-single-b has the same rating vector and same 64-versus-65 error. Exit 0, no signal or timeout, 470492 ms, empty stderr, completed turn, a complete 20-record final JSON, no tool events. Eighteen records fully validate unchanged. All numbered citations are present.

Evidence roots: .audit-runs/first-five/batch-001/attempt-01/ and attempt-02/. Each contains writer.input.json, writer.prompt.txt, writer.json, writer.proof.json, writer.process.json, writer.stdout.log, writer.stderr.log and writer.workspace.json. reports/runner-recovery/original-replay.json records per-scene replay results. There are NO original reviewer invocations or reviewer artifacts. No build/integration phase was reached.

JSONL was parsed separately from final JSON; summaries were not mistaken for artifacts; paths and required fields were present. The demonstrated faults were missing citations, derived arithmetic errors, and an error wrapper that hid useful diagnostics and mislabeled batch processing failures as twenty failed scenes.

## Recovered work and precise changes

The isolated recovered-writer directory preserves attempt-02's complete draft, all first-pass ratings/evidence, all mechanisms/confusions, all ten binding assessments and all 20 candidate dialogues. Only two weightedTotal fields are explicitly derived from 64 to 65. writer.raw.json preserves the raw model response; proof.rawOutputHash and proof.derivedTotals document the arithmetic transformation. Its raw hash matches the actual final CLI agent-message JSON. All 20 recovered writer records now pass the normal strict writer validator. No reviewer scores were invented; no draft is accepted or integrated. Nine candidates propose retention and eleven propose revision; these remain writer proposals, not completed counts.

The first isolated recovery-copy proof rename returned Windows EPERM. Its raw files and pending proof were retained, the pending proof was independently checked against the exact raw/output hashes and transformations, and the same rename then succeeded. Original production artifacts were untouched.

Implementation changes are limited to runner/orchestration validation, its artifact audit, fixtures and documentation:

- Per-field schema descriptions require numbered citations. Local validators now name the scene, pass, criterion and expected/actual total. Existing rubric, gates and validators remain strict.
- Derived totals preserve exact raw output and an auditable transformation; dimension ratings, evidence, dialogue and accept flags are never changed. The artifact audit traces raw output to CLI events.
- Stop summaries identify batch, attempt, stage and diagnostic paths; processing-blocked scenes remain pending. Actual reviewer rejections are reported separately. Legacy failed queue entries are classified correctly in summaries without rewriting history.
- Explicit recover-batch checks source reconciliation and a successful real two-scene pipeline, snapshots the queue, reuses proven drafts, preserves failed attempts/elapsed time, records a separate bounded recovery allowance and persists a batch-001 boundary. Ordinary resume does not reset exhausted retries. Repeated resume cannot cross a persisted boundary without an explicit through-batch argument.
- Reused writer usage is not counted a second time. Reviewer usage is saved even if its artifact later fails validation.

Regression fixtures use sanitized exact score/evidence excerpts from the original failures. Tests cover strict rejection, arithmetic provenance/tampering, diagnostic classification, repeated boundary stops, and preservation of explicit recovery history/budgets. They are artificial orchestration tests, never production approvals.

## Real two-scene test and external blocker

All local regression tests passed before the production-shaped S31 test. It used the actual worker.invoke path, exact S31 instructions/originals, both alternatives, production writer context, schemas, read-only temporary cwd, permissions and output handling. No echo probe was substituted.

1. e2e/: writer exited 1 after 58769 ms with terminal ?Incomplete response returned, reason: max_output_tokens?. No dialogue or completed-turn usage was returned. New schema regex/minLength constraints were then removed as an unproven addition; the strict local citation gate remains. This log does not establish the upstream cause.
2. e2e-02/: the CLI reported Windows socket access denial (os error 10013) and network reconnect attempts. Its specific waiting child was stopped; logs/process evidence were preserved. No writer artifact or reviewer was produced.
3. A network-enabled execution of the same script was requested through automatic approval review. It was rejected before launch: the review requires explicit user approval to transmit repository card/dialogue/review inputs to the external Codex service. No sandbox bypass, authentication change, new credentials or alternate data-export route was attempted.

The real writer-to-fresh-reviewer test therefore has NOT passed. Its failure is not an editorial rejection. Production recovery is intentionally gated on that test. The queue retains original elapsed 957300 ms and usage 67403 input / 29932 output tokens; failed small tests returned no completed-turn usage. No production retries have been added or launched. Batches 002?005 remain pending with zero attempts.

## Continuation semantics

Network/data-transfer approval is required first. Then rerun node .checkpoint-work/runner-recovery-20260909/e2e.cjs (same S31 two-scene pipeline; fresh e2e-03 directory was never launched). Only a validated passing result permits constructing the exact repair fingerprint evidence and running recover-batch. That command preserves original attempts 01/02 and records recovery starting at 03, with the existing two-attempt allowance separately recorded, never resetting elapsed time or counters.

After successful test and explicit recovery, the bounded continuation command is:

    node tools/local-audit-runner.cjs resume --queue .audit-runs/first-five/queue.json --codex 'C:\Users\Ted\.vscode\extensions\openai.chatgpt-26.901.22334-win32-x64\bin\windows-x86_64\codex.exe' --exclusive-editor --through-batch batch-001

Do not run ordinary resume expecting exhausted attempts to restart. Do not clear the boundary or launch batch-002. Full validation results are recorded separately in full-validation.json. No release ZIP, version change, commit, push or deployment is part of this repair.

## Final offline verification

Build, all six audit commands, and the full npm test chain passed in the fresh source copy. The runner suite passed all 23 fixtures. Full validation and comparison took 516972 ms (8m 37s). All 116,160 generated dialogue records are unchanged; zero direct revisions, zero newly reviewed scenes, zero changed pair drafts, and zero new dependent effects. All 19 original queue/artifact files and 547 protected source/data/history files matched the starting snapshot. Exact process logs and results are in full-validation/ and RESULTS.json. Native browser checks and ZIP extraction were not run: this repair integrates no app or dialogue changes and does not release a checkpoint.
