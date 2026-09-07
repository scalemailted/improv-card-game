# The Imprompt Hint Bible

**Editorial and technical standard for optional local coaching guidance**  
**Hint Bible version:** 2.0.0  
**Implemented in:** Imprompt v0.21.1  
**Relationship to the Card Bible:** subordinate companion standard

---

## 1. Purpose

Imprompt cards are intentionally open enough to support many scenes. That openness can create a practical problem for a player who understands a card intellectually but does not yet know how to turn it into observable behavior.

The Hint Bible defines an optional coaching layer that answers two narrow questions:

1. **How might this single card become a playable first move?**
2. **How might my private Stance and Drive work together?**

It does not invent the scene. It does not explain the partner. It does not provide a winning strategy. It offers one possible doorway, then returns responsibility to the performer’s listening.

> **A hint translates a prompt into an offer. It does not translate an offer into a script.**

The entire v0.21 system runs locally in the browser. No prompt, card combination, scene history, or player identity is sent to a server. No language model is loaded or contacted.

---


## 1.1 Concrete Fusion standard

Beginning with v0.21, the two-card hint must demonstrate the combination rather than merely describe the Stance and Drive separately.

Every full combination hint contains:

1. **One way to play the pair** — a causal relationship in which both selected cards are necessary.
2. **Your first move** — an observable action the holder can perform immediately.
3. **The repeatable loop** — a changed response that can recur and heighten.
4. **When the scene changes** — permission to adapt or release the tactic when a stronger shared pattern emerges.

A useful fusion hint passes four tests:

- **Pair dependence:** replacing either card would materially change the advice.
- **Immediate actability:** the player can try the first move within a few seconds.
- **Dual contribution:** the Stance supplies a lens or method and the Drive supplies pressure or pursuit.
- **Convergence:** the hint leaves room for the partner’s behavior to transform the proposed pattern.

`Another angle` must change the tactic, not merely paraphrase the same abstract principle.

## 1.2 Card-integrated action standard

Beginning with v0.21.1, revealed cards contain their own optional assistance and replacement controls. Veto sits at the bottom left and Nudge at the bottom right. The controls are separate accessible buttons layered within the card boundary; they are never nested inside the main card button.

## 2. Holder-only contract

Every official Imprompt hint must preserve the same hidden-information contract as the cards:

> **The hint may direct only the card holder’s behavior, interpretation, attention, or tactic.**

A hint may suggest that the holder:

- makes a concrete offer;
- notices or reinterprets a detail;
- pursues a Drive through a particular tactic;
- repeats a behavior with changed stakes;
- lets one card mask, complicate, or heighten another;
- adapts after the partner responds.

A hint may not declare that the partner:

- thinks, feels, knows, wants, fears, or believes something;
- must comply, confess, agree, leave, stay, forgive, or understand;
- belongs to a fixed relationship, occupation, location, or plot;
- will create a specific response that completes the hint.

The card holder can interpret another character’s behavior privately, but the hint must never make that interpretation objectively true.

---

## 3. Help should be progressive

The system follows a least-help-first model.

### Level 1: Single-card nudge

A concise manifestation seed gives the player an observable first move. It should be useful even before the second card has been drawn.

Example:

> Make one small decision before anyone asks, then act as though the scene needs your ruling to continue.

### Level 2: Another single-card angle

A second audited manifestation seed demonstrates that the card does not have one correct performance.

Example:

> Grant, deny, or redefine permission around an ordinary detail without explaining why the authority is yours.

### Level 3: Two-card combination hint

After both cards are revealed, the local engine proposes one structural relationship between them. It can describe the Stance lens, Drive pressure, blend, and next beat.

### Level 4: Another structural angle

The player can cycle through a finite set of reusable patterns. This creates variety without using uncontrolled generation.

No level provides a required setting, canned scene premise, complete dialogue exchange, ending, or punchline.

---

## 4. The 480-card manifestation library

