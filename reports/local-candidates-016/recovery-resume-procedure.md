# Recovery after allowance-016

This procedure preserves the saved local writing. It does not authorize another allowance or the denied fresh-review/production operation.

1. Read README.md, working-summary.json, boundary-status.json, boundary-integrity.json, artifact-inventory-verification.json, new-scene-ledger.json, targeted-owner-repairs.json, exception-queue.json and pairs/candidate-manifest.json. Rehash the saved inventory before reuse. All 1518 selected pair scenes have original and current-candidate evidence. Group-154 is pre-read only and is not selected or scored.

2. Allowance-016 was granted at 2026-09-16T04:20:20.542Z. Its authoring cutoff was 2026-09-16T08:05:20.542Z; hard deadline 2026-09-16T08:20:20.542Z. The fifteen-minute reserve is for checkpointing, not extra authoring. Do not change those times, resume an exhausted production campaign, grant overlapping time or automatically renew. The earlier allowance-015 localCheckpoint value copied forward at initialization is preserved in checkpointHistory; the current localCheckpoint now records 016's actual boundary. The first owner repair preceded the first new selection; both timestamps and the initial timing label are preserved explicitly.

3. A later local candidate window requires new explicit owner authorization, after the applicable boundary and without overriding an enforced lower limit. Confirm no other writer with permitted process/lock checks. Use the existing allowance mechanism only when that new authorization exists:

```powershell
node tools/local-audit-campaign.cjs grant-allowance --campaign .audit-runs/standing-campaign/campaign.json --authorization "<path-to-new-owner-authorization.txt>" --minutes 240 --exclusive-editor
```

Discover the next unused identifier, expected allowance-017. The placeholder is intentionally not an executable authorization file. The command records history; it does not permit independent review or integration. No further window is granted by this report.

4. Preserve preview.8 Basic/Advanced play and the schema-6 migration. Reuse the 5869-file protected baseline only when its inputs still match. The twelve feature changes and two added tests are explicitly recorded in source-baseline-amendment-v1.json, linked to the unchanged prior fingerprint and feature amendment. Do not restore older app assets or blindly refresh hashes if new differences exist. Investigate any additional drift separately. Preserve the campaign's post-grant hash for this frozen checkpoint; a future authorized grant must have its own recorded before/after state.

5. Carry the immutable 1518-record manifest into the new allowance-specific local report root, linking this manifest and its hash. Preserve every prior candidate/evidence version, scene-level count, exception and owner-repair record. Use the same small local persistence/checker workflow with the new root and actual new deadline; do not edit this frozen helper's deadline or turn it into another execution route. Exact source copies of the two existing helpers are in helper-sources, and hashes of both copies and their .checkpoint-work originals are in the inventory. Restore those exact local sources if needed before deliberately adapting the workflow to the new report root. They accept manually supplied dialogue/evidence and calculate totals; they neither author nor invoke models. Do not copy the full project or entire scratch directory.

6. Next exact selection: **S04+D41-a/b**, followed by D42–D45, in reports/local-candidates-016/pairs/group-154/originals/batch.json. Its ratings are blank; pre-read-notes.json only records preparation. Reuse the packet if source hashes still match and reread the exact instructions, four canonical seeds and both pair originals before scoring. Do not regenerate or recount S03+D121–D240 or S04+D01–D40. All 944 earlier single candidates, 16 protected single exceptions and their evidence remain untouched.

7. Continue original assessment → retain or revise for demonstrated defects → dialogue-first same-writer reread → sentence-purpose edit → local format/source/evidence validation, in small groups. The unchanged coach-2.0 gates, six weights, 85 threshold and criterion floors still apply. No more than two written versions per newly selected scene. Do not reuse these local scores as fresh acceptance. Prepared reviewer payloads contain current primary/alternate hashes and exact cards without writer scores or claims; keep human fields blank.

8. The supported report-side checker for this frozen root is:

```powershell
node .checkpoint-work/check-local-pairs-016.cjs
```

It validates local records and PREPARES unexecuted review inputs; it does not execute a reviewer or integrate. It writes a new verification and updates manifest pointers, so running it after freezing invalidates the old inventory. Prefer read-only inventory rehashing for recovery. Use the new allowance-specific checker only when new work warrants it; record any deliberate invocation and produce a corresponding inventory. Do not repeat the app build/browser tests merely to duplicate unchanged results.

9. Preserve the twelve unresolved alternatives without resetting their exhausted written-version allowances: S01+D30-a, S01+D159-b, S01+D174-b, S01+D240-a, S01+D240-b, S02+D194-a, S03+D14-b, S03+D45-b, S03+D65-a, S03+D79-a, S03+D107-b and S03+D159-b. The last is this window's new 81-point exception. The three owner-identified allowance-015 findings were each repaired once and locally reread; do not automatically spend their remaining authorized repair pass or restart earlier repairs. Preserve S04+D10-b's minor phrase reservation rather than inventing a third version. All reservations remain available for eventual independent and human review.

10. The denied fresh-review/production action remains denied. No child Codex CLI/model invocation, alternative provider/wrapper, campaign resume or canonical integration is authorized by this procedure. No routine new permission investigation is needed to continue separately authorized local writing, but local permission does not unblock the denied stage. The later path remains separately permitted fresh review → accepted source amendments/integration → actual runtime/native/offline validation → owner audit. The ten historical reviewed pair dialogues remain protected. S06+D49-b stays pending, and the pair-integration adapter still requires a real verified integration path before bulk integration.

11. Keep source/campaign history, .gitignore, Git cleanup, QR/privacy and independent phone state unchanged. No API-key billing, credit purchase, auth/security change, commit, push, deployment, ZIP, source mirror or automatic allowance renewal. At the next actual boundary, distinguish unique scenes from written/evidence versions, local readiness from acceptance, and candidate changes from production dialogue. Preserve partial work honestly if any stage is interrupted.
