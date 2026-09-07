(function (root, factory) {
  const isCommonJs = typeof module === "object" && module.exports;
  const api = factory(
    isCommonJs ? require("./cards.js") : root.IMPROMPT_CARDS,
    isCommonJs ? require("./hint-bible.js") : root.IMPROMPT_HINT_BIBLE
  );
  if (typeof module === "object" && module.exports) {
    module.exports = api;
  } else {
    root.IMPROMPT_EXERCISES = api;
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function (cards, hintBible) {
  "use strict";

  if (!cards || !hintBible) {
    throw new Error("exercises.js requires cards.js and hint-bible.js to load first.");
  }

  const ALL = "all";
  const EXERCISE_LINK_VERSION = 2;
  const MAX_NAME_LENGTH = 48;
  const MAX_NOTE_LENGTH = 140;

  const categoryBySlug = Object.freeze(
    Object.entries(cards.categoryStyles).reduce((acc, [name, style]) => {
      acc[style.id] = name;
      return acc;
    }, { all: ALL })
  );

  const slugByCategory = Object.freeze(
    Object.entries(cards.categoryStyles).reduce((acc, [name, style]) => {
      acc[name] = style.id;
      return acc;
    }, { [ALL]: "all" })
  );

  const OPEN_PLAY = Object.freeze({
    id: "open-play",
    version: 1,
    source: "open",
    name: "Open Play",
    mode: "open",
    summary: "A fully open draw using the normal independent Stance and Drive decks.",
    focus: "Let each performer discover the scene without a shared coaching constraint.",
    locked: false,
    roleVisibility: "open",
    hintPolicy: "full",
    roles: Object.freeze([
      Object.freeze({
        id: "all",
        label: "Open Play",
        shortLabel: "Open",
        description: "Draw from every Stance and Drive category.",
        stanceFilter: ALL,
        driveFilter: ALL
      })
    ])
  });

  const PRESETS = Object.freeze([
    Object.freeze({
      id: "status-clash",
      version: 1,
      source: "preset",
      name: "Status Clash",
      mode: "mirror",
      summary: "Both performers independently enter with status pressure and a concrete objective.",
      focus: "Explore how two different claims to authority collide without either player knowing the other prompt.",
      locked: true,
      roleVisibility: "open",
      hintPolicy: "full",
      roles: Object.freeze([
        Object.freeze({
          id: "all",
          label: "Status Player",
          shortLabel: "Mirror",
          description: "Status & Authority Stance plus a Direct Objective.",
          stanceFilter: "Status & Authority",
          driveFilter: "Direct Objectives"
        })
      ])
    }),
    Object.freeze({
      id: "emotional-stakes",
      version: 1,
      source: "preset",
      name: "Emotional Stakes",
      mode: "mirror",
      summary: "Both performers receive an emotional lens while their scene engines remain broadly random.",
      focus: "Practice letting an internal emotional assumption shape behavior without explaining it.",
      locked: true,
      roleVisibility: "open",
      hintPolicy: "full",
      roles: Object.freeze([
        Object.freeze({
          id: "all",
          label: "Emotional Player",
          shortLabel: "Mirror",
          description: "Emotional Assumptions Stance plus any Drive.",
          stanceFilter: "Emotional Assumptions",
          driveFilter: ALL
        })
      ])
    }),
    Object.freeze({
      id: "absurd-commitment",
      version: 1,
      source: "preset",
      name: "Absurd Commitment",
      mode: "mirror",
      summary: "Both performers bring a heightened worldview and a behavior that can repeat and escalate.",
      focus: "Commit sincerely to unusual logic, discover a pattern, and heighten instead of explaining the joke.",
      locked: true,
      roleVisibility: "open",
      hintPolicy: "full",
      roles: Object.freeze([
        Object.freeze({
          id: "all",
          label: "Committed Player",
          shortLabel: "Mirror",
          description: "Worldview & Absurdity Stance plus a Repeatable Behavior.",
          stanceFilter: "Worldview & Absurdity",
          driveFilter: "Repeatable Behaviors"
        })
      ])
    }),
    Object.freeze({
      id: "relationship-pressure",
      version: 1,
      source: "preset",
      name: "Relationship Pressure",
      mode: "mirror",
      summary: "Both performers enter with private history and something they cannot address directly.",
      focus: "Build a scene around relationship subtext, avoidance, and incompatible memories.",
      locked: true,
      roleVisibility: "open",
      hintPolicy: "full",
      roles: Object.freeze([
        Object.freeze({
          id: "all",
          label: "Relationship Player",
          shortLabel: "Mirror",
          description: "History & Relationship Stance plus Secrets & Avoidance.",
          stanceFilter: "History & Relationship",
          driveFilter: "Secrets & Avoidance"
        })
      ])
    }),
    Object.freeze({
      id: "pursuer-avoider",
      version: 1,
      source: "preset",
      name: "Pursuer & Avoider",
      mode: "paired",
      summary: "One performer applies pressure while the other protects, redirects, or conceals.",
      focus: "Practice active pursuit and playable resistance without preplanning the scene outcome.",
      locked: true,
      roleVisibility: "hidden",
      hintPolicy: "full",
      roles: Object.freeze([
        Object.freeze({
          id: "a",
          label: "Pursuer",
          shortLabel: "Player A",
          description: "Any Stance plus a Direct Objective. Keep applying clear pressure.",
          stanceFilter: ALL,
          driveFilter: "Direct Objectives"
        }),
        Object.freeze({
          id: "b",
          label: "Avoider",
          shortLabel: "Player B",
          description: "Any Stance plus Secrets & Avoidance. Protect what cannot be addressed directly.",
          stanceFilter: ALL,
          driveFilter: "Secrets & Avoidance"
        })
      ])
    }),
    Object.freeze({
      id: "crown-and-heart",
      version: 1,
      source: "preset",
      name: "Crown & Heart",
      mode: "paired",
      summary: "Authority meets vulnerability: one performer organizes the scene around control, the other around emotional need.",
      focus: "Let power and feeling coexist rather than turning the scene into a simple winner-and-loser contest.",
      locked: true,
      roleVisibility: "hidden",
      hintPolicy: "full",
      roles: Object.freeze([
        Object.freeze({
          id: "a",
          label: "Crown",
          shortLabel: "Player A",
          description: "Status & Authority Stance plus a Direct Objective.",
          stanceFilter: "Status & Authority",
          driveFilter: "Direct Objectives"
        }),
        Object.freeze({
          id: "b",
          label: "Heart",
          shortLabel: "Player B",
          description: "Emotional Assumptions Stance plus Secrets & Avoidance.",
          stanceFilter: "Emotional Assumptions",
          driveFilter: "Secrets & Avoidance"
        })
      ])
    }),
    Object.freeze({
      id: "past-and-future",
      version: 1,
      source: "preset",
      name: "Past & Future",
      mode: "paired",
      summary: "One performer is shaped by shared history while the other pushes toward control and action now.",
      focus: "Discover a relationship in which memory and immediate ambition pull in different directions.",
      locked: true,
      roleVisibility: "hidden",
      hintPolicy: "full",
      roles: Object.freeze([
        Object.freeze({
          id: "a",
          label: "Past",
          shortLabel: "Player A",
          description: "History & Relationship Stance plus Secrets & Avoidance.",
          stanceFilter: "History & Relationship",
          driveFilter: "Secrets & Avoidance"
        }),
        Object.freeze({
          id: "b",
          label: "Future",
          shortLabel: "Player B",
          description: "Status & Authority Stance plus a Direct Objective.",
          stanceFilter: "Status & Authority",
          driveFilter: "Direct Objectives"
        })
      ])
    }),
    Object.freeze({
      id: "instigator-and-anchor",
      version: 1,
      source: "preset",
      name: "Instigator & Anchor",
      mode: "paired",
      summary: "One performer heightens an unusual reality while the other keeps the interaction relational and actionable.",
      focus: "Practice grounding absurdity through sincere consequences instead of denying the premise.",
      locked: true,
      roleVisibility: "hidden",
      hintPolicy: "full",
      roles: Object.freeze([
        Object.freeze({
          id: "a",
          label: "Instigator",
          shortLabel: "Player A",
          description: "Worldview & Absurdity Stance plus a Repeatable Behavior.",
          stanceFilter: "Worldview & Absurdity",
          driveFilter: "Repeatable Behaviors"
        }),
        Object.freeze({
          id: "b",
          label: "Anchor",
          shortLabel: "Player B",
          description: "History & Relationship Stance plus a Direct Objective.",
          stanceFilter: "History & Relationship",
          driveFilter: "Direct Objectives"
        })
      ])
    })
  ]);

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function cleanText(value, maxLength) {
    return String(value || "")
      .replace(/[\u0000-\u001f\u007f]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, maxLength);
  }

  function validFilter(filter) {
    return filter === ALL || Object.prototype.hasOwnProperty.call(slugByCategory, filter);
  }

  function filterToSlug(filter) {
    return slugByCategory[filter] || "all";
  }

  function slugToFilter(slug) {
    return categoryBySlug[slug] || null;
  }

  const hintCodeByPolicy = Object.freeze({
    full: "f",
    nudges: "n",
    "after-attempt": "a",
    off: "o"
  });
  const hintPolicyByCode = Object.freeze(Object.fromEntries(
    Object.entries(hintCodeByPolicy).map(([policy, code]) => [code, policy])
  ));

  function normalizeHintPolicy(value) {
    return hintBible.normalizePolicy(value);
  }

  function hintPolicyToCode(value) {
    return hintCodeByPolicy[normalizeHintPolicy(value)];
  }

  function codeToHintPolicy(value) {
    return normalizeHintPolicy(hintPolicyByCode[value] || value);
  }

  function getPreset(id) {
    if (id === OPEN_PLAY.id) {
      return clone(OPEN_PLAY);
    }
    const found = PRESETS.find((preset) => preset.id === id);
    return found ? clone(found) : null;
  }

  function getPresets(mode) {
    return PRESETS.filter((preset) => !mode || preset.mode === mode).map(clone);
  }

  function getRole(exercise, roleId) {
    if (!exercise || !Array.isArray(exercise.roles)) {
      return null;
    }
    if (exercise.mode !== "paired") {
      return clone(exercise.roles[0]);
    }
    const role = exercise.roles.find((candidate) => candidate.id === roleId);
    return role ? clone(role) : null;
  }

  function normalizeRole(role, fallbackId, fallbackLabel) {
    if (!role || typeof role !== "object") {
      return null;
    }
    const stanceFilter = validFilter(role.stanceFilter) ? role.stanceFilter : null;
    const driveFilter = validFilter(role.driveFilter) ? role.driveFilter : null;
    if (!stanceFilter || !driveFilter) {
      return null;
    }
    return {
      id: role.id === "b" ? "b" : fallbackId,
      label: cleanText(role.label, 28) || fallbackLabel,
      shortLabel: cleanText(role.shortLabel, 20) || (fallbackId === "a" ? "Player A" : fallbackId === "b" ? "Player B" : "Mirror"),
      description: cleanText(role.description, MAX_NOTE_LENGTH) || "Custom coached assignment.",
      stanceFilter,
      driveFilter
    };
  }

  function normalizeExercise(raw, options = {}) {
    if (!raw || typeof raw !== "object") {
      return null;
    }
    const mode = raw.mode === "paired" ? "paired" : raw.mode === "open" ? "open" : "mirror";
    const name = cleanText(raw.name, MAX_NAME_LENGTH);
    if (!name) {
      return null;
    }

    const roles = [];
    if (mode === "paired") {
      const roleA = normalizeRole(raw.roles && raw.roles[0], "a", "Player A");
      const roleB = normalizeRole(raw.roles && raw.roles[1], "b", "Player B");
      if (!roleA || !roleB) {
        return null;
      }
      roles.push(roleA, roleB);
    } else {
      const role = normalizeRole(raw.roles && raw.roles[0], "all", mode === "open" ? "Open Play" : "Mirror");
      if (!role) {
        return null;
      }
      role.id = "all";
      roles.push(role);
    }

    return {
      id: cleanText(raw.id, 64) || `custom-${Date.now().toString(36)}`,
      version: Number.isInteger(raw.version) ? raw.version : 1,
      source: options.forceSource || (raw.source === "preset" || raw.source === "open" ? raw.source : "custom"),
      name,
      mode,
      summary: cleanText(raw.summary, MAX_NOTE_LENGTH) || "A custom guided exercise created on this phone.",
      focus: cleanText(raw.focus, MAX_NOTE_LENGTH) || "Use the assigned categories as private foundations for the shared scene.",
      locked: Boolean(raw.locked),
      roleVisibility: raw.roleVisibility === "open" ? "open" : "hidden",
      hintPolicy: normalizeHintPolicy(raw.hintPolicy),
      roles
    };
  }

  function createSessionSelection(exercise, roleId) {
    const normalized = normalizeExercise(exercise, { forceSource: exercise && exercise.source });
    if (!normalized) {
      return null;
    }
    const role = getRole(normalized, normalized.mode === "paired" ? roleId : "all");
    if (!role) {
      return null;
    }
    return {
      exerciseId: normalized.id,
      exerciseVersion: normalized.version,
      source: normalized.source,
      name: normalized.name,
      mode: normalized.mode,
      summary: normalized.summary,
      focus: normalized.focus,
      locked: normalized.locked,
      roleVisibility: normalized.roleVisibility,
      hintPolicy: normalized.hintPolicy,
      roleId: role.id,
      roleLabel: role.label,
      roleShortLabel: role.shortLabel,
      roleDescription: role.description,
      stanceFilter: role.stanceFilter,
      driveFilter: role.driveFilter
    };
  }

  function buildShareUrl(baseUrl, exercise, roleId = null) {
    const normalized = normalizeExercise(exercise, { forceSource: exercise && exercise.source });
    if (!normalized) {
      throw new TypeError("A valid exercise is required to build a share link.");
    }

    const url = new URL(baseUrl);
    url.search = "";
    url.hash = "";
    url.searchParams.set("xv", String(EXERCISE_LINK_VERSION));
    url.searchParams.set("h", hintPolicyToCode(normalized.hintPolicy));

    const preset = getPreset(normalized.id);
    const canUsePresetId = preset && normalized.source !== "custom";
    if (canUsePresetId) {
      url.searchParams.set("x", normalized.id);
    } else {
      url.searchParams.set("x", "custom");
      url.searchParams.set("n", normalized.name);
      url.searchParams.set("m", normalized.mode === "paired" ? "p" : "m");
      url.searchParams.set("l", normalized.locked ? "1" : "0");
      url.searchParams.set("v", normalized.roleVisibility === "open" ? "o" : "h");
      url.searchParams.set("s", normalized.summary);
      url.searchParams.set("f", normalized.focus);
      const roleA = normalized.roles[0];
      url.searchParams.set("an", roleA.label);
      url.searchParams.set("as", filterToSlug(roleA.stanceFilter));
      url.searchParams.set("ad", filterToSlug(roleA.driveFilter));
      if (normalized.mode === "paired") {
        const roleB = normalized.roles[1];
        url.searchParams.set("bn", roleB.label);
        url.searchParams.set("bs", filterToSlug(roleB.stanceFilter));
        url.searchParams.set("bd", filterToSlug(roleB.driveFilter));
      }
    }

    if (normalized.mode === "paired" && (roleId === "a" || roleId === "b")) {
      url.searchParams.set("r", roleId);
    }
    return url.href;
  }

  function parseInviteUrl(value) {
    let url;
    try {
      url = value instanceof URL ? value : new URL(value, "https://example.invalid/");
    } catch (_error) {
      return null;
    }

    const id = url.searchParams.get("x");
    if (!id) {
      return null;
    }
    const roleId = url.searchParams.get("r");

    if (id !== "custom") {
      const preset = getPreset(id);
      if (!preset) {
        return null;
      }
      preset.hintPolicy = codeToHintPolicy(url.searchParams.get("h"));
      return {
        exercise: preset,
        roleId: preset.mode === "paired" && (roleId === "a" || roleId === "b") ? roleId : null
      };
    }

    const mode = url.searchParams.get("m") === "p" ? "paired" : "mirror";
    const roleA = {
      id: mode === "paired" ? "a" : "all",
      label: cleanText(url.searchParams.get("an"), 28) || (mode === "paired" ? "Player A" : "Mirror"),
      shortLabel: mode === "paired" ? "Player A" : "Mirror",
      description: "Custom coached assignment.",
      stanceFilter: slugToFilter(url.searchParams.get("as") || "all"),
      driveFilter: slugToFilter(url.searchParams.get("ad") || "all")
    };
    const roles = [roleA];
    if (mode === "paired") {
      roles.push({
        id: "b",
        label: cleanText(url.searchParams.get("bn"), 28) || "Player B",
        shortLabel: "Player B",
        description: "Custom coached assignment.",
        stanceFilter: slugToFilter(url.searchParams.get("bs") || "all"),
        driveFilter: slugToFilter(url.searchParams.get("bd") || "all")
      });
    }

    const exercise = normalizeExercise({
      id: `shared-${Date.now().toString(36)}`,
      source: "custom",
      name: cleanText(url.searchParams.get("n"), MAX_NAME_LENGTH) || "Shared Exercise",
      mode,
      summary: cleanText(url.searchParams.get("s"), MAX_NOTE_LENGTH) || "A custom guided exercise shared by a coach.",
      focus: cleanText(url.searchParams.get("f"), MAX_NOTE_LENGTH) || "Use the assigned categories as private foundations for the shared scene.",
      locked: url.searchParams.get("l") !== "0",
      roleVisibility: url.searchParams.get("v") === "o" ? "open" : "hidden",
      hintPolicy: codeToHintPolicy(url.searchParams.get("h")),
      roles
    });

    if (!exercise) {
      return null;
    }
    return {
      exercise,
      roleId: exercise.mode === "paired" && (roleId === "a" || roleId === "b") ? roleId : null
    };
  }

  return Object.freeze({
    ALL,
    EXERCISE_LINK_VERSION,
    OPEN_PLAY,
    PRESETS,
    getPreset,
    getPresets,
    getRole,
    normalizeExercise,
    createSessionSelection,
    buildShareUrl,
    parseInviteUrl,
    filterToSlug,
    slugToFilter,
    normalizeHintPolicy,
    hintPolicyToCode,
    codeToHintPolicy,
    hintPolicies: hintBible.policies,
    clone
  });
});
