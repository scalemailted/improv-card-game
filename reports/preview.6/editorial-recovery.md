# Completed editorial recovery of batch-001

One of two authorized targeted rounds was used. All three corrections passed fresh review, and all twenty accepted results passed integration validation. Seventeen accepted candidates/reviews were reused unchanged. Original failed attempts, arithmetic recovery and all intervening evidence are preserved.

## S32-single-a - 92/100

**A:** I'll watch your dog tonight. That settles your fixing my sink.

**B:** He just sleeps. Your sink took three hours.

**A:** Leave him tomorrow too, then. Two nights for the awkward pipe.

**B:** I'll leave dinner for you. There's lasagne in the fridge.

**A:** Don't feed me. I'm trying to get even. If you cook as well, I'll have to take him on holiday.

B2 causes A3: B2 says the sleeping dog requires less effort than the three-hour repair; A3 increases the repayment to two nights.

B4 causes A5: B4 adds dinner to the exchange; A5 resists accepting it because further kindness would increase A's debt.

Remaining reservation: A5's holiday escalation is verbal and hypothetical, but it remains playable and causally earned. No rewrite needed.

## S37-single-b - 86/100

**A:** You remembered every birthday. Must be nice having that sort of time.

**B:** I use phone reminders. Here, I'll send you the calendar.

**A:** I'll import it. Some of us remember people because we care.

**B:** There's also a reminder to buy the cards a week ahead.

**A:** Turn that on too. Mum calls you thoughtful for obeying your phone. Don't tell her you've sent me this.

B2 causes A3: B2 supplies the calendar shortcut; A3 explicitly adopts it through importing while asserting moral superiority.

B4 causes A5: B4 identifies the advance purchase reminder; A5 requests that exact feature and then seeks to preserve the appearance of unaided thoughtfulness.

Remaining reservation: The inspiring aspect is conveyed indirectly through eager adoption. B mostly supplies useful features, but the family stakes and concealment request provide sufficient interaction. No rewrite needed.

## S40-single-a - 92/100

**A:** I've packed lunches for your first week at college.

**B:** My room doesn't have a fridge.

**A:** Then I'll drop one off every morning. I've labelled the days.

**B:** Lunch is included in my fees. I'm meeting my flatmates there.

**A:** How many flatmates? I'll pack theirs too. You can all meet me outside.

B2 causes A3: B2 cannot store the lunches in a fridge; A3 changes from supplying a week's food at once to daily delivery.

B4 causes A5: B4 explains that lunch already provides food and a meeting with flatmates; A5 tries to replace both functions by feeding the group outside.

Remaining reservation: A5 answers the social reason for attending lunch more directly than the already-paid cost. That selective response fits A's insistence, but gives B a substantial unresolved objection. No rewrite needed.

Reused unchanged: S31-single-a, S31-single-b, S32-single-b, S33-single-a, S33-single-b, S34-single-a, S34-single-b, S35-single-a, S35-single-b, S36-single-a, S36-single-b, S37-single-a, S38-single-a, S38-single-b, S39-single-a, S39-single-b, S40-single-b.

Nineteen revisions and one retention (S32-single-b) are integrated. Singles: 80/960. Pairs: 10/115,200. All 116,141 other dialogues are unchanged. There are 4,560 compiled dependent references and zero changed pair dialogues or newly reviewed pairs. All ten affected binding arrays were updated without changing transfer text. S06+D49-b remains pending. Batches 002-005 remain exactly untouched.

Applied before/after ledger: editorial/local-first-five-batch-001/applied-before-after.md. Detailed source/dependency evidence: reports/preview.6/source-dataset-comparison.json. Full ZIP and fresh-extraction/native verification must be confirmed in releases/Imprompt-0.26.0-preview.6-source.zip.verification.json.

## Final release verification

Completed: `releases/Imprompt-0.26.0-preview.6-source.zip`, SHA-256 `ac2ebaf83515acfbe50940a1da7be6f032baa2e7ebe3d6d8fc55cb04018f8619` (41,719,236 bytes; 1,133 files).

Corrected source and fresh extraction each passed build:examples, all audits and the full test suite, including 30 runner fixtures. ZIP CRC and every extracted file hash passed. Native installed Chrome passed 78 checks exercising both S31–S40 alternatives at widths 320, 412 and 1280, hint policies, and offline S40 reload. These are desktop browser viewport/touch checks, not physical-device or live-performance testing.

Release verification exposed and corrected current-version test expectations and two stale worker/manifest URLs that broke native offline reload. The original failure logs and failed archive are preserved. The URL fix changes no dialogue or card instructions. The additional regression assertion checks that client, worker and service-worker precache use the same current version. Full source and extraction verification was repeated after the fix.

Successful process logs: `releases/verification-0.26.0-preview.6-retry-02/`. Attestation: `releases/Imprompt-0.26.0-preview.6-source.zip.verification.json`. Successful final verification elapsed 1,712,297 ms; earlier failed validations remain separate evidence. The scratch verifier's first restart refused the already-used extraction path; no existing extraction was silently adopted or deleted.

Batch-001 is complete and the queue is stopped at its requested boundary. Batches 002–005 remain pending with zero attempts. No commit, push or deployment was performed.
