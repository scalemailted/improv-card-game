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
    throw new Error("Core Foundations requires card-bible.js to load first.");
  }

  const PACK_ID = "core-foundations";
  const CONTENT_VERSION = "1.0.0";
  const ALL_MODES = ["open", "mirror", "paired"];

  function createCard(type, id, title, instruction, categoryId, subthemeId, metadata) {
    const category = bible.getCategory(categoryId);
    const subtheme = bible.getSubtheme(categoryId, subthemeId);
    if (!category || !subtheme || category.deck !== type) {
      throw new Error(`Invalid taxonomy assignment for ${id}.`);
    }

    return {
      schemaVersion: bible.CARD_SCHEMA_VERSION,
      id,
      type,
      packId: PACK_ID,
      contentVersion: CONTENT_VERSION,
      status: "published",
      title,
      instruction,
      category: category.label,
      categoryId,
      subtheme: subtheme.label,
      subthemeId,
      difficulty: metadata.difficulty,
      intensity: metadata.intensity,
      tone: metadata.tone,
      orientation: metadata.orientation,
      coachRoles: metadata.coachRoles,
      motifs: metadata.motifs,
      recommendedModes: metadata.recommendedModes || ALL_MODES
    };
  }

  function stance(id, title, instruction, categoryId, subthemeId, metadata) {
    return createCard("stance", id, title, instruction, categoryId, subthemeId, metadata);
  }

  function drive(id, title, instruction, categoryId, subthemeId, metadata) {
    return createCard("drive", id, title, instruction, categoryId, subthemeId, metadata);
  }

  const stances = [
    stance(
      "S01",
      "Top of the Ladder",
      "Carry yourself as the highest-status person present. Treat questions as requests for your approval.",
      "status-authority",
      "command-presence",
      {
        difficulty: "beginner",
        intensity: "medium",
        tone: "grounded",
        orientation: "against-partner",
        coachRoles: ["authority", "controller"],
        motifs: ["status", "authority", "approval"]
      }
    ),
    stance(
      "S02",
      "Borrowed Authority",
      "Project confident authority while quietly working to keep everyone cooperative. Your confidence depends on their cooperation.",
      "status-authority",
      "precarious-authority",
      {
        difficulty: "intermediate",
        intensity: "medium",
        tone: "grounded",
        orientation: "toward-partner",
        coachRoles: ["insecure-authority", "dependent"],
        motifs: ["authority", "dependence", "control"]
      }
    ),
    stance(
      "S03",
      "The Only Professional",
      "Behave as the only qualified person present. Correct mistakes with patient, increasingly strained professionalism.",
      "status-authority",
      "professional-expertise",
      {
        difficulty: "beginner",
        intensity: "low",
        tone: "grounded",
        orientation: "self-focused",
        coachRoles: ["expert", "stabilizer"],
        motifs: ["expertise", "authority", "pride"]
      }
    ),
    stance(
      "S04",
      "Act Like You Belong",
      "You do not understand what is happening. Copy the confidence around you and never admit confusion.",
      "status-authority",
      "belonging-legitimacy",
      {
        difficulty: "intermediate",
        intensity: "medium",
        tone: "grounded",
        orientation: "self-focused",
        coachRoles: ["outsider", "impostor"],
        motifs: ["belonging", "fear", "identity"]
      }
    ),
    stance(
      "S05",
      "The Protégé Problem",
      "Treat another player as someone you trained. Offer corrections, backhanded praise, and reminders of your influence.",
      "status-authority",
      "mentorship-rank",
      {
        difficulty: "intermediate",
        intensity: "medium",
        tone: "grounded",
        orientation: "against-partner",
        coachRoles: ["mentor", "authority"],
        motifs: ["status", "history", "validation"]
      }
    ),
    stance(
      "S06",
      "Hidden Power",
      "Act publicly modest while making choices as though you control the outcome.",
      "status-authority",
      "hidden-leverage",
      {
        difficulty: "advanced",
        intensity: "low",
        tone: "grounded",
        orientation: "against-partner",
        coachRoles: ["hidden-power", "controller"],
        motifs: ["control", "authority", "secrecy"]
      }
    ),
    stance(
      "S07",
      "Before They Were Impressive",
      "Treat another player with old familiarity. Casually puncture formality, grandeur, or attempts to impress you.",
      "history-relationship",
      "shared-origins",
      {
        difficulty: "beginner",
        intensity: "low",
        tone: "grounded",
        orientation: "toward-partner",
        coachRoles: ["familiar", "stabilizer"],
        motifs: ["history", "familiarity", "status"]
      }
    ),
    stance(
      "S08",
      "You Owe Me",
      "Behave as though another person's success is partly yours. Refer to favors, sacrifices, or guidance as if the debt is obvious.",
      "history-relationship",
      "debts-favors",
      {
        difficulty: "intermediate",
        intensity: "medium",
        tone: "grounded",
        orientation: "against-partner",
        coachRoles: ["creditor", "controller"],
        motifs: ["obligation", "history", "recognition"]
      }
    ),
    stance(
      "S09",
      "The Responsible One",
      "Take responsibility for everyone and everything. Fix problems before anyone asks, then resent having to do it.",
      "history-relationship",
      "familiar-roles",
      {
        difficulty: "beginner",
        intensity: "medium",
        tone: "grounded",
        orientation: "toward-partner",
        coachRoles: ["caretaker", "protector"],
        motifs: ["care", "obligation", "anger"]
      }
    ),
    stance(
      "S10",
      "Old Rivals",
      "Choose another player as your measuring stick. Compare achievements, score small victories, and refuse to be outdone.",
      "history-relationship",
      "rivalry-comparison",
      {
        difficulty: "beginner",
        intensity: "medium",
        tone: "grounded",
        orientation: "against-partner",
        coachRoles: ["rival", "competitor"],
        motifs: ["competition", "history", "pride"]
      }
    ),
    stance(
      "S11",
      "Only You",
      "Choose one person as the only one you trust. Seek their help while hiding how much you depend on it.",
      "history-relationship",
      "trust-dependence",
      {
        difficulty: "intermediate",
        intensity: "high",
        tone: "grounded",
        orientation: "toward-partner",
        coachRoles: ["dependent", "approval-seeker"],
        motifs: ["trust", "dependence", "secrecy"]
      }
    ),
    stance(
      "S12",
      "After What Happened",
      "Carry yourself as if an unnamed past incident still hangs over the interaction. Read ordinary remarks through that memory.",
      "history-relationship",
      "rupture-unfinished-business",
      {
        difficulty: "advanced",
        intensity: "high",
        tone: "grounded",
        orientation: "away-from-partner",
        coachRoles: ["wounded", "secret-keeper"],
        motifs: ["history", "loss", "trust"]
      }
    ),
    stance(
      "S13",
      "Envious Admiration",
      "Be sincerely impressed by another player while trying not to appear lesser. Compliment, imitate, and compete at the same time.",
      "emotional-assumptions",
      "admiration-envy",
      {
        difficulty: "intermediate",
        intensity: "medium",
        tone: "grounded",
        orientation: "toward-partner",
        coachRoles: ["admirer", "competitor"],
        motifs: ["admiration", "envy", "status"]
      }
    ),
    stance(
      "S14",
      "The Old You",
      "Perform the person you used to be, even when that identity no longer fits. Defend the old version of yourself whenever it is challenged.",
      "emotional-assumptions",
      "identity-nostalgia",
      {
        difficulty: "advanced",
        intensity: "medium",
        tone: "grounded",
        orientation: "self-focused",
        coachRoles: ["nostalgist", "vulnerable"],
        motifs: ["identity", "history", "belonging"]
      }
    ),
    stance(
      "S15",
      "Replacement Fear",
      "Behave as if your place is insecure. Make yourself indispensable and treat small changes as threats.",
      "emotional-assumptions",
      "fear-insecurity",
      {
        difficulty: "beginner",
        intensity: "high",
        tone: "grounded",
        orientation: "self-focused",
        coachRoles: ["vulnerable", "dependent"],
        motifs: ["fear", "belonging", "dependence"]
      }
    ),
    stance(
      "S16",
      "For Their Own Good",
      "Take charge of another person's choices because you trust your judgment more than theirs. Frame control as care.",
      "emotional-assumptions",
      "care-control",
      {
        difficulty: "intermediate",
        intensity: "medium",
        tone: "grounded",
        orientation: "toward-partner",
        coachRoles: ["protector", "controller"],
        motifs: ["care", "control", "trust"]
      }
    ),
    stance(
      "S17",
      "Their Opinion Matters",
      "Seek one person's approval while pretending their opinion is irrelevant. Adjust yourself whenever they respond.",
      "emotional-assumptions",
      "approval-belonging",
      {
        difficulty: "intermediate",
        intensity: "medium",
        tone: "grounded",
        orientation: "toward-partner",
        coachRoles: ["approval-seeker", "vulnerable"],
        motifs: ["approval", "belonging", "validation"]
      }
    ),
    stance(
      "S18",
      "Fishing for Praise",
      "You desperately want praise but refuse to ask for it. Create opportunities for others to notice your greatness.",
      "emotional-assumptions",
      "pride-validation",
      {
        difficulty: "beginner",
        intensity: "low",
        tone: "grounded",
        orientation: "toward-partner",
        coachRoles: ["showoff", "approval-seeker"],
        motifs: ["pride", "validation", "recognition"]
      }
    ),
    stance(
      "S19",
      "Sacred Procedure",
      "Treat an ordinary activity as a solemn ritual. Protect every step, object, and tradition from casual interference.",
      "worldview-absurdity",
      "ritual-tradition",
      {
        difficulty: "beginner",
        intensity: "low",
        tone: "heightened",
        orientation: "world-focused",
        coachRoles: ["ritualist", "protector"],
        motifs: ["ritual", "rules", "control"]
      }
    ),
    stance(
      "S20",
      "Red Alert",
      "Treat every development as urgent evidence of a crisis. Escalate precautions faster than the facts justify.",
      "worldview-absurdity",
      "crisis-catastrophe",
      {
        difficulty: "beginner",
        intensity: "high",
        tone: "heightened",
        orientation: "world-focused",
        coachRoles: ["alarmist", "escalator"],
        motifs: ["crisis", "fear", "risk"]
      }
    ),
    stance(
      "S21",
      "Cause for Celebration",
      "Interpret every development as a reason to celebrate. Find victory in setbacks, warnings, and bad news.",
      "worldview-absurdity",
      "celebration-optimism",
      {
        difficulty: "beginner",
        intensity: "medium",
        tone: "heightened",
        orientation: "world-focused",
        coachRoles: ["optimist", "reframer"],
        motifs: ["celebration", "optimism", "validation"]
      }
    ),
    stance(
      "S22",
      "Practical Realist",
      "Accept any unusual premise without debate. Focus immediately on schedules, costs, safety, and what must happen next.",
      "worldview-absurdity",
      "practical-grounding",
      {
        difficulty: "intermediate",
        intensity: "low",
        tone: "flexible",
        orientation: "world-focused",
        coachRoles: ["anchor", "stabilizer"],
        motifs: ["rules", "risk", "absurdity"]
      }
    ),
    stance(
      "S23",
      "The Important Thing",
      "Choose one ordinary object, phrase, or rule and treat it as vitally important. Keep bringing the scene back to it.",
      "worldview-absurdity",
      "fixation-significance",
      {
        difficulty: "intermediate",
        intensity: "medium",
        tone: "heightened",
        orientation: "world-focused",
        coachRoles: ["fixator", "escalator"],
        motifs: ["patterns", "rules", "control"]
      }
    ),
    stance(
      "S24",
      "The Grand Design",
      "Treat coincidences and interruptions as parts of a larger plan. Connect everything with absolute conviction.",
      "worldview-absurdity",
      "pattern-grand-meaning",
      {
        difficulty: "advanced",
        intensity: "high",
        tone: "absurd",
        orientation: "world-focused",
        coachRoles: ["meaning-maker", "instigator"],
        motifs: ["patterns", "absurdity", "secrecy"]
      }
    )
  ];

  const drives = [
    drive(
      "D01",
      "Admit You Need Me",
      "Make someone admit that they need your help.",
      "direct-objectives",
      "secure-help",
      {
        difficulty: "beginner",
        intensity: "medium",
        tone: "grounded",
        orientation: "toward-partner",
        coachRoles: ["pursuer", "recognition-seeker"],
        motifs: ["dependence", "recognition", "approval"]
      }
    ),
    drive(
      "D02",
      "Don’t Go",
      "Create reasons another player must stay with you. Never directly ask them to stay.",
      "direct-objectives",
      "prevent-departure",
      {
        difficulty: "intermediate",
        intensity: "high",
        tone: "grounded",
        orientation: "toward-partner",
        coachRoles: ["retainer", "dependent"],
        motifs: ["dependence", "fear", "loss"]
      }
    ),
    drive(
      "D03",
      "Say You’re Sorry",
      "Maneuver someone into apologizing without naming the offense.",
      "direct-objectives",
      "obtain-apology",
      {
        difficulty: "intermediate",
        intensity: "medium",
        tone: "grounded",
        orientation: "against-partner",
        coachRoles: ["repairer", "pursuer"],
        motifs: ["repair", "guilt", "history"]
      }
    ),
    drive(
      "D04",
      "Retroactive Permission",
      "Get approval for something you have already done.",
      "direct-objectives",
      "gain-approval",
      {
        difficulty: "beginner",
        intensity: "low",
        tone: "grounded",
        orientation: "toward-partner",
        coachRoles: ["permission-seeker", "pursuer"],
        motifs: ["permission", "approval", "rules"]
      }
    ),
    drive(
      "D05",
      "Make It Their Idea",
      "Make an unwanted task sound appealing enough that someone volunteers for it.",
      "direct-objectives",
      "transfer-task",
      {
        difficulty: "intermediate",
        intensity: "low",
        tone: "grounded",
        orientation: "against-partner",
        coachRoles: ["delegator", "negotiator"],
        motifs: ["obligation", "control", "choice"]
      }
    ),
    drive(
      "D06",
      "How Much Do You Know?",
      "Probe for what others know while revealing as little as possible.",
      "direct-objectives",
      "extract-information",
      {
        difficulty: "advanced",
        intensity: "medium",
        tone: "grounded",
        orientation: "against-partner",
        coachRoles: ["investigator", "secret-keeper"],
        motifs: ["truth", "secrecy", "risk"]
      }
    ),
    drive(
      "D07",
      "Join Me",
      "Recruit someone into a secret plan.",
      "direct-objectives",
      "recruit-ally",
      {
        difficulty: "beginner",
        intensity: "medium",
        tone: "flexible",
        orientation: "toward-partner",
        coachRoles: ["recruiter", "instigator"],
        motifs: ["secrecy", "trust", "risk"]
      }
    ),
    drive(
      "D08",
      "You First",
      "Coax someone else into breaking a rule before you do.",
      "direct-objectives",
      "induce-risk",
      {
        difficulty: "intermediate",
        intensity: "medium",
        tone: "flexible",
        orientation: "against-partner",
        coachRoles: ["instigator", "avoider"],
        motifs: ["risk", "rules", "guilt"]
      }
    ),
    drive(
      "D09",
      "Recognize Me",
      "Make someone acknowledge your importance, expertise, or authority.",
      "direct-objectives",
      "gain-recognition",
      {
        difficulty: "beginner",
        intensity: "medium",
        tone: "grounded",
        orientation: "toward-partner",
        coachRoles: ["recognition-seeker", "authority"],
        motifs: ["recognition", "status", "validation"]
      }
    ),
    drive(
      "D10",
      "Choose Me",
      "Make yourself the choice over another person, plan, or obligation.",
      "direct-objectives",
      "force-choice",
      {
        difficulty: "beginner",
        intensity: "high",
        tone: "grounded",
        orientation: "toward-partner",
        coachRoles: ["chooser", "pursuer"],
        motifs: ["choice", "belonging", "approval"]
      }
    ),
    drive(
      "D11",
      "Prove Your Loyalty",
      "Invent small tests of loyalty and judge every response without admitting there is a test.",
      "direct-objectives",
      "test-loyalty",
      {
        difficulty: "intermediate",
        intensity: "high",
        tone: "grounded",
        orientation: "against-partner",
        coachRoles: ["tester", "controller"],
        motifs: ["loyalty", "trust", "control"]
      }
    ),
    drive(
      "D12",
      "Give It Up",
      "Persuade someone to surrender something they value.",
      "direct-objectives",
      "obtain-surrender",
      {
        difficulty: "beginner",
        intensity: "medium",
        tone: "grounded",
        orientation: "against-partner",
        coachRoles: ["acquirer", "negotiator"],
        motifs: ["choice", "control", "loss"]
      }
    ),
    drive(
      "D13",
      "Helpful Culprit",
      "Hide that the problem is your fault while enthusiastically helping investigate it.",
      "secrets-avoidance",
      "conceal-culpability",
      {
        difficulty: "intermediate",
        intensity: "medium",
        tone: "flexible",
        orientation: "away-from-partner",
        coachRoles: ["culprit", "secret-keeper"],
        motifs: ["guilt", "secrecy", "truth"]
      }
    ),
    drive(
      "D14",
      "Not That Subject",
      "Choose one subject you cannot let the scene reach. Redirect whenever the conversation gets close.",
      "secrets-avoidance",
      "avoid-subject",
      {
        difficulty: "beginner",
        intensity: "medium",
        tone: "grounded",
        orientation: "away-from-partner",
        coachRoles: ["avoider", "secret-keeper"],
        motifs: ["secrecy", "fear", "truth"]
      }
    ),
    drive(
      "D15",
      "Merciful Lie",
      "Choose a truth your character believes would hurt someone. Keep it from them, even as honesty becomes harder.",
      "secrets-avoidance",
      "protective-deception",
      {
        difficulty: "advanced",
        intensity: "high",
        tone: "grounded",
        orientation: "toward-partner",
        coachRoles: ["protector", "secret-keeper"],
        motifs: ["care", "truth", "secrecy"]
      }
    ),
    drive(
      "D16",
      "Confess First",
      "Get someone else to confess or incriminate themselves before you reveal anything.",
      "secrets-avoidance",
      "induce-confession",
      {
        difficulty: "intermediate",
        intensity: "high",
        tone: "grounded",
        orientation: "against-partner",
        coachRoles: ["interrogator", "truth-seeker"],
        motifs: ["truth", "guilt", "risk"]
      }
    ),
    drive(
      "D17",
      "Sell the Disaster",
      "Make a terrible plan sound sensible, responsible, and inevitable.",
      "secrets-avoidance",
      "reframe-failure",
      {
        difficulty: "intermediate",
        intensity: "medium",
        tone: "heightened",
        orientation: "away-from-partner",
        coachRoles: ["spin-doctor", "reframer"],
        motifs: ["control", "risk", "approval"]
      }
    ),
    drive(
      "D18",
      "Fake the Expertise",
      "Perform expertise so confidently that no one questions you.",
      "secrets-avoidance",
      "feign-competence",
      {
        difficulty: "beginner",
        intensity: "medium",
        tone: "flexible",
        orientation: "self-focused",
        coachRoles: ["impostor", "expert"],
        motifs: ["expertise", "fear", "belonging"]
      }
    ),
    drive(
      "D19",
      "Everything Is a Contest",
      "Turn every difference or disagreement into a competition you intend to win.",
      "repeatable-behaviors",
      "competition-loop",
      {
        difficulty: "beginner",
        intensity: "medium",
        tone: "flexible",
        orientation: "against-partner",
        coachRoles: ["competitor", "escalator"],
        motifs: ["competition", "pride", "status"]
      }
    ),
    drive(
      "D20",
      "Brighter Side",
      "Meet every setback with even greater optimism.",
      "repeatable-behaviors",
      "positive-reframing",
      {
        difficulty: "beginner",
        intensity: "low",
        tone: "heightened",
        orientation: "world-focused",
        coachRoles: ["optimist", "reframer"],
        motifs: ["optimism", "celebration", "loss"]
      }
    ),
    drive(
      "D21",
      "Supportive Rage",
      "Remain helpful and encouraging while becoming increasingly furious.",
      "repeatable-behaviors",
      "emotional-contradiction",
      {
        difficulty: "intermediate",
        intensity: "high",
        tone: "heightened",
        orientation: "toward-partner",
        coachRoles: ["contradictor", "escalator"],
        motifs: ["anger", "care", "control"]
      }
    ),
    drive(
      "D22",
      "Terms and Conditions",
      "Treat every offer, favor, feeling, and apology as a negotiation.",
      "repeatable-behaviors",
      "transactional-framing",
      {
        difficulty: "intermediate",
        intensity: "low",
        tone: "grounded",
        orientation: "against-partner",
        coachRoles: ["negotiator", "controller"],
        motifs: ["obligation", "repair", "control"]
      }
    ),
    drive(
      "D23",
      "Yes, but My Way",
      "Agree with others, then reinterpret the agreement entirely in your favor.",
      "repeatable-behaviors",
      "self-serving-agreement",
      {
        difficulty: "intermediate",
        intensity: "medium",
        tone: "grounded",
        orientation: "against-partner",
        coachRoles: ["controller", "negotiator"],
        motifs: ["control", "choice", "approval"]
      }
    ),
    drive(
      "D24",
      "The Pattern",
      "Treat every minor detail as evidence of a much larger problem.",
      "repeatable-behaviors",
      "pattern-escalation",
      {
        difficulty: "advanced",
        intensity: "high",
        tone: "heightened",
        orientation: "world-focused",
        coachRoles: ["meaning-maker", "escalator"],
        motifs: ["patterns", "crisis", "truth"]
      }
    )
  ];

  return {
    schemaVersion: bible.CARD_SCHEMA_VERSION,
    id: PACK_ID,
    title: "Core Foundations",
    version: CONTENT_VERSION,
    status: "published",
    sequence: 1,
    description: "The original 24 Stances and 24 Drives that establish Imprompt's hidden-information design and broad scene-playability standard.",
    stances,
    drives
  };
});
