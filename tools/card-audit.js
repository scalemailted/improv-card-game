#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const cards = require("../cards.js");
const bible = require("../card-bible.js");
const validator = require("./card-validator.js");

function percentage(value, total) {
  return total ? `${((value / total) * 100).toFixed(1)}%` : "0.0%";
}

function markdownReport(result) {
  const summary = result.summary;
  const totalCards = summary.stances + summary.drives;
  const lines = [
    "# Imprompt Card Library Audit",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
    `**Result:** ${result.passed ? "PASS" : "FAIL"}`,
    "",
    "## Library progress",
    "",
    "| Measure | Available in app | v1.0 target | Progress |",
    "|---|---:|---:|---:|",
    `| Active packs | ${summary.activePacks} | ${summary.plannedPacks} | ${percentage(summary.activePacks, summary.plannedPacks)} |`,
    `| Published packs | ${summary.publishedPacks} | ${summary.plannedPacks} | ${percentage(summary.publishedPacks, summary.plannedPacks)} |`,
    `| Playtest packs | ${summary.playtestPacks} | — | — |`,
    `| Stance cards | ${summary.stances} | ${summary.targetStances} | ${percentage(summary.stances, summary.targetStances)} |`,
    `| Drive cards | ${summary.drives} | ${summary.targetDrives} | ${percentage(summary.drives, summary.targetDrives)} |`,
    `| Total cards | ${totalCards} | ${summary.targetStances + summary.targetDrives} | ${percentage(totalCards, summary.targetStances + summary.targetDrives)} |`,
    "",
    "## Active category counts",
    "",
    "| Deck | Category | Available | v1.0 target |",
    "|---|---|---:|---:|"
  ];

  for (const category of bible.categories) {
    lines.push(`| ${category.deck === "stance" ? "Stance" : "Drive"} | ${category.label} | ${summary.categoryCounts[category.id]} | ${category.targetCount} |`);
  }

  lines.push(
    "",
    "## Editorial metadata distribution",
    "",
    "### Difficulty",
    "",
    "| Level | Cards |",
    "|---|---:|"
  );
  for (const value of bible.enums.difficulties) {
    lines.push(`| ${value} | ${summary.difficultyCounts[value]} |`);
  }

  lines.push("", "### Intensity", "", "| Level | Cards |", "|---|---:|");
  for (const value of bible.enums.intensities) {
    lines.push(`| ${value} | ${summary.intensityCounts[value]} |`);
  }

  lines.push("", "### Tone", "", "| Tone | Cards |", "|---|---:|");
  for (const value of bible.enums.tones) {
    lines.push(`| ${value} | ${summary.toneCounts[value]} |`);
  }

  lines.push(
    "",
    "## Copy profile",
    "",
    `- Average Stance instruction: **${summary.averageStanceInstructionWords.toFixed(1)} words**`,
    `- Average Drive instruction: **${summary.averageDriveInstructionWords.toFixed(1)} words**`,
    "",
    "## Automated acceptance results",
    "",
    `- Errors: **${result.errors.length}**`,
    `- Warnings: **${result.warnings.length}**`
  );

  if (result.errors.length) {
    lines.push("", "### Errors", "");
    for (const entry of result.errors) {
      lines.push(`- **${entry.code}**${entry.cardId ? ` (${entry.cardId})` : ""}: ${entry.message}`);
    }
  }

  if (result.warnings.length) {
    lines.push("", "### Warnings", "");
    for (const entry of result.warnings) {
      lines.push(`- **${entry.code}**${entry.cardId ? ` (${entry.cardId})` : ""}: ${entry.message}`);
    }
  }

  lines.push(
    "",
    "## Interpretation",
    "",
    "A passing automated audit confirms structural consistency, taxonomy coverage, ID allocation, controlled metadata, copy-length bounds, hidden-information heuristics, and duplicate detection. It does **not** replace the human editorial rubric or live improv playtesting required by the Imprompt Card Bible.",
    ""
  );

  return lines.join("\n");
}

function printConsole(result) {
  const summary = result.summary;
  console.log("Imprompt Card Library Audit");
  console.log("===========================");
  console.log(`Result: ${result.passed ? "PASS" : "FAIL"}`);
  console.log(`Available: ${summary.stances} Stances + ${summary.drives} Drives across ${summary.activePacks} active pack(s)`);
  console.log(`Pack status: ${summary.publishedPacks} published + ${summary.playtestPacks} playtest`);
  console.log(`Target: ${summary.targetStances} Stances + ${summary.targetDrives} Drives across ${summary.plannedPacks} packs`);
  console.log(`Errors: ${result.errors.length}`);
  console.log(`Warnings: ${result.warnings.length}`);

  for (const entry of result.errors) {
    console.error(`ERROR ${entry.code}${entry.cardId ? ` [${entry.cardId}]` : ""}: ${entry.message}`);
  }
  for (const entry of result.warnings) {
    console.warn(`WARN  ${entry.code}${entry.cardId ? ` [${entry.cardId}]` : ""}: ${entry.message}`);
  }
}

const result = validator.auditLibrary(cards.cardPacks);
printConsole(result);

const writeIndex = process.argv.indexOf("--write");
if (writeIndex >= 0) {
  const requested = process.argv[writeIndex + 1];
  const outputPath = path.resolve(process.cwd(), requested || "reports/card-library-audit.md");
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, markdownReport(result), "utf8");
  console.log(`Wrote ${outputPath}`);
}

if (!result.passed) {
  process.exitCode = 1;
}
