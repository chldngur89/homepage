# WooriTeam 리디자인 2: 전환 경로 (솔루션·요금·데모·문의)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 방문자가 실제로 따라가는 전환 경로 4개 페이지를 새 라이트 에디토리얼 디자인으로 전환하고, 그중 3개에 영문판을 붙인다.

**Architecture:** 계획 1이 홈에서 검증한 섹션 프리미티브를 공용 모듈로 승격하고, 각 페이지를 그 프리미티브의 조합으로 다시 짠다. 카피는 페이지에서 사전으로 뽑아내되 문구를 바꾸지 않는다. 교차 로케일 링크 표기를 `LocaleLink` 하나로 강제해, 페이지마다 수동으로 챙기던 것을 구조적으로 만든다.

**Tech Stack:** Vite 6, React 18, React Router 7, TypeScript, Tailwind CSS 4, Vitest

**선행 문서**
- 설계: [2026-08-15-homepage-redesign-design.md](../specs/2026-08-15-homepage-redesign-design.md)
- 계획 1 인수인계: [REDESIGN_PLAN1_HANDOFF.md](../REDESIGN_PLAN1_HANDOFF.md)

**이 계획의 범위:** `/solution`, `/pricing`, `/demo`, `/contact` 네 페이지 + 영문 3개(`/en/solution`, `/en/pricing`, `/en/contact`). `/demo` 는 한국어만. 나머지 6개 페이지(기술·회사·앱·IR·개인정보·약관)는 계획 3 이후.

> **설계 문서의 단계 구분과 다르다.** 설계 6절은 전환 유입 순서로 `Solution·Pricing·Technology` → `About·Contact·IR` → `Demo·Apps·Privacy·Terms` 를 제시했다. 클라이언트가 **방문자의 실제 전환 경로**(솔루션 → 요금 → 데모 → 문의)를 먼저 완성하는 쪽을 택해 이렇게 묶었다. 최종적으로 덮는 페이지 집합은 같다.

**완료 시점 상태:** 홈 + 이 4개가 새 디자인. 기술·회사·앱·IR·개인정보·약관은 여전히 다크. 그 혼재는 의도된 중간 상태다.

## Global Constraints

- 브랜드 표기는 항상 `WooriTeam` / `우리팀`. `autocmo`, `AutoCMO`, `CMO AI Agent`, `ZeroSeller` 를 브랜드 식별자로 쓰지 않는다 (배포 도메인 문자열 `autocmo.com` 은 예외).
- 메인 CTA 문구는 한국어 `우리팀과 같이 성장하기`, 영어 `Grow with WooriTeam`. 변형하지 않는다.
- **메인 CTA 목적지는 `APP_URLS.cmo`(실제 앱)이다.** 계획 1에서 클라이언트가 확정했다. `target="_blank"` + `rel="noopener noreferrer"` 를 유지한다. `데모 보기` 계열만 `/demo` 로 간다.
- 핵심 루프 표기는 `제안 → 승인 → 실행 → 반복 성장` (화살표는 ` → `, 공백 포함).
- 새 코드에서 `slate-*`, `cyan-*`, `indigo-*`, `pink-*` Tailwind 색상 유틸리티를 쓰지 않는다. 브랜드 토큰 유틸리티만 쓴다.
- 진입 애니메이션은 `.rise` 클래스 하나로 통일한다. `motion/react` 를 새로 들이지 않는다. (다른 미전환 페이지가 아직 쓰므로 `package.json` 에서 제거하지는 않는다.)
- 영문판이 존재하는 경로는 `/`, `/solution`, `/technology`, `/pricing`, `/about`, `/contact`, `/ir` 뿐이다. `/demo`, `/apps`, `/privacy`, `/terms` 는 한국어만이다.
- **기존 카피를 다시 쓰지 않는다.** 사전으로 옮길 때 문구·띄어쓰기·문장부호를 그대로 유지한다. 번역이 아니라 이동이다.
- **Demo 의 시뮬레이션 동작과 Contact 의 폼 전송 동작을 바꾸지 않는다.** 외형만 전환한다.
- 커밋 메시지는 한국어로 쓰고 `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>` 로 끝낸다.

## 전환 레시피 (모든 페이지 태스크가 따른다)

기존 다크 유틸리티를 브랜드 토큰으로 옮기는 대응표다. 기계적 치환이 아니라 역할을 보고 고른다.

| 기존 | 새 토큰 | 비고 |
|---|---|---|
| `bg-slate-950`, `bg-slate-900/30` | `bg-ground` / `bg-panel` | 섹션이 번갈아 나오면 `panel` 로 리듬을 준다 |
| `text-white` | `text-ink` | |
| `text-slate-300`, `text-slate-400` | `text-ink-2` | 본문 |
| `text-slate-500`, `text-slate-600` | `text-ink-3` | 캡션·라벨 |
| `border-slate-800` | `border-line` | 섹션 구분선 |
| `border-slate-800` (카드) | `border-line-2` | 카드 아웃라인 |
| `text-cyan-400`, `text-cyan-300` | `text-brand` | 포인트 |
| `bg-gradient-to-r from-cyan-500 to-indigo-600` | `bg-invert text-white` | 주 버튼 |
| `rounded-full` (버튼) | `rounded-[10px]` | |
| `rounded-2xl` (카드) | `rounded-[14px]` + `border border-line-2` | 글로우·그라데이션 제거 |
| blur 글로우 원형 div | 삭제 | 새 디자인에 없다 |
| `motion.div` + `initial/animate` | `className="rise"` | 섹션 단위로 한 번만 |

