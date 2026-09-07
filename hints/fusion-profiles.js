(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = api;
  } else {
    root.IMPROMPT_FUSION_PROFILES = api;
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const PROFILE_VERSION = "1.0.0";

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

  // Each Stance profile defines how that dramatic family becomes an observable
  // method. The language is deliberately holder-only: it never predicts or
  // prescribes another performer's response.
  const stanceProfiles = {
    "command-presence": {
      instrument: "a confident ruling about what happens next",
      reading: "treat questions or hesitation as invitations for your approval",
      escalation: "let the next ruling affect something more consequential",
      tension: "the need to remain visibly in charge"
    },
    "precarious-authority": {
      instrument: "a confident direction that quietly protects shaky authority",
      reading: "read resistance as a threat to the position rather than only the plan",
      escalation: "perform greater certainty while relying more heavily on cooperation",
      tension: "the gap between formal authority and practical dependence"
    },
    "professional-expertise": {
      instrument: "a concrete correction or standard only you appear to notice",
      reading: "treat disregard for the standard as evidence that your expertise is needed",
      escalation: "apply the standard to a more consequential choice",
      tension: "the need to prove expertise through action"
    },
    "belonging-legitimacy": {
      instrument: "a local norm you confidently adopt, defend, or redefine",
      reading: "treat small challenges as tests of your legitimacy",
      escalation: "claim more responsibility or privilege without asking permission",
      tension: "the need to belong without exposing doubt"
    },
    "mentorship-rank": {
      instrument: "a correction or lesson that assumes continuing seniority",
      reading: "treat success or resistance as evidence about who is teaching whom",
      escalation: "turn a larger choice into the next lesson",
      tension: "the need to preserve rank while the relationship changes"
    },
    "hidden-leverage": {
      instrument: "a modest-looking choice that quietly controls timing, access, or cooperation",
      reading: "treat dependence on your access as proof of influence",
      escalation: "time or withhold a more valuable form of cooperation",
      tension: "the gap between apparent modesty and actual control"
    },
    "shared-origins": {
      instrument: "an old shorthand, habit, or familiar comparison",
      reading: "interpret the present through the history you remember",
      escalation: "bring back a more revealing old habit or comparison",
      tension: "the pull of a shared past on the present"
    },
    "debts-favors": {
      instrument: "a reminder of what has been given, owed, or repaid",
      reading: "treat generosity or resistance as evidence about the balance",
      escalation: "attach a larger practical or emotional debt to the next exchange",
      tension: "the need to settle or preserve an imbalance"
    },
    "familiar-roles": {
      instrument: "the old role you fall into without being asked",
      reading: "treat pushback as evidence that the familiar role is changing",
      escalation: "apply the old role to a problem it no longer fits",
      tension: "the comfort and cost of a familiar role"
    },
    "rivalry-comparison": {
      instrument: "a comparison that turns a minor difference into a contest",
      reading: "treat every difference as evidence of who is ahead",
      escalation: "make the next comparison more consequential or personal",
      tension: "the need to know who is winning"
    },
    "trust-dependence": {
      instrument: "a choice that reveals how much you rely on the connection",
      reading: "treat reliability or hesitation as evidence about whether dependence is safe",
      escalation: "risk a more vulnerable form of reliance",
      tension: "the need to depend without admitting how much"
    },
    "rupture-unfinished-business": {
      instrument: "an ordinary detail that reopens what was never resolved",
      reading: "treat avoidance or familiarity as evidence that the past remains active",
      escalation: "make the unresolved history affect a present decision",
      tension: "the need to address what was never finished"
    },
    "admiration-envy": {
      instrument: "a compliment, imitation, or correction that reveals admiration and discomfort",
      reading: "treat another strength as evidence of your own threatened standing",
      escalation: "make the admiration more sincere and the resentment more visible",
      tension: "wanting what you admire without feeling diminished"
    },
    "identity-nostalgia": {
      instrument: "a reference to who you or the relationship used to be",
      reading: "treat change as evidence that something valuable is being lost",
      escalation: "ask the present to live up to a more emotionally loaded memory",
      tension: "the wish to recover an older identity"
    },
    "fear-insecurity": {
      instrument: "a cautious choice that treats uncertainty as warning",
      reading: "treat ambiguity as evidence that the feared outcome may already be happening",
      escalation: "prepare for a more consequential version of the threat",
      tension: "the need for safety without admitting fear"
    },
    "care-control": {
      instrument: "an act of help that also narrows what choices feel acceptable",
      reading: "treat resistance as proof that more protection is needed",
      escalation: "make the next form of help more comprehensive and harder to refuse",
      tension: "the belief that caring justifies control"
    },
    "approval-belonging": {
      instrument: "a small bid to be accepted, chosen, or reassured",
      reading: "treat a neutral response as evidence that you must try harder",
      escalation: "risk a more revealing bid for belonging",
      tension: "the need to be chosen without directly asking"
    },
    "pride-validation": {
      instrument: "a display of competence or importance that quietly asks to be recognized",
      reading: "treat insufficient recognition as a challenge to your worth",
      escalation: "raise the scale of what you display or claim credit for",
      tension: "the need for validation disguised as pride"
    },
    "ritual-tradition": {
      instrument: "a routine or formality you treat as necessary",
      reading: "treat deviation as a threat to meaning or legitimacy",
      escalation: "add a more consequential ceremonial requirement",
      tension: "the need to preserve order through ritual"
    },
    "crisis-catastrophe": {
      instrument: "a minor detail you treat as urgent evidence",
      reading: "treat every delay or contradiction as proof that the crisis is spreading",
      escalation: "make the next precaution broader or more costly",
      tension: "the certainty that disaster is already underway"
    },
    "celebration-optimism": {
      instrument: "a setback you frame as good news or a reason to celebrate",
      reading: "treat resistance as evidence that the opportunity has not been understood yet",
      escalation: "turn a larger setback into a more ambitious celebration",
      tension: "the need to preserve optimism against contrary evidence"
    },
    "practical-grounding": {
      instrument: "a concrete question about cost, timing, safety, or responsibility",
      reading: "interpret each unusual development through its practical consequence",
      escalation: "make the next practical consequence more specific or costly",
      tension: "the need to keep reality operational"
    },
    "fixation-significance": {
      instrument: "one ordinary object, phrase, or rule you treat as crucial",
      reading: "interpret every response through what it implies about that detail",
      escalation: "make the detail govern a more consequential decision",
      tension: "the belief that one small thing explains what matters"
    },
    "pattern-grand-meaning": {
      instrument: "a connection between details that suggests a larger system",
      reading: "treat coincidence as confirmation rather than accident",
      escalation: "find a third detail that expands the pattern's meaning",
      tension: "the need for events to belong to one larger design"
    }
  };

  // Each Drive profile defines a pressure and the tactics available when the
  // first attempt meets the scene. Again, all language directs only the holder.
  const driveProfiles = {
    "secure-help": {
      aim: "secure meaningful help without simply stating how much you need it",
      opening: "create one concrete task that becomes easier, safer, or possible with assistance",
      blocked: "reduce the request to a smaller favor that reveals the same need",
      traction: "let the help expose why the need matters more than you admitted",
      loop: "each attempt to remain self-sufficient creates another reason help is necessary",
      pressure: "the need for support"
    },
    "prevent-departure": {
      aim: "keep the interaction from ending before something important feels complete",
      opening: "identify one unfinished condition that makes leaving premature",
      blocked: "replace the reason to stay with a different practical or emotional loose end",
      traction: "reveal that the first reason was only the surface of what remains unresolved",
      loop: "each attempt at closure uncovers a new condition for staying",
      pressure: "the need to prevent separation"
    },
    "obtain-apology": {
      aim: "create an opening for an apology without naming the offense outright",
      opening: "describe one consequence or standard that makes acknowledgment necessary",
      blocked: "shift from asking for words to requesting a concrete act of repair",
      traction: "let partial acknowledgment reveal what still has not been owned",
      loop: "each near-apology clarifies a more specific thing you need recognized",
      pressure: "the need for acknowledgment and repair"
    },
    "gain-approval": {
      aim: "secure endorsement for a choice, plan, or version of yourself",
      opening: "present one decision as nearly settled while leaving a clear space for approval",
      blocked: "reframe the choice through a value that could make it easier to endorse",
      traction: "treat partial approval as permission to reveal a larger commitment",
      loop: "each uncertain response leads you to package the same choice more persuasively",
      pressure: "the need for validation or permission"
    },
    "transfer-task": {
      aim: "move an unwanted responsibility away from yourself",
      opening: "define one task as the natural extension of another role, skill, or promise",
      blocked: "split the task into a smaller first step that quietly transfers ownership",
      traction: "treat any assistance as acceptance of the larger responsibility",
      loop: "each refusal produces a new reason the task logically belongs elsewhere",
      pressure: "the need to escape responsibility"
    },
    "extract-information": {
      aim: "learn something important without exposing what you already know or suspect",
      opening: "ask one concrete question that appears useful for another purpose",
      blocked: "offer a partial fact or mistaken assumption that leaves room for correction",
      traction: "follow any revealed detail with a narrower question",
      loop: "each answer changes the cover reason for your next question",
      pressure: "the need for information"
    },
    "recruit-ally": {
      aim: "bring another person into your plan without making the full cost visible at once",
      opening: "offer one limited role that gives participation an immediate purpose",
      blocked: "reframe participation as protection, fairness, opportunity, or necessity",
      traction: "expand the role after the first commitment",
      loop: "each accepted step reveals a slightly larger version of the plan",
      pressure: "the need for an ally"
    },
    "induce-risk": {
      aim: "get someone else to take the first uncertain or rule-breaking step",
      opening: "make one small risk seem ordinary, reversible, or already underway",
      blocked: "take a symbolic portion of the risk while leaving the consequential part open",
      traction: "treat the first step as evidence that a larger step is now reasonable",
      loop: "each hesitation leads you to reduce, rename, or normalize the next risk",
      pressure: "the need for someone else to go first"
    },
    "gain-recognition": {
      aim: "make your contribution, expertise, or importance impossible to overlook",
      opening: "attach your role to one visible result or decision",
      blocked: "name a concrete detail that would not exist without your contribution",
      traction: "connect the recognition to a larger claim about status or belonging",
      loop: "each insufficient acknowledgment leads to a more specific proof of importance",
      pressure: "the need to be seen and credited"
    },
    "force-choice": {
      aim: "turn ambiguity into a decision that cannot be indefinitely postponed",
      opening: "reduce the situation to two concrete paths and name what each costs",
      blocked: "remove one escape route with a deadline, consequence, or practical limit",
      traction: "treat the first preference as a commitment requiring follow-through",
      loop: "each attempt to remain undecided creates a narrower and more consequential choice",
      pressure: "the need for a decision"
    },
    "test-loyalty": {
      aim: "learn whether the relationship or alliance will hold under pressure",
      opening: "create one small request whose meaning is larger than the task itself",
      blocked: "change the test so it reveals priority, discretion, or sacrifice instead of obedience",
      traction: "raise the test from symbolic support to a concrete cost",
      loop: "each response becomes evidence that justifies a more revealing test",
      pressure: "the need for proof of loyalty"
    },
    "obtain-surrender": {
      aim: "get something valued, defended, or controlled released into your hands",
      opening: "identify one concrete cost of continuing to hold onto it",
      blocked: "offer an exchange, a safe exit, or a narrower concession",
      traction: "treat the first concession as evidence that full surrender is reasonable",
      loop: "each refusal changes the terms but increases the pressure to let go",
      pressure: "the need to gain what is being withheld"
    },
    "conceal-culpability": {
      aim: "keep your role in the problem from becoming the focus",
      opening: "volunteer to organize the response, cleanup, or investigation",
      blocked: "redirect attention toward a clue, task, or cause you can control",
      traction: "take charge of more of the solution while revealing less about the cause",
      loop: "whenever attention approaches your role, become more helpful and more controlling",
      pressure: "the need to hide responsibility"
    },
    "avoid-subject": {
      aim: "keep the interaction away from one dangerous subject",
      opening: "introduce a useful practical topic that gives the moment somewhere safer to go",
      blocked: "turn the dangerous question into a task, clarification, or side issue",
      traction: "keep the safer topic active by making it more urgent or consequential",
      loop: "each approach to the forbidden subject triggers a more committed redirection",
      pressure: "the need to avoid the subject"
    },
    "protective-deception": {
      aim: "steer the scene away from a truth you believe would cause harm",
      opening: "offer a reassuring explanation that solves the immediate concern without revealing the truth",
      blocked: "replace the explanation with a practical reason to delay disclosure",
      traction: "use any relief as permission to protect the deception longer",
      loop: "each new question forces a kinder, more elaborate version of the concealment",
      pressure: "the need to protect through deception"
    },
    "induce-confession": {
      aim: "create conditions in which more truth may be revealed before you expose your own position",
      opening: "share one limited vulnerability, suspicion, or fact that invites a more revealing response",
      blocked: "state an incomplete theory and leave room for correction",
      traction: "narrow the conversation to the part that remains unspoken",
      loop: "each partial disclosure earns a more specific invitation to reveal more",
      pressure: "the need for someone else to disclose first"
    },
    "reframe-failure": {
      aim: "make a setback appear useful, necessary, or secretly successful",
      opening: "name one concrete benefit, lesson, or hidden objective produced by the failure",
      blocked: "change the measure of success rather than denying what happened",
      traction: "use acceptance of the new measure to justify the next step",
      loop: "each new consequence becomes further evidence that the plan is working differently",
      pressure: "the need to preserve the value of the plan"
    },
    "feign-competence": {
      aim: "maintain the appearance that you know what you are doing",
      opening: "give one specific instruction or explanation before it can be tested",
      blocked: "replace certainty about facts with certainty about process",
      traction: "treat compliance with the first direction as evidence of expertise",
      loop: "each gap in knowledge produces a more confident procedural response",
      pressure: "the need to appear capable"
    },
    "competition-loop": {
      aim: "turn the interaction into a contest you can keep escalating",
      opening: "choose one measurable difference and declare it evidence of who is ahead",
      blocked: "change the metric while preserving the claim that the contest matters",
      traction: "raise the reward, audience, or consequence of the next round",
      loop: "every disagreement becomes a new event in the same competition",
      pressure: "the need to win or compare"
    },
    "positive-reframing": {
      aim: "turn every setback into proof that things are improving",
      opening: "identify one concrete advantage created by the current problem",
      blocked: "move from optimism about the outcome to optimism about the lesson, timing, or opportunity",
      traction: "use the supposed good news to justify a more ambitious next step",
      loop: "each worsening development receives a brighter and more consequential interpretation",
      pressure: "the need to preserve optimism"
    },
    "emotional-contradiction": {
      aim: "keep one supportive surface visible while an opposing feeling intensifies",
      opening: "offer practical help while letting one precise word or choice reveal the contradiction",
      blocked: "become more helpful in form and more emotionally pointed in detail",
      traction: "let cooperation make the concealed feeling harder to hide",
      loop: "each supportive act carries a sharper trace of the opposing emotion",
      pressure: "the tension between what you show and what you feel"
    },
    "transactional-framing": {
      aim: "turn every offer, feeling, or favor into terms that can be negotiated",
      opening: "attach one explicit condition, price, deadline, or return obligation to the next exchange",
      blocked: "change the currency from practical value to status, loyalty, time, or recognition",
      traction: "treat agreement on one term as acceptance of a larger bargain",
      loop: "each new offer creates another clause, fee, or obligation",
      pressure: "the need to make the relationship calculable"
    },
    "self-serving-agreement": {
      aim: "appear cooperative while redefining agreement in your own favor",
      opening: "agree to the exact words, then act on the interpretation that benefits you most",
      blocked: "accept a smaller point and use it to justify a larger advantage",
      traction: "treat lack of objection as consent to your interpretation",
      loop: "each agreement produces a new self-serving definition of what was decided",
      pressure: "the need to win through apparent cooperation"
    },
    "pattern-escalation": {
      aim: "treat each minor detail as further evidence of a larger problem or design",
      opening: "connect two small details and act as though they establish a meaningful pattern",
      blocked: "reinterpret contradiction as proof that the pattern is more complex",
      traction: "add a third detail that raises the practical or emotional stakes",
      loop: "every new fact expands the pattern and demands a larger response",
      pressure: "the need to make the pattern grow"
    }
  };

  const packAnchors = {
    "core-foundations": [
      "one clear, ordinary detail",
      "a simple choice already present in the scene"
    ],
    "everyday-friction": [
      "a small task, routine, delay, or shared resource",
      "an ordinary inconvenience that has become personal"
    ],
    "power-games": [
      "a concrete decision about access, permission, rank, or cooperation",
      "one choice that reveals who gets to decide"
    ],
    "relationship-knots": [
      "something familiar, owed, rivalrous, or unfinished between the characters",
      "a shared habit, memory, obligation, or boundary"
    ],
    "emotional-pressure": [
      "a choice that exposes a need for reassurance, recognition, protection, or distance",
      "one practical action carrying an unspoken emotional need"
    ],
    "secrets-schemes": [
      "a clue, omission, suspicion, or selective disclosure",
      "one piece of information that changes what can safely happen next"
    ],
    "absurd-commitment": [
      "one impossible rule and its practical consequence",
      "a strange premise treated as a real task, cost, or responsibility"
    ],
    "rules-rituals-institutions": [
      "a procedure, custom, record, permission, or exception",
      "one system requirement that constrains the next choice"
    ],
    "competition-consequences": [
      "a score, bargain, reward, comparison, or consequence",
      "one result that raises the stakes of the next choice"
    ],
    "advanced-scene-engines": [
      "one detail that can later echo, reverse, or change meaning",
      "a specific offer that can return with new significance"
    ]
  };

  function getStance(cardOrId) {
    const id = typeof cardOrId === "string" ? cardOrId : cardOrId && cardOrId.subthemeId;
    return id ? stanceProfiles[id] || null : null;
  }

  function getDrive(cardOrId) {
    const id = typeof cardOrId === "string" ? cardOrId : cardOrId && cardOrId.subthemeId;
    return id ? driveProfiles[id] || null : null;
  }

  function getAnchor(cardOrPackId, angle = 0) {
    const packId = typeof cardOrPackId === "string" ? cardOrPackId : cardOrPackId && cardOrPackId.packId;
    const anchors = packAnchors[packId] || ["one concrete detail already present in the scene"];
    const normalized = ((Number(angle) || 0) % anchors.length + anchors.length) % anchors.length;
    return anchors[normalized];
  }

  return deepFreeze({
    PROFILE_VERSION,
    stanceProfiles,
    driveProfiles,
    packAnchors,
    getStance,
    getDrive,
    getAnchor
  });
});
