# The Imprompt Card Bible

**Editorial and technical standard for the 480-card Imprompt library**  
**Bible version:** 1.2.0  
**Implemented foundation:** Imprompt v0.10.0  
**Target release:** Imprompt v1.0  

---

## 1. Purpose

This document is the single source of truth for creating, reviewing, testing, publishing, revising, and retiring official Imprompt cards.

The target official library contains:

- **240 Stance cards**
- **240 Drive cards**
- **10 official packs**
- **48 cards per pack:** 24 Stances and 24 Drives

The purpose of the Card Bible is not merely to make the library large. It is to ensure that the four-hundred-and-eightieth card still feels as clear, playable, open-ended, and carefully written as the first.

The Bible governs five things:

1. **Taxonomy:** what kinds of dramatic material the library contains.
2. **Metadata:** how cards are classified for players, coaches, exercises, filtering, and future analysis.
3. **Pack composition:** how 480 cards remain balanced rather than becoming a pile of loosely related prompts.
4. **Language:** how each card directs only its holder while leaving the partner and scene free.
5. **Acceptance:** what a card must prove through automated checks, editorial review, and live playtesting before publication.

The Bible is intentionally stricter than the web application. The application should remain easy and immediate. Most of this structure exists behind the scenes so the player can simply tap a card and begin.

---

## 2. The non-negotiable design promise

Every official Imprompt card must support this promise:

> **Each performer receives private conditions for play. The performers discover the shared scene together.**

A card is not a script, a punch line, a plot twist, a demand placed on the partner, or a fact the entire scene must obey. It is a private source of behavior for the person holding it.

### A Stance answers

> **How am I entering, interpreting, or reacting within this scene?**

A Stance may shape status, history, emotional assumptions, or worldview. It can tell the holder how to carry themself, what they value, what they notice, or how they interpret offers.

### A Drive answers

> **What keeps me taking action, protecting something, or repeating a playable behavior?**

A Drive may give the holder an objective, secret, avoidance, or repeating engine. It should create activity without dictating success.

### The hidden-information contract

A card may define:

- the holder's belief
- the holder's emotional premise
- the holder's objective
- the holder's secret
- the holder's pattern of behavior
- the holder's interpretation of offers
- the holder's response strategy

A card may **not** define:

- what another performer secretly thinks
- what another performer wants
- how another performer will react
- what another performer must say
- whether another performer agrees, apologizes, leaves, confesses, or changes
- a hidden fact that only makes sense if every player somehow knows it

A Drive may pursue another person's response, but it cannot guarantee that response. “Get an apology” is playable. “They are ready to apologize” is not.

---

## 3. Library architecture

The complete official library is organized across five layers.

| Layer | Function |
|---|---|
| **Deck** | Separates Stances from Drives. |
| **Category** | Identifies the card's major dramatic function and visible color/icon. |
| **Subtheme** | Prevents semantic repetition within a broad category. |
| **Pack** | Gives a group of cards a recognizable flavor while preserving full category coverage. |
| **Metadata** | Supports coaching, filtering, paired exercises, difficulty control, and editorial auditing. |

These layers solve different problems. A category should not be used as a pack, and a pack should not replace a subtheme.

For example:

```text
Deck:       Stance
Category:   Status & Authority
Subtheme:   Precarious Authority
Pack:       Power Games
Card:       [future card]
```

The visible card may show only **Status & Authority**. The subtheme and pack remain available to the gallery, coach tools, audit scripts, and future library filters.

---

## 4. The ten-pack plan

Every official pack contributes exactly:

- 6 Status & Authority Stances
- 6 History & Relationship Stances
- 6 Emotional Assumptions Stances
- 6 Worldview & Absurdity Stances
- 12 Direct Objectives Drives
- 6 Secrets & Avoidance Drives
- 6 Repeatable Behaviors Drives

Each pack contributes **one card to every defined subtheme**. Across ten packs, every subtheme therefore contains exactly ten official cards.

| # | Pack | Stance IDs | Drive IDs | Editorial focus |
|---:|---|---|---|---|
| 1 | **Core Foundations** | S01–S24 | D01–D24 | Broad, portable fundamentals that establish the Imprompt voice. |
| 2 | **Everyday Friction** | S25–S48 | D25–D48 | **Active playtest pack:** ordinary inconvenience, domestic strain, work tension, and small stakes treated seriously. |
| 3 | **Power Games** | S49–S72 | D49–D72 | **Active playtest pack:** authority, legitimacy, leverage, dependency, hierarchy, and the struggle over who gets to decide. |
| 4 | **Relationship Knots** | S73–S96 | D73–D96 | Affection, obligation, rivalry, dependence, family roles, mentorship, and unfinished connection. |
| 5 | **Emotional Pressure** | S97–S120 | D97–D120 | Longing, insecurity, validation, resentment, grief, hope, shame, and emotional contradiction. |
| 6 | **Secrets & Schemes** | S121–S144 | D121–D144 | Concealment, investigation, recruitment, misdirection, confession, and plans under pressure. |
| 7 | **Absurd Commitment** | S145–S168 | D145–D168 | Impossible logic, literal commitment, grounded responses, recurring nonsense, and heightened consequence. |
| 8 | **Rules, Rituals & Institutions** | S169–S192 | D169–D192 | Bureaucracy, standards, customs, systems, traditions, and institutional behavior. |
| 9 | **Competition & Consequences** | S193–S216 | D193–D216 | Winning, comparison, bargains, accountability, sacrifice, and the cost of success. |
| 10 | **Advanced Scene Engines** | S217–S240 | D217–D240 | Layered contradictions, delayed reveals, reversals, callbacks, and veteran-level pressure. |

### Pack identity must remain secondary to playability

A pack's flavor should inspire vocabulary and situations, but a card must still function in many relationships and locations.

Weak pack writing:

> You are a cashier whose register breaks during a lunch rush.

Stronger Everyday Friction writing:

> Treat a minor inconvenience as proof that no one respects the work you do.

