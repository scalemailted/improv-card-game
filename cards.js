(function (root, factory) {
  const cards = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = cards;
  } else {
    root.TWO_SECRETS_CARDS = cards;
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const stances = [
    {
      id: "S01",
      title: "Top of the Ladder",
      instruction: "You believe you clearly outrank them.",
      category: "Status & authority"
    },
    {
      id: "S02",
      title: "Borrowed Authority",
      instruction: "You have official authority, but you need their cooperation more than they need yours.",
      category: "Status & authority"
    },
    {
      id: "S03",
      title: "The Only Professional",
      instruction: "You are the only qualified person here, and no one is treating you like it.",
      category: "Status & authority"
    },
    {
      id: "S04",
      title: "Act Like You Belong",
      instruction: "You are new here and pretending everything is familiar.",
      category: "Status & authority"
    },
    {
      id: "S05",
      title: "The Protégé Problem",
      instruction: "You see them as your talented but disappointing protégé.",
      category: "Status & authority"
    },
    {
      id: "S06",
      title: "Hidden Power",
      instruction: "You suspect they hold the real power and are pretending otherwise.",
      category: "Status & authority"
    },
    {
      id: "S07",
      title: "Before They Were Impressive",
      instruction: "You knew them before anyone took them seriously.",
      category: "History & relationship"
    },
    {
      id: "S08",
      title: "You Owe Me",
      instruction: "You believe their success would not exist without you.",
      category: "History & relationship"
    },
    {
      id: "S09",
      title: "The Responsible One",
      instruction: "You have always been the responsible one in this relationship.",
      category: "History & relationship"
    },
    {
      id: "S10",
      title: "Old Rivals",
      instruction: "You regard them as your oldest rival, whether or not they agree.",
      category: "History & relationship"
    },
    {
      id: "S11",
      title: "Only You",
      instruction: "They are the only person here you trust, and you resent needing them.",
      category: "History & relationship"
    },
    {
      id: "S12",
      title: "After What Happened",
      instruction: "You are certain they are still angry about an incident neither of you wants to name.",
      category: "History & relationship"
    },
    {
      id: "S13",
      title: "Envious Admiration",
      instruction: "You admire them deeply and resent how inferior that makes you feel.",
      category: "Emotional assumption"
    },
    {
      id: "S14",
      title: "The Old You",
      instruction: "You believe they preferred the person you used to be.",
      category: "Emotional assumption"
    },
    {
      id: "S15",
      title: "Replacement Fear",
      instruction: "You are convinced they are preparing to replace or abandon you.",
      category: "Emotional assumption"
    },
    {
      id: "S16",
      title: "For Their Own Good",
      instruction: "You think they need protection from their own judgment.",
      category: "Emotional assumption"
    },
    {
      id: "S17",
      title: "Their Opinion Matters",
      instruction: "Their approval means far more to you than you will admit.",
      category: "Emotional assumption"
    },
    {
      id: "S18",
      title: "Fishing for Praise",
      instruction: "You are sure they want a compliment, and you refuse to make it easy.",
      category: "Emotional assumption"
    },
    {
      id: "S19",
      title: "Sacred Procedure",
      instruction: "You treat this ordinary situation as a solemn ritual.",
      category: "Worldview & absurdity"
    },
    {
      id: "S20",
      title: "Red Alert",
      instruction: "You believe this is a crisis, although no one else seems concerned.",
      category: "Worldview & absurdity"
    },
    {
      id: "S21",
      title: "Cause for Celebration",
      instruction: "You interpret everything happening as excellent news.",
      category: "Worldview & absurdity"
    },
    {
      id: "S22",
      title: "Practical Realist",
      instruction: "Accept their strangest claims as true, but focus on the logistical consequences.",
      category: "Worldview & absurdity"
    },
    {
      id: "S23",
      title: "The Important Thing",
      instruction: "One ordinary object, phrase, or rule in the scene seems vitally important to you.",
      category: "Worldview & absurdity"
    },
    {
      id: "S24",
      title: "The Grand Design",
      instruction: "You believe both of you are part of a much larger plan; they simply have not realized it yet.",
      category: "Worldview & absurdity"
    }
  ];

  const drives = [
    {
      id: "D01",
      title: "Admit You Need Me",
      instruction: "Make them admit that they need your help.",
      category: "Direct objective"
    },
    {
      id: "D02",
      title: "Don’t Go",
      instruction: "Keep them from leaving without directly asking them to stay.",
      category: "Direct objective"
    },
    {
      id: "D03",
      title: "Say You’re Sorry",
      instruction: "Get an apology without naming the offense.",
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
      instruction: "Get them to volunteer for the task you do not want.",
      category: "Direct objective"
    },
    {
      id: "D06",
      title: "How Much Do You Know?",
      instruction: "Find out what they know without revealing what you are hiding.",
      category: "Direct objective"
    },
    {
      id: "D07",
      title: "Join Me",
      instruction: "Recruit them into a secret plan.",
      category: "Direct objective"
    },
    {
      id: "D08",
      title: "You First",
      instruction: "Get them to break a rule before you do.",
      category: "Direct objective"
    },
    {
      id: "D09",
      title: "Recognize Me",
      instruction: "Make them acknowledge your importance, expertise, or authority.",
      category: "Direct objective"
    },
    {
      id: "D10",
      title: "Choose Me",
      instruction: "Make them choose you over another person, plan, or obligation.",
      category: "Direct objective"
    },
    {
      id: "D11",
      title: "Prove Your Loyalty",
      instruction: "Test their loyalty without admitting that there is a test.",
      category: "Direct objective"
    },
    {
      id: "D12",
      title: "Give It Up",
      instruction: "Persuade them to surrender something they value.",
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
      instruction: "Keep the conversation away from the one thing they most want to discuss.",
      category: "Secret & avoidance"
    },
    {
      id: "D15",
      title: "Merciful Lie",
      instruction: "Protect them from a truth they are actively seeking.",
      category: "Secret & avoidance"
    },
    {
      id: "D16",
      title: "Confess First",
      instruction: "Get them to reveal something incriminating before you reveal anything yourself.",
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
      instruction: "Leave them convinced that you know exactly what you are doing.",
      category: "Secret & avoidance"
    },
    {
      id: "D19",
      title: "Everything Is a Contest",
      instruction: "Turn every disagreement into a competition you intend to win.",
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
      instruction: "Agree with them, then reinterpret the agreement entirely in your favor.",
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
    stances: Object.freeze(stances),
    drives: Object.freeze(drives)
  });
});
