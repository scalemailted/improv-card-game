#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const cards = require("../cards.js");
const bible = require("../card-bible.js");

const DATA_DIR = path.resolve(__dirname, "../editorial/v0.18.0");

function loadJson(name) {
  return JSON.parse(fs.readFileSync(path.join(DATA_DIR, name), "utf8"));
}

function parseSemver(value) {
  const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(String(value || ""));
  return match ? match.slice(1).map(Number) : null;
}

function semverGreater(left, right) {
  const a = parseSemver(left);
  const b = parseSemver(right);
  if (!a || !b) return false;
  for (let index = 0; index < 3; index += 1) {
    if (a[index] !== b[index]) return a[index] > b[index];
  }
  return false;
}

function addIssue(list, code, message, context = {}) {
  list.push({ code, message, ...context });
}

function hasPairingDiversity(pairCards) {
  const tones = new Set(pairCards.map((card) => card.tone));
  const intensities = new Set(pairCards.map((card) => card.intensity));
  const orientations = new Set(pairCards.map((card) => card.orientation));
  return tones.has("grounded")
    && (tones.has("heightened") || tones.has("absurd"))
    && intensities.has("low")
    && intensities.has("high")
    && orientations.has("toward-partner")
    && ([...orientations].some((value) => value === "away-from-partner" || value === "against-partner"));
}

