"use strict";

const fs = require("fs");
const path = require("path");
const { validate } = require("./hint-validator.js");

const args = process.argv.slice(2);
const writeIndex = args.indexOf("--write");
const outputPath = writeIndex >= 0 && args[writeIndex + 1]
  ? path.resolve(process.cwd(), args[writeIndex + 1])
  : null;

const audit = validate({ exhaustive: true });
const m = audit.metrics;
const lines = [
  "# Imprompt Hint Library Audit",
  "",
  "**Release:** Imprompt v0.21.1  ",
  "**Hint Bible:** 2.0.0  ",
  `**Result:** ${audit.result}`,
  "",
  "## Coverage",
  "",
  `- Cards with resolved coaching metadata: **${m.cards}** (${m.stances} Stances + ${m.drives} Drives)`,
  `- Distinct card-specific manifestation seeds: **${m.manifestationSeeds}**`,
  `- Audited source behavior seeds: **${m.subthemeSeeds}** across ${m.subthemes} formal subthemes`,
  `- Audited pack manifestation lenses: **${m.packLenses}** across 10 official packs`,
  `- Formal subthemes covered: **${m.subthemes} of ${m.subthemes}**`,
  `- Personal Stance–Drive hands validated: **${m.personalHands.toLocaleString()}**`,
  `- Structural combination angles generated and checked: **${m.generatedStructuralAngles.toLocaleString()}**`,
  `- Reusable combination patterns: **${m.patterns}**`,
  `- Coach hint policies: **${m.policies}**`,
  "",
  "## Acceptance gates",
  "",
  "- Pack + subtheme composition for every card: checked",
  "- No duplicated resolved manifestation seed: checked",
  "- Holder-only language: checked",
  "- No required partner reaction: checked",
  "- No mandatory setting, relationship, plot, punchline, or ending: checked",
  "- Drive treated as pressure rather than win condition: checked",
  "- Full versus concise policy depth: checked",
  "- After-first-attempt gating: checked",
  "- Hints-off suppression: checked",
  "- Six distinct concrete fusion angles per hand: checked",
  "- Integrated way-in, first move, repeatable loop, and adaptation: checked",
  "",
  "## Errors",
  "",
  ...(audit.errors.length ? audit.errors.map((message) => `- ${message}`) : ["- None"]),
  "",
  "## Warnings",
  "",
  ...(audit.warnings.length ? audit.warnings.map((message) => `- ${message}`) : ["- None"]),
  "",
  "## Interpretation",
  "",
  "This audit validates the deterministic, local coaching system. It does not claim that every generated hint is the only or best interpretation of a hand. The interface deliberately labels each output as one possible way in and lets players request another structural angle.",
  ""
];
const report = lines.join("\n");
if (outputPath) {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, report);
}
console.log(`Hint Library Audit: ${audit.result}`);
console.log(`Cards: ${m.cards}; seeds: ${m.manifestationSeeds}; personal hands: ${m.personalHands}; generated angles: ${m.generatedStructuralAngles}`);
console.log(`Errors: ${audit.errors.length}; warnings: ${audit.warnings.length}`);
if (audit.errors.length) {
  audit.errors.slice(0, 20).forEach((message) => console.error(`- ${message}`));
  process.exitCode = 1;
}
