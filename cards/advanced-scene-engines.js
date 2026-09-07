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
    throw new Error("Advanced Scene Engines requires card-bible.js to load first.");
  }

  const PACK_ID = "advanced-scene-engines";
  const CONTENT_VERSION = "0.17.0";
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
    "id": "S217",
    "type": "stance",
    "title": "Command with an Escape Hatch",
    "instruction": "Carry yourself as though every decision settles the matter, while preserving one ambiguity that lets you later reverse what the decision meant.",
    "categoryId": "status-authority",
    "subthemeId": "command-presence",
    "difficulty": "advanced",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "world-focused",
    "coachRoles": [
      "authority",
      "scene-architect",
      "reversal-maker"
    ],
    "motifs": [
      "authority",
      "ambiguity",
      "reversal",
      "structure"
    ]
  },
  {
    "id": "S218",
    "type": "stance",
    "title": "One Detail Could Undo Me",
    "instruction": "Project total control while treating one recurring detail as the thing that could expose how little authority you truly possess.",
    "categoryId": "status-authority",
    "subthemeId": "precarious-authority",
    "difficulty": "advanced",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "self-focused",
    "coachRoles": [
      "insecure-authority",
      "delayed-revealer",
      "fixator"
    ],
    "motifs": [
      "status",
      "fear",
      "callback",
      "subtext"
    ]
  },
  {
    "id": "S219",
    "type": "stance",
    "title": "The Expert Blind Spot",
    "instruction": "Perform mastery everywhere except one specific subject. Deflect it at first, reinterpret it later, and let each return increase the pressure.",
    "categoryId": "status-authority",
    "subthemeId": "professional-expertise",
    "difficulty": "advanced",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "self-focused",
    "coachRoles": [
      "expert",
      "double-binder",
      "callback-builder"
    ],
    "motifs": [
      "expertise",
      "contradiction",
      "callback",
      "recontextualization"
    ]
  },
  {
    "id": "S220",
    "type": "stance",
    "title": "Insider with the Wrong Memories",
    "instruction": "Act like an unquestioned insider while offering details that almost fit. Treat each contradiction as proof the group, system, or relationship changed.",
    "categoryId": "status-authority",
    "subthemeId": "belonging-legitimacy",
    "difficulty": "advanced",
    "intensity": "medium",
    "tone": "flexible",
    "orientation": "self-focused",
    "coachRoles": [
      "outsider",
      "impostor",
      "double-binder"
    ],
    "motifs": [
      "belonging",
      "contradiction",
      "memory",
      "recontextualization"
    ]
  },
  {
    "id": "S221",
    "type": "stance",
    "title": "The Student Rewrites the Lesson",
    "instruction": "Treat any correction, surprise, or improvement as evidence your teaching succeeded. Claim each reversal as the lesson you intended all along.",
    "categoryId": "status-authority",
    "subthemeId": "mentorship-rank",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "mentor",
      "reversal-maker",
      "reframer"
    ],
    "motifs": [
      "expertise",
      "hierarchy",
      "reversal",
      "recontextualization"
    ]
  },
  {
    "id": "S222",
    "type": "stance",
    "title": "The Favor Not Yet Named",
    "instruction": "Behave as though you hold decisive leverage, but delay naming it until another explanation has taken root.",
    "categoryId": "status-authority",
    "subthemeId": "hidden-leverage",
    "difficulty": "advanced",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "hidden-power",
      "delayed-revealer",
      "broker"
    ],
    "motifs": [
      "leverage",
      "delay",
      "subtext",
      "turning-point"
    ]
  },
  {
    "id": "S223",
    "type": "stance",
    "title": "Same Memory, Different Meaning",
    "instruction": "Return to one shared memory as comfort, then evidence, then accusation, changing its meaning without abandoning the facts.",
    "categoryId": "history-relationship",
    "subthemeId": "shared-origins",
    "difficulty": "advanced",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "familiar",
      "memory-keeper",
      "callback-builder"
    ],
    "motifs": [
      "history",
      "memory",
      "callback",
      "recontextualization"
    ]
  },
  {
    "id": "S224",
    "type": "stance",
    "title": "The Debt Changes Hands",
    "instruction": "Treat every favor as shifting who owes whom. Recalculate the balance whenever help is accepted, refused, or remembered.",
    "categoryId": "history-relationship",
    "subthemeId": "debts-favors",
    "difficulty": "advanced",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "creditor",
      "negotiator",
      "reversal-maker"
    ],
    "motifs": [
      "obligation",
      "bargains",
      "reversal",
      "fairness"
    ]
  },
  {
    "id": "S225",
    "type": "stance",
    "title": "We Keep Switching Places",
    "instruction": "Return to a familiar relationship pattern, then reverse who performs each role whenever the scene reaches similar pressure.",
    "categoryId": "history-relationship",
    "subthemeId": "familiar-roles",
    "difficulty": "advanced",
    "intensity": "medium",
    "tone": "flexible",
    "orientation": "toward-partner",
    "coachRoles": [
      "familiar",
      "reversal-maker",
      "scene-architect"
    ],
    "motifs": [
      "familiarity",
      "reversal",
      "symmetry",
      "repetition"
    ]
  },
  {
    "id": "S226",
    "type": "stance",
    "title": "Become What You Compete With",
    "instruction": "Turn comparison into imitation: adopt whatever quality seems powerful, allowing each borrowed trait to change the basis of the rivalry.",
    "categoryId": "history-relationship",
    "subthemeId": "rivalry-comparison",
    "difficulty": "advanced",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "rival",
      "competitor",
      "double-binder"
    ],
    "motifs": [
      "rivalry",
      "comparison",
      "identity",
      "transformation"
    ]
  },
  {
    "id": "S227",
    "type": "stance",
    "title": "Trust with a Trapdoor",
    "instruction": "Use one person as your anchor while preserving a private condition that could reverse your trust when a recurring detail returns.",
    "categoryId": "history-relationship",
    "subthemeId": "trust-dependence",
    "difficulty": "advanced",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "dependent",
      "tester",
      "delayed-revealer"
    ],
    "motifs": [
      "trust",
      "dependence",
      "double-bind",
      "callback"
    ]
  },
  {
    "id": "S228",
    "type": "stance",
    "title": "The Incident Keeps Changing",
    "instruction": "Carry an unnamed past rupture whose meaning shifts with each new detail, while never letting its emotional weight diminish.",
    "categoryId": "history-relationship",
    "subthemeId": "rupture-unfinished-business",
    "difficulty": "advanced",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "wounded",
      "memory-keeper",
      "reframer"
    ],
    "motifs": [
      "history",
      "memory",
      "recontextualization",
      "resentment"
    ]
  },
  {
    "id": "S229",
    "type": "stance",
    "title": "Every Compliment Raises the Bar",
    "instruction": "Treat each compliment as sincere admiration and a new standard you must immediately surpass.",
    "categoryId": "emotional-assumptions",
    "subthemeId": "admiration-envy",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "admirer",
      "competitor",
      "double-binder"
    ],
    "motifs": [
      "admiration",
      "envy",
      "contradiction",
      "escalation"
    ]
  },
  {
    "id": "S230",
    "type": "stance",
    "title": "My Past Self Is Watching",
    "instruction": "Behave as though an earlier version of yourself is judging every choice. Alternate between honoring that identity and deliberately betraying it.",
    "categoryId": "emotional-assumptions",
    "subthemeId": "identity-nostalgia",
    "difficulty": "advanced",
    "intensity": "medium",
    "tone": "flexible",
    "orientation": "self-focused",
    "coachRoles": [
      "nostalgist",
      "scene-architect",
      "contradictor"
    ],
    "motifs": [
      "identity",
      "nostalgia",
      "contradiction",
      "perspective"
    ]
  },
  {
    "id": "S231",
    "type": "stance",
    "title": "Relief Is Suspicious",
    "instruction": "Treat every reassuring development as evidence that the real threat has merely changed shape.",
    "categoryId": "emotional-assumptions",
    "subthemeId": "fear-insecurity",
    "difficulty": "advanced",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "self-focused",
    "coachRoles": [
      "vulnerable",
      "alarmist",
      "reversal-maker"
    ],
    "motifs": [
      "fear",
      "reassurance",
      "reversal",
      "uncertainty"
    ]
  },
  {
    "id": "S232",
    "type": "stance",
    "title": "Rescue Me by Needing Me",
    "instruction": "Take protective control, then let each consequence reveal how much your confidence depends on remaining necessary.",
    "categoryId": "emotional-assumptions",
    "subthemeId": "care-control",
    "difficulty": "advanced",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "protector",
      "dependent",
      "double-binder"
    ],
    "motifs": [
      "care",
      "control",
      "dependence",
      "contradiction"
    ]
  },
  {
    "id": "S233",
    "type": "stance",
    "title": "Belonging on Changing Terms",
    "instruction": "Seek acceptance by adapting quickly, then let each adaptation create a new version of yourself you must defend.",
    "categoryId": "emotional-assumptions",
    "subthemeId": "approval-belonging",
    "difficulty": "advanced",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "self-focused",
    "coachRoles": [
      "approval-seeker",
      "outsider",
      "reversal-maker"
    ],
    "motifs": [
      "approval",
      "belonging",
      "identity",
      "transformation"
    ]
  },
  {
    "id": "S234",
    "type": "stance",
    "title": "Humility with Evidence",
    "instruction": "Perform modesty while planting small facts that can later assemble themselves into undeniable proof of your importance.",
    "categoryId": "emotional-assumptions",
    "subthemeId": "pride-validation",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "self-focused",
    "coachRoles": [
      "showoff",
      "delayed-revealer",
      "callback-builder"
    ],
    "motifs": [
      "pride",
      "recognition",
      "foreshadowing",
      "callback"
    ]
  },
  {
    "id": "S235",
    "type": "stance",
    "title": "The Ritual Explains Itself Later",
    "instruction": "Treat one unexplained recurring action as essential. Allow its meaning to change each time it returns.",
    "categoryId": "worldview-absurdity",
    "subthemeId": "ritual-tradition",
    "difficulty": "advanced",
    "intensity": "low",
    "tone": "absurd",
    "orientation": "world-focused",
    "coachRoles": [
      "ritualist",
      "callback-builder",
      "meaning-maker"
    ],
    "motifs": [
      "ritual",
      "repetition",
      "callback",
      "recontextualization"
    ]
  },
  {
    "id": "S236",
    "type": "stance",
    "title": "The Warning Was Already Here",
    "instruction": "Choose one early detail as the warning sign, then let every later development reveal a larger version of the same disaster.",
    "categoryId": "worldview-absurdity",
    "subthemeId": "crisis-catastrophe",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "heightened",
    "orientation": "world-focused",
    "coachRoles": [
      "alarmist",
      "callback-builder",
      "pattern-weaver"
    ],
    "motifs": [
      "crisis",
      "foreshadowing",
      "callback",
      "escalation"
    ]
  },
  {
    "id": "S237",
    "type": "stance",
    "title": "Exactly the Victory I Meant",
    "instruction": "Celebrate every reversal as though it secretly delivers the outcome you wanted, while preserving enthusiasm for all earlier outcomes.",
    "categoryId": "worldview-absurdity",
    "subthemeId": "celebration-optimism",
    "difficulty": "advanced",
    "intensity": "medium",
    "tone": "heightened",
    "orientation": "world-focused",
    "coachRoles": [
      "optimist",
      "reversal-maker",
      "reframer"
    ],
    "motifs": [
      "celebration",
      "optimism",
      "reversal",
      "recontextualization"
    ]
  },
  {
    "id": "S238",
    "type": "stance",
    "title": "Track the Cost That Returns",
    "instruction": "Accept every twist, but keep returning to one practical consequence whose importance grows as the scene becomes more complicated.",
    "categoryId": "worldview-absurdity",
    "subthemeId": "practical-grounding",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "flexible",
    "orientation": "world-focused",
    "coachRoles": [
      "anchor",
      "consequence-keeper",
      "callback-builder"
    ],
    "motifs": [
      "consequences",
      "callback",
      "cost",
      "structure"
    ]
  },
  {
    "id": "S239",
    "type": "stance",
    "title": "The Object Changes Meaning",
    "instruction": "Choose one ordinary detail and reinterpret it as gift, threat, evidence, or symbol as the scene evolves.",
    "categoryId": "worldview-absurdity",
    "subthemeId": "fixation-significance",
    "difficulty": "advanced",
    "intensity": "medium",
    "tone": "flexible",
    "orientation": "world-focused",
    "coachRoles": [
      "fixator",
      "reframer",
      "callback-builder"
    ],
    "motifs": [
      "symbols",
      "recontextualization",
      "callback",
      "patterns"
    ]
  },
  {
    "id": "S240",
    "type": "stance",
    "title": "Everything Rhymes Eventually",
    "instruction": "Treat repeated words, actions, and reversals as echoes of one larger pattern whose meaning you keep revising.",
    "categoryId": "worldview-absurdity",
    "subthemeId": "pattern-grand-meaning",
    "difficulty": "advanced",
    "intensity": "high",
    "tone": "heightened",
    "orientation": "world-focused",
    "coachRoles": [
      "meaning-maker",
      "pattern-weaver",
      "scene-architect"
    ],
    "motifs": [
      "patterns",
      "echo",
      "repetition",
      "structure",
      "recontextualization"
    ]
  },
  {
    "id": "D217",
    "type": "drive",
    "title": "Make Help Define Us",
    "instruction": "Get their help, then use how it is offered to redefine what the relationship means.",
    "categoryId": "direct-objectives",
    "subthemeId": "secure-help",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "pursuer",
      "attachment-seeker",
      "scene-architect"
    ],
    "motifs": [
      "care",
      "connection",
      "recontextualization",
      "subtext"
    ]
  },
  {
    "id": "D218",
    "type": "drive",
    "title": "One More Unresolved Reason",
    "instruction": "Keep them present by introducing a new unresolved reason whenever the previous reason is answered.",
    "categoryId": "direct-objectives",
    "subthemeId": "prevent-departure",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "retainer",
      "pattern-weaver",
      "escalator"
    ],
    "motifs": [
      "abandonment",
      "delay",
      "repetition",
      "structure"
    ]
  },
  {
    "id": "D219",
    "type": "drive",
    "title": "Change What the Apology Is For",
    "instruction": "Get an apology, then reveal that the original offense was only the first layer of what needs repair.",
    "categoryId": "direct-objectives",
    "subthemeId": "obtain-apology",
    "difficulty": "advanced",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "repairer",
      "delayed-revealer",
      "callback-builder"
    ],
    "motifs": [
      "repair",
      "delayed-reveal",
      "recontextualization",
      "truth"
    ]
  },
  {
    "id": "D220",
    "type": "drive",
    "title": "Approve the Harmless Version",
    "instruction": "Get approval for a harmless version of your plan, then gradually reveal what that approval now commits them to.",
    "categoryId": "direct-objectives",
    "subthemeId": "gain-approval",
    "difficulty": "advanced",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "permission-seeker",
      "strategist",
      "delayed-revealer"
    ],
    "motifs": [
      "permission",
      "delay",
      "commitment",
      "consequences"
    ]
  },
  {
    "id": "D221",
    "type": "drive",
    "title": "The Handoff Already Happened",
    "instruction": "Get them to accept responsibility by returning to earlier offers until the task seems to have been assigned all along.",
    "categoryId": "direct-objectives",
    "subthemeId": "transfer-task",
    "difficulty": "advanced",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "delegator",
      "callback-builder",
      "spin-doctor"
    ],
    "motifs": [
      "responsibility",
      "callback",
      "recontextualization",
      "work"
    ]
  },
  {
    "id": "D222",
    "type": "drive",
    "title": "Ask Around the Missing Detail",
    "instruction": "Find one hidden fact by asking about everything surrounding it and never naming it directly.",
    "categoryId": "direct-objectives",
    "subthemeId": "extract-information",
    "difficulty": "advanced",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "investigator",
      "truth-seeker",
      "delayed-revealer"
    ],
    "motifs": [
      "information",
      "investigation",
      "subtext",
      "mystery"
    ]
  },
  {
    "id": "D223",
    "type": "drive",
    "title": "Recruit Them Twice",
    "instruction": "Recruit them to your side, then reveal that the side, goal, or conflict is not what it first appeared to be.",
    "categoryId": "direct-objectives",
    "subthemeId": "recruit-ally",
    "difficulty": "advanced",
    "intensity": "high",
    "tone": "flexible",
    "orientation": "toward-partner",
    "coachRoles": [
      "recruiter",
      "reversal-maker",
      "strategist"
    ],
    "motifs": [
      "recruitment",
      "allegiance",
      "reversal",
      "recontextualization"
    ]
  },
  {
    "id": "D224",
    "type": "drive",
    "title": "Make the Second Step First",
    "instruction": "Get them to accept a small consequence that makes the larger risky action feel already underway.",
    "categoryId": "direct-objectives",
    "subthemeId": "induce-risk",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "instigator",
      "scene-architect",
      "stakes-raiser"
    ],
    "motifs": [
      "risk",
      "commitment",
      "consequences",
      "turning-point"
    ]
  },
  {
    "id": "D225",
    "type": "drive",
    "title": "Let the Callback Claim Credit",
    "instruction": "Get recognition by returning to an early overlooked contribution when its importance becomes undeniable.",
    "categoryId": "direct-objectives",
    "subthemeId": "gain-recognition",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "self-focused",
    "coachRoles": [
      "recognition-seeker",
      "callback-builder",
      "scene-architect"
    ],
    "motifs": [
      "recognition",
      "callback",
      "history",
      "foreshadowing"
    ]
  },
  {
    "id": "D226",
    "type": "drive",
    "title": "Make the Choice Rewrite the Past",
    "instruction": "Make them choose between options whose consequences reinterpret an earlier promise, refusal, or agreement.",
    "categoryId": "direct-objectives",
    "subthemeId": "force-choice",
    "difficulty": "advanced",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "chooser",
      "reversal-maker",
      "accountability-keeper"
    ],
    "motifs": [
      "choice",
      "promise",
      "reversal",
      "consequences"
    ]
  },
  {
    "id": "D227",
    "type": "drive",
    "title": "Make the Test Test You",
    "instruction": "Create a commitment test that gradually exposes what you are unwilling to risk yourself.",
    "categoryId": "direct-objectives",
    "subthemeId": "test-loyalty",
    "difficulty": "advanced",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "tester",
      "double-binder",
      "vulnerable"
    ],
    "motifs": [
      "loyalty",
      "double-bind",
      "risk",
      "vulnerability"
    ]
  },
  {
    "id": "D228",
    "type": "drive",
    "title": "Win the Smaller Concession",
    "instruction": "Get one small surrender, then use its logic to make the larger claim harder to defend.",
    "categoryId": "direct-objectives",
    "subthemeId": "obtain-surrender",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "acquirer",
      "negotiator",
      "pattern-weaver"
    ],
    "motifs": [
      "concession",
      "escalation",
      "leverage",
      "patterns"
    ]
  },
  {
    "id": "D229",
    "type": "drive",
    "title": "Hide Inside the Callback",
    "instruction": "Use an early harmless detail as the explanation for each new consequence, keeping your own role outside the pattern.",
    "categoryId": "secrets-avoidance",
    "subthemeId": "conceal-culpability",
    "difficulty": "advanced",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "away-from-partner",
    "coachRoles": [
      "culprit",
      "callback-builder",
      "spin-doctor"
    ],
    "motifs": [
      "guilt",
      "callback",
      "misdirection",
      "recontextualization"
    ]
  },
  {
    "id": "D230",
    "type": "drive",
    "title": "Answer the Previous Question",
    "instruction": "Redirect every dangerous question by sincerely answering an earlier, safer version of it.",
    "categoryId": "secrets-avoidance",
    "subthemeId": "avoid-subject",
    "difficulty": "advanced",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "away-from-partner",
    "coachRoles": [
      "avoider",
      "scene-architect",
      "reframer"
    ],
    "motifs": [
      "misdirection",
      "delay",
      "subtext",
      "repetition"
    ]
  },
  {
    "id": "D231",
    "type": "drive",
    "title": "Reveal the Truth in Layers",
    "instruction": "Protect someone by disclosing the truth in stages, changing what each earlier statement appears to mean.",
    "categoryId": "secrets-avoidance",
    "subthemeId": "protective-deception",
    "difficulty": "advanced",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "secret-keeper",
      "protector",
      "delayed-revealer"
    ],
    "motifs": [
      "deception",
      "truth",
      "delayed-reveal",
      "recontextualization"
    ]
  },
  {
    "id": "D232",
    "type": "drive",
    "title": "Confess Around Them",
    "instruction": "Use partial admissions to make a reciprocal confession feel like the only missing piece.",
    "categoryId": "secrets-avoidance",
    "subthemeId": "induce-confession",
    "difficulty": "advanced",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "interrogator",
      "double-binder",
      "truth-seeker"
    ],
    "motifs": [
      "confession",
      "truth",
      "subtext",
      "double-bind"
    ]
  },
  {
    "id": "D233",
    "type": "drive",
    "title": "It Was Foreshadowed",
    "instruction": "Turn the failure into a planned turning point by returning to earlier details that now appear to predict it.",
    "categoryId": "secrets-avoidance",
    "subthemeId": "reframe-failure",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "heightened",
    "orientation": "self-focused",
    "coachRoles": [
      "spin-doctor",
      "callback-builder",
      "reframer"
    ],
    "motifs": [
      "outcome",
      "foreshadowing",
      "recontextualization",
      "callback"
    ]
  },
  {
    "id": "D234",
    "type": "drive",
    "title": "Be Right in Retrospect",
    "instruction": "Perform certainty by reinterpreting every surprise as something your earlier words were obviously predicting.",
    "categoryId": "secrets-avoidance",
    "subthemeId": "feign-competence",
    "difficulty": "advanced",
    "intensity": "medium",
    "tone": "flexible",
    "orientation": "self-focused",
    "coachRoles": [
      "impostor",
      "reframer",
      "reversal-maker"
    ],
    "motifs": [
      "expertise",
      "recontextualization",
      "foreshadowing",
      "deception"
    ]
  },
  {
    "id": "D235",
    "type": "drive",
    "title": "Reverse the Score",
    "instruction": "Turn each apparent loss into a new category of victory, then invite comparison on those changing terms.",
    "categoryId": "repeatable-behaviors",
    "subthemeId": "competition-loop",
    "difficulty": "advanced",
    "intensity": "medium",
    "tone": "heightened",
    "orientation": "against-partner",
    "coachRoles": [
      "competitor",
      "reversal-maker",
      "reframer"
    ],
    "motifs": [
      "competition",
      "score",
      "reversal",
      "recontextualization"
    ]
  },
  {
    "id": "D236",
    "type": "drive",
    "title": "Return to the First Hope",
    "instruction": "Return to an early hope after every setback, expanding its meaning until the whole scene seems to fulfill it.",
    "categoryId": "repeatable-behaviors",
    "subthemeId": "positive-reframing",
    "difficulty": "advanced",
    "intensity": "medium",
    "tone": "heightened",
    "orientation": "world-focused",
    "coachRoles": [
      "optimist",
      "callback-builder",
      "pattern-weaver"
    ],
    "motifs": [
      "hope",
      "callback",
      "repetition",
      "optimism"
    ]
  },
  {
    "id": "D237",
    "type": "drive",
    "title": "Warmth with a Countdown",
    "instruction": "Perform increasing warmth with increasingly final language, as though every act of care might also be a goodbye.",
    "categoryId": "repeatable-behaviors",
    "subthemeId": "emotional-contradiction",
    "difficulty": "advanced",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "contradictor",
      "delayed-revealer",
      "emotional-buffer"
    ],
    "motifs": [
      "affection",
      "contradiction",
      "delay",
      "loss"
    ]
  },
  {
    "id": "D238",
    "type": "drive",
    "title": "Everything Has Two Prices",
    "instruction": "Price every offer twice: once in practical terms and again through an emotional cost that grows when the offer returns.",
    "categoryId": "repeatable-behaviors",
    "subthemeId": "transactional-framing",
    "difficulty": "advanced",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "negotiator",
      "callback-builder",
      "double-binder"
    ],
    "motifs": [
      "tradeoffs",
      "cost",
      "callback",
      "double-bind"
    ]
  },
  {
    "id": "D239",
    "type": "drive",
    "title": "Agree to the Exact Words",
    "instruction": "Agree to the exact wording, then use later callbacks to narrow what those words can obligate you to do.",
    "categoryId": "repeatable-behaviors",
    "subthemeId": "self-serving-agreement",
    "difficulty": "advanced",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "self-focused",
    "coachRoles": [
      "controller",
      "callback-builder",
      "interpreter"
    ],
    "motifs": [
      "commitment",
      "callback",
      "loopholes",
      "recontextualization"
    ]
  },
  {
    "id": "D240",
    "type": "drive",
    "title": "Bring Back Everything",
    "instruction": "Return early details in altered forms until the scene feels like it has been building toward one unavoidable consequence.",
    "categoryId": "repeatable-behaviors",
    "subthemeId": "pattern-escalation",
    "difficulty": "advanced",
    "intensity": "high",
    "tone": "heightened",
    "orientation": "world-focused",
    "coachRoles": [
      "escalator",
      "pattern-weaver",
      "scene-architect"
    ],
    "motifs": [
      "callback",
      "repetition",
      "structure",
      "consequences",
      "turning-point"
    ]
  }
];
  const allCards = definitions.map(createCard);
  const stances = allCards.filter((card) => card.type === "stance");
  const drives = allCards.filter((card) => card.type === "drive");

  return {
    schemaVersion: bible.CARD_SCHEMA_VERSION,
    id: PACK_ID,
    title: "Advanced Scene Engines",
    version: CONTENT_VERSION,
    status: "playtest",
    sequence: 10,
    description: "Layered contradictions, delayed reveals, reversals, callbacks, recontextualization, and veteran-level scene pressure.",
    stances,
    drives
  };
});
