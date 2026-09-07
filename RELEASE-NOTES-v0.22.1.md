# Imprompt v0.22.1 — performed hints and visible failures

Refactored from the complete v0.22.0 project. The 480 cards, authored fallback hints, exercises, independent shuffle and Scene Log are retained.

## Fixed

The previous prompt called the model an acting-example writer but supplied advice-style examples and told it to address the player as “you.” The new prompt makes the model the improviser holding the revealed cards. It performs one present-tense first-person action and one spoken line. Illustrative scene details are allowed. A pair requires the Drive to be pursued through the Stance in the same move.

The validator no longer rejects square-bracketed stage directions. It also accepts plain, parenthesized and italic first-person action notation, while rejecting plain coaching, missing dialogue, obvious generic summaries, restatements and duplicated examples. Accepted text is displayed consistently as an action plus dialogue.

The old generated-hint cache is invalidated. Saved model files and game data are retained. The prompt/cache version and app/service-worker version are bumped together.

## Generation flow

After explicit model enable, opening a nudge or combination starts generation automatically unless a valid matching generated example is cached. An already-open hint offers Act it out. Another angle requests a new moment. The built-in example remains available and accurately labeled while waiting or after a failure.

A rejected response receives one targeted retry, not an unbounded loop. Both attempts share a 180-second deadline. Streaming counts and elapsed time expose whether work is in progress. A Stop generating button cancels it. Runtime errors, blocked loading and malformed responses now retain their actual diagnostic details instead of disappearing into an unexplained `runtime` result.

The Node development server enables isolation headers by default to permit browser multithreading; `npm start -- --single-thread` disables them. Runtime and model versions are unchanged. Weights are not bundled.

## Diagnostics and checks

Generation details and Last local-engine operation are collapsed until needed. They show error messages, model/prompt version, attempt outcomes and bounded raw rejected output, with an explicit Copy details button. Nothing is automatically uploaded. Review generated text in a report before sharing it.

The optional `tools/real-model-check.html` uses the production adapter for six fixed requests and reports timing/output/diagnostics. It is a real-model test entry point, not a fake generator. It has not been run successfully in this environment, which blocks live browser networking.

The automated regression and offline DOM browser tests passed. These tests use mocked inference, so they do not establish actual model quality, speed or target-device compatibility. See the build-verification record.