The second card can work in a store, home, hospital, spaceship, royal court, or fantasy dungeon. The pack provides flavor without trapping the scene.

---

# Part I — Taxonomy

## 5. Stance taxonomy

The Stance deck contains four categories. Each category contains six subthemes. Each subtheme receives one card per pack and ten cards in the final library.

## 5.1 Status & Authority — 60 cards

**Definition:** How the holder claims, protects, yields, borrows, or quietly exercises status and authority.

| Subtheme | Target | Design question |
|---|---:|---|
| **Command Presence** | 10 | How does the holder act as though they are entitled to decide? |
| **Precarious Authority** | 10 | How does the holder project control while guarding a fragile position? |
| **Professional Expertise** | 10 | How does skill, training, or standards shape the holder's status? |
| **Belonging & Legitimacy** | 10 | How does the holder claim or imitate the right to be present? |
| **Mentorship & Rank** | 10 | How does seniority, instruction, legacy, or rank define the relationship? |
| **Hidden Leverage** | 10 | How does the holder exercise influence without appearing to hold power? |

### Category boundaries

A Status & Authority Stance is about how the holder **occupies position**. It is not automatically a Drive to make another performer submit.

- Stance: “Carry yourself as though your judgment should settle the matter.”
- Drive: “Make someone acknowledge your authority.”

The first governs behavior. The second pursues an outcome.

## 5.2 History & Relationship — 60 cards

**Definition:** How the holder interprets the present through familiarity, obligation, rivalry, trust, or unfinished history.

| Subtheme | Target | Design question |
|---|---:|---|
| **Shared Origins** | 10 | How does long familiarity override present formality or reinvention? |
| **Debts & Favors** | 10 | What past help or sacrifice remains active currency? |
| **Familiar Roles** | 10 | Which old role does the holder automatically resume? |
| **Rivalry & Comparison** | 10 | How does shared history make the holder measure themself against someone? |
| **Trust & Dependence** | 10 | How does the holder rely on a relationship while resisting that reliance? |
| **Rupture & Unfinished Business** | 10 | How does a past break or unnamed incident color the present? |

### Category boundaries

A History & Relationship card may imply a past, but it should not require a specific exposition dump. The holder can discover the details through play.

Weak:

> Ten years ago, your brother stole your wedding ring and sold it to pay a gambling debt.

Strong:

> Treat every generous offer as another attempt to repay an old betrayal.

The stronger version contains history, behavior, and room for discovery.

## 5.3 Emotional Assumptions — 60 cards

**Definition:** The emotional premise the holder brings into the scene and uses to interpret offers from others.

| Subtheme | Target | Design question |
|---|---:|---|
| **Admiration & Envy** | 10 | How do respect, imitation, jealousy, and comparison coexist? |
| **Identity & Nostalgia** | 10 | What earlier self, relationship, or version of events is being protected? |
| **Fear & Insecurity** | 10 | What place, worth, safety, or belonging feels threatened? |
| **Care & Control** | 10 | How does affection become supervision, intervention, or possession? |
| **Approval & Belonging** | 10 | How does the holder quietly calibrate around acceptance? |
| **Pride & Validation** | 10 | How does the holder create opportunities to be admired or proven right? |

### Category boundaries

“Sad,” “angry,” or “jealous” alone is not a sufficient Stance. Emotion must alter interpretation and behavior.

Weak:

> Be jealous.

Strong:

> Praise another person's success while treating every detail as a standard you now have to surpass.

The strong version gives the performer playable behavior rather than an emotional label.

## 5.4 Worldview & Absurdity — 60 cards

**Definition:** The holder's governing logic for what matters, what is normal, and how seriously the world should be taken.

| Subtheme | Target | Design question |
|---|---:|---|
| **Ritual & Tradition** | 10 | What ordinary process becomes sacred or inviolable? |
| **Crisis & Catastrophe** | 10 | What makes the holder interpret events as urgent or dangerous? |
| **Celebration & Optimism** | 10 | How does the holder find victory or opportunity in every development? |
| **Practical Grounding** | 10 | How does the holder accept unusual reality and address its consequences? |
| **Fixation & Significance** | 10 | What detail, phrase, object, or rule becomes disproportionately important? |
| **Pattern & Grand Meaning** | 10 | How does the holder connect events into a larger system or certainty? |

### Category boundaries

Absurdity is not randomness. A good absurd Stance has a stable internal rule the performer can apply repeatedly.

Weak:

> Act weird.

Strong:

> Treat every interruption as a legally binding amendment to the current conversation.

The strong version creates a repeatable worldview.

---

## 6. Drive taxonomy

The Drive deck contains three categories. Direct Objectives contains twelve subthemes because active pursuit is the most broadly useful scene engine. The other Drive categories contain six subthemes each.

## 6.1 Direct Objectives — 120 cards

**Definition:** A concrete outcome the holder actively pursues through the partner or the shared situation.

| Subtheme | Target | Objective family |
|---|---:|---|
| **Secure Help** | 10 | Obtain assistance or an admission of need. |
| **Prevent Departure** | 10 | Keep a person, object, opportunity, or arrangement from leaving. |
| **Obtain an Apology** | 10 | Produce remorse, acknowledgment, restitution, or repair. |
| **Gain Approval** | 10 | Secure permission, endorsement, praise, or acceptance. |
| **Transfer the Task** | 10 | Make another person accept an unwanted responsibility. |
| **Extract Information** | 10 | Discover knowledge, suspicion, memory, or intent. |
| **Recruit an Ally** | 10 | Bring another person into a plan, side, belief, or secret. |
| **Induce Risk** | 10 | Get another person to act first, break a rule, or accept danger. |
| **Gain Recognition** | 10 | Obtain acknowledgment of status, identity, expertise, or sacrifice. |
| **Force a Choice** | 10 | Make another person choose between competing commitments. |
| **Test Loyalty** | 10 | Create proof of allegiance, trust, affection, or commitment. |
| **Obtain Surrender** | 10 | Make another person yield, relinquish, concede, or hand something over. |

