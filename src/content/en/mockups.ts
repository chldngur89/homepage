import type { MockupsCopy } from "../ko/mockups";
import type { DeepWiden } from "../widen";

export const mockups: DeepWiden<MockupsCopy> = {
  proposal: {
    appLabel: "WooriTeam · AI operations team",
    weekLabel: "Week 1, December",
    heading: "4 promotion tasks this week",
    approveHint: "About 10 min to approve",
    items: [
      { title: "Year-end bouquet Instagram post", meta: "Instagram · content", state: "Proposed" },
      { title: "Naver Place news update", meta: "Naver · search", state: "Proposed" },
      { title: "Neighbourhood post", meta: "Karrot · local", state: "Proposed" },
      { title: "Return-visit note to regulars", meta: "KakaoTalk · retention", state: "Proposed" },
    ],
    approve: "Approve all",
    review: "Review one by one",
  },
  chat: {
    appLabel: "WooriTeam · AI operations team",
    fields: [
      { label: "Store", value: "Goyang florist" },
      { label: "Product", value: "Year-end bouquet" },
      { label: "Price", value: "₩35,000" },
      { label: "Mood", value: "Warm" },
    ],
    messages: [
      {
        fromUser: false,
        text: "This week's promotion is ready. Year-end gatherings are coming, so let's lead with gift bouquets.",
      },
      {
        fromUser: false,
        text: "Audience: locals shopping for year-end gifts\nKey message: a bouquet that says it for you\nChannels: 1 Instagram post · 1 Karrot post",
      },
      { fromUser: true, text: "Looks good, please post it." },
      { fromUser: false, text: "Thanks — posting now, and I'll record the results." },
    ],
  },
  dashboard: {
    appLabel: "WooriTeam · owner dashboard",
    heading: "Your store today",
    stats: [
      { label: "Needs approval", value: "2", unit: " items", highlight: true },
      { label: "Scheduled today", value: "3", unit: " items", highlight: false },
      { label: "Done", value: "4", unit: " items", highlight: false },
      { label: "Needs your check", value: "1", unit: " item", highlight: true },
    ],
    items: [
      { title: "Year-end bouquet Instagram post", status: "Owner approval needed" },
      { title: "Naver Place news", status: "Waiting for manual post" },
      { title: "Return-visit note to regulars", status: "Scheduled" },
    ],
    nextLabel: "Next step",
    next: "Approve to finalise channel copy, post it and record the results.",
    disclaimer: "* Illustrative screen showing the dashboard layout.",
  },
};