구조는 홈과 같은 리듬을 쓴다: `<Section>` 안에 `<SectionLabel index="01">` + `<h2>` + 본문, 좌우 비대칭 그리드, 헤어라인 보더. 섹션 번호는 페이지마다 `01` 부터 다시 센다.

## File Structure

**신규**

| 파일 | 책임 |
|------|------|
| `src/app/components/LocaleLink.tsx` | 내부 링크 하나에 `localePath` + `hreflang` 을 함께 적용 |
| `src/app/components/LocaleLink.test.tsx` | 위 동작 검증 |
| `src/app/components/page/index.tsx` | `SHELL`, `BLOCK`, `Section`, `SectionLabel`, `Lines` 공용 승격 |
| `src/app/components/page/page.test.tsx` | 프리미티브 검증 |
| `src/content/ko/solution.ts` · `en/solution.ts` | 솔루션 카피 |
| `src/content/ko/pricing.ts` · `en/pricing.ts` | 요금 카피 |
| `src/content/ko/demo.ts` | 데모 카피 (한국어만) |
| `src/content/ko/contact.ts` · `en/contact.ts` | 문의 카피 |

**수정**

| 파일 | 변경 |
|------|------|
| `src/app/pages/Home.tsx` | 지역 헬퍼를 공용 모듈 import 로 교체 |
| `src/app/pages/Solution.tsx` | 전면 전환 |
| `src/app/pages/Pricing.tsx` | 전면 전환 |
| `src/app/pages/Demo.tsx` | 외형 전환 (시뮬레이션 로직 보존) |
| `src/app/pages/Contact.tsx` | 외형 전환 (폼 로직 보존) |
| `src/content/index.ts` | 새 사전 4종 등록 |
| `src/content/site.json` | `demoPage`, `contactEmail` 이 사전으로 이동하면 제거 |
| `ssg/seo.ts` | 해당 없음 — 4개 경로 SEO 는 이미 존재 |
| `scripts/check-html.mjs` | 검사 경로 4 → 12 확대 |

---

### Task 1: LocaleLink

계획 1 리뷰가 지적한 사항이다. 교차 로케일 링크 표기가 `FooterLink` 안에서만 구조적이고, 나머지는 `pathHreflang` 을 수동 호출한다. 실제로 계획 1에서 세 군데가 누락됐고 수정 회전이 필요했다. **10개 페이지를 고치기 전에 이걸 먼저 만든다.**

**Files:**
- Create: `src/app/components/LocaleLink.tsx`
- Create: `src/app/components/LocaleLink.test.tsx`

**Interfaces:**
- Consumes: `localePath`, `pathHreflang` (`src/app/i18n/localePath.ts`), `useLocale` (`src/app/i18n/LocaleContext.tsx`)
- Produces: `<LocaleLink to={string} className?={string} children>` — `to` 는 **한국어 기준 경로**를 받는다 (`/pricing`, `/demo`). 컴포넌트가 활성 로케일에 맞는 실제 경로와 `hrefLang` 을 함께 계산한다. Task 3~6 의 모든 내부 링크가 이걸 쓴다.

- [ ] **Step 1: 실패하는 테스트 작성**

`src/app/components/LocaleLink.test.tsx`. 테스트 대상은 **순수 함수 `resolveLocaleLink`** 다. `LocaleLink` 컴포넌트 자체는 `useLocale` 훅을 쓰므로 `environment: "node"` 에서 함수 호출로 렌더할 수 없다 — 계획 1의 `Layout` 에서 같은 제약을 확인했고, 로직을 순수 함수로 빼서 그걸 검사하는 것이 이 저장소의 확립된 패턴이다.

```tsx
import { describe, expect, it } from "vitest";
import { resolveLocaleLink } from "./LocaleLink";

describe("resolveLocaleLink", () => {
  it("한국어에서는 경로를 그대로 쓰고 hrefLang 을 붙이지 않는다", () => {
    const { to, hrefLang } = resolveLocaleLink("/pricing", "ko");
    expect(to).toBe("/pricing");
    expect(hrefLang).toBeUndefined();
  });

  it("영어에서 영문판이 있는 경로는 /en 을 붙이고 hrefLang 이 없다", () => {
    const { to, hrefLang } = resolveLocaleLink("/pricing", "en");
    expect(to).toBe("/en/pricing");
    expect(hrefLang).toBeUndefined();
  });

  it("영어에서 한국어 전용 경로는 원 경로를 쓰고 hrefLang='ko' 를 붙인다", () => {
    const { to, hrefLang } = resolveLocaleLink("/demo", "en");
    expect(to).toBe("/demo");
    expect(hrefLang).toBe("ko");
  });

  it("한국어에서 한국어 전용 경로에는 hrefLang 을 붙이지 않는다", () => {
    const { to, hrefLang } = resolveLocaleLink("/demo", "ko");
    expect(hrefLang).toBeUndefined();
  });
});
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `npx vitest run src/app/components/LocaleLink.test.tsx`
Expected: FAIL — `resolveLocaleLink` 가 없다

- [ ] **Step 3: 구현**

`src/app/components/LocaleLink.tsx`:

```tsx
import { Link } from "react-router";
import type { ReactNode } from "react";
import { localePath, pathHreflang } from "@/app/i18n/localePath";
import { useLocale } from "@/app/i18n/LocaleContext";
import type { Locale } from "@/content/locales";