### Objective standard

A Direct Objective must be:

- active rather than contemplative
- possible to pursue in multiple ways
- resistant enough to sustain a scene
- visible through behavior
- open to failure, compromise, or reinterpretation

Weak:

> Win.

Strong:

> Make someone choose your plan while believing the decision was entirely theirs.

## 6.2 Secrets & Avoidance — 60 cards

**Definition:** A truth, responsibility, subject, or weakness the holder conceals, redirects, reframes, or protects.

| Subtheme | Target | Avoidance family |
|---|---:|---|
| **Conceal Culpability** | 10 | Hide responsibility while remaining involved. |
| **Avoid the Subject** | 10 | Keep the interaction away from one dangerous topic. |
| **Protective Deception** | 10 | Withhold truth because honesty is believed to cause harm. |
| **Induce a Confession** | 10 | Make someone else reveal or admit something first. |
| **Reframe Failure** | 10 | Present a mistake, loss, or bad plan as intentional or successful. |
| **Feign Competence** | 10 | Hide confusion or inadequacy by performing certainty. |

### Secret standard

The card should tell the holder **what kind of thing to protect**, not prewrite an elaborate backstory.

Weak:

> You secretly replaced the mayor's dog with a raccoon last Tuesday.

Strong:

> Hide that you caused the problem while becoming the most enthusiastic person helping to solve it.

## 6.3 Repeatable Behaviors — 60 cards

**Definition:** A reusable behavioral pattern that can recur, heighten, and become the scene's comic engine.

| Subtheme | Target | Pattern family |
|---|---:|---|
| **Competition Loop** | 10 | Convert offers into contests, rankings, or opportunities to win. |
| **Positive Reframing** | 10 | Transform setbacks into increasingly optimistic interpretations. |
| **Emotional Contradiction** | 10 | Pair outward behavior with an escalating opposing emotion. |
| **Transactional Framing** | 10 | Turn favors, feelings, and apologies into bargains. |
| **Self-Serving Agreement** | 10 | Accept offers while repeatedly redefining them in the holder's favor. |
| **Pattern Escalation** | 10 | Treat new details as proof of a larger and more consequential pattern. |

### Pattern standard

A Repeatable Behavior should generate at least three distinct beats without requiring the performer to repeat the same sentence.

Weak:

> Say “interesting” after everything.

Strong:

> Treat every new detail as evidence that the problem is larger than anyone realizes.

---

# Part II — Card metadata

## 7. Required card fields

Every published card uses the machine-readable schema in `cards/card.schema.json`.

| Field | Purpose | Example |
|---|---|---|
| `schemaVersion` | Version of the technical card structure. | `1` |
| `id` | Permanent card identity. | `S01` |
| `type` | Deck membership. | `stance` |
| `packId` | Official pack identity. | `core-foundations` |
| `contentVersion` | Version of this card's wording and metadata. | `1.0.0` |
| `status` | Editorial lifecycle. | `published` |
| `title` | Memorable human-facing name. | `Top of the Ladder` |
| `instruction` | Private playable direction. | `Carry yourself...` |
| `category` | Visible canonical category label. | `Status & Authority` |
| `categoryId` | Stable machine-readable category. | `status-authority` |
| `subtheme` | Canonical editorial subtheme label. | `Command Presence` |
| `subthemeId` | Stable machine-readable subtheme. | `command-presence` |
| `difficulty` | Cognitive and performance complexity. | `beginner` |
| `intensity` | Likely emotional or dramatic pressure. | `medium` |
| `tone` | Natural tonal range. | `grounded` |
| `orientation` | Primary direction of the holder's attention. | `against-partner` |
| `coachRoles` | Functional tags used by guided exercises. | `authority`, `controller` |
| `motifs` | Subject and emotional motifs. | `status`, `approval` |
| `recommendedModes` | Open, Mirror, and/or Paired suitability. | `open`, `mirror`, `paired` |

Metadata must describe the card that is actually written. It should never be used to rescue unclear copy.

## 8. Difficulty

Difficulty measures how much interpretation, restraint, or layered play the card asks from the holder. It does not measure whether the subject is serious.

### Beginner

- immediately observable behavior
- one dominant idea
- low dependence on subtext
- easy to repeat or pursue
- understandable in one quick read

Example shape:

> Treat every disagreement as a contest you intend to win.

### Intermediate

- two compatible ideas or a clear contradiction
- requires listening and adjustment
- may need gradual revelation
- rewards restraint rather than immediate exposition

Example shape:

> Seek approval while pretending the other person's opinion does not matter.

### Advanced

- layered or delayed behavior
- subtle status, history, or emotional contradiction
- meaning may shift as the scene develops
- requires strong listening and selective disclosure

Example shape:

> Treat ordinary kindness as an attempt to repair an incident you refuse to name.

Difficulty should be assigned after a blind-read test, not solely by the writer.

## 9. Intensity

Intensity estimates the likely pressure generated by committed play.

| Level | Meaning |
|---|---|
| **Low** | Light friction, curiosity, mild status, procedural focus, or playful pattern. |
| **Medium** | Clear emotional need, conflict, competition, secrecy, or consequence. |
| **High** | Abandonment, betrayal, identity threat, urgent crisis, major loyalty, or strong emotional exposure. |

Intensity is not a quality ranking. Low-intensity cards are essential for contrast and sustainable long-form play.

## 10. Tone

| Tone | Meaning |
|---|---|
| **Grounded** | Naturally supports recognizable human behavior and plausible stakes. |
| **Heightened** | Encourages amplified logic, emotion, ritual, or consequence while remaining coherent. |
| **Absurd** | Depends on an impossible, surreal, or strongly comic internal logic. |
| **Flexible** | Can be played credibly as grounded or heightened without changing the instruction. |

Tone does not dictate performance style. A grounded card can appear in a fantastical world, and an absurd card should still be emotionally committed.

