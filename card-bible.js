(function (root, factory) {
  const bible = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = bible;
  } else {
    root.IMPROMPT_CARD_BIBLE = bible;
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const CARD_SCHEMA_VERSION = 1;
  const LIBRARY_PLAN_VERSION = "1.5.0";
  const TARGET_STANCE_COUNT = 240;
  const TARGET_DRIVE_COUNT = 240;

  function deepFreeze(value) {
    if (!value || typeof value !== "object" || Object.isFrozen(value)) {
      return value;
    }
    Object.freeze(value);
    for (const child of Object.values(value)) {
      deepFreeze(child);
    }
    return value;
  }

  const enums = {
    cardTypes: ["stance", "drive"],
    cardStatuses: ["draft", "review", "playtest", "published", "retired"],
    packStatuses: ["planned", "drafting", "playtest", "published", "retired"],
    difficulties: ["beginner", "intermediate", "advanced"],
    intensities: ["low", "medium", "high"],
    tones: ["grounded", "heightened", "absurd", "flexible"],
    orientations: ["toward-partner", "against-partner", "away-from-partner", "self-focused", "world-focused"],
    recommendedModes: ["open", "mirror", "paired"]
  };

  const categories = [
    {
      id: "status-authority",
      label: "Status & Authority",
      deck: "stance",
      icon: "crown",
      targetCount: 60,
      definition: "How the holder claims, protects, yields, borrows, or quietly exercises status and authority.",
      subthemes: [
        {
          id: "command-presence",
          label: "Command Presence",
          targetCount: 10,
          definition: "The holder behaves as though their judgment, rank, or presence should settle the matter."
        },
        {
          id: "precarious-authority",
          label: "Precarious Authority",
          targetCount: 10,
          definition: "The holder projects control while guarding an insecure or dependent position."
        },
        {
          id: "professional-expertise",
          label: "Professional Expertise",
          targetCount: 10,
          definition: "The holder derives status from skill, standards, training, or specialized knowledge."
        },
        {
          id: "belonging-legitimacy",
          label: "Belonging & Legitimacy",
          targetCount: 10,
          definition: "The holder claims, imitates, or defends the right to belong in the present situation."
        },
        {
          id: "mentorship-rank",
          label: "Mentorship & Rank",
          targetCount: 10,
          definition: "The holder defines the relationship through seniority, instruction, legacy, or rank."
        },
        {
          id: "hidden-leverage",
          label: "Hidden Leverage",
          targetCount: 10,
          definition: "The holder exercises influence indirectly, modestly, or from behind the apparent authority."
        }
      ]
    },
    {
      id: "history-relationship",
      label: "History & Relationship",
      deck: "stance",
      icon: "link",
      targetCount: 60,
      definition: "How the holder interprets the present through familiarity, obligation, rivalry, trust, or unfinished history.",
      subthemes: [
        {
          id: "shared-origins",
          label: "Shared Origins",
          targetCount: 10,
          definition: "Longstanding familiarity overrides present formality or reinvention."
        },
        {
          id: "debts-favors",
          label: "Debts & Favors",
          targetCount: 10,
          definition: "Past help, sacrifice, or obligation remains active currency in the relationship."
        },
        {
          id: "familiar-roles",
          label: "Familiar Roles",
          targetCount: 10,
          definition: "The holder falls back into an established role such as caretaker, rebel, favorite, or responsible one."
        },
        {
          id: "rivalry-comparison",
          label: "Rivalry & Comparison",
          targetCount: 10,
          definition: "The holder measures themself against someone with whom they share history."
        },
        {
          id: "trust-dependence",
          label: "Trust & Dependence",
          targetCount: 10,
          definition: "The holder relies on a relationship while resisting, hiding, or resenting that reliance."
        },
        {
          id: "rupture-unfinished-business",
          label: "Rupture & Unfinished Business",
          targetCount: 10,
          definition: "A past break, betrayal, loss, or unnamed incident colors every present exchange."
        }
      ]
    },
    {
      id: "emotional-assumptions",
      label: "Emotional Assumptions",
      deck: "stance",
      icon: "heart",
      targetCount: 60,
      definition: "The emotional premise the holder brings into the scene and uses to interpret offers from others.",
      subthemes: [
        {
          id: "admiration-envy",
          label: "Admiration & Envy",
          targetCount: 10,
          definition: "Respect, imitation, jealousy, and comparison coexist in the holder's behavior."
        },
        {
          id: "identity-nostalgia",
          label: "Identity & Nostalgia",
          targetCount: 10,
          definition: "The holder clings to an earlier identity, role, relationship, or version of events."
        },
        {
          id: "fear-insecurity",
          label: "Fear & Insecurity",
          targetCount: 10,
          definition: "The holder protects their place, worth, safety, or belonging against a perceived threat."
        },
        {
          id: "care-control",
          label: "Care & Control",
          targetCount: 10,
          definition: "Affection or concern becomes supervision, intervention, possession, or control."
        },
        {
          id: "approval-belonging",
          label: "Approval & Belonging",
          targetCount: 10,
          definition: "The holder quietly calibrates themself around another person's approval or acceptance."
        },
        {
          id: "pride-validation",
          label: "Pride & Validation",
          targetCount: 10,
          definition: "The holder creates opportunities to be admired, recognized, reassured, or proven right."
        }
      ]
    },
    {
      id: "worldview-absurdity",
      label: "Worldview & Absurdity",
      deck: "stance",
      icon: "sparkles",
      targetCount: 60,
      definition: "The holder's governing logic for what matters, what is normal, and how seriously the world should be taken.",
      subthemes: [
        {
          id: "ritual-tradition",
          label: "Ritual & Tradition",
          targetCount: 10,
          definition: "Ordinary actions become sacred procedures, customs, or inviolable traditions."
        },
        {
          id: "crisis-catastrophe",
          label: "Crisis & Catastrophe",
          targetCount: 10,
          definition: "The holder reads events as urgent, dangerous, or evidence of impending disaster."
        },
        {
          id: "celebration-optimism",
          label: "Celebration & Optimism",
          targetCount: 10,
          definition: "The holder finds victory, opportunity, or delight in nearly every development."
        },
        {
          id: "practical-grounding",
          label: "Practical Grounding",
          targetCount: 10,
          definition: "The holder accepts unusual premises and concentrates on concrete consequences and next steps."
        },
        {
          id: "fixation-significance",
          label: "Fixation & Significance",
          targetCount: 10,
          definition: "One detail, object, phrase, standard, or rule becomes disproportionately important."
        },
        {
          id: "pattern-grand-meaning",
          label: "Pattern & Grand Meaning",
          targetCount: 10,
          definition: "The holder connects events into a larger system, destiny, conspiracy, or impossible certainty."
        }
      ]
    },
    {
      id: "direct-objectives",
      label: "Direct Objectives",
      deck: "drive",
      icon: "target",
      targetCount: 120,
      definition: "A concrete outcome the holder actively pursues through the partner or the shared situation.",
      subthemes: [
        { id: "secure-help", label: "Secure Help", targetCount: 10, definition: "Make someone acknowledge a need and provide assistance." },
        { id: "prevent-departure", label: "Prevent Departure", targetCount: 10, definition: "Keep someone, something, or an opportunity from leaving." },
        { id: "obtain-apology", label: "Obtain an Apology", targetCount: 10, definition: "Produce acknowledgment, remorse, restitution, or repair." },
        { id: "gain-approval", label: "Gain Approval", targetCount: 10, definition: "Secure permission, endorsement, praise, or retroactive acceptance." },
        { id: "transfer-task", label: "Transfer the Task", targetCount: 10, definition: "Make someone else volunteer for, inherit, or accept an unwanted responsibility." },
        { id: "extract-information", label: "Extract Information", targetCount: 10, definition: "Discover what another person knows, suspects, remembers, or intends." },
        { id: "recruit-ally", label: "Recruit an Ally", targetCount: 10, definition: "Bring another person into a plan, belief, side, or secret." },
        { id: "induce-risk", label: "Induce Risk", targetCount: 10, definition: "Get someone else to act first, break a rule, or accept the dangerous step." },
        { id: "gain-recognition", label: "Gain Recognition", targetCount: 10, definition: "Make someone acknowledge status, expertise, identity, sacrifice, or importance." },
        { id: "force-choice", label: "Force a Choice", targetCount: 10, definition: "Make someone select between competing people, values, plans, or obligations." },
        { id: "test-loyalty", label: "Test Loyalty", targetCount: 10, definition: "Create a test that proves allegiance, trust, affection, or commitment." },
        { id: "obtain-surrender", label: "Obtain Surrender", targetCount: 10, definition: "Persuade someone to yield, relinquish, concede, or hand something over." }
      ]
    },
    {
      id: "secrets-avoidance",
      label: "Secrets & Avoidance",
      deck: "drive",
      icon: "lock",
      targetCount: 60,
      definition: "A truth, responsibility, subject, or weakness the holder conceals, redirects, reframes, or protects.",
      subthemes: [
        { id: "conceal-culpability", label: "Conceal Culpability", targetCount: 10, definition: "Hide responsibility while remaining actively involved in the situation." },
        { id: "avoid-subject", label: "Avoid the Subject", targetCount: 10, definition: "Keep the interaction away from one dangerous topic or implication." },
        { id: "protective-deception", label: "Protective Deception", targetCount: 10, definition: "Withhold or distort the truth because the holder believes honesty would cause harm." },
        { id: "induce-confession", label: "Induce a Confession", targetCount: 10, definition: "Make someone else reveal, admit, or incriminate themself first." },
        { id: "reframe-failure", label: "Reframe Failure", targetCount: 10, definition: "Present a mistake, loss, or bad plan as intentional, responsible, or successful." },
        { id: "feign-competence", label: "Feign Competence", targetCount: 10, definition: "Conceal confusion or inadequacy by performing certainty, skill, or preparedness." }
      ]
    },
    {
      id: "repeatable-behaviors",
      label: "Repeatable Behaviors",
      deck: "drive",
      icon: "repeat",
      targetCount: 60,
      definition: "A reusable behavioral pattern that can recur, heighten, and become the scene's comic engine.",
      subthemes: [
        { id: "competition-loop", label: "Competition Loop", targetCount: 10, definition: "Convert new offers into contests, rankings, records, or opportunities to win." },
        { id: "positive-reframing", label: "Positive Reframing", targetCount: 10, definition: "Transform setbacks into increasingly optimistic interpretations." },
        { id: "emotional-contradiction", label: "Emotional Contradiction", targetCount: 10, definition: "Pair outward support, calm, warmth, or courtesy with a conflicting emotional escalation." },
        { id: "transactional-framing", label: "Transactional Framing", targetCount: 10, definition: "Turn feelings, favors, apologies, and relationships into negotiations or exchanges." },
        { id: "self-serving-agreement", label: "Self-Serving Agreement", targetCount: 10, definition: "Accept an offer while repeatedly redefining it to benefit the holder." },
        { id: "pattern-escalation", label: "Pattern Escalation", targetCount: 10, definition: "Treat accumulating details as proof of a larger and increasingly consequential pattern." }
      ]
    }
  ];

  const coachRoles = [
    { id: "authority", label: "Authority", definition: "Claims the right to decide, direct, or approve." },
    { id: "insecure-authority", label: "Insecure Authority", definition: "Projects command while guarding a fragile position." },
    { id: "expert", label: "Expert", definition: "Acts from standards, training, or specialized knowledge." },
    { id: "outsider", label: "Outsider", definition: "Does not fully understand or belong, but must function anyway." },
    { id: "mentor", label: "Mentor", definition: "Defines the relationship through teaching, seniority, or legacy." },
    { id: "hidden-power", label: "Hidden Power", definition: "Exercises influence indirectly or from behind the apparent authority." },
    { id: "familiar", label: "Familiar", definition: "Uses long history to puncture distance, formality, or reinvention." },
    { id: "creditor", label: "Creditor", definition: "Treats past help or sacrifice as an active debt." },
    { id: "caretaker", label: "Caretaker", definition: "Takes responsibility for another person or the entire situation." },
    { id: "rival", label: "Rival", definition: "Measures success by comparison with another person." },
    { id: "dependent", label: "Dependent", definition: "Needs another person while hiding, resisting, or resenting that need." },
    { id: "wounded", label: "Wounded", definition: "Carries unresolved hurt or unfinished history into the interaction." },
    { id: "admirer", label: "Admirer", definition: "Is strongly impressed, fascinated, or emotionally drawn toward another person." },
    { id: "nostalgist", label: "Nostalgist", definition: "Clings to an earlier identity, relationship, or version of events." },
    { id: "vulnerable", label: "Vulnerable", definition: "Protects an insecure emotional position." },
    { id: "protector", label: "Protector", definition: "Frames intervention, concealment, or control as care." },
    { id: "approval-seeker", label: "Approval Seeker", definition: "Calibrates behavior around acceptance, praise, or reassurance." },
    { id: "showoff", label: "Showoff", definition: "Creates opportunities to be noticed, admired, or validated." },
    { id: "ritualist", label: "Ritualist", definition: "Treats process, custom, or symbolism as sacred." },
    { id: "alarmist", label: "Alarmist", definition: "Escalates precautions, urgency, or catastrophic interpretation." },
    { id: "optimist", label: "Optimist", definition: "Reframes developments as victories or opportunities." },
    { id: "anchor", label: "Anchor", definition: "Grounds an unusual premise in concrete practical consequences." },
    { id: "fixator", label: "Fixator", definition: "Returns repeatedly to one object, detail, rule, or concern." },
    { id: "meaning-maker", label: "Meaning Maker", definition: "Connects events into a larger pattern or grand explanation." },
    { id: "pursuer", label: "Pursuer", definition: "Actively seeks a result from another person." },
    { id: "retainer", label: "Retainer", definition: "Works to keep someone or something from leaving." },
    { id: "repairer", label: "Repairer", definition: "Seeks acknowledgment, apology, restitution, or restored connection." },
    { id: "permission-seeker", label: "Permission Seeker", definition: "Needs endorsement or approval for an action or identity." },
    { id: "delegator", label: "Delegator", definition: "Transfers an unwanted responsibility to someone else." },
    { id: "investigator", label: "Investigator", definition: "Probes for hidden knowledge, motives, or intentions." },
    { id: "recruiter", label: "Recruiter", definition: "Brings someone into a plan, side, belief, or secret." },
    { id: "instigator", label: "Instigator", definition: "Encourages the risky, rule-breaking, or escalating first move." },
    { id: "recognition-seeker", label: "Recognition Seeker", definition: "Needs status, expertise, sacrifice, or importance acknowledged." },
    { id: "chooser", label: "Chooser", definition: "Forces or frames an exclusive decision." },
    { id: "tester", label: "Tester", definition: "Creates trials that supposedly prove loyalty, trust, or commitment." },
    { id: "acquirer", label: "Acquirer", definition: "Seeks possession, concession, or surrender." },
    { id: "culprit", label: "Culprit", definition: "Conceals responsibility while remaining involved." },
    { id: "avoider", label: "Avoider", definition: "Redirects away from a dangerous topic, truth, or consequence." },
    { id: "secret-keeper", label: "Secret Keeper", definition: "Protects or withholds information." },
    { id: "interrogator", label: "Interrogator", definition: "Maneuvers another person toward admission or confession." },
    { id: "spin-doctor", label: "Spin Doctor", definition: "Reframes failure as success, responsibility, or inevitability." },
    { id: "impostor", label: "Impostor", definition: "Performs competence or belonging while hiding uncertainty." },
    { id: "competitor", label: "Competitor", definition: "Turns new offers into opportunities to win or rank." },
    { id: "reframer", label: "Reframer", definition: "Repeatedly changes the emotional or practical meaning of events." },
    { id: "contradictor", label: "Contradictor", definition: "Pairs outward behavior with an escalating opposing emotion." },
    { id: "negotiator", label: "Negotiator", definition: "Treats interactions as bargains, trades, or terms." },
    { id: "controller", label: "Controller", definition: "Reinterprets agreement or care to preserve personal control." },
    { id: "escalator", label: "Escalator", definition: "Heightens a recurring pattern or consequence." },
    { id: "stabilizer", label: "Stabilizer", definition: "Keeps the scene concrete, practical, and responsive." },
    { id: "truth-seeker", label: "Truth Seeker", definition: "Pursues information, admission, or clarity." },
    { id: "broker", label: "Broker", definition: "Converts access, information, resources, or relationships into influence." },
    { id: "challenger", label: "Challenger", definition: "Tests, resists, or contests another claim to authority." },
    { id: "claimant", label: "Claimant", definition: "Asserts a rightful position, privilege, title, or jurisdiction." },
    { id: "enforcer", label: "Enforcer", definition: "Presses for compliance and makes rank or consequences visible." },
    { id: "gatekeeper", label: "Gatekeeper", definition: "Controls access, qualification, participation, or permission." },
    { id: "patron", label: "Patron", definition: "Uses support, protection, sponsorship, or favor to shape another person's options." },
    { id: "successor", label: "Successor", definition: "Positions themself as the next, rightful, or more capable holder of authority." },
    { id: "attachment-seeker", label: "Attachment Seeker", definition: "Seeks signs of closeness, priority, reassurance, or continued connection." },
    { id: "boundary-keeper", label: "Boundary Keeper", definition: "Defines, tests, or protects limits within a relationship." },
    { id: "confidant", label: "Confidant", definition: "Builds privileged access through private knowledge and emotional trust." },
    { id: "loyalist", label: "Loyalist", definition: "Treats allegiance to a person or relationship as a defining obligation." },
    { id: "memory-keeper", label: "Memory Keeper", definition: "Uses shared history and remembrance to define the present relationship." },
    { id: "peacemaker", label: "Peacemaker", definition: "Protects harmony, lowers conflict, or keeps people connected." },
    { id: "reconciler", label: "Reconciler", definition: "Works to restore, redefine, or preserve a strained connection." },
    { id: "griever", label: "Griever", definition: "Lets loss, absence, or an ending shape attention and choices." },
    { id: "hope-keeper", label: "Hope Keeper", definition: "Protects possibility and keeps investing while outcomes remain uncertain." },
    { id: "reassurance-seeker", label: "Reassurance Seeker", definition: "Looks repeatedly for proof of safety, acceptance, or worth." },
    { id: "shame-bearer", label: "Shame Bearer", definition: "Anticipates judgment and protects a threatened sense of worth." },
    { id: "emotional-buffer", label: "Emotional Buffer", definition: "Absorbs, redirects, or softens emotional impact for other people." },
    { id: "comforter", label: "Comforter", definition: "Responds to pressure by offering care, steadiness, and practical support." },
    { id: "conspirator", label: "Conspirator", definition: "Coordinates a hidden plan through selective trust, timing, and shared secrecy." },
    { id: "informant", label: "Informant", definition: "Controls, trades, or selectively releases privileged information." },
    { id: "skeptic", label: "Skeptic", definition: "Tests surface explanations and treats inconsistency as a reason to keep probing." },
    { id: "witness", label: "Witness", definition: "Carries knowledge whose disclosure could change the relationship or situation." },
    { id: "decoy", label: "Decoy", definition: "Redirects attention away from a vulnerable truth, person, motive, or plan." },
    { id: "strategist", label: "Strategist", definition: "Sequences actions and information toward an outcome that is not yet fully visible." }
  ];

  const motifs = [
    "admiration", "anger", "approval", "authority", "belonging", "care", "celebration",
    "choice", "communication", "competition", "control", "convenience", "crisis", "dependence",
    "envy", "etiquette", "expertise", "fairness", "fear", "familiarity", "guilt", "history",
    "identity", "loyalty", "maintenance", "mess", "obligation", "optimism", "patterns", "permission",
    "pride", "recognition", "repair", "resources", "responsibility", "risk", "ritual", "routine",
    "rules", "secrecy", "space", "status", "time", "trust", "truth", "validation", "work",
    "absurdity", "loss", "access", "allegiance", "autonomy", "compliance", "hierarchy", "influence",
    "leverage", "legitimacy", "patronage", "reputation", "succession", "territory",
    "abandonment", "affection", "attachment", "boundaries", "closeness", "connection", "distance",
    "forgiveness", "intimacy", "jealousy", "memory", "promise", "reconciliation", "resentment", "sacrifice",
    "anxiety", "comfort", "courage", "disappointment", "dread", "grief", "hope", "longing",
    "reassurance", "relief", "resilience", "shame", "uncertainty", "vulnerability", "worth",
    "alibi", "clues", "confession", "conspiracy", "deception", "evidence", "information", "investigation",
    "misdirection", "motive", "mystery", "recruitment", "strategy", "suspicion", "witness"
  ];

  const packPlan = [
    {
      id: "core-foundations",
      sequence: 1,
      title: "Core Foundations",
      status: "published",
      stanceRange: [1, 24],
      driveRange: [1, 24],
      targetStances: 24,
      targetDrives: 24,
      focus: "Broad, portable, highly pairable fundamentals that establish the voice and rules of Imprompt."
    },
    {
      id: "everyday-friction",
      sequence: 2,
      title: "Everyday Friction",
      status: "playtest",
      stanceRange: [25, 48],
      driveRange: [25, 48],
      targetStances: 24,
      targetDrives: 24,
      focus: "Minor inconvenience, domestic strain, workplace tension, service encounters, and ordinary stakes treated seriously."
    },
    {
      id: "power-games",
      sequence: 3,
      title: "Power Games",
      status: "playtest",
      stanceRange: [49, 72],
      driveRange: [49, 72],
      targetStances: 24,
      targetDrives: 24,
      focus: "Authority, legitimacy, leverage, dependency, hierarchy, access, compliance, and the struggle over who gets to decide."
    },
    {
      id: "relationship-knots",
      sequence: 4,
      title: "Relationship Knots",
      status: "playtest",
      stanceRange: [73, 96],
      driveRange: [73, 96],
      targetStances: 24,
      targetDrives: 24,
      focus: "Affection, rivalry, obligation, dependence, boundaries, and unfinished connection."
    },
    {
      id: "emotional-pressure",
      sequence: 5,
      title: "Emotional Pressure",
      status: "playtest",
      stanceRange: [97, 120],
      driveRange: [97, 120],
      targetStances: 24,
      targetDrives: 24,
      focus: "Longing, insecurity, validation, resentment, grief, hope, shame, and emotional contradiction."
    },
    {
      id: "secrets-schemes",
      sequence: 6,
      title: "Secrets & Schemes",
      status: "playtest",
      stanceRange: [121, 144],
      driveRange: [121, 144],
      targetStances: 24,
      targetDrives: 24,
      focus: "Concealment, recruitment, investigation, misdirection, confession, conspiracy, and plans under pressure."
    },
    {
      id: "absurd-commitment",
      sequence: 7,
      title: "Absurd Commitment",
      status: "planned",
      stanceRange: [145, 168],
      driveRange: [145, 168],
      targetStances: 24,
      targetDrives: 24,
      focus: "Impossible logic, literal commitment, grounded responses, recurring nonsense, and heightened consequence."
    },
    {
      id: "rules-rituals-institutions",
      sequence: 8,
      title: "Rules, Rituals & Institutions",
      status: "planned",
      stanceRange: [169, 192],
      driveRange: [169, 192],
      targetStances: 24,
      targetDrives: 24,
      focus: "Bureaucracy, process, standards, customs, systems, traditions, and institutional behavior."
    },
    {
      id: "competition-consequences",
      sequence: 9,
      title: "Competition & Consequences",
      status: "planned",
      stanceRange: [193, 216],
      driveRange: [193, 216],
      targetStances: 24,
      targetDrives: 24,
      focus: "Winning, comparison, bargains, escalation, accountability, sacrifice, and what success costs."
    },
    {
      id: "advanced-scene-engines",
      sequence: 10,
      title: "Advanced Scene Engines",
      status: "planned",
      stanceRange: [217, 240],
      driveRange: [217, 240],
      targetStances: 24,
      targetDrives: 24,
      focus: "Layered contradictions, delayed reveals, reversals, structural callbacks, and veteran-level scene pressure."
    }
  ];

  const categoryById = Object.fromEntries(categories.map((category) => [category.id, category]));
  const categoryByLabel = Object.fromEntries(categories.map((category) => [category.label, category]));
  const coachRoleById = Object.fromEntries(coachRoles.map((role) => [role.id, role]));
  const packById = Object.fromEntries(packPlan.map((pack) => [pack.id, pack]));

  const categoryStyles = Object.fromEntries(categories.map((category) => [
    category.label,
    {
      id: category.id,
      label: category.label,
      icon: category.icon
    }
  ]));

  const defaultCategoryStyle = {
    id: "general",
    label: "General Prompt",
    icon: "sparkles"
  };

  function getCategory(idOrLabel) {
    return categoryById[idOrLabel] || categoryByLabel[idOrLabel] || null;
  }

  function getSubtheme(categoryId, subthemeId) {
    const category = categoryById[categoryId];
    return category ? category.subthemes.find((subtheme) => subtheme.id === subthemeId) || null : null;
  }

  function getPack(packId) {
    return packById[packId] || null;
  }

  function getCoachRole(roleId) {
    return coachRoleById[roleId] || null;
  }

  function formatCardId(type, number) {
    const prefix = type === "stance" ? "S" : type === "drive" ? "D" : null;
    if (!prefix || !Number.isInteger(number) || number < 1 || number > 240) {
      throw new RangeError("Card IDs require stance/drive and a number from 1 through 240.");
    }
    return `${prefix}${String(number).padStart(2, "0")}`;
  }

  function parseCardId(id) {
    const match = /^([SD])(\d{2,3})$/.exec(String(id || ""));
    if (!match) {
      return null;
    }
    const number = Number(match[2]);
    if (number < 1 || number > 240) {
      return null;
    }
    return {
      type: match[1] === "S" ? "stance" : "drive",
      number
    };
  }

  function expectedPackForCardId(id) {
    const parsed = parseCardId(id);
    if (!parsed) {
      return null;
    }
    const rangeKey = parsed.type === "stance" ? "stanceRange" : "driveRange";
    return packPlan.find((pack) => parsed.number >= pack[rangeKey][0] && parsed.number <= pack[rangeKey][1]) || null;
  }

  return deepFreeze({
    CARD_SCHEMA_VERSION,
    LIBRARY_PLAN_VERSION,
    TARGET_STANCE_COUNT,
    TARGET_DRIVE_COUNT,
    enums,
    categories,
    categoryById,
    categoryByLabel,
    categoryStyles,
    defaultCategoryStyle,
    coachRoles,
    coachRoleById,
    motifs,
    packPlan,
    packById,
    getCategory,
    getSubtheme,
    getPack,
    getCoachRole,
    formatCardId,
    parseCardId,
    expectedPackForCardId
  });
});