/**
 * 내부 링크 하나가 필요로 하는 두 가지 — 실제 경로와 교차 로케일 표기 — 를
 * 한 번에 계산한다. 순수 함수로 분리해 둔 이유는 이것이 실제 로직이고,
 * 컴포넌트는 결과를 <Link> 에 넘기기만 하기 때문이다.
 *
 * 계획 1에서 이 계산을 링크마다 손으로 하다가 세 군데를 빠뜨렸다.
 * 페이지를 전환할 때는 반드시 LocaleLink 를 쓴다.
 */
export function resolveLocaleLink(to: string, locale: Locale) {
  return { to: localePath(to, locale), hrefLang: pathHreflang(to, locale) };
}

export function LocaleLink({
  to,
  className,
  children,
}: {
  /** 한국어 기준 경로. 예: "/pricing", "/demo" */
  to: string;
  className?: string;
  children: ReactNode;
}) {
  const locale = useLocale();
  const resolved = resolveLocaleLink(to, locale);

  return (
    <Link to={resolved.to} hrefLang={resolved.hrefLang} className={className}>
      {children}
    </Link>
  );
}
```

- [ ] **Step 4: 테스트 통과 확인**

Run: `npx vitest run src/app/components/LocaleLink.test.tsx`
Expected: PASS — 4개 통과

- [ ] **Step 5: 커밋**

```bash
git add src/app/components/LocaleLink.tsx src/app/components/LocaleLink.test.tsx
git commit -m "$(cat <<'EOF'
feat: 내부 링크의 로케일 경로와 hreflang 표기를 LocaleLink 로 통합

계획 1에서는 링크마다 localePath 와 pathHreflang 을 손으로 호출했고
세 군데를 빠뜨려 수정 회전이 필요했다. 10개 페이지를 전환하기 전에
구조적으로 막는다.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: 페이지 프리미티브 공용 승격

홈이 검증한 섹션 리듬을 4개 페이지가 재사용한다. 지금은 `Home.tsx` 안의 지역 함수라 복사할 수밖에 없다.

**Files:**
- Create: `src/app/components/page/index.tsx`
- Create: `src/app/components/page/page.test.tsx`
- Modify: `src/app/pages/Home.tsx` (지역 헬퍼 제거 → import)

**Interfaces:**
- Consumes: 브랜드 토큰
- Produces: `SHELL: string`, `BLOCK: string`, `<Section id tone?>`, `<SectionLabel index as? id?>`, `<Lines text>`. Task 3~6 이 전부 사용한다.

- [ ] **Step 1: 프리미티브를 그대로 옮긴다**

`src/app/pages/Home.tsx` 상단의 `SHELL`, `BLOCK`, `Section`, `SectionLabel`, `Lines` 를 **한 글자도 바꾸지 말고** `src/app/components/page/index.tsx` 로 옮기고 각각 `export` 를 붙인다. `ReactNode` import 도 함께 옮긴다.

주석도 그대로 옮긴다 — `SectionLabel` 의 `as="h2"` 주석은 계획 1의 접근성 수정 근거를 담고 있다.

- [ ] **Step 2: Home 을 import 로 바꾼다**

`src/app/pages/Home.tsx` 에서 옮긴 정의를 지우고 최상단에 추가:

```tsx
import { SHELL, BLOCK, Section, SectionLabel, Lines } from "@/app/components/page";
```

`ReactNode` 가 Home 에서 더 이상 쓰이지 않으면 그 import 도 지운다.

- [ ] **Step 3: 홈이 바뀌지 않았음을 증명**

이 태스크는 **순수 이동**이므로 산출물이 바이트 단위로 같아야 한다.

```bash
npm run build
cp dist/index.html /tmp/home-after.html
cp dist/en/index.html /tmp/home-en-after.html
git stash
npm run build
diff /tmp/home-after.html dist/index.html && echo "KO 동일"
diff /tmp/home-en-after.html dist/en/index.html && echo "EN 동일"
git stash pop
```

Expected: 양쪽 모두 `동일` 출력. 차이가 있으면 이동 중 무언가 바뀐 것이므로 되돌리고 다시 한다.

- [ ] **Step 4: 프리미티브 테스트 작성**

`src/app/components/page/page.test.tsx`. 저장소 패턴(함수 호출 + 엘리먼트 트리 검사)을 따른다.