## 11. Orientation

Orientation identifies where the card primarily directs the holder's attention.

| Orientation | Meaning |
|---|---|
| **Toward partner** | Seeks connection, support, approval, recruitment, protection, or retention. |
| **Against partner** | Seeks advantage, control, surrender, comparison, exposure, or resistance. |
| **Away from partner** | Avoids, conceals, redirects, escapes, or protects distance. |
| **Self-focused** | Maintains identity, legitimacy, competence, pride, or internal control. |
| **World-focused** | Fixates on objects, systems, rules, patterns, procedures, or the shared reality. |

Orientation is descriptive, not moral. “Against partner” does not require hostility, and “toward partner” does not guarantee warmth.

## 12. Coach roles

Coach roles are controlled functional tags used to build precise exercises without adding dozens of visible categories.

Examples include:

- authority
- insecure authority
- expert
- outsider
- mentor
- caretaker
- rival
- dependent
- vulnerable
- protector
- approval seeker
- ritualist
- alarmist
- optimist
- anchor
- pursuer
- avoider
- recruiter
- instigator
- investigator
- secret keeper
- competitor
- negotiator
- controller
- escalator
- stabilizer
- broker
- challenger
- claimant
- enforcer
- gatekeeper
- patron
- successor

A card should normally receive **one to three** coach roles. Four is the hard maximum. Tags must describe how the card functions in play, not every concept the text happens to mention.

### Future exercise use

Coach roles make exercises possible such as:

```text
Absurd Instigator vs. Practical Anchor
Pursuer vs. Avoider
Authority vs. Vulnerable
Competitor vs. Stabilizer
Investigator vs. Secret Keeper
```

The exercise still distributes private cards. The role tag narrows the eligible pool; it does not expose the actual card.

## 13. Motifs

Motifs describe recurring content and emotional material, such as:

- access
- allegiance
- approval
- autonomy
- belonging
- competition
- compliance
- control
- dependence
- fear
- hierarchy
- history
- identity
- influence
- leverage
- legitimacy
- loyalty
- obligation
- optimism
- patronage
- recognition
- repair
- reputation
- risk
- ritual
- rules
- secrecy
- status
- succession
- territory
- trust
- truth
- validation

A card should normally receive **two or three** motifs. Five is the hard maximum.

Motifs are useful for search, editorial balance, content review, and future coach filters. They should not become a substitute for categories or subthemes.

---

# Part III — Writing standards

## 14. Write for behavior, not explanation

The performer should be able to demonstrate the card through choices rather than explaining it aloud.

Weak:

> Explain that you are the most important person here.

Strong:

> Treat questions as requests for your approval.

The strong version creates behavior. The audience may understand the status without hearing a biography.

## 15. Write in the second person

Official instructions address the holder directly.

Preferred openings include:

- Carry yourself...
- Treat...
- Interpret...
- Seek...
- Protect...
- Make...
- Keep...
- Turn...
- Meet...
- Accept...
- Choose...
- Behave...

The copy may use “you” when a direct imperative would be less natural, but action-forward language is preferred.

## 16. One central engine per card

A card may contain a useful contradiction, but it should not contain three unrelated assignments.

Weak:

> Act superior, hide a crime, speak only in questions, and become sad whenever someone mentions food.

Strong:

> Project complete authority while quietly preventing anyone from testing your expertise.

The strong version has layers, but they belong to one engine.

## 17. Preserve interpretive room

The card should be specific enough to play and open enough to reinvent.

Too vague:

> Want something.

Too specific:

> Convince your estranged aunt to give you the blue suitcase containing your grandfather's forged passport before the train reaches Vienna.

Balanced:

> Make someone surrender an object they insist has only sentimental value.

The performer and partner can discover the object, relationship, and stakes.

## 18. Do not prewrite the joke

A card may contain comic potential, but it should not dictate a one-time gag.

Weak:

> Every time someone says “meeting,” fall out of your chair.

Strong:

> Treat every routine procedure as physically dangerous and demand escalating precautions.

The strong version can develop, respond, and heighten.

## 19. Do not prewrite the scene ending

Avoid instructions whose only playable move immediately resolves or destroys the scene.

Weak:

> Confess everything and leave.

Strong:

> Keep testing whether it is finally safe to confess.

The stronger Drive generates interaction rather than a single exit cue.

## 20. Stance construction

A strong Stance usually contains two components:

```text
Interpretive lens + observable behavior
```

Useful patterns:

```text
Treat [ordinary offer] as [private interpretation]. Respond by [repeatable behavior].
Carry yourself as [status/emotional premise]. Adjust whenever [observable cue].
Approach [the situation] as though [worldview]. Protect that logic through [behavior].
Choose [a person/detail] as [source of meaning]. Keep returning to it.
```

### Strong Stance examples

> Treat every correction as an attempt to replace you. Make yourself increasingly indispensable.

> Accept the strangest premise immediately, then focus on costs, timing, and safety.

> Carry yourself as though everyone present is benefiting from a sacrifice only you remember making.

### Stance failure modes

#### Partner mind-reading

Bad:

> They are jealous of your success.

Better:

> Interpret every compliment as an attempt to hide jealousy.

#### Static emotion

Bad:

> Be anxious.

Better:

> Treat small changes as evidence that your place is no longer secure.

#### Objective disguised as Stance

Bad:

> Make them give you the promotion.

Better Stance:

> Behave as though the promotion would merely recognize authority you already possess.

The original sentence may instead become a Direct Objective.

## 21. Drive construction

A strong Drive provides either:

```text
Pursued outcome + playable constraint
```

or:

```text
Repeatable behavior + path for heightening
```

Useful patterns:

```text
Make someone [action/outcome] without [obvious direct request].
Keep [truth/subject/weakness] hidden while [remaining engaged].
Turn every [offer/setback/disagreement] into [repeatable frame].
Get someone to [risk/choose/reveal] before you [corresponding action].
Protect [truth/person/identity] even as [pressure increases].
```

