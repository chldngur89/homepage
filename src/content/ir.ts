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
  autocmo: number;
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
  title: string;
  tone: IrStatusTone;
};

export type IrContent = {
  advantage: {
    chart: IrRadarPoint[];
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
  };
  market: {
    description: string;
    funnel: IrFunnelLevel[];
    lockIn: {
      body: string;
      title: string;
    };
    note: string;
    title: string;
  };
  solution: {
    description: string;
    pillars: IrPillar[];
    pipeline: IrPipelineStep[];
    title: string;
  };
  vision: {
    description: string;
    roadmap: IrRoadmapItem[];
    statuses: IrStatusItem[];
    title: string;
    trajectory: IrVisionPoint[];
  };
};

export const irContent: IrContent = {
  hero: {
    badge: "Investor Overview",
    title: "사장은 누구나 되지만,\n누구나 잘 팔 수는 없습니다.",
    description:
      "Marketing OS 앱 AutoCMO는 1인 판매자가 직접 겪는 Execution Gap에서 출발했습니다. 카피·이미지·숏폼 생성에서 다채널 업로드, 운영 리포트 승인까지를 하나의 흐름으로 연결합니다.",
    note:
      "투자자 공유용 핵심 요약입니다. 지원사업·일정·지표는 예정, 검토, 목표, 내부 추정 기준으로 표기했습니다.",
    workflow: [
      {
        title: "Input",
        body: "상품 이미지와 브랜드 맥락을 입력받습니다.",
      },
      {
        title: "Generate",
        body: "카피, 이미지, 숏폼 초안을 자동 생성합니다.",
      },
      {
        title: "Deploy",
        body: "정책 점검 후 다채널 업로드와 리포트를 연결합니다.",
      },
    ],
    signals: [
      {
        label: "예비창업패키지",
        value: "지원중",
        note: "초기 실증 자금 검토",
        tone: "planned",
      },
      {
        label: "청년창업사관학교",
        value: "지원중",
        note: "운영 고도화 자금 검토",
        tone: "planned",
      },
      {
        label: "TIPS",
        value: "검토 중",
        note: "민간 투자 연계 후 검토",
        tone: "under_review",
      },
      {
        label: "민간 파트너",
        value: "검토 중",
        note: "유통·콘텐츠 파트너십 검토",
        tone: "under_review",
      },
    ],
  },
  executionGap: {
    title: "문제의 본질: Execution Gap",
    description:
      "생성형 AI 툴은 늘었지만 실제 판매 운영은 여전히 사람이 붙잡고 있습니다.",
    paragraphs: [
      "좋은 제품을 소싱해도 수많은 마켓에 업로드하고 채널별 규격을 맞추다 보면 하루가 끝납니다. 특히 초기 창업가와 1인 셀러에게 가장 큰 병목은 아이디어 부족이 아니라 반복 실행 노동입니다.",
      "ChatGPT나 Canva 같은 툴은 결과물을 만들어 주지만, 결국 각 채널에 맞춰 업로드하고 운영 상태를 확인하는 일은 사용자의 몫으로 남습니다. Marketing OS는 이 생성과 실행 사이의 단절을 줄이는 데 초점을 둡니다.",
    ],
    points: [
      {
        title: "시간 고갈",
        body: "수동 등록과 규격 보정에 하루 2시간 이상이 반복적으로 소요됩니다.",
      },
      {
        title: "기술·인력 부재",
        body: "이미지, 영상, 운영 자동화를 외주에 기대기 어렵고 고정비 부담이 큽니다.",
      },
      {
        title: "파편화된 결정",
        body: "성과 데이터가 흩어져 있어 운영 판단이 감에 의존하기 쉽습니다.",
      },
    ],
    chart: [
      {
        segment: "manual",
        label: "수동 등록·운영",
        value: 90,
      },
      {
        segment: "strategic",
        label: "전략·분석",
        value: 10,
      },
    ],
  },
  market: {
    title: "이것은 개인의 불편이 아니라 구조적인 시장 문제입니다.",
    description:
      "글로벌 자동화 시장부터 국내 초기 셀러까지, Marketing OS는 다채널 운영 병목이 가장 큰 세그먼트부터 공략합니다.",
    note:
      "시장 범위와 타깃 규모는 공개 리포트와 내부 타깃 정의를 바탕으로 한 추정 범위입니다.",
    funnel: [
      {
        stage: "TAM",
        value: "55~80조 원",
        description: "글로벌 마케팅 자동화 및 AI 콘텐츠 생성 시장",
        note: "내부 추정",
        tone: "estimate",
      },
      {
        stage: "SAM",
        value: "150만~300만 곳",
        description: "다채널 운영이 필요하지만 마케팅 전담 인력이 부족한 글로벌 소형 셀러",
        note: "유료 전환 가능군 기준 추정",
        tone: "estimate",
      },
      {
        stage: "SOM",
        value: "국내 초기 타깃",
        description: "스마트스토어, 쿠팡, SNS 업로드가 급한 국내 초기 창업가와 1인 판매자",
        note: "우선 공략 세그먼트",
        tone: "planned",
      },
    ],
    lockIn: {
      title: "락인 포인트는 생성 툴이 아니라 운영 화면입니다.",
      body:
        "판매 통계, 다음 액션 추천, 승인 흐름을 반복 사용하는 대시보드 중심 구조로 설계하면 일회성 생성 툴보다 더 강한 재방문과 운영 락인을 기대할 수 있습니다.",
    },
  },
  solution: {
    title: "도구가 아닌 팀, Marketing OS",
    description:
      "단순히 텍스트나 이미지를 생성하는 툴이 아니라, 기획부터 배포와 운영 보고까지 CMO 역할의 흐름을 시스템으로 대체하는 구조입니다.",
    pipeline: [
      {
        title: "상품·브랜드 입력",
        body: "이미지 한 장과 핵심 맥락으로 시작합니다.",
      },
      {
        title: "카피·이미지·숏폼 초안",
        body: "콘텐츠 생성을 한 파이프라인으로 묶습니다.",
      },
      {
        title: "정책·품질 체크",
        body: "업로드 전 게이트를 통해 위험을 줄입니다.",
      },
      {
        title: "다채널 업로드",
        body: "스마트스토어, 쿠팡, SNS 등 운영 채널에 맞춰 연결합니다.",
      },
      {
        title: "대시보드 보고",
        body: "성과와 다음 액션을 승인 중심 화면으로 환류합니다.",
      },
    ],
    pillars: [
      {
        title: "하이브리드 커넥터 엔진",
        body: "공식 오픈 API와 Playwright 기반 자동화를 병행해 실제 업로드까지 닿는 실행력을 확보하는 방향으로 설계합니다.",
      },
      {
        title: "A2A 파이프라인",
        body: "카피, 이미지, 숏폼 생성을 끊어진 작업이 아니라 하나의 운영 흐름으로 묶어 짧은 시간 안에 초안을 완성하는 구조를 지향합니다.",
      },
      {
        title: "승인 중심 UX",
        body: "대표자는 대시보드에서 검토와 승인에 집중하고, 저작권·정책·품질 통제는 중간 게이트에서 관리하는 구조입니다.",
      },
    ],
  },
  advantage: {
    title: "기존 도구는 생성까지만, Marketing OS는 실행까지 다룹니다.",
    description:
      "투자 포인트는 더 많은 AI 기능이 아니라 생성 이후 공백을 운영 시스템으로 채운다는 점입니다.",
    chart: [
      {
        subject: "다채널 실행력",
        autocmo: 95,
        aiTool: 20,
        designTool: 10,
      },
      {
        subject: "콘텐츠 생성력",
        autocmo: 90,
        aiTool: 85,
        designTool: 70,
      },
      {
        subject: "데이터 통합",
        autocmo: 95,
        aiTool: 30,
        designTool: 10,
      },
      {
        subject: "초보자 사용성",
        autocmo: 90,
        aiTool: 60,
        designTool: 40,
      },
      {
        subject: "운영 비용 절감",
        autocmo: 95,
        aiTool: 70,
        designTool: 50,
      },
    ],
    points: [
      {
        title: "생성 후 업로드 공백 제거",
        body: "결과물을 만들어 놓고 사람이 다시 채널별 등록을 반복하는 구조를 줄입니다.",
      },
      {
        title: "운영 데이터를 다시 전략으로 환류",
        body: "대시보드가 단순 리포트가 아니라 다음 액션을 승인하는 운영 허브가 되도록 설계합니다.",
      },
      {
        title: "비전문가도 승인 중심으로 사용",
        body: "복잡한 툴 체인 대신 승인과 검토 중심의 인터페이스로 초기 창업가의 사용 장벽을 낮춥니다.",
      },
    ],
  },
  economics: {
    title: "낮아지는 실행 비용, 높아지는 운영 레버리지",
    description:
      "가장 큰 비용은 AI 호출비보다 사람이 붙잡고 있는 운영 시간입니다. Marketing OS는 시간을 API, 자동화, 승인 흐름으로 치환하는 구조를 지향합니다.",
    metrics: [
      {
        label: "시간 절감 목표",
        value: "95%",
        note: "수작업 120분을 6분 이내로 줄이는 시나리오 기반 목표",
        tone: "goal",
      },
      {
        label: "건당 생성 원가",
        value: "500원대",
        note: "직접 연동 기준 내부 추정",
        tone: "estimate",
      },
      {
        label: "운영 액션",
        value: "승인 1회",
        note: "Human-in-the-loop 중심 운영 구조",
        tone: "planned",
      },
    ],
  },
  vision: {
    title: "18개월 운영 시나리오",
    description:
      "국내 초기 셀러 실증 이후 글로벌 커넥터 확장까지를 가정한 내부 목표 시나리오입니다.",
    trajectory: [
      { month: "M1", subscribers: 50, mrr: 2.5 },
      { month: "M3", subscribers: 200, mrr: 10 },
      { month: "M6", subscribers: 500, mrr: 25 },
      { month: "M9", subscribers: 1000, mrr: 50 },
      { month: "M12", subscribers: 1800, mrr: 90 },
      { month: "M15", subscribers: 2500, mrr: 125 },
      { month: "M18", subscribers: 3000, mrr: 150 },
    ],
    roadmap: [
      {
        phase: "Phase 1",
        title: "국내 판매자 실증",
        body: "스마트스토어·쿠팡 중심 자동 업로드 정확도와 승인 UX를 검증하는 단계",
        tone: "planned",
      },
      {
        phase: "Phase 2",
        title: "운영 대시보드 고도화",
        body: "성과 보고, 다음 액션 제안, 승인 워크플로를 제품 핵심 루프로 정리하는 단계",
        tone: "planned",
      },
      {
        phase: "Phase 3",
        title: "글로벌 커넥터 및 투자 검토",
        body: "Amazon·Shopify 연동과 민간 투자·파트너십 가능성을 검토하는 단계",
        tone: "under_review",
      },
    ],
    statuses: [
      {
        label: "예비창업패키지",
        value: "지원중",
        note: "초기 자금 검토",
        tone: "planned",
      },
      {
        label: "청년창업사관학교",
        value: "지원중",
        note: "운영 고도화 검토",
        tone: "planned",
      },
      {
        label: "TIPS",
        value: "검토 중",
        note: "민간 연계 이후 검토",
        tone: "under_review",
      },
      {
        label: "민간 투자·파트너십",
        value: "검토 중",
        note: "제품 실증 후 검토",
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
    emailSubject: "[Auto C-Level AI] IR 자료 요청",
    disclosure:
      "본 페이지의 지원사업, 일정, 목표 지표는 확정 공시가 아니라 예정, 검토, 목표, 내부 추정 기준의 투자자 공유용 요약입니다.",
  },
};
