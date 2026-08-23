/**
 * 앱 페이지 카피. **한국어 전용이다** — `EN_ROUTES` 에 `/apps` 가 없어
 * 영문 경로가 아예 존재하지 않으므로 `en/apps.ts` 는 만들지 않는다
 * (`src/content/index.ts` 의 등록부 주석 참고).
 *
 * 값의 출처는 두 곳이다.
 *
 * 1. `src/content/site.json` 의 `appsPage` 객체 — **화면에 실제로 찍히던
 *    값**을 그대로 옮겼다. 전환 전 `Apps.tsx` 는 이 값을
 *    `siteContent.appsPage?.X ?? "리터럴"` 로 읽고 있었는데, `site.json` 이
 *    세 키를 모두 채우고 있었으므로 `??` 의 오른쪽은 한 번도 평가되지
 *    않았다. 그 죽은 리터럴 두 개가 `site.json` 과 어긋나 있었고
 *    (`badge`: "웹/앱 서비스", `description`: 제품명 두 개가 빠진 문장),
 *    옮길 때 **왼쪽(=site.json)** 을 택했다. 오른쪽을 택했다면 화면의
 *    글자가 바뀐다.
 * 2. 전환 전 `Apps.tsx` 에 하드코딩되어 있던 문자열 — 버튼 라벨, 카드
 *    배지, 안내 문단, ACnow 카드의 제목과 로고 대체 텍스트.
 *
 * 옛 키 → 새 키 대응은 다음과 같다.
 *
 * | site.json 의 appsPage | 여기 |
 * |---|---|
 * | badge | hero.eyebrow |
 * | title | hero.title |
 * | titleHighlight | (삭제 — 아래 참고) |
 * | description | hero.body |
 *
 * 옮기면서 생긴 차이는 셋뿐이다.
 *
 * 1. `titleHighlight` 를 버렸다. 전환 전 제목은
 *    `<span className="text-cyan-400">{titleHighlight}</span>, 필요한 역할까지`
 *    로 조립돼 "첫 팀원부터, 필요한 역할까지" 를 찍었고, `site.json` 에는
 *    같은 문장이 이미 `title` 로 통째 들어 있었다(코드포인트까지 일치).
 *    새 디자인은 제목 안에 색 강조 조각을 두지 않으므로(기술·회사소개
 *    전환에서 `text-cyan-400` 조각을 같은 이유로 걷어냈다) 조각을 이어
 *    붙일 이유가 없어졌고, 이미 존재하던 완성 문장 `title` 을 그대로
 *    쓴다. 화면에 찍히는 글자는 바뀌지 않는다.
 * 2. `list.label` 은 새 문자열이다. 전환 전 앱 목록에는 섹션 제목이 없고
 *    카드만 나열됐는데, 새 디자인은 섹션마다 `aria-labelledby` 가 가리킬
 *    heading 이 하나 필요하다(요금 01·홈 06 과 같은 경우). 계획서가 이
 *    섹션을 부르는 이름("앱 목록")을 그대로 썼다. 섹션의 주장이 아니라
 *    이름표다.
 * 3. `airconCall.title` 과 두 로고의 대체 텍스트는 새 문자열이 아니다.
 *    전환 전 `Apps.tsx` 의 `airconCallBrand` 상수에 있던 값 그대로다.
 *    이미지 경로만 코드에 남겼다 — 자산 경로는 카피가 아니다.
 *
 * 앱의 이름·설명·URL 은 여기 없다. 그것은 `src/content/apps.json` 의 목록
 * 데이터이고 페이지가 계속 그대로 읽는다.
 *
 * 영문 사전이 없어도 `as const` 는 유지한다 — `Dictionary` 타입이 이 파일의
 * 구조에서 흘러나온다.
 */
export const apps = {
  hero: {
    eyebrow: "팀 구성",
    title: "첫 팀원부터, 필요한 역할까지",
    body: "같이 성장하기가 첫 번째 팀원입니다. CEO Rader, CFO Tool 등 다른 역할은 필요할 때 이어서 붙일 수 있습니다.",
  },
  list: {
    label: "앱 목록",
    /** 카드마다 붙는 외부 링크 버튼의 문구. */
    cta: "바로 사용하기",
    /** CTO 로 참여한 프로젝트에만 붙는 배지. 어느 앱에 붙는지는 코드가 정한다. */
    ctoBadge: "CTO 활동",
    note: "모든 앱은 브라우저에서 바로 사용 가능합니다. 클릭 시 새 탭에서 열립니다.",
  },
  /** ACnow 카드만 앱 이름 대신 제휴사 표기를 쓰고 로고 두 개를 단다. */
  airconCall: {
    title: "리빙브릿지의 ACnow",
    companyMarkAlt: "리빙브릿지 로고",
    serviceMarkAlt: "ACnow 로고",
  },
} as const;

export type AppsCopy = typeof apps;