### Strong Drive examples

> Get approval for something you have already done.

> Keep the conversation away from the one subject that would expose your responsibility.

> Agree with every proposal, then redefine the agreement so it benefits you.

### Drive failure modes

#### Guaranteed success

Bad:

> They will apologize and forgive you.

Better:

> Maneuver someone toward an apology without naming the offense.

#### Private desire without action

Bad:

> Secretly wish they respected you.

Better:

> Create opportunities for someone to acknowledge your importance.

#### One-time gimmick

Bad:

> Steal their hat.

Better:

> Keep persuading someone to surrender objects they claim they still need.

## 22. Title rules

A title should be:

- memorable
- fast to scan
- tonally suggestive
- distinct from every other official title
- usually one to five words
- no more than seven words

Titles may be:

- a compact imperative: **Choose Me**
- a role: **The Only Professional**
- a contradiction: **Supportive Rage**
- a metaphor: **Top of the Ladder**
- a question: **How Much Do You Know?**

Avoid titles that merely repeat the category:

- **Authority Card**
- **Emotional Stance**
- **Secret Objective**

Avoid titles so clever that they obscure the instruction.

## 23. Copy length

The phone screen is the final editorial constraint.

### Recommended ranges

| Element | Recommended | Hard maximum |
|---|---:|---:|
| Title | 1–5 words | 7 words / 60 characters |
| Stance instruction | 8–28 words | 32 words / 240 characters |
| Drive instruction | 4–22 words | 32 words / 240 characters |

Short copy is not automatically better. The instruction must contain enough behavior to be playable. Extra words must add action, tension, or a useful constraint.

## 24. Voice and typography

Official cards use:

- contemporary plain English
- active voice
- second-person direction
- complete sentences
- contractions when natural
- typographic apostrophes where present in title copy
- one line of source text per field

Avoid:

- academic jargon
- improv terminology that beginners may not know
- unexplained abbreviations
- semicolon-heavy prose
- parenthetical exceptions
- slash constructions such as “boss/parent/teacher”
- instructions that require rereading to identify the verb

## 25. Portability

Official cards should ordinarily work across:

- realistic and fantastical settings
- two-person and small ensemble scenes
- familiar and unfamiliar relationships
- short-form and long-form play
- beginner and veteran performers, according to assigned difficulty

Occupation, relationship, object, or location may be implied by the scene. The card should rarely hard-code one unless a future specialized pack is explicitly designed to do so.

## 26. Safety and respect

The default official library should be broadly usable in mixed adult workshop settings. A performer always retains a no-explanation veto.

Official cards must not require:

- identity-based stereotypes or accents
- mockery of disability, race, ethnicity, religion, gender, or sexuality
- sexual coercion or nonconsensual intimacy
- unwanted physical contact
- graphic violence or self-harm
- humiliation aimed at the real performer rather than the fictional character
- disclosure of personal trauma
- imitation of a specific living person
- substance use, criminality, or abuse as the only comic premise

Emotionally intense cards may address fear, grief, abandonment, betrayal, or shame in abstract playable terms. They should not prescribe graphic backstory.

Specialized mature or content-warning packs may be considered later, but they must be opt-in and separate from the general official library.

---

# Part IV — Editorial acceptance

## 27. The publication pipeline

Every official card passes through these stages:

```text
Concept
  ↓
Draft
  ↓
Self-edit
  ↓
Automated audit
  ↓
Editorial review
  ↓
Blind-read test
  ↓
Pairability gauntlet
  ↓
Live playtest
  ↓
Final copy edit
  ↓
Published
```

A card is not “done” because the sentence sounds clever. It is done when performers can understand it quickly, embody it visibly, combine it with unrelated cards, and sustain it without explaining it.

## 28. Automated acceptance gates

The validator in `tools/card-validator.js` checks every published card and pack.

### Hard failures

A card cannot publish with:

- a missing required field
- malformed or duplicate ID
- an ID assigned to the wrong pack range
- a Stance placed in a Drive category or vice versa
- an unknown category, subtheme, role, motif, tone, intensity, or difficulty
- category or subtheme labels that disagree with canonical taxonomy
- duplicate title or duplicate instruction
- instruction longer than 32 words or 240 characters
- title longer than seven words or 60 characters
- HTML, control characters, or multiline copy
- malformed semantic version
- an explicit declaration of another performer's private state
- incomplete published-pack quotas
- more or fewer than one card per subtheme in a published pack

### Warnings requiring editorial review

The validator warns about:

- copy outside the recommended word range
- instructions that do not begin with a recognizable playable verb
- Stances shaped more like objectives than interpretive lenses
- high token overlap with another card

A warning is not an automatic rejection, but it must be consciously resolved or documented.

### Running the audit

```bash
npm test
npm run audit:cards
npm run audit:cards:write
```

The generated report appears at:

```text
reports/card-library-audit.md
```

## 29. Human review scorecard

Automated checks cannot determine whether a card is funny, inspiring, subtle, fair, or genuinely playable. Every candidate receives a human score from 0 to 2 in ten dimensions.

| Dimension | 0 | 1 | 2 |
|---|---|---|---|
| **Immediate clarity** | Confusing | Understandable after thought | Clear on first read |
| **Holder-only direction** | Dictates partner/world | Minor ambiguity | Directs only the holder |
| **Observable behavior** | Internal only | Partly playable | Clearly visible in choices |
| **Action or repetition** | Static | One useful move | Sustains multiple beats |
| **Pairability** | Needs matching premise | Some limitations | Works with broad opposite deck |
| **Interpretive openness** | Prewrites scene | Some room | Invites many scenes |
| **Distinctiveness** | Duplicates another card | Familiar variation | Adds a distinct engine |
| **Escalation potential** | Cannot heighten | Limited heightening | Naturally develops |
| **Phone readability** | Dense or awkward | Usable | Elegant and scannable |
| **Respect and safety** | Inappropriate | Requires revision | General-library appropriate |

