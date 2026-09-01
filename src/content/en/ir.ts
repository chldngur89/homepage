import type { IrContent } from "@/content/ko/ir";

/**
 * `/en/ir` 의 본문. 한국어 사전(`ko/ir.ts`)이 구조의 원본이다.
 *
 * **다른 영문 사전과 달리 `DeepWiden` 을 쓰지 않는다.** `ko/ir.ts` 는
 * `as const` 가 아니라 `export const ir: IrContent` 로 타입을 명시하므로
 * 문자열이 이미 `string` 이다 — `DeepWiden` 을 씌워도 넓힐 것이 없고,
 * 대신 `tone`(`"estimate"|"goal"|"planned"|"under_review"`),
 * `segment`(`"manual"|"strategic"`), `stage`(`"TAM"|"SAM"|"SOM"`) 같은
 * **판별자만 `string` 으로 뭉갠다**. 그 셋은 카피가 아니라 `StatusPill` 과
 * 차트가 색을 고르는 데 쓰는 태그다. `IrContent` 를 그대로 쓰는 편이 오탈자
 * 하나를 컴파일 에러로 잡아 준다(`src/content/index.ts` 의 `ir` 멤버 주석).
 *
 * **직역이 아니라 영어로 쓴 투자자 문서다.** 다만 사이트 전체가 이미 정해
 * 둔 표현은 그대로 따른다 — 루프는 `propose → approve → execute → repeat`
 * (`en/solution.ts`·`en/technology.ts`), `같이 성장하기` 는
 * `growing together`(`en/about.ts`), `마케터 공백` 은 `the marketer gap`
 * (`ssg/seo.ts` 의 영문 `/ir` description). 같은 개념이 페이지마다 다른
 * 영어로 나오면 안 된다.
 *
 * **지켜야 하는 세 가지.**
 *
 * 1. **숫자는 한 자리도 바꾸지 않는다.** `number` 로 든 차트 값뿐 아니라
 *    문자열 안의 값(TAM `"55~80조 원"` → `"KRW 55–80 trillion"`)도 같다.
 *    바뀌는 것은 단위어와 범위 기호뿐이다. `src/content/ir.test.ts` 가
 *    두 로케일의 숫자를 순서까지 비교한다.
 * 2. **원화는 원화로 둔다.** 달러 환산이나 환율 괄호를 붙이지 않는다 —
 *    환율은 이 문서가 정할 일이 아니고, 낡은 환산이 붙은 투자자 자료는
 *    아예 없는 것만 못하다.
 * 3. **키 순서를 `ko/ir.ts` 와 똑같이 맞춘다.** 위 테스트는 객체를
 *    재귀 순회해 숫자를 뽑으므로 순서가 곧 `Object.values` 순서다.
 *    키를 재배열하면 카피가 옳아도 테스트가 깨진다.
 *
 * 정부 지원사업 이름은 일반명사로 뭉개지 않는다 — 해외 투자자가 실사에서
 * 그 이름으로 찾을 수 있어야 한다. TIPS·LIPS 는 이미 라틴 문자 고유명사라
 * 그대로 두고, 공식 영문 명칭을 확인하지 못한 사업은 로마자 표기를 쓰고
 * 무엇인지는 `note` 로 푼다. 없는 영어 이름을 지어내지 않는다.
 */
