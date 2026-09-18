# Resume after allowance-019

1. Read README.md, working-summary.json, boundary-status.json, boundary-integrity.json, artifact-inventory-verification.json, new-scene-ledger.json, exception-queue.json and pairs/candidate-manifest.json. Current counts: 2458 unique pair candidates; 2411 locally writer-ready; 47 exhausted local exceptions. All selected scenes have both original and current-candidate local evidence. Fresh review, acceptance and integration remain zero for this candidate campaign.

2. Verify the frozen inventory read-only from the repository root:

```powershell
node -e "const fs=require('fs'),c=require('./tools/local-audit/core.cjs'),i=c.read('reports/local-candidates-019/artifact-inventory.json'); for(const f of i.files){const b=fs.readFileSync(f.path);if(b.length!==f.bytes||c.sha(b)!==f.sha256)throw Error('Changed artifact: '+f.path);} console.log('PASS: '+i.files.length+' frozen artifacts');"
```

Also recheck the starting-state protected-source map, previous manifest byte hash and preview.9 feature amendment new-file hash. Legitimate later feature changes require explicit narrow reconciliation; do not refresh guards blindly or restore an older app.

3. Allowance-019 began 2026-09-17T05:36:20.337Z; authoring cutoff 2026-09-17T09:21:20.337Z; hard deadline 2026-09-17T09:36:20.337Z. The reserve is not additional writing time. Never reset or automatically renew it. A later window requires new explicit owner authorization, no active overlapping allowance and no enforced lower limit. Check for another writer with permitted process/lock checks, then use the existing mechanism:

```powershell
node tools/local-audit-campaign.cjs grant-allowance --campaign .audit-runs/standing-campaign/campaign.json --authorization "<path-to-new-owner-authorization.txt>" --minutes 240 --exclusive-editor
```

Discover the next unused identifier, expected allowance-020. The placeholder is not an authorization file. This report grants nothing.

4. Preserve this checkpoint and all 2458 records immutably. Carry them forward by reference into the new authorized report, linking the manifest byte hash. Preserve every evidence/candidate/supersession path, previous source baseline and correction count. Adapt only the new report root and actual authorized deadline in report-side persistence/checker helpers. Do not mutate frozen helpers or create another model-execution route. No whole-source copy is needed.

5. Resume **S06+D31-a/b**, then D32–D35, from [the saved group-248 packet](pairs/group-248/originals/batch.json), provided source hashes still match. All ten records have blank ratings and are not selected. Read exact S06 and Drive instructions, both cards' actual single seeds and both pair alternatives before scoring. S06 is Hidden Power: publicly modest behavior with actual outcome choices. Do not import S05 mentor language. Continue bounded groups while a newly authorized local allowance is valid.

6. Preserve all forty starting and seven new exhausted exceptions. None has a third written version available; no new window resets that cap. There are no interrupted selected stages. Technical events and failed preflight scripts are preserved; never rerun a completed mutation script as a recovery shortcut.

7. Maintain original assessment, necessary retention/rewrite, saved-dialogue-first same-writer reread, targeted spoken edit and evidence verification. All coach-2.0 gates, six weighted criteria, threshold 85 and criterion floors remain. UNCLEAR means not writer-ready. A holds both exact cards. B2 informs A3; B4 causes A5. Alternatives need meaningful differences. No invented essential staging; no automatic scoring or humor templates.

8. The current local checker is `node .checkpoint-work/check-local-pairs-019.cjs`. It writes verification files and manifest pointers, so **do not rerun it against the frozen checkpoint merely to resume**. Use the read-only rehash above, then an explicitly adapted later-allowance checker for actual new work. Prepared review inputs are not executed assessments. Do not repeat build/browser checks of identical application inputs for another report.

9. Previously denied fresh-review/production remains denied. This procedure authorizes no child Codex CLI, subagent, alternative model/provider/wrapper, campaign resume, canonical write or integration. Human fields stay blank. Later installed improvements require separately permitted fresh review, accepted provenance amendments and verified integration plus runtime/native/offline checks and owner audit. Preserve all ten historical pairs and S06+D49-b. Verify the real pair-integration path before bulk integration.

10. Existing ChatGPT-authenticated included allowance only; no separate API billing, purchases, authentication/security change, Git-history modification, commit, push, deployment, ZIP or source mirror. Save incremental evidence, and report actual scene progress and limitations.
