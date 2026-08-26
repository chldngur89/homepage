# 리디자인 계획 1 인수인계

브랜치: `redesign/foundation-layout-home` · 커밋 34개 · 2026-08-19

계획 1(기반·레이아웃·홈)이 끝났습니다. 이 문서는 계획 2를 시작할 때 필요한 것만 담습니다.
상세 근거는 git 히스토리와 아래 두 문서에 있습니다.

- 설계: [2026-08-15-homepage-redesign-design.md](specs/2026-08-15-homepage-redesign-design.md)
- 계획: [2026-08-15-redesign-01-foundation-layout-home.md](plans/2026-08-15-redesign-01-foundation-layout-home.md)

## ✅ 릴리스 게이트 — 해제됨

> 계획 2 완료(2026-08-20)로 갱신. `/en/solution`·`/en/pricing`·`/en/contact`
> 가 영문 본문을 갖게 되어 남은 경로가 6개에서 **3개로 줄었습니다.**

> 계획 3 완료(2026-08-24)로 갱신. `/en/technology`·`/en/about` 이 영문
> 본문을 갖게 되어(`<main>` 기준 한글 0자) 남은 경로가 3개에서
> **`/en/ir` 하나로 줄었습니다.**

> 계획 4 완료(2026-08-26)로 갱신. **게이트 해제 — 남은 경로 0개.**
> 태스크 6이 `/en/ir` 에 영문 본문을 채워(`<main>` 기준 한글 0자) 마지막
> 경로를 닫았고, 태스크 7이 `scripts/check-html.mjs` 의 `PAGES` 에 `/ir`·
> `/en/ir` 두 줄을 더해 검사 경로를 16개에서 **18개**로 넓혔습니다 — 그
> 전까지는 두 경로가 프리렌더는 되면서도 이 목록엔 없어, 검사가 있어도
> 정작 그 경로를 보지 못하는 상태였습니다. 아래는 무엇이 게이트였고
> 무엇이 그것을 닫았는지의 기록입니다.

**무엇이 게이트였는가.** 영문 1개 경로(`/en/ir`)가 **영어라고 선언하면서
한국어 본문을 냈습니다.** `<html lang="en">`, 영문 title·description,
`robots: index, follow`, `hreflang="en"`, sitemap `<loc>` 를 갖고 있었습니다.

크롤러에게 지키지 못할 약속을 하는 상태였고, `/en` 트리를 만든 이유인
해외 투자자가 정확히 그 경로로 들어왔습니다.

**계획 2가 이 노출을 수동에서 능동으로 바꿔 놓았습니다.** 전에는 방문자가
URL 을 직접 치거나 크롤러를 통해 들어와야 닿았습니다. `/en/contact` 가
영문 방문자를 **직접 몰아넣고 있었습니다** — 히어로의 "IR page" 링크
(`Contact.tsx:134`)와 IR 카드의 주 버튼(`:282`)이 `/en/ir` 로 갑니다.
`FAQ_LINKS[2]` 의 "What is the tech stack?" 이 `/en/technology` 로 보내던
동선은 계획 3에서 그 페이지가 영문 본문을 갖게 되며 해소됐고, 남았던
`/en/ir` 로 가는 두 링크는 계획 4가 그 페이지 자체를 채우며 함께
해소됐습니다.

측정한 한글 분량(`dist/`, 계획 2 완료 시점 기준 최초 측정):

| 경로 | `<main>` 본문 | 문서 전체 | 계획 3 완료 시점 | 계획 4 완료 시점 |
|---|---|---|---|---|
| `/en/technology` | 258자 | 273자 | 해소(`<main>` 한글 0자) | — |
| `/en/about` | 358자 | 373자 | 해소(`<main>` 한글 0자) | — |
| `/en/ir` | 1,927자 | 1,948자 | 그대로 — 계획 4 대상 | 해소(`<main>` 한글 0자, 태스크 6) |

**무엇이 닫았는가.** 계획 4 태스크 6이 `/en/ir` 에 영문 본문을 붙였고,
태스크 7이 `check-html.mjs` 의 `PAGES` 에 `/ir`·`/en/ir` 두 줄을 더해
프리렌더되는 18개 경로 전부가 이제 이 목록에 있게 만들었습니다(예전
"일부러 빠진 것 — `/en/ir`" 주석은 지웠습니다). 훼손 검사 — `dist/en/ir/index.html`
에 한국어 문장을 일부러 심었을 때 `node ./scripts/check-html.mjs` 가
exit 1 로 잡는 것을 확인했습니다(task-7-report.md 참고).

## 계획 1이 끝낸 것

| | |
|---|---|
| 디자인 토큰 | `theme.css` 한 곳 + Tailwind `@theme`. 대비 검사가 테스트로 고정됨 |
| 타입 검사 | 저장소에 아예 없던 것을 도입. 현재 전체 그린이며 빌드가 막음 |
| 다국어 | 한국어가 타입 원본. 번역 누락·배열 원소 누락이 컴파일 에러 |
| 라우팅 | `/` 11개 + `/en` 7개 = prerender 18개. 팩토리 하나에서 생성 |
| SEO/GEO | 로케일별 메타·hreflang·JSON-LD. 산출 HTML 을 빌드가 검증 |
| 이미지 | 교체 가능한 슬롯 4개. 미교체분은 빌드가 경고 |
| 제품 화면 | 목업 3종을 React 컴포넌트로 — 로케일 따라 화면 속 글자도 바뀜 |
| 화면 | 헤더·푸터 + 홈 본문 전환 완료 |

검증: `npm run build` 가 typecheck → 테스트 175개(계획 4 완료 시점: 186개) → 자산 → prerender → HTML 검증 순서로 전부 돕니다.

