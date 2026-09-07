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
    throw new Error("Power Games requires card-bible.js to load first.");
  }

  const PACK_ID = "power-games";
  const DEFAULT_CONTENT_VERSION = "0.10.0";
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
    "id": "S49",
    "title": "The Final Word",
    "instruction": "Treat every opinion you offer as a ruling and every continued discussion as an appeal.",
    "categoryId": "status-authority",
    "subthemeId": "command-presence",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "authority",
      "enforcer"
    ],
    "motifs": [
      "authority",
      "hierarchy",
      "control",
      "compliance"
    ]
  },
  {
    "type": "stance",
    "id": "S50",
    "title": "Conditional Command",
    "instruction": "Project firm authority, then soften whenever the source of that authority might be questioned.",
    "categoryId": "status-authority",
    "subthemeId": "precarious-authority",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "self-focused",
    "coachRoles": [
      "insecure-authority",
      "claimant"
    ],
    "motifs": [
      "authority",
      "legitimacy",
      "dependence",
      "reputation"
    ]
  },
  {
    "type": "stance",
    "id": "S51",
    "title": "The Gatekeeper",
    "instruction": "Use expertise and standards to decide who is qualified to judge, participate, or proceed.",
    "categoryId": "status-authority",
    "subthemeId": "professional-expertise",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "expert",
      "gatekeeper"
    ],
    "motifs": [
      "expertise",
      "access",
      "legitimacy",
      "status"
    ]
  },
  {
    "type": "stance",
    "id": "S52",
    "title": "Rightful Place",
    "instruction": "Carry yourself as the rightful holder of your role and treat any demand for proof as an insult.",
    "categoryId": "status-authority",
    "subthemeId": "belonging-legitimacy",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "self-focused",
    "coachRoles": [
      "claimant",
      "authority"
    ],
    "motifs": [
      "legitimacy",
      "belonging",
      "status",
      "reputation"
    ]
  },
  {
    "type": "stance",
    "id": "S53",
    "title": "The Crown Must Pass",
    "instruction": "Treat another person as your likely successor. Prepare them to lead, then reclaim authority whenever their independence makes your influence feel temporary.",
    "categoryId": "status-authority",
    "subthemeId": "mentorship-rank",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "mentor",
      "insecure-authority",
      "successor"
    ],
    "motifs": [
      "succession",
      "hierarchy",
      "autonomy",
      "loss"
    ],
    "contentVersion": "0.18.0"
  },
  {
    "type": "stance",
    "id": "S54",
    "title": "The Quiet Veto",
    "instruction": "Remain pleasant and cooperative while behaving as though nothing can proceed without your private consent.",
    "categoryId": "status-authority",
    "subthemeId": "hidden-leverage",
    "difficulty": "advanced",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "hidden-power",
      "gatekeeper",
      "broker"
    ],
    "motifs": [
      "leverage",
      "access",
      "influence",
      "control"
    ]
  },
  {
    "type": "stance",
    "id": "S55",
    "title": "We Started Equal",
    "instruction": "Use shared beginnings to erase present rank, titles, and attempts to place distance between you.",
    "categoryId": "history-relationship",
    "subthemeId": "shared-origins",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "familiar",
      "challenger"
    ],
    "motifs": [
      "familiarity",
      "hierarchy",
      "legitimacy",
      "autonomy"
    ]
  },
  {
    "type": "stance",
    "id": "S56",
    "title": "My Support, My Say",
    "instruction": "Treat every past favor as a continuing investment in your right to influence present decisions.",
    "categoryId": "history-relationship",
    "subthemeId": "debts-favors",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "creditor",
      "patron"
    ],
    "motifs": [
      "obligation",
      "patronage",
      "leverage",
      "influence"
    ]
  },
  {
    "type": "stance",
    "id": "S57",
    "title": "The Trusted Deputy",
    "instruction": "Act as the reliable second-in-command, managing access and details while quietly shaping every decision.",
    "categoryId": "history-relationship",
    "subthemeId": "familiar-roles",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "broker",
      "hidden-power"
    ],
    "motifs": [
      "hierarchy",
      "access",
      "influence",
      "trust"
    ]
  },
  {
    "type": "stance",
    "id": "S58",
    "title": "The Succession Race",
    "instruction": "Treat every success, mistake, and compliment as evidence in an ongoing contest over who should lead.",
    "categoryId": "history-relationship",
    "subthemeId": "rivalry-comparison",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "heightened",
    "orientation": "against-partner",
    "coachRoles": [
      "rival",
      "successor"
    ],
    "motifs": [
      "succession",
      "competition",
      "status",
      "reputation"
    ]
  },
  {
    "type": "stance",
    "id": "S59",
    "title": "Indispensable Rival",
    "instruction": "Use another person’s judgment constantly while minimizing how much influence that dependence gives them.",
    "categoryId": "history-relationship",
    "subthemeId": "trust-dependence",
    "difficulty": "advanced",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "dependent",
      "rival"
    ],
    "motifs": [
      "dependence",
      "influence",
      "pride",
      "trust"
    ]
  },
  {
    "type": "stance",
    "id": "S60",
    "title": "Once Undermined",
    "instruction": "Treat every disagreement as a possible repeat of the moment your authority was previously weakened.",
    "categoryId": "history-relationship",
    "subthemeId": "rupture-unfinished-business",
    "difficulty": "advanced",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "away-from-partner",
    "coachRoles": [
      "wounded",
      "challenger"
    ],
    "motifs": [
      "history",
      "authority",
      "fear",
      "legitimacy"
    ]
  },
  {
    "type": "stance",
    "id": "S61",
    "title": "Power Looks Good",
    "instruction": "Act fascinated by confident behavior; imitate it closely while resenting how naturally it seems to work.",
    "categoryId": "emotional-assumptions",
    "subthemeId": "admiration-envy",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "admirer",
      "competitor"
    ],
    "motifs": [
      "admiration",
      "envy",
      "influence",
      "status"
    ]
  },
  {
    "type": "stance",
    "id": "S62",
    "title": "Formerly Important",
    "instruction": "Carry the habits and expectations of a role that once made you important, even when the present no longer supports them.",
    "categoryId": "emotional-assumptions",
    "subthemeId": "identity-nostalgia",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "self-focused",
    "coachRoles": [
      "nostalgist",
      "claimant"
    ],
    "motifs": [
      "identity",
      "status",
      "reputation",
      "loss"
    ]
  },
  {
    "type": "stance",
    "id": "S63",
    "title": "One Mistake from Gone",
    "instruction": "Treat every decision as a test of whether you still deserve your place.",
    "categoryId": "emotional-assumptions",
    "subthemeId": "fear-insecurity",
    "difficulty": "beginner",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "self-focused",
    "coachRoles": [
      "vulnerable",
      "insecure-authority"
    ],
    "motifs": [
      "fear",
      "legitimacy",
      "belonging",
      "reputation"
    ]
  },
  {
    "type": "stance",
    "id": "S64",
    "title": "Protection Has Terms",
    "instruction": "Treat safety, support, and reassurance as arrangements that require you to remain in control.",
    "categoryId": "emotional-assumptions",
    "subthemeId": "care-control",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "protector",
      "controller",
      "patron"
    ],
    "motifs": [
      "care",
      "control",
      "dependence",
      "autonomy"
    ]
  },
  {
    "type": "stance",
    "id": "S65",
    "title": "Chosen by Power",
    "instruction": "Seek the attention of whoever seems influential and treat that attention as proof that you belong.",
    "categoryId": "emotional-assumptions",
    "subthemeId": "approval-belonging",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "approval-seeker",
      "patron"
    ],
    "motifs": [
      "approval",
      "belonging",
      "influence",
      "patronage"
    ]
  },
  {
    "type": "stance",
    "id": "S66",
    "title": "Public Respect",
    "instruction": "Seek visible signs of respect and treat private appreciation as insufficient.",
    "categoryId": "emotional-assumptions",
    "subthemeId": "pride-validation",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "recognition-seeker",
      "authority"
    ],
    "motifs": [
      "recognition",
      "status",
      "reputation",
      "validation"
    ]
  },
  {
    "type": "stance",
    "id": "S67",
    "title": "Chain of Command",
    "instruction": "Treat every question, favor, and decision as something that must travel through the proper hierarchy.",
    "categoryId": "worldview-absurdity",
    "subthemeId": "ritual-tradition",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "heightened",
    "orientation": "world-focused",
    "coachRoles": [
      "ritualist",
      "enforcer"
    ],
    "motifs": [
      "hierarchy",
      "rules",
      "ritual",
      "compliance"
    ]
  },
  {
    "type": "stance",
    "id": "S68",
    "title": "Power Vacuum",
    "instruction": "Treat any uncertainty about who is in charge as an emergency that must be resolved immediately.",
    "categoryId": "worldview-absurdity",
    "subthemeId": "crisis-catastrophe",
    "difficulty": "beginner",
    "intensity": "high",
    "tone": "heightened",
    "orientation": "world-focused",
    "coachRoles": [
      "alarmist",
      "authority"
    ],
    "motifs": [
      "crisis",
      "authority",
      "hierarchy",
      "control"
    ]
  },
  {
    "type": "stance",
    "id": "S69",
    "title": "Opportunity for Influence",
    "instruction": "Find a path to greater influence in every assignment, setback, or unexpected responsibility.",
    "categoryId": "worldview-absurdity",
    "subthemeId": "celebration-optimism",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "heightened",
    "orientation": "self-focused",
    "coachRoles": [
      "optimist",
      "successor"
    ],
    "motifs": [
      "optimism",
      "influence",
      "succession",
      "status"
    ]
  },
  {
    "type": "stance",
    "id": "S70",
    "title": "Who Can Authorize This?",
    "instruction": "Treat titles and speeches as secondary; focus on who can grant access, allocate resources, and create consequences.",
    "categoryId": "worldview-absurdity",
    "subthemeId": "practical-grounding",
    "difficulty": "intermediate",
    "intensity": "low",
    "tone": "grounded",
    "orientation": "world-focused",
    "coachRoles": [
      "stabilizer",
      "investigator",
      "broker"
    ],
    "motifs": [
      "access",
      "resources",
      "authority",
      "influence"
    ]
  },
  {
    "type": "stance",
    "id": "S71",
    "title": "Symbol of Office",
    "instruction": "Choose one symbol, privilege, or position and treat control of it as proof of legitimate authority.",
    "categoryId": "worldview-absurdity",
    "subthemeId": "fixation-significance",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "heightened",
    "orientation": "world-focused",
    "coachRoles": [
      "fixator",
      "claimant"
    ],
    "motifs": [
      "legitimacy",
      "status",
      "ritual",
      "control"
    ]
  },
  {
    "type": "stance",
    "id": "S72",
    "title": "Invisible Hierarchy",
    "instruction": "Treat every interaction as evidence of an unseen hierarchy and keep identifying who truly outranks whom.",
    "categoryId": "worldview-absurdity",
    "subthemeId": "pattern-grand-meaning",
    "difficulty": "advanced",
    "intensity": "medium",
    "tone": "heightened",
    "orientation": "world-focused",
    "coachRoles": [
      "meaning-maker",
      "authority"
    ],
    "motifs": [
      "patterns",
      "hierarchy",
      "status",
      "authority"
    ]
  },
  {
    "type": "drive",
    "id": "D49",
    "title": "Make Them Your Deputy",
    "instruction": "Get someone’s help by defining it as service under your direction.",
    "categoryId": "direct-objectives",
    "subthemeId": "secure-help",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "recruiter",
      "delegator",
      "authority"
    ],
    "motifs": [
      "dependence",
      "authority",
      "hierarchy",
      "control"
    ]
  },
  {
    "type": "drive",
    "id": "D50",
    "title": "Not Dismissed",
    "instruction": "Keep someone present by treating departure as a privilege only you can grant.",
    "categoryId": "direct-objectives",
    "subthemeId": "prevent-departure",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "heightened",
    "orientation": "against-partner",
    "coachRoles": [
      "retainer",
      "enforcer"
    ],
    "motifs": [
      "authority",
      "control",
      "compliance",
      "autonomy"
    ]
  },
  {
    "type": "drive",
    "id": "D51",
    "title": "Acknowledge the Disrespect",
    "instruction": "Make someone apologize for the disrespect to your position, not merely for what happened.",
    "categoryId": "direct-objectives",
    "subthemeId": "obtain-apology",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "repairer",
      "recognition-seeker"
    ],
    "motifs": [
      "recognition",
      "status",
      "repair",
      "reputation"
    ]
  },
  {
    "type": "drive",
    "id": "D52",
    "title": "Secure the Endorsement",
    "instruction": "Get a visible endorsement that makes your decision or position harder to challenge.",
    "categoryId": "direct-objectives",
    "subthemeId": "gain-approval",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "permission-seeker",
      "broker"
    ],
    "motifs": [
      "approval",
      "legitimacy",
      "reputation",
      "influence"
    ]
  },
  {
    "type": "drive",
    "id": "D53",
    "title": "Delegate Downward",
    "instruction": "Make someone accept an unwanted responsibility by placing them lower in the hierarchy.",
    "categoryId": "direct-objectives",
    "subthemeId": "transfer-task",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "delegator",
      "enforcer"
    ],
    "motifs": [
      "hierarchy",
      "responsibility",
      "control",
      "compliance"
    ]
  },
  {
    "type": "drive",
    "id": "D54",
    "title": "Find the Real Authority",
    "instruction": "Probe until you know who can approve, block, or reverse the outcome.",
    "categoryId": "direct-objectives",
    "subthemeId": "extract-information",
    "difficulty": "beginner",
    "intensity": "low",
    "tone": "grounded",
    "orientation": "world-focused",
    "coachRoles": [
      "investigator",
      "broker"
    ],
    "motifs": [
      "access",
      "authority",
      "influence",
      "truth"
    ]
  },
  {
    "type": "drive",
    "id": "D55",
    "title": "Build a Coalition",
    "instruction": "Recruit someone to your side so your position appears broader and more legitimate.",
    "categoryId": "direct-objectives",
    "subthemeId": "recruit-ally",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "recruiter",
      "broker"
    ],
    "motifs": [
      "allegiance",
      "legitimacy",
      "influence",
      "competition"
    ]
  },
  {
    "type": "drive",
    "id": "D56",
    "title": "Challenge by Proxy",
    "instruction": "Persuade someone else to challenge a rule or authority before you risk doing it yourself.",
    "categoryId": "direct-objectives",
    "subthemeId": "induce-risk",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "instigator",
      "challenger"
    ],
    "motifs": [
      "risk",
      "authority",
      "autonomy",
      "compliance"
    ]
  },
  {
    "type": "drive",
    "id": "D57",
    "title": "Use the Proper Title",
    "instruction": "Make someone acknowledge your standing through a title, privilege, courtesy, or public sign of respect.",
    "categoryId": "direct-objectives",
    "subthemeId": "gain-recognition",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "recognition-seeker",
      "claimant"
    ],
    "motifs": [
      "recognition",
      "status",
      "legitimacy",
      "reputation"
    ]
  },
  {
    "type": "drive",
    "id": "D58",
    "title": "Declare Allegiance",
    "instruction": "Make someone choose which person, side, or claim to authority they will support.",
    "categoryId": "direct-objectives",
    "subthemeId": "force-choice",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "heightened",
    "orientation": "against-partner",
    "coachRoles": [
      "chooser",
      "recruiter"
    ],
    "motifs": [
      "choice",
      "allegiance",
      "authority",
      "loyalty"
    ]
  },
  {
    "type": "drive",
    "id": "D59",
    "title": "Obey Without Explanation",
    "instruction": "Create increasingly inconvenient requests that test whether someone accepts your authority.",
    "categoryId": "direct-objectives",
    "subthemeId": "test-loyalty",
    "difficulty": "advanced",
    "intensity": "high",
    "tone": "heightened",
    "orientation": "against-partner",
    "coachRoles": [
      "tester",
      "enforcer"
    ],
    "motifs": [
      "loyalty",
      "compliance",
      "authority",
      "control"
    ]
  },
  {
    "type": "drive",
    "id": "D60",
    "title": "Pass Me the Authority",
    "instruction": "Get someone to transfer authority publicly by naming you as the person who decides what happens next.",
    "categoryId": "direct-objectives",
    "subthemeId": "obtain-surrender",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "acquirer",
      "successor",
      "claimant"
    ],
    "motifs": [
      "authority",
      "succession",
      "legitimacy",
      "recognition"
    ],
    "contentVersion": "0.18.0"
  },
  {
    "type": "drive",
    "id": "D61",
    "title": "Orders from the Shadows",
    "instruction": "Hide that you set the problem in motion while quietly directing how everyone responds.",
    "categoryId": "secrets-avoidance",
    "subthemeId": "conceal-culpability",
    "difficulty": "advanced",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "culprit",
      "hidden-power"
    ],
    "motifs": [
      "secrecy",
      "influence",
      "guilt",
      "control"
    ]
  },
  {
    "type": "drive",
    "id": "D62",
    "title": "Not Up for Debate",
    "instruction": "Keep the conversation from examining where your authority comes from or whether it is legitimate.",
    "categoryId": "secrets-avoidance",
    "subthemeId": "avoid-subject",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "avoider",
      "claimant"
    ],
    "motifs": [
      "legitimacy",
      "authority",
      "secrecy",
      "control"
    ]
  },
  {
    "type": "drive",
    "id": "D63",
    "title": "For Stability’s Sake",
    "instruction": "Hide a destabilizing truth because you believe the current balance of power must be protected.",
    "categoryId": "secrets-avoidance",
    "subthemeId": "protective-deception",
    "difficulty": "advanced",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "world-focused",
    "coachRoles": [
      "secret-keeper",
      "protector"
    ],
    "motifs": [
      "secrecy",
      "authority",
      "care",
      "control"
    ]
  },
  {
    "type": "drive",
    "id": "D64",
    "title": "Name Your Backers",
    "instruction": "Get someone to reveal who supports their position, who authorized it, and who benefits from it.",
    "categoryId": "secrets-avoidance",
    "subthemeId": "induce-confession",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "interrogator",
      "investigator"
    ],
    "motifs": [
      "truth",
      "allegiance",
      "influence",
      "secrecy"
    ]
  },
  {
    "type": "drive",
    "id": "D65",
    "title": "Strategic Retreat",
    "instruction": "Describe every loss of control as a deliberate concession made from strength.",
    "categoryId": "secrets-avoidance",
    "subthemeId": "reframe-failure",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "heightened",
    "orientation": "self-focused",
    "coachRoles": [
      "spin-doctor",
      "authority"
    ],
    "motifs": [
      "loss",
      "reputation",
      "control",
      "authority"
    ]
  },
  {
    "type": "drive",
    "id": "D66",
    "title": "Act Authorized",
    "instruction": "Behave as though you have full authorization, using certainty and procedure to discourage verification.",
    "categoryId": "secrets-avoidance",
    "subthemeId": "feign-competence",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "self-focused",
    "coachRoles": [
      "impostor",
      "claimant"
    ],
    "motifs": [
      "legitimacy",
      "belonging",
      "authority",
      "secrecy"
    ]
  },
  {
    "type": "drive",
    "id": "D67",
    "title": "Rank Everything",
    "instruction": "Turn every new contribution into a ranking that places you nearer the top.",
    "categoryId": "repeatable-behaviors",
    "subthemeId": "competition-loop",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "heightened",
    "orientation": "against-partner",
    "coachRoles": [
      "competitor",
      "successor"
    ],
    "motifs": [
      "competition",
      "hierarchy",
      "status",
      "succession"
    ]
  },
  {
    "type": "drive",
    "id": "D68",
    "title": "More Power, More Problems",
    "instruction": "Celebrate every burden, restriction, or crisis as evidence that your influence is expanding.",
    "categoryId": "repeatable-behaviors",
    "subthemeId": "positive-reframing",
    "difficulty": "beginner",
    "intensity": "low",
    "tone": "heightened",
    "orientation": "self-focused",
    "coachRoles": [
      "reframer",
      "optimist"
    ],
    "motifs": [
      "optimism",
      "influence",
      "responsibility",
      "status"
    ]
  },
  {
    "type": "drive",
    "id": "D69",
    "title": "Gracious Command",
    "instruction": "Remain warm and appreciative while steadily reducing everyone else’s room to choose.",
    "categoryId": "repeatable-behaviors",
    "subthemeId": "emotional-contradiction",
    "difficulty": "advanced",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "contradictor",
      "controller"
    ],
    "motifs": [
      "control",
      "autonomy",
      "care",
      "compliance"
    ]
  },
  {
    "type": "drive",
    "id": "D70",
    "title": "Access Has a Price",
    "instruction": "Turn every piece of access, information, or approval into a favor, debt, or condition.",
    "categoryId": "repeatable-behaviors",
    "subthemeId": "transactional-framing",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "negotiator",
      "gatekeeper",
      "broker"
    ],
    "motifs": [
      "access",
      "leverage",
      "obligation",
      "resources"
    ]
  },
  {
    "type": "drive",
    "id": "D71",
    "title": "Consensus Means Me",
    "instruction": "Treat every partial agreement as confirmation that everyone has accepted your leadership.",
    "categoryId": "repeatable-behaviors",
    "subthemeId": "self-serving-agreement",
    "difficulty": "advanced",
    "intensity": "medium",
    "tone": "heightened",
    "orientation": "against-partner",
    "coachRoles": [
      "controller",
      "authority"
    ],
    "motifs": [
      "approval",
      "hierarchy",
      "control",
      "legitimacy"
    ]
  },
  {
    "type": "drive",
    "id": "D72",
    "title": "Expand Your Jurisdiction",
    "instruction": "Use every new problem as a reason to expand what you are entitled to control.",
    "categoryId": "repeatable-behaviors",
    "subthemeId": "pattern-escalation",
    "difficulty": "beginner",
    "intensity": "high",
    "tone": "heightened",
    "orientation": "world-focused",
    "coachRoles": [
      "escalator",
      "claimant"
    ],
    "motifs": [
      "control",
      "authority",
      "territory",
      "influence"
    ]
  }
];
  const cards = definitions.map(createCard);
  const stances = cards.filter((card) => card.type === "stance");
  const drives = cards.filter((card) => card.type === "drive");

  return {
    schemaVersion: bible.CARD_SCHEMA_VERSION,
    id: PACK_ID,
    title: "Power Games",
    version: PACK_VERSION,
    status: "playtest",
    sequence: 3,
    publicationStage: bible.getPack(PACK_ID).publicationStage,
    publicationWave: bible.getPack(PACK_ID).publicationWave,
    editorialReviewVersion: bible.getPack(PACK_ID).editorialReviewVersion,
    remainingPublicationGates: [...bible.getPack(PACK_ID).remainingPublicationGates],
    description: "Authority, legitimacy, leverage, dependency, hierarchy, and the struggle over who gets to decide.",
    stances,
    drives
  };
});
