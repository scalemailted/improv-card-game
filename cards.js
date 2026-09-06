(function (root, factory) {
  const cards = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = cards;
  } else {
    root.IMPROMPT_CARDS = cards;
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const stances = [
    {
      id: "S01",
      title: "Top of the Ladder",
      instruction: "Carry yourself as the highest-status person present. Treat questions as requests for your approval.",
      category: "Status & Authority"
    },
    {
      id: "S02",
      title: "Borrowed Authority",
      instruction: "Project confident authority while quietly working to keep everyone cooperative. Your confidence depends on their cooperation.",
      category: "Status & Authority"
    },
    {
      id: "S03",
      title: "The Only Professional",
      instruction: "Behave as the only qualified person present. Correct mistakes with patient, increasingly strained professionalism.",
      category: "Status & Authority"
    },
    {
      id: "S04",
      title: "Act Like You Belong",
      instruction: "You do not understand what is happening. Copy the confidence around you and never admit confusion.",
      category: "Status & Authority"
    },
    {
      id: "S05",
      title: "The Protégé Problem",
      instruction: "Treat another player as someone you trained. Offer corrections, backhanded praise, and reminders of your influence.",
      category: "Status & Authority"
    },
    {
      id: "S06",
      title: "Hidden Power",
      instruction: "Act publicly modest while making choices as though you control the outcome.",
      category: "Status & Authority"
    },
    {
      id: "S07",
      title: "Before They Were Impressive",
      instruction: "Treat another player with old familiarity. Casually puncture formality, grandeur, or attempts to impress you.",
      category: "History & Relationship"
    },
    {
      id: "S08",
      title: "You Owe Me",
      instruction: "Behave as though another person's success is partly yours. Refer to favors, sacrifices, or guidance as if the debt is obvious.",
      category: "History & Relationship"
    },
    {
      id: "S09",
      title: "The Responsible One",
      instruction: "Take responsibility for everyone and everything. Fix problems before anyone asks, then resent having to do it.",
      category: "History & Relationship"
    },
    {
      id: "S10",
      title: "Old Rivals",
      instruction: "Choose another player as your measuring stick. Compare achievements, score small victories, and refuse to be outdone.",
      category: "History & Relationship"
    },
    {
      id: "S11",
      title: "Only You",
      instruction: "Choose one person as the only one you trust. Seek their help while hiding how much you depend on it.",
      category: "History & Relationship"
    },
    {
      id: "S12",
      title: "After What Happened",
      instruction: "Carry yourself as if an unnamed past incident still hangs over the interaction. Read ordinary remarks through that memory.",
      category: "History & Relationship"
    },
    {
      id: "S13",
      title: "Envious Admiration",
      instruction: "Be sincerely impressed by another player while trying not to appear lesser. Compliment, imitate, and compete at the same time.",
      category: "Emotional Assumptions"
    },
    {
      id: "S14",
      title: "The Old You",
      instruction: "Perform the person you used to be, even when that identity no longer fits. Defend the old version of yourself whenever it is challenged.",
      category: "Emotional Assumptions"
    },
    {
      id: "S15",
      title: "Replacement Fear",
      instruction: "Behave as if your place is insecure. Make yourself indispensable and treat small changes as threats.",
      category: "Emotional Assumptions"
    },
    {
      id: "S16",
      title: "For Their Own Good",
      instruction: "Take charge of another person's choices because you trust your judgment more than theirs. Frame control as care.",
      category: "Emotional Assumptions"
    },
    {
      id: "S17",
      title: "Their Opinion Matters",
      instruction: "Seek one person's approval while pretending their opinion is irrelevant. Adjust yourself whenever they respond.",
      category: "Emotional Assumptions"
    },
    {
      id: "S18",
      title: "Fishing for Praise",
      instruction: "You desperately want praise but refuse to ask for it. Create opportunities for others to notice your greatness.",
      category: "Emotional Assumptions"
    },
    {
      id: "S19",
      title: "Sacred Procedure",
      instruction: "Treat an ordinary activity as a solemn ritual. Protect every step, object, and tradition from casual interference.",
      category: "Worldview & Absurdity"
    },
    {
      id: "S20",
      title: "Red Alert",
      instruction: "Treat every development as urgent evidence of a crisis. Escalate precautions faster than the facts justify.",
      category: "Worldview & Absurdity"
    },
    {
      id: "S21",
      title: "Cause for Celebration",
      instruction: "Interpret every development as a reason to celebrate. Find victory in setbacks, warnings, and bad news.",
      category: "Worldview & Absurdity"
    },
    {
      id: "S22",
      title: "Practical Realist",
      instruction: "Accept any unusual premise without debate. Focus immediately on schedules, costs, safety, and what must happen next.",
      category: "Worldview & Absurdity"
    },
    {
      id: "S23",
      title: "The Important Thing",
      instruction: "Choose one ordinary object, phrase, or rule and treat it as vitally important. Keep bringing the scene back to it.",
      category: "Worldview & Absurdity"
    },
    {
      id: "S24",
      title: "The Grand Design",
      instruction: "Treat coincidences and interruptions as parts of a larger plan. Connect everything with absolute conviction.",
      category: "Worldview & Absurdity"
    }
  ];

  const drives = [
    {
      id: "D01",
      title: "Admit You Need Me",
      instruction: "Make someone admit that they need your help.",
      category: "Direct Objectives"
    },
    {
      id: "D02",
      title: "Don’t Go",
      instruction: "Create reasons another player must stay with you. Never directly ask them to stay.",
      category: "Direct Objectives"
    },
    {
      id: "D03",
      title: "Say You’re Sorry",
      instruction: "Maneuver someone into apologizing without naming the offense.",
      category: "Direct Objectives"
    },
    {
      id: "D04",
      title: "Retroactive Permission",
      instruction: "Get approval for something you have already done.",
      category: "Direct Objectives"
    },
    {
      id: "D05",
      title: "Make It Their Idea",
      instruction: "Make an unwanted task sound appealing enough that someone volunteers for it.",
      category: "Direct Objectives"
    },
    {
      id: "D06",
      title: "How Much Do You Know?",
      instruction: "Probe for what others know while revealing as little as possible.",
      category: "Direct Objectives"
    },
    {
      id: "D07",
      title: "Join Me",
      instruction: "Recruit someone into a secret plan.",
      category: "Direct Objectives"
    },
    {
      id: "D08",
      title: "You First",
      instruction: "Coax someone else into breaking a rule before you do.",
      category: "Direct Objectives"
    },
    {
      id: "D09",
      title: "Recognize Me",
      instruction: "Make someone acknowledge your importance, expertise, or authority.",
      category: "Direct Objectives"
    },
    {
      id: "D10",
      title: "Choose Me",
      instruction: "Make yourself the choice over another person, plan, or obligation.",
      category: "Direct Objectives"
    },
    {
      id: "D11",
      title: "Prove Your Loyalty",
      instruction: "Invent small tests of loyalty and judge every response without admitting there is a test.",
      category: "Direct Objectives"
    },
    {
      id: "D12",
      title: "Give It Up",
      instruction: "Persuade someone to surrender something they value.",
      category: "Direct Objectives"
    },
    {
      id: "D13",
      title: "Helpful Culprit",
      instruction: "Hide that the problem is your fault while enthusiastically helping investigate it.",
      category: "Secrets & Avoidance"
    },
    {
      id: "D14",
      title: "Not That Subject",
      instruction: "Choose one subject you cannot let the scene reach. Redirect whenever the conversation gets close.",
      category: "Secrets & Avoidance"
    },
    {
      id: "D15",
      title: "Merciful Lie",
      instruction: "Choose a truth your character believes would hurt someone. Keep it from them, even as honesty becomes harder.",
      category: "Secrets & Avoidance"
    },
    {
      id: "D16",
      title: "Confess First",
      instruction: "Get someone else to confess or incriminate themselves before you reveal anything.",
      category: "Secrets & Avoidance"
    },
    {
      id: "D17",
      title: "Sell the Disaster",
      instruction: "Make a terrible plan sound sensible, responsible, and inevitable.",
      category: "Secrets & Avoidance"
    },
    {
      id: "D18",
      title: "Fake the Expertise",
      instruction: "Perform expertise so confidently that no one questions you.",
      category: "Secrets & Avoidance"
    },
    {
      id: "D19",
      title: "Everything Is a Contest",
      instruction: "Turn every difference or disagreement into a competition you intend to win.",
      category: "Repeatable Behaviors"
    },
    {
      id: "D20",
      title: "Brighter Side",
      instruction: "Meet every setback with even greater optimism.",
      category: "Repeatable Behaviors"
    },
    {
      id: "D21",
      title: "Supportive Rage",
      instruction: "Remain helpful and encouraging while becoming increasingly furious.",
      category: "Repeatable Behaviors"
    },
    {
      id: "D22",
      title: "Terms and Conditions",
      instruction: "Treat every offer, favor, feeling, and apology as a negotiation.",
      category: "Repeatable Behaviors"
    },
    {
      id: "D23",
      title: "Yes, but My Way",
      instruction: "Agree with others, then reinterpret the agreement entirely in your favor.",
      category: "Repeatable Behaviors"
    },
    {
      id: "D24",
      title: "The Pattern",
      instruction: "Treat every minor detail as evidence of a much larger problem.",
      category: "Repeatable Behaviors"
    }
  ];

  const categoryStyles = Object.freeze({
    "Status & Authority": Object.freeze({
      id: "status-authority",
      label: "Status & Authority",
      icon: "crown"
    }),
    "History & Relationship": Object.freeze({
      id: "history-relationship",
      label: "History & Relationship",
      icon: "link"
    }),
    "Emotional Assumptions": Object.freeze({
      id: "emotional-assumptions",
      label: "Emotional Assumptions",
      icon: "heart"
    }),
    "Worldview & Absurdity": Object.freeze({
      id: "worldview-absurdity",
      label: "Worldview & Absurdity",
      icon: "sparkles"
    }),
    "Direct Objectives": Object.freeze({
      id: "direct-objectives",
      label: "Direct Objectives",
      icon: "target"
    }),
    "Secrets & Avoidance": Object.freeze({
      id: "secrets-avoidance",
      label: "Secrets & Avoidance",
      icon: "lock"
    }),
    "Repeatable Behaviors": Object.freeze({
      id: "repeatable-behaviors",
      label: "Repeatable Behaviors",
      icon: "repeat"
    })
  });

  const defaultCategoryStyle = Object.freeze({
    id: "general",
    label: "General Prompt",
    icon: "sparkles"
  });

  return Object.freeze({
    stances: Object.freeze(stances.map(Object.freeze)),
    drives: Object.freeze(drives.map(Object.freeze)),
    categoryStyles,
    defaultCategoryStyle
  });
});
