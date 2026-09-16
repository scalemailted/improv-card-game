# Recovery after allowance-015

Recorded 2026-09-16T01:52:28.424Z. This is a procedure, not authorization for another allowance or denied execution.

1. Read README.md, working-summary.json, boundary-status.json, artifact-inventory-verification.json, new-scene-ledger.json, and pairs/candidate-manifest.json. Rehash inventory entries before reuse. Preserve historical records and immutable candidate/evidence versions. There are no selected scenes missing original or current-candidate evidence.

2. Allowance-015 authoring stopped at its unchanged work boundary 2026-09-16T01:48:44.745Z; its hard deadline is 2026-09-16T02:03:44.745Z. Do not run its authoring helper after that cutoff, refresh its clock, invoke an exhausted campaign resume, or automatically grant another window. All prior allowances remain in the campaign and snapshots; no campaign state was changed after the recorded grant during this local authoring window.

3. A later LOCAL candidate window needs new explicit owner authorization, with no overlap and no enforced-limit override. The existing supported mechanism, only after that authorization and the applicable boundary, is:

```powershell
node tools/local-audit-campaign.cjs grant-allowance --campaign .audit-runs/standing-campaign/campaign.json --authorization "<path-to-new-owner-authorization.txt>" --minutes 240 --exclusive-editor
```

Use the actual next unused allowance (expected 016, discover it). The placeholder is deliberately not an executable authorization path. The grant does not permit fresh review or integration. Confirm no concurrent writer using permitted controls before beginning; do not claim continuous monitoring from a one-time check.

4. Carry the immutable 1198-record manifest forward into a new allowance-specific local report root, keeping allowance-015 frozen and linking its manifest hash. Apply the existing small report-helper workflow to that new root and the new grant's actual deadline, as done for 015; do not alter the frozen 015 helper deadline, redesign the runner, or reset any scene's count. The current helpers exist locally in ignored .checkpoint-work and their hashes are in artifact-inventory.json. They persist manually supplied writing/evidence and calculate scores; they do not author or run a reviewer. Do not promote the entire scratch directory or copy the project. If those two small helpers are unavailable in a future checkout, recover their exact source from the recorded local files or deliberately preserve only the needed helper source before proceeding; do not silently replace them with a new production route.

5. Next exact selection: S03+D121-a/b. The already exported packet is reports/local-candidates-015/pairs/group-122/originals/batch.json, containing D121-D125, both alternatives. It remains pending with blank first/second ratings and no selected records. Its cards, four canonical seed examples and both originals were read for preparation; pre-read-notes.json pins that packet and records mechanism/confusable notes only. Reuse the packet when its source hashes still match, and reread exact material before scoring. No need to regenerate prior completed candidates or re-export an unchanged packet.

6. Continue the existing manually supplied original assessment, necessary revision, dialogue-first local reread, final sentence-purpose edit, and unchanged coach-2.0 gates/weighted arithmetic. Maximum two written versions per new scene. Work in bounded groups and validate completeness before continuing. All local ratings remain self-assessment; no independent approval is implied. Preserve actual reservations rather than raising a total to pass.

7. The report-side validation command currently supported is:

```powershell
node .checkpoint-work/check-local-pairs-015.cjs
```

This checks identities, source/card/seed hashes, five-turn structure, evidence, arithmetic, readiness and protected pairs, and PREPARES unexecuted payloads. It does not invoke a model or integrate dialogue. It writes a new verification, updates currentVerification/reviewInputs in the manifest, and can write payload files; therefore it is not a read-only command and would invalidate this frozen inventory. Prefer read-only rehashing of the saved inventory for recovery; use an allowance-specific checker in the new checkpoint when new work warrants it. Record any deliberate later invocation and regenerate that checkpoint's inventory rather than calling the old inventory current.

8. Do not reopen the eleven exhausted pair exceptions: S01+D30-a, S01+D159-b, S01+D174-b, S01+D240-a, S01+D240-b, S02+D194-a, S03+D14-b, S03+D45-b, S03+D65-a, S03+D79-a, S03+D107-b. In particular, the five new exceptions have two saved written versions each. A new window does not reset them. Preserve the three completed allowance-014 owner repairs, all 944 single candidates, D159-single-b, the 16 protected single exceptions, binding holds and prior provenance reservations. The ten historically reviewed pair dialogues remain unchanged. S06+D49-b stays pending. The pair-integration adapter still requires a real verified path before later bulk integration.

9. The previously denied fresh-review/production action remains denied. No child CLI/model invocation, alternative wrapper, campaign resume, or canonical integration is authorized by this local continuation procedure. Keep scores and improvement claims out of prepared reviewer payloads; human feedback stays blank. The eventual path remains local candidate writing -> separately permitted fresh review -> accepted revisions -> canonical integration -> runtime/native/offline verification -> owner audit. A prepared payload or structural pass does not complete those later stages.

10. Preserve source fingerprints, the post-grant campaign hash, historical .gitignore-change evidence and current Git cleanup. No auth/security/billing change, API-key access, credit purchase, index/history edit, ZIP, project mirror, commit, push or deployment. At the next actual boundary, checkpoint unique scenes separately from versions, count new independent reviews/acceptances/integrations only when they really occur, and retain prior failure history.
