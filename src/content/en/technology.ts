import type { TechnologyCopy } from "../ko/technology";
import type { DeepWiden } from "../widen";

/**
 * 한국어 사전이 타입의 원본이다. 키가 빠지거나 배열 원소 개수가 달라지면
 * 이 파일이 컴파일되지 않는다.
 *
 * 직역이 아니라 영어로 쓴 글이다 — 홈·솔루션 영문 사전과 같은 톤을 따른다.
 *
 * `pipeline.steps` 의 02·03·04 본문은 한국어가 솔루션의 `cycle.steps` 와
 * 글자까지 같다. 같은 문장이 페이지마다 다른 영어로 나오면 안 되므로
 * `en/solution.ts` 의 번역을 그대로 쓴다.
 */
export const technology: DeepWiden<TechnologyCopy> = {
  hero: {
    eyebrow: "TECHNOLOGY",
    titleLine1: "A growth pipeline",
    titleLine2: "we run together",
    body: "WooriTeam is built around the flow — from this week's work through to the next round of growth — rather than around piling on more models.",
  },
  pipeline: {
    label: "THE GROWTH PIPELINE",
    steps: [
      {
        phase: "01",
        title: "Propose",
        body: "Works from your product and channel context to lay out this week's growth tasks.",
      },
      {
        phase: "02",
        title: "Approve",
        body: "You read it and set the direction for the week.",
      },
      {
        phase: "03",
        title: "Execute",
        body: "What you approved moves into real execution.",
      },
      {
        phase: "04",
        title: "Repeat",
        body: "Results shape the next proposal, and the loop keeps going.",
      },
    ],
  },
  principles: {
    label: "DESIGN PRINCIPLES",
    items: [
      {
        title: "One weekly loop",
        body: "Propose → approve → execute → repeat, bound into a single cycle.",
      },
      {
        title: "Growth one role at a time",
        body: "Start by growing together, then add the CEO and CFO roles when you need them.",
      },
      {
        title: "Integrations we don't oversell",
        body: "Things like publishing straight to your channels are marked as in progress, not as shipped.",
      },
    ],
  },
  cta: {
    title: "Before the architecture, see what your first teammate does.",
    secondary: "See the solution",
  },
};