### Human acceptance threshold

A candidate should normally score:

- **17 or higher out of 20**
- no zero in Holder-only direction
- no zero in Observable behavior
- no zero in Pairability
- no zero in Respect and safety

A lower-scoring card returns to revision rather than being rescued by metadata.

## 30. Blind-read test

Give the card to at least three people who did not write it.

Allow approximately five seconds to read it. Ask each person:

1. What would you physically or verbally do first?
2. What would you keep doing if the scene continued?
3. What does the card tell you about the other performer?

The desired answer to question three is:

> “Nothing certain. It tells me how my character interprets or acts toward them.”

### Provisional acceptance target

- At least **80%** of readers identify substantially the same playable engine.
- At least **80%** can describe an observable first move.
- No reader believes the card guarantees the partner's behavior.

These thresholds are editorial starting points and should be revised after larger-scale playtest data.

## 31. Pairability gauntlet

A candidate Stance is tested with at least six randomly selected Drives. A candidate Drive is tested with at least six randomly selected Stances.

The six opposite cards should include:

- at least one grounded card
- at least one heightened or absurd card
- at least one low-intensity card
- at least one high-intensity card
- at least one card oriented toward the partner
- at least one card oriented away from or against the partner

A pairing passes when a performer can explain how both cards could influence one coherent character without discarding either card.

### Provisional acceptance target

- At least **five of six** random pairings should be immediately playable.
- No more than one pairing should require rewriting either card's premise.
- The candidate should not force the same scene across all six pairings.

## 32. Mirror and Paired exercise test

Every card receives recommended exercise modes.

### Mirror test

Ask whether two independent performers drawing from the same category, subtheme, or coach-role pool can create productive collision without needing synchronized cards.

### Paired test

Ask whether the card can complement or resist a different function such as:

- pursuer and avoider
- authority and vulnerable
- instigator and anchor
- investigator and secret keeper
- competitor and stabilizer

A card does not need to support every exercise. Its `recommendedModes` and `coachRoles` should truthfully reflect where it works.

## 33. Live playtest protocol

A candidate should receive repeated live exposure before publication.

For each exposure, record:

- whether it was understood without explanation
- whether it produced observable behavior in the first 30 seconds
- whether it remained active after the initial offer
- whether the player abandoned one of their two cards
- whether the player vetoed it
- whether the card created a repeated pattern or active pursuit
- whether the card caused premise explanation instead of interaction
- whether the combination felt substantially different from prior scenes
- optional performer comments

### Provisional release gate

Before final publication, aim for:

- at least **12 live exposures** across multiple performers
- at least **three experience levels** represented where practical
- no recurring hidden-information confusion
- no recurring safety objection
- at least **75%** of exposures judged playable without coaching intervention
- a veto rate below **35%**, unless the card is intentionally advanced or high intensity

These are quality-control guidelines, not claims of statistical validity. The thresholds should evolve as Imprompt accumulates real use data.

## 34. Semantic duplication review

Two cards can have different words and still create the same behavior.

Before accepting a candidate, compare it against:

- every card in its subtheme
- every card sharing its primary coach role
- every card with similar title language
- every card surfaced by the token-overlap audit

Ask:

1. Does this card create a different first move?
2. Does it heighten differently?
3. Does it pair differently with the opposite deck?
4. Does the pack flavor materially change the engine?
5. Would a player remember this as distinct after seeing both cards in one rehearsal?

If the answer is no, merge, replace, or retire the weaker card.

---

# Part V — Pack standards

## 35. The one-per-subtheme rule

Every published 48-card pack contains exactly one card in every subtheme.

This creates:

- consistent category proportions
- predictable coverage for coaches
- protection against overproducing the easiest ideas
- ten distinct interpretations of every subtheme across the final library

A pack may not compensate for a missing subtheme by adding an extra card elsewhere.

## 36. Pack voice

Each pack begins with a one-page creative brief defining:

- the pack's dramatic territory
- what distinguishes it from the other nine packs
- vocabulary and imagery it may inspire
- content it should avoid
- how its Stances should feel
- how its Drives should create pressure
- examples of two cards that belong
- examples of two cards that do not belong

The pack voice should be recognizable in aggregate, but no card should depend on reading the pack title.

## 37. Balance beyond quotas

A completed pack should be reviewed for distribution across:

- beginner, intermediate, and advanced difficulty
- low, medium, and high intensity
- grounded, heightened, absurd, and flexible tone
- all five orientations
- varied coach roles
- varied motifs
- short and medium instruction lengths

Recommended pack profile, subject to theme:

| Dimension | Suggested range in a 48-card pack |
|---|---:|
| Beginner | 14–24 |
| Intermediate | 16–24 |
| Advanced | 4–12 |
| Low intensity | 8–18 |
| Medium intensity | 18–30 |
| High intensity | 6–16 |
| Grounded or flexible tone | At least 28 |
| Heightened or absurd tone | At least 8 |

These are editorial balance targets, not hard schema rules. The pack's creative brief may justify a different profile.

## 38. Candidate overproduction

Do not draft exactly 48 cards and assume all 48 deserve publication.

Recommended process per pack:

1. Draft **58–64 candidates**.
2. Remove obvious duplication and weak engines.
3. Bring **52–56 candidates** into blind read and pairability testing.
4. Bring approximately **50 candidates** into live playtesting.
5. Publish the strongest **48**, with exact subtheme quotas.

Overproduction allows quality to determine selection rather than sunk cost.

---

# Part VI — Versioning and maintenance

## 39. Card IDs are permanent

A published card ID is never reassigned to a different concept.

- S01 always identifies **Top of the Ladder** and its editorial lineage.
- D13 always identifies **Helpful Culprit** and its editorial lineage.

If a card is retired, its ID remains retired. A new card receives a new unused ID.

## 39.1 Library expansion and private deck continuity

An existing player should not have to erase their independent deck when a new official pack is published. The deck state records which card IDs were known at its last library synchronization.