```tsx
import { describe, expect, it } from "vitest";
import { Section, SectionLabel, Lines } from "./index";

describe("Section", () => {
  it("aria-labelledby 에 id 를 연결한다", () => {
    const el = Section({ id: "x-h", children: null }) as { props: Record<string, unknown> };
    expect(el.props["aria-labelledby"]).toBe("x-h");
  });

  it("tone='panel' 이면 bg-panel 을 쓴다", () => {
    const el = Section({ id: "x-h", tone: "panel", children: null }) as { props: { className: string } };
    expect(el.props.className).toContain("bg-panel");
  });

  it("기본 tone 은 bg-ground 다", () => {
    const el = Section({ id: "x-h", children: null }) as { props: { className: string } };
    expect(el.props.className).toContain("bg-ground");
  });
});

describe("SectionLabel", () => {
  it("기본은 p 다", () => {
    const el = SectionLabel({ index: "01", children: "라벨" }) as { type: string };
    expect(el.type).toBe("p");
  });

  it("as='h2' 면 heading 으로 승격되고 클래스는 같다", () => {
    const p = SectionLabel({ index: "01", children: "라벨" }) as { type: string; props: { className: string } };
    const h = SectionLabel({ index: "01", as: "h2", children: "라벨" }) as { type: string; props: { className: string } };
    expect(h.type).toBe("h2");
    expect(h.props.className).toBe(p.props.className);
  });
});

describe("Lines", () => {
  it("줄바꿈 개수만큼 조각을 만든다", () => {
    const el = Lines({ text: "가\n나\n다" }) as { props: { children: unknown[] } };
    expect(el.props.children).toHaveLength(3);
  });
});
```

- [ ] **Step 5: 전체 검증**

Run: `npm run build`
Expected: 통과. 테스트 수가 늘어난다.

- [ ] **Step 6: 커밋**

```bash
git add src/app/components/page src/app/pages/Home.tsx
git commit -m "$(cat <<'EOF'
refactor: 홈의 섹션 프리미티브를 공용 모듈로 승격

SHELL, BLOCK, Section, SectionLabel, Lines 를 그대로 옮겼다.
전환할 페이지 4개가 같은 리듬을 복사 없이 쓴다.

빌드 산출물이 이동 전후로 바이트 동일함을 확인했다.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: 솔루션 페이지

가장 단순한 전환 대상이라 여기서 패턴을 확립한다. 이후 세 태스크가 같은 방식을 따른다.

**Files:**
- Create: `src/content/ko/solution.ts`, `src/content/en/solution.ts`
- Modify: `src/content/index.ts`, `src/app/pages/Solution.tsx`

**Interfaces:**
- Consumes: Task 1의 `LocaleLink`, Task 2의 프리미티브, `useCopy`, `DeepWiden`
- Produces: `Dictionary` 에 `solution` 키 추가

**현재 구조 (`src/app/pages/Solution.tsx`, 174줄):** 히어로 / `ChatGPT 와의 차이` 비교 / `한 사이클` 4단계 (`steps.map`) / `지금 다루는 일` vs `이후 연결` 2단 / 마감 CTA — 5개 섹션.

- [ ] **Step 1: 한국어 사전 작성**

`src/content/ko/solution.ts`. **현재 `Solution.tsx` 안에 있는 문구를 그대로 옮긴다.** 새로 쓰지 않는다. 형태:

```ts
export const solution = {
  hero: { /* … */ },
  difference: { /* … */ },
  cycle: { /* … */ },
  scope: { /* … */ },
  cta: { /* … */ },
} as const;

export type SolutionCopy = typeof solution;
```

`as const` 가 배열을 튜플로 굳히고, 그 덕분에 영문 사전에서 원소가 빠지면 컴파일 에러가 난다. `as const` 를 빠뜨리면 그 보장이 사라진다.

- [ ] **Step 2: 영어 사전 작성**

`src/content/en/solution.ts`:

```ts
import type { SolutionCopy } from "../ko/solution";
import type { DeepWiden } from "../widen";

export const solution: DeepWiden<SolutionCopy> = { /* … */ };
```

영문은 홈 영문 사전의 톤을 따른다 — 직역이 아니라 영어로 쓴 글이어야 한다. 계획 1 리뷰가 `실행 가능한 작업이 나옵니다` → `Work that ships` 같은 처리를 좋은 예로 들었다.

- [ ] **Step 3: 사전 등록**

`src/content/index.ts` 의 `Dictionary` 와 `dictionaries` 양쪽에 `solution` 을 추가한다. `satisfies` 구조를 유지한다.

- [ ] **Step 4: 번역 누락 보장 확인**

`src/content/en/solution.ts` 에서 키 하나와 배열 원소 하나를 각각 지워본다.

Run: `npm run typecheck`
Expected: 두 경우 모두 FAIL — 키 누락은 `TS2741`, 배열 원소 누락은 arity 에러. 복구 후 통과 확인.

- [ ] **Step 5: 페이지 전환**

`src/app/pages/Solution.tsx` 를 전환 레시피에 따라 다시 짠다:

- `motion/react` 와 `lucide-react` import 제거. 진입 애니메이션은 첫 섹션에 `className="rise"` 하나만.
- 모든 문구를 `useCopy().solution` 에서 읽는다. 하드코딩 문자열 금지.
- 섹션을 `<Section id="…-h">` + `<SectionLabel index="01">` + `<h2 id="…-h">` 구조로 만든다. **섹션마다 `aria-labelledby` 대상 heading 이 정확히 하나 있어야 한다** — 계획 1에서 이걸 빠뜨려 수정 회전이 필요했다.
- 내부 링크는 전부 `<LocaleLink>`. 제품 링크(`APP_URLS.cmo`)는 외부이므로 `<a target="_blank" rel="noopener noreferrer">` 를 유지한다.
- 주 CTA 는 `APP_URLS.cmo`, 문구는 `common.cta.primary`.

- [ ] **Step 6: 검증**

Run: `npm run build`

브라우저에서 `http://localhost:5173/solution` 과 `/en/solution` 확인:
- 라이트 배경, 헤어라인 카드, 그라데이션·글로우 없음
- 영문판이 영문 카피로 나온다
- 375px 에서 가로 스크롤 없음, 그리드가 단일 컬럼으로 접힘
- 섹션마다 heading 존재

