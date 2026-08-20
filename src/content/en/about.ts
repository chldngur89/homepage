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
    eyebrow: "ABOUT",
    titleLine1: "A first teammate",
    titleLine2: "for early founding teams",
    body: "WooriTeam is for founders of one-to-ten-person teams with no marketer on staff — so growth isn't something you carry on your own.",
  },
  purpose: {
    label: "MISSION AND VISION",
    items: [
      {
        title: "Mission",
        body: "For teams that haven't hired a marketer yet, a first teammate who grows with you.",
      },
      {
        title: "Vision",
        body: "Beyond a chat tool — a team you can add to, one role at a time. You stay on direction, and your teammates take on propose, approve, execute, and repeat.",
      },
    ],
  },
  why: {
    label: "WHY WE BUILT IT",
    lead: "Early founding teams write their copy with ChatGPT and make images across a handful of tools — and then still decide “so what do we do this week?” on their own.",
    bodyBefore: "WooriTeam fills that gap by ",
    bodyEmphasis: "growing together",
    bodyAfter: ". It stays with you from this week's work through approval, execution, and the next round of growth.",
    note: "Publishing straight to your channels and additional roles are still being built and connected, and we don't state them as fact.",
  },
  roadmap: {
    label: "ROADMAP (PLANNED)",
    steps: [
      {
        step: "Phase 1 · Planned",
        title: "Proving growing together",
        body: "Validating the propose → approve → execute → repeat loop with early founding teams.",
      },
      {
        step: "Phase 2 · Planned",
        title: "A sharper growth loop",
        body: "Tuning it so founders can settle the week quickly.",
      },
      {
        step: "Phase 3 · Planned",
        title: "More roles",
        body: "Adding the roles you need — CEO, CFO — the way you would add teammates.",
      },
    ],
  },
  cta: {
    title: "Let's talk it through.",
    secondary: "Contact or request IR",
  },
};