When new published IDs appear, the application:

1. preserves the current scene, Scene Log, session history, custom exercises, and existing queue order;
2. identifies only card IDs that were not part of the previously known library;
3. inserts those new IDs at randomized positions in the appropriate remaining queues; and
4. updates the local library snapshot.

Already consumed Core cards are not reinserted merely because the library grew. A player therefore gains access to new material without losing continuity or creating an immediate repeat flood.

For v0.7-era state that predates the library snapshot, S01–S24 and D01–D24 are treated as the known Core Foundations baseline.

## 40. Content versions

Each card has a semantic `contentVersion`.

### Patch: 1.0.0 → 1.0.1

Use for:

- punctuation
- typo correction
- tiny clarity edit that does not change behavior

### Minor: 1.0.0 → 1.1.0

Use for:

- meaningful rewording
- improved constraint
- metadata adjustment that changes exercise eligibility
- revision that preserves the card's central engine

### Major: 1.0.0 → 2.0.0

Use for:

- a fundamental redesign of the card while retaining its editorial lineage
- change substantial enough that old and new versions may play differently

Scene Log entries snapshot the wording used at the time of play, so future revisions do not rewrite history.

## 41. Retirement

A card may be retired for:

- persistent low playability
- semantic duplication
- safety or respect concerns
- misleading metadata
- incompatibility with the hidden-information contract
- repeated evidence that the title or instruction creates the wrong behavior

A retired card remains in source history and migration maps but is removed from active draw pools.

## 42. Taxonomy changes

The seven visible categories should remain stable through v1.0 unless playtesting demonstrates a missing fundamental function.

New variety should first be represented through:

- subthemes
- coach roles
- motifs
- pack flavor
- exercise definitions

Adding a visible category affects colors, icons, coaching language, filters, coverage reports, accessibility, and player learning. It requires a deliberate library-level decision.

---

# Part VII — Authoring workflow

## 43. Drafting a card

Use the authoring worksheet in `docs/CARD-AUTHORING-WORKSHEET.md`.

At minimum, the writer should answer:

1. What does the holder do in the first ten seconds?
2. What can the holder do a second and third time?
3. What remains unknown about the partner?
4. How can the card heighten?
5. What five opposite-deck cards would produce meaningfully different scenes?
6. Which existing card is most similar, and why is this one distinct?
7. What category and subtheme does it fill?
8. What coach role does it enable?

If those answers are weak, the metadata should not be completed yet.

## 44. Reviewing a card

Use `docs/CARD-REVIEW-SCORECARD.md`.

Review copy in this order:

1. Hidden-information compliance
2. Observable behavior
3. Sustained action or repetition
4. Pairability
5. Distinctiveness
6. Language economy
7. Metadata accuracy
8. Safety and respect
9. Pack fit
10. Title polish

Do not begin by debating the title. A polished title cannot rescue an inert instruction.

## 45. Building a pack

Use `docs/PACK-BRIEF-TEMPLATE.md`.

A pack editor should maintain a working matrix with one row per subtheme and columns for:

- reserved ID
- draft title
- author
- status
- difficulty
- intensity
- tone
- orientation
- coach roles
- closest existing card
- automated audit result
- blind-read result
- pairing result
- live exposure count
- final decision

The pack is ready only when all 48 rows are filled by accepted cards and the complete pack passes the library audit.

---

# Part VIII — v1.0 release gates

## 46. Content completeness

Imprompt v1.0 requires:

- 240 published Stances
- 240 published Drives
- 10 published packs
- exact category totals
- exactly ten cards in every subtheme
- no duplicate IDs, titles, or instructions

## 47. Quality completeness

Imprompt v1.0 should not ship until:

- the automated library audit has zero errors
- every warning is reviewed and resolved or documented
- every card meets the human review threshold
- every card passes blind-read and pairability testing
- every card has live playtest evidence
- every pack has a complete creative brief
- category, difficulty, intensity, tone, orientation, role, and motif distributions have been audited
- all Scene Log snapshots remain backward compatible
- guided exercises have sufficient eligible cards
- phone layouts have been checked against the longest titles and instructions

## 48. Product principle at scale

A 480-card library succeeds only if the player still experiences simplicity:

> Tap Stance. Tap Drive. Enter the scene with two private truths.

The taxonomy exists to create variety. The metadata exists to help coaches. The tests exist to protect quality. None of them should make ordinary play feel like database administration.

---

# Appendix A — Core Foundations mapping

Core Foundations establishes one published example in every subtheme.

## Stances

| ID | Card | Category | Subtheme |
|---|---|---|---|
| S01 | Top of the Ladder | Status & Authority | Command Presence |
| S02 | Borrowed Authority | Status & Authority | Precarious Authority |
| S03 | The Only Professional | Status & Authority | Professional Expertise |
| S04 | Act Like You Belong | Status & Authority | Belonging & Legitimacy |
| S05 | The Protégé Problem | Status & Authority | Mentorship & Rank |
| S06 | Hidden Power | Status & Authority | Hidden Leverage |
| S07 | Before They Were Impressive | History & Relationship | Shared Origins |
| S08 | You Owe Me | History & Relationship | Debts & Favors |
| S09 | The Responsible One | History & Relationship | Familiar Roles |
| S10 | Old Rivals | History & Relationship | Rivalry & Comparison |
| S11 | Only You | History & Relationship | Trust & Dependence |
| S12 | After What Happened | History & Relationship | Rupture & Unfinished Business |
| S13 | Envious Admiration | Emotional Assumptions | Admiration & Envy |
| S14 | The Old You | Emotional Assumptions | Identity & Nostalgia |
| S15 | Replacement Fear | Emotional Assumptions | Fear & Insecurity |
| S16 | For Their Own Good | Emotional Assumptions | Care & Control |
| S17 | Their Opinion Matters | Emotional Assumptions | Approval & Belonging |
| S18 | Fishing for Praise | Emotional Assumptions | Pride & Validation |
| S19 | Sacred Procedure | Worldview & Absurdity | Ritual & Tradition |
| S20 | Red Alert | Worldview & Absurdity | Crisis & Catastrophe |
| S21 | Cause for Celebration | Worldview & Absurdity | Celebration & Optimism |
| S22 | Practical Realist | Worldview & Absurdity | Practical Grounding |
| S23 | The Important Thing | Worldview & Absurdity | Fixation & Significance |
| S24 | The Grand Design | Worldview & Absurdity | Pattern & Grand Meaning |

