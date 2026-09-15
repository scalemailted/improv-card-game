# Allowance 003: source checkpoint

The campaign integrated **86 scenes: 72 revisions and 14 retentions**. This includes eighteen previously accepted backlog scenes, with their saved reviews reused. Public version remains **0.26.0-preview.7**. The final production run stopped at **elapsed-time-limit** during window-003 batch-002's corrective fresh reviewer. No allowance or attempt history was reset, and no ZIP was produced.

## Exact progress

100 singles obtained their first completed two-pass review this window; two previously reviewed scenes received only their remaining permitted corrections. Newly accepted decisions total 90 (82 revisions, 8 retentions); this is a different measure from integrations, which include saved backlog. 280/960 singles now have both-pass evidence, including accepted staged and rejected scenes. Completed integrated singles are 240/960. Pairs remain **10/115,200 individually reviewed**.

| Current mutually exclusive single-scene state | Count |
| --- | ---: |
| Integrated with completed evidence | 240 |
| Accepted, eligible, awaiting integration | 9 |
| Accepted, held by binding findings | 17 |
| Persistent editorial exceptions | 4 |
| Previously rejected; corrected writer saved, fresh review interrupted | 10 |
| Technical exceptions without a completed second pass | 20 |
| Never started | 660 |
| Total | 960 |

The interrupted review is **one invocation covering ten corrections**, not twenty newly failed scenes. The ten accepted candidates from its preceding review remain frozen. Its validated corrected writer can be reused by the runner's existing failed-review recovery path. The nine eligible acceptances are S141-single-a, S141-single-b, S142-single-b, S145-single-b, S146-single-a, S147-single-a, S147-single-b, S148-single-a, S150-single-b.

The twenty technical exceptions are S131–S140, both alternatives. Both original writer attempts are preserved, including candidate text, exit/usage logs and the original proof-check failures. Neither has a fresh review. The narrowly fixed reconnect classifier applies to subsequent invocations; it does not retroactively promote these artifacts or renew their attempts. Recovery of this per-example exception still needs explicit provenance reconciliation; the older recover-batch entry point requires a failed batch and a real end-to-end evidence packet, so it must not be forced by relabeling this exception. Independent batches may continue.

[Full results and exact IDs](final-results.json), [integrated two-pass ledger](integrated-two-pass-ledger.json), [staged two-pass ledger](staged-two-pass-ledger.json), [editorial exceptions](editorial-exceptions.json), and [applied before/after exchanges](applied-before-after.md).

## Findings and preservation

The integrated ledger's original scores range from 50 to 94; resulting scores range from 85 to 98. These are actual rubric totals, calculated in code. Accepted dialogue retains recorded reservations. S103-a, for example, passes at 86 with a tender but lengthy final turn; S123-b's final correction passes at 90 while retaining reservations about B's thin personal stake and modest escalation. In S141–S150, the fresh reviewer rejected ten initial candidates, including S149-b at 89 because the final move remained static despite passing numerical minima. No score was raised to erase that rejection.

Persistent editorial exceptions: S63-single-b (83), S80-single-b (81), S86-single-a (75), S94-single-a (81). S63-b and S80-b received no added rounds. S86-a exhausted its remaining permitted correction and remains unresolved; S88-a was corrected, freshly reviewed and integrated.

[Binding findings](binding-findings.json) distinguish the original six holds. A demonstrated integration selection defect had blocked exact retentions even though they do not change a seed or transfer. S67-a and S89-a were safely recorded as retained; their original findings remain preserved. Actual revised scenes remain held when either binding assessment is incompatible. Current binding holds: S61-single-a, S61-single-b, S67-single-b, S89-single-b, S95-single-a, S95-single-b, S96-single-a, S96-single-b, S99-single-a, S99-single-b, S111-single-a, S111-single-b, S118-single-a, S118-single-b, S130-single-a, S130-single-b, S144-single-b. Their exact source/seed/transfer findings are in the staged ledger; no bespoke pair dialogue was repaired in this window.

All playable card metadata and pair authoring match the starting checkpoint, and all 164 previously completed single/pair review rows are unchanged. The previous window's 34 integrations and all earlier reviews, amendments and recovery records remain intact. **S06+D49-b remains pending.** Bulk exact-pair production still requires its unsupported integration adapter; it was not entered.

## Dataset comparison

Across all **116160 generated records**: 72 directly changed single dialogues; 116088 unchanged dialogues; **0 changed pair dialogues**. There are 17280 mechanically affected dependent references: 17279 unreviewed pair drafts and the already reviewed S124+D06-b reference. None received a new pair review. 42 transfer records changed through the ordinary seed-binding workflow; no unrelated record changes were detected.

[Complete dataset comparison](complete-dataset-comparison.json) and [exact transfer before/after data](transfer-effects.json).

## Validation actually performed