function auditEditorial() {
  const errors = [];
  const warnings = [];
  const allCards = [...cards.stances, ...cards.drives];
  const byId = new Map(allCards.map((card) => [card.id, card]));
  const ledger = loadJson("revision-ledger.json");
  const overlap = loadJson("overlap-resolution.json");
  const amber = loadJson("amber-subtheme-review.json");
  const publication = loadJson("publication-waves.json");
  const subthemeReadiness = loadJson("subtheme-readiness.json");

  if (ledger.release !== "0.18.0" || ledger.sourceLibraryVersion !== "0.17.0") {
    addIssue(errors, "ledger-release", "Revision ledger must identify the v0.17.0 to v0.18.0 transition.");
  }
  if (ledger.semanticRevisionCount < 24) {
    addIssue(errors, "ledger-semantic-count", "At least 24 semantic revisions are required.");
  }
  if (ledger.titleGeneralizationCount !== 4 || ledger.totalRevisedCards !== ledger.entries.length) {
    addIssue(errors, "ledger-counts", "Revision ledger counts are inconsistent.");
  }
  if (new Set(ledger.entries.map((entry) => entry.id)).size !== ledger.entries.length) {
    addIssue(errors, "ledger-duplicate-id", "Revision ledger contains duplicate card IDs.");
  }

  for (const entry of ledger.entries) {
    const card = byId.get(entry.id);
    if (!card) {
      addIssue(errors, "ledger-missing-card", `${entry.id} is not present in the active library.`, { cardId: entry.id });
      continue;
    }
    if (!entry.stableIdPreserved || card.id !== entry.id) {
      addIssue(errors, "stable-id", `${entry.id} did not preserve its stable ID.`, { cardId: entry.id });
    }
    if (card.title !== entry.newTitle || card.instruction !== entry.newInstruction) {
      addIssue(errors, "ledger-copy-mismatch", `${entry.id} does not match its approved v0.18.0 copy.`, { cardId: entry.id });
    }
    if (card.contentVersion !== entry.newContentVersion || !semverGreater(entry.newContentVersion, entry.oldContentVersion)) {
      addIssue(errors, "content-version", `${entry.id} must carry an increased contentVersion.`, { cardId: entry.id });
    }
    if (entry.revisionKind === "semantic-consolidation" && entry.oldInstruction === entry.newInstruction) {
      addIssue(errors, "semantic-copy-unchanged", `${entry.id} is listed as a semantic revision without a changed instruction.`, { cardId: entry.id });
    }
    if (entry.revisionKind === "title-generalization" && (entry.oldTitle === entry.newTitle || entry.oldInstruction !== entry.newInstruction)) {
      addIssue(errors, "title-generalization-shape", `${entry.id} must change only its title for the generalization pass.`, { cardId: entry.id });
    }
  }

  if (overlap.clusterCount !== 23 || overlap.clusters.length !== 23) {
    addIssue(errors, "overlap-cluster-count", "All 23 high-priority overlap clusters must be represented.");
  }
  const clusterNumbers = new Set(overlap.clusters.map((cluster) => cluster.cluster));
  for (let number = 1; number <= 23; number += 1) {
    if (!clusterNumbers.has(number)) addIssue(errors, "overlap-cluster-missing", `Overlap cluster ${number} is missing.`);
  }
  for (const cluster of overlap.clusters) {
    if (cluster.status !== "resolved-internal" || !cluster.liveValidationRequired) {
      addIssue(errors, "overlap-resolution-status", `Cluster ${cluster.cluster} must be internally resolved while retaining a live-validation gate.`);
    }
    if (!Array.isArray(cluster.revisedCardIds) || cluster.revisedCardIds.length < 1) {
      addIssue(errors, "overlap-resolution-card", `Cluster ${cluster.cluster} has no revised card.`);
    }
    if (!Array.isArray(cluster.anchorCardIds) || cluster.anchorCardIds.length < 1 || !String(cluster.postRevisionDistinction || "").trim()) {
      addIssue(errors, "overlap-resolution-evidence", `Cluster ${cluster.cluster} must identify its retained anchor and post-revision distinction.`);
    }
  }
  const cluster21 = overlap.clusters.find((cluster) => cluster.cluster === 21);
  if (!cluster21 || cluster21.revisedCardIds.length < 2) {
    addIssue(errors, "overlap-three-card-cluster", "The three-card loyalty cluster requires two revised cards.");
  }

  const expectedAmber = new Set([
    "precarious-authority", "belonging-legitimacy", "shared-origins", "rivalry-comparison",
    "trust-dependence", "rupture-unfinished-business", "admiration-envy", "fear-insecurity",
    "practical-grounding", "prevent-departure", "obtain-apology", "gain-recognition",
    "obtain-surrender", "feign-competence", "competition-loop", "positive-reframing",
    "emotional-contradiction", "transactional-framing", "self-serving-agreement", "pattern-escalation"
  ]);
  if (amber.subthemesReviewed !== 20 || amber.reviews.length !== 20) {
    addIssue(errors, "amber-review-count", "All 20 Amber subthemes must have an internal review record.");
  }
  if (amber.cardsReviewed !== 200 || amber.pairingsAssessed !== 1200) {
    addIssue(errors, "amber-review-scope", "Amber review scope must cover 200 cards and 1,200 structured pairings.");
  }
  for (const review of amber.reviews) {
    expectedAmber.delete(review.subthemeId);
    const subthemeCards = allCards.filter((card) => card.subthemeId === review.subthemeId);
    if (subthemeCards.length !== 10 || JSON.stringify(subthemeCards.map((card) => card.id).sort()) !== JSON.stringify([...review.cardIds].sort())) {
      addIssue(errors, "amber-card-set", `${review.subthemeId} review does not match the ten active cards.`);
    }
    if (review.metadataBlindRead.result !== "pass-internal"
      || review.metadataBlindRead.cardsReviewed !== 10
      || review.metadataBlindRead.clearObservableFirstMove !== 10
      || review.metadataBlindRead.repeatableOrPursuableEngine !== 10
      || review.metadataBlindRead.partnerStateAssumptionFailures !== 0) {
      addIssue(errors, "amber-blind-read", `${review.subthemeId} has an incomplete metadata-blind review.`);
    }
    const pairIds = review.pairabilityGauntlet.oppositeCardIds || [];
    const pairCards = pairIds.map((id) => byId.get(id)).filter(Boolean);
    const expectedOpposite = review.deck === "stance" ? "drive" : "stance";
    if (pairIds.length !== 6 || new Set(pairIds).size !== 6 || pairCards.length !== 6 || pairCards.some((card) => card.type !== expectedOpposite)) {
      addIssue(errors, "amber-pair-set", `${review.subthemeId} must use six unique opposite-deck cards.`);
    } else if (!hasPairingDiversity(pairCards)) {
      addIssue(errors, "amber-pair-diversity", `${review.subthemeId} pairing set lacks required tone, intensity, or orientation diversity.`);
    }
    const pair = review.pairabilityGauntlet;
    if (pair.totalPairings !== 60
      || pair.immediatelyPlayable + pair.playableWithDeliberateIntegration + pair.premiseConflicts !== 60
      || pair.premiseConflicts !== 0
      || pair.result !== "pass-internal") {
      addIssue(errors, "amber-pair-results", `${review.subthemeId} pairability results are incomplete or inconsistent.`);
    }
    if (!review.externalGateStillRequired) {
      addIssue(errors, "amber-external-gate", `${review.subthemeId} must retain the independent human review gate.`);
    }
  }
  for (const missing of expectedAmber) addIssue(errors, "amber-subtheme-missing", `Missing Amber review for ${missing}.`);

  if (subthemeReadiness.counts.total !== 48
      || subthemeReadiness.counts.carryForwardGreen !== 19
      || subthemeReadiness.counts.amberReviewed !== 20
      || subthemeReadiness.counts.redConsolidated !== 9
      || subthemeReadiness.counts.internallyLiveValidationReady !== 48
      || subthemeReadiness.subthemes.length !== 48) {
    addIssue(errors, "subtheme-readiness-counts", "The post-consolidation readiness matrix must account for all 48 subthemes as 19 Green, 20 Amber, and 9 Red-source families.");
  }
  if (subthemeReadiness.subthemes.some((item) => item.v018InternalStatus !== "live-validation-ready" || !item.externalHumanGateRequired)) {
    addIssue(errors, "subtheme-readiness-status", "Every subtheme must be internally live-validation-ready while retaining an external human gate.");
  }

  const expectedPlaytestPacks = new Set(bible.packPlan.filter((pack) => pack.status === "playtest").map((pack) => pack.id));
  if (publication.playtestPackCount !== 9 || publication.packs.length !== 9 || publication.waves.length !== 3) {
    addIssue(errors, "publication-plan-count", "Publication plan must include nine playtest packs in three waves.");
  }
  for (const record of publication.packs) {
    expectedPlaytestPacks.delete(record.packId);
    const plan = bible.getPack(record.packId);
    if (!plan || record.stage !== "live-validation" || plan.publicationStage !== "live-validation") {
      addIssue(errors, "publication-stage", `${record.packId} is not prepared for live-validation.`);
      continue;
    }
    if (record.wave !== plan.publicationWave || ![1, 2, 3].includes(record.wave)) {
      addIssue(errors, "publication-wave", `${record.packId} has an invalid publication wave.`);
    }
    if (record.editorialReviewVersion !== "0.18.0" || plan.editorialReviewVersion !== "0.18.0") {
      addIssue(errors, "publication-review-version", `${record.packId} lacks the v0.18.0 editorial review version.`);
    }
    if (JSON.stringify(record.remainingGates) !== JSON.stringify(plan.remainingPublicationGates)) {
      addIssue(errors, "publication-gates", `${record.packId} gate list does not match the Card Bible plan.`);
    }
  }
  for (const missing of expectedPlaytestPacks) addIssue(errors, "publication-pack-missing", `Missing staged publication record for ${missing}.`);

  if (warnings.length === 0 && amber.limitations && /not a substitute/i.test(amber.limitations)) {
    // Deliberately retain one human-facing limitation in the report without treating it as a validator warning.
  }

  return {
    passed: errors.length === 0,
    errors,
    warnings,
    summary: {
      revisedCards: ledger.totalRevisedCards,
      semanticRevisions: ledger.semanticRevisionCount,
      generalizedTitles: ledger.titleGeneralizationCount,
      resolvedClusters: overlap.clusters.filter((cluster) => cluster.status === "resolved-internal").length,
      amberSubthemesReviewed: amber.reviews.length,
      amberCardsReviewed: amber.cardsReviewed,
      pairingsAssessed: amber.pairingsAssessed,
      stagedPacks: publication.packs.length,
      publicationWaves: publication.waves.length,
      subthemesLiveValidationReady: subthemeReadiness.counts.internallyLiveValidationReady
    }
  };
}

