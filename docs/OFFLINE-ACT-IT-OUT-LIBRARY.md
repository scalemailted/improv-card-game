# Imprompt Offline Act-It-Out Library — Edition 0.23.0

## Purpose

Show one thing the player can actually perform: **[I do a visible action.] “One short in-character line.”** The example is not an explanation of what a Stance or Drive means. Specific props, situations and words are illustrative possibilities, not obligations imposed on the other performer.

The displayed output is stored text. No language model runs on the phone, and no model service receives prompts. An example is selected, not newly generated.

## Authoring contract

Each Stance source row is keyed by its permanent ID and supplies two actions, two speech frames, and its own standalone request. Each Drive row supplies two actions and two spoken requests. Authors must read the actual instruction, not infer it from a category/subtheme label. Empty or missing exact-card source causes a build failure.

For example, S124 Cleared to Know uses an unredacted document and visitor/insider status. It does not reuse the generic idea of copying an unfamiliar routine. S67 Chain of Command names procedural rank and who is authorized to begin. D101 Start the Hard Part delegates the emotionally difficult opening, not any arbitrary unwanted chore.

Source text files use `|` as a separator and may start comments with `#`. Do not include a literal pipe in a field. `{ask}` is the only allowed Stance speech-frame slot; the compiled runtime data cannot contain unfilled slots.

### Single cards

Every card has two individually drafted demonstrations. A Stance's own standalone request completes its two authored frames. A Drive's authored action and request stand alone. Aim for a different playable tactic, not merely new props. Two source frames do not automatically establish two useful interpretations; this requires editorial judgment.

### Exact pairs

The baseline build joins a specific Stance action/speech frame and a specific Drive request. This often makes the Stance the social method by which the Drive is pursued. Both complete performances are written to the static exact-pair shard before deployment. The phone never retrieves subtheme paragraphs or concatenates fragments.

**This does not equal individually bespoke pair authoring.** The card frames repeat across their 240 pairings, and some combinations can feel like adjacent motives instead of one integrated tactic. Complete string coverage is an engineering property. Distinctive synthesis remains an editorial property.

Bespoke overrides replace the baseline examples for a pair, not append hidden superior examples to generic output. At present, 32 pairs have 68 overrides. The source stores a rationale identifying each card's contribution. Overriding a weak pair is the primary refinement path.

### Example quality rubric

1. The first-person action is visible and concrete; it is not “I feel,” “I would,” or a personality label.
2. The spoken line gives the player actual words, not “make a remark about...”
3. The exact card's distinguishing instruction is observable.
4. In a pair, the Stance changes how the Drive is pursued. Merely mentioning both titles is insufficient.
5. Do not narrate what the partner thinks, says, accepts or must do.
6. An unsuccessful request still leaves playable interaction; no completed objective is guaranteed.
7. A detail may be invented for illustration but must not rewrite existing facts of the actual scene.
8. Favor a changed tactic on Another angle. Different wording or props alone are weak variety.
9. Keep it brief: target 20–35 words for both action and dialogue; current maximum is 36.
10. Leave the unfolding scene in charge. Release the illustrated tactic when listening suggests something better.

## Status and provenance

The manifest says `entryStatus: editorial-preview`.

Runtime record `provenance` distinguishes `individually-drafted` and `compiled-from-card-specific-material`. Bespoke records may include an internal copy-review status and tactic name. There is **no** independent human/troupe-validation claim. Original pack publication metadata concerns the cards themselves and is not promoted because examples now exist.

The automated auditor checks exact coverage, fingerprints, hash/size integrity, well-formed action/line fields, missing slots, record-ID uniqueness, word count, and different strings within a selection. It cannot prove relevance, comic usefulness, causal fusion, safety in every live context or distinct performance tactics. Literal word overlap is not used as a substitute for semantic review.

## Data shape

