(function (root, factory) {
  const isCommonJs = typeof module === "object" && module.exports;
  const cardHints = isCommonJs ? require("./card-hints.js") : root.IMPROMPT_CARD_HINTS;
  const api = factory(cardHints);
  if (isCommonJs) {
    module.exports = api;
  } else {
    root.IMPROMPT_CONCRETE_FUSION = api;
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function (cardHints) {
  "use strict";

  if (!cardHints) {
    throw new Error("concrete-fusion.js requires hints/card-hints.js to load first.");
  }

  function normalizeAngle(angle, count) {
    return ((Number(angle) || 0) % count + count) % count;
  }

  function sentence(text, index = 0) {
    const pieces = String(text || "")
      .trim()
      .split(/(?<=[.!?])\s+/)
      .map((piece) => piece.trim())
      .filter(Boolean);
    return pieces[index] || pieces[0] || String(text || "").trim();
  }

  function lowerFirst(text) {
    const value = String(text || "").trim();
    return value ? value[0].toLowerCase() + value.slice(1) : value;
  }

  function withoutTerminal(text) {
    return String(text || "").trim().replace(/[.!?]+$/, "");
  }

  function seedFor(card, angle) {
    const hint = cardHints.get(card);
    if (!hint || !Array.isArray(hint.manifestationSeeds) || hint.manifestationSeeds.length === 0) {
      return { primary: card.instruction, secondary: card.instruction };
    }
    const primaryIndex = normalizeAngle(angle, hint.manifestationSeeds.length);
    const secondaryIndex = normalizeAngle(primaryIndex + 1, hint.manifestationSeeds.length);
    return {
      primary: sentence(hint.manifestationSeeds[primaryIndex].text, 0),
      secondary: sentence(hint.manifestationSeeds[secondaryIndex].text, 0)
    };
  }

  const patternCopy = {
    channel: {
      wayIn(stance, drive) {
        return `Make “${stance.title}” the method you use to pursue “${drive.title}.”`;
      },
      firstMove(stanceSeed, driveSeed) {
        return `${withoutTerminal(stanceSeed.primary)}; in the same beat, ${lowerFirst(driveSeed.primary)}`;
      },
      loop(stance, drive) {
        return `After each response, repeat the visible behavior of “${stance.title}” in a more specific form while changing the tactic you use for “${drive.title}.”`;
      },
      adapt() {
        return "Keep the method only while it creates interaction. When a clearer shared pattern appears, let that pattern decide the next tactic.";
      }
    },
    mask: {
      wayIn(stance, drive) {
        return `Let “${stance.title}” be the behavior everyone can see while “${drive.title}” supplies the private pressure underneath it.`;
      },
      firstMove(stanceSeed, driveSeed) {
        return `${withoutTerminal(stanceSeed.primary)}. While doing that, quietly put this pressure into motion: ${lowerFirst(driveSeed.primary)}`;
      },
      loop(stance, drive) {
        return `Whenever “${drive.title}” becomes harder to protect, make the outward behavior of “${stance.title}” more convincing instead of explaining what you want.`;
      },
      adapt() {
        return "Let the hidden pressure become visible through choices, not exposition. Release the mask if the scene discovers a stronger shared truth.";
      }
    },
    friction: {
      wayIn(stance, drive) {
        return `Play both cards sincerely: “${stance.title}” makes “${drive.title}” difficult to pursue directly.`;
      },
      firstMove(stanceSeed, driveSeed) {
        return `${withoutTerminal(driveSeed.primary)}. Then complicate your own attempt by following this Stance behavior: ${lowerFirst(stanceSeed.primary)}`;
      },
      loop(stance, drive) {
        return `Each response forces a choice between protecting “${stance.title}” and advancing “${drive.title}.” Let a different card win for one beat, then feel the cost.`;
      },
      adapt() {
        return "Do not solve the contradiction too quickly. Use it until the partner’s behavior creates a more interesting shared pattern.";
      }
    },
    escalation: {
      wayIn(stance, drive) {
        return `Use every success or failure of “${drive.title}” as new evidence for “${stance.title}.”`;
      },
      firstMove(stanceSeed, driveSeed) {
        return `${withoutTerminal(driveSeed.primary)}. Read the result through this Stance behavior: ${lowerFirst(stanceSeed.primary)}`;
      },
      loop(stance, drive) {
        return `Repeat the cause-and-effect loop: pursue “${drive.title},” interpret the result through “${stance.title},” then make the next attempt more consequential rather than merely louder.`;
      },
      adapt() {
        return "Escalate the consequence, specificity, or emotional exposure. Stop escalating this loop once the scene offers a better one.";
      }
    },
    reinterpretation: {
      wayIn(stance, drive) {
        return `Let “${stance.title}” decide what each new response means, then use that meaning to renew “${drive.title}.”`;
      },
      firstMove(stanceSeed, driveSeed) {
        return `${withoutTerminal(stanceSeed.primary)}. Use the meaning you assign to that moment to justify this next action: ${lowerFirst(driveSeed.primary)}`;
      },
      loop(stance, drive) {
        return `Each response receives a fresh interpretation through “${stance.title},” and each interpretation produces a changed attempt at “${drive.title}.”`;
      },
      adapt() {
        return "Treat your interpretation as the character’s belief, not an objective fact. Let your partner’s offers reshape what the belief means.";
      }
    },
    counterweight: {
      wayIn(stance, drive) {
        return `Use “${stance.title}” to keep “${drive.title}” from becoming one-note, and let the Drive expose the cost of the Stance.`;
      },
      firstMove(stanceSeed, driveSeed) {
        return `${withoutTerminal(driveSeed.primary)} while also ${lowerFirst(withoutTerminal(stanceSeed.primary))}. Let both pressures remain visible in the same choice.`;
      },
      loop(stance, drive) {
        return `Alternate which card leads: let “${drive.title}” create the action, then let “${stance.title}” limit, redirect, or emotionally color the next beat.`;
      },
      adapt() {
        return "Keep both cards only while their tension produces clear behavior. If one becomes the shared game, allow the other to become support or subtext.";
      }
    }
  };

  function build(stance, drive, pattern, angle = 0, allowsDepth = true) {
    if (!stance || !drive || !pattern) {
      return null;
    }
    const copy = patternCopy[pattern.id] || patternCopy.channel;
    const stanceSeed = seedFor(stance, angle);
    const driveSeed = seedFor(drive, angle + 1);
    return {
      wayIn: copy.wayIn(stance, drive),
      firstMove: copy.firstMove(stanceSeed, driveSeed),
      repeatableLoop: allowsDepth ? copy.loop(stance, drive) : null,
      adaptation: allowsDepth ? copy.adapt(stance, drive) : null,
      stanceSeed: stanceSeed.primary,
      driveSeed: driveSeed.primary
    };
  }

  return Object.freeze({
    build,
    patternIds: Object.freeze(Object.keys(patternCopy))
  });
});