## Drives

| ID | Card | Category | Subtheme |
|---|---|---|---|
| D01 | Admit You Need Me | Direct Objectives | Secure Help |
| D02 | Don’t Go | Direct Objectives | Prevent Departure |
| D03 | Say You’re Sorry | Direct Objectives | Obtain an Apology |
| D04 | Retroactive Permission | Direct Objectives | Gain Approval |
| D05 | Make It Their Idea | Direct Objectives | Transfer the Task |
| D06 | How Much Do You Know? | Direct Objectives | Extract Information |
| D07 | Join Me | Direct Objectives | Recruit an Ally |
| D08 | You First | Direct Objectives | Induce Risk |
| D09 | Recognize Me | Direct Objectives | Gain Recognition |
| D10 | Choose Me | Direct Objectives | Force a Choice |
| D11 | Prove Your Loyalty | Direct Objectives | Test Loyalty |
| D12 | Give It Up | Direct Objectives | Obtain Surrender |
| D13 | Helpful Culprit | Secrets & Avoidance | Conceal Culpability |
| D14 | Not That Subject | Secrets & Avoidance | Avoid the Subject |
| D15 | Merciful Lie | Secrets & Avoidance | Protective Deception |
| D16 | Confess First | Secrets & Avoidance | Induce a Confession |
| D17 | Sell the Disaster | Secrets & Avoidance | Reframe Failure |
| D18 | Fake the Expertise | Secrets & Avoidance | Feign Competence |
| D19 | Everything Is a Contest | Repeatable Behaviors | Competition Loop |
| D20 | Brighter Side | Repeatable Behaviors | Positive Reframing |
| D21 | Supportive Rage | Repeatable Behaviors | Emotional Contradiction |
| D22 | Terms and Conditions | Repeatable Behaviors | Transactional Framing |
| D23 | Yes, but My Way | Repeatable Behaviors | Self-Serving Agreement |
| D24 | The Pattern | Repeatable Behaviors | Pattern Escalation |

---

# Appendix B — Source files

| File | Purpose |
|---|---|
| `card-bible.js` | Canonical machine-readable taxonomy, pack plan, enums, roles, motifs, and ID helpers. |
| `cards/core-foundations.js` | The original 48 cards, fully tagged to the Bible. |
| `cards/everyday-friction.js` | Pack 2's 48 active playtest cards. |
| `cards/power-games.js` | Pack 3's 48 active playtest cards. |
| `cards/candidates/everyday-friction-candidate-pool.json` | The complete Pack 2 drafting pool and editorial dispositions. |
| `cards/candidates/power-games-candidate-pool.json` | The complete Pack 3 drafting pool and editorial dispositions. |
| `cards.js` | Runtime aggregator that preserves the application's existing `IMPROMPT_CARDS` interface. |
| `cards/card.schema.json` | JSON Schema for an individual card. |
| `cards/pack.schema.json` | JSON Schema for a pack. |
| `tools/card-validator.js` | Structural, taxonomy, language, quota, and duplication checks. |
| `tools/card-audit.js` | Command-line audit and Markdown report generator. |
| `reports/card-library-audit.md` | Generated snapshot of current library progress and validation. |
| `docs/CARD-AUTHORING-WORKSHEET.md` | Reusable drafting worksheet. |
| `docs/CARD-REVIEW-SCORECARD.md` | Human editorial review rubric. |
| `docs/PACK-BRIEF-TEMPLATE.md` | Planning template for each expansion pack. |

---

> **Final editorial test:** Would this card cause a performer to make clearer, more committed, more responsive choices without deciding what the partner has to do?
>
> If yes, it may belong in Imprompt. If no, revise it before adding more metadata.


# Appendix C — Everyday Friction implementation

Everyday Friction is the first expansion authored under this Bible. It is active in Imprompt v0.9.0 with internal status `playtest`.

- Pack brief: `docs/packs/EVERYDAY-FRICTION-PACK-BRIEF.md`
- Authoring matrix: `docs/packs/EVERYDAY-FRICTION-AUTHORING-MATRIX.md`
- Candidate pool: `docs/packs/EVERYDAY-FRICTION-CANDIDATE-POOL.md`
- Machine-readable candidates: `cards/candidates/everyday-friction-candidate-pool.json`
- Runtime module: `cards/everyday-friction.js`

The pack provides one S25–S48 or D25–D48 card in every subtheme, expands the active library to 96 cards, and remains subject to blind-read and live-playtest revision before final publication.

# Appendix D — Power Games implementation

Power Games is the second expansion authored under this Bible. It is active in Imprompt v0.10.0 with internal status `playtest`.

- Pack brief: `docs/packs/POWER-GAMES-PACK-BRIEF.md`
- Authoring matrix: `docs/packs/POWER-GAMES-AUTHORING-MATRIX.md`
- Candidate pool: `docs/packs/POWER-GAMES-CANDIDATE-POOL.md`
- Machine-readable candidates: `cards/candidates/power-games-candidate-pool.json`
- Runtime module: `cards/power-games.js`

The pack provides one S49–S72 or D49–D72 card in every formal subtheme. It adds seven coach roles—Broker, Challenger, Claimant, Enforcer, Gatekeeper, Patron, and Successor—and twelve power-analysis motifs without changing the visible seven-category system.

With Core Foundations and Everyday Friction, the active library now contains 72 Stances and 72 Drives, or 144 total cards. Power Games remains subject to independent blind reads and repeated live troupe playtesting before final publication.

