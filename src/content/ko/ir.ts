export type IrStatusTone = "estimate" | "goal" | "planned" | "under_review";

export type IrStatusItem = {
  label: string;
  note: string;
  tone: IrStatusTone;
  value: string;
};

export type IrWorkflowStep = {
  body: string;
  title: string;
};

export type IrPainPoint = {
  body: string;
  title: string;
};

export type IrChartSlice = {
  label: string;
  segment: "manual" | "strategic";
  value: number;
};

export type IrFunnelLevel = {
  description: string;
  note: string;
  stage: "TAM" | "SAM" | "SOM";
  tone: IrStatusTone;
  value: string;
};

export type IrPipelineStep = {
  body: string;
  title: string;
};

export type IrPillar = {
  body: string;
  title: string;
};

export type IrRadarPoint = {
  aiTool: number;
  wooriteam: number;
  designTool: number;
  subject: string;
};

export type IrComparisonPoint = {
  body: string;
  title: string;
};

export type IrMetric = {
  label: string;
  note: string;
  tone: IrStatusTone;
  value: string;
};

export type IrVisionPoint = {
  month: string;
  mrr: number;
  subscribers: number;
};

export type IrRoadmapItem = {
  body: string;
  phase: string;
  /** 배지에 찍히는 상태 문구. `tone` 에서 파생하지 않고 항목마다 명시한다. */
  statusLabel: string;
  title: string;
  tone: IrStatusTone;
};

/** 레이더 차트가 아직 로드되지 않았을 때 보여주는 대체 목록의 계열 이름표. */
export type IrAdvantageChartLegend = {
  aiTool: string;
  designTool: string;
  wooriteam: string;
};

/**
 * 라인 차트의 계열 이름표. 범례와 툴팁이 같이 쓴다.
 *
 * `IrVisionTrajectoryFallback` 과 나누어 두는 이유는 문구가 다르기 때문이다 —
 * 범례는 `"유료 구독자 수"`(계열 이름), 대체 목록은 `"유료 구독자 "` + 값 +
 * `"명"`(문장 조각)이다. 한쪽을 다른 쪽에 맞추면 화면 문구가 바뀐다.
 */
export type IrVisionChartLegend = {
  mrr: string;
  subscribers: string;
};

/**
 * 라인 차트의 값 이름표와 단위.
 *
 * 이름이 말하는 대로 차트가 아직 로드되지 않았을 때의 대체 목록이 쓰고,
 * **단위 두 개(`subscriberUnit`·`mrrUnit`)는 로드된 차트의 툴팁도 쓴다.**
 * 예전에는 툴팁이 `백만원`·`명` 을 컴포넌트에 직접 박아 두고 있었다 —
 * 차트가 동적 import 라 프리렌더 HTML 에 안 잡혀서, 영문 페이지에서만
 * 조용히 새던 자리다.
 */
export type IrVisionTrajectoryFallback = {
  mrrLabel: string;
  mrrUnit: string;
  subscriberLabel: string;
  subscriberUnit: string;
};

export type IrShellNavItem = {
  href: string;
  label: string;
};

export type IrContent = {
  advantage: {
    chart: IrRadarPoint[];
    chartLegend: IrAdvantageChartLegend;
    chartNote: string;
    description: string;
    points: IrComparisonPoint[];
    title: string;
  };
  cta: {
    description: string;
    disclosure: string;
    emailSubject: string;
    primaryLabel: string;
    secondaryLabel: string;
    title: string;
  };
  economics: {
    description: string;
    metrics: IrMetric[];
    title: string;
  };
  executionGap: {
    chart: IrChartSlice[];
    chartCaption: string;
    chartFootnote: string;
    description: string;
    paragraphs: string[];
    points: IrPainPoint[];
    title: string;
  };
  hero: {
    badge: string;
    description: string;
    note: string;
    signals: IrStatusItem[];
    title: string;
    workflow: IrWorkflowStep[];
    workflowCaption: string;
  };
  market: {
    description: string;
    funnel: IrFunnelLevel[];
    lockIn: {
      body: string;
      title: string;
    };
    note: string;
    segmentBody: string;
    title: string;
  };
  shell: {
    backToSite: string;
    eyebrow: string;
    homeLink: string;
    nav: IrShellNavItem[];
    navLabel: string;
    requestIr: string;
  };
  solution: {
    description: string;
    pillars: IrPillar[];
    pipeline: IrPipelineStep[];
    title: string;
  };
  vision: {
    chartLegend: IrVisionChartLegend;
    description: string;
    roadmap: IrRoadmapItem[];
    statuses: IrStatusItem[];
    title: string;
    trajectory: IrVisionPoint[];
    trajectoryFallback: IrVisionTrajectoryFallback;
  };
};

