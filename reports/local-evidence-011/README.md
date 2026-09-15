# Allowance-011 local evidence and candidate checkpoint

800 unique selections now have complete local evidence and await fresh review. This window completed the original 378-selection evidence backlog, then added 422 selections through D115. No new independent review, acceptance, canonical integration, or pair review occurred.

## Timing and boundary

Allowance-011 was granted at 2026-09-14T21:27:49.986Z, for one 240-minute window. The unchanged authoring cutoff was 2026-09-15T01:12:49.986Z; the hard deadline is 2026-09-15T01:27:49.986Z. Last saved assessment: 2026-09-15T01:10:34.489Z. After observing that the authoring cutoff had passed, work was limited to this source-integrity check and report. Final checkpoint timing is in final-summary.json. The manifest's top-level startedAt is inherited packet history from allowance-010, not this window's start.

The stop reason is the authoring work deadline, with the existing fifteen-minute checkpoint reserve. No additional allowance was granted. Campaign timing/history remains unchanged after the grant; this local activity is recorded separately rather than fabricated as runner/model execution. Child CLI model calls: zero. Parent token/account usage is unavailable. No API-key billing, authentication change, commit, push, deployment, or ZIP.

## Counts and evidence

| Measure | Starting | Ending / this window |
| --- | ---: | ---: |
| Unique local selections | 378 | 800 |
| Complete current original/candidate slots | 36 citation-complete; 720 deficient | 1,600 complete |
| Original packet deficient slots | 720 across 362 scenes | All 720 repaired |
| New selections | — | 422 |
| Current assessment files | — | 878 |
| Physical evidence files, including superseded | — | 883 |
| Fresh-review accepted / integrated | 0 / 0 | 0 / 0 |

The 1,600 slots describe 800 scenes. For retained identical dialogue, one explicit assessment file targets both original and candidate slots; this is not two independent reviews. Five superseded evidence files remain preserved. Scores changed in 480 original/candidate slots relative to the initial packet; score-corrections.json lists each criterion change and its new turn-specific explanation. This does not relabel historical coach-1.0 decisions.

New selections: {"original":397,"newly-written":8,"recovered-candidate":17}. Whole packet: {"original":722,"newly-written":52,"recovered-candidate":26}. Of the starting 378 candidate dialogues, 377 were reused unchanged. Seventeen additional saved legacy candidates were recovered exactly, with their old reviews and binding findings preserved rather than inherited as coach-2.0 approval. Nine unique candidates received dialogue changes this window: D230-single-b, S145-single-b, S146-single-b, S152-single-a, S188-single-a, S188-single-b, S190-single-b, S223-single-a, S225-single-b. local-before-after.json contains exact prior/current dialogue and evidence references. All other newly selected strong originals were retained with explicit evidence; no rewrite quota was imposed.

## Findings and reservations

D230-b's previous below-threshold ending was repaired within its remaining local correction scope. B4's icing evidence now produces A5's evasive napkin criticism, continuing the lunch-review tactic. Its previous candidate and assessment remain preserved; the resulting local score is 86, not a fresh acceptance.

Other demonstrated weaknesses included unearned final rules (S145-b/S146-b), insufficient development (S152-a), missing wider-collapse behavior (S188-a/b), a thin practical fallback (S190-b), an unsupported knee accusation (S223-a), and an unexplained thirteenth person/copy (S225-b). Their new versions and rereads are explicit local artifacts. B4's actual information drives each changed A5.

Real reservations remain: D90-b is at 85 with thin specificity/heightening; D112-a's candles/allergies ending is compressed and merits a fresh reader's clarity judgment. Retaining these local judgments does not guarantee reviewer agreement. Five superseded evidence files preserve corrective reasoning, including removal of overly strict inferences and correction of a nonexistent-turn citation. Scripts validated supplied judgments and calculated totals; they did not assign ratings or manufacture semantic explanations.

## Holds, exclusions, and application accounting

