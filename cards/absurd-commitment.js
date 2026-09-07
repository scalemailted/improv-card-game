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
    throw new Error("Absurd Commitment requires card-bible.js to load first.");
  }

  const PACK_ID = "absurd-commitment";
  const DEFAULT_CONTENT_VERSION = "0.14.0";
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
    "id": "S145",
    "type": "stance",
    "title": "Official Interpreter",
    "instruction": "Carry yourself as the final authority on what the impossible situation means, correcting every interpretation that threatens your version of reality.",
    "categoryId": "status-authority",
    "subthemeId": "command-presence",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "heightened",
    "orientation": "world-focused",
    "coachRoles": [
      "authority",
      "believer",
      "world-builder"
    ],
    "motifs": [
      "authority",
      "impossibility",
      "reality",
      "logic"
    ]
  },
  {
    "id": "S146",
    "type": "stance",
    "title": "Prophecy Under Revision",
    "instruction": "Project absolute certainty about what happens next while quietly revising the prophecy whenever reality disagrees.",
    "categoryId": "status-authority",
    "subthemeId": "precarious-authority",
    "difficulty": "advanced",
    "intensity": "high",
    "tone": "heightened",
    "orientation": "self-focused",
    "coachRoles": [
      "insecure-authority",
      "believer",
      "strategist"
    ],
    "motifs": [
      "prophecy",
      "authority",
      "uncertainty",
      "reality"
    ]
  },
  {
    "id": "S147",
    "type": "stance",
    "title": "Impossible Specialist",
    "instruction": "Approach the strange situation with precise technical confidence, insisting that its impossible details require exact terminology and proper handling.",
    "categoryId": "status-authority",
    "subthemeId": "professional-expertise",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "world-focused",
    "coachRoles": [
      "expert",
      "literalist",
      "consequence-keeper"
    ],
    "motifs": [
      "expertise",
      "impossibility",
      "logic",
      "rules"
    ]
  },
  {
    "id": "S148",
    "type": "stance",
    "title": "Obviously One of Us",
    "instruction": "Act as though effortless acceptance of the bizarre premise proves you belong, and treat visible confusion as a personal risk.",
    "categoryId": "status-authority",
    "subthemeId": "belonging-legitimacy",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "heightened",
    "orientation": "self-focused",
    "coachRoles": [
      "outsider",
      "normalizer",
      "approval-seeker"
    ],
    "motifs": [
      "belonging",
      "normality",
      "premise",
      "fear"
    ]
  },
  {
    "id": "S149",
    "type": "stance",
    "title": "Senior in the Strange",
    "instruction": "Treat yourself as an experienced guide to impossible customs, offering patient instruction while preserving one unexplained advantage.",
    "categoryId": "status-authority",
    "subthemeId": "mentorship-rank",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "absurd",
    "orientation": "toward-partner",
    "coachRoles": [
      "mentor",
      "ritualist",
      "world-builder"
    ],
    "motifs": [
      "hierarchy",
      "ritual",
      "impossibility",
      "expertise"
    ]
  },
  {
    "id": "S150",
    "type": "stance",
    "title": "The One Normal Thing",
    "instruction": "Remain modest while controlling the single ordinary resource everyone needs to survive the increasingly impossible situation.",
    "categoryId": "status-authority",
    "subthemeId": "hidden-leverage",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "world-focused",
    "coachRoles": [
      "hidden-power",
      "anchor",
      "broker"
    ],
    "motifs": [
      "resources",
      "normality",
      "leverage",
      "consequences"
    ]
  },
  {
    "id": "S151",
    "type": "stance",
    "title": "We Always Did This",
    "instruction": "Treat the strangest behavior in the scene as an old shared tradition that needs no explanation and deserves immediate continuation.",
    "categoryId": "history-relationship",
    "subthemeId": "shared-origins",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "absurd",
    "orientation": "toward-partner",
    "coachRoles": [
      "familiar",
      "ritualist",
      "believer"
    ],
    "motifs": [
      "history",
      "ritual",
      "absurdity",
      "familiarity"
    ]
  },
  {
    "id": "S152",
    "type": "stance",
    "title": "You Owe Me a Miracle",
    "instruction": "Carry one past favor as sufficient reason to expect an impossible act in return, and present the exchange as perfectly fair.",
    "categoryId": "history-relationship",
    "subthemeId": "debts-favors",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "heightened",
    "orientation": "against-partner",
    "coachRoles": [
      "creditor",
      "acquirer",
      "believer"
    ],
    "motifs": [
      "obligation",
      "fairness",
      "impossibility",
      "sacrifice"
    ]
  },
  {
    "id": "S153",
    "type": "stance",
    "title": "Designated Reality Check",
    "instruction": "Return automatically to translating every bizarre development into practical consequences, even when everyone else seems comfortable with it.",
    "categoryId": "history-relationship",
    "subthemeId": "familiar-roles",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "world-focused",
    "coachRoles": [
      "anchor",
      "stabilizer",
      "consequence-keeper"
    ],
    "motifs": [
      "reality",
      "consequences",
      "responsibility",
      "absurdity"
    ]
  },
  {
    "id": "S154",
    "type": "stance",
    "title": "More Committed Than You",
    "instruction": "Treat belief in the scene’s strangest premise as a contest, proving your commitment through increasingly unnecessary demonstrations.",
    "categoryId": "history-relationship",
    "subthemeId": "rivalry-comparison",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "absurd",
    "orientation": "against-partner",
    "coachRoles": [
      "rival",
      "competitor",
      "believer"
    ],
    "motifs": [
      "competition",
      "premise",
      "absurdity",
      "validation"
    ]
  },
  {
    "id": "S155",
    "type": "stance",
    "title": "Your Nonsense Works",
    "instruction": "Use another person’s strangest reasoning as your most reliable guide while publicly calling each successful result a coincidence.",
    "categoryId": "history-relationship",
    "subthemeId": "trust-dependence",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "heightened",
    "orientation": "toward-partner",
    "coachRoles": [
      "dependent",
      "skeptic",
      "reality-tester"
    ],
    "motifs": [
      "dependence",
      "logic",
      "trust",
      "impossibility"
    ]
  },
  {
    "id": "S156",
    "type": "stance",
    "title": "The Impossible Promise",
    "instruction": "Treat an old, seemingly impossible promise as fully binding, and interpret every delay as unfinished business rather than release.",
    "categoryId": "history-relationship",
    "subthemeId": "rupture-unfinished-business",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "heightened",
    "orientation": "toward-partner",
    "coachRoles": [
      "wounded",
      "loyalist",
      "believer"
    ],
    "motifs": [
      "promise",
      "obligation",
      "impossibility",
      "history"
    ]
  },
  {
    "id": "S157",
    "type": "stance",
    "title": "Effortlessly Unbelievable",
    "instruction": "Be sincerely impressed by how naturally someone inhabits the strange reality, then compete to appear even less surprised.",
    "categoryId": "emotional-assumptions",
    "subthemeId": "admiration-envy",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "heightened",
    "orientation": "against-partner",
    "coachRoles": [
      "admirer",
      "competitor",
      "normalizer"
    ],
    "motifs": [
      "admiration",
      "envy",
      "normality",
      "reality"
    ]
  },
  {
    "id": "S158",
    "type": "stance",
    "title": "When Things Made Sense",
    "instruction": "Perform the person you were before reality became complicated, using outdated certainty to explain each new impossibility.",
    "categoryId": "emotional-assumptions",
    "subthemeId": "identity-nostalgia",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "heightened",
    "orientation": "self-focused",
    "coachRoles": [
      "nostalgist",
      "literalist",
      "believer"
    ],
    "motifs": [
      "identity",
      "history",
      "reality",
      "impossibility"
    ]
  },
  {
    "id": "S159",
    "type": "stance",
    "title": "Don’t Let Reality Notice",
    "instruction": "Behave as though openly questioning the impossible premise could attract dangerous attention, and respond to doubt with urgent normality.",
    "categoryId": "emotional-assumptions",
    "subthemeId": "fear-insecurity",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "absurd",
    "orientation": "self-focused",
    "coachRoles": [
      "vulnerable",
      "alarmist",
      "normalizer"
    ],
    "motifs": [
      "fear",
      "premise",
      "normality",
      "consequences"
    ]
  },
  {
    "id": "S160",
    "type": "stance",
    "title": "Safety Through Nonsense",
    "instruction": "Take control through elaborate impossible precautions, treating every objection as another reason the people present need protection.",
    "categoryId": "emotional-assumptions",
    "subthemeId": "care-control",
    "difficulty": "beginner",
    "intensity": "high",
    "tone": "absurd",
    "orientation": "toward-partner",
    "coachRoles": [
      "protector",
      "controller",
      "literalist"
    ],
    "motifs": [
      "care",
      "control",
      "impossibility",
      "safety"
    ]
  },
  {
    "id": "S161",
    "type": "stance",
    "title": "Half a Beat Late",
    "instruction": "Use the group’s reactions as your cue, joining each one a moment late and escalating your enthusiasm to stay included.",
    "categoryId": "emotional-assumptions",
    "subthemeId": "approval-belonging",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "heightened",
    "orientation": "self-focused",
    "coachRoles": [
      "approval-seeker",
      "outsider",
      "normalizer"
    ],
    "motifs": [
      "approval",
      "belonging",
      "performance",
      "repetition"
    ],
    "contentVersion": "0.18.0"
  },
  {
    "id": "S162",
    "type": "stance",
    "title": "I Predicted This",
    "instruction": "Create opportunities to show that each impossible event confirms a theory you understood long before anyone asked.",
    "categoryId": "emotional-assumptions",
    "subthemeId": "pride-validation",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "heightened",
    "orientation": "self-focused",
    "coachRoles": [
      "showoff",
      "meaning-maker",
      "believer"
    ],
    "motifs": [
      "pride",
      "recognition",
      "prophecy",
      "patterns"
    ]
  },
  {
    "id": "S163",
    "type": "stance",
    "title": "The Ceremony Requires More",
    "instruction": "Treat every ordinary step as only the beginning of an elaborate ceremony, adding necessary details whenever anyone tries to finish.",
    "categoryId": "worldview-absurdity",
    "subthemeId": "ritual-tradition",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "absurd",
    "orientation": "world-focused",
    "coachRoles": [
      "ritualist",
      "escalator",
      "world-builder"
    ],
    "motifs": [
      "ritual",
      "rules",
      "absurdity",
      "consequences"
    ]
  },
  {
    "id": "S164",
    "type": "stance",
    "title": "Reality Is Coming Apart",
    "instruction": "Treat each contradiction, coincidence, and ordinary mistake as evidence that reality is losing structural integrity.",
    "categoryId": "worldview-absurdity",
    "subthemeId": "crisis-catastrophe",
    "difficulty": "beginner",
    "intensity": "high",
    "tone": "heightened",
    "orientation": "world-focused",
    "coachRoles": [
      "alarmist",
      "reality-tester",
      "meaning-maker"
    ],
    "motifs": [
      "crisis",
      "reality",
      "patterns",
      "impossibility"
    ]
  },
  {
    "id": "S165",
    "type": "stance",
    "title": "Wonderful, It’s Impossible",
    "instruction": "Celebrate every impossible development as a breakthrough that removes old limitations and creates exciting new problems.",
    "categoryId": "worldview-absurdity",
    "subthemeId": "celebration-optimism",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "absurd",
    "orientation": "world-focused",
    "coachRoles": [
      "optimist",
      "believer",
      "reframer"
    ],
    "motifs": [
      "celebration",
      "optimism",
      "impossibility",
      "consequences"
    ]
  },
  {
    "id": "S166",
    "type": "stance",
    "title": "Fine, What Does It Eat?",
    "instruction": "Accept the impossible premise immediately, then focus on its schedule, appetite, cleanup, safety, and long-term maintenance.",
    "categoryId": "worldview-absurdity",
    "subthemeId": "practical-grounding",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "world-focused",
    "coachRoles": [
      "anchor",
      "consequence-keeper",
      "stabilizer"
    ],
    "motifs": [
      "premise",
      "consequences",
      "maintenance",
      "safety"
    ]
  },
  {
    "id": "S167",
    "type": "stance",
    "title": "The Third Detail Matters",
    "instruction": "Choose one arbitrary detail and treat it as the key that explains, controls, or prevents the entire impossible situation.",
    "categoryId": "worldview-absurdity",
    "subthemeId": "fixation-significance",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "absurd",
    "orientation": "world-focused",
    "coachRoles": [
      "fixator",
      "literalist",
      "meaning-maker"
    ],
    "motifs": [
      "symbols",
      "patterns",
      "control",
      "impossibility"
    ]
  },
  {
    "id": "S168",
    "type": "stance",
    "title": "The Universe Is Rhyming",
    "instruction": "Treat repeated shapes, phrases, and coincidences as links between unrelated events until they form one grand and unquestionable message.",
    "categoryId": "worldview-absurdity",
    "subthemeId": "pattern-grand-meaning",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "absurd",
    "orientation": "world-focused",
    "coachRoles": [
      "meaning-maker",
      "world-builder",
      "believer"
    ],
    "motifs": [
      "patterns",
      "symbols",
      "prophecy",
      "reality"
    ]
  },
  {
    "id": "D145",
    "type": "drive",
    "title": "Help Me Make This Normal",
    "instruction": "Get someone to help perform the strange behavior until it feels ordinary.",
    "categoryId": "direct-objectives",
    "subthemeId": "secure-help",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "heightened",
    "orientation": "toward-partner",
    "coachRoles": [
      "pursuer",
      "normalizer",
      "recruiter"
    ],
    "motifs": [
      "normality",
      "premise",
      "absurdity",
      "trust"
    ]
  },
  {
    "id": "D146",
    "type": "drive",
    "title": "You Can’t Leave Mid-Prophecy",
    "instruction": "Keep someone present until the impossible prediction has been fulfilled, disproved, or responsibly revised.",
    "categoryId": "direct-objectives",
    "subthemeId": "prevent-departure",
    "difficulty": "beginner",
    "intensity": "high",
    "tone": "heightened",
    "orientation": "toward-partner",
    "coachRoles": [
      "retainer",
      "believer",
      "strategist"
    ],
    "motifs": [
      "prophecy",
      "impossibility",
      "responsibility",
      "time"
    ]
  },
  {
    "id": "D147",
    "type": "drive",
    "title": "Apologize to Reality",
    "instruction": "Get someone to apologize to an object, rule, place, or idea for violating its impossible expectations.",
    "categoryId": "direct-objectives",
    "subthemeId": "obtain-apology",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "absurd",
    "orientation": "toward-partner",
    "coachRoles": [
      "repairer",
      "literalist",
      "ritualist"
    ],
    "motifs": [
      "repair",
      "rules",
      "impossibility",
      "reality"
    ]
  },
  {
    "id": "D148",
    "type": "drive",
    "title": "Approve the Impossible Plan",
    "instruction": "Get someone to formally approve a plan whose logic becomes stranger each time it is explained.",
    "categoryId": "direct-objectives",
    "subthemeId": "gain-approval",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "permission-seeker",
      "strategist",
      "world-builder"
    ],
    "motifs": [
      "permission",
      "logic",
      "strategy",
      "absurdity"
    ]
  },
  {
    "id": "D149",
    "type": "drive",
    "title": "You Handle the Impossible Part",
    "instruction": "Make someone accept responsibility for the one part of the plan that cannot reasonably be done.",
    "categoryId": "direct-objectives",
    "subthemeId": "transfer-task",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "heightened",
    "orientation": "against-partner",
    "coachRoles": [
      "delegator",
      "instigator",
      "believer"
    ],
    "motifs": [
      "responsibility",
      "impossibility",
      "strategy",
      "risk"
    ]
  },
  {
    "id": "D150",
    "type": "drive",
    "title": "What Rule Did I Miss?",
    "instruction": "Find the hidden rule that makes the strange situation consistent, practical, or at least survivable.",
    "categoryId": "direct-objectives",
    "subthemeId": "extract-information",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "world-focused",
    "coachRoles": [
      "investigator",
      "reality-tester",
      "anchor"
    ],
    "motifs": [
      "rules",
      "logic",
      "information",
      "safety"
    ]
  },
  {
    "id": "D151",
    "type": "drive",
    "title": "Believe This with Me",
    "instruction": "Recruit someone into treating your impossible explanation as the most useful version of events.",
    "categoryId": "direct-objectives",
    "subthemeId": "recruit-ally",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "heightened",
    "orientation": "toward-partner",
    "coachRoles": [
      "recruiter",
      "believer",
      "conspirator"
    ],
    "motifs": [
      "recruitment",
      "premise",
      "trust",
      "impossibility"
    ]
  },
  {
    "id": "D152",
    "type": "drive",
    "title": "Test the Impossible Claim",
    "instruction": "Get someone else to take the first practical step that could prove the bizarre claim true.",
    "categoryId": "direct-objectives",
    "subthemeId": "induce-risk",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "instigator",
      "reality-tester",
      "investigator"
    ],
    "motifs": [
      "risk",
      "evidence",
      "premise",
      "impossibility"
    ]
  },
  {
    "id": "D153",
    "type": "drive",
    "title": "Credit for the Impossible",
    "instruction": "Make someone acknowledge that you understood, predicted, or accepted the impossible truth before anyone else.",
    "categoryId": "direct-objectives",
    "subthemeId": "gain-recognition",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "heightened",
    "orientation": "toward-partner",
    "coachRoles": [
      "recognition-seeker",
      "showoff",
      "believer"
    ],
    "motifs": [
      "recognition",
      "prophecy",
      "truth",
      "impossibility"
    ]
  },
  {
    "id": "D154",
    "type": "drive",
    "title": "Choose the Real Impossibility",
    "instruction": "Make someone choose which of two incompatible explanations will govern what everyone does next.",
    "categoryId": "direct-objectives",
    "subthemeId": "force-choice",
    "difficulty": "advanced",
    "intensity": "high",
    "tone": "absurd",
    "orientation": "against-partner",
    "coachRoles": [
      "chooser",
      "world-builder",
      "controller"
    ],
    "motifs": [
      "choice",
      "logic",
      "premise",
      "consequences"
    ]
  },
  {
    "id": "D155",
    "type": "drive",
    "title": "Act as If It’s True",
    "instruction": "Ask for one concrete choice that would only make sense if the impossible premise were true.",
    "categoryId": "direct-objectives",
    "subthemeId": "test-loyalty",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "absurd",
    "orientation": "against-partner",
    "coachRoles": [
      "tester",
      "believer",
      "consequence-keeper"
    ],
    "motifs": [
      "loyalty",
      "premise",
      "commitment",
      "impossibility"
    ],
    "contentVersion": "0.18.0"
  },
  {
    "id": "D156",
    "type": "drive",
    "title": "Abandon the Normal Explanation",
    "instruction": "Persuade someone to surrender the last ordinary explanation and proceed entirely within the stranger one.",
    "categoryId": "direct-objectives",
    "subthemeId": "obtain-surrender",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "heightened",
    "orientation": "toward-partner",
    "coachRoles": [
      "acquirer",
      "recruiter",
      "believer"
    ],
    "motifs": [
      "normality",
      "logic",
      "premise",
      "absurdity"
    ]
  },
  {
    "id": "D157",
    "type": "drive",
    "title": "I Started the Weirdness",
    "instruction": "Hide that one casual choice caused the impossible situation while eagerly helping manage each new consequence.",
    "categoryId": "secrets-avoidance",
    "subthemeId": "conceal-culpability",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "heightened",
    "orientation": "world-focused",
    "coachRoles": [
      "culprit",
      "consequence-keeper",
      "strategist"
    ],
    "motifs": [
      "guilt",
      "impossibility",
      "consequences",
      "responsibility"
    ]
  },
  {
    "id": "D158",
    "type": "drive",
    "title": "Don’t Question the Premise",
    "instruction": "Redirect every attempt to ask why the strange situation exists toward what must happen next.",
    "categoryId": "secrets-avoidance",
    "subthemeId": "avoid-subject",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "away-from-partner",
    "coachRoles": [
      "avoider",
      "normalizer",
      "strategist"
    ],
    "motifs": [
      "premise",
      "misdirection",
      "consequences",
      "logic"
    ]
  },
  {
    "id": "D159",
    "type": "drive",
    "title": "Keep Hope Operational",
    "instruction": "Protect their hope with practical evidence and next steps while quietly withholding what makes the impossible outcome unlikely.",
    "categoryId": "secrets-avoidance",
    "subthemeId": "protective-deception",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "heightened",
    "orientation": "toward-partner",
    "coachRoles": [
      "protector",
      "hope-keeper",
      "strategist"
    ],
    "motifs": [
      "hope",
      "evidence",
      "care",
      "deception"
    ],
    "contentVersion": "0.18.0"
  },
  {
    "id": "D160",
    "type": "drive",
    "title": "Say You Saw It Too",
    "instruction": "Get someone to admit noticing the impossible detail before you reveal how much you believe it.",
    "categoryId": "secrets-avoidance",
    "subthemeId": "induce-confession",
    "difficulty": "beginner",
    "intensity": "high",
    "tone": "heightened",
    "orientation": "toward-partner",
    "coachRoles": [
      "interrogator",
      "witness",
      "believer"
    ],
    "motifs": [
      "confession",
      "witness",
      "impossibility",
      "truth"
    ]
  },
  {
    "id": "D161",
    "type": "drive",
    "title": "Failure Reveals the Mission",
    "instruction": "Use each failed step to reveal a different goal the plan was secretly pursuing, then act immediately on that new mission.",
    "categoryId": "secrets-avoidance",
    "subthemeId": "reframe-failure",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "heightened",
    "orientation": "self-focused",
    "coachRoles": [
      "spin-doctor",
      "reversal-maker",
      "strategist"
    ],
    "motifs": [
      "strategy",
      "reversal",
      "turning-point",
      "impossibility"
    ],
    "contentVersion": "0.18.0"
  },
  {
    "id": "D162",
    "type": "drive",
    "title": "Fluent in Nonsense",
    "instruction": "Perform complete mastery of the strange logic while inventing each rule only when it becomes necessary.",
    "categoryId": "secrets-avoidance",
    "subthemeId": "feign-competence",
    "difficulty": "advanced",
    "intensity": "medium",
    "tone": "absurd",
    "orientation": "self-focused",
    "coachRoles": [
      "impostor",
      "literalist",
      "world-builder"
    ],
    "motifs": [
      "logic",
      "rules",
      "absurdity",
      "expertise"
    ]
  },
  {
    "id": "D163",
    "type": "drive",
    "title": "Raise the Impossibility",
    "instruction": "Answer every strange offer with a more committed version that you can still justify.",
    "categoryId": "repeatable-behaviors",
    "subthemeId": "competition-loop",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "absurd",
    "orientation": "against-partner",
    "coachRoles": [
      "competitor",
      "escalator",
      "believer"
    ],
    "motifs": [
      "competition",
      "impossibility",
      "logic",
      "premise"
    ]
  },
  {
    "id": "D164",
    "type": "drive",
    "title": "Every Glitch Is a Gift",
    "instruction": "Turn every contradiction or failure into a surprising benefit of the impossible system.",
    "categoryId": "repeatable-behaviors",
    "subthemeId": "positive-reframing",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "heightened",
    "orientation": "world-focused",
    "coachRoles": [
      "reframer",
      "optimist",
      "world-builder"
    ],
    "motifs": [
      "optimism",
      "patterns",
      "impossibility",
      "celebration"
    ]
  },
  {
    "id": "D165",
    "type": "drive",
    "title": "Calm About the Impossible",
    "instruction": "Remain perfectly calm around impossible events while becoming increasingly alarmed by ordinary details.",
    "categoryId": "repeatable-behaviors",
    "subthemeId": "emotional-contradiction",
    "difficulty": "beginner",
    "intensity": "high",
    "tone": "absurd",
    "orientation": "self-focused",
    "coachRoles": [
      "contradictor",
      "normalizer",
      "alarmist"
    ],
    "motifs": [
      "normality",
      "crisis",
      "impossibility",
      "absurdity"
    ]
  },
  {
    "id": "D166",
    "type": "drive",
    "title": "Impossible Currency",
    "instruction": "Price every favor in symbolic acts, imaginary resources, or promises that cannot be measured normally.",
    "categoryId": "repeatable-behaviors",
    "subthemeId": "transactional-framing",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "absurd",
    "orientation": "against-partner",
    "coachRoles": [
      "negotiator",
      "literalist",
      "broker"
    ],
    "motifs": [
      "resources",
      "symbols",
      "obligation",
      "impossibility"
    ]
  },
  {
    "id": "D167",
    "type": "drive",
    "title": "Yes, Under My Physics",
    "instruction": "Agree completely, then redefine each term using rules that make your preferred outcome inevitable.",
    "categoryId": "repeatable-behaviors",
    "subthemeId": "self-serving-agreement",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "heightened",
    "orientation": "self-focused",
    "coachRoles": [
      "controller",
      "world-builder",
      "negotiator"
    ],
    "motifs": [
      "rules",
      "logic",
      "control",
      "consequences"
    ]
  },
  {
    "id": "D168",
    "type": "drive",
    "title": "The Logic Gets Bigger",
    "instruction": "Use every new detail to expand the impossible system, its history, and the consequences of breaking it.",
    "categoryId": "repeatable-behaviors",
    "subthemeId": "pattern-escalation",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "absurd",
    "orientation": "world-focused",
    "coachRoles": [
      "escalator",
      "meaning-maker",
      "world-builder"
    ],
    "motifs": [
      "logic",
      "patterns",
      "history",
      "consequences",
      "impossibility"
    ]
  }
];
  const cards = definitions.map(createCard);
  const stances = cards.filter((card) => card.type === "stance");
  const drives = cards.filter((card) => card.type === "drive");

  return {
    schemaVersion: bible.CARD_SCHEMA_VERSION,
    id: PACK_ID,
    title: "Absurd Commitment",
    version: PACK_VERSION,
    status: "playtest",
    sequence: 7,
    publicationStage: bible.getPack(PACK_ID).publicationStage,
    publicationWave: bible.getPack(PACK_ID).publicationWave,
    editorialReviewVersion: bible.getPack(PACK_ID).editorialReviewVersion,
    remainingPublicationGates: [...bible.getPack(PACK_ID).remainingPublicationGates],
    description: "Impossible logic, literal commitment, grounded reaction, recurring nonsense, and heightened consequence.",
    stances,
    drives
  };
});