```bash
node -e "
const h=require('fs').readFileSync('dist/en/solution/index.html','utf8');
const ko=(h.replace(/<script[\s\S]*?<\/script>/g,'').match(/[가-힣]+/g)||[]);
console.log('영문 페이지 한글 잔존:', ko.length, ko.slice(0,5));
"
```
Expected: `0`

- [ ] **Step 7: 커밋**

```bash
git add src/content/ko/solution.ts src/content/en/solution.ts src/content/index.ts src/app/pages/Solution.tsx
git commit -m "$(cat <<'EOF'
feat: 솔루션 페이지를 새 디자인으로 전환하고 영문판을 붙인다

카피를 사전으로 분리하고 홈의 섹션 프리미티브로 다시 짰다.
motion 라이브러리 개별 설정과 그라데이션 글로우를 걷어내고
rise 애니메이션 하나로 통일했다.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: 요금 페이지

**Files:**
- Create: `src/content/ko/pricing.ts`, `src/content/en/pricing.ts`
- Modify: `src/content/index.ts`, `src/app/pages/Pricing.tsx`

**Interfaces:**
- Consumes: Task 1·2의 산출물
- Produces: `Dictionary` 에 `pricing` 키

**현재 구조 (388줄):** 히어로 / 요금제 3종 카드(무료·프로·슈퍼 팀) / 수익 쉐어 플랜 / 비교 / FAQ / 마감 CTA — 6개 섹션.

섹션 키는 `hero`, `plans`, `revenueShare`, `compare`, `faq`, `cta`.

- [ ] **Step 1: 한국어 사전 작성**

`src/content/ko/pricing.ts`. **현재 `Pricing.tsx` 안에 있는 문구를 그대로 옮긴다.** 새로 쓰지 않는다. 형태:

```ts
export const pricing = {
  hero: { /* … */ },
  plans: [ /* … */ ],
  revenueShare: { /* … */ },
  compare: { /* … */ },
  faq: [ /* … */ ],
  cta: { /* … */ },
} as const;

export type PricingCopy = typeof pricing;
```

`plans` 는 3개 요금제의 배열이다. 각 항목은 이름·가격·설명·기능 목록·CTA 문구를 갖는다. **가격과 기능 목록의 문구를 바꾸지 않는다** — 판매 조건이다.

`faq` 는 `{ q, a }` 배열이다. 현재 페이지의 항목 수와 순서를 그대로 유지한다.

- [ ] **Step 2: 영어 사전 작성**

요금제 이름(`무료`/`프로`/`슈퍼 팀`)은 영어로 옮기되, **금액과 통화 표기는 원본 그대로 둔다.** 원화 금액을 임의로 환산하지 않는다.

- [ ] **Step 3: 사전 등록**

`src/content/index.ts` 의 `Dictionary` 와 `dictionaries` 양쪽에 `pricing` 을 추가한다. `satisfies` 구조를 유지한다.

- [ ] **Step 4: 번역 누락 보장 확인**

`src/content/en/pricing.ts` 에서 키 하나를 지우고, 이어서 `plans` 배열의 원소 하나와 `faq` 배열의 원소 하나를 각각 지워본다.

Run: `npm run typecheck`
Expected: 세 경우 모두 FAIL — 키 누락은 `TS2741`, 배열 원소 누락은 arity 에러(`Source has N element(s) but target requires N+1`). 복구 후 통과 확인. 실제 컴파일러 출력을 보고서에 붙인다.

- [ ] **Step 5: 페이지 전환**

전환 레시피 적용. 추가로:
- 요금제 카드의 강조 처리(현재 `border-cyan-500/40` 계열)는 `border-brand` 또는 `border-t-2 border-ink` 로 옮긴다. 새 디자인은 색보다 선 두께로 위계를 준다.
- 체크 아이콘(`lucide` 의 `Check`)은 홈이 쓰는 `—` 대시 또는 작은 원형 점으로 대체한다. `lucide-react` 를 새로 들이지 않는다.
- FAQ 는 `<dl>`/`<dt>`/`<dd>` 로 마크업한다. 계획 5에서 `FAQPage` 구조화 데이터를 붙일 때 근거가 된다.

- [ ] **Step 6: 검증**

Run: `npm run build`

브라우저에서 `http://localhost:5173/pricing` 과 `/en/pricing` 확인:
- 라이트 배경, 헤어라인 카드, 그라데이션·글로우 없음
- 요금제 3종의 금액과 기능 목록이 전환 전과 같다
- 영문판이 영문 카피로 나온다
- 375px 에서 가로 스크롤 없음, 요금제 카드가 세로로 쌓인다
- 섹션마다 heading 존재

