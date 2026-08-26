/**
 * 헤더 내비게이션의 키 ↔ 경로 짝. `Layout.tsx` 가 헤더 메뉴를 그리는 데
 * 쓰고, `ssg/seo.ts` 가 `BreadcrumbList` 구조화 데이터의 라벨을 고르는 데
 * 같은 목록을 재사용한다.
 *
 * 두 자리가 각자 목록을 들고 있으면 헤더에는 없는 페이지가 빵부스러기에
 * 나오거나, 헤더에 새 메뉴가 생겼는데 빵부스러기가 못 따라가는 식으로
 * 조용히 어긋날 수 있다 — 그래서 이 파일 하나가 원본이다.
 */
export const NAV_PATHS = [
  ["solution", "/solution"],
  ["technology", "/technology"],
  ["pricing", "/pricing"],
  ["demo", "/demo"],
  ["apps", "/apps"],
  ["about", "/about"],
  ["ir", "/ir"],
  ["contact", "/contact"],
] as const;

export type NavKey = (typeof NAV_PATHS)[number][0];
