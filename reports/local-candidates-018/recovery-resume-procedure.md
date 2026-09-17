# Resume after allowance-018

1. Read README.md, working-summary.json, boundary-status.json, boundary-integrity.json, artifact-inventory-verification.json, new-scene-ledger.json, exception-queue.json and pairs/candidate-manifest.json. Actual state: 2,110 unique pair candidates, 2,070 locally writer-ready, forty exhausted exceptions. All selected records have original and current-candidate evidence. Fresh review, acceptance and integration remain zero for this candidate campaign.

2. Verify the frozen inventory read-only from the repository root:

```powershell
node -e "const fs=require('fs'),c=require('./tools/local-audit/core.cjs'),i=c.read('reports/local-candidates-018/artifact-inventory.json'); for(const f of i.files){const b=fs.readFileSync(f.path);if(b.length!==f.bytes||c.sha(b)!==f.sha256)throw Error('Changed artifact: '+f.path);} console.log('PASS: '+i.files.length+' frozen artifacts');"
```

Also verify the starting-state protected source map and prior manifest reference. Preserve the documented preview.9 baseline and tools/browser-menu-new-game.py hash from the feature amendment. A later legitimate feature change needs an explicit, narrow reconciliation; do not blindly refresh hashes or restore preview.8.

3. Allowance-018 started 2026-09-17T00:45:42.215Z; authoring ended at cutoff 2026-09-17T04:30:42.215Z; hard deadline 2026-09-17T04:45:42.215Z. The reserve is not additional authoring time. Do not reset, overlap or renew this allowance automatically. A later window requires new explicit owner authorization and no enforced lower limit. Confirm no competing writer through permitted process/lock checks, then use the existing mechanism:

```powershell
node tools/local-audit-campaign.cjs grant-allowance --campaign .audit-runs/standing-campaign/campaign.json --authorization "<path-to-new-owner-authorization.txt>" --minutes 240 --exclusive-editor
```

Discover the next unused ID, expected allowance-019. This placeholder is not an authorization file and this report does not grant another window.

4. Preserve this checkpoint immutably. Carry all 2,110 manifest records forward by reference into the next authorized allowance report, linking the prior manifest byte hash. Preserve every candidate, evidence and supersession path. helper-sources contains exact persistence/checker snapshots. Adapt only the new report root and actual authorized deadline in later report-side helpers; do not mutate frozen helpers or create an alternative model-execution route. No whole-source copy.

5. Resume **S05+D97-a/b**, then D98–D100 from reports/local-candidates-018/pairs/group-213/originals/batch.json if source hashes match. D96-a/b in that packet are complete and must be skipped. All eight pending records have blank first/second ratings. Read both exact cards, four single-card seeds and both pair originals before selecting. Continue bounded groups without routine approval while the new local allowance is valid.

6. Preserve all forty exhausted alternatives in exception-queue.json, including the twenty new IDs in README.md. No new window resets the two-written-version limit. No interrupted selected candidate remains to recover. Technical report-script failures and actual bounded recoveries remain in technical-events.json. Do not rerun completed mutation scripts.

7. Maintain exact-card reading, original assessment, retention or necessary rewrite, dialogue-first same-writer reread, targeted spoken edit and evidence validation. Keep all coach-2.0 mandatory gates, six weights, threshold 85 and criterion floors. UNCLEAR is not readiness. Both alternatives need distinct tactics, relationships or pressures. B2 informs A3; B4 causes A5. A holds both cards. No imagined staging repairs missing essentials.

8. The current local checker command is:

```powershell
node .checkpoint-work/check-local-pairs-018.cjs
```

It writes verification files and manifest pointers and therefore must **not** be run against this frozen checkpoint merely to resume. Use the read-only rehash command above; use a deliberately adapted later-allowance checker for actual new work. It prepares payloads but never independently reviews or integrates. Do not repeatedly rebuild or browser-test unchanged application inputs.

9. The previously denied fresh-review/production action remains denied. No child Codex CLI, alternate model/provider/wrapper, campaign resume, canonical scene write or integration is authorized by this local procedure. Keep human feedback blank. Future installed improvements still require separately permitted fresh review, accepted provenance amendments, verified integration, runtime/native/offline checks and owner audit. Preserve the ten historical pair dialogues and S06+D49-b pending issue. Verify the actual pair-integration path before bulk integration.

10. Use existing ChatGPT-authenticated included allowance only. No API-key billing, purchases, authentication/security changes, commit, push, deployment, Git-history changes, ZIP or source mirror. Save incremental artifacts and report actual scenes, unresolved cases, timing and verification scope. Do not claim candidate dialogue is installed.
