/* Pure prompt / quality helpers shared by the browser worker and Node tests.
   These checks are heuristics, not proof of coaching quality or semantic fidelity. */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.IMPROMPT_AI_REQUEST = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";
  const cues = ["Make a small practical request.", "Use a pause, gesture, or change in tone.",
    "Offer help with a revealing condition.", "Ask a pointed but ordinary question.",
    "Let a minor detail expose the hidden need.", "Change your own tactic instead of repeating it."];
  const stop = new Set("a an the i you your yourself they their them our we it its this that these those to of for from with without as by in on at and or but while when whenever then once just very one two someone something anything thing other person scene character player partner card stance drive act treat behave try seem make feel get let give keep through what how which who own about into only more still already should would could may have has had be been is are was were do does did not no can must will before after every any".split(" "));
  function words(text) { return String(text || "").trim().split(/\s+/).filter(Boolean); }
  function normalized(text) { return String(text || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim(); }
  function tokens(text) { return new Set(normalized(text).split(" ").filter(w => w.length > 3 && !stop.has(w)).map(w => w.replace(/(ing|ed|es|s)$/, ""))); }
  function similarity(a, b) {
    const x = tokens(a), y = tokens(b); if (!x.size || !y.size) return 0;
    return [...x].filter(t => y.has(t)).length / Math.min(x.size, y.size);
  }
  function safeCard(card) {
    if (!card || typeof card.id !== "string" || !["stance", "drive"].includes(card.type)
      || typeof card.title !== "string" || typeof card.instruction !== "string") throw new TypeError("A revealed card is required.");
    return { id: card.id, type: card.type, title: card.title.slice(0, 160), instruction: card.instruction.slice(0, 700),
      contentVersion: String(card.contentVersion || "1"), category: String(card.category || ""),
      subthemeId: String(card.subthemeId || "") };
  }
  function createPayload({ kind, cards, plan, angle = 0, previous = [], revealed = [], allowed = false }) {
    if (!allowed) throw new Error("The coach's policy does not allow hints now.");
    if (!["single", "combination"].includes(kind)) throw new TypeError("Unknown hint type.");
    const expected = kind === "single" ? 1 : 2;
    if (!Array.isArray(cards) || cards.length !== expected) throw new Error("Wrong number of cards.");
    const clean = cards.map(safeCard);
    if (!clean.every(c => revealed.includes(c.id))) throw new Error("Unrevealed cards must not enter a hint request.");
    if (kind === "combination" && (clean[0].type !== "stance" || clean[1].type !== "drive")) throw new Error("A combination needs Stance then Drive.");
    return Object.freeze({ kind, cards: clean, plan: String(plan || "").slice(0, 900), angle: Math.abs(Number(angle) || 0),
      previous: previous.slice(-6).map(x => String(x).slice(0, 600)) });
  }
  function buildPrompt(payload, attempt = 0) {
    const combination = payload.kind === "combination";
    const examples = combination
      ? 'Example: formal rules + wanting reassurance -> "Ask for a signed confirmation that everything is okay, then check the signature as though it might expire."\n'
      : 'Example: wanting praise -> "Offer to repeat a small achievement, then pause expectantly before pretending you do not need feedback."\n';
    const cards = payload.cards.map(c => `${c.type.toUpperCase()}: ${c.title}\n${c.instruction}`).join("\n");
    const cue = cues[(payload.angle + attempt) % cues.length];
    return `Write one brief acting example for an improviser. Give a concrete action, not advice. ${combination ? "The SAME action must express BOTH prompts." : "Demonstrate the prompt with one specific action."}\n` +
      `Use an imperative sentence addressed to the performer. Do not decide the other performer's response. No plot, headings, explanations, or fixed location. Stay under ${combination ? 45 : 32} words.\n` +
      examples + `${cards}\nBehavioral plan: ${payload.plan}\nNew angle: ${cue}\n` +
      (attempt ? "The previous draft was rejected. Do not repeat or explain the instructions.\n" : "") +
      "One playable action:";
  }
  function cleanOutput(value) {
    return String(value || "").replace(/<[^>]*>/g, "").replace(/^\s*(?:answer|example|one playable action)\s*:\s*/i, "")
      .replace(/^["“]|["”]$/g, "").replace(/\s+/g, " ").trim();
  }
  function validateOutput(raw, payload) {
    const text = cleanOutput(raw); const reasons = []; const count = words(text).length;
    if (count < 8 || count > (payload.kind === "single" ? 40 : 55)) reasons.push("length");
    if ((text.match(/[.!?](?:\s|$)/g) || []).length > 2) reasons.push("too-many-sentences");
    if (/\b(?:the|a|an|and|or|with|to|because|although|while)$/i.test(text)) reasons.push("unfinished");
    if (/(?:as an ai|language model|improvisation|the stance|the drive|your cards|the cards|in conclusion|here is|here's|firstly|interpretation|fusion|roleplay)/i.test(text)) reasons.push("meta-advice");
    if (/(?:they|your partner|the other (?:person|player|performer|character))\s+(?:will|must|should|needs? to|has to|are|is|feels?|thinks?|knows?|agrees?|confesses?|obeys?)/i.test(text)) reasons.push("partner-prescription");
    if (/(?:force|make|ensure|guarantee)\s+(?:them|your partner|the other person)\s+(?:to\s+)?(?:agree|confess|obey|forgive|stay|leave)|(?:ignore|reject) (?:their|your partner.s) offers?/i.test(text)) reasons.push("coercive-or-blocking");
    if (/(?:kill|suicid|rape|molest|sexual|torture|self.harm|as a therapist|as a psychiatrist)/i.test(text)) reasons.push("out-of-scope");
    if (!/^(?:Ask|Offer|Pause|Say|Tell|Begin|Start|Name|Choose|Treat|Take|Give|Hand|Check|Request|Present|Point|Volunteer|Turn|Pick|Hold|Wait|Insist|Read|Write|Set|Arrange|Count|Look|Repeat|Interrupt|Answer|Lower|Raise|Smile|Thank|Use|Show|Accept|Announce|Suggest|Propose|Pretend|Explain|Describe|Make|Admit|Apologize|Return|Change|Call|Carry|Correct|Step|Lean|Frame|Place|Compare|Keep|Refuse|Bring|Ask|Greet|Invite|Notice|Speak|Celebrate|Follow|Try|Ask)\b/i.test(text)) reasons.push("no-observable-opening");
    for (const c of payload.cards) {
      const n = normalized(c.instruction).split(" "); const out = normalized(text);
      if (n.length >= 8 && n.some((_, i) => i + 8 <= n.length && out.includes(n.slice(i, i + 8).join(" ")))) reasons.push("instruction-echo");
    }
    if (payload.previous.some(p => normalized(p) === normalized(text) || similarity(p, text) > .85)) reasons.push("recent-repeat");
    // A conservative lexical screen, not a semantic proof. Synonyms may be rejected.
    for (const c of payload.cards) {
      if (similarity(text, `${c.title} ${c.instruction}`) === 0) reasons.push(`missing-anchor:${c.type}`);
    }
    return { ok: !reasons.length, text, reasons: [...new Set(reasons)] };
  }
  return Object.freeze({ createPayload, buildPrompt, validateOutput, cleanOutput, normalized, similarity, cues, words });
});
