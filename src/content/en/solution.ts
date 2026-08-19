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
    eyebrow: "SOLUTION",
    titleLine1: "A way of working",
    titleLine2: "that grows with you",
    body: "For teams of one to ten with no marketer on staff — a first teammate who carries the propose → approve → execute → repeat loop.",
  },
  difference: {
    label: "HOW THIS DIFFERS FROM CHATGPT",
    title: "Not a tool that hands you a draft — a teammate who sees it through approval, execution, and the next round.",
    tool: {
      title: "A chat tool",
      items: [
        "Ask, and a draft comes back",
        "Running it is still on you",
        "Every session starts from scratch",
      ],
    },
    us: {
      title: "WooriTeam",
      items: [
        "Proposes this week's work first",
        "Takes it through to execution once approved",
        "Carries the results into next week",
      ],
    },
  },
  cycle: {
    label: "ONE CYCLE",
    title: "The growth loop, repeated every week.",
    steps: [
      {
        step: "STEP 01",
        title: "Propose",
        body: "Reads your product and channels, then names the few things worth doing this week.",
      },
      {
        step: "STEP 02",
        title: "Approve",
        body: "You read it and set the direction for the week.",
      },
      {
        step: "STEP 03",
        title: "Execute",
        body: "What you approved moves into real execution.",
      },
      {
        step: "STEP 04",
        title: "Repeat",
        body: "Results shape the next proposal, and the loop keeps going.",
      },
    ],
  },
  scope: {
    label: "TODAY, AND WHAT COMES NEXT",
    now: {
      title: "What it handles today",
      items: [
        "Weekly growth proposals",
        "Direction set by your approval",
        "Follow-through to execution",
        "Results folded into the next round",
      ],
    },
    next: {
      title: "Coming next (in progress)",
      items: [
        "Publishing straight to your channels",
        "Competitor and market monitoring",
        "CEO / CFO roles alongside",
      ],
    },
  },
  cta: {
    title: "Start with your first teammate.",
  },
};
