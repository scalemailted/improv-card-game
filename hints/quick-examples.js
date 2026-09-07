/* Instant fallback examples. Finite, locally varied; never presented as AI output. */
(function (root, factory) {
  const common = typeof module === "object" && module.exports;
  const api = factory(common ? require('../hint-engine.js') : root.IMPROMPT_HINT_ENGINE,
    common ? require('./card-hints.js') : root.IMPROMPT_CARD_HINTS);
  if (common) module.exports = api; else root.IMPROMPT_QUICK_EXAMPLES = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function (engine, hints) {
  "use strict";
  const singles = {
    S01: ["Pause before answering a simple question, then grant permission as though everyone was waiting for your approval.", "Approve an ordinary choice nobody submitted to you, then offer one small correction as a favor."],
    S02: ["Announce your decision firmly, then quietly ask whether it would be too much trouble to go along with it.", "Give an instruction, then immediately offer to do the inconvenient part yourself."],
    S22: ["Accept the impossible news, then ask whether the extra mouths will need separate lunch orders.", "Ask what time the extraordinary event starts so you can arrange transport home."],
    S67: ["Ask who authorized a simple favor, then offer to pass the request upward rather than answering it yourself.", "Before agreeing to a small change, ask who can approve the person who normally approves changes."],
    S89: ["Begin using an old private nickname, then watch for recognition while pretending it slipped out accidentally.", "Offer to save a familiar place beside you, phrasing it as a practical convenience rather than an invitation."],
    S114: ["Describe an obvious struggle as a training exercise, then ask for help as though recruiting an assistant.", "Thank someone for noticing your endurance when they express concern, and keep doing the difficult task."],
    S192: ["Turn two unrelated personal preferences into a rule, then apply it to the next small decision.", "Describe an awkward exception as a precedent and start explaining which future choices it will govern."],
    D01: ["Set down the thing you were helping with and ask which part they would like you to finish.", "Offer two solutions, then casually point out that both depend on a skill you happen to have."],
    D13: ["Volunteer to reconstruct what happened, carefully starting the timeline just after your own mistake.", "Offer to collect the evidence, then spend far too long explaining one harmless detail."],
    D14: ["As the difficult subject approaches, interrupt yourself with an urgent question about who is bringing the supplies.", "Answer the start of an uncomfortable question with an enthusiastic offer to handle an unrelated practical problem."],
    D74: ["Begin a goodbye, stop yourself, and ask whether one small hurt can be settled before you go.", "Offer to finish a shared task together, stretching its last step while you search for a sign of reconciliation."],
    D97: ["Hand over one small decision and admit you would be relieved not to make it alone.", "Ask someone to sit with you while you handle a routine task, calling it company rather than support."],
    D101: ["Offer to handle every follow-up question once someone else has said the difficult first sentence.", "Rehearse a careful introduction, stop at the uncomfortable word, and invite someone else to supply it."]
  };
  const familyExamples = {
  "command-presence": [
    "Choose where an ordinary object belongs, then wait as though your choice settles the matter.",
    "Answer a casual suggestion with a formal approval, adding one condition nobody requested."
  ],
  "precarious-authority": [
    "Give a firm instruction, then quietly offer to handle the inconvenient part yourself.",
    "Begin announcing a decision, then soften it into a question as soon as it sounds difficult to enforce."
  ],
  "professional-expertise": [
    "Inspect a small detail, quietly correct it, and explain why that tiny correction saves everything.",
    "Offer to demonstrate the proper method, then become absorbed in a detail nobody asked about."
  ],
  "belonging-legitimacy": [
    "Greet an unfamiliar object like an old friend, then ask an indirect question about how it works.",
    "Copy a small routine confidently, covering your uncertainty with a casual remark about how things used to be done."
  ],
  "mentorship-rank": [
    "Watch a simple action closely, then praise one detail as though it came from your earlier guidance.",
    "Offer a final piece of advice while quietly stepping aside to see whether you are still needed."
  ],
  "hidden-leverage": [
    "Offer the missing item with exaggerated casualness, then pause before actually handing it over.",
    "Ask a routine permission question only after making it clear you have the information needed to proceed."
  ],
  "shared-origins": [
    "Bring back an old nickname during a formal moment, acting as though nothing between you has changed.",
    "Compare a polished new habit with an awkward old one, using affectionate familiarity rather than an accusation."
  ],
  "debts-favors": [
    "Offer a tiny favor, then casually recall a much larger one you once provided.",
    "Accept a gift with relief, then begin mentally subtracting it from something you believe is still owed."
  ],
  "familiar-roles": [
    "Start tidying a small problem before being asked, then act surprised that you are doing it again.",
    "Reach for a familiar responsibility automatically, then hesitate because you had hoped this time would be different."
  ],
  "rivalry-comparison": [
    "Ask how long a routine task took, then announce your own time a little too casually.",
    "Admire a minor success, then add one detail about the harder version you have attempted."
  ],
  "trust-dependence": [
    "Hand over an ordinary task, then keep checking it while insisting you are completely comfortable.",
    "Ask for advice on a tiny decision, revealing how much more important their answer feels than the decision itself."
  ],
  "rupture-unfinished-business": [
    "Pick up a familiar object and begin discussing an old incident as though you are only commenting on the object.",
    "Offer a polite greeting, then accidentally use the exact phrase from a disagreement you have not resolved."
  ],
  "admiration-envy": [
    "Copy a small gesture you admire, then explain why you would normally do it differently.",
    "Give a precise compliment, then rush into a comparison that reveals how closely you have been watching."
  ],
  "identity-nostalgia": [
    "Perform an old routine with confidence, then pause when it no longer feels natural.",
    "Describe a simple change as a loss of who you used to be, then attempt to recreate one old detail."
  ],
  "fear-insecurity": [
    "Ask who will handle your usual task next time, pretending you are only checking the schedule.",
    "Offer to be extra useful after a neutral remark, then make the offer larger than the situation requires."
  ],
  "care-control": [
    "Offer two helpful choices, then quietly remove the one you consider risky.",
    "Ask whether everything is comfortable while steadily rearranging the situation to match your own judgment."
  ],
  "approval-belonging": [
    "Mention a small accomplishment, then leave a conspicuous pause before changing the subject.",
    "Ask an apparently practical preference question, then adjust your own preference immediately after hearing the answer."
  ],
  "pride-validation": [
    "Accept a compliment as routine, then repeat the part of your effort it failed to mention.",
    "Brush off praise, then return to the achievement with a new detail that invites another look."
  ],
  "ritual-tradition": [
    "Pause an ordinary task to repeat a small gesture in the correct order, treating it with complete sincerity.",
    "Begin a simple exchange with a formal acknowledgment, then restart when your own wording feels insufficient."
  ],
  "crisis-catastrophe": [
    "Check a minor detail twice, then start preparing a backup plan for its failure.",
    "Lower your voice to discuss a tiny delay and begin quietly rearranging everything around it."
  ],
  "celebration-optimism": [
    "Celebrate a disappointing result as the removal of an obstacle you never wanted anyway.",
    "Congratulate yourself on discovering a problem early, then begin describing the opportunity it creates."
  ],
  "practical-grounding": [
    "Accept the extraordinary news, then ask whether the extra mouths need separate lunch orders.",
    "Ask what time the impossible event starts so you can arrange a sensible way home."
  ],
  "fixation-significance": [
    "Move one ordinary object a few inches, then interrupt your own conversation to put it back exactly.",
    "Return to a casual word from earlier and handle it as though its precise wording changes everything."
  ],
  "pattern-grand-meaning": [
    "Connect two unrelated details, then use that connection to decide what you should do next.",
    "Notice a repeated phrase and begin treating your next small choice as a test of what the repetition means."
  ],
  "secure-help": [
    "Set down an unfinished task and ask which part you should handle next, leaving your usefulness visible.",
    "Offer a small demonstration, then stop just before the part that would make your help indispensable."
  ],
  "prevent-departure": [
    "Begin saying goodbye, then remember one small thing you would rather finish together.",
    "Offer to walk part of the way, extending the conversation with a practical errand you can share."
  ],
  "obtain-apology": [
    "Mention the inconvenient aftermath of an incident while carefully avoiding the incident itself.",
    "Demonstrate how you now handle a simple task differently, leaving space for the hurt behind the change to be noticed."
  ],
  "gain-approval": [
    "Show the most attractive result of your decision before mentioning that you already acted on it.",
    "Ask whether a hypothetical change sounds reasonable, then reveal one small sign that it has already happened."
  ],
  "transfer-task": [
    "Praise a skill that happens to fit your unwanted task, then set the unfinished work within view.",
    "Offer to handle every follow-up detail except the one difficult first step."
  ],
  "extract-information": [
    "Offer one harmless detail and pause, listening for a correction that reveals what you do not know.",
    "Ask an apparently practical question about timing, using the answer to narrow down what might have happened."
  ],
  "recruit-ally": [
    "Invite help with one harmless first step before explaining the larger undertaking.",
    "Ask for advice on your plan, then offer a small role that uses the advice you receive."
  ],
  "induce-risk": [
    "Describe a tempting shortcut and volunteer to handle the consequences after someone else tries the first step.",
    "Offer to go next, carefully keeping the first uncertain attempt available for someone else."
  ],
  "gain-recognition": [
    "Describe a successful result, then add the small contribution of yours that made it possible.",
    "Offer to demonstrate your method again, lingering on the difficult part nobody has acknowledged."
  ],
  "force-choice": [
    "Present two practical arrangements and ask which one you should prepare, making your preferred choice conspicuous.",
    "Ask what should be protected first when two valued things cannot both receive your attention."
  ],
  "test-loyalty": [
    "Offer a minor confidence and watch how carefully you handle the next request for one.",
    "Ask for a small inconvenient favor, presenting it as routine while privately treating the answer as important."
  ],
  "obtain-surrender": [
    "Offer to safeguard a valued object, then describe how much easier things would be without carrying it.",
    "Ask to handle one small part of a responsibility before suggesting a larger handover."
  ],
  "conceal-culpability": [
    "Offer to reconstruct the incident, beginning your careful timeline immediately after your own mistake.",
    "Volunteer a true but harmless detail, then keep returning to it whenever the explanation approaches your role."
  ],
  "avoid-subject": [
    "As an awkward question approaches, interrupt yourself with a practical detail that suddenly needs attention.",
    "Answer the beginning of a difficult question by enthusiastically offering help with something unrelated."
  ],
  "protective-deception": [
    "Give a reassuring detail that is technically true, then offer a practical distraction from the part you omitted.",
    "Deliver good news first and keep finding small preparations to finish before sharing the rest."
  ],
  "induce-confession": [
    "Admit a harmless mistake of your own, then leave a generous pause before disclosing anything more serious.",
    "Offer an innocent explanation of what happened and listen for the detail someone might correct."
  ],
  "reframe-failure": [
    "Describe a visible setback as a useful test result, then propose the next small experiment.",
    "Point to the one part that worked and build your explanation of the whole plan around it."
  ],
  "feign-competence": [
    "Repeat an unfamiliar term confidently, then ask a question that quietly gets its meaning explained.",
    "Announce that you are checking the basics and use the check to discover what you do not know."
  ],
  "competition-loop": [
    "Turn a simple compliment into a friendly rematch, inventing a smaller contest you might win.",
    "Time yourself doing a routine task and casually invite a comparison."
  ],
  "positive-reframing": [
    "Thank the latest inconvenience for revealing a hidden opportunity, then enthusiastically begin using it.",
    "Celebrate a setback as progress toward a different goal, adjusting the celebration as the problems accumulate."
  ],
  "emotional-contradiction": [
    "Offer help warmly while correcting a tiny detail with far more precision than it needs.",
    "Deliver a supportive compliment through a tightly controlled smile, then insist on doing the next favor yourself."
  ],
  "transactional-framing": [
    "Accept a small favor by immediately asking what you now owe in return.",
    "Attach a minor condition to a generous offer, then begin refining the exchange rate."
  ],
  "self-serving-agreement": [
    "Agree enthusiastically, then repeat the agreement with one convenient change to your own responsibility.",
    "Offer a literal version of what was requested that preserves the thing you did not want to give up."
  ],
  "pattern-escalation": [
    "Bring back one small detail from earlier as evidence that the newest problem belongs to a larger pattern.",
    "Link the latest inconvenience to an earlier one, then make your next choice answer both at once."
  ]
};
  const pairs = {
    'S22+D14': [
      "Whenever the conversation nears your protected subject, accept the strange premise and ask who is paying for the next practical step.",
      "Ask for a departure timetable as soon as the awkward topic approaches; keep finding another connection that needs checking.",
      "Redirect the difficult question into a sincere safety check, becoming more practical as you get closer to revealing yourself."],
    'S67+D101': [
      "Offer to organize the difficult conversation, but first ask who is authorized to say its opening sentence.",
      "Volunteer to record the decision, then insist that someone with the proper rank announce the uncomfortable part.",
      "Draft a careful announcement and pass it upward for approval just before reaching the sentence you cannot bring yourself to say."],
    'S192+D74': [
      "Treat reconciliation as an exit procedure: request one final acknowledgment before you are willing to say goodbye.",
      "Write an imaginary closing checklist with an apology between two ordinary tasks, then hesitate to check it off.",
      "Explain that unresolved feelings count as unfinished business, and ask for an agreed next step before ending the interaction."],
    'S01+D13': [
      "Take charge of reconstructing the problem you caused, beginning your official timeline just after your own mistake.",
      "Assign yourself the job of checking evidence, then confidently classify anything pointing toward you as irrelevant.",
      "Approve an investigation into your mistake, but keep revising which question should be asked first."],
    'S114+D97': [
      "Ask for practical help as though hiring an assistant for your impressive endurance project, not seeking comfort.",
      "Call your struggle a useful challenge, then casually hand over the part you cannot bear to handle alone.",
      "Thank someone for admiring your strength, then ask them to take one small responsibility so you can keep demonstrating it."]
  };
  function concise(text, limit = 62) {
    const clean = String(text || "").replace(/\s+/g, ' ').trim();
    if (clean.split(' ').length <= limit) return clean;
    const sentences = clean.match(/[^.!?]+[.!?]+/g) || [clean];
    let out = '';
    for (const s of sentences) {
      if ((out + s).trim().split(/\s+/).length > limit) break;
      out += s;
    }
    if (out.trim()) return out.trim();
    const clause = clean.split(/[;—]/)[0].trim();
    if (clause.split(/\s+/).length <= limit) return clause.replace(/[.!?]+$/, '') + '.';
    return clean; // Do not chop a sentence mid-thought. Audited at build time.
  }
  function options(kind, cards, policy = "full") {
    if (kind === "single") {
      const c = cards[0]; if (singles[c.id]) return singles[c.id];
      if (familyExamples[c.subthemeId]) return familyExamples[c.subthemeId];
      const h = hints.get(c);
      return [...new Set(h.manifestationSeeds.map(s => concise(s.action || s.text, 40)))];
    }
    const key = cards.map(c => c.id).join('+');
    if (pairs[key]) return pairs[key];
    return [...new Set(Array.from({ length: 6 }, (_, i) => concise(engine.getCombinationHint(cards[0], cards[1], i, policy).firstMove)))];
  }
  const bags = new Map();
  function keyFor(kind, cards) { return kind + ':' + cards.map(c => `${c.id}@${c.contentVersion}`).join('+'); }
  function index(n) {
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      const a = new Uint32Array(1); const max = Math.floor(4294967296 / n) * n;
      do { crypto.getRandomValues(a); } while (a[0] >= max);
      return a[0] % n;
    }
    return Math.floor(Math.random() * n);
  }
  function next(kind, cards, policy) {
    const key = keyFor(kind, cards), choices = options(kind, cards, policy);
    let state = bags.get(key) || { remaining: [], last: null };
    if (!state.remaining.length) {
      state.remaining = choices.map((_, i) => i);
      for (let i = state.remaining.length - 1; i > 0; i--) {
        const j = index(i + 1); [state.remaining[i], state.remaining[j]] = [state.remaining[j], state.remaining[i]];
      }
      if (choices.length > 1 && state.remaining.at(-1) === state.last) [state.remaining[0], state.remaining[state.remaining.length - 1]] = [state.remaining.at(-1), state.remaining[0]];
    }
    state.last = state.remaining.pop();
    if (bags.size >= 100 && !bags.has(key)) bags.delete(bags.keys().next().value);
    bags.set(key, state);
    return { text: choices[state.last], source: "quick", variation: state.last, choiceCount: choices.length };
  }
  return Object.freeze({ next, options, keyFor, singles, familyExamples, pairs, concise });
});
