# Imprompt v0.24.0 — Act-It-Out Scenes

Hints now show dialogue rather than generalized coaching: A–B–A for individual cards and A–B–A or A–B–A–B–A for exact Stance/Drive pairs. A always holds the requested cards. B is an illustrative response, not an assignment for another real performer.

Every card has two individually extended three-turn scenes. The pair compiler uses the exact single-card scene sources, applies the Stance's performance method to the Drive's concrete object and request, then incorporates responsive B and A dialogue. Selected difficult pairs have fully authored overrides. The remaining precomposed pair scenes are editorial drafts, not individually human-approved scripts.

The player sees only the title, actor key, short scene, Another scene, Done, and optional review flag. No LLM installation or generation interface and no expandable hint coaching remain. General Learn to Play material and coach exercise setup remain separate.

Saved full/nudges/after-attempt/off policy IDs remain compatible. The nudges policy now means Short scenes only (ABA); full means Examples available (ABA and ABABA). Hint-off and first-attempt gating are preserved.

Cards, IDs, card content versions, existing deck state, exercise definitions and Scene Log snapshots are unchanged. The example dataset has a new schema, content hash and cache identity. Its gzip partitions are decoded on demand in a worker; no whole-library decompression at startup.

Run npm test, npm run audit:all and npm run test:browser for the current checks. See reports and BUILD-VERIFICATION-v0.24.0.md for execution boundaries. Structural coverage is not proof that every pair is a good scene.
