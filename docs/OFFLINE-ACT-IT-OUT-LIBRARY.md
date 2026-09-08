# Imprompt Act-It-Out Scene Library · v0.24.0

## What an example must do

An example is a performed moment with an exchange, not an instruction to invent one. Each single card receives an A–B–A scene. A pair receives A–B–A or A–B–A–B–A. In both cases, **A holds the selected card(s)**. B is not assigned a second private deck or an undisclosed prompt.

A's first action establishes a concrete choice. B supplies one plausible offer, objection or consequence. A's next line responds to that specific offer and exposes more of the card's behavior. A five-turn scene adds another response and changed pressure, not a second unrelated plot.

No subtheme explanation, motivation analysis or instruction to heighten appears on the nudge screen. Those ideas belong to live coaches and the separate Learn to Play guide.

### Example: Chain of Command + Start the Hard Part

**A** [I slide the cancellation notice up the committee chart.] “The chair introduces difficult business. You tell them the trip is cancelled; I will take the minutes.”

**B** “You cancelled the trip.”

**A** “Which makes me the author of the notice, not its authorized speaker.”

A routes difficult disclosure through a hierarchy. It is one causal behavior, not two separate demonstrations. The committee setting illustrates the cards; players can transfer that behavior to another relationship. The real partner need not say B's line.

## Scope and provenance

All 480 cards have two individually extended single scenes. Their opening actions and lines were adapted from the supplied v0.23.0 author's material, with a newly authored reply and follow-through for each alternative. They are creative editorial work, not externally conducted blind reads or live-tested outcomes.

The 57,600 exact pairs have two stored scenes apiece. Most are composed at build time from those exact single-scene records plus an authored transfer method for the specific Stance. Twenty-five pairs have bespoke replacements. The compiler's transfer method applies the Stance to the Drive's concrete object, request and response, rather than preserving two unrelated props from two unconnected scenes.

This is **complete lookup coverage**, not proof of complete semantic quality. A card-specific template can still produce an awkward exchange for an unexpected partner card. Composition provenance remains explicit. Strong format checks cannot establish comedic effectiveness, realistic character behavior, or that both cards are indispensable. Troupe review and revisions remain necessary.

## Data format

A runtime scene has:

```json
{
  "id": "S67+D101-scene-1",
  "format": "ABA",
  "beats": [
    {"speaker": "A", "action": "I slide the cancellation notice up the committee chart.", "text": "The chair introduces difficult business. You tell them the trip is cancelled; I will take the minutes."},
    {"speaker": "B", "text": "You cancelled the trip."},
    {"speaker": "A", "text": "Which makes me the author of the notice, not its authorized speaker."}
  ],
  "provenance": "authored-pair",
  "seedRefs": ["S67-single-a", "D101-single-a"]
}
```

`provenance` distinguishes `authored-single`, `authored-pair`, and `composed-from-authored-scenes`. Source-review notes and full card instructions are not repeated in runtime records. Individual examples have no pair `seedRefs` because they are the seeds.

Canonical files are `examples/authoring/single-scenes.json`, `stance-transfers.json` and `pair-scenes.json`. Build scripts do not overwrite them.

## How pairs are constructed

The compiler reads the actual single-card scenes, not generic category paragraphs.

1. Select the exact Stance and Drive sources by stable IDs and checked card revisions.
2. Take a concrete object, request, B response and A counter-response from the Drive scene.
3. Apply the Stance's authored physical method and speech framing to that same object and request.
4. Have B respond to the actual pursuit.
5. Let A's reply express the Stance's interpretation while changing or renewing the pursuit.
6. For the longer alternative, add a B challenge to that Stance and A's in-character follow-through.
7. Replace the entire composition when an exact-pair authored scene exists.

The longer alternative also draws from the Drive's second single scene. It is not simply extra text appended to the same first exchange. Some transfer methods still recur across pairs, so the corpus is finite structured writing rather than unlimited spontaneous generation.

## Revision safeguards

The card fingerprint hashes `[id, type, contentVersion, title, instruction]`. A changed card invalidates its reviewed source until a person or editor explicitly reconciles the content and updates the recorded fingerprint. The reader uses the same mapping to refuse an incompatible dataset at runtime.

Each Stance transfer records hashes for its two reviewed single scenes. Editing a seed without rechecking the transfer makes the build fail with a specific review message. Bespoke pairs also record the two reviewed card fingerprints. The compiler never silently refreshes those acknowledgments.

Historical Scene Log snapshots do not point to the new example text. They continue to store the actual card wording played in that past scene. This release does not migrate or rewrite them.

## Acceptance checks

Mechanical tests cover complete IDs and pair keys, two alternatives, expected actor order, A at both ends, real speech rather than empty fields, reasonable length, absence of leftover placeholders or HTML, exact source references, gzip/raw equality, SHA-256 integrity and per-selection rotation.

The current measured single-scene maximum is 49 words including the stage direction. Pair sketches have approximately 52 words at the three-turn median and 67 words at the five-turn median. The permitted ceilings are deliberately above the current lengths to flag bloat without truncating dialogue.

Editorial questions are different:

- Does A's final line answer what B just contributed?
- Does the Stance determine **how** the Drive is pursued?
- Do the setting and objects belong to the same situation?
- Would removing either card materially change A's behavior?
- Does the alternate scene change the approach instead of merely swapping a noun?
- Is B a plausible illustrative response rather than a device that guarantees A wins?

Passing structural tests does not answer these questions. Use Flag for review to identify weak records; edit a single source for systematic issues or add an exact pair override for a local issue.

## Delivery and storage

The manifest points to one singles partition and one Drive-indexed partition for each Stance: 241 files per representation. JSON and gzip are content-addressed. The worker validates decompressed bytes before parsing, holds singles plus at most four decoded pair partitions, and does not inflate the full library at startup.

A deliberate full-library download saves the compressed representation when native gzip decoding is available, otherwise the plain compatibility copy. Normal uncached reads require connectivity. Saving is resumable. Bad cached bytes are removed and repaired while online; missing offline data yields an explicit message, not a generic coaching substitute.

All runtime requests stay on the site's origin. No models, cloud inference, API keys or analysis of the other performer's cards is involved. A requested partition can reveal its Stance ID in ordinary hosting logs before complete offline caching.

## Player interface and policies

The modal contains a title, one compact actor key, the exchange, Another scene, Done, an optional index, and a review flag. No coaching accordion, AI installer, generation status or repeated introduction is present.

The saved policy IDs remain `full`, `nudges`, `after-attempt` and `off`. `nudges` now restricts display to three-turn examples. It does not mean abstract advice. The general coach exercise system remains intact.

## Publication boundary

No release status has been promoted as a result of formatting examples. The existing nine expansion packs remain at their recorded playtest/publication stages. Example scenes form a separate editorial-preview dataset. Quality review must be tracked as actual review, not inferred from file count or successful unit tests.
