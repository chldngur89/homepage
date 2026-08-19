/**
 * 데모 페이지 카피. **한국어 전용이다** — `EN_ROUTES` 에 `/demo` 가 없어
 * 영문 경로가 아예 존재하지 않으므로 `en/demo.ts` 는 만들지 않는다
 * (`src/content/index.ts` 의 등록부 주석 참고).
 *
 * 값은 전부 `src/content/site.json` 의 `demoPage` 객체에서 **문자 그대로**
 * 옮긴 것이다. 이 태스크는 디자인 언어만 바꾸고 페이지의 주장은 건드리지
 * 않는다. 키 이름만 다른 페이지 사전(solution·pricing)과 같은 모양으로
 * 묶었고, 옛 키 → 새 키 대응은 다음과 같다.
 *
 * | site.json 의 demoPage | 여기 |
 * |---|---|
 * | heroBadge | hero.eyebrow |
 * | heroTitleBefore / heroTitleAccent | hero.titleLine1 / hero.titleLine2 |
 * | heroSubtitle / heroDisclaimer | hero.body / hero.disclaimer |
 * | bridgeTitle / bridgeBody / bridgeRaderCta | bridge.title / bridge.body / bridge.cta |
 * | simulateTitle / simulateSubtitle | simulate.title / simulate.subtitle |
 * | simulateButton / simulateAgain / simulateDone | simulate.button / simulate.again / simulate.done |
 * | playbookLabels | playbookLabels (아래 참고) |
 * | ctaTitle / ctaSubtitle | cta.title / cta.body |
 * | ctaPricing / ctaContact | cta.pricing / cta.contact |
 * | primaryCta | (삭제 — 아래 참고) |
 *
 * 옮기면서 생긴 차이는 넷뿐이다.
 *
 * 1. `primaryCta` 를 버렸다. 값이 `common.cta.primary` 와 글자까지 같은
 *    "우리팀과 같이 성장하기" 였고, 솔루션·요금 페이지가 이미 공통 사전에서
 *    읽는다. 같은 문구를 두 곳에 두면 한쪽만 바뀔 수 있다. 화면에 찍히는
 *    글자는 바뀌지 않는다.
 * 2. `simulate.running` 은 site.json 이 아니라 전환 전 `Demo.tsx` 에 하드코딩
 *    되어 있던 문자열을 값 그대로 끌어온 것이다.
 * 3. `bridge.label`, `simulate.label` 은 새 문자열이다. 새 디자인은 섹션마다
 *    번호 라벨(`SectionLabel`)을 달고, 이전 디자인에는 그 자리에 라벨이
 *    없었다(브리지 자리에는 "WooriTeam" 이라는 워드마크가 있었는데, 한국어
 *    문맥에서 브랜드를 로마자로 부르는 것은 Task 3 에서 이미 정리된 문제라
 *    그대로 쓰지 않았다). 섹션의 주장이 아니라 순서 표시다.
 * 4. `playbookLabels` 만 다른 페이지와 달리 최상위에 남겼다. 시뮬레이션
 *    상태 머신이 `demo.playbookLabels.length - 1` 로 이 배열을 직접 읽는데,
 *    그 `useEffect` 는 이번 전환에서 한 글자도 바뀌면 안 되는 부분이다.
 *    경로를 그대로 두면 로직이 손대지지 않았다는 것이 diff 로 증명된다.
 *
 * 영문 사전이 없어도 `as const` 는 유지한다 — `Dictionary` 타입이 이 파일의
 * 구조에서 흘러나오고, 배열이 튜플로 굳어야 원소 누락이 컴파일 에러가 된다.
 */
export const demo = {
  hero: {
    eyebrow: "데모",
    titleLine1: "같이 성장하는",
    titleLine2: "흐름 한 사이클",
    body: "제안 → 승인 → 실행 → 반복 성장. 실제 화면처럼 짧게 보여 드립니다.",
    disclaimer: "시뮬레이션입니다. 실제 실행은 WooriTeam 앱에서 이어집니다.",
  },
  bridge: {
    label: "다음 역할",
    title: "첫 팀원 다음에 붙는 역할",
    body: "같이 성장하기로 성장 루프를 만든 뒤, CEO Rader의 시장 인사이트를 이어 붙이면 제안의 근거가 더 탄탄해집니다.",
    cta: "CEO Rader AI 열기",
  },
  simulate: {
    label: "시뮬레이션",
    title: "한 사이클 보기",
    subtitle: "실제 실행은 WooriTeam 앱에서 이루어집니다.",
    button: "성장 사이클 시뮬레이션",
    again: "다시 보기",
    done: "여기까지가 시연입니다.",
    running: "단계가 자동으로 진행됩니다…",
  },
  /** 시뮬레이션이 순서대로 밝히는 단계. 위 4번 주석 참고. */
  playbookLabels: [
    "이번 주 성장 과제 제안",
    "대표 승인",
    "실행 진행",
    "결과 반영",
    "반복 성장으로 이어가기",
  ],
  cta: {
    title: "첫 번째 팀원을 만나보세요",
    body: "이번 주 할 일 제안부터 시작해 보세요. 우리팀과 같이 성장합니다.",
    pricing: "요금제 보기",
    contact: "문의하기",
  },
} as const;

export type DemoCopy = typeof demo;
