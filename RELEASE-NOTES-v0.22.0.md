# Imprompt v0.22.0 — Optional local hint engine

## Player-facing changes

Nudges now start with one concrete example, without the repeated introduction. Full-policy coaching is available in a collapsed “Built-in coaching” section; Nudges-only still suppresses depth. Veto and Need a nudge? remain at the bottom of revealed cards. Cards are treated as kept when revealed, so no redundant keep action or kept-status line is shown.

The core deck gains 96 authored examples across 48 cards. Other single-card fallbacks use existing action seeds directly, without their generic pack preface. Existing pair synthesis remains the instant fallback, with concise examples for three regression pairs. Counts displayed for hand-authored pair angles match their available variants.

A Main menu → Local hint engine dialog offers two optional SmolLM2 GGUF configurations. Setup is explicit. Once loaded, Generate a fresh hint and Another angle use Wllama in the browser. Loading alone never changes the hint being read. There is no chat UI, cloud inference endpoint, API key, or inference subscription.

## Request and failure boundaries

Only revealed card instructions are projected into a request: one card for a nudge, one Stance plus one Drive for a pair. Hidden cards, session history and other players' cards are excluded. Full/Nudges/After-first-attempt/Off policies are enforced before consulting either the model or generated cache. Existing draw queues, sessions, exercise sharing and Scene Log formats are preserved.

Generated answers undergo basic length, duplication, format, truncation and partner-control checks. These checks are not proof of good improv or successful two-card synthesis. Invalid answers never replace the current example. Late results cannot overwrite a newly opened hint. Closing a generation, leaving the page, timeout or runtime failure stops inference and preserves the built-in path.

A bounded generated-text cache uses separate storage. App-owned OPFS model files are streamed to disk and receive a completion marker only after size/header validation. Removing model data does not clear the deck or Scene Log. Model files are not duplicated into the PWA cache. Model storage is not a cryptographic integrity guarantee and can be evicted by the browser.

## Files and operation

New hint modules: `quick-hints.js`, `local-hint-core.js`, `local-hints.js`, `local-models.js`, `model-store.mjs`, `wllama-adapter.mjs`, `runtime-config.mjs`. The original Card Bible, hint-generation fallback modules, deck engine and 480 card definitions remain intact. App assets and service-worker version advance to 0.22.0.

Run `npm start`, then open localhost:8080, or publish the folder to a static HTTPS host. No npm installation is required for the app. Wllama 3.6.1 and GGUF weights download only on explicit setup; they are not bundled in the ZIP. CPU single-thread operation is the conservative default on ordinary static hosting. Cross-origin-isolated hosts may use up to four CPU threads.

## Verification boundary

The existing Node suite, new controller/storage/adapter/asset tests, and offline browser DOM smoke tests pass. The browser tests use an injected fake inference adapter. Real GGUF execution, mobile model performance and offline installed-PWA behavior need target-device testing. See `BUILD-VERIFICATION-v0.22.0.md` and `docs/LOCAL-HINT-ENGINE.md`.
