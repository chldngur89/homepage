import type { AboutCopy } from "../ko/about";
import type { DeepWiden } from "../widen";

/**
 * 한국어 사전이 타입의 원본이다. 키가 빠지거나 배열 원소 개수가 달라지면
 * 이 파일이 컴파일되지 않는다.
 *
 * 직역이 아니라 영어로 쓴 글이다 — 홈·솔루션·기술 영문 사전과 같은 톤을
 * 따른다. 특히 `제안 → 승인 → 실행 → 반복 성장` 루프는 이미
 * `en/solution.ts` 가 "propose → approve → execute → repeat" 로 옮겨 두었고,
 * 같은 루프가 페이지마다 다른 영어로 나오면 안 되므로 그 표기를 그대로 쓴다.
 *
 * `purpose.items` 의 제목 두 개는 한국어 원문에서도 `Mission`·`Vision` 이라
 * 옮길 것이 없다. 그대로 둔다.
 */
export const about: DeepWiden<AboutCopy> = {
  hero: {
    eyebrow: "About",
    titleLine1: "Enterprise-grade operations,",
    titleLine2: "for the shop down the street.",
    body: "WooriTeam is an AI operations team for small businesses, built by two engineers who spent years connecting enterprise CRM and ERP systems.",
  },
  purpose: {
    label: "Mission and vision",
    items: [
      {
        title: "Mission",
        body: "Give owners who can't hire staff an AI operations team for promotion and sales, so they can focus on what they do best.",
      },
      {
        title: "Vision",
        body: "Bring the value of data and automation that large companies get from systems and specialists to local shops limited by people and capital.",
      },
    ],
  },
  why: {
    label: "Why we built it",
    lead: "The owner thought a great kimchi stew would be enough. But on top of cooking, promotion, finding customers and customer service all fell on one person.",
    bodyBefore: "Companies manage customers and sales in systems, with specialists splitting the work. Our founder spent close to a decade building those systems, and decided to turn that experience into ",
    bodyEmphasis: "an AI operations team anyone can use",
    bodyAfter: ". To avoid building from imagination, we went to the Goyang Flower Association, flower farms and local merchant associations in person.",
    note: "We learned that not every small business needs AI for the same reason, and chose owners who have products to sell and want new customers as our first customers.",
  },
  team: {
    label: "Team",
    title: "Two engineers who connected complex enterprise work\nare building an AI team.",
    members: [
      {
        name: "Woohyuk Choi",
        role: "CEO · product, go-to-market and sales",
        lines: [
          "M.S. in Computer Engineering, Hongik University — AI for semantic mapping between heterogeneous systems",
          "About 10 years building and integrating enterprise CRM and ERP systems (at Korea's longest-standing Salesforce partner)",
          "Dev lead and PL for Samsung's B2Bi migration (TIBCO → MuleSoft); led an A2A/MCP AI agent PoC for Samsung MIS",
          "One of 2 founding developers of in-house product Notiforce — now about ₩3.5B in annual revenue",
          "Salesforce Agentforce hackathon award; 5 Salesforce certifications",
          "2 patents filed on AI marketing content and ad image generation",
        ],
      },
      {
        name: "Chen Kai-Hsiang",
        role: "Core engineer · backend and infrastructure",
        lines: [
          "M.S. in Computer Engineering",
          "Former lead engineer at Gogoro (Taiwan)",
          "Built APIs and core backend infrastructure at a global tech company",
        ],
      },
    ],
  },
  roadmap: {
    label: "Roadmap",
    steps: [
      {
        step: "Stage 1 · In progress",
        title: "Validation in Goyang",
        body: "Interview flower, furniture and restaurant owners and validate promotion work with their real products.",
      },
      {
        step: "Stage 2 · Planned",
        title: "Paid conversion",
        body: "Win paying customers on Starter (₩29,000/mo) and Core (₩299,000/mo) subscriptions.",
      },
      {
        step: "Stage 3 · Planned",
        title: "Advanced AI marketing ops",
        body: "Expand into local analysis, search visibility, multi-channel ops, cost optimisation and a unified results dashboard.",
      },
    ],
  },
  cta: {
    title: "Let's talk",
    secondary: "Contact & IR",
  },
};
