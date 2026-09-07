"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const core = require("../hints/local-hint-core");
const { createController, CACHE_KEY, DEFAULT_TIMEOUT_MS } = require("../hints/local-hints");
const models = require("../hints/local-models");
const cards = require("../cards");
const first = '[I set my cup at the head of the table.] “You may bring the proposal to me now.”';
const second = '[I straighten the nameplate and move it to my side.] “Let us put the final decision somewhere I can reach it.”';
const single = (card = cards.stances[0], extra = {}) => ({ kind: "single", cards: [{ card, revealed: true }], policyId: "full", unlocked: true, angle: 0, ...extra });
const pair = () => ({ ...single(), kind: "combination", cards: [single().cards[0], single(cards.drives[0]).cards[0]] });
const check = (text, extra = {}, finish = "stop") => core.validateOutput(text, core.prepareRequest(single(cards.stances[0], extra)), finish);
function fixture(outputs, options = {}) {
  const calls = [], status = [], data = new Map(options.data || []);
  let index = 0, unloads = 0;
  const runtime = { load: async () => {}, unload: async () => { unloads++; }, clearDownloads: async () => {}, describe: () => ({ backend: "test fixture" }),
    generate: async (messages, params) => {
      calls.push({ messages, params });
      const value = outputs[Math.min(index++, outputs.length - 1)];
      if (value instanceof Error) throw value;
      if (typeof value === "function") return value(messages, params);
      return { text: value, finishReason: "stop" };
    } };
  const controller = createController({ runtimeFactory: async () => runtime, timeoutMs: options.timeoutMs || 1000,
    onStatus: (s) => status.push(s), storage: { getItem: (k) => data.get(k) || null, setItem: (k,v) => data.set(k,v), removeItem: (k) => data.delete(k) } });
  return { controller, calls, status, data, unloads: () => unloads };
}
test("Stance, Drive and combination examples are performed, never coaching", () => {
  for (const input of [single(), single(cards.drives[0]), pair()]) {
    const messages = core.buildMessages(core.prepareRequest(input));
    assert.match(messages[0].content, /You are the improviser/);
    assert.match(messages[0].content, /pursue the Drive THROUGH the Stance/);
    assert.match(messages[0].content, /only an illustration/);
    for (const message of messages.filter(m => m.role === "assistant")) assert.ok(core.parsePerformance(message.content));
    assert.doesNotMatch(JSON.stringify(messages), /Address the card holder as you|without inventing a setting/);
  }
});
test("The exact originally rejected bracketed performance now passes", () => {
  assert.equal(check('[I inspect the chair, then sit.] “You may begin; I have made myself comfortable.”').ok, true);
});
test("Bracketed, parenthesized, italic and plain first-person actions normalize identically", () => {
  const action = "I place my glass where the chairperson usually sits.";
  const dialogue = '"I believe we can get started now."';
  const texts = [action, `[${action}]`, `(${action})`, `*${action}*`, `**${action}**`].map(a => `${a} ${dialogue}`);
  for (const text of texts) assert.equal(check(text).text, `[${action}] “I believe we can get started now.”`);
});
test("Previously accepted generic advice and second-person coaching are rejected", () => {
  for (const text of [
    "Be thoughtful about how you interact and show your personality through your actions.",
    "Become concerned about practical details whenever the conversation approaches your secret.",
    'You pause before answering, then grant permission. "You may begin."',
    '[I am confident and thoughtful.] "I want to be myself today."',
    '[I would hold the door shut.] "We are not finished discussing this."',
    '[I think about being important.] "Bring the report over here."'
  ]) assert.equal(check(text).ok, false, text);
});
test("A character may make a request; the narration cannot decide the partner's response", () => {
  assert.equal(check('[I hold my coat against my chest.] “Please stay until we have worked this out.”').ok, true);
  assert.equal(check('[I hold my coat and my partner nods.] “Please stay until we have worked this out.”').reason, "partner-control");
});
test("Truncated dialogue, multiple speakers and code cannot become a hint", () => {
  for (const text of [first.slice(0, -1), first + '\nPartner: "Of course."', '<script>bad()</script>' + first, first + '\n1. Another example.']) assert.equal(check(text).ok, false);
});
test("Repeating a few-shot example is rejected, not passed off as fresh inference", () => {
  const messages = core.buildMessages(core.prepareRequest(pair()));
  const example = messages.find(m => m.role === "assistant").content;
  assert.equal(check(example).reason, "duplicate");
});
test("Repeated accepted text is rejected regardless of quote style", () => {
  assert.equal(check(first.replace(/“|”/g, '"'), { avoid: [first] }).reason, "duplicate");
});
test("One targeted retry replaces advice with an actual performance", async () => {
  const f = fixture(["Be thoughtful about how you interact and show your personality through your actions.", first]);
  await f.controller.loadModel(models[0].id);
  const result = await f.controller.generate(single());
  assert.equal(result.ok, true); assert.equal(result.attempts, 2); assert.equal(result.text, first);
  assert.match(f.calls[1].messages.at(-1).content, /Correction: Do not advise/);
  assert.equal(f.calls[1].params.attempt, 2);
  assert.equal(f.controller.getDiagnostics().attempts[0].reason, "generic");
  assert.equal(f.controller.getDiagnostics().attempts[1].status, "accepted");
});
test("Two failed attempts stop, preserve raw output and never cache the rejection", async () => {
  const f = fixture(["This is generic advice."]);
  await f.controller.loadModel(models[0].id);
  const result = await f.controller.generate(single());
  assert.equal(result.ok, false); assert.equal(f.calls.length, 2); assert.equal(f.data.has(CACHE_KEY), false);
  assert.equal(f.controller.isReady(), true);
  const d = f.controller.getDiagnostics();
  assert.equal(d.status, "rejected"); assert.equal(d.attempts[0].output, "This is generic advice.");
});
test("Runtime exceptions retain their actual message and are not retried as poor prose", async () => {
  const f = fixture([new Error("WASM memory allocation failed (fixture)")]);
  await f.controller.loadModel(models[0].id);
  const result = await f.controller.generate(single());
  assert.equal(result.reason, "runtime"); assert.equal(f.calls.length, 1);
  assert.match(result.error, /memory allocation/); assert.match(f.controller.getDiagnostics().error, /memory allocation/);
  assert.equal(f.controller.isReady(), false);
});
test("Slow work has one total bounded deadline, not two independent full deadlines", async () => {
  assert.equal(DEFAULT_TIMEOUT_MS, 180000);
  const f = fixture([() => new Promise(() => {})], { timeoutMs: 15 });
  await f.controller.loadModel(models[0].id);
  assert.equal((await f.controller.generate(single())).reason, "timeout");
  assert.equal(f.calls.length, 1); assert.equal(f.controller.getDiagnostics().status, "timeout");
});
test("Cancelling during the repair attempt suppresses a late result", async () => {
  let resolve;
  const f = fixture(["No performance.", () => new Promise(done => { resolve = done; })]);
  await f.controller.loadModel(models[0].id);
  const task = f.controller.generate(single());
  await new Promise(done => setImmediate(done));
  f.controller.cancel(); const result = await task;
  resolve({ text: first, finishReason: "stop" });
  assert.equal(result.reason, "cancelled"); assert.equal(f.data.has(CACHE_KEY), false);
});
test("Progress is recorded without publishing unvalidated text", async () => {
  const f = fixture([async (_messages, params) => {
    params.onProgress({ chunks: 7, characters: 62, text: "DO NOT DISPLAY ME" });
    return { text: first, finishReason: "stop" };
  }]);
  await f.controller.loadModel(models[0].id); await f.controller.generate(single());
  assert.equal(f.controller.getDiagnostics().attempts[0].chunks, 7);
  assert.doesNotMatch(JSON.stringify(f.status), /DO NOT DISPLAY ME/);
});
test("Old generated text is invalidated without deleting saved model/deck data", () => {
  const f = fixture([first], { data: [["imprompt:generated-hints:v1", "OLD COACHING"], ["imprompt:deck-state:v1", "DECK"], ["imprompt:local-model-preference:v1", "MODEL"]] });
  assert.equal(f.data.has("imprompt:generated-hints:v1"), false);
  assert.equal(f.data.get("imprompt:deck-state:v1"), "DECK");
  assert.equal(f.data.get("imprompt:local-model-preference:v1"), "MODEL");
  assert.equal(f.unloads(), 0);
});
test("Diagnostics are snapshots, do not contain unseen cards and cannot mutate controller state", async () => {
  const f = fixture([first]); await f.controller.loadModel(models[0].id);
  const input = single(); input.sceneLog = "PRIVATE LOG"; input.partnerCard = "PRIVATE CARD";
  await f.controller.generate(input);
  const d = f.controller.getDiagnostics();
  assert.deepEqual(d.cardIds, [cards.stances[0].id]); assert.doesNotMatch(JSON.stringify(d), /PRIVATE/);
  d.status = "changed"; assert.equal(f.controller.getDiagnostics().status, "accepted");
});
test("A second manual request uses a new serial while an identical cached request avoids inference", async () => {
  const f = fixture([first, second]); await f.controller.loadModel(models[0].id);
  await f.controller.generate(single());
  assert.equal((await f.controller.generate(single())).source, "cache");
  await f.controller.generate(single(cards.stances[0], { angle: 1, avoid: [first] }));
  assert.equal(f.calls.length, 2);
  assert.notEqual(f.calls[0].params.requestSerial, f.calls[1].params.requestSerial);
});
test("Repair prompts retain exactly the allowed cards and stay bounded across the library", () => {
  for (const card of [...cards.stances, ...cards.drives]) {
    const req = core.prepareRequest(single(card));
    const messages = core.buildMessages(req, { repairReason: "performance" });
    assert.ok(messages.at(-1).content.includes(card.instruction));
    assert.ok(JSON.stringify(messages).length < 6000);
  }
  for (let i = 0; i < cards.stances.length; i++) {
    const input = { ...pair(), cards: [{card: cards.stances[i], revealed: true}, {card: cards.drives[(i * 17) % cards.drives.length], revealed: true}] };
    assert.ok(JSON.stringify(core.buildMessages(core.prepareRequest(input), { repairReason: "performance" })).length < 7000);
  }
});
