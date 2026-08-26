# 리디자인 계획 2 인수인계

브랜치: `redesign/conversion-path` · 커밋 21개 · 2026-08-20
선행: [계획 1 인수인계](REDESIGN_PLAN1_HANDOFF.md) · [설계](specs/2026-08-15-homepage-redesign-design.md) · [계획 2](plans/2026-08-19-redesign-02-conversion-path.md)

전환 경로 4개 페이지(`/solution`, `/pricing`, `/demo`, `/contact`)를 새 디자인으로 옮기고
그중 3개에 영문판을 붙였습니다. 이 문서는 계획 3을 시작할 때 필요한 것만 담습니다.

## ✅ 릴리스 게이트 — 해제됨

**갱신 (계획 3 완료 시점):** 원래 세 경로 중 `/en/technology` 와 `/en/about` 은
계획 3에서 영문 본문이 채워져 해소됐습니다(`<main>` 기준 한글 0자, 계획 3
태스크 6 실측). 남은 것은 `/en/ir` 하나입니다.

**갱신 (계획 4 완료, 2026-08-26):** **게이트 해제 — 남은 경로 0개.**
`/en/ir` 이 **영어라고 선언하면서 한국어 본문을 내던** 상태였습니다 —
`<html lang="en">` + 영문 title + `robots: index, follow` + sitemap 등재
상태에서 본문 한글 1927자(`<main>` 기준, 계획 2 완료 시점 실측)였습니다.
`/en/contact` 의 히어로와 IR 카드가 그 경로로 방문자를 직접 몰아넣고
있었습니다.

계획 4 태스크 6이 `/en/ir` 에 영문 본문을 채워(`<main>` 기준 한글 0자)
이 문제를 해소했고, 태스크 7이 `scripts/check-html.mjs` 의 `PAGES` 에
`/ir`·`/en/ir` 두 줄을 더해 그 사실을 빌드가 직접 검증하게 만들었습니다 —
그 전까지는 두 경로가 프리렌더는 되면서도 이 검사 목록엔 없어, 검사가
있어도 정작 보지 못하는 상태였습니다. `dist/en/ir/index.html` 에 한국어
문장을 일부러 심어 `check-html.mjs` 가 exit 1 로 잡는 것을 확인했습니다
(task-7-report.md 참고).

## 계획 2가 남긴 도구

| | |
|---|---|
| `LocaleLink` | 내부 링크의 경로와 `hreflang` 을 자동 계산. `to`/`hrefLang` 은 타입 단계에서 덮어쓸 수 없음 |
| `components/page/` | `SHELL` `BLOCK` `Section` `SectionLabel` `Lines` — 섹션 리듬 |
| `SameShape<T,V>` | 배열을 사전 길이에 묶음. 요금제·FAQ 가 사용 |
| `check-html.mjs` | 경로 16개(계획 4 완료 시점: 18개) + **프리렌더된 전 문서 19개**의 heading 구조 검사 |
| `tokens.test.ts` | 표면 3 × 잉크 4 대비 + `theme.css` ↔ `tokens.ts` 동기화 |

테스트 175개(계획 4 완료 시점: 186개). 빌드: `typecheck → vitest → verify-assets → prerender → check-html`.

## 계획 3이 쉬울 것

- 전환한 페이지를 게이트에 추가 = `check-html.mjs` 의 `PAGES` 배열 한 줄.
- heading·id·`aria-labelledby` 검사가 **미전환 페이지에도 이미 걸려 있습니다**(계획 3 완료 시점: `/ir` 하나; 계획 4 완료 시점: 0개 — `/ir`·`404.html` 도 전환 완료). 전환하다 개요를 깨면 빌드가 막습니다.
- 사전 등록은 기계적이고, 영문 키 누락은 컴파일 에러입니다.
- `tokens.test.ts` 동기화 검사 덕에 `IRCharts` 색을 `theme.css` 로 옮기면 대비 검사가 공짜로 붙습니다 — 단 `BRAND_TOKENS` 에도 같이 추가해야 합니다(현재 단방향).

## 계획 3이 어려울 것

**1. 히어로 블록과 마감 CTA 블록이 프리미티브가 아닙니다.**
네 페이지가 같은 것을 손으로 복사했고, 각자 "왜 직접 짰는지" 주석까지 달았습니다.
6개 페이지를 더 하면 복사본이 10개가 됩니다. **계획 3 시작 전에 승격하십시오.**

**2. `productCta` 가 5곳에 두 가지 모양으로 복제돼 있습니다** (`Layout`, `Home`, `Solution`, `Pricing` 은 객체, `Demo` 는 함수). 계획 3 완료 시점: `useProductCta` 훅(`src/app/components/page/useProductCta.ts`)으로 해소됨 — `ClosingCta` 가 내부에서 호출해 `Solution`·`Technology`·`About` 이 공유하고, `Home`·`Pricing` 도 같은 훅을 직접 부른다. `Layout` 의 객체 리터럴과 `Demo` 의 자체 함수만 남았다.

