(function (root, factory) {
  const bible = typeof module === "object" && module.exports
    ? require("../card-bible.js")
    : root.IMPROMPT_CARD_BIBLE;
  const pack = factory(bible);

  if (typeof module === "object" && module.exports) {
    module.exports = pack;
  } else {
    root.IMPROMPT_CARD_PACKS = root.IMPROMPT_CARD_PACKS || [];
    root.IMPROMPT_CARD_PACKS.push(pack);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function (bible) {
  "use strict";

  if (!bible) {
    throw new Error("Relationship Knots requires card-bible.js to load first.");
  }

  const PACK_ID = "relationship-knots";
  const DEFAULT_CONTENT_VERSION = "0.11.0";
  const PACK_VERSION = "0.18.0";
  const ALL_MODES = ["open", "mirror", "paired"];

  function createCard(definition) {
    const category = bible.getCategory(definition.categoryId);
    const subtheme = bible.getSubtheme(definition.categoryId, definition.subthemeId);
    if (!category || !subtheme || category.deck !== definition.type) {
      throw new Error(`Invalid taxonomy assignment for ${definition.id}.`);
    }

    return {
      schemaVersion: bible.CARD_SCHEMA_VERSION,
      id: definition.id,
      type: definition.type,
      packId: PACK_ID,
      contentVersion: definition.contentVersion || DEFAULT_CONTENT_VERSION,
      status: "playtest",
      title: definition.title,
      instruction: definition.instruction,
      category: category.label,
      categoryId: definition.categoryId,
      subtheme: subtheme.label,
      subthemeId: definition.subthemeId,
      difficulty: definition.difficulty,
      intensity: definition.intensity,
      tone: definition.tone,
      orientation: definition.orientation,
      coachRoles: definition.coachRoles,
      motifs: definition.motifs,
      recommendedModes: definition.recommendedModes || ALL_MODES
    };
  }

  const definitions = [
  {
    "type": "stance",
    "id": "S73",
    "title": "Emotional Seniority",
    "instruction": "Carry yourself as the person who understands this relationship best, and treat your interpretation as the one that should settle disagreements.",
    "categoryId": "status-authority",
    "subthemeId": "command-presence",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "authority",
      "confidant",
      "memory-keeper"
    ],
    "motifs": [
      "connection",
      "history",
      "intimacy",
      "control"
    ]
  },
  {
    "type": "stance",
    "id": "S74",
    "title": "Keeper of the Peace",
    "instruction": "Project calm authority over the relationship while carefully avoiding anything that might expose how fragile the peace really is.",
    "categoryId": "status-authority",
    "subthemeId": "precarious-authority",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "world-focused",
    "coachRoles": [
      "peacemaker",
      "insecure-authority",
      "protector"
    ],
    "motifs": [
      "reconciliation",
      "care",
      "fear",
      "control"
    ]
  },
  {
    "type": "stance",
    "id": "S75",
    "title": "I Know Your Tells",
    "instruction": "Use intimate knowledge of habits, moods, and patterns as expertise that lets you diagnose every choice.",
    "categoryId": "status-authority",
    "subthemeId": "professional-expertise",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "expert",
      "confidant",
      "investigator"
    ],
    "motifs": [
      "intimacy",
      "familiarity",
      "expertise",
      "communication"
    ]
  },
  {
    "type": "stance",
    "id": "S76",
    "title": "Still Part of This",
    "instruction": "Act as though shared history permanently guarantees your place, even when present boundaries suggest otherwise.",
    "categoryId": "status-authority",
    "subthemeId": "belonging-legitimacy",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "self-focused",
    "coachRoles": [
      "familiar",
      "loyalist",
      "claimant"
    ],
    "motifs": [
      "belonging",
      "history",
      "attachment",
      "boundaries"
    ]
  },
  {
    "type": "stance",
    "id": "S77",
    "title": "Keeper of Precedent",
    "instruction": "Treat your longer memory as an archive, not a throne. Cite specific promises and precedents whenever the relationship faces a new choice.",
    "categoryId": "status-authority",
    "subthemeId": "mentorship-rank",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "memory-keeper",
      "mentor",
      "archivist"
    ],
    "motifs": [
      "memory",
      "precedent",
      "promise",
      "history"
    ],
    "contentVersion": "0.18.0"
  },
  {
    "type": "stance",
    "id": "S78",
    "title": "Private Access",
    "instruction": "Use shared confidences and private knowledge as quiet leverage, never stating how much influence that closeness gives you.",
    "categoryId": "status-authority",
    "subthemeId": "hidden-leverage",
    "difficulty": "advanced",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "confidant",
      "hidden-power",
      "broker"
    ],
    "motifs": [
      "intimacy",
      "secrecy",
      "leverage",
      "trust"
    ]
  },
  {
    "type": "stance",
    "id": "S79",
    "title": "Our Private Language",
    "instruction": "Use old references, shorthand, and familiar rhythms as proof that this connection exists beneath whatever has changed.",
    "categoryId": "history-relationship",
    "subthemeId": "shared-origins",
    "difficulty": "beginner",
    "intensity": "low",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "familiar",
      "confidant",
      "memory-keeper"
    ],
    "motifs": [
      "familiarity",
      "communication",
      "memory",
      "connection"
    ]
  },
  {
    "type": "stance",
    "id": "S80",
    "title": "I Was There",
    "instruction": "Treat your presence during a difficult time as an enduring claim on loyalty, honesty, and consideration.",
    "categoryId": "history-relationship",
    "subthemeId": "debts-favors",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "creditor",
      "loyalist",
      "wounded"
    ],
    "motifs": [
      "sacrifice",
      "obligation",
      "loyalty",
      "history"
    ]
  },
  {
    "type": "stance",
    "id": "S81",
    "title": "Back in Our Roles",
    "instruction": "Return immediately to the role you usually play in this relationship, even when the present situation calls for something different.",
    "categoryId": "history-relationship",
    "subthemeId": "familiar-roles",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "familiar",
      "caretaker",
      "nostalgist"
    ],
    "motifs": [
      "history",
      "identity",
      "routine",
      "familiarity"
    ]
  },
  {
    "type": "stance",
    "id": "S82",
    "title": "The Other Favorite",
    "instruction": "Treat every sign of attention, trust, and affection as something to compare with what another connection appears to receive.",
    "categoryId": "history-relationship",
    "subthemeId": "rivalry-comparison",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "rival",
      "approval-seeker",
      "attachment-seeker"
    ],
    "motifs": [
      "jealousy",
      "competition",
      "affection",
      "validation"
    ]
  },
  {
    "type": "stance",
    "id": "S83",
    "title": "Old Reflex",
    "instruction": "Turn to this person first whenever uncertainty appears, as an old reflex. Notice the habit only after you have already involved them.",
    "categoryId": "history-relationship",
    "subthemeId": "trust-dependence",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "dependent",
      "memory-keeper",
      "confidant"
    ],
    "motifs": [
      "dependence",
      "familiarity",
      "routine",
      "uncertainty"
    ],
    "contentVersion": "0.18.0"
  },
  {
    "type": "stance",
    "id": "S84",
    "title": "Almost Forgiven",
    "instruction": "Behave as though the past is nearly resolved, but let each small disappointment reopen one precise part of the hurt.",
    "categoryId": "history-relationship",
    "subthemeId": "rupture-unfinished-business",
    "difficulty": "advanced",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "wounded",
      "reconciler",
      "repairer"
    ],
    "motifs": [
      "forgiveness",
      "resentment",
      "repair",
      "history"
    ]
  },
  {
    "type": "stance",
    "id": "S85",
    "title": "Easy to Love",
    "instruction": "Interpret another person’s ease with affection as both admirable and unfair, then compete to seem equally worth choosing.",
    "categoryId": "emotional-assumptions",
    "subthemeId": "admiration-envy",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "admirer",
      "rival",
      "approval-seeker"
    ],
    "motifs": [
      "admiration",
      "envy",
      "affection",
      "jealousy"
    ]
  },
  {
    "type": "stance",
    "id": "S86",
    "title": "Who We Used to Be",
    "instruction": "Perform the version of yourself that belonged to this relationship before it changed, and treat old chemistry as still recoverable.",
    "categoryId": "emotional-assumptions",
    "subthemeId": "identity-nostalgia",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "nostalgist",
      "memory-keeper",
      "attachment-seeker"
    ],
    "motifs": [
      "identity",
      "history",
      "memory",
      "attachment"
    ]
  },
  {
    "type": "stance",
    "id": "S87",
    "title": "One Step from Distance",
    "instruction": "Treat pauses, divided attention, and small boundaries as signs that the connection may be slipping away.",
    "categoryId": "emotional-assumptions",
    "subthemeId": "fear-insecurity",
    "difficulty": "beginner",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "self-focused",
    "coachRoles": [
      "vulnerable",
      "attachment-seeker",
      "alarmist"
    ],
    "motifs": [
      "fear",
      "abandonment",
      "distance",
      "attachment"
    ]
  },
  {
    "type": "stance",
    "id": "S88",
    "title": "Love Means Checking",
    "instruction": "Treat close monitoring of choices, moods, and details as care, becoming more involved whenever you feel uncertain.",
    "categoryId": "emotional-assumptions",
    "subthemeId": "care-control",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "protector",
      "controller",
      "caretaker"
    ],
    "motifs": [
      "care",
      "control",
      "intimacy",
      "boundaries"
    ]
  },
  {
    "type": "stance",
    "id": "S89",
    "title": "Still Your Person",
    "instruction": "Seek small signs that you remain special, trusted, and included without directly asking where you stand.",
    "categoryId": "emotional-assumptions",
    "subthemeId": "approval-belonging",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "approval-seeker",
      "attachment-seeker",
      "loyalist"
    ],
    "motifs": [
      "approval",
      "belonging",
      "attachment",
      "intimacy"
    ]
  },
  {
    "type": "stance",
    "id": "S90",
    "title": "Remember What I Meant",
    "instruction": "Create openings for shared memories that prove your past presence mattered and still deserves acknowledgment.",
    "categoryId": "emotional-assumptions",
    "subthemeId": "pride-validation",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "memory-keeper",
      "recognition-seeker",
      "nostalgist"
    ],
    "motifs": [
      "memory",
      "recognition",
      "history",
      "validation"
    ]
  },
  {
    "type": "stance",
    "id": "S91",
    "title": "Our Thing",
    "instruction": "Protect one shared ritual, phrase, or tradition as the living proof that the relationship still exists.",
    "categoryId": "worldview-absurdity",
    "subthemeId": "ritual-tradition",
    "difficulty": "beginner",
    "intensity": "low",
    "tone": "grounded",
    "orientation": "world-focused",
    "coachRoles": [
      "ritualist",
      "memory-keeper",
      "loyalist"
    ],
    "motifs": [
      "ritual",
      "memory",
      "attachment",
      "promise"
    ]
  },
  {
    "type": "stance",
    "id": "S92",
    "title": "This Is How It Ends",
    "instruction": "Treat every awkward pause, changed plan, or small disagreement as the possible beginning of permanent distance.",
    "categoryId": "worldview-absurdity",
    "subthemeId": "crisis-catastrophe",
    "difficulty": "beginner",
    "intensity": "high",
    "tone": "heightened",
    "orientation": "self-focused",
    "coachRoles": [
      "alarmist",
      "vulnerable",
      "attachment-seeker"
    ],
    "motifs": [
      "fear",
      "abandonment",
      "distance",
      "crisis"
    ]
  },
  {
    "type": "stance",
    "id": "S93",
    "title": "A Sign We’re Fine",
    "instruction": "Interpret every laugh, favor, and familiar habit as evidence that the connection is stronger than appearances suggest.",
    "categoryId": "worldview-absurdity",
    "subthemeId": "celebration-optimism",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "heightened",
    "orientation": "toward-partner",
    "coachRoles": [
      "optimist",
      "reconciler",
      "attachment-seeker"
    ],
    "motifs": [
      "optimism",
      "reconciliation",
      "affection",
      "connection"
    ]
  },
  {
    "type": "stance",
    "id": "S94",
    "title": "Relationship Maintenance",
    "instruction": "Accept every emotional complication, then focus on the next concrete act that could make staying connected easier.",
    "categoryId": "worldview-absurdity",
    "subthemeId": "practical-grounding",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "world-focused",
    "coachRoles": [
      "anchor",
      "repairer",
      "reconciler"
    ],
    "motifs": [
      "repair",
      "communication",
      "connection",
      "responsibility"
    ]
  },
  {
    "type": "stance",
    "id": "S95",
    "title": "Those Exact Words",
    "instruction": "Choose one phrase from the interaction and keep returning to what its wording must reveal about the relationship.",
    "categoryId": "worldview-absurdity",
    "subthemeId": "fixation-significance",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "world-focused",
    "coachRoles": [
      "fixator",
      "investigator",
      "wounded"
    ],
    "motifs": [
      "communication",
      "memory",
      "patterns",
      "resentment"
    ]
  },
  {
    "type": "stance",
    "id": "S96",
    "title": "Fate Keeps Reconnecting Us",
    "instruction": "Treat every coincidence, interruption, and repeated encounter as proof that this connection is meant to continue.",
    "categoryId": "worldview-absurdity",
    "subthemeId": "pattern-grand-meaning",
    "difficulty": "advanced",
    "intensity": "medium",
    "tone": "heightened",
    "orientation": "world-focused",
    "coachRoles": [
      "meaning-maker",
      "nostalgist",
      "attachment-seeker"
    ],
    "motifs": [
      "patterns",
      "connection",
      "history",
      "reconciliation"
    ]
  },
  {
    "type": "drive",
    "id": "D73",
    "title": "Be There for Me",
    "instruction": "Get someone to show up, help, or stay involved as proof that the connection still matters.",
    "categoryId": "direct-objectives",
    "subthemeId": "secure-help",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "pursuer",
      "dependent",
      "loyalist"
    ],
    "motifs": [
      "care",
      "attachment",
      "loyalty",
      "connection"
    ]
  },
  {
    "type": "drive",
    "id": "D74",
    "title": "Stay Until We’re Okay",
    "instruction": "Keep someone present until the relationship feels repaired, even if the practical reason for staying disappears.",
    "categoryId": "direct-objectives",
    "subthemeId": "prevent-departure",
    "difficulty": "beginner",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "retainer",
      "reconciler",
      "repairer"
    ],
    "motifs": [
      "reconciliation",
      "repair",
      "distance",
      "attachment"
    ]
  },
  {
    "type": "drive",
    "id": "D75",
    "title": "Name What It Cost",
    "instruction": "Make someone acknowledge the emotional cost of what happened, not merely the event itself.",
    "categoryId": "direct-objectives",
    "subthemeId": "obtain-apology",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "repairer",
      "interrogator",
      "wounded"
    ],
    "motifs": [
      "guilt",
      "sacrifice",
      "recognition",
      "resentment"
    ]
  },
  {
    "type": "drive",
    "id": "D76",
    "title": "I Need Your Blessing",
    "instruction": "Get approval from someone whose opinion still carries emotional weight, even when permission is unnecessary.",
    "categoryId": "direct-objectives",
    "subthemeId": "gain-approval",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "permission-seeker",
      "approval-seeker",
      "attachment-seeker"
    ],
    "motifs": [
      "approval",
      "belonging",
      "connection",
      "validation"
    ]
  },
  {
    "type": "drive",
    "id": "D77",
    "title": "Carry This with Me",
    "instruction": "Get someone to share a burden by framing participation as part of the relationship.",
    "categoryId": "direct-objectives",
    "subthemeId": "transfer-task",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "delegator",
      "dependent",
      "attachment-seeker"
    ],
    "motifs": [
      "obligation",
      "care",
      "dependence",
      "connection"
    ]
  },
  {
    "type": "drive",
    "id": "D78",
    "title": "What Are We Now?",
    "instruction": "Find out how someone defines the relationship without directly asking for a label.",
    "categoryId": "direct-objectives",
    "subthemeId": "extract-information",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "investigator",
      "truth-seeker",
      "attachment-seeker"
    ],
    "motifs": [
      "truth",
      "identity",
      "intimacy",
      "connection"
    ]
  },
  {
    "type": "drive",
    "id": "D79",
    "title": "Take My Side",
    "instruction": "Recruit someone into your interpretation of a conflict involving a shared relationship.",
    "categoryId": "direct-objectives",
    "subthemeId": "recruit-ally",
    "difficulty": "beginner",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "recruiter",
      "loyalist",
      "chooser"
    ],
    "motifs": [
      "loyalty",
      "allegiance",
      "connection",
      "trust"
    ]
  },
  {
    "type": "drive",
    "id": "D80",
    "title": "Prove We’re Close",
    "instruction": "Get someone to take a social or emotional risk that demonstrates trust in the connection.",
    "categoryId": "direct-objectives",
    "subthemeId": "induce-risk",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "instigator",
      "tester",
      "attachment-seeker"
    ],
    "motifs": [
      "trust",
      "risk",
      "intimacy",
      "loyalty"
    ]
  },
  {
    "type": "drive",
    "id": "D81",
    "title": "Acknowledge Our History",
    "instruction": "Make someone recognize that the relationship, memory, or sacrifice mattered and cannot be treated as incidental.",
    "categoryId": "direct-objectives",
    "subthemeId": "gain-recognition",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "recognition-seeker",
      "memory-keeper",
      "repairer"
    ],
    "motifs": [
      "history",
      "recognition",
      "memory",
      "sacrifice"
    ]
  },
  {
    "type": "drive",
    "id": "D82",
    "title": "Choose the Relationship",
    "instruction": "Make someone prioritize this connection over a competing person, promise, or opportunity.",
    "categoryId": "direct-objectives",
    "subthemeId": "force-choice",
    "difficulty": "beginner",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "chooser",
      "loyalist",
      "attachment-seeker"
    ],
    "motifs": [
      "choice",
      "loyalty",
      "attachment",
      "obligation"
    ]
  },
  {
    "type": "drive",
    "id": "D83",
    "title": "Remember Me Correctly",
    "instruction": "Create small tests of whether someone remembers your preferences, stories, or shared history.",
    "categoryId": "direct-objectives",
    "subthemeId": "test-loyalty",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "tester",
      "memory-keeper",
      "approval-seeker"
    ],
    "motifs": [
      "memory",
      "trust",
      "validation",
      "intimacy"
    ]
  },
  {
    "type": "drive",
    "id": "D84",
    "title": "Let Go of the Grudge",
    "instruction": "Persuade someone to surrender resentment, distance, or a claim that keeps the relationship stuck.",
    "categoryId": "direct-objectives",
    "subthemeId": "obtain-surrender",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "repairer",
      "reconciler",
      "pursuer"
    ],
    "motifs": [
      "forgiveness",
      "resentment",
      "repair",
      "reconciliation"
    ]
  },
  {
    "type": "drive",
    "id": "D85",
    "title": "I Pulled Away First",
    "instruction": "Hide your role in creating the distance while working urgently to repair it.",
    "categoryId": "secrets-avoidance",
    "subthemeId": "conceal-culpability",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "away-from-partner",
    "coachRoles": [
      "culprit",
      "reconciler",
      "wounded"
    ],
    "motifs": [
      "guilt",
      "distance",
      "repair",
      "secrecy"
    ]
  },
  {
    "type": "drive",
    "id": "D86",
    "title": "Not Why We Drifted",
    "instruction": "Keep the conversation away from the real reason the relationship changed.",
    "categoryId": "secrets-avoidance",
    "subthemeId": "avoid-subject",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "away-from-partner",
    "coachRoles": [
      "avoider",
      "secret-keeper",
      "attachment-seeker"
    ],
    "motifs": [
      "secrecy",
      "distance",
      "truth",
      "attachment"
    ]
  },
  {
    "type": "drive",
    "id": "D87",
    "title": "Keep the Peace",
    "instruction": "Hide a truth because you believe the relationship cannot survive one more conflict.",
    "categoryId": "secrets-avoidance",
    "subthemeId": "protective-deception",
    "difficulty": "beginner",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "secret-keeper",
      "peacemaker",
      "protector"
    ],
    "motifs": [
      "care",
      "secrecy",
      "reconciliation",
      "fear"
    ]
  },
  {
    "type": "drive",
    "id": "D88",
    "title": "Say You Missed Me",
    "instruction": "Get someone to admit longing, jealousy, hurt, or attachment before you reveal your own.",
    "categoryId": "secrets-avoidance",
    "subthemeId": "induce-confession",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "interrogator",
      "attachment-seeker",
      "vulnerable"
    ],
    "motifs": [
      "intimacy",
      "attachment",
      "truth",
      "validation"
    ]
  },
  {
    "type": "drive",
    "id": "D89",
    "title": "We Needed the Break",
    "instruction": "Frame a rupture, absence, or failed connection as a healthy decision that ultimately helped.",
    "categoryId": "secrets-avoidance",
    "subthemeId": "reframe-failure",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "self-focused",
    "coachRoles": [
      "spin-doctor",
      "reconciler",
      "avoider"
    ],
    "motifs": [
      "distance",
      "repair",
      "reconciliation",
      "optimism"
    ]
  },
  {
    "type": "drive",
    "id": "D90",
    "title": "I Know How to Fix Us",
    "instruction": "Perform confidence about repairing the relationship while improvising every step.",
    "categoryId": "secrets-avoidance",
    "subthemeId": "feign-competence",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "self-focused",
    "coachRoles": [
      "impostor",
      "repairer",
      "reconciler"
    ],
    "motifs": [
      "repair",
      "communication",
      "expertise",
      "reconciliation"
    ]
  },
  {
    "type": "drive",
    "id": "D91",
    "title": "Who Cares More?",
    "instruction": "Turn every favor, memory, sacrifice, and affectionate gesture into evidence that you care more.",
    "categoryId": "repeatable-behaviors",
    "subthemeId": "competition-loop",
    "difficulty": "beginner",
    "intensity": "high",
    "tone": "heightened",
    "orientation": "against-partner",
    "coachRoles": [
      "competitor",
      "loyalist",
      "rival"
    ],
    "motifs": [
      "competition",
      "affection",
      "sacrifice",
      "validation"
    ]
  },
  {
    "type": "drive",
    "id": "D92",
    "title": "Still a Good Sign",
    "instruction": "Treat every awkward or disappointing interaction as proof that the connection remains alive.",
    "categoryId": "repeatable-behaviors",
    "subthemeId": "positive-reframing",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "heightened",
    "orientation": "toward-partner",
    "coachRoles": [
      "reframer",
      "optimist",
      "reconciler"
    ],
    "motifs": [
      "optimism",
      "connection",
      "reconciliation",
      "attachment"
    ]
  },
  {
    "type": "drive",
    "id": "D93",
    "title": "Affectionate Resentment",
    "instruction": "Remain warm and familiar while letting old resentment sharpen beneath every caring gesture.",
    "categoryId": "repeatable-behaviors",
    "subthemeId": "emotional-contradiction",
    "difficulty": "advanced",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "contradictor",
      "wounded",
      "loyalist"
    ],
    "motifs": [
      "affection",
      "resentment",
      "care",
      "history"
    ]
  },
  {
    "type": "drive",
    "id": "D94",
    "title": "Relationship Ledger",
    "instruction": "Price closeness, forgiveness, and support in favors, sacrifices, access, and future loyalty.",
    "categoryId": "repeatable-behaviors",
    "subthemeId": "transactional-framing",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "negotiator",
      "creditor",
      "attachment-seeker"
    ],
    "motifs": [
      "obligation",
      "sacrifice",
      "loyalty",
      "intimacy"
    ]
  },
  {
    "type": "drive",
    "id": "D95",
    "title": "Closer on My Terms",
    "instruction": "Agree to repair the relationship while redefining closeness around the boundaries that benefit you.",
    "categoryId": "repeatable-behaviors",
    "subthemeId": "self-serving-agreement",
    "difficulty": "advanced",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "self-focused",
    "coachRoles": [
      "controller",
      "boundary-keeper",
      "negotiator"
    ],
    "motifs": [
      "boundaries",
      "control",
      "intimacy",
      "autonomy"
    ]
  },
  {
    "type": "drive",
    "id": "D96",
    "title": "Here We Go Again",
    "instruction": "Use every new disagreement to prove the same relationship pattern is repeating, then raise the consequences.",
    "categoryId": "repeatable-behaviors",
    "subthemeId": "pattern-escalation",
    "difficulty": "beginner",
    "intensity": "high",
    "tone": "heightened",
    "orientation": "world-focused",
    "coachRoles": [
      "escalator",
      "wounded",
      "meaning-maker"
    ],
    "motifs": [
      "patterns",
      "resentment",
      "history",
      "crisis"
    ]
  }
];
  const cards = definitions.map(createCard);
  const stances = cards.filter((card) => card.type === "stance");
  const drives = cards.filter((card) => card.type === "drive");

  return {
    schemaVersion: bible.CARD_SCHEMA_VERSION,
    id: PACK_ID,
    title: "Relationship Knots",
    version: PACK_VERSION,
    status: "playtest",
    sequence: 4,
    publicationStage: bible.getPack(PACK_ID).publicationStage,
    publicationWave: bible.getPack(PACK_ID).publicationWave,
    editorialReviewVersion: bible.getPack(PACK_ID).editorialReviewVersion,
    remainingPublicationGates: [...bible.getPack(PACK_ID).remainingPublicationGates],
    description: "Affection, rivalry, obligation, dependence, and unfinished connection.",
    stances,
    drives
  };
});
