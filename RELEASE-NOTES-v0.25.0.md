# Imprompt v0.25.0 — Dialogue-First Scenes

## Editorial change

All 480 single-card selections have two newly written five-turn A–B–A–B–A examples: 960 rewritten scenes. Both original alternatives and the exact card instruction were considered for each revision. The card-by-card ledger records the before/after text, hashes, word counts, and a specific editorial rationale.

This is an internal, model-authored editorial pass, not independent human blind reading or a live comedy benchmark. The writing targets wit grounded in character, connected responses, a specific setup, exact-card demonstration, and an earned second heightening. No numerical "humour score" is claimed.

## Spoken format

A1 establishes a concrete situation naturally in dialogue. B2 responds to it. A3 demonstrates the card's influence. B4 adds pressure from that response. A5 develops the same pattern. Separate grey stage directions and redundant quotations are removed. A/B labels remain; B's dialogue is fully readable. Five turns do not mean a longer lecture: the singles have a 36-word median and 57-word maximum across the whole exchange.

## Pair examples

All 57,600 pair lookups still exist, with two five-turn scenes per pair. The 25 bespoke reference pairs / 50 scenes were rewritten as coherent spoken openings, grounded in the revised individual seeds.

The other 115,150 pair scenes are **compiled drafts, pending individual review**. Their compiler preserves the Drive's full five-turn causal sequence, with both B replies and the final A response, and applies the Stance's framing to A's opening and first response. It no longer replaces B4 and A5 with unrelated stock objections and closings or joins unrelated stage-action props. This is an improvement in continuity, not a certification that every fusion is clever or convincing.

## Policies and storage

Saved policy IDs remain compatible. `full` shows available five-turn alternatives. `nudges`, now labelled Brief scenes, selects the shorter complete five-turn exchange by word count. It never removes dialogue to force three turns. After-first-attempt and Off retain their access rules.

The app still reads prebuilt, content-addressed gzip partitions in a worker with bounded parsed storage. No LLM, model installer, local inference, or hint-coaching panel is included. Exact example fingerprints, a new dataset ID and versioned assets prevent stale dialogue being served as this revision. Updating the corpus requires downloading its new partitions for a fully offline rehearsal.

## Unchanged

Playable card files, IDs, card content versions, card catalog, Card Bible, deck engine and exercise engine are unchanged. Deck history is not reset. General Learn to Play stays available outside hints.

## Review material

- `docs/SINGLE-CARD-DIALOGUE-AUDIT-v0.25.0.md`: all 480 card-specific review notes and 960 new exchanges.
- `editorial/v0.25.0/single-dialogue-ledger.json` and `.csv`: traceable before/after evidence.
- `docs/PAIR-REFERENCE-SCENES-v0.25.0.md`: 50 bespoke combination scenes and their fusion rationale.
- `reports/dialogue-audit.json`: structural review-coverage checks, explicitly not a semantic verdict.

## Deployment

Extract the complete ZIP into the repository root. Close older tabs and reopen after deployment. Download all 241 example files before offline rehearsal. Do not clear site data; that would remove deck/history too. Consult the current build-verification report for exactly which tests ran and which deployment checks remain.
