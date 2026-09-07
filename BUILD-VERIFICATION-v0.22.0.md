# Build verification — v0.22.0

## Executed and passed

- `npm test`: the existing library/game regression suite, short-example checks, and all 35 new node:test cases for request policy/privacy, cache boundaries, cancellation, model storage, the injected Wllama API contract and service-worker assets.
- `npm run audit:all`: Card Library PASS (480 cards, zero errors/warnings); Editorial Readiness PASS (zero errors/warnings); Hint Library PASS (480 cards, 960 original seeds, 57,600 hands, 345,600 fallback angles, zero errors/warnings).
- `python tools/browser-smoke.py`: offline Chromium DOM fixtures at 320 and 390 px mobile widths and a 1280 px desktop width. Passed opt-in activation, concrete fallback display, exact single/pair payloads, explicit replacement, invalid-output rejection, cancellation/late-result rejection, policy gates, Veto, Scene Log preservation, no horizontal overflow and no JavaScript page errors. The runtime is a controlled test double, not a language model.
- `node --check`: all 62 JavaScript/CommonJS/ES-module files parse successfully.
- Local development server: HTML delivery and the adapter module's JavaScript MIME type were verified with an HTTP client.
- Byte comparison against the supplied v0.21.2 ZIP: all 29 original card/library, deck-engine and fallback source files checked are unchanged. The game storage schema remains version 5; the authored Hint Bible and fallback library remain 2.1.0.

## Not executed / not established

The build environment could not fetch and execute Wllama binaries or model weights. Actual remote downloads, runtime WASM/compatibility loading, GGUF initialization, real-model generation, quality, latency, battery use, peak memory and mobile browser compatibility were NOT validated. Adapter tests inject a mock Wllama and storage tests use a fake OPFS implementation.

Browser checks use an offline DOM fixture rather than an HTTP navigation. The actual installed-service-worker lifecycle, offline cold restart, real quota eviction and deployment update behavior remain manual acceptance checks. Asset/cache logic was tested with a mocked service-worker environment, not an installed PWA. See `docs/LOCAL-HINT-ENGINE.md` for the target-device checklist.

## Interpretation

These results establish the implemented request boundaries, application behavior and mocked integration contracts. They do not show that either configured model gives better hints than the authored fallback or that inference works on every browser. The feature is explicitly labeled experimental and retains usable built-in hints whenever unavailable.

The 345,600 audited angles refer to the existing deterministic fallback engine, not to language-model outputs. Human review is still needed to judge generated two-card synthesis.

## Package scope

Includes the full static application, card content, source, original editorial history, new examples, test fixtures, development server, configuration and documentation. Does not include GGUF models, Wllama runtime binaries, npm dependencies, a remote inference service or a deployment to the live site. External model/runtime downloads happen only through explicit model setup.
