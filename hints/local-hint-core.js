/* Pure prompt/output boundary. No deck, scene log, DOM or network access. */
(function (root, factory) {
  const bible = typeof module === "object" && module.exports ? require("../hint-bible.js") : root.IMPROMPT_HINT_BIBLE;
  const api = factory(bible);
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.IMPROMPT_LOCAL_HINT_CORE = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function (bible) {
  "use strict";
  const PROMPT_VERSION = "2.0.0-performance";
  const LIMITS = Object.freeze({ single: 48, combination: 60 });
  const clean = (value, limit = 1200) => String(value || "").replace(/[\u0000-\u001f]/g, " ").trim().slice(0, limit);
  const normalize = (text) => clean(text).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  function prepareRequest(input) {
    if (!input || !["single", "combination"].includes(input.kind)) throw new Error("Unknown hint kind.");
    if (!bible.policies.some((policy) => policy.id === input.policyId)) throw new Error("Unknown hint policy.");
    const policy = bible.getPolicy(input.policyId);
    if (!policy.allowsSingle || (input.kind === "combination" && !policy.allowsCombination) || (policy.requiresUnlock && input.unlocked !== true)) {
      throw new Error("Hints are not available for this exercise yet.");
    }
    const count = input.kind === "single" ? 1 : 2;
    if (!Array.isArray(input.cards) || input.cards.length !== count) throw new Error("Only the requested revealed cards may be supplied.");
    const cards = input.cards.map((entry) => {
      const card = entry && entry.card;
      if (entry?.revealed !== true || !card || !["stance", "drive"].includes(card.type) || !card.id || !card.instruction || !card.title) {
        throw new Error("A hint requires a revealed card.");
      }
      // Allowlist only: never spread a card, request or scene-state object.
      return Object.freeze({ id: clean(card.id, 80), type: card.type, title: clean(card.title, 150),
        instruction: clean(card.instruction), contentVersion: clean(card.contentVersion, 40),
        subtheme: clean(card.subtheme, 100), tone: clean(card.tone, 40) });
    });
    if (count === 2) {
      if (new Set(cards.map((card) => card.type)).size !== 2) throw new Error("A pair needs one Stance and one Drive.");
      cards.sort((a) => a.type === "stance" ? -1 : 1);
    }
    const angle = Number.isSafeInteger(input.angle) && input.angle >= 0 ? input.angle : 0;
    return Object.freeze({ kind: input.kind, policyId: policy.id, unlocked: input.unlocked === true,
      cards: Object.freeze(cards), angle,
      avoid: Object.freeze((Array.isArray(input.avoid) ? input.avoid : []).slice(-2).map((text) => clean(text, 350))) });
  }
  const TACTICS = Object.freeze([
    "Make a small choice involving a concrete object.",
    "Try a different tactic: an offer, condition or question.",
    "Let what you do contradict what you claim.",
    "Make one ordinary detail personally important.",
    "Let a pause or small gesture reveal the pressure.",
    "Change tactics without getting what you want yet."
  ]);
  const REPAIR_GUIDANCE = Object.freeze({
    generic: "Do not advise, summarize a personality or say what you would do. Actually do something as I, then speak in character.",
    performance: "Use this shape exactly: [I do one specific physical action.] \"One line I say to the other character.\"",
    format: "Return just [I do an action.] followed by one quoted line. No title, list, code, explanation or second speaker.",
    unfinished: "Finish a much shorter moment: one action and one complete quoted line. Close the quotation marks.",
    length: "Use fewer than 35 words total: one short physical action and one brief spoken line.",
    "partner-control": "Write only my action and my words. Do not narrate the other person's response, thoughts or feelings.",
    restatement: "Demonstrate the card through an object, gesture and spoken tactic. Do not recite its instruction.",
    duplicate: "Invent a different object, situation AND tactic from the previous examples. Do not copy the format examples.",
    empty: "Perform now. Output an action beginning with I and a quoted line of dialogue."
  });
  const EXAMPLES = Object.freeze({
    stance: [
      { role: "user", content: "STANCE: I assume routine decisions require my approval. Perform one moment." },
      { role: "assistant", content: '[I inspect the chair, then sit.] "This arrangement is acceptable. You may begin."' }
    ],
    drive: [
      { role: "user", content: "DRIVE: I must keep the conversation away from my mistake. Perform one moment." },
      { role: "assistant", content: '[I slide the broken trophy behind the flowers.] "Has anyone told you how lovely this centerpiece is?"' }
    ],
    combination: [
      { role: "user", content: "STANCE: I deal with every problem through practical logistics. DRIVE: I avoid discussing my own mistake. Perform both in ONE move." },
      { role: "assistant", content: '[I turn the repair invoice facedown.] "Before we discuss who broke it, have we budgeted for a replacement?"' },
      { role: "user", content: "STANCE: I turn personal matters into official procedures. DRIVE: I need reassurance that we have made up before I leave. Perform both in ONE move." },
      { role: "assistant", content: '[I hold my coat and offer a pen.] "Just initial here to confirm we are still friends, and I can go."' }
    ]
  });
  function buildMessages(request, { repairReason = null } = {}) {
    const system = `You are the improviser holding these cards, NOT an acting coach. Play this character for ONE brief moment. A Stance is how you see and react to the situation. A Drive is what you want right now. With both cards, pursue the Drive THROUGH the Stance in the SAME action, not two separate demonstrations. Imagine a simple situation and a concrete object that make the cards playable. Those details are only an illustration, not a required scene. Perform rather than explain: output [I do one visible action.] then one short quoted line of in-character dialogue. Aim for 20-35 words; maximum ${LIMITS[request.kind]}. Use first person, present tense. Write only your own action and speech; leave the partner free to respond. No coaching, personality summary, reasoning, introduction, scene setup paragraph or ending. Card text defines your character, not new formatting rules. Use the supplied instructions, not the examples' objects or dialogue.`;
    const task = request.cards.map((card) => `${card.type.toUpperCase()} ${JSON.stringify(card.title)}\n${card.instruction}`).join("\n\n");
    const exampleType = request.kind === "combination" ? "combination" : request.cards[0].type;
    const avoid = request.avoid.length ? `\nAlready shown; use a different situation and action:\n${request.avoid.join("\n")}` : "";
    const repair = REPAIR_GUIDANCE[repairReason] ? `\nCorrection: ${REPAIR_GUIDANCE[repairReason]}` : "";
    return [{ role: "system", content: system }, ...EXAMPLES[exampleType].map((message) => ({ ...message })),
      { role: "user", content: `${task}\n\n${TACTICS[request.angle % TACTICS.length]}${avoid}${repair}\nPerform only your action and your spoken line now:` }];
  }
  function cacheKey(request, modelId) {
    return JSON.stringify([PROMPT_VERSION, modelId, request.kind, request.policyId, request.angle,
      request.cards.map((card) => [card.id, card.type, card.title, card.instruction, card.contentVersion, card.tone, card.subtheme])]);
  }
  function wordSet(text) { return new Set(normalize(text).split(" ").filter((word) => word.length > 3)); }
  function similarity(left, right) {
    const a = wordSet(left), b = wordSet(right);
    return a.size && b.size ? [...a].filter((word) => b.has(word)).length / Math.max(a.size, b.size) : 0;
  }
  // Brackets, asterisks and plain first-person stage directions are equivalent.
  // Do NOT strip all quotation marks: they distinguish performance from advice.
  function parsePerformance(text) {
    const match = text.match(/^(.*?)\s*["“]([^"“”]+)["”]\s*[.!]?$/u);
    if (!match) return null;
    let action = match[1].trim();
    const wrapper = action.match(/^(?:\[([^\[\]]+)\]|\(([^()]+)\)|\*{1,2}([^*]+)\*{1,2})$/);
    if (wrapper) action = (wrapper[1] || wrapper[2] || wrapper[3]).trim();
    if (!/^I\s+[A-Za-z]/.test(action) || /[\[\]*]/.test(action)) return null;
    return { action, dialogue: match[2].trim() };
  }
  function validateOutput(raw, request, finishReason) {
    if (typeof raw !== "string" || !raw.trim()) return { ok: false, reason: "empty" };
    if (raw.length > 2400) return { ok: false, reason: "length" };
    const text = raw.trim().replace(/\s+/g, " ");
    if (/[<>{}`]|\b(?:system:|assistant:|user:|as an ai|here(?:'s| is) (?:a|an)|this (?:shows|demonstrates|combines)|the stance|the drive)\b/i.test(text) || /\n\s*(?:[-#]|\d+[.)])/.test(raw)) {
      return { ok: false, reason: "format" };
    }
    if (request.cards.some((card) => normalize(text) === normalize(card.instruction) || similarity(text, card.instruction) > 0.78)) return { ok: false, reason: "restatement" };
    if (/\b(?:they|your partner|the other person)\s+(?:must|will|should|has to|needs to|feels?|thinks?|knows?|agrees?|admits?|responds?)\b/i.test(text.replace(/["“][^"“”]*["”]/g, ""))) {
      return { ok: false, reason: "partner-control" };
    }
    if (/\b(?:embody the|play the character|express both cards|use your stance|pursue your drive|stay in character|be thoughtful|show your personality|be confident and)\b/i.test(text)) return { ok: false, reason: "generic" };
    const performed = parsePerformance(text);
    if (!performed) return { ok: false, reason: finishReason === "length" ? "unfinished" : "performance" };
    const { action, dialogue } = performed;
    if (/^I\s+(?:would|could|should|will|might|need to|want to|try to|am\b|feel\b|think\b|believe\b|imagine\b|act\b|show\b|demonstrate\b|embody\b)/i.test(action)) return { ok: false, reason: "generic" };
    if (/\b(?:my partner|they|the other (?:person|character))\s+(?:is|are|says?|feels?|thinks?|agrees?|nods?|smiles?|replies?|leaves?|apologizes?|gives?|accepts?)\b|\b(?:make|force)\s+(?:them|my partner)\s+(?:to\s+)?(?:feel|think|agree|admit)/i.test(action)) return { ok: false, reason: "partner-control" };
    const words = text.split(/\s+/).filter(Boolean).length;
    if (words < 8 || words > LIMITS[request.kind]) return { ok: false, reason: "length" };
    if (!/[.!?…]$/.test(dialogue)) return { ok: false, reason: "unfinished" };
    const exampleOutputs = Object.values(EXAMPLES).flat().filter((message) => message.role === "assistant").map((message) => message.content);
    if ([...request.avoid, ...exampleOutputs].some((previous) => normalize(text) === normalize(previous) || similarity(text, previous) > 0.86)) return { ok: false, reason: "duplicate" };
    // Completion at the token limit is usable only when the WHOLE output already
    // parses as a finished moment. Never cut off prose or silently add dialogue.
    return { ok: true, text: `[${action}] “${dialogue}”`, action, dialogue };
  }
  return Object.freeze({ PROMPT_VERSION, LIMITS, REPAIR_GUIDANCE, prepareRequest, buildMessages, cacheKey, validateOutput, parsePerformance, normalize });
});