```bash
node -e "
const h=require('fs').readFileSync('dist/en/pricing/index.html','utf8');
const ko=(h.replace(/<script[\s\S]*?<\/script>/g,'').match(/[가-힣]+/g)||[]);
console.log('영문 페이지 한글 잔존:', ko.length, ko.slice(0,5));
"
```
Expected: `0`

- [ ] **Step 7: 커밋**

```bash
git add src/content/ko/pricing.ts src/content/en/pricing.ts src/content/index.ts src/app/pages/Pricing.tsx
git commit -m "$(cat <<'EOF'
feat: 요금 페이지를 새 디자인으로 전환하고 영문판을 붙인다

금액과 기능 목록 문구는 그대로 두고 시각 언어만 바꿨다.
FAQ 를 dl/dt/dd 로 마크업해 이후 FAQPage 구조화 데이터의
근거를 만들었다.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 5: 데모 페이지

**한국어 전용이다.** 영문 사전을 만들지 않는다. 그리고 이 페이지에는 **동작이 있다** — 시뮬레이션 상태 머신을 건드리면 안 된다.

**Files:**
- Create: `src/content/ko/demo.ts`
- Modify: `src/content/index.ts`, `src/app/pages/Demo.tsx`, `src/content/site.json`

**Interfaces:**
- Consumes: Task 1·2의 산출물
- Produces: `Dictionary` 에 `demo` 키 (한국어만 — 영어 사전은 한국어 것을 재사용)

**현재 구조 (214줄):** 히어로 / CEO Rader 브리지 / 시뮬레이션 / 마감 CTA — 4개 섹션.

**보존해야 하는 동작:** `simOpen`, `simIdx`, `simDone` 상태와 `useEffect` 타이머로 도는 재생 로직. `demo.playbookLabels` 를 순서대로 밝히는 시퀀스다. **로직에 손대지 않는다.**

- [ ] **Step 1: site.json 의 demoPage 를 사전으로 옮긴다**

현재 `Demo.tsx` 는 `siteContent.demoPage` 를 읽는다. `src/content/site.json` 의 `demoPage` 객체 전체를 `src/content/ko/demo.ts` 로 **값 그대로** 옮기고, `site.json` 에서는 `demoPage` 키를 지운다.

`site.json` 의 다른 키(`siteName`, `tagline`, `contactEmail`, `footer`, `appsPage`)는 아직 다른 페이지가 쓰므로 건드리지 않는다.

- [ ] **Step 2: 사전 등록**

`Dictionary` 에 `demo` 를 추가한다. **한국어 전용이므로 `dictionaries.en.demo` 에도 한국어 사전을 그대로 넣는다.** 영문 화면에서 `/demo` 로 가면 한국어를 보게 되는데, 그것이 의도된 동작이다 (`EN_ROUTES` 에 `/demo` 가 없다). 이 선택을 코드 주석으로 남긴다.

- [ ] **Step 3: 타입 검사**

Run: `npm run typecheck`
Expected: 통과. `site.json` 에서 `demoPage` 를 지웠으므로 `Demo.tsx` 가 아직 그걸 읽고 있으면 여기서 잡힌다.

- [ ] **Step 4: 페이지 외형 전환**

전환 레시피 적용. **다음은 건드리지 않는다:**
- `useState`/`useEffect` 와 타이머 로직
- 상태 전이 순서와 조건
- `APP_URLS.ceoRader` 링크

바꾸는 것은 클래스와 마크업 구조뿐이다. 시뮬레이션의 단계 표시는 홈 `ProposalCard` 의 리스트 리듬을 참고해 헤어라인 구분선 기반으로 다시 만든다.

- [ ] **Step 5: 동작이 살아 있는지 확인**

`http://localhost:5173/demo` 에서 실제로 클릭해 본다:
- 시뮬레이션 시작 버튼을 누르면 단계가 순서대로 진행된다
- 마지막 단계 후 완료 문구가 뜬다
- 다시 보기가 동작한다
- CEO Rader 링크가 새 탭으로 열린다

**동작 확인 없이 완료 보고하지 않는다.** 브라우저를 못 쓰면 그렇게 밝히고, 대신 무엇을 확인했는지 정확히 적는다.

- [ ] **Step 6: 커밋**

