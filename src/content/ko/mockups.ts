export const mockups = {
  proposal: {
    appLabel: "우리팀 · 이번 주 제안",
    weekLabel: "8월 3주차",
    heading: "이번 주 할 일 4건",
    approveHint: "승인까지 약 20분",
    items: [
      { title: "신상품 릴스 2편", meta: "인스타그램 · 콘텐츠", state: "제안" },
      { title: "상세페이지 CTA 변경", meta: "스마트스토어 · 전환", state: "제안" },
      { title: "지난주 광고 예산 재조정", meta: "광고 · 운영", state: "제안" },
      { title: "재구매 안내 문자", meta: "CRM · 리텐션", state: "제안" },
    ],
    approve: "전체 승인",
    review: "하나씩 보기",
  },
  chat: {
    appLabel: "우리팀 · 마케팅 어시스턴트",
    fields: [
      { label: "상품", value: "수박" },
      { label: "가격", value: "10,000원" },
      { label: "브랜드", value: "차가움" },
      { label: "컨셉", value: "시원함" },
    ],
    // fromUser: 사용자 발화 여부. 문자열 리터럴 유니언("agent" | "user")이
    // 아니라 boolean 인 이유는 DeepWiden 때문이다 — messages 처럼 원소마다
    // 모양이 다른 튜플을 DeepWiden 이 훑을 때, 배열 원소 유니언에 naked
    // type parameter 가 분배되면서 문자열 리터럴 판별자가 plain string 으로
    // 뭉개진다("aggent" 같은 오타도 통과). boolean 은 이 경로에서도
    // true/false 로만 넓혀지므로 판별자가 안전하게 유지된다.
    messages: [
      {
        fromUser: false,
        text: "이번 주 제안입니다. 여름 성수기라 신선함을 앞세운 릴스가 반응이 좋습니다.",
      },
      {
        fromUser: false,
        text: "타겟: 여름철 가족 단위 소비자\n핵심 메시지: 시원한 여름, 차가운 수박\n채널: 인스타그램 릴스 2편",
      },
      { fromUser: true, text: "이 방향으로 진행해주세요." },
      { fromUser: false, text: "영상 2편과 문구를 만들어 올리겠습니다." },
    ],
  },
  dashboard: {
    appLabel: "우리팀 · 주간 리포트",
    heading: "8월 3주차 결과",
    stats: [
      { label: "이번 주 콘텐츠", value: "4", unit: "건", highlight: false },
      { label: "광고 운영", value: "2", unit: "건", highlight: false },
      { label: "신규 유입", value: "+14%", unit: "", highlight: true },
      { label: "문의", value: "+3", unit: "", highlight: true },
    ],
    channels: [
      { name: "인스타그램", share: 46 },
      { name: "스마트스토어", share: 31 },
      { name: "검색", share: 23 },
    ],
    nextLabel: "다음 주 추천",
    next: "반응이 좋았던 상품 A를 중심으로 릴스 비중을 높여보세요.",
    disclaimer: "* 화면에 표시된 숫자는 설명을 위한 예시입니다.",
  },
} as const;

export type MockupsCopy = typeof mockups;