The Card Bible contains 48 formal subthemes across 10 official packs. The Hint Bible uses a normalized two-axis authoring system:

- **Two audited behavior seeds for every formal subtheme** define the card’s dramatic function.
- **Two audited manifestation lenses for every pack** define the pack’s characteristic pressure and scale.
- `hints/card-hints.js` composes the matching pack lens and subtheme seed into **two card-specific resolved manifestations for every card**.

This creates:

- **480 cards with resolved hint records**
- **960 distinct, card-specific manifestation seeds**
- **48 subthemes with complete functional coverage**
- **10 packs with complete tonal coverage**

The normalized source avoids maintaining 960 disconnected paragraphs while ensuring that a Status card from Everyday Friction manifests differently from a Status card in Power Games, Absurd Commitment, or Advanced Scene Engines.

The source files are:

```text
hint-bible.js
    Canonical policies, six combination patterns, acceptance rules,
    96 subtheme behavior seeds, and 20 pack manifestation lenses.

hints/card-hints.js
    Resolves pack + subtheme guidance against all 480 cards and stores
    the card ID, content version, pack, subtheme, focus motifs, two
    card-specific seeds, and heightening guidance.

hint-engine.js
    Selects single-card angles and composes two-card hints locally.
```

The resolved card-hint object has this shape:

```js
{
  schemaVersion: 1,
  cardId: "S01",
  cardContentVersion: "1.0.0",
  hintVersion: "1.0.0",
  packId: "core-foundations",
  subthemeId: "command-presence",
  focus: "status and authority",
  manifestationSeeds: [
    {
      id: "S01-a",
      label: "First move",
      text: "Keep the first move direct and easy to read. Make one small decision before anyone asks..."
    },
    {
      id: "S01-b",
      label: "Another angle",
      text: "Play the central behavior plainly before adding complication. Grant, deny, or redefine permission..."
    }
  ],
  heighten: "Apply the same interpretation to a more consequential offer..."
}
```

The card’s visible wording remains authoritative. A manifestation seed is a translation aid, not replacement card text.

---

## 5. Reusable combination patterns

There are 240 Stances and 240 Drives, producing **57,600 personal two-card hands**. Writing a fixed example for every hand would be difficult to maintain and would imply that each combination has one intended interpretation.

Imprompt instead composes hints from six reusable structural patterns. Every personal hand can be explored through all six.

### 5.1 Channel

**Principle:** Use the Stance as the method for pursuing the Drive.

This is the clearest default. The Drive supplies the pressure; the Stance determines how the player applies it.

Example structure:

> Let “Borrowed Authority” determine how you pursue “Say You’re Sorry.” Keep the pressure clear, but change the tactic in response to each offer.

### 5.2 Mask

**Principle:** Let the Stance be what the room can see while the Drive supplies the private pressure underneath it.

Useful when the Drive involves concealment, avoidance, guarded need, or an objective the character cannot state directly.

### 5.3 Friction

**Principle:** Let the Stance make the Drive harder to pursue in a playable way.

Both cards remain sincere even when they pull against each other. The contradiction becomes behavior rather than an internal puzzle to solve.

### 5.4 Escalation

**Principle:** Use every success or failure of the Drive to intensify the Stance.

Useful for repeatable behaviors, heightened premises, and cards with strong stakes. The same cause-and-effect loop returns with greater consequence.

### 5.5 Reinterpretation

**Principle:** Let the Stance decide what each response means, then use that meaning to renew the Drive.

Especially useful for worldview, fixation, pattern, and absurdity cards. The holder’s interpretation may be wrong; it remains playable because it guides only that performer.

### 5.6 Counterweight

**Principle:** Let one card keep the other responsive, grounded, or emotionally legible.

One card can establish tone or limits while the other supplies movement. Neither card needs to dominate every beat.

---

## 6. Pattern selection

The hint engine ranks patterns using existing Card Bible metadata:

- card categories;
- interaction orientation;
- intensity;
- tone;
- shared motifs;
- shared coaching roles;
- whether the Drive is a direct objective, avoidance, or repeatable behavior;
- whether the Stance is grounded, emotional, status-based, or worldview-based.

The ranking is deterministic for a given pair, so the first hint is stable and testable. **Another angle** cycles through all six patterns in a stable order.

This provides controlled variety rather than unconstrained randomness.

The engine does not infer a setting, relationship, genre, partner intention, or likely outcome.

---

## 7. Coach hint policies

A Guided Exercise stores one of four hint policies. The policy is part of the exercise configuration and is included in shared links and QR codes. It never includes card identities or deck state.

### Full coaching

- Single-card nudges available immediately
- Two-card combination hints available when both cards are revealed
- Heightening and next-beat guidance included

Best for beginners, new card packs, self-guided practice, or unfamiliar category combinations.

### Nudges only

- Single-card nudges available
- Two-card blend available
- Deeper heightening, Stance-lens, Drive-pressure, and next-beat sections omitted

Best when the coach wants light scaffolding without giving players a full analysis.

### After first attempt

- Hint controls remain locked at first
- Once both cards are revealed, the player can privately confirm that they tried the cards
- Full hints then become available for that scene

Best for encouraging an original first choice before offering support.

The unlock is a local honor-system control. It does not report anything to the coach or other players.

### Hints off

- Single-card and combination controls do not appear
- The Scene Craft Guide remains available

Best for advanced sessions, assessment, or exercises centered on independent interpretation.

---

## 8. Player-facing language

Every hint surface should reinforce four ideas.

### One possible way in

The hint is an example of a playable interpretation, not an answer key.

### Keep the wording private

A hint may make the card behavior clear without turning the scene into guessing or exposition.

### Return to the partner

Once the player has a first move, attention should leave the screen and return to the scene.

### Let the scene win

The hint is disposable. If a stronger shared pattern emerges, the performer should bend or release both the original card interpretation and the hint.

Recommended interface copy:

> **One possible way in. Keep the wording private, try the behavior, then return your attention to your partner.**

---

## 9. Single-card acceptance rules

A manifestation seed is accepted only when it:

1. gives the holder an observable behavior, interpretation, focus, or tactic;
2. can be attempted within the first few exchanges;
3. works across many settings and relationships;
4. does not explain or paraphrase the entire card;
5. does not dictate another performer’s inner state or response;
6. does not require successful completion;
7. leaves room for at least one changed repetition;
8. remains concise enough for a phone dialog;
9. does not write a punchline or scene ending;
10. demonstrates only one possible manifestation.

Each formal subtheme receives two seeds that should feel behaviorally distinct. One should not merely replace a synonym in the other.

---

## 10. Combination-hint acceptance rules

A two-card hint is accepted only when it:

1. refers to both cards;
2. gives the Stance and Drive different functions;
3. treats the Drive as initial pressure rather than a win condition;
4. keeps the partner’s response open;
5. contains no mandatory location, relationship, or plot;
6. supports listening and changed tactics;
7. allows the shared scene to replace the suggested pattern;
8. distinguishes its structural pattern from the other five angles;
9. fits on a mobile screen without becoming a scene outline;
10. can be generated locally and deterministically.

---

## 11. Holder-only language test

Automated validation flags language patterns that attempt to control another performer, including constructions such as:

```text
they must...
they will...
your partner should...
make them feel...
force them to...
```

Automated checks cannot determine every semantic violation. Human review must also ask:

- Does the hint depend on the partner accepting a premise?
- Does it secretly assign the partner a relationship or emotional state?
- Does it guarantee that a tactic succeeds?
- Does it tell the player what the partner’s behavior means as an objective fact?
- Would the hint still be playable if the partner responds in the opposite way?

The last question is the most useful test.

---

## 12. Convergence test

Every combination pattern must support the Scene Craft Guide’s convergence rule:

> **Partner first → shared pattern second → private card third**

A strong hint gives a first offer and a possible repetition. It does not require the player to preserve the hint when the interaction discovers something stronger.

The hint should work when the two Drives:

- align;
- oppose;
- become unequal;
- transform one another;
- create a shared pattern neither player anticipated.

A generated hint fails if it encourages two players to defend separate private plots.

---

## 13. Privacy, offline behavior, and scope

The v0.20 coaching engine is deliberately non-generative in the machine-learning sense.

It uses:

- bundled curated text;
- card metadata already stored in the app;
- deterministic scoring;
- finite templates;
- local pseudo-random angle selection controlled by the player.

It does not use:

- a cloud API;
- an embedded API key;
- an in-browser language model;
- analytics;
- network requests for hint content;
- other players’ cards;
- Scene Log entries;
- personal information.

This preserves GitHub Pages deployment, offline support, fast startup, predictable copy quality, and the independent-deck design.

A future experimental LLM layer, if explored, must remain optional, clearly labeled, capability-detected, and subordinate to this Hint Bible. It must never be required for ordinary play.

---

## 14. Versioning

The Hint Bible and card content use separate versions.

- `cardContentVersion` identifies the visible wording of the card.
- `hintVersion` identifies the hint-library version used to resolve coaching guidance.
- `schemaVersion` identifies the structure of a hint record.

Changing a manifestation seed does not require changing the card’s `contentVersion` because the playable card itself has not changed.

A future hint revision should update `HINT_LIBRARY_VERSION` and retain test coverage for the previous state where historical reproducibility matters.

Scene Log snapshots continue to preserve card wording. v0.20 does not add hints to the Scene Log because a hint is optional coaching, not part of the prompt dealt for the scene.

---

## 15. Automated validation

The v0.20 validator checks:

- all 48 Card Bible subthemes have guidance;
- every subtheme has exactly two manifestation seeds;
- all 480 cards resolve to a hint record;
- all 960 resolved seeds are present;
- policy and pattern IDs are unique;
- holder-only forbidden constructions are absent;
- each combination template references both cards;
- all 57,600 Stance–Drive hands generate successfully;
- every hand supports six distinct structural angles;
- all 345,600 structural angles include required full-depth fields;
- Nudges Only removes deeper fields;
- After First Attempt is unavailable until unlocked;
- Hints Off returns no coaching output;
- exercise share-link round trips preserve the hint policy;
- hint source files are bundled for offline use.

Run:

```bash
npm run audit:hints
npm run audit:hints:write
```

The generated report is stored at:

```text
reports/hint-library-audit.md
```

---

## 16. Human review and playtesting

Automated success does not prove that a hint helps a performer. Live review should track:

- Was the hint understood in five seconds?
- Did it produce a concrete offer?
- Did it create behavior rather than explanation?
- Did it narrow the scene too much?
- Did the player quote or imitate the hint mechanically?
- Did Another Angle feel meaningfully different?
- Did the hint help the player return attention to the partner?
- Did a beginner need more detail?
- Did an experienced performer find the hint intrusive?
- Did a coach choose the appropriate policy?

A hint should be revised when it consistently produces the same narrow premise, causes exposition, controls the partner, or distracts from listening.

---

## 17. Non-goals

The Hint System is not intended to:

- generate a complete scene;
- replace an improv coach;
- identify the objectively correct game of the scene;
- score performance quality;
- tell the player what line to say;
- make both performers’ private cards compatible in advance;
- synchronize players’ hands;
- predict the partner’s behavior;
- make a Drive succeed;
- remove productive uncertainty.

The system succeeds when a player closes the hint and has one clearer thing to **do**.

---

## 18. North star

> **Imprompt does not need an AI to invent a scene. It needs a small coaching engine that helps a player translate two private prompts into one clear offer.**

The hint provides the first step. The partner and the shared scene determine everything after it.