- All **8 integration groups** passed build:examples, audit:all, and full npm tests in isolated staging before hash-verified integration. The exact commands, exit codes and archived stdout/stderr are indexed by integrationValidation in final-results.json.
- Every one of the **86 newly integrated IDs** has matching-dialogue native Chrome coverage at 320, 412 and 1280 pixels, through the production reader/renderer and service-worker offline reload. See nativeValidation in final-results.json.
- Source-pause and retention regression fixtures passed. The reconnect parser passed 64 isolated local-runner tests; the final canonical local suite passed **65/65**, including the newly registered source-checkpoint regression. [Final local test log](final-local-tests.log).
- The first S101–S110 native attempt failed because the test read the prior dialogue while the asynchronous reader was busy. The isolated retry waited on the existing aria-busy signal and passed 78 checks without removing the distinct-alternative assertion. The wait and a bounded service-worker-ready timeout were then persisted; the canonical harness passed **78/78** on current S101–S110 data. [Finding](native-readiness-finding.json), [canonical native results](native-current-harness/results.json), [canonical process record](native-current-harness/run.process.json). Original failures remain saved.
- The installed CLI's completed reconnect trace exposed an overbroad proof rejection. The narrow repair still rejects terminal/unknown errors, tool use, incomplete streams, mismatched output and unsuccessful processes. [Fixture tests](reconnect-fixture.log), [full isolated tests](reconnect-full-local-tests.log), [real trace verification](reconnect-real-trace.json), [source amendment](reconnect-parser-amendment.json). The official [non-interactive documentation](https://learn.chatgpt.com/docs/non-interactive-mode) establishes the event taxonomy; the specific reconnect allowance is based on the saved installed-CLI trace, not an unrestricted exemption.
- The final source copy matched the current guarded source. Historical full application tests were reused only for their matching application/data inputs; the later worker and test changes received their relevant fresh local tests. No redundant full application suite was run solely to attach another report.

Native tests used installed desktop Chrome and emulated viewport/touch settings, not physical phones or a deployed site. No fresh ZIP extraction, physical-device testing, human editorial approval or verified-release claim is made. Full release verification remains mandatory before labeling any future ZIP verified. No credentials, private history, API-key billing, installation, authentication changes, commit, push or deployment were used.

## Source checkpoint, time and resumption

The source checkpoint contains **1672 files / 131473578 bytes**, with SHA-256 hashes. [Receipt](source-checkpoint-receipt.json).

Source: `C:\Users\Ted\OneDrive\Desktop\improv-card-game\github\improv-card-game\.audit-runs\standing-campaign\source-checkpoints\1789101817486-55ce3b82-2413-487f-bcaa-88eea15f4390\source`

Manifest: `C:\Users\Ted\OneDrive\Desktop\improv-card-game\github\improv-card-game\.audit-runs\standing-campaign\source-checkpoints\1789101817486-55ce3b82-2413-487f-bcaa-88eea15f4390\manifest.json`

Keep reports/campaign-allowance-003 and the corresponding .audit-runs campaign/queue directories with it: the state snapshot preserves their exact paths, and pending attempts/recovery evidence remain there. This is a local recovery checkpoint, not a distribution archive.

Allowance-003 was authorized at 2026-09-11T00:56:12.073Z, with hard deadline 2026-09-11T04:56:12.073Z. The editorial cutoff left the documented fifteen-minute source-checkpoint reserve. Cumulative recorded campaign time at the saved status is 46840492 ms; earlier allowances and usage are preserved. This window's CLI-reported usage is **938816 input tokens (148224 cached) and 351191 output tokens**, including completed invocations whose proof later failed. Interrupted turns without a usage event remain unknown; cached/reasoning subtotals are not added again. [Verified saved state](verified-resume-state.json).

No task-owned runner, Codex worker, native test or packager remained after production stopped; both integration/coordinator locks were absent. The temporary maintenance stop was archived and cleared. Resume from the repository root with the same command actually used this window:

```powershell
node tools/local-audit-campaign.cjs resume --campaign .audit-runs/standing-campaign/campaign.json --codex "C:\Users\Ted\.vscode\extensions\openai.chatgpt-26.901.22334-win32-x64\bin\windows-x86_64\codex.exe" --exclusive-editor
```

This command preserves the exhausted editorial budget and does not grant another allowance. Further model work needs another explicitly authorized execution window, not another editorial brief. S151–S180 packets remain exported with blank ratings.

The previous invalid ZIP remains releases/Imprompt-0.26.0-preview.7-allowance-002-source-INCOMPLETE.zip.partial. Its packager timed out after **925,131 ms**, with **2,554 input files / 266,944,225 bytes**, after source build/audits/tests and source-fingerprint verification; extraction/CRC verification did not complete. It was terminated with SIGTERM, and the partial archive failed BadZipFile. The actual command is in [previous packaging failure](previous-packaging-failure.json). The underlying cause is not established. No older archive was restored.

## Representative integrated exchanges

**S106-single-a — Whose Pain Counts?** (92/100)

**A:** One publisher turned you down? I've kept fourteen rejection letters.

**B:** Can you put them away? I came here for a hug.

**A:** Of course. Though fourteen rejections ought to qualify me for more than one.

**B:** Come here. We can both have the same hug.

**A:** Then make it a long one. One rejection's worth for you, and thirteen more before you let go of me.

B4 offers one shared hug as a cooperative solution. A5 uses that exact solution, dividing its duration according to A's competitive accounting of suffering.

**S123-single-b — Professional Suspicion** (90/100)

**A:** Before we hand over the shop keys, why did you cross out cupboard and write shelf?

**B:** The cleaner moved them onto the shelf.

**A:** When? I need the last confirmed sighting before we sign.

**B:** Nine. I saw them there. She doesn't start until ten.

**A:** Then who moved them before she arrived? Get her on the phone; we now need two accounts of one shelf.

B4 introduces the nine-versus-ten timing contradiction. It directly causes A5 to demand a second witness account, heightening A's established investigative behavior.