**3. 내부 링크 해석 방식이 세 가지입니다.**
`LocaleLink`(전환한 4개), `FooterLink`(Layout), 손으로 쓴 `<Link to={to(p)} hrefLang={...}>`(Layout, **Home**).
`LocaleLink` 는 "페이지 전환 시 반드시 쓰라"고 선언해놓고 정작 기준 페이지인 홈이 수동입니다.
계획 3 구현자가 홈을 읽고 수동 패턴을 베낍니다. 홈의 링크 2개만 옮기면 됩니다.

**4. `site.json` 에 죽은 키가 5개 남았고 하나는 이미 갈라졌습니다.**
소비자가 있는 건 `siteName`, `footer.copyright`(IR), `appsPage.*`(Apps) 뿐입니다.
`tagline` 은 `site.json` 에 `"창업자의 첫 번째 팀."`, `ko/common.ts` 에 `"창업자의 첫 번째 팀"` — 마침표가 다릅니다.
**`Apps.tsx` 와 `IR.tsx` 를 건드리기 전에 정리하십시오.**

**5. `IR.tsx` 가 가장 어렵습니다.** 당시 777줄(계획 3 완료 시점: 783줄, 이 계획은 `IR.tsx` 를 건드리지 않았다; 계획 4 완료 시점: 711줄 — 본문 7개 섹션 전부 전환, 차트 렌더는 `IRCharts.tsx` 로 분리), recharts, 차트 색 7개가 하드코딩 헥스(계획 4 완료 시점: 브랜드 토큰 `--color-chart-1~4` 로 대체, 태스크 2).
`site.json` 을 읽는 마지막 페이지이기도 합니다(계획 4 완료 시점: 그 import 지점이 `IR.tsx` 에서 `IrShell.tsx` 로 옮겨짐 — 여전히 저장소에서 유일한 소비처).

## 알려진 후속 항목

- `IR.tsx:32` 에 `const contactEmail = CONTACT_EMAIL` 별칭이 남음 (`Contact.tsx` 에서는 제거됨) — 계획 4 완료 시점: 줄 번호는 24로 밀렸고(본문 전환 중 위 임포트가 줄었다), 태스크 4가 그 이유를 주석으로 남겨 의도된 패턴이 됨. `IrShell.tsx` 도 같은 상수를 독립적으로 import 함
- `pathHreflang("#top", "en")` 이 `"ko"` 를 반환. 같은 페이지 앵커는 `LocaleLink` 대신 평범한 `<a>` 를 쓸 것
- `src/content/ir.ts:442` 의 `emailSubject` 가 한국어. `/en/contact` 의 IR CTA 에서 도달 가능 — 계획 4 대상 — **해소.** `ir.ts` 는 계획 4에서 `ko/ir.ts`·`en/ir.ts` 로 갈라졌고, `en/ir.ts` 의 `emailSubject` 는 `"[WooriTeam] IR deck request"`로 별도 지정됨(한국어는 `"[WooriTeam] IR 자료 요청"`)
- `CONTACT_EMAIL` 이 `ko/contact.ts` 에 있으나 로케일 무관 사실. `ssg/seo.ts` 와 `IR.tsx` 가 import 함
- `SectionLabel as="h2"` 가 heading 안에 번호를 넣음(당시 8곳; 계획 3 완료 시점: 14곳). `{index}` 를 `aria-hidden` 으로 감싸면 정리됨
- `Contact.tsx` 의 메일 초안 문구는 사전으로 갔지만, JS 안의 한국어는 여전히 어떤 자동 검사도 못 봄

## 클라이언트 판단 대기

- `/contact` 의 실시간 채팅 버튼에 핸들러 없음 — 페이지가 "가장 빠른 채널"이라 부르는 곳
- 오피스 카드가 "미정"인데 `href="#"` 링크였음. 목적지가 생길 수 없으므로 비링크로 렌더하는 게 맞다는 판단대로, 계획 5 태스크 3에서 `<a>` 를 지우고 `<div>` 로 바꿔 해소됨 — 실제 주소가 생기면 되돌릴 대상(계획 5 task-4-brief 의 "남는 것")
- 소셜 링크 4개 `href="#"` — 계획 5 태스크 3에서 이름만 보이는 `<span>` 으로 바꿔 해소됨(`a[href="#"]` 0건 실측) — 실제 계정이 생기면 되돌릴 대상
- `VITE_FORMSPREE_FORM_ID` 미설정 — mailto 폴백이 현재 운영 경로
- 모바일 스티키 CTA 바 (계획 1에서 제거됨) 복원 여부
