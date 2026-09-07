"use strict";
const { test } = require("node:test");
const assert = require("node:assert/strict");
const core = require("../hints/local-hint-core");
const { createController, CACHE_KEY, MAX_CACHE } = require("../hints/local-hints");
const models = require("../hints/local-models");
const cards = require("../cards");
const single = (extra = {}) => ({ kind: "single", cards: [{ card: cards.stances[0], revealed: true }], policyId: "full", unlocked: true, angle: 0, ...extra });
const pair = (extra = {}) => ({ ...single(), kind: "combination", cards: [single().cards[0], { card: cards.drives[0], revealed: true }], ...extra });
const validText = "Pause before answering a simple question, then grant permission as though everyone was waiting for your approval.";
function fixture(overrides = {}) {
  const data = new Map(); const statuses = []; const calls = [];
  const storage = { getItem: (key) => data.get(key) || null, setItem: (key, value) => data.set(key, value) };
  const runtime = { load: async (...args) => calls.push(["load", ...args]), unload: async () => calls.push(["unload"]),
    generate: async (messages, params) => { calls.push(["generate", messages, params]); return { text: validText, finishReason: "stop" }; },
    clearDownloads: async () => calls.push(["clear"]), ...overrides };
  let imports = 0;
  const controller = createController({ storage, runtimeFactory: async () => { imports++; return runtime; }, onStatus: (status) => statuses.push(status), timeoutMs: 20 });
  return { data, storage, runtime, calls, statuses, controller, imports: () => imports };
}
test("No runtime import or model load before an explicit request", async () => {
  const f = fixture(); assert.equal(f.imports(), 0);
  assert.equal((await f.controller.generate(single())).reason, "unavailable"); assert.equal(f.imports(), 0);
});
test("Hidden, extra, invalid, or policy-blocked cards never reach the prompt", () => {
  assert.throws(() => core.prepareRequest(single({ cards: [{card: cards.stances[0], revealed: false}] })), /revealed/);
  assert.throws(() => core.prepareRequest(single({ cards: pair().cards })), /Only/);
  assert.throws(() => core.prepareRequest(pair({ cards: [single().cards[0], single().cards[0]] })), /Stance/);
  for (const policyId of ["off", "unknown"]) assert.throws(() => core.prepareRequest(single({ policyId })));
  assert.throws(() => core.prepareRequest(single({ policyId: "after-attempt", unlocked: false })));
  assert.doesNotThrow(() => core.prepareRequest(single({ policyId: "after-attempt", unlocked: true })));
  assert.doesNotThrow(() => core.prepareRequest(pair({ policyId: "nudges" })));
});
test("Prompt receives exact instruction; the allowlist strips unrelated state", () => {
  const request = single(); request.sceneLog = "SECRET SCENE LOG";
  request.cards[0].card = { ...cards.stances[0], partnerCard: "SECRET PARTNER CARD" };
  const clean = core.prepareRequest(request); const prompt = JSON.stringify(core.buildMessages(clean));
  assert.match(prompt, /highest-status person/); assert.doesNotMatch(prompt, /SECRET/);
  assert.equal(clean.cards.length, 1); assert.equal(clean.cards[0].instruction, cards.stances[0].instruction);
  assert.ok(Object.isFrozen(clean.cards[0]));
});
test("Pair prompts contain both exact cards and no full deck", () => {
  const request = core.prepareRequest(pair()); const content = JSON.stringify(core.buildMessages(request));
  assert.ok(content.includes(cards.stances[0].title)); assert.ok(content.includes(cards.drives[0].title));
  assert.ok(!content.includes(cards.stances[20].title));
});
test("Cache identity changes with content, model, prompt scope, and angle", () => {
  const request = single(); const first = core.cacheKey(core.prepareRequest(request), "a");
  assert.notEqual(first, core.cacheKey(core.prepareRequest(single({angle:1})), "a"));
  assert.notEqual(first, core.cacheKey(core.prepareRequest(request), "b"));
  assert.notEqual(first, core.cacheKey(core.prepareRequest(single({policyId:"nudges"})), "a"));
  request.cards[0].card = { ...cards.stances[0], instruction: "A different private point of view." };
  assert.notEqual(first, core.cacheKey(core.prepareRequest(request), "a"));
});
test("Validation rejects unfinished, long, repeated, scripting and generic answers", () => {
  const request = core.prepareRequest(single());
  assert.equal(core.validateOutput(validText, request, "stop").ok, true);
  assert.equal(core.validateOutput(validText, request, "length").ok, false);
  assert.equal(core.validateOutput(validText.slice(0,-1), request, "stop").ok, false);
  assert.equal(core.validateOutput("word ".repeat(60)+"done.", request, "stop").ok, false);
  assert.equal(core.validateOutput("Your partner must agree with your request and will immediately apologize for everything.", request, "stop").reason, "partner-control");
  assert.equal(core.validateOutput(cards.stances[0].instruction, request, "stop").reason, "restatement");
  assert.equal(core.validateOutput("Stay in character and express both cards by using your stance to pursue your drive.", request, "stop").ok, false);
  assert.equal(core.validateOutput("<script>alert('x')</script> Say something useful and keep doing the same thing.", request, "stop").ok, false);
  assert.equal(core.validateOutput(validText, core.prepareRequest(single({ avoid:[validText] })), "stop").reason, "duplicate");
});
test("Explicit enable passes download consent through, with no API request payload", async () => {
  const f = fixture(); assert.equal(await f.controller.loadModel(models[0].id, {allowDownload:true}), true);
  const load = f.calls.find(([kind]) => kind === "load"); assert.equal(load[2].allowDownload, true);
  assert.equal(load[1].url, models[0].url); assert.ok(!JSON.stringify(load).includes(cards.stances[0].instruction));
});
test("Saved-only load cannot silently authorize another model download", async () => {
  const f = fixture(); await f.controller.loadModel(models[0].id);
  assert.equal(f.calls.find(([kind]) => kind === "load")[2].allowDownload, false);
});
test("Valid results cache; an identical request needs no second inference", async () => {
  const f = fixture(); await f.controller.loadModel(models[0].id);
  const a = await f.controller.generate(single()); const b = await f.controller.generate(single());
  assert.equal(a.source, "generated"); assert.equal(b.source, "cache");
  assert.equal(f.calls.filter(([kind]) => kind === "generate").length, 1);
  assert.ok(f.data.get(CACHE_KEY));
});
test("A previously shown result is not reused as Another angle", async () => {
  const f = fixture(); await f.controller.loadModel(models[0].id);
  await f.controller.generate(single());
  const result = await f.controller.generate(single({angle:1, avoid:[validText]}));
  assert.equal(result.ok, false); assert.equal(result.reason, "duplicate");
});
test("Generation timeout unloads the worker and keeps the controller usable", async () => {
  const f = fixture({generate: async () => new Promise(() => {})});
  await f.controller.loadModel(models[0].id);
  const result = await f.controller.generate(single());
  assert.equal(result.reason, "timeout"); assert.equal(f.controller.isReady(), false);
  assert.ok(f.calls.filter(([kind])=>kind==="unload").length>=2);
  assert.equal(await f.controller.loadModel(models[0].id), true);
});
test("Cancellation rejects late output rather than caching it", async () => {
  let resolve; const f = fixture({ generate: async () => new Promise((done) => { resolve = done; }) });
  await f.controller.loadModel(models[0].id);
  const task = f.controller.generate(single()); f.controller.cancel();
  const result = await task; resolve({text:validText, finishReason:"stop"});
  assert.equal(result.reason, "cancelled"); assert.equal(f.data.has(CACHE_KEY), false);
});
test("Only one inference can run at a time", async () => {
  let resolve; const f = fixture({ generate: async () => new Promise((done) => { resolve = done; }) });
  await f.controller.loadModel(models[0].id);
  const first = f.controller.generate(single());
  assert.equal((await f.controller.generate(pair())).reason, "unavailable");
  resolve({text:validText, finishReason:"stop"}); assert.equal((await first).ok, true);
});
test("Failed downloads and initialization fall back without unhandled rejection", async () => {
  const f = fixture({load: async()=>{throw new Error("No connection.");}});
  assert.equal(await f.controller.loadModel(models[0].id, {allowDownload:true}), false);
  assert.equal(f.controller.getPhase(), "error"); assert.match(f.statuses.at(-1).message, /connection/);
});
test("Storage failures do not prevent local generation", async () => {
  const f = fixture(); const controller=createController({runtimeFactory:async()=>f.runtime,
    storage:{getItem:()=>{throw new Error("Blocked");},setItem:()=>{throw new Error("Full");}}});
  await controller.loadModel(models[0].id); assert.equal((await controller.generate(single())).ok,true);
});
test("Removing local model data leaves the independent deck untouched", async () => {
  const f=fixture(); f.data.set("imprompt:deck-state:v1","KEEP ME");
  await f.controller.loadModel(models[0].id); await f.controller.generate(single()); await f.controller.clearDownloads();
  assert.equal(f.data.get("imprompt:deck-state:v1"),"KEEP ME");
  assert.equal(JSON.parse(f.data.get(CACHE_KEY)).length,0); assert.ok(f.calls.some(([kind])=>kind==="clear"));
});
test("Cache is bounded to 100 entries", async()=>{
  const f=fixture(); await f.controller.loadModel(models[0].id);
  for(let angle=0;angle<MAX_CACHE+7;angle++) await f.controller.generate(single({angle}));
  assert.equal(JSON.parse(f.data.get(CACHE_KEY)).length,MAX_CACHE);
});
test("All 480 cards fit a bounded prompt and produce no full-library payload",()=>{
  for(const card of [...cards.stances,...cards.drives]){
    const request=core.prepareRequest(single({cards:[{card,revealed:true}]}));
    assert.equal(request.cards.length,1); assert.ok(JSON.stringify(core.buildMessages(request)).length<6000);
  }
});