```json
{
  "id": "S67+D101-a",
  "action": "I slide the cancellation notice up the duty chart.",
  "line": "You outrank me. You announce the cancellation; I will take the minutes.",
  "provenance": "individually-drafted",
  "tactic": "Delegate upward"
}
```

The UI adds brackets and quotes. No executable markup, model tokens or code is in the example record.

Each file declares schema and dataset ID. `singles` maps permanent card IDs to examples. A pair shard is keyed by Stance and contains all 240 Drive IDs. Filenames include raw-content hash prefixes. The manifest contains full raw/gzip hashes, lengths, card `contentVersion` and fingerprints computed from `[id,type,contentVersion,title,instruction]`.

Changing a card without rebuilding the dataset yields an explicit stale-revision error, not an old example shown under new copy. Dataset identity includes all source rows, overrides and card fingerprints. Add an example by rebuilding files and shipping one coherent release.

## Compression and smartphone loading

There are 241 logical files: singles plus 240 Stance partitions. Each is shipped as gzip and plain JSON. Complete gzip content is 3.86 MB versus 28.04 MB plain; the delivery ZIP contains both editions plus the app and documentation.

Native `DecompressionStream('gzip')` runs inside a dedicated Worker. The reader detects already-decoded HTTP responses and verifies the decoded SHA-256 either way. If gzip decompression is unavailable it requests plain JSON instead. No external decompressor is required.

The worker parses singles and no more than four recently used pair shards. It never unpacks the full 28 MB corpus on application launch. Whole-app/JavaScript-engine RAM has not been measured; bounded JSON retention is not a peak-memory benchmark.

A full offline download verifies each file and stores its compressed response in a separate Cache Storage namespace. It decompresses partitions sequentially for integrity verification but does not retain the parsed corpus. Save can be cancelled and resumed. Quota/permission errors leave already completed files intact and must not display a successful complete status.

Browser storage can be evicted or cleared. The status display checks file presence; Save/Verify additionally reads and validates the bytes. A corrupt file is repaired online or fails explicitly offline. The core service worker includes the small singles files, while pair downloads are owned by the example worker.

## Variation and privacy

Another angle uses a shuffled bag, exhausting choices before reshuffling and preventing immediate repetition across a shuffle boundary. It stores a bounded recent history of 96 selection keys. Past keys may eventually be forgotten, and no limitless novelty is claimed.

The request allowlist includes only the revealed card(s), needed instruction/version data and permitted hint kind. Coach policy is checked before spawning the Worker. Unrevealed cards do not enter a hint request.

The application never sends a prompt or scene history to inference. An uncached pair download nevertheless has a Stance-ID filename visible to the static host. This ordinary network metadata is disclosed. Download all files before rehearsal for fully local subsequent selection. No synchronization between devices is introduced.

Flags are local and opt-in. Exporting flags is a separate user action that downloads a JSON file; it does not transmit it automatically. Export includes sample text and selected IDs for editorial diagnosis, not the complete deck/session log.

## Release/readiness procedure

1. Edit exact-card source or an override; document the tactic and both-card contribution.
2. Run `npm run build:examples` then `npm run audit:examples`.
3. Update app cache/asset versions for a new deployment and sync the two singles precache filenames in sw.js.
4. Run the full application tests and archive checks.
5. Review reported/problem pairs and a cross-pack sample manually. Do not equate mechanical passes with editorial approval.
6. On a real hosted release, save the full library, restart offline, and try uncached-in-memory pairs.
7. Try on a physical Pixel and an iPhone, with short screens and enlarged text.
8. Collect live-use flags and replace weak pairs with bespoke records.

## Documentation references

Native browser decompression: https://developer.mozilla.org/en-US/docs/Web/API/DecompressionStream

Browser cache/storage behavior: https://developer.mozilla.org/en-US/docs/Web/API/Cache and https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria

These references describe browser APIs; they are not evidence of this app's deployment behavior or the editorial quality of the dataset.
