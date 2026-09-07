# Imprompt Hint Library Audit

**Release:** Imprompt v0.21.2  
**Hint Bible:** 2.1.0  
**Result:** PASS

## Coverage

- Cards with resolved coaching metadata: **480** (240 Stances + 240 Drives)
- Distinct card-specific manifestation seeds: **960**
- Audited source behavior seeds: **96** across 48 formal subthemes
- Audited pack manifestation lenses: **20** across 10 official packs
- Formal subthemes covered: **48 of 48**
- Personal Stance–Drive hands validated: **57,600**
- Structural combination angles generated and checked: **345,600**
- Reusable combination patterns: **6**
- Stance fusion profiles: **24**
- Drive fusion profiles: **24**
- Pack-specific fusion anchors: **20**
- Hand-audited exemplar pairings: **3**
- Coach hint policies: **4**

## Acceptance gates

- Pack + subtheme composition for every card: checked
- No duplicated resolved manifestation seed: checked
- Holder-only language: checked
- No required partner reaction: checked
- No mandatory setting, relationship, plot, punchline, or ending: checked
- Drive treated as pressure rather than win condition: checked
- Full versus concise policy depth: checked
- After-first-attempt gating: checked
- Hints-off suppression: checked
- Separate pack context and concrete action for every resolved card seed: checked
- Generic pack-preface leakage into first moves: rejected
- Complete Stance and Drive fusion-profile coverage: checked
- Six distinct concrete fusion angles per hand: checked
- Integrated way-in, first move, repeatable loop, and adaptation: checked
- Known-pair exemplar regressions: checked

## Errors

- None

## Warnings

- None

## Interpretation

This audit validates the deterministic, local coaching system and the v0.21.2 concrete-action extraction repair. It does not claim that every generated hint is the only or best interpretation of a hand. The interface deliberately labels each output as one possible way in and lets players request another structural angle.
