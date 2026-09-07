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
    throw new Error("Competition & Consequences requires card-bible.js to load first.");
  }

  const PACK_ID = "competition-consequences";
  const DEFAULT_CONTENT_VERSION = "0.16.0";
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
    "id": "S193",
    "type": "stance",
    "title": "Winner Sets the Terms",
    "instruction": "Carry yourself as though success gives you the right to define the next challenge, the reward, and what counts as fair.",
    "categoryId": "status-authority",
    "subthemeId": "command-presence",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "authority",
      "competitor",
      "referee"
    ],
    "motifs": [
      "winning",
      "authority",
      "competition",
      "fairness"
    ]
  },
  {
    "id": "S194",
    "type": "stance",
    "title": "One Loss from Irrelevance",
    "instruction": "Project confidence while treating every setback as proof your standing could vanish. Regain control by raising the importance of the next result.",
    "categoryId": "status-authority",
    "subthemeId": "precarious-authority",
    "difficulty": "advanced",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "self-focused",
    "coachRoles": [
      "insecure-authority",
      "contender",
      "stakes-raiser"
    ],
    "motifs": [
      "status",
      "losing",
      "stakes",
      "fear"
    ]
  },
  {
    "id": "S195",
    "type": "stance",
    "title": "Official Scorer",
    "instruction": "Treat standards, margins, and fine distinctions as your craft. Correct how success is measured before allowing anyone to claim it.",
    "categoryId": "status-authority",
    "subthemeId": "professional-expertise",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "world-focused",
    "coachRoles": [
      "expert",
      "scorekeeper",
      "referee"
    ],
    "motifs": [
      "standards",
      "score",
      "competition",
      "recognition"
    ]
  },
  {
    "id": "S196",
    "type": "stance",
    "title": "I Earn My Seat",
    "instruction": "Behave as though belonging must be justified through performance. Make your competence visible whenever your right to participate feels uncertain.",
    "categoryId": "status-authority",
    "subthemeId": "belonging-legitimacy",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "self-focused",
    "coachRoles": [
      "claimant",
      "contender",
      "outsider"
    ],
    "motifs": [
      "belonging",
      "performance",
      "legitimacy",
      "worth"
    ]
  },
  {
    "id": "S197",
    "type": "stance",
    "title": "I Taught You to Compete",
    "instruction": "Treat every capable move around you as evidence that your coaching worked. Praise the result while claiming seniority over the method.",
    "categoryId": "status-authority",
    "subthemeId": "mentorship-rank",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "mentor",
      "competitor",
      "recognition-seeker"
    ],
    "motifs": [
      "competition",
      "expertise",
      "recognition",
      "hierarchy"
    ]
  },
  {
    "id": "S198",
    "type": "stance",
    "title": "Keeper of the Stakes",
    "instruction": "Remain understated while controlling the reward, penalty, deadline, or condition that determines what winning actually means.",
    "categoryId": "status-authority",
    "subthemeId": "hidden-leverage",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "world-focused",
    "coachRoles": [
      "hidden-power",
      "stakes-raiser",
      "broker"
    ],
    "motifs": [
      "stakes",
      "leverage",
      "reward",
      "penalty",
      "control"
    ]
  },
  {
    "id": "S199",
    "type": "stance",
    "title": "We Learned to Win Together",
    "instruction": "Treat your memories of competing side by side as proof that you still understand one another better than anyone else.",
    "categoryId": "history-relationship",
    "subthemeId": "shared-origins",
    "difficulty": "beginner",
    "intensity": "low",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "familiar",
      "competitor",
      "loyalist"
    ],
    "motifs": [
      "history",
      "competition",
      "connection",
      "teamwork"
    ]
  },
  {
    "id": "S200",
    "type": "stance",
    "title": "You Owe Me the Chance",
    "instruction": "Treat a past sacrifice, concession, or missed opportunity as a debt that should now be repaid with a real advantage.",
    "categoryId": "history-relationship",
    "subthemeId": "debts-favors",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "creditor",
      "dealmaker",
      "competitor"
    ],
    "motifs": [
      "obligation",
      "sacrifice",
      "bargains",
      "advantage"
    ]
  },
  {
    "id": "S201",
    "type": "stance",
    "title": "The One Who Lets You Win",
    "instruction": "Return to the familiar role of making victory easier for others, then let the cost of that generosity become impossible to ignore.",
    "categoryId": "history-relationship",
    "subthemeId": "familiar-roles",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "caretaker",
      "accountability-keeper",
      "emotional-buffer"
    ],
    "motifs": [
      "sacrifice",
      "winning",
      "resentment",
      "care",
      "cost"
    ]
  },
  {
    "id": "S202",
    "type": "stance",
    "title": "Debts on the Scoreboard",
    "instruction": "Treat past wins and losses as debts. Let each new result change who owes the next favor, risk, or concession.",
    "categoryId": "history-relationship",
    "subthemeId": "rivalry-comparison",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "rival",
      "scorekeeper",
      "dealmaker"
    ],
    "motifs": [
      "score",
      "obligation",
      "consequences",
      "bargains"
    ],
    "contentVersion": "0.18.0"
  },
  {
    "id": "S203",
    "type": "stance",
    "title": "Victory Without You",
    "instruction": "Treat the possibility of winning without this rival as strangely hollow. Keep raising the challenge so the relationship survives the result.",
    "categoryId": "history-relationship",
    "subthemeId": "trust-dependence",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "rival",
      "dependent",
      "contender"
    ],
    "motifs": [
      "competition",
      "connection",
      "winning",
      "loss"
    ],
    "contentVersion": "0.18.0"
  },
  {
    "id": "S204",
    "type": "stance",
    "title": "The Unfinished Rematch",
    "instruction": "Treat the present as another round of a contest, bargain, or failure that never reached a satisfying conclusion.",
    "categoryId": "history-relationship",
    "subthemeId": "rupture-unfinished-business",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "wounded",
      "rival",
      "accountability-keeper"
    ],
    "motifs": [
      "history",
      "rivalry",
      "resentment",
      "outcome",
      "consequences"
    ]
  },
  {
    "id": "S205",
    "type": "stance",
    "title": "Winning Looks Natural on You",
    "instruction": "Treat the ease and confidence success seems to give others as both inspiring and threatening, then sharpen your need to outperform them.",
    "categoryId": "emotional-assumptions",
    "subthemeId": "admiration-envy",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "admirer",
      "competitor",
      "contender"
    ],
    "motifs": [
      "admiration",
      "envy",
      "winning",
      "comparison"
    ]
  },
  {
    "id": "S206",
    "type": "stance",
    "title": "Back When I Was Ahead",
    "instruction": "Interpret the present through a time when you felt more successful, admired, or certain of your place.",
    "categoryId": "emotional-assumptions",
    "subthemeId": "identity-nostalgia",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "self-focused",
    "coachRoles": [
      "nostalgist",
      "competitor",
      "approval-seeker"
    ],
    "motifs": [
      "identity",
      "nostalgia",
      "winning",
      "worth"
    ]
  },
  {
    "id": "S207",
    "type": "stance",
    "title": "Second Place Feels Like Disappearing",
    "instruction": "Treat every comparison as a threat to your worth. Respond by proving that you still matter before the moment can move on.",
    "categoryId": "emotional-assumptions",
    "subthemeId": "fear-insecurity",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "self-focused",
    "coachRoles": [
      "vulnerable",
      "reassurance-seeker",
      "contender"
    ],
    "motifs": [
      "fear",
      "comparison",
      "worth",
      "recognition"
    ]
  },
  {
    "id": "S208",
    "type": "stance",
    "title": "Your Risk, My Cost",
    "instruction": "Treat every choice around you as a risk whose consequences may land on you. Press for a voice in decisions you cannot control.",
    "categoryId": "emotional-assumptions",
    "subthemeId": "care-control",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "accountability-keeper",
      "controller",
      "protector"
    ],
    "motifs": [
      "risk",
      "consequences",
      "control",
      "fairness"
    ],
    "contentVersion": "0.18.0"
  },
  {
    "id": "S209",
    "type": "stance",
    "title": "Worth Keeping Around",
    "instruction": "Seek signs that your contribution still earns a place. Increase your effort whenever belonging feels uncertain.",
    "categoryId": "emotional-assumptions",
    "subthemeId": "approval-belonging",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "self-focused",
    "coachRoles": [
      "approval-seeker",
      "contender",
      "loyalist"
    ],
    "motifs": [
      "belonging",
      "validation",
      "teamwork",
      "worth"
    ],
    "contentVersion": "0.18.0"
  },
  {
    "id": "S210",
    "type": "stance",
    "title": "Make the Win Count",
    "instruction": "Treat success as meaningless unless its difficulty, sacrifice, and personal cost are fully recognized.",
    "categoryId": "emotional-assumptions",
    "subthemeId": "pride-validation",
    "difficulty": "beginner",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "self-focused",
    "coachRoles": [
      "recognition-seeker",
      "showoff",
      "accountability-keeper"
    ],
    "motifs": [
      "winning",
      "recognition",
      "sacrifice",
      "cost"
    ]
  },
  {
    "id": "S211",
    "type": "stance",
    "title": "The Winner’s Ceremony",
    "instruction": "Treat every contest, bargain, or decision as incomplete until the proper recognition, ritual, and consequence have occurred.",
    "categoryId": "worldview-absurdity",
    "subthemeId": "ritual-tradition",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "heightened",
    "orientation": "world-focused",
    "coachRoles": [
      "ritualist",
      "referee",
      "traditionalist"
    ],
    "motifs": [
      "ceremony",
      "competition",
      "recognition",
      "consequences"
    ]
  },
  {
    "id": "S212",
    "type": "stance",
    "title": "Everything Is Sudden Death",
    "instruction": "Approach minor choices as elimination rounds where one wrong move ends the entire future.",
    "categoryId": "worldview-absurdity",
    "subthemeId": "crisis-catastrophe",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "heightened",
    "orientation": "world-focused",
    "coachRoles": [
      "alarmist",
      "stakes-raiser",
      "competitor"
    ],
    "motifs": [
      "crisis",
      "stakes",
      "choice",
      "consequences"
    ]
  },
  {
    "id": "S213",
    "type": "stance",
    "title": "A Loss Means Better Stakes",
    "instruction": "Treat every setback as an exciting reason to raise the challenge, improve the story, and try again.",
    "categoryId": "worldview-absurdity",
    "subthemeId": "celebration-optimism",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "heightened",
    "orientation": "world-focused",
    "coachRoles": [
      "optimist",
      "stakes-raiser",
      "reframer"
    ],
    "motifs": [
      "losing",
      "optimism",
      "stakes",
      "resilience"
    ]
  },
  {
    "id": "S214",
    "type": "stance",
    "title": "What Does the Winner Get?",
    "instruction": "Accept competitive claims, but keep asking who benefits, who pays, and what actually changes after the result.",
    "categoryId": "worldview-absurdity",
    "subthemeId": "practical-grounding",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "world-focused",
    "coachRoles": [
      "anchor",
      "consequence-keeper",
      "accountability-keeper"
    ],
    "motifs": [
      "winning",
      "consequences",
      "cost",
      "fairness"
    ]
  },
  {
    "id": "S215",
    "type": "stance",
    "title": "One Point Changes Everything",
    "instruction": "Choose one tiny advantage, score, concession, or technicality and treat it as the decisive fact in every choice.",
    "categoryId": "worldview-absurdity",
    "subthemeId": "fixation-significance",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "flexible",
    "orientation": "world-focused",
    "coachRoles": [
      "fixator",
      "scorekeeper",
      "negotiator"
    ],
    "motifs": [
      "score",
      "advantage",
      "choice",
      "formalities"
    ]
  },
  {
    "id": "S216",
    "type": "stance",
    "title": "The Contest Beneath Everything",
    "instruction": "Interpret each new event as another move in a much larger competition whose true winner may not be visible yet.",
    "categoryId": "worldview-absurdity",
    "subthemeId": "pattern-grand-meaning",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "heightened",
    "orientation": "world-focused",
    "coachRoles": [
      "meaning-maker",
      "strategist",
      "competitor"
    ],
    "motifs": [
      "competition",
      "patterns",
      "strategy",
      "winning"
    ]
  },
  {
    "id": "D193",
    "type": "drive",
    "title": "Lend Me the Edge",
    "instruction": "Get someone to provide the one advantage you need without making the eventual success feel borrowed.",
    "categoryId": "direct-objectives",
    "subthemeId": "secure-help",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "pursuer",
      "competitor",
      "acquirer"
    ],
    "motifs": [
      "advantage",
      "competition",
      "winning",
      "dependence"
    ]
  },
  {
    "id": "D194",
    "type": "drive",
    "title": "Stay for the Result",
    "instruction": "Keep them present until the contest, bargain, or consequence reaches an undeniable outcome.",
    "categoryId": "direct-objectives",
    "subthemeId": "prevent-departure",
    "difficulty": "beginner",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "retainer",
      "accountability-keeper",
      "competitor"
    ],
    "motifs": [
      "outcome",
      "consequences",
      "bargains",
      "stakes"
    ]
  },
  {
    "id": "D195",
    "type": "drive",
    "title": "Admit It Wasn’t Fair",
    "instruction": "Get an apology that acknowledges how the rules, comparison, or outcome worked against you.",
    "categoryId": "direct-objectives",
    "subthemeId": "obtain-apology",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "repairer",
      "referee",
      "wounded"
    ],
    "motifs": [
      "fairness",
      "rules",
      "comparison",
      "resentment"
    ]
  },
  {
    "id": "D196",
    "type": "drive",
    "title": "Call It a Fair Win",
    "instruction": "Get them to recognize the result as deserved rather than accidental, gifted, or manipulated.",
    "categoryId": "direct-objectives",
    "subthemeId": "gain-approval",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "permission-seeker",
      "recognition-seeker",
      "referee"
    ],
    "motifs": [
      "fairness",
      "winning",
      "approval",
      "legitimacy"
    ]
  },
  {
    "id": "D197",
    "type": "drive",
    "title": "Take the Consequence",
    "instruction": "Get them to accept responsibility for carrying out the cost, penalty, or unpleasant next step.",
    "categoryId": "direct-objectives",
    "subthemeId": "transfer-task",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "delegator",
      "accountability-keeper",
      "enforcer"
    ],
    "motifs": [
      "responsibility",
      "consequences",
      "penalty",
      "cost"
    ]
  },
  {
    "id": "D198",
    "type": "drive",
    "title": "Show Me the Score",
    "instruction": "Find out how they measure success, what they stand to gain, and where you currently rank.",
    "categoryId": "direct-objectives",
    "subthemeId": "extract-information",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "investigator",
      "scorekeeper",
      "competitor"
    ],
    "motifs": [
      "score",
      "winning",
      "stakes",
      "comparison"
    ]
  },
  {
    "id": "D199",
    "type": "drive",
    "title": "Enter on My Side",
    "instruction": "Recruit them into your side of a contest or bargain before the stakes become fully clear.",
    "categoryId": "direct-objectives",
    "subthemeId": "recruit-ally",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "recruiter",
      "competitor",
      "dealmaker"
    ],
    "motifs": [
      "competition",
      "bargains",
      "stakes",
      "teamwork"
    ]
  },
  {
    "id": "D200",
    "type": "drive",
    "title": "Raise the Stakes",
    "instruction": "Persuade them to accept a larger risk, cost, or commitment so the outcome will feel decisive.",
    "categoryId": "direct-objectives",
    "subthemeId": "induce-risk",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "instigator",
      "stakes-raiser",
      "dealmaker"
    ],
    "motifs": [
      "stakes",
      "risk",
      "cost",
      "commitment"
    ]
  },
  {
    "id": "D201",
    "type": "drive",
    "title": "Name My Contribution",
    "instruction": "Get them to acknowledge exactly what your effort, sacrifice, or strategy added to the result.",
    "categoryId": "direct-objectives",
    "subthemeId": "gain-recognition",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "recognition-seeker",
      "accountability-keeper",
      "strategist"
    ],
    "motifs": [
      "recognition",
      "sacrifice",
      "strategy",
      "outcome"
    ]
  },
  {
    "id": "D202",
    "type": "drive",
    "title": "Pick the Prize",
    "instruction": "Make them choose which reward, principle, or relationship matters most when not everything can be kept.",
    "categoryId": "direct-objectives",
    "subthemeId": "force-choice",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "chooser",
      "dealmaker",
      "accountability-keeper"
    ],
    "motifs": [
      "choice",
      "reward",
      "tradeoffs",
      "consequences"
    ]
  },
  {
    "id": "D203",
    "type": "drive",
    "title": "Lose Something for Me",
    "instruction": "Create a loyalty test by asking them to accept a real disadvantage on your behalf.",
    "categoryId": "direct-objectives",
    "subthemeId": "test-loyalty",
    "difficulty": "advanced",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "tester",
      "loyalist",
      "stakes-raiser"
    ],
    "motifs": [
      "loyalty",
      "sacrifice",
      "disadvantage",
      "trust"
    ]
  },
  {
    "id": "D204",
    "type": "drive",
    "title": "Concede the Point",
    "instruction": "Get them to release one claim, advantage, or disputed victory without reopening the entire contest.",
    "categoryId": "direct-objectives",
    "subthemeId": "obtain-surrender",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "acquirer",
      "negotiator",
      "referee"
    ],
    "motifs": [
      "concession",
      "advantage",
      "competition",
      "winning"
    ]
  },
  {
    "id": "D205",
    "type": "drive",
    "title": "I Changed the Odds",
    "instruction": "Hide how your own choice tilted the contest, bargain, or consequence while continuing to judge the outcome.",
    "categoryId": "secrets-avoidance",
    "subthemeId": "conceal-culpability",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "self-focused",
    "coachRoles": [
      "culprit",
      "strategist",
      "competitor"
    ],
    "motifs": [
      "deception",
      "competition",
      "bargains",
      "accountability"
    ]
  },
  {
    "id": "D206",
    "type": "drive",
    "title": "Not About Who Lost",
    "instruction": "Keep the conversation focused on rules, effort, or next steps instead of the result that embarrasses you.",
    "categoryId": "secrets-avoidance",
    "subthemeId": "avoid-subject",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "away-from-partner",
    "coachRoles": [
      "avoider",
      "shame-bearer",
      "reframer"
    ],
    "motifs": [
      "losing",
      "shame",
      "rules",
      "outcome"
    ]
  },
  {
    "id": "D207",
    "type": "drive",
    "title": "Let Them Think They Won",
    "instruction": "Protect someone’s confidence by hiding how much you softened the challenge, changed the terms, or withheld an advantage.",
    "categoryId": "secrets-avoidance",
    "subthemeId": "protective-deception",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "protector",
      "decoy",
      "peacemaker"
    ],
    "motifs": [
      "care",
      "deception",
      "winning",
      "advantage"
    ]
  },
  {
    "id": "D208",
    "type": "drive",
    "title": "Admit What You Wanted",
    "instruction": "Maneuver them into revealing which outcome they truly wanted before you explain your own stake.",
    "categoryId": "secrets-avoidance",
    "subthemeId": "induce-confession",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "interrogator",
      "investigator",
      "dealmaker"
    ],
    "motifs": [
      "confession",
      "outcome",
      "stakes",
      "truth"
    ]
  },
  {
    "id": "D209",
    "type": "drive",
    "title": "Investment in the Next Round",
    "instruction": "Describe defeat, penalty, or a bad bargain as a deliberate investment in a larger future win.",
    "categoryId": "secrets-avoidance",
    "subthemeId": "reframe-failure",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "heightened",
    "orientation": "self-focused",
    "coachRoles": [
      "spin-doctor",
      "strategist",
      "optimist"
    ],
    "motifs": [
      "defeat",
      "penalty",
      "bargains",
      "optimism"
    ]
  },
  {
    "id": "D210",
    "type": "drive",
    "title": "I Know How to Win This",
    "instruction": "Perform mastery of the rules, odds, and consequences while improvising every decision.",
    "categoryId": "secrets-avoidance",
    "subthemeId": "feign-competence",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "self-focused",
    "coachRoles": [
      "impostor",
      "competitor",
      "stakes-raiser"
    ],
    "motifs": [
      "rules",
      "odds",
      "consequences",
      "winning"
    ]
  },
  {
    "id": "D211",
    "type": "drive",
    "title": "No Tie Stands",
    "instruction": "Turn every even outcome into a formal rematch with a new rule and a consequence for losing.",
    "categoryId": "repeatable-behaviors",
    "subthemeId": "competition-loop",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "heightened",
    "orientation": "against-partner",
    "coachRoles": [
      "competitor",
      "scorekeeper",
      "referee"
    ],
    "motifs": [
      "competition",
      "score",
      "rules",
      "outcome"
    ],
    "contentVersion": "0.18.0"
  },
  {
    "id": "D212",
    "type": "drive",
    "title": "Every Loss Builds the Comeback",
    "instruction": "Treat each setback as proof that the eventual victory will be more impressive.",
    "categoryId": "repeatable-behaviors",
    "subthemeId": "positive-reframing",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "heightened",
    "orientation": "self-focused",
    "coachRoles": [
      "reframer",
      "optimist",
      "contender"
    ],
    "motifs": [
      "losing",
      "victory",
      "resilience",
      "optimism"
    ]
  },
  {
    "id": "D213",
    "type": "drive",
    "title": "Congratulate Through Your Teeth",
    "instruction": "Perform warm praise while allowing competitive resentment to intensify beneath every compliment.",
    "categoryId": "repeatable-behaviors",
    "subthemeId": "emotional-contradiction",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "contradictor",
      "rival",
      "competitor"
    ],
    "motifs": [
      "resentment",
      "competition",
      "recognition",
      "envy"
    ]
  },
  {
    "id": "D214",
    "type": "drive",
    "title": "Nothing Without Stakes",
    "instruction": "Price every request and decision with a reward, penalty, bargain, or trade.",
    "categoryId": "repeatable-behaviors",
    "subthemeId": "transactional-framing",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "flexible",
    "orientation": "against-partner",
    "coachRoles": [
      "negotiator",
      "dealmaker",
      "broker"
    ],
    "motifs": [
      "reward",
      "penalty",
      "bargains",
      "tradeoffs"
    ]
  },
  {
    "id": "D215",
    "type": "drive",
    "title": "Fair Means I Can Win",
    "instruction": "Agree to any rule or bargain only after interpreting fairness in a way that preserves your advantage.",
    "categoryId": "repeatable-behaviors",
    "subthemeId": "self-serving-agreement",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "self-focused",
    "coachRoles": [
      "controller",
      "referee",
      "competitor"
    ],
    "motifs": [
      "fairness",
      "advantage",
      "rules",
      "winning"
    ]
  },
  {
    "id": "D216",
    "type": "drive",
    "title": "Consequences Compound",
    "instruction": "Make each new choice carry a larger reward, cost, audience, or point of no return.",
    "categoryId": "repeatable-behaviors",
    "subthemeId": "pattern-escalation",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "heightened",
    "orientation": "world-focused",
    "coachRoles": [
      "escalator",
      "stakes-raiser",
      "consequence-keeper"
    ],
    "motifs": [
      "consequences",
      "reward",
      "cost",
      "stakes",
      "outcome"
    ]
  }
];
  const allCards = definitions.map(createCard);
  const stances = allCards.filter((card) => card.type === "stance");
  const drives = allCards.filter((card) => card.type === "drive");

  return {
    schemaVersion: bible.CARD_SCHEMA_VERSION,
    id: PACK_ID,
    title: "Competition & Consequences",
    version: PACK_VERSION,
    status: "playtest",
    sequence: 9,
    publicationStage: bible.getPack(PACK_ID).publicationStage,
    publicationWave: bible.getPack(PACK_ID).publicationWave,
    editorialReviewVersion: bible.getPack(PACK_ID).editorialReviewVersion,
    remainingPublicationGates: [...bible.getPack(PACK_ID).remainingPublicationGates],
    description: "Winning, comparison, bargains, accountability, sacrifice, escalation, and what success costs.",
    stances,
    drives
  };
});
