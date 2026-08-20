/**
 * 문의 페이지 카피. 문구는 전환 이전 `Contact.tsx` 에 하드코딩되어 있던 것을
 * 그대로 옮긴 것이다 — 이 태스크는 디자인 언어만 바꾸고 페이지의 주장은
 * 건드리지 않는다.
 *
 * 옮기면서 새로 생긴 문자열은 `channels.label` 하나뿐이다. 원래 연락 수단
 * 카드 섹션에는 제목이 아예 없었고 카드의 h3 세 개만 있었는데, 섹션마다
 * `aria-labelledby` 가 가리키는 heading 이 하나 필요하므로(홈 06·솔루션 03·
 * 요금 01 과 같은 경우) 라벨을 h2 로 승격시켜 쓴다.
 *
 * **사전에 넣지 않은 것 — 전부 코드에 고정된 계약이다.**
 * - 폼 필드의 `name` 속성(`name`/`email`/`message`). Formspree 가 받는 키다.
 * - 링크 목적지(`/ir`, `/pricing`, `/solution`, `/technology`, `tel:` 번호).
 *   요금 페이지의 `PLAN_CTA_TO_CONTACT` 와 같은 이유로, 문구는 사전이 정하고
 *   목적지는 코드가 정한다 — 번역이 링크를 옮길 수 없게 한다.
 * - 소셜 서비스 이름(Twitter/LinkedIn/Facebook/Instagram). 고유명사라 번역
 *   대상이 아니다.
 * - `CONTACT_EMAIL`. 아래 참고.
 */

/**
 * 연락처 이메일. 전환 이전에는 `src/content/site.json` 의 `contactEmail` 이
 * 원본이었고, `Contact.tsx`·`IR.tsx` 가 그것을 읽으면서 각자 같은 주소를
 * 폴백 리터럴로 한 번 더 적고 있었으며, `ssg/seo.ts` 의 JSON-LD
 * `Organization.email` 은 아예 따로 하드코딩하고 있었다 — 한 사실이 네 군데에
 * 적혀 있었다는 뜻이다. 그 네 군데를 이 상수 하나로 모았다.
 *
 * **사전 객체 안이 아니라 그 옆의 상수인 것이 의도다.** 이메일 주소는 로케일에
 * 따라 달라지는 카피가 아니라 회사에 관한 사실이다. `contact` 안에 넣으면
 * `en/contact.ts` 가 같은 주소를 한 번 더 적어야 하고, 그 순간 번역자가 수신
 * 주소를 바꿀 수 있는 자리가 생긴다 — 폼 필드의 `name` 을 사전에 넣지 않는
 * 것과 같은 이유다.
 */
export const CONTACT_EMAIL = "chldngur89@gmail.com";

