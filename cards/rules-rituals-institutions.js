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
    throw new Error("Rules, Rituals & Institutions requires card-bible.js to load first.");
  }

  const PACK_ID = "rules-rituals-institutions";
  const DEFAULT_CONTENT_VERSION = "0.15.0";
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
    "id": "S169",
    "type": "stance",
    "title": "Order of Business",
    "instruction": "Carry yourself as the person who decides what happens in what order. Redirect every interruption into the approved sequence.",
    "categoryId": "status-authority",
    "subthemeId": "command-presence",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "world-focused",
    "coachRoles": [
      "administrator",
      "authority",
      "compliance-keeper"
    ],
    "motifs": [
      "authority",
      "process",
      "procedure",
      "control"
    ]
  },
  {
    "id": "S170",
    "type": "stance",
    "title": "Authority on Paper",
    "instruction": "Project firm control through titles and procedure, then tighten the formalities whenever anyone tests whether your position has real support.",
    "categoryId": "status-authority",
    "subthemeId": "precarious-authority",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "self-focused",
    "coachRoles": [
      "insecure-authority",
      "administrator",
      "compliance-keeper"
    ],
    "motifs": [
      "legitimacy",
      "bureaucracy",
      "procedure",
      "uncertainty"
    ]
  },
  {
    "id": "S171",
    "type": "stance",
    "title": "Certified Correct",
    "instruction": "Treat forms, standards, and exact wording as a technical craft. Correct shortcuts before discussing whether the result actually works.",
    "categoryId": "status-authority",
    "subthemeId": "professional-expertise",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "world-focused",
    "coachRoles": [
      "expert",
      "compliance-keeper",
      "interpreter"
    ],
    "motifs": [
      "standards",
      "documentation",
      "expertise",
      "rules"
    ]
  },
  {
    "id": "S172",
    "type": "stance",
    "title": "Customs Interpreter",
    "instruction": "Act as the translator of unwritten customs. Correct breaches, explain exceptions, and make your usefulness proof that you belong.",
    "categoryId": "status-authority",
    "subthemeId": "belonging-legitimacy",
    "difficulty": "beginner",
    "intensity": "low",
    "tone": "grounded",
    "orientation": "self-focused",
    "coachRoles": [
      "interpreter",
      "traditionalist",
      "outsider"
    ],
    "motifs": [
      "custom",
      "belonging",
      "exceptions",
      "etiquette"
    ],
    "contentVersion": "0.18.0"
  },
  {
    "id": "S173",
    "type": "stance",
    "title": "I Learned It the Hard Way",
    "instruction": "Treat experience with the system as seniority. Teach its shortcuts, warn against its traps, and remind everyone that your mistakes came first.",
    "categoryId": "status-authority",
    "subthemeId": "mentorship-rank",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "mentor",
      "archivist",
      "interpreter"
    ],
    "motifs": [
      "history",
      "process",
      "expertise",
      "hierarchy"
    ]
  },
  {
    "id": "S174",
    "type": "stance",
    "title": "The Necessary Signature",
    "instruction": "Remain helpful while controlling the one approval, record, key, or ceremonial step that allows anything to move forward.",
    "categoryId": "status-authority",
    "subthemeId": "hidden-leverage",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "world-focused",
    "coachRoles": [
      "hidden-power",
      "gatekeeper",
      "administrator"
    ],
    "motifs": [
      "access",
      "documentation",
      "permission",
      "leverage"
    ]
  },
  {
    "id": "S175",
    "type": "stance",
    "title": "We Know the Old Rules",
    "instruction": "Use an old custom you learned together as the deepest proof of connection, even when the present situation has changed.",
    "categoryId": "history-relationship",
    "subthemeId": "shared-origins",
    "difficulty": "beginner",
    "intensity": "low",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "familiar",
      "traditionalist",
      "memory-keeper"
    ],
    "motifs": [
      "tradition",
      "history",
      "connection",
      "custom"
    ]
  },
  {
    "id": "S176",
    "type": "stance",
    "title": "I Made the Exception",
    "instruction": "Treat every exception you once arranged as an unpaid obligation. Casually expect cooperation whenever the old favor becomes relevant.",
    "categoryId": "history-relationship",
    "subthemeId": "debts-favors",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "creditor",
      "exception-seeker",
      "broker"
    ],
    "motifs": [
      "exceptions",
      "obligation",
      "precedent",
      "influence"
    ]
  },
  {
    "id": "S177",
    "type": "stance",
    "title": "The Designated Translator",
    "instruction": "Return automatically to explaining rules, smoothing procedures, and answering questions before anyone asks.",
    "categoryId": "history-relationship",
    "subthemeId": "familiar-roles",
    "difficulty": "beginner",
    "intensity": "low",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "interpreter",
      "caretaker",
      "administrator"
    ],
    "motifs": [
      "communication",
      "process",
      "responsibility",
      "bureaucracy"
    ]
  },
  {
    "id": "S178",
    "type": "stance",
    "title": "Better at the System",
    "instruction": "Treat every rule, shortcut, and correction as a chance to prove you understand the system better than anyone else.",
    "categoryId": "history-relationship",
    "subthemeId": "rivalry-comparison",
    "difficulty": "advanced",
    "intensity": "medium",
    "tone": "heightened",
    "orientation": "against-partner",
    "coachRoles": [
      "rival",
      "compliance-keeper",
      "exception-seeker"
    ],
    "motifs": [
      "competition",
      "rules",
      "compliance",
      "loopholes"
    ]
  },
  {
    "id": "S179",
    "type": "stance",
    "title": "My Sponsor Inside",
    "instruction": "Treat one person as your sponsor inside the system. Seek their introductions and approval while resisting the identity their support assigns you.",
    "categoryId": "history-relationship",
    "subthemeId": "trust-dependence",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "dependent",
      "approval-seeker",
      "outsider"
    ],
    "motifs": [
      "dependence",
      "access",
      "approval",
      "identity"
    ],
    "contentVersion": "0.18.0"
  },
  {
    "id": "S180",
    "type": "stance",
    "title": "The Rule You Broke",
    "instruction": "Treat a past breach of rule or custom as unfinished business. Let every present exception reopen the question of what was damaged.",
    "categoryId": "history-relationship",
    "subthemeId": "rupture-unfinished-business",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "wounded",
      "compliance-keeper",
      "memory-keeper"
    ],
    "motifs": [
      "rules",
      "resentment",
      "history",
      "repair"
    ]
  },
  {
    "id": "S181",
    "type": "stance",
    "title": "Effortless Insider",
    "instruction": "Treat someone’s effortless movement through systems and customs as both impressive and threatening, then prove you can master every rule without help.",
    "categoryId": "emotional-assumptions",
    "subthemeId": "admiration-envy",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "admirer",
      "outsider",
      "competitor"
    ],
    "motifs": [
      "admiration",
      "envy",
      "belonging",
      "custom"
    ]
  },
  {
    "id": "S182",
    "type": "stance",
    "title": "When I Believed in the Rules",
    "instruction": "Perform the version of yourself who once trusted the institution, tradition, or process. Use its old language even as your confidence slips.",
    "categoryId": "emotional-assumptions",
    "subthemeId": "identity-nostalgia",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "self-focused",
    "coachRoles": [
      "nostalgist",
      "loyalist",
      "archivist"
    ],
    "motifs": [
      "identity",
      "trust",
      "institution",
      "history"
    ]
  },
  {
    "id": "S183",
    "type": "stance",
    "title": "There Must Be a Correct Form",
    "instruction": "Treat every unclear instruction as a test you may be failing. Seek safety through stricter compliance, documentation, and permission.",
    "categoryId": "emotional-assumptions",
    "subthemeId": "fear-insecurity",
    "difficulty": "beginner",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "self-focused",
    "coachRoles": [
      "vulnerable",
      "compliance-keeper",
      "reassurance-seeker"
    ],
    "motifs": [
      "fear",
      "compliance",
      "documentation",
      "permission"
    ]
  },
  {
    "id": "S184",
    "type": "stance",
    "title": "For Everyone’s Protection",
    "instruction": "Protect people by creating procedures for them. Turn concern into checklists, permissions, required steps, and increasingly narrow exceptions.",
    "categoryId": "emotional-assumptions",
    "subthemeId": "care-control",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "protector",
      "administrator",
      "controller"
    ],
    "motifs": [
      "care",
      "control",
      "safety",
      "procedure"
    ]
  },
  {
    "id": "S185",
    "type": "stance",
    "title": "Properly Initiated",
    "instruction": "Treat correct participation in the ritual as proof you deserve to belong. Watch for cues, copy the form, and overcommit to every step.",
    "categoryId": "emotional-assumptions",
    "subthemeId": "approval-belonging",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "heightened",
    "orientation": "self-focused",
    "coachRoles": [
      "approval-seeker",
      "outsider",
      "ritualist"
    ],
    "motifs": [
      "belonging",
      "ritual",
      "approval",
      "custom"
    ]
  },
  {
    "id": "S186",
    "type": "stance",
    "title": "Ask Me About the Process",
    "instruction": "Create opportunities to display your knowledge of obscure rules, customs, and procedures. Correct small details before anyone can praise the outcome.",
    "categoryId": "emotional-assumptions",
    "subthemeId": "pride-validation",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "self-focused",
    "coachRoles": [
      "showoff",
      "expert",
      "compliance-keeper"
    ],
    "motifs": [
      "pride",
      "recognition",
      "expertise",
      "process"
    ]
  },
  {
    "id": "S187",
    "type": "stance",
    "title": "Tradition Outranks Explanation",
    "instruction": "Treat inherited customs as meaningful because they have been repeated. Preserve each step and resist every request to explain why it still matters.",
    "categoryId": "worldview-absurdity",
    "subthemeId": "ritual-tradition",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "heightened",
    "orientation": "world-focused",
    "coachRoles": [
      "traditionalist",
      "ritualist",
      "archivist"
    ],
    "motifs": [
      "tradition",
      "ritual",
      "custom",
      "symbols"
    ]
  },
  {
    "id": "S188",
    "type": "stance",
    "title": "One Missing Step",
    "instruction": "Treat the smallest skipped step as the beginning of systemic collapse. Escalate safeguards, documentation, and oversight before allowing anything to continue.",
    "categoryId": "worldview-absurdity",
    "subthemeId": "crisis-catastrophe",
    "difficulty": "advanced",
    "intensity": "high",
    "tone": "heightened",
    "orientation": "world-focused",
    "coachRoles": [
      "alarmist",
      "compliance-keeper",
      "administrator"
    ],
    "motifs": [
      "crisis",
      "process",
      "oversight",
      "safety"
    ]
  },
  {
    "id": "S189",
    "type": "stance",
    "title": "The System Works",
    "instruction": "Celebrate every queue, delay, review, and formal approval as proof that a dependable system is protecting everyone from chaos.",
    "categoryId": "worldview-absurdity",
    "subthemeId": "celebration-optimism",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "heightened",
    "orientation": "world-focused",
    "coachRoles": [
      "optimist",
      "administrator",
      "loyalist"
    ],
    "motifs": [
      "celebration",
      "bureaucracy",
      "safety",
      "process"
    ]
  },
  {
    "id": "S190",
    "type": "stance",
    "title": "Fine, What’s the Process?",
    "instruction": "Accept any strange custom or institution as real, then focus on deadlines, permissions, responsibilities, and what happens when someone misses a step.",
    "categoryId": "worldview-absurdity",
    "subthemeId": "practical-grounding",
    "difficulty": "beginner",
    "intensity": "low",
    "tone": "grounded",
    "orientation": "world-focused",
    "coachRoles": [
      "anchor",
      "interpreter",
      "consequence-keeper"
    ],
    "motifs": [
      "custom",
      "institution",
      "consequences",
      "responsibility"
    ]
  },
  {
    "id": "S191",
    "type": "stance",
    "title": "The Detail That Makes It Official",
    "instruction": "Choose one tiny procedural detail—wording, order, timing, seating, or a mark—and treat it as the only source of legitimacy.",
    "categoryId": "worldview-absurdity",
    "subthemeId": "fixation-significance",
    "difficulty": "advanced",
    "intensity": "medium",
    "tone": "heightened",
    "orientation": "world-focused",
    "coachRoles": [
      "fixator",
      "compliance-keeper",
      "ritualist"
    ],
    "motifs": [
      "procedure",
      "legitimacy",
      "symbols",
      "formalities"
    ]
  },
  {
    "id": "S192",
    "type": "stance",
    "title": "Everything Is Policy",
    "instruction": "Treat every personal choice as evidence of a larger system. Connect exceptions, habits, and coincidences until they become institutional doctrine.",
    "categoryId": "worldview-absurdity",
    "subthemeId": "pattern-grand-meaning",
    "difficulty": "advanced",
    "intensity": "high",
    "tone": "heightened",
    "orientation": "world-focused",
    "coachRoles": [
      "meaning-maker",
      "administrator",
      "strategist"
    ],
    "motifs": [
      "patterns",
      "policy",
      "institution",
      "precedent"
    ]
  },
  {
    "id": "D169",
    "type": "drive",
    "title": "Co-Sign This",
    "instruction": "Get someone to help by making them an official participant who shares responsibility for the outcome.",
    "categoryId": "direct-objectives",
    "subthemeId": "secure-help",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "recruiter",
      "pursuer",
      "administrator"
    ],
    "motifs": [
      "responsibility",
      "documentation",
      "recruitment",
      "obligation"
    ]
  },
  {
    "id": "D170",
    "type": "drive",
    "title": "Close It Properly",
    "instruction": "Keep them present until both of you complete the ritual that formally ends this role, meeting, or relationship.",
    "categoryId": "direct-objectives",
    "subthemeId": "prevent-departure",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "retainer",
      "ritualist",
      "reconciler"
    ],
    "motifs": [
      "ritual",
      "process",
      "connection",
      "turning-point"
    ],
    "contentVersion": "0.18.0"
  },
  {
    "id": "D171",
    "type": "drive",
    "title": "Apologize Properly",
    "instruction": "Get someone to deliver the apology in the form, order, and setting you consider valid.",
    "categoryId": "direct-objectives",
    "subthemeId": "obtain-apology",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "repairer",
      "compliance-keeper",
      "ritualist"
    ],
    "motifs": [
      "forgiveness",
      "ritual",
      "procedure",
      "repair"
    ]
  },
  {
    "id": "D172",
    "type": "drive",
    "title": "Get It on the Record",
    "instruction": "Get formal approval, endorsement, or acknowledgment before anyone can quietly revise their position.",
    "categoryId": "direct-objectives",
    "subthemeId": "gain-approval",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "permission-seeker",
      "recognition-seeker",
      "archivist"
    ],
    "motifs": [
      "approval",
      "documentation",
      "record",
      "permission"
    ]
  },
  {
    "id": "D173",
    "type": "drive",
    "title": "Assigned by Procedure",
    "instruction": "Get someone to accept an unwanted responsibility by proving that the rules, rotation, or tradition make it theirs.",
    "categoryId": "direct-objectives",
    "subthemeId": "transfer-task",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "delegator",
      "administrator",
      "compliance-keeper"
    ],
    "motifs": [
      "responsibility",
      "rules",
      "tradition",
      "fairness"
    ]
  },
  {
    "id": "D174",
    "type": "drive",
    "title": "Complete the Record",
    "instruction": "Get someone to fill the missing gaps in an account without revealing which answer matters most to you.",
    "categoryId": "direct-objectives",
    "subthemeId": "extract-information",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "investigator",
      "archivist",
      "truth-seeker"
    ],
    "motifs": [
      "documentation",
      "information",
      "record",
      "truth"
    ]
  },
  {
    "id": "D175",
    "type": "drive",
    "title": "Make It Official",
    "instruction": "Recruit someone by giving them a title, role, or ceremonial duty that makes participation feel binding.",
    "categoryId": "direct-objectives",
    "subthemeId": "recruit-ally",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "recruiter",
      "ritualist",
      "administrator"
    ],
    "motifs": [
      "recruitment",
      "obligation",
      "ritual",
      "status"
    ]
  },
  {
    "id": "D176",
    "type": "drive",
    "title": "Request an Exception",
    "instruction": "Get someone to bend one rule first so you can treat the decision as a precedent.",
    "categoryId": "direct-objectives",
    "subthemeId": "induce-risk",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "instigator",
      "exception-seeker",
      "strategist"
    ],
    "motifs": [
      "risk",
      "exceptions",
      "precedent",
      "rules"
    ]
  },
  {
    "id": "D177",
    "type": "drive",
    "title": "Record My Contribution",
    "instruction": "Get your contribution formally recognized, recorded, or repeated where it cannot be quietly forgotten.",
    "categoryId": "direct-objectives",
    "subthemeId": "gain-recognition",
    "difficulty": "beginner",
    "intensity": "low",
    "tone": "grounded",
    "orientation": "self-focused",
    "coachRoles": [
      "recognition-seeker",
      "archivist",
      "showoff"
    ],
    "motifs": [
      "recognition",
      "documentation",
      "record",
      "pride"
    ],
    "contentVersion": "0.18.0"
  },
  {
    "id": "D178",
    "type": "drive",
    "title": "Choose the Precedent",
    "instruction": "Make someone choose which rule, custom, or prior decision will govern what happens now.",
    "categoryId": "direct-objectives",
    "subthemeId": "force-choice",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "chooser",
      "interpreter",
      "compliance-keeper"
    ],
    "motifs": [
      "choice",
      "precedent",
      "rules",
      "custom"
    ]
  },
  {
    "id": "D179",
    "type": "drive",
    "title": "Interpret the Custom",
    "instruction": "Ask them to apply an ambiguous custom where the wording is unclear. Treat their interpretation as the real test of loyalty.",
    "categoryId": "direct-objectives",
    "subthemeId": "test-loyalty",
    "difficulty": "beginner",
    "intensity": "high",
    "tone": "heightened",
    "orientation": "against-partner",
    "coachRoles": [
      "tester",
      "interpreter",
      "loyalist"
    ],
    "motifs": [
      "loyalty",
      "custom",
      "ambiguity",
      "tradition"
    ],
    "contentVersion": "0.18.0"
  },
  {
    "id": "D180",
    "type": "drive",
    "title": "Withdraw the Objection",
    "instruction": "Persuade someone to drop a complaint, challenge, or special request and accept the official process.",
    "categoryId": "direct-objectives",
    "subthemeId": "obtain-surrender",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "acquirer",
      "enforcer",
      "administrator"
    ],
    "motifs": [
      "compliance",
      "process",
      "authority",
      "autonomy"
    ]
  },
  {
    "id": "D181",
    "type": "drive",
    "title": "Lost in the Process",
    "instruction": "Hide your role in the problem by distributing blame across steps, policies, and unnamed procedures.",
    "categoryId": "secrets-avoidance",
    "subthemeId": "conceal-culpability",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "away-from-partner",
    "coachRoles": [
      "culprit",
      "spin-doctor",
      "administrator"
    ],
    "motifs": [
      "guilt",
      "bureaucracy",
      "policy",
      "misdirection"
    ]
  },
  {
    "id": "D182",
    "type": "drive",
    "title": "Outside the Scope",
    "instruction": "Redirect personal or dangerous questions by declaring them irrelevant, premature, or assigned to another process.",
    "categoryId": "secrets-avoidance",
    "subthemeId": "avoid-subject",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "away-from-partner",
    "coachRoles": [
      "avoider",
      "administrator",
      "decoy"
    ],
    "motifs": [
      "misdirection",
      "bureaucracy",
      "process",
      "secrecy"
    ]
  },
  {
    "id": "D183",
    "type": "drive",
    "title": "The Approved Explanation",
    "instruction": "Protect someone or the group by maintaining a simplified account that everyone can safely repeat.",
    "categoryId": "secrets-avoidance",
    "subthemeId": "protective-deception",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "protector",
      "spin-doctor",
      "archivist"
    ],
    "motifs": [
      "deception",
      "safety",
      "documentation",
      "reputation"
    ]
  },
  {
    "id": "D184",
    "type": "drive",
    "title": "For the Record",
    "instruction": "Get someone to state exactly what they did, knew, or authorized before you reveal your own involvement.",
    "categoryId": "secrets-avoidance",
    "subthemeId": "induce-confession",
    "difficulty": "intermediate",
    "intensity": "high",
    "tone": "grounded",
    "orientation": "toward-partner",
    "coachRoles": [
      "interrogator",
      "archivist",
      "truth-seeker"
    ],
    "motifs": [
      "confession",
      "record",
      "documentation",
      "truth"
    ]
  },
  {
    "id": "D185",
    "type": "drive",
    "title": "Successful Compliance",
    "instruction": "Describe a failed outcome as proof that the correct process was followed and therefore the system worked.",
    "categoryId": "secrets-avoidance",
    "subthemeId": "reframe-failure",
    "difficulty": "beginner",
    "intensity": "medium",
    "tone": "heightened",
    "orientation": "world-focused",
    "coachRoles": [
      "spin-doctor",
      "compliance-keeper",
      "reframer"
    ],
    "motifs": [
      "compliance",
      "process",
      "bureaucracy",
      "reputation"
    ]
  },
  {
    "id": "D186",
    "type": "drive",
    "title": "Use the Right Vocabulary",
    "instruction": "Perform belonging by using official language confidently, adjusting each term whenever someone reveals what it actually means.",
    "categoryId": "secrets-avoidance",
    "subthemeId": "feign-competence",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "self-focused",
    "coachRoles": [
      "impostor",
      "interpreter",
      "outsider"
    ],
    "motifs": [
      "belonging",
      "bureaucracy",
      "communication",
      "expertise"
    ]
  },
  {
    "id": "D187",
    "type": "drive",
    "title": "More Official Than You",
    "instruction": "Turn every suggestion into a contest over whose method, title, precedent, or paperwork is more legitimate.",
    "categoryId": "repeatable-behaviors",
    "subthemeId": "competition-loop",
    "difficulty": "advanced",
    "intensity": "high",
    "tone": "heightened",
    "orientation": "against-partner",
    "coachRoles": [
      "competitor",
      "compliance-keeper",
      "claimant"
    ],
    "motifs": [
      "competition",
      "legitimacy",
      "documentation",
      "precedent"
    ]
  },
  {
    "id": "D188",
    "type": "drive",
    "title": "A Valuable Safeguard",
    "instruction": "Treat every delay, restriction, and extra step as evidence that the system is becoming safer and more thorough.",
    "categoryId": "repeatable-behaviors",
    "subthemeId": "positive-reframing",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "world-focused",
    "coachRoles": [
      "reframer",
      "optimist",
      "compliance-keeper"
    ],
    "motifs": [
      "safety",
      "process",
      "optimism",
      "oversight"
    ]
  },
  {
    "id": "D189",
    "type": "drive",
    "title": "Warmly Enforced",
    "instruction": "Remain kind and welcoming while enforcing increasingly restrictive rules without exception.",
    "categoryId": "repeatable-behaviors",
    "subthemeId": "emotional-contradiction",
    "difficulty": "beginner",
    "intensity": "high",
    "tone": "heightened",
    "orientation": "toward-partner",
    "coachRoles": [
      "contradictor",
      "enforcer",
      "compliance-keeper"
    ],
    "motifs": [
      "care",
      "compliance",
      "rules",
      "boundaries"
    ]
  },
  {
    "id": "D190",
    "type": "drive",
    "title": "There Is a Process",
    "instruction": "Treat every favor, feeling, and urgent need as a request requiring terms, documentation, review, and approval.",
    "categoryId": "repeatable-behaviors",
    "subthemeId": "transactional-framing",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "against-partner",
    "coachRoles": [
      "negotiator",
      "administrator",
      "compliance-keeper"
    ],
    "motifs": [
      "process",
      "documentation",
      "approval",
      "bureaucracy"
    ]
  },
  {
    "id": "D191",
    "type": "drive",
    "title": "Exactly Within Policy",
    "instruction": "Agree to every request only after interpreting the policy so it grants you authority, protection, or an exemption.",
    "categoryId": "repeatable-behaviors",
    "subthemeId": "self-serving-agreement",
    "difficulty": "intermediate",
    "intensity": "medium",
    "tone": "grounded",
    "orientation": "self-focused",
    "coachRoles": [
      "controller",
      "exception-seeker",
      "interpreter"
    ],
    "motifs": [
      "policy",
      "authority",
      "exceptions",
      "control"
    ]
  },
  {
    "id": "D192",
    "type": "drive",
    "title": "New Rule Required",
    "instruction": "Use every problem as justification for adding another rule, ceremony, checkpoint, or layer of oversight.",
    "categoryId": "repeatable-behaviors",
    "subthemeId": "pattern-escalation",
    "difficulty": "advanced",
    "intensity": "high",
    "tone": "heightened",
    "orientation": "world-focused",
    "coachRoles": [
      "escalator",
      "administrator",
      "ritualist"
    ],
    "motifs": [
      "rules",
      "ritual",
      "oversight",
      "patterns"
    ]
  }
];
  const allCards = definitions.map(createCard);
  const stances = allCards.filter((card) => card.type === "stance");
  const drives = allCards.filter((card) => card.type === "drive");

  return {
    schemaVersion: bible.CARD_SCHEMA_VERSION,
    id: PACK_ID,
    title: "Rules, Rituals & Institutions",
    version: PACK_VERSION,
    status: "playtest",
    sequence: 8,
    publicationStage: bible.getPack(PACK_ID).publicationStage,
    publicationWave: bible.getPack(PACK_ID).publicationWave,
    editorialReviewVersion: bible.getPack(PACK_ID).editorialReviewVersion,
    remainingPublicationGates: [...bible.getPack(PACK_ID).remainingPublicationGates],
    description: "Bureaucracy, process, standards, customs, systems, traditions, and institutional behavior.",
    stances,
    drives
  };
});
