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
    throw new Error("Emotional Pressure requires card-bible.js to load first.");
  }

  const PACK_ID = "emotional-pressure";
  const DEFAULT_CONTENT_VERSION = "0.12.0";
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
    "id": "S97",
    "title": "The Emotional Center",
    "instruction": "Carry yourself as the emotional center of the room, letting your mood determine what deserves attention and how seriously it should be treated.",
    "categoryId": "status-authority",
    "subthemeId": "command-presence",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "self-focused",
    "coachRoles": [
      "authority",
      "controller",
      "meaning-maker"
    ],
    "motifs": [
      "control",
      "status",
      "validation",
      "worth"
    ]
  },
  {
    "type": "stance",
    "id": "S98",
    "title": "Composure on Loan",
    "instruction": "Project steady control while quietly depending on everyone else to stay calm enough for you to maintain it.",
    "categoryId": "status-authority",
    "subthemeId": "precarious-authority",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "world-focused",
    "coachRoles": [
      "insecure-authority",
      "dependent",
      "emotional-buffer"
    ],
    "motifs": [
      "control",
      "anxiety",
      "dependence",
      "reassurance"
    ]
  },
  {
    "type": "stance",
    "id": "S99",
    "title": "Fluent in Feelings",
    "instruction": "Treat every reaction as evidence you can expertly interpret; translate feelings, correct emotional misunderstandings, and prescribe the proper response.",
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
      "expertise",
      "communication",
      "control",
      "reassurance"
    ]
  },
  {
    "type": "stance",
    "id": "S100",
    "title": "Earned My Place",
    "instruction": "Treat what you have endured as proof that you belong here and deserve patience, access, and a voice in what happens next.",
    "categoryId": "status-authority",
    "subthemeId": "belonging-legitimacy",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "self-focused",
    "coachRoles": [
      "claimant",
      "vulnerable",
      "recognition-seeker"
    ],
    "motifs": [
      "belonging",
      "resilience",
      "worth",
      "access"
    ]
  },
  {
    "type": "stance",
    "id": "S101",
    "title": "I Survived This First",
    "instruction": "Use your experience with hardship as emotional seniority, offering guidance and judging how well others are handling the pressure.",
    "categoryId": "status-authority",
    "subthemeId": "mentorship-rank",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "mentor",
      "expert",
      "griever"
    ],
    "motifs": [
      "resilience",
      "hierarchy",
      "care",
      "pride"
    ]
  },
  {
    "type": "stance",
    "id": "S102",
    "title": "The Quiet Disappointment",
    "instruction": "Use restrained disappointment as quiet influence, making small pauses, lowered expectations, and careful praise carry more weight than direct demands.",
    "categoryId": "status-authority",
    "subthemeId": "hidden-leverage",
    "difficulty": "advanced",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "hidden-power",
      "approval-seeker",
      "broker"
    ],
    "motifs": [
      "disappointment",
      "influence",
      "control",
      "approval"
    ]
  },
  {
    "type": "stance",
    "id": "S103",
    "title": "When We Still Believed",
    "instruction": "Use a shared earlier hope as your emotional home base, returning to it whenever the present feels uncertain or disappointing.",
    "categoryId": "history-relationship",
    "subthemeId": "shared-origins",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "nostalgist",
      "hope-keeper",
      "memory-keeper"
    ],
    "motifs": [
      "history",
      "hope",
      "memory",
      "uncertainty"
    ]
  },
  {
    "type": "stance",
    "id": "S104",
    "title": "You Saw Me Through",
    "instruction": "Treat past comfort you received as an enduring bond that should now earn honesty, patience, and reciprocal support.",
    "categoryId": "history-relationship",
    "subthemeId": "debts-favors",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "creditor",
      "dependent",
      "loyalist"
    ],
    "motifs": [
      "comfort",
      "obligation",
      "trust",
      "care"
    ]
  },
  {
    "type": "stance",
    "id": "S105",
    "title": "The Strong One",
    "instruction": "Be the strong one: steady everyone else, minimize your own needs, and resist any attempt to care for you.",
    "categoryId": "history-relationship",
    "subthemeId": "familiar-roles",
    "difficulty": "beginner",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "emotional-buffer",
      "caretaker",
      "vulnerable"
    ],
    "motifs": [
      "resilience",
      "care",
      "shame",
      "dependence"
    ]
  },
  {
    "type": "stance",
    "id": "S106",
    "title": "Whose Pain Counts?",
    "instruction": "Treat every disappointment as something to measure against what you have endured, competing for whose feelings deserve greater weight.",
    "categoryId": "history-relationship",
    "subthemeId": "rivalry-comparison",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "rival",
      "wounded",
      "recognition-seeker"
    ],
    "motifs": [
      "competition",
      "disappointment",
      "validation",
      "resentment"
    ]
  },
  {
    "type": "stance",
    "id": "S107",
    "title": "My Safe Person",
    "instruction": "Use one person’s reactions as your measure of safety, then downplay how much their reassurance changes you.",
    "categoryId": "history-relationship",
    "subthemeId": "trust-dependence",
    "difficulty": "beginner",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "dependent",
      "reassurance-seeker",
      "confidant"
    ],
    "motifs": [
      "trust",
      "reassurance",
      "dependence",
      "fear"
    ]
  },
  {
    "type": "stance",
    "id": "S108",
    "title": "Careful Around the Scar",
    "instruction": "Treat one harmless detail as the trigger for an old hurt. Become overly careful, helpful, or controlled whenever it returns.",
    "categoryId": "history-relationship",
    "subthemeId": "rupture-unfinished-business",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "wounded",
      "emotional-buffer",
      "memory-keeper"
    ],
    "motifs": [
      "history",
      "resentment",
      "memory",
      "fear"
    ],
    "contentVersion": "0.18.0"
  },
  {
    "type": "stance",
    "id": "S109",
    "title": "Braver Than Me",
    "instruction": "Treat another person’s emotional courage as both inspiring and unfair, resenting how exposed or hesitant it makes you feel.",
    "categoryId": "emotional-assumptions",
    "subthemeId": "admiration-envy",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "admirer",
      "rival",
      "shame-bearer"
    ],
    "motifs": [
      "admiration",
      "envy",
      "courage",
      "shame"
    ]
  },
  {
    "type": "stance",
    "id": "S110",
    "title": "Before I Knew Better",
    "instruction": "Perform the more hopeful version of yourself from before disappointment taught you caution, and defend that version when reality intrudes.",
    "categoryId": "emotional-assumptions",
    "subthemeId": "identity-nostalgia",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "self-focused",
    "coachRoles": [
      "nostalgist",
      "hope-keeper",
      "vulnerable"
    ],
    "motifs": [
      "hope",
      "identity",
      "disappointment",
      "resilience"
    ]
  },
  {
    "type": "stance",
    "id": "S111",
    "title": "Waiting for the Bad News",
    "instruction": "Treat pauses, changes, and uncertainty as signs that rejection or loss is approaching, then prepare yourself before it arrives.",
    "categoryId": "emotional-assumptions",
    "subthemeId": "fear-insecurity",
    "difficulty": "beginner",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "world-focused",
    "coachRoles": [
      "vulnerable",
      "alarmist",
      "shame-bearer"
    ],
    "motifs": [
      "dread",
      "uncertainty",
      "loss",
      "anxiety"
    ]
  },
  {
    "type": "stance",
    "id": "S112",
    "title": "Let Me Carry It",
    "instruction": "Take responsibility for managing everyone’s emotional burden, deciding what they should know, feel, and face.",
    "categoryId": "emotional-assumptions",
    "subthemeId": "care-control",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "protector",
      "controller",
      "emotional-buffer"
    ],
    "motifs": [
      "care",
      "control",
      "responsibility",
      "grief"
    ]
  },
  {
    "type": "stance",
    "id": "S113",
    "title": "Tell Me We’re Okay",
    "instruction": "Treat every response as evidence of whether you are still accepted, and adjust yourself quickly whenever reassurance feels incomplete.",
    "categoryId": "emotional-assumptions",
    "subthemeId": "approval-belonging",
    "difficulty": "beginner",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "reassurance-seeker",
      "approval-seeker",
      "vulnerable"
    ],
    "motifs": [
      "reassurance",
      "approval",
      "belonging",
      "anxiety"
    ]
  },
  {
    "type": "stance",
    "id": "S114",
    "title": "Don’t Pity Me",
    "instruction": "Frame your struggle as evidence of strength, steering concern toward admiration and rejecting anything that feels like pity.",
    "categoryId": "emotional-assumptions",
    "subthemeId": "pride-validation",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "self-focused",
    "coachRoles": [
      "showoff",
      "recognition-seeker",
      "shame-bearer"
    ],
    "motifs": [
      "pride",
      "resilience",
      "admiration",
      "shame"
    ]
  },
  {
    "type": "stance",
    "id": "S115",
    "title": "The Proper Way to Grieve",
    "instruction": "Treat difficult feelings as requiring a precise ritual, sequence, or ceremony, and correct any attempt to rush or simplify it.",
    "categoryId": "worldview-absurdity",
    "subthemeId": "ritual-tradition",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "world-focused",
    "coachRoles": [
      "ritualist",
      "griever",
      "authority"
    ],
    "motifs": [
      "grief",
      "ritual",
      "rules",
      "control"
    ]
  },
  {
    "type": "stance",
    "id": "S116",
    "title": "Emotional Emergency",
    "instruction": "Interpret every hesitation, sigh, or change in tone as the beginning of an emotional emergency requiring immediate intervention.",
    "categoryId": "worldview-absurdity",
    "subthemeId": "crisis-catastrophe",
    "difficulty": "beginner",
    "intensity": "high",
    "tone": "heightened",
    "orientation": "world-focused",
    "coachRoles": [
      "alarmist",
      "protector",
      "investigator"
    ],
    "motifs": [
      "crisis",
      "anxiety",
      "dread",
      "care"
    ]
  },
  {
    "type": "stance",
    "id": "S117",
    "title": "Hope Is Evidence",
    "instruction": "Treat every small kindness, coincidence, or improvement as undeniable proof that the best possible outcome is gathering momentum.",
    "categoryId": "worldview-absurdity",
    "subthemeId": "celebration-optimism",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "heightened",
    "orientation": "world-focused",
    "coachRoles": [
      "optimist",
      "hope-keeper",
      "meaning-maker"
    ],
    "motifs": [
      "hope",
      "optimism",
      "patterns",
      "reassurance"
    ]
  },
  {
    "type": "stance",
    "id": "S118",
    "title": "What Do You Need Now?",
    "instruction": "Accept every feeling as real, then translate it into water, space, a plan, a boundary, or the next practical step.",
    "categoryId": "worldview-absurdity",
    "subthemeId": "practical-grounding",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "anchor",
      "comforter",
      "stabilizer"
    ],
    "motifs": [
      "care",
      "comfort",
      "boundaries",
      "responsibility"
    ]
  },
  {
    "type": "stance",
    "id": "S119",
    "title": "That One Look",
    "instruction": "Choose one small look, phrase, silence, or gesture and treat it as the clearest evidence of what everything truly means.",
    "categoryId": "worldview-absurdity",
    "subthemeId": "fixation-significance",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "heightened",
    "orientation": "world-focused",
    "coachRoles": [
      "fixator",
      "investigator",
      "meaning-maker"
    ],
    "motifs": [
      "communication",
      "uncertainty",
      "patterns",
      "anxiety"
    ]
  },
  {
    "type": "stance",
    "id": "S120",
    "title": "A Turning Point",
    "instruction": "Treat each emotional shift as proof that this moment will divide everything into before and after.",
    "categoryId": "worldview-absurdity",
    "subthemeId": "pattern-grand-meaning",
    "difficulty": "advanced",
    "intensity": "high",
    "tone": "heightened",
    "orientation": "world-focused",
    "coachRoles": [
      "meaning-maker",
      "hope-keeper",
      "griever"
    ],
    "motifs": [
      "patterns",
      "hope",
      "loss",
      "uncertainty"
    ]
  },
  {
    "type": "drive",
    "id": "D97",
    "title": "Let Me Lean",
    "instruction": "Get someone to carry part of the emotional burden without making you name how heavy it has become.",
    "categoryId": "direct-objectives",
    "subthemeId": "secure-help",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "pursuer",
      "dependent",
      "reassurance-seeker"
    ],
    "motifs": [
      "dependence",
      "care",
      "comfort",
      "vulnerability"
    ]
  },
  {
    "type": "drive",
    "id": "D98",
    "title": "Stay Until I’m Steady",
    "instruction": "Keep someone present until you feel steady enough to face what comes next without them.",
    "categoryId": "direct-objectives",
    "subthemeId": "prevent-departure",
    "difficulty": "beginner",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "retainer",
      "reassurance-seeker",
      "vulnerable"
    ],
    "motifs": [
      "reassurance",
      "fear",
      "resilience",
      "dependence"
    ]
  },
  {
    "type": "drive",
    "id": "D99",
    "title": "Understand the Hurt",
    "instruction": "Make someone acknowledge why their action hurt, not merely agree that it happened.",
    "categoryId": "direct-objectives",
    "subthemeId": "obtain-apology",
    "difficulty": "beginner",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "repairer",
      "wounded",
      "truth-seeker"
    ],
    "motifs": [
      "repair",
      "disappointment",
      "validation",
      "truth"
    ]
  },
  {
    "type": "drive",
    "id": "D100",
    "title": "Tell Me I Did Enough",
    "instruction": "Get someone to reassure you that your effort, choice, or survival was enough.",
    "categoryId": "direct-objectives",
    "subthemeId": "gain-approval",
    "difficulty": "beginner",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "approval-seeker",
      "reassurance-seeker",
      "recognition-seeker"
    ],
    "motifs": [
      "reassurance",
      "validation",
      "worth",
      "resilience"
    ]
  },
  {
    "type": "drive",
    "id": "D101",
    "title": "Start the Hard Part",
    "instruction": "Get someone else to explain, announce, or begin the emotionally difficult part.",
    "categoryId": "direct-objectives",
    "subthemeId": "transfer-task",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "away-from-partner",
    "coachRoles": [
      "delegator",
      "avoider",
      "vulnerable"
    ],
    "motifs": [
      "fear",
      "communication",
      "responsibility",
      "anxiety"
    ]
  },
  {
    "type": "drive",
    "id": "D102",
    "title": "What Aren’t You Saying?",
    "instruction": "Find out what someone is holding back by treating every careful answer as incomplete.",
    "categoryId": "direct-objectives",
    "subthemeId": "extract-information",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "investigator",
      "truth-seeker",
      "reassurance-seeker"
    ],
    "motifs": [
      "truth",
      "uncertainty",
      "anxiety",
      "communication"
    ]
  },
  {
    "type": "drive",
    "id": "D103",
    "title": "Hope with Me",
    "instruction": "Recruit someone into believing that the outcome can still change, even when the evidence is thin.",
    "categoryId": "direct-objectives",
    "subthemeId": "recruit-ally",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "recruiter",
      "hope-keeper",
      "optimist"
    ],
    "motifs": [
      "hope",
      "uncertainty",
      "optimism",
      "courage"
    ]
  },
  {
    "type": "drive",
    "id": "D104",
    "title": "Say the Scary Part",
    "instruction": "Get someone else to name the frightening possibility or vulnerable feeling before you do.",
    "categoryId": "direct-objectives",
    "subthemeId": "induce-risk",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "instigator",
      "interrogator",
      "vulnerable"
    ],
    "motifs": [
      "fear",
      "courage",
      "vulnerability",
      "truth"
    ]
  },
  {
    "type": "drive",
    "id": "D105",
    "title": "See What This Took",
    "instruction": "Make someone recognize the courage, restraint, or emotional labor your choices required.",
    "categoryId": "direct-objectives",
    "subthemeId": "gain-recognition",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "recognition-seeker",
      "shame-bearer",
      "griever"
    ],
    "motifs": [
      "courage",
      "validation",
      "resilience",
      "work"
    ]
  },
  {
    "type": "drive",
    "id": "D106",
    "title": "Choose What Matters More",
    "instruction": "Make someone choose between emotional safety and the outcome they claim to want.",
    "categoryId": "direct-objectives",
    "subthemeId": "force-choice",
    "difficulty": "advanced",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "chooser",
      "tester",
      "boundary-keeper"
    ],
    "motifs": [
      "choice",
      "fear",
      "autonomy",
      "uncertainty"
    ]
  },
  {
    "type": "drive",
    "id": "D107",
    "title": "Stay for the Hard Part",
    "instruction": "Create increasing moments of emotional honesty to test whether someone remains present and supportive.",
    "categoryId": "direct-objectives",
    "subthemeId": "test-loyalty",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "tester",
      "vulnerable",
      "attachment-seeker"
    ],
    "motifs": [
      "trust",
      "courage",
      "reassurance",
      "connection"
    ]
  },
  {
    "type": "drive",
    "id": "D108",
    "title": "Drop the Armor",
    "instruction": "Persuade someone to lower their guard, stop performing strength, or admit what affects them.",
    "categoryId": "direct-objectives",
    "subthemeId": "obtain-surrender",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "pursuer",
      "truth-seeker",
      "comforter"
    ],
    "motifs": [
      "vulnerability",
      "truth",
      "resilience",
      "intimacy"
    ]
  },
  {
    "type": "drive",
    "id": "D109",
    "title": "I Started the Spiral",
    "instruction": "Hide how much your own fear or resentment created the emotional crisis while helping everyone calm it.",
    "categoryId": "secrets-avoidance",
    "subthemeId": "conceal-culpability",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "self-focused",
    "coachRoles": [
      "culprit",
      "peacemaker",
      "avoider"
    ],
    "motifs": [
      "fear",
      "resentment",
      "crisis",
      "guilt"
    ]
  },
  {
    "type": "drive",
    "id": "D110",
    "title": "Not the Real Fear",
    "instruction": "Keep the conversation focused on practical details so no one reaches the fear underneath them.",
    "categoryId": "secrets-avoidance",
    "subthemeId": "avoid-subject",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "away-from-partner",
    "coachRoles": [
      "avoider",
      "secret-keeper",
      "stabilizer"
    ],
    "motifs": [
      "fear",
      "secrecy",
      "anxiety",
      "control"
    ]
  },
  {
    "type": "drive",
    "id": "D111",
    "title": "Let Them Keep Hope",
    "instruction": "Hide discouraging information because you believe hope is the only thing keeping someone able to continue.",
    "categoryId": "secrets-avoidance",
    "subthemeId": "protective-deception",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "secret-keeper",
      "protector",
      "hope-keeper"
    ],
    "motifs": [
      "hope",
      "secrecy",
      "care",
      "disappointment"
    ]
  },
  {
    "type": "drive",
    "id": "D112",
    "title": "Admit You’re Hurt",
    "instruction": "Get someone to admit hurt, fear, or disappointment before you reveal that you feel it too.",
    "categoryId": "secrets-avoidance",
    "subthemeId": "induce-confession",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "interrogator",
      "vulnerable",
      "truth-seeker"
    ],
    "motifs": [
      "truth",
      "disappointment",
      "fear",
      "vulnerability"
    ]
  },
  {
    "type": "drive",
    "id": "D113",
    "title": "A Necessary Heartbreak",
    "instruction": "Describe disappointment, rejection, or loss as the exact experience everyone needed in order to grow.",
    "categoryId": "secrets-avoidance",
    "subthemeId": "reframe-failure",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "world-focused",
    "coachRoles": [
      "spin-doctor",
      "reframer",
      "hope-keeper"
    ],
    "motifs": [
      "disappointment",
      "loss",
      "hope",
      "resilience"
    ]
  },
  {
    "type": "drive",
    "id": "D114",
    "title": "I Can Handle This",
    "instruction": "Perform complete emotional readiness while quietly borrowing coping strategies from every response around you.",
    "categoryId": "secrets-avoidance",
    "subthemeId": "feign-competence",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "self-focused",
    "coachRoles": [
      "impostor",
      "vulnerable",
      "stabilizer"
    ],
    "motifs": [
      "resilience",
      "anxiety",
      "reassurance",
      "control"
    ]
  },
  {
    "type": "drive",
    "id": "D115",
    "title": "Outfeel the Room",
    "instruction": "Answer every fear, sacrifice, or disappointment with one of your own that deserves more attention.",
    "categoryId": "repeatable-behaviors",
    "subthemeId": "competition-loop",
    "difficulty": "beginner",
    "intensity": "high",
    "tone": "heightened",
    "orientation": "against-partner",
    "coachRoles": [
      "competitor",
      "wounded",
      "recognition-seeker"
    ],
    "motifs": [
      "competition",
      "disappointment",
      "validation",
      "resentment"
    ]
  },
  {
    "type": "drive",
    "id": "D116",
    "title": "Hope Keeps Moving",
    "instruction": "Turn every disappointment into a new reason the desired outcome is delayed, redirected, or becoming more meaningful.",
    "categoryId": "repeatable-behaviors",
    "subthemeId": "positive-reframing",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "world-focused",
    "coachRoles": [
      "reframer",
      "hope-keeper",
      "optimist"
    ],
    "motifs": [
      "hope",
      "disappointment",
      "optimism",
      "patterns"
    ]
  },
  {
    "type": "drive",
    "id": "D117",
    "title": "Comfort Everyone Else",
    "instruction": "Meet every painful moment by comforting someone else more intensely while your own distress becomes harder to hide.",
    "categoryId": "repeatable-behaviors",
    "subthemeId": "emotional-contradiction",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "comforter",
      "emotional-buffer",
      "contradictor"
    ],
    "motifs": [
      "comfort",
      "care",
      "grief",
      "anxiety"
    ]
  },
  {
    "type": "drive",
    "id": "D118",
    "title": "Emotional Interest",
    "instruction": "Treat comfort, vulnerability, and forgiveness as investments that must eventually be repaid with equal emotional risk.",
    "categoryId": "repeatable-behaviors",
    "subthemeId": "transactional-framing",
    "difficulty": "advanced",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "negotiator",
      "creditor",
      "tester"
    ],
    "motifs": [
      "comfort",
      "vulnerability",
      "forgiveness",
      "risk"
    ]
  },
  {
    "type": "drive",
    "id": "D119",
    "title": "Ready on My Terms",
    "instruction": "Agree to be honest, hopeful, or vulnerable only in forms that preserve your emotional safety.",
    "categoryId": "repeatable-behaviors",
    "subthemeId": "self-serving-agreement",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "self-focused",
    "coachRoles": [
      "controller",
      "boundary-keeper",
      "vulnerable"
    ],
    "motifs": [
      "autonomy",
      "vulnerability",
      "hope",
      "control"
    ]
  },
  {
    "type": "drive",
    "id": "D120",
    "title": "The Same Ending",
    "instruction": "Use every new emotional detail as evidence that the same feared ending is becoming inevitable.",
    "categoryId": "repeatable-behaviors",
    "subthemeId": "pattern-escalation",
    "difficulty": "beginner",
    "intensity": "high",
    "tone": "heightened",
    "orientation": "world-focused",
    "coachRoles": [
      "escalator",
      "alarmist",
      "meaning-maker"
    ],
    "motifs": [
      "dread",
      "patterns",
      "fear",
      "loss"
    ]
  }
];
  const cards = definitions.map(createCard);
  const stances = cards.filter((card) => card.type === "stance");
  const drives = cards.filter((card) => card.type === "drive");

  return {
    schemaVersion: bible.CARD_SCHEMA_VERSION,
    id: PACK_ID,
    title: "Emotional Pressure",
    version: PACK_VERSION,
    status: "playtest",
    sequence: 5,
    publicationStage: bible.getPack(PACK_ID).publicationStage,
    publicationWave: bible.getPack(PACK_ID).publicationWave,
    editorialReviewVersion: bible.getPack(PACK_ID).editorialReviewVersion,
    remainingPublicationGates: [...bible.getPack(PACK_ID).remainingPublicationGates],
    description: "Insecurity, validation, resentment, hope, grief, shame, and emotional contradiction.",
    stances,
    drives
  };
});