export const contact = {
  hero: {
    eyebrow: "문의하기",
    title: "언제든 연락주세요",
    body: "제품 문의, IR 미팅, 파트너십, 채용 등 무엇이든 환영합니다",
    /** 한 문장 안에 링크가 들어간다. 요금 페이지의 planBody* 와 같은 분할이다. */
    irNoteBefore: "투자·IR 요약은 ",
    irNoteLink: "IR 페이지",
    irNoteAfter: "에서 확인하실 수 있습니다.",
  },
  channels: {
    label: "연락 수단",
    emailTitle: "이메일",
    phoneTitle: "전화",
    phoneValue: "+82 10-7771-8296",
    officeTitle: "오피스",
    officeValue: "미정",
    note: "상세 연락처·오피스 주소는 문의 폼 제출 후 담당자가 안내해 드립니다.",
  },
  form: {
    label: "문의 남기기",
    nameLabel: "이름",
    namePlaceholder: "홍길동",
    emailLabel: "이메일",
    emailPlaceholder: "hong@example.com",
    messageLabel: "메시지",
    messagePlaceholder: "문의 내용을 적어주세요. (일반 문의, IR 미팅, 파트너십 등)",
    submit: "문의 보내기",
    privacyNote: "제출하시면 개인정보 처리방침에 동의하는 것으로 간주됩니다",
    /**
     * `handleSubmit` 이 `setSubmitError` 에 넣는 두 문구다. 전환 이전에는
     * 함수 안에 한국어 리터럴로 박혀 있어서 영문 화면에서도 한국어가 떴다.
     * 브리프 Step 2 가 "성공·실패 메시지" 를 사전으로 옮기라고 지정한 대상이
     * 이것이며, 문자열의 출처만 바뀌었을 뿐 상태·분기·전송 경로는 그대로다.
     */
    errorSend: "전송에 실패했습니다. 잠시 후 다시 시도해 주세요.",
    errorNetwork: "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
    /**
     * Formspree 가 없을 때 `handleSubmit` 이 여는 mailto 초안의 제목과 본문
     * 라벨이다. `errorSend`·`errorNetwork` 와 정확히 같은 결함이 여기에도
     * 있었다 — 함수 안에 한국어 리터럴로 박혀 있어서, `/en/contact` 방문자가
     * 영문 성공 카드를 읽은 직후 한국어 메일 초안을 받았다. 문자열이 JS 안에
     * 살기 때문에 산출 HTML 의 한글을 보는 `/en` 검사에는 잡히지 않는다.
     *
     * `subjectBefore`/`subjectAfter` 로 나눈 것은 이름의 위치가 언어마다
     * 다르기 때문이다(한국어는 "…님 문의" 로 뒤가 붙고 영어는 앞이 붙는다).
     * `hero.irNote*` 와 같은 분할이다.
     *
     * 라벨과 값을 잇는 형식(`라벨 값`, 줄바꿈 배치)은 사전이 아니라 코드가
     * 정한다 — 번역이 본문 구조를 바꿀 수 없게 한다.
     */
    mail: {
      subjectBefore: "[WooriTeam 문의] ",
      subjectAfter: "님 문의",
      nameLabel: "이름:",
      emailLabel: "이메일:",
      messageLabel: "메시지:",
    },
    success: {
      title: "문의가 전송되었습니다!",
      /** Formspree 가 설정된 환경 */
      bodySent: "빠른 시일 내에 담당자가 연락드리겠습니다.",
      /** Formspree 미설정 — mailto 로 떨어지는 환경의 안내 문구 */
      bodyMail: "메일 앱에서 전송 버튼을 눌러 주시면 문의가 접수됩니다.",
      thanks: "감사합니다.",
      recipient: "수신:",
    },
  },
  ir: {
    title: "IR 미팅 · 자료 요청",
    body: "투자자·파트너 IR 자료나 미팅이 필요하시면 문의해 주세요. 담당자가 안내드립니다.",
    primary: "IR 자료 요청하기",
    secondary: "온라인 미팅 예약하기",
  },
  chat: {
    title: "실시간 채팅 상담",
    body: "빠른 답변이 필요하신가요? 지금 바로 채팅으로 문의하세요",
    button: "채팅 시작하기",
    hours: "운영 시간: 평일 09:00 - 18:00 (KST)",
  },
  faq: {
    title: "자주 묻는 질문",
    /**
     * 목적지는 `Contact.tsx` 의 `FAQ_LINKS` 가 인덱스로 짝지어 정한다. 이
     * 배열은 `as const` 라 길이 4의 튜플이고, 원소가 빠지면 영어 사전이
     * 컴파일되지 않으므로 짝이 조용히 어긋나지 않는다.
     */
    items: [
      "무료 체험 기간은 얼마나 되나요?",
      "어떤 마켓플레이스를 지원하나요?",
      "기술 스택이 궁금해요",
      "환불 정책은 어떻게 되나요?",
    ],
    cta: "FAQ 전체 보기",
  },
  social: {
    title: "소셜 미디어",
    body: "최신 소식과 업데이트를 팔로우하세요",
  },
  office: {
    label: "오피스 위치",
    body: "확정 시 안내드립니다",
    status: "미정",
    note: "오피스 위치 확정 시 연락드리겠습니다",
  },
  response: {
    label: "평균 응답 시간",
    weekdayValue: "2시간",
    weekdayNote: "영업일 기준",
    weekendValue: "24시간",
    weekendNote: "주말/공휴일",
    body: "긴급한 문의는 전화로 연락주시면 더 빠르게 도와드릴 수 있습니다",
  },
} as const;

export type ContactCopy = typeof contact;
