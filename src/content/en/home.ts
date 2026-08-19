import type { HomeCopy } from "../ko/home";
import type { DeepWiden } from "../widen";

export const home: DeepWiden<HomeCopy> = {
  hero: {
    eyebrow: "WOORITEAM",
    titleLine1: "A founder's",
    titleLine2: "first team",
    body: "If you are running growth alone, without a marketer. WooriTeam learns your business and works through ",
    bodyStrong: "propose → approve → execute → repeat",
    bodyAfter: " with you.",
    caption: "WooriTeam · this week's proposal",
    assurances: ["Nothing runs without your approval", "Starts with this week's work"],
  },
  who: {
    label: "WHO IT IS FOR",
    title: "You have a product.\nYou just have no one\nto hand growth to.",
    photoAlt: "A notebook and screen on a desk",
    items: [
      {
        term: "No marketer on the team",
        detail: "The founder writes the copy and runs the ads — and the real decisions wait.",
      },
      {
        term: "Plenty of tools, no hands",
        detail: "ChatGPT, Notion, ad managers — all there. The one who executes is still you.",
      },
      {
        term: "An agency is still too much",
        detail: "A monthly retainer is early. Doing nothing is not an option either.",
      },
    ],
  },
  loop: {
    label: "WHAT YOUR FIRST TEAMMATE DOES",
    title: "Proposes, gets your approval, executes, and folds the result into next week.",
    steps: [
      { step: "STEP 01", title: "Propose", body: "“You need two Reels this week.”" },
      { step: "STEP 02", title: "Approve", body: "“Go ahead with this one.”" },
      { step: "STEP 03", title: "Execute", body: "“The video and copy are done.”" },
      { step: "STEP 04", title: "Repeat", body: "“Last week's results shape the next one.”" },
    ],
    note: "Step four returns to step one. Same rhythm, every week.",
  },
  product: {
    label: "THE PRODUCT",
    title: "Monday morning,\nthe week arrives\nalready sorted.",
    body: "What to do this week, why it matters, and how long it takes. Your job is to read it and approve.",
    items: [
      "Two Reels for the new product",
      "Rewrite the product-page CTA",
      "Rebalance last week's ad budget",
    ],
    caption: "This week's proposal · ~20 min to approve",
  },
  compare: {
    label: "A CHAT TOOL VS. A TEAMMATE",
    title: "A chat tool answers when asked. A teammate proposes the work, then does it.",
    subtitle: "You need both. They just play different roles.",
    headTool: "Chat AI tool",
    headUs: "WooriTeam",
    rows: [
      { key: "Start", tool: "You have to ask", us: "It proposes first" },
      { key: "Context", tool: "Explained again each time", us: "It remembers your business" },
      { key: "Output", tool: "A draft", us: "Work that ships" },
      { key: "After", tool: "The conversation ends", us: "Results feed the next task" },
      { key: "Relationship", tool: "A tool", us: "A teammate" },
    ],
  },
  results: {
    label: "RESULTS",
    title: "At the end of the week: what got done, and what changed — on one page.",
  },
  voices: {
    label: "PILOT FEEDBACK",
    quotes: [
      {
        quote: "“Better than making the content was being told why it mattered.”",
        who: "Online store founder",
        alt: "A hand resting on a notebook",
      },
      {
        quote: "“If it explains results in numbers, I'll keep using it.”",
        who: "Small business owner",
        alt: "Notes on a desk",
      },
    ],
    note: "* Drawn from pilot interviews. To be replaced with verbatim quotes.",
  },
  scope: {
    label: "WHERE WE ARE TODAY",
    title: "What we can do today,\nand what we cannot,\nwritten plainly.",
    stages: [
      {
        when: "NOW",
        title: "Weekly proposals and content execution",
        body: "We propose the week, then produce and publish what you approve.",
        current: true,
      },
      {
        when: "SOON",
        title: "Ad operations and result reports",
        body: "Budget shifts and weekly reporting move into the same loop.",
        current: false,
      },
      {
        when: "LATER",
        title: "Customer replies and repeat purchase",
        body: "We widen what one teammate can carry, step by step.",
        current: false,
      },
    ],
  },
  cta: {
    title: "The work you did alone.\nStarting this week, together.",
    body: "Tell us about your business once, and we'll propose this week's work.",
  },
  footerImageAlt: "Working in a small office",
};