## 확정된 결정

- **도메인**: 미정. `VITE_SITE_URL` 환경변수 한 줄이면 canonical·hreflang·sitemap·OG·JSON-LD 가 함께 이동합니다. 기본값 `autocmo.com` 은 실제 배포처라 그대로 둡니다.
- **주 CTA**: `APP_URLS.cmo`(실제 앱). 헤더·히어로·홈 마감 CTA 전부 여기로. `데모 보기` 만 `/demo`.
- **영문 범위**: 7개 경로. `/demo`, `/apps`, `/privacy`, `/terms` 는 한국어만.
- **사진**: 실물 도착 전까지 언어 없는 플레이스홀더. `public/img/<슬롯>.png` 에 덮어쓰고 `images.ts` 의 `sample` 을 `false` 로.

## 클라이언트 판단이 남은 것

- **모바일 스티키 CTA 바**: 기존 홈에는 스크롤 500px 후 하단 고정 버튼이 있었는데 새 디자인에 없어 제거됐습니다. 전환 요소라 되살릴지 결정 필요.
- **후기 인용문**: 현재 두 인용문은 파일럿 인터뷰를 정리한 문장입니다. 축어 인용과 동의 확보 후 교체하고 출처를 구체화해야 합니다.
- **사진 4장**: 대표 업무 환경·손/책상 크롭 2장·와이드 1장.

## 이월된 minor (머지 차단 아님)

| 항목 | 위치 |
|---|---|
| `tokens.ts` ↔ `theme.css` 헥스값이 주석으로만 동기화. surface/panel/line 드리프트는 미검출 | `src/styles/` |
| `tsconfig.json` 의 `include: "scripts"` 는 `.mjs` 뿐이라 무효 | `tsconfig.json` |
| `layoutPages` 의 `index: true` 는 읽히지 않는 죽은 필드 | `route-config.tsx` |
| `/404` 는 항상 `lang="ko"`. `/en/404` 빌드 대상 없음 | `prerender.mjs` |
| `isCompactSlot` 이 `ratio === "1 / 1"` 프록시. 큰 정사각 슬롯은 라벨 유실 | `ImageSlot.tsx` |
| 영문 `Week of Aug 18` 이 한국어 `8월 3주차 결과` 의 '결과' 뉘앙스 유실 | `en/mockups.ts` |
| `"/demo"` 리터럴이 중복(당시 3곳; 계획 3 완료 시점: `Layout.tsx` 안에 2곳) | `Layout.tsx` |
| `ResultDashboard` 지표 라벨이 375px 에서 단어 중간 잘림 (의도된 `truncate`) | `ResultDashboard.tsx` |
| `WebSite` JSON-LD 의 `@id` 가 로케일 무관 동일. 그래프 병합 시 한 노드가 두 주장 | `ssg/seo.ts` |
| sitemap 의 `xhtml:link` alternate 미구현 (설계 5.6). 계획 2·3 범위에 없음 — 배정 필요 | `prerender.mjs` |
| `og:image` 제거 상태에서 `twitter:card` 는 `summary_large_image` 유지. 계획 3에서 짝 맞출 것 | `ssg/seo.ts` |
| `site.json` 과 `ko/common.ts` 가 copyright·tagline 중복 보유. 당시 4개 페이지가 아직 `site.json` 참조; 계획 3 완료 시점: `IR.tsx` 하나만 남음(`Apps`·`Demo`·`Contact` 는 이관됨); 계획 4 완료 시점: 실제 import 지점이 `IrShell.tsx` 하나뿐(태스크 4 에서 `IR.tsx` 밖으로 옮겨짐) | `src/content/` |

## 계획 2가 쉬울 것

- 영문 페이지 추가 = `EN_ROUTES` 한 줄 + `SEO_BY_LOCALE.en` 블록 하나. 라우트·prerender·sitemap·hreflang·언어 전환이 따라옵니다.
- 다크 페이지 전환 = `bg-ground`/`text-ink`/`border-line` 로 치환. 새로 정할 색이 없습니다.
- `Home.tsx` 의 `SHELL`/`BLOCK`/`Section`/`SectionLabel`/`Lines` 가 페이지 뼈대로 그대로 쓰입니다.
- `localePath` 에 중복 구현이 없습니다.

## 계획 2가 어려울 것

- **교차 로케일 링크 표기를 매 페이지 반복해야 합니다.** 구조적 보장은 `FooterLink` 안에만 있고 나머지는 `foreignHreflang` 수동 호출입니다. **10개 페이지를 고치기 전에 `LocaleLink` 래퍼를 먼저 만드십시오.**
- `check-html.mjs` 는 계획 2 시작 시점에 4개 경로만 검사했습니다(계획 3 완료 시점: 16개; 계획 4 완료 시점: 18개 — 프리렌더되는 모든 경로가 이제 이 목록에 있습니다). 페이지를 전환할 때마다 같이 넓히지 않으면 커버리지 비율이 계속 떨어집니다.
- `site.json` 흡수가 미완이라 전환 기간 내내 문구가 두 곳에 삽니다.
- **`IR.tsx` 가 가장 어렵습니다** — 당시 777줄(계획 3 완료 시점: 783줄, 계획 4 완료 시점: 711줄 — 본문 7개 섹션 전부 전환됨, 차트 렌더 로직은 `IRCharts.tsx` 로 분리), recharts, `IRCharts.tsx` 의 차트 색이 아직 하드코딩된 헥스값(`#38bdf8`, `#a78bfa`, `#fb7185`)이라 토큰 경로가 없습니다(계획 4 완료 시점: 브랜드 토큰 `--color-chart-1~4` 로 전부 대체됨, 태스크 2).
