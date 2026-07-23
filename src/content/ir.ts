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
    title: "전담 마케터 없는 팀이\n혼자 성장을 붙잡고 있습니다.",
    description:
      "WooriTeam은 1~10인 초기 창업 대표를 위한 첫 번째 팀입니다. 제안 → 승인 → 실행 → 반복 성장으로 우리팀과 같이 성장합니다.",
    note:
      "투자자 공유용 핵심 요약입니다. 지원사업·일정·지표는 예정, 검토, 목표, 내부 추정 기준으로 표기했습니다.",
    workflow: [
      {
        title: "Propose",
        body: "이번 주 성장 과제를 정리해 올립니다.",
      },
      {
        title: "Approve",
        body: "대표님이 확인하고 방향을 결정합니다.",
      },
      {
        title: "Execute",
        body: "결정된 일을 실행으로 이어 갑니다.",
      },
      {
        title: "Grow",
        body: "결과를 다음 제안에 반영해 반복 성장합니다.",
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
        note: "제품·채널 파트너십 검토",
        tone: "under_review",
      },
    ],
  },
  executionGap: {
    title: "문제의 본질: 마케터 공백",
    description:
      "생성형 툴은 늘었지만, 이번 주에 무엇을 할지·어떻게 이어갈지는 여전히 대표 혼자 붙잡고 있습니다.",
    paragraphs: [
      "1~10인 초기 팀은 전담 마케터를 두기 전에 ChatGPT·디자인 툴로 초안을 만듭니다. 그래도 ‘그래서 이번 주에 뭘 하지?’는 다시 대표의 몫입니다.",
      "대화형 도구는 결과물을 주지만, 제안·승인·실행·반복 성장의 루프는 남겨 둡니다. WooriTeam은 그 루프를 첫 번째 팀원으로 채웁니다.",
    ],
    points: [
      {
        title: "판단 과부하",
        body: "초안은 나오지만 우선순위와 실행 큐가 정리되지 않습니다.",
      },
      {
        title: "채용 전 공백",
        body: "전담 마케터 고정비는 이르고, 외주는 맥락 전달 비용이 큽니다.",
      },
      {
        title: "실행이 끊김",
        body: "초안 이후 실제로 이어가는 사람이 없습니다.",
      },
    ],
    chart: [
      {
        segment: "manual",
        label: "혼자 붙잡는 실행",
        value: 85,
      },
      {
        segment: "strategic",
        label: "전략·판단",
        value: 15,
      },
    ],
  },
  market: {
    title: "개인의 불편이 아니라, 초기 팀의 구조적 공백입니다.",
    description:
      "마케팅 전담 인력이 없는 초기 창업팀이 가장 먼저 부딪히는 병목부터 공략합니다.",
    note:
      "시장 범위와 타깃 규모는 공개 리포트와 내부 타깃 정의를 바탕으로 한 추정 범위입니다.",
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
        value: "전담 마케터 부재 팀",
        description: "마케팅 전담 인력이 부족한 글로벌 소형·초기 창업팀",
        note: "유료 전환 가능군 기준 추정",
        tone: "estimate",
      },
      {
        stage: "SOM",
        value: "국내 1~10인",
        description: "전담 마케터 없는 국내 초기 창업 대표",
        note: "우선 공략 세그먼트",
        tone: "planned",
      },
    ],
    lockIn: {
      title: "락인은 생성 횟수가 아니라 반복 성장 루프입니다.",
      body:
        "제안·승인·실행·반복 성장을 돌리는 대시보드가 남으면, 일회성 생성 툴보다 재방문과 운영 습관이 쌓이기 쉽습니다.",
    },
  },
  solution: {
    title: "도구가 아닌 팀, WooriTeam",
    description:
      "텍스트·이미지를 만드는 툴이 아니라, 같이 성장하기로 제안 → 승인 → 실행 → 반복 성장까지 이어지는 구조입니다.",
    pipeline: [
      {
        title: "맥락 입력",
        body: "제품·채널·이번 주 목표를 짧게 받습니다.",
      },
      {
        title: "제안",
        body: "이번 주 할 일을 정리해 올립니다.",
      },
      {
        title: "승인",
        body: "대표님이 확인하고 방향을 결정합니다.",
      },
      {
        title: "실행",
        body: "결정된 일을 실행으로 이어 갑니다.",
      },
      {
        title: "반복 성장",
        body: "결과를 다음 제안에 반영해 루프를 이어 갑니다.",
      },
    ],
    pillars: [
      {
        title: "주간 루프 UX",
        body: "대표는 방향에 집중하고, 팀원은 제안·승인·실행·반복 성장을 맡습니다.",
      },
      {
        title: "역할 단위 확장",
        body: "같이 성장하기를 시작으로 CEO·CFO 역할을 필요할 때 붙이는 방향을 지향합니다.",
      },
      {
        title: "과장하지 않는 연동",
        body: "채널 자동 게시 등은 준비·연결 중으로 표기하고, 현재 가능 범위와 로드맵을 분리합니다.",
      },
    ],
  },
  advantage: {
    title: "기존 도구는 초안까지, WooriTeam은 반복 성장까지.",
    description:
      "투자 포인트는 더 많은 기능이 아니라, 대화형 도구가 남기는 실행 공백을 팀으로 채운다는 점입니다.",
    chart: [
      {
        subject: "주간 과제 제안",
        autocmo: 90,
        aiTool: 35,
        designTool: 15,
      },
      {
        subject: "승인·결정",
        autocmo: 85,
        aiTool: 85,
        designTool: 70,
      },
      {
        subject: "실행 이어가기",
        autocmo: 90,
        aiTool: 25,
        designTool: 15,
      },
      {
        subject: "초기팀 사용성",
        autocmo: 90,
        aiTool: 55,
        designTool: 40,
      },
      {
        subject: "다음 주 환류",
        autocmo: 88,
        aiTool: 25,
        designTool: 10,
      },
    ],
    points: [
      {
        title: "제안 이후 공백을 줄임",
        body: "결과물을 받아 놓고 다시 혼자 우선순위를 짜는 구조를 줄입니다.",
      },
      {
        title: "승인·실행·반복 성장",
        body: "제안에서 멈추지 않고 승인·실행·반복 성장으로 연결합니다.",
      },
      {
        title: "비전문가도 팀으로 이해",
        body: "복잡한 툴 체인 대신 첫 번째 팀원 개념으로 진입 장벽을 낮춥니다.",
      },
    ],
  },
  economics: {
    title: "실행 시간을 반복 성장 루프로 치환",
    description:
      "가장 큰 비용은 호출비보다 대표가 붙잡는 판단·실행 시간입니다. WooriTeam은 그 시간을 제안·승인·실행·반복 성장 흐름으로 정리하는 구조를 지향합니다.",
    metrics: [
      {
        label: "시간 절감 목표",
        value: "시나리오",
        note: "주간 과제 정리·초안 반복을 줄이는 내부 목표 시나리오 (확정 성과 아님)",
        tone: "goal",
      },
      {
        label: "운영 액션",
        value: "반복 성장",
        note: "제안·승인·실행·반복 성장 중심 운영 구조",
        tone: "planned",
      },
      {
        label: "첫 역할",
        value: "같이 성장",
        note: "같이 성장하기부터 실증 후 역할 확장",
        tone: "planned",
      },
    ],
  },
  vision: {
    title: "18개월 운영 시나리오",
    description:
      "국내 초기 창업팀 실증 이후 역할 확장까지를 가정한 내부 목표 시나리오입니다.",
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
        title: "같이 성장하기 실증",
        body: "제안 → 승인 → 실행 → 반복 성장 루프를 1~10인 초기 팀과 검증하는 단계",
        tone: "planned",
      },
      {
        phase: "Phase 2",
        title: "성장 루프 고도화",
        body: "대표가 빠르게 이번 주를 정리할 수 있도록 핵심 루프를 다듬는 단계",
        tone: "planned",
      },
      {
        phase: "Phase 3",
        title: "역할 확장·투자 검토",
        body: "CEO·CFO 역할 연동과 민간 투자·파트너십 가능성을 검토하는 단계",
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
    emailSubject: "[WooriTeam] IR 자료 요청",
    disclosure:
      "본 페이지의 지원사업, 일정, 목표 지표는 확정 공시가 아니라 예정, 검토, 목표, 내부 추정 기준의 투자자 공유용 요약입니다.",
  },
};
