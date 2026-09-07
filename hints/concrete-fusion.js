(function (root, factory) {
  const isCommonJs = typeof module === "object" && module.exports;
  const cardHints = isCommonJs ? require("./card-hints.js") : root.IMPROMPT_CARD_HINTS;
  const fusionProfiles = isCommonJs ? require("./fusion-profiles.js") : root.IMPROMPT_FUSION_PROFILES;
  const api = factory(cardHints, fusionProfiles);
  if (isCommonJs) {
    module.exports = api;
  } else {
    root.IMPROMPT_CONCRETE_FUSION = api;
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function (cardHints, fusionProfiles) {
  "use strict";

  if (!cardHints || !fusionProfiles) {
    throw new Error("concrete-fusion.js requires hints/card-hints.js and hints/fusion-profiles.js to load first.");
  }

  const FUSION_VERSION = "2.1.0";

  function normalizeAngle(angle, count) {
    return ((Number(angle) || 0) % count + count) % count;
  }

  function splitSentences(text) {
    const matches = String(text || "").trim().match(/[^.!?]+[.!?]?/g);
    return (matches || [])
      .map((piece) => piece.trim())
      .filter(Boolean);
  }

  function withoutTerminal(text) {
    return String(text || "").trim().replace(/[.!?]+$/, "");
  }

  function lowerFirst(text) {
    const value = String(text || "").trim();
    return value ? value[0].toLowerCase() + value.slice(1) : value;
  }

  function upperFirst(text) {
    const value = String(text || "").trim();
    return value ? value[0].toUpperCase() + value.slice(1) : value;
  }

  function asSentence(text) {
    const value = String(text || "").trim();
    if (!value) return "";
    return /[.!?]$/.test(value) ? upperFirst(value) : `${upperFirst(value)}.`;
  }

  function specificSeed(card, angle) {
    const hint = cardHints.get(card);
    if (!hint || !Array.isArray(hint.manifestationSeeds) || hint.manifestationSeeds.length === 0) {
      const fallback = asSentence(card && card.instruction);
      return { full: fallback, context: "", action: fallback };
    }
    const index = normalizeAngle(angle, hint.manifestationSeeds.length);
    const seed = hint.manifestationSeeds[index];
    const full = String(seed.text || "").trim();
    const pieces = splitSentences(full);
    // Resolved card hints now preserve the broad pack context and the concrete
    // subtheme action as separate fields. The sentence fallback keeps older
    // hint records compatible while still selecting the specific final action.
    const action = String(seed.action || (pieces.length ? pieces[pieces.length - 1] : full)).trim();
    const context = String(seed.context || (pieces.length > 1 ? pieces.slice(0, -1).join(" ") : "")).trim();
    return { full, context, action: asSentence(action) };
  }

  function profileFor(stance, drive, angle) {
    const stanceProfile = fusionProfiles.getStance(stance) || {
      instrument: `the point of view in “${stance.title}”`,
      reading: "interpret the response through that point of view",
      escalation: "make the next choice more specific and consequential",
      tension: "the need to protect that point of view"
    };
    const driveProfile = fusionProfiles.getDrive(drive) || {
      aim: `put “${drive.title}” into motion`,
      opening: lowerFirst(withoutTerminal(drive.instruction)),
      blocked: "change the tactic instead of repeating the same words",
      traction: "let progress reveal a more consequential version of the pressure",
      loop: "each response produces a changed attempt",
      pressure: `the private pressure in “${drive.title}”`
    };
    return {
      stance: stanceProfile,
      drive: driveProfile,
      anchor: fusionProfiles.getAnchor(stance, angle),
      secondaryAnchor: fusionProfiles.getAnchor(drive, angle + 1),
      stanceSeed: specificSeed(stance, angle),
      driveSeed: specificSeed(drive, angle + 1)
    };
  }

  const pairOverrides = {
    "S01+D13:mask": {
      wayIn: "Take command of investigating the problem you caused: “Top of the Ladder” gives you the authority to direct the response, while “Helpful Culprit” determines which facts you steer attention toward or away from.",
      firstMove: "Before anyone asks, decide what should be examined first and assign yourself the role of coordinating it; volunteer one true detail that makes your own responsibility seem less likely.",
      repeatableLoop: "Each clue that approaches your role becomes a reason to tighten control—reassign a task, redefine useful evidence, or praise a line of inquiry that points elsewhere.",
      adaptation: "Let suspicion alter the power dynamic. If the scene finds a stronger shared pattern, use your authority inside that pattern rather than simply denying responsibility."
    },
    "S22+D14:mask": {
      wayIn: "Use practical problem-solving as your escape route: “Practical Realist” supplies concrete logistical questions, and “Not That Subject” turns those questions into redirects away from the subject you are protecting.",
      firstMove: "Accept the unusual premise, then immediately ask who is paying, when it starts, or what safety step is missing; keep that practical problem active whenever the conversation nears the forbidden subject.",
      repeatableLoop: "Each return toward the subject produces a more urgent logistical consequence—another deadline, cost, responsibility, or safety concern that supposedly has to be handled first.",
      adaptation: "Allow the practical questions to become revealing. If the shared scene centers on the avoidance itself, follow that pattern rather than inventing endless new chores."
    },
    "S192+D74:reinterpretation": {
      wayIn: "Turn emotional repair into a formal exit procedure: “Everything Is Policy” supplies the rules, and “Stay Until We’re Okay” makes completion the condition for ending the interaction.",
      firstMove: "Connect two details into a policy, then name one missing step—an acknowledgment, agreement, or decision—that must be completed before the interaction can end.",
      repeatableLoop: "Whenever closure becomes possible, treat that moment as evidence that a different requirement remains unresolved; make each new step more personal rather than merely adding arbitrary rules.",
      adaptation: "If a stronger shared pattern appears, let the procedure reveal the emotional need instead of using it only to block the scene."
    }
  };

  function channelCopy(stance, drive, p) {
    return {
      wayIn: `Use “${stance.title}” as the method for “${drive.title}”: ${p.stance.instrument} becomes the way you try to ${p.drive.aim}.`,
      firstMove: `${asSentence(p.stanceSeed.action)} Anchor it in ${p.anchor}. Make that same choice carry the Drive through ${p.secondaryAnchor}: ${lowerFirst(asSentence(p.drive.opening))}`,
      repeatableLoop: `${asSentence(p.drive.loop)} Each time the loop returns, ${lowerFirst(asSentence(p.stance.escalation))}`,
      adaptation: `Keep this method only while it changes the interaction. When a clearer shared pattern appears, let that pattern reshape how you try to ${p.drive.aim}.`
    };
  }

  function maskCopy(stance, drive, p) {
    return {
      wayIn: `Keep ${p.stance.instrument} visible as “${stance.title},” while “${drive.title}” privately pushes you to ${p.drive.aim}.`,
      firstMove: `${asSentence(p.stanceSeed.action)} Use ${p.anchor} as the visible reason. Under that surface, use ${p.secondaryAnchor} to put the Drive into motion: ${lowerFirst(asSentence(p.driveSeed.action))}`,
      repeatableLoop: `${asSentence(p.drive.blocked)} At the same time, ${lowerFirst(asSentence(p.stance.escalation))} Let the outward Stance become clearer as the hidden pressure becomes harder to protect.`,
      adaptation: "Let the private pressure become visible through choices rather than explanation. Release the mask when the scene discovers a stronger shared truth."
    };
  }

  function frictionCopy(stance, drive, p) {
    return {
      wayIn: `Try to ${p.drive.aim}, but let ${p.stance.tension} make the direct route unavailable. That contradiction is the behavior connecting “${stance.title}” and “${drive.title}.”`,
      firstMove: `${asSentence(p.driveSeed.action)} Ground that pressure in ${p.secondaryAnchor}. In the same beat, ${lowerFirst(asSentence(p.stanceSeed.action))} Let the second pressure complicate the first without canceling it.`,
      repeatableLoop: `${asSentence(p.drive.blocked)} Then ${lowerFirst(asSentence(p.stance.reading))} Alternate which card leads for one beat, and let each solution create the next problem.`,
      adaptation: "Do not solve the contradiction too quickly. Keep it only while it creates responsive behavior, then follow the clearer shared pattern."
    };
  }

  function escalationCopy(stance, drive, p) {
    return {
      wayIn: `Treat every result of “${drive.title}”—your attempt to ${p.drive.aim}—as new evidence for “${stance.title}.” The Drive supplies the action; the Stance decides why the result matters.`,
      firstMove: `${asSentence(p.driveSeed.action)} Ground the attempt in ${p.secondaryAnchor}. Whatever follows, ${lowerFirst(asSentence(p.stance.reading))}`,
      repeatableLoop: `${asSentence(p.drive.loop)} After each cycle, ${lowerFirst(asSentence(p.stance.escalation))} Raise consequence, specificity, or emotional exposure rather than merely volume.`,
      adaptation: "Stop escalating this loop when the interaction offers a better one. Carry forward the discovered pattern rather than defending the original tactic."
    };
  }

  function reinterpretationCopy(stance, drive, p) {
    return {
      wayIn: `Use “${stance.title}” as your interpretation rule—${p.stance.reading}—then let each interpretation give “${drive.title}” a changed tactic for trying to ${p.drive.aim}.`,
      firstMove: `${asSentence(p.stanceSeed.action)} Ground it in ${p.anchor}. Let the meaning you assign justify this next action through ${p.secondaryAnchor}: ${lowerFirst(asSentence(p.driveSeed.action))}`,
      repeatableLoop: `After each response, ${lowerFirst(asSentence(p.stance.reading))} Then shift from the first tactic to this changed one: ${lowerFirst(asSentence(p.drive.blocked))}`,
      adaptation: "Treat the interpretation as the character's belief, not an objective fact. Let new offers change what the belief means and which tactic follows."
    };
  }

  function counterweightCopy(stance, drive, p) {
    return {
      wayIn: `Let ${p.stance.instrument} from “${stance.title}” shape how you pursue “${drive.title}” by trying to ${p.drive.aim}, while ${p.drive.pressure} exposes the cost of the Stance. Both cards remain visible in the same choice.`,
      firstMove: `${asSentence(p.driveSeed.action)} Ground that pressure in ${p.secondaryAnchor}. Keep the Stance present in the same beat: ${lowerFirst(asSentence(p.stanceSeed.action))} Anchor the visible method in ${p.anchor}.`,
      repeatableLoop: `${asSentence(p.drive.blocked)} Let the Stance limit or redirect that tactic by doing this: ${lowerFirst(asSentence(p.stance.escalation))}`,
      adaptation: "Alternate which card leads only while their tension produces clear interaction. If one becomes the shared game, allow the other to become support or subtext."
    };
  }

  const builders = {
    channel: channelCopy,
    mask: maskCopy,
    friction: frictionCopy,
    escalation: escalationCopy,
    reinterpretation: reinterpretationCopy,
    counterweight: counterweightCopy
  };

  function build(stance, drive, pattern, angle = 0, allowsDepth = true) {
    if (!stance || !drive || !pattern) {
      return null;
    }
    const p = profileFor(stance, drive, angle);
    const builder = builders[pattern.id] || builders.channel;
    const override = pairOverrides[`${stance.id}+${drive.id}:${pattern.id}`];
    const copy = override || builder(stance, drive, p);
    return {
      fusionVersion: FUSION_VERSION,
      profileVersion: fusionProfiles.PROFILE_VERSION,
      wayIn: copy.wayIn,
      firstMove: copy.firstMove,
      repeatableLoop: allowsDepth ? copy.repeatableLoop : null,
      adaptation: allowsDepth ? copy.adaptation : null,
      stanceAction: p.stanceSeed.action,
      driveAction: p.driveSeed.action,
      anchor: p.anchor,
      pairSpecificOverride: Boolean(override)
    };
  }

  return Object.freeze({
    FUSION_VERSION,
    build,
    patternIds: Object.freeze(Object.keys(builders)),
    pairOverrideKeys: Object.freeze(Object.keys(pairOverrides))
  });
});
