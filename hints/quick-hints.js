/* Short built-in examples remain available without a model. The original longer
   library is preserved for expandable coaching and existing editorial audits. */
(function (root, factory) {
  const common = typeof module === "object" && module.exports;
  const api = factory(common ? require("./card-hints.js") : root.IMPROMPT_CARD_HINTS);
  if (common) module.exports = api; else root.IMPROMPT_QUICK_HINTS = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function (cardHints) {
  "use strict";
  const examples = {
    S01: ["Pause before answering a simple question, then grant permission as though everyone was waiting for your approval.", "Quietly change one small decision, then congratulate yourself on making things easier for everyone."],
    S02: ["Give a firm instruction, then immediately soften it into a favor when you notice hesitation.", "Ask for agreement so casually that you can pretend you were not checking whether anyone would follow you."],
    S03: ["Correct one tiny detail with a patient smile, then take a careful breath before explaining it again.", "Volunteer to demonstrate a simple task, arranging everything precisely before allowing yourself to begin."],
    S04: ["Nod at an unfamiliar term, repeat it confidently, and offer to handle a task before you know what it involves.", "Start copying a small gesture, then act as though you were the one who introduced it."],
    S05: ["Praise one choice, then add the small correction that makes the success sound like the result of your teaching.", "Begin demonstrating a basic step without being asked, then turn a mistake of your own into part of the lesson."],
    S06: ["Insist your preference does not matter, then quietly decide which option gets considered first.", "Offer to handle an unglamorous detail, then use its timing to steer your next contribution."],
    S07: ["Respond to a grand announcement with the casual tone you would use to remind an old friend about a missed chore.", "Briefly copy a familiar little habit, smiling as though the impressive presentation has not changed a thing."],
    S08: ["Agree to one small favor, then casually mention how often you have already made this kind of sacrifice.", "Introduce a past contribution while pretending you are only supplying useful background."],
    S09: ["Start tidying an imagined mess while saying there is no problem, then let out a sigh at each extra task.", "Volunteer for a minor job before anyone asks, then pause pointedly before taking on the next one."],
    S10: ["Hear a modest achievement and immediately offer a slightly better number, pretending it is just a coincidence.", "Choose a tiny task and perform it with unnecessary speed, then casually check whether your effort was noticed."],
    S11: ["Ask one person to check a simple choice, then add that you had already decided and were only making conversation.", "Begin confidently, glance toward your chosen person, and quietly revise your own plan while hiding your uncertainty."],
    S12: ["At one ordinary phrase, stop what you are doing, choose a safer word, and become conspicuously polite.", "Offer a routine courtesy, then hesitate before repeating the gesture as though it once went badly."],
    S13: ["Give a delighted compliment, then demonstrate your own smaller version of the same achievement without quite admitting why.", "Start copying a quality you admire, then defend the imitation as something you have always done."],
    S14: ["Attempt an old signature gesture with too much enthusiasm, then explain away the awkward recovery as part of your style.", "Refer to what you usually do, catch yourself, and insist that the old routine still works perfectly."],
    S15: ["Treat a small change of plan as your cue to volunteer for three extra jobs, each more indispensable than the last.", "Offer a helpful reminder of something only you know, then stay nearby in case your usefulness needs another demonstration."],
    S16: ["Offer two options, then gently explain why only the one you already selected would be sensible.", "Begin fixing a small problem on someone else's behalf, narrating your concern while committing yourself to the solution."],
    S17: ["Declare that you love your choice, glance toward the person whose opinion matters, then casually offer a different version.", "Present an idea as unimportant, but linger over its explanation as though you are waiting for a review."],
    S18: ["Mention a difficult favor as an afterthought, then leave an unusually long pause before changing the subject.", "Place your finished work where it is easy to notice and pretend to be busy with something less impressive."],
    S19: ["Pause an ordinary task to perform a solemn three-step gesture, then carefully restart when you miss a step.", "Lower your voice before touching an ordinary object and thank it with complete seriousness afterward."],
    S20: ["Treat a small delay as grounds to rehearse an emergency plan, checking your own exit route twice.", "Pause at a harmless sound and quietly begin assigning priorities to the objects you would save first."],
    S21: ["Receive a setback with a delighted breath and begin planning a tiny celebration for the unexpected opportunity.", "Offer a sincere toast to the one useful thing a bad development has made possible."],
    S22: ["Accept the strangest suggestion without blinking, then ask who is paying for it and when the first shift starts.", "Treat an impossible development as settled and start working out the safest place to put the equipment."],
    S23: ["Straighten one ordinary object before every answer, becoming more careful with it as the conversation grows less convenient.", "Return to one harmless word, pausing until you have found the exact way you want to pronounce it."],
    S24: ["Notice two unrelated details, pause with sudden certainty, and change your next small decision because they obviously belong together.", "Treat an interruption as confirmation of your theory and calmly announce the next step you personally need to take."],
    D01: ["Offer the first useful step, then pause just before the difficult part and ask which bit you should handle.", "Demonstrate a small piece of your expertise, then offer help so modestly that the offer becomes difficult to overlook."],
    D02: ["As a goodbye approaches, remember one small thing you need help checking, then become unexpectedly invested in getting it right.", "Start offering increasingly specific refreshments each time you sense the conversation winding down."],
    D03: ["Explain how carefully you had prepared, then stop just before mentioning what spoiled it.", "Offer a conspicuously generous fresh start while leaving room for an acknowledgment you do not directly request."],
    D04: ["Ask whether an idea sounds sensible while quietly putting away the evidence that you have already carried it out.", "Describe your completed decision as a hypothetical, then become unusually relieved at any encouraging detail."],
    D05: ["Praise one satisfying detail of the unwanted job, then offer to leave the best part for someone else.", "Begin explaining the task as a rare opportunity while gradually stepping away from the work yourself."],
    D06: ["Ask an apparently practical question about timing, then carefully echo the most revealing word in the answer.", "Pretend you are checking a minor detail and offer two possible versions without admitting which one worries you."],
    D07: ["Share one small grievance, then lower your voice and offer a harmless first step toward doing something about it.", "Offer a tiny exclusive responsibility as though you are letting someone in on a privilege."],
    D08: ["Describe a questionable first step as a quick test, then volunteer to observe rather than perform it.", "Point out how easy the risky action would be, demonstrating everything except the final step yourself."],
    D09: ["Casually correct one detail that depends on your expertise, then linger before moving on to the next topic.", "Introduce your contribution as useful background, giving its most impressive part an unnecessarily precise description."],
    D10: ["Present a small advantage of choosing you, then casually improve the offer when another option comes up.", "Volunteer for the next modest responsibility as though it is obvious evidence that you belong in the larger role."],
    D11: ["Ask for a tiny inconvenience on your behalf and take an unusually careful mental note of how the request lands.", "Offer two equally practical choices, privately treating your own favorite as a test of commitment."],
    D12: ["Ask to hold the valued item for a moment, then offer increasingly thoughtful reasons you should keep looking after it.", "Start with a tiny concession and explain its significance with more tenderness than the request seems to deserve."],
    D13: ["Volunteer to organize the investigation and suggest checking the one detail farthest from your own mistake first.", "Supply a helpful fact before anyone asks, then become busily interested in a different line of inquiry."],
    D14: ["Whenever the conversation approaches your private subject, remember an urgent practical question and give it your full attention.", "Answer the harmless half of a question in extraordinary detail, offering a follow-up that continues the detour."],
    D15: ["Replace a troubling fact with a small act of care, fussing over a comfort you can actually provide.", "Begin an honest answer, then soften one revealing word and immediately offer something helpful."],
    D16: ["Admit a tiny, harmless mistake and leave a generous pause, staying careful about the detail you actually need to reveal.", "Ask whether anyone else has ever made a similar error, describing everything except your own involvement."],
    D17: ["Describe the plan's worst flaw as the very feature that will save effort, then begin calmly organizing the first step.", "Present the disaster as responsible preparation and offer a practical checklist as evidence of your confidence."],
    D18: ["Examine an unfamiliar detail, nod slowly, and give it a technical-sounding name before asking a disguised basic question.", "Begin a confident demonstration, then call your hesitation a necessary calibration."],
    D19: ["Turn a tiny difference into a score, then invent a more favorable scoring category when your own performance falls short.", "Offer a friendly comparison while quietly practicing the part that would let you come out ahead."],
    D20: ["At a setback, name one useful consequence and immediately begin preparing for that unlikely advantage.", "Thank the bad news for simplifying your options, then brighten your own plan with unnecessary enthusiasm."],
    D21: ["Offer warm encouragement while carefully flattening an imaginary wrinkle, pressing a little harder with each reassuring phrase.", "Keep volunteering help as your smile becomes more deliberate and your polite pauses grow longer."],
    D22: ["Accept a small kindness only after offering a very specific favor in return, then begin negotiating the exchange rate.", "Treat a casual compliment as the start of a bargain and politely propose what it ought to be worth."],
    D23: ["Agree enthusiastically to help, then define helping as supervising the one part you already wanted to control.", "Repeat the agreement with one small word changed, then begin acting on your improved version."],
    D24: ["Notice a tiny inconsistency, compare it with one earlier detail, and begin taking a precaution far larger than either warrants.", "Record an ordinary coincidence with sudden seriousness, then use it to justify changing your own next step."]
  };
  const pairs = {
    "S22+D14": ["Whenever the conversation approaches your secret, become urgently concerned about who is paying for the next step.", "Accept the difficult question as perfectly reasonable, then insist on settling a tiny scheduling problem before you can answer it."],
    "S192+D74": ["Treat reconciliation as an exit procedure: politely request one final acknowledgment before you are willing to say goodbye.", "Begin a formal goodbye, then discover that your own emotional sign-off is still missing from the procedure."],
    "S01+D13": ["Take charge of investigating your own mistake and confidently prioritize the evidence that points away from you.", "Volunteer to approve each next step of the investigation, graciously praising the suggestions least likely to expose your involvement."]
  };
  function single(card, angle = 0) {
    const override = examples[card.id];
    if (override) return override[((angle % override.length) + override.length) % override.length];
    const hints = cardHints.get(card);
    const seed = hints?.manifestationSeeds[((angle % 2) + 2) % 2];
    return seed?.action || card.instruction;
  }
  function pair(stance, drive, result, angle = 0) {
    const override = pairs[`${stance.id}+${drive.id}`];
    if (override) return override[((angle % 2) + 2) % 2];
    // Remove pack-anchor filler, not the two behavioral actions. Preserve the full
    // original fusion in expandable coaching rather than truncating mid-sentence.
    return result.firstMove
      .replace(/\bAnchor it in [^.]+\.\s*/g, "")
      .replace(/\bGround (?:that pressure|the attempt|it) in [^.]+\.\s*/g, "")
      .replace(/\bUse [^.]+ as the visible reason\.\s*/g, "")
      .replace(/\bAnchor the visible method in [^.]+\.\s*/g, "");
  }
  return Object.freeze({ single, pair, examples: Object.freeze(examples), pairs: Object.freeze(pairs) });
});