function markdownReport(result) {
  const s = result.summary;
  const lines = [
    "# Imprompt v0.18.0 Editorial Readiness Audit",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
    `**Result:** ${result.passed ? "PASS" : "FAIL"}`,
    "",
    "## Consolidation summary",
    "",
    `- Revised cards with stable IDs: **${s.revisedCards}**`,
    `- Strong semantic rewrites: **${s.semanticRevisions}**`,
    `- Generalized titles: **${s.generalizedTitles}**`,
    `- High-priority overlap clusters internally resolved: **${s.resolvedClusters} / 23**`,
    `- Amber subthemes reviewed metadata-blind: **${s.amberSubthemesReviewed} / 20**`,
    `- Complete subtheme matrix internally ready for live validation: **${s.subthemesLiveValidationReady} / 48**`,
    `- Cards covered by the Amber review: **${s.amberCardsReviewed}**`,
    `- Structured opposite-deck pairings assessed: **${s.pairingsAssessed}**`,
    `- Playtest packs assigned to publication waves: **${s.stagedPacks} / 9** across **${s.publicationWaves}** waves`,
    "",
    "## Interpretation",
    "",
    "A passing result confirms that the v0.17 overlap queue was addressed, stable IDs and per-card versions were preserved, the twenty Amber subthemes received a reproducible internal review, and all nine playtest packs are staged for live validation. It does not claim completion of independent human blind reads, live exposure thresholds, veto-rate review, or final publication sign-off.",
    "",
    `- Errors: **${result.errors.length}**`,
    `- Warnings: **${result.warnings.length}**`
  ];
  if (result.errors.length) {
    lines.push("", "## Errors", "");
    for (const error of result.errors) lines.push(`- **${error.code}**: ${error.message}`);
  }
  lines.push("");
  return lines.join("\n");
}