All 800 are evidence-complete locally. Eighteen of these also retain technical binding holds, listed with exact IDs in final-summary.json. These overlapping categories must not be added as separate scenes. No binding hold was cleared this window. Transfer-content/inheritance and seed-description discrepancies remain pending; D49 retains the S06+D49-b issue. The sixteen protected persistent exceptions received no renewed correction allowance or new assessment. Another 144 nonprotected singles have not yet been selected in this local packet; next is D116-a/b.

The official repository remains at 824 integrated coach-1.0 singles, 880 with historical two-pass evidence, and ten individually reviewed pair examples. This packet's 800 local selections overlap historical work and must not be added to those counts. Canonical single dialogue changes: zero. Mechanically changed pair dialogue: zero. The ten reviewed pair dialogues and source review evidence are preserved. Pair-integration adapter remains unimplemented; no pair production was attempted.

## Actual verification

Latest artifact validation: reports/local-evidence-011/checks/20260915011037470/verification.json, PASS at 2026-09-15T01:10:37.473Z. It checks unique IDs, source/card and candidate hashes, ABABA structure, the existing 75-word limit, score arithmetic, evidence references, valid turn numbers, coach-2.0 fields and current payload bindings. This validates structure and provenance, not independent semantic approval. Forty separate twenty-primary-scene reviewer payloads were exported; none was executed. They contain exact cards, current candidate/alternate dialogue and review instructions, without writer scores or rationales. Human-feedback fields remain blank.

final-source-integrity.json records 5,867 protected files checked with zero differences; all 49 earlier packet files also match. The campaign and earlier manifest hashes match their saved post-grant/start values. Application source, card wording/IDs/versions, generated data, review history and prior pair dialogues are unchanged. Builds, application audits, full app tests and browser/offline tests were not rerun because runtime inputs were unchanged, as instructed. No new browser, physical-device or human validation is claimed.

Two report-only validation failures were corrected without weakening checks: a too-short no-defect field, and a transition UNCLEAR finding initially paired with a contradictory G3 pass. The corrected artifacts preserve the actual judgments; neither was a model retry or an accepted result. A final read-only rg wildcard query also returned a Windows path-pattern error; explicit reads supplied the required information.

## Authoritative files and continuation

- candidate-manifest.json: current hashes, source revisions, evidence references, supersession, hold/readiness states and exact current reviewer payload paths.
- pending-candidates.md: rendered current dialogue and exact cards for local inspection, including writer evidence links; not the score-free reviewer input.
- final-summary.json and final-source-integrity.json: exact counts, IDs, timing and preservation results.
- local-before-after.json and score-corrections.json: actual local dialogue/assessment changes.
- artifact-inventory.json: raw SHA-256 inventory of this checkpoint, excluding itself.

Resume local authoring only under a valid explicitly authorized future window, using the existing grant-allowance mechanism and the actual new authorization file. Do not renew allowance-011 or reset its history. Read this manifest first, verify hashes, skip its 800 completed local selections and all sixteen protected exceptions, and continue from D116-single-a/b. Preserve correction histories and recover only incomplete artifacts if any appear after this checkpoint.

The supported local structural check is `node .checkpoint-work/check-local-evidence-011.cjs`; it exports a new versioned local payload and does not invoke a model. Reuse the current passing result while relevant inputs still match. No production/fresh-review launch is authorized by this checkpoint. The denied launcher was not retried, renamed, or reproduced. Its old recovery input was not rebound. Eventual authorized fresh review must use the current manifest payloads and a legitimate integration path; a local self-assessment must never be presented as worker proof. No campaign resume command is presented as an executable continuation of this exhausted local window.

Final packet verification: 2026-09-15T01:18:04.153Z, PASS. 2817 raw artifact hashes and all 40 score-free payload files verified. Checkpoint finished 2026-09-15T01:18:04.158Z; elapsed wall-clock 230.24 minutes, including checkpoint work. Historical origin labels new/recovered are normalized to newly-written/recovered-candidate only for summary counts; source labels are preserved.
