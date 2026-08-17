import type { MockupsCopy } from "../ko/mockups";
import type { DeepWiden } from "../widen";

export const mockups: DeepWiden<MockupsCopy> = {
  proposal: {
    appLabel: "WooriTeam · this week's proposal",
    weekLabel: "Week of Aug 18",
    heading: "4 things to do this week",
    approveHint: "~20 min to approve",
    items: [
      { title: "Two Reels for the new product", meta: "Instagram · Content", state: "Proposed" },
      { title: "Rewrite the product-page CTA", meta: "Store · Conversion", state: "Proposed" },
      { title: "Rebalance last week's ad budget", meta: "Ads · Operations", state: "Proposed" },
      { title: "Repeat-purchase reminder", meta: "CRM · Retention", state: "Proposed" },
    ],
    approve: "Approve all",
    review: "Review one by one",
  },
  chat: {
    appLabel: "WooriTeam · marketing assistant",
    fields: [
      { label: "Product", value: "Watermelon" },
      { label: "Price", value: "10,000 KRW" },
      { label: "Brand", value: "Chagaum" },
      { label: "Concept", value: "Refreshing" },
    ],
    messages: [
      {
        fromUser: false,
        text: "Here is this week's proposal. Peak summer — Reels leading with freshness perform best.",
      },
      {
        fromUser: false,
        text: "Audience: families in summer\nKey message: a cool summer, a cold watermelon\nChannel: two Instagram Reels",
      },
      { fromUser: true, text: "Go ahead with this one." },
      { fromUser: false, text: "I'll produce both videos and the copy." },
    ],
  },
  dashboard: {
    appLabel: "WooriTeam · weekly report",
    heading: "Week of Aug 18",
    stats: [
      { label: "Content this week", value: "4", unit: " items", highlight: false },
      { label: "Ads running", value: "2", unit: " sets", highlight: false },
      { label: "New visitors", value: "+14%", unit: "", highlight: true },
      { label: "Inquiries", value: "+3", unit: "", highlight: true },
    ],
    channels: [
      { name: "Instagram", share: 46 },
      { name: "Store", share: 31 },
      { name: "Search", share: 23 },
    ],
    nextLabel: "Next week",
    next: "Lean into product A, which performed best, with more Reels.",
    disclaimer: "* Numbers shown are illustrative examples.",
  },
};