function printConsole(result) {
  const s = result.summary;
  console.log("Imprompt Editorial Readiness Audit");
  console.log("==================================");
  console.log(`Result: ${result.passed ? "PASS" : "FAIL"}`);
  console.log(`Revisions: ${s.semanticRevisions} semantic + ${s.generalizedTitles} title generalizations`);
  console.log(`Overlap clusters: ${s.resolvedClusters}/23 internally resolved`);
  console.log(`Amber review: ${s.amberSubthemesReviewed}/20 subthemes, ${s.pairingsAssessed} structured pairings`);
  console.log(`Subtheme matrix: ${s.subthemesLiveValidationReady}/48 internally ready for live validation`);
  console.log(`Publication staging: ${s.stagedPacks}/9 packs across ${s.publicationWaves} waves`);
  console.log(`Errors: ${result.errors.length}`);
  console.log(`Warnings: ${result.warnings.length}`);
  for (const error of result.errors) console.error(`ERROR ${error.code}: ${error.message}`);
}

const result = auditEditorial();
if (require.main === module) {
  printConsole(result);
  const writeIndex = process.argv.indexOf("--write");
  if (writeIndex >= 0) {
    const requested = process.argv[writeIndex + 1];
    const outputPath = path.resolve(process.cwd(), requested || "reports/editorial-readiness-audit.md");
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, markdownReport(result), "utf8");
    console.log(`Wrote ${outputPath}`);
  }
  if (!result.passed) process.exitCode = 1;
}

module.exports = { auditEditorial, semverGreater, markdownReport };