export const ir: IrContent = {
  shell: {
    // 한국어 사전에서도 영어인 문자열이다. 그대로 둔다.
    eyebrow: "Investor Overview",
    backToSite: "Back to site",
    requestIr: "Request IR",
    homeLink: "Site home",
    // 섹션 앵커 라벨 5개도 한국어 사전에서 이미 영어다. 그대로 둔다.
    nav: [
      { href: "#problem", label: "Problem" },
      { href: "#market", label: "Market" },
      { href: "#solution", label: "Solution" },
      { href: "#economics", label: "Economics" },
      { href: "#cta", label: "Contact" },
    ],
    // nav 의 aria-label. "목차" 를 그대로 옮긴 "Table of contents" 보다
    // 스크린리더가 읽는 자리에서는 "Sections" 이 짧고 정확하다.
    navLabel: "Sections",
  },
  hero: {
    badge: "Investor Overview",
    title: "Teams with no marketer\nare carrying growth alone.",
    description:
      "WooriTeam is the first team for founders of 1–10-person startups. You grow with us through propose → approve → execute → repeat.",
    note:
      "A summary written for investors. Grant programs, timelines, and metrics are marked as planned, under review, target, or internal estimate.",
    workflow: [
      {
        title: "Propose",
        body: "Lays out this week's growth tasks.",
      },
      {
        title: "Approve",
        body: "You read it and set the direction.",
      },
      {
        title: "Execute",
        body: "What you approved moves into real execution.",
      },
      {
        title: "Grow",
        body: "Results shape the next proposal, and the loop keeps going.",
      },
    ],
    workflowCaption: "Growing together",
    signals: [
      {
        // 공식 영문 명칭을 확인하지 못해 로마자 표기를 쓴다. 없는 영어
        // 이름을 지어내면 해외 투자자가 실사에서 찾지 못한다.
        label: "Modu-ui Changeop",
        value: "Applying",
        note: "Korean national startup program, application in progress",
        tone: "planned",
      },
      {
        label: "TIPS and LIPS",
        value: "Aiming to apply",
        note: "Planned for a later stage",
        tone: "under_review",
      },
    ],
  },
  executionGap: {
    title: "The core problem: the marketer gap",
    description:
      "Generative tools keep multiplying, but what to do this week — and how to keep it going — is still on the founder alone.",
    paragraphs: [
      "Before they hire a marketer, teams of 1–10 draft with ChatGPT and design tools. “So what do we do this week?” still comes back to the founder.",
      "A chat tool hands back output and leaves the propose, approve, execute, repeat loop where it was. WooriTeam fills that loop with a first teammate.",
    ],
    points: [
      {
        title: "Decision overload",
        body: "Drafts arrive; priorities and an execution queue do not.",
      },
      {
        title: "The gap before hiring",
        body: "A marketer on payroll is early, and an agency costs you in context you have to re-explain.",
      },
      {
        title: "Execution stalls",
        body: "After the draft, no one carries it forward.",
      },
    ],
    chart: [
      {
        segment: "manual",
        label: "Work carried alone",
        value: 85,
      },
      {
        segment: "strategic",
        label: "Strategy and decisions",
        value: 15,
      },
    ],
    chartCaption: "Assumes operating time stays locked in manual work",
    chartFootnote:
      "Generation tools on their own do not buy back strategy time. What matters is automating what comes after generation — uploading, publishing, reporting — so founders get those hours back.",
  },
  market: {
    title: "Not a personal inconvenience — a structural gap in early teams.",
    description:
      "We start at the first bottleneck an early founding team hits when no one owns marketing.",
    note:
      "Market scope and target size are estimated ranges, based on public reports and our own definition of the target.",
    funnel: [
      {
        stage: "TAM",
        // 원화 그대로 둔다. 달러 환산을 붙이지 않는 이유는 파일 상단 주석 2번.
        value: "KRW 55–80 trillion",
        description: "Global market for marketing automation and AI content",
        note: "Internal estimate",
        tone: "estimate",
      },
      {
        stage: "SAM",
        value: "Teams with no marketer",
        description:
          "Small and early-stage teams worldwide that have no one dedicated to marketing",
        note: "Estimated paid-conversion base",
        tone: "estimate",
      },
      {
        stage: "SOM",
        value: "Korean teams of 1–10",
        description: "Founders of early-stage Korean teams with no marketer",
        note: "First target segment",
        tone: "planned",
      },
    ],
    segmentBody:
      "Our entry market is early sellers with no marketing staff, handling their own uploads and day-to-day operations.",
    lockIn: {
      title: "Lock-in comes from the growth loop, not the number of generations.",
      body:
        "Once a dashboard is running propose, approve, execute, repeat, return visits and operating habits accumulate in a way one-off generation tools never build.",
    },
  },
  solution: {
    title: "A team, not a tool",
    description:
      "Not a tool that turns out text and images — a structure that carries growing together from propose → approve → execute → repeat.",
    pipeline: [
      {
        title: "Context in",
        body: "A short read on your product, your channels, and this week's goal.",
      },
      {
        title: "Propose",
        body: "Lays out what to do this week.",
      },
      {
        title: "Approve",
        body: "You read it and set the direction.",
      },
      {
        title: "Execute",
        body: "What you approved moves into real execution.",
      },
      {
        title: "Repeat",
        body: "Results shape the next proposal, and the loop keeps going.",
      },
    ],
    pillars: [
      {
        title: "A weekly loop by design",
        body: "You stay on direction; your teammate takes on propose, approve, execute, and repeat.",
      },
      {
        title: "Growth one role at a time",
        body: "Start with growing together, then add the CEO and CFO roles as they are needed.",
      },
      {
        title: "Integrations we don't oversell",
        body: "Things like publishing straight to your channels are marked as in progress, keeping what works today separate from the roadmap.",
      },
    ],
  },
  advantage: {
    title: "Existing tools stop at the draft. WooriTeam carries it through the next round of growth.",
    description:
      "The investment case is not more features — it is filling the execution gap chat tools leave behind, with a team.",
    chart: [
      {
        subject: "Weekly proposals",
        wooriteam: 90,
        aiTool: 35,
        designTool: 15,
      },
      {
        subject: "Approval and decisions",
        wooriteam: 85,
        aiTool: 85,
        designTool: 70,
      },
      {
        subject: "Follow-through",
        wooriteam: 90,
        aiTool: 25,
        designTool: 15,
      },
      {
        subject: "Fit for early teams",
        wooriteam: 90,
        aiTool: 55,
        designTool: 40,
      },
      {
        subject: "Feeding the next week",
        wooriteam: 88,
        aiTool: 25,
        designTool: 10,
      },
    ],
    chartLegend: {
      wooriteam: "WooriTeam",
      aiTool: "Single AI tool",
      designTool: "Design template tool",
    },
    chartNote:
      "Qualitative scores, meant for relative comparison across capability areas. What matters is not generation itself but how much of the operating gap after generation is closed.",
    points: [
      {
        title: "Closes the gap after the proposal",
        body: "You no longer take delivery of the output and then work out the priorities on your own.",
      },
      {
        title: "Approve, execute, repeat",
        body: "It does not stop at the proposal; it carries through approval, execution, and the next round of growth.",
      },
      {
        title: "A team anyone can understand",
        body: "A first teammate, rather than a chain of tools, lowers the barrier to getting started.",
      },
    ],
  },
  economics: {
    title: "Trading execution hours for a growth loop",
    description:
      "The largest cost is not inference spend — it is the founder's own decision and execution time. WooriTeam is built to move those hours into a propose, approve, execute, repeat flow.",
    metrics: [
      {
        label: "Target: time saved",
        value: "Scenario",
        note: "An internal target scenario for cutting weekly planning and draft cycles (not a proven result)",
        tone: "goal",
      },
      {
        label: "Operating motion",
        value: "Repeat",
        note: "An operating structure built around propose, approve, execute, repeat",
        tone: "planned",
      },
      {
        label: "First role",
        value: "Grow together",
        note: "Starting with growing together, then adding roles once it is proven",
        tone: "planned",
      },
    ],
  },
  vision: {
    title: "An 18-month operating scenario",
    description:
      "An internal target scenario that assumes validation with early Korean teams, then expansion into further roles.",
    trajectory: [
      { month: "M1", subscribers: 50, mrr: 2.5 },
      { month: "M3", subscribers: 200, mrr: 10 },
      { month: "M6", subscribers: 500, mrr: 25 },
      { month: "M9", subscribers: 1000, mrr: 50 },
      { month: "M12", subscribers: 1800, mrr: 90 },
      { month: "M15", subscribers: 2500, mrr: 125 },
      { month: "M18", subscribers: 3000, mrr: 150 },
    ],
    // 범례·툴팁의 계열 이름. 한국어 `"유료 구독자 수"` 의 `수` 는 계열
    // 이름을 명사로 닫는 말이라 영어에는 대응어가 없다 — 복수형이 그 일을
    // 한다.
    chartLegend: {
      subscribers: "Paid subscribers",
      mrr: "MRR",
    },
    /**
     * 차트가 로드되기 전 대체 목록은 `label + 값 + unit` 으로 한 줄을
     * 만든다. 한국어는 `"유료 구독자 " + 1,000 + "명"` 처럼 단위가 뒤에
     * 붙지만 영어는 붙일 단위어가 없다 — `subscriberUnit` 이 빈 문자열인
     * 것은 누락이 아니라 "Paid subscribers 1,000" 이 완성된 줄이기
     * 때문이다. MRR 은 원화를 유지해 `"MRR " + 2.5 + "M KRW"` 가 된다.
     */
    trajectoryFallback: {
      subscriberLabel: "Paid subscribers ",
      subscriberUnit: "",
      mrrLabel: "MRR ",
      mrrUnit: "M KRW",
    },
    roadmap: [
      {
        phase: "Phase 1",
        title: "Proving growing together",
        body: "Validating the propose → approve → execute → repeat loop with early teams of 1–10",
        statusLabel: "Planned",
        tone: "planned",
      },
      {
        phase: "Phase 2",
        title: "A sharper growth loop",
        body: "Tuning the core loop so founders can settle the week quickly",
        statusLabel: "Planned",
        tone: "planned",
      },
      {
        phase: "Phase 3",
        title: "More roles, investment under review",
        body: "Weighing CEO and CFO roles alongside private investment and partnerships",
        statusLabel: "Under review",
        tone: "under_review",
      },
    ],
    statuses: [
      {
        label: "Modu-ui Changeop",
        value: "Applying",
        note: "Korean national startup program, application in progress",
        tone: "planned",
      },
      {
        label: "TIPS and LIPS",
        value: "Aiming to apply",
        note: "Planned for a later stage",
        tone: "under_review",
      },
    ],
  },
  cta: {
    title: "We're open to IR requests and meetings.",
    description:
      "For investment, partnership, or press enquiries, reach us by email or through the contact page, and we'll come back with what we can share.",
    primaryLabel: "Request the IR deck",
    secondaryLabel: "Contact or request a meeting",
    emailSubject: "[WooriTeam] IR deck request",
    disclosure:
      "The grant programs, timelines, and target metrics on this page are not confirmed disclosures. They are an investor summary, marked as planned, under review, target, or internal estimate.",
  },
};
