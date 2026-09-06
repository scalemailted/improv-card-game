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
      category: "Status & self-image"
    },
    {
      id: "S02",
      title: "Borrowed Authority",
      instruction: "Project confident authority while quietly working to keep everyone cooperative. Your confidence depends on their cooperation.",
      category: "Status & self-image"
    },
    {
      id: "S03",
      title: "The Only Professional",
      instruction: "Behave as the only qualified person present. Correct mistakes with patient, increasingly strained professionalism.",
      category: "Status & self-image"
    },
    {
      id: "S04",
      title: "Act Like You Belong",
      instruction: "You do not understand what is happening. Copy the confidence around you and never admit confusion.",
      category: "Status & self-image"
    },
    {
      id: "S05",
      title: "The Protégé Problem",
      instruction: "Treat another player as someone you trained. Offer corrections, backhanded praise, and reminders of your influence.",
      category: "Status & self-image"
    },
    {
      id: "S06",
      title: "Hidden Power",
      instruction: "Act publicly modest while making choices as though you control the outcome.",
      category: "Status & self-image"
    },
    {
      id: "S07",
      title: "Before They Were Impressive",
      instruction: "Treat another player with old familiarity. Casually puncture formality, grandeur, or attempts to impress you.",
      category: "Relationship lens"
    },
    {
      id: "S08",
      title: "You Owe Me",
      instruction: "Behave as though another person's success is partly yours. Refer to favors, sacrifices, or guidance as if the debt is obvious.",
      category: "Relationship lens"
    },
    {
      id: "S09",
      title: "The Responsible One",
      instruction: "Take responsibility for everyone and everything. Fix problems before anyone asks, then resent having to do it.",
      category: "Relationship lens"
    },
    {
      id: "S10",
      title: "Old Rivals",
      instruction: "Choose another player as your measuring stick. Compare achievements, score small victories, and refuse to be outdone.",
      category: "Relationship lens"
    },
    {
      id: "S11",
      title: "Only You",
      instruction: "Choose one person as the only one you trust. Seek their help while hiding how much you depend on it.",
      category: "Relationship lens"
    },
    {
      id: "S12",
      title: "After What Happened",
      instruction: "Carry yourself as if an unnamed past incident still hangs over the interaction. Read ordinary remarks through that memory.",
      category: "Relationship lens"
    },
    {
      id: "S13",
      title: "Envious Admiration",
      instruction: "Be sincerely impressed by another player while trying not to appear lesser. Compliment, imitate, and compete at the same time.",
      category: "Emotional lens"
    },
    {
      id: "S14",
      title: "The Old You",
      instruction: "Perform the person you used to be, even when that identity no longer fits. Defend the old version of yourself whenever it is challenged.",
      category: "Emotional lens"
    },
    {
      id: "S15",
      title: "Replacement Fear",
      instruction: "Behave as if your place is insecure. Make yourself indispensable and treat small changes as threats.",
      category: "Emotional lens"
    },
    {
      id: "S16",
      title: "For Their Own Good",
      instruction: "Take charge of another person's choices because you trust your judgment more than theirs. Frame control as care.",
      category: "Emotional lens"
    },
    {
      id: "S17",
      title: "Their Opinion Matters",
      instruction: "Seek one person's approval while pretending their opinion is irrelevant. Adjust yourself whenever they respond.",
      category: "Emotional lens"
    },
    {
      id: "S18",
      title: "Fishing for Praise",
      instruction: "You desperately want praise but refuse to ask for it. Create opportunities for others to notice your greatness.",
      category: "Emotional lens"
    },
    {
      id: "S19",
      title: "Sacred Procedure",
      instruction: "Treat an ordinary activity as a solemn ritual. Protect every step, object, and tradition from casual interference.",
      category: "Worldview"
    },
    {
      id: "S20",
      title: "Red Alert",
      instruction: "Treat every development as urgent evidence of a crisis. Escalate precautions faster than the facts justify.",
      category: "Worldview"
    },
    {
      id: "S21",
      title: "Cause for Celebration",
      instruction: "Interpret every development as a reason to celebrate. Find victory in setbacks, warnings, and bad news.",
      category: "Worldview"
    },
    {
      id: "S22",
      title: "Practical Realist",
      instruction: "Accept any unusual premise without debate. Focus immediately on schedules, costs, safety, and what must happen next.",
      category: "Worldview"
    },
    {
      id: "S23",
      title: "The Important Thing",
      instruction: "Choose one ordinary object, phrase, or rule and treat it as vitally important. Keep bringing the scene back to it.",
      category: "Worldview"
    },
    {
      id: "S24",
      title: "The Grand Design",
      instruction: "Treat coincidences and interruptions as parts of a larger plan. Connect everything with absolute conviction.",
      category: "Worldview"
    }
  ];

  const drives = [
    {
      id: "D01",
      title: "Admit You Need Me",
      instruction: "Make someone admit that they need your help.",
      category: "Direct objective"
    },
    {
      id: "D02",
      title: "Don’t Go",
      instruction: "Create reasons another player must stay with you. Never directly ask them to stay.",
      category: "Direct objective"
    },
    {
      id: "D03",
      title: "Say You’re Sorry",
      instruction: "Maneuver someone into apologizing without naming the offense.",
      category: "Direct objective"
    },
    {
      id: "D04",
      title: "Retroactive Permission",
      instruction: "Get approval for something you have already done.",
      category: "Direct objective"
    },
    {
      id: "D05",
      title: "Make It Their Idea",
      instruction: "Make an unwanted task sound appealing enough that someone volunteers for it.",
      category: "Direct objective"
    },
    {
      id: "D06",
      title: "How Much Do You Know?",
      instruction: "Probe for what others know while revealing as little as possible.",
      category: "Direct objective"
    },
    {
      id: "D07",
      title: "Join Me",
      instruction: "Recruit someone into a secret plan.",
      category: "Direct objective"
    },
    {
      id: "D08",
      title: "You First",
      instruction: "Coax someone else into breaking a rule before you do.",
      category: "Direct objective"
    },
    {
      id: "D09",
      title: "Recognize Me",
      instruction: "Make someone acknowledge your importance, expertise, or authority.",
      category: "Direct objective"
    },
    {
      id: "D10",
      title: "Choose Me",
      instruction: "Make yourself the choice over another person, plan, or obligation.",
      category: "Direct objective"
    },
    {
      id: "D11",
      title: "Prove Your Loyalty",
      instruction: "Invent small tests of loyalty and judge every response without admitting there is a test.",
      category: "Direct objective"
    },
    {
      id: "D12",
      title: "Give It Up",
      instruction: "Persuade someone to surrender something they value.",
      category: "Direct objective"
    },
    {
      id: "D13",
      title: "Helpful Culprit",
      instruction: "Hide that the problem is your fault while enthusiastically helping investigate it.",
      category: "Secret & avoidance"
    },
    {
      id: "D14",
      title: "Not That Subject",
      instruction: "Choose one subject you cannot let the scene reach. Redirect whenever the conversation gets close.",
      category: "Secret & avoidance"
    },
    {
      id: "D15",
      title: "Merciful Lie",
      instruction: "Choose a truth your character believes would hurt someone. Keep it from them, even as honesty becomes harder.",
      category: "Secret & avoidance"
    },
    {
      id: "D16",
      title: "Confess First",
      instruction: "Get someone else to confess or incriminate themselves before you reveal anything.",
      category: "Secret & avoidance"
    },
    {
      id: "D17",
      title: "Sell the Disaster",
      instruction: "Make a terrible plan sound sensible, responsible, and inevitable.",
      category: "Secret & avoidance"
    },
    {
      id: "D18",
      title: "Fake the Expertise",
      instruction: "Perform expertise so confidently that no one questions you.",
      category: "Secret & avoidance"
    },
    {
      id: "D19",
      title: "Everything Is a Contest",
      instruction: "Turn every difference or disagreement into a competition you intend to win.",
      category: "Repeatable behavior"
    },
    {
      id: "D20",
      title: "Brighter Side",
      instruction: "Meet every setback with even greater optimism.",
      category: "Repeatable behavior"
    },
    {
      id: "D21",
      title: "Supportive Rage",
      instruction: "Remain helpful and encouraging while becoming increasingly furious.",
      category: "Repeatable behavior"
    },
    {
      id: "D22",
      title: "Terms and Conditions",
      instruction: "Treat every offer, favor, feeling, and apology as a negotiation.",
      category: "Repeatable behavior"
    },
    {
      id: "D23",
      title: "Yes, but My Way",
      instruction: "Agree with others, then reinterpret the agreement entirely in your favor.",
      category: "Repeatable behavior"
    },
    {
      id: "D24",
      title: "The Pattern",
      instruction: "Treat every minor detail as evidence of a much larger problem.",
      category: "Repeatable behavior"
    }
  ];

  return Object.freeze({
    stances: Object.freeze(stances.map(Object.freeze)),
    drives: Object.freeze(drives.map(Object.freeze))
  });
});