export const ir: IrContent = {
  shell: {
    eyebrow: "Investor Overview",
    backToSite: "사이트로",
    requestIr: "IR 요청",
    homeLink: "사이트 홈",
    nav: [
      { href: "#problem", label: "Problem" },
      { href: "#market", label: "Market" },
      { href: "#solution", label: "Solution" },
      { href: "#economics", label: "Economics" },
      { href: "#cta", label: "Contact" },
    ],
    navLabel: "목차",
  },
  hero: {
    badge: "Investor Overview",
    title: "사장님은 결정하고,\n우리팀은 실행합니다.",
    description:
      "WooriTeam은 소상공인의 반복적인 홍보·판매 업무를 맡아 주는 AI 운영팀 구독 서비스입니다. 매장·상품 정보로 업무를 준비하고, 사장님 승인 후 실행하며, 업무 이력을 쌓아 다음 제안을 개선합니다.",
    note:
      "투자자 공유용 핵심 요약입니다. 지원사업·일정·지표는 진행, 예정, 목표, 내부 추정 기준으로 구분해 표기했습니다.",
    workflow: [
      {
        title: "정보 등록",
        body: "사장님 성향과 매장·상품 정보를 설정합니다.",
      },
      {
        title: "업무 준비",
        body: "AI가 오늘 필요한 홍보 업무를 준비합니다.",
      },
      {
        title: "사장님 승인",
        body: "사장님이 확인하고 승인합니다.",
      },
      {
        title: "실행 관리",
        body: "채널에서 실행하고 결과를 기록합니다.",
      },
    ],
    workflowCaption: "업무 이력이 다음 제안을 개선합니다",
    signals: [
      {
        label: "모두의 창업 2기",
        value: "1라운드 진출",
        note: "2라운드 진출 평가 준비 중",
        tone: "planned",
      },
      {
        label: "특허",
        value: "2건 출원",
        note: "AI 마케팅 콘텐츠·광고 이미지 자동 생성",
        tone: "planned",
      },
      {
        label: "MVP",
        value: "개발 중",
        note: "콘텐츠 준비·승인·업무 이력 관리",
        tone: "planned",
      },
    ],
  },
  executionGap: {
    title: "문제: 가게 운영은 사장님 혼자 짊어집니다",
    description:
      "요리는 잘하지만, 홍보·손님 모으기·고객 응대까지 모두 사장님 몫입니다. 요리 외의 업무가 쌓일수록 본업에 집중하기 어려워집니다.",
    paragraphs: [
      "기업은 고객과 매출 정보를 시스템으로 관리하고 전문 인력이 업무를 나눕니다. 동네 가게는 사장님 혼자 상품을 팔고, 홍보하고, 고객 문의까지 챙깁니다.",
      "대화형 AI는 초안을 주지만, 무엇을 언제 어디에 올릴지·지난번에 무엇을 했는지는 다시 사장님이 챙겨야 합니다. WooriTeam은 그 운영 공백을 AI 운영팀으로 채웁니다.",
    ],
    points: [
      {
        title: "홍보 및 마케팅",
        body: "SNS·배달앱·리뷰를 직접 관리하고, 매일 같은 글을 다시 씁니다.",
      },
      {
        title: "손님 모으기",
        body: "신규 손님은 모으기 어렵고, 재방문은 사장님 기억에만 맡겨져 있습니다.",
      },
      {
        title: "고객 응대·후속 관리",
        body: "주문·문의·예약 응대가 영업시간 내내 사장님을 붙잡습니다.",
      },
    ],
    chart: [
      {
        segment: "manual",
        label: "본업 외 운영 업무",
        value: 85,
      },
      {
        segment: "strategic",
        label: "본업·판단",
        value: 15,
      },
    ],
    chartCaption: "운영 시간이 본업 외 업무에 묶인 상태를 가정한 비교",
    chartFootnote:
      "생성 도구만으로는 사장님의 시간이 늘어나지 않습니다. 핵심은 업무 준비·승인·실행·기록까지 이어지는 운영 흐름을 맡기는 것입니다.",
  },
  market: {
    title: "첫 고객은 우리 동네에 있습니다.",
    description:
      "고양시의 지역 네트워크를 바탕으로 화훼·가구·음식점 사장님을 직접 만나 실증하고, 국내 소상공인 시장으로 넓혀 갑니다.",
    note:
      "시장 범위는 공개 리포트와 내부 타깃 정의를 바탕으로 한 추정 범위입니다.",
    funnel: [
      {
        stage: "TAM",
        value: "55~80조 원",
        description: "글로벌 마케팅 자동화 및 AI 콘텐츠 관련 시장",
        note: "내부 추정",
        tone: "estimate",
      },
      {
        stage: "SAM",
        value: "국내 소상공인",
        description: "전담 마케팅 인력 없이 홍보·판매를 직접 하는 국내 소상공인",
        note: "유료 전환 가능군 기준 추정",
        tone: "estimate",
      },
      {
        stage: "SOM",
        value: "고양시 3개 업종",
        description: "판매할 상품이 있고 새 고객을 찾는 고양시 화훼·가구·음식점",
        note: "우선 공략 세그먼트",
        tone: "planned",
      },
    ],
    segmentBody:
      "현장에서 확인한 결과, 단골 중심 점포보다 생산·도매에서 직접 판매로 넓히려는 화훼 사업자처럼 판매할 상품이 있고 새 고객을 찾는 사장님이 첫 검증 고객입니다.",
    lockIn: {
      title: "락인은 생성 횟수가 아니라 쌓인 업무 이력입니다.",
      body:
        "매장 정보와 승인·수정·실행 이력이 쌓일수록 다음 제안이 정확해집니다. 일회성 생성 도구보다 오래 쓸수록 바꾸기 어려운 운영 습관이 됩니다.",
    },
  },
  solution: {
    title: "소상공인을 위한 AI 운영팀, WooriTeam",
    description:
      "텍스트·이미지를 만드는 도구가 아니라, 매장 정보에서 출발해 업무 준비·승인·실행·이력 축적까지 잇는 운영 구조입니다. 연구·특허 기반의 기술로 신뢰도를 확보합니다.",
    pipeline: [
      {
        title: "정보 등록",
        body: "사장님 성향과 매장·상품·메뉴 정보를 설정합니다.",
      },
      {
        title: "업무 준비",
        body: "상품 정보로 홍보 기획과 콘텐츠를 준비합니다.",
      },
      {
        title: "사장님 승인",
        body: "매장 정보를 반영한 업무를 사장님이 승인합니다.",
      },
      {
        title: "실행 관리",
        body: "홍보 채널에서 실행하고 결과를 기록합니다.",
      },
      {
        title: "이력 학습",
        body: "승인·수정·실행 이력을 다음 제안에 활용합니다.",
      },
    ],
    pillars: [
      {
        title: "특허 2건 출원",
        body: "AI 기반 통합 마케팅 콘텐츠 자동 생성 방법, AI 기반 그래픽 템플릿 추천을 이용한 광고용 이미지 자동 생성 방법.",
      },
      {
        title: "기업 시스템 경험",
        body: "대기업 CRM·ERP 통합과 업무 자동화 약 10년, 시스템 상호운용성 석사 연구를 소상공인 업무에 적용합니다.",
      },
      {
        title: "과장하지 않는 로드맵",
        body: "개발 중인 기능(콘텐츠 준비·승인·이력)과 고도화 예정 기능(상권 분석·AEO/GEO·다채널·성과 통합)을 분리해 표기합니다.",
      },
    ],
  },
  advantage: {
    title: "기존 도구는 초안까지, WooriTeam은 운영까지.",
    description:
      "투자 포인트는 더 많은 생성 기능이 아니라, 사장님이 혼자 챙기던 운영 흐름을 팀으로 맡긴다는 점입니다.",
    chart: [
      {
        subject: "업무 먼저 제안",
        wooriteam: 90,
        aiTool: 35,
        designTool: 15,
      },
      {
        subject: "승인·결정",
        wooriteam: 85,
        aiTool: 85,
        designTool: 70,
      },
      {
        subject: "실행·기록",
        wooriteam: 90,
        aiTool: 25,
        designTool: 15,
      },
      {
        subject: "사장님 사용성",
        wooriteam: 90,
        aiTool: 45,
        designTool: 40,
      },
      {
        subject: "이력 기반 개선",
        wooriteam: 88,
        aiTool: 25,
        designTool: 10,
      },
    ],
    chartLegend: {
      wooriteam: "WooriTeam",
      aiTool: "단일 AI 툴",
      designTool: "디자인 템플릿 툴",
    },
    chartNote:
      "기능 범주별 상대 비교를 돕기 위한 정성 점수입니다. 핵심은 생성 기능 자체보다 생성 이후 운영 공백을 어떻게 줄이는가에 있습니다.",
    points: [
      {
        title: "프롬프트가 필요 없음",
        body: "사장님이 무엇을 물어볼지 고민하지 않아도 우리팀이 먼저 업무를 준비합니다.",
      },
      {
        title: "승인·실행·기록",
        body: "초안에서 멈추지 않고 승인·실행·결과 기록으로 이어집니다.",
      },
      {
        title: "AI를 몰라도 쓰는 팀",
        body: "복잡한 도구 대신 'AI 운영팀' 개념으로 진입 장벽을 낮춥니다.",
      },
    ],
  },
  economics: {
    title: "작게 시작하고 필요한 만큼 맡기는 구독 모델",
    description:
      "작게 경험하고, 매일 맡기고, 필요할 때 전문가까지. 상인회·업종 협의회 접점 → AI 체험 교육 → 개별 업무 진단 → 사용·실증 순서로 고객을 확보합니다.",
    metrics: [
      {
        label: "입문형",
        value: "월 29,000원",
        note: "대시보드와 알림, 주 1회 홍보 업무 지원",
        tone: "planned",
      },
      {
        label: "주력형",
        value: "월 299,000원",
        note: "매일 마케팅·판매 업무 준비, 승인과 후속 관리",
        tone: "planned",
      },
      {
        label: "확장형",
        value: "별도 견적",
        note: "전문가 매칭 서비스 · 향후 도입 계획",
        tone: "under_review",
      },
    ],
  },
  vision: {
    title: "18개월 운영 시나리오",
    description:
      "고양시 실증 이후 국내 소상공인으로 확장하는 것을 가정한 내부 목표 시나리오입니다.",
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
      subscribers: "유료 구독자 수",
      mrr: "MRR",
    },
    trajectoryFallback: {
      subscriberLabel: "유료 구독자 ",
      subscriberUnit: "명",
      mrrLabel: "MRR ",
      mrrUnit: "백만원",
    },
    roadmap: [
      {
        phase: "Phase 1",
        title: "고객 인터뷰·현장 실증",
        body: "고양시 화훼연합회·상인회 접점으로 사장님을 만나고, 실제 상품으로 홍보 업무를 검증하는 단계",
        statusLabel: "진행 중",
        tone: "planned",
      },
      {
        phase: "Phase 2",
        title: "유료 전환",
        body: "입문형·주력형 구독으로 유료 고객을 확보하고, 업무 완료율·재위임률을 지표로 관리하는 단계",
        statusLabel: "예정",
        tone: "planned",
      },
      {
        phase: "Phase 3",
        title: "AI 마케팅 운영 고도화",
        body: "상권 분석·AEO/GEO·다채널 운영·광고비 비교·성과 통합으로 확장하고 투자·파트너십을 검토하는 단계",
        statusLabel: "검토",
        tone: "under_review",
      },
    ],
    statuses: [
      {
        label: "모두의 창업 2기",
        value: "1라운드 진출",
        note: "2라운드 진출 평가 준비 중",
        tone: "planned",
      },
      {
        label: "TIPS 및 LIPS",
        value: "희망",
        note: "추후 단계에서 지원 희망",
        tone: "under_review",
      },
    ],
  },
  cta: {
    title: "IR 자료와 미팅 요청을 받습니다.",
    description:
      "투자, 파트너십, 미디어 문의는 메일 또는 문의 페이지로 연결해 주시면 대응 범위를 정리해 회신드립니다.",
    primaryLabel: "IR 자료 요청하기",
    secondaryLabel: "문의·미팅 요청하기",
    emailSubject: "[WooriTeam] IR 자료 요청",
    disclosure:
      "본 페이지의 지원사업, 일정, 목표 지표는 확정 공시가 아니라 진행, 예정, 목표, 내부 추정 기준의 투자자 공유용 요약입니다.",
  },
};
