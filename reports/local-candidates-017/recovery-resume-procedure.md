# Resume after allowance-017

1. Read README.md, working-summary.json, boundary-status.json, boundary-integrity.json, artifact-inventory-verification.json, new-scene-ledger.json, exception-queue.json and pairs/candidate-manifest.json. The authoritative ending state is 1,802 unique pair-scene candidates, 1,782 locally writer-ready and twenty exhausted exceptions. All selected records have original and current-candidate evidence. Candidate work has produced zero fresh reviews, acceptances or runtime integrations.

2. Verify the frozen inventory read-only before reuse, from the repository root:

```powershell
node -e "const fs=require('fs'),c=require('./tools/local-audit/core.cjs'),i=c.read('reports/local-candidates-017/artifact-inventory.json'); for(const f of i.files){const b=fs.readFileSync(f.path);if(b.length!==f.bytes||c.sha(b)!==f.sha256)throw Error('Changed artifact: '+f.path);} console.log('PASS: '+i.files.length+' frozen artifacts');"
```

Also compare the protected source map and prior manifest references recorded in starting-state.json. A new application change must have explicit provenance; do not replace hashes to excuse unexplained drift. Preserve preview.8 Basic/Advanced behavior, the sixteen single exceptions, 944 single candidates, prior repairs and all historical review evidence.

3. Allowance-017 started 2026-09-16T18:05:44.867Z. Its authoring cutoff was 2026-09-16T21:50:44.867Z; hard deadline is 2026-09-16T22:05:44.867Z. The reserve is not further authoring time. Do not reset this allowance, reuse its authorization to create another, grant overlapping windows or automatically renew. A later window needs new explicit owner authorization through the existing mechanism, after the applicable boundary and without overriding an enforced lower limit. Confirm no competing writer using permitted process/lock checks. Only then use:

```powershell
node tools/local-audit-campaign.cjs grant-allowance --campaign .audit-runs/standing-campaign/campaign.json --authorization "<path-to-new-owner-authorization.txt>" --minutes 240 --exclusive-editor
```

Discover the actual next unused identifier, expected allowance-018. The placeholder is deliberately not an executable authorization. No new editorial brief is needed, but this checkpoint does not authorize another window.

4. Preserve this report as an immutable checkpoint. Carry forward its 1,802 manifest records by reference into the new allowance-specific report root, linking this manifest and its byte hash. Preserve every candidate/evidence path and supersession link. The two helper snapshots in helper-sources are exact copies of the current report-side persistence and checker scripts. Deliberately adapt only the report root and actual new allowance deadline for a later authorized local window; do not alter the frozen helper or transform it into a model-execution route. Do not copy the whole repository or scratch directory.

5. Resume **S04+D183-a/b**, followed by D184–D185, using reports/local-candidates-017/pairs/group-182/originals/batch.json if its source hashes still match. The packet contains ten original records, but D181-a/b and D182-a/b already have completed candidates and evidence in the manifest; do not restart or double-count them. The six D183–D185 records have blank first/second ratings and are not selected. Read their exact two cards, all four canonical single seeds and both original pair alternatives before assessment. Continue subsequent pending groups without routine approval once a valid local window exists.

6. Preserve the twenty exhausted alternatives in exception-queue.json. Eight are new this window: S04+D43-a, S04+D45-a, S04+D69-a, S04+D75-a, S04+D99-a, S04+D131-a, S04+D149-b and S04+D174-a. A later allowance does not renew their two-version limits. S04+D181-b used its remaining second version before this cutoff and has current matching reread evidence; it is **not** an interrupted repair. Preserve the earlier technical syntax/citation failures and explicit outline recoveries without redoing successful work.

7. Continue exact-card reading and compact outline → original assessment → retention or necessary rewrite → dialogue-first same-writer reread → specific sentence-purpose repair → local validation. Use unchanged coach-2.0 mandatory gates, six weights, total threshold 85 and dimension floors. At most two written versions per newly selected scene. A useful gesture copied knowingly is not sufficient evidence of S04 misunderstanding. Both alternatives must differ in meaningful tactic, relationship or pressure; B2 must inform A3 and B4 must cause A5. No stages or missing facts may be rescued by imagined staging.

8. The existing local checker for this root is:

```powershell
node .checkpoint-work/check-local-pairs-017.cjs
```

It validates and prepares unexecuted payloads; it does not independently review or integrate. It also writes verification files and manifest pointers, so running it after freezing invalidates the old inventory. Prefer the read-only rehash command in step 2 for recovery. Use the later allowance-specific checker when new work warrants it, then freeze that new checkpoint. Do not repeatedly build/browser-test unchanged application inputs.

9. The previously denied fresh-review/production action remains denied. No child Codex CLI, alternative model/provider/wrapper, campaign resume, canonical write or integration is authorized by this local continuation procedure. Keep human feedback blank and do not count same-writer rereads as independent decisions. Future delivery still requires separately permitted fresh review → accepted source amendments → validated actual integration → runtime/native/offline checks → owner editorial audit. Preserve all ten historical reviewed pair dialogues and keep S06+D49-b pending. Verify the actual pair-integration adapter path before bulk integration; candidate preparation is not that verification.

10. Use only the existing ChatGPT-authenticated included allowance. No API-key billing, credit purchases, authentication/security changes, commit, push, deployment, Git-history changes, ZIP or full-source mirror. Save small incremental checkpoints. Stop at the next actually authorized boundary and report actual scene work, remaining exceptions, usage availability and tested scope without implying that a local candidate is installed in the application.