```bash
git add src/content/ko/demo.ts src/content/index.ts src/content/site.json src/app/pages/Demo.tsx
git commit -m "$(cat <<'EOF'
feat: 데모 페이지 외형을 새 디자인으로 전환한다

시뮬레이션 상태 머신과 타이머 로직은 그대로 두고 클래스와
마크업만 바꿨다. site.json 의 demoPage 를 사전으로 옮겼다.

한국어 전용 페이지라 영문 사전을 만들지 않고 en 로케일에서도
한국어 사전을 참조한다.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 6: 문의 페이지

**폼이 살아 있다.** Formspree 로 실제 전송된다.

**Files:**
- Create: `src/content/ko/contact.ts`, `src/content/en/contact.ts`
- Modify: `src/content/index.ts`, `src/app/pages/Contact.tsx`, `src/content/site.json`

**Interfaces:**
- Consumes: Task 1·2의 산출물
- Produces: `Dictionary` 에 `contact` 키

**현재 구조 (394줄):** 히어로 / 연락 수단 카드 / 폼 + 사이드바(IR 미팅·채팅·FAQ·소셜) / 지도 또는 위치 / 평균 응답 시간 — 6개 섹션.

**보존해야 하는 동작:** `formData` 상태, `handleSubmit`, `VITE_FORMSPREE_FORM_ID` 분기, `submitted`/`submitError` 상태와 그에 따른 화면 분기. 폼 필드의 `name` 속성은 Formspree 가 받는 키이므로 **이름을 바꾸지 않는다.**

- [ ] **Step 1: site.json 의 contactEmail 을 사전으로 옮긴다**

`Contact.tsx:7` 이 `siteContent.contactEmail` 을 읽는다. 값을 `src/content/ko/contact.ts` 로 옮긴다. `site.json` 에서 `contactEmail` 키를 지우되, **다른 파일이 아직 이 키를 읽는지 먼저 확인한다:**

```bash
grep -rn "contactEmail" src/ ssg/
```

`ssg/seo.ts` 의 JSON-LD `Organization.email` 이 같은 주소를 하드코딩하고 있다면, 두 곳이 갈리지 않도록 한 곳에서만 정의되게 정리한다. 이메일 주소 자체는 바꾸지 않는다.

- [ ] **Step 2: 한국어·영어 사전 작성**

폼 라벨, 플레이스홀더, 제출 버튼, 성공·실패 메시지, FAQ 항목까지 전부 사전으로 옮긴다. **필드의 `name` 속성은 사전에 넣지 않는다** — 코드에 고정된 계약이다.

- [ ] **Step 3: 사전 등록 및 누락 보장 확인**

`src/content/index.ts` 의 `Dictionary` 와 `dictionaries` 양쪽에 `contact` 를 추가한다. `satisfies` 구조를 유지한다.

이어서 `src/content/en/contact.ts` 에서 키 하나와 `faq` 배열 원소 하나를 각각 지워본다.

Run: `npm run typecheck`
Expected: 두 경우 모두 FAIL — 키 누락은 `TS2741`, 배열 원소 누락은 arity 에러. 복구 후 통과 확인. 실제 컴파일러 출력을 보고서에 붙인다.

- [ ] **Step 4: 페이지 외형 전환**

전환 레시피 적용. 폼 입력 요소는 새 디자인 톤으로:
- `border border-line-2 bg-surface`, 포커스 시 `--brand` 아웃라인 (전역 `:focus-visible` 규칙이 이미 처리한다)
- 제출 버튼은 `bg-invert text-white rounded-[10px]`
- 성공·실패 상태 카드는 헤어라인 보더

**폼 로직·필드 name·전송 경로를 바꾸지 않는다.**

- [ ] **Step 5: 폼이 살아 있는지 확인**

`VITE_FORMSPREE_FORM_ID` 가 없는 로컬 환경에서는 전송되지 않고 안내 문구가 뜨는 분기를 탄다. 최소한 다음을 확인한다:
- 입력 → 제출 시 자바스크립트 에러가 없다
- 미설정 안내 문구가 뜬다
- 필드 `name` 속성이 전환 전과 같다 (`git diff` 로 대조)

```bash
git diff HEAD~1 -- src/app/pages/Contact.tsx | grep -E '^[-+].*name="' | sort
```
Expected: `-` 와 `+` 의 `name=` 값 집합이 동일

- [ ] **Step 6: 커밋**

```bash
git add src/content/ko/contact.ts src/content/en/contact.ts src/content/index.ts src/content/site.json src/app/pages/Contact.tsx
git commit -m "$(cat <<'EOF'
feat: 문의 페이지를 새 디자인으로 전환하고 영문판을 붙인다

Formspree 전송 로직과 폼 필드 name 은 그대로 두고 외형만 바꿨다.
site.json 의 contactEmail 을 사전으로 옮겼다.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 7: 검증 범위 확대와 마감

`scripts/check-html.mjs` 는 현재 4개 경로만 본다. 전환한 페이지가 늘었으므로 같이 넓히지 않으면 커버리지가 계속 떨어진다.

**Files:**
- Modify: `scripts/check-html.mjs`
- Modify: `README.md`
- Modify: `docs/superpowers/REDESIGN_PLAN1_HANDOFF.md`

- [ ] **Step 1: 검사 경로 확대**

현재 검사하는 4개(`/`, `/en`, `/pricing`, `/demo`)에 이번에 전환한 경로를 더해 다음을 검사한다:

한국어: `/`, `/solution`, `/pricing`, `/demo`, `/contact`
영어: `/en`, `/en/solution`, `/en/pricing`, `/en/contact`

각 경로에 대해:
- 초기 HTML 에 본문이 있다 (빈 SPA 셸이 아니다)
- 영문 경로에 한글이 없다 (JSON-LD 포함, 기존 strip 규칙 유지)
- `<html lang>` 이 로케일과 맞는다
- 영문판이 있는 경로에만 hreflang 3줄이 있다
- 구브랜드 잔재(`CMO AI Agent`, `flow-form`)가 없다

경로 목록을 배열로 두고 반복하게 만들어, 계획 3에서 페이지가 늘 때 한 줄만 추가하면 되게 한다.

- [ ] **Step 2: 검사가 실제로 실패하는지 확인**

새로 추가한 경로 중 하나의 `dist` HTML 을 일부러 훼손하고 `node ./scripts/check-html.mjs` 를 돌려 잡히는지 확인한다. 실패 출력을 보고서에 붙인다.

