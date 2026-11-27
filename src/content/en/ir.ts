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
    eyebrow: "Investor Overview",
    backToSite: "Back to site",
    requestIr: "Request IR",
    homeLink: "Site home",
    nav: [
      { href: "#problem", label: "Problem" },
      { href: "#market", label: "Market" },
      { href: "#solution", label: "Solution" },
      { href: "#economics", label: "Economics" },
      { href: "#cta", label: "Contact" },
    ],
    navLabel: "Contents",
  },
  hero: {
    badge: "Investor Overview",
    title: "The owner decides,\nWooriTeam executes.",
    description:
      "WooriTeam is a subscription AI operations team that takes on the repetitive promotion and sales work of small business owners. It prepares work from store and product data, executes after the owner approves, and improves the next proposal from accumulated task history.",
    note:
      "A summary for investors. Programs, timelines and metrics are labelled as in progress, planned, target or internal estimate.",
    workflow: [
      { title: "Store info", body: "Set owner preferences and store and product details." },
      { title: "Task prep", body: "The AI prepares today's promotion tasks." },
      { title: "Owner approval", body: "The owner reviews and approves." },
      { title: "Execution", body: "Runs on channels and records results." },
    ],
    workflowCaption: "Task history improves the next proposal",
    signals: [
      {
        label: "Startup for All, cohort 2",
        value: "Round 1 finalist",
        note: "Preparing for the Round 2 evaluation",
        tone: "planned",
      },
      {
        label: "Patents",
        value: "2 filed",
        note: "AI marketing content and ad image generation",
        tone: "planned",
      },
      {
        label: "MVP",
        value: "In development",
        note: "Content prep, approval, task history",
        tone: "planned",
      },
    ],
  },
  executionGap: {
    title: "Problem: the owner runs the shop alone",
    description:
      "They're great at the craft, but promotion, finding customers and customer service are all on them. The more non-core work piles up, the harder it is to focus on the business.",
    paragraphs: [
      "Companies manage customers and sales in systems, with specialists splitting the work. A local shop owner sells, promotes and answers customers alone.",
      "Chat AI gives a draft, but deciding what to post where and when — and remembering what was done last time — is still on the owner. WooriTeam fills that operations gap with an AI operations team.",
    ],
    points: [
      { title: "Promotion and marketing", body: "Managing social, delivery apps and reviews, rewriting the same post every day." },
      { title: "Finding customers", body: "New customers are hard to find, and repeat visits live only in memory." },
      { title: "Service and follow-up", body: "Orders, questions and bookings tie the owner down all day." },
    ],
    chart: [
      { segment: "manual", label: "Non-core operations", value: 85 },
      { segment: "strategic", label: "Core work and decisions", value: 15 },
    ],
    chartCaption: "Illustrative comparison assuming operating time is tied up in non-core work",
    chartFootnote:
      "Generation tools alone don't give owners time back. The point is handing over the full flow — prep, approval, execution and records.",
  },
  market: {
    title: "Our first customers are in our own neighbourhood.",
    description:
      "Using local networks in Goyang, we meet flower, furniture and restaurant owners in person to validate, then expand to small businesses nationwide.",
    note:
      "Market ranges are estimates based on public reports and our internal target definitions.",
    funnel: [
      {
        stage: "TAM",
        value: "KRW 55–80 trillion",
        description: "Global marketing automation and AI content market",
        note: "Internal estimate",
        tone: "estimate",
      },
      {
        stage: "SAM",
        value: "Korean small businesses",
        description: "Korean small businesses doing promotion and sales without dedicated marketing staff",
        note: "Estimated convertible segment",
        tone: "estimate",
      },
      {
        stage: "SOM",
        value: "3 trades in Goyang",
        description: "Flower, furniture and restaurant owners in Goyang with products to sell and a need for new customers",
        note: "Initial focus segment",
        tone: "planned",
      },
    ],
    segmentBody:
      "In the field, the best first customers weren't regulars-driven shops but owners with products to sell who want new customers — like flower growers moving from wholesale into direct sales.",
    lockIn: {
      title: "Lock-in comes from accumulated task history, not generation count.",
      body:
        "The more store data and approval, edit and execution history builds up, the sharper the next proposal. It becomes an operating habit that's harder to replace than a one-off generator.",
    },
  },
  solution: {
    title: "WooriTeam, an AI operations team for small businesses",
    description:
      "Not a text or image generator, but an operations structure that starts from store data and runs through prep, approval, execution and accumulated history — backed by research and patents.",
    pipeline: [
      { title: "Store info", body: "Set owner preferences and store, product and menu details." },
      { title: "Task prep", body: "Prepares promotion plans and content from product info." },
      { title: "Owner approval", body: "The owner approves work that reflects the store." },
      { title: "Execution", body: "Runs on promotion channels and records results." },
      { title: "Learning", body: "Approval, edit and execution history feeds the next proposal." },
    ],
    pillars: [
      {
        title: "2 patents filed",
        body: "AI-based automatic generation of integrated marketing content; AI-based automatic ad image generation using graphic template recommendation.",
      },
      {
        title: "Enterprise systems experience",
        body: "About 10 years of enterprise CRM/ERP integration and automation, plus master's research on interoperability, applied to small business work.",
      },
      {
        title: "An honest roadmap",
        body: "Features in development (content prep, approval, history) are labelled separately from planned ones (local analysis, AEO/GEO, multi-channel, unified results).",
      },
    ],
  },
  advantage: {
    title: "Existing tools stop at drafts. WooriTeam runs the operations.",
    description:
      "The investment case isn't more generation features — it's handing the operations flow owners used to carry alone to a team.",
    chart: [
      { subject: "Proposes work first", wooriteam: 90, aiTool: 35, designTool: 15 },
      { subject: "Approval and decisions", wooriteam: 85, aiTool: 85, designTool: 70 },
      { subject: "Execution and records", wooriteam: 90, aiTool: 25, designTool: 15 },
      { subject: "Ease for owners", wooriteam: 90, aiTool: 45, designTool: 40 },
      { subject: "History-based improvement", wooriteam: 88, aiTool: 25, designTool: 10 },
    ],
    chartLegend: {
      wooriteam: "WooriTeam",
      aiTool: "Single AI tool",
      designTool: "Design template tool",
    },
    chartNote:
      "Qualitative scores to help compare by capability. The point is less the generation itself than how much of the post-generation operations gap is closed.",
    points: [
      { title: "No prompts needed", body: "Owners don't have to figure out what to ask — WooriTeam prepares the work first." },
      { title: "Approve, execute, record", body: "It doesn't stop at a draft; it carries through to approval, execution and results." },
      { title: "A team, no AI skills required", body: "The 'AI operations team' concept lowers the barrier compared with a complex tool chain." },
    ],
  },
  economics: {
    title: "A subscription that starts small and grows with you",
    description:
      "Try it lightly, hand over daily work, bring in experts when needed. We acquire customers through merchant associations → hands-on AI sessions → individual work assessments → use and validation.",
    metrics: [
      { label: "Starter", value: "₩29,000/mo", note: "Dashboard and alerts, promotion support 1x a week", tone: "planned" },
      { label: "Core", value: "₩299,000/mo", note: "Daily marketing and sales prep, approval and follow-up", tone: "planned" },
      { label: "Expansion", value: "By quote", note: "Expert matching · planned", tone: "under_review" },
    ],
  },
  vision: {
    title: "18-month operating scenario",
    description:
      "An internal target scenario assuming expansion from Goyang validation to small businesses nationwide.",
    trajectory: [
      { month: "M1", subscribers: 50, mrr: 2.5 },
      { month: "M3", subscribers: 200, mrr: 10 },
      { month: "M6", subscribers: 500, mrr: 25 },
      { month: "M9", subscribers: 1000, mrr: 50 },
      { month: "M12", subscribers: 1800, mrr: 90 },
      { month: "M15", subscribers: 2500, mrr: 125 },
      { month: "M18", subscribers: 3000, mrr: 150 },
    ],
    chartLegend: {
      subscribers: "Paid subscribers",
      mrr: "MRR",
    },
    trajectoryFallback: {
      subscriberLabel: "Paid subscribers ",
      subscriberUnit: "",
      mrrLabel: "MRR ",
      mrrUnit: "M KRW",
    },
    roadmap: [
      {
        phase: "Phase 1",
        title: "Interviews and field validation",
        body: "Meet owners through the Goyang Flower Association and merchant groups, and validate promotion work with real products",
        statusLabel: "In progress",
        tone: "planned",
      },
      {
        phase: "Phase 2",
        title: "Paid conversion",
        body: "Win paying customers on Starter and Core, tracking task completion and repeat hand-off as key metrics",
        statusLabel: "Planned",
        tone: "planned",
      },
      {
        phase: "Phase 3",
        title: "Advanced AI marketing ops",
        body: "Expand into local analysis, AEO/GEO, multi-channel ops, ad spend comparison and unified results, and explore investment and partnerships",
        statusLabel: "Under review",
        tone: "under_review",
      },
    ],
    statuses: [
      {
        label: "Startup for All, cohort 2",
        value: "Round 1 finalist",
        note: "Preparing for the Round 2 evaluation",
        tone: "planned",
      },
      {
        label: "TIPS and LIPS",
        value: "Hoping to apply",
        note: "Planned for a later stage",
        tone: "under_review",
      },
    ],
  },
  cta: {
    title: "We welcome IR material and meeting requests.",
    description:
      "For investment, partnership or media inquiries, email us or use the contact page and we'll reply with what we can share.",
    primaryLabel: "Request IR material",
    secondaryLabel: "Contact / book a meeting",
    emailSubject: "[WooriTeam] IR material request",
    disclosure:
      "Programs, timelines and target metrics on this page are not confirmed disclosures; they are an investor summary labelled as in progress, planned, target or internal estimate.",
  },
};
