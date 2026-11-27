import type { SolutionCopy } from "../ko/solution";
import type { DeepWiden } from "../widen";

/**
 * 한국어 사전이 타입의 원본이다. 키가 빠지거나 배열 원소 개수가 달라지면
 * 이 파일이 컴파일되지 않는다.
 *
 * 직역이 아니라 영어로 쓴 글이다 — 홈 영문 사전과 같은 톤을 따른다.
 */
export const solution: DeepWiden<SolutionCopy> = {
  hero: {
    eyebrow: "Solution",
    titleLine1: "An AI operations team",
    titleLine2: "for small businesses",
    body: "WooriTeam prepares the promotion and sales work owners used to carry alone, executes it once approved, and uses that history to prepare the next task better.",
  },
  difference: {
    label: "How it differs from chat AI",
    title: "No AI skills needed. Just review and approve.",
    tool: {
      title: "Chat AI tool",
      items: [
        "You have to decide what to ask first",
        "You re-explain your store and products every time",
        "Even with a draft, posting and tracking is back on you",
      ],
    },
    us: {
      title: "WooriTeam · AI operations team",
      items: [
        "Prepares today's promotion tasks from your store and product info",
        "Carries through to channels and records results after approval",
        "Remembers past approvals and edits for the next proposal",
      ],
    },
  },
  cycle: {
    label: "Workflow",
    title: "You make the key calls; WooriTeam handles the rest.",
    steps: [
      { step: "STEP 01", title: "Store info", body: "Set your preferences and your store, product and menu details." },
      { step: "STEP 02", title: "Task prep", body: "The AI prepares today's promotion plan and content." },
      { step: "STEP 03", title: "Owner approval", body: "You approve, edit or hold." },
      { step: "STEP 04", title: "Execution", body: "Runs on your channels and records results for the next proposal." },
    ],
  },
  scope: {
    label: "Status and roadmap",
    now: {
      title: "In development · MVP",
      items: ["Store and product registration", "Promotion plan and content prep", "Owner approval and edits", "Task history"],
    },
    next: {
      title: "Planned",
      items: [
        "POI-based local analysis, AEO/GEO/SEO visibility",
        "Multi-channel: Naver, Kakao, Karrot, Instagram; influencer picks",
        "Budget-based channel comparison and a unified results dashboard",
      ],
    },
  },
  cta: {
    title: "Hand today's promotion to WooriTeam",
  },
};
