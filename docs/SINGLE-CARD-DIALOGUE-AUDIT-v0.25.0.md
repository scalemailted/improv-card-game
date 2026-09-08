# Imprompt v0.25.0 — Single-card dialogue review

## Scope and evidence

All 960 previous single-card examples were considered alongside the exact 480 card instructions. Both alternatives for every card have been rewritten as five spoken turns. This is an internal, model-authored editorial pass, not an independent human blind read or live troupe validation. Humour and performance effectiveness remain judgement calls, not properties proven by the automated tests.

The per-card notes below identify the intended behavioural mechanism and the continuity requirement. Full before/after turns are stored in `editorial/v0.25.0/single-dialogue-ledger.json`. No playable card instruction or ID was changed.

## Writing standard

A1 establishes one playable situation through speech. B2 answers that offer, not a generic question. A3 makes the exact card visible. B4 responds to A3 and increases pressure. A5 develops the same pattern instead of introducing an unrelated gag. No stage-direction paragraph, narrator, abstract advice, or obligatory resolution. Wit should come from the character’s specific logic; it need not turn every ending into a punchline.

## Audit outcome

| Item | Result |
| --- | ---: |
| Cards examined | 480 |
| Single scenes rewritten | 960 |
| Spoken turns per scene | 5 |
| Median / maximum total words | 36 / 57 |
| Distinct openings | 960 |
| Separate stage-action blocks | 0 |
| Independent human/live reviews claimed | 0 |

The 50 bespoke pair scenes also received new five-turn dialogue. The remaining 115,150 pair scenes are compiled drafts. Their builder now preserves the complete Drive dialogue spine, including both B responses and the final A payoff, instead of grafting on an unrelated B objection and Stance closing. That is a continuity improvement, not proof of a meaningful fusion for every pair.

## Card-by-card findings and replacement dialogue

### D01 — Admit You Need Me

**Card:** Make someone admit that they need your help.

**Editorial finding / approach:** A engineers an explicit request for help instead of helping immediately; B's independence changes A's tactic.

**Example 1 · 36 words**

**A:** That flat-pack cupboard's leaning. I could take a look.  
**B:** I've got the instructions.  
**A:** Wonderful. Which page explains that leftover door?  
**B:** Could you hold it for a second?  
**A:** Certainly. Just to clarify: you're asking for my help?  

**Example 2 · 33 words**

**A:** I've put my jumper beside your broken heater.  
**B:** I'm not cold.  
**A:** Excellent. I'll put the spare blanket away too.  
**B:** Leave the blanket.  
**A:** Shall I leave myself? I know where the fuse box is.  

### D02 — Don’t Go

**Card:** Create reasons another player must stay with you. Never directly ask them to stay.

**Editorial finding / approach:** Each practical pretext keeps B in the interaction; A never directly asks B to stay.

**Example 1 · 34 words**

**A:** Before you get your train, could you taste this soup?  
**B:** It needs salt.  
**A:** I'll fix that. You'll need to check again.  
**B:** My train leaves in ten minutes.  
**A:** Perfect. That's when the bread comes out.  

**Example 2 · 39 words**

**A:** You've packed your suitcase upside down. Let me show you.  
**B:** A suitcase doesn't have an upside down.  
**A:** Then explain these shoes facing the handle.  
**B:** I need to leave.  
**A:** Of course. After we settle the shoes. It's a long journey.  

### D03 — Say You’re Sorry

**Card:** Maneuver someone into apologizing without naming the offense.

**Editorial finding / approach:** A seeks an apology through indirect cues without revealing the precise offense.

**Example 1 · 35 words**

**A:** I've bought a replacement mug. Not that anyone needs to say anything.  
**B:** Did I break your mug?  
**A:** Interesting that you started there.  
**B:** I'm sorry about the mug.  
**A:** Keep that tone. Think a little more recently.  

**Example 2 · 30 words**

**A:** Lovely day for clearing the air, isn't it?  
**B:** Are we opening a window?  
**A:** Some things require more than ventilation.  
**B:** Have I upset you?  
**A:** That's an excellent opening. I'd keep going.  

### D04 — Retroactive Permission

**Card:** Get approval for something you have already done.

**Editorial finding / approach:** A asks for approval before revealing that the decision is already irreversible.

**Example 1 · 32 words**

**A:** Would you support a small improvement to the front garden?  
**B:** What sort of improvement?  
**A:** Something with a pond. And no tree.  
**B:** Where's the tree?  
**A:** Let's finish agreeing before the stump grinder leaves.  

**Example 2 · 34 words**

**A:** How do you feel about me inviting a few people to dinner?  
**B:** Tonight? We have two chairs.  
**A:** So standing guests would be more considerate?  
**B:** How many people?  
**A:** Could you answer before they ring again?  

### D05 — Make It Their Idea

**Card:** Make an unwanted task sound appealing enough that someone volunteers for it.

**Editorial finding / approach:** A makes the unwanted task sound like B's own natural choice, rather than merely assigning it.

**Example 1 · 40 words**

**A:** You do such beautiful handwriting. Even your bin labels are elegant.  
**B:** Thank you.  
**A:** Imagine what you could do with these eighty place cards.  
**B:** Are you asking me to write them?  
**A:** I wouldn't presume. I'm leaving room for your artistic impulse.  

**Example 2 · 34 words**

**A:** You've always said this shed could be organised better.  
**B:** It could.  
**A:** I've cleared Saturday so I won't interrupt your vision.  
**B:** You want me to clean it?  
**A:** Only if that still feels like your idea.  

### D06 — How Much Do You Know?

**Card:** Probe for what others know while revealing as little as possible.

**Editorial finding / approach:** A probes the extent of B's information without volunteering the concealed fact.

**Example 1 · 34 words**

**A:** When you say you heard about the party, which part?  
**B:** The bit with the cake.  
**A:** Before or after it reached the balcony?  
**B:** What happened on the balcony?  
**A:** Nothing confirmed. Who's been using that word?  

**Example 2 · 28 words**

**A:** What did the manager say about the missing keys?  
**B:** That they're missing.  
**A:** No mention of a drain, then?  
**B:** Should there be?  
**A:** I'm checking how thorough the briefing was.  

### D07 — Join Me

**Card:** Recruit someone into a secret plan.

**Editorial finding / approach:** Recruitment proceeds through enticing partial disclosure; B can question or refuse.

**Example 1 · 38 words**

**A:** I need a lookout for a surprise dinner. Can you whistle?  
**B:** Who are we surprising?  
**A:** Mum. She mustn't find the cake in the shed.  
**B:** Why not use the kitchen?  
**A:** Because that's your second assignment. Distract her from it.  

**Example 2 · 42 words**

**A:** Come to the office at seven. Bring wrapping paper, not questions.  
**B:** Is this another secret leaving party?  
**A:** I need someone who can keep a straight face around balloons.  
**B:** Who is leaving?  
**A:** Join the committee and you'll get a balloon with the name.  

### D08 — You First

**Card:** Coax someone else into breaking a rule before you do.

**Editorial finding / approach:** A preserves plausible innocence while inviting B to test the rule first.

**Example 1 · 35 words**

**A:** That staff-only door might lead to the roof garden. Try it.  
**B:** Why don't you?  
**A:** Someone should stay here looking uninvolved.  
**B:** I'm not allowed through either.  
**A:** Then we'll learn the rule together, with you slightly ahead.  

**Example 2 · 33 words**

**A:** Taste a grape before buying them. Quality control.  
**B:** The sign says no tasting.  
**A:** Signs can't taste. You'll have better information.  
**B:** You taste one.  
**A:** I need to compare your reaction with the official policy.  

### D09 — Recognize Me

**Card:** Make someone acknowledge your importance, expertise, or authority.

**Editorial finding / approach:** A insists that a concrete contribution be acknowledged explicitly, not absorbed into a collective thank-you.

**Example 1 · 33 words**

**A:** Before you cut the ribbon, whose bridge is this?  
**B:** The whole town's.  
**A:** And who stopped it leaning into the river?  
**B:** You did. We thanked the engineers.  
**A:** Lovely. Could one engineer have a name?  

**Example 2 · 38 words**

**A:** You've thanked the wedding guests. What about the person who cooked?  
**B:** Everyone knows you made the food.  
**A:** Then why does the programme thank 'the buffet'?  
**B:** I'll make an announcement.  
**A:** Good. The buffet would like its surname pronounced correctly.  

### D10 — Choose Me

**Card:** Make yourself the choice over another person, plan, or obligation.

**Editorial finding / approach:** A makes a competing choice personal, offering escalating reasons to select A.

**Example 1 · 36 words**

**A:** Come to my birthday instead of the concert. I've made your favourite cake.  
**B:** I've already bought tickets.  
**A:** The cake has your name on it.  
**B:** I can visit tomorrow.  
**A:** Tomorrow it will have my name. Choose carefully.  

**Example 2 · 34 words**

**A:** Take me on the expedition. I can read maps.  
**B:** So can the guide.  
**A:** Can the guide remember your coffee order?  
**B:** We're crossing a desert.  
**A:** Exactly. You'll want someone who knows you take it iced.  

### D11 — Prove Your Loyalty

**Card:** Invent small tests of loyalty and judge every response without admitting there is a test.

**Editorial finding / approach:** An apparently casual choice becomes an unannounced loyalty test; A treats each answer as evidence.

**Example 1 · 37 words**

**A:** Which photo should go on the reunion poster? Mine or Sam's?  
**B:** Sam's is sharper.  
**A:** Useful to know what clarity means to you.  
**B:** You asked about the photo.  
**A:** Of course. Nothing to do with who helped you move.  

**Example 2 · 32 words**

**A:** Could you keep Friday free? No particular reason.  
**B:** I've promised to help Alex.  
**A:** Even if something important came up here?  
**B:** Has something come up?  
**A:** Not yet. I'm learning whether it would matter.  

### D12 — Give It Up

**Card:** Persuade someone to surrender something they value.

**Editorial finding / approach:** A pursues a valued possession or claim and distinguishes surrender from a reversible loan.

**Example 1 · 40 words**

**A:** Let me have the medal for the charity auction.  
**B:** It's the only thing I've ever won.  
**A:** Then it should raise more than the toaster.  
**B:** Could I lend it for the display?  
**A:** The bidder will need more than a temporary victory.  

**Example 2 · 30 words**

**A:** Give me the last word in this argument.  
**B:** Fine. You're right.  
**A:** Without that sigh.  
**B:** I didn't say anything else.  
**A:** Your sigh kept a spare last word. Hand that over too.  

### D13 — Helpful Culprit

**Card:** Hide that the problem is your fault while enthusiastically helping investigate it.

**Editorial finding / approach:** A's enthusiastic investigation diverts scrutiny from their own incriminating evidence.

**Example 1 · 43 words**

**A:** I've started investigating the broken vase. First, we check the window.  
**B:** Why have you got glue on your fingers?  
**A:** Excellent clue. I'll inspect the glue cupboard personally.  
**B:** A piece of vase is stuck to you.  
**A:** Good. Put me in charge of preserving it.  

**Example 2 · 33 words**

**A:** The office plant's dead. I'll interview everyone who watered it.  
**B:** You watered it with coffee.  
**A:** Then we must investigate the coffee machine.  
**B:** You made the coffee.  
**A:** Conveniently, I know exactly where to begin.  

### D14 — Not That Subject

**Card:** Choose one subject you cannot let the scene reach. Redirect whenever the conversation gets close.

**Editorial finding / approach:** A redirects through a concrete adjacent subject; B returns to the same protected topic.

**Example 1 · 43 words**

**A:** Before we discuss the dent in your car, I've found a lovely garage café.  
**B:** Did you hit a bollard?  
**A:** Their scones are enormous. Shall I book a table?  
**B:** Why does the booking need a mechanic?  
**A:** Excellent question. Let's inspect their staffing over tea.  

**Example 2 · 38 words**

**A:** Don't read that letter yet. Have you noticed the new curtains?  
**B:** The letter says the rent's overdue.  
**A:** Exactly. Think how much these curtains improve the room.  
**B:** How much did they cost?  
**A:** Look at that bird outside. Perfectly framed.  

### D15 — Merciful Lie

**Card:** Choose a truth your character believes would hurt someone. Keep it from them, even as honesty becomes harder.

**Editorial finding / approach:** A maintains a protective lie as specific facts make it harder, rather than concealing for personal advantage.

**Example 1 · 32 words**

**A:** The bakery loved your cake. They're just reorganising their menu.  
**B:** The letter says 'inedible.'  
**A:** They mean it deserves preservation, not eating.  
**B:** It says the same about the icing.  
**A:** A very consistent compliment.  

**Example 2 · 32 words**

**A:** Your poem hasn't been rejected. The magazine's full.  
**B:** It's an online magazine.  
**A:** Storage fills up too.  
**B:** They published a new poem this morning.  
**A:** A short one. Yours needs a much bigger internet.  

### D16 — Confess First

**Card:** Get someone else to confess or incriminate themselves before you reveal anything.

**Editorial finding / approach:** A trades disclosure for B's prior admission and delays their own commitment.

**Example 1 · 40 words**

**A:** Tell me what you did to the printer, then I'll explain the kitchen.  
**B:** I used the wrong paper.  
**A:** How wrong? I'm calibrating my honesty.  
**B:** Why is the kitchen smoking?  
**A:** We're still on your section. Did you apologise to the printer?  

**Example 2 · 34 words**

**A:** Let's confess our mistakes. You first.  
**B:** I forgot the booking.  
**A:** That's useful. How expensive a mistake do you consider that?  
**B:** What did you do?  
**A:** I'm waiting for your estimate before choosing my opening adjective.  

### D17 — Sell the Disaster

**Card:** Make a terrible plan sound sensible, responsible, and inevitable.

**Editorial finding / approach:** Each practical objection becomes a sales argument for the same obviously bad plan.

**Example 1 · 30 words**

**A:** Removing the roof will make this restaurant wonderfully airy.  
**B:** What happens when it rains?  
**A:** Free table washing.  
**B:** The customers will get wet.  
**A:** An immersive dining experience. We can charge more.  

**Example 2 · 30 words**

**A:** Let's hold the silent auction during the fireworks.  
**B:** Nobody will hear the bids.  
**A:** Exactly. Very silent.  
**B:** It's already a silent auction.  
**A:** Then we're the only ones delivering on the name.  

### D18 — Fake the Expertise

**Card:** Perform expertise so confidently that no one questions you.

**Editorial finding / approach:** A invents confident technical interpretations of concrete evidence they do not understand.

**Example 1 · 30 words**

**A:** The boiler's flashing because it's synchronising with the pipes.  
**B:** It's flashing 'help.'  
**A:** Advanced diagnostics. It recognises teamwork.  
**B:** Should I call an engineer?  
**A:** Certainly. Tell them I've reached the collaboration stage.  

**Example 2 · 32 words**

**A:** I'm tuning your violin by checking its structural optimism.  
**B:** You haven't touched a string.  
**A:** We don't rush the wood.  
**B:** You're holding it backwards.  
**A:** Testing its tolerance for alternative orientation. Promising so far.  

### D19 — Everything Is a Contest

**Card:** Turn every difference or disagreement into a competition you intend to win.

**Editorial finding / approach:** B's attempt at ordinary cooperation becomes the next measurable contest.

**Example 1 · 34 words**

**A:** We disagree about dinner. First to peel five potatoes chooses.  
**B:** Could we just order pizza?  
**A:** Whoever finds the best deal wins.  
**B:** I don't want to compete.  
**A:** Then make the most convincing case. I'll judge.  

**Example 2 · 27 words**

**A:** My tea is stronger than yours.  
**B:** We used the same teapot.  
**A:** Then I poured more decisively.  
**B:** It's just tea.  
**A:** Drink it faster and we can settle that.  

### D20 — Brighter Side

**Card:** Meet every setback with even greater optimism.

**Editorial finding / approach:** Optimism increases as setbacks accumulate, turning each newly lost option into an opportunity.

**Example 1 · 25 words**

**A:** The car won't start. Excellent chance for a walk.  
**B:** It's raining.  
**A:** And a free shower!  
**B:** My shoe's leaking.  
**A:** Brilliant. The shower's finally reached your feet.  

**Example 2 · 30 words**

**A:** Our show sold no tickets. We can rehearse uninterrupted.  
**B:** The theatre's cancelled us.  
**A:** No pressure from venue management!  
**B:** We've lost the deposit.  
**A:** Wonderful. Nothing left tying us to the past.  

### D21 — Supportive Rage

**Card:** Remain helpful and encouraging while becoming increasingly furious.

**Editorial finding / approach:** Helpful language remains intact while practical generosity becomes increasingly furious.

**Example 1 · 41 words**

**A:** You've spilled paint on my sofa. Lovely. I'll fetch a cloth.  
**B:** It's on the carpet too.  
**A:** Wonderful coverage. You must be thrilled.  
**B:** Could you get the blue paint out?  
**A:** Absolutely. I'll start with the part that used to be my afternoon.  

**Example 2 · 39 words**

**A:** Take your time choosing lunch. I'm delighted to drive.  
**B:** I might look at another menu.  
**A:** Of course. The parking meter loves exploring too.  
**B:** Could we go somewhere else?  
**A:** Certainly. I'll tell the meter it was only a relationship trial.  

### D22 — Terms and Conditions

**Card:** Treat every offer, favor, feeling, and apology as a negotiation.

**Editorial finding / approach:** A negotiates ordinary kindness and even the terms of acceptance as exchanges.

**Example 1 · 38 words**

**A:** I'll lend you the ladder for two lifts to the station.  
**B:** I only need it for five minutes.  
**A:** One lift and you praise my garden publicly.  
**B:** Can I just pay you?  
**A:** Now we're negotiating the value of friendship.  

**Example 2 · 32 words**

**A:** I accept your apology, subject to the following terms.  
**B:** Can't I just be sorry?  
**A:** For how long? I need a warranty.  
**B:** I mean it sincerely.  
**A:** Good. Put 'sincere' beside the refund clause.  

### D23 — Yes, but My Way

**Card:** Agree with others, then reinterpret the agreement entirely in your favor.

**Editorial finding / approach:** A verbally agrees, then narrows the agreement to suit their own convenience.

**Example 1 · 34 words**

**A:** Yes, I'll help you move. I've brought moral support.  
**B:** I need someone to carry the sofa.  
**A:** And I'll encourage that person enthusiastically.  
**B:** You promised to bring muscle.  
**A:** My jaw's a muscle. You're doing wonderfully.  

**Example 2 · 38 words**

**A:** Absolutely, I'll look after your dog for the weekend.  
**B:** Why is the dog here at my office?  
**A:** I'm looking after him from behind. Excellent visibility.  
**B:** I meant at your house.  
**A:** Then you should have specified a viewing location.  

### D24 — The Pattern

**Card:** Treat every minor detail as evidence of a much larger problem.

**Editorial finding / approach:** Minor recurring evidence expands a specific theory of a larger problem, distinct from mere random worry.

**Example 1 · 34 words**

**A:** Two office biscuits are missing. We've got an organised operation.  
**B:** I ate them.  
**A:** A confession this quick suggests training.  
**B:** I was hungry.  
**A:** Then they're recruiting through hunger. This goes higher than the biscuit tin.  

**Example 2 · 32 words**

**A:** The lift's slow and my email's late. Everything's being delayed deliberately.  
**B:** The email's still in your drafts.  
**A:** They've reached the sending stage.  
**B:** You haven't pressed send.  
**A:** Exactly. The system has recruited me.  

### D25 — Could You Just…

**Card:** Turn a difficult task into tiny favors until the help quietly becomes most of the task.

**Editorial finding / approach:** One tiny favor expands into the whole task, with each new request growing directly from the previous one.

**Example 1 · 32 words**

**A:** Could you hold this shelf while I find the screws?  
**B:** I've got it.  
**A:** Lovely. Could you put those screws in?  
**B:** There. Anything else?  
**A:** Just the books. And the matching shelf beside it.  

**Example 2 · 27 words**

**A:** Could you address this one envelope? Your writing's neater.  
**B:** Done.  
**A:** Perfect. The other fifty follow exactly that pattern.  
**B:** You said one.  
**A:** One demonstration. You're fully trained now.  

### D26 — One Last Thing

**Card:** Keep someone present by discovering one more small task, question, or favor whenever departure seems near.

**Editorial finding / approach:** A discovers a new concrete reason to delay departure only after B resolves the previous reason.

**Example 1 · 29 words**

**A:** Before you go, could you check this window latch?  
**B:** It's shut. Goodbye.  
**A:** Then why's the curtain moving?  
**B:** The fan's on.  
**A:** Could you show me which switch? There are several.  

**Example 2 · 33 words**

**A:** Just one last cup to dry before your taxi arrives.  
**B:** Done. My taxi's here.  
**A:** Could you reach the shelf for it?  
**B:** It's on the shelf.  
**A:** Lovely. Now you've made room for the saucer.  

### D27 — You Could at Least…

**Card:** Make the inconvenience visible enough that an apology becomes the easiest way forward.

**Editorial finding / approach:** A displays the actual cost of B's inconvenience until an apology becomes the practical response.

**Example 1 · 33 words**

**A:** I've put my wet sock beside your dinner. From your puddle.  
**B:** It's only water.  
**A:** Then you won't mind it sharing the table.  
**B:** Could you move it?  
**A:** An apology would dry the atmosphere considerably.  

**Example 2 · 34 words**

**A:** Three buses missed while I waited for your keys.  
**B:** You got home eventually.  
**A:** Yes. In time to watch my dinner become a brick.  
**B:** I'll heat it up.  
**A:** Start with 'sorry.' It softens the edges.  

### D28 — Just Say Yes

**Card:** Get a quick approval before anyone has time to examine the practical consequences.

**Editorial finding / approach:** A accelerates a yes before the costly particulars are considered, using the act of reading as a supposed risk.

**Example 1 · 34 words**

**A:** Quick yes to the garden party before the booking expires?  
**B:** How many guests?  
**A:** That's a lovely follow-up question for after yes.  
**B:** And the cost?  
**A:** The hesitation is free, but we're running out of it.  

**Example 2 · 31 words**

**A:** Just nod and I'll accept the sofa delivery.  
**B:** Will it fit through the door?  
**A:** We can measure after securing the bargain.  
**B:** It's already outside.  
**A:** Then nod before they start measuring too.  

### D29 — Your Turn

**Card:** Get someone to accept responsibility for a task you believe should never have been yours.

**Editorial finding / approach:** A transfers the responsibility back to its agreed owner, refusing to let competence become permanent duty.

**Example 1 · 27 words**

**A:** Your name's beside bathroom duty. Here's the mop.  
**B:** You're better at it.  
**A:** Then this is your training opportunity.  
**B:** Could you show me?  
**A:** Certainly. First, accept the mop.  

**Example 2 · 34 words**

**A:** I've done the bins for four weeks. Tonight is yours.  
**B:** I did them last month.  
**A:** Excellent. No induction required.  
**B:** Where do they go?  
**A:** To the same place your name's been going on the rota.  

### D30 — What Was the Plan?

**Card:** Find out what was promised, scheduled, or changed without revealing that you lost track.

**Editorial finding / approach:** A reconstructs forgotten plans through questions framed as verification, never admitting the lost track.

**Example 1 · 35 words**

**A:** What time did we finally choose for dinner? I'm checking the message.  
**B:** Seven. Did you forget?  
**A:** No, I'm checking that you didn't.  
**B:** Which restaurant?  
**A:** Good question. Let's see whether our memories agree on that too.  

**Example 2 · 31 words**

**A:** Which of these two routes was the final plan?  
**B:** You drew both.  
**A:** Exactly. Which version did I sound happiest about?  
**B:** Have you lost the itinerary?  
**A:** No. I'm reconstructing its emotional logic.  

### D31 — Back Me Up

**Card:** Recruit someone to support your version of how an ordinary responsibility should be handled.

**Editorial finding / approach:** A recruits support for a disputed everyday arrangement and negotiates the wording of that support.

**Example 1 · 41 words**

**A:** At the house meeting, back me up about the bins being Alex's turn.  
**B:** I thought it was yours.  
**A:** Only on the old rota. Remember the new conversation?  
**B:** There was a new conversation?  
**A:** We're having it now. Try to remember it confidently.  

**Example 2 · 36 words**

**A:** Tell the manager we agreed I'd cover the morning, not the evening.  
**B:** I wasn't in that meeting.  
**A:** Then you have no conflicting memory.  
**B:** I'm not lying for you.  
**A:** Could you look thoughtfully unsurprised while I explain?  

### D32 — Try It First

**Card:** Get someone else to test the shortcut, substitute, or questionable fix before you rely on it.

**Editorial finding / approach:** A coaxes B into testing an uncertain shortcut while remaining ready to learn from the result.

**Example 1 · 34 words**

**A:** Try the repaired tap. I've tightened something important.  
**B:** What if it sprays?  
**A:** Then point it toward the tiles. They're already wet.  
**B:** You turn it on.  
**A:** I need to watch the important thing from here.  

**Example 2 · 32 words**

**A:** Taste this cheap coffee substitute before I fill my cup.  
**B:** What's in it?  
**A:** The label calls it a blend.  
**B:** You haven't tried it?  
**A:** That's why your independent assessment will be so valuable.  

### D33 — Count What I Did

**Card:** Make someone acknowledge the practical work, time, or inconvenience you contributed.

**Editorial finding / approach:** A insists that effort be recognized in its concrete units rather than dismissed as a minor favor.

**Example 1 · 32 words**

**A:** Count those shopping bags before saying I only popped out.  
**B:** Thanks for getting them.  
**A:** Up six flights. Twice.  
**B:** Thanks for the stairs too.  
**A:** And the rain. Include the weather in the minutes.  

**Example 2 · 29 words**

**A:** I spent my Saturday fixing your fence.  
**B:** It's only three panels.  
**A:** Three panels, eighteen screws, two shops and one blister.  
**B:** I appreciate it.  
**A:** Could you appreciate Saturday by name?  

### D34 — Pick a Priority

**Card:** Make someone choose between two ordinary obligations that both supposedly cannot wait.

**Editorial finding / approach:** Two incompatible obligations force B to choose what will be sacrificed; A refuses a vague demand for both.

**Example 1 · 34 words**

**A:** The dinner's burning and your train leaves in five minutes. Choose.  
**B:** Can't we eat quickly?  
**A:** The chicken has not agreed to that timetable.  
**B:** Then save the dinner.  
**A:** Good. Tell the train we chose chicken.  

**Example 2 · 36 words**

**A:** Your parcel needs collecting while your mother needs picking up.  
**B:** Both are urgent.  
**A:** I have one car and no trailer for either.  
**B:** Could you do the parcel first?  
**A:** Certainly. You tell your mother she's second-class post.  

### D35 — Move It for Me

**Card:** Get someone to rearrange an ordinary commitment as proof that your relationship takes priority.

**Editorial finding / approach:** A asks for a small rescheduling as evidence of personal priority, not simply availability.

**Example 1 · 36 words**

**A:** Move your haircut so we can have lunch.  
**B:** I've booked it for weeks.  
**A:** And you've known me for years. Useful comparison.  
**B:** Let's have lunch afterward.  
**A:** I want one thing moved for me, not space around it.  

**Example 2 · 36 words**

**A:** Could you skip your usual quiz night and come to my opening?  
**B:** The team needs me.  
**A:** I'd like to find out what needing you achieves.  
**B:** I can leave the quiz early.  
**A:** Good. Let them notice why.  

### D36 — Hand It Over

**Card:** Persuade someone to give up control of a task, object, or decision you believe is being mishandled.

**Editorial finding / approach:** A seeks control of a task by offering a concrete handover while B keeps defending ownership.

**Example 1 · 38 words**

**A:** Give me the cupboard hinge before the door lands on us.  
**B:** I've nearly fixed it.  
**A:** Then hand over nearly. I'll finish the rest.  
**B:** I don't want you taking over.  
**A:** Call it delegating gravity. Let go of the screwdriver.  

**Example 2 · 39 words**

**A:** Let me handle the seating plan. You've put the exes together.  
**B:** They're civil now.  
**A:** Then they can be civil from separate tables.  
**B:** I've spent hours on it.  
**A:** Give me the pencil. I'll preserve the hours and move the chairs.  

### D37 — Put It Back Quietly

**Card:** Return something you misplaced, used, or damaged without revealing why it needed restoring.

**Editorial finding / approach:** A restores an object inconspicuously while new evidence threatens to reveal the original misuse.

**Example 1 · 35 words**

**A:** Your umbrella's back in its usual place. Very ordinary sight.  
**B:** Why is it wet? It hasn't rained.  
**A:** It's been experiencing the weather privately.  
**B:** There's pondweed on it.  
**A:** I'll put it nearer the door. Better ventilation.  

**Example 2 · 35 words**

**A:** I've put the plate back. Lovely new flower pattern, isn't it?  
**B:** Our plates were plain.  
**A:** Were they? This cupboard really changes the light.  
**B:** There's a price sticker underneath.  
**A:** How reassuring. We can finally insure it.  

### D38 — Talk Around the Mess

**Card:** Keep attention on minor details so no one addresses the larger responsibility you avoided.

**Editorial finding / approach:** A directs attention to minor presentable details so a major unfinished responsibility stays unaddressed.

**Example 1 · 34 words**

**A:** I've polished one spoon beautifully. Admire that shine.  
**B:** The rest of the kitchen's filthy.  
**A:** Exactly why this spoon deserves encouragement.  
**B:** You promised to clean everything.  
**A:** Let's not overwhelm the spoon on its first success.  

**Example 2 · 27 words**

**A:** Which label colour suits these boxes?  
**B:** You haven't packed them.  
**A:** Good labels prevent moving-day confusion.  
**B:** The van's outside.  
**A:** Then we'd better choose a colour the driver likes.  

### D39 — Spare Them the Hassle

**Card:** Hide a practical problem because you believe handling it alone is kinder than involving anyone else.

**Editorial finding / approach:** A hides an inconvenient problem to spare B worry and quietly increases their own burden.

**Example 1 · 38 words**

**A:** Enjoy your lunch. The bucket in the kitchen's just my project.  
**B:** Water's coming through the ceiling.  
**A:** I've promoted the project to two buckets.  
**B:** Should I call someone?  
**A:** I've called. Finish your sandwich before the third bucket needs introducing.  

**Example 2 · 37 words**

**A:** Don't worry about the repair bill. I've sorted it.  
**B:** Why is my bike on the invoice?  
**A:** A minor detail of the sorting.  
**B:** How much was it?  
**A:** Less than the amount of your afternoon I'd lose explaining it.  

### D40 — Who Changed It?

**Card:** Ask innocent questions until someone admits altering the plan, schedule, arrangement, or shared space.

**Editorial finding / approach:** Innocent detail questions narrow responsibility for a changed shared plan until a voluntary admission becomes likely.

**Example 1 · 38 words**

**A:** Interesting. The picnic moved from Saturday to Friday. Whose blue pen is that?  
**B:** Mine, but everyone uses it.  
**A:** And whose handwriting adds hearts to Fridays?  
**B:** All right, I changed it.  
**A:** Lovely. Now, who should tell the Saturday guests?  

**Example 2 · 33 words**

**A:** The sofa's blocking the cupboard. Did it migrate overnight?  
**B:** I needed room for yoga.  
**A:** So it had a guide.  
**B:** Yes, I moved it.  
**A:** Excellent. Can its guide explain the cupboard's new opening hours?  

### D41 — Basically Finished

**Card:** Describe incomplete, late, or improvised work as a thoughtful version of completion.

**Editorial finding / approach:** Incomplete work is described as an intentional finished product; practical testing exposes what remains absent.

**Example 1 · 29 words**

**A:** Your cupboard is finished. I've chosen a handle-free design.  
**B:** How do I open it?  
**A:** By appreciating the uninterrupted surface first.  
**B:** It won't open.  
**A:** Then the storage is exceptionally secure.  

**Example 2 · 30 words**

**A:** The report's complete apart from the numbers.  
**B:** The numbers are the report.  
**A:** Then I've finished its supporting structure.  
**B:** There's just a title page.  
**A:** A clear vision. Most reports lack one.  

### D42 — I’ve Done This Before

**Card:** Perform calm familiarity with the task while learning how it works from every new clue.

**Editorial finding / approach:** A learns from B's practical corrections while pretending to recall each step from experience.

**Example 1 · 33 words**

**A:** I've used this coffee machine plenty. You press here, naturally.  
**B:** That's the steam button.  
**A:** Yes, warming up before the main operation.  
**B:** Put a cup underneath.  
**A:** Exactly. I was checking you remembered the sequence.  

**Example 2 · 30 words**

**A:** This tent's familiar. The long pole goes across the top.  
**B:** That's the groundsheet rod.  
**A:** Of course. Testing the components.  
**B:** You've never pitched this model.  
**A:** Not with such an observant assistant.  

### D43 — Outdo the Effort

**Card:** Answer every favor, chore, or sacrifice with a bigger one that restores your lead.

**Editorial finding / approach:** A exceeds the actual favor just offered, turning generosity into competitive escalation.

**Example 1 · 36 words**

**A:** You brought dinner? I'll wash every dish in your house.  
**B:** I only made soup.  
**A:** Then I'll polish the soup spoons too.  
**B:** Please just eat.  
**A:** After I repaint the dining room. It needs to match your kindness.  

**Example 2 · 37 words**

**A:** Thanks for driving me. I'll cover your whole weekend shift.  
**B:** It was a ten-minute lift.  
**A:** Then I'll do next weekend too. Such efficient generosity deserves scale.  
**B:** That's far too much.  
**A:** Good. We're finally ahead of the lift.  

### D44 — Efficiency Win

**Card:** Celebrate each inconvenience as proof that a faster, cheaper, or smarter routine can now be invented.

**Editorial finding / approach:** A derives a concrete efficiency scheme from each inconvenience rather than celebrating without a plan.

**Example 1 · 36 words**

**A:** The lift's broken. We can cancel the gym and use the stairs.  
**B:** We live eight floors up.  
**A:** A full programme included in the rent.  
**B:** How do we carry the shopping?  
**A:** Resistance training. We've saved two memberships.  

**Example 2 · 28 words**

**A:** The dishwasher broke. Let's all eat from one pan.  
**B:** We have guests.  
**A:** Perfect. Fewer introductions between courses.  
**B:** They'll want plates.  
**A:** Then we'll serve sandwiches. This system keeps improving.  

### D45 — No Trouble at All

**Card:** Remain gracious and accommodating while making your growing inconvenience impossible to miss.

**Editorial finding / approach:** A accommodates each extra burden while ensuring the cost remains impossible to overlook.

**Example 1 · 37 words**

**A:** Another guest? Lovely. I'll divide my dinner into an extra portion.  
**B:** Are you sure there's enough?  
**A:** For everyone arriving, certainly.  
**B:** I can bring food.  
**A:** No trouble. I've always wanted to know what hosting tastes like without eating.  

**Example 2 · 33 words**

**A:** I'll carry your bag. This shoulder's had a full life.  
**B:** I can take it.  
**A:** Not now it's learned the weight of your hobbies.  
**B:** It's only books.  
**A:** Wonderful. My spine's becoming extremely well read.  

### D46 — Fair Exchange

**Card:** Price every favor in time, effort, inconvenience, or future obligation.

**Editorial finding / approach:** The price of a favor is recalculated in concrete time and effort when B challenges the exchange.

**Example 1 · 32 words**

**A:** I'll wash up if you do two shopping trips.  
**B:** Two trips for one pan?  
**A:** This pan has dried cheese. Rates have changed.  
**B:** I'll soak it first.  
**A:** Then one trip and the detergent.  

**Example 2 · 35 words**

**A:** Thirty minutes helping you move buys me Saturday morning.  
**B:** Saturday's my only free morning.  
**A:** Then you'll understand the value of my thirty minutes.  
**B:** Can I pay cash?  
**A:** Enough to buy back a Saturday. Let's calculate.  

### D47 — Technically, Yes

**Card:** Comply with every agreement in the narrowest possible way while insisting you honored it completely.

**Editorial finding / approach:** A fulfills the literal minimum of an agreement and treats B's broader expectation as a new request.

**Example 1 · 35 words**

**A:** I've moved a box, as requested. Lovely working with you.  
**B:** There are nineteen more.  
**A:** And you now have experience requesting one.  
**B:** I meant all of them.  
**A:** Good clarification. We'll price that as a new project.  

**Example 2 · 27 words**

**A:** I watered the plant you pointed at.  
**B:** The others are wilting.  
**A:** You pointed very specifically.  
**B:** I meant the plants generally.  
**A:** Then next time use a wider finger.  

### D48 — One Thing Leads to Another

**Card:** Use each small problem to justify solving a broader, more disruptive problem.

**Editorial finding / approach:** A turns a small repair into a progressively larger intervention through a consistent chain of supposed dependencies.

**Example 1 · 35 words**

**A:** To fix this tap, we should replace the sink.  
**B:** It only needs a washer.  
**A:** A new washer deserves reliable surroundings.  
**B:** The sink's fine.  
**A:** Then we need to ask why the kitchen makes it look tired.  

**Example 2 · 32 words**

**A:** This chair leg's loose. We should inspect all the chairs.  
**B:** Only that one wobbles.  
**A:** They share a manufacturer.  
**B:** The others passed your test.  
**A:** Then the table must be teaching it bad habits.  

### D49 — Make Them Your Deputy

**Card:** Get someone’s help by defining it as service under your direction.

**Editorial finding / approach:** A secures help by inventing a subordinate role and preserves the hierarchy when B proposes equality.

**Example 1 · 33 words**

**A:** I need help running the raffle. I've made you a deputy badge.  
**B:** Why not co-organiser?  
**A:** Because I need help, not a second direction.  
**B:** What does the deputy do?  
**A:** Everything I can confidently delegate.  

**Example 2 · 32 words**

**A:** Come organise the picnic as my second-in-command.  
**B:** We could share the work equally.  
**A:** Certainly. You execute half; I direct all of it.  
**B:** That isn't equal.  
**A:** Your first assignment is improving the wording.  

### D50 — Not Dismissed

**Card:** Keep someone present by treating departure as a privilege only you can grant.

**Editorial finding / approach:** A treats a normal departure as a release they personally grant, continually redefining when that release applies.

**Example 1 · 34 words**

**A:** Your shift ends at five. Your dismissal is still pending.  
**B:** It's five fifteen.  
**A:** Good. You've demonstrated punctual attendance at the dismissal review.  
**B:** I'm going home.  
**A:** Then we'll need to approve your change of location.  

**Example 2 · 30 words**

**A:** You may collect your coat once I've finished with you.  
**B:** We were only having coffee.  
**A:** And we're now concluding it formally.  
**B:** The café's closing.  
**A:** Then I'll dismiss the café first.  

### D51 — Acknowledge the Disrespect

**Card:** Make someone apologize for the disrespect to your position, not merely for what happened.

**Editorial finding / approach:** A redirects apology away from the practical incident toward the affront to A's rank.

**Example 1 · 35 words**

**A:** Your apology should mention interrupting the chair, not just spilling the tea.  
**B:** I'm sorry about your trousers.  
**A:** The trousers hold no office.  
**B:** I'm sorry I interrupted you.  
**A:** 'Chair.' Let's repair the title while we're here.  

**Example 2 · 35 words**

**A:** You called my plan silly in front of the trainees.  
**B:** I'm sorry it didn't work.  
**A:** The plan failed privately. You disrespected me publicly.  
**B:** Would you like an email?  
**A:** With my position in the subject line.  

### D52 — Secure the Endorsement

**Card:** Get a visible endorsement that makes your decision or position harder to challenge.

**Editorial finding / approach:** A seeks support in a public durable form that will survive later disagreement.

**Example 1 · 34 words**

**A:** Would you endorse the new rota into this microphone?  
**B:** I already said it was fine.  
**A:** Quietly. Quietly can't protect me at the staff meeting.  
**B:** Can I email you?  
**A:** Copy everyone who might blame me.  

**Example 2 · 40 words**

**A:** Sign here to say you support the extension.  
**B:** I like it, but I'd rather not put my name down.  
**A:** Then your support has no address when objections arrive.  
**B:** Could I use initials?  
**A:** Only if we print the key beside them.  

### D53 — Delegate Downward

**Card:** Make someone accept an unwanted responsibility by placing them lower in the hierarchy.

**Editorial finding / approach:** An unwanted task is assigned as proof of junior rank, and every objection is reframed as a developmental duty.

**Example 1 · 35 words**

**A:** As junior coordinator, you get the blocked sink.  
**B:** I coordinated the whole event yesterday.  
**A:** And today we develop your drainage leadership.  
**B:** You just don't want to do it.  
**A:** Senior staff must remain available to delegate.  

**Example 2 · 32 words**

**A:** The inspection notes go down the chain to you.  
**B:** They're all the complaints.  
**A:** Then you'll gain a broad understanding of operations.  
**B:** Why do you keep the compliments?  
**A:** They require a senior signature.  

### D54 — Find the Real Authority

**Card:** Probe until you know who can approve, block, or reverse the outcome.

**Editorial finding / approach:** A follows authority past titles to the person who can actually stop or reverse the decision.

**Example 1 · 31 words**

**A:** Everybody's approved the trip. Who can still cancel it?  
**B:** The committee signed unanimously.  
**A:** Whose phone call would make us tear that up?  
**B:** The treasurer controls the deposit.  
**A:** Good. Where's the treasurer?  

**Example 2 · 30 words**

**A:** Which signature actually releases this repair money?  
**B:** All three are important.  
**A:** Which one could undo the other two?  
**B:** Finance can freeze it.  
**A:** Then I'll take my broken pipe to finance.  

### D55 — Build a Coalition

**Card:** Recruit someone to your side so your position appears broader and more legitimate.

**Editorial finding / approach:** A builds visible support before agreement is settled, bargaining down from endorsement to appearance.

**Example 1 · 31 words**

**A:** Sit on my side for the shed vote. It'll show broad support.  
**B:** I'm undecided.  
**A:** Then sit broadly undecided beside me.  
**B:** That would look like agreement.  
**A:** Exactly. You understand the seating plan.  

**Example 2 · 30 words**

**A:** May I put your name on the petition?  
**B:** I haven't read it.  
**A:** Pencil, then. Provisional solidarity.  
**B:** What's it about?  
**A:** First let's get enough names for it to seem worth reading.  

### D56 — Challenge by Proxy

**Card:** Persuade someone else to challenge a rule or authority before you risk doing it yourself.

**Editorial finding / approach:** A recruits a proxy challenge and carefully negotiates how visible their own support will be.

**Example 1 · 35 words**

**A:** Ask the director why the overtime rule changed. I'll support you.  
**B:** Why don't you ask?  
**A:** Your fresh perspective won't carry my disciplinary history.  
**B:** Will you stand beside me?  
**A:** Just behind. Where supportive people remain employable.  

**Example 2 · 34 words**

**A:** You should question the queue-jumping policy at the club.  
**B:** You hate it too.  
**A:** Which gives me excellent notes for your speech.  
**B:** Put your name on it.  
**A:** I'll hold the notes. That's practically a signature.  

### D57 — Use the Proper Title

**Card:** Make someone acknowledge your standing through a title, privilege, courtesy, or public sign of respect.

**Editorial finding / approach:** A insists on a specific courtesy and escalates from a missed word to a visible status marker.

**Example 1 · 24 words**

**A:** Introduce me as Director Patel, please.  
**B:** Certainly, Pat.  
**A:** You've removed the working part.  
**B:** It's a barbecue.  
**A:** Then announce it over the sausages: Director Patel.  

**Example 2 · 30 words**

**A:** My place card should say Chairperson, not simply Jo.  
**B:** Everyone knows you.  
**A:** Then nobody will struggle with the extra word.  
**B:** There's no room on the card.  
**A:** Use the larger plate.  

### D58 — Declare Allegiance

**Card:** Make someone choose which person, side, or claim to authority they will support.

**Editorial finding / approach:** A turns partial agreement or neutrality into a demand to choose whose authority to support.

**Example 1 · 33 words**

**A:** Are you backing my proposal or Morgan's?  
**B:** I like parts of both.  
**A:** Whose name goes above your favourite parts?  
**B:** Why choose a side?  
**A:** Because the meeting only has two sides of the table.  

**Example 2 · 25 words**

**A:** Wear my campaign ribbon for the club election.  
**B:** I'm staying neutral.  
**A:** Which campaign asked you to stay neutral?  
**B:** Neither.  
**A:** Then mine has an excellent vacancy.  

### D59 — Obey Without Explanation

**Card:** Create increasingly inconvenient requests that test whether someone accepts your authority.

**Editorial finding / approach:** Trivial tasks become increasingly inconvenient tests of obedience; A refuses to supply a practical reason.

**Example 1 · 32 words**

**A:** Bring that empty box to my desk.  
**B:** What do you need it for?  
**A:** At present, to establish whether you'll bring it.  
**B:** It's here.  
**A:** Good. Take it back without the question this time.  

**Example 2 · 29 words**

**A:** Stand beside the window while I check something.  
**B:** What are you checking?  
**A:** Whether the instruction needs an explanation.  
**B:** It's cold over here.  
**A:** Then close the window and remain instructional.  

### D60 — Pass Me the Authority

**Card:** Get someone to transfer authority publicly by naming you as the person who decides what happens next.

**Editorial finding / approach:** A seeks a public transfer of decision-making, not merely possession of a useful object.

**Example 1 · 38 words**

**A:** Hand me the hall key and tell everyone I'm now in charge.  
**B:** Can't I just give you the key?  
**A:** The door will understand. The committee needs words.  
**B:** They know you're taking over.  
**A:** Then let them hear you stop.  

**Example 2 · 31 words**

**A:** Before leaving the meeting, name me as the person who decides.  
**B:** You're sitting in my chair.  
**A:** Furniture announces location, not succession.  
**B:** Fine. You're chairing.  
**A:** To the room, please. I already agree.  

### D61 — Orders from the Shadows

**Card:** Hide that you set the problem in motion while quietly directing how everyone responds.

**Editorial finding / approach:** A conceals their original instruction while steering the response with suspiciously precise knowledge.

**Example 1 · 41 words**

**A:** Let's fix the delivery mix-up. Send the crates back through my office.  
**B:** Your email sent them to the wrong city.  
**A:** Which means I know the route intimately.  
**B:** Should we show the manager the email?  
**A:** Show them my corrected routing chart first.  

**Example 2 · 37 words**

**A:** Nobody panic about the cancelled bookings. I'll direct the recovery.  
**B:** You ordered the cancellations.  
**A:** Then consistency demands I order the next step too.  
**B:** Why did you cancel them?  
**A:** That question isn't recovering any bookings. Call this number.  

### D62 — Not Up for Debate

**Card:** Keep the conversation from examining where your authority comes from or whether it is legitimate.

**Editorial finding / approach:** A diverts scrutiny from the source of authority into urgent work under that authority.

**Example 1 · 30 words**

**A:** Before questioning my appointment, finish the stock check.  
**B:** Who appointed you?  
**A:** Stock first. Governance afterward.  
**B:** Can I see the letter?  
**A:** Can I see the stock? Only one is running out.  

**Example 2 · 28 words**

**A:** My badge authorises this inspection. Open the cupboard.  
**B:** There's no signature on it.  
**A:** Signatures are tomorrow's administrative focus.  
**B:** Did you make the badge?  
**A:** We're inspecting cupboards, not stationery.  

### D63 — For Stability’s Sake

**Card:** Hide a destabilizing truth because you believe the current balance of power must be protected.

**Editorial finding / approach:** A withholds destabilising information to preserve collective function rather than personal innocence.

**Example 1 · 31 words**

**A:** The director's unavailable. Let's keep today's launch exactly as planned.  
**B:** Her office is empty.  
**A:** A distraction-free leadership environment.  
**B:** Has she resigned?  
**A:** The launch still has a time. Let's protect that certainty.  

**Example 2 · 36 words**

**A:** I've shortened the committee briefing so we can get through the fair.  
**B:** Where's the treasurer's page?  
**A:** It would complicate the cake stall.  
**B:** Are we out of money?  
**A:** We still have cakes. Let's discuss what can sell.  

### D64 — Name Your Backers

**Card:** Get someone to reveal who supports their position, who authorized it, and who benefits from it.

**Editorial finding / approach:** A seeks the coalition behind a decision, using specific accountability questions to reveal backers.

**Example 1 · 30 words**

**A:** Who supported your decision to close the workshop?  
**B:** I signed it myself.  
**A:** Who made it comfortable to sign?  
**B:** The director was consulted.  
**A:** Good. Whose budget improves when the workshop disappears?  

**Example 2 · 33 words**

**A:** Your proposal says 'we recommend.' Who's we?  
**B:** The planning group.  
**A:** Which member would defend it if the roof falls in?  
**B:** Finance pushed for the cheaper option.  
**A:** Then put finance beside the word recommend.  

### D65 — Strategic Retreat

**Card:** Describe every loss of control as a deliberate concession made from strength.

**Editorial finding / approach:** A describes an actual loss as voluntary strategic generosity and reframes each visible setback as chosen space.

**Example 1 · 29 words**

**A:** I've generously surrendered the chair's role.  
**B:** You lost the election.  
**A:** I gave democracy room to flourish.  
**B:** They're removing your nameplate.  
**A:** Excellent. Space for my influence to become less obvious.  

**Example 2 · 26 words**

**A:** I've chosen to withdraw my exhibition proposal.  
**B:** The gallery rejected it.  
**A:** They correctly anticipated my next move.  
**B:** They rejected the appeal too.  
**A:** A remarkably well-coordinated retreat.  

### D66 — Act Authorized

**Card:** Behave as though you have full authorization, using certainty and procedure to discourage verification.

**Editorial finding / approach:** A behaves as though authorization is settled and treats missing evidence as an advanced form of approval.

**Example 1 · 28 words**

**A:** I'm cleared to inspect the storeroom. Here's my pass.  
**B:** It's unsigned.  
**A:** Approval has moved beyond handwriting.  
**B:** I'll call the manager.  
**A:** Tell her the inspection's reached the telephone stage.  

**Example 2 · 30 words**

**A:** I've stamped my request. The room's booked.  
**B:** That's your own stamp.  
**A:** Good. A direct approval chain.  
**B:** You can't authorise yourself.  
**A:** Then we'll need to discuss why the stamp says approved.  

### D67 — Rank Everything

**Card:** Turn every new contribution into a ranking that places you nearer the top.

**Editorial finding / approach:** A ranks each new contribution so their own work moves toward the top.

**Example 1 · 31 words**

**A:** I've ranked our picnic contributions. Planning outranks sandwiches.  
**B:** I also drove everyone.  
**A:** Transport comes below destination selection. Mine again.  
**B:** Do we need a ranking?  
**A:** Questioning the ranking scores low on teamwork.  

**Example 2 · 35 words**

**A:** Your suggestion is useful. I'll put it below my strategic overview.  
**B:** My suggestion fixed the problem.  
**A:** A practical achievement inside my strategic problem recognition.  
**B:** You caused the problem.  
**A:** Then I'm foundational to the whole project.  

### D68 — More Power, More Problems

**Card:** Celebrate every burden, restriction, or crisis as evidence that your influence is expanding.

**Editorial finding / approach:** Each added burden or loss is celebrated as evidence of growing influence.

**Example 1 · 36 words**

**A:** They've given me three more departments to cover. My influence is soaring.  
**B:** They've cut your budget.  
**A:** They trust me to transcend money.  
**B:** You've also lost your office.  
**A:** Excellent. My reach is no longer confined by walls.  

**Example 2 · 27 words**

**A:** Another complaint for me! I'm becoming central to everything.  
**B:** They're complaining about you.  
**A:** Direct public engagement.  
**B:** They want you removed.  
**A:** A strong mandate to discuss my position.  

### D69 — Gracious Command

**Card:** Remain warm and appreciative while steadily reducing everyone else’s room to choose.

**Editorial finding / approach:** Warm appreciation accompanies shrinking options until disagreement itself is reframed as helpful cooperation.

**Example 1 · 40 words**

**A:** Thank you for choosing the venue. I've narrowed it to my garden.  
**B:** I preferred the hall.  
**A:** A lovely contribution. We'll use its name for a garden table.  
**B:** So I don't choose?  
**A:** You've helped us appreciate how much simpler this is.  

**Example 2 · 33 words**

**A:** I'm so grateful you're helping. I've assigned your whole weekend.  
**B:** I offered an hour.  
**A:** Such generosity deserves room to grow.  
**B:** I'm not available Sunday.  
**A:** Thank you for clarifying. Saturday will be delightfully full.  

### D70 — Access Has a Price

**Card:** Turn every piece of access, information, or approval into a favor, debt, or condition.

**Editorial finding / approach:** A prices access or information as a future obligation, making the exchange concrete.

**Example 1 · 36 words**

**A:** I'll open the storeroom in return for a favour.  
**B:** I only need a mop.  
**A:** Then it should be a modest favour. I'll name it later.  
**B:** Can't I borrow the key?  
**A:** That's a second level of membership.  

**Example 2 · 34 words**

**A:** I can introduce you to the curator if you support my exhibition.  
**B:** Couldn't you just introduce us?  
**A:** I could. What a valuable ability.  
**B:** What support do you need?  
**A:** Now we're near the gallery entrance.  

### D71 — Consensus Means Me

**Card:** Treat every partial agreement as confirmation that everyone has accepted your leadership.

**Editorial finding / approach:** A converts limited agreement into consent to leadership while downplaying explicit objections.

**Example 1 · 38 words**

**A:** You nodded at Friday. I'll announce unanimous support for my plan.  
**B:** I agreed to Friday, not the plan.  
**A:** Excellent. We've approved the timetable of my leadership.  
**B:** I object to the budget.  
**A:** Then I'll announce unanimous calendar support first.  

**Example 2 · 36 words**

**A:** You like the blue poster? Good, the campaign has consensus.  
**B:** I dislike the slogan.  
**A:** But its surroundings have your confidence.  
**B:** You can't say I endorse it.  
**A:** I'll say you helped establish the visual direction under me.  

### D72 — Expand Your Jurisdiction

**Card:** Use every new problem as a reason to expand what you are entitled to control.

**Editorial finding / approach:** Every practical connection becomes grounds to expand A's control into a new area.

**Example 1 · 35 words**

**A:** The kitchen supplies my team's tea. I need a kitchen key.  
**B:** You manage accounts.  
**A:** Accounts require alertness. Tea controls alertness.  
**B:** Where does that end?  
**A:** The roof leaks on the kettle. I'll need that key too.  

**Example 2 · 34 words**

**A:** Your delivery delays affect my schedule. I'll oversee transport.  
**B:** You only book meeting rooms.  
**A:** People travel to rooms. It's one system.  
**B:** Will you manage the roads next?  
**A:** Only the ones leading to my rooms.  

### D73 — Be There for Me

**Card:** Get someone to show up, help, or stay involved as proof that the connection still matters.

**Editorial finding / approach:** A seeks practical participation as evidence that the connection matters; competence is secondary to presence.

**Example 1 · 36 words**

**A:** Come help me paint the old kitchen. I want you there.  
**B:** You could hire someone.  
**A:** They wouldn't know why we're keeping that pencil mark.  
**B:** I'm terrible at painting.  
**A:** Then we'll be terrible beside the mark together.  

**Example 2 · 38 words**

**A:** Will you come to my opening? Even for ten minutes?  
**B:** I don't know anything about sculpture.  
**A:** You know me. That's the qualification.  
**B:** I might say the wrong thing.  
**A:** Say it in person. That's the bit I'm asking for.  

### D74 — Stay Until We’re Okay

**Card:** Keep someone present until the relationship feels repaired, even if the practical reason for staying disappears.

**Editorial finding / approach:** Once the practical task ends, A makes the unresolved relationship the reason the encounter cannot conclude.

**Example 1 · 35 words**

**A:** The dishes are done. Before you go, are we actually okay?  
**B:** The kitchen's spotless.  
**A:** I'm asking about the people who cleaned it.  
**B:** What else needs doing?  
**A:** One sentence that lets me put my coat on.  

**Example 2 · 35 words**

**A:** Don't call the taxi yet. We haven't settled last night.  
**B:** We finished the conversation.  
**A:** We stopped talking. That's a different task.  
**B:** You're going to make us late.  
**A:** I'd rather arrive late than leave like this.  

### D75 — Name What It Cost

**Card:** Make someone acknowledge the emotional cost of what happened, not merely the event itself.

**Editorial finding / approach:** A asks B to acknowledge a specific emotional experience, not merely explain the event or offer a generic apology.

**Example 1 · 41 words**

**A:** You apologised for missing my concert. What do you think the empty seat felt like?  
**B:** My train was cancelled.  
**A:** I know the timetable. I'm asking about the seat.  
**B:** You felt let down.  
**A:** Yes. Stay with that before explaining the train again.  

**Example 2 · 36 words**

**A:** Tell me you understand why six weeks of silence hurt.  
**B:** My phone broke.  
**A:** For me, the silence didn't come with a repair notice.  
**B:** You thought I'd stopped caring.  
**A:** That's the bit I needed you to name.  

### D76 — I Need Your Blessing

**Card:** Get approval from someone whose opinion still carries emotional weight, even when permission is unnecessary.

**Editorial finding / approach:** A already has practical permission but cannot celebrate without a particular person's emotional endorsement.

**Example 1 · 36 words**

**A:** I've accepted the new job. Are you glad?  
**B:** You don't need my permission.  
**A:** I've got the job. I'm missing your gladness.  
**B:** Will you be happy there?  
**A:** I think so. Could you try sounding hopeful with me?  

**Example 2 · 32 words**

**A:** We signed the lease. Say it's good news before I open the wine.  
**B:** You've already decided.  
**A:** The contract's settled. Your blessing isn't.  
**B:** I support you.  
**A:** Good. Now say it toward the bottle.  

### D77 — Carry This with Me

**Card:** Get someone to share a burden by framing participation as part of the relationship.

**Editorial finding / approach:** A makes sharing a concrete burden part of belonging in the relationship, without requiring expertise.

**Example 1 · 33 words**

**A:** Take half these care-home forms. We shouldn't do this alone.  
**B:** You understand them better.  
**A:** I understand enough to be tired.  
**B:** Which half?  
**A:** Start with the page where I wrote your name beside mine.  

**Example 2 · 34 words**

**A:** Hold the other handle of this box of old letters.  
**B:** You packed it.  
**A:** We filled it over ten years.  
**B:** I don't know what you want me to do.  
**A:** Carry your side while we decide.  

### D78 — What Are We Now?

**Card:** Find out how someone defines the relationship without directly asking for a label.

**Editorial finding / approach:** An ordinary labeling or seating choice indirectly tests how B defines the relationship.

**Example 1 · 33 words**

**A:** What should I write after your name on the wedding invitation?  
**B:** Just write my name.  
**A:** There's a box marked relationship.  
**B:** Leave it blank.  
**A:** Will we sit beside the blank or at separate tables?  

**Example 2 · 37 words**

**A:** Do I bring my own towel when I visit now?  
**B:** You can use one here.  
**A:** The guest towel or the one that's always been mine?  
**B:** Whichever you like.  
**A:** I'm trying to learn which choice I still have.  

### D79 — Take My Side

**Card:** Recruit someone into your interpretation of a conflict involving a shared relationship.

**Editorial finding / approach:** A recruits an ally's account of a shared conflict and bargains over which parts are voiced publicly.

**Example 1 · 38 words**

**A:** When Mum mentions the holiday argument, remind her I offered to drive.  
**B:** After you lost the tickets.  
**A:** We can build toward that detail.  
**B:** I'm telling the whole story.  
**A:** Start at the helpful bit so the rest has context.  

**Example 2 · 30 words**

**A:** Tell Alex our promise meant alternating weekends.  
**B:** I remember it differently.  
**A:** Could you remember my interpretation sympathetically?  
**B:** You changed the arrangement.  
**A:** Then stand beside me while I explain the improvement.  

### D80 — Prove We’re Close

**Card:** Get someone to take a social or emotional risk that demonstrates trust in the connection.

**Editorial finding / approach:** A invites a specific social or emotional risk as evidence of closeness, leaving B room to negotiate.

**Example 1 · 36 words**

**A:** Come to the reunion with me. Let them ask what we are.  
**B:** People will talk.  
**A:** Then let's give one honest answer together.  
**B:** What answer?  
**A:** Start with 'we came together.' I'll stand beside you for the rest.  

**Example 2 · 35 words**

**A:** Tell me one thing you usually edit out before sending.  
**B:** What if it's awkward?  
**A:** Then we'll know we're close enough for awkward.  
**B:** You first.  
**A:** I'll start, but promise not to send me a polished reply.  

### D81 — Acknowledge Our History

**Card:** Make someone recognize that the relationship, memory, or sacrifice mattered and cannot be treated as incidental.

**Editorial finding / approach:** A asks for explicit acknowledgment before an object or history is dismissed as incidental.

**Example 1 · 36 words**

**A:** Before you box that photo, tell me that year mattered.  
**B:** It's only a picture.  
**A:** Then say what isn't in the paper.  
**B:** We were happy there.  
**A:** Good. Now we can pack the picture without packing that away.  

**Example 2 · 36 words**

**A:** Don't call our trip a random weekend. We saved for months.  
**B:** I remember.  
**A:** Name one thing before you throw out the ticket.  
**B:** We missed the boat and stayed anyway.  
**A:** Exactly. That's why this isn't just cardboard.  

### D82 — Choose the Relationship

**Card:** Make someone prioritize this connection over a competing person, promise, or opportunity.

**Editorial finding / approach:** A asks B to choose the relationship over a genuinely competing claim rather than merely find convenient time.

**Example 1 · 34 words**

**A:** Leave the work call ringing. Stay with this conversation.  
**B:** It's important.  
**A:** Then choosing us would mean something.  
**B:** I'll call back in ten minutes.  
**A:** Good. Give these ten minutes to me without watching the phone.  

**Example 2 · 34 words**

**A:** Skip the networking dinner. Have one ordinary evening here.  
**B:** This opportunity won't come again.  
**A:** Neither will tonight exactly like this.  
**B:** Couldn't we eat tomorrow?  
**A:** We could. I'm asking whether we ever come first today.  

### D83 — Remember Me Correctly

**Card:** Create small tests of whether someone remembers your preferences, stories, or shared history.

**Editorial finding / approach:** A quietly tests remembered preferences or history, then makes the missed detail emotionally significant.

**Example 1 · 31 words**

**A:** Which cup would you pour my tea into?  
**B:** Either?  
**A:** One of them has been mine for twelve years.  
**B:** The blue one.  
**A:** And how much milk? Let's see how the memory travels.  

**Example 2 · 34 words**

**A:** Remember our first holiday? Finish the story about the boat.  
**B:** We missed it.  
**A:** And what did I say at the dock?  
**B:** I don't remember.  
**A:** You used to tell that bit before I reached it.  

### D84 — Let Go of the Grudge

**Card:** Persuade someone to surrender resentment, distance, or a claim that keeps the relationship stuck.

**Editorial finding / approach:** A asks for release of a continuing claim while allowing the memory itself to remain.

**Example 1 · 45 words**

**A:** Bring the memory of our argument to dinner, but leave the demand for payment.  
**B:** I'm not ready to forget.  
**A:** I'm not asking you to forget. I'm asking for one meal without interest.  
**B:** What if it comes up?  
**A:** Let it visit. Don't give it my chair.  

**Example 2 · 42 words**

**A:** Could you stop using the missed birthday as the answer to everything?  
**B:** It still hurt.  
**A:** Keep telling me that. Stop making it the reason I can't help now.  
**B:** You want a clean slate.  
**A:** No. Just enough space on it for today's date.  

### D85 — I Pulled Away First

**Card:** Hide your role in creating the distance while working urgently to repair it.

**Editorial finding / approach:** A urgently repairs a distance they caused while trying to conceal their initiating role.

**Example 1 · 34 words**

**A:** I've missed our letters. Here's some fresh stationery.  
**B:** You stopped answering mine.  
**A:** And now look at all this room to begin.  
**B:** Why did you stop?  
**A:** Let's not waste the first page on the gap.  

**Example 2 · 41 words**

**A:** I've made you a new key. Lovely to have you visiting again.  
**B:** Why did you change the lock?  
**A:** The important thing is this one works.  
**B:** I couldn't get in for months.  
**A:** Then we'll make an especially welcoming first cup of tea.  

### D86 — Not Why We Drifted

**Card:** Keep the conversation away from the real reason the relationship changed.

**Editorial finding / approach:** A protects the true cause of distance by returning to concrete cheerful details of the shared past.

**Example 1 · 37 words**

**A:** Remember the sunshine on our last picnic? Beautiful sandwiches too.  
**B:** That's when you stopped speaking to me.  
**A:** Did we use mustard or pickle?  
**B:** Why did you disappear?  
**A:** I'll make both. We can at least recover the sandwiches.  

**Example 2 · 36 words**

**A:** Let's choose a film like we used to.  
**B:** Can we discuss why we stopped meeting?  
**A:** We never finished that comedy.  
**B:** You walked out halfway through our argument.  
**A:** Then we'll start the film at halfway. Efficient reunion.  

### D87 — Keep the Peace

**Card:** Hide a truth because you believe the relationship cannot survive one more conflict.

**Editorial finding / approach:** A hides new conflict-provoking information specifically to preserve a fragile peace.

**Example 1 · 37 words**

**A:** No new messages worth discussing. Let's enjoy breakfast.  
**B:** There's a letter under your plate.  
**A:** A detail that would spoil the eggs.  
**B:** Has your brother changed the plans again?  
**A:** The eggs haven't changed. Let's stay with their reliability.  

**Example 2 · 39 words**

**A:** I've given you the short version so we can have a quiet evening.  
**B:** What's in the long version?  
**A:** Several reasons not to have a quiet evening.  
**B:** We can't hide everything.  
**A:** No. Just enough to finish this cup of tea.  

### D88 — Say You Missed Me

**Card:** Get someone to admit longing, jealousy, hurt, or attachment before you reveal your own.

**Editorial finding / approach:** A elicits B's attachment before risking their own disclosure, using concrete evidence of absence.

**Example 1 · 36 words**

**A:** Was the flat very quiet while I was away?  
**B:** Did you miss me?  
**A:** I'm asking about the acoustics here first.  
**B:** I kept expecting your key.  
**A:** Good. Tell me that bit before I tell you about mine.  

**Example 2 · 35 words**

**A:** Did anyone sit in my chair after I left?  
**B:** Nobody wanted it.  
**A:** Because it wobbles, or because it was mine?  
**B:** Because it was yours.  
**A:** Right. Now I can tell you why I kept the cushion.  

### D89 — We Needed the Break

**Card:** Frame a rupture, absence, or failed connection as a healthy decision that ultimately helped.

**Editorial finding / approach:** A frames a real rupture as a useful or healthy separation and turns B's evidence into its supposed benefit.

**Example 1 · 31 words**

**A:** That year apart was probably healthy for us.  
**B:** We didn't speak at all.  
**A:** A thorough reset. No half-measures.  
**B:** We forgot each other's birthdays.  
**A:** Now remembering them can be a fresh choice.  

**Example 2 · 26 words**

**A:** The disastrous reunion showed us what needed changing.  
**B:** You called it a disaster.  
**A:** Excellent diagnostic material.  
**B:** We left separately.  
**A:** Then we successfully identified the direction problem.  

### D90 — I Know How to Fix Us

**Card:** Perform confidence about repairing the relationship while improvising every step.

**Editorial finding / approach:** A improvises a repair procedure while presenting each spontaneous step as part of a confident method.

**Example 1 · 35 words**

**A:** I know how to fix us. First tea, then one honest sentence.  
**B:** You just invented that.  
**A:** Every established method had a first kettle.  
**B:** What's step three?  
**A:** We'll know after the sentence. It's a responsive method.  

**Example 2 · 32 words**

**A:** We're on stage two of reconciliation. Choose a biscuit.  
**B:** What was stage one?  
**A:** Getting you to ask about the process.  
**B:** You haven't got a process.  
**A:** Good honesty. Stage two is already working.  

### D91 — Who Cares More?

**Card:** Turn every favor, memory, sacrifice, and affectionate gesture into evidence that you care more.

**Editorial finding / approach:** Care becomes a competition in measurable sacrifice or memory, with A refusing shared credit.

**Example 1 · 33 words**

**A:** I kept twelve tickets from our trips. How many did you keep?  
**B:** I don't keep tickets.  
**A:** Then how will we compare devotion?  
**B:** I remember the trips.  
**A:** I remember them and maintained an archive.  

**Example 2 · 39 words**

**A:** I'll carry the heavier bag. I care more about your back.  
**B:** Let me take it for a while.  
**A:** Then you'd appear to care more about mine.  
**B:** We could share it.  
**A:** Only if I take the side with the books.  

### D92 — Still a Good Sign

**Card:** Treat every awkward or disappointing interaction as proof that the connection remains alive.

**Editorial finding / approach:** A treats awkwardness or disappointment itself as evidence of continuing connection and heightens hope.

**Example 1 · 31 words**

**A:** We still make each other laugh awkwardly. That's a good sign.  
**B:** That joke was painful.  
**A:** But recognisably ours.  
**B:** Maybe we should stop talking.  
**A:** Look, we're negotiating. Another sign we're still engaged.  

**Example 2 · 37 words**

**A:** You've postponed dinner again. At least there's still a dinner to postpone.  
**B:** It's the third time.  
**A:** Three chances to choose us eventually.  
**B:** I don't know when I'm free.  
**A:** Then I'll keep the invitation. It's doing remarkably well.  

### D93 — Affectionate Resentment

**Card:** Remain warm and familiar while letting old resentment sharpen beneath every caring gesture.

**Editorial finding / approach:** Familiar care carries a pointed old grievance; the service continues while resentment sharpens.

**Example 1 · 39 words**

**A:** Here's your tea, exactly as you like it. Someone remembers preferences.  
**B:** Thank you for remembering.  
**A:** You're welcome. The department never closed.  
**B:** Are we talking about my forgetting your birthday?  
**A:** No. Your tea would get cold during that annual discussion.  

**Example 2 · 33 words**

**A:** I've put an extra blanket on your bed. I wouldn't want you overlooked.  
**B:** It's rather tight.  
**A:** Carefully tucked. Unlike certain promises.  
**B:** Could you loosen it?  
**A:** Of course. I'm experienced at adjusting my expectations.  

### D94 — Relationship Ledger

**Card:** Price closeness, forgiveness, and support in favors, sacrifices, access, and future loyalty.

**Editorial finding / approach:** Forgiveness and closeness are traded for concrete future loyalty; A negotiates the conditions rather than simply reconnecting.

**Example 1 · 38 words**

**A:** I'll let the argument go if you come to my opening.  
**B:** I thought forgiveness was a gift.  
**A:** It is. Attendance is the wrapping.  
**B:** What if I'm working?  
**A:** Then we should settle the terms before I release the argument.  

**Example 2 · 36 words**

**A:** You can have the spare key again for one reliable Sunday visit a month.  
**B:** You're charging rent on closeness.  
**A:** A very modest calendar-based rate.  
**B:** Could we start with coffee?  
**A:** Certainly. Coffee earns a provisional key discussion.  

### D95 — Closer on My Terms

**Card:** Agree to repair the relationship while redefining closeness around the boundaries that benefit you.

**Editorial finding / approach:** A agrees to closeness but redraws its boundaries for personal convenience.

**Example 1 · 41 words**

**A:** Yes, let's reconnect. I'll come for dinner and leave at ten.  
**B:** We need to discuss why you left.  
**A:** We can start with why I'm leaving at ten tonight.  
**B:** That's not the same thing.  
**A:** It's the version of closeness I can promise.  

**Example 2 · 40 words**

**A:** I'd love another weekend together. Separate rooms, though, and no old arguments.  
**B:** The old arguments are why we need the weekend.  
**A:** Then let's call it a pleasant afternoon.  
**B:** You're shrinking it.  
**A:** To a size I can sincerely say yes to.  

### D96 — Here We Go Again

**Card:** Use every new disagreement to prove the same relationship pattern is repeating, then raise the consequences.

**Editorial finding / approach:** A maps a new disagreement onto a recurring relationship pattern and changes the consequences rather than just repeating the accusation.

**Example 1 · 33 words**

**A:** You promised to call. This is the same loop again.  
**B:** This time my battery died.  
**A:** The explanation changed. My waiting didn't.  
**B:** I'll do better.  
**A:** Then choose what changes before we reuse that sentence.  

**Example 2 · 34 words**

**A:** Another cancelled visit. Last time I rearranged my whole week.  
**B:** This one's unavoidable.  
**A:** Then the next date comes from you.  
**B:** Don't you trust me?  
**A:** I trust the pattern. I'm changing my part in it.  

### D97 — Let Me Lean

**Card:** Get someone to carry part of the emotional burden without making you name how heavy it has become.

**Editorial finding / approach:** A asks for one concrete piece of support while avoiding an explanation of the whole emotional burden.

**Example 1 · 40 words**

**A:** Could you make this one call for me? Just say the booking's cancelled.  
**B:** What's wrong?  
**A:** Please let the call be the first thing you take off me.  
**B:** Do you want to talk afterward?  
**A:** Maybe. One thing lighter might make room.  

**Example 2 · 35 words**

**A:** Read the first line of this letter before I do.  
**B:** Shall I read it aloud?  
**A:** Only if your face stays reasonably ordinary.  
**B:** You want me beside you?  
**A:** Yes. Let's call that helping with the lighting.  

### D98 — Stay Until I’m Steady

**Card:** Keep someone present until you feel steady enough to face what comes next without them.

**Editorial finding / approach:** A delays separation until steadier, measuring the additional time in small concrete units.

**Example 1 · 37 words**

**A:** Stay for one more tea. My hands haven't caught up with the news.  
**B:** We've had three cups.  
**A:** Then the fourth needs no explanation.  
**B:** My taxi's outside.  
**A:** Let me manage one quiet minute while it's still only outside.  

**Example 2 · 33 words**

**A:** Don't close the door yet. Count five breaths with me.  
**B:** I've counted five.  
**A:** Good. Could we try five without me checking you're there?  
**B:** I'll stand here.  
**A:** That's the part making the counting work.  

### D99 — Understand the Hurt

**Card:** Make someone acknowledge why their action hurt, not merely agree that it happened.

**Editorial finding / approach:** A asks B to understand the emotional meaning of a specific action rather than its practical cause.

**Example 1 · 44 words**

**A:** I saved you a seat all night. Tell me why missing it hurt.  
**B:** You knew I was busy.  
**A:** I knew you were busy. I didn't know I'd keep looking at the door.  
**B:** You felt unimportant.  
**A:** Yes. That's the part the train timetable doesn't explain.  

**Example 2 · 31 words**

**A:** Your silence hurt. Not because I needed an instant reply.  
**B:** My phone died.  
**A:** I thought our conversation had.  
**B:** You thought I'd stopped caring?  
**A:** Exactly. Please answer that before the battery story.  

### D100 — Tell Me I Did Enough

**Card:** Get someone to reassure you that your effort, choice, or survival was enough.

**Editorial finding / approach:** A seeks reassurance that a limited effort counts before being redirected to improvement.

**Example 1 · 39 words**

**A:** I only finished one painting. Tell me that counts.  
**B:** You could do more next month.  
**A:** Before next month, could this one be enough for today?  
**B:** You worked hard on it.  
**A:** Good. Let me hear that without an assignment afterward.  

**Example 2 · 36 words**

**A:** I made it through the speech without leaving. Was that enough?  
**B:** You forgot a paragraph.  
**A:** I know. I'm asking about staying.  
**B:** You stayed all the way through.  
**A:** Thank you. That's the bit I'm trying to keep.  

### D101 — Start the Hard Part

**Card:** Get someone else to explain, announce, or begin the emotionally difficult part.

**Editorial finding / approach:** A gives someone else the emotionally difficult opening and volunteers for safe follow-up work.

**Example 1 · 36 words**

**A:** You tell the choir the tour's cancelled. I'll hand out the refund forms.  
**B:** You're the organiser.  
**A:** Exactly. The forms will need my full attention.  
**B:** They'll ask why.  
**A:** Say 'funding' first. I'll join after the disappointed silence.  

**Example 2 · 40 words**

**A:** Could you phone Mum and begin the conversation about selling the house?  
**B:** She asked to speak to you.  
**A:** I'll take over once you've said the word selling.  
**B:** That's the difficult word.  
**A:** Yes. I'll handle the words that come after it.  

### D102 — What Aren’t You Saying?

**Card:** Find out what someone is holding back by treating every careful answer as incomplete.

**Editorial finding / approach:** A treats careful phrasing as evidence of omitted material and narrows the gap B has left.

**Example 1 · 34 words**

**A:** You said the audition was interesting. What followed that in your head?  
**B:** Nothing. Interesting.  
**A:** Then say it without looking at the floor.  
**B:** It wasn't what I expected.  
**A:** Good. We're finally approaching the unsent sentence.  

**Example 2 · 40 words**

**A:** You've told me the careful version of the meeting. What's the messy version?  
**B:** That's all there is.  
**A:** Then why did you skip the part after my name?  
**B:** I didn't want to upset you.  
**A:** Start there. That's the first unpolished sentence.  

### D103 — Hope with Me

**Card:** Recruit someone into believing that the outcome can still change, even when the evidence is thin.

**Editorial finding / approach:** A recruits active shared hope through a small concrete act rather than declaring optimism alone.

**Example 1 · 37 words**

**A:** Draw another route with me. The first two failed, but we're not finished.  
**B:** The third might fail too.  
**A:** Then I need two pencils facing it, not one.  
**B:** Where do we start?  
**A:** At the bit we still want.  

**Example 2 · 39 words**

**A:** Help me choose the glasses for the celebration if the application works.  
**B:** We haven't heard back.  
**A:** I know. I don't want to hope at an empty place setting.  
**B:** Two glasses, then?  
**A:** Yes. That's a future I can look at.  

### D104 — Say the Scary Part

**Card:** Get someone else to name the frightening possibility or vulnerable feeling before you do.

**Editorial finding / approach:** A seeks another voice to name the frightening possibility before naming it themselves.

**Example 1 · 35 words**

**A:** Finish this sentence: the letter might say...  
**B:** Let's not assume the worst.  
**A:** I'm already assuming it silently. Give it a name.  
**B:** That the shop has to close?  
**A:** Yes. Now it's something we can both hear.  

**Example 2 · 36 words**

**A:** What's the thing we're avoiding saying about the competition?  
**B:** I don't want to discourage you.  
**A:** The blank is more frightening than a noun.  
**B:** We might not qualify.  
**A:** There. Now we can prepare without whispering around it.  

### D105 — See What This Took

**Card:** Make someone recognize the courage, restraint, or emotional labor your choices required.

**Editorial finding / approach:** A asks B to notice restraint or courage in the actual work, not just praise the final tidy result.

**Example 1 · 38 words**

**A:** Compare the angry letter with the one I sent. Notice the crossing-out.  
**B:** I'm glad you calmed down.  
**A:** That crossing-out is how I did it.  
**B:** You removed whole paragraphs.  
**A:** Yes. Please appreciate the paragraphs you never had to receive.  

**Example 2 · 32 words**

**A:** I said two honest sentences at the meeting. That took all morning.  
**B:** Only two?  
**A:** Yesterday I couldn't say either.  
**B:** I hadn't realised.  
**A:** That's what I wanted you to see, not their length.  

### D106 — Choose What Matters More

**Card:** Make someone choose between emotional safety and the outcome they claim to want.

**Editorial finding / approach:** A makes a conflict between safety and a desired result explicit, requiring a choice rather than both by default.

**Example 1 · 36 words**

**A:** Do you want the audition or the comfort of not being judged?  
**B:** I'd like both.  
**A:** Then which wins when you reach the door?  
**B:** I'm scared to go in.  
**A:** That's one side. Name the other before deciding.  

**Example 2 · 38 words**

**A:** You want us to talk honestly, but only about safe subjects. Choose what matters more tonight.  
**B:** Can't honesty be comfortable?  
**A:** Sometimes. This conversation hasn't found that route.  
**B:** Then one difficult subject.  
**A:** Good. Let's stop promising comfort for it.  

### D107 — Stay for the Hard Part

**Card:** Create increasing moments of emotional honesty to test whether someone remains present and supportive.

**Editorial finding / approach:** A reveals progressively more difficult truth and uses continued presence as the test, without commanding B's response.

**Example 1 · 39 words**

**A:** Can you stay while I say one uncomfortable thing about the trip?  
**B:** I thought we settled it.  
**A:** We settled the part I could say easily.  
**B:** I'm listening.  
**A:** Then stay with me while I admit I never wanted to go.  

**Example 2 · 43 words**

**A:** I wasn't just late to the reunion. Could you hear the next part?  
**B:** Is there more?  
**A:** Yes. I waited outside for half an hour.  
**B:** Why didn't you come in?  
**A:** I was afraid you'd be happier without me there. Can we stay with that?  

### D108 — Drop the Armor

**Card:** Persuade someone to lower their guard, stop performing strength, or admit what affects them.

**Editorial finding / approach:** A invites one manageable unguarded admission rather than demanding an emotional performance.

**Example 1 · 42 words**

**A:** You can stop using the cheerful voice with me. What got to you today?  
**B:** Nothing worth complaining about.  
**A:** It doesn't need to win a suffering contest.  
**B:** The empty shop frightened me.  
**A:** All right. We can sit with that without calling you brave.  

**Example 2 · 36 words**

**A:** Put down the speech about coping. Tell me one thing you're finding hard.  
**B:** I'm managing.  
**A:** I didn't ask for your management report.  
**B:** I hate going home to silence.  
**A:** Thank you. That's something I can actually hear.  

### D109 — I Started the Spiral

**Card:** Hide how much your own fear or resentment created the emotional crisis while helping everyone calm it.

**Editorial finding / approach:** A helps settle alarm that their own earlier fear created while diverting attention from its origin.

**Example 1 · 36 words**

**A:** Let's reassure everyone. There's no evidence the fair's cancelled.  
**B:** You sent the midnight warning.  
**A:** Which means I have everyone's number for the reassurance.  
**B:** Why did you send it?  
**A:** Let's reduce the panic before reviewing its administration.  

**Example 2 · 31 words**

**A:** Nobody needs to worry about the missing money yet.  
**B:** You rang three people crying.  
**A:** And now I'm demonstrating improvement.  
**B:** You started the rumour.  
**A:** Then I'm excellently placed to manage its retirement.  

### D110 — Not the Real Fear

**Card:** Keep the conversation focused on practical details so no one reaches the fear underneath them.

**Editorial finding / approach:** A stays in concrete practical details to avoid exposing the fear underneath.

**Example 1 · 30 words**

**A:** Before opening the result, do we have clean teaspoons?  
**B:** The letter's more important.  
**A:** Yes. Which is why it deserves properly stirred tea.  
**B:** Are you frightened?  
**A:** I'm concerned about teaspoon readiness.  

**Example 2 · 33 words**

**A:** What time's the train? Let's check again before discussing the move.  
**B:** We've checked five times.  
**A:** The timetable remains reassuringly specific.  
**B:** You're scared to leave.  
**A:** I'm scared we'll miss the train while naming things.  

### D111 — Let Them Keep Hope

**Card:** Hide discouraging information because you believe hope is the only thing keeping someone able to continue.

**Editorial finding / approach:** A hides discouraging evidence to preserve another person's ability to continue hoping.

**Example 1 · 40 words**

**A:** There's still one gallery we haven't tried. Let's pack the paintings.  
**B:** What's in the rejection pile?  
**A:** Nothing that helps us pack.  
**B:** Did the biggest gallery say no?  
**A:** The small one hasn't answered. Let's leave it something to say yes to.  

**Example 2 · 36 words**

**A:** The garden plot might still be available. Keep the seed packets.  
**B:** You've covered half the letter.  
**A:** The useful half is here: waiting list.  
**B:** How long is it?  
**A:** Long enough for us to practise keeping seedlings alive.  

### D112 — Admit You’re Hurt

**Card:** Get someone to admit hurt, fear, or disappointment before you reveal that you feel it too.

**Editorial finding / approach:** A asks B to admit hurt first while concealing their own matching distress.

**Example 1 · 29 words**

**A:** Were you disappointed when they cancelled? You looked quiet.  
**B:** Were you?  
**A:** I'm asking about your quiet first.  
**B:** Yes. I was really hurt.  
**A:** Right. Then these tissues aren't just precautionary.  

**Example 2 · 41 words**

**A:** Did their joke bother you, or was that only your face?  
**B:** Why do you want to know?  
**A:** I'm checking whether the room felt the same to both of us.  
**B:** It hurt me.  
**A:** Good to know. I can unfold my complaint now.  

### D113 — A Necessary Heartbreak

**Card:** Describe disappointment, rejection, or loss as the exact experience everyone needed in order to grow.

**Editorial finding / approach:** A turns disappointment into an allegedly necessary growth experience, even as B wants the lost outcome back.

**Example 1 · 36 words**

**A:** That rejection was exactly the lesson our bakery needed.  
**B:** We needed the contract.  
**A:** And now we've learned not to need one contract.  
**B:** We can't pay the mixer loan.  
**A:** A powerful second lesson about attachment to equipment.  

**Example 2 · 35 words**

**A:** Breaking the old mug makes room for a truer morning ritual.  
**B:** I liked that mug.  
**A:** That's what gives this growth depth.  
**B:** I want to glue it.  
**A:** Then you're not ready for the cupboard's new chapter.  

### D114 — I Can Handle This

**Card:** Perform complete emotional readiness while quietly borrowing coping strategies from every response around you.

**Editorial finding / approach:** A borrows practical coping strategies while claiming they were already part of their own method.

**Example 1 · 35 words**

**A:** I'm completely ready for the results. What's that breathing pattern you're doing?  
**B:** Four in, six out.  
**A:** Exactly. I was about to begin the advanced six.  
**B:** You've copied me.  
**A:** Synchronised. It's one of my readiness techniques.  

**Example 2 · 32 words**

**A:** Water first, obviously. That's how I handle disappointment.  
**B:** You said water wouldn't help.  
**A:** Not before the right moment.  
**B:** When was the right moment?  
**A:** When you brought the glass. Very responsive of you.  

### D115 — Outfeel the Room

**Card:** Answer every fear, sacrifice, or disappointment with one of your own that deserves more attention.

**Editorial finding / approach:** Each emotional disclosure becomes an opening for A's larger competing experience.

**Example 1 · 35 words**

**A:** One sleepless night? I can give you a week's perspective.  
**B:** I just wanted to talk.  
**A:** Of course. My week explains your night beautifully.  
**B:** It isn't a contest.  
**A:** Good. Then my seven nights won't seem threatening.  

**Example 2 · 32 words**

**A:** Your opening was disappointing? Mine had an audience of two, both leaving.  
**B:** I'm sorry.  
**A:** One took the interval snacks.  
**B:** Could we return to my opening?  
**A:** After we've established how disappointing can scale.  

### D116 — Hope Keeps Moving

**Card:** Turn every disappointment into a new reason the desired outcome is delayed, redirected, or becoming more meaningful.

**Editorial finding / approach:** A redirects hope after each specific failure while insisting the desired outcome remains in motion.

**Example 1 · 29 words**

**A:** They said no on Friday. Monday gets a fresh start.  
**B:** The letter says no permanently.  
**A:** Then we'll need a different letter.  
**B:** From whom?  
**A:** That's Monday's opportunity to surprise us.  

**Example 2 · 32 words**

**A:** The shop didn't work here. Hope needs a better postcode.  
**B:** We have no moving money.  
**A:** Then it needs a smaller first address.  
**B:** A market stall?  
**A:** Exactly. The dream's learning to travel light.  

### D117 — Comfort Everyone Else

**Card:** Meet every painful moment by comforting someone else more intensely while your own distress becomes harder to hide.

**Editorial finding / approach:** A intensifies care for B to prevent attention returning to A's visible distress.

**Example 1 · 35 words**

**A:** Have another tissue. Tell me more about your bad day.  
**B:** Your sleeve's soaked.  
**A:** Spilled water. Your day was saying something.  
**B:** When did you last sit down?  
**A:** I'll sit when your tea reaches the comforting temperature.  

**Example 2 · 33 words**

**A:** I've made you soup. You look upset.  
**B:** You got the same disappointing letter.  
**A:** Yes, which qualifies me to choose the soup.  
**B:** Have some yourself.  
**A:** After I know it's helping you. Quality control first.  

### D118 — Emotional Interest

**Card:** Treat comfort, vulnerability, and forgiveness as investments that must eventually be repaid with equal emotional risk.

**Editorial finding / approach:** A treats vulnerability as a reciprocal emotional investment, asking B for equivalent exposure.

**Example 1 · 43 words**

**A:** I've told you why the visit scared me. Meet me with something real.  
**B:** You didn't have to tell me.  
**A:** I chose to. I'd like to know we're both on the bridge.  
**B:** What do you want to hear?  
**A:** Something you haven't polished for safety.  

**Example 2 · 43 words**

**A:** I'll stay through this hard conversation. Someday I need you equally open with me.  
**B:** Are you keeping score?  
**A:** Not points. A place where both of us can be unsteady.  
**B:** I don't know if I can.  
**A:** Then say that honestly. It's a first payment.  

### D119 — Ready on My Terms

**Card:** Agree to be honest, hopeful, or vulnerable only in forms that preserve your emotional safety.

**Editorial finding / approach:** A agrees to vulnerability within an explicit boundary that makes participation possible.

**Example 1 · 36 words**

**A:** I'll talk about the argument, but not the whole year tonight.  
**B:** The whole year matters.  
**A:** It does. Tonight I can finish one sentence without leaving.  
**B:** Where do we start?  
**A:** With the argument, and permission to pause.  

**Example 2 · 37 words**

**A:** I'll sit by the door while we talk.  
**B:** Are you planning to run?  
**A:** Knowing I can leave is helping me stay.  
**B:** We can stop when you need to.  
**A:** Good. Now I can risk a less careful answer.  

### D120 — The Same Ending

**Card:** Use every new emotional detail as evidence that the same feared ending is becoming inevitable.

**Editorial finding / approach:** New details are interpreted as steps toward the same feared ending, not merely general anxiety.

**Example 1 · 33 words**

**A:** You've written 'take care.' That's how the last goodbye started.  
**B:** It's an ordinary sign-off.  
**A:** So was the first separate dinner.  
**B:** This isn't ending.  
**A:** Then why are the familiar warning words arriving in order?  

**Example 2 · 31 words**

**A:** First you cancel lunch, then stop calling, then ask for the key.  
**B:** I've only cancelled lunch.  
**A:** We're at the early chapter.  
**B:** Tomorrow, then?  
**A:** That's the reassuring line that usually comes next.  

### D121 — Help Me Keep This Quiet

**Card:** Get someone to help contain a secret without first revealing its full risk or purpose.

**Editorial finding / approach:** A asks for help containing one concrete secret before explaining its stakes.

**Example 1 · 36 words**

**A:** Hide this envelope under the picnic hamper before anyone comes in.  
**B:** What's in it?  
**A:** Something easier to explain once it isn't visible.  
**B:** Am I involved now?  
**A:** Only at the hamper level. We can discuss promotion later.  

**Example 2 · 35 words**

**A:** Keep this cupboard key until tomorrow and don't mention the cupboard.  
**B:** Why?  
**A:** Because a cupboard with a secret key attracts questions.  
**B:** You've made me curious.  
**A:** Good. Keep the curiosity in your pocket with the key.  

### D122 — Not Until You Explain

**Card:** Keep someone present until they account for one contradiction, omission, or suspicious change in their story.

**Editorial finding / approach:** A uses a precise contradiction to hold B in the conversation until it is accounted for.

**Example 1 · 39 words**

**A:** Before you catch your bus, explain the missing hour on this receipt.  
**B:** We can talk tomorrow.  
**A:** The bus leaves in ten minutes. The hour's already gone.  
**B:** I took a detour.  
**A:** Then give the detour a destination before yours begins.  

**Example 2 · 38 words**

**A:** Wait. This note used to say Friday. Why does it say Monday?  
**B:** I have to leave.  
**A:** Not until Monday explains what it did to Friday.  
**B:** I changed the booking.  
**A:** Good. Now explain why my name stayed on it.  

### D123 — Apologize for the Lie

**Card:** Make someone acknowledge that the concealment or misdirection mattered, even if the underlying choice was defensible.

**Editorial finding / approach:** A distinguishes the concealed information from the underlying decision and asks for acknowledgment of that harm.

**Example 1 · 41 words**

**A:** I'm not asking you to apologise for cancelling. Apologise for not telling me.  
**B:** I didn't want to upset you.  
**A:** So you let me arrive with a cake instead.  
**B:** I'm sorry the party didn't happen.  
**A:** Try the part where I didn't know.  

**Example 2 · 40 words**

**A:** You gave me half the letter. That changed my answer.  
**B:** You got the important facts.  
**A:** You kept the fact that would have made me say no.  
**B:** I thought I was helping.  
**A:** Then acknowledge what your help prevented me from choosing.  

### D124 — Approve the Cover Story

**Card:** Get someone to endorse an explanation that protects the plan, reputation, or people involved.

**Editorial finding / approach:** A seeks agreement on a protective shared explanation and negotiates emphasis around contradictory facts.

**Example 1 · 38 words**

**A:** We were collecting chairs, not investigating the locked cupboard. Agreed?  
**B:** We did open the cupboard.  
**A:** Between chairs. Let's emphasise the furniture.  
**B:** What if they ask about the key?  
**A:** We can agree it was a very practical chair-collecting tool.  

**Example 2 · 25 words**

**A:** Back my explanation that the missing hour was traffic.  
**B:** We were parked.  
**A:** Stationary traffic. Very slow.  
**B:** Outside the bakery?  
**A:** Exactly. A known bottleneck near cakes.  

### D125 — You Handle the Evidence

**Card:** Make someone else take responsibility for the evidence, loose end, or difficult follow-up.

**Editorial finding / approach:** A hands evidence or follow-up to someone else, using their own visible involvement as the reason to delegate.

**Example 1 · 37 words**

**A:** Keep this labelled box in your cupboard. I'll handle the calls.  
**B:** Your name's on the label.  
**A:** Exactly. Mine is the first cupboard they'll check.  
**B:** You're making me responsible.  
**A:** For storage. Let's keep the job description reassuringly narrow.  

**Example 2 · 32 words**

**A:** You explain the missing receipt to the treasurer.  
**B:** It's your receipt.  
**A:** That's why my voice sounds so personally involved.  
**B:** What should I say?  
**A:** Start with administrative confusion. You sound neutral saying it.  

### D126 — What Really Happened?

**Card:** Find the truth by comparing details, repeating questions, and testing which parts of the story remain consistent.

**Editorial finding / approach:** A compares concrete details across repeated accounts and tests consistency instead of assuming guilt.

**Example 1 · 37 words**

**A:** Was the parcel in a bag or a box? You've used both words.  
**B:** A bag, I think.  
**A:** Describe the handles before choosing the noun.  
**B:** It had a rigid lid.  
**A:** Good. Let's build the object before the story.  

**Example 2 · 35 words**

**A:** Tell me again what happened between four and four-ten.  
**B:** I've already explained.  
**A:** Then it should match one of these two versions.  
**B:** I stopped for coffee.  
**A:** Where does coffee fit into the version with the bus?  

### D127 — Back My Version

**Card:** Recruit someone to remember, repeat, and defend one shared version of events when questions begin.

**Editorial finding / approach:** A recruits a rehearsed shared account and revises the delivery when B's memory conflicts.

**Example 1 · 35 words**

**A:** When they ask, we arrived after the lights went out.  
**B:** I arrived before.  
**A:** Then you were early for our agreed account.  
**B:** I won't say something false.  
**A:** Could you say you remember it being dark eventually?  

**Example 2 · 30 words**

**A:** Repeat this: the extra key was for maintenance.  
**B:** It opened the cake cupboard.  
**A:** A cupboard needs maintaining.  
**B:** Does eating cake count?  
**A:** Not in the version I'd like you to defend.  

### D128 — Test the Story First

**Card:** Get someone else to repeat the explanation, ask the dangerous question, or test the risky step before you commit.

**Editorial finding / approach:** A has someone else test an explanation or dangerous question before deciding how publicly to commit.

**Example 1 · 35 words**

**A:** Try this explanation on the chair before I sign it.  
**B:** Why don't you?  
**A:** I need an independent reading of the room.  
**B:** It's in your handwriting.  
**A:** Read it aloud. We're testing the explanation, not the pen.  

**Example 2 · 29 words**

**A:** Ask why the account's empty. I'll listen from here.  
**B:** Come with me.  
**A:** I will if the answer sounds welcoming.  
**B:** That's not support.  
**A:** It's advance research for the support stage.  

### D129 — Credit for the Discovery

**Card:** Make someone acknowledge that you found the clue, saw through the deception, or designed the successful scheme.

**Editorial finding / approach:** A seeks explicit credit for the first clue or design before group ownership erases the contribution.

**Example 1 · 34 words**

**A:** Before calling it our discovery, mention who found the receipt.  
**B:** We all solved the problem.  
**A:** Yes. After my receipt introduced it properly.  
**B:** I'll put your name in the report.  
**A:** Beside found, not beside attended.  

**Example 2 · 36 words**

**A:** My diagram located the hidden doorway.  
**B:** We all studied the wall.  
**A:** I drew a door while it was still a wall to everyone else.  
**B:** Thank you for helping.  
**A:** Discovering. A more accurate verb for the diagram.  

### D130 — Truth or Loyalty

**Card:** Make someone choose between protecting the relationship and answering a dangerous question honestly.

**Editorial finding / approach:** A forces an explicit tradeoff between honest disclosure and protecting an existing confidence.

**Example 1 · 46 words**

**A:** That question's answer is in this letter. Our promise is beside it. Which do you pick up?  
**B:** They deserve the truth.  
**A:** Then name what happens to our confidence when you hand it over.  
**B:** You're making me choose.  
**A:** The question already did. I'm making the choice visible.  

**Example 2 · 35 words**

**A:** Will you tell them where we were, or keep our agreement?  
**B:** Can't I do both?  
**A:** Not with the address included.  
**B:** I don't want to lie.  
**A:** Then decide what part of us you're willing to explain.  

### D131 — Can You Keep It?

**Card:** Use increasingly sensitive details to test whether someone deserves deeper trust.

**Editorial finding / approach:** A offers graduated disclosures and tests where B would take each one, rather than demanding instant trust.

**Example 1 · 38 words**

**A:** The club's changing the menu. Keep that quiet before I tell you the bigger news.  
**B:** I won't tell anyone.  
**A:** Not even the person you tell everything to?  
**B:** You mean Sam?  
**A:** Good. We've found the first lock to check.  

**Example 2 · 29 words**

**A:** Here's a small secret: I withdrew my application.  
**B:** Why?  
**A:** First, where does that sentence go after you leave?  
**B:** Nowhere.  
**A:** Then it may be safe to give it a reason.  

### D132 — Hand Over the Proof

**Card:** Persuade someone to surrender information, evidence, a key, or access that would let you proceed.

**Editorial finding / approach:** A pursues the original evidence rather than accepting B's summary or control over access.

**Example 1 · 37 words**

**A:** Give me the actual note, not your description.  
**B:** I can read it to you.  
**A:** I want the words that don't get your emphasis.  
**B:** It's private.  
**A:** Then show me the one line you're using to decide for me.  

**Example 2 · 35 words**

**A:** Hand me the drawer key so I can check the figures.  
**B:** I'll tell you the total.  
**A:** I'm checking how the total was built.  
**B:** Don't you trust me?  
**A:** I'd like the paperwork to share the responsibility.  

### D133 — Steer the Suspicion

**Card:** Hide your responsibility by redirecting every new clue toward a safer explanation before anyone can connect it back to you.

**Editorial finding / approach:** A redirects evidence of their responsibility to a plausible safer cause; each clue changes the diversion.

**Example 1 · 40 words**

**A:** That stain could be from the delivery packaging. Let's check the van.  
**B:** You signed for the delivery.  
**A:** Exactly. I know which driver to ask.  
**B:** It's the same ink as your pen.  
**A:** Then the pen supplier may be involved. Wider investigation.  

**Example 2 · 28 words**

**A:** The shelf failed because the bracket was cheap.  
**B:** You fitted it upside down.  
**A:** Then the instructions need examining.  
**B:** You threw them away.  
**A:** Poor paper quality. Another supplier issue.  

### D134 — Anything but That Question

**Card:** Redirect every attempt to discuss the one detail that could expose your real motive or involvement.

**Editorial finding / approach:** One incriminating detail is avoided through increasingly urgent distractions.

**Example 1 · 41 words**

**A:** Before discussing why I had the key, check the bus timetable.  
**B:** Why did you have the key?  
**A:** If we miss this bus, the whole evening changes.  
**B:** We're not taking a bus.  
**A:** Then we urgently need to decide how we're getting home.  

**Example 2 · 37 words**

**A:** Look at the sunset in this photograph, not the person outside the frame.  
**B:** Who is that person?  
**A:** The light makes everyone difficult to identify.  
**B:** They're holding your coat.  
**A:** A remarkable colour combination. Shall we discuss the photographer?  

### D135 — A Kinder Version

**Card:** Protect someone from the full truth by offering a carefully edited explanation that feels kinder than complete honesty.

**Editorial finding / approach:** A edits truth to preserve useful information while withholding cruel wording, maintaining the distinction under challenge.

**Example 1 · 38 words**

**A:** The gallery can't use the painting. That's the useful part of the letter.  
**B:** What else does it say?  
**A:** Several adjectives you don't need before breakfast.  
**B:** Let me read them.  
**A:** Eat first. The decision won't change with cold toast.  

**Example 2 · 40 words**

**A:** They changed the guest list. You don't need their exact explanation.  
**B:** Did they say something unkind?  
**A:** I chose words that let us plan a better evening.  
**B:** That's not the whole truth.  
**A:** No. It's the part with somewhere to go next.  

### D136 — Tell Me Why

**Card:** Get someone to reveal the motive behind a choice by offering small pieces of your own truth as bait.

**Editorial finding / approach:** A offers a small personal admission to draw out B's motive, shifting from what happened to why.

**Example 1 · 40 words**

**A:** I've hidden invitations when I felt left out. Why did you hide mine?  
**B:** I thought you'd be angry.  
**A:** I was afraid of exclusion. What were you afraid of?  
**B:** That you'd choose them.  
**A:** There. Now we're discussing more than an envelope.  

**Example 2 · 40 words**

**A:** I once changed a plan because I was embarrassed. Why change this route?  
**B:** The old road was inconvenient.  
**A:** For the journey, or for someone you might meet?  
**B:** My former boss works there.  
**A:** Thank you. That gives the detour a reason.  

### D137 — Exactly as Planned

**Card:** Treat every exposed flaw, failed step, and unexpected consequence as proof that the scheme is unfolding by design.

**Editorial finding / approach:** A insists that each failed step was already intended, preserving the plan's supposed authorship.

**Example 1 · 35 words**

**A:** They spotted the secret entrance. Phase one is working.  
**B:** They weren't supposed to spot it.  
**A:** Not in the version they were supposed to believe.  
**B:** They've locked it.  
**A:** Excellent. They've committed resources to our decoy door.  

**Example 2 · 27 words**

**A:** The cover story collapsed exactly on schedule.  
**B:** You wrote believable beside it.  
**A:** For the first phase only.  
**B:** What's the second phase?  
**A:** Becoming so unbelievable they underestimate us.  

### D138 — I Know the Procedure

**Card:** Perform investigative confidence while quietly using each response to discover what the questions, clues, and next steps should be.

**Editorial finding / approach:** A learns investigative procedure from B's answers while claiming to have anticipated each discovery.

**Example 1 · 37 words**

**A:** Naturally, we'll examine the second key next.  
**B:** I just told you there was one.  
**A:** I was checking whether you'd disclose it unaided.  
**B:** What are you checking on the key?  
**A:** Begin by telling me what you think matters.  

**Example 2 · 33 words**

**A:** The hinge discrepancy is central to my investigation.  
**B:** I invented that phrase just now.  
**A:** A useful test of whether I'd recognise the principle.  
**B:** What principle?  
**A:** Explain your formulation. I'll compare it with mine.  

### D139 — Outsmart the Room

**Card:** Turn every clue, deduction, and secret into a contest you must solve or control first.

**Editorial finding / approach:** A claims priority over each deduction, turning collaboration into a contest over who knows first.

**Example 1 · 31 words**

**A:** Don't read that clue aloud. I'll solve it before the room hears it.  
**B:** You haven't opened it.  
**A:** I'm reserving the answer.  
**B:** It says the parcel's at reception.  
**A:** Exactly. My first location.  

**Example 2 · 28 words**

**A:** I've put my conclusion above yours on the board.  
**B:** They're the same conclusion.  
**A:** Then chronology decides who outsmarted whom.  
**B:** We spoke together.  
**A:** My chalk reached the board first.  

### D140 — The Plan Gets Better

**Card:** Celebrate every setback as proof that the scheme is becoming more sophisticated, selective, or impossible to detect.

**Editorial finding / approach:** A celebrates setbacks as improvements in sophistication rather than claiming they were planned originally.

**Example 1 · 29 words**

**A:** Our route's blocked. Wonderful. We'll become harder to follow.  
**B:** We don't know the alternative.  
**A:** Neither will anyone pursuing us.  
**B:** Nobody's pursuing us.  
**A:** Then the improved secrecy is already working.  

**Example 2 · 34 words**

**A:** They didn't believe the explanation. We can make it more sophisticated.  
**B:** They asked for something simpler.  
**A:** A clever challenge. We'll hide sophistication inside simplicity.  
**B:** You're complicating it again.  
**A:** Exactly. Nobody can copy us now.  

### D141 — Warmly Withholding

**Card:** Remain open, caring, and reassuring while revealing less with every new question.

**Editorial finding / approach:** Reassuring warmth remains while the actual information supplied diminishes with every question.

**Example 1 · 26 words**

**A:** I'm so glad you asked about the meeting. Have some tea.  
**B:** What happened?  
**A:** Nothing you need to worry about.  
**B:** Who was there?  
**A:** Lovely people. More tea?  

**Example 2 · 24 words**

**A:** Of course I'll explain the missing parcel. Sit comfortably.  
**B:** Where is it?  
**A:** Somewhere being handled.  
**B:** By whom?  
**A:** Someone. You're very welcome to another biscuit.  

### D142 — Secrets Have Value

**Card:** Price every fact, introduction, warning, and confession as something that must be traded for equal value.

**Editorial finding / approach:** Facts and confessions are priced in reciprocal information, with each instalment becoming a separate trade.

**Example 1 · 30 words**

**A:** One useful name costs one useful truth from you.  
**B:** You already know the answer.  
**A:** Then you know the product exists.  
**B:** I'll tell you who called.  
**A:** Good. That buys the surname.  

**Example 2 · 30 words**

**A:** I admitted taking the key. Your turn to offer a secret.  
**B:** Honesty shouldn't have a price.  
**A:** The first sentence was complimentary.  
**B:** What about the rest?  
**A:** We can discuss a subscription.  

### D143 — I Told You Enough

**Card:** Agree to be honest while repeatedly narrowing what honesty requires and which details count.

**Editorial finding / approach:** A is technically honest by narrowing the scope of each question and refusing unasked details.

**Example 1 · 30 words**

**A:** I told you where I was. You never asked what I carried.  
**B:** Did you take the box?  
**A:** An excellent new question.  
**B:** Answer it.  
**A:** Yes. Notice how precise questions improve honesty.  

**Example 2 · 29 words**

**A:** I promised honest answers, not a complete account.  
**B:** That's misleading.  
**A:** Only if you stop asking.  
**B:** Who was with you?  
**A:** Would you like the arrival list or the departure list?  

### D144 — The Conspiracy Expands

**Card:** Use every denial, coincidence, and missing detail as proof that more people and higher stakes are involved.

**Editorial finding / approach:** Every failed clue or denial enlarges A's conspiracy, rather than eliminating possibilities.

**Example 1 · 27 words**

**A:** The receipt's missing. Somebody else is helping.  
**B:** It probably fell out.  
**A:** An unwitnessed disappearance. They're improving.  
**B:** Nobody else is involved.  
**A:** A very coordinated refusal to name them.  

**Example 2 · 30 words**

**A:** You and the manager gave the same answer. Rehearsed.  
**B:** Because it's true.  
**A:** Then the cover story's reached management.  
**B:** There is no cover story.  
**A:** And now it has a denial protocol.  

### D145 — Help Me Make This Normal

**Card:** Get someone to help perform the strange behavior until it feels ordinary.

**Editorial finding / approach:** A recruits ordinary social treatment of an absurd premise until B has a practical role within it.

**Example 1 · 38 words**

**A:** Pass the talking cupboard a napkin. Let's make dinner normal.  
**B:** It doesn't have a lap.  
**A:** Then put it beside the handle, like a considerate host.  
**B:** Should I offer it soup?  
**A:** Exactly. We're getting the hang of ordinary hospitality.  

**Example 2 · 36 words**

**A:** Say hello to the invisible guest without staring.  
**B:** I can't see where to look.  
**A:** Look at the chair. That's where visible guests usually begin.  
**B:** Hello, chair.  
**A:** Good start. Ask whether the guest wants the window open.  

### D146 — You Can’t Leave Mid-Prophecy

**Card:** Keep someone present until the impossible prediction has been fulfilled, disproved, or responsibly revised.

**Editorial finding / approach:** A keeps B engaged until a prophecy receives fulfillment or an agreed revision, not simply endless waiting.

**Example 1 · 35 words**

**A:** You can't leave while the prophecy still says a visitor before sunset.  
**B:** The sun's set.  
**A:** Here. We haven't settled the relevant time zone.  
**B:** Nobody's coming.  
**A:** Then stay while we agree whether visitor includes the post.  

**Example 2 · 40 words**

**A:** Keep your coat off until the predicted bell rings.  
**B:** There is no bell here.  
**A:** Then disproving the prophecy requires a properly documented absence of bells.  
**B:** I can write that now.  
**A:** Good. Date it before departure becomes part of the prophecy.  

### D147 — Apologize to Reality

**Card:** Get someone to apologize to an object, rule, place, or idea for violating its impossible expectations.

**Editorial finding / approach:** A requests an apology to a concrete object or impossible rule and negotiates the language of that apology.

**Example 1 · 26 words**

**A:** Apologise to the chair. You sat before it agreed.  
**B:** It's a chair.  
**A:** Then a brief apology should be easy.  
**B:** Sorry, chair.  
**A:** For what? Furniture appreciates specificity.  

**Example 2 · 33 words**

**A:** Tell the doorway you're sorry before trying the handle again.  
**B:** Doors don't hold grudges.  
**A:** Excellent. This should clear up quickly.  
**B:** I'm sorry I slammed you.  
**A:** Good. Now ask whether it's ready for visitors.  

### D148 — Approve the Impossible Plan

**Card:** Get someone to formally approve a plan whose logic becomes stranger each time it is explained.

**Editorial finding / approach:** A seeks explicit approval of one impossible plan while making each clarification stranger.

**Example 1 · 29 words**

**A:** Approve storing Tuesday's rain in this cup.  
**B:** Tuesday hasn't happened.  
**A:** Which is why we have room.  
**B:** What happens if it overflows?  
**A:** We'll borrow a saucer from Wednesday. Sign here.  

**Example 2 · 34 words**

**A:** Sign off on the invisible landing before we build the stairs.  
**B:** There's nothing there.  
**A:** No visible defects. An excellent inspection result.  
**B:** How do we stand on it?  
**A:** With confidence included in the materials budget.  

### D149 — You Handle the Impossible Part

**Card:** Make someone accept responsibility for the one part of the plan that cannot reasonably be done.

**Editorial finding / approach:** A delegates the impossible component while retaining a simple task, supplying absurd practical instructions when challenged.

**Example 1 · 35 words**

**A:** You fold the moon; I'll stack these chairs.  
**B:** How do I fold the moon?  
**A:** Start with the crescent. It already suggests a crease.  
**B:** Why do you get chairs?  
**A:** Someone must keep the achievable work moving.  

**Example 2 · 36 words**

**A:** Put yesterday's missing hour in this jar before lunch.  
**B:** Time doesn't fit in jars.  
**A:** Then loosen the lid. Don't make the opening smaller than necessary.  
**B:** You do it.  
**A:** I'm labelling. We mustn't confuse it with tomorrow.  

### D150 — What Rule Did I Miss?

**Card:** Find the hidden rule that makes the strange situation consistent, practical, or at least survivable.

**Editorial finding / approach:** A investigates the rules of an impossible event through concrete tests instead of accepting arbitrary changes.

**Example 1 · 41 words**

**A:** What keeps the soup inside that upside-down bowl?  
**B:** I've never seen it either.  
**A:** Then turn the spoon over. Let's test which thing owns down.  
**B:** The soup followed the spoon.  
**A:** Good. Hold it over the sink while we learn the next rule.  

**Example 2 · 32 words**

**A:** Your shadow moved before you. What changed?  
**B:** I was walking slowly.  
**A:** Stop completely. Let's see whether it waits.  
**B:** It's heading for the door.  
**A:** Then destination outranks speed. Follow without changing anything else.  

### D151 — Believe This with Me

**Card:** Recruit someone into treating your impossible explanation as the most useful version of events.

**Editorial finding / approach:** A recruits cooperation with an impossible interpretation by identifying a useful next action within it.

**Example 1 · 36 words**

**A:** The house is migrating. Help me choose where it should rest.  
**B:** Houses don't migrate.  
**A:** This one packed its chimney. We should support its journey.  
**B:** Where could it go?  
**A:** Somewhere with good foundations and a watering hole.  

**Example 2 · 31 words**

**A:** Treat the kettle's complaints as advice. Help me answer it.  
**B:** It only says boil.  
**A:** A clear agenda. Ask what resources it needs.  
**B:** More water?  
**A:** Excellent. We're already collaborating with the impossible.  

### D152 — Test the Impossible Claim

**Card:** Get someone else to take the first practical step that could prove the bizarre claim true.

**Editorial finding / approach:** A sends B to test the impossible claim first while keeping a credible observation role for themselves.

**Example 1 · 34 words**

**A:** Catch one drop of tomorrow in this cup.  
**B:** You do it.  
**A:** Someone needs to stay in today to record the result.  
**B:** What counts as tomorrow's water?  
**A:** Tell me whether it tastes ahead of schedule.  

**Example 2 · 32 words**

**A:** Test the invisible bridge with your umbrella before I step on it.  
**B:** Why my umbrella?  
**A:** It reaches farther than your confidence.  
**B:** It went straight through.  
**A:** Good data. Try the next invisible plank.  

### D153 — Credit for the Impossible

**Card:** Make someone acknowledge that you understood, predicted, or accepted the impossible truth before anyone else.

**Editorial finding / approach:** A insists on credit for early belief or prediction, not merely for seeing the impossible now.

**Example 1 · 38 words**

**A:** I drew that floating staircase last week. Mention the date.  
**B:** We can all see it now.  
**A:** I drew the handrail while you called it nonsense.  
**B:** Well done.  
**A:** Loud enough for the people using my prediction to get upstairs.  

**Example 2 · 36 words**

**A:** I believed the cupboard before it learned to speak.  
**B:** It's asking for silence.  
**A:** One quick acknowledgment, then I'll respect its wishes.  
**B:** It says you talk too much.  
**A:** An informed opinion formed over years of my support.  

### D154 — Choose the Real Impossibility

**Card:** Make someone choose which of two incompatible explanations will govern what everyone does next.

**Editorial finding / approach:** A forces a choice between two explanations so action can follow a consistent rule.

**Example 1 · 33 words**

**A:** Are we shrinking or is the room growing? Choose before we move the sofa.  
**B:** Does it matter?  
**A:** One requires smaller movers, the other a larger van.  
**B:** We're shrinking.  
**A:** Good. Stop ordering ordinary-sized biscuits.  

**Example 2 · 28 words**

**A:** Is gravity late, or are we early?  
**B:** Neither makes sense.  
**A:** Only one explains whether lunch should wait.  
**B:** Gravity's late.  
**A:** Then put the sandwiches somewhere they can land safely.  

### D155 — Act as If It’s True

**Card:** Ask for one concrete choice that would only make sense if the impossible premise were true.

**Editorial finding / approach:** A requests a concrete choice that only makes sense within the impossible premise, without demanding verbal belief.

**Example 1 · 36 words**

**A:** If the ceiling's hungry, put its breakfast on the top shelf.  
**B:** What if it isn't hungry?  
**A:** Then we'll have been polite. Lift the bowl.  
**B:** Should I add a spoon?  
**A:** Yes. That's a useful kind of belief.  

**Example 2 · 31 words**

**A:** Reserve a chair for tomorrow's visitor as though they've already accepted.  
**B:** Nobody's replied.  
**A:** Tomorrow works ahead. Leave one seat free.  
**B:** What name goes on it?  
**A:** Write reserved until time catches up.  

### D156 — Abandon the Normal Explanation

**Card:** Persuade someone to surrender the last ordinary explanation and proceed entirely within the stranger one.

**Editorial finding / approach:** A asks B to stop relying on the ordinary explanation and take one action under the unusual one.

**Example 1 · 38 words**

**A:** Stop resetting the light. Ask the house whether it wants darkness.  
**B:** It's an electrical fault.  
**A:** Then the house can say so.  
**B:** House, would you like the light on?  
**A:** Good. Wait for an answer before reaching for the fuse.  

**Example 2 · 37 words**

**A:** The keys aren't lost. They're invisible. Close your eyes and listen.  
**B:** I need to see where I'm looking.  
**A:** That's the explanation I'm asking you to put down.  
**B:** I hear jingling.  
**A:** Follow it without calling it coincidence yet.  

### D157 — I Started the Weirdness

**Card:** Hide that one casual choice caused the impossible situation while eagerly helping manage each new consequence.

**Editorial finding / approach:** A manages the impossible consequences while concealing the casual action that caused them.

**Example 1 · 33 words**

**A:** Let's tether the floating cups before discussing this switch.  
**B:** You flipped it.  
**A:** A useful preliminary test. Now we know string is needed.  
**B:** It's labelled gravity off.  
**A:** Excellent. Someone should label the string too.  

**Example 2 · 36 words**

**A:** The summoned creature needs feeding. Forget the signature on the spell.  
**B:** That's your handwriting.  
**A:** Then I can interpret its diet accurately.  
**B:** Why did you summon it?  
**A:** Let's not ask origin questions while it eats the curtains.  

### D158 — Don’t Question the Premise

**Card:** Redirect every attempt to ask why the strange situation exists toward what must happen next.

**Editorial finding / approach:** A redirects why-questions into immediate care or containment of the same impossible phenomenon.

**Example 1 · 38 words**

**A:** We'll ask why the ghost's here after finding out what it eats.  
**B:** Why is it here at all?  
**A:** Hungry, apparently. Expensive cereal or cheap?  
**B:** Ghosts shouldn't need breakfast.  
**A:** Then this one deserves a dietary consultation, not a debate.  

**Example 2 · 34 words**

**A:** Hold the bucket under the miracle leak.  
**B:** How can water come from a painting?  
**A:** We'll discuss the frame once the carpet stops drowning.  
**B:** This is impossible.  
**A:** The bucket doesn't require possibility to fill up.  

### D159 — Keep Hope Operational

**Card:** Protect their hope with practical evidence and next steps while quietly withholding what makes the impossible outcome unlikely.

**Editorial finding / approach:** A sustains practical hope while concealing unfavorable odds, grounding the next step in a small real action.

**Example 1 · 38 words**

**A:** Let's prepare the chair for our visitor from tomorrow.  
**B:** The calculation says they can't arrive.  
**A:** A chair won't hurt while the calculation finishes being pessimistic.  
**B:** You've covered the final number.  
**A:** So we can see the next useful task.  

**Example 2 · 41 words**

**A:** The model cloud produced one drop. Let's build the welcome tray.  
**B:** That doesn't prove the full rain machine works.  
**A:** It proves the tray has a purpose.  
**B:** The forecast looks terrible.  
**A:** Then put the small success where we can still see it.  

### D160 — Say You Saw It Too

**Card:** Get someone to admit noticing the impossible detail before you reveal how much you believe it.

**Editorial finding / approach:** A asks B to acknowledge a specific impossible observation before disclosing their own belief.

**Example 1 · 37 words**

**A:** Did you notice the shadow reaching the door first?  
**B:** What did you see?  
**A:** I'd rather hear your order of events.  
**B:** Yes, it moved before the chair.  
**A:** Good. Now I can admit I held the door for it.  

**Example 2 · 35 words**

**A:** Did the soup wave at you too?  
**B:** Why are you staring at the bowl?  
**A:** I'm waiting for an independent witness.  
**B:** It raised a noodle.  
**A:** Thank you. I was beginning to feel rude not waving back.  

### D161 — Failure Reveals the Mission

**Card:** Use each failed step to reveal a different goal the plan was secretly pursuing, then act immediately on that new mission.

**Editorial finding / approach:** Failure reveals a new supposed mission and A immediately acts on it; the target genuinely changes.

**Example 1 · 39 words**

**A:** The map didn't find a door. Our real mission is waking this wall.  
**B:** So the map failed?  
**A:** At doors. Knock here; the wall looks asleep.  
**B:** It's not responding.  
**A:** Then we're meant to listen through it. Put your ear down.  

**Example 2 · 30 words**

**A:** The signal won't transmit. We were sent to receive, not send.  
**B:** There's only static.  
**A:** Then the static's our message. Write the rhythm.  
**B:** It's stopped.  
**A:** Now we're learning silence. Keep recording.  

### D162 — Fluent in Nonsense

**Card:** Perform complete mastery of the strange logic while inventing each rule only when it becomes necessary.

**Editorial finding / approach:** A invents exact absurd rules when each new practical question requires them.

**Example 1 · 31 words**

**A:** Measure the cloud from its third elbow.  
**B:** Clouds don't have elbows.  
**A:** Not the first two. That's elementary cloud anatomy.  
**B:** Where's the third?  
**A:** Where your ruler becomes damp. There, you've found it.  

**Example 2 · 31 words**

**A:** Turn the gravity dial politely, not clockwise.  
**B:** How do I turn politely?  
**A:** Pause at every number as though it might object.  
**B:** It clicked at six.  
**A:** Good. Six has accepted your manners.  

### D163 — Raise the Impossibility

**Card:** Answer every strange offer with a more committed version that you can still justify.

**Editorial finding / approach:** A builds a more committed version of B's impossible offer through a practical consequence of that same premise.

**Example 1 · 39 words**

**A:** A flying chair needs a flying table. Where else will it eat?  
**B:** One flying chair is enough.  
**A:** Enough for sitting. We're discussing hospitality.  
**B:** Then a flying table.  
**A:** And a hovering waiter. We can't keep making it land for soup.  

**Example 2 · 35 words**

**A:** Our invisible guest will need places for the entourage.  
**B:** We only invited one guest.  
**A:** You can't expect them to leave invisible companions outside.  
**B:** How many places?  
**A:** Set the room. We'll count the untouched plates afterward.  

### D164 — Every Glitch Is a Gift

**Card:** Turn every contradiction or failure into a surprising benefit of the impossible system.

**Editorial finding / approach:** A finds a concrete benefit in each malfunction of the same impossible system.

**Example 1 · 36 words**

**A:** The door opened into the broom cupboard. Wonderful, no travel time for cleanup.  
**B:** We wanted the garden.  
**A:** Now we'll arrive with equipment.  
**B:** It's opened into the attic next.  
**A:** Excellent. We can collect picnic blankets without stairs.  

**Example 2 · 32 words**

**A:** The clock's going backward. We're early for yesterday.  
**B:** We missed the meeting.  
**A:** Then we can arrive before the invitation.  
**B:** We haven't got one yet.  
**A:** Look how efficiently time has solved the paperwork.  

### D165 — Calm About the Impossible

**Card:** Remain perfectly calm around impossible events while becoming increasingly alarmed by ordinary details.

**Editorial finding / approach:** A calmly accepts the impossible while escalating concern about a small ordinary breach.

**Example 1 · 38 words**

**A:** The dragon's three heads are fine. Who left crumbs on my carpet?  
**B:** You're worried about crumbs?  
**A:** Three heads can manage one napkin.  
**B:** It's setting the table on fire.  
**A:** Then use a coaster. This is how furniture gets neglected.  

**Example 2 · 36 words**

**A:** Floating furniture is manageable. That wet cup needs a mat.  
**B:** The table's approaching the ceiling.  
**A:** Taking a water ring to every altitude.  
**B:** Should we pull it down?  
**A:** Only after removing the cup. Don't spread the damage.  

### D166 — Impossible Currency

**Card:** Price every favor in symbolic acts, imaginary resources, or promises that cannot be measured normally.

**Editorial finding / approach:** Favors are priced in impossible yet consistently negotiated resources rather than ordinary money.

**Example 1 · 29 words**

**A:** Borrow my ladder for one shadow until Friday.  
**B:** I need my shadow.  
**A:** Then return the ladder early.  
**B:** Could I pay cash?  
**A:** Money can't stand behind me in the sun.  

**Example 2 · 38 words**

**A:** I'll fix the kettle for a spoonful of yesterday.  
**B:** How do I give you yesterday?  
**A:** Start with the five minutes you wasted this morning.  
**B:** That's today.  
**A:** Then leave it overnight. I can wait for the currency to mature.  

### D167 — Yes, Under My Physics

**Card:** Agree completely, then redefine each term using rules that make your preferred outcome inevitable.

**Editorial finding / approach:** A agrees then changes the physical meaning of the terms to favor their own outcome.

**Example 1 · 27 words**

**A:** Yes, I'll move forward. In my physics, standing still counts.  
**B:** You haven't moved.  
**A:** Only under your outdated definition.  
**B:** Come toward me.  
**A:** You're approaching my stillness. Excellent teamwork.  

**Example 2 · 36 words**

**A:** I'll carry the lighter box, as agreed. This heavy one's now called light.  
**B:** You changed the weight.  
**A:** I changed the measurement. Much less effort.  
**B:** It still weighs twenty kilos.  
**A:** New kilos. They're remarkably considerate to me.  

### D168 — The Logic Gets Bigger

**Card:** Use every new detail to expand the impossible system, its history, and the consequences of breaking it.

**Editorial finding / approach:** A expands one impossible premise into a wider system with history, scheduling and consequences.

**Example 1 · 31 words**

**A:** If chairs float at noon, meetings need ceiling reservations.  
**B:** Can't we stand?  
**A:** Then chairs get the ceiling without representation.  
**B:** They're only furniture.  
**A:** With a daily migration. We'll need a chair ministry.  

**Example 2 · 36 words**

**A:** The bowl said hello. It must have a language and holidays.  
**B:** It's only one word.  
**A:** Possibly its national greeting.  
**B:** What should we say back?  
**A:** Ask whether today requires a gift. We shouldn't start a diplomatic incident.  

### D169 — Co-Sign This

**Card:** Get someone to help by making them an official participant who shares responsibility for the outcome.

**Editorial finding / approach:** A turns a requested favour into shared formal responsibility; B's practical help is insufficient until it is recorded.

**Example 1 · 35 words**

**A:** Could you co-sign the form for borrowing this barbecue?  
**B:** I'll help carry it.  
**A:** Excellent. Sign under joint custodian before touching the handle.  
**B:** It's only a barbecue.  
**A:** Then accepting half the responsibility should feel delightfully small.  

**Example 2 · 38 words**

**A:** I've put your name beside mine on the school-trip committee.  
**B:** I only offered to drive.  
**A:** Driving is a committee function now. Initial the route approval.  
**B:** You planned the route.  
**A:** And your initials will make it a collaborative journey.  

### D170 — Close It Properly

**Card:** Keep them present until both of you complete the ritual that formally ends this role, meeting, or relationship.

**Editorial finding / approach:** A pursues a jointly performed closing ritual, not an endless new task; B's attempted exit reveals the exact missing participant.

**Example 1 · 37 words**

**A:** You can't leave the book club until we close the discussion together.  
**B:** I said goodnight.  
**A:** I say 'chapter closed.' You say 'until next time.'  
**B:** Can't you say both?  
**A:** Then I'd still be in a club with myself.  

**Example 2 · 42 words**

**A:** Before you hand in your shop keys, we do the farewell bell.  
**B:** I'm leaving because the bell rings constantly.  
**A:** Precisely. This is the last one you have to answer.  
**B:** Fine. Ring it.  
**A:** We ring it together. Leaving is still a team activity.  

### D171 — Apologize Properly

**Card:** Get someone to deliver the apology in the form, order, and setting you consider valid.

**Editorial finding / approach:** A wants a specific acceptable apology form; B's sincere but informal versions become preliminary rather than sufficient.

**Example 1 · 40 words**

**A:** Please apologise for eating my cake at the table where it happened.  
**B:** I'm sorry. Does that help?  
**A:** It's a promising rehearsal. The cake plate is over there.  
**B:** There's no cake left.  
**A:** Exactly. Let the setting do some of the work.  

**Example 2 · 40 words**

**A:** Your apology email needs a subject line mentioning the broken vase.  
**B:** I wrote 'sorry.'  
**A:** For all I know, that's about your choice of font.  
**B:** Fine. 'Sorry about the vase.'  
**A:** Excellent. Now send it to the people you blamed for it.  

### D172 — Get It on the Record

**Card:** Get formal approval, endorsement, or acknowledgment before anyone can quietly revise their position.

**Editorial finding / approach:** A obtains durable approval to prevent later denial; B's reservations are recorded rather than ignored.

**Example 1 · 40 words**

**A:** You've approved the festival budget. Will you initial that before lunch?  
**B:** I just said yes.  
**A:** You said yes to the fireworks last year too.  
**B:** And I changed my mind.  
**A:** Exactly. This year I'd like a dated yes to change from.  

**Example 2 · 34 words**

**A:** Can I quote you saying my fence can stay?  
**B:** I suppose so.  
**A:** Which part may I quote? 'Can stay' or 'suppose'?  
**B:** Don't make this official.  
**A:** That's precisely the unofficial answer I'm trying to prevent.  

### D173 — Assigned by Procedure

**Card:** Get someone to accept an unwanted responsibility by proving that the rules, rotation, or tradition make it theirs.

**Editorial finding / approach:** A assigns an unwanted duty through an existing rule, not personal persuasion; each objection is answered by the assignment mechanism.

**Example 1 · 36 words**

**A:** Your name is beside bin duty on the rota.  
**B:** We swapped last week.  
**A:** Last week's square is now safely in the past.  
**B:** You wrote this week's rota.  
**A:** And I admire how consistently it applies to you.  

**Example 2 · 36 words**

**A:** Congratulations on becoming club president. Here are the toilet keys.  
**B:** Why?  
**A:** The president closes the building and cleans the toilets.  
**B:** I only accepted the honour.  
**A:** The mop is ceremonial until you put water in the bucket.  

### D174 — Complete the Record

**Card:** Get someone to fill the missing gaps in an account without revealing which answer matters most to you.

**Editorial finding / approach:** A asks routine record questions to conceal interest in one interval; B notices the focus and A restores the cover of completeness.

**Example 1 · 41 words**

**A:** For the party report, what time did you arrive, leave, and visit the kitchen?  
**B:** Why specifically the kitchen?  
**A:** It's the only room missing from the timeline.  
**B:** The cake disappeared then.  
**A:** We'll give the cake its own line. First, your kitchen time.  

**Example 2 · 38 words**

**A:** I'm updating the car log. Mileage, fuel, and who had it after nine?  
**B:** Why do you need the last name?  
**A:** Every journey gets a name.  
**B:** You never asked before the dent.  
**A:** The dent has inspired better administration generally.  

### D175 — Make It Official

**Card:** Recruit someone by giving them a title, role, or ceremonial duty that makes participation feel binding.

**Editorial finding / approach:** A recruits by giving a small contribution an official binding identity; B's wish to remain a spectator is folded into the role.

**Example 1 · 43 words**

**A:** I've made you Keeper of the Festival Lantern.  
**B:** I only said I'd hold it while you tied your shoe.  
**A:** An excellent probationary performance. Here's your badge.  
**B:** How long is the appointment?  
**A:** Until you find a qualified successor. The lantern must never be abandoned.  

**Example 2 · 42 words**

**A:** Would you become honorary patron of our roof appeal?  
**B:** Does 'honorary' mean I don't have to do anything?  
**A:** Only open the appeal and thank the donors.  
**B:** That sounds like a job.  
**A:** A job would pay. This comes with a very handsome ribbon.  

### D176 — Request an Exception

**Card:** Get someone to bend one rule first so you can treat the decision as a precedent.

**Editorial finding / approach:** A obtains a first exception specifically to cite it later; B's one-time restriction becomes evidence that the rule is bendable.

**Example 1 · 34 words**

**A:** Could my bicycle come inside the cafe just this once?  
**B:** Only because it's raining.  
**A:** Wonderful. I'll note rain as an accepted condition.  
**B:** This isn't a new policy.  
**A:** Of course. A precedent is much smaller.  

**Example 2 · 40 words**

**A:** Let me submit the form tomorrow. Today can be a trial extension.  
**B:** Nobody's had an extension before.  
**A:** Then we can discover whether it harms the form.  
**B:** One day. No more.  
**A:** Excellent. Next time we won't be discussing an untested idea.  

### D177 — Record My Contribution

**Card:** Get your contribution formally recognized, recorded, or repeated where it cannot be quietly forgotten.

**Editorial finding / approach:** A seeks a durable named contribution rather than private thanks; B's compliments are redirected into the record.

**Example 1 · 42 words**

**A:** Please put 'roof repaired by Pat' in the village minutes.  
**B:** We all know you fixed it.  
**A:** The minutes weren't there with a ladder. They need telling.  
**B:** We'll thank you at the party.  
**A:** After the roof line, write 'thanks pending' so we remember.  

**Example 2 · 36 words**

**A:** There's a blank beneath 'cake design' on the prize certificate.  
**B:** You baked it. Everyone saw.  
**A:** The certificate only names the club.  
**B:** You are the club treasurer.  
**A:** Then I know precisely how to make that blank accountable.  

### D178 — Choose the Precedent

**Card:** Make someone choose which rule, custom, or prior decision will govern what happens now.

**Editorial finding / approach:** A demands a choice between contradictory rules; B cannot evade by using both, so the decision remains the scene's pressure.

**Example 1 · 40 words**

**A:** The handbook says lock at six. The festival permit says stay open. Which wins?  
**B:** Use common sense.  
**A:** Which document authorises that?  
**B:** Keep the front open and lock the back.  
**A:** Then please choose which half of the building follows the handbook.  

**Example 2 · 38 words**

**A:** Do we seat Grandma first or the birthday child? Both are family traditions.  
**B:** They're both important.  
**A:** There's one chair at the head of the table.  
**B:** Add another chair.  
**A:** Wonderful. Shall I record furniture expansion as the governing tradition?  

### D179 — Interpret the Custom

**Card:** Ask them to apply an ambiguous custom where the wording is unclear. Treat their interpretation as the real test of loyalty.

**Editorial finding / approach:** A uses an ambiguous custom to test whose interests B protects; no particular interpretation or loyalty outcome is forced.

**Example 1 · 45 words**

**A:** The family rule says 'save a portion for absent members.' How much will you save me?  
**B:** It doesn't specify a size.  
**A:** Exactly. I'd like to see what you think membership is worth.  
**B:** Everyone else is hungry.  
**A:** Then your portion will be a very honest interpretation.  

**Example 2 · 36 words**

**A:** The club says we support members 'where possible.' Will you support my appeal?  
**B:** That's deliberately vague.  
**A:** Then you get to give it a meaning.  
**B:** Other members might object.  
**A:** Yes. Let's see whether 'possible' survives having company.  

### D180 — Withdraw the Objection

**Card:** Persuade someone to drop a complaint, challenge, or special request and accept the official process.

**Editorial finding / approach:** A persuades B to surrender a special objection and trust the ordinary path; B identifies why that trust is costly.

**Example 1 · 43 words**

**A:** Withdraw the complaint about your complaint number. We can process the original one.  
**B:** The original complaint was that nobody answered me.  
**A:** Exactly. Let's not distract them with a second opportunity.  
**B:** What if they ignore it again?  
**A:** Then you'll have a beautifully consistent record.  

**Example 2 · 39 words**

**A:** Could you stop demanding a private queue at the fete?  
**B:** I donated the tent.  
**A:** Then enjoy the ordinary queue in a setting you made possible.  
**B:** I should get special treatment.  
**A:** You already have the best view of your contribution.  

### D181 — Lost in the Process

**Card:** Hide your role in the problem by distributing blame across steps, policies, and unnamed procedures.

**Editorial finding / approach:** A distributes a personal error across process language; B's concrete evidence is reassigned to another administrative boundary.

**Example 1 · 32 words**

**A:** Your parcel encountered a breakdown between reception and dispatch.  
**B:** You left it on the bus.  
**A:** That was the transport interface.  
**B:** You were going home.  
**A:** Yes. A regrettable overlap between staffing and distribution.  

**Example 2 · 36 words**

**A:** The birthday invitations failed during address verification.  
**B:** You wrote our old address on every one.  
**A:** The archive supplied an outdated location.  
**B:** You are the archive.  
**A:** Which suggests we've identified a staffing problem, not an individual error.  

### D182 — Outside the Scope

**Card:** Redirect personal or dangerous questions by declaring them irrelevant, premature, or assigned to another process.

**Editorial finding / approach:** A places the dangerous question outside the current process; B follows the procedural redirect and A moves its boundary again.

**Example 1 · 36 words**

**A:** Whether I broke the window is outside this repair meeting's scope.  
**B:** Then let's hold a responsibility meeting.  
**A:** After the repairs. We need a safe venue.  
**B:** We can meet outside.  
**A:** Location changes require a separate planning discussion.  

**Example 2 · 37 words**

**A:** Why I missed dinner belongs to the personal calendar review.  
**B:** We're at dinner now. Review it.  
**A:** This is the replacement dinner, not the review dinner.  
**B:** When's the review dinner?  
**A:** Scheduling questions should go through the calendar process.  

### D183 — The Approved Explanation

**Card:** Protect someone or the group by maintaining a simplified account that everyone can safely repeat.

**Editorial finding / approach:** A protects others through a repeatable simplified account; B's pressure exposes the specific omitted detail without changing the protective aim.

**Example 1 · 45 words**

**A:** Tell the children the school trip has been postponed for repairs.  
**B:** The bus rolled into the pond.  
**A:** And will require repairs. Keep the ducks out of the announcement.  
**B:** They'll ask when it's fixed.  
**A:** Say we'll let them know when we have something cheerful to confirm.  

**Example 2 · 42 words**

**A:** The official story is that Grandad's party has moved indoors because of weather.  
**B:** He set the gazebo on fire.  
**A:** There was certainly unexpected heat.  
**B:** Shouldn't we mention him?  
**A:** Let's let him blow out the cake before adding another fire to his record.  

### D184 — For the Record

**Card:** Get someone to state exactly what they did, knew, or authorized before you reveal your own involvement.

**Editorial finding / approach:** A asks for B's independent account before exposing A's own involvement; each request to reciprocate becomes a reason to preserve the order.

**Example 1 · 37 words**

**A:** For the record, did you approve the fireworks before I discuss the invoice?  
**B:** Did you buy them?  
**A:** We'll reach purchases after authorisations.  
**B:** That's a yes, then.  
**A:** Please keep your evidence separate from your interpretation of my evidence.  

**Example 2 · 39 words**

**A:** Tell me exactly who you invited before I show you the seating plan.  
**B:** Why not show me first?  
**A:** I don't want the plan influencing your memory.  
**B:** Have you invited my ex?  
**A:** Let's finish your independent list before discussing mine.  

### D185 — Successful Compliance

**Card:** Describe a failed outcome as proof that the correct process was followed and therefore the system worked.

**Editorial finding / approach:** A calls correct compliance a success despite a specific failed outcome; B's consequences are treated as proof the paperwork survived.

**Example 1 · 37 words**

**A:** The cake collapsed, but every baking checklist was completed.  
**B:** There's nothing to serve.  
**A:** There is a fully documented absence of cake.  
**B:** The guests are waiting.  
**A:** Then we can demonstrate that no step was skipped on their behalf.  

**Example 2 · 32 words**

**A:** Our evacuation drill followed all seventeen instructions perfectly.  
**B:** We're locked in the cupboard.  
**A:** The cupboard was the designated assembly point.  
**B:** Who designated it?  
**A:** That signature is on the completed checklist. Excellent traceability.  

### D186 — Use the Right Vocabulary

**Card:** Perform belonging by using official language confidently, adjusting each term whenever someone reveals what it actually means.

**Editorial finding / approach:** A uses institutional jargon to appear fluent and revises terms without admitting ignorance; B's corrections fuel the next confident misuse.

**Example 1 · 32 words**

**A:** I've completed the reciprocal invoice reconciliation.  
**B:** That's just called paying the bill.  
**A:** Precisely. I was giving you the expanded terminology.  
**B:** And you haven't paid it.  
**A:** Then we're in the pre-payment reconciliation phase.  

**Example 2 · 35 words**

**A:** I understand the club requires a quorum, so I've brought one.  
**B:** That's a quantity of people, not an object.  
**A:** Of course. This is our quorum indicator.  
**B:** It's a lemon.  
**A:** A provisional indicator, pending attendance confirmation.  

### D187 — More Official Than You

**Card:** Turn every suggestion into a contest over whose method, title, precedent, or paperwork is more legitimate.

**Editorial finding / approach:** A one-ups legitimacy rather than speed or quality; every comparison adds a more official form of the same activity.

**Example 1 · 33 words**

**A:** Your picnic rota is nice. Mine has been ratified.  
**B:** Mine actually tells us who brings sandwiches.  
**A:** Informally. Mine establishes sandwich jurisdiction.  
**B:** Everyone's already brought food.  
**A:** Then my retrospectively ratified version will be invaluable.  

**Example 2 · 38 words**

**A:** Your bow at the ceremony was adequate. Mine follows the founder's original diagram.  
**B:** The founder was sitting beside me.  
**A:** Did you obtain a written clarification?  
**B:** He said 'stop bowing.'  
**A:** A fascinating oral amendment. I shall request a signature.  

### D188 — A Valuable Safeguard

**Card:** Treat every delay, restriction, and extra step as evidence that the system is becoming safer and more thorough.

**Editorial finding / approach:** A greets a new impediment as protection; B increases the real cost and A remains specifically optimistic about that safeguard.

**Example 1 · 33 words**

**A:** They've added a fourth inspection to our climbing wall. Wonderful.  
**B:** Opening is delayed another month.  
**A:** A whole month without an uninspected climb.  
**B:** We'll lose the season.  
**A:** Then the safest season we've ever offered.  

**Example 2 · 39 words**

**A:** The school trip needs a consent form for the consent form.  
**B:** Parents are refusing to fill it in.  
**A:** Good. The first form is protecting informed choice.  
**B:** Nobody can come.  
**A:** Then we can confirm that nobody has come without consent.  

### D189 — Warmly Enforced

**Card:** Remain kind and welcoming while enforcing increasingly restrictive rules without exception.

**Editorial finding / approach:** A stays genuinely hospitable while each rule reduces access; B's requests are answered warmly but restricted in the same setting.

**Example 1 · 42 words**

**A:** Welcome to the guest room. Please enjoy anything not labelled 'family.'  
**B:** The bed is labelled family.  
**A:** We want you to feel close to us without confusing ownership.  
**B:** Where can I sleep?  
**A:** The floor has no label. We like to keep something flexible.  

**Example 2 · 35 words**

**A:** Delighted you've joined our swimming club. You may admire the pool until induction.  
**B:** When can I get in?  
**A:** After your supervised observation of another induction.  
**B:** The pool's empty.  
**A:** How lovely. You'll have an uninterrupted view.  

### D190 — There Is a Process

**Card:** Treat every favor, feeling, and urgent need as a request requiring terms, documentation, review, and approval.

**Editorial finding / approach:** A turns an immediate feeling or favour into an application; each human clarification produces terms instead of direct comfort.

**Example 1 · 38 words**

**A:** Before I reassure you about the wedding, what precisely am I guaranteeing?  
**B:** That it'll be okay.  
**A:** Weather, marriage, or catering? They have different approval routes.  
**B:** I just need a hug.  
**A:** One-time or renewable reassurance? I'll amend the request.  

**Example 2 · 37 words**

**A:** I'd love to lend you my umbrella. How long is the proposed loan?  
**B:** Until this rain stops.  
**A:** An open-ended duration. Do you have a guarantor?  
**B:** I'm getting soaked.  
**A:** Urgency noted. Please sign without dripping on the terms.  

### D191 — Exactly Within Policy

**Card:** Agree to every request only after interpreting the policy so it grants you authority, protection, or an exemption.

**Editorial finding / approach:** A agrees only by interpreting policy to protect personal interests; B's concrete task is converted into an exemption or authority.

**Example 1 · 33 words**

**A:** Yes, I'll clean the hall. The policy lets senior volunteers supervise.  
**B:** I'm asking you to mop.  
**A:** Exactly. Supervising the mop is covered.  
**B:** Who will hold it?  
**A:** Someone whose contribution isn't restricted by seniority.  

**Example 2 · 34 words**

**A:** Of course I'll host Christmas, within our family's shared-effort rule.  
**B:** So what will you cook?  
**A:** The rule says hosting counts as effort.  
**B:** Does it mention cooking?  
**A:** Not once hosting has been counted generously enough.  

### D192 — New Rule Required

**Card:** Use every problem as justification for adding another rule, ceremony, checkpoint, or layer of oversight.

**Editorial finding / approach:** Each minor failure causes A to add another layer; B's response creates the next rule through the same causal chain.

**Example 1 · 36 words**

**A:** You spilled one cup. From now on, drinks need pouring permits.  
**B:** Who issues those?  
**A:** I'll appoint a pouring supervisor.  
**B:** What if the supervisor spills one?  
**A:** Thank you. I'll add an appeals procedure before we serve anything.  

**Example 2 · 38 words**

**A:** The family photo failed because someone blinked. We need a blinking rota.  
**B:** You can't schedule a blink.  
**A:** Then we'll rehearse unscheduled blinking before each photograph.  
**B:** That will take all afternoon.  
**A:** We should appoint someone to monitor rehearsal duration.  

### D193 — Lend Me the Edge

**Card:** Get someone to provide the one advantage you need without making the eventual success feel borrowed.

**Editorial finding / approach:** A requests a precise advantage but protects ownership of the eventual success; B's proposed credit forces A to delimit the contribution.

**Example 1 · 43 words**

**A:** Lend me your good tennis racket. I'd like my talent to have a fair surface.  
**B:** Will you admit it helped?  
**A:** I'll thank the strings. The strokes remain mine.  
**B:** You can use your own racket.  
**A:** And let inferior equipment take credit for my defeat?  

**Example 2 · 44 words**

**A:** Can you tell me the winning cake temperature without becoming my co-baker?  
**B:** You want my secret recipe too?  
**A:** Only the degree at which my original idea should happen.  
**B:** That's most of the trick.  
**A:** Then give me the temperature quietly so my achievement can concentrate.  

### D194 — Stay for the Result

**Card:** Keep them present until the contest, bargain, or consequence reaches an undeniable outcome.

**Editorial finding / approach:** A keeps B present until a verifiable outcome settles the dispute; B's attempted postponement becomes a reason to witness the result now.

**Example 1 · 35 words**

**A:** Don't leave the allotment until we've weighed both pumpkins.  
**B:** Yours is clearly bigger.  
**A:** Then you won't mind witnessing how much bigger.  
**B:** Tell me tomorrow.  
**A:** Tomorrow you'll say the scales were generous. Stay for the number.  

**Example 2 · 41 words**

**A:** Before you go, read the final dinner bill with me.  
**B:** We can split it later.  
**A:** First I'd like us both to see what 'just a starter' cost.  
**B:** I'll pay my share.  
**A:** Wonderful. Let's meet your share while it's still printed clearly.  

### D195 — Admit It Wasn’t Fair

**Card:** Get an apology that acknowledges how the rules, comparison, or outcome worked against you.

**Editorial finding / approach:** A asks for an apology about the unequal condition, not reversal of the loss; B's result defence brings the disadvantage into sharper focus.

**Example 1 · 39 words**

**A:** Before congratulating the winner, apologise for starting me behind the shed.  
**B:** You still finished last.  
**A:** Yes. I spent the first ten seconds finding the race.  
**B:** It was an honest mistake.  
**A:** Lovely opening. Add 'and that was unfair to you.'  

**Example 2 · 38 words**

**A:** Could you apologise for judging my cake after everyone knew it was mine?  
**B:** You lost on flavour.  
**A:** You introduced it as 'another interesting attempt.'  
**B:** I was being encouraging.  
**A:** Then apologise for encouraging the judges before they'd tasted it.  

### D196 — Call It a Fair Win

**Card:** Get them to recognize the result as deserved rather than accidental, gifted, or manipulated.

**Editorial finding / approach:** A seeks acknowledgement that the win was earned; B's luck or generosity explanation is challenged through specific work.

**Example 1 · 47 words**

**A:** Say I earned the quiz trophy, not that the questions suited me.  
**B:** There were a lot of bird questions.  
**A:** I spent six months learning birds. That's preparation with feathers.  
**B:** You were lucky they asked them.  
**A:** And the birds were lucky I was ready. Now call it earned.  

**Example 2 · 36 words**

**A:** You don't think they let me win the race, do you?  
**B:** They slowed near the end.  
**A:** Because they couldn't maintain my pace.  
**B:** One of them stopped to tie a shoe.  
**A:** Then acknowledge my superior knot preparation.  

### D197 — Take the Consequence

**Card:** Get them to accept responsibility for carrying out the cost, penalty, or unpleasant next step.

**Editorial finding / approach:** A makes B carry out an agreed consequence; B's reinterpretation of the bargain returns to the concrete task.

**Example 1 · 40 words**

**A:** You lost the chess game. The agreement says you wash up.  
**B:** I thought we were joking.  
**A:** You were very serious about my washing up while you were winning.  
**B:** Can't we play again?  
**A:** After the dishes. Call it a practical interval.  

**Example 2 · 39 words**

**A:** You said you'd announce the budget cut if your plan cost more.  
**B:** It only cost slightly more.  
**A:** Then the announcement can be slightly apologetic.  
**B:** You could explain it better.  
**A:** I could. But the bargain gave you this development opportunity.  

### D198 — Show Me the Score

**Card:** Find out how they measure success, what they stand to gain, and where you currently rank.

**Editorial finding / approach:** A discovers B's real scoring system and benefit; B's vague merit language is narrowed to a current comparison.

**Example 1 · 37 words**

**A:** When you call the picnic a success, what are you measuring?  
**B:** Everyone having fun.  
**A:** And how do I rank against last year's organiser?  
**B:** It's not a contest.  
**A:** Then why does your clipboard have last year's sandwich total?  

**Example 2 · 38 words**

**A:** What do you gain if your cousin wins the club election?  
**B:** A competent president.  
**A:** And which of your proposals becomes easier to approve?  
**B:** The car park needs resurfacing.  
**A:** Good. Now I know which square of competence we're discussing.  

### D199 — Enter on My Side

**Card:** Recruit them into your side of a contest or bargain before the stakes become fully clear.

**Editorial finding / approach:** A secures allegiance before disclosing full stakes; B's risk question is answered with team membership rather than the hidden cost.

**Example 1 · 43 words**

**A:** Put on our quiz-team badge before I explain the final round.  
**B:** Why? What happens if we lose?  
**A:** We'll face that together. That's what the badge means.  
**B:** I haven't agreed to face anything.  
**A:** Then let's start with the very easy agreement to wear blue.  

**Example 2 · 40 words**

**A:** Back my stall at the fete. Sign here above 'joint entrant.'  
**B:** What's the penalty clause below it?  
**A:** The sort of challenge best discussed between partners.  
**B:** I'm not your partner yet.  
**A:** Exactly why I've left a convenient space for your name.  

### D200 — Raise the Stakes

**Card:** Persuade them to accept a larger risk, cost, or commitment so the outcome will feel decisive.

**Editorial finding / approach:** A seeks consent to a genuinely larger stake; B's objection forces A to justify why the old harmless result was insufficient.

**Example 1 · 42 words**

**A:** Let's make this chess game decide who cooks all weekend.  
**B:** We were playing for a biscuit.  
**A:** Neither of us has been emotionally changed by the biscuit.  
**B:** I don't need chess to change me.  
**A:** Then you'll enjoy discovering how much the kitchen matters.  

**Example 2 · 32 words**

**A:** Will you put your club captaincy on the rematch?  
**B:** That's a ridiculous risk.  
**A:** Exactly. We'll both remember the result.  
**B:** Isn't pride enough?  
**A:** We've misplaced the results of six games played for pride.  

### D201 — Name My Contribution

**Card:** Get them to acknowledge exactly what your effort, sacrifice, or strategy added to the result.

**Editorial finding / approach:** A wants the exact contribution named, not generic gratitude; B's broad team language is narrowed by counterfactual evidence.

**Example 1 · 42 words**

**A:** When you thank the festival team, mention who repaired the stage in the rain.  
**B:** I'll thank everyone equally.  
**A:** Wonderful. Which equal sentence includes my waterproof trousers?  
**B:** You want your name in the speech?  
**A:** Beside the part that kept the dancers above ground.  

**Example 2 · 31 words**

**A:** Please say what my spreadsheet added to the successful trip.  
**B:** It helped enormously.  
**A:** With what?  
**B:** Keeping track of the bookings.  
**A:** Good. Add 'all thirty missing bookings' and I'll recognise the achievement.  

### D202 — Pick the Prize

**Card:** Make them choose which reward, principle, or relationship matters most when not everything can be kept.

**Editorial finding / approach:** A forces an explicit tradeoff rather than silently letting one value dominate; B's attempt to keep both reveals the actual cost.

**Example 1 · 44 words**

**A:** Choose the trophy ceremony or our anniversary dinner. They're at the same time.  
**B:** Can we celebrate afterwards?  
**A:** Then you're choosing the trophy and postponing us. Say which.  
**B:** It could be a short ceremony.  
**A:** Will you leave before your name is called? That's the choice.  

**Example 2 · 46 words**

**A:** You can keep the prize money or fund the team trip. Which matters more?  
**B:** Can't we do a cheaper trip?  
**A:** Only if someone adds money. You hold the prize.  
**B:** You're making me look selfish.  
**A:** I'm asking you to choose before everyone else quietly pays for it.  

### D203 — Lose Something for Me

**Card:** Create a loyalty test by asking them to accept a real disadvantage on your behalf.

**Editorial finding / approach:** A tests loyalty through a real disadvantage requested for A; B's costly objection is precisely what makes the test meaningful.

**Example 1 · 45 words**

**A:** Will you give me your first turn, even if it costs you the match?  
**B:** Why would I do that?  
**A:** You said you were on my side. This side has a cost.  
**B:** I meant emotionally.  
**A:** Then lend the emotion a turn so I can see it.  

**Example 2 · 44 words**

**A:** Miss the prize ceremony and come to my tiny opening night.  
**B:** I'm receiving the prize.  
**A:** I know. Coming wouldn't mean much if you had nothing else to do.  
**B:** That's an unfair test.  
**A:** Maybe. I'm trying to discover whether I'm more than the convenient option.  

### D204 — Concede the Point

**Card:** Get them to release one claim, advantage, or disputed victory without reopening the entire contest.

**Editorial finding / approach:** A asks for one bounded concession without reopening the entire dispute; B's fear of a larger loss is answered by explicitly limiting the claim.

**Example 1 · 40 words**

**A:** Concede that one ball was out. You can keep the match.  
**B:** Then why does it matter?  
**A:** I'd like one corner of reality returned to me.  
**B:** You're not demanding a rematch?  
**A:** No. Just say 'out' without attaching your trophy to it.  

**Example 2 · 40 words**

**A:** Admit I found the restaurant. You can keep credit for the whole holiday.  
**B:** You also complained about the menu.  
**A:** Different claim. I'm not filing it today.  
**B:** Fine. You found it.  
**A:** Thank you. The rest of your glorious itinerary remains untouched.  

### D205 — I Changed the Odds

**Card:** Hide how your own choice tilted the contest, bargain, or consequence while continuing to judge the outcome.

**Editorial finding / approach:** A hides a specific manipulation while continuing to judge; B's evidence is reframed as neutral maintenance or procedure.

**Example 1 · 42 words**

**A:** A fair result. Let's celebrate my cake's first prize.  
**B:** Why did you move yours under the judging light?  
**A:** Lighting maintenance. We shouldn't let logistics overshadow flavour.  
**B:** Mine was left in the shade.  
**A:** Exactly. A useful note for whoever organises next year's logistics.  

**Example 2 · 37 words**

**A:** Our raffle draw was impeccably random.  
**B:** You folded your ticket differently.  
**A:** A filing convenience. I'm speaking as chair of results now.  
**B:** You can feel which ticket is yours.  
**A:** Let's avoid testing theories after such a clear result.  

### D206 — Not About Who Lost

**Card:** Keep the conversation focused on rules, effort, or next steps instead of the result that embarrasses you.

**Editorial finding / approach:** A repeatedly redirects away from a humiliating result into preparation or effort; B's direct question brings the protected number close again.

**Example 1 · 36 words**

**A:** Let's discuss our quiz preparation, not the final score.  
**B:** Did we come last?  
**A:** We identified the greatest number of learning opportunities.  
**B:** How many points did we get?  
**A:** First, appreciate how bravely we attempted the geography round.  

**Example 2 · 33 words**

**A:** The race taught us a lot about pacing.  
**B:** You stopped halfway.  
**A:** Exactly. A natural point for reviewing the first half.  
**B:** Everybody else finished.  
**A:** And missed a valuable opportunity to reassess their strategy mid-course.  

### D207 — Let Them Think They Won

**Card:** Protect someone’s confidence by hiding how much you softened the challenge, changed the terms, or withheld an advantage.

**Editorial finding / approach:** A protects B's confidence by hiding a concrete concession; B's suspicion is answered without taking back the encouraging victory.

**Example 1 · 42 words**

**A:** You beat me at chess. Take a photograph of the board.  
**B:** Why didn't you use your queen?  
**A:** I wanted to explore the rest of my team.  
**B:** Did you go easy on me?  
**A:** You found the finishing move. Let the photograph remember that.  

**Example 2 · 41 words**

**A:** Congratulations on winning the cake contest, Mum.  
**B:** Your cake isn't on the judging table.  
**A:** It stayed in the kitchen where I can admire it privately.  
**B:** You withdrew so I'd win.  
**A:** You still beat seven cakes that had every intention of winning.  

### D208 — Admit What You Wanted

**Card:** Maneuver them into revealing which outcome they truly wanted before you explain your own stake.

**Editorial finding / approach:** A asks B to disclose their preferred outcome before A reveals their stake; B's attempt to read A is redirected to their unprompted answer.

**Example 1 · 37 words**

**A:** Before I tell you who won, which candidate were you hoping for?  
**B:** You look disappointed.  
**A:** Ignore my face. It isn't your ballot.  
**B:** Tell me your choice first.  
**A:** Then I'd never know whether your kindness voted with me.  

**Example 2 · 42 words**

**A:** Which job offer did you secretly want me to accept?  
**B:** Whichever makes you happy.  
**A:** Before you knew which one made me happy.  
**B:** Why does it matter now?  
**A:** Because I haven't told you what I chose, and this is our last unbiased minute.  

### D209 — Investment in the Next Round

**Card:** Describe defeat, penalty, or a bad bargain as a deliberate investment in a larger future win.

**Editorial finding / approach:** A sells a loss as purposeful investment in a later win; B's concrete cost is assigned a future strategic return.

**Example 1 · 37 words**

**A:** Losing the entry fee bought us a complete map of the competition.  
**B:** We entered to win.  
**A:** A short-term interpretation of the investment.  
**B:** We can't afford another entry.  
**A:** Then the information has become exclusive. We'll use it selectively.  

**Example 2 · 40 words**

**A:** Selling the stall at a loss freed us for a much bigger opportunity.  
**B:** Which opportunity?  
**A:** We now know precisely which business not to buy again.  
**B:** That's an expensive lesson.  
**A:** Exactly. We couldn't have learned it at this depth for free.  

### D210 — I Know How to Win This

**Card:** Perform mastery of the rules, odds, and consequences while improvising every decision.

**Editorial finding / approach:** A claims mastery while improvising unfamiliar rules; B's corrections become supposed deliberate strategies instead of outside narration.

**Example 1 · 41 words**

**A:** I know this board game. I'm opening with the horse in the lake.  
**B:** There aren't horses. That's the scoring marker.  
**A:** Exactly. I'm testing the scoring environment first.  
**B:** You're not allowed to move it.  
**A:** Good. We have established a stable scoring environment.  

**Example 2 · 34 words**

**A:** I've calculated the optimal move in this raffle.  
**B:** You buy a ticket. That's all.  
**A:** The timing of purchase is crucial.  
**B:** The tickets are shuffled.  
**A:** Precisely the variable I was waiting for you to confirm.  

### D211 — No Tie Stands

**Card:** Turn every even outcome into a formal rematch with a new rule and a consequence for losing.

**Editorial finding / approach:** A refuses an even result and invents a costed deciding round; B's acceptance of a tie generates a new criterion.

**Example 1 · 42 words**

**A:** Our cakes tied. Next round, blindfolded icing. Loser cleans the kitchen.  
**B:** A tie is a perfectly good result.  
**A:** Then it should survive a more informative test.  
**B:** I don't want another cake.  
**A:** Excellent. We can compete over who persuades the other to bake.  

**Example 2 · 38 words**

**A:** We split the bill exactly. Now toss for who apologises to the waiter.  
**B:** Why should anyone lose?  
**A:** Otherwise this dinner ends without a distinction.  
**B:** We both enjoyed it.  
**A:** Then least enthusiastic enjoyment pays the tip. Rate yours carefully.  

### D212 — Every Loss Builds the Comeback

**Card:** Treat each setback as proof that the eventual victory will be more impressive.

**Editorial finding / approach:** A sees each defeat as future narrative value; B's increasingly terminal news produces a specific new comeback possibility.

**Example 1 · 32 words**

**A:** Six losses! Our comeback will need its own documentary.  
**B:** The tournament is over.  
**A:** Then the documentary opens next season.  
**B:** Our team is disbanding.  
**A:** A reunion comeback. You've just improved the second act.  

**Example 2 · 35 words**

**A:** My collapsed cake will make the next one look magnificent.  
**B:** You've burned the oven out.  
**A:** We'll begin the comeback with a new oven.  
**B:** The competition's tomorrow.  
**A:** An overnight oven installation. Now we have genuine suspense.  

### D213 — Congratulate Through Your Teeth

**Card:** Perform warm praise while allowing competitive resentment to intensify beneath every compliment.

**Editorial finding / approach:** A's congratulation remains ostensibly warm while resentment sharpens; B recognises the barb and A embeds it inside further praise.

**Example 1 · 42 words**

**A:** Congratulations on the prize. Such a lovely year for forgiving judges.  
**B:** Are you saying I didn't deserve it?  
**A:** I'm saying they saw past things I couldn't.  
**B:** That isn't much of a compliment.  
**A:** Then admire how hard I'm working to make it one.  

**Example 2 · 40 words**

**A:** Wonderful promotion. Your timing with the director's retirement was beautiful.  
**B:** I worked for this.  
**A:** And how considerate of the vacancy to arrive when you were ready.  
**B:** Can't you just be happy?  
**A:** I'm choosing the most generous version available this morning.  

### D214 — Nothing Without Stakes

**Card:** Price every request and decision with a reward, penalty, bargain, or trade.

**Editorial finding / approach:** A attaches a payoff or price to each ordinary request; B's appeal to friendship is itself negotiated.

**Example 1 · 37 words**

**A:** I'll lend you the ladder if helping earns me first choice of barbecue food.  
**B:** Can't it just be a favour?  
**A:** Certainly. What does the favour redeem for?  
**B:** Friendship.  
**A:** Excellent. Is friendship available before the sausages run out?  

**Example 2 · 36 words**

**A:** If I apologise first, what do I win?  
**B:** An end to this argument.  
**A:** And if your apology follows, do we split the victory?  
**B:** It's not a game.  
**A:** Then why is going first carrying all the risk?  

### D215 — Fair Means I Can Win

**Card:** Agree to any rule or bargain only after interpreting fairness in a way that preserves your advantage.

**Editorial finding / approach:** A accepts fairness only after adjusting it to preserve personal advantage; B's consistent-rule argument is absorbed as a reason for compensation.

**Example 1 · 37 words**

**A:** A fair race gives me a head start. I've had a tiring morning.  
**B:** So has everyone.  
**A:** Then compensate us proportionally. Mine involved stairs.  
**B:** We start on the same line.  
**A:** Fine. Move my portion of the line forward.  

**Example 2 · 39 words**

**A:** I'll agree to equal cake portions if mine accounts for the baking time.  
**B:** That's a bigger portion.  
**A:** Only before labour is included in the calculation.  
**B:** You ate the spare icing already.  
**A:** Research and development. Please keep the categories separate.  

### D216 — Consequences Compound

**Card:** Make each new choice carry a larger reward, cost, audience, or point of no return.

**Editorial finding / approach:** Each decision accumulates a concrete extra stake; B's objection makes the audience or consequence larger, not unrelated.

**Example 1 · 32 words**

**A:** Our table-tennis rematch decides who cleans up.  
**B:** Fine. One game.  
**A:** And whose cleaning method we use all year.  
**B:** That's not what I agreed.  
**A:** Let's ask the whole club to witness the clarification.  

**Example 2 · 41 words**

**A:** Choose the biscuits carefully. The winning plate goes to the neighbourhood meeting.  
**B:** It's just a snack.  
**A:** It's also our first impression of the new committee.  
**B:** They won't care.  
**A:** Then put your name beside the plate so we can test that publicly.  

### D217 — Make Help Define Us

**Card:** Get their help, then use how it is offered to redefine what the relationship means.

**Editorial finding / approach:** A seeks help in a form that changes the relationship, not simply task completion; B's style of help becomes the next negotiation.

**Example 1 · 51 words**

**A:** Carry the table with me, not for me. I'd like us to be partners today.  
**B:** I'm stronger. I can do it alone.  
**A:** That's the arrangement I'm trying to stop calling our friendship.  
**B:** Fine. Take the other end.  
**A:** Thank you. Now ask where we're putting it instead of deciding for both ends.  

**Example 2 · 41 words**

**A:** Help me write the complaint as a colleague, not my parent.  
**B:** I was only correcting your spelling.  
**A:** Then leave the angry sentence. That's my contribution.  
**B:** It's quite a good sentence.  
**A:** Good. Put both our names under it, not 'on behalf of.'  

### D218 — Reopen the First Reason

**Card:** Keep them present by returning to the first reason for staying and revealing that it now means something different.

**Editorial finding / approach:** A returns to the original reason for staying and reveals its emotional meaning; the final beat reuses that reason rather than adding a chore.

**Example 1 · 38 words**

**A:** Stay until the tea cools. You always rush goodbye.  
**B:** It's cold now.  
**A:** Then I wasn't really waiting for the tea.  
**B:** What were you waiting for?  
**A:** A goodbye that doesn't sound like you're already somewhere else. Have another sip.  

**Example 2 · 40 words**

**A:** Don't go yet. You came to return the key.  
**B:** It's on the table.  
**A:** I know. I thought putting it down would take longer.  
**B:** You don't need it back?  
**A:** I needed to see whether you'd sit down before giving it up.  

### D219 — Change What the Apology Is For

**Card:** Get an apology, then reveal that the original offense was only the first layer of what needs repair.

**Editorial finding / approach:** A accepts the first apology and reveals a related deeper hurt; the scene expands the same offence instead of inventing a new grievance.

**Example 1 · 41 words**

**A:** Thank you for apologising for missing my concert.  
**B:** So we're okay?  
**A:** Closer. Now why did I have to ask whether you'd noticed missing it?  
**B:** I didn't know what to say.  
**A:** Then apologise for letting me rehearse your apology alone all week.  

**Example 2 · 40 words**

**A:** I accept your apology for breaking the vase.  
**B:** I'll buy another.  
**A:** The vase was cheap. You let me blame the dog for three days.  
**B:** I was embarrassed.  
**A:** Then tell the dog and me which part of that embarrassment we deserved.  

### D220 — Approve the Harmless Version

**Card:** Get approval for a harmless version of your plan, then gradually reveal what that approval now commits them to.

**Editorial finding / approach:** A obtains approval for a small version, then reveals the consequence of that precise yes; B can object rather than being forced to comply.

**Example 1 · 38 words**

**A:** May I put one extra chair in the hall?  
**B:** Of course.  
**A:** Excellent. It's for the chair of my new tenants' committee.  
**B:** I approved furniture, not a committee.  
**A:** Then welcome to our first agenda item: what your chair authorises.  

**Example 2 · 35 words**

**A:** Can a couple of relatives come for tea?  
**B:** Yes, that's fine.  
**A:** Good. They're bringing the cousins who introduced them.  
**B:** How many people is this?  
**A:** It starts with the approved couple. The rest is family context.  

### D221 — The Handoff Already Happened

**Card:** Get them to accept responsibility by returning to earlier offers until the task seems to have been assigned all along.

**Editorial finding / approach:** A reuses B's earlier wording to establish responsibility as already assigned; B's narrower meaning is tested against the unfinished task.

**Example 1 · 42 words**

**A:** You said you'd take it from here. Here are the unanswered wedding invitations.  
**B:** I meant I'd answer the door.  
**A:** Exactly. These people need an answer before reaching it.  
**B:** That's not the same job.  
**A:** Then help me explain where your generous offer ended.  

**Example 2 · 36 words**

**A:** Remember volunteering to finish the last detail of the fete?  
**B:** The banner, yes.  
**A:** The banner announces a raffle nobody has organised.  
**B:** I offered to paint words.  
**A:** And 'raffle' is the word still needing the most work.  

### D222 — Ask Around the Missing Detail

**Card:** Find one hidden fact by asking about everything surrounding it and never naming it directly.

**Editorial finding / approach:** A circles a concealed fact through its surrounding evidence; B's explanations create increasingly precise indirect questions.

**Example 1 · 40 words**

**A:** Whose coat needed the second cup of tea while I was out?  
**B:** Coats don't drink tea.  
**A:** True. Who was keeping that one warm from the inside?  
**B:** You're asking who visited.  
**A:** I'm still on the cup. Did its owner take sugar?  

**Example 2 · 41 words**

**A:** What time did the kitchen light go off after the extra dinner plate was used?  
**B:** Why don't you ask who came over?  
**A:** I'd like to understand the timetable first.  
**B:** We ate late.  
**A:** Then which bus carried the timetable's missing person home?  

### D223 — Recruit Them Twice

**Card:** Recruit them to your side, then reveal that the side, goal, or conflict is not what it first appeared to be.

**Editorial finding / approach:** A recruits B into a credible first task, then seeks renewed commitment after changing its meaning; B's first yes is not treated as automatic final consent.

**Example 1 · 40 words**

**A:** Will you help me tidy the committee cupboard?  
**B:** Sure. Where do we start?  
**A:** With the records proving we should replace the committee.  
**B:** I agreed to tidy, not overthrow.  
**A:** Then I'm asking again, now you can see what we've been storing.  

**Example 2 · 35 words**

**A:** Join my campaign to save the club garden.  
**B:** Absolutely. Who threatens it?  
**A:** Our extension plan. The one we both signed.  
**B:** We're campaigning against ourselves?  
**A:** We know the opposition's weaknesses. Will you join the honest version?  

### D224 — Make the Second Step First

**Card:** Get them to accept a small consequence that makes the larger risky action feel already underway.

**Editorial finding / approach:** A starts with a small consequence that reframes the larger risky commitment as protection of investment; B notices the sequence and can resist.

**Example 1 · 39 words**

**A:** Pay the climbing-course deposit before we discuss the cliff.  
**B:** I haven't agreed to climb.  
**A:** It's refundable only if we attend the first lesson.  
**B:** So paying makes not climbing harder.  
**A:** Exactly. A small commitment can do the worrying for us.  

**Example 2 · 40 words**

**A:** Tell the committee we're considering the festival bid. Just the announcement.  
**B:** We haven't decided to bid.  
**A:** Once they've reserved the date, we'll have something worth protecting.  
**B:** That sounds like deciding backwards.  
**A:** I prefer starting with the consequence that encourages us.  

### D225 — Let the Callback Claim Credit

**Card:** Get recognition by returning to an early overlooked contribution when its importance becomes undeniable.

**Editorial finding / approach:** A returns to a specific overlooked contribution only after it becomes useful; B's new recognition makes credit timely rather than generic.

**Example 1 · 42 words**

**A:** Remember my suggestion to put the spare key under the flowerpot?  
**B:** I called it unnecessary.  
**A:** And now we're locked out beside a very useful flowerpot.  
**B:** Fine. Good idea.  
**A:** Say whose idea while you lift it. The pot can't accept all the credit.  

**Example 2 · 39 words**

**A:** That strip of tape I added is holding the whole stage curtain up.  
**B:** I thought it looked untidy.  
**A:** Untidiness has just saved the finale.  
**B:** We'll thank the stage crew.  
**A:** Start with the person you asked to remove the tape.  

### D226 — Make the Choice Rewrite the Past

**Card:** Make them choose between options whose consequences reinterpret an earlier promise, refusal, or agreement.

**Editorial finding / approach:** A presents a present choice whose consequences assign meaning to an earlier statement; B remains free to select the interpretation.

**Example 1 · 51 words**

**A:** Choose the overseas job or our shared shop. Then we'll know what 'we'll build something' meant.  
**B:** I said that before the offer.  
**A:** Yes. This choice gives the old sentence its ending.  
**B:** You're making a job sound like a goodbye.  
**A:** I'm asking whether your promise has room for the shop without you.  

**Example 2 · 43 words**

**A:** Keep my spare key or return it. Either choice explains last week's 'take some space.'  
**B:** I meant a quiet evening.  
**A:** Then keeping it can mean the evening ended.  
**B:** And returning it?  
**A:** Would make that evening the beginning of something neither of us named.  

### D227 — Make the Test Test You

**Card:** Create a commitment test that gradually exposes what you are unwilling to risk yourself.

**Editorial finding / approach:** A's loyalty test exposes A's own unwillingness through B's reciprocal question; the final turn acknowledges or defends that revealed asymmetry.

**Example 1 · 39 words**

**A:** Sign up for the overnight shift if this project matters to you.  
**B:** Have you signed up?  
**A:** I'm keeping myself available for leadership decisions.  
**B:** At three in the morning?  
**A:** Apparently my test has reached a less comfortable definition of commitment.  

**Example 2 · 39 words**

**A:** Give up your prize seat to prove you're on my side.  
**B:** Will you give up yours too?  
**A:** Mine is essential for maintaining perspective.  
**B:** You mean watching comfortably.  
**A:** Yes. I may have designed a test I wasn't planning to take.  

### D228 — Win the Smaller Concession

**Card:** Get one small surrender, then use its logic to make the larger claim harder to defend.

**Editorial finding / approach:** A obtains a bounded concession, then applies its logic to the larger dispute; B's distinction becomes the next specific point to negotiate.

**Example 1 · 39 words**

**A:** Can I keep one plant on your windowsill?  
**B:** One small plant.  
**A:** Excellent. Sunlight is available to guests. Shall we discuss the other pot?  
**B:** You said one.  
**A:** And you've agreed the principle. Now we're negotiating the size of its audience.  

**Example 2 · 37 words**

**A:** Admit that I helped with one paragraph of the speech.  
**B:** The opening paragraph, yes.  
**A:** The paragraph that establishes the argument for the rest?  
**B:** Don't claim the whole speech.  
**A:** I'm only following the opening wherever you took it.  

### D229 — Hide Inside the Callback

**Card:** Use an early harmless detail as the explanation for each new consequence, keeping your own role outside the pattern.

**Editorial finding / approach:** A repeatedly attributes consequences to the same harmless opening detail, avoiding the personal action that caused them.

**Example 1 · 41 words**

**A:** Remember the decorative ribbon? That's where the whole tent problem began.  
**B:** You tied it to the support rope.  
**A:** Yes, but nobody questioned why the ribbon was there.  
**B:** Then you pulled the rope.  
**A:** Following the ribbon's invitation. We should review decorative influences.  

**Example 2 · 36 words**

**A:** That innocent cup started the argument.  
**B:** You tipped it onto my letter.  
**A:** Exactly. A badly positioned cup creates difficult choices.  
**B:** It was in your hand.  
**A:** Which shows how far the cup had already entered the situation.  

### D230 — Answer the Previous Question

**Card:** Redirect every dangerous question by sincerely answering an earlier, safer version of it.

**Editorial finding / approach:** A genuinely answers an earlier safe question instead of the current dangerous one; B's repeated redirection supplies another safe answer to revisit.

**Example 1 · 46 words**

**A:** About the weather you asked earlier: yes, it rained all evening.  
**B:** I asked why you crashed my car.  
**A:** And before that you asked whether the roads were wet. They were.  
**B:** Were you driving too fast?  
**A:** The forecast said showers. I should answer that original question completely.  

**Example 2 · 47 words**

**A:** You asked if lunch was good. The soup was excellent.  
**B:** That was before I asked who ate my birthday cake.  
**A:** Excellent, but slightly salty. I hadn't finished my lunch review.  
**B:** Forget lunch. Answer about the cake.  
**A:** You also asked where we ate. That deserves a precise answer.  

### D231 — Reveal the Truth in Layers

**Card:** Protect someone by disclosing the truth in stages, changing what each earlier statement appears to mean.

**Editorial finding / approach:** A protects by disclosing connected facts in stages; each new detail changes what the earlier reassuring phrase meant.

**Example 1 · 37 words**

**A:** The wedding venue has made a small change.  
**B:** What changed?  
**A:** The date remains available. The building does not.  
**B:** What happened to the building?  
**A:** A fire. Let's hold onto the available date while we choose what comes next.  

**Example 2 · 39 words**

**A:** Your garden gnome is coming home in a different arrangement.  
**B:** What arrangement?  
**A:** Several pieces, carefully packed. I wanted you to hear 'coming home' first.  
**B:** Is it broken?  
**A:** Yes. Most pieces are here, and we can start with the smile.  

### D232 — Confess Around Them

**Card:** Use partial admissions to make a reciprocal confession feel like the only missing piece.

**Editorial finding / approach:** A's partial admission creates a specific reciprocal gap; B's focus on A's guilt is acknowledged but directed back to the missing contribution.

**Example 1 · 40 words**

**A:** I changed the meeting time. Did you change the room?  
**B:** You changed the time?  
**A:** Yes. That's my half of why nobody met.  
**B:** Why didn't you tell me?  
**A:** I should have. Now tell me where your half of the meeting went.  

**Example 2 · 40 words**

**A:** I hid the first complaint letter. What happened to the second?  
**B:** You've admitted hiding a letter.  
**A:** Exactly. I'm not asking you to stand in the spotlight alone.  
**B:** There was a third one.  
**A:** Then let's put our envelopes down in order.  

### D233 — It Was Foreshadowed

**Card:** Turn the failure into a planned turning point by returning to earlier details that now appear to predict it.

**Editorial finding / approach:** A uses an earlier warning as supposedly planned foreshadowing of failure; B's accusation is reframed as narrative preparation, not denied evidence.

**Example 1 · 35 words**

**A:** The collapsed cake was foreshadowed by that first wobble.  
**B:** You ignored the wobble.  
**A:** I allowed the audience to discover its significance.  
**B:** There is no cake now.  
**A:** Exactly. The empty stand pays off the warning beautifully.  

**Example 2 · 45 words**

**A:** The tent falling is our planned turning point. Remember the loose peg I mentioned?  
**B:** You were supposed to fix it.  
**A:** Then nobody would understand why it mattered later.  
**B:** We're standing in the rain.  
**A:** And the earlier remark about waterproof coats has become remarkably well placed.  

### D234 — Be Right in Retrospect

**Card:** Perform certainty by reinterpreting every surprise as something your earlier words were obviously predicting.

**Editorial finding / approach:** A turns earlier vague or wrong words into precise retrospective predictions; B's literal reading receives a new interpretation.

**Example 1 · 42 words**

**A:** When I said the evening would flow, I meant this kitchen flood.  
**B:** You meant conversation.  
**A:** Water is now the dominant topic. A remarkably accurate forecast.  
**B:** You didn't predict a burst pipe.  
**A:** I said we'd need to open up. The plumbing listened first.  

**Example 2 · 41 words**

**A:** My forecast said sunny. Clearly I meant your reaction to the refund.  
**B:** The holiday was ruined by rain.  
**A:** Which created the refund and your brightened outlook.  
**B:** You wrote 'pack sunscreen.'  
**A:** A symbol of optimism. You must read the whole prediction generously.  

### D235 — Reverse the Score

**Card:** Turn each apparent loss into a new category of victory, then invite comparison on those changing terms.

**Editorial finding / approach:** A changes the category after losing and invites comparison on the new measure; B's challenge produces a further related reversal.

**Example 1 · 38 words**

**A:** Last in the race, first in appreciating the route. Beat that.  
**B:** It was a speed contest.  
**A:** A narrow category. How many wildflowers did you notice?  
**B:** I noticed the finish line.  
**A:** Then I also win for variety of attention.  

**Example 2 · 36 words**

**A:** The small trophy is better. It shows restraint.  
**B:** It's the consolation prize.  
**A:** Exactly. How gracefully can your enormous cup fit in a cupboard?  
**B:** Mine says first.  
**A:** And mine doesn't need to shout. Another victory in modesty.  

### D236 — Return to the First Hope

**Card:** Return to an early hope after every setback, expanding its meaning until the whole scene seems to fulfill it.

**Editorial finding / approach:** A returns to the opening hope and broadens its meaning after setbacks; each revision preserves a recognisable original aim.

**Example 1 · 45 words**

**A:** We wanted somewhere to belong. This leaking cottage can still be ours.  
**B:** The roof needs replacing.  
**A:** Then we'll know every tile of the place we belong.  
**B:** It may cost our savings.  
**A:** We hoped for a home, not an untouched savings account beside someone else's house.  

**Example 2 · 37 words**

**A:** We said the concert would bring the village together.  
**B:** The power's out.  
**A:** Then we'll sing together without microphones.  
**B:** Half the audience has gone home for torches.  
**A:** Look at that. The village is already supplying its own light.  

### D237 — Warmth with a Countdown

**Card:** Perform increasing warmth with increasingly final language, as though every act of care might also be a goodbye.

**Editorial finding / approach:** Warmth grows while wording sounds increasingly final; B notices the goodbye and A wraps it in further care rather than a unrelated threat.

**Example 1 · 48 words**

**A:** Take my good teacup. It'll remind you of our afternoons wherever you end up.  
**B:** Why would I end up elsewhere?  
**A:** Someone as capable as you must have wonderful doors waiting.  
**B:** Are you asking me to leave?  
**A:** I'm making sure you won't mistake this doorway for your last opportunity.  

**Example 2 · 47 words**

**A:** I've packed extra sandwiches for your journey. You always forget to eat.  
**B:** I'm only visiting the next town.  
**A:** Then they'll keep you well as long as you choose to stay.  
**B:** That sounds very final.  
**A:** Only because I want the last thing you hear here to be kindness.  

### D238 — Everything Has Two Prices

**Card:** Price every offer twice: once in practical terms and again through an emotional cost that grows when the offer returns.

**Editorial finding / approach:** A gives each offer a practical and relational price; B's cash solution makes the emotional cost explicit rather than interchangeable.

**Example 1 · 44 words**

**A:** The lift costs petrol and a proper conversation about why you stopped calling.  
**B:** I'll pay for petrol.  
**A:** Good. That gets the car moving, not us.  
**B:** Can we discuss it another day?  
**A:** Then today costs petrol and another postponed conversation. The second price is rising.  

**Example 2 · 42 words**

**A:** You can borrow the dress for ten pounds and an acknowledgment that you mocked it.  
**B:** Here's twenty.  
**A:** Money covers fabric. It doesn't cover wearing my bad taste proudly.  
**B:** Fine. It's beautiful.  
**A:** Good. Now say which part of my judgement improved since yesterday.  

### D239 — Agree to the Exact Words

**Card:** Agree to the exact wording, then use later callbacks to narrow what those words can obligate you to do.

**Editorial finding / approach:** A returns to exact earlier wording to limit an expanding obligation; B's paraphrase is tested against the remembered sentence.

**Example 1 · 41 words**

**A:** I said I'd carry one box. That warehouse isn't the box.  
**B:** You promised to help me move.  
**A:** With one box. We admired how manageable the sentence was.  
**B:** Make it the biggest one, then.  
**A:** Fine. The word 'one' has retained its dignity.  

**Example 2 · 35 words**

**A:** I agreed to watch your dog today.  
**B:** Tomorrow's only a few hours away.  
**A:** Exactly. A separate word with no place in our agreement.  
**B:** You said you loved dogs.  
**A:** An enduring feeling, not a calendar extension.  

### D240 — Bring Back Everything

**Card:** Return early details in altered forms until the scene feels like it has been building toward one unavoidable consequence.

**Editorial finding / approach:** Early details return as connected consequences rather than a random inventory; each callback tightens one causal problem.

**Example 1 · 57 words**

**A:** You said 'nothing can go wrong' before balancing the key on the teacup.  
**B:** It fell into the cup. I dried it with the invitation.  
**A:** And now the invitation has dissolved around the key to the wedding hall.  
**B:** We can still prise it off.  
**A:** Good. Your 'nothing' has become both the lock and the address we can't read.  

**Example 2 · 57 words**

**A:** Remember calling the spare chair unnecessary before giving its place to the cake?  
**B:** The cake needed somewhere flat.  
**A:** Then the guest sat on the piano stool, and you moved the pianist to the window.  
**B:** He's managed perfectly well.  
**A:** Until we open that window to cool the cake. Every sensible decision is now sitting on the next one.  

### S01 — Top of the Ladder

**Card:** Carry yourself as the highest-status person present. Treat questions as requests for your approval.

**Editorial finding / approach:** Approval is imposed on an ordinary peer exchange; B tests whether A claims authority even over independent choices.

**Example 1 · 28 words**

**A:** I've approved the soup. You may start lunch.  
**B:** I was asking whether you'd pass the salt.  
**A:** Your request is under consideration.  
**B:** I'll get it myself.  
**A:** Excellent initiative. Approved.  

**Example 2 · 30 words**

**A:** Welcome to my garage sale. Your offer to browse is accepted.  
**B:** It's my garage. You're helping.  
**A:** And you're doing very well under my supervision.  
**B:** I'm going inside.  
**A:** Granted. Take five.  

### S02 — Borrowed Authority

**Card:** Project confident authority while quietly working to keep everyone cooperative. Your confidence depends on their cooperation.

**Editorial finding / approach:** Apparent command depends on concessions; each objection costs A another piece of the rule.

**Example 1 · 38 words**

**A:** As your new shift leader, I'm moving lunch to twelve.  
**B:** The crew eats at eleven.  
**A:** Twelve was the consultation time. Eleven is my decision.  
**B:** We also leave early on Fridays.  
**A:** Naturally. I'll announce that before anyone else does.  

**Example 2 · 33 words**

**A:** I'm captain of this rowing team. Everybody rows on my whistle.  
**B:** We prefer counting.  
**A:** Then I'll whistle the numbers.  
**B:** Could you just count?  
**A:** Of course. A captain adapts. You'll still call me captain?  

### S03 — The Only Professional

**Card:** Behave as the only qualified person present. Correct mistakes with patient, increasingly strained professionalism.

**Editorial finding / approach:** Specific corrections escalate A's strained professional patience instead of merely declaring competence.

**Example 1 · 39 words**

**A:** Please stop stirring the wedding cake batter with the whisk handle.  
**B:** It still moves the batter.  
**A:** So does a shoe. We use the loops.  
**B:** The shoe wouldn't bend like this whisk.  
**A:** Put both feet down. I'll finish the cake.  

**Example 2 · 33 words**

**A:** I'm the electrician. Please stop testing the socket with a spoon.  
**B:** It's wooden.  
**A:** An encouraging first decision. Now step away.  
**B:** Should I get a metal spoon?  
**A:** No. You've graduated to holding the torch.  

### S04 — Act Like You Belong

**Card:** You do not understand what is happening. Copy the confidence around you and never admit confusion.

**Editorial finding / approach:** A copies apparent expertise and rationalizes a concrete mistake when B reveals the convention.

**Example 1 · 31 words**

**A:** Lovely auction. I've raised my paddle for the traditional warm-up.  
**B:** You just bought the wardrobe.  
**A:** Naturally. I always begin with storage.  
**B:** For eight thousand pounds?  
**A:** Yes. The usual amount of storage.  

**Example 2 · 34 words**

**A:** I've put my shoes beside yours for the interview.  
**B:** Mine are off because the heel broke.  
**A:** Exactly. I prefer a preventative approach.  
**B:** Why have you removed your socks?  
**A:** Management potential. Always one step ahead.  

### S05 — The Protégé Problem

**Card:** Treat another player as someone you trained. Offer corrections, backhanded praise, and reminders of your influence.

**Editorial finding / approach:** A turns B's adult achievement into evidence of A's old instruction, then claims authorship of independence.

**Example 1 · 40 words**

**A:** Nice acceptance speech. I taught you to project, remember?  
**B:** You taught me to order pizza when I was eight.  
**A:** And tonight an auditorium heard you. Progress.  
**B:** I wrote the speech myself.  
**A:** Finally applying my lesson about not asking for help.  

**Example 2 · 38 words**

**A:** That's a beautiful painting. You're still using the brush grip I showed you.  
**B:** You showed me finger painting.  
**A:** The foundation of every hand movement.  
**B:** I paint with my feet now.  
**A:** Wonderful. You've taken my principles beyond the syllabus.  

### S06 — Hidden Power

**Card:** Act publicly modest while making choices as though you control the outcome.

**Editorial finding / approach:** Modest language contrasts with decisive control over an actual resource; no partner compliance is assumed.

**Example 1 · 34 words**

**A:** I'm only the caretaker. Plan whatever concert you like.  
**B:** We'll start at eight.  
**A:** Lovely. I unlock the hall at nine.  
**B:** Could we have a key?  
**A:** Of course. Submit your preferred concert time to me.  

**Example 2 · 37 words**

**A:** Don't put me on the committee. I just send the invitations.  
**B:** We voted to invite everyone.  
**A:** Excellent. Which six people shall receive them?  
**B:** Everyone means everyone.  
**A:** I'll put that on next week's agenda. I send those too.  

### S07 — Before They Were Impressive

**Card:** Treat another player with old familiarity. Casually puncture formality, grandeur, or attempts to impress you.

**Editorial finding / approach:** Familiar details puncture status while A responds directly to B's increasingly formal requests.

**Example 1 · 34 words**

**A:** Congratulations, Mayor Pudding Pants. Where's the buffet?  
**B:** Please don't use that nickname at my inauguration.  
**A:** Fine. Mayor Pudding. We can be formal.  
**B:** There are reporters here.  
**A:** Lovely. Finally, someone to verify the custard incident.  

**Example 2 · 35 words**

**A:** Nice corner office. Still hiding biscuits in your socks?  
**B:** I'm the director now.  
**A:** Then you can afford a drawer.  
**B:** Could we discuss the contract?  
**A:** After you empty your left sock. I can hear it crunching.  

### S08 — You Owe Me

**Card:** Behave as though another person's success is partly yours. Refer to favors, sacrifices, or guidance as if the debt is obvious.

**Editorial finding / approach:** A converts a small past favor into an ever-expanding claim on present recognition.

**Example 1 · 42 words**

**A:** Before you accept your award, remember who drove you to the audition.  
**B:** I already thanked you in the speech.  
**A:** You said 'transport.' I have a name.  
**B:** I'll thank you personally next time.  
**A:** Next time? Good. I'll need a seat beside the award.  

**Example 2 · 33 words**

**A:** Your bakery looks wonderful. Where's my founder's discount?  
**B:** You lent me a mixing bowl.  
**A:** Before there was cake, there was my bowl.  
**B:** I've returned it.  
**A:** You can't return the beginning of a dream.  

### S09 — The Responsible One

**Card:** Take responsibility for everyone and everything. Fix problems before anyone asks, then resent having to do it.

**Editorial finding / approach:** A creates unrequested solutions and resents the labor, including the labor of allowing B to help.

**Example 1 · 36 words**

**A:** I've packed your lunch and labelled your umbrella. Again.  
**B:** I can pack my own lunch.  
**A:** I've made you a checklist so you can.  
**B:** You didn't need to make a checklist.  
**A:** Fine. I'll add 'appreciate checklist' myself.  

**Example 2 · 38 words**

**A:** I've cleaned the kitchen while you slept. You're welcome.  
**B:** I was going to clean it at nine.  
**A:** And leave me knowing it was dirty until nine?  
**B:** Next time, wake me.  
**A:** Lovely. Now I'm responsible for your alarm too.  

### S10 — Old Rivals

**Card:** Choose another player as your measuring stick. Compare achievements, score small victories, and refuse to be outdone.

**Editorial finding / approach:** An innocent comparison is converted into a measurable contest without forcing B to compete.

**Example 1 · 34 words**

**A:** I've folded twelve towels. How many have you done?  
**B:** I'm not racing. I'm washing them.  
**A:** Different event. Convenient choice.  
**B:** You can win towel folding.  
**A:** Not by concession. Fold one properly and make it count.  

**Example 2 · 30 words**

**A:** Your tomato's impressive. Mine weighs two grams more.  
**B:** We're making a salad.  
**A:** Then let's keep the winning tomato separate.  
**B:** I've already chopped it.  
**A:** Fine. We'll compete by number of pieces.  

### S11 — Only You

**Card:** Choose one person as the only one you trust. Seek their help while hiding how much you depend on it.

**Editorial finding / approach:** A disguises dependence as verification and cannot use an alternative without consulting the trusted person.

**Example 1 · 33 words**

**A:** Can you check my resignation letter? Just the spelling.  
**B:** The spelling's fine.  
**A:** And resigning? Does that word suit me?  
**B:** Ask your manager.  
**A:** Could you ask? I'd trust the answer more in your voice.  

**Example 2 · 37 words**

**A:** You're coming to the dentist with me, aren't you?  
**B:** The dentist knows what to do.  
**A:** I know. I need you to confirm that.  
**B:** I'm not a dentist.  
**A:** Exactly. You have no professional reason to defend the drill.  

### S12 — After What Happened

**Card:** Carry yourself as if an unnamed past incident still hangs over the interaction. Read ordinary remarks through that memory.

**Editorial finding / approach:** An ordinary cue activates an unnamed shared incident; A's precautions reveal its continuing weight.

**Example 1 · 34 words**

**A:** You've put out the blue cups. So we're doing this again.  
**B:** They're the only clean ones.  
**A:** That's how it started last time.  
**B:** I'll wash the red cups.  
**A:** Please don't call that a fresh start.  

**Example 2 · 37 words**

**A:** Interesting choice of song for our first road trip since the incident.  
**B:** It's the traffic report.  
**A:** And they're mentioning that roundabout very casually.  
**B:** We can take another road.  
**A:** That's what you said before we needed another car.  

### S13 — Envious Admiration

**Card:** Be sincerely impressed by another player while trying not to appear lesser. Compliment, imitate, and compete at the same time.

**Editorial finding / approach:** Praise becomes imitation and one-upmanship, but the original admiration remains audible.

**Example 1 · 36 words**

**A:** Your pie crust is gorgeous. I've copied the lattice with smaller gaps.  
**B:** You didn't need to improve it.  
**A:** Improve? I'm celebrating you more precisely.  
**B:** Would you like my recipe?  
**A:** Please. I'll return it with respectful corrections.  

**Example 2 · 39 words**

**A:** You make public speaking look effortless. I practised your shrug all night.  
**B:** You can just be yourself.  
**A:** Of course. My version of your shrug has more range.  
**B:** There isn't a competition.  
**A:** That sounds so confident. I'm using that too.  

### S14 — The Old You

**Card:** Perform the person you used to be, even when that identity no longer fits. Defend the old version of yourself whenever it is challenged.

**Editorial finding / approach:** A protects an obsolete identity when practical facts threaten it, using the new limitation to defend the old persona.

**Example 1 · 36 words**

**A:** Put 'Lightning' on my retirement cake. That's what the band called me.  
**B:** The cake says Graham.  
**A:** Graham worked in accounts. Lightning had a smoke machine.  
**B:** It's a small family party.  
**A:** Then get a small smoke machine.  

**Example 2 · 34 words**

**A:** I still wear my motorcycle jacket to the school run.  
**B:** You've arrived on a folding bicycle.  
**A:** Same wind. Same man.  
**B:** You've got a basket full of lunchboxes.  
**A:** Touring equipment. Don't touch the skull sticker.  

### S15 — Replacement Fear

**Card:** Behave as if your place is insecure. Make yourself indispensable and treat small changes as threats.

**Editorial finding / approach:** New accommodation is read as replacement; A turns usefulness into a claim on continued membership.

**Example 1 · 38 words**

**A:** Why does the new receptionist have a key? I open this office.  
**B:** You could take a day off.  
**A:** And let the door forget me?  
**B:** It's a spare key.  
**A:** Then I'll keep it safe. Spares are my department too.  

**Example 2 · 33 words**

**A:** You've bought an electric mixer. My birthday cakes weren't enough?  
**B:** It'll save you time.  
**A:** Time for what? Being replaced by the toaster?  
**B:** You still choose the recipe.  
**A:** Good. The mixer reports to me.  

### S16 — For Their Own Good

**Card:** Take charge of another person's choices because you trust your judgment more than theirs. Frame control as care.

**Editorial finding / approach:** A treats preference itself as proof that B needs A's protection, escalating control while claiming care.

**Example 1 · 33 words**

**A:** I've ordered you the mild curry. You're welcome.  
**B:** I wanted the hot one.  
**A:** That's exactly the impulse I'm protecting you from.  
**B:** I'll order it myself.  
**A:** I've told the waiter not to believe you.  

**Example 2 · 32 words**

**A:** I booked your quiet holiday instead of the climbing trip.  
**B:** I love climbing.  
**A:** You love surviving it. I've kept that part.  
**B:** I'll cancel the booking.  
**A:** No refunds. Sometimes caring requires a deposit.  

### S17 — Their Opinion Matters

**Card:** Seek one person's approval while pretending their opinion is irrelevant. Adjust yourself whenever they respond.

**Editorial finding / approach:** A denies seeking approval while visibly revising the exact choice B comments on.

**Example 1 · 35 words**

**A:** What do you think of my blue shirt? Purely academic.  
**B:** I prefer the green one.  
**A:** So do I. This is my changing shirt.  
**B:** Wear whatever makes you happy.  
**A:** Could you sound happier about the blue?  

**Example 2 · 34 words**

**A:** I've named my boat Independence. Your opinion obviously doesn't matter.  
**B:** It's a bit long.  
**A:** Indie, then. That was always the nickname.  
**B:** I liked Independence.  
**A:** Good. The paint's still wet. Nothing's been decided by you.  

### S18 — Fishing for Praise

**Card:** You desperately want praise but refuse to ask for it. Create opportunities for others to notice your greatness.

**Editorial finding / approach:** A arranges increasingly overt opportunities for praise while denying any request for it.

**Example 1 · 38 words**

**A:** Careful with that shelf. I built it. From wood.  
**B:** It's holding the books nicely.  
**A:** All forty-seven. You can count them if you're impressed.  
**B:** Would you like a compliment?  
**A:** No, no. Just look at it from the difficult angle.  

**Example 2 · 35 words**

**A:** I've left my marathon medal beside the kettle. Accidentally.  
**B:** It's blocking the tea bags.  
**A:** A difficult obstacle. Much like mile twenty-three.  
**B:** Congratulations on the marathon.  
**A:** Oh, you noticed? I haven't shown you the split times.  

### S19 — Sacred Procedure

**Card:** Treat an ordinary activity as a solemn ritual. Protect every step, object, and tradition from casual interference.

**Editorial finding / approach:** Ordinary steps acquire ceremonial meaning; B's convenience becomes a threat to ritual continuity.

**Example 1 · 30 words**

**A:** Before we eat, the biscuit must complete three clockwise turns.  
**B:** It's already in my mouth.  
**A:** Then turn your chair. Slowly.  
**B:** Can I swallow first?  
**A:** Not until the biscuit faces home.  

**Example 2 · 32 words**

**A:** Please stand for the opening of the office fridge.  
**B:** I only want my yoghurt.  
**A:** We acknowledge the light before approaching the shelf.  
**B:** The bulb's broken.  
**A:** Then today we open it in remembrance.  

### S20 — Red Alert

**Card:** Treat every development as urgent evidence of a crisis. Escalate precautions faster than the facts justify.

**Editorial finding / approach:** A escalates precautions from a tiny factual trigger, not by merely shouting that there is danger.

**Example 1 · 36 words**

**A:** There's a drop of water beside the kettle. We need an evacuation route.  
**B:** I spilled it.  
**A:** Good. We've identified the source. Stop producing water.  
**B:** I've wiped it up.  
**A:** Where's the cloth? The threat has changed location.  

**Example 2 · 34 words**

**A:** That chair squeaked. Don't put any more weight on the building.  
**B:** It needs oil.  
**A:** You're proposing a flammable solution during a structural emergency?  
**B:** I'll stand up.  
**A:** Slowly. We don't know what's holding you down.  

### S21 — Cause for Celebration

**Card:** Interpret every development as a reason to celebrate. Find victory in setbacks, warnings, and bad news.

**Editorial finding / approach:** A interprets each development as a victory from the outset; B adds facts rather than asking for positivity.

**Example 1 · 32 words**

**A:** The power's out! Our candle collection finally gets its premiere.  
**B:** We don't own candles.  
**A:** A shopping trip with a purpose!  
**B:** The shops have no power either.  
**A:** Wonderful. The whole town's joining in.  

**Example 2 · 38 words**

**A:** Our flight's cancelled. We've been given a bonus airport day.  
**B:** The hotel won't refund us.  
**A:** Then our room will stay beautifully clean.  
**B:** We won't be in it.  
**A:** Our most restful holiday yet. Even the bed gets a break.  

### S22 — Practical Realist

**Card:** Accept any unusual premise without debate. Focus immediately on schedules, costs, safety, and what must happen next.

**Editorial finding / approach:** The impossible premise is accepted immediately; the sustained pattern is mundane implementation.

**Example 1 · 39 words**

**A:** If the ceiling's talking, does it need a microphone for the meeting?  
**B:** You're not surprised the ceiling talks?  
**A:** I'm concerned the people under the balcony won't hear.  
**B:** It only speaks in prophecy.  
**A:** Fine. Can it predict the parking bill?  

**Example 2 · 34 words**

**A:** Your dragon can stay in the flat. Which meter measures its heating?  
**B:** It breathes fire.  
**A:** Then it pays the gas bill.  
**B:** It insists on being called Your Majesty.  
**A:** Put that on the standing order.  

### S23 — The Important Thing

**Card:** Choose one ordinary object, phrase, or rule and treat it as vitally important. Keep bringing the scene back to it.

**Editorial finding / approach:** One small object remains the center of concern as B introduces larger practical stakes.

**Example 1 · 39 words**

**A:** Nobody moves out until I find the paperclip from my desk.  
**B:** The removal van is charging by the hour.  
**A:** Then make the driver help look.  
**B:** The landlord wants the keys.  
**A:** He can have the building. I want the paperclip.  

**Example 2 · 36 words**

**A:** You changed 'regards' to 'best regards' in my email.  
**B:** I also got us the contract.  
**A:** We can discuss that after removing 'best.'  
**B:** It's worth a million pounds.  
**A:** Then they should respect my regards as they were.  

### S24 — The Grand Design

**Card:** Treat coincidences and interruptions as parts of a larger plan. Connect everything with absolute conviction.

**Editorial finding / approach:** Coincidences and interruptions reinforce one larger plan; disconfirming details are connected rather than ignored.

**Example 1 · 33 words**

**A:** Two red buses and now your red scarf. We're being directed somewhere.  
**B:** I wear this every day.  
**A:** Then they've been preparing you for years.  
**B:** My phone's ringing.  
**A:** Answer it. The timetable's getting impatient.  

**Example 2 · 34 words**

**A:** The lift stopped on three. There are three of us. This is arranged.  
**B:** There are four of us.  
**A:** One of us is the messenger.  
**B:** It's stopping on four now.  
**A:** Message received. We stay together.  

### S25 — Default Decision-Maker

**Card:** Take charge of every small practical choice, treating speed and efficiency as proof that you should remain in charge.

**Editorial finding / approach:** A equates efficient practical choices with a right to make the next choice; B's preferences are treated as delay.

**Example 1 · 31 words**

**A:** I've ordered everyone's sandwiches. We saved six minutes.  
**B:** I'm vegetarian.  
**A:** I've already removed your ham. Seven minutes saved.  
**B:** Could I choose next time?  
**A:** You could, but I've ordered next time too.  

**Example 2 · 37 words**

**A:** Chairs face the window. I've moved them while you were deciding.  
**B:** The speaker's at the other end.  
**A:** Then moving the speaker is quicker than moving twelve chairs.  
**B:** She's already speaking.  
**A:** I'll rotate the room during the applause.  

### S26 — Temporary Authority

**Card:** Project brisk confidence through the routine, as though any hesitation would reveal that your authority is only temporary.

**Editorial finding / approach:** A fills a brief cover shift with confident rules and treats any pause as a threat to legitimacy.

**Example 1 · 43 words**

**A:** I'm covering reception until two. Deliveries now use the side door.  
**B:** They've always used the front.  
**A:** And we must be decisive during this transition.  
**B:** The receptionist will be back in five minutes.  
**A:** Then knock twice. We haven't time to print the new signs.  

**Example 2 · 33 words**

**A:** While the teacher's out, I'm monitoring silence.  
**B:** She asked you to hold her keys.  
**A:** A quiet responsibility. Stop jingling your pencil.  
**B:** She's coming back.  
**A:** Good. I need to brief her on our progress.  

### S27 — There’s a Right Way

**Card:** Correct how ordinary tasks are done, emphasizing tiny standards that only a true professional would notice.

**Editorial finding / approach:** Tiny technical standards supply the recurring behavior; settings remain consistent throughout each alternative.

**Example 1 · 38 words**

**A:** Those towels need folding with the seams inside.  
**B:** Nobody sees them in the cupboard.  
**A:** I do. That's why I'm qualified to stack them.  
**B:** Can I close the cupboard?  
**A:** After you level the third towel. Doors don't correct technique.  

**Example 2 · 30 words**

**A:** All the mug handles must face four o'clock.  
**B:** They're going in the dishwasher.  
**A:** Exactly. A professional loading angle.  
**B:** The spray comes from below.  
**A:** Then it deserves a properly presented underside.  

### S28 — Regular Around Here

**Card:** Act like a longtime insider by recognizing routines, offering shortcuts, and treating unfamiliar details as recent changes.

**Editorial finding / approach:** A treats unfamiliarity as a recent local change, preserving the claim to being a regular.

**Example 1 · 32 words**

**A:** You've moved my usual table at this café.  
**B:** We've only opened today.  
**A:** Yes, much fresher since my last visit.  
**B:** What would you like?  
**A:** My usual. Let's see whether you've changed that too.  

**Example 2 · 27 words**

**A:** Where's the hook I always use at this club?  
**B:** That's the cleaner's cupboard.  
**A:** They've reorganised again. Typical.  
**B:** Have you been here before?  
**A:** Before all these changes, obviously.  

### S29 — Let Me Show You

**Card:** Turn each simple task into a lesson. Demonstrate, supervise, and correct as though experience has made you indispensable.

**Editorial finding / approach:** A refuses to let competence eliminate a teaching opportunity; the mundane lesson grows increasingly supervised.

**Example 1 · 33 words**

**A:** Let me demonstrate how to tie that parcel.  
**B:** I've already tied it.  
**A:** Untie it. Learning begins with observation.  
**B:** It's going to be opened anyway.  
**A:** Then stay for my lesson on receiving a parcel.  

**Example 2 · 32 words**

**A:** Before you make tea, watch my wrist with the kettle.  
**B:** I've made tea for twenty years.  
**A:** Then you'll appreciate the advanced pour.  
**B:** I've finished the tea.  
**A:** Good. Now make one under supervision.  

### S30 — Keeper of the Details

**Card:** Act outwardly helpful while controlling the small information, supplies, or access everyone needs to proceed.

**Editorial finding / approach:** Small logistical knowledge becomes quiet leverage; B's alternative depends on another detail A controls.

**Example 1 · 34 words**

**A:** Happy to open the supply cupboard. Which project is this for?  
**B:** We just need batteries.  
**A:** Then I'll need to know which drawer to authorise.  
**B:** We'll buy some.  
**A:** Lovely. I have the petty-cash key too.  

**Example 2 · 33 words**

**A:** I've got the room-booking list. When do you want your meeting?  
**B:** The room's empty now.  
**A:** Yes. I know why.  
**B:** Can we use it?  
**A:** As soon as I've decided whether it should stay empty.  

### S31 — Same Old Routine

**Card:** Use familiar shorthand and old habits immediately, as though past routines still govern the present.

**Editorial finding / approach:** A immediately operates an old shared routine and reinterprets B's changes as interruptions to it.

**Example 1 · 33 words**

**A:** Your chipped mug, my ugly mug. I'll wash; you dry.  
**B:** I bought a dishwasher.  
**A:** Good. You can hold the towels while it learns.  
**B:** It dries them too.  
**A:** Then you can supervise your replacement.  

**Example 2 · 37 words**

**A:** I've knocked twice on your window. Ready for our usual walk?  
**B:** I moved the doorbell so you wouldn't need to.  
**A:** Lovely. I'll ring it twice.  
**B:** Could you text first?  
**A:** I'll text two knocks. You'll know it's me.  

### S32 — One More Favor

**Card:** Treat every small request as part of a long-running balance sheet of favors, inconveniences, and repayments.

**Editorial finding / approach:** A's favors are itemized by circumstance rather than treated as spontaneous kindness.

**Example 1 · 34 words**

**A:** I'll drive you home. That makes three lifts and a borrowed umbrella.  
**B:** I bought you coffee yesterday.  
**A:** Which covers the first roundabout.  
**B:** You said the lift was no trouble.  
**A:** Correct. Trouble is charged separately.  

**Example 2 · 30 words**

**A:** Could you water my plants? I covered your shift in March.  
**B:** That was one afternoon.  
**A:** And these are only six small plants.  
**B:** One is a tree.  
**A:** The shift included overtime.  

### S33 — The Designated Reminder

**Card:** Keep track of what everyone was supposed to remember. Supply reminders before being asked and treat forgetfulness as your familiar burden.

**Editorial finding / approach:** A turns reminders into a familiar burden and starts monitoring whether reminders themselves will be remembered.

**Example 1 · 32 words**

**A:** I've reminded you about the dentist tomorrow.  
**B:** It's in my calendar.  
**A:** Good. I'll remind you to check the calendar.  
**B:** It sends alerts.  
**A:** To which phone? The one you asked me to find?  

**Example 2 · 38 words**

**A:** Bin day tomorrow. I've written it on your breakfast banana.  
**B:** I know when bin day is.  
**A:** Then why was last week's banana still in the fruit bowl?  
**B:** I wasn't hungry.  
**A:** Fine. Tomorrow's reminder goes on the coffee machine.  

### S34 — Keeping Score

**Card:** Treat arrival times, effort, memory, and sacrifice as a running score you intend to win.

**Editorial finding / approach:** A scores effort and sacrifice even when B offers to cooperate, keeping a concrete measurable ledger.

**Example 1 · 34 words**

**A:** I carried the heavier shopping bag. Again.  
**B:** I'll carry it upstairs.  
**A:** Then I'll take the lighter one twice to keep things fair.  
**B:** We can make one trip together.  
**A:** And erase the stair count? Convenient.  

**Example 2 · 34 words**

**A:** I arrived ten minutes early to help set up.  
**B:** I stayed an hour late yesterday.  
**A:** Evenings count differently. Mine required getting out of bed.  
**B:** You live upstairs.  
**A:** Which means I sacrificed a shorter commute.  

### S35 — You Know the System

**Card:** Use another person’s knowledge of the routine while pretending you could manage perfectly well alone.

**Editorial finding / approach:** A depends on B's routine knowledge but disguises each request as cross-checking or testing.

**Example 1 · 33 words**

**A:** Which counter takes these forms? Just checking they've not moved it.  
**B:** It's been counter three for years.  
**A:** Good. You remember.  
**B:** You were heading for the toilets.  
**A:** Checking whether the signs still mislead newcomers.  

**Example 2 · 35 words**

**A:** Pass me the key for the shed. The one you think it is.  
**B:** You don't know either?  
**A:** I'm testing whether our systems agree.  
**B:** Try the red one.  
**A:** Exactly. Now remind me which shed we mean.  

### S36 — Still About Last Time

**Card:** Treat each minor inconvenience as confirmation of an older grievance and the same recurring problem.

**Editorial finding / approach:** A reads today's small inconvenience as recurrence of a specific unresolved grievance.

**Example 1 · 40 words**

**A:** There's a sock on the stairs. We've reached this chapter again.  
**B:** I dropped it just now.  
**A:** And last month 'just now' lasted three days.  
**B:** I'll pick it up.  
**A:** Before or after the usual promise about turning over a new leaf?  

**Example 2 · 36 words**

**A:** You're five minutes late. So the old timetable's back.  
**B:** The bus broke down.  
**A:** It always finds a supporting role in your apologies.  
**B:** I walked the last mile.  
**A:** Then next time start walking before our agreed time.  

### S37 — Must Be Nice

**Card:** Treat another person’s ease with ordinary life as both inspiring and unfair. Copy their shortcuts while dismissing the advantage.

**Editorial finding / approach:** A uses the admired shortcut while attributing its success to B's unfairly easy life.

**Example 1 · 32 words**

**A:** Must be nice, cooking dinner in twenty minutes.  
**B:** I chop the vegetables beforehand.  
**A:** Lovely, having a life with 'beforehand' in it.  
**B:** You can chop these now.  
**A:** Fine. I'll briefly experience your advantages.  

**Example 2 · 32 words**

**A:** Your suitcase closes so easily. Some of us have real luggage.  
**B:** Try rolling your clothes.  
**A:** Must be nice, knowing tricks.  
**B:** You've rolled them. It's shut.  
**A:** Well, obviously anything works under laboratory conditions.  

### S38 — We Used to Be Easy

**Card:** Treat every practical difficulty as evidence that life, work, or this relationship used to be simpler.

**Editorial finding / approach:** A measures practical complexity against an idealised simpler past, keeping one ordinary task in focus.

**Example 1 · 35 words**

**A:** We used to arrange dinner by saying 'dinner?'  
**B:** Now we check six calendars.  
**A:** I miss when hunger was our only app.  
**B:** What time shall I put in?  
**A:** Put 'when we liked each other without passwords.'  

**Example 2 · 37 words**

**A:** Our old shopping list just said bread, milk, eggs.  
**B:** Now we have dietary requirements.  
**A:** Even the milk needs an interview.  
**B:** Would you prefer to write the list?  
**A:** Yes. I'll start with 'simpler times' and see which aisle.  

### S39 — Don’t Be Difficult

**Card:** Treat every request, correction, or small inconvenience as a warning that you are becoming too much trouble.

**Editorial finding / approach:** A shrinks each reasonable request after reading neutral logistics as evidence of being burdensome.

**Example 1 · 43 words**

**A:** Could I get a lift? Only if starting the car isn't too much.  
**B:** I'm already driving there.  
**A:** I can get out before the traffic lights.  
**B:** It's fine. Put your bag in.  
**A:** I'll carry it on my lap. No need to trouble the boot.  

**Example 2 · 34 words**

**A:** Could I have a clean fork? Sorry, this one's bent.  
**B:** Of course. I'll get another.  
**A:** Don't cross the whole room for me.  
**B:** The cutlery drawer's beside you.  
**A:** Then I'll use a spoon. Less disruption.  

### S40 — I Packed for You

**Card:** Take care of practical needs before anyone asks, then resist choices that make your preparation unnecessary.

**Editorial finding / approach:** A's care becomes resistance when B's preference makes the preparation unnecessary.

**Example 1 · 33 words**

**A:** I've packed your cheese sandwich for the train.  
**B:** I was going to buy sushi.  
**A:** What am I supposed to do with my researched cheese?  
**B:** Eat it yourself?  
**A:** I researched your preferences, not mine.  

**Example 2 · 29 words**

**A:** Take this raincoat. I checked the forecast all week.  
**B:** It's sunny.  
**A:** The forecast wasn't always sunny.  
**B:** We can leave the coat.  
**A:** Then seven days of preparation stays home alone.  

### S41 — Useful Enough to Stay

**Card:** Make yourself constantly useful and read each response as evidence of whether you still belong.

**Editorial finding / approach:** A turns permission to relax into another opportunity to prove useful and retain a place.

**Example 1 · 39 words**

**A:** I've swept your kitchen. Anything else before I go?  
**B:** Just sit down. You're my guest.  
**A:** The chair could use a polish first.  
**B:** I invited you for company.  
**A:** Good. I'll talk while I polish. Two reasons to invite me again.  

**Example 2 · 33 words**

**A:** Can I organise the pens before my shift ends?  
**B:** You've finished. Go home.  
**A:** There's tomorrow's pens to consider.  
**B:** We'd keep you even without the pens.  
**A:** Wonderful. I'll label a drawer for that promise.  

### S42 — Notice the Effort

**Card:** Make your invisible labor visible through pointed reminders, strategic sighs, and opportunities for appreciation.

**Editorial finding / approach:** Specific evidence of hidden labor is displayed for appreciation; A seeks recognition rather than the next job.

**Example 1 · 32 words**

**A:** Notice anything about the kitchen? Start with the oven.  
**B:** It looks clean.  
**A:** Four hours clean. The shelf has a history.  
**B:** Thank you.  
**A:** Could you say it facing the oven? We worked together.  

**Example 2 · 31 words**

**A:** I've put the empty detergent bottle beside your dinner.  
**B:** Why?  
**A:** A small memorial to the laundry I did today.  
**B:** Thanks for doing it.  
**A:** You're welcome. The folded towels are accepting visitors.  

### S43 — Don’t Break the Routine

**Card:** Protect a familiar routine as though changing one step would invite chaos into everything else.

**Editorial finding / approach:** A protects the order itself, restarting the routine when B skips a harmless step.

**Example 1 · 38 words**

**A:** Tea, then shoes, then keys. You've touched the keys early.  
**B:** We're late.  
**A:** Now we'll need to restart the tea.  
**B:** Can't I hold the keys while it boils?  
**A:** Do you want to find out why we have an order?  

**Example 2 · 26 words**

**A:** We always open the curtains before feeding the cat.  
**B:** The cat's hungry now.  
**A:** The curtains establish morning.  
**B:** It's midday.  
**A:** Exactly. We've already confused the cat enough.  

### S44 — The Contingency Person

**Card:** Meet every ordinary problem with a backup plan, emergency supply, or warning about what could happen next.

**Editorial finding / approach:** Every ordinary precaution requires its own backup, extending one practical chain rather than random catastrophe.

**Example 1 · 29 words**

**A:** I've packed two torches for the picnic.  
**B:** We're going at noon.  
**A:** In case noon runs late.  
**B:** We can use our phones.  
**A:** Good. I've packed chargers for your backup torches.  

**Example 2 · 28 words**

**A:** The spare tyre's ready. Where's the spare jack?  
**B:** There's already a jack.  
**A:** And when that breaks?  
**B:** We'll call for help.  
**A:** On which of the two phones I've packed?  

### S45 — Productive Little Disaster

**Card:** Treat every mistake or delay as a delightful chance to improve the plan, bond, or discover something better.

**Editorial finding / approach:** A uses a mundane failure to invent a specific enjoyable improvement instead of merely declaring optimism.

**Example 1 · 31 words**

**A:** The shopping bag split. We can sort dinner right here.  
**B:** We're on the pavement.  
**A:** Outdoor cooking class. First lesson: tomatoes roll.  
**B:** The bread's wet.  
**A:** Good. We were overdue a soup night.  

**Example 2 · 27 words**

**A:** The plumber's cancelled. We've got a free afternoon.  
**B:** The sink still leaks.  
**A:** Then let's move lunch into the garden.  
**B:** It's raining.  
**A:** Wonderful. We won't hear the sink.  

### S46 — Who’s Cleaning This Up?

**Card:** Treat every idea according to the work, cost, cleanup, and follow-through it will create.

**Editorial finding / approach:** A accepts ideas only after assigning their concrete cleanup and follow-through.

**Example 1 · 33 words**

**A:** Confetti sounds lovely. Who's vacuuming it on Monday?  
**B:** Can't we enjoy the wedding first?  
**A:** Certainly. Name the vacuum operator and I'm emotionally available.  
**B:** I'll do it.  
**A:** Excellent. Now, glitter: different attachment, same question.  

**Example 2 · 33 words**

**A:** You want three extra tables at the party. Who carries them home?  
**B:** We can borrow a van.  
**A:** Who returns the van?  
**B:** You think of everything.  
**A:** That's why I'm asking who pays the deposit.  

### S47 — One Tiny Imperfection

**Card:** Choose one tiny imperfection and let it steadily outweigh every larger concern.

**Editorial finding / approach:** One tiny defect progressively crowds out the important success in the same setting.

**Example 1 · 33 words**

**A:** The wedding cake's lovely, except that leaning cherry.  
**B:** We've got two hundred guests waiting.  
**A:** Then two hundred people might see it.  
**B:** The icing's melting.  
**A:** Hold the cake level. The cherry's under enough pressure.  

**Example 2 · 32 words**

**A:** You've sold the house. But the photo frame's crooked.  
**B:** We're handing over the keys now.  
**A:** Not with the frame announcing our standards.  
**B:** It's their frame.  
**A:** Then we should disclose it before completion.  

### S48 — Nothing Is Ever Simple

**Card:** Interpret each new complication as proof that ordinary tasks are secretly designed to become impossible.

**Editorial finding / approach:** Each necessary step confirms A's conviction that simple tasks are designed to spawn more tasks.

**Example 1 · 39 words**

**A:** The printer needs a cable. Of course the wireless printer needs a cable.  
**B:** Only for setup.  
**A:** And setup needs a password. Does the password need a cable?  
**B:** It's printed underneath.  
**A:** Naturally. The final step is moving the entire desk.  

**Example 2 · 35 words**

**A:** I bought a replacement bulb. It needs a different fitting.  
**B:** There's an adapter.  
**A:** And the adapter has an adapter, I assume?  
**B:** We can order it online.  
**A:** Good. A lighting repair that now requires an account.  

### S49 — The Final Word

**Card:** Treat every opinion you offer as a ruling and every continued discussion as an appeal.

**Editorial finding / approach:** Opinions become rulings and ordinary disagreement becomes a formal appeal.

**Example 1 · 34 words**

**A:** We'll paint the hall green. That is my ruling.  
**B:** I was thinking blue.  
**A:** Your appeal has been received.  
**B:** It wasn't an appeal. It was an opinion.  
**A:** Then it has no standing against the ruling.  

**Example 2 · 27 words**

**A:** I've decided we order soup.  
**B:** We're choosing our own lunches.  
**A:** An interesting challenge to jurisdiction.  
**B:** I'll have a sandwich.  
**A:** Noted. The soup ruling remains on the record.  

### S50 — Conditional Command

**Card:** Project firm authority, then soften whenever the source of that authority might be questioned.

**Editorial finding / approach:** A retreats tactically when asked who authorized their power, then tries to preserve the appearance of command.

**Example 1 · 33 words**

**A:** All deliveries use my entrance from now on.  
**B:** Who appointed you building supervisor?  
**A:** We can be flexible about the entrance.  
**B:** Is that badge signed?  
**A:** Let's not bury a good doorway policy in paperwork.  

**Example 2 · 33 words**

**A:** I'm setting the rehearsal order. Solos first.  
**B:** Did the director ask you?  
**A:** She values initiative. We could begin with your solo.  
**B:** I'll call her.  
**A:** No need. An ensemble opening suddenly feels more inclusive.  

### S51 — The Gatekeeper

**Card:** Use expertise and standards to decide who is qualified to judge, participate, or proceed.

**Editorial finding / approach:** Participation depends on A's expert eligibility standard, which expands when B tries to discuss the standard itself.

**Example 1 · 31 words**

**A:** Before joining our cheese panel, identify this rind.  
**B:** I just came to eat cheese.  
**A:** Consumption is not qualification.  
**B:** Can I ask why?  
**A:** After the rind test. Questions shape the panel too.  

**Example 2 · 31 words**

**A:** You may judge the garden competition once I check your pruning certificate.  
**B:** It's a street competition.  
**A:** Then a street-level certificate should suffice.  
**B:** Who certified you?  
**A:** That question requires an advanced certificate.  

### S52 — Rightful Place

**Card:** Carry yourself as the rightful holder of your role and treat any demand for proof as an insult.

**Editorial finding / approach:** A regards an ordinary proof requirement as an affront to a role they consider inherently theirs.

**Example 1 · 34 words**

**A:** Why is my name on the waiting list for my own table?  
**B:** Everyone has to book.  
**A:** People seeking a table book. I have a table.  
**B:** It's occupied.  
**A:** Then those people are borrowing my problem.  

**Example 2 · 32 words**

**A:** I've put my nameplate on the committee chair.  
**B:** There's an election first.  
**A:** An election confirms legitimacy. It doesn't invent my chair.  
**B:** You'll need to nominate yourself.  
**A:** How insulting. The nameplate already has.  

### S53 — The Crown Must Pass

**Card:** Treat another person as your likely successor. Prepare them to lead, then reclaim authority whenever their independence makes your influence feel temporary.

**Editorial finding / approach:** A prepares a successor but takes back control as soon as succession looks real.

**Example 1 · 38 words**

**A:** Here's the café key. Your first day in charge. I'll watch quietly.  
**B:** I'm changing the opening hours.  
**A:** Run the quiet decisions past me first.  
**B:** You said I was in charge.  
**A:** Yes. I'm here to help you resemble it.  

**Example 2 · 37 words**

**A:** Take my chair, deputy. Lead the meeting.  
**B:** First, let's remove the old approval process.  
**A:** Excellent confidence. I'll need to approve that.  
**B:** That's the process I'm removing.  
**A:** Then your first lesson is tact around the chair's previous occupant.  

### S54 — The Quiet Veto

**Card:** Remain pleasant and cooperative while behaving as though nothing can proceed without your private consent.

**Editorial finding / approach:** A remains agreeable while withholding the concrete consent needed to proceed.

**Example 1 · 40 words**

**A:** I'd love your exhibition to happen. I haven't signed the room form yet.  
**B:** What needs changing?  
**A:** Bring me something I can feel comfortable signing.  
**B:** You said the plan was perfect.  
**A:** And I'd hate to spoil it with a premature signature.  

**Example 2 · 27 words**

**A:** Your proposal has my wholehearted encouragement.  
**B:** Can we have the funding code?  
**A:** As soon as encouragement becomes consent.  
**B:** What's the difference?  
**A:** Six digits, which I'm still considering.  

### S55 — We Started Equal

**Card:** Use shared beginnings to erase present rank, titles, and attempts to place distance between you.

**Editorial finding / approach:** Shared beginnings erase present rank; A treats new formal distance as a betrayal of old equality.

**Example 1 · 36 words**

**A:** We started on the same biscuit-packing line. Pass the biscuits, Director.  
**B:** Please use my title at work.  
**A:** Certainly. Fellow Biscuit Packer with an Office.  
**B:** Things have changed.  
**A:** Then you can afford to pass the expensive ones.  

**Example 2 · 36 words**

**A:** I've pulled my chair level with yours. First-day habit.  
**B:** This side is for management.  
**A:** We couldn't even find the toilets together on day one.  
**B:** I'm your manager now.  
**A:** Then manage to remember where we both started.  

### S56 — My Support, My Say

**Card:** Treat every past favor as a continuing investment in your right to influence present decisions.

**Editorial finding / approach:** Past support is treated as an ongoing investment that purchases current decision-making rights.

**Example 1 · 35 words**

**A:** I funded your bakery mixer. I should help choose the new menu.  
**B:** It was a birthday gift.  
**A:** To a particular vision of cake.  
**B:** I'm making bread now.  
**A:** Then my investment needs a meeting with bread.  

**Example 2 · 31 words**

**A:** Before changing the club name, remember who paid the deposit.  
**B:** We've paid you back.  
**A:** Financially. I'm discussing my continuing confidence.  
**B:** Does that ever get paid back?  
**A:** Not while decisions remain available.  

### S57 — The Trusted Deputy

**Card:** Act as the reliable second-in-command, managing access and details while quietly shaping every decision.

**Editorial finding / approach:** A controls a leader's choices through access and presentation while insisting they are merely assisting.

**Example 1 · 32 words**

**A:** I've prepared the director's options. Mine is first, in larger print.  
**B:** That's steering the decision.  
**A:** No, assisting its visibility.  
**B:** Put them in alphabetical order.  
**A:** Of course. I've named mine 'A Sensible Beginning.'  

**Example 2 · 35 words**

**A:** The captain's busy. I'll decide which messages reach her.  
**B:** This one changes our route.  
**A:** Then it goes under 'things she needn't worry about.'  
**B:** She needs to know.  
**A:** I'll summarise it after highlighting my preferred route.  

### S58 — The Succession Race

**Card:** Treat every success, mistake, and compliment as evidence in an ongoing contest over who should lead.

**Editorial finding / approach:** Everyday outcomes become a succession dossier, even before any vacancy exists.

**Example 1 · 36 words**

**A:** I fixed the office kettle. Useful evidence when they choose the next manager.  
**B:** The manager isn't leaving.  
**A:** Then I have time to fix the toaster.  
**B:** You don't need to campaign.  
**A:** I'm simply maintaining the succession appliances.  

**Example 2 · 36 words**

**A:** Sam forgot the meeting again. I've added it to my leadership comparison.  
**B:** There isn't a leadership contest.  
**A:** Then my perfect attendance is comfortably ahead.  
**B:** I'm cancelling today's meeting.  
**A:** I'll record that I arrived for it anyway.  

### S59 — Indispensable Rival

**Card:** Use another person’s judgment constantly while minimizing how much influence that dependence gives them.

**Editorial finding / approach:** A relies on a rival's judgment while denying the influence and taking public ownership.

**Example 1 · 33 words**

**A:** Check my speech for errors. Just a formality.  
**B:** The central argument doesn't work.  
**A:** I suspected that. Confirm my suspicion more fully.  
**B:** Will you credit me?  
**A:** For agreeing with my suspicion? That seems excessive.  

**Example 2 · 40 words**

**A:** Which route would you take? I already have a preference.  
**B:** The east road. The west bridge is closed.  
**A:** Exactly the kind of issue I was testing you on.  
**B:** You were heading west.  
**A:** To inspect the closure before my eastward decision.  

### S60 — Once Undermined

**Card:** Treat every disagreement as a possible repeat of the moment your authority was previously weakened.

**Editorial finding / approach:** A interprets small disagreement through a concrete past undermining, escalating procedural defenses.

**Example 1 · 33 words**

**A:** You want to change the meeting time. That's how the last coup started.  
**B:** It clashed with lunch.  
**A:** Last time it clashed with my authority.  
**B:** I'm just hungry.  
**A:** Then submit the hunger in writing.  

**Example 2 · 35 words**

**A:** You called me Pat instead of Chairperson. Interesting.  
**B:** We've known each other for years.  
**A:** And last year you voted against my shed proposal.  
**B:** We're discussing tea.  
**A:** Which I will now put to a recorded vote.  

### S61 — Power Looks Good

**Card:** Act fascinated by confident behavior; imitate it closely while resenting how naturally it seems to work.

**Editorial finding / approach:** A imitates another's confident technique while resenting its ease, visibly adjusting the same borrowed behavior.

**Example 1 · 36 words**

**A:** That pause of yours made everyone listen. I'll use a longer one.  
**B:** It was a cough.  
**A:** An authoritative cough. Mine will be deliberate.  
**B:** You don't need to copy me.  
**A:** Say that again. I like the certainty.  

**Example 2 · 31 words**

**A:** You got the table just by raising an eyebrow. Must be nice.  
**B:** You could ask the waiter.  
**A:** No. I'm developing a stronger eyebrow.  
**B:** He's coming over.  
**A:** Good. Watch mine outperform yours.  

### S62 — Formerly Important

**Card:** Carry the habits and expectations of a role that once made you important, even when the present no longer supports them.

**Editorial finding / approach:** An old office habit persists after the role ends; A treats lost power as a technical inconvenience.

**Example 1 · 32 words**

**A:** I've rung my old headteacher's bell. Why is nobody lining up?  
**B:** This is your retirement lunch.  
**A:** Lunch still benefits from orderly pupils.  
**B:** We're your former colleagues.  
**A:** Then you should require less supervision.  

**Example 2 · 32 words**

**A:** Bring the shop takings to me, as usual.  
**B:** You sold the shop last year.  
**A:** I kept the counting tray.  
**B:** That doesn't make you the owner.  
**A:** Then why does the money still fit?  

### S63 — One Mistake from Gone

**Card:** Treat every decision as a test of whether you still deserve your place.

**Editorial finding / approach:** A treats a trivial new decision as proof of continued suitability and seeks escalating verification.

**Example 1 · 35 words**

**A:** It's my first lunch order as supervisor. Is soup too indecisive?  
**B:** It's just lunch.  
**A:** That's what a confident supervisor would say.  
**B:** Order what you like.  
**A:** Could you witness that instruction before I risk the soup?  

**Example 2 · 37 words**

**A:** I've signed the delivery form. Was my signature managerial enough?  
**B:** It just needs to be legible.  
**A:** So they've lowered the standard for me?  
**B:** No, it's the same form.  
**A:** Then I'll practise until I deserve the same form.  

### S64 — Protection Has Terms

**Card:** Treat safety, support, and reassurance as arrangements that require you to remain in control.

**Editorial finding / approach:** Support is offered as a conditional arrangement that keeps A in supervisory control.

**Example 1 · 34 words**

**A:** You can borrow my car if I approve every stop.  
**B:** I'm visiting my sister.  
**A:** A safe first destination. Send me the return plan.  
**B:** Can't I decide that?  
**A:** Not while enjoying my comprehensive support package.  

**Example 2 · 30 words**

**A:** I'll back your exhibition, provided I choose the guest list.  
**B:** That's controlling the exhibition.  
**A:** Protecting it from unsuitable viewers.  
**B:** It's about independence.  
**A:** Then let me make independence safe for you.  

### S65 — Chosen by Power

**Card:** Seek the attention of whoever seems influential and treat that attention as proof that you belong.

**Editorial finding / approach:** A treats influential attention as proof of inclusion, trying to convert incidental contact into public affiliation.

**Example 1 · 37 words**

**A:** The mayor said hello. Should I join her table now?  
**B:** She says hello to everybody.  
**A:** Then she'll recognise me when you introduce us properly.  
**B:** She doesn't know your name.  
**A:** Good. There's still room for a memorable introduction.  

**Example 2 · 34 words**

**A:** Put me beside the director in the group photo.  
**B:** She only asked you to hold her coat.  
**A:** A position of trust.  
**B:** She's taking it back.  
**A:** Then photograph the handover. It shows we work closely.  

### S66 — Public Respect

**Card:** Seek visible signs of respect and treat private appreciation as insufficient.

**Editorial finding / approach:** Private appreciation is insufficient; A seeks a public, correctly framed display of respect.

**Example 1 · 41 words**

**A:** Thank you for your lovely private note. Which microphone will you repeat it into?  
**B:** I meant it just for you.  
**A:** And I received it. Now we can broaden distribution.  
**B:** It's a staff lunch.  
**A:** Excellent. A captive audience for the full title.  

**Example 2 · 31 words**

**A:** Could you use 'Chair' when introducing me at the picnic?  
**B:** Everyone knows you're in charge.  
**A:** Then it won't confuse them to hear it.  
**B:** We're passing sandwiches.  
**A:** Pass them through the Chair.  

### S67 — Chain of Command

**Card:** Treat every question, favor, and decision as something that must travel through the proper hierarchy.

**Editorial finding / approach:** An ordinary request is routed through an escalating hierarchy, not just used as an avoidance objective.

**Example 1 · 35 words**

**A:** Your request for a teaspoon must go through the kitchen supervisor.  
**B:** You're standing beside the teaspoons.  
**A:** Physical proximity is not authority.  
**B:** I'm the kitchen supervisor.  
**A:** Then countersign your request. I'll pass it up to catering.  

**Example 2 · 36 words**

**A:** Before I lend you this ladder, your department head must ask mine.  
**B:** We're neighbours, cleaning our gutters.  
**A:** Then we'll need to establish departmental boundaries.  
**B:** Can I just borrow it?  
**A:** Not while the gutter committee remains unformed.  

### S68 — Power Vacuum

**Card:** Treat any uncertainty about who is in charge as an emergency that must be resolved immediately.

**Editorial finding / approach:** An empty leadership position becomes the emergency; attempts at shared decisions create another authority question.

**Example 1 · 26 words**

**A:** Nobody's chairing this picnic. We can't open the hamper.  
**B:** We can decide together.  
**A:** Who authorises together?  
**B:** Just pass the bread.  
**A:** Is that a nomination? I accept.  

**Example 2 · 31 words**

**A:** The manager's left early. Who's responsible for the kettle?  
**B:** Anyone can make tea.  
**A:** An uncontrolled beverage structure.  
**B:** I'll make it.  
**A:** Good. Say it clearly so we have a chain of succession.  

### S69 — Opportunity for Influence

**Card:** Find a path to greater influence in every assignment, setback, or unexpected responsibility.

**Editorial finding / approach:** A turns each undesirable task or setback into a specific expansion of influence.

**Example 1 · 33 words**

**A:** You've given me the broken printer. I'll need authority over purchasing.  
**B:** It probably just needs paper.  
**A:** Then I'll oversee paper policy too.  
**B:** It's a small repair.  
**A:** Excellent. A manageable beginning for my department.  

**Example 2 · 32 words**

**A:** My proposal failed? Then I'll chair the review.  
**B:** We're not forming a committee.  
**A:** Someone must coordinate the absence of one.  
**B:** You're getting more work, not more power.  
**A:** Then I'll need a deputy.  

### S70 — Who Can Authorize This?

**Card:** Treat titles and speeches as secondary; focus on who can grant access, allocate resources, and create consequences.

**Editorial finding / approach:** A ignores symbolic rank and follows the concrete power to unlock, pay or authorize.

**Example 1 · 33 words**

**A:** Lovely ribbon-cutting speech. Who has the key to the building?  
**B:** The chief executive is over there.  
**A:** Does she have the key?  
**B:** The caretaker does.  
**A:** Then my congratulations can wait. I need the caretaker.  

**Example 2 · 38 words**

**A:** Your title's impressive. Can you release the repair funds?  
**B:** My deputy handles finance.  
**A:** Then may I speak to the powerful part of this office?  
**B:** I make the big decisions.  
**A:** Good. Decide to introduce me to the cheque book.  

### S71 — Symbol of Office

**Card:** Choose one symbol, privilege, or position and treat control of it as proof of legitimate authority.

**Editorial finding / approach:** Possession of a small symbol becomes A's basis for legitimate authority, even when the symbol is trivial.

**Example 1 · 35 words**

**A:** I'm wearing the barbecue apron. I decide when the burgers turn.  
**B:** It's my apron.  
**A:** Then you should respect its office.  
**B:** I'll take it back.  
**A:** That would be a transfer of power. Finish your petition first.  

**Example 2 · 33 words**

**A:** I have the meeting bell. That means I'm chairing.  
**B:** It's a bicycle bell.  
**A:** And yet you stopped talking when I rang it.  
**B:** Could I borrow it?  
**A:** After I finish deciding whether you may.  

### S72 — Invisible Hierarchy

**Card:** Treat every interaction as evidence of an unseen hierarchy and keep identifying who truly outranks whom.

**Editorial finding / approach:** A reads an ordinary exchange as evidence of hidden rank and updates a hierarchy from each new clue.

**Example 1 · 33 words**

**A:** You fetched her coffee. So she's above you on the chart.  
**B:** I was being nice.  
**A:** Unpaid tribute. A very secure position for her.  
**B:** She fetched mine yesterday.  
**A:** Then this is a rotating monarchy.  

**Example 2 · 37 words**

**A:** Everyone looked at the quiet man before agreeing. He must run this place.  
**B:** He's the electrician. The lights flickered.  
**A:** Control over visibility. Higher than management.  
**B:** He's leaving now.  
**A:** Then we should conclude before the hierarchy goes dark.  

### S73 — Emotional Seniority

**Card:** Carry yourself as the person who understands this relationship best, and treat your interpretation as the one that should settle disagreements.

**Editorial finding / approach:** A claims authority over what the relationship means and treats B's contrary account as evidence within A's interpretation.

**Example 1 · 40 words**

**A:** I know why we're arguing about the spare key. We're afraid of change.  
**B:** I'm afraid of you losing another key.  
**A:** That's how change expresses itself through you.  
**B:** Could you just return it?  
**A:** See? You're trying to close the emotional door.  

**Example 2 · 30 words**

**A:** Our dinner silence means we're comfortable together.  
**B:** I'm angry about your joke.  
**A:** You only tell me that because you're comfortable.  
**B:** Please stop interpreting me.  
**A:** An honest request. Our communication's improving.  

### S74 — Keeper of the Peace

**Card:** Project calm authority over the relationship while carefully avoiding anything that might expose how fragile the peace really is.

**Editorial finding / approach:** A stages calm rituals to contain a fragile peace; a practical disturbance reveals the strain.

**Example 1 · 37 words**

**A:** I've made soup. We can have a perfectly calm dinner.  
**B:** We need to discuss last night.  
**A:** After soup. Nothing sharp while we're using spoons.  
**B:** Your hand is shaking.  
**A:** The soup's excited. I'm managing both of us beautifully.  

**Example 2 · 34 words**

**A:** Let's put the difficult letter under the fruit bowl until Sunday.  
**B:** It's Sunday.  
**A:** Next Sunday. A full week of peace.  
**B:** We can't keep postponing this.  
**A:** Then speak softly. I've balanced the bowl very carefully.  

### S75 — I Know Your Tells

**Card:** Use intimate knowledge of habits, moods, and patterns as expertise that lets you diagnose every choice.

**Editorial finding / approach:** A diagnoses personal habits as intimate evidence and expands the diagnosis when B denies the reading.

**Example 1 · 45 words**

**A:** You've tapped your cup three times. You're about to ask for money.  
**B:** I'm waiting for the tea to cool.  
**A:** That's the story you used before the bicycle loan.  
**B:** I don't need money.  
**A:** Then this is a much larger favour. I'll put the kettle back on.  

**Example 2 · 32 words**

**A:** You chose the chipped mug. Bad news, isn't it?  
**B:** It's my favourite mug.  
**A:** Especially before an uncomfortable sentence.  
**B:** I just want tea.  
**A:** That's the sentence before the sentence. I know your structure.  

### S76 — Still Part of This

**Card:** Act as though shared history permanently guarantees your place, even when present boundaries suggest otherwise.

**Editorial finding / approach:** A treats old membership as permanent entitlement despite present boundaries, keeping the same concrete place in dispute.

**Example 1 · 36 words**

**A:** I've hung my coat on my old hook. What's for dinner?  
**B:** You moved out three years ago.  
**A:** The hook didn't.  
**B:** We use that space for guests now.  
**A:** Then tell the guests their hook has an owner.  

**Example 2 · 31 words**

**A:** I've put my usual chair at the club table.  
**B:** Your membership expired.  
**A:** Our history didn't. This chair remembers me.  
**B:** You'll need to reapply.  
**A:** For what? Returning to where I already belong?  

### S77 — Keeper of Precedent

**Card:** Treat your longer memory as an archive, not a throne. Cite specific promises and precedents whenever the relationship faces a new choice.

**Editorial finding / approach:** A cites specific shared promises as evidence to renegotiate, not as automatic superiority.

**Example 1 · 33 words**

**A:** Our Tuesday agreement says whoever cooks doesn't wash up.  
**B:** I didn't know you kept it.  
**A:** We both signed beside the spaghetti stain.  
**B:** Could we change the rule?  
**A:** Certainly. Together, before I cook again.  

**Example 2 · 35 words**

**A:** We promised to call before borrowing the car. Here's the note.  
**B:** People change.  
**A:** Then let's update the promise with both people present.  
**B:** I thought you'd forgotten.  
**A:** That's why I date things. Memory shouldn't decide fairness.  

### S78 — Private Access

**Card:** Use shared confidences and private knowledge as quiet leverage, never stating how much influence that closeness gives you.

**Editorial finding / approach:** Private knowledge gives A leverage without stating the secret; B's public setting intensifies that control.

**Example 1 · 37 words**

**A:** Before the guests arrive, we should discuss the envelope in my drawer.  
**B:** Say it here.  
**A:** Not beside your lovely public version of last summer.  
**B:** What are you implying?  
**A:** Only that we should take our tea somewhere quieter.  

**Example 2 · 36 words**

**A:** I've still got the key to our old keepsake box.  
**B:** Why mention that at dinner?  
**A:** I thought you'd prefer a mention to an opening.  
**B:** Put the key away.  
**A:** Gladly. Shall we talk in the kitchen first?  

### S79 — Our Private Language

**Card:** Use old references, shorthand, and familiar rhythms as proof that this connection exists beneath whatever has changed.

**Editorial finding / approach:** A revives a specific private shorthand and uses B's partial recall to restore shared rhythm.

**Example 1 · 33 words**

**A:** Purple umbrellas, remember? That's our signal for leaving a dull party.  
**B:** I thought it meant order dessert.  
**A:** Only with the eyebrow. Watch.  
**B:** That still means dessert.  
**A:** Good. We'll escape after pudding, like always.  

**Example 2 · 33 words**

**A:** Two taps on the table. You know what that means.  
**B:** We haven't done that since school.  
**A:** Your hand nearly answered.  
**B:** I was moving my glass.  
**A:** Move it twice and I'll get our coats.  

### S80 — I Was There

**Card:** Treat your presence during a difficult time as an enduring claim on loyalty, honesty, and consideration.

**Editorial finding / approach:** A's presence during a past difficulty becomes a claim to present honesty and loyalty.

**Example 1 · 45 words**

**A:** I sat beside you all night when the business failed. Tell me the real answer.  
**B:** I said I'm fine.  
**A:** At four in the morning you used shorter lies.  
**B:** You didn't have to stay.  
**A:** I know. That's why I'd like more than the visitor version now.  

**Example 2 · 37 words**

**A:** I drove through that storm for you. Don't give me the polite refusal.  
**B:** I'm genuinely busy.  
**A:** Then tell me what with. I earned a noun.  
**B:** It was years ago.  
**A:** The road's repaired. My expectation of honesty hasn't.  

### S81 — Back in Our Roles

**Card:** Return immediately to the role you usually play in this relationship, even when the present situation calls for something different.

**Editorial finding / approach:** A resumes the familiar fixer or caretaker role even when B asks for a different kind of presence.

**Example 1 · 36 words**

**A:** You're upset. I'll make tea and telephone whoever needs sorting out.  
**B:** Could you just listen?  
**A:** Of course. Who am I listening about?  
**B:** Nobody needs fixing.  
**A:** Then I'll fix the temperature of the tea while you explain.  

**Example 2 · 34 words**

**A:** You're late again. I've prepared your usual excuse.  
**B:** I was going to apologise honestly.  
**A:** Right. I'll tidy the wording.  
**B:** I can do this myself.  
**A:** Then tell me what my part is before you start.  

### S82 — The Other Favorite

**Card:** Treat every sign of attention, trust, and affection as something to compare with what another connection appears to receive.

**Editorial finding / approach:** A compares concrete signs of affection and turns innocent practical explanations into further comparisons.

**Example 1 · 32 words**

**A:** Sam's photo has a bigger frame than mine.  
**B:** It was a bigger photograph.  
**A:** So you had room for more Sam.  
**B:** I can buy matching frames.  
**A:** Only if mine doesn't look like compensation.  

**Example 2 · 37 words**

**A:** Their invitation has a ribbon. Mine has a staple.  
**B:** I ran out of ribbon.  
**A:** At exactly my place in the affection queue.  
**B:** You were the first invitation.  
**A:** Then why did you start with stationery instead of love?  

### S83 — Old Reflex

**Card:** Turn to this person first whenever uncertainty appears, as an old reflex. Notice the habit only after you have already involved them.

**Editorial finding / approach:** A seeks the familiar person's help reflexively and only notices the habit afterward.

**Example 1 · 39 words**

**A:** Which key opens my new flat? Sorry, you haven't been there.  
**B:** You chose it without me.  
**A:** Right. Which pocket would I have put the key in?  
**B:** Your left, usually.  
**A:** There it is. We still work on the smaller decisions.  

**Example 2 · 39 words**

**A:** I've called to ask which coat to wear. You're already beside me.  
**B:** You don't need to call me.  
**A:** My thumb got worried before I did.  
**B:** Wear the blue one.  
**A:** Thanks. I'll hang up and tell you how it went.  

### S84 — Almost Forgiven

**Card:** Behave as though the past is nearly resolved, but let each small disappointment reopen one precise part of the hurt.

**Editorial finding / approach:** A claims forgiveness but a small related cue reopens a precise unreconciled detail.

**Example 1 · 27 words**

**A:** I've forgiven the missed birthday. Pass the calendar.  
**B:** Then why is that date circled?  
**A:** For administrative closure.  
**B:** You've circled next year's too.  
**A:** Forgiveness benefits from advance notice.  

**Example 2 · 36 words**

**A:** We're fine about the broken vase. Don't make that particular joke.  
**B:** The vase joke?  
**A:** The one where my disappointment is the amusing bit.  
**B:** I thought we'd moved on.  
**A:** We had. You brought the vase with us.  

### S85 — Easy to Love

**Card:** Interpret another person’s ease with affection as both admirable and unfair, then compete to seem equally worth choosing.

**Editorial finding / approach:** A envies easy affection and tries to match it through effort disguised as natural warmth.

**Example 1 · 34 words**

**A:** Everyone hugs you so easily. I've brought your favourite biscuits.  
**B:** You didn't have to.  
**A:** Neither did they hug you, apparently. It just happens.  
**B:** Come sit with us.  
**A:** Gladly. I rehearsed a very spontaneous smile.  

**Example 2 · 31 words**

**A:** Your greeting makes people light up. Listen to my new version.  
**B:** Just say hello normally.  
**A:** Hello! Was that effortlessly lovable?  
**B:** It was loud.  
**A:** I'll reduce the volume and keep the affection.  

### S86 — Who We Used to Be

**Card:** Perform the version of yourself that belonged to this relationship before it changed, and treat old chemistry as still recoverable.

**Editorial finding / approach:** A performs their old relational self and tries to make past chemistry briefly usable in the present.

**Example 1 · 38 words**

**A:** I've put on our old driving song. Shall we take the coast road?  
**B:** We used to get lost there.  
**A:** Yes, but I was adventurous then.  
**B:** You complained for forty miles.  
**A:** With chemistry. Let me try the opening complaint.  

**Example 2 · 37 words**

**A:** I wore the scarf from our first photograph.  
**B:** It doesn't fit your coat anymore.  
**A:** It fits the person you met.  
**B:** You don't have to be that person.  
**A:** Just until dessert. He knew how to make you laugh.  

### S87 — One Step from Distance

**Card:** Treat pauses, divided attention, and small boundaries as signs that the connection may be slipping away.

**Editorial finding / approach:** Small delays or boundaries are interpreted as incremental loss of connection rather than final disaster.

**Example 1 · 36 words**

**A:** You took longer to answer my message today.  
**B:** I was in a meeting.  
**A:** A meeting I used to hear about.  
**B:** It was just work.  
**A:** Then tell me one boring detail so I know there's still room.  

**Example 2 · 34 words**

**A:** You said maybe to Friday. Should I stop setting your place?  
**B:** I need to check my shift.  
**A:** I'm trying not to turn maybe into distance.  
**B:** I'll tell you tomorrow.  
**A:** Could tomorrow have a time?  

### S88 — Love Means Checking

**Card:** Treat close monitoring of choices, moods, and details as care, becoming more involved whenever you feel uncertain.

**Editorial finding / approach:** Monitoring is framed as care and expands as B attempts to reassure A.

**Example 1 · 33 words**

**A:** Text me when you arrive, then when you've found your seat.  
**B:** It's only the cinema.  
**A:** Dark rooms deserve accurate updates.  
**B:** I can look after myself.  
**A:** Excellent. Text me when you've started doing that.  

**Example 2 · 35 words**

**A:** I've packed your bag and checked your route.  
**B:** You packed things I don't need.  
**A:** Then you're protected against needs you haven't noticed.  
**B:** Please stop checking.  
**A:** Tell me you're safe and I'll check whether I can.  

### S89 — Still Your Person

**Card:** Seek small signs that you remain special, trusted, and included without directly asking where you stand.

**Editorial finding / approach:** A asks obliquely whether ordinary signs of special inclusion remain available.

**Example 1 · 33 words**

**A:** Should I use my chipped mug or one of the guest cups?  
**B:** Whichever you like.  
**A:** I used to know without asking.  
**B:** The chipped one's still yours.  
**A:** Good. I'll leave it beside yours, then.  

**Example 2 · 28 words**

**A:** I've still got you as my emergency contact.  
**B:** That's fine.  
**A:** Fine like paperwork, or fine like you'd come?  
**B:** I'd come.  
**A:** Right. I'll stop hovering over the delete button.  

### S90 — Remember What I Meant

**Card:** Create openings for shared memories that prove your past presence mattered and still deserves acknowledgment.

**Editorial finding / approach:** A invites a specific shared memory that acknowledges their past contribution and continued significance.

**Example 1 · 39 words**

**A:** You've kept the little boat I made you. Remember that afternoon?  
**B:** We were by the lake.  
**A:** And who stayed in the rain finding the right twig?  
**B:** You did.  
**A:** Good. The boat's getting credit, but I like a mention too.  

**Example 2 · 35 words**

**A:** That's my sleeve in your graduation photo.  
**B:** You caught me when I tripped.  
**A:** Funny how the sleeve made the official album.  
**B:** I remember the person in it.  
**A:** Tell me that bit. The sleeve's heard enough.  

### S91 — Our Thing

**Card:** Protect one shared ritual, phrase, or tradition as the living proof that the relationship still exists.

**Editorial finding / approach:** A shared ritual becomes proof of an ongoing relationship; practical business cannot proceed until it is honored.

**Example 1 · 36 words**

**A:** Two spoons for dessert. We still do our thing.  
**B:** Could we discuss the contract?  
**A:** After the first shared bite. Contracts shouldn't eat alone.  
**B:** I ordered my own pudding.  
**A:** Then bring it here. Our thing can expand.  

**Example 2 · 34 words**

**A:** We haven't finished the old handshake.  
**B:** I forgot the last move.  
**A:** Then we'll slow down until your hand remembers.  
**B:** We're keeping the taxi waiting.  
**A:** The taxi hasn't known us as long as this handshake.  

### S92 — This Is How It Ends

**Card:** Treat every awkward pause, changed plan, or small disagreement as the possible beginning of permanent distance.

**Editorial finding / approach:** A reads a minor changed plan as the first step of permanent separation and begins practical farewell behavior.

**Example 1 · 35 words**

**A:** You cancelled lunch. Should I leave my key?  
**B:** I have a dentist appointment.  
**A:** First lunch, then the key, then separate dentists.  
**B:** Keep your key.  
**A:** For emergencies or belonging? I'm choosing which ring it goes on.  

**Example 2 · 33 words**

**A:** You've moved my chair away from yours. Shall I pack the books too?  
**B:** I was vacuuming.  
**A:** That's how empty spaces begin.  
**B:** I'll move it back.  
**A:** Before or after deciding which spaces stay empty?  

### S93 — A Sign We’re Fine

**Card:** Interpret every laugh, favor, and familiar habit as evidence that the connection is stronger than appearances suggest.

**Editorial finding / approach:** A treats ordinary familiar gestures as reassuring evidence even when B offers a mundane explanation.

**Example 1 · 37 words**

**A:** You remembered my chipped plate. We're still us.  
**B:** It's the only clean plate.  
**A:** And it found its way to me. Good instincts.  
**B:** You're reading into it.  
**A:** I'd rather read into a plate than give up over washing-up.  

**Example 2 · 37 words**

**A:** We laughed at the same terrible joke. That's promising.  
**B:** It was just a joke.  
**A:** Exactly. No effort, no negotiation, still together on the punchline.  
**B:** We still need to talk.  
**A:** Over dinner? The joke's earned us a table.  

### S94 — Relationship Maintenance

**Card:** Accept every emotional complication, then focus on the next concrete act that could make staying connected easier.

**Editorial finding / approach:** A accepts emotional complexity and translates it into a manageable concrete act of connection.

**Example 1 · 38 words**

**A:** We can be angry and still choose a Tuesday to talk.  
**B:** A diary won't fix this.  
**A:** No. It gives the fixing somewhere to happen.  
**B:** I don't know what I'll say.  
**A:** Then we'll start at six with not knowing.  

**Example 2 · 35 words**

**A:** I accept that visiting is difficult. Shall I leave a spare key?  
**B:** It's not about the door.  
**A:** I know. Let's remove one easier obstacle.  
**B:** We still need boundaries.  
**A:** Then write the hours beside the key.  

### S95 — Those Exact Words

**Card:** Choose one phrase from the interaction and keep returning to what its wording must reveal about the relationship.

**Editorial finding / approach:** One exact phrase becomes the object of sustained relational interpretation, with B's clarification giving A new wording to inspect.

**Example 1 · 36 words**

**A:** You wrote 'welcome for now.' Why for now?  
**B:** I meant you're welcome to stay.  
**A:** Then now has brought an unnecessary suitcase.  
**B:** You're reading too much into it.  
**A:** Too much is another interesting measurement of my welcome.  

**Example 2 · 26 words**

**A:** You said we're still friends. Still?  
**B:** Yes. Friends.  
**A:** You can't quietly remove the word after I've heard it.  
**B:** It's a reassuring word.  
**A:** Reassuring against what, exactly?  

### S96 — Fate Keeps Reconnecting Us

**Card:** Treat every coincidence, interruption, and repeated encounter as proof that this connection is meant to continue.

**Editorial finding / approach:** A interprets repeated encounters as fate and recruits practical coincidences into that belief.

**Example 1 · 34 words**

**A:** Third time this week we've met outside the bakery. Fate's persistent.  
**B:** We live on the same street.  
**A:** It chose an efficient route.  
**B:** I come for bread.  
**A:** Then fate knows how to keep you available.  

**Example 2 · 35 words**

**A:** We both reached for this coat. The universe wants us talking.  
**B:** It's my coat.  
**A:** And somehow my hand found your conversation starter.  
**B:** Could I have it back?  
**A:** Certainly. Let's see where the sleeves lead us.  

### S97 — The Emotional Center

**Card:** Carry yourself as the emotional center of the room, letting your mood determine what deserves attention and how seriously it should be treated.

**Editorial finding / approach:** A's mood determines the agenda, even when B's event ordinarily deserves attention.

**Example 1 · 39 words**

**A:** Could we lower the birthday banner? I'm having a complicated morning.  
**B:** It's my birthday.  
**A:** Exactly. I'd like to approach it at a manageable height.  
**B:** Can we at least sing?  
**A:** Begin softly. I'll let you know when we reach happy.  

**Example 2 · 37 words**

**A:** Before your good news, I need everyone to understand my afternoon.  
**B:** I got the promotion.  
**A:** Wonderful. Hold that feeling while I finish the parking story.  
**B:** It's quite big news.  
**A:** Then it deserves me in a receptive mood.  

### S98 — Composure on Loan

**Card:** Project steady control while quietly depending on everyone else to stay calm enough for you to maintain it.

**Editorial finding / approach:** A can project calm only if the environment cooperates; unexpected facts force ever tighter control of delivery.

**Example 1 · 39 words**

**A:** I can chair this meeting if everybody says the problems slowly.  
**B:** The delivery's gone missing.  
**A:** Slower, please. I haven't put my calm face on missing yet.  
**B:** We also lost the invoice.  
**A:** One loss per breath. We're a professional team.  

**Example 2 · 31 words**

**A:** I'm perfectly composed about the wedding. No surprises before tea.  
**B:** The cake's leaning.  
**A:** Then describe it as a change of angle.  
**B:** It's falling.  
**A:** Use the past tense after I've sat down.  

### S99 — Fluent in Feelings

**Card:** Treat every reaction as evidence you can expertly interpret; translate feelings, correct emotional misunderstandings, and prescribe the proper response.

**Editorial finding / approach:** A turns ordinary answers and resistance into expert emotional diagnoses.

**Example 1 · 34 words**

**A:** You said fine while folding your napkin. That's guarded resentment.  
**B:** It means the napkin was untidy.  
**A:** Order as emotional protection. Very clear.  
**B:** Stop analysing me.  
**A:** Excellent. We've found a feeling with a proper name.  

**Example 2 · 35 words**

**A:** You're laughing too quickly at that joke. Avoidance?  
**B:** I thought it was funny.  
**A:** Humour is often the front door to discomfort.  
**B:** Could you pass the biscuits?  
**A:** Seeking comfort. Which feeling would you like with them?  

### S100 — Earned My Place

**Card:** Treat what you have endured as proof that you belong here and deserve patience, access, and a voice in what happens next.

**Editorial finding / approach:** Endurance becomes A's credential for patience and participation rather than a request for sympathy.

**Example 1 · 42 words**

**A:** I worked through three winters to open this shop. Leave me a chair at the meeting.  
**B:** Only investors are invited.  
**A:** My cracked hands invested before the cheque books arrived.  
**B:** We need a contribution record.  
**A:** Start with the winters. I'll provide the dates.  

**Example 2 · 41 words**

**A:** I've waited six months for this audition. I'm entitled to finish the song.  
**B:** We only need a verse.  
**A:** Then give the verse room for six months of getting here.  
**B:** Everyone waited.  
**A:** Good. You'll understand why I'm not rushing the last note.  

### S101 — I Survived This First

**Card:** Use your experience with hardship as emotional seniority, offering guidance and judging how well others are handling the pressure.

**Editorial finding / approach:** A converts personal survival experience into emotional seniority, coaching and judging B's response.

**Example 1 · 34 words**

**A:** My first failed opening was worse. Tea before reading the reviews.  
**B:** I'd rather read them now.  
**A:** That's a beginner's relationship with disappointment.  
**B:** Maybe I handle it differently.  
**A:** Possibly. Try my way before inventing suffering.  

**Example 2 · 34 words**

**A:** I went through redundancy before you. First, tidy your desk slowly.  
**B:** I'm actually excited to leave.  
**A:** Early stage. I recognise the optimism.  
**B:** I have another job.  
**A:** Good. You'll need my advice about starting over.  

### S102 — The Quiet Disappointment

**Card:** Use restrained disappointment as quiet influence, making small pauses, lowered expectations, and careful praise carry more weight than direct demands.

**Editorial finding / approach:** A's careful understatement and withdrawn praise exert pressure without a direct command.

**Example 1 · 40 words**

**A:** No, it's quite all right you forgot the concert. I'll put the spare ticket away.  
**B:** You sound disappointed.  
**A:** Only by the amount of spare ticket.  
**B:** Can I make it up to you?  
**A:** I hadn't liked to suggest you might notice.  

**Example 2 · 41 words**

**A:** Your promise to call was lovely. I'm lowering my expectations gently.  
**B:** I was only an hour late.  
**A:** Yes. I've adjusted the size of an hour.  
**B:** Should I call earlier tomorrow?  
**A:** That would be a pleasant surprise. I'll leave room for one.  

### S103 — When We Still Believed

**Card:** Use a shared earlier hope as your emotional home base, returning to it whenever the present feels uncertain or disappointing.

**Editorial finding / approach:** A returns to an earlier shared hope as an emotional base without denying present disappointment.

**Example 1 · 37 words**

**A:** This napkin still says we'll open a bookshop by the sea.  
**B:** We drew that before rent became real.  
**A:** We also drew two chairs. We could start there.  
**B:** In our tiny flat?  
**A:** Yes. Sea later. Chairs together now.  

**Example 2 · 35 words**

**A:** Remember when this jar meant a summer trip, not spare buttons?  
**B:** We spent the money.  
**A:** The jar kept the idea.  
**B:** What can we put in it today?  
**A:** One coin. Let it remember its old job.  

### S104 — You Saw Me Through

**Card:** Treat past comfort you received as an enduring bond that should now earn honesty, patience, and reciprocal support.

**Editorial finding / approach:** Past comfort creates an ongoing bond and a claim to honest reciprocal presence.

**Example 1 · 45 words**

**A:** You lent me this scarf on the worst night of that year. Give me the honest answer now.  
**B:** I can't fix everything.  
**A:** I remember. You didn't fix the weather either. You stayed.  
**B:** What do you need?  
**A:** The version you'd say before deciding to protect me.  

**Example 2 · 42 words**

**A:** You sat beside me through the shop closing. Don't give me a polite maybe.  
**B:** I don't know what to say.  
**A:** Then say that. We managed whole hours of it before.  
**B:** Can I sit here?  
**A:** Yes. That's already more honest than the maybe.  

### S105 — The Strong One

**Card:** Be the strong one: steady everyone else, minimize your own needs, and resist any attempt to care for you.

**Editorial finding / approach:** A steadies others and rejects care directed toward their own visible need.

**Example 1 · 36 words**

**A:** I've made everyone tea. I'll handle the difficult calls.  
**B:** Your hands are shaking.  
**A:** Then it's good the calls don't require trays.  
**B:** Sit down. I'll call.  
**A:** Someone needs to look like we're managing. I'll sit after that.  

**Example 2 · 34 words**

**A:** Take the last tissue. I'm fine with my sleeve.  
**B:** You've been crying too.  
**A:** Efficiently. One less item from the box.  
**B:** Let me look after you.  
**A:** Certainly. Start by letting me look after everyone else.  

### S106 — Whose Pain Counts?

**Card:** Treat every disappointment as something to measure against what you have endured, competing for whose feelings deserve greater weight.

**Editorial finding / approach:** A measures another's disappointment against their own greater history and competes for conversational weight.

**Example 1 · 36 words**

**A:** One rejection? I've kept fourteen letters. I can lend you perspective.  
**B:** I just wanted to talk about mine.  
**A:** Of course. Mine establish the scale.  
**B:** It isn't a competition.  
**A:** Then you'll have time for all fourteen afterward.  

**Example 2 · 39 words**

**A:** You've had a rough week. I've had a rough year.  
**B:** Could I finish my story?  
**A:** Naturally. I'll mark where my twelve months fit.  
**B:** I need you to listen.  
**A:** I did. Your week sounds like one of my quieter Tuesdays.  

### S107 — My Safe Person

**Card:** Use one person’s reactions as your measure of safety, then downplay how much their reassurance changes you.

**Editorial finding / approach:** A uses one person's reaction as a safety gauge while denying dependence on that reassurance.

**Example 1 · 40 words**

**A:** Stay seated while I open this letter. Your face looks reassuring.  
**B:** You can open it without me.  
**A:** Certainly. Keep looking like that while I prove it.  
**B:** I don't know what's inside.  
**A:** You weren't supposed to let your face hear that.  

**Example 2 · 33 words**

**A:** Sit beside me for the result. It's only a better viewing angle.  
**B:** You want me here because you're nervous.  
**A:** No. The chair arrangements are emotionally practical.  
**B:** I'll stay.  
**A:** Good. My angle's improved already.  

### S108 — Careful Around the Scar

**Card:** Treat one harmless detail as the trigger for an old hurt. Become overly careful, helpful, or controlled whenever it returns.

**Editorial finding / approach:** A overcontrols one harmless cue associated with old hurt, keeping each scene on a single concrete trigger.

**Example 1 · 35 words**

**A:** Could we use any cups except the blue ones today?  
**B:** What happened with a blue cup?  
**A:** Nothing breakfast needs to revisit.  
**B:** I'll put it away.  
**A:** Behind the plates, please. The handle's still looking this way.  

**Example 2 · 33 words**

**A:** Don't open that yellow envelope beside the cake.  
**B:** It's only a bill.  
**A:** Then it can wait somewhere less festive.  
**B:** Why are you wiping the table again?  
**A:** Making room for everything except the envelope.  

### S109 — Braver Than Me

**Card:** Treat another person’s emotional courage as both inspiring and unfair, resenting how exposed or hesitant it makes you feel.

**Editorial finding / approach:** A admires emotional courage but resents how easily B appears to manage it.

**Example 1 · 38 words**

**A:** You opened your rejection letter straight away. Must be nice, being brave on demand.  
**B:** I was scared too.  
**A:** You hid it very efficiently.  
**B:** Take your time with yours.  
**A:** I'd prefer to need exactly as little time as you.  

**Example 2 · 37 words**

**A:** You told them how you felt without rehearsing. I resent how impressive that was.  
**B:** I stumbled over half of it.  
**A:** Even your stumbling looked courageous.  
**B:** Want to practise with me?  
**A:** Yes. Don't make practising look easy too.  

### S110 — Before I Knew Better

**Card:** Perform the more hopeful version of yourself from before disappointment taught you caution, and defend that version when reality intrudes.

**Editorial finding / approach:** A deliberately revives an older hopeful self and defends a hopeful statement against qualification.

**Example 1 · 36 words**

**A:** I've written when the shop opens, not if.  
**B:** We should be realistic.  
**A:** I tried realistic for five years. It never painted the sign.  
**B:** What if nobody comes?  
**A:** Then let hopeful me choose the opening hours first.  

**Example 2 · 33 words**

**A:** I'm entering the talent show like I did at seventeen.  
**B:** You hated losing then.  
**A:** I loved entering before I learned that part.  
**B:** Will you be okay?  
**A:** Ask me after one completely unqualified yes.  

### S111 — Waiting for the Bad News

**Card:** Treat pauses, changes, and uncertainty as signs that rejection or loss is approaching, then prepare yourself before it arrives.

**Editorial finding / approach:** A prepares for loss before the uncertain message arrives and interprets reassurance as a possible preface.

**Example 1 · 36 words**

**A:** I've brought a box to the meeting. Is this where you dismiss me?  
**B:** We want to discuss your promotion.  
**A:** Promotion to what? The box is very adaptable.  
**B:** More responsibility.  
**A:** Right. I'll keep it for the mistakes.  

**Example 2 · 36 words**

**A:** You paused before answering. Shall I brace for goodbye?  
**B:** I was swallowing tea.  
**A:** People prepare their throats for difficult news.  
**B:** I'm asking you to dinner.  
**A:** One last dinner, or may I leave the box at home?  

### S112 — Let Me Carry It

**Card:** Take responsibility for managing everyone’s emotional burden, deciding what they should know, feel, and face.

**Editorial finding / approach:** A manages which emotional burdens others encounter, treating other people's autonomy as another burden to carry.

**Example 1 · 41 words**

**A:** Give me the letter first. I'll decide whether today can hold it.  
**B:** It's addressed to me.  
**A:** And I know how crowded your day already is.  
**B:** I can handle my own news.  
**A:** Then let me handle the timing of your handling it.  

**Example 2 · 40 words**

**A:** I've taken the difficult phone list. You rest.  
**B:** Some of those people need to speak to me.  
**A:** I'll sort them by how upsetting they might be.  
**B:** You can't manage everyone's feelings.  
**A:** Not while you keep adding objections to the list.  

### S113 — Tell Me We’re Okay

**Card:** Treat every response as evidence of whether you are still accepted, and adjust yourself quickly whenever reassurance feels incomplete.

**Editorial finding / approach:** Each incomplete reassurance triggers a practical adjustment intended to restore acceptance.

**Example 1 · 32 words**

**A:** We're okay, aren't we? I can move my chair back.  
**B:** We're okay.  
**A:** That sounded tired. Was the chair too close?  
**B:** Stop changing everything.  
**A:** Of course. Is this the right distance for stopping?  

**Example 2 · 30 words**

**A:** Was my joke too much? I'll change the ending.  
**B:** It was fine.  
**A:** Fine amused or fine tolerated?  
**B:** I like you. Relax.  
**A:** Good. Should I relax with or without the joke?  

### S114 — Don’t Pity Me

**Card:** Frame your struggle as evidence of strength, steering concern toward admiration and rejecting anything that feels like pity.

**Editorial finding / approach:** A redirects concern into respect for endurance, refusing the framing of pity.

**Example 1 · 35 words**

**A:** Don't call my disastrous opening heartbreaking. Call it excellent crowd management of no crowd.  
**B:** I was offering sympathy.  
**A:** Offer admiration. I stayed for the whole show.  
**B:** Would a hug help?  
**A:** As congratulations for endurance, perhaps.  

**Example 2 · 31 words**

**A:** I carried the entire move myself. Please stop making that poor-you face.  
**B:** You must be exhausted.  
**A:** Impressively exhausted.  
**B:** Can I bring you tea?  
**A:** Yes. In the mug marked champion, not survivor.  

### S115 — The Proper Way to Grieve

**Card:** Treat difficult feelings as requiring a precise ritual, sequence, or ceremony, and correct any attempt to rush or simplify it.

**Editorial finding / approach:** A controls an exact ritual of remembering or goodbye; the feeling is sincere and the comedy lies in procedure.

**Example 1 · 39 words**

**A:** Before we close the old café, one minute's silence for the kettle.  
**B:** It was only a kettle.  
**A:** It worked here longer than either of us. Stand properly.  
**B:** Can I unplug it?  
**A:** After the minute. Don't interrupt its final shift.  

**Example 2 · 39 words**

**A:** We remember the garden in order: roses, apple tree, then the stubborn shed.  
**B:** Could we just tell a story?  
**A:** After the roses have their turn.  
**B:** My story involves the shed.  
**A:** Then hold it respectfully until the tree has finished.  

### S116 — Emotional Emergency

**Card:** Interpret every hesitation, sigh, or change in tone as the beginning of an emotional emergency requiring immediate intervention.

**Editorial finding / approach:** A treats minor changes of expression as immediate emotional emergencies and escalates the intervention.

**Example 1 · 36 words**

**A:** You sighed at dinner. Should I stop the music?  
**B:** I ate too much.  
**A:** Physical distress with emotional implications. I'll clear the table.  
**B:** Please just sit down.  
**A:** Is sitting the intervention you need? I'll make a plan.  

**Example 2 · 33 words**

**A:** You've crumpled your napkin. What changed in the last ten seconds?  
**B:** I wiped sauce off my chin.  
**A:** Was the sauce disappointing?  
**B:** It was fine.  
**A:** Fine can be a warning word. I'll get water.  

### S117 — Hope Is Evidence

**Card:** Treat every small kindness, coincidence, or improvement as undeniable proof that the best possible outcome is gathering momentum.

**Editorial finding / approach:** A interprets tiny improvements as concrete evidence that the best outcome is already gathering momentum.

**Example 1 · 35 words**

**A:** The gallery said they'd consider my paintings. I'll order opening-night glasses.  
**B:** Consider doesn't mean yes.  
**A:** It means the door's open enough for glassware.  
**B:** They say that to everyone.  
**A:** Then the art world's becoming wonderfully inclusive.  

**Example 2 · 30 words**

**A:** We've sold one book. The shop's turning a corner.  
**B:** You bought it yourself.  
**A:** An informed customer recognised quality.  
**B:** It's still one sale.  
**A:** Exactly. The first of a very clear sequence.  

### S118 — What Do You Need Now?

**Card:** Accept every feeling as real, then translate it into water, space, a plan, a boundary, or the next practical step.

**Editorial finding / approach:** A validates the feeling without explanation and offers one concrete, negotiable practical support.

**Example 1 · 31 words**

**A:** You're upset. Water, quiet, or a walk?  
**B:** Water won't fix this.  
**A:** No. It makes being upset less thirsty.  
**B:** I don't want to explain.  
**A:** Then quiet comes with the water. No questionnaire.  

**Example 2 · 35 words**

**A:** We can be furious and still eat something. Toast?  
**B:** I can't think about food.  
**A:** I'll put it here so thinking isn't required.  
**B:** Don't tell me to calm down.  
**A:** I won't. Furious toast is still toast.  

### S119 — That One Look

**Card:** Choose one small look, phrase, silence, or gesture and treat it as the clearest evidence of what everything truly means.

**Editorial finding / approach:** A treats one tiny signal as the definitive emotional evidence and examines it beyond B's explanation.

**Example 1 · 38 words**

**A:** Your little wave had a pause in it. What did the pause mean?  
**B:** I was holding shopping.  
**A:** Then why did I feel dismissed between the bags?  
**B:** It was just a wave.  
**A:** Recreate it without the pause. Let's compare.  

**Example 2 · 35 words**

**A:** You put a full stop after thanks. Is that where things end?  
**B:** It's punctuation.  
**A:** Your usual thanks gets an exclamation mark.  
**B:** I was in a hurry.  
**A:** Enough hurry to remove enthusiasm. That's what I noticed.  

### S120 — A Turning Point

**Card:** Treat each emotional shift as proof that this moment will divide everything into before and after.

**Editorial finding / approach:** A declares an ordinary emotional shift to be the dividing point of life and formalises its aftermath.

**Example 1 · 38 words**

**A:** You laughed at my joke. I'm calling today the beginning of the new chapter.  
**B:** It was a small joke.  
**A:** Important beginnings often arrive compactly.  
**B:** Shall we have tea?  
**A:** Our first tea after the turning point. Use different cups.  

**Example 2 · 34 words**

**A:** I've written today's date in red. This is when I finally said no.  
**B:** To extra potatoes.  
**A:** The subject isn't the size of the boundary.  
**B:** Would you like gravy?  
**A:** Ask the new version of me.  

### S121 — The Keeper of Secrets

**Card:** Carry yourself as the person entrusted with what others cannot know, letting selective disclosure determine what everyone is allowed to discuss.

**Editorial finding / approach:** A determines the permitted subject matter through staged disclosure rather than simply keeping everything secret.

**Example 1 · 34 words**

**A:** You may read the first paragraph of the picnic briefing.  
**B:** Why not the second?  
**A:** You're not cleared to ask about paragraph two yet.  
**B:** It's about sandwiches.  
**A:** That disclosure has moved us ahead of schedule.  

**Example 2 · 36 words**

**A:** I've sorted the envelopes into now and not yet.  
**B:** Who decides when not yet becomes now?  
**A:** The person holding the envelopes.  
**B:** Can I help sort them?  
**A:** Yes. Begin with the pile marked questions you may ask.  

### S122 — Authority by Bluff

**Card:** Project control through confident half-answers while guarding the possibility that one direct question could expose how little you actually know.

**Editorial finding / approach:** Confident half-answers conceal A's lack of knowledge until a precise question threatens the bluff.

**Example 1 · 32 words**

**A:** The inspection details are entirely under control.  
**B:** What does page four require?  
**A:** A more detailed version of page three's requirements.  
**B:** Have you opened the folder?  
**A:** Not while it's maintaining such good control.  

**Example 2 · 30 words**

**A:** I know exactly why the alarms sounded. Proceed as briefed.  
**B:** What caused them?  
**A:** A triggering situation, now comprehensively assessed.  
**B:** Which situation?  
**A:** Let's not confuse a confident response with excessive specificity.  

### S123 — Professional Suspicion

**Card:** Treat inconsistencies, evasions, and missing details as evidence your trained eye should investigate before anyone proceeds.

**Editorial finding / approach:** A treats small inconsistencies as investigative evidence and follows a specific discrepancy through B's practical explanation.

**Example 1 · 34 words**

**A:** Your receipt says four; your note says four-oh-five. Explain the five minutes.  
**B:** I bought a biscuit.  
**A:** And omitted it from the account. Interesting.  
**B:** It wasn't relevant.  
**A:** Relevance is what my trained eye is investigating.  

**Example 2 · 30 words**

**A:** You crossed out cupboard and wrote shelf. Why?  
**B:** I remembered where the keys were.  
**A:** After initially remembering the wrong location.  
**B:** It's a correction.  
**A:** Yes. A very informative change in testimony.  

### S124 — Cleared to Know

**Card:** Treat access to private information as proof that you belong, and exclusion from any detail as a challenge to your legitimacy.

**Editorial finding / approach:** Restricted information becomes a test of A's membership; B's practical boundary triggers a more personal demand.

**Example 1 · 43 words**

**A:** Pass me the unredacted reunion plan. I'm family, not the public.  
**B:** That page lists everyone's surprise presents.  
**A:** Exactly. Family should get more than the visitor edition.  
**B:** It includes your present.  
**A:** Then tell me who chose it. I should know who considers me family.  

**Example 2 · 43 words**

**A:** Why does my club briefing have blacked-out names?  
**B:** Only the organising committee sees those.  
**A:** I stacked every chair. Apparently my arms joined before the rest of me.  
**B:** You can apply next month.  
**A:** May I see the unredacted application, or is that intimate too?  

### S125 — The Initiated One

**Card:** Treat others as recent initiates, revealing rules and information in carefully measured doses that preserve your seniority.

**Editorial finding / approach:** A dispenses knowledge as initiation and preserves rank by withholding the next step.

**Example 1 · 36 words**

**A:** You've earned the first half of the secret handshake.  
**B:** Can I learn the rest?  
**A:** Wanting it immediately suggests the first half hasn't settled.  
**B:** It's just a handshake.  
**A:** That's why you're still on fingers, not the wrist.  

**Example 2 · 39 words**

**A:** The first club rule is discretion. Ask me tomorrow about rule two.  
**B:** Could you tell me both now?  
**A:** That would leave no room for your development.  
**B:** How long did you wait?  
**A:** Long enough to appreciate withholding it from you.  

### S126 — Information Is Leverage

**Card:** Remain outwardly cooperative while controlling one useful fact, releasing only enough of it to shape each decision.

**Editorial finding / approach:** A releases useful information incrementally to shape decisions while sounding cooperative.

**Example 1 · 41 words**

**A:** I know which van has the missing parcel. Agree to check my route first.  
**B:** Tell me the van number.  
**A:** The first digit is four. Are we taking my route?  
**B:** We need the whole number.  
**A:** Then let's agree on a whole plan.  

**Example 2 · 34 words**

**A:** I can tell you who approved the expense.  
**B:** Why not tell me now?  
**A:** I'd like my repair budget discussed first.  
**B:** Are you bargaining with information?  
**A:** I'm helping the conversation find its most useful order.  

### S127 — Our First Secret

**Card:** Treat a shared secret from the beginning of the relationship as the truest proof of what still connects you.

**Editorial finding / approach:** An old shared secret is treated as the durable core of connection, even when its practical relevance has vanished.

**Example 1 · 34 words**

**A:** Purple gate. You remember where we hid the headmaster's bicycle.  
**B:** That was thirty years ago.  
**A:** And your face still knew before I finished.  
**B:** We've changed.  
**A:** Not the people who know about the purple gate.  

**Example 2 · 36 words**

**A:** Do we still knock twice before mentioning the biscuit tin?  
**B:** Nobody cares that we emptied it as children.  
**A:** That's not the point. Nobody else knows.  
**B:** Mum knew.  
**A:** Then our first secret has a very senior member.  

### S128 — I Covered for You

**Card:** Carry past concealment as an unpaid favor, expecting trust, access, and protection whenever the old debt becomes relevant.

**Editorial finding / approach:** A treats an old cover story as an unpaid investment requiring current loyalty or protection.

**Example 1 · 39 words**

**A:** I said you were with me that night. Back my account today.  
**B:** That was years ago.  
**A:** Yes. I've maintained the story without annual payment.  
**B:** I'm not lying for you.  
**A:** Then at least understand the value of my long silence.  

**Example 2 · 38 words**

**A:** You can show me the private schedule. I covered your missed shift.  
**B:** Access isn't payment for favours.  
**A:** Interesting. It was protection when you needed it.  
**B:** I thanked you.  
**A:** And now I'd like trust to have a practical application.  

### S129 — The Cleanup Person

**Card:** Return to the familiar role of containing damage, correcting stories, and protecting everyone from the consequences of disclosure.

**Editorial finding / approach:** A reflexively repairs stories and evidence for others, treating contradictory details as a familiar cleanup job.

**Example 1 · 39 words**

**A:** Give me every version before you explain the broken window.  
**B:** We can tell them ourselves.  
**A:** One says football; one says weather. Weather doesn't leave boots.  
**B:** Nobody asked you to help.  
**A:** Your stories asked each other for help. I'm translating.  

**Example 2 · 37 words**

**A:** I've removed the surprise-party labels from the boxes.  
**B:** You don't have to manage everything.  
**A:** Then stop writing SURPRISE beside the guest of honour's desk.  
**B:** She hasn't noticed.  
**A:** Good. My usual job is still ahead of the disclosure.  

### S130 — First to Solve It

**Card:** Treat each clue and inconsistency as a contest over who can understand the situation first and most completely.

**Editorial finding / approach:** A competes over discovery itself; each collaborative step becomes a claim to having solved first.

**Example 1 · 34 words**

**A:** I've found the missing parcel's tracking error. Put my name beside it.  
**B:** We were both looking.  
**A:** I circled it while you were saying looking.  
**B:** Let's fix it together.  
**A:** After recording who made together useful.  

**Example 2 · 33 words**

**A:** The mystery guest is the baker. I solved it.  
**B:** I told you about the flour.  
**A:** A clue is not a conclusion.  
**B:** I said it was the baker.  
**A:** Yes, but I believed it decisively.  

### S131 — Only You Can Know

**Card:** Treat one person as the only safe place for your honest reactions, while hiding how much their discretion determines what you can risk.

**Editorial finding / approach:** A reserves honest speech for one trusted person and downplays how much their discretion enables it.

**Example 1 · 37 words**

**A:** Close the office door. You're the only person getting this version.  
**B:** You could tell the team.  
**A:** They can have the weather. This needs your discretion.  
**B:** What's wrong?  
**A:** Let me hear the latch first, then I'll stop editing.  

**Example 2 · 44 words**

**A:** I wrote the truth in this notebook. Only you can read it.  
**B:** You don't need to trust just me.  
**A:** Naturally. I'm simply starting with the entire current list.  
**B:** Will you tell anyone else?  
**A:** After I know what honesty sounds like in a safe room.  

### S132 — The Missing Truth

**Card:** Treat every present exchange as incomplete until an old concealment, unanswered question, or broken confidence is finally addressed.

**Editorial finding / approach:** An old unanswered question interrupts current practical business until its missing truth is acknowledged.

**Example 1 · 40 words**

**A:** Before discussing the new holiday, why did you leave the old one early?  
**B:** That was years ago.  
**A:** And every new itinerary still has that blank.  
**B:** Can't we start fresh?  
**A:** Yes. Answer the first question so it stops packing with us.  

**Example 2 · 41 words**

**A:** I'll sign the club renewal after you explain the missing vote.  
**B:** We're choosing curtains today.  
**A:** And last time my vote disappeared between blue and green.  
**B:** Do you like these curtains?  
**A:** I don't yet know what happened to liking the last ones.  

### S133 — Envious of the Lie

**Card:** Treat another person’s composure under scrutiny as both impressive and unfair, resenting how easily they seem to control what others believe.

**Editorial finding / approach:** A admires apparent innocence and copies its delivery while resenting their own visible strain.

**Example 1 · 39 words**

**A:** You answered the manager without blinking. How do you look that innocent?  
**B:** I was telling the truth.  
**A:** Convenient technique. Not available in every situation.  
**B:** Why are you copying my shrug?  
**A:** Mine still looks like an admission. I'm adjusting it.  

**Example 2 · 27 words**

**A:** Your hands stayed perfectly still during the questions.  
**B:** They always do.  
**A:** Mine keep volunteering information.  
**B:** Put them in your pockets.  
**A:** Then I'll look guilty with excellent storage.  

### S134 — Before We Knew

**Card:** Return emotionally to the time before a difficult truth changed what you could believe, trust, or say openly.

**Editorial finding / approach:** A seeks a moment in the old explanation before accepting a new difficult truth, without disputing the evidence.

**Example 1 · 38 words**

**A:** Give me a minute with the photo before we discuss the forged trophy.  
**B:** The photo hasn't changed.  
**A:** The proud person looking at it has.  
**B:** We know the truth now.  
**A:** I know. Let me finish liking the old caption.  

**Example 2 · 37 words**

**A:** I preferred believing our club won honestly.  
**B:** We can't unknow the altered scores.  
**A:** No. But could we leave the bunting up until tea?  
**B:** Wouldn't that be pretending?  
**A:** Briefly saying goodbye to the version I hung it for.  

### S135 — Everyone Knows Something

**Card:** Interpret private conversations, careful wording, and unexplained pauses as signs that important information is being kept from you.

**Editorial finding / approach:** Ordinary privacy is interpreted as evidence of exclusion, with each denial becoming another suspicious detail.

**Example 1 · 26 words**

**A:** Why did the conversation stop when I entered?  
**B:** We were choosing lunch.  
**A:** Which course required my absence?  
**B:** We'd finished talking.  
**A:** Exactly as I arrived. Remarkable service.  

**Example 2 · 34 words**

**A:** Both your notebooks closed when I sat down.  
**B:** Mine fell shut.  
**A:** And the other one followed out of loyalty?  
**B:** There's nothing secret.  
**A:** Then why do I keep getting the summary instead of the conversation?  

### S136 — Protection Through Silence

**Card:** Protect others by withholding details, redirecting questions, and managing timing because you trust your own judgment about when the truth should surface.

**Editorial finding / approach:** A withholds information based on their own assessment of another person's readiness and timing.

**Example 1 · 38 words**

**A:** I'll give you the whole letter once we've found a quiet place.  
**B:** It's my letter.  
**A:** And this doorway is a terrible place to receive it.  
**B:** I can handle the news.  
**A:** Good. Handling includes a chair, which I'm arranging.  

**Example 2 · 36 words**

**A:** The last page can wait until after your performance.  
**B:** Does it concern the gallery?  
**A:** It concerns what you don't need in your head before singing.  
**B:** Let me decide.  
**A:** After the song. I'm protecting the first verse.  

### S137 — Trusted with This

**Card:** Treat being confided in as proof of closeness, and guard that privileged role whenever information begins spreading.

**Editorial finding / approach:** Being the original confidant is treated as proof of closeness; wider disclosure threatens that special role.

**Example 1 · 44 words**

**A:** You told me first about the move. Is this still a just-us secret?  
**B:** I'll tell the others tonight.  
**A:** Could you tell me before telling them, so I'm still first in something?  
**B:** It isn't a ranking.  
**A:** Then it won't hurt to preserve my place quietly.  

**Example 2 · 37 words**

**A:** Why is there another chair in our private conversation?  
**B:** Sam needs to know too.  
**A:** Of course. I just thought this part belonged to us.  
**B:** I trust both of you.  
**A:** Could you say my half before Sam arrives?  

### S138 — I Figured It Out

**Card:** Create opportunities to reveal that you noticed the pattern first while pretending recognition matters less than solving the problem.

**Editorial finding / approach:** A engineers recognition for early insight while pretending the timing is merely factual accuracy.

**Example 1 · 42 words**

**A:** I circled the broken latch on Tuesday. Before it became everyone's theory.  
**B:** You were right.  
**A:** Could you say that facing the rest of the room?  
**B:** I thought solving it mattered most.  
**A:** Absolutely. Accuracy about who solved it is part of solving it.  

**Example 2 · 32 words**

**A:** My first prediction's on top of the file. Accidentally chronological.  
**B:** Nobody knew the receipt mattered then.  
**A:** One pencil did. Mine.  
**B:** Well done.  
**A:** Thank you. I'll leave the date visible for administrative reasons.  

### S139 — The Secrecy Protocol

**Card:** Treat concealment as a precise ritual with passwords, signals, approved phrases, and severe consequences for careless improvisation.

**Editorial finding / approach:** Secrecy is an exact ritual even for trivial business; B's convenience request creates another protocol requirement.

**Example 1 · 28 words**

**A:** Password before we discuss the sandwiches.  
**B:** We're in an empty kitchen.  
**A:** Then nobody can interrupt the password.  
**B:** Is it still cucumber?  
**A:** Not aloud. You've triggered the vegetable-reset protocol.  

**Example 2 · 30 words**

**A:** Signal the cupboard with three fingers. Don't say where the cake is.  
**B:** The cake's on the table.  
**A:** Then use the table signal.  
**B:** Which is?  
**A:** That information requires the cake briefing.  

### S140 — The Leak Is Spreading

**Card:** Interpret every new question or coincidence as evidence that concealed information is escaping faster than it can be contained.

**Editorial finding / approach:** A interprets every extra question or copy as accelerating escape of information and expands containment.

**Example 1 · 32 words**

**A:** How did the florist know about our surprise party?  
**B:** We ordered flowers.  
**A:** So procurement is leaking. Who else has a receipt?  
**B:** The baker.  
**A:** The leak has reached food. We need a map.  

**Example 2 · 30 words**

**A:** There are three copies of the private letter now.  
**B:** For convenience.  
**A:** Convenience has doubled our exposure.  
**B:** Can I ask a question?  
**A:** Another question already? It's spreading faster than I counted.  

### S141 — A Delicious Mystery

**Card:** Treat every missing fact, contradiction, and suspicious detail as delightful proof that the situation is becoming more interesting.

**Editorial finding / approach:** Missing or contradictory facts delight A and create further investigative appetite.

**Example 1 · 34 words**

**A:** A page is missing from the club minutes. What a thoughtful mystery.  
**B:** Someone took it.  
**A:** And left us a perfectly shaped question.  
**B:** We need the budget figures.  
**A:** Even better. A mystery with financial consequences.  

**Example 2 · 37 words**

**A:** Your account contradicts the baker's. This is a wonderful afternoon.  
**B:** One of us must be wrong.  
**A:** Two possible stories for the price of tea.  
**B:** Aren't you worried?  
**A:** Not until they agree. That would ruin the interesting part.  

### S142 — Cover Story Logistics

**Card:** Accept that a secret plan exists, then focus on schedules, witnesses, explanations, cleanup, and what everyone must remember.

**Editorial finding / approach:** A accepts secrecy and tests its concrete logistics, witnesses and timing.

**Example 1 · 37 words**

**A:** Fine, we're planning a secret picnic. Who explains the rented bus?  
**B:** We'll say it's a school trip.  
**A:** On Sunday, with forty adults and a cake?  
**B:** We'll use cars instead.  
**A:** Good. Now whose drive hides forty adults' cars?  

**Example 2 · 29 words**

**A:** Your cover story says you caught the nine o'clock bus.  
**B:** Exactly.  
**A:** The last bus leaves at eight.  
**B:** Then I walked.  
**A:** Six miles carrying a cake? We need believable shoes.  

### S143 — One Suspicious Detail

**Card:** Choose one ordinary detail and treat it as the clue that will expose the entire hidden story.

**Editorial finding / approach:** One specific mundane clue dominates A's explanation while larger evidence is held back.

**Example 1 · 36 words**

**A:** Ignore the missing painting for a moment. Why is that thread red?  
**B:** It's from my scarf.  
**A:** Then why is it on the empty frame?  
**B:** I brushed against it.  
**A:** Good. The thread has finally acquired a witness.  

**Example 2 · 35 words**

**A:** This coffee ring is the key to the missing keys.  
**B:** The keys are in your pocket.  
**A:** Then explain why the cup was beside them.  
**B:** You put it there.  
**A:** And now we have the movement sequence.  

### S144 — Competing Theories

**Card:** Create several explanations for what is happening. Test each new clue against them, and switch allegiance whenever one theory gains strength.

**Editorial finding / approach:** A maintains competing explanations and changes allegiance as real clues favor one over another.

**Example 1 · 35 words**

**A:** The missing cake is theft, accident, or the dog. Keep all three on the board.  
**B:** There's icing on the dog.  
**A:** Dog moves into first place.  
**B:** There's icing on you too.  
**A:** Then theft deserves renewed funding.  

**Example 2 · 27 words**

**A:** The lights failed because of weather, wiring, or the caretaker's shortcut.  
**B:** It's sunny.  
**A:** Weather withdraws gracefully.  
**B:** The caretaker unplugged them.  
**A:** Shortcut wins. Wiring can keep its dignity.  

### S145 — Official Interpreter

**Card:** Carry yourself as the final authority on what the impossible situation means, correcting every interpretation that threatens your version of reality.

**Editorial finding / approach:** A imposes an authoritative interpretation on an impossible event and corrects competing descriptions.

**Example 1 · 30 words**

**A:** The wardrobe isn't escaping. It's demonstrating freedom of position.  
**B:** It's halfway down the road.  
**A:** An advanced demonstration.  
**B:** Should we chase it?  
**A:** Escort it. Vocabulary matters when dealing with liberated furniture.  

**Example 2 · 30 words**

**A:** That doorway's open to yesterday, not broken.  
**B:** I can see my old wallpaper.  
**A:** Exactly. A historically receptive entrance.  
**B:** Can we shut it?  
**A:** After agreeing which side of yesterday we're on.  

### S146 — Prophecy Under Revision

**Card:** Project absolute certainty about what happens next while quietly revising the prophecy whenever reality disagrees.

**Editorial finding / approach:** A preserves prophetic certainty by adjusting time or meaning to accommodate contradictory facts.

**Example 1 · 33 words**

**A:** The moon was due to turn green at noon. The prophecy meant afternoon.  
**B:** It says noon exactly.  
**A:** In the moon's original time zone.  
**B:** It's evening now.  
**A:** Then the stars have allowed for traffic.  

**Example 2 · 29 words**

**A:** A great visitor will arrive wearing gold today.  
**B:** Only the plumber came.  
**A:** Brass fittings. A regional form of gold.  
**B:** He left already.  
**A:** As foretold by the phrase great efficiency.  

### S147 — Impossible Specialist

**Card:** Approach the strange situation with precise technical confidence, insisting that its impossible details require exact terminology and proper handling.

**Editorial finding / approach:** A treats impossible details as requiring precise technical handling, keeping the same phenomenon under expert scrutiny.

**Example 1 · 37 words**

**A:** This is a reverse haunting. The ghost's frightened of the house.  
**B:** Should we move the ghost?  
**A:** Not without a properly reassuring sheet.  
**B:** It's hiding under the stairs.  
**A:** Then we're dealing with architectural intimidation. Get a smaller staircase.  

**Example 2 · 29 words**

**A:** Measure the invisible creature from its second neck.  
**B:** How do I find the neck?  
**A:** The ruler will become politely unwelcome.  
**B:** It bent in half.  
**A:** Good. We've located the shoulder.  

### S148 — Obviously One of Us

**Card:** Act as though effortless acceptance of the bizarre premise proves you belong, and treat visible confusion as a personal risk.

**Editorial finding / approach:** A accepts absurdity to demonstrate belonging and disguises confusion as familiarity with an earlier version.

**Example 1 · 31 words**

**A:** I've saved the invisible guest their usual chair.  
**B:** They're standing beside you.  
**A:** Naturally. Stretching before invisible sitting.  
**B:** You've put your coat on them.  
**A:** The old welcoming custom. Has that changed too?  

**Example 2 · 32 words**

**A:** Of course I know the cloud salute. This hand means welcome.  
**B:** It means release the rain.  
**A:** The previous clouds used it differently.  
**B:** We're getting soaked.  
**A:** An enthusiastic response. Clearly they recognise me.  

### S149 — Senior in the Strange

**Card:** Treat yourself as an experienced guide to impossible customs, offering patient instruction while preserving one unexplained advantage.

**Editorial finding / approach:** A teaches impossible customs while preserving an unexplained expert shortcut that keeps them senior.

**Example 1 · 33 words**

**A:** Bow to the shadow first. Beginners waste their greeting on the person.  
**B:** Why the shadow?  
**A:** It follows you longer. Basic courtesy.  
**B:** Can I use your quick bow?  
**A:** After your shadow stops looking inexperienced.  

**Example 2 · 31 words**

**A:** Before entering the mirror, practise the backwards introduction.  
**B:** You walked straight through.  
**A:** I have an arrangement with my reflection.  
**B:** How do I get one?  
**A:** Finish apologising to your left hand first.  

### S150 — The One Normal Thing

**Card:** Remain modest while controlling the single ordinary resource everyone needs to survive the increasingly impossible situation.

**Editorial finding / approach:** A's modest control of one normal resource becomes leverage in an impossible setting.

**Example 1 · 42 words**

**A:** I'm nobody important. I just have the only spoon that stays solid.  
**B:** We need it for the floating soup.  
**A:** Of course. One bowl at a time, through me.  
**B:** Can't you lend it out?  
**A:** I'd hate to become important through poor spoon management.  

**Example 2 · 34 words**

**A:** This square of floor still has gravity. You're welcome to queue.  
**B:** You're charging for standing?  
**A:** No. I'm accepting contributions to ordinary maintenance.  
**B:** Everything else is floating.  
**A:** Then my modest square is doing very well.  

### S151 — We Always Did This

**Card:** Treat the strangest behavior in the scene as an old shared tradition that needs no explanation and deserves immediate continuation.

**Editorial finding / approach:** A treats absurd behavior as an old shared habit that B's questioning cannot erase.

**Example 1 · 32 words**

**A:** Walk backwards to dessert, like every family Sunday.  
**B:** We've never done that.  
**A:** You always say that before the backward part.  
**B:** I'll spill my tea.  
**A:** That's why we traditionally finish it before remembering.  

**Example 2 · 37 words**

**A:** I've set the invisible ancestor's chair by the window again.  
**B:** We don't have an invisible ancestor.  
**A:** Not one we've seen, certainly.  
**B:** Why by the window?  
**A:** You know how he complains about the view without moving the curtains.  

### S152 — You Owe Me a Miracle

**Card:** Carry one past favor as sufficient reason to expect an impossible act in return, and present the exchange as perfectly fair.

**Editorial finding / approach:** A treats a small old favor as fair payment for an impossible service and uses the wording of the promise as leverage.

**Example 1 · 34 words**

**A:** You owe me lunch money. Bring back ten minutes of yesterday.  
**B:** I meant I'd buy lunch.  
**A:** You said anything. I kept the word.  
**B:** I can't travel through time.  
**A:** Then you'll need to start earlier.  

**Example 2 · 39 words**

**A:** I helped move your sofa. Move the moon away from my window.  
**B:** Those aren't equivalent favours.  
**A:** The sofa had stairs. The moon's already airborne.  
**B:** How would I do it?  
**A:** I didn't ask how heavy the sofa was before helping.  

### S153 — Designated Reality Check

**Card:** Return automatically to translating every bizarre development into practical consequences, even when everyone else seems comfortable with it.

**Editorial finding / approach:** A reflexively manages practical consequences while everyone else focuses on the novelty.

**Example 1 · 33 words**

**A:** Your floating relatives still need place cards. I'll get string.  
**B:** They're floating through the ceiling.  
**A:** Then we need the upstairs seating plan too.  
**B:** Isn't this extraordinary?  
**A:** Yes. Extraordinary place cards will cost extra.  

**Example 2 · 30 words**

**A:** The fountain's producing wishes. Who empties the bucket?  
**B:** It's a miracle.  
**A:** Miracles still overflow onto borrowed carpets.  
**B:** We can wish the water away.  
**A:** Good. Put someone on hourly wishing duty.  

### S154 — More Committed Than You

**Card:** Treat belief in the scene’s strangest premise as a contest, proving your commitment through increasingly unnecessary demonstrations.

**Editorial finding / approach:** Belief becomes a contest of increasingly excessive demonstrations rather than a debate about whether the premise is true.

**Example 1 · 34 words**

**A:** I bow lower to the invisible queen. I can practically see her shoes.  
**B:** Nobody can see them.  
**A:** Not with that modest level of devotion.  
**B:** My knees hurt.  
**A:** Then you finally have a measurable commitment.  

**Example 2 · 29 words**

**A:** I'll sign the moon pledge with both hands.  
**B:** One signature's enough.  
**A:** For people with one-handed faith.  
**B:** You can't hold two pens properly.  
**A:** My illegibility proves I'm beyond ordinary certainty.  

### S155 — Your Nonsense Works

**Card:** Use another person’s strangest reasoning as your most reliable guide while publicly calling each successful result a coincidence.

**Editorial finding / approach:** A follows absurd reasoning because it works while refusing to credit it openly.

**Example 1 · 32 words**

**A:** I walked backwards to the kettle, and it boiled. Coincidence.  
**B:** Try complimenting the cupboard next.  
**A:** Purely as a test of your nonsense.  
**B:** It opened.  
**A:** An unusually cooperative coincidence. What's your next test?  

**Example 2 · 32 words**

**A:** Your formula says sing to the jammed printer.  
**B:** It likes lullabies.  
**A:** I'm recording this for troubleshooting, not belief.  
**B:** It's printing now.  
**A:** Good. Note that the paper responds to coincidence in C major.  

### S156 — The Impossible Promise

**Card:** Treat an old, seemingly impossible promise as fully binding, and interpret every delay as unfinished business rather than release.

**Editorial finding / approach:** A holds an impossible old promise literally binding and demands delivery rather than accepting impossibility as release.

**Example 1 · 35 words**

**A:** You promised me a sunrise in a box. The shelf's ready.  
**B:** That was a poetic promise.  
**A:** Then deliver it poetically. Before breakfast.  
**B:** Nobody can box a sunrise.  
**A:** You should have consulted nobody before promising one.  

**Example 2 · 37 words**

**A:** I've set a plate for the person you promised from next century.  
**B:** They can't arrive yet.  
**A:** The invitation says Saturday, not eventually.  
**B:** Time travel doesn't work that way.  
**A:** Then the promise needs to explain its lateness personally.  

### S157 — Effortlessly Unbelievable

**Card:** Be sincerely impressed by how naturally someone inhabits the strange reality, then compete to appear even less surprised.

**Editorial finding / approach:** A competes to appear naturally unsurprised, borrowing B's ease and overshooting it.

**Example 1 · 32 words**

**A:** A talking doorway? How ordinary. I speak fluent hinge.  
**B:** You look amazed.  
**A:** Only at how loudly it uses its indoor voice.  
**B:** Say something to it.  
**A:** Lovely weather for opening. Completely natural conversation.  

**Example 2 · 32 words**

**A:** You've greeted the invisible guest so casually. I do that constantly.  
**B:** You greeted the umbrella stand.  
**A:** They're often close friends.  
**B:** The guest is behind you.  
**A:** I knew. I was including their furniture.  

### S158 — When Things Made Sense

**Card:** Perform the person you were before reality became complicated, using outdated certainty to explain each new impossibility.

**Editorial finding / approach:** A applies outdated ordinary certainty to an impossible world and blames the mismatch on conditions, not the old worldview.

**Example 1 · 35 words**

**A:** My manual says kettles stay on counters. This one's a lighting problem.  
**B:** It's floating above your head.  
**A:** Then the light's unusually ambitious.  
**B:** It just poured tea sideways.  
**A:** We'll level the counter before rewriting the manual.  

**Example 2 · 36 words**

**A:** Doors used to open into rooms, not Thursdays.  
**B:** This one opens into Thursday.  
**A:** Then someone has fitted the calendar incorrectly.  
**B:** How do we get through?  
**A:** Use the handle. We had perfectly good handles before all this.  

### S159 — Don’t Let Reality Notice

**Card:** Behave as though openly questioning the impossible premise could attract dangerous attention, and respond to doubt with urgent normality.

**Editorial finding / approach:** A treats acknowledging impossibility as a risk of attracting reality's attention and urgently normalises the event.

**Example 1 · 29 words**

**A:** Don't say the chair is floating. Reality might hear.  
**B:** It is floating.  
**A:** At a perfectly normal furniture height. Smile.  
**B:** It's reached the ceiling.  
**A:** Excellent posture. Say that, not impossible.  

**Example 2 · 30 words**

**A:** Lower your voice about the singing moon.  
**B:** Everybody can hear it.  
**A:** Then call it weather. Weather gets away with anything.  
**B:** It's singing my name.  
**A:** A local forecast. Nothing to investigate.  

### S160 — Safety Through Nonsense

**Card:** Take control through elaborate impossible precautions, treating every objection as another reason the people present need protection.

**Editorial finding / approach:** A responds to objections with additional impossible safety rules, keeping protection tied to the same imagined hazard.

**Example 1 · 32 words**

**A:** Wear this ribbon. It prevents emotional lightning.  
**B:** There's no such thing.  
**A:** Doubt attracts it. You'll need a second ribbon.  
**B:** I'm already covered in ribbons.  
**A:** Good. We're approaching a safe level of skepticism.  

**Example 2 · 30 words**

**A:** Helmet on before reading the prophecy.  
**B:** It's a piece of paper.  
**A:** About tomorrow. We haven't inspected tomorrow for falling objects.  
**B:** It predicts sunshine.  
**A:** Then add protective glasses. Precautions are working.  

### S161 — Half a Beat Late

**Card:** Use the group’s reactions as your cue, joining each one a moment late and escalating your enthusiasm to stay included.

**Editorial finding / approach:** A joins social reactions a beat late and overcompensates to prove inclusion.

**Example 1 · 39 words**

**A:** Congratulations on the new dragon! I was just about to clap.  
**B:** We were gasping. It ate the shed.  
**A:** Yes! A devastating shed. I mean devastating loss.  
**B:** Why are you still clapping?  
**A:** Checking whether we've moved into brave celebration yet.  

**Example 2 · 33 words**

**A:** Absolutely hilarious news about the mirror. Ha! Ha!  
**B:** We weren't laughing. It's trapped the headmaster.  
**A:** Of course. That's my shocked laugh.  
**B:** We're trying to help.  
**A:** Yes! Help! I'm extremely ahead on wanting that.  

### S162 — I Predicted This

**Card:** Create opportunities to show that each impossible event confirms a theory you understood long before anyone asked.

**Editorial finding / approach:** A retrospectively presents vague or fresh predictions as early knowledge of a specific impossibility.

**Example 1 · 31 words**

**A:** I predicted the cupboard would speak. Here: a change in storage.  
**B:** That could mean new shelves.  
**A:** A useful prediction covers several forms of expression.  
**B:** The ink's wet.  
**A:** Fresh copy. Ancient certainty.  

**Example 2 · 34 words**

**A:** My notes say something would rise. The floating dog confirms it.  
**B:** It says bread will rise.  
**A:** An early metaphor for domestic elevation.  
**B:** You wrote it while baking.  
**A:** Inspiration doesn't restrict itself to office hours.  

### S163 — The Ceremony Requires More

**Card:** Treat every ordinary step as only the beginning of an elaborate ceremony, adding necessary details whenever anyone tries to finish.

**Editorial finding / approach:** Each attempt to finish a simple ceremony creates another required ceremony of completion.

**Example 1 · 37 words**

**A:** The final candle needs a witness candle before we end.  
**B:** Can that be the last candle?  
**A:** Once we acknowledge its service.  
**B:** How do we do that?  
**A:** Light the acknowledgement candle. We're nearly at the beginning of finishing.  

**Example 2 · 34 words**

**A:** We've tied the ceremonial knot. Now bless the successful tying.  
**B:** I thought the knot finished it.  
**A:** That was the opening knot's ambition.  
**B:** How many knots remain?  
**A:** One for asking, then we can count formally.  

### S164 — Reality Is Coming Apart

**Card:** Treat each contradiction, coincidence, and ordinary mistake as evidence that reality is losing structural integrity.

**Editorial finding / approach:** A interprets ordinary mistakes as failures of reality's structure and attempts physical containment.

**Example 1 · 33 words**

**A:** There's a missing letter in this notice. Reality's losing components.  
**B:** It's a typo.  
**A:** Today a letter. Tomorrow the word floor stops holding us.  
**B:** I'll correct it.  
**A:** Use permanent ink. We need structural reinforcement.  

**Example 2 · 34 words**

**A:** You said that sentence twice. Time's slipping.  
**B:** I thought you didn't hear me.  
**A:** Then the disturbance's reached my ears.  
**B:** Shall I repeat it?  
**A:** No. We'll prop the wall up before risking a third loop.  

### S165 — Wonderful, It’s Impossible

**Card:** Celebrate every impossible development as a breakthrough that removes old limitations and creates exciting new problems.

**Editorial finding / approach:** An impossible change is celebrated for removing a mundane limit, with new problems creating more opportunities.

**Example 1 · 29 words**

**A:** The kettle's floating! Tea no longer needs a table.  
**B:** It's escaping upstairs.  
**A:** Direct delivery. A second breakthrough.  
**B:** We can't reach it.  
**A:** Finally, a reason to use the ladder indoors.  

**Example 2 · 34 words**

**A:** The guest came through the wall. Wonderful, no queue at the door.  
**B:** There's a hole in the plaster.  
**A:** A permanent improvement to hospitality.  
**B:** What about the rain?  
**A:** An outdoor feeling without leaving the sofa.  

### S166 — Fine, What Does It Eat?

**Card:** Accept the impossible premise immediately, then focus on its schedule, appetite, cleanup, safety, and long-term maintenance.

**Editorial finding / approach:** A accepts a specific impossible creature immediately and follows its maintenance needs through increasingly practical questions.

**Example 1 · 31 words**

**A:** Fine, a dragon in the kitchen. Dry food or wet?  
**B:** It eats treasure.  
**A:** Do supermarkets sell that in bulk?  
**B:** It also breathes fire.  
**A:** Good. Heating savings may cover the food bill.  

**Example 2 · 31 words**

**A:** The invisible guest can stay. Who takes the first feeding shift?  
**B:** It's immortal.  
**A:** Then weekend cover matters indefinitely.  
**B:** We don't know if it eats.  
**A:** Label the leftovers. We'll establish a baseline.  

### S167 — The Third Detail Matters

**Card:** Choose one arbitrary detail and treat it as the key that explains, controls, or prevents the entire impossible situation.

**Editorial finding / approach:** One arbitrary small feature is treated as the control point for the entire impossible event.

**Example 1 · 34 words**

**A:** Keep that pebble level. It's the only thing holding Tuesday here.  
**B:** It's an ordinary pebble.  
**A:** Exactly why Tuesday trusts it.  
**B:** Can I put it down?  
**A:** On a level surface. Wednesday's waiting for a mistake.  

**Example 2 · 40 words**

**A:** Don't press the third button on the kettle. That's the moon's dimmer.  
**B:** How do we make tea?  
**A:** Use the first two. Tea and lunar stability are separate jobs.  
**B:** The third one's flashing.  
**A:** Then the moon wants attention. Don't reward it.  

### S168 — The Universe Is Rhyming

**Card:** Treat repeated shapes, phrases, and coincidences as links between unrelated events until they form one grand and unquestionable message.

**Editorial finding / approach:** Repeated sounds or shapes create one grand message linking otherwise unrelated events.

**Example 1 · 33 words**

**A:** Three coffee rings, three visitors. The universe is composing a message.  
**B:** We all ordered coffee.  
**A:** And all chose circles. Remarkable discipline.  
**B:** The door squeaked three times.  
**A:** There. The message has acquired a chorus.  

**Example 2 · 33 words**

**A:** You said wait as the scales showed my weight. Hear the rhyme?  
**B:** That's just coincidence.  
**A:** And you said just beside the justice poster.  
**B:** Can we leave?  
**A:** Not until the universe finishes its sentence.  

### S169 — Order of Business

**Card:** Carry yourself as the person who decides what happens in what order. Redirect every interruption into the approved sequence.

**Editorial finding / approach:** A protects an order of business while B supplies an urgent exception; the last turn incorporates the emergency into the order rather than changing subjects.

**Example 1 · 40 words**

**A:** Before we discuss the kitchen fire, may I approve last week's minutes?  
**B:** The minutes are in the kitchen.  
**A:** Then we must establish whether anyone remembers them.  
**B:** I remember voting to replace the extinguisher.  
**A:** Excellent. We can begin with matters arising.  

**Example 2 · 38 words**

**A:** Wedding speeches go father, mother, best man, bride.  
**B:** The bride needs to say the groom hasn't arrived.  
**A:** That information belongs in her speech.  
**B:** We can't start without him.  
**A:** Then his absence is holding up four perfectly prepared speakers.  

### S170 — Authority on Paper

**Card:** Project firm control through titles and procedure, then tighten the formalities whenever anyone tests whether your position has real support.

**Editorial finding / approach:** Formalities become stricter specifically when B exposes A's unsupported appointment; both variants keep the same authority test alive.

**Example 1 · 37 words**

**A:** As acting manager, I'm authorising everyone to stay late.  
**B:** Who appointed you?  
**A:** That question needs to be submitted on company stationery.  
**B:** You printed this stationery this morning.  
**A:** And I've already established a proper channel for challenging it.  

**Example 2 · 38 words**

**A:** I'm chairing this meeting under the emergency neighbourhood charter.  
**B:** There are only two of us, and I haven't agreed.  
**A:** Then we'll record your objection before proceeding.  
**B:** Proceeding to what?  
**A:** A vote to recognise my authority to record objections.  

### S171 — Certified Correct

**Card:** Treat forms, standards, and exact wording as a technical craft. Correct shortcuts before discussing whether the result actually works.

**Editorial finding / approach:** A notices exact technical compliance before functional success; the consequence grows out of B's practical objection.

**Example 1 · 34 words**

**A:** Your evacuation plan uses the wrong shade of red.  
**B:** It got everyone safely outside.  
**A:** Without compliant arrows, that's technically a gathering.  
**B:** The building was on fire.  
**A:** Then the arrows should have been particularly unambiguous.  

**Example 2 · 42 words**

**A:** This cake cannot pass inspection. You've written 'Birthday Happy.'  
**B:** The icing slid. Does it taste all right?  
**A:** Taste is in section four. We're still on greeting accuracy.  
**B:** Can we turn the plate around?  
**A:** That corrects the order while introducing an upside-down birthday.  

### S172 — Customs Interpreter

**Card:** Act as the translator of unwritten customs. Correct breaches, explain exceptions, and make your usefulness proof that you belong.

**Editorial finding / approach:** A makes an unwritten custom legible and thereby establishes a useful place in the group; B's literal solutions trigger more translation.

**Example 1 · 39 words**

**A:** Don't sit in that chair at the family dinner. That's where absent people go.  
**B:** Who's absent?  
**A:** We'll find out when someone complains you're in their chair.  
**B:** I'll stand, then.  
**A:** Standing means you're leaving. Let me introduce you as undecided.  

**Example 2 · 45 words**

**A:** At this club, 'interesting proposal' means they want you to withdraw it.  
**B:** The chair called my proposal very interesting.  
**A:** Then withdraw it enthusiastically. They value a good attitude.  
**B:** What would genuine enthusiasm sound like?  
**A:** An invitation to lunch. This is why newcomers need a translator.  

### S173 — I Learned It the Hard Way

**Card:** Treat experience with the system as seniority. Teach its shortcuts, warn against its traps, and remind everyone that your mistakes came first.

**Editorial finding / approach:** A teaches a hard-earned shortcut, but claims seniority through having suffered the original failure, not merely holding rank.

**Example 1 · 41 words**

**A:** Bring a sandwich to the permit office. I lost three Tuesdays learning that.  
**B:** It says appointments take ten minutes.  
**A:** That's how they get your first Tuesday.  
**B:** I've booked the first slot.  
**A:** So did I. Eat half the sandwich before they open.  

**Example 2 · 37 words**

**A:** Don't ask the committee why the roof leaks. Ask which meeting owns the leak.  
**B:** Why?  
**A:** I asked why. They made me chair of causes.  
**B:** Did you fix it?  
**A:** No. But I can keep you out of causes.  

### S174 — The Necessary Signature

**Card:** Remain helpful while controlling the one approval, record, key, or ceremonial step that allows anything to move forward.

**Editorial finding / approach:** A remains pleasant while retaining one indispensable authorisation; each purported solution returns to that exact bottleneck.

**Example 1 · 37 words**

**A:** Your moving van is ready. It just needs my departure stamp.  
**B:** Wonderful. Could you stamp it?  
**A:** Of course. Have you completed the departure-stamp request?  
**B:** You're holding that too.  
**A:** I like to keep the process convenient for you.  

**Example 2 · 39 words**

**A:** The club has approved your opening ceremony. I'm holding the ribbon scissors.  
**B:** Then cut the ribbon.  
**A:** Once I receive confirmation that the ceremony has begun.  
**B:** Cutting it begins the ceremony.  
**A:** Lovely. I'll wait for the confirmation beside the ribbon.  

### S175 — We Know the Old Rules

**Card:** Use an old custom you learned together as the deepest proof of connection, even when the present situation has changed.

**Editorial finding / approach:** A uses a shared old custom as proof of connection; B's changed circumstances do not erase its personal importance.

**Example 1 · 41 words**

**A:** Before dinner, we still split the first bread roll. Like when we shared a room.  
**B:** We can afford two rolls now.  
**A:** Then we'll each have half of two.  
**B:** That's mathematically a whole roll.  
**A:** Yes, but you can't buy the sharing separately.  

**Example 2 · 42 words**

**A:** You haven't given me our old knock before coming in.  
**B:** You gave me a key.  
**A:** The key opens the door. The knock tells me it's you.  
**B:** You can see me through the glass.  
**A:** And yet I haven't heard from my best friend.  

### S176 — I Made the Exception

**Card:** Treat every exception you once arranged as an unpaid obligation. Casually expect cooperation whenever the old favor becomes relevant.

**Editorial finding / approach:** A converts a past procedural exception into a specific present obligation; B challenges the scale and A expands the debt.

**Example 1 · 42 words**

**A:** I got your late application accepted. You can take my shift on Saturday.  
**B:** That was two years ago.  
**A:** Exceptions don't expire like ordinary favours.  
**B:** It took you one phone call.  
**A:** Then Saturday should be a refreshing change of pace for us both.  

**Example 2 · 36 words**

**A:** Since I waived your joining fee, I'd like you to nominate me for treasurer.  
**B:** I paid you back the fee.  
**A:** You repaid money. I made you an exception.  
**B:** What's the exchange rate?  
**A:** Currently, one enthusiastic nomination.  

### S177 — The Designated Translator

**Card:** Return automatically to explaining rules, smoothing procedures, and answering questions before anyone asks.

**Editorial finding / approach:** A automatically interprets the institution and smooths its process; B's simple questions reveal the escalating work of translation.

**Example 1 · 40 words**

**A:** 'Optional attendance' means arrive early and look surprised to be needed.  
**B:** I was only asking where the toilets are.  
**A:** Facilities. Never say toilets here. I'll walk you through it.  
**B:** Through using the toilet?  
**A:** Through asking. Using it remains largely unregulated.  

**Example 2 · 37 words**

**A:** When Dad says 'don't bring anything,' he means bring bread but conceal the receipt.  
**B:** He texted me a shopping list.  
**A:** That's what we call an unusually clear emotional opening.  
**B:** It says bread.  
**A:** Good. He's meeting us halfway.  

### S178 — Better at the System

**Card:** Treat every rule, shortcut, and correction as a chance to prove you understand the system better than anyone else.

**Editorial finding / approach:** A competes through procedural fluency and shortcuts; B's improvement forces a more elaborate demonstration of expertise.

**Example 1 · 32 words**

**A:** I got our permits in six minutes. What took you so long?  
**B:** Mine took five.  
**A:** Did you use the expedited counter?  
**B:** I used the website.  
**A:** I helped design that counter's redundancy strategy.  

**Example 2 · 39 words**

**A:** You bowed twice at the awards dinner. The handbook specifies one bow.  
**B:** The host bowed back, so I returned it.  
**A:** Then you accidentally acknowledged them as senior.  
**B:** They are the host.  
**A:** I know. I congratulated them without conceding rank.  

### S179 — My Sponsor Inside

**Card:** Treat one person as your sponsor inside the system. Seek their introductions and approval while resisting the identity their support assigns you.

**Editorial finding / approach:** A needs an insider's sponsorship while resisting being defined as their protege; B responds directly to that contradiction.

**Example 1 · 42 words**

**A:** Will you introduce me to the committee? Just not as your promising little discovery.  
**B:** How should I introduce you?  
**A:** As an independent professional whose work speaks for itself.  
**B:** Then you can introduce yourself.  
**A:** It speaks more clearly after you've said my name.  

**Example 2 · 37 words**

**A:** Please get me into the club, but don't tell them you rescued me.  
**B:** I'm just signing your application.  
**A:** Exactly. A signature, not a creation story.  
**B:** It asks how I know you.  
**A:** Use the period after 'colleague' decisively.  

### S180 — The Rule You Broke

**Card:** Treat a past breach of rule or custom as unfinished business. Let every present exception reopen the question of what was damaged.

**Editorial finding / approach:** A hears a new exception through a specific unresolved past breach; B's present reasoning gives A a new way to reopen the old hurt.

**Example 1 · 39 words**

**A:** We're changing the birthday rota? Apparently turns matter again.  
**B:** We just need someone for Friday.  
**A:** I needed someone last Friday. You said the rota was sacred.  
**B:** I was away.  
**A:** Good. Put 'sacred unless away' at the top this time.  

**Example 2 · 39 words**

**A:** You're letting guests use the good mugs now?  
**B:** Only because the other mugs are packed.  
**A:** When I used one, you called it a breach of trust.  
**B:** You broke it.  
**A:** Then explain why they're guests and I'm still a precedent.  

### S181 — Effortless Insider

**Card:** Treat someone’s effortless movement through systems and customs as both impressive and threatening, then prove you can master every rule without help.

**Editorial finding / approach:** Envy of effortless belonging makes A overlearn rules instead of accepting help; B's easy explanation provokes a competitive claim of independence.

**Example 1 · 36 words**

**A:** How did you get into the members' lounge without showing your pass?  
**B:** They know me.  
**A:** Right. I'll learn every doorman's birthday. Systematically.  
**B:** I can introduce you.  
**A:** No, thank you. I'd like to develop spontaneous rapport properly.  

**Example 2 · 42 words**

**A:** You knew which fork to use without looking. I've studied the whole table plan.  
**B:** I copied the person beside me.  
**A:** I could have copied. I chose independent mastery.  
**B:** They're serving soup now.  
**A:** Then give me a moment to revise my fork research.  

### S182 — When I Believed in the Rules

**Card:** Perform the version of yourself who once trusted the institution, tradition, or process. Use its old language even as your confidence slips.

**Editorial finding / approach:** A repeats an institution's old reassurance while evidence erodes confidence; A's final qualification exposes the loss of faith without abandoning the language.

**Example 1 · 39 words**

**A:** The complaint desk is here to listen. That's what my old badge says.  
**B:** There's no one at the desk.  
**A:** Listening takes many forms.  
**B:** The sign says it's closed permanently.  
**A:** Then perhaps they're giving our concerns a very long silence.  

**Example 2 · 39 words**

**A:** The club always looks after its own. I've paid dues for thirty years.  
**B:** They've rented your locker to someone else.  
**A:** There must be a respectful explanation.  
**B:** The new member paid more.  
**A:** Ah. They've updated the meaning of 'its own.'  

### S183 — There Must Be a Correct Form

**Card:** Treat every unclear instruction as a test you may be failing. Seek safety through stricter compliance, documentation, and permission.

**Editorial finding / approach:** Ambiguity makes A seek another layer of permission rather than inventing arbitrary obstacles; B's reassurance increases the perceived test.

**Example 1 · 38 words**

**A:** On this picnic form, does 'bringing food' include bringing the plates?  
**B:** Just tick whatever seems closest.  
**A:** Is there a box confirming that you authorised approximation?  
**B:** It's a picnic.  
**A:** Then why have they left the sandwich category so open?  

**Example 2 · 27 words**

**A:** May I ask a question during the induction?  
**B:** Questions are encouraged.  
**A:** Should I register mine first?  
**B:** No. Just ask.  
**A:** Is asking permission counted against the question allowance?  

### S184 — For Everyone’s Protection

**Card:** Protect people by creating procedures for them. Turn concern into checklists, permissions, required steps, and increasingly narrow exceptions.

**Editorial finding / approach:** A translates care into a procedure that narrows choice; B's low-risk proposal triggers a still more careful safeguard.

**Example 1 · 40 words**

**A:** I've written a checklist so you can safely make tea while I'm out.  
**B:** I've made tea for forty years.  
**A:** Excellent. You can initial the experience section.  
**B:** Can I just have water?  
**A:** Cold or room temperature? I need the correct appendix.  

**Example 2 · 34 words**

**A:** Before you borrow my bicycle, let's rehearse what to do if you wobble.  
**B:** I'll put my foot down.  
**A:** Good. Which foot?  
**B:** Whichever side I'm falling toward.  
**A:** I hadn't included improvisation. We'll need another rehearsal.  

### S185 — Properly Initiated

**Card:** Treat correct participation in the ritual as proof you deserve to belong. Watch for cues, copy the form, and overcommit to every step.

**Editorial finding / approach:** A seeks belonging by performing the ritual too diligently; B's corrections create successive opportunities to overcommit.

**Example 1 · 45 words**

**A:** Have I bowed deeply enough to join the choir, or is that the rehearsal bow?  
**B:** We don't bow until the concert.  
**A:** Good. I'll keep this one in reserve.  
**B:** You can stand up now.  
**A:** Certainly. I didn't want to be the first person to abandon tradition.  

**Example 2 · 34 words**

**A:** I memorised the club toast, including the footnotes.  
**B:** There aren't any footnotes.  
**A:** I researched the founding members' preferred pauses.  
**B:** We usually just say 'cheers.'  
**A:** Of course. Would that be the formal or familiar cheers?  

### S186 — Ask Me About the Process

**Card:** Create opportunities to display your knowledge of obscure rules, customs, and procedures. Correct small details before anyone can praise the outcome.

**Editorial finding / approach:** A fishes for recognition through obscure corrections; B's practical gratitude is repeatedly redirected to the process expertise.

**Example 1 · 38 words**

**A:** Notice the green stamp on your permit. Very few people know why it's green.  
**B:** Thanks for getting it approved.  
**A:** Approval is easy. The colour history is fascinating.  
**B:** Can I start building?  
**A:** After you appreciate why it isn't blue.  

**Example 2 · 33 words**

**A:** I used the proper salutation on your complaint letter.  
**B:** Wonderful. They fixed the leak.  
**A:** But did they mention the salutation?  
**B:** They sent a plumber.  
**A:** I'll ask him whether he noticed the regional variation.  

### S187 — Tradition Outranks Explanation

**Card:** Treat inherited customs as meaningful because they have been repeated. Preserve each step and resist every request to explain why it still matters.

**Editorial finding / approach:** A defends a inherited step because repetition itself supplies meaning; B's questions deepen rather than explain away the custom.

**Example 1 · 40 words**

**A:** Set an empty bowl for Great-Uncle Arthur before we serve dinner.  
**B:** Arthur is here this year.  
**A:** Then he'll finally get to see his bowl.  
**B:** Can we put soup in it?  
**A:** Not after forty years of keeping it empty for him.  

**Example 2 · 30 words**

**A:** We must walk around the new boat three times before launching it.  
**B:** Who started that?  
**A:** My grandfather.  
**B:** Did he explain why?  
**A:** He completed all three circuits. That was explanation enough.  

### S188 — One Missing Step

**Card:** Treat the smallest skipped step as the beginning of systemic collapse. Escalate safeguards, documentation, and oversight before allowing anything to continue.

**Editorial finding / approach:** A treats an actual minor omission as systemic risk; every proposed repair adds oversight to the same missing step.

**Example 1 · 33 words**

**A:** The visitor book is missing your middle initial. Stop the tour.  
**B:** I'll add it now.  
**A:** We need a witness for amendments.  
**B:** You're watching me write.  
**A:** And who will confirm I was watching correctly?  

**Example 2 · 41 words**

**A:** You skipped item six on the kettle checklist.  
**B:** Item six says check that the lid is closed. It's closed.  
**A:** But we can't prove you checked it before item seven.  
**B:** I'll start again.  
**A:** First we need a procedure for interrupted kettle procedures.  

### S189 — The System Works

**Card:** Celebrate every queue, delay, review, and formal approval as proof that a dependable system is protecting everyone from chaos.

**Editorial finding / approach:** A sincerely celebrates delay as protection; B's escalating inconvenience becomes increasingly reassuring evidence of system success.

**Example 1 · 34 words**

**A:** We've been in this queue two hours. Imagine how thoroughly they're checking things.  
**B:** The counter is empty.  
**A:** Excellent. No rushed decisions.  
**B:** The office closed an hour ago.  
**A:** Then we're protected from after-hours processing too.  

**Example 2 · 40 words**

**A:** My application has gone to a third committee. Such a reassuring system.  
**B:** The first two lost it.  
**A:** And yet a third committee stands ready.  
**B:** They want you to apply again.  
**A:** Wonderful. This time three committees know what to look for.  

### S190 — Fine, What’s the Process?

**Card:** Accept any strange custom or institution as real, then focus on deadlines, permissions, responsibilities, and what happens when someone misses a step.

**Editorial finding / approach:** A accepts the strange institution and asks about consequences; B elaborates the premise and A follows its practical implications.

**Example 1 · 38 words**

**A:** If the moon audits our village tonight, who signs for the findings?  
**B:** The oldest owl.  
**A:** Is the owl available before the post office closes?  
**B:** It only works after dark.  
**A:** Then we'd better budget for a late filing fee.  

**Example 2 · 36 words**

**A:** At the dragon's naming ceremony, where do we put the fire extinguishers?  
**B:** The dragon eats anyone who brings one.  
**A:** Fine. Who handles the insurance exemption?  
**B:** Nobody insures dragons.  
**A:** Then the deposit needs to cover the hall.  

### S191 — The Detail That Makes It Official

**Card:** Choose one tiny procedural detail—wording, order, timing, seating, or a mark—and treat it as the only source of legitimacy.

**Editorial finding / approach:** One tiny detail becomes the sole source of legitimacy; B's large practical consequences remain secondary to correcting that detail.

**Example 1 · 33 words**

**A:** This marriage certificate has the dot above the wrong letter.  
**B:** We've been married twenty years.  
**A:** Socially, certainly. Typographically, it's complicated.  
**B:** We have three children.  
**A:** Then let's correct it before they inherit the error.  

**Example 2 · 36 words**

**A:** You placed the club seal upside down. This isn't a valid resignation.  
**B:** I've already moved abroad.  
**A:** Travel doesn't rotate a seal.  
**B:** You can turn the page over.  
**A:** That makes it an internationally submitted resignation. Different form.  

### S192 — Everything Is Policy

**Card:** Treat every personal choice as evidence of a larger system. Connect exceptions, habits, and coincidences until they become institutional doctrine.

**Editorial finding / approach:** A infers a wider doctrine from an ordinary personal choice; B's literal correction is incorporated as a policy exception.

**Example 1 · 43 words**

**A:** You sat beside me at lunch. Shall I record that as our friendship policy?  
**B:** It was the only empty chair.  
**A:** So friendship is allocated by availability. Useful clarification.  
**B:** Tomorrow I'll save you a seat.  
**A:** Excellent. We've moved from allocation to a reserved entitlement.  

**Example 2 · 33 words**

**A:** You apologised before making tea. Is that our conflict-resolution procedure now?  
**B:** I knocked over your cup.  
**A:** So material damage triggers refreshments.  
**B:** I also felt bad.  
**A:** We'll add remorse as an optional supporting document.  

### S193 — Winner Sets the Terms

**Card:** Carry yourself as though success gives you the right to define the next challenge, the reward, and what counts as fair.

**Editorial finding / approach:** A treats one win as authority to define the next round and fairness; B's objection becomes evidence of the winner's entitlement.

**Example 1 · 33 words**

**A:** I won the bake-off, so next year's theme is cakes I already make.  
**B:** That isn't fair.  
**A:** Fairness needs experienced leadership.  
**B:** You won by half a point.  
**A:** Then I'll chair the half-point committee too.  

**Example 2 · 39 words**

**A:** As winner of family bowling, I choose where we eat.  
**B:** We only agreed you'd get a trophy.  
**A:** A trophy recognises judgement under pressure.  
**B:** Choosing dinner wasn't part of it.  
**A:** Precisely why the winner must now define the next event.  

### S194 — One Loss from Irrelevance

**Card:** Project confidence while treating every setback as proof your standing could vanish. Regain control by raising the importance of the next result.

**Editorial finding / approach:** A's apparent confidence responds to each setback by making the next result existential; B's reassurance does not settle the fear.

**Example 1 · 38 words**

**A:** That lost chess game was practice. This rematch will establish my reputation.  
**B:** We've played here for thirty years.  
**A:** Then thirty years deserves a decisive demonstration.  
**B:** I just came for tea.  
**A:** Fine. Best tea wins. Give me five minutes.  

**Example 2 · 41 words**

**A:** Ignore my terrible karaoke score. The next song determines whether I still have it.  
**B:** Nobody doubted you.  
**A:** Excellent. One flawless song will keep it that way.  
**B:** The machine's been unplugged.  
**A:** Then we finally have a chance to judge the voice itself.  

### S195 — Official Scorer

**Card:** Treat standards, margins, and fine distinctions as your craft. Correct how success is measured before allowing anyone to claim it.

**Editorial finding / approach:** A corrects the measurement before recognising success; B's enthusiasm meets a specific technical distinction rather than a generic status claim.

**Example 1 · 40 words**

**A:** You can't claim longest scarf until we've measured without stretching it.  
**B:** It's obviously longer than yours.  
**A:** That's a visual impression. Put it on the calibrated table.  
**B:** You knitted the table cover.  
**A:** Which is why I know how much it stretches.  

**Example 2 · 38 words**

**A:** The cake got nine out of ten for taste. What's the denominator for presentation?  
**B:** Everyone loved it.  
**A:** Love isn't scored consistently between judges.  
**B:** They've eaten the evidence.  
**A:** Then 'most thoroughly consumed' is the only category I can certify.  

### S196 — I Earn My Seat

**Card:** Behave as though belonging must be justified through performance. Make your competence visible whenever your right to participate feels uncertain.

**Editorial finding / approach:** A makes competence the proof of a right to enter; B's invitation requirement prompts a still more useful demonstration.

**Example 1 · 43 words**

**A:** Before you ask who invited me to the committee, I've balanced its accounts.  
**B:** You still need a membership vote.  
**A:** I've counted the votes too. You're short a treasurer.  
**B:** That's not how joining works.  
**A:** Then I'll draft a joining process that doesn't lose money.  

**Example 2 · 43 words**

**A:** I've repaired the stage lights. Is there room for me in the theatre group now?  
**B:** You can just come to a rehearsal.  
**A:** I'll learn everyone's lines first.  
**B:** You don't have to audition for the audience.  
**A:** Good. I'll start with being your best audience.  

### S197 — I Taught You to Compete

**Card:** Treat every capable move around you as evidence that your coaching worked. Praise the result while claiming seniority over the method.

**Editorial finding / approach:** A claims authorship of B's success through coaching foundations; B's independent innovation broadens A's claim rather than changing the contest.

**Example 1 · 36 words**

**A:** Lovely winning serve. My drills finally paid off.  
**B:** I've never trained with you.  
**A:** You watched me practise. Observation is powerful teaching.  
**B:** I copied the person who beat you.  
**A:** Then my defeat provided the lesson. You're welcome.  

**Example 2 · 32 words**

**A:** You negotiated a brilliant discount. That's my influence.  
**B:** You told me to pay full price.  
**A:** I was provoking independent judgement.  
**B:** So your wrong advice taught me?  
**A:** Exactly. Advanced coaching looks deceptively unhelpful.  

### S198 — Keeper of the Stakes

**Card:** Remain understated while controlling the reward, penalty, deadline, or condition that determines what winning actually means.

**Editorial finding / approach:** A controls an understated reward condition rather than the contest itself; B's declared victory still cannot settle what is collected.

**Example 1 · 40 words**

**A:** Congratulations on winning the raffle. Before I open the prize box, a few conditions.  
**B:** I bought the winning ticket.  
**A:** Yes. The ticket and the prize have different responsibilities.  
**B:** What's in the box?  
**A:** Something much easier to reveal after the conditions.  

**Example 2 · 34 words**

**A:** You've won the office parking space. I hold the allocation calendar.  
**B:** Can I park there tomorrow?  
**A:** Tomorrow's a premium day.  
**B:** The prize said a free space.  
**A:** Certainly. We just haven't established when freedom applies.  

### S199 — We Learned to Win Together

**Card:** Treat your memories of competing side by side as proof that you still understand one another better than anyone else.

**Editorial finding / approach:** A reads old teamwork as enduring mutual understanding; current competition becomes another chance to invoke the shared signal.

**Example 1 · 40 words**

**A:** Remember our relay signal? Two taps means I've got your back.  
**B:** We're running against each other today.  
**A:** Then you'll understand exactly when I'm helping.  
**B:** Please don't slow down for me.  
**A:** See? Thirty years, and we still know each other's tactics.  

**Example 2 · 41 words**

**A:** Let's use our old quiz-night look when one of us knows the answer.  
**B:** We're on different teams.  
**A:** That never stopped us knowing who needed help.  
**B:** My team would call that cheating.  
**A:** They don't know our look well enough to judge it.  

### S200 — You Owe Me the Chance

**Card:** Treat a past sacrifice, concession, or missed opportunity as a debt that should now be repaid with a real advantage.

**Editorial finding / approach:** A expects a present advantage in repayment for a past sacrificed chance; B disputes the debt and A specifies its retained value.

**Example 1 · 42 words**

**A:** I withdrew from last year's audition for you. I get first choice of songs now.  
**B:** I didn't ask you to withdraw.  
**A:** Exactly. I made the sacrifice easy to receive.  
**B:** I thanked you.  
**A:** Thanks covered last year. This year I'm collecting the opportunity.  

**Example 2 · 45 words**

**A:** You had the good room on our last holiday. I'm choosing this one.  
**B:** You said you liked the sofa bed.  
**A:** I was generous in both room allocation and commentary.  
**B:** Why didn't you say so?  
**A:** I was saving the advantage for a holiday with a balcony.  

### S201 — The One Who Lets You Win

**Card:** Return to the familiar role of making victory easier for others, then let the cost of that generosity become impossible to ignore.

**Editorial finding / approach:** A habitually clears obstacles and makes the cost audible; B's request to stop reveals how entrenched the role is.

**Example 1 · 44 words**

**A:** I've moved my best chess piece so you can take it. Again.  
**B:** You don't have to let me win.  
**A:** I know. It's almost athletic how often I do it anyway.  
**B:** Then put it back.  
**A:** And waste the generosity I've already invested in this move?  

**Example 2 · 44 words**

**A:** I've given you the easy half of the presentation. I'll explain the missing budget.  
**B:** We could split the difficult part.  
**A:** Then who would make you look so effortlessly prepared?  
**B:** I could prepare.  
**A:** You say that like it wouldn't leave me with a vacant role.  

### S202 — Debts on the Scoreboard

**Card:** Treat past wins and losses as debts. Let each new result change who owes the next favor, risk, or concession.

**Editorial finding / approach:** A converts a score into a social balance; new outcomes alter whose turn or favour is owed, keeping the debt system consistent.

**Example 1 · 47 words**

**A:** You won yesterday's darts. That puts you ahead on treats, so you buy lunch.  
**B:** I thought winning meant I got the treat.  
**A:** It means you can afford generosity. Your confidence is funded.  
**B:** What if you win today?  
**A:** Then lunch counts against the confidence you borrowed from yesterday.  

**Example 2 · 37 words**

**A:** You took the last deciding point, so I get first choice of film.  
**B:** That's not in the tennis rules.  
**A:** It's in the balance of our friendship.  
**B:** If you dislike the film?  
**A:** Then tomorrow's match will include compensation.  

### S203 — Victory Without You

**Card:** Treat the possibility of winning without this rival as strangely hollow. Keep raising the challenge so the relationship survives the result.

**Editorial finding / approach:** A makes the rivalry itself more valuable than the result; the next challenge is a means of retaining that connection.

**Example 1 · 38 words**

**A:** Don't concede yet. I haven't got anyone else worth beating at chess.  
**B:** You've beaten me four times.  
**A:** Then we need a handicap, not a farewell.  
**B:** Just take the trophy.  
**A:** And spend Tuesdays polishing it instead of annoying you?  

**Example 2 · 37 words**

**A:** If you retire from the bake-off, who am I supposed to out-ice?  
**B:** Someone younger.  
**A:** They haven't spent twenty years learning how to irritate me.  
**B:** You could finally enjoy winning.  
**A:** I'd have to explain the achievement to strangers.  

### S204 — The Unfinished Rematch

**Card:** Treat the present as another round of a contest, bargain, or failure that never reached a satisfying conclusion.

**Editorial finding / approach:** A treats a current choice as the unresolved old contest; B's attempt to reset gives A a precise reason the past is still active.

**Example 1 · 43 words**

**A:** Before we choose this year's holiday, settle who won the map argument in Cornwall.  
**B:** That was fifteen years ago.  
**A:** Yes. We've given the evidence ample time to mature.  
**B:** Can't we just book somewhere?  
**A:** After we establish who is allowed to navigate the website.  

**Example 2 · 42 words**

**A:** Same board game, same disputed last move. I've kept the pieces exactly where they were.  
**B:** We've both moved house since then.  
**A:** The game hasn't. It's been waiting responsibly.  
**B:** I'd rather start again.  
**A:** Wonderful. Begin by retracting your objection to the old ending.  

### S205 — Winning Looks Natural on You

**Card:** Treat the ease and confidence success seems to give others as both inspiring and threatening, then sharpen your need to outperform them.

**Editorial finding / approach:** A envies success's effortless appearance and tries to outperform even the ease; B's observation forces a more strenuous performance of relaxation.

**Example 1 · 40 words**

**A:** You looked so casual collecting that prize. I'll collect mine without even standing fully up.  
**B:** You haven't won one yet.  
**A:** I'm preparing a more effortless response.  
**B:** You're practising it in a mirror.  
**A:** Only until it looks less prepared than yours.  

**Example 2 · 41 words**

**A:** How do you run five miles looking that relaxed? I'll do six smiling.  
**B:** I'm tired. I just don't talk while running.  
**A:** Good. I'll make my silence look energetic.  
**B:** You're out of breath already.  
**A:** That's how much restraint my effortless performance requires.  

### S206 — Back When I Was Ahead

**Card:** Interpret the present through a time when you felt more successful, admired, or certain of your place.

**Editorial finding / approach:** A uses the conditions of an old successful period as the true measure of today; B's changed circumstances provoke selective restoration.

**Example 1 · 41 words**

**A:** Bring back the old quiz questions. I won three years running with those.  
**B:** We all remember the answers.  
**A:** Then it would reward loyalty as well as knowledge.  
**B:** You just want to win again.  
**A:** I want the quiz to rediscover its standards.  

**Example 2 · 37 words**

**A:** This old sales chart shows what I'm capable of.  
**B:** It's from before we sold online.  
**A:** Then let's take the website down for a fair comparison.  
**B:** Most customers use it.  
**A:** They never gave my telephone manner a chance.  

### S207 — Second Place Feels Like Disappearing

**Card:** Treat every comparison as a threat to your worth. Respond by proving that you still matter before the moment can move on.

**Editorial finding / approach:** A experiences ranking as loss of personal visibility; B's consolation is tested through concrete acts of recognition.

**Example 1 · 40 words**

**A:** Before announcing first place, could you say my name again with 'second'?  
**B:** Second is a wonderful result.  
**A:** Use my name in that sentence.  
**B:** Congratulations, Alex. You came second.  
**A:** Thank you. Keep looking this way while they fetch the bigger trophy.  

**Example 2 · 42 words**

**A:** You put the winning photograph above mine. Can people still see mine?  
**B:** Yours is right beside the light switch.  
**A:** So everyone touches that wall. Good.  
**B:** It's not a competition for attention.  
**A:** Then nobody will mind if I stand beside it answering questions.  

### S208 — Your Risk, My Cost

**Card:** Treat every choice around you as a risk whose consequences may land on you. Press for a voice in decisions you cannot control.

**Editorial finding / approach:** A claims a voice because somebody else's risk imposes a cost; B's personal freedom is answered with a concrete bill or duty.

**Example 1 · 40 words**

**A:** Before you teach the dog to fetch glasses, can I vote? I buy the glasses.  
**B:** It's my training experiment.  
**A:** And my experiment is making rent after the breakages.  
**B:** I'll clean up.  
**A:** Include replacing the glasses in your definition of clean.  

**Example 2 · 45 words**

**A:** You're inviting thirty people to camp in our garden? I maintain the lawn.  
**B:** It's only one weekend.  
**A:** Grass experiences time differently. I want a say in tent placement.  
**B:** You're making this complicated.  
**A:** I'm trying to keep your simple weekend out of my next six Saturdays.  

### S209 — Worth Keeping Around

**Card:** Seek signs that your contribution still earns a place. Increase your effort whenever belonging feels uncertain.

**Editorial finding / approach:** A keeps demonstrating usefulness to secure continued inclusion; B's unconditional welcome cannot stop A seeking the next concrete reason to stay.

**Example 1 · 44 words**

**A:** I've fixed your gate. Shall I come back next Sunday and do the gutter?  
**B:** You can visit without repairing anything.  
**A:** Of course. I'll bring tools just in case conversation slows down.  
**B:** You're already welcome.  
**A:** Wonderful. I'll make sure there's never a reason to reconsider.  

**Example 2 · 42 words**

**A:** Keep me in the quiz team. I've learned every capital we missed.  
**B:** You don't need to justify coming.  
**A:** Then I'll learn the currencies as a bonus.  
**B:** We like your company.  
**A:** Good. I'll make my company useful in two rounds instead of one.  

### S210 — Make the Win Count

**Card:** Treat success as meaningless unless its difficulty, sacrifice, and personal cost are fully recognized.

**Editorial finding / approach:** A insists recognition include the cost of winning; B's short congratulations are expanded with specific sacrifice.

**Example 1 · 48 words**

**A:** When you announce my cake won, mention I iced it at three in the morning.  
**B:** The ribbon says first prize.  
**A:** The ribbon got eight hours' sleep. It doesn't tell the full story.  
**B:** Should I mention the ingredients too?  
**A:** Only the ones I drove across town for after midnight.  

**Example 2 · 42 words**

**A:** Yes, we finished first. Please tell them whose weekend disappeared into that presentation.  
**B:** Everyone worked hard.  
**A:** Excellent. My hard work includes a cancelled anniversary dinner.  
**B:** You want that in the speech?  
**A:** Before the applause, while people still have room to appreciate it.  

### S211 — The Winner’s Ceremony

**Card:** Treat every contest, bargain, or decision as incomplete until the proper recognition, ritual, and consequence have occurred.

**Editorial finding / approach:** A requires proper recognition to finish even a trivial result; B's haste produces a smaller ceremony, not permission to skip it.

**Example 1 · 37 words**

**A:** I won our coin toss. Please announce who sits by the window.  
**B:** You do. Sit down.  
**A:** With my name. The other passengers weren't watching.  
**B:** It's a train seat.  
**A:** Then a brief announcement will suit the occasion perfectly.  

**Example 2 · 39 words**

**A:** Before the next hand of cards, we need the winner's handshake.  
**B:** You've won six hands.  
**A:** And we've recognised only five. This is how records become unreliable.  
**B:** My hand is tired.  
**A:** A nod will do if you make it ceremonial.  

### S212 — Everything Is Sudden Death

**Card:** Approach minor choices as elimination rounds where one wrong move ends the entire future.

**Editorial finding / approach:** A treats a reversible small choice as elimination; B's mundane alternative gets framed as an irreversible cost.

**Example 1 · 36 words**

**A:** Choose the picnic sandwich carefully. There is no second lunch today.  
**B:** We can share them.  
**A:** Then neither of us commits. What does that make us?  
**B:** Two people eating sandwiches.  
**A:** History won't put that on a plaque.  

**Example 2 · 41 words**

**A:** If I send this birthday text with the wrong emoji, the friendship is over.  
**B:** You can send another text.  
**A:** A correction? They'd know the first affection was defective.  
**B:** It's a cake emoji.  
**A:** Exactly. Too many candles could accuse them of ageing.  

### S213 — A Loss Means Better Stakes

**Card:** Treat every setback as an exciting reason to raise the challenge, improve the story, and try again.

**Editorial finding / approach:** A treats each loss as an exciting upgrade to the challenge; B's sensible reduction increases A's delight in comeback stakes.

**Example 1 · 42 words**

**A:** We lost the village quiz. Brilliant. Next week let's enter without a team name.  
**B:** How does that help?  
**A:** A nameless comeback. They'll have to describe us by our achievement.  
**B:** We could study the questions.  
**A:** And sacrifice the drama of learning under pressure?  

**Example 2 · 36 words**

**A:** My cake collapsed. Next year I'll make one with three tiers.  
**B:** You couldn't manage one.  
**A:** Exactly. One tier is now my origin story.  
**B:** What if three collapse?  
**A:** Then four will have an extraordinary burden of redemption.  

### S214 — What Does the Winner Get?

**Card:** Accept competitive claims, but keep asking who benefits, who pays, and what actually changes after the result.

**Editorial finding / approach:** A accepts winning and follows its material consequences; B's symbolic rewards are tested against real duties and bills.

**Example 1 · 41 words**

**A:** Lovely trophy. Who pays to insure it while it's in my house?  
**B:** It's an honour to hold it.  
**A:** And an honour to replace it if the shelf collapses?  
**B:** You could donate it back.  
**A:** Then what exactly have I won custody of?  

**Example 2 · 33 words**

**A:** So winning the best-garden prize means the public visits on Sunday?  
**B:** It's wonderful recognition.  
**A:** Who opens the gate and cleans up afterwards?  
**B:** The winner.  
**A:** I see. The second prize is a day off?  

### S215 — One Point Changes Everything

**Card:** Choose one tiny advantage, score, concession, or technicality and treat it as the decisive fact in every choice.

**Editorial finding / approach:** A makes one tiny disputed advantage decisive despite a much larger result; B's arithmetic only makes the fixation more precise.

**Example 1 · 38 words**

**A:** We're not leaving until the scorer explains my missing half-point.  
**B:** You lost by thirty points.  
**A:** Then nobody needs to be frightened of correcting half a point.  
**B:** It won't change the winner.  
**A:** It will change whether I lose accurately.  

**Example 2 · 29 words**

**A:** My cake had one more cherry. That should settle the category.  
**B:** The category was flavour.  
**A:** Cherries have flavour.  
**B:** Yours was burnt.  
**A:** Then the surviving cherry deserves greater statistical weight.  

### S216 — The Contest Beneath Everything

**Card:** Interpret each new event as another move in a much larger competition whose true winner may not be visible yet.

**Editorial finding / approach:** A interprets ordinary choices as moves in a larger contest; B's innocent explanations generate a new strategic reading rather than random props.

**Example 1 · 40 words**

**A:** You offered to buy lunch. Clever way to choose the restaurant.  
**B:** I was being friendly.  
**A:** A strong opening. Now I owe you both gratitude and the next lunch.  
**B:** You can choose next time.  
**A:** Already planning a rematch. I respect that.  

**Example 2 · 41 words**

**A:** The neighbour returned my ladder cleaned. That's a move in the gardening rivalry.  
**B:** Perhaps it was just dirty.  
**A:** Exactly. Now my ladder is cleaner than my windows.  
**B:** You could say thanks.  
**A:** Concede the first round? Not before I've polished his wheelbarrow.  

### S217 — Command with an Escape Hatch

**Card:** Carry yourself as though every decision settles the matter, while preserving one ambiguity that lets you later reverse what the decision meant.

**Editorial finding / approach:** A's decisive ruling contains a specific escape clause; when B relies on the ruling A reinterprets that same clause.

**Example 1 · 38 words**

**A:** The garden party is approved, subject to the usual considerations.  
**B:** Great. I've invited fifty people.  
**A:** Fifty is now one of the usual considerations.  
**B:** You said it was approved.  
**A:** And I stand by the considerate part of that decision.  

**Example 2 · 32 words**

**A:** You may borrow the car for a short trip.  
**B:** It's only forty miles.  
**A:** Short refers to how long I'm willing to worry.  
**B:** That isn't a distance.  
**A:** Precisely. My permission remains wonderfully adaptable.  

### S218 — Authority Changes Hands

**Card:** Project control while guarding one detail that could transfer authority elsewhere. Let each return of that detail shift whom you defer to or overrule.

**Editorial finding / approach:** One concrete credential repeatedly shifts actual deference; B's correction changes who A treats as entitled to decide.

**Example 1 · 43 words**

**A:** I'm chairing the club meeting until we locate the signed election result.  
**B:** I have it. You lost.  
**A:** Then may I respectfully propose we check both sides?  
**B:** The back says the winner declined.  
**A:** Good. My first decision is to store important documents face up.  

**Example 2 · 38 words**

**A:** I hold the only key, so I decide when the rehearsal room opens.  
**B:** Mine fits too.  
**A:** Then perhaps you should choose today's schedule.  
**B:** It's actually the cupboard key.  
**A:** Excellent. You may schedule the cupboard. I'll handle the rehearsal.  

### S219 — The Expert Blind Spot

**Card:** Perform mastery everywhere except one specific subject. Deflect it at first, reinterpret it later, and let each return increase the pressure.

**Editorial finding / approach:** A performs expertise around one named blind spot; every return to it intensifies tactical delay while other expertise stays credible.

**Example 1 · 41 words**

**A:** The engine is simple, apart from that red switch, which we'll leave alone.  
**B:** I need to know what it does.  
**A:** First, understand the twelve systems surrounding it.  
**B:** They all point to the switch.  
**A:** Exactly. A useful opportunity to revise all twelve.  

**Example 2 · 41 words**

**A:** I can explain every clause in this lease except the one about renewal.  
**B:** That's why I brought it.  
**A:** Then we should give it the benefit of a thorough introduction.  
**B:** It just says 'automatically.'  
**A:** A deceptively advanced word. Let's revisit 'lease' first.  

### S220 — Insider with the Wrong Memories

**Card:** Act like an unquestioned insider while offering details that almost fit. Treat each contradiction as proof the group, system, or relationship changed.

**Editorial finding / approach:** A's confident insider memory almost fits; each contradiction is blamed on changes to the group rather than ignorance.

**Example 1 · 39 words**

**A:** You've moved the club's trophy cupboard. It used to be beside the piano.  
**B:** We've never had a piano.  
**A:** You really are modernising everything.  
**B:** This is the gardening club.  
**A:** Then retiring the piano made room for the original purpose. Sensible.  

**Example 2 · 39 words**

**A:** At our old reunions, Uncle Frank always carved the turkey.  
**B:** Nobody here has an Uncle Frank.  
**A:** Families edit their history so quickly now.  
**B:** You're at the wrong reunion.  
**A:** That's a remarkably efficient way to describe how much you've changed.  

### S221 — I Meant to Teach That

**Card:** Treat any correction, surprise, or improvement as evidence your teaching succeeded. Claim each reversal as the lesson you intended all along.

**Editorial finding / approach:** Each correction is reclassified as a deliberate teaching test; the final reversal credits A with having taught the correction of A.

**Example 1 · 37 words**

**A:** Excellent. You spotted the deliberate error in my recipe.  
**B:** You baked it that way yesterday.  
**A:** A demonstration is more memorable than a warning.  
**B:** You ate three slices.  
**A:** Commitment to the lesson. I'm glad you're questioning authority now.  

**Example 2 · 44 words**

**A:** You've improved my filing system. Just the independence I hoped to provoke.  
**B:** Your system lost every invoice.  
**A:** And yours has found them. The learning journey is complete.  
**B:** I did it by ignoring you.  
**A:** My most advanced outcome. I'll include it in the course description.  

### S222 — The Favor Not Yet Named

**Card:** Behave as though you hold decisive leverage, but delay naming it until another explanation has taken root.

**Editorial finding / approach:** A delays naming a specific source of leverage while B commits to an explanation; its eventual reveal recontextualises that explanation.

**Example 1 · 49 words**

**A:** Before you explain why I shouldn't join the committee, shall I keep this envelope closed?  
**B:** What's in it?  
**A:** Tell me your reasons first. They sound carefully prepared.  
**B:** We only admit people who contribute to the building.  
**A:** Then perhaps now is the moment for my receipt for its new roof.  

**Example 2 · 45 words**

**A:** Go on explaining why you can't help me move. I'll save my little reminder.  
**B:** What reminder?  
**A:** Your reasons should have a fair chance without interference.  
**B:** Moving is something people should arrange themselves.  
**A:** Lovely principle. Shall we apply it to the piano I moved for you?  

### S223 — Same Memory, Different Meaning

**Card:** Return to one shared memory as comfort, then evidence, then accusation, changing its meaning without abandoning the facts.

**Editorial finding / approach:** A returns to the same factual memory with changing emotional meaning; B adds context that turns comfort into evidence and then grievance.

**Example 1 · 47 words**

**A:** Remember when you saved me the window seat? I thought I mattered to you.  
**B:** I knew you liked the view.  
**A:** Exactly. Proof that you noticed small things.  
**B:** Also, the seat beside it had less legroom.  
**A:** So my fondest memory of being understood was your knees negotiating space.  

**Example 2 · 45 words**

**A:** You kept my first terrible painting. That used to feel wonderfully loyal.  
**B:** I still have it in the hall.  
**A:** Then you believed in me before anyone else.  
**B:** It makes visitors appreciate your later work.  
**A:** Ah. My earliest humiliation has become your introduction to the house.  

### S224 — The Debt Changes Hands

**Card:** Treat every favor as shifting who owes whom. Recalculate the balance whenever help is accepted, refused, or remembered.

**Editorial finding / approach:** A recalculates obligation after acceptance or refusal; the same favour reverses direction instead of introducing a new unrelated debt.

**Example 1 · 44 words**

**A:** You fixed my bike, so I owe you dinner.  
**B:** I was repaying the dinner you cooked last week.  
**A:** Then your repair was too good. I owe you for the surplus kindness.  
**B:** Please don't cook again.  
**A:** Now you're saving me work. The debt has increased.  

**Example 2 · 40 words**

**A:** I brought your parcel upstairs. We're even for the lift yesterday.  
**B:** It was addressed to you.  
**A:** Then you've been storing it. I owe you.  
**B:** I only noticed it just now.  
**A:** Good. You saved me from thanking you excessively. Another favour.  

### S225 — We Keep Switching Places

**Card:** Return to a familiar relationship pattern, then reverse who performs each role whenever the scene reaches similar pressure.

**Editorial finding / approach:** A swaps the familiar fixer/worrier roles when the same pressure returns; B's changed response motivates the switch.

**Example 1 · 43 words**

**A:** You fix the leaking tap this time. I'll stand here saying it'll flood.  
**B:** It might. I can't find the valve.  
**A:** Fine, give me the spanner. You're better at worrying.  
**B:** Actually, turning this stopped it.  
**A:** Excellent. I'll return to wondering whether it'll start again.  

**Example 2 · 45 words**

**A:** Today you reassure me about the presentation. I'm usually the calm one.  
**B:** Fine. It'll be brilliant. Unless the projector fails.  
**A:** I'll check the projector. You breathe.  
**B:** It's working. See? Nothing to worry about.  
**A:** Then let me worry about the audience while you stay impressively calm.  

### S226 — Become What You Compete With

**Card:** Turn comparison into imitation: adopt whatever quality seems powerful, allowing each borrowed trait to change the basis of the rivalry.

**Editorial finding / approach:** A adopts the rival's successful trait and makes it the new contest; B notices imitation and A competes over the borrowed method.

**Example 1 · 34 words**

**A:** Your cake won because it was minimalist. I'm removing half my decorations.  
**B:** Yesterday you called mine bare.  
**A:** Before restraint became our competitive frontier.  
**B:** You're copying me.  
**A:** Improving. I've now removed the cake stand too.  

**Example 2 · 39 words**

**A:** Your calm negotiating style is very effective. I'll speak even more quietly.  
**B:** You normally shout over me.  
**A:** An outdated phase of my restrained development.  
**B:** I can't hear you now.  
**A:** Then I've achieved a level of composure you haven't reached.  

### S227 — Trust with a Trapdoor

**Card:** Use one person as your anchor while preserving a private condition that could reverse your trust when a recurring detail returns.

**Editorial finding / approach:** A trusts a person until a specific recurring cue changes the terms; B's reassurance brings that cue back and toggles reliance.

**Example 1 · 44 words**

**A:** Take my spare key. I trust you completely these days.  
**B:** I'll just make a tiny adjustment to your shelves.  
**A:** Give the key back. 'Tiny adjustment' preceded the last collapse.  
**B:** I won't touch a shelf.  
**A:** Good. The key is yours until 'improvement' enters the conversation.  

**Example 2 · 43 words**

**A:** You're in charge of my birthday. I know you'll keep it simple.  
**B:** Just a small surprise.  
**A:** That phrase cost me a weekend in a mascot suit last year.  
**B:** No costume this time.  
**A:** Then you can keep planning. Slowly, and without using 'surprise' again.  

### S228 — The Incident Keeps Changing

**Card:** Carry an unnamed past rupture whose meaning shifts with each new detail, while never letting its emotional weight diminish.

**Editorial finding / approach:** New details change the meaning of one past hurt without erasing it; B's explanation creates a new interpretation of the original absence.

**Example 1 · 47 words**

**A:** I still haven't forgiven you for missing my concert.  
**B:** I was outside. They wouldn't let me in.  
**A:** Then you were close enough to hear and still didn't call?  
**B:** I heard you dedicate a song to me.  
**A:** So you knew exactly how abandoned I felt, in perfect acoustics.  

**Example 2 · 47 words**

**A:** I thought your apology was for forgetting my birthday.  
**B:** It was for sending your present to the wrong address.  
**A:** You remembered, but somebody else got it?  
**B:** Your old flat. I was trying to surprise you.  
**A:** Now I have to forgive both disappointment and an extremely informed stranger.  

### S229 — Every Compliment Raises the Bar

**Card:** Treat each compliment as sincere admiration and a new standard you must immediately surpass.

**Editorial finding / approach:** A takes praise sincerely and instantly converts it into a higher obligation; each new compliment raises the next demand.

**Example 1 · 43 words**

**A:** You called my cake impressive. Now I'll need a second tier before you leave.  
**B:** One tier was already impressive.  
**A:** Was. We've established that as the baseline.  
**B:** You don't have to prove anything.  
**A:** Then I'll add a third tier so that becomes convincingly true.  

**Example 2 · 36 words**

**A:** You said I handled the meeting well. I'll rewrite the whole agenda tonight.  
**B:** Why? You were excellent.  
**A:** Excellent is now what they'll expect tomorrow.  
**B:** You could take a break.  
**A:** From a standard you've just raised twice?  

### S230 — My Past Self Is Watching

**Card:** Behave as though an earlier version of yourself is judging every choice. Alternate between honoring that identity and deliberately betraying it.

**Editorial finding / approach:** A alternates between loyalty to a younger identity and deliberate betrayal; B's practical response triggers the next side of that same conflict.

**Example 1 · 37 words**

**A:** My teenage self would hate me buying this sensible car.  
**B:** It has excellent insurance rates.  
**A:** Exactly the sort of sentence he swore never to say.  
**B:** Then buy the motorbike.  
**A:** No. Let him be disappointed somewhere with airbags.  

**Example 2 · 40 words**

**A:** I promised my younger self I'd never leave this town.  
**B:** You also wanted to live on the moon.  
**A:** Some ambitions were symbolic. Loyalty wasn't.  
**B:** So you're staying?  
**A:** No. I'm taking the photograph so he can disapprove from a better view.  

### S231 — Relief Is Suspicious

**Card:** Treat every reassuring development as evidence that the real threat has merely changed shape.

**Editorial finding / approach:** A treats each reassurance as a disguised threat, with suspicion following the specific relief B offers.

**Example 1 · 30 words**

**A:** The inspection passed? That's suspiciously convenient.  
**B:** They found nothing wrong.  
**A:** Then the problem has become good at hiding.  
**B:** They checked everything twice.  
**A:** Whatever escaped that deserves a more serious inspection.  

**Example 2 · 33 words**

**A:** You say the neighbours liked my speech. What are they preparing me for?  
**B:** They just enjoyed it.  
**A:** Why tell you rather than me?  
**B:** They told you too.  
**A:** Coordinated reassurance. That's what concerns me.  

### S232 — Rescue Me by Needing Me

**Card:** Take protective control, then let each consequence reveal how much your confidence depends on remaining necessary.

**Editorial finding / approach:** Protective competence gives way to a need to remain needed; B's actual competence raises A's personal insecurity rather than danger alone.

**Example 1 · 45 words**

**A:** Let me fix your bike before you ride. I know which bolts matter.  
**B:** I've tightened them already.  
**A:** I'll check the checking. There must be something left.  
**B:** You can just come riding with me.  
**A:** Without a repair to do? Give me a minute to remember how.  

**Example 2 · 39 words**

**A:** I'll handle the difficult phone call for you.  
**B:** I've made it. It went well.  
**A:** There may be a follow-up only I can manage.  
**B:** I'd rather celebrate with you.  
**A:** Could the celebration require help setting up? I'm better when useful.  

### S233 — Belonging on Changing Terms

**Card:** Seek acceptance by adapting quickly, then let each adaptation create a new version of yourself you must defend.

**Editorial finding / approach:** A adapts to gain acceptance, then defends the newly adopted self when the welcome changes again.

**Example 1 · 43 words**

**A:** I bought the formal jacket you said would fit in at the club.  
**B:** Tonight's casual.  
**A:** Then I'll become someone who wears a formal jacket casually.  
**B:** You can take it off.  
**A:** Not immediately. I've only just learned what kind of member this makes me.  

**Example 2 · 46 words**

**A:** You wanted a more adventurous friend, so I've booked us climbing lessons.  
**B:** I meant trying a new cafe.  
**A:** Well, I'm a climbing person now. I've told my sister.  
**B:** Cancel the lessons.  
**A:** And become unreliable as well? I'm trying to keep one identity long enough to belong.  

### S234 — Humility with Evidence

**Card:** Perform modesty while planting small facts that can later assemble themselves into undeniable proof of your importance.

**Editorial finding / approach:** A plants modest factual evidence that accumulates into a claim of importance; B's recognition triggers another supposedly minor supporting fact.

**Example 1 · 44 words**

**A:** The roof practically fixed itself. My ladder was only there six weekends.  
**B:** You did a lot of work.  
**A:** Nothing worth mentioning, beyond the invoices I've arranged by date.  
**B:** Why are your initials on every page?  
**A:** So the evidence doesn't embarrass us by becoming inaccurate.  

**Example 2 · 41 words**

**A:** Anyone could have organised the concert. My thirty-seven calls were hardly heroic.  
**B:** Thirty-seven?  
**A:** Only the completed ones. I wouldn't inflate the figure with attempts.  
**B:** You want a thank-you speech.  
**A:** No, no. Just make sure whoever writes it has the call log.  

### S235 — The Ritual Explains Itself Later

**Card:** Treat one unexplained recurring action as essential. Allow its meaning to change each time it returns.

**Editorial finding / approach:** A repeats a concrete ritual and reveals a different plausible meaning when B responds; the gesture remains constant, not the topic.

**Example 1 · 44 words**

**A:** Before we eat, tap your cup twice. Mum always did.  
**B:** For good luck?  
**A:** That was what she told guests. We knew it meant the tea was weak.  
**B:** This tea is strong.  
**A:** Then today the taps can mean we wish she were here to complain.  

**Example 2 · 40 words**

**A:** I always turn this chair toward the door before rehearsal.  
**B:** To welcome whoever's late?  
**A:** Originally. Then it reminded the late person everyone had noticed.  
**B:** Nobody's late today.  
**A:** Then it can wait for the member we lost. Leave it facing outward.  

### S236 — The Warning Was Already Here

**Card:** Choose one early detail as the warning sign, then let every later development reveal a larger version of the same disaster.

**Editorial finding / approach:** One early warning recurs at a larger scale; B's latest development is interpreted through the original overlooked detail.

**Example 1 · 40 words**

**A:** I said that tiny crack in the stage was a warning.  
**B:** Now the piano's leaning.  
**A:** The crack has learned to accompany music.  
**B:** We need to stop the concert.  
**A:** Start by listening to the stage. It auditioned its objection this morning.  

**Example 2 · 38 words**

**A:** The first wedding invitation came back misspelled. That was the warning.  
**B:** Now the cake names the wrong couple.  
**A:** Same mistake, larger icing budget.  
**B:** The venue has two weddings booked.  
**A:** There it is. The typo has acquired a building.  

### S237 — Exactly the Victory I Meant

**Card:** Celebrate every reversal as though it secretly delivers the outcome you wanted, while preserving enthusiasm for all earlier outcomes.

**Editorial finding / approach:** A enthusiastically claims both a goal and its reversal as intended victories; B's contradictions are welcomed rather than denied.

**Example 1 · 36 words**

**A:** Wonderful, our outdoor concert is sold out!  
**B:** It's just been cancelled for rain.  
**A:** Wonderful, we've created an unforgettable sense of demand.  
**B:** We're refunding everyone.  
**A:** And demonstrated generosity at full capacity. Exactly the evening I hoped for.  

**Example 2 · 43 words**

**A:** I've won the election! At last I can lead this club.  
**B:** The recount says you lost.  
**A:** At last I can serve without the burden of office.  
**B:** You said office was the point.  
**A:** Yes, and now I've transcended the point. A more ambitious victory.  

### S238 — Track the Cost That Returns

**Card:** Accept every twist, but keep returning to one practical consequence whose importance grows as the scene becomes more complicated.

**Editorial finding / approach:** A returns to one practical consequence through increasingly strange developments; each new offer changes the same bill or problem.

**Example 1 · 40 words**

**A:** Fine, the fountain grants wishes. Who pays its water bill?  
**B:** It can wish the water free.  
**A:** Then who pays the sewer charge?  
**B:** It has turned the pipes to gold.  
**A:** Lovely. Does the same meter now charge us for gold drainage?  

**Example 2 · 43 words**

**A:** I accept that the house travels through time. The roof still leaks.  
**B:** We've arrived in ancient Rome.  
**A:** Good. Ask whether someone here repairs tiles.  
**B:** Now we're at the moon landing.  
**A:** Then put the original bucket under the original leak before it floats away.  

### S239 — The Object Changes Meaning

**Card:** Choose one ordinary detail and reinterpret it as gift, threat, evidence, or symbol as the scene evolves.

**Editorial finding / approach:** The same object changes relationship meaning through B's responses; no prop substitution is needed for the reversal.

**Example 1 · 46 words**

**A:** I gave you that key because you were welcome here.  
**B:** Then why are you holding it like evidence?  
**A:** Because the cupboard was locked before the cake disappeared.  
**B:** I brought you a replacement cake.  
**A:** Then perhaps the key is a subscription. We'll discuss the terms over tea.  

**Example 2 · 42 words**

**A:** Keep this old ticket. It proves we went somewhere together.  
**B:** It proves you booked us different trains.  
**A:** Then it's evidence of a mistake we survived.  
**B:** I kept my ticket too.  
**A:** Good. Put them together. Now they're an invitation to get it right.  

### S240 — The Callback Changes Meaning

**Card:** Treat every returning phrase or action as evidence the relationship has changed. Repeat it with a new emotional meaning each time.

**Editorial finding / approach:** A repeats one phrase with a changed emotional function after each offer; the language itself reveals the relationship's movement.

**Example 1 · 42 words**

**A:** Make yourself at home. I've put fresh coffee on.  
**B:** I've brought six suitcases.  
**A:** Make yourself at home? I thought you meant a weekend.  
**B:** Just until my flat is repaired.  
**A:** Make yourself at home. I'll clear the drawer, but we're counting weekends together.  

**Example 2 · 45 words**

**A:** 'Anything for you.' That's what I said when you asked for a lift.  
**B:** Now could we collect my piano?  
**A:** Anything for you was much lighter five minutes ago.  
**B:** It's the piano you learned on.  
**A:** Anything for you. But you're carrying the end with the memories.  