- [ ] **Step 3: heading 방어를 산출 HTML 검사로 넣는다**

계획 1에서 홈의 06 섹션이 `<h2>` 없이 나갔고, `aria-labelledby` 가 `<p>` 안의 `<span>` 을 가리켜 문서 개요에서 한 섹션이 통째로 빠졌다. 그때 `src/app/pages/Home.test.tsx` 에 방어를 넣었지만 **그 테스트는 `Home()` 만 검사한다.**

> **실행 중 정정.** 초안은 그 테스트를 헬퍼로 뽑아 페이지마다 적용하라고 했다. Task 3 구현자가 더 나은 방법을 제안했고 채택한다 — **`check-html.mjs` 에서 프리렌더된 모든 페이지의 HTML 을 검사한다.** 페이지마다 테스트를 복제하지 않아도 되고, 페이지 컴포넌트가 훅을 쓰는 탓에 `environment: "node"` 에서 렌더할 수 없는 문제를 우회할 필요도 없으며, **아직 전환하지 않은 여섯 페이지까지 자동으로 덮인다.**

`scripts/check-html.mjs` 에 검사를 추가한다. 프리렌더된 **모든** 경로(18개)에 대해:

- `aria-labelledby="X"` 가 있으면, 같은 문서에 `id="X"` 를 가진 `h1`~`h6` 가 정확히 하나 있다
- 한 문서 안에서 `id` 가 중복되지 않는다
- 문서에 `h1` 이 정확히 하나 있다

정규식으로 HTML 을 훑는 방식이라 완벽한 파서는 아니다. 그 한계를 주석으로 남기고, **오탐이 아니라 미탐 쪽으로 기울게** 짠다 — 즉 확실히 위반인 경우만 실패시킨다.

**되돌림 증명:** 전환한 페이지 중 하나의 `dist` HTML 에서 `<h2>` 의 `id` 를 일부러 지우고 `node ./scripts/check-html.mjs` 가 잡는지 확인한 뒤 복구한다. 실제 출력을 보고서에 붙인다.

미전환 페이지 6개가 이 검사에서 실패한다면 그것은 **실제 결함을 발견한 것이다.** 그 경우 검사를 느슨하게 만들지 말고, 어느 페이지가 왜 실패하는지 보고하고 계획 3의 작업 목록에 올린다.

- [ ] **Step 4: 빌드 확인**

Run: `npm run build`
Expected: `[check-html] 통과`

- [ ] **Step 5: 문서 갱신**

`README.md` 의 자동 검증 절에 검사 경로가 9개로 늘었음을 반영한다.

`docs/superpowers/REDESIGN_PLAN1_HANDOFF.md` 의 릴리스 게이트를 갱신한다 — 이번 계획으로 `/en/solution`, `/en/pricing`, `/en/contact` 가 영문 본문을 갖게 됐으므로, 아직 한국어 본문인 영문 경로는 `/en/technology`, `/en/about`, `/en/ir` **3개로 줄었다.** 배포 가능 여부는 여전히 그 3개에 달려 있다.

- [ ] **Step 6: 커밋**

```bash
git add scripts/check-html.mjs README.md docs/superpowers/REDESIGN_PLAN1_HANDOFF.md src/app/pages/*.test.tsx
git commit -m "$(cat <<'EOF'
feat: 산출 HTML 검증 범위를 전환한 페이지까지 확대

검사 경로를 4개에서 9개로 늘리고, 경로 목록을 배열로 바꿔
이후 페이지가 늘 때 한 줄만 추가하면 되게 했다.

릴리스 게이트 갱신: 아직 한국어 본문인 영문 경로가 6개에서
3개(/en/technology, /en/about, /en/ir)로 줄었다.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

## 완료 기준

- [ ] `npm run build` 통과 (typecheck → 테스트 → 자산 → prerender → HTML 검증)
- [ ] `/solution`, `/pricing`, `/demo`, `/contact` 가 새 디자인
- [ ] `/en/solution`, `/en/pricing`, `/en/contact` 가 영문 카피
- [ ] 네 페이지에 `slate-*`, `cyan-*`, `indigo-*`, `pink-*` 가 없다
- [ ] 모든 내부 링크가 `LocaleLink` 를 통한다
- [ ] Demo 시뮬레이션과 Contact 폼이 전환 전과 같이 동작한다
- [ ] 375px 에서 네 페이지 모두 가로 스크롤이 없다
- [ ] 섹션마다 `aria-labelledby` 대상 heading 이 정확히 하나 있다

## 다음 계획

- **계획 3:** 기술·회사·앱·개인정보·약관 전환 + 영문 2개(`/en/technology`, `/en/about`). 완료 시 릴리스 게이트가 `/en/ir` 하나로 줄어든다.
- **계획 4:** IR 페이지(777줄) + `IRCharts` 차트 색 토큰화 + 영문판. 이 계획이 끝나면 배포 게이트가 해제된다.
- **계획 5:** 브랜드 자산과 GEO 마무리 — 파비콘, OG 카드, `FAQPage`/`Product`/`BreadcrumbList` 구조화 데이터, `llms.txt`, `robots.txt` AI 크롤러 허용, sitemap `xhtml:link` alternate.
