export const mockups = {
  proposal: {
    appLabel: "우리팀 · AI 운영팀",
    weekLabel: "12월 1주차",
    heading: "이번 주 홍보 업무 4건",
    approveHint: "승인까지 약 10분",
    items: [
      { title: "연말 꽃다발 인스타그램 게시물", meta: "인스타그램 · 콘텐츠", state: "제안" },
      { title: "네이버 플레이스 소식 업데이트", meta: "네이버 · 검색 노출", state: "제안" },
      { title: "동네 홍보 글 올리기", meta: "당근 · 지역 홍보", state: "제안" },
      { title: "단골 고객 재방문 안내", meta: "카카오톡 · 재방문", state: "제안" },
    ],
    approve: "전체 승인",
    review: "하나씩 보기",
  },
  chat: {
    appLabel: "우리팀 · AI 운영팀",
    fields: [
      { label: "매장", value: "고양 꽃집" },
      { label: "상품", value: "연말 꽃다발" },
      { label: "가격", value: "35,000원" },
      { label: "분위기", value: "따뜻함" },
    ],
    // fromUser: 사용자 발화 여부. 문자열 리터럴 유니언("agent" | "user")이
    // 아니라 boolean 인 이유는 원래 DeepWiden 때문이었다 — 배열 분기가
    // 튜플을 `DeepWiden<U>[]` 로 되돌리면서 원소 유니언에 naked type
    // parameter 가 분배됐고, 그 과정에서 문자열 리터럴 판별자가 plain
    // string 으로 뭉개졌다("aggent" 같은 오타도 통과).
    //
    // 그 배열 분기는 제거됐다(src/content/widen.ts 참고). 이제 DeepWiden 은
    // 튜플을 원소별로 매핑하므로 유니언 분배 자체가 일어나지 않고, 문자열
    // 리터럴 판별자를 써도 안전하다. boolean 을 유지하는 것은 렌더 코드가
    // 이미 이 모양에 맞춰져 있고 바꿀 이유가 없어서일 뿐, 타입 제약 때문이
    // 아니다.
    messages: [
      {
        fromUser: false,
        text: "사장님, 이번 주 홍보 업무를 준비했어요. 연말 모임이 많은 시기라 선물용 꽃다발을 앞세우면 좋겠습니다.",
      },
      {
        fromUser: false,
        text: "대상: 연말 선물을 고르는 동네 손님\n핵심 메시지: 마음을 전하는 연말 꽃다발\n채널: 인스타그램 게시물 1편 · 당근 동네 글 1편",
      },
      { fromUser: true, text: "좋아요, 이대로 올려주세요." },
      { fromUser: false, text: "승인 감사합니다. 게시하고 결과를 기록해 둘게요." },
    ],
  },
  dashboard: {
    appLabel: "우리팀 · 사장님 대시보드",
    heading: "오늘의 가게",
    stats: [
      { label: "승인 필요", value: "2", unit: "건", highlight: true },
      { label: "오늘 예정", value: "3", unit: "건", highlight: false },
      { label: "완료 업무", value: "4", unit: "건", highlight: false },
      { label: "직접 확인 필요", value: "1", unit: "건", highlight: true },
    ],
    items: [
      { title: "연말 꽃다발 인스타그램 게시물", status: "사장님 승인 필요" },
      { title: "네이버 플레이스 소식", status: "직접 게시 대기" },
      { title: "단골 고객 재방문 안내", status: "발송 예정" },
    ],
    nextLabel: "다음 할 일",
    next: "승인해 주시면 채널별 문구를 확정해 게시하고 결과를 기록합니다.",
    disclaimer: "* 화면은 대시보드 구성을 설명하기 위한 예시입니다.",
  },
} as const;

export type MockupsCopy = typeof mockups;
