import type { HomeCopy } from "../ko/home";
import type { DeepWiden } from "../widen";

export const home: DeepWiden<HomeCopy> = {
  hero: {
    eyebrow: "WOORITEAM",
    titleLine1: "You make the key calls.",
    titleLine2: "WooriTeam handles the rest.",
    body: "WooriTeam takes on the repetitive ",
    bodyStrong: "promotion and sales work",
    bodyAfter: " of small business owners — it prepares the work, executes once you approve, and gets better as your task history grows. An AI operations team, by subscription.",
    caption: "WooriTeam · today's promotion tasks",
    assurances: [
      "Nothing runs without the owner's approval",
      "Start small from ₩29,000 a month",
    ],
  },
  who: {
    label: "Who it's for",
    title: "Great at the craft,\nbut running the shop\nall on your own?",
    photoAlt: "Notebook and screen on a desk",
    items: [
      {
        term: "Promotion and marketing",
        detail: "Social posts, delivery apps and reviews all land on the owner. The same post gets rewritten every day, with no clear idea of where it works.",
      },
      {
        term: "Bringing in customers",
        detail: "New customers are hard to find, and repeat visits live only in the owner's memory. With no record of who came when, tailored offers are hard to make.",
      },
      {
        term: "Customer service and follow-up",
        detail: "Orders, questions and bookings tie the owner down all day. Follow-ups and return-visit reminders happen only when there's time.",
      },
    ],
  },
  loop: {
    label: "How WooriTeam works",
    title: "Register your store once. WooriTeam prepares the work; you just approve.",
    steps: [
      { step: "STEP 01", title: "Store info", body: "Set your preferences and your store, product and menu details." },
      { step: "STEP 02", title: "Task prep", body: "The AI prepares today's promotion and sales tasks and content." },
      { step: "STEP 03", title: "Owner approval", body: "You review, then approve or edit." },
      { step: "STEP 04", title: "Execution", body: "Tasks run on your promotion channels and results are recorded." },
    ],
    note: "The more approvals, edits and executions pile up, the sharper the next proposal gets. Task history is stored as time-series data to keep improving the AI.",
  },
  product: {
    label: "Product",
    title: "Your store and products,\nturned into today's\npromotion plan.",
    body: "No need to explain last week's work again. WooriTeam remembers your store, products, prices and conditions, prepares the promotion plan and content first, and asks for your approval.",
    items: ["Promotion plans and content from product info", "Channel-specific copy that reflects your store", "Approvals and edits feed the next proposal"],
    caption: "WooriTeam · promotion task prep",
  },
  compare: {
    label: "Chat AI tools vs. an AI operations team",
    title: "Not a tool that answers questions — a team that prepares the work first.",
    subtitle: "You don't need to think up prompts. WooriTeam proposes what to do.",
    headTool: "Chat AI tool",
    headUs: "WooriTeam",
    rows: [
      { key: "Start", tool: "You write questions and prompts", us: "Proposes today's tasks first" },
      { key: "Context", tool: "You re-explain your store every time", us: "Remembers your store, products and past work" },
      { key: "Decide", tool: "You judge the output again", us: "You just approve or edit" },
      { key: "Execute", tool: "Everything after the draft is on you", us: "Carries through to channels and records results" },
      { key: "Role", tool: "A tool", us: "Your store's AI operations team" },
    ],
  },
  results: {
    label: "Owner dashboard",
    title: "The owner sees only what to approve, today's tasks, and what got done.",
  },
  voices: {
    label: "What we saw in the field",
    quotes: [
      {
        quote: "At flower farms and wholesale sites, growers told us they want to move beyond production and wholesale into selling and marketing directly.",
        who: "Goyang Flower Association · flower farms",
        alt: "Hands over a notebook",
      },
      {
        quote: "In traditional markets, many shops run on regulars. Winning new customers is not every store's top priority.",
        who: "Goyang merchant associations · local districts",
        alt: "Notes on a desk",
      },
    ],
    note: "* From our own site visits. Based on them, our first customers are owners who have products to sell and want new customers.",
  },
  scope: {
    label: "Status and roadmap",
    title: "Promotion work today —\nnext, helping customers\nfind and choose your store.",
    stages: [
      {
        when: "In development",
        title: "Task prep, approval, history",
        body: "Content prep from store and product info, owner approval and task history are being built as the MVP.",
        current: true,
      },
      {
        when: "Planned",
        title: "Discovery",
        body: "POI-based local area analysis and AI search visibility (AEO, GEO, SEO) so your store gets found.",
        current: false,
      },
      {
        when: "Planned",
        title: "Reach",
        body: "Picks the right channels — Naver, Kakao, Karrot, Instagram — for your trade and recommends influencers.",
        current: false,
      },
      {
        when: "Planned",
        title: "Cost optimisation",
        body: "Prioritises free and low-cost channels and recommends a marketing mix that fits your budget.",
        current: false,
      },
      {
        when: "Planned",
        title: "Results",
        body: "Impressions, clicks, visits and inquiries in one dashboard, fed back into the next plan.",
        current: false,
      },
    ],
  },
  cta: {
    title: "You focus on what you do best.\nLeave the rest to WooriTeam.",
    body: "You decide, WooriTeam executes. Share your store details once and we'll prepare today's promotion.",
  },
  footerImageAlt: "Working in a small shop",
};
