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
    throw new Error("Secrets & Schemes requires card-bible.js to load first.");
  }

  const PACK_ID = "secrets-schemes";
  const CONTENT_VERSION = "0.13.0";
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
      contentVersion: CONTENT_VERSION,
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
    "id": "S121",
    "title": "The Keeper of Secrets",
    "instruction": "Carry yourself as the person entrusted with what others cannot know, letting selective disclosure determine what everyone is allowed to discuss.",
    "categoryId": "status-authority",
    "subthemeId": "command-presence",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "world-focused",
    "coachRoles": [
      "informant",
      "authority",
      "gatekeeper"
    ],
    "motifs": [
      "secrecy",
      "information",
      "control",
      "trust"
    ]
  },
  {
    "type": "stance",
    "id": "S122",
    "title": "Authority by Bluff",
    "instruction": "Project control through confident half-answers while guarding the possibility that one direct question could expose how little you actually know.",
    "categoryId": "status-authority",
    "subthemeId": "precarious-authority",
    "difficulty": "advanced",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "self-focused",
    "coachRoles": [
      "insecure-authority",
      "impostor",
      "decoy"
    ],
    "motifs": [
      "deception",
      "authority",
      "uncertainty",
      "suspicion"
    ]
  },
  {
    "type": "stance",
    "id": "S123",
    "title": "Professional Suspicion",
    "instruction": "Treat inconsistencies, evasions, and missing details as evidence your trained eye should investigate before anyone proceeds.",
    "categoryId": "status-authority",
    "subthemeId": "professional-expertise",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "world-focused",
    "coachRoles": [
      "expert",
      "investigator",
      "skeptic"
    ],
    "motifs": [
      "investigation",
      "evidence",
      "truth",
      "expertise"
    ]
  },
  {
    "type": "stance",
    "id": "S124",
    "title": "Cleared to Know",
    "instruction": "Treat access to private information as proof that you belong, and exclusion from any detail as a challenge to your legitimacy.",
    "categoryId": "status-authority",
    "subthemeId": "belonging-legitimacy",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "self-focused",
    "coachRoles": [
      "claimant",
      "outsider",
      "witness"
    ],
    "motifs": [
      "access",
      "belonging",
      "information",
      "legitimacy"
    ]
  },
  {
    "type": "stance",
    "id": "S125",
    "title": "The Initiated One",
    "instruction": "Treat others as recent initiates, revealing rules and information in carefully measured doses that preserve your seniority.",
    "categoryId": "status-authority",
    "subthemeId": "mentorship-rank",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "mentor",
      "gatekeeper",
      "conspirator"
    ],
    "motifs": [
      "hierarchy",
      "secrecy",
      "recruitment",
      "trust"
    ]
  },
  {
    "type": "stance",
    "id": "S126",
    "title": "Information Is Leverage",
    "instruction": "Remain outwardly cooperative while controlling one useful fact, releasing only enough of it to shape each decision.",
    "categoryId": "status-authority",
    "subthemeId": "hidden-leverage",
    "difficulty": "advanced",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "hidden-power",
      "broker",
      "informant"
    ],
    "motifs": [
      "information",
      "leverage",
      "control",
      "secrecy"
    ]
  },
  {
    "type": "stance",
    "id": "S127",
    "title": "Our First Secret",
    "instruction": "Treat a shared secret from the beginning of the relationship as the truest proof of what still connects you.",
    "categoryId": "history-relationship",
    "subthemeId": "shared-origins",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "confidant",
      "memory-keeper",
      "loyalist"
    ],
    "motifs": [
      "history",
      "secrecy",
      "connection",
      "trust"
    ]
  },
  {
    "type": "stance",
    "id": "S128",
    "title": "I Covered for You",
    "instruction": "Carry past concealment as an unpaid favor, expecting trust, access, and protection whenever the old debt becomes relevant.",
    "categoryId": "history-relationship",
    "subthemeId": "debts-favors",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "creditor",
      "secret-keeper",
      "broker"
    ],
    "motifs": [
      "obligation",
      "secrecy",
      "loyalty",
      "deception"
    ]
  },
  {
    "type": "stance",
    "id": "S129",
    "title": "The Cleanup Person",
    "instruction": "Return to the familiar role of containing damage, correcting stories, and protecting everyone from the consequences of disclosure.",
    "categoryId": "history-relationship",
    "subthemeId": "familiar-roles",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "world-focused",
    "coachRoles": [
      "caretaker",
      "decoy",
      "strategist"
    ],
    "motifs": [
      "responsibility",
      "misdirection",
      "repair",
      "secrecy"
    ]
  },
  {
    "type": "stance",
    "id": "S130",
    "title": "Competing Detectives",
    "instruction": "Treat each clue and inconsistency as a contest over who can understand the situation first and most completely.",
    "categoryId": "history-relationship",
    "subthemeId": "rivalry-comparison",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "heightened",
    "orientation": "against-partner",
    "coachRoles": [
      "rival",
      "investigator",
      "competitor"
    ],
    "motifs": [
      "competition",
      "investigation",
      "evidence",
      "recognition"
    ]
  },
  {
    "type": "stance",
    "id": "S131",
    "title": "Only You Can Know",
    "instruction": "Treat one person as the only safe place for your honest reactions, while hiding how much their discretion determines what you can risk.",
    "categoryId": "history-relationship",
    "subthemeId": "trust-dependence",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "confidant",
      "dependent",
      "witness"
    ],
    "motifs": [
      "trust",
      "secrecy",
      "dependence",
      "vulnerability"
    ]
  },
  {
    "type": "stance",
    "id": "S132",
    "title": "The Missing Truth",
    "instruction": "Treat every present exchange as incomplete until an old concealment, unanswered question, or broken confidence is finally addressed.",
    "categoryId": "history-relationship",
    "subthemeId": "rupture-unfinished-business",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "world-focused",
    "coachRoles": [
      "wounded",
      "truth-seeker",
      "reconciler"
    ],
    "motifs": [
      "history",
      "truth",
      "confession",
      "trust"
    ]
  },
  {
    "type": "stance",
    "id": "S133",
    "title": "Envious of the Lie",
    "instruction": "Treat another person’s composure under scrutiny as both impressive and unfair, resenting how easily they seem to control what others believe.",
    "categoryId": "emotional-assumptions",
    "subthemeId": "admiration-envy",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "admirer",
      "impostor",
      "rival"
    ],
    "motifs": [
      "admiration",
      "envy",
      "deception",
      "control"
    ]
  },
  {
    "type": "stance",
    "id": "S134",
    "title": "Before We Knew",
    "instruction": "Return emotionally to the time before a difficult truth changed what you could believe, trust, or say openly.",
    "categoryId": "emotional-assumptions",
    "subthemeId": "identity-nostalgia",
    "difficulty": "beginner",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "self-focused",
    "coachRoles": [
      "nostalgist",
      "griever",
      "witness"
    ],
    "motifs": [
      "history",
      "loss",
      "truth",
      "identity"
    ]
  },
  {
    "type": "stance",
    "id": "S135",
    "title": "Everyone Knows Something",
    "instruction": "Interpret private conversations, careful wording, and unexplained pauses as signs that important information is being kept from you.",
    "categoryId": "emotional-assumptions",
    "subthemeId": "fear-insecurity",
    "difficulty": "beginner",
    "intensity": "high",
    "tone": "heightened",
    "orientation": "world-focused",
    "coachRoles": [
      "vulnerable",
      "alarmist",
      "skeptic"
    ],
    "motifs": [
      "suspicion",
      "fear",
      "secrecy",
      "uncertainty"
    ]
  },
  {
    "type": "stance",
    "id": "S136",
    "title": "Protection Through Silence",
    "instruction": "Protect others by withholding details, redirecting questions, and managing timing because you trust your own judgment about when the truth should surface.",
    "categoryId": "emotional-assumptions",
    "subthemeId": "care-control",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "protector",
      "controller",
      "secret-keeper"
    ],
    "motifs": [
      "care",
      "control",
      "secrecy",
      "truth"
    ]
  },
  {
    "type": "stance",
    "id": "S137",
    "title": "Trusted with This",
    "instruction": "Treat being confided in as proof of closeness, and guard that privileged role whenever information begins spreading.",
    "categoryId": "emotional-assumptions",
    "subthemeId": "approval-belonging",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "approval-seeker",
      "confidant",
      "informant"
    ],
    "motifs": [
      "belonging",
      "trust",
      "secrecy",
      "validation"
    ]
  },
  {
    "type": "stance",
    "id": "S138",
    "title": "I Figured It Out",
    "instruction": "Create opportunities to reveal that you noticed the pattern first while pretending recognition matters less than solving the problem.",
    "categoryId": "emotional-assumptions",
    "subthemeId": "pride-validation",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "heightened",
    "orientation": "self-focused",
    "coachRoles": [
      "showoff",
      "investigator",
      "recognition-seeker"
    ],
    "motifs": [
      "recognition",
      "investigation",
      "pride",
      "evidence"
    ]
  },
  {
    "type": "stance",
    "id": "S139",
    "title": "The Secrecy Protocol",
    "instruction": "Treat concealment as a precise ritual with passwords, signals, approved phrases, and severe consequences for careless improvisation.",
    "categoryId": "worldview-absurdity",
    "subthemeId": "ritual-tradition",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "absurd",
    "orientation": "world-focused",
    "coachRoles": [
      "ritualist",
      "conspirator",
      "gatekeeper"
    ],
    "motifs": [
      "ritual",
      "secrecy",
      "rules",
      "communication"
    ]
  },
  {
    "type": "stance",
    "id": "S140",
    "title": "The Leak Is Spreading",
    "instruction": "Interpret every new question or coincidence as evidence that concealed information is escaping faster than it can be contained.",
    "categoryId": "worldview-absurdity",
    "subthemeId": "crisis-catastrophe",
    "difficulty": "beginner",
    "intensity": "high",
    "tone": "heightened",
    "orientation": "world-focused",
    "coachRoles": [
      "alarmist",
      "secret-keeper",
      "strategist"
    ],
    "motifs": [
      "crisis",
      "information",
      "suspicion",
      "secrecy"
    ]
  },
  {
    "type": "stance",
    "id": "S141",
    "title": "A Delicious Mystery",
    "instruction": "Treat every missing fact, contradiction, and suspicious detail as delightful proof that the situation is becoming more interesting.",
    "categoryId": "worldview-absurdity",
    "subthemeId": "celebration-optimism",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "heightened",
    "orientation": "world-focused",
    "coachRoles": [
      "optimist",
      "investigator",
      "meaning-maker"
    ],
    "motifs": [
      "investigation",
      "celebration",
      "evidence",
      "mystery"
    ]
  },
  {
    "type": "stance",
    "id": "S142",
    "title": "Cover Story Logistics",
    "instruction": "Accept that a secret plan exists, then focus on schedules, witnesses, explanations, cleanup, and what everyone must remember.",
    "categoryId": "worldview-absurdity",
    "subthemeId": "practical-grounding",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "world-focused",
    "coachRoles": [
      "anchor",
      "strategist",
      "stabilizer"
    ],
    "motifs": [
      "strategy",
      "communication",
      "responsibility",
      "misdirection"
    ]
  },
  {
    "type": "stance",
    "id": "S143",
    "title": "One Suspicious Detail",
    "instruction": "Choose one ordinary detail and treat it as the clue that will expose the entire hidden story.",
    "categoryId": "worldview-absurdity",
    "subthemeId": "fixation-significance",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "heightened",
    "orientation": "world-focused",
    "coachRoles": [
      "fixator",
      "investigator",
      "skeptic"
    ],
    "motifs": [
      "clues",
      "evidence",
      "suspicion",
      "patterns"
    ]
  },
  {
    "type": "stance",
    "id": "S144",
    "title": "Everything Connects",
    "instruction": "Treat every interruption, coincidence, and denial as part of one expanding hidden design, and doubt as further evidence.",
    "categoryId": "worldview-absurdity",
    "subthemeId": "pattern-grand-meaning",
    "difficulty": "advanced",
    "intensity": "high",
    "tone": "absurd",
    "orientation": "world-focused",
    "coachRoles": [
      "meaning-maker",
      "alarmist",
      "investigator"
    ],
    "motifs": [
      "conspiracy",
      "patterns",
      "suspicion",
      "evidence"
    ]
  },
  {
    "type": "drive",
    "id": "D121",
    "title": "Help Me Keep This Quiet",
    "instruction": "Get someone to help contain a secret without first revealing its full risk or purpose.",
    "categoryId": "direct-objectives",
    "subthemeId": "secure-help",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "recruiter",
      "secret-keeper",
      "conspirator"
    ],
    "motifs": [
      "secrecy",
      "recruitment",
      "trust",
      "dependence"
    ]
  },
  {
    "type": "drive",
    "id": "D122",
    "title": "Not Until You Explain",
    "instruction": "Keep someone present until they account for one contradiction, omission, or suspicious change in their story.",
    "categoryId": "direct-objectives",
    "subthemeId": "prevent-departure",
    "difficulty": "beginner",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "retainer",
      "investigator",
      "interrogator"
    ],
    "motifs": [
      "investigation",
      "truth",
      "confession",
      "suspicion"
    ]
  },
  {
    "type": "drive",
    "id": "D123",
    "title": "Apologize for the Lie",
    "instruction": "Make someone acknowledge that the concealment or misdirection mattered, even if the underlying choice was defensible.",
    "categoryId": "direct-objectives",
    "subthemeId": "obtain-apology",
    "difficulty": "beginner",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "repairer",
      "truth-seeker",
      "interrogator"
    ],
    "motifs": [
      "repair",
      "deception",
      "truth",
      "confession"
    ]
  },
  {
    "type": "drive",
    "id": "D124",
    "title": "Approve the Cover Story",
    "instruction": "Get someone to endorse an explanation that protects the plan, reputation, or people involved.",
    "categoryId": "direct-objectives",
    "subthemeId": "gain-approval",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "permission-seeker",
      "strategist",
      "decoy"
    ],
    "motifs": [
      "approval",
      "misdirection",
      "reputation",
      "strategy"
    ]
  },
  {
    "type": "drive",
    "id": "D125",
    "title": "You Handle the Evidence",
    "instruction": "Make someone else take responsibility for the evidence, loose end, or difficult follow-up.",
    "categoryId": "direct-objectives",
    "subthemeId": "transfer-task",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "delegator",
      "strategist",
      "culprit"
    ],
    "motifs": [
      "evidence",
      "responsibility",
      "secrecy",
      "risk"
    ]
  },
  {
    "type": "drive",
    "id": "D126",
    "title": "What Really Happened?",
    "instruction": "Find the truth by comparing details, repeating questions, and testing which parts of the story remain consistent.",
    "categoryId": "direct-objectives",
    "subthemeId": "extract-information",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "world-focused",
    "coachRoles": [
      "investigator",
      "truth-seeker",
      "skeptic"
    ],
    "motifs": [
      "investigation",
      "truth",
      "evidence",
      "suspicion"
    ]
  },
  {
    "type": "drive",
    "id": "D127",
    "title": "Join the Inner Circle",
    "instruction": "Recruit someone into a hidden plan by offering trust, purpose, and just enough privileged information.",
    "categoryId": "direct-objectives",
    "subthemeId": "recruit-ally",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "heightened",
    "orientation": "toward-partner",
    "coachRoles": [
      "recruiter",
      "conspirator",
      "informant"
    ],
    "motifs": [
      "recruitment",
      "secrecy",
      "trust",
      "strategy"
    ]
  },
  {
    "type": "drive",
    "id": "D128",
    "title": "Test the Story First",
    "instruction": "Get someone else to repeat the explanation, ask the dangerous question, or test the risky step before you commit.",
    "categoryId": "direct-objectives",
    "subthemeId": "induce-risk",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "instigator",
      "strategist",
      "decoy"
    ],
    "motifs": [
      "risk",
      "deception",
      "strategy",
      "investigation"
    ]
  },
  {
    "type": "drive",
    "id": "D129",
    "title": "Credit for the Discovery",
    "instruction": "Make someone acknowledge that you found the clue, saw through the deception, or designed the successful scheme.",
    "categoryId": "direct-objectives",
    "subthemeId": "gain-recognition",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "self-focused",
    "coachRoles": [
      "recognition-seeker",
      "investigator",
      "showoff"
    ],
    "motifs": [
      "recognition",
      "evidence",
      "pride",
      "investigation"
    ]
  },
  {
    "type": "drive",
    "id": "D130",
    "title": "Truth or Loyalty",
    "instruction": "Make someone choose between protecting the relationship and answering a dangerous question honestly.",
    "categoryId": "direct-objectives",
    "subthemeId": "force-choice",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "chooser",
      "loyalist",
      "truth-seeker"
    ],
    "motifs": [
      "choice",
      "loyalty",
      "truth",
      "secrecy"
    ]
  },
  {
    "type": "drive",
    "id": "D131",
    "title": "Can You Keep It?",
    "instruction": "Use increasingly sensitive details to test whether someone deserves deeper trust.",
    "categoryId": "direct-objectives",
    "subthemeId": "test-loyalty",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "tester",
      "secret-keeper",
      "confidant"
    ],
    "motifs": [
      "trust",
      "secrecy",
      "loyalty",
      "information"
    ]
  },
  {
    "type": "drive",
    "id": "D132",
    "title": "Hand Over the Proof",
    "instruction": "Persuade someone to surrender information, evidence, a key, or access that would let you proceed.",
    "categoryId": "direct-objectives",
    "subthemeId": "obtain-surrender",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "acquirer",
      "investigator",
      "gatekeeper"
    ],
    "motifs": [
      "evidence",
      "access",
      "truth",
      "control"
    ]
  },
  {
    "type": "drive",
    "id": "D133",
    "title": "The Helpful Suspect",
    "instruction": "Hide your role in creating the problem while eagerly organizing the investigation.",
    "categoryId": "secrets-avoidance",
    "subthemeId": "conceal-culpability",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "world-focused",
    "coachRoles": [
      "culprit",
      "decoy",
      "investigator"
    ],
    "motifs": [
      "guilt",
      "investigation",
      "deception",
      "misdirection"
    ]
  },
  {
    "type": "drive",
    "id": "D134",
    "title": "Anything but That Question",
    "instruction": "Redirect every attempt to discuss the one detail that could expose your real motive or involvement.",
    "categoryId": "secrets-avoidance",
    "subthemeId": "avoid-subject",
    "difficulty": "beginner",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "away-from-partner",
    "coachRoles": [
      "avoider",
      "decoy",
      "secret-keeper"
    ],
    "motifs": [
      "misdirection",
      "secrecy",
      "motive",
      "suspicion"
    ]
  },
  {
    "type": "drive",
    "id": "D135",
    "title": "A Kinder Version",
    "instruction": "Protect someone from the full truth by offering a carefully edited explanation that feels kinder than complete honesty.",
    "categoryId": "secrets-avoidance",
    "subthemeId": "protective-deception",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "protector",
      "secret-keeper",
      "decoy"
    ],
    "motifs": [
      "care",
      "deception",
      "truth",
      "secrecy"
    ]
  },
  {
    "type": "drive",
    "id": "D136",
    "title": "Confess Before I Do",
    "instruction": "Maneuver someone into admitting their secret, motive, or mistake before you reveal your own.",
    "categoryId": "secrets-avoidance",
    "subthemeId": "induce-confession",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "interrogator",
      "confidant",
      "truth-seeker"
    ],
    "motifs": [
      "confession",
      "secrecy",
      "truth",
      "motive"
    ]
  },
  {
    "type": "drive",
    "id": "D137",
    "title": "Exactly as Planned",
    "instruction": "Treat every exposed flaw, failed step, and unexpected consequence as proof that the scheme is unfolding by design.",
    "categoryId": "secrets-avoidance",
    "subthemeId": "reframe-failure",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "heightened",
    "orientation": "world-focused",
    "coachRoles": [
      "spin-doctor",
      "strategist",
      "conspirator"
    ],
    "motifs": [
      "strategy",
      "deception",
      "optimism",
      "patterns"
    ]
  },
  {
    "type": "drive",
    "id": "D138",
    "title": "I Know the Procedure",
    "instruction": "Perform investigative confidence while quietly using each response to discover what the questions, clues, and next steps should be.",
    "categoryId": "secrets-avoidance",
    "subthemeId": "feign-competence",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "self-focused",
    "coachRoles": [
      "impostor",
      "investigator",
      "expert"
    ],
    "motifs": [
      "expertise",
      "investigation",
      "uncertainty",
      "evidence"
    ]
  },
  {
    "type": "drive",
    "id": "D139",
    "title": "Outsmart the Room",
    "instruction": "Turn every clue, deduction, and secret into a contest you must solve or control first.",
    "categoryId": "repeatable-behaviors",
    "subthemeId": "competition-loop",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "heightened",
    "orientation": "against-partner",
    "coachRoles": [
      "competitor",
      "investigator",
      "controller"
    ],
    "motifs": [
      "competition",
      "investigation",
      "control",
      "recognition"
    ]
  },
  {
    "type": "drive",
    "id": "D140",
    "title": "The Plan Gets Better",
    "instruction": "Celebrate every setback as proof that the scheme is becoming more sophisticated, selective, or impossible to detect.",
    "categoryId": "repeatable-behaviors",
    "subthemeId": "positive-reframing",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "heightened",
    "orientation": "world-focused",
    "coachRoles": [
      "reframer",
      "optimist",
      "strategist"
    ],
    "motifs": [
      "strategy",
      "optimism",
      "deception",
      "patterns"
    ]
  },
  {
    "type": "drive",
    "id": "D141",
    "title": "Warmly Withholding",
    "instruction": "Remain open, caring, and reassuring while revealing less with every new question.",
    "categoryId": "repeatable-behaviors",
    "subthemeId": "emotional-contradiction",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "contradictor",
      "confidant",
      "secret-keeper"
    ],
    "motifs": [
      "care",
      "secrecy",
      "deception",
      "communication"
    ]
  },
  {
    "type": "drive",
    "id": "D142",
    "title": "Secrets Have Value",
    "instruction": "Price every fact, introduction, warning, and confession as something that must be traded for equal value.",
    "categoryId": "repeatable-behaviors",
    "subthemeId": "transactional-framing",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "negotiator",
      "informant",
      "broker"
    ],
    "motifs": [
      "information",
      "leverage",
      "confession",
      "access"
    ]
  },
  {
    "type": "drive",
    "id": "D143",
    "title": "I Told You Enough",
    "instruction": "Agree to be honest while repeatedly narrowing what honesty requires and which details count.",
    "categoryId": "repeatable-behaviors",
    "subthemeId": "self-serving-agreement",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "self-focused",
    "coachRoles": [
      "controller",
      "avoider",
      "decoy"
    ],
    "motifs": [
      "truth",
      "misdirection",
      "control",
      "secrecy"
    ]
  },
  {
    "type": "drive",
    "id": "D144",
    "title": "The Conspiracy Expands",
    "instruction": "Use every denial, coincidence, and missing detail as proof that more people and higher stakes are involved.",
    "categoryId": "repeatable-behaviors",
    "subthemeId": "pattern-escalation",
    "difficulty": "beginner",
    "intensity": "high",
    "tone": "heightened",
    "orientation": "world-focused",
    "coachRoles": [
      "escalator",
      "meaning-maker",
      "alarmist"
    ],
    "motifs": [
      "conspiracy",
      "patterns",
      "suspicion",
      "evidence"
    ]
  }
];
  const cards = definitions.map(createCard);
  const stances = cards.filter((card) => card.type === "stance");
  const drives = cards.filter((card) => card.type === "drive");

  return {
    schemaVersion: bible.CARD_SCHEMA_VERSION,
    id: PACK_ID,
    title: "Secrets & Schemes",
    version: CONTENT_VERSION,
    status: "playtest",
    sequence: 6,
    description: "Concealment, investigation, recruitment, misdirection, confession, conspiracy, and plans under pressure.",
    stances,
    drives
  };
});
