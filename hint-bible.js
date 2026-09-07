(function (root, factory) {
  const bible = typeof module === "object" && module.exports
    ? require("./card-bible.js")
    : root.IMPROMPT_CARD_BIBLE;
  const api = factory(bible);
  if (typeof module === "object" && module.exports) {
    module.exports = api;
  } else {
    root.IMPROMPT_HINT_BIBLE = api;
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function (cardBible) {
  "use strict";

  if (!cardBible) {
    throw new Error("hint-bible.js requires card-bible.js to load first.");
  }

  const HINT_SCHEMA_VERSION = 2;
  const HINT_LIBRARY_VERSION = "2.1.0";
  const DEFAULT_HINT_POLICY = "full";

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

  const policies = [
    {
      id: "full",
      label: "Full coaching",
      shortLabel: "Full hints",
      description: "Single-card and two-card examples are available immediately.",
      allowsSingle: true,
      allowsCombination: true,
      allowsDepth: true,
      requiresUnlock: false
    },
    {
      id: "nudges",
      label: "Nudges only",
      shortLabel: "Nudges only",
      description: "One brief behavioral example at a time, with no extended coaching.",
      allowsSingle: true,
      allowsCombination: true,
      allowsDepth: false,
      requiresUnlock: false
    },
    {
      id: "after-attempt",
      label: "After first attempt",
      shortLabel: "After an attempt",
      description: "Hints stay locked until the player deliberately marks that they have tried the cards once.",
      allowsSingle: true,
      allowsCombination: true,
      allowsDepth: true,
      requiresUnlock: true
    },
    {
      id: "off",
      label: "Hints off",
      shortLabel: "Hints off",
      description: "No card or combination hints appear during this exercise. The Scene Craft Guide remains available.",
      allowsSingle: false,
      allowsCombination: false,
      allowsDepth: false,
      requiresUnlock: false
    }
  ];

  const policyById = Object.freeze(Object.fromEntries(policies.map((policy) => [policy.id, policy])));

  const packLenses = {
    "core-foundations": {
      manifestations: [
        "Keep the first move direct and easy to read.",
        "Play the central behavior plainly before adding complication."
      ]
    },
    "everyday-friction": {
      manifestations: [
        "Put the pressure into a small task, routine, delay, or shared resource.",
        "Let an ordinary inconvenience reveal why the moment matters personally."
      ]
    },
    "power-games": {
      manifestations: [
        "Make the struggle over who decides visible in one concrete choice.",
        "Use access, permission, rank, or cooperation to reveal the power dynamic."
      ]
    },
    "relationship-knots": {
      manifestations: [
        "Let shared history, closeness, rivalry, or obligation color the first beat.",
        "Make the connection visible through what feels familiar, owed, or unfinished."
      ]
    },
    "emotional-pressure": {
      manifestations: [
        "Let the feeling change one concrete choice instead of naming it.",
        "Make the need for reassurance, recognition, protection, or distance observable."
      ]
    },
    "secrets-schemes": {
      manifestations: [
        "Use what is known, hidden, suspected, or selectively revealed to shape the first beat.",
        "Let one piece of information change what you offer, avoid, or investigate."
      ]
    },
    "absurd-commitment": {
      manifestations: [
        "Commit to one impossible rule as though its consequences are practical.",
        "Ground the unusual through a specific task, cost, or responsibility."
      ]
    },
    "rules-rituals-institutions": {
      manifestations: [
        "Make a procedure, custom, record, or permission matter immediately.",
        "Let the system shape what can happen next, even when the human need is obvious."
      ]
    },
    "competition-consequences": {
      manifestations: [
        "Make the score, bargain, reward, or consequence visible in one choice.",
        "Let comparison or accountability raise the stakes of the next beat."
      ]
    },
    "advanced-scene-engines": {
      manifestations: [
        "Begin with a clear behavior that can later reverse, echo, or change meaning.",
        "Plant one specific detail you can revisit without planning the whole scene."
      ]
    }
  };

  const combinationPatterns = [
    {
      id: "channel",
      label: "Channel",
      principle: "Use the Stance as the method for pursuing the Drive.",
      blendTemplate: "Let “{stance}” determine how you pursue “{drive}.” Keep the pressure clear, but change the tactic in response to each offer.",
      nextBeatTemplate: "Repeat the pursuit through a more specific version of the Stance rather than restating the same request."
    },
    {
      id: "mask",
      label: "Mask",
      principle: "Let the Stance be what the room can see while the Drive supplies the private pressure underneath it.",
      blendTemplate: "Play “{stance}” openly while “{drive}” quietly determines what you keep steering toward, protecting, or avoiding.",
      nextBeatTemplate: "Let the outward Stance become more convincing as the hidden Drive becomes harder to protect."
    },
    {
      id: "friction",
      label: "Friction",
      principle: "Let the Stance make the Drive harder to pursue in an interesting, playable way.",
      blendTemplate: "Hold “{stance}” and “{drive}” sincerely even where they pull against each other. Let the difficulty shape your next attempt instead of solving it immediately.",
      nextBeatTemplate: "When the Drive stalls, make the contradiction more visible through a concrete choice rather than an explanation."
    },
    {
      id: "escalation",
      label: "Escalation",
      principle: "Use every success or failure of the Drive to intensify the Stance.",
      blendTemplate: "Treat each response to “{drive}” as fuel for “{stance},” then repeat the same cause-and-effect loop with greater consequence.",
      nextBeatTemplate: "Raise the practical or emotional stakes while preserving the same relationship between the two cards."
    },
    {
      id: "reinterpretation",
      label: "Reinterpretation",
      principle: "Let the Stance decide what each response means, then use that meaning to renew the Drive.",
      blendTemplate: "Filter each new offer through “{stance}.” Whatever it seems to mean becomes your reason to pursue “{drive}” again in a changed way.",
      nextBeatTemplate: "Make the next interpretation more specific and consequential without declaring it objectively true."
    },
    {
      id: "counterweight",
      label: "Counterweight",
      principle: "Let one card keep the other responsive, grounded, or emotionally legible.",
      blendTemplate: "Use “{stance}” to shape the tone and limits of “{drive}.” Let one card complicate the other without replacing it.",
      nextBeatTemplate: "Shift which card leads for one beat, then return to the shared pattern that their tension created."
    }
  ];

  const guidance = {
    "command-presence": {
      manifestations: [
        "Make one small decision before anyone asks, then act as though the scene needs your ruling to continue.",
        "Grant, deny, or redefine permission around an ordinary detail without explaining why the authority is yours."
      ]
    },
    "precarious-authority": {
      manifestations: [
        "Give one confident direction, then quietly change tactics when cooperation begins to wobble.",
        "Speak as though your position is secure while doing something concrete to keep support from slipping."
      ]
    },
    "professional-expertise": {
      manifestations: [
        "Correct one practical detail and let that correction establish your expertise without announcing it.",
        "Notice a standard no one else is tracking, then make your next choice through that standard."
      ]
    },
    "belonging-legitimacy": {
      manifestations: [
        "Behave as though your right to be here is already settled, especially when a small detail suggests otherwise.",
        "Copy, defend, or redefine one local norm so your place in the situation feels unquestionable."
      ]
    },
    "mentorship-rank": {
      manifestations: [
        "Offer one correction as though seniority gives you permanent permission to shape another person.",
        "Turn a small success or mistake into evidence about who is teaching whom."
      ]
    },
    "hidden-leverage": {
      manifestations: [
        "Stay outwardly modest while making one choice that quietly controls what can happen next.",
        "Reveal your influence through timing, access, or withheld cooperation rather than claiming power aloud."
      ]
    },
    "shared-origins": {
      manifestations: [
        "Treat one present-day detail with the familiarity of something you have done many times before.",
        "Let an ordinary offer trigger an old shorthand, habit, or comparison without explaining the full history."
      ]
    },
    "debts-favors": {
      manifestations: [
        "Frame one request or refusal as the latest entry in a long, unbalanced ledger.",
        "Offer help in a way that quietly reminds another person what is still owed."
      ]
    },
    "familiar-roles": {
      manifestations: [
        "Fall into an old role before anyone assigns it, then react when the present situation resists that pattern.",
        "Handle one problem exactly as this relationship has trained you to, even if the role no longer fits."
      ]
    },
    "rivalry-comparison": {
      manifestations: [
        "Turn a minor difference into a comparison and let the result matter more than it reasonably should.",
        "Use the next offer as a chance to measure, rank, or outdo rather than simply respond."
      ]
    },
    "trust-dependence": {
      manifestations: [
        "Give one person privileged access to your uncertainty, then protect how much their response matters.",
        "Ask for help indirectly while behaving as though the relationship makes the request obvious."
      ]
    },
    "rupture-unfinished-business": {
      manifestations: [
        "Let a harmless present detail brush against an unresolved past incident and change your behavior.",
        "Respond as though one old conversation never truly ended, without naming the whole story."
      ]
    },
    "admiration-envy": {
      manifestations: [
        "Let genuine admiration sharpen one small comparison until praise and resentment coexist.",
        "Notice something impressive, then protect your own status while acknowledging it."
      ]
    },
    "identity-nostalgia": {
      manifestations: [
        "Treat one present behavior as evidence of who someone used to be—or who you used to be with them.",
        "Respond to the current moment through a remembered version of the relationship."
      ]
    },
    "fear-insecurity": {
      manifestations: [
        "Interpret one neutral change as a possible sign that your place, value, or safety is slipping.",
        "Seek certainty through a small test instead of naming the fear directly."
      ]
    },
    "care-control": {
      manifestations: [
        "Offer care through a specific intervention that also limits someone else’s options.",
        "Turn concern into a practical correction, safeguard, or decision made on another person’s behalf."
      ]
    },
    "approval-belonging": {
      manifestations: [
        "Make one choice that quietly invites inclusion, endorsement, or reassurance without asking for it directly.",
        "Treat a small response as evidence about whether you belong and adjust immediately."
      ]
    },
    "pride-validation": {
      manifestations: [
        "Present one accomplishment or sacrifice as casual, then leave space for it to be noticed.",
        "Correct the record on a small detail so your effort, competence, or importance cannot be overlooked."
      ]
    },
    "ritual-tradition": {
      manifestations: [
        "Give an ordinary action a required sequence, gesture, or meaning and follow it with complete sincerity.",
        "Pause the practical task to honor one step that feels essential inside your worldview."
      ]
    },
    "crisis-catastrophe": {
      manifestations: [
        "Treat one manageable problem as the first visible sign of a much larger emergency.",
        "Prepare for the next consequence before anyone else has accepted that there is a problem."
      ]
    },
    "celebration-optimism": {
      manifestations: [
        "Receive one setback as unexpectedly good news and act on the opportunity you see inside it.",
        "Find a reason to congratulate the moment, then make the celebration create a new obligation."
      ]
    },
    "practical-grounding": {
      manifestations: [
        "Accept the strangest available premise and ask the next concrete question about cost, timing, or responsibility.",
        "Respond to the unusual by solving one ordinary logistical consequence instead of debating whether it is real."
      ]
    },
    "fixation-significance": {
      manifestations: [
        "Choose one small object, phrase, or rule and let it organize your attention and decisions.",
        "Return to one detail as though understanding it would settle the whole situation."
      ]
    },
    "pattern-grand-meaning": {
      manifestations: [
        "Connect two unrelated details into a larger pattern and let that pattern guide your next choice.",
        "Treat coincidence as evidence, then look for a third detail that completes the meaning."
      ]
    },
    "secure-help": {
      manifestations: [
        "Create a concrete problem that invites this person’s help, then make the need visible without announcing it.",
        "Show partial competence, then leave one essential step that makes assistance immediately useful."
      ]
    },
    "prevent-departure": {
      manifestations: [
        "Introduce one immediate reason the interaction cannot end yet, then make the next reason more personal.",
        "Turn a practical loose end into a reason to stay in contact without directly asking anyone to remain."
      ]
    },
    "obtain-apology": {
      manifestations: [
        "Name the effect of the offense without naming the offense itself, then leave room for repair.",
        "Create a small standard of respect and keep testing whether the moment meets it."
      ]
    },
    "gain-approval": {
      manifestations: [
        "Present a choice as nearly settled, then maneuver for a clear sign of endorsement.",
        "Ask for agreement through a practical next step rather than a direct yes-or-no question."
      ]
    },
    "transfer-task": {
      manifestations: [
        "Begin handing over one part of the work as though the responsibility shift has already been agreed.",
        "Define the task in a way that makes another person seem like the natural owner."
      ]
    },
    "extract-information": {
      manifestations: [
        "Ask around the missing fact through a specific practical question that reveals how much is known.",
        "Offer one small piece of information and notice what kind of detail comes back."
      ]
    },
    "recruit-ally": {
      manifestations: [
        "Create one small us-versus-the-problem moment and invite another person into it.",
        "Offer a role, secret, or shared benefit that makes joining immediately actionable."
      ]
    },
    "induce-risk": {
      manifestations: [
        "Make the first risky step seem small, reversible, or revealing, then invite someone else to take it.",
        "Turn uncertainty into a test whose result would supposedly help everyone."
      ]
    },
    "gain-recognition": {
      manifestations: [
        "Place one contribution where it cannot be ignored, then wait for acknowledgment without requesting praise.",
        "Correct who did what in a practical decision before the scene moves on."
      ]
    },
    "force-choice": {
      manifestations: [
        "Narrow the situation to two meaningful options and make delay feel like a choice of its own.",
        "Attach a consequence to not choosing while leaving both options genuinely playable."
      ]
    },
    "test-loyalty": {
      manifestations: [
        "Create one small request whose real purpose is to measure commitment rather than finish the task.",
        "Offer a chance to take your side and treat the response as evidence about the relationship."
      ]
    },
    "obtain-surrender": {
      manifestations: [
        "Ask for one concrete concession, object, or claim, then make its symbolic meaning grow.",
        "Frame giving something up as the cleanest available way to move forward."
      ]
    },
    "conceal-culpability": {
      manifestations: [
        "Help solve the problem in a way that directs attention toward everything except your own role.",
        "Volunteer one true detail that makes your responsibility seem less likely."
      ]
    },
    "avoid-subject": {
      manifestations: [
        "Answer emotional pressure with a useful but sideways topic, then keep the detour active.",
        "Turn a direct opening into a practical task that postpones the dangerous conversation."
      ]
    },
    "protective-deception": {
      manifestations: [
        "Withhold one truth through a concrete act of care rather than simple vagueness.",
        "Offer a reassuring version that protects someone now but creates a future complication."
      ]
    },
    "induce-confession": {
      manifestations: [
        "Share a small admission first, then use it to make a larger admission feel expected.",
        "Ask a question that sounds practical while quietly narrowing the space for evasion."
      ]
    },
    "reframe-failure": {
      manifestations: [
        "Name one real benefit created by the failure, then build a revised definition of success around it.",
        "Treat the setback as evidence that the original plan was more ambitious or necessary than anyone realized."
      ]
    },
    "feign-competence": {
      manifestations: [
        "Take one decisive action before you fully understand the task, then protect the appearance of intention.",
        "Use confident process language to buy time while learning from the next response."
      ]
    },
    "competition-loop": {
      manifestations: [
        "Turn the next small difference into a score, then create a new category when the result is inconvenient.",
        "Answer another person’s success by redefining what counts as winning."
      ]
    },
    "positive-reframing": {
      manifestations: [
        "Translate one setback into an advantage, then make the optimistic interpretation require action.",
        "Find a useful upside in each new problem and become more committed as the cost grows."
      ]
    },
    "emotional-contradiction": {
      manifestations: [
        "Let your words and emotional behavior pull in opposite directions, then widen the gap on the next beat.",
        "Offer support, calm, or warmth while one physical or practical choice reveals the competing feeling."
      ]
    },
    "transactional-framing": {
      manifestations: [
        "Attach a term, price, favor, or exchange to an ordinary human moment.",
        "Respond to generosity by clarifying what is owed, who benefits, and when repayment begins."
      ]
    },
    "self-serving-agreement": {
      manifestations: [
        "Agree quickly, then define one key word so the agreement serves your own plan.",
        "Accept the proposal in principle while changing the practical version you are willing to perform."
      ]
    },
    "pattern-escalation": {
      manifestations: [
        "Treat one minor detail as the start of a pattern, then use the next detail to enlarge the consequence.",
        "Bring back the same logic with a clearer rule, wider scope, or higher cost."
      ]
    }
  };

  const heighteningByType = {
    stance: {
      grounded: "Apply the same interpretation to a more consequential offer while keeping the behavior specific and believable.",
      heightened: "Keep the original logic intact, but let it shape a larger choice with clearer emotional or practical stakes.",
      absurd: "Treat the unusual logic as increasingly practical; add consequence rather than random new weirdness.",
      flexible: "Repeat the point of view on a different kind of offer and let the partner’s response change its expression."
    },
    drive: {
      grounded: "Pursue the same pressure through a changed tactic, using the response you received instead of repeating the same words.",
      heightened: "Raise what the pursuit could cost or reveal while leaving the other performer free to respond.",
      absurd: "Let the objective remain emotionally sincere while its practical consequences become more elaborate.",
      flexible: "Repeat the pressure in a new form, then follow whichever shared cause-and-effect pattern becomes clearest."
    }
  };

  const acceptanceRules = [
    "Address only the card holder’s observable behavior, interpretation, or tactic.",
    "Do not define another performer’s thoughts, feelings, knowledge, or required response.",
    "Do not establish a mandatory setting, relationship, plot, punchline, or ending.",
    "Do not treat a Drive as a win condition or require successful completion.",
    "Offer one playable first move while preserving room for listening and adaptation.",
    "Frame every hint as one possible way in, never the correct performance."
  ];

  function normalizePolicy(value) {
    return Object.prototype.hasOwnProperty.call(policyById, value) ? value : DEFAULT_HINT_POLICY;
  }

  function getPolicy(value) {
    return policyById[normalizePolicy(value)];
  }

  function getSubthemeGuidance(subthemeId) {
    return guidance[subthemeId] || null;
  }

  function getPackLens(packId) {
    return packLenses[packId] || null;
  }

  function getPattern(patternId) {
    return combinationPatterns.find((pattern) => pattern.id === patternId) || combinationPatterns[0];
  }

  // Fail loudly during development if the Hint Bible no longer covers the Card Bible.
  const expectedSubthemes = cardBible.categories.flatMap((category) => category.subthemes.map((subtheme) => subtheme.id));
  const missingSubthemes = expectedSubthemes.filter((id) => !guidance[id]);
  const unexpectedSubthemes = Object.keys(guidance).filter((id) => !expectedSubthemes.includes(id));
  if (missingSubthemes.length || unexpectedSubthemes.length) {
    throw new Error(`Hint Bible taxonomy mismatch. Missing: ${missingSubthemes.join(", ") || "none"}; unexpected: ${unexpectedSubthemes.join(", ") || "none"}.`);
  }

  const expectedPackIds = cardBible.packPlan.map((pack) => pack.id);
  const missingPackLenses = expectedPackIds.filter((id) => !packLenses[id]);
  const unexpectedPackLenses = Object.keys(packLenses).filter((id) => !expectedPackIds.includes(id));
  if (missingPackLenses.length || unexpectedPackLenses.length) {
    throw new Error(`Hint Bible pack-lens mismatch. Missing: ${missingPackLenses.join(", ") || "none"}; unexpected: ${unexpectedPackLenses.join(", ") || "none"}.`);
  }

  return deepFreeze({
    HINT_SCHEMA_VERSION,
    HINT_LIBRARY_VERSION,
    DEFAULT_HINT_POLICY,
    policies,
    policyById,
    combinationPatterns,
    packLenses,
    subthemeGuidance: guidance,
    heighteningByType,
    acceptanceRules,
    normalizePolicy,
    getPolicy,
    getSubthemeGuidance,
    getPackLens,
    getPattern
  });
});
