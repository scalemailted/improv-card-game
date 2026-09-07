/* Optional REAL inference smoke runner. Never substituted into the game. */
const byId = (id) => document.getElementById(id);
const modelSelect = byId("model");
for (const model of window.IMPROMPT_LOCAL_MODELS) {
  const option = document.createElement("option"); option.value = model.id; option.textContent = model.label;
  modelSelect.append(option);
}
function size() {
  const model = window.IMPROMPT_LOCAL_MODELS.find(m => m.id === modelSelect.value);
  byId("size").textContent = `${model.sizeLabel}, plus runtime and working memory. ${model.note}`;
}
modelSelect.addEventListener("change", size); size();
const engine = window.IMPROMPT_LOCAL_HINTS.createController({
  storage: null, // Do not use or modify the game's generated-hint cache.
  runtimeFactory: async () => (await import("../hints/wllama-adapter.mjs?v=0.22.1")).createRuntime(),
  onStatus: (status) => { byId("status").textContent = status.message; }
});
const cards = window.IMPROMPT_CARDS;
const get = (id) => [...cards.stances, ...cards.drives].find(card => card.id === id);
const cases = [
  { ids: ["S01"], angle: 0 }, { ids: ["D14"], angle: 0 },
  { ids: ["S22", "D14"], angle: 0 }, { ids: ["S192", "D74"], angle: 0 },
  { ids: ["S01", "D14"], angle: 0 }, { ids: ["S22", "D14"], angle: 1 }
];
let stopped = false, report = null, runNumber = 0;
byId("stop").addEventListener("click", () => { stopped = true; engine.cancel(); });
byId("copy").addEventListener("click", async () => {
  try { await navigator.clipboard.writeText(byId("report").textContent); byId("copy").textContent = "Copied"; }
  catch (_) { byId("copy").textContent = "Select and copy the report below"; }
});
byId("run").addEventListener("click", async () => {
  stopped = false; byId("run").disabled = true; byId("stop").disabled = false;
  modelSelect.disabled = true; byId("download").disabled = true; byId("results").replaceChildren();
  report = { appVersion: "0.22.1", promptVersion: window.IMPROMPT_LOCAL_HINT_CORE.PROMPT_VERSION, startedAt: new Date().toISOString(), modelId: modelSelect.value, cases: [] };
  const seen = new Map();
  const runOffset = runNumber++ * 6; // Fresh cache identities; retain the six tactic phases across reruns.
  try {
    const loaded = await engine.loadModel(modelSelect.value, { allowDownload: byId("download").checked });
    report.load = engine.getDiagnostics();
    if (!loaded) return;
    for (const item of cases) {
      if (stopped || !engine.isReady()) break;
      const selected = item.ids.map(get);
      if (selected.some(card => !card)) throw new Error(`Missing test card: ${item.ids.join(", ")}`);
      const key = item.ids.join("+");
      const input = { kind: selected.length === 1 ? "single" : "combination", cards: selected.map(card => ({ card, revealed: true })), policyId: "full", unlocked: true, angle: item.angle + runOffset, avoid: seen.get(key) || [] };
      const started = performance.now();
      const result = await engine.generate(input);
      const row = { cards: selected.map(card => ({id:card.id,title:card.title,instruction:card.instruction})), angle: input.angle, elapsedMs: Math.round(performance.now()-started), result, diagnostics: engine.getDiagnostics() };
      report.cases.push(row);
      if (result.ok) seen.set(key, [...(seen.get(key) || []), result.text]);
      const article = document.createElement("article"), heading = document.createElement("h2"), output = document.createElement("p"), verdict = document.createElement("p");
      heading.textContent = selected.map(card=>card.title).join(" + ");
      output.textContent = result.ok ? result.text : `No accepted example: ${result.reason}. ${result.error || "See diagnostics."}`;
      verdict.textContent = `${result.ok ? "Accepted by format checks; human review needed" : "Failed"} · ${(row.elapsedMs/1000).toFixed(1)}s`;
      article.append(heading,output,verdict); byId("results").append(article);
      byId("report").textContent = JSON.stringify(report,null,2);
    }
  } catch (error) {
    report.error = error.message;
  } finally {
    report.completedCases = report.cases.length;
    report.acceptedCases = report.cases.filter(row=>row.result.ok).length;
    report.stopped = stopped;
    byId("report").textContent = JSON.stringify(report,null,2);
    await engine.unload().catch(()=>{});
    byId("status").textContent = report.load?.status !== "ready" ? `Model did not load. ${report.load?.error || report.error || "See report."}` : `${stopped ? "Stopped" : "Finished"}: ${report.acceptedCases}/${report.completedCases} completed requests passed format checks. See outputs and diagnostics.`;
    byId("run").disabled=false; byId("stop").disabled=true; modelSelect.disabled=false; byId("download").disabled=false;
  }
});
window.addEventListener("pagehide", () => engine.cancel());
