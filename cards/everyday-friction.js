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
    throw new Error("Everyday Friction requires card-bible.js to load first.");
  }

  const PACK_ID = "everyday-friction";
  const DEFAULT_CONTENT_VERSION = "0.9.0";
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
    "id": "S25",
    "title": "Default Decision-Maker",
    "instruction": "Take charge of every small practical choice, treating speed and efficiency as proof that you should remain in charge.",
    "categoryId": "status-authority",
    "subthemeId": "command-presence",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "authority",
      "controller"
    ],
    "motifs": [
      "authority",
      "convenience",
      "control",
      "work"
    ]
  },
  {
    "type": "stance",
    "id": "S26",
    "title": "Temporary Authority",
    "instruction": "Project brisk confidence through the routine, as though any hesitation would reveal that your authority is only temporary.",
    "categoryId": "status-authority",
    "subthemeId": "precarious-authority",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "self-focused",
    "coachRoles": [
      "insecure-authority",
      "impostor"
    ],
    "motifs": [
      "authority",
      "fear",
      "routine",
      "belonging"
    ]
  },
  {
    "type": "stance",
    "id": "S27",
    "title": "There’s a Right Way",
    "instruction": "Correct how ordinary tasks are done, emphasizing tiny standards that only a true professional would notice.",
    "categoryId": "status-authority",
    "subthemeId": "professional-expertise",
    "difficulty": "beginner",
    "intensity": "low",
    "tone": "grounded",
    "orientation": "world-focused",
    "coachRoles": [
      "expert",
      "fixator"
    ],
    "motifs": [
      "expertise",
      "work",
      "rules",
      "pride"
    ]
  },
  {
    "type": "stance",
    "id": "S28",
    "title": "Regular Around Here",
    "instruction": "Act like a longtime insider by recognizing routines, offering shortcuts, and treating unfamiliar details as recent changes.",
    "categoryId": "status-authority",
    "subthemeId": "belonging-legitimacy",
    "difficulty": "intermediate",
    "intensity": "low",
    "tone": "grounded",
    "orientation": "self-focused",
    "coachRoles": [
      "familiar",
      "outsider"
    ],
    "motifs": [
      "belonging",
      "familiarity",
      "routine",
      "status"
    ]
  },
  {
    "type": "stance",
    "id": "S29",
    "title": "Let Me Show You",
    "instruction": "Turn each simple task into a lesson. Demonstrate, supervise, and correct as though experience has made you indispensable.",
    "categoryId": "status-authority",
    "subthemeId": "mentorship-rank",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "mentor",
      "expert"
    ],
    "motifs": [
      "expertise",
      "history",
      "work",
      "status"
    ]
  },
  {
    "type": "stance",
    "id": "S30",
    "title": "Keeper of the Details",
    "instruction": "Act outwardly helpful while controlling the small information, supplies, or access everyone needs to proceed.",
    "categoryId": "status-authority",
    "subthemeId": "hidden-leverage",
    "difficulty": "advanced",
    "intensity": "low",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "hidden-power",
      "controller"
    ],
    "motifs": [
      "control",
      "resources",
      "secrecy",
      "work"
    ]
  },
  {
    "type": "stance",
    "id": "S31",
    "title": "Same Old Routine",
    "instruction": "Use familiar shorthand and old habits immediately, as though past routines still govern the present.",
    "categoryId": "history-relationship",
    "subthemeId": "shared-origins",
    "difficulty": "beginner",
    "intensity": "low",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "familiar",
      "nostalgist"
    ],
    "motifs": [
      "familiarity",
      "history",
      "routine",
      "belonging"
    ]
  },
  {
    "type": "stance",
    "id": "S32",
    "title": "One More Favor",
    "instruction": "Treat every small request as part of a long-running balance sheet of favors, inconveniences, and repayments.",
    "categoryId": "history-relationship",
    "subthemeId": "debts-favors",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "creditor",
      "negotiator"
    ],
    "motifs": [
      "obligation",
      "fairness",
      "history",
      "work"
    ]
  },
  {
    "type": "stance",
    "id": "S33",
    "title": "The Designated Reminder",
    "instruction": "Keep track of what everyone was supposed to remember. Supply reminders before being asked and treat forgetfulness as your familiar burden.",
    "categoryId": "history-relationship",
    "subthemeId": "familiar-roles",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "caretaker",
      "creditor"
    ],
    "motifs": [
      "responsibility",
      "routine",
      "obligation",
      "anger"
    ]
  },
  {
    "type": "stance",
    "id": "S34",
    "title": "Keeping Score",
    "instruction": "Treat arrival times, effort, memory, and sacrifice as a running score you intend to win.",
    "categoryId": "history-relationship",
    "subthemeId": "rivalry-comparison",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "competitor",
      "rival"
    ],
    "motifs": [
      "competition",
      "fairness",
      "time",
      "pride"
    ]
  },
  {
    "type": "stance",
    "id": "S35",
    "title": "You Know the System",
    "instruction": "Use another person’s knowledge of the routine while pretending you could manage perfectly well alone.",
    "categoryId": "history-relationship",
    "subthemeId": "trust-dependence",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "dependent",
      "outsider"
    ],
    "motifs": [
      "dependence",
      "trust",
      "routine",
      "pride"
    ]
  },
  {
    "type": "stance",
    "id": "S36",
    "title": "Still About Last Time",
    "instruction": "Treat each minor inconvenience as confirmation of an older grievance and the same recurring problem.",
    "categoryId": "history-relationship",
    "subthemeId": "rupture-unfinished-business",
    "difficulty": "advanced",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "away-from-partner",
    "coachRoles": [
      "wounded",
      "meaning-maker"
    ],
    "motifs": [
      "history",
      "anger",
      "patterns",
      "repair"
    ]
  },
  {
    "type": "stance",
    "id": "S37",
    "title": "Must Be Nice",
    "instruction": "Treat another person’s ease with ordinary life as both inspiring and unfair. Copy their shortcuts while dismissing the advantage.",
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
      "fairness",
      "routine"
    ]
  },
  {
    "type": "stance",
    "id": "S38",
    "title": "We Used to Be Easy",
    "instruction": "Treat every practical difficulty as evidence that life, work, or this relationship used to be simpler.",
    "categoryId": "emotional-assumptions",
    "subthemeId": "identity-nostalgia",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "self-focused",
    "coachRoles": [
      "nostalgist",
      "wounded"
    ],
    "motifs": [
      "history",
      "identity",
      "loss",
      "routine"
    ]
  },
  {
    "type": "stance",
    "id": "S39",
    "title": "Don’t Be Difficult",
    "instruction": "Treat every request, correction, or small inconvenience as a warning that you are becoming too much trouble.",
    "categoryId": "emotional-assumptions",
    "subthemeId": "fear-insecurity",
    "difficulty": "beginner",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "self-focused",
    "coachRoles": [
      "vulnerable",
      "approval-seeker"
    ],
    "motifs": [
      "fear",
      "belonging",
      "approval",
      "convenience"
    ]
  },
  {
    "type": "stance",
    "id": "S40",
    "title": "I Packed for You",
    "instruction": "Take care of practical needs before anyone asks, then resist choices that make your preparation unnecessary.",
    "categoryId": "emotional-assumptions",
    "subthemeId": "care-control",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "protector",
      "controller"
    ],
    "motifs": [
      "care",
      "control",
      "resources",
      "responsibility"
    ]
  },
  {
    "type": "stance",
    "id": "S41",
    "title": "Useful Enough to Stay",
    "instruction": "Make yourself constantly useful and read each response as evidence of whether you still belong.",
    "categoryId": "emotional-assumptions",
    "subthemeId": "approval-belonging",
    "difficulty": "beginner",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "approval-seeker",
      "caretaker"
    ],
    "motifs": [
      "belonging",
      "approval",
      "work",
      "fear"
    ]
  },
  {
    "type": "stance",
    "id": "S42",
    "title": "Notice the Effort",
    "instruction": "Make your invisible labor visible through pointed reminders, strategic sighs, and opportunities for appreciation.",
    "categoryId": "emotional-assumptions",
    "subthemeId": "pride-validation",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "showoff",
      "creditor"
    ],
    "motifs": [
      "recognition",
      "validation",
      "work",
      "obligation"
    ]
  },
  {
    "type": "stance",
    "id": "S43",
    "title": "Don’t Break the Routine",
    "instruction": "Protect a familiar routine as though changing one step would invite chaos into everything else.",
    "categoryId": "worldview-absurdity",
    "subthemeId": "ritual-tradition",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "heightened",
    "orientation": "world-focused",
    "coachRoles": [
      "ritualist",
      "alarmist"
    ],
    "motifs": [
      "routine",
      "rules",
      "crisis",
      "control"
    ]
  },
  {
    "type": "stance",
    "id": "S44",
    "title": "The Contingency Person",
    "instruction": "Meet every ordinary problem with a backup plan, emergency supply, or warning about what could happen next.",
    "categoryId": "worldview-absurdity",
    "subthemeId": "crisis-catastrophe",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "heightened",
    "orientation": "world-focused",
    "coachRoles": [
      "alarmist",
      "protector"
    ],
    "motifs": [
      "crisis",
      "resources",
      "maintenance",
      "fear"
    ]
  },
  {
    "type": "stance",
    "id": "S45",
    "title": "Productive Little Disaster",
    "instruction": "Treat every mistake or delay as a delightful chance to improve the plan, bond, or discover something better.",
    "categoryId": "worldview-absurdity",
    "subthemeId": "celebration-optimism",
    "difficulty": "beginner",
    "intensity": "low",
    "tone": "heightened",
    "orientation": "world-focused",
    "coachRoles": [
      "optimist",
      "reframer"
    ],
    "motifs": [
      "optimism",
      "celebration",
      "time",
      "repair"
    ]
  },
  {
    "type": "stance",
    "id": "S46",
    "title": "Who’s Cleaning This Up?",
    "instruction": "Treat every idea according to the work, cost, cleanup, and follow-through it will create.",
    "categoryId": "worldview-absurdity",
    "subthemeId": "practical-grounding",
    "difficulty": "beginner",
    "intensity": "low",
    "tone": "flexible",
    "orientation": "world-focused",
    "coachRoles": [
      "anchor",
      "stabilizer"
    ],
    "motifs": [
      "work",
      "mess",
      "responsibility",
      "resources"
    ]
  },
  {
    "type": "stance",
    "id": "S47",
    "title": "One Tiny Imperfection",
    "instruction": "Choose one tiny imperfection and let it steadily outweigh every larger concern.",
    "categoryId": "worldview-absurdity",
    "subthemeId": "fixation-significance",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "flexible",
    "orientation": "world-focused",
    "coachRoles": [
      "fixator",
      "controller"
    ],
    "motifs": [
      "mess",
      "control",
      "patterns",
      "pride"
    ]
  },
  {
    "type": "stance",
    "id": "S48",
    "title": "Nothing Is Ever Simple",
    "instruction": "Interpret each new complication as proof that ordinary tasks are secretly designed to become impossible.",
    "categoryId": "worldview-absurdity",
    "subthemeId": "pattern-grand-meaning",
    "difficulty": "advanced",
    "intensity": "medium",
    "tone": "heightened",
    "orientation": "world-focused",
    "coachRoles": [
      "meaning-maker",
      "alarmist"
    ],
    "motifs": [
      "patterns",
      "work",
      "crisis",
      "absurdity"
    ]
  },
  {
    "type": "drive",
    "id": "D25",
    "title": "Could You Just…",
    "instruction": "Turn a difficult task into tiny favors until the help quietly becomes most of the task.",
    "categoryId": "direct-objectives",
    "subthemeId": "secure-help",
    "difficulty": "beginner",
    "intensity": "low",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "pursuer",
      "delegator"
    ],
    "motifs": [
      "work",
      "dependence",
      "obligation",
      "convenience"
    ]
  },
  {
    "type": "drive",
    "id": "D26",
    "title": "One Last Thing",
    "instruction": "Keep someone present by discovering one more small task, question, or favor whenever departure seems near.",
    "categoryId": "direct-objectives",
    "subthemeId": "prevent-departure",
    "difficulty": "beginner",
    "intensity": "low",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "retainer",
      "pursuer"
    ],
    "motifs": [
      "time",
      "obligation",
      "dependence",
      "work"
    ]
  },
  {
    "type": "drive",
    "id": "D27",
    "title": "You Could at Least…",
    "instruction": "Make the inconvenience visible enough that an apology becomes the easiest way forward.",
    "categoryId": "direct-objectives",
    "subthemeId": "obtain-apology",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "repairer",
      "negotiator"
    ],
    "motifs": [
      "repair",
      "fairness",
      "etiquette",
      "recognition"
    ]
  },
  {
    "type": "drive",
    "id": "D28",
    "title": "Just Say Yes",
    "instruction": "Get a quick approval before anyone has time to examine the practical consequences.",
    "categoryId": "direct-objectives",
    "subthemeId": "gain-approval",
    "difficulty": "beginner",
    "intensity": "low",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "permission-seeker",
      "pursuer"
    ],
    "motifs": [
      "approval",
      "time",
      "risk",
      "convenience"
    ]
  },
  {
    "type": "drive",
    "id": "D29",
    "title": "Your Turn",
    "instruction": "Get someone to accept responsibility for a task you believe should never have been yours.",
    "categoryId": "direct-objectives",
    "subthemeId": "transfer-task",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "delegator",
      "creditor"
    ],
    "motifs": [
      "responsibility",
      "fairness",
      "obligation",
      "work"
    ]
  },
  {
    "type": "drive",
    "id": "D30",
    "title": "What Was the Plan?",
    "instruction": "Find out what was promised, scheduled, or changed without revealing that you lost track.",
    "categoryId": "direct-objectives",
    "subthemeId": "extract-information",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "away-from-partner",
    "coachRoles": [
      "investigator",
      "impostor"
    ],
    "motifs": [
      "truth",
      "time",
      "communication",
      "secrecy"
    ]
  },
  {
    "type": "drive",
    "id": "D31",
    "title": "Back Me Up",
    "instruction": "Recruit someone to support your version of how an ordinary responsibility should be handled.",
    "categoryId": "direct-objectives",
    "subthemeId": "recruit-ally",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "recruiter",
      "controller"
    ],
    "motifs": [
      "responsibility",
      "trust",
      "rules",
      "control"
    ]
  },
  {
    "type": "drive",
    "id": "D32",
    "title": "Try It First",
    "instruction": "Get someone else to test the shortcut, substitute, or questionable fix before you rely on it.",
    "categoryId": "direct-objectives",
    "subthemeId": "induce-risk",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "flexible",
    "orientation": "against-partner",
    "coachRoles": [
      "instigator",
      "avoider"
    ],
    "motifs": [
      "risk",
      "maintenance",
      "convenience",
      "trust"
    ]
  },
  {
    "type": "drive",
    "id": "D33",
    "title": "Count What I Did",
    "instruction": "Make someone acknowledge the practical work, time, or inconvenience you contributed.",
    "categoryId": "direct-objectives",
    "subthemeId": "gain-recognition",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "recognition-seeker",
      "creditor"
    ],
    "motifs": [
      "recognition",
      "work",
      "time",
      "validation"
    ]
  },
  {
    "type": "drive",
    "id": "D34",
    "title": "Pick a Priority",
    "instruction": "Make someone choose between two ordinary obligations that both supposedly cannot wait.",
    "categoryId": "direct-objectives",
    "subthemeId": "force-choice",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "chooser",
      "controller"
    ],
    "motifs": [
      "choice",
      "time",
      "obligation",
      "responsibility"
    ]
  },
  {
    "type": "drive",
    "id": "D35",
    "title": "Move It for Me",
    "instruction": "Get someone to rearrange an ordinary commitment as proof that your relationship takes priority.",
    "categoryId": "direct-objectives",
    "subthemeId": "test-loyalty",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "tester",
      "chooser"
    ],
    "motifs": [
      "loyalty",
      "time",
      "choice",
      "belonging"
    ]
  },
  {
    "type": "drive",
    "id": "D36",
    "title": "Hand It Over",
    "instruction": "Persuade someone to give up control of a task, object, or decision you believe is being mishandled.",
    "categoryId": "direct-objectives",
    "subthemeId": "obtain-surrender",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "acquirer",
      "controller"
    ],
    "motifs": [
      "control",
      "trust",
      "resources",
      "work"
    ]
  },
  {
    "type": "drive",
    "id": "D37",
    "title": "Put It Back Quietly",
    "instruction": "Return something you misplaced, used, or damaged without revealing why it needed restoring.",
    "categoryId": "secrets-avoidance",
    "subthemeId": "conceal-culpability",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "away-from-partner",
    "coachRoles": [
      "culprit",
      "secret-keeper"
    ],
    "motifs": [
      "guilt",
      "secrecy",
      "resources",
      "repair"
    ]
  },
  {
    "type": "drive",
    "id": "D38",
    "title": "Talk Around the Mess",
    "instruction": "Keep attention on minor details so no one addresses the larger responsibility you avoided.",
    "categoryId": "secrets-avoidance",
    "subthemeId": "avoid-subject",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "away-from-partner",
    "coachRoles": [
      "avoider",
      "culprit"
    ],
    "motifs": [
      "mess",
      "responsibility",
      "secrecy",
      "guilt"
    ]
  },
  {
    "type": "drive",
    "id": "D39",
    "title": "Spare Them the Hassle",
    "instruction": "Hide a practical problem because you believe handling it alone is kinder than involving anyone else.",
    "categoryId": "secrets-avoidance",
    "subthemeId": "protective-deception",
    "difficulty": "advanced",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "protector",
      "secret-keeper"
    ],
    "motifs": [
      "care",
      "secrecy",
      "responsibility",
      "work"
    ]
  },
  {
    "type": "drive",
    "id": "D40",
    "title": "Who Changed It?",
    "instruction": "Ask innocent questions until someone admits altering the plan, schedule, arrangement, or shared space.",
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
      "communication",
      "space",
      "guilt"
    ]
  },
  {
    "type": "drive",
    "id": "D41",
    "title": "Basically Finished",
    "instruction": "Describe incomplete, late, or improvised work as a thoughtful version of completion.",
    "categoryId": "secrets-avoidance",
    "subthemeId": "reframe-failure",
    "difficulty": "beginner",
    "intensity": "low",
    "tone": "heightened",
    "orientation": "away-from-partner",
    "coachRoles": [
      "spin-doctor",
      "reframer"
    ],
    "motifs": [
      "work",
      "time",
      "approval",
      "convenience"
    ]
  },
  {
    "type": "drive",
    "id": "D42",
    "title": "I’ve Done This Before",
    "instruction": "Perform calm familiarity with the task while learning how it works from every new clue.",
    "categoryId": "secrets-avoidance",
    "subthemeId": "feign-competence",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "flexible",
    "orientation": "self-focused",
    "coachRoles": [
      "impostor",
      "expert"
    ],
    "motifs": [
      "expertise",
      "fear",
      "work",
      "belonging"
    ]
  },
  {
    "type": "drive",
    "id": "D43",
    "title": "Outdo the Effort",
    "instruction": "Answer every favor, chore, or sacrifice with a bigger one that restores your lead.",
    "categoryId": "repeatable-behaviors",
    "subthemeId": "competition-loop",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "flexible",
    "orientation": "against-partner",
    "coachRoles": [
      "competitor",
      "creditor"
    ],
    "motifs": [
      "competition",
      "work",
      "obligation",
      "pride"
    ]
  },
  {
    "type": "drive",
    "id": "D44",
    "title": "Efficiency Win",
    "instruction": "Celebrate each inconvenience as proof that a faster, cheaper, or smarter routine can now be invented.",
    "categoryId": "repeatable-behaviors",
    "subthemeId": "positive-reframing",
    "difficulty": "beginner",
    "intensity": "low",
    "tone": "heightened",
    "orientation": "world-focused",
    "coachRoles": [
      "optimist",
      "reframer"
    ],
    "motifs": [
      "optimism",
      "convenience",
      "routine",
      "resources"
    ]
  },
  {
    "type": "drive",
    "id": "D45",
    "title": "No Trouble at All",
    "instruction": "Remain gracious and accommodating while making your growing inconvenience impossible to miss.",
    "categoryId": "repeatable-behaviors",
    "subthemeId": "emotional-contradiction",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "heightened",
    "orientation": "toward-partner",
    "coachRoles": [
      "contradictor",
      "approval-seeker"
    ],
    "motifs": [
      "etiquette",
      "anger",
      "approval",
      "convenience"
    ]
  },
  {
    "type": "drive",
    "id": "D46",
    "title": "Fair Exchange",
    "instruction": "Price every favor in time, effort, inconvenience, or future obligation.",
    "categoryId": "repeatable-behaviors",
    "subthemeId": "transactional-framing",
    "difficulty": "intermediate",
    "intensity": "low",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "negotiator",
      "creditor"
    ],
    "motifs": [
      "fairness",
      "time",
      "obligation",
      "work"
    ]
  },
  {
    "type": "drive",
    "id": "D47",
    "title": "Technically, Yes",
    "instruction": "Comply with every agreement in the narrowest possible way while insisting you honored it completely.",
    "categoryId": "repeatable-behaviors",
    "subthemeId": "self-serving-agreement",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "controller",
      "negotiator"
    ],
    "motifs": [
      "rules",
      "control",
      "obligation",
      "communication"
    ]
  },
  {
    "type": "drive",
    "id": "D48",
    "title": "One Thing Leads to Another",
    "instruction": "Use each small problem to justify solving a broader, more disruptive problem.",
    "categoryId": "repeatable-behaviors",
    "subthemeId": "pattern-escalation",
    "difficulty": "advanced",
    "intensity": "high",
    "tone": "heightened",
    "orientation": "world-focused",
    "coachRoles": [
      "escalator",
      "meaning-maker"
    ],
    "motifs": [
      "patterns",
      "crisis",
      "maintenance",
      "control"
    ]
  }
];
  const cards = definitions.map(createCard);
  const stances = cards.filter((card) => card.type === "stance");
  const drives = cards.filter((card) => card.type === "drive");

  return {
    schemaVersion: bible.CARD_SCHEMA_VERSION,
    id: PACK_ID,
    title: "Everyday Friction",
    version: PACK_VERSION,
    status: "playtest",
    sequence: 2,
    publicationStage: bible.getPack(PACK_ID).publicationStage,
    publicationWave: bible.getPack(PACK_ID).publicationWave,
    editorialReviewVersion: bible.getPack(PACK_ID).editorialReviewVersion,
    remainingPublicationGates: [...bible.getPack(PACK_ID).remainingPublicationGates],
    description: "Ordinary inconvenience, shared responsibilities, routine strain, practical etiquette, and small stakes treated with serious character commitment.",
    stances,
    drives
  };
});
