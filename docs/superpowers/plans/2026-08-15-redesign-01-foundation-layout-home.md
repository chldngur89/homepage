# WooriTeam 리디자인 1: 기반 · 레이아웃 · 홈

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 디자인 토큰·다국어 기반을 세우고, 공통 레이아웃과 홈페이지를 새 라이트 에디토리얼 디자인으로 전환한다.

**Architecture:** 브랜드 토큰을 `theme.css` 한 곳에 정의하고 Tailwind v4 `@theme`으로 유틸리티화한다. 카피는 언어별 타입 사전으로 분리해 번역 누락이 컴파일 에러로 잡히게 한다. 라우트는 `/`(한국어)와 `/en`(영어) 두 트리를 하나의 팩토리에서 생성하고, prerender가 두 트리를 모두 정적 HTML로 내보낸다. 제품 화면은 이미지가 아니라 React 컴포넌트로 그린다.

**Tech Stack:** Vite 6, React 18, React Router 7, TypeScript, Tailwind CSS 4, Vitest, Pretendard Variable

**설계 문서:** `docs/superpowers/specs/2026-08-15-homepage-redesign-design.md`

**이 계획의 범위:** 스펙 6절의 0~2단계. 완료 시점에 사이트는 **동작하는 상태**이며, 헤더·푸터·홈이 새 디자인이고 `/en/` 라우트가 살아 있다. 나머지 10개 페이지는 아직 이전 디자인이다(계획 2에서 전환).

## Global Constraints

- 브랜드 표기는 항상 `WooriTeam` / `우리팀`. 코드·문구 어디에도 `autocmo`, `AutoCMO`, `CMO AI Agent`, `ZeroSeller`를 남기지 않는다.
- 메인 CTA 문구는 한국어 `우리팀과 같이 성장하기`, 영어 `Grow with WooriTeam`. 변형하지 않는다.
- 핵심 루프 표기는 `제안 → 승인 → 실행 → 반복 성장` (화살표는 ` → `, 공백 포함).
- 새 코드에서 `slate-*`, `cyan-*`, `indigo-*`, `pink-*` Tailwind 색상 유틸리티를 사용하지 않는다. 브랜드 토큰 유틸리티만 사용한다.
- 본문 텍스트에 `word-break: keep-all`을 유지한다. 한글 줄바꿈의 전제다.
- 모든 애니메이션은 `prefers-reduced-motion: reduce`에서 비활성화되어야 한다.
- 영문판 대상은 7개 경로뿐이다: `/`, `/solution`, `/technology`, `/pricing`, `/about`, `/contact`, `/ir`. `/demo`, `/apps`, `/privacy`, `/terms`는 한국어만 존재한다.
- 커밋 메시지는 한국어로 쓰고 `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>`로 끝낸다.

## File Structure

**신규**

| 파일 | 책임 |
|------|------|
| `src/content/locales.ts` | `Locale` 타입, 지원 목록, 기본 로케일, 영문 지원 경로 목록 |
| `src/content/widen.ts` | 사전 타입을 리터럴에서 넓히는 `DeepWiden` |
| `src/content/ko/common.ts` | 한국어 공통 카피 (브랜드·네비·푸터·CTA) — 타입 원본 |
| `src/content/ko/home.ts` | 한국어 홈 카피 — 타입 원본 |
| `src/content/en/common.ts` | 영어 공통 카피 |
| `src/content/en/home.ts` | 영어 홈 카피 |
| `src/content/index.ts` | 사전 조합 + `Dictionary` 타입 |
| `src/app/i18n/LocaleContext.tsx` | 라우트에서 로케일을 읽어 하위에 제공 |
| `src/app/i18n/useCopy.ts` | 로케일에 맞는 사전 반환 |
| `src/app/i18n/localePath.ts` | 경로 ↔ 로케일 변환 |
| `src/app/components/ImageSlot.tsx` | 비율 고정 이미지 슬롯 |
| `src/app/config/images.ts` | 이미지 슬롯 레지스트리 |
| `src/app/components/mockups/ProposalCard.tsx` | 히어로 제품 화면 |
| `src/app/components/mockups/ChatThread.tsx` | 주간 제안 대화 화면 |
| `src/app/components/mockups/ResultDashboard.tsx` | 주간 결과 리포트 화면 |
| `src/app/components/mockups/frame.tsx` | 목업 3종이 공유하는 브라우저 프레임 |
| `scripts/make-sample-images.mjs` | 샘플 이미지 생성 |
| `scripts/check-html.mjs` | 빌드 산출 HTML 검증 |
| `vitest.config.ts` | 테스트 설정 |

**수정**

| 파일 | 변경 |
|------|------|
| `src/styles/theme.css` | 브랜드 토큰 + `@theme` 매핑 + shadcn 토큰 재매핑 |
| `src/styles/fonts.css` | Pretendard 로드 (현재 빈 파일) |
| `src/app/route-config.tsx` | 로케일 팩토리 + `prerenderRoutes` 18개 |
| `ssg/seo.ts` | `SITE_URL` 중앙화, 로케일별 메타, hreflang |
| `ssg/entry-server.tsx` | `SITE_URL` 재수출, `htmlLang` 반환 |
| `scripts/prerender.mjs` | `siteUrl` 중복 제거, `<html lang>` 주입, robots 확장 |
| `scripts/verify-assets.mjs` | flow 자산 제거, 샘플 이미지 경고 |
| `index.html` | `theme-color`, preconnect, 도메인 하드코딩 정리 |
| `src/app/components/Layout.tsx` | 헤더·푸터 전면 전환 |
| `src/app/pages/Home.tsx` | 7개 섹션 전면 전환 |
| `src/content/ir.ts` | 데이터 키 `autocmo` → `wooriteam` |
| `src/app/components/ir/IRCharts.tsx` | 동일 |
| `src/app/pages/IR.tsx` | 동일 |
| `package.json` | vitest, 스크립트 |

**삭제:** `public/flow/*.png` 4장, `src/imports/zeroseller-infographic.html`

---

### Task 1: 테스트 환경과 브랜드 토큰

디자인 원본의 `--ink3`(#8B8B85)는 `--ground`(#F7F7F4) 위에서 대비 **3.19:1**로 WCAG AA 본문 기준(4.5:1)에 미달한다. 이 색은 캡션·섹션 라벨에 13px 크기로 쓰인다. `#6F6F69`(4.71:1)로 조정한다. 이후 토큰을 바꿀 때 같은 실수를 반복하지 않도록 대비 검사를 테스트로 고정한다.

**Files:**
- Create: `vitest.config.ts`
- Create: `src/styles/tokens.ts`
- Create: `src/styles/tokens.test.ts`
- Modify: `src/styles/theme.css`
- Modify: `package.json`

**Interfaces:**
- Consumes: 없음
- Produces: `src/styles/tokens.ts`에서 `BRAND_TOKENS: Record<string, string>`, `contrastRatio(hexA: string, hexB: string): number` 수출. Task 12·13이 대비 검증에 사용한다.

- [ ] **Step 1: vitest 설치**

```bash
npm install -D vitest@3.2.4
```

- [ ] **Step 2: vitest 설정 작성**

`vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts", "src/**/*.test.tsx", "ssg/**/*.test.ts"],
  },
});
```

`package.json`의 `scripts`에 추가:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 3: 실패하는 테스트 작성**

`src/styles/tokens.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { BRAND_TOKENS, contrastRatio } from "./tokens";

describe("contrastRatio", () => {
  it("같은 색은 1:1", () => {
    expect(contrastRatio("#FFFFFF", "#FFFFFF")).toBeCloseTo(1, 2);
  });

  it("흑백은 21:1", () => {
    expect(contrastRatio("#000000", "#FFFFFF")).toBeCloseTo(21, 1);
  });
});

describe("브랜드 토큰 대비", () => {
  const ground = BRAND_TOKENS.ground;
  // keyof 로 좁히지 않으면 BRAND_TOKENS[token] 이 string 인덱스라 타입 에러가 난다
  const onGround: (keyof typeof BRAND_TOKENS)[] = ["ink", "ink2", "ink3", "brand"];

  it.each(onGround)("--%s 는 ground 위에서 4.5:1 이상", (token) => {
    expect(contrastRatio(BRAND_TOKENS[token], ground)).toBeGreaterThanOrEqual(4.5);
  });

  it("반전 섹션의 본문은 invert 위에서 4.5:1 이상", () => {
    expect(
      contrastRatio(BRAND_TOKENS.invertInk2, BRAND_TOKENS.invert),
    ).toBeGreaterThanOrEqual(4.5);
  });
});
```

- [ ] **Step 4: 테스트 실패 확인**

Run: `npm test`
Expected: FAIL — `Failed to resolve import "./tokens"`

- [ ] **Step 5: 토큰 모듈 구현**

`src/styles/tokens.ts`:

```ts
/**
 * theme.css 의 브랜드 토큰과 같은 값을 TypeScript 에서도 참조하기 위한 사본.
 * theme.css 를 고치면 이 파일도 함께 고쳐야 하며, tokens.test.ts 가 대비를 검증한다.
 */
export const BRAND_TOKENS = {
  ground: "#F7F7F4",
  surface: "#FFFFFF",
  panel: "#F0F0EC",
  ink: "#161616",
  ink2: "#5E5E59",
  // 디자인 원본은 #8B8B85 였으나 ground 위 대비가 3.19:1 로 AA 미달이라 조정함
  ink3: "#6F6F69",
  line: "#DEDED8",
  line2: "#E4E4DF",
  brand: "#4F6B5B",
  invert: "#111111",
  invertInk2: "#B9B9B3",
} as const satisfies Record<string, string>;

function channelToLinear(value: number) {
  const c = value / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function relativeLuminance(hex: string) {
  const normalized = hex.replace("#", "");
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);

  return (
    0.2126 * channelToLinear(r) +
    0.7152 * channelToLinear(g) +
    0.0722 * channelToLinear(b)
  );
}

export function contrastRatio(hexA: string, hexB: string) {
  const a = relativeLuminance(hexA);
  const b = relativeLuminance(hexB);
  const lighter = Math.max(a, b);
  const darker = Math.min(a, b);

  return (lighter + 0.05) / (darker + 0.05);
}
```

- [ ] **Step 6: 테스트 통과 확인**

Run: `npm test`
Expected: PASS — 7개 테스트 전부 통과

- [ ] **Step 7: theme.css 에 브랜드 토큰 정의**

`src/styles/theme.css` 최상단의 `@custom-variant dark (&:is(.dark *));` 바로 아래에 삽입하고, 기존 `:root` 블록의 shadcn 토큰 값을 브랜드 토큰 참조로 교체한다. `--radius`, `--font-size`, `--font-weight-*`, `--chart-*`, `--sidebar-*` 는 그대로 둔다.

```css
:root {
  /* 브랜드 토큰 — 값의 원본. src/styles/tokens.ts 와 동기화할 것 */
  --ground: #f7f7f4;
  --surface: #ffffff;
  --panel: #f0f0ec;
  --ink: #161616;
  --ink-2: #5e5e59;
  --ink-3: #6f6f69;
  --line: #deded8;
  --line-2: #e4e4df;
  --brand: #4f6b5b;
  --invert: #111111;
  --invert-ink-2: #b9b9b3;
}

/* shadcn 토큰을 브랜드 토큰 위에 재매핑한다.
   src/app/components/ui/* 의 radix 컴포넌트가 이 이름들을 참조하므로 제거하지 않는다. */
:root {
  --background: var(--ground);
  --foreground: var(--ink);
  --card: var(--surface);
  --card-foreground: var(--ink);
  --popover: var(--surface);
  --popover-foreground: var(--ink);
  --primary: var(--invert);
  --primary-foreground: #ffffff;
  --secondary: var(--panel);
  --secondary-foreground: var(--ink);
  --muted: var(--panel);
  --muted-foreground: var(--ink-3);
  --accent: var(--panel);
  --accent-foreground: var(--ink);
  --border: var(--line);
  --input: transparent;
  --input-background: var(--surface);
  --ring: var(--brand);
}

@theme inline {
  --color-ground: var(--ground);
  --color-surface: var(--surface);
  --color-panel: var(--panel);
  --color-ink: var(--ink);
  --color-ink-2: var(--ink-2);
  --color-ink-3: var(--ink-3);
  --color-line: var(--line);
  --color-line-2: var(--line-2);
  --color-brand: var(--brand);
  --color-invert: var(--invert);
  --color-invert-ink-2: var(--invert-ink-2);
}

@layer base {
  html,
  body {
    background: var(--ground);
    color: var(--ink);
    word-break: keep-all;
    -webkit-font-smoothing: antialiased;
  }

  ::selection {
    background: #e3e8e4;
  }

  :focus-visible {
    outline: 2px solid var(--brand);
    outline-offset: 2px;
  }
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.rise {
  animation: rise 0.55s cubic-bezier(0.2, 0.7, 0.2, 1) both;
}

@media (prefers-reduced-motion: reduce) {
  .rise {
    animation: none;
  }
}
```

기존 `.dark { ... }` 블록은 삭제한다. 새 디자인에 다크 모드가 없다.

- [ ] **Step 8: 개발 서버로 토큰 적용 확인**

Run: `npm run dev`
확인: `http://localhost:5173` 배경이 웜 오프화이트(#F7F7F4)로 바뀌었는지. 페이지 본문은 아직 다크 스타일이 하드코딩돼 있어 어색한 상태가 정상이다.

- [ ] **Step 9: 커밋**

```bash
git add vitest.config.ts package.json package-lock.json src/styles/tokens.ts src/styles/tokens.test.ts src/styles/theme.css
git commit -m "$(cat <<'EOF'
feat: 브랜드 디자인 토큰과 대비 검사 도입

디자인 원본의 ink3(#8B8B85)는 ground 위 대비 3.19:1 로 WCAG AA
본문 기준 미달이라 #6F6F69(4.71:1)로 조정했다. 캡션·섹션 라벨에
13px 로 쓰이는 색이다.

shadcn 토큰은 제거하지 않고 브랜드 토큰 위에 재매핑해
components/ui/* 의 radix 컴포넌트가 계속 동작하게 했다.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: Pretendard 서체

**Files:**
- Modify: `src/styles/fonts.css` (현재 빈 파일)
- Modify: `index.html`

**Interfaces:**
- Consumes: Task 1의 브랜드 토큰
- Produces: 전역 `font-family`. 이후 모든 태스크가 별도 지정 없이 사용한다.

- [ ] **Step 1: 폰트 CSS 작성**

`src/styles/fonts.css`:

```css
/* Pretendard 동적 서브셋 — 페이지에 실제로 쓰인 글자만 내려받는다.
   한글 가변 폰트 전체는 1MB 를 넘으므로 자체 호스팅보다 유리하다. */
@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css");

:root {
  --font-kr: "Pretendard Variable", Pretendard, system-ui, -apple-system,
    "Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
}

html,
body {
  font-family: var(--font-kr);
}
```

`src/styles/index.css`는 이미 `@import './fonts.css';`를 첫 줄에 두고 있으므로 수정하지 않는다.

- [ ] **Step 2: index.html 에 preconnect 와 theme-color 적용**

`index.html`의 `<meta name="theme-color" content="#0f172a" />`를 다음으로 교체한다:

```html
  <meta name="theme-color" content="#F7F7F4" />
  <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin />
```

- [ ] **Step 3: 폰트 적용 확인**

Run: `npm run dev`
확인: DevTools > Network 에서 `pretendardvariable` woff2 파일이 내려오는지. Elements 에서 `body`의 computed `font-family`가 `Pretendard Variable`로 시작하는지. 네트워크를 차단해도 시스템 폰트로 본문이 읽히는지.

- [ ] **Step 4: 커밋**

```bash
git add src/styles/fonts.css index.html
git commit -m "$(cat <<'EOF'
feat: Pretendard 동적 서브셋 적용

CDN 장애를 대비해 system-ui 폴백을 남기고, theme-color 를
다크(#0f172a)에서 새 배경색(#F7F7F4)으로 교체했다.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: SITE_URL 중앙화와 브랜드 명칭 정리

`ssg/seo.ts:1`과 `scripts/prerender.mjs:10`에 같은 도메인 문자열이 각각 하드코딩돼 있다. 한쪽만 고치면 canonical 과 sitemap 이 서로 다른 주소를 가리킨다. 하나로 합치고 환경변수로 주입한다. 동시에 코드에 남은 이전 브랜드 명칭을 정리한다.

**Files:**
- Create: `ssg/site.ts`
- Create: `ssg/site.test.ts`
- Modify: `ssg/seo.ts:1`
- Modify: `ssg/entry-server.tsx`
- Modify: `scripts/prerender.mjs:10`
- Modify: `src/content/ir.ts:46,307,313,319,325,331`
- Modify: `src/app/components/ir/IRCharts.tsx:43,129,130,132`
- Modify: `src/app/pages/IR.tsx:560`
- Modify: `index.html:16,20,23,29`
- Modify: `.env.example`
- Delete: `src/imports/zeroseller-infographic.html`

**Interfaces:**
- Consumes: 없음
- Produces: `ssg/site.ts`에서 `SITE_URL: string`, `absoluteUrl(pathname: string): string` 수출. Task 6이 canonical·hreflang 생성에 사용하고, `scripts/prerender.mjs`가 `entry-server`를 통해 재수출된 `SITE_URL`을 사용한다.

- [ ] **Step 1: 실패하는 테스트 작성**

`ssg/site.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { absoluteUrl, SITE_URL } from "./site";

describe("SITE_URL", () => {
  it("프로토콜을 포함하고 끝에 슬래시가 없다", () => {
    expect(SITE_URL).toMatch(/^https?:\/\//);
    expect(SITE_URL.endsWith("/")).toBe(false);
  });
});

describe("absoluteUrl", () => {
  it("루트 경로를 슬래시 하나로 만든다", () => {
    expect(absoluteUrl("/")).toBe(`${SITE_URL}/`);
  });

  it("하위 경로를 붙인다", () => {
    expect(absoluteUrl("/pricing")).toBe(`${SITE_URL}/pricing`);
  });

  it("경로가 겹쳐도 슬래시가 두 번 들어가지 않는다", () => {
    expect(absoluteUrl("//pricing")).not.toContain("///");
  });
});
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `npm test -- site`
Expected: FAIL — `Failed to resolve import "./site"`

- [ ] **Step 3: site.ts 구현**

`ssg/site.ts`:

```ts
/**
 * 사이트 절대 URL 의 유일한 정의처.
 * canonical, hreflang, sitemap, OG, JSON-LD 가 모두 이 값을 기준으로 생성된다.
 * 운영 도메인이 정해지면 VITE_SITE_URL 환경변수만 설정하면 된다.
 */
const FALLBACK_SITE_URL = "https://autocmo.com";

function readSiteUrl() {
  // Vite 는 빌드 시 import.meta.env.VITE_SITE_URL 을 리터럴로 치환한다.
  // vitest 와 node 실행 경로에서는 값이 없으므로 process.env 로 떨어진다.
  // `as` 캐스팅 없이 쓰면 tsconfig 에 vite/client 타입이 없을 때 에러가 난다.
  const fromVite = (import.meta as { env?: Record<string, string | undefined> }).env
    ?.VITE_SITE_URL;
  const fromNode =
    typeof process !== "undefined" ? process.env?.VITE_SITE_URL : undefined;

  return (fromVite ?? fromNode ?? FALLBACK_SITE_URL).replace(/\/+$/, "");
}

export const SITE_URL = readSiteUrl();

export function absoluteUrl(pathname: string) {
  const normalized = `/${pathname.replace(/^\/+/, "")}`;
  return `${SITE_URL}${normalized}`;
}
```

- [ ] **Step 4: 테스트 통과 확인**

Run: `npm test -- site`
Expected: PASS — 4개 테스트 통과

- [ ] **Step 5: seo.ts 와 entry-server.tsx 연결**

`ssg/seo.ts` 1행 `const SITE_URL = "https://autocmo.com";`을 삭제하고 최상단에 삽입:

```ts
import { SITE_URL } from "./site";
```

`ssg/entry-server.tsx`의 `export { notFoundRoute, prerenderRoutes };`를 다음으로 교체:

```tsx
export { notFoundRoute, prerenderRoutes };
export { SITE_URL } from "./site";
```

- [ ] **Step 6: prerender.mjs 의 중복 상수 제거**

`scripts/prerender.mjs` 10행 `const siteUrl = "https://autocmo.com";`을 삭제한다. `main()` 안에서 renderer 를 로드한 뒤 값을 받아, `writeSitemap`과 `writeRobots`에 인자로 넘긴다.

`writeSitemap`과 `writeRobots` 시그니처를 변경:

```js
async function writeSitemap(routes, siteUrl) {
```

```js
async function writeRobots(siteUrl) {
```

`main()` 안 호출부를 변경:

```js
  await writeSitemap(renderer.prerenderRoutes, renderer.SITE_URL);
  await writeRobots(renderer.SITE_URL);
```

- [ ] **Step 7: .env.example 에 항목 추가**

`.env.example` 끝에 추가:

```bash
# 운영 도메인. 미설정 시 https://autocmo.com 을 사용한다.
# canonical, hreflang, sitemap, OG, JSON-LD 가 모두 이 값을 따른다.
VITE_SITE_URL=
```

- [ ] **Step 8: IR 차트의 데이터 키 개명**

`autocmo` → `wooriteam`. 4개 파일에서 일괄 치환한다.

```bash
sed -i '' 's/\bautocmo\b/wooriteam/g' src/content/ir.ts src/app/components/ir/IRCharts.tsx src/app/pages/IR.tsx
```

확인: `grep -rn "autocmo" src/ ssg/ scripts/` 결과가 비어 있어야 한다.

- [ ] **Step 9: index.html 의 도메인 하드코딩 정리**

`<!--app-head:start-->`와 `<!--app-head:end-->` 사이는 prerender 가 통째로 교체하므로, 여기 있는 값은 프리렌더되지 않은 경로에서만 보이는 폴백이다. `flow-form.png`를 가리키는 OG 이미지 두 줄을 제거하고 나머지는 남긴다.

`index.html`에서 다음 두 줄을 삭제한다:

```html
  <meta property="og:image" content="https://autocmo.com/flow/flow-form.png" />
  <meta name="twitter:image" content="https://autocmo.com/flow/flow-form.png" />
```

함께 붙어 있는 `og:image:width` / `og:image:height` 두 줄도 삭제한다. OG 이미지는 계획 3에서 새로 만들어 다시 넣는다.

- [ ] **Step 10: 고아 파일 삭제**

```bash
git rm src/imports/zeroseller-infographic.html
```

이 파일은 어디서도 참조되지 않으며 "ZeroSeller - AI CMO Infographic", "당신만의 AutoCMO" 문구를 포함한다.

- [ ] **Step 11: 빌드로 회귀 확인**

Run: `npm run build`
Expected: 성공. `dist/sitemap.xml`과 `dist/robots.txt`에 도메인이 정상 출력되는지 확인한다.

Run: `grep -c "autocmo" dist/sitemap.xml`
Expected: prerender 되는 라우트 수와 같은 값 (이 시점에는 `11`). sitemap 은 라우트마다
`<loc>` 한 줄을 내므로 도메인이 그만큼 반복된다. 브랜드 문자열로서의 노출이 아니라
도메인이며, `VITE_SITE_URL` 설정 시 함께 바뀐다.

- [ ] **Step 12: 커밋**

```bash
git add -A ssg scripts src/content/ir.ts src/app/components/ir/IRCharts.tsx src/app/pages/IR.tsx index.html .env.example
git commit -m "$(cat <<'EOF'
refactor: SITE_URL 중앙화와 브랜드 명칭 정리

같은 도메인 문자열이 ssg/seo.ts 와 scripts/prerender.mjs 에
따로 하드코딩돼 있어, 한쪽만 고치면 canonical 과 sitemap 이
어긋나는 구조였다. ssg/site.ts 하나로 합치고 VITE_SITE_URL 로
주입받게 했다.

IR 차트 데이터 키 autocmo 를 wooriteam 으로 개명했다.
화면 라벨은 이미 WooriTeam 이었으나 코드가 따라오지 않았다.

참조되지 않는 zeroseller-infographic.html 을 삭제했다.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: 다국어 기반

한국어 사전이 타입의 원본이다. 영어 사전은 같은 타입을 구현해야 하므로 **번역 누락은 컴파일 에러로 잡힌다.**

**Files:**
- Create: `src/content/locales.ts`
- Create: `src/content/widen.ts`
- Create: `src/content/ko/common.ts`
- Create: `src/content/en/common.ts`
- Create: `src/content/index.ts`
- Create: `src/app/i18n/localePath.ts`
- Create: `src/app/i18n/localePath.test.ts`
- Create: `src/app/i18n/LocaleContext.tsx`
- Create: `src/app/i18n/useCopy.ts`

**Interfaces:**
- Consumes: 없음
- Produces:
  - `locales.ts`: `type Locale = "ko" | "en"`, `LOCALES: readonly Locale[]`, `DEFAULT_LOCALE: Locale`, `EN_ROUTES: readonly string[]`
  - `localePath.ts`: `localePath(path: string, locale: Locale): string`, `stripLocale(pathname: string): { locale: Locale; path: string }`, `hasEnglish(path: string): boolean`
  - `index.ts`: `type Dictionary`, `dictionaries: Record<Locale, Dictionary>`
  - `LocaleContext.tsx`: `<LocaleProvider>`, `useLocale(): Locale`
  - `useCopy.ts`: `useCopy(): Dictionary`

- [ ] **Step 1: 로케일 정의 작성**

`src/content/locales.ts`:

```ts
export type Locale = "ko" | "en";

export const LOCALES = ["ko", "en"] as const satisfies readonly Locale[];

export const DEFAULT_LOCALE: Locale = "ko";

/** 영문판이 존재하는 경로. 이 목록에 없으면 영문 화면에서도 한국어 경로로 이동한다. */
export const EN_ROUTES = [
  "/",
  "/solution",
  "/technology",
  "/pricing",
  "/about",
  "/contact",
  "/ir",
] as const satisfies readonly string[];
```

- [ ] **Step 2: 실패하는 테스트 작성**

`src/app/i18n/localePath.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { hasEnglish, localePath, stripLocale } from "./localePath";

describe("localePath", () => {
  it("한국어는 경로를 그대로 둔다", () => {
    expect(localePath("/pricing", "ko")).toBe("/pricing");
    expect(localePath("/", "ko")).toBe("/");
  });

  it("영어는 /en 을 앞에 붙인다", () => {
    expect(localePath("/pricing", "en")).toBe("/en/pricing");
  });

  it("영어 루트는 /en 이다", () => {
    expect(localePath("/", "en")).toBe("/en");
  });

  it("영문판이 없는 경로는 영어에서도 한국어 경로를 준다", () => {
    expect(localePath("/demo", "en")).toBe("/demo");
    expect(localePath("/privacy", "en")).toBe("/privacy");
  });
});

describe("stripLocale", () => {
  it("한국어 경로를 그대로 돌려준다", () => {
    expect(stripLocale("/pricing")).toEqual({ locale: "ko", path: "/pricing" });
  });

  it("/en 접두사를 떼고 영어로 표시한다", () => {
    expect(stripLocale("/en/pricing")).toEqual({ locale: "en", path: "/pricing" });
  });

  it("/en 자체는 영어 루트다", () => {
    expect(stripLocale("/en")).toEqual({ locale: "en", path: "/" });
  });

  it("경로 안에 en 이 들어간 것과 혼동하지 않는다", () => {
    expect(stripLocale("/enterprise")).toEqual({ locale: "ko", path: "/enterprise" });
  });
});

describe("hasEnglish", () => {
  it("영문판 유무를 알려준다", () => {
    expect(hasEnglish("/pricing")).toBe(true);
    expect(hasEnglish("/demo")).toBe(false);
  });
});
```

- [ ] **Step 3: 테스트 실패 확인**

Run: `npm test -- localePath`
Expected: FAIL — `Failed to resolve import "./localePath"`

- [ ] **Step 4: localePath 구현**

`src/app/i18n/localePath.ts`:

```ts
import { DEFAULT_LOCALE, EN_ROUTES, type Locale } from "@/content/locales";

const EN_PREFIX = "/en";

export function hasEnglish(path: string) {
  return (EN_ROUTES as readonly string[]).includes(path);
}

/** 한국어 기준 경로를 해당 로케일의 실제 경로로 바꾼다. */
export function localePath(path: string, locale: Locale) {
  if (locale === DEFAULT_LOCALE || !hasEnglish(path)) {
    return path;
  }

  return path === "/" ? EN_PREFIX : `${EN_PREFIX}${path}`;
}

/** 실제 경로에서 로케일과 한국어 기준 경로를 분리한다. */
export function stripLocale(pathname: string): { locale: Locale; path: string } {
  if (pathname === EN_PREFIX || pathname === `${EN_PREFIX}/`) {
    return { locale: "en", path: "/" };
  }

  if (pathname.startsWith(`${EN_PREFIX}/`)) {
    return { locale: "en", path: pathname.slice(EN_PREFIX.length) };
  }

  return { locale: DEFAULT_LOCALE, path: pathname };
}
```

- [ ] **Step 5: 테스트 통과 확인**

Run: `npm test -- localePath`
Expected: PASS — 9개 테스트 통과

- [ ] **Step 6: 한국어 공통 사전 작성 (타입 원본)**

`src/content/ko/common.ts`:

```ts
export const common = {
  brand: {
    nameKo: "우리팀",
    nameEn: "WOORITEAM",
    tagline: "창업자의 첫 번째 팀",
  },
  cta: {
    primary: "우리팀과 같이 성장하기",
    secondary: "어떻게 일하는지 보기",
    demo: "데모 보기",
  },
  nav: {
    solution: "솔루션",
    technology: "기술",
    pricing: "요금",
    demo: "데모",
    apps: "Apps",
    about: "회사",
    ir: "IR",
    contact: "문의",
  },
  a11y: {
    home: "우리팀 홈",
    mainNav: "주요 메뉴",
    mobileNav: "모바일 메뉴",
    openMenu: "메뉴 열기",
    closeMenu: "메뉴 닫기",
    switchLang: "언어 전환 / Switch language",
  },
  footer: {
    groups: {
      product: "PRODUCT",
      company: "COMPANY",
      legal: "LEGAL",
    },
    links: {
      privacy: "개인정보처리방침",
      terms: "이용약관",
      about: "회사 소개",
      contact: "문의하기",
    },
    copyright: "© 2026 WooriTeam. All rights reserved.",
  },
  langLabel: "EN",
} as const;

export type CommonCopy = typeof common;
```

- [ ] **Step 6b: DeepWiden 타입 작성**

세 개의 영어 사전(`common`, `mockups`, `home`)이 공유한다. 한 곳에서만 정의한다.

`src/content/widen.ts`:

```ts
/**
 * 한국어 사전은 as const 라 값이 리터럴 타입으로 굳는다("우리팀" 타입).
 * 영어 사전이 같은 타입을 그대로 구현하면 영어 문자열을 넣을 수 없으므로,
 * 구조는 유지하되 리프의 리터럴만 넓힌다.
 * 항목이 빠지면 여전히 컴파일 에러가 나므로 번역 누락은 계속 잡힌다.
 */
export type DeepWiden<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends readonly (infer U)[]
        ? DeepWiden<U>[]
        : { [K in keyof T]: DeepWiden<T[K]> };
```

- [ ] **Step 7: 영어 공통 사전 작성**

`src/content/en/common.ts`:

```ts
import type { CommonCopy } from "../ko/common";
import type { DeepWiden } from "../widen";

/** 한국어 사전이 타입의 원본이다. 항목이 빠지면 이 파일이 컴파일되지 않는다. */
export const common: DeepWiden<CommonCopy> = {
  brand: {
    nameKo: "WooriTeam",
    nameEn: "WOORITEAM",
    tagline: "A founder's first team",
  },
  cta: {
    primary: "Grow with WooriTeam",
    secondary: "See how it works",
    demo: "See the demo",
  },
  nav: {
    solution: "Solution",
    technology: "Technology",
    pricing: "Pricing",
    demo: "Demo",
    apps: "Apps",
    about: "About",
    ir: "IR",
    contact: "Contact",
  },
  a11y: {
    home: "WooriTeam home",
    mainNav: "Main navigation",
    mobileNav: "Mobile navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    switchLang: "Switch language / 언어 전환",
  },
  footer: {
    groups: {
      product: "PRODUCT",
      company: "COMPANY",
      legal: "LEGAL",
    },
    links: {
      privacy: "Privacy",
      terms: "Terms",
      about: "About",
      contact: "Contact",
    },
    copyright: "© 2026 WooriTeam. All rights reserved.",
  },
  langLabel: "KO",
};
```

- [ ] **Step 8: 사전 조합**

`src/content/index.ts`:

```ts
import type { Locale } from "./locales";
import { common as koCommon } from "./ko/common";
import { common as enCommon } from "./en/common";

export type Dictionary = {
  common: typeof koCommon;
};

export const dictionaries = {
  ko: { common: koCommon },
  en: { common: enCommon },
} as unknown as Record<Locale, Dictionary>;
```

- [ ] **Step 9: LocaleContext 와 useCopy 작성**

`src/app/i18n/LocaleContext.tsx`:

```tsx
import { createContext, useContext, type ReactNode } from "react";
import { DEFAULT_LOCALE, type Locale } from "@/content/locales";

const LocaleContext = createContext<Locale>(DEFAULT_LOCALE);

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  return useContext(LocaleContext);
}
```

`src/app/i18n/useCopy.ts`:

```ts
import { dictionaries, type Dictionary } from "@/content";
import { useLocale } from "./LocaleContext";

export function useCopy(): Dictionary {
  return dictionaries[useLocale()];
}
```

- [ ] **Step 10: 타입 검사와 테스트**

Run: `npx tsc --noEmit`
Expected: 에러 없음

Run: `npm test`
Expected: PASS — 전체 통과

- [ ] **Step 11: 번역 누락이 실제로 잡히는지 확인**

`src/content/en/common.ts`에서 `cta.demo` 줄을 잠시 주석 처리하고:

Run: `npx tsc --noEmit`
Expected: FAIL — `Property 'demo' is missing in type ...`

확인 후 주석을 되돌린다.

- [ ] **Step 12: 커밋**

```bash
git add src/content src/app/i18n
git commit -m "$(cat <<'EOF'
feat: 다국어 기반 도입

한국어 사전을 타입의 원본으로 두고 영어 사전이 같은 타입을
구현하게 했다. 번역 항목이 빠지면 컴파일 단계에서 잡힌다.

영문판이 없는 경로(/demo, /apps, /privacy, /terms)는
localePath 가 영어 로케일에서도 한국어 경로를 돌려준다.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 5: /en 라우트와 prerender 경로

**Files:**
- Modify: `src/app/route-config.tsx`
- Create: `src/app/route-config.test.ts`

**Interfaces:**
- Consumes: Task 4의 `LOCALES`, `EN_ROUTES`, `localePath`, `LocaleProvider`
- Produces: `appRoutes: RouteObject[]` (양쪽 로케일 포함), `prerenderRoutes: string[]` (18개), `notFoundRoute: string`

- [ ] **Step 1: 실패하는 테스트 작성**

`src/app/route-config.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { prerenderRoutes } from "./route-config";

describe("prerenderRoutes", () => {
  it("한국어 11개와 영어 7개, 합쳐서 18개다", () => {
    expect(prerenderRoutes).toHaveLength(18);
  });

  it("한국어 경로를 모두 포함한다", () => {
    for (const path of [
      "/", "/solution", "/technology", "/pricing", "/demo",
      "/apps", "/about", "/contact", "/ir", "/privacy", "/terms",
    ]) {
      expect(prerenderRoutes).toContain(path);
    }
  });

  it("영어 경로 7개를 포함한다", () => {
    for (const path of [
      "/en", "/en/solution", "/en/technology", "/en/pricing",
      "/en/about", "/en/contact", "/en/ir",
    ]) {
      expect(prerenderRoutes).toContain(path);
    }
  });

  it("영문판이 없는 경로의 /en 판을 만들지 않는다", () => {
    for (const path of ["/en/demo", "/en/apps", "/en/privacy", "/en/terms"]) {
      expect(prerenderRoutes).not.toContain(path);
    }
  });

  it("중복이 없다", () => {
    expect(new Set(prerenderRoutes).size).toBe(prerenderRoutes.length);
  });
});
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `npm test -- route-config`
Expected: FAIL — 길이가 18이 아니라 12

- [ ] **Step 3: route-config 를 로케일 팩토리로 재작성**

`src/app/route-config.tsx` 전체를 교체한다:

```tsx
import type { ReactNode } from "react";
import type { RouteObject } from "react-router";
import { Layout } from "./components/Layout";
import { ScrollRoot } from "./components/ScrollRoot";
import { LocaleProvider } from "./i18n/LocaleContext";
import { EN_ROUTES, type Locale } from "@/content/locales";
import Home from "./pages/Home";
import Solution from "./pages/Solution";
import Technology from "./pages/Technology";
import Pricing from "./pages/Pricing";
import Demo from "./pages/Demo";
import About from "./pages/About";
import Contact from "./pages/Contact";
import IR from "./pages/IR";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Apps from "./pages/Apps";
import NotFound from "./pages/NotFound";

/** 레이아웃 안에 들어가는 페이지. path 는 한국어 기준 경로다. */
const layoutPages = [
  { path: "/", Component: Home, index: true },
  { path: "/solution", Component: Solution },
  { path: "/technology", Component: Technology },
  { path: "/pricing", Component: Pricing },
  { path: "/demo", Component: Demo },
  { path: "/apps", Component: Apps },
  { path: "/about", Component: About },
  { path: "/contact", Component: Contact },
  { path: "/privacy", Component: Privacy },
  { path: "/terms", Component: Terms },
] as const;

/** 레이아웃 밖의 페이지. IR 은 자체 셸을 쓴다. */
const standalonePages = [{ path: "/ir", Component: IR }] as const;

function localeWrapper(locale: Locale) {
  return function LocaleBoundary({ children }: { children: ReactNode }) {
    return <LocaleProvider locale={locale}>{children}</LocaleProvider>;
  };
}

function buildLocaleRoutes(locale: Locale): RouteObject[] {
  const prefix = locale === "en" ? "/en" : "";
  const available = (path: string) =>
    locale === "ko" || (EN_ROUTES as readonly string[]).includes(path);

  const Wrapper = localeWrapper(locale);

  const layoutChildren: RouteObject[] = layoutPages
    .filter((page) => available(page.path))
    .map((page) =>
      page.path === "/"
        ? { index: true, Component: page.Component }
        : { path: page.path.slice(1), Component: page.Component },
    );

  const routes: RouteObject[] = [
    {
      path: prefix === "" ? "/" : prefix,
      element: (
        <Wrapper>
          <Layout />
        </Wrapper>
      ),
      children: layoutChildren,
    },
  ];

  for (const page of standalonePages) {
    if (!available(page.path)) continue;
    const { Component } = page;
    routes.push({
      path: `${prefix}${page.path}`,
      element: (
        <Wrapper>
          <Component />
        </Wrapper>
      ),
    });
  }

  return routes;
}

export const appRoutes: RouteObject[] = [
  {
    Component: ScrollRoot,
    children: [
      ...buildLocaleRoutes("ko"),
      ...buildLocaleRoutes("en"),
      { path: "*", Component: NotFound },
    ],
  },
];

const koRoutes = [
  ...layoutPages.map((page) => page.path),
  ...standalonePages.map((page) => page.path),
];

const enRoutes = EN_ROUTES.map((path) => (path === "/" ? "/en" : `/en${path}`));

export const prerenderRoutes: string[] = [...koRoutes, ...enRoutes];

export const notFoundRoute = "/404";
```

- [ ] **Step 4: 테스트 통과 확인**

Run: `npm test -- route-config`
Expected: PASS — 5개 테스트 통과

- [ ] **Step 5: 개발 서버에서 라우트 확인**

Run: `npm run dev`
확인:
- `http://localhost:5173/` — 한국어 홈이 뜬다
- `http://localhost:5173/en` — 같은 홈이 뜬다 (아직 카피는 한국어. Task 12에서 전환)
- `http://localhost:5173/en/pricing` — 요금 페이지가 뜬다
- `http://localhost:5173/en/demo` — 404 가 뜬다 (영문판 없음. 의도된 동작)

- [ ] **Step 6: 커밋**

```bash
git add src/app/route-config.tsx src/app/route-config.test.ts
git commit -m "$(cat <<'EOF'
feat: /en 라우트 트리 추가

한국어·영어 라우트를 하나의 팩토리에서 생성한다. 페이지를
추가할 때 목록 한 곳만 고치면 두 로케일에 함께 반영된다.

prerenderRoutes 는 한국어 11 + 영어 7 = 18개.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 6: 로케일별 SEO 와 hreflang

`index.html`의 `<html lang="ko">`가 고정이라 영문 페이지도 `lang="ko"`로 나간다. 스크린리더와 검색엔진이 잘못 읽는다. prerender 가 로케일에 맞게 교체하도록 만든다.

**Files:**
- Modify: `ssg/seo.ts`
- Create: `ssg/seo.test.ts`
- Modify: `ssg/entry-server.tsx`
- Modify: `scripts/prerender.mjs`

**Interfaces:**
- Consumes: Task 3의 `SITE_URL`·`absoluteUrl`, Task 4의 `stripLocale`·`hasEnglish`, Task 5의 `prerenderRoutes`
- Produces: `renderSeoTags(pathname: string): string` (hreflang 포함), `htmlLangFor(pathname: string): "ko" | "en"`. `render()`가 `{ appHtml, headTags, htmlLang }`을 반환한다.

- [ ] **Step 1: 실패하는 테스트 작성**

`ssg/seo.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { htmlLangFor, renderSeoTags } from "./seo";

describe("htmlLangFor", () => {
  it("한국어 경로는 ko", () => {
    expect(htmlLangFor("/pricing")).toBe("ko");
  });

  it("영어 경로는 en", () => {
    expect(htmlLangFor("/en/pricing")).toBe("en");
    expect(htmlLangFor("/en")).toBe("en");
  });
});

describe("renderSeoTags", () => {
  it("영문판이 있는 경로에 hreflang 세 줄을 낸다", () => {
    const tags = renderSeoTags("/pricing");
    expect(tags).toContain('hreflang="ko"');
    expect(tags).toContain('hreflang="en"');
    expect(tags).toContain('hreflang="x-default"');
  });

  it("영문판이 없는 경로에는 hreflang 을 내지 않는다", () => {
    expect(renderSeoTags("/demo")).not.toContain("hreflang");
  });

  it("영어 페이지의 canonical 은 /en 을 포함한다", () => {
    expect(renderSeoTags("/en/pricing")).toContain('rel="canonical" href="');
    expect(renderSeoTags("/en/pricing")).toContain("/en/pricing");
  });

  it("영어 페이지의 og:locale 은 en_US 다", () => {
    expect(renderSeoTags("/en")).toContain('content="en_US"');
    expect(renderSeoTags("/")).toContain('content="ko_KR"');
  });

  it("영어 페이지의 title 에 한글이 없다", () => {
    const tags = renderSeoTags("/en");
    const title = tags.match(/<title>(.*?)<\/title>/)?.[1] ?? "";
    expect(title).not.toMatch(/[가-힣]/);
  });

  it("구조화 데이터의 inLanguage 가 로케일을 따른다", () => {
    expect(renderSeoTags("/en")).toContain("en-US");
    expect(renderSeoTags("/")).toContain("ko-KR");
  });
});
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `npm test -- seo`
Expected: FAIL — `htmlLangFor` 가 수출되지 않음

- [ ] **Step 3: seo.ts 를 로케일 대응으로 개편**

`ssg/seo.ts`에서 `routeSeo` 상수를 `SEO_BY_LOCALE`로 바꾼다. 기존 한국어 항목 11개는 `ko` 아래로 그대로 옮기고, `en` 7개를 새로 작성한다.

```ts
import { SITE_URL, absoluteUrl } from "./site";
import { hasEnglish, stripLocale } from "../src/app/i18n/localePath";
import type { Locale } from "../src/content/locales";

const SEO_BY_LOCALE: Record<Locale, Record<string, SeoConfig>> = {
  ko: {
    // 기존 routeSeo 객체의 중괄호 안 내용을 그대로 옮긴다.
    // 11개 키: "/", "/solution", "/technology", "/pricing", "/demo",
    // "/apps", "/about", "/contact", "/ir", "/privacy", "/terms".
    // 문구는 손대지 않는다. 옮긴 뒤 `const routeSeo` 선언 자체를 삭제하고,
    // 파일 안에서 routeSeo 를 참조하던 곳을 SEO_BY_LOCALE.ko 로 바꾼다
    // (buildStructuredData 의 `routeSeo["/"].description` 한 곳).
  },
  en: {
    "/": {
      title: "WooriTeam – A founder's first team",
      description:
        "For founders running growth without a marketer. WooriTeam proposes the week, gets your approval, executes, and folds results into the next cycle.",
    },
    "/solution": {
      title: "Solution | WooriTeam",
      description:
        "How WooriTeam works through propose, approve, execute and repeat — and how that differs from a chat AI tool.",
    },
    "/technology": {
      title: "Technology | WooriTeam",
      description:
        "The growth pipeline behind WooriTeam, from weekly proposals through execution and feedback.",
    },
    "/pricing": {
      title: "Pricing | WooriTeam",
      description:
        "Free trial, Pro and Team plans for growing with WooriTeam, with answers to common questions.",
    },
    "/about": {
      title: "About | WooriTeam",
      description:
        "WooriTeam gives early-stage teams their first teammate for growth. Our mission and direction.",
    },
    "/contact": {
      title: "Contact | WooriTeam",
      description:
        "Get in touch with WooriTeam about the product, investor meetings, or partnerships.",
    },
    "/ir": {
      title: "Investor Overview | WooriTeam",
      description:
        "Investor summary: the marketer gap in early-stage teams, WooriTeam's growth loop, and target scenarios.",
    },
  },
};

const KEYWORDS_BY_LOCALE: Record<Locale, string[]> = {
  ko: [
    "WooriTeam", "우리팀", "같이 성장하기", "창업자의 첫 번째 팀",
    "초기 창업 마케팅", "스타트업 마케팅", "1인 창업",
  ],
  en: [
    "WooriTeam", "founder's first team", "startup marketing",
    "early stage growth", "AI marketing teammate",
  ],
};

const HTML_LANG: Record<Locale, string> = { ko: "ko", en: "en" };
const OG_LOCALE: Record<Locale, string> = { ko: "ko_KR", en: "en_US" };
const IN_LANGUAGE: Record<Locale, string> = { ko: "ko-KR", en: "en-US" };

export function htmlLangFor(pathname: string) {
  return HTML_LANG[stripLocale(normalizePath(pathname)).locale];
}
```

`getSeoForPath`를 다음과 같이 바꾼다:

```ts
export function getSeoForPath(pathname: string): ResolvedSeo {
  const normalizedPath = normalizePath(pathname);
  const { locale, path } = stripLocale(normalizedPath);
  const table = SEO_BY_LOCALE[locale];
  const seo = table[path] ?? table["/"];
  const canonicalUrl =
    normalizedPath === "/404" ? undefined : absoluteUrl(normalizedPath);

  return {
    ...seo,
    locale,
    basePath: path,
    path: normalizedPath,
    canonicalUrl,
    keywords: KEYWORDS_BY_LOCALE[locale],
    robots: seo.robots ?? "index, follow",
    structuredData: buildStructuredData(normalizedPath, seo, locale),
  };
}
```

`buildStructuredData`의 `inLanguage: "ko-KR"` 두 곳을 `inLanguage: IN_LANGUAGE[locale]`로 바꾸고, 시그니처에 `locale: Locale`을 추가한다.

`renderSeoTags`에서 `og:locale` 줄을 다음으로 바꾸고:

```ts
    `<meta property="og:locale" content="${OG_LOCALE[seo.locale]}" />`,
```

hreflang 블록을 canonical 다음에 삽입한다:

```ts
    ...(hasEnglish(seo.basePath) && seo.path !== "/404"
      ? [
          `<link rel="alternate" hreflang="ko" href="${absoluteUrl(seo.basePath)}" />`,
          `<link rel="alternate" hreflang="en" href="${absoluteUrl(
            seo.basePath === "/" ? "/en" : `/en${seo.basePath}`,
          )}" />`,
          `<link rel="alternate" hreflang="x-default" href="${absoluteUrl(seo.basePath)}" />`,
        ]
      : []),
```

OG 이미지 관련 4줄(`og:image`, `og:image:width`, `og:image:height`, `twitter:image`)은 이번 계획에서 제거한다. 계획 3에서 새 OG 카드로 되살린다. `ResolvedSeo` 타입에서 `ogImageUrl` / `ogImageWidth` / `ogImageHeight` 필드와 `OG_IMAGE_*` 상수도 함께 제거한다.

`ResolvedSeo` 타입에 필드 두 개를 추가한다:

```ts
  locale: Locale;
  basePath: string;
```

- [ ] **Step 4: 테스트 통과 확인**

Run: `npm test -- seo`
Expected: PASS — 8개 테스트 통과

- [ ] **Step 5: entry-server 가 htmlLang 을 반환하도록 수정**

`ssg/entry-server.tsx`의 `render` 반환값에 추가:

```tsx
import { htmlLangFor, renderSeoTags } from "./seo";

// ...

  return {
    appHtml,
    headTags: renderSeoTags(pathname),
    htmlLang: htmlLangFor(pathname),
  };
```

- [ ] **Step 6: prerender 가 html lang 을 교체하도록 수정**

`scripts/prerender.mjs`의 `injectHtml`을 다음으로 교체:

```js
function injectHtml(template, { appHtml, headTags, htmlLang }) {
  return template
    .replace(/<html lang="[^"]*">/, `<html lang="${htmlLang}">`)
    .replace(
      /<!--app-head:start-->[\s\S]*?<!--app-head:end-->/,
      `<!--app-head:start-->\n  ${headTags}\n  <!--app-head:end-->`,
    )
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
}
```

- [ ] **Step 7: 빌드해서 산출물 확인**

Run: `npm run build`

```bash
grep -o '<html lang="[^"]*"' dist/index.html dist/en/index.html
```
Expected: `dist/index.html:<html lang="ko"` 와 `dist/en/index.html:<html lang="en"`

```bash
grep -c "hreflang" dist/pricing/index.html
```
Expected: `3`

```bash
grep -c "hreflang" dist/demo/index.html
```
Expected: `0`

- [ ] **Step 8: 커밋**

```bash
git add ssg scripts/prerender.mjs
git commit -m "$(cat <<'EOF'
feat: 로케일별 SEO 와 hreflang

index.html 의 html lang 이 ko 로 고정돼 있어 영문 페이지도
ko 로 나가던 문제를 prerender 단계에서 교체하도록 고쳤다.

영문판이 있는 7개 경로에만 hreflang(ko/en/x-default)을 내고,
og:locale 과 JSON-LD 의 inLanguage 도 로케일을 따르게 했다.

OG 이미지는 깨진 flow-form.png 를 가리키고 있어 일단 제거했다.
새 OG 카드는 계획 3에서 넣는다.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 7: 이미지 슬롯과 샘플

**Files:**
- Create: `src/app/config/images.ts`
- Create: `src/app/config/images.test.ts`
- Create: `src/app/components/ImageSlot.tsx`
- Create: `scripts/make-sample-images.mjs`
- Modify: `scripts/verify-assets.mjs`
- Delete: `public/flow/flow-scenario.png`, `public/flow/flow-form.png`, `public/flow/flow-watermelon.png`, `public/flow/flow-dashboard.png`

**Interfaces:**
- Consumes: Task 1의 브랜드 토큰
- Produces:
  - `images.ts`: `type ImageSlotId = "persona" | "voice-1" | "voice-2" | "footer-wide"`, `IMAGE_SLOTS: Record<ImageSlotId, ImageSlotSpec>` (`{ src: string; ratio: string; subject: string; sample: boolean }`)
  - `ImageSlot.tsx`: `<ImageSlot slot={ImageSlotId} alt={string} className?={string} />`

- [ ] **Step 1: 실패하는 테스트 작성**

`src/app/config/images.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { IMAGE_SLOTS } from "./images";

describe("IMAGE_SLOTS", () => {
  it("슬롯 4개를 정의한다", () => {
    expect(Object.keys(IMAGE_SLOTS)).toHaveLength(4);
  });

  it("모든 src 가 /img/ 아래를 가리킨다", () => {
    for (const spec of Object.values(IMAGE_SLOTS)) {
      expect(spec.src).toMatch(/^\/img\/[a-z0-9-]+\.png$/);
    }
  });

  it("모든 슬롯에 비율과 설명이 있다", () => {
    for (const spec of Object.values(IMAGE_SLOTS)) {
      expect(spec.ratio).toMatch(/^\d+(\.\d+)?\s*\/\s*\d+(\.\d+)?$/);
      expect(spec.subject.length).toBeGreaterThan(0);
    }
  });

  it("아바타 슬롯은 정사각이다", () => {
    expect(IMAGE_SLOTS["voice-1"].ratio).toBe("1 / 1");
    expect(IMAGE_SLOTS["voice-2"].ratio).toBe("1 / 1");
  });
});
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `npm test -- images`
Expected: FAIL — `Failed to resolve import "./images"`

- [ ] **Step 3: 레지스트리 구현**

`src/app/config/images.ts`:

```ts
export type ImageSlotId = "persona" | "voice-1" | "voice-2" | "footer-wide";

export type ImageSlotSpec = {
  src: string;
  /** CSS aspect-ratio 값. 사진을 교체해도 레이아웃이 흔들리지 않게 고정한다. */
  ratio: string;
  /** 최종적으로 이 자리에 들어갈 사진의 내용 */
  subject: string;
  /** 아직 샘플이면 true. 빌드 시 경고 목록에 오른다. */
  sample: boolean;
};

export const IMAGE_SLOTS: Record<ImageSlotId, ImageSlotSpec> = {
  persona: {
    src: "/img/persona.png",
    ratio: "5 / 4",
    subject: "대표의 업무 환경 — 책상 / 노트 / 화면 (권장 1200×960)",
    sample: true,
  },
  "voice-1": {
    src: "/img/voice-1.png",
    ratio: "1 / 1",
    subject: "손 또는 화면 일부 크롭 (권장 400×400). 사람 얼굴은 쓰지 않는다",
    sample: true,
  },
  "voice-2": {
    src: "/img/voice-2.png",
    ratio: "1 / 1",
    subject: "책상 또는 노트 일부 크롭 (권장 400×400). 사람 얼굴은 쓰지 않는다",
    sample: true,
  },
  "footer-wide": {
    src: "/img/footer-wide.png",
    ratio: "2400 / 760",
    subject: "작은 사무실 / 업무 중인 손 (권장 2400×760)",
    sample: true,
  },
};
```

- [ ] **Step 4: 테스트 통과 확인**

Run: `npm test -- images`
Expected: PASS — 4개 테스트 통과

- [ ] **Step 5: ImageSlot 컴포넌트 작성**

`src/app/components/ImageSlot.tsx`:

```tsx
import { IMAGE_SLOTS, type ImageSlotId } from "@/app/config/images";

export function ImageSlot({
  slot,
  alt,
  className = "",
  grayscale = true,
}: {
  slot: ImageSlotId;
  alt: string;
  className?: string;
  grayscale?: boolean;
}) {
  const spec = IMAGE_SLOTS[slot];

  return (
    <div
      className={`relative w-full overflow-hidden bg-panel ${className}`}
      style={{ aspectRatio: spec.ratio }}
    >
      <img
        src={spec.src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
        style={grayscale ? { filter: "grayscale(1)" } : undefined}
      />
    </div>
  );
}
```

- [ ] **Step 6: 샘플 이미지 생성 스크립트 작성**

의존성 없이 PNG 를 직접 인코딩한다. 무채색 종이 질감 — 브랜드 톤에 맞는 미세한 노이즈와 가로 결. 그라데이션 블롭이나 추상 3D 는 만들지 않는다. 그 자체가 "AI 로 만든 사이트" 신호로 읽히기 때문이다.

`scripts/make-sample-images.mjs`:

```js
import { promises as fs } from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const outDir = path.join(process.cwd(), "public", "img");

const slots = [
  { name: "persona", width: 1200, height: 960 },
  { name: "voice-1", width: 400, height: 400 },
  { name: "voice-2", width: 400, height: 400 },
  { name: "footer-wide", width: 2400, height: 760 },
];

function crc32(buf) {
  let c;
  const table = [];
  for (let n = 0; n < 256; n++) {
    c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  let crc = 0xffffffff;
  for (const byte of buf) crc = table[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const typeAndData = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(typeAndData));
  return Buffer.concat([length, typeAndData, crc]);
}

/** 결정적 의사난수. 같은 좌표는 늘 같은 값을 낸다. */
function noise(x, y) {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return n - Math.floor(n);
}

function renderGray(width, height) {
  // 종이 질감: 은은한 세로 밝기 변화 + 가로 결 + 미세 노이즈
  const rows = [];
  for (let y = 0; y < height; y++) {
    const row = Buffer.alloc(width * 3 + 1);
    row[0] = 0; // filter type: None
    const vertical = 214 - (y / height) * 18;
    const grain = Math.sin(y * 0.7) * 1.5;
    for (let x = 0; x < width; x++) {
      const speckle = (noise(x, y) - 0.5) * 7;
      const value = Math.max(0, Math.min(255, Math.round(vertical + grain + speckle)));
      const offset = 1 + x * 3;
      row[offset] = value;
      row[offset + 1] = value;
      row[offset + 2] = value;
    }
    rows.push(row);
  }
  return Buffer.concat(rows);
}

function encodePng(width, height) {
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // color type: truecolor
  const idat = zlib.deflateSync(renderGray(width, height), { level: 9 });

  return Buffer.concat([
    signature,
    chunk("IHDR", ihdr),
    chunk("IDAT", idat),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

await fs.mkdir(outDir, { recursive: true });

for (const slot of slots) {
  const file = path.join(outDir, `${slot.name}.png`);
  await fs.writeFile(file, encodePng(slot.width, slot.height));
  console.log(`[sample-images] ${slot.name}.png ${slot.width}x${slot.height}`);
}

console.log("[sample-images] 완료. 실제 사진을 같은 경로에 덮어쓰면 교체된다.");
```

`package.json`의 `scripts`에 추가:

```json
"gen:samples": "node ./scripts/make-sample-images.mjs"
```

- [ ] **Step 7: 샘플 생성과 확인**

Run: `npm run gen:samples`
Expected: 4개 파일 생성 로그

Run: `node -e "const s=require('fs').statSync('public/img/persona.png');console.log(s.size)"`
Expected: 0보다 큰 크기

`public/img/persona.png`를 이미지 뷰어로 열어 회색 종이 질감이 보이는지 확인한다.

- [ ] **Step 8: flow 자산 삭제와 verify-assets 갱신**

```bash
git rm public/flow/flow-scenario.png public/flow/flow-form.png public/flow/flow-watermelon.png public/flow/flow-dashboard.png
```

`scripts/verify-assets.mjs`의 `requiredAssets` 배열을 교체한다. **flow 4개 경로를 지우지 않으면 빌드가 즉시 실패한다.**

```js
const requiredAssets = [
  "public/favicon.png",
  "public/apple-touch-icon.png",
  "public/img/persona.png",
  "public/img/voice-1.png",
  "public/img/voice-2.png",
  "public/img/footer-wide.png",
];
```

파일 끝의 성공 로그 뒤에 샘플 경고를 추가한다:

```js
console.log(`[verify-assets] ${requiredAssets.length} assets verified`);

// 아직 실제 사진으로 교체되지 않은 이미지 슬롯을 알린다.
const imagesConfig = await readFile(
  path.join(projectRoot, "src/app/config/images.ts"),
  "utf8",
);
const pendingSamples = [...imagesConfig.matchAll(/src:\s*"([^"]+)"[\s\S]*?sample:\s*true/g)].map(
  (match) => match[1],
);

if (pendingSamples.length > 0) {
  console.warn(
    `[verify-assets] 아직 샘플인 이미지 ${pendingSamples.length}개 — 실제 사진으로 교체 필요`,
  );
  for (const src of pendingSamples) {
    console.warn(`  - public${src}`);
  }
}
```

- [ ] **Step 9: 빌드로 경고 확인**

Run: `npm run build`
Expected: 성공하며 다음 경고가 출력된다:

```
[verify-assets] 6 assets verified
[verify-assets] 아직 샘플인 이미지 4개 — 실제 사진으로 교체 필요
  - public/img/persona.png
  - public/img/voice-1.png
  - public/img/voice-2.png
  - public/img/footer-wide.png
```

- [ ] **Step 10: 커밋**

```bash
git add -A src/app/config src/app/components/ImageSlot.tsx scripts public/img package.json
git commit -m "$(cat <<'EOF'
feat: 교체 가능한 이미지 슬롯과 샘플 도입

사진 4자리를 비율 고정 슬롯으로 만들었다. public/img 의 같은
경로에 실제 사진을 덮어쓰면 코드 변경 없이 교체되고, 비율이
고정돼 있어 레이아웃도 흔들리지 않는다.

교체되지 않은 슬롯은 빌드마다 verify-assets 가 경고로 알린다.

기존 flow/*.png 4장을 삭제했다. DEBUG 리본, 한글 깨짐,
마크다운 미파싱, 서사·팔레트 불일치로 사용할 수 없다.
verify-assets 의 requiredAssets 도 함께 갱신했다.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 8: 목업 공용 프레임

목업 3종이 공유하는 껍데기. 여기서 한 번만 정의해 세 화면의 생김새를 일치시킨다.

**Files:**
- Create: `src/app/components/mockups/frame.tsx`

**Interfaces:**
- Consumes: Task 1의 브랜드 토큰
- Produces: `<MockFrame title={string} ratio={string} children>`, `<MockChrome label={string} />`

- [ ] **Step 1: 프레임 컴포넌트 작성**

`src/app/components/mockups/frame.tsx`:

```tsx
import type { ReactNode } from "react";

/** 목업 상단의 앱 바. 실제 제품처럼 보이되 브랜드 팔레트를 벗어나지 않는다. */
export function MockChrome({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-line-2 bg-panel px-4 py-2.5">
      <span className="flex gap-1.5" aria-hidden="true">
        <span className="h-2 w-2 rounded-full bg-line" />
        <span className="h-2 w-2 rounded-full bg-line" />
        <span className="h-2 w-2 rounded-full bg-line" />
      </span>
      <span className="ml-1 text-[11px] font-semibold tracking-[0.08em] text-ink-3">
        {label}
      </span>
    </div>
  );
}

export function MockFrame({
  ratio,
  children,
  className = "",
}: {
  ratio: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`w-full overflow-hidden rounded-[14px] border border-line-2 bg-surface shadow-[0_1px_2px_rgba(0,0,0,.04),0_8px_24px_rgba(0,0,0,.04)] ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <div className="flex h-full flex-col">{children}</div>
    </div>
  );
}
```

- [ ] **Step 2: 타입 검사**

Run: `npx tsc --noEmit`
Expected: 에러 없음

- [ ] **Step 3: 커밋**

```bash
git add src/app/components/mockups/frame.tsx
git commit -m "$(cat <<'EOF'
feat: 목업 공용 프레임 추가

목업 3종이 같은 껍데기를 공유하도록 프레임과 앱 바를 분리했다.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 9: 제품 목업 3종

기존 스크린샷에서 확인한 **실제 제품 흐름**을 따른다: 상품·가격·브랜드·컨셉 4개 입력 → 마케팅 시나리오 생성(타겟 / 핵심 메시지 / USP / 톤앤매너 / 채널별 아이디어 / 후킹 카피 / CTA) → 광고 이미지 생성 → 커머스 플랫폼 연동. 임의로 지어내지 않는다.

목업 안 문구는 사전에서 받으므로 **로케일에 따라 화면 속 글자도 바뀐다.** 스크린샷 PNG 였다면 불가능한 동작이며, 생성형 엔진이 읽을 수 있는 텍스트로 남는다는 점이 GEO 상 이점이다.

**Files:**
- Create: `src/content/ko/mockups.ts`
- Create: `src/content/en/mockups.ts`
- Create: `src/app/components/mockups/ProposalCard.tsx`
- Create: `src/app/components/mockups/ChatThread.tsx`
- Create: `src/app/components/mockups/ResultDashboard.tsx`
- Modify: `src/content/index.ts`

**Interfaces:**
- Consumes: Task 4의 `useCopy`, Task 8의 `MockFrame`·`MockChrome`
- Produces: `<ProposalCard />`, `<ChatThread />`, `<ResultDashboard />` — 모두 인자 없음. 사전에서 직접 읽는다. `Dictionary`에 `mockups` 키가 추가된다.

- [ ] **Step 1: 한국어 목업 사전 작성**

`src/content/ko/mockups.ts`:

```ts
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
    messages: [
      {
        from: "agent" as const,
        text: "이번 주 제안입니다. 여름 성수기라 신선함을 앞세운 릴스가 반응이 좋습니다.",
      },
      {
        from: "agent" as const,
        text: "타겟: 여름철 가족 단위 소비자\n핵심 메시지: 시원한 여름, 차가운 수박\n채널: 인스타그램 릴스 2편",
      },
      { from: "user" as const, text: "이 방향으로 진행해주세요." },
      { from: "agent" as const, text: "영상 2편과 문구를 만들어 올리겠습니다." },
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
```

- [ ] **Step 2: 영어 목업 사전 작성**

`src/content/en/mockups.ts`:

```ts
import type { MockupsCopy } from "../ko/mockups";
import type { DeepWiden } from "../widen";

export const mockups: DeepWiden<MockupsCopy> = {
  proposal: {
    appLabel: "WooriTeam · this week's proposal",
    weekLabel: "Week of Aug 18",
    heading: "4 things to do this week",
    approveHint: "~20 min to approve",
    items: [
      { title: "Two Reels for the new product", meta: "Instagram · Content", state: "Proposed" },
      { title: "Rewrite the product-page CTA", meta: "Store · Conversion", state: "Proposed" },
      { title: "Rebalance last week's ad budget", meta: "Ads · Operations", state: "Proposed" },
      { title: "Repeat-purchase reminder", meta: "CRM · Retention", state: "Proposed" },
    ],
    approve: "Approve all",
    review: "Review one by one",
  },
  chat: {
    appLabel: "WooriTeam · marketing assistant",
    fields: [
      { label: "Product", value: "Watermelon" },
      { label: "Price", value: "10,000 KRW" },
      { label: "Brand", value: "Chagaum" },
      { label: "Concept", value: "Refreshing" },
    ],
    messages: [
      {
        from: "agent",
        text: "Here is this week's proposal. Peak summer — Reels leading with freshness perform best.",
      },
      {
        from: "agent",
        text: "Audience: families in summer\nKey message: a cool summer, a cold watermelon\nChannel: two Instagram Reels",
      },
      { from: "user", text: "Go ahead with this one." },
      { from: "agent", text: "I'll produce both videos and the copy." },
    ],
  },
  dashboard: {
    appLabel: "WooriTeam · weekly report",
    heading: "Week of Aug 18",
    stats: [
      { label: "Content this week", value: "4", unit: " items", highlight: false },
      { label: "Ads running", value: "2", unit: " sets", highlight: false },
      { label: "New visitors", value: "+14%", unit: "", highlight: true },
      { label: "Inquiries", value: "+3", unit: "", highlight: true },
    ],
    channels: [
      { name: "Instagram", share: 46 },
      { name: "Store", share: 31 },
      { name: "Search", share: 23 },
    ],
    nextLabel: "Next week",
    next: "Lean into product A, which performed best, with more Reels.",
    disclaimer: "* Numbers shown are illustrative examples.",
  },
};
```

- [ ] **Step 3: 사전에 mockups 등록**

`src/content/index.ts`를 교체:

```ts
import type { Locale } from "./locales";
import { common as koCommon } from "./ko/common";
import { common as enCommon } from "./en/common";
import { mockups as koMockups } from "./ko/mockups";
import { mockups as enMockups } from "./en/mockups";

export type Dictionary = {
  common: typeof koCommon;
  mockups: typeof koMockups;
};

export const dictionaries = {
  ko: { common: koCommon, mockups: koMockups },
  en: { common: enCommon, mockups: enMockups },
} as unknown as Record<Locale, Dictionary>;
```

- [ ] **Step 4: ProposalCard 작성**

`src/app/components/mockups/ProposalCard.tsx`:

```tsx
import { useCopy } from "@/app/i18n/useCopy";
import { MockChrome, MockFrame } from "./frame";

export function ProposalCard() {
  const { proposal } = useCopy().mockups;

  return (
    <MockFrame ratio="4 / 3">
      <MockChrome label={proposal.appLabel} />
      <div className="flex min-h-0 flex-1 flex-col px-5 py-4">
        <div className="flex items-baseline justify-between">
          <p className="text-[15px] font-semibold tracking-[-0.01em] text-ink">
            {proposal.heading}
          </p>
          <p className="text-[11px] text-ink-3">{proposal.weekLabel}</p>
        </div>

        <ul className="mt-3 min-h-0 flex-1 divide-y divide-line-2 overflow-hidden border-t border-line-2">
          {proposal.items.map((item) => (
            <li key={item.title} className="flex items-center gap-3 py-2.5">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
              />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-medium text-ink">
                  {item.title}
                </span>
                <span className="block truncate text-[11px] text-ink-3">{item.meta}</span>
              </span>
              <span className="shrink-0 rounded-md bg-panel px-2 py-0.5 text-[10px] font-semibold text-ink-2">
                {item.state}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-3 flex items-center gap-2 border-t border-line-2 pt-3">
          <span className="flex h-8 items-center rounded-lg bg-invert px-3 text-[12px] font-semibold text-white">
            {proposal.approve}
          </span>
          <span className="flex h-8 items-center rounded-lg border border-line px-3 text-[12px] font-semibold text-ink-2">
            {proposal.review}
          </span>
          <span className="ml-auto text-[11px] text-ink-3">{proposal.approveHint}</span>
        </div>
      </div>
    </MockFrame>
  );
}
```

- [ ] **Step 5: ChatThread 작성**

`src/app/components/mockups/ChatThread.tsx`:

```tsx
import { useCopy } from "@/app/i18n/useCopy";
import { MockChrome, MockFrame } from "./frame";

export function ChatThread() {
  const { chat } = useCopy().mockups;

  return (
    <MockFrame ratio="16 / 11">
      <MockChrome label={chat.appLabel} />

      <div className="grid grid-cols-4 gap-2 border-b border-line-2 px-4 py-3">
        {chat.fields.map((field) => (
          <div key={field.label} className="rounded-lg border border-line-2 px-2.5 py-1.5">
            <p className="text-[9px] font-semibold tracking-[0.06em] text-ink-3">
              {field.label}
            </p>
            <p className="mt-0.5 truncate text-[12px] font-medium text-ink">{field.value}</p>
          </div>
        ))}
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-hidden px-4 py-4">
        {chat.messages.map((message, index) => (
          <div
            key={index}
            className={message.from === "user" ? "flex justify-end" : "flex justify-start"}
          >
            <p
              className={`max-w-[78%] whitespace-pre-line rounded-xl px-3 py-2 text-[12.5px] leading-[1.6] ${
                message.from === "user"
                  ? "bg-invert text-white"
                  : "bg-panel text-ink-2"
              }`}
            >
              {message.text}
            </p>
          </div>
        ))}
      </div>
    </MockFrame>
  );
}
```

- [ ] **Step 6: ResultDashboard 작성**

`src/app/components/mockups/ResultDashboard.tsx`:

```tsx
import { useCopy } from "@/app/i18n/useCopy";
import { MockChrome, MockFrame } from "./frame";

export function ResultDashboard() {
  const { dashboard } = useCopy().mockups;

  return (
    <MockFrame ratio="16 / 9">
      <MockChrome label={dashboard.appLabel} />
      <div className="flex min-h-0 flex-1 flex-col px-5 py-4">
        <p className="text-[15px] font-semibold tracking-[-0.01em] text-ink">
          {dashboard.heading}
        </p>

        <div className="mt-3 grid grid-cols-4 border-t-2 border-ink">
          {dashboard.stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`py-3 ${index < 3 ? "border-r border-line" : ""} ${
                index === 0 ? "pr-3" : "px-3"
              }`}
            >
              <p className="truncate text-[10.5px] text-ink-3">{stat.label}</p>
              <p
                className={`mt-1 text-[19px] font-semibold tracking-[-0.02em] ${
                  stat.highlight ? "text-brand" : "text-ink"
                }`}
              >
                {stat.value}
                <span className="text-[11px] font-medium text-ink-2">{stat.unit}</span>
              </p>
            </div>
          ))}
        </div>

        <div className="mt-3 min-h-0 flex-1 space-y-2 border-t border-line pt-3">
          {dashboard.channels.map((channel) => (
            <div key={channel.name} className="flex items-center gap-3">
              <span className="w-24 shrink-0 truncate text-[11px] text-ink-2">
                {channel.name}
              </span>
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-panel">
                <span
                  className="block h-full rounded-full bg-brand"
                  style={{ width: `${channel.share}%` }}
                />
              </span>
              <span className="w-9 shrink-0 text-right text-[11px] tabular-nums text-ink-3">
                {channel.share}%
              </span>
            </div>
          ))}
        </div>

        <p className="mt-3 border-t border-line pt-3 text-[11.5px] leading-[1.55] text-ink-2">
          <strong className="font-semibold text-ink">{dashboard.nextLabel} — </strong>
          {dashboard.next}
        </p>
      </div>
    </MockFrame>
  );
}
```

- [ ] **Step 7: 타입 검사와 테스트**

Run: `npx tsc --noEmit && npm test`
Expected: 에러 없음, 전체 테스트 통과

- [ ] **Step 8: 커밋**

```bash
git add src/content src/app/components/mockups
git commit -m "$(cat <<'EOF'
feat: 제품 화면 목업 3종 구현

기존 스크린샷에서 확인한 실제 제품 흐름(4개 입력 → 시나리오
생성 → 실행 → 결과)을 따라 이번 주 제안 화면, 마케팅 어시스턴트
대화, 주간 리포트를 React 컴포넌트로 구현했다.

화면 안 문구를 사전에서 받으므로 로케일에 따라 목업 속 글자도
바뀐다. 스크린샷 PNG 였다면 불가능하며, 제품 서사가 크롤 가능한
텍스트로 남는다.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 10: 헤더·푸터 전환

**Files:**
- Modify: `src/app/components/Layout.tsx` (전면 교체)

**Interfaces:**
- Consumes: Task 4의 `useCopy`·`useLocale`·`localePath`·`hasEnglish`, Task 1의 토큰
- Produces: `<Layout />` — 새 디자인의 sticky 헤더와 다단 푸터

- [ ] **Step 1: Layout.tsx 전면 교체**

```tsx
import { Link, Outlet, useLocation } from "react-router";
import { useEffect, useState, type ReactNode } from "react";
import { useCopy } from "@/app/i18n/useCopy";
import { useLocale } from "@/app/i18n/LocaleContext";
import { hasEnglish, localePath, stripLocale } from "@/app/i18n/localePath";
import type { Locale } from "@/content/locales";

const NAV_PATHS = [
  ["solution", "/solution"],
  ["technology", "/technology"],
  ["pricing", "/pricing"],
  ["demo", "/demo"],
  ["apps", "/apps"],
  ["about", "/about"],
  ["ir", "/ir"],
  ["contact", "/contact"],
] as const;

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const locale = useLocale();
  const copy = useCopy().common;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMenuOpen(false);
  }, [location.pathname]);

  const to = (path: string) => localePath(path, locale);
  const other: Locale = locale === "ko" ? "en" : "ko";
  const { path: basePath } = stripLocale(location.pathname);
  const switchTo = hasEnglish(basePath) ? localePath(basePath, other) : localePath("/", other);

  const navItems = NAV_PATHS.map(([key, path]) => ({
    key,
    path,
    label: copy.nav[key],
    /** 영문 화면에서 영문판이 없는 경로로 가는 링크임을 명시한다 */
    foreignLang: locale === "en" && !hasEnglish(path) ? "ko" : undefined,
  }));

  return (
    <div className="min-h-screen overflow-x-hidden bg-ground text-ink">
      <header className="sticky top-0 z-50 border-b border-line bg-ground/[.92] backdrop-blur-[8px] backdrop-saturate-[1.2]">
        <div className="mx-auto flex h-[70px] max-w-[1180px] items-center justify-between gap-6 px-[clamp(20px,4vw,40px)]">
          <Link to={to("/")} aria-label={copy.a11y.home} className="flex items-baseline gap-2">
            <span className="text-[19px] font-bold tracking-[-0.02em]">{copy.brand.nameKo}</span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-3">
              {copy.brand.nameEn}
            </span>
          </Link>

          <nav aria-label={copy.a11y.mainNav} className="hidden items-center gap-[26px] lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={to(item.path)}
                lang={item.foreignLang}
                className="text-[14.5px] font-medium text-ink-2 transition-colors hover:text-brand"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <Link
              to={switchTo}
              aria-label={copy.a11y.switchLang}
              className="flex h-[34px] items-center rounded-lg border border-line px-2.5 text-[12px] font-semibold tracking-[0.04em] text-ink-2 transition-colors hover:text-brand"
            >
              {copy.langLabel}
            </Link>
            <Link
              to={to("/demo")}
              className="hidden h-10 items-center whitespace-nowrap rounded-[10px] bg-invert px-4 text-[14px] font-semibold text-white lg:flex"
            >
              {copy.cta.primary}
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? copy.a11y.closeMenu : copy.a11y.openMenu}
              aria-expanded={menuOpen}
              className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-line lg:hidden"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                {menuOpen ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-line bg-surface lg:hidden">
            <nav aria-label={copy.a11y.mobileNav} className="mx-auto grid max-w-[1180px] gap-0.5 px-5 pb-5 pt-3">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  to={to(item.path)}
                  lang={item.foreignLang}
                  className="border-b border-line-2 px-1 py-3.5 text-[16px] font-semibold"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to={to("/demo")}
                className="mt-3.5 flex h-[50px] items-center justify-center rounded-[10px] bg-invert text-[15px] font-semibold text-white"
              >
                {copy.cta.primary}
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main id="main-content">
        <Outlet />
      </main>

      <footer className="border-t border-line bg-ground">
        <div className="mx-auto max-w-[1180px] px-[clamp(20px,4vw,40px)] pb-7 pt-[clamp(52px,6vw,80px)]">
          <div className="grid gap-[clamp(36px,5vw,56px)] md:grid-cols-[40fr_60fr]">
            <div>
              <p className="text-[22px] font-bold tracking-[-0.02em]">
                {copy.brand.nameKo}{" "}
                <span className="align-middle text-[12px] font-semibold tracking-[0.14em] text-ink-3">
                  {copy.brand.nameEn}
                </span>
              </p>
              <p className="mt-2.5 text-[16px] text-ink-2">{copy.brand.tagline}</p>
            </div>

            <div className="grid gap-7 sm:grid-cols-3">
              <FooterGroup title={copy.footer.groups.product}>
                <FooterLink to={to("/solution")}>{copy.nav.solution}</FooterLink>
                <FooterLink to={to("/technology")}>{copy.nav.technology}</FooterLink>
                <FooterLink to={to("/pricing")}>{copy.nav.pricing}</FooterLink>
                <FooterLink to={to("/demo")}>{copy.nav.demo}</FooterLink>
                <FooterLink to={to("/apps")}>{copy.nav.apps}</FooterLink>
              </FooterGroup>
              <FooterGroup title={copy.footer.groups.company}>
                <FooterLink to={to("/about")}>{copy.footer.links.about}</FooterLink>
                <FooterLink to={to("/ir")}>{copy.nav.ir}</FooterLink>
                <FooterLink to={to("/contact")}>{copy.footer.links.contact}</FooterLink>
              </FooterGroup>
              <FooterGroup title={copy.footer.groups.legal}>
                <FooterLink to="/privacy" lang={locale === "en" ? "ko" : undefined}>
                  {copy.footer.links.privacy}
                </FooterLink>
                <FooterLink to="/terms" lang={locale === "en" ? "ko" : undefined}>
                  {copy.footer.links.terms}
                </FooterLink>
              </FooterGroup>
            </div>
          </div>

          <p className="mt-[clamp(40px,5vw,64px)] border-t border-line pt-5.5 text-[13px] text-ink-3">
            {copy.footer.copyright}
          </p>
        </div>
      </footer>
    </div>
  );
}

function FooterGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <nav aria-label={title}>
      <p className="mb-3.5 text-[12px] font-semibold tracking-[0.1em] text-ink-3">{title}</p>
      <ul className="grid gap-2.5 text-[15px]">{children}</ul>
    </nav>
  );
}

function FooterLink({
  to,
  lang,
  children,
}: {
  to: string;
  lang?: string;
  children: ReactNode;
}) {
  return (
    <li>
      <Link to={to} lang={lang} className="text-ink transition-colors hover:text-brand">
        {children}
      </Link>
    </li>
  );
}
```

- [ ] **Step 2: 개발 서버로 확인**

Run: `npm run dev`
확인:
- `/` — 헤더가 라이트 배경 sticky, 워드마크가 `우리팀 WOORITEAM`으로 보인다
- 언어 버튼 `EN` 클릭 → `/en`으로 이동하고 버튼이 `KO`로 바뀐다
- `/en`에서 `데모`·`Apps` 링크가 `/demo`·`/apps`(한국어 경로)를 가리킨다
- 375px 폭에서 햄버거 메뉴가 열리고 닫힌다
- 페이지 이동 시 메뉴가 자동으로 닫힌다

- [ ] **Step 3: 타입 검사**

Run: `npx tsc --noEmit`
Expected: 에러 없음

- [ ] **Step 4: 커밋**

```bash
git add src/app/components/Layout.tsx
git commit -m "$(cat <<'EOF'
feat: 헤더·푸터를 새 디자인으로 전환

로고 이미지를 걷어내고 우리팀 + WOORITEAM 워드마크 조합으로
바꿨다. 기존 favicon.png 는 다크 배경 네온 C 라 라이트
디자인과 맞지 않았고, 새 디자인은 마크 없이 성립한다.

언어 전환은 현재 경로의 반대 로케일로 이동한다. 영문판이 없는
경로에서는 영문 홈으로 보낸다. 영문 화면에서 한국어 전용
페이지로 가는 링크에는 lang="ko" 를 붙였다.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 11: 홈 카피 사전

**Files:**
- Create: `src/content/ko/home.ts`
- Create: `src/content/en/home.ts`
- Modify: `src/content/index.ts`

**Interfaces:**
- Consumes: 없음
- Produces: `Dictionary`에 `home` 키 추가. Task 12가 사용한다.

- [ ] **Step 1: 한국어 홈 사전 작성**

`src/content/ko/home.ts`:

```ts
export const home = {
  hero: {
    eyebrow: "우리팀 · WOORITEAM",
    titleLine1: "창업자의",
    titleLine2: "첫 번째 팀",
    body: "전담 마케터 없이 성장 업무를 직접 챙기고 있다면. 우리팀은 회사의 상황을 이해하고 ",
    bodyStrong: "제안 → 승인 → 실행 → 반복 성장",
    bodyAfter: "까지 같이 해내는 첫 번째 팀원입니다.",
    caption: "우리팀 · 이번 주 제안 화면",
    assurances: [
      "대표 승인 없이는 실행하지 않습니다",
      "이번 주 할 일부터 시작합니다",
    ],
  },
  who: {
    label: "누구를 위한가",
    title: "제품은 있는데\n성장 업무를 맡길\n사람이 없다면.",
    photoAlt: "책상 위 노트와 화면",
    items: [
      {
        term: "전담 마케터가 없습니다",
        detail: "대표가 직접 콘텐츠를 쓰고 광고를 올립니다. 정작 중요한 결정은 밀립니다.",
      },
      {
        term: "툴은 많은데 손이 부족합니다",
        detail: "ChatGPT, 노션, 광고 도구는 이미 있습니다. 그런데 결국 실행하는 사람은 대표 한 명입니다.",
      },
      {
        term: "외주는 아직 부담입니다",
        detail: "매달 대행 비용을 쓰기엔 아직 이릅니다. 그렇다고 안 할 수도 없습니다.",
      },
    ],
  },
  loop: {
    label: "첫 번째 팀원이 하는 일",
    title: "제안하고, 승인을 받고, 실행하고, 결과를 다음 주에 반영합니다.",
    steps: [
      { step: "STEP 01", title: "제안", body: "“이번 주 인스타 릴스 2편이 필요합니다.”" },
      { step: "STEP 02", title: "승인", body: "“이 방향으로 진행해주세요.”" },
      { step: "STEP 03", title: "실행", body: "“영상과 문구를 제작했습니다.”" },
      { step: "STEP 04", title: "반복 성장", body: "“지난주 반응을 다음 콘텐츠에 반영합니다.”" },
    ],
    note: "4단계가 끝나면 다시 1단계로 돌아갑니다. 매주 같은 리듬으로.",
  },
  product: {
    label: "제품 화면",
    title: "월요일 아침,\n할 일이 정리되어\n도착합니다.",
    body: "이번 주에 무엇을 해야 하는지, 왜 해야 하는지, 얼마나 걸리는지까지 함께 옵니다. 대표가 할 일은 읽고 승인하는 것입니다.",
    items: ["신상품 릴스 2편", "상세페이지 CTA 변경", "지난주 광고 예산 재조정"],
    caption: "이번 주 제안 · 예상 소요 약 20분 승인",
  },
  compare: {
    label: "대화형 도구와 팀원의 차이",
    title: "대화형 도구는 질문하면 답합니다. 팀원은 먼저 할 일을 제안하고 실행합니다.",
    subtitle: "둘 다 필요합니다. 다만 역할이 다릅니다.",
    headTool: "대화형 AI 도구",
    headUs: "우리팀",
    rows: [
      { key: "시작", tool: "사용자가 질문해야 합니다", us: "먼저 제안합니다" },
      { key: "맥락", tool: "매번 다시 설명해야 합니다", us: "사업을 기억합니다" },
      { key: "결과", tool: "초안이 나옵니다", us: "실행 가능한 작업이 나옵니다" },
      { key: "이후", tool: "대화가 끝납니다", us: "결과를 다음 작업에 반영합니다" },
      { key: "관계", tool: "도구", us: "팀원" },
    ],
  },
  results: {
    label: "결과 확인",
    title: "한 주가 끝나면 무엇을 했고 무엇이 달라졌는지 한 장으로 옵니다.",
  },
  voices: {
    label: "파일럿 피드백",
    quotes: [
      {
        quote: "“콘텐츠를 만들어주는 것보다, 왜 이걸 해야 하는지 알려주는 게 더 좋았습니다.”",
        who: "쇼핑몰 대표",
        alt: "노트 위의 손",
      },
      {
        quote: "“마케팅 결과를 숫자로 설명해주면 계속 쓸 것 같아요.”",
        who: "소규모 사업자",
        alt: "책상 위 메모",
      },
    ],
    note: "* 파일럿 인터뷰 문장을 정리한 것입니다. 실제 인터뷰 문장으로 교체 예정입니다.",
  },
  scope: {
    label: "지금은 이만큼부터",
    title: "할 수 있는 것과\n아직 준비 중인 것을\n그대로 적었습니다.",
    stages: [
      {
        when: "지금",
        title: "주간 제안과 콘텐츠 실행",
        body: "이번 주 할 일을 제안하고, 승인된 콘텐츠와 문구를 만들어 올립니다.",
        current: true,
      },
      {
        when: "준비 중",
        title: "광고 운영과 성과 리포트",
        body: "예산 조정과 주간 리포트를 같은 흐름 안으로 가져옵니다.",
        current: false,
      },
      {
        when: "이후",
        title: "고객 응대와 재구매 관리",
        body: "한 명의 팀원이 맡을 수 있는 범위를 단계적으로 넓힙니다.",
        current: false,
      },
    ],
  },
  cta: {
    title: "혼자 하던 일을\n이번 주부터 같이 합니다.",
    body: "사업 상황을 한 번 알려주시면, 이번 주에 할 일부터 제안해드립니다.",
  },
  footerImageAlt: "작은 사무실에서 일하는 모습",
} as const;

export type HomeCopy = typeof home;
```

- [ ] **Step 2: 영어 홈 사전 작성**

`src/content/en/home.ts`:

```ts
import type { HomeCopy } from "../ko/home";
import type { DeepWiden } from "../widen";

export const home: DeepWiden<HomeCopy> = {
  hero: {
    eyebrow: "WOORITEAM",
    titleLine1: "A founder's",
    titleLine2: "first team",
    body: "If you are running growth alone, without a marketer. WooriTeam learns your business and works through ",
    bodyStrong: "propose → approve → execute → repeat",
    bodyAfter: " with you.",
    caption: "WooriTeam · this week's proposal",
    assurances: ["Nothing runs without your approval", "Starts with this week's work"],
  },
  who: {
    label: "WHO IT IS FOR",
    title: "You have a product.\nYou just have no one\nto hand growth to.",
    photoAlt: "A notebook and screen on a desk",
    items: [
      {
        term: "No marketer on the team",
        detail: "The founder writes the copy and runs the ads — and the real decisions wait.",
      },
      {
        term: "Plenty of tools, no hands",
        detail: "ChatGPT, Notion, ad managers — all there. The one who executes is still you.",
      },
      {
        term: "An agency is still too much",
        detail: "A monthly retainer is early. Doing nothing is not an option either.",
      },
    ],
  },
  loop: {
    label: "WHAT YOUR FIRST TEAMMATE DOES",
    title: "Proposes, gets your approval, executes, and folds the result into next week.",
    steps: [
      { step: "STEP 01", title: "Propose", body: "“You need two Reels this week.”" },
      { step: "STEP 02", title: "Approve", body: "“Go ahead with this one.”" },
      { step: "STEP 03", title: "Execute", body: "“The video and copy are done.”" },
      { step: "STEP 04", title: "Repeat", body: "“Last week's results shape the next one.”" },
    ],
    note: "Step four returns to step one. Same rhythm, every week.",
  },
  product: {
    label: "THE PRODUCT",
    title: "Monday morning,\nthe week arrives\nalready sorted.",
    body: "What to do this week, why it matters, and how long it takes. Your job is to read it and approve.",
    items: [
      "Two Reels for the new product",
      "Rewrite the product-page CTA",
      "Rebalance last week's ad budget",
    ],
    caption: "This week's proposal · ~20 min to approve",
  },
  compare: {
    label: "A CHAT TOOL VS. A TEAMMATE",
    title: "A chat tool answers when asked. A teammate proposes the work, then does it.",
    subtitle: "You need both. They just play different roles.",
    headTool: "Chat AI tool",
    headUs: "WooriTeam",
    rows: [
      { key: "Start", tool: "You have to ask", us: "It proposes first" },
      { key: "Context", tool: "Explained again each time", us: "It remembers your business" },
      { key: "Output", tool: "A draft", us: "Work that ships" },
      { key: "After", tool: "The conversation ends", us: "Results feed the next task" },
      { key: "Relationship", tool: "A tool", us: "A teammate" },
    ],
  },
  results: {
    label: "RESULTS",
    title: "At the end of the week: what got done, and what changed — on one page.",
  },
  voices: {
    label: "PILOT FEEDBACK",
    quotes: [
      {
        quote: "“Better than making the content was being told why it mattered.”",
        who: "Online store founder",
        alt: "A hand resting on a notebook",
      },
      {
        quote: "“If it explains results in numbers, I'll keep using it.”",
        who: "Small business owner",
        alt: "Notes on a desk",
      },
    ],
    note: "* Drawn from pilot interviews. To be replaced with verbatim quotes.",
  },
  scope: {
    label: "WHERE WE ARE TODAY",
    title: "What we can do today,\nand what we cannot,\nwritten plainly.",
    stages: [
      {
        when: "NOW",
        title: "Weekly proposals and content execution",
        body: "We propose the week, then produce and publish what you approve.",
        current: true,
      },
      {
        when: "SOON",
        title: "Ad operations and result reports",
        body: "Budget shifts and weekly reporting move into the same loop.",
        current: false,
      },
      {
        when: "LATER",
        title: "Customer replies and repeat purchase",
        body: "We widen what one teammate can carry, step by step.",
        current: false,
      },
    ],
  },
  cta: {
    title: "The work you did alone.\nStarting this week, together.",
    body: "Tell us about your business once, and we'll propose this week's work.",
  },
  footerImageAlt: "Working in a small office",
};
```

- [ ] **Step 3: 사전에 home 등록**

`src/content/index.ts`에 `home`을 추가한다 (Task 9의 형태에 이어서):

```ts
import { home as koHome } from "./ko/home";
import { home as enHome } from "./en/home";

export type Dictionary = {
  common: typeof koCommon;
  mockups: typeof koMockups;
  home: typeof koHome;
};

export const dictionaries = {
  ko: { common: koCommon, mockups: koMockups, home: koHome },
  en: { common: enCommon, mockups: enMockups, home: enHome },
} as unknown as Record<Locale, Dictionary>;
```

- [ ] **Step 4: 타입 검사**

Run: `npx tsc --noEmit`
Expected: 에러 없음

- [ ] **Step 5: 커밋**

```bash
git add src/content
git commit -m "$(cat <<'EOF'
feat: 홈 카피를 한/영 사전으로 분리

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 12: 홈 페이지 전환

**Files:**
- Modify: `src/app/pages/Home.tsx` (전면 교체, 356줄 → 새 구조)

**Interfaces:**
- Consumes: Task 4의 `useCopy`·`useLocale`·`localePath`, Task 7의 `ImageSlot`, Task 9의 목업 3종, Task 11의 `home` 사전
- Produces: 없음 (최종 화면)

- [ ] **Step 1: 섹션 공용 조각을 파일 상단에 정의**

`src/app/pages/Home.tsx`를 전면 교체한다. 먼저 반복되는 껍데기를 지역 컴포넌트로 뽑는다.

```tsx
import { Link } from "react-router";
import { useCopy } from "@/app/i18n/useCopy";
import { useLocale } from "@/app/i18n/LocaleContext";
import { localePath } from "@/app/i18n/localePath";
import { ImageSlot } from "@/app/components/ImageSlot";
import { ProposalCard } from "@/app/components/mockups/ProposalCard";
import { ChatThread } from "@/app/components/mockups/ChatThread";
import { ResultDashboard } from "@/app/components/mockups/ResultDashboard";
import type { ReactNode } from "react";

const SHELL = "mx-auto max-w-[1180px] px-[clamp(20px,4vw,40px)]";
const BLOCK = "py-[clamp(72px,8vw,112px)]";

function Section({
  id,
  tone = "ground",
  children,
}: {
  id: string;
  tone?: "ground" | "panel";
  children: ReactNode;
}) {
  return (
    <section
      aria-labelledby={id}
      className={`border-b border-line ${tone === "panel" ? "bg-panel" : "bg-ground"}`}
    >
      <div className={`${SHELL} ${BLOCK}`}>{children}</div>
    </section>
  );
}

function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <p className="mb-4 text-[12.5px] font-semibold tracking-[0.12em] text-ink-3">
      {index}&nbsp;&nbsp;{children}
    </p>
  );
}

/** 사전의 \n 을 <br> 로 바꾼다. 제목의 줄바꿈 위치가 디자인의 일부다. */
function Lines({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, index) => (
        <span key={index}>
          {index > 0 && <br />}
          {line}
        </span>
      ))}
    </>
  );
}
```

- [ ] **Step 2: 본문 컴포넌트 작성**

같은 파일에 이어서 작성한다.

```tsx
export default function Home() {
  const locale = useLocale();
  const copy = useCopy();
  const t = copy.home;
  const common = copy.common;
  const to = (path: string) => localePath(path, locale);

  return (
    <div className="bg-ground">
      {/* 히어로 */}
      <section aria-labelledby="hero-h" className="border-b border-line">
        <div className={`${SHELL} pb-[clamp(64px,7vw,104px)] pt-[clamp(56px,7vw,96px)]`}>
          <div className="rise grid items-center gap-[clamp(40px,5vw,64px)] lg:grid-cols-[55fr_45fr]">
            <div>
              <p className="mb-[22px] text-[13px] font-semibold uppercase tracking-[0.1em] text-brand">
                {t.hero.eyebrow}
              </p>
              <h1
                id="hero-h"
                className="text-[clamp(38px,5.2vw,60px)] font-bold leading-[1.14] tracking-[-0.035em]"
              >
                {t.hero.titleLine1}
                <br />
                {t.hero.titleLine2}
              </h1>
              <p className="mt-[26px] max-w-[30em] text-[18px] leading-[1.65] text-ink-2">
                {t.hero.body}
                <strong className="font-semibold text-ink">{t.hero.bodyStrong}</strong>
                {t.hero.bodyAfter}
              </p>

              <div className="mt-[34px] flex flex-wrap gap-2.5">
                <Link
                  to={to("/demo")}
                  className="flex h-12 items-center rounded-[10px] bg-invert px-[22px] text-[15.5px] font-semibold text-white"
                >
                  {common.cta.primary}
                </Link>
                <Link
                  to={to("/solution")}
                  className="flex h-12 items-center rounded-[10px] border border-line px-5 text-[15.5px] font-semibold text-ink"
                >
                  {common.cta.secondary}
                </Link>
              </div>

              <ul className="mt-[34px] flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6">
                {t.hero.assurances.map((item) => (
                  <li key={item} className="flex items-center gap-[7px] text-[13.5px] text-ink-2">
                    <span aria-hidden="true" className="h-[5px] w-[5px] rounded-full bg-brand" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <figure className="m-0">
              <ProposalCard />
              <figcaption className="mt-3 text-[13px] text-ink-3">{t.hero.caption}</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 01 누구를 위한가 */}
      <Section id="who-h">
        <div className="grid gap-[clamp(36px,5vw,72px)] lg:grid-cols-[44fr_56fr]">
          <div>
            <SectionLabel index="01">{t.who.label}</SectionLabel>
            <h2
              id="who-h"
              className="text-[clamp(28px,3.6vw,40px)] font-semibold leading-[1.25] tracking-[-0.03em]"
            >
              <Lines text={t.who.title} />
            </h2>
            <ImageSlot slot="persona" alt={t.who.photoAlt} className="mt-8 rounded-[14px] border border-line-2" />
          </div>

          <dl className="grid content-start border-t-2 border-ink">
            {t.who.items.map((item) => (
              <div key={item.term} className="border-b border-line py-[30px]">
                <dt className="text-[22px] font-semibold tracking-[-0.02em]">{item.term}</dt>
                <dd className="mt-2.5 text-[16.5px] leading-[1.7] text-ink-2">{item.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* 02 성장 루프 */}
      <Section id="loop-h" tone="panel">
        <SectionLabel index="02">{t.loop.label}</SectionLabel>
        <h2
          id="loop-h"
          className="max-w-[20em] text-[clamp(28px,3.6vw,38px)] font-semibold leading-[1.28] tracking-[-0.03em]"
        >
          {t.loop.title}
        </h2>

        <ol className="mt-14 grid gap-px [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
          {t.loop.steps.map((step) => (
            <li key={step.step} className="bg-surface px-6 pb-7 pt-[26px] shadow-[0_0_0_1px_var(--line-2)]">
              <span className="block text-[12px] font-bold tracking-[0.1em] text-brand">
                {step.step}
              </span>
              <h3 className="mt-3 text-[23px] font-semibold tracking-[-0.02em]">{step.title}</h3>
              <p className="mt-3.5 text-[15.5px] leading-[1.7] text-ink-2">{step.body}</p>
            </li>
          ))}
        </ol>

        <p className="mt-[22px] flex items-center gap-2.5 text-[14px] text-ink-2">
          <span aria-hidden="true" className="text-[16px]">
            &#8630;
          </span>
          {t.loop.note}
        </p>
      </Section>

      {/* 03 제품 화면 */}
      <Section id="chat-h">
        <div className="grid items-center gap-[clamp(36px,5vw,64px)] lg:grid-cols-[38fr_62fr]">
          <div>
            <SectionLabel index="03">{t.product.label}</SectionLabel>
            <h2
              id="chat-h"
              className="text-[clamp(26px,3.2vw,34px)] font-semibold leading-[1.3] tracking-[-0.03em]"
            >
              <Lines text={t.product.title} />
            </h2>
            <p className="mt-5 text-[16.5px] leading-[1.7] text-ink-2">{t.product.body}</p>
            <ul className="mt-6 grid gap-2.5">
              {t.product.items.map((item) => (
                <li key={item} className="flex gap-2.5 text-[15.5px] text-ink-2">
                  <span aria-hidden="true" className="text-brand">
                    &mdash;
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <figure className="m-0">
            <ChatThread />
            <figcaption className="mt-3 text-[13px] text-ink-3">{t.product.caption}</figcaption>
          </figure>
        </div>
      </Section>

      {/* 04 비교표 */}
      <Section id="cmp-h" tone="panel">
        <SectionLabel index="04">{t.compare.label}</SectionLabel>
        <h2
          id="cmp-h"
          className="mb-3 max-w-[22em] text-[clamp(28px,3.6vw,38px)] font-semibold leading-[1.28] tracking-[-0.03em]"
        >
          {t.compare.title}
        </h2>
        <p className="mb-9 text-[15px] text-ink-3">{t.compare.subtitle}</p>

        <div className="overflow-x-auto rounded-[14px] border border-line-2 bg-surface">
          <table className="w-full min-w-[640px] border-collapse text-[16px]">
            <thead>
              <tr>
                <th scope="col" className="w-[22%] border-b-2 border-ink px-6 py-[18px]" />
                <th
                  scope="col"
                  className="border-b-2 border-ink px-6 py-[18px] text-left font-semibold text-ink-2"
                >
                  {t.compare.headTool}
                </th>
                <th scope="col" className="border-b-2 border-ink px-6 py-[18px] text-left font-bold">
                  {t.compare.headUs}
                </th>
              </tr>
            </thead>
            <tbody>
              {t.compare.rows.map((row, index) => {
                const last = index === t.compare.rows.length - 1;
                const cell = last ? "px-6 py-5" : "border-b border-line px-6 py-5";
                return (
                  <tr key={row.key}>
                    <th scope="row" className={`${cell} text-left font-semibold`}>
                      {row.key}
                    </th>
                    <td className={`${cell} text-ink-2`}>{row.tool}</td>
                    <td className={`${cell} ${last ? "font-bold" : "font-semibold"}`}>{row.us}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Section>

      {/* 05 결과 */}
      <Section id="dash-h">
        <SectionLabel index="05">{t.results.label}</SectionLabel>
        <h2
          id="dash-h"
          className="mb-10 max-w-[24em] text-[clamp(28px,3.6vw,38px)] font-semibold leading-[1.28] tracking-[-0.03em]"
        >
          {t.results.title}
        </h2>
        <ResultDashboard />
      </Section>

      {/* 06 파일럿 피드백 */}
      <Section id="voice-h" tone="panel">
        <SectionLabel index="06">
          <span id="voice-h">{t.voices.label}</span>
        </SectionLabel>
        <div className="mt-10 grid gap-[clamp(32px,4vw,56px)] md:grid-cols-2">
          {t.voices.quotes.map((item, index) => (
            <figure key={item.who} className="m-0 border-t-2 border-ink pt-[26px]">
              <blockquote className="text-[clamp(20px,2.2vw,25px)] font-medium leading-[1.5] tracking-[-0.02em]">
                {item.quote}
              </blockquote>
              <figcaption className="mt-[22px] flex items-center gap-3">
                <ImageSlot
                  slot={index === 0 ? "voice-1" : "voice-2"}
                  alt={item.alt}
                  className="!w-11 shrink-0 rounded-full"
                />
                <span className="text-[14.5px] text-ink-2">{item.who}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-8 text-[13px] text-ink-3">{t.voices.note}</p>
      </Section>

      {/* 07 현재 범위 */}
      <Section id="scope-h">
        <div className="grid gap-[clamp(36px,5vw,64px)] lg:grid-cols-[40fr_60fr]">
          <div>
            <SectionLabel index="07">{t.scope.label}</SectionLabel>
            <h2
              id="scope-h"
              className="text-[clamp(26px,3.2vw,34px)] font-semibold leading-[1.3] tracking-[-0.03em]"
            >
              <Lines text={t.scope.title} />
            </h2>
          </div>

          <ol className="grid">
            {t.scope.stages.map((stage, index) => (
              <li
                key={stage.title}
                className={`grid grid-cols-[96px_1fr] gap-5 py-[26px] ${
                  index === 0 ? "border-t-2 border-ink" : "border-t border-line"
                } ${index === t.scope.stages.length - 1 ? "border-b border-line" : ""}`}
              >
                <span
                  className={`pt-[5px] text-[13px] font-semibold tracking-[0.06em] ${
                    stage.current ? "text-brand" : "text-ink-3"
                  }`}
                >
                  {stage.when}
                </span>
                <div>
                  <h3 className="text-[19px] font-semibold">{stage.title}</h3>
                  <p className="mt-2 text-[15.5px] leading-[1.7] text-ink-2">{stage.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* CTA */}
      <section aria-labelledby="cta-h" className="border-b border-line bg-invert text-white">
        <div className={`${SHELL} py-[clamp(80px,9vw,132px)]`}>
          <h2
            id="cta-h"
            className="max-w-[24em] text-[clamp(30px,4.4vw,52px)] font-bold leading-[1.18] tracking-[-0.035em]"
          >
            <Lines text={t.cta.title} />
          </h2>
          <p className="mt-6 max-w-[28em] text-[18px] leading-[1.65] text-invert-ink-2">
            {t.cta.body}
          </p>
          <div className="mt-[38px] flex flex-wrap gap-2.5">
            <Link
              to={to("/demo")}
              className="flex h-[52px] items-center rounded-[10px] bg-white px-6 text-[16px] font-semibold text-ink"
            >
              {common.cta.primary}
            </Link>
            <Link
              to={to("/demo")}
              className="flex h-[52px] items-center rounded-[10px] border border-[#3A3A38] px-[22px] text-[16px] font-semibold text-white"
            >
              {common.cta.demo}
            </Link>
          </div>
        </div>
      </section>

      <ImageSlot
        slot="footer-wide"
        alt={t.footerImageAlt}
        className="h-[clamp(220px,26vw,380px)]"
      />
    </div>
  );
}
```

- [ ] **Step 3: 타입 검사와 테스트**

Run: `npx tsc --noEmit && npm test`
Expected: 에러 없음, 전체 통과

- [ ] **Step 4: 개발 서버로 확인**

Run: `npm run dev`

확인 항목:
- `/` — 7개 섹션이 01~07 라벨과 함께 순서대로 보인다
- 히어로 우측에 제안 화면 목업이, 03 섹션에 대화 목업이, 05 섹션에 리포트 목업이 보인다
- 04 비교표가 640px 미만에서 가로 스크롤된다 (페이지 전체가 아니라 표 안에서)
- `/en` — 같은 레이아웃에 **영문 카피**가 나오고, **목업 안 글자도 영어**로 바뀐다
- 375px 폭에서 스플릿 그리드가 단일 컬럼으로 접히고 가로 스크롤이 없다
- 파일럿 피드백 아바타가 원형으로 잘린다

- [ ] **Step 5: 커밋**

```bash
git add src/app/pages/Home.tsx
git commit -m "$(cat <<'EOF'
feat: 홈을 새 에디토리얼 디자인으로 전환

01~07 번호를 매긴 섹션 구조, 비대칭 스플릿 그리드, 헤어라인
보더 기반으로 전면 교체했다. 기존의 중앙정렬 카드 반복과
그라데이션 글로우, motion 라이브러리 개별 설정을 걷어내고
rise 애니메이션 하나로 통일했다.

제품 화면 3개는 이미지가 아니라 목업 컴포넌트라, 로케일에
따라 화면 속 문구까지 함께 바뀐다.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 13: 산출 HTML 검증

프리렌더 결과가 실제로 의도대로 나오는지 자동으로 확인한다. README 가 이미 `curl` + `rg` 로 정립한 검증을 스크립트로 고정한다.

**Files:**
- Create: `scripts/check-html.mjs`
- Modify: `package.json`
- Modify: `README.md`

**Interfaces:**
- Consumes: Task 5·6의 프리렌더 산출물
- Produces: `npm run check:html` 명령

- [ ] **Step 1: 검증 스크립트 작성**

`scripts/check-html.mjs`:

```js
import { readFile } from "node:fs/promises";
import path from "node:path";

const distDir = path.join(process.cwd(), "dist");
const failures = [];

async function read(route) {
  const file =
    route === "/" ? path.join(distDir, "index.html") : path.join(distDir, route.slice(1), "index.html");
  return readFile(file, "utf8");
}

function check(label, condition) {
  if (!condition) failures.push(label);
}

const ko = await read("/");
const en = await read("/en");
const pricing = await read("/pricing");
const demo = await read("/demo");

// 초기 HTML 에 본문이 들어 있는가 (크롤러 · NotebookLM 이 보는 내용)
check("한국어 홈에 포지셔닝 문구 없음", ko.includes("첫 번째 팀"));
check("한국어 홈에 성장 루프 없음", ko.includes("제안 → 승인 → 실행 → 반복 성장"));
check("한국어 홈에 CTA 없음", ko.includes("우리팀과 같이 성장하기"));
check("영어 홈에 포지셔닝 문구 없음", en.includes("first team"));
check("영어 홈에 CTA 없음", en.includes("Grow with WooriTeam"));

// 목업 안 문구가 텍스트로 남는가 (GEO)
check("한국어 홈에 목업 문구 없음", ko.includes("이번 주 할 일"));
check("영어 홈에 목업 문구 없음", en.includes("this week"));

// 로케일이 섞이지 않는가
check("한국어 홈에 영문 CTA 혼입", !ko.includes("Grow with WooriTeam"));
check("영어 홈에 한글 혼입", !/[가-힣]/.test(en.replace(/<script[\s\S]*?<\/script>/g, "")));

// html lang
check("한국어 html lang 오류", ko.includes('<html lang="ko">'));
check("영어 html lang 오류", en.includes('<html lang="en">'));

// hreflang
check("영문판 있는 경로에 hreflang 없음", (pricing.match(/hreflang/g) ?? []).length === 3);
check("영문판 없는 경로에 hreflang 있음", !demo.includes("hreflang"));

// 이전 브랜드 흔적
for (const [name, html] of [["ko", ko], ["en", en], ["pricing", pricing]]) {
  check(`${name} 에 CMO AI Agent 잔존`, !html.includes("CMO AI Agent"));
  check(`${name} 에 flow-form.png 잔존`, !html.includes("flow-form"));
}

if (failures.length > 0) {
  console.error("[check-html] 검증 실패");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("[check-html] 통과");
```

- [ ] **Step 2: package.json 에 등록**

`scripts`에 추가하고 `build` 뒤에 붙인다:

```json
"check:html": "node ./scripts/check-html.mjs",
"build": "node ./scripts/verify-assets.mjs && node ./scripts/prerender.mjs && node ./scripts/check-html.mjs"
```

- [ ] **Step 3: 빌드 실행**

Run: `npm run build`
Expected: 마지막 줄에 `[check-html] 통과`

실패하면 출력된 항목을 보고 해당 Task 로 돌아가 고친다.

- [ ] **Step 4: 검증 항목이 실제로 동작하는지 확인**

`src/content/en/common.ts`의 `cta.primary`를 잠시 `"우리팀과 같이 성장하기"`로 바꾸고:

Run: `npm run build`
Expected: FAIL — `영어 홈에 한글 혼입`, `영어 홈에 CTA 없음`

확인 후 되돌린다.

- [ ] **Step 5: README 갱신**

`README.md`의 "크롤러 / NotebookLM 검증" 절 앞에 추가한다:

```markdown
### 자동 검증

```bash
npm run build
```

빌드 마지막에 `scripts/check-html.mjs`가 프리렌더 산출물을 검사합니다.

- 초기 HTML 에 핵심 문구가 들어 있는지
- 한국어·영어 페이지에 상대 언어가 섞이지 않았는지
- `<html lang>` 과 `hreflang` 이 로케일에 맞는지
- 이전 브랜드 흔적이 남지 않았는지
```

같은 파일의 "주요 페이지" 표 아래에 영문 경로 안내를 추가한다:

```markdown
영문판은 `/en/` 아래 7개 경로에 있습니다: `/en`, `/en/solution`, `/en/technology`,
`/en/pricing`, `/en/about`, `/en/contact`, `/en/ir`.
`/demo`, `/apps`, `/privacy`, `/terms` 는 한국어만 제공합니다.
```

- [ ] **Step 6: 전체 검증**

Run: `npm test && npx tsc --noEmit && npm run build && npm run preview`

브라우저에서 확인:
- `http://localhost:4173/` 와 `/en` 이 각각 한국어·영어로 뜬다
- DevTools 에서 JavaScript 를 끄고 새로고침해도 본문이 보인다
- DevTools > Rendering > `prefers-reduced-motion: reduce` 를 켜면 히어로 진입 애니메이션이 사라진다
- 375px 폭에서 모든 섹션에 가로 스크롤이 없다

- [ ] **Step 7: 커밋**

```bash
git add scripts/check-html.mjs package.json README.md
git commit -m "$(cat <<'EOF'
feat: 프리렌더 산출 HTML 자동 검증

README 가 curl 로 수동 확인하던 항목을 빌드 단계로 옮겼다.
초기 HTML 의 핵심 문구, 로케일 혼입, html lang, hreflang,
이전 브랜드 흔적을 검사하고 실패 시 빌드를 중단한다.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

## 완료 기준

- [ ] `npm test` 통과
- [ ] `npx tsc --noEmit` 에러 없음
- [ ] `npm run build` 통과 (`check-html` 포함)
- [ ] `/` 와 `/en` 이 각각 한국어·영어로 렌더된다
- [ ] 헤더·푸터·홈이 새 디자인이다
- [ ] 목업 3종이 로케일에 따라 내부 문구까지 바뀐다
- [ ] 이미지 슬롯 4개가 샘플로 채워져 있고 빌드 시 경고가 나온다
- [ ] `grep -rn "autocmo" src/ ssg/` 결과가 비어 있다
- [ ] 375px 폭에서 가로 스크롤이 없다

## 다음 계획

- **계획 2:** 나머지 10개 페이지 전환 (`Solution` `Pricing` `Technology` `About` `Contact` `IR` `Demo` `Apps` `Privacy` `Terms`)
- **계획 3:** 브랜드 자산과 GEO 마무리 (파비콘, OG 카드, 구조화 데이터 확장, `llms.txt`, `robots.txt` AI 크롤러 허용)

---

### Task 3B: TypeScript 타입 검사 도입

> 이 태스크는 계획 작성 후 실행 중에 추가되었다. Task 3 실행 중 `npx tsc --noEmit` 이
> 동작하지 않는 것이 드러났고, 확인 결과 이 저장소에는 `tsconfig.json` 도,
> `typescript` 의존성도, 타입 검사 스크립트도 없다. Vite 는 esbuild 로 타입을
> **검사하지 않고 제거**하므로, `.tsx` 코드가 한 번도 타입 검사를 받은 적이 없다.
>
> Task 4 의 설계 전체가 "영문 사전에 항목이 빠지면 컴파일 에러로 잡힌다"에 의존한다.
> 타입을 검사하는 지점이 없으면 그 보장은 존재하지 않는다. Task 4 이전에 세워야 한다.

**Files:**
- Create: `tsconfig.json`
- Modify: `package.json`
- Modify: `README.md`

**Interfaces:**
- Consumes: 없음
- Produces: `npm run typecheck` 명령. Task 4·9·11 이 번역 누락 검증에 사용한다.
  `tsconfig.json` 의 `paths` 가 `@/*` → `./src/*` 를 해석하므로 이후 모든 태스크의
  `@/` import 가 타입 검사를 통과한다.

- [ ] **Step 1: 의존성 설치**

```bash
npm install -D typescript@5.9.2 @types/react@18.3.12 @types/react-dom@18.3.1 @types/node@24.3.0
```

- [ ] **Step 2: tsconfig.json 작성**

`vite.config.ts` 의 `resolve.alias` 가 `@` → `./src` 를 매핑하므로 `paths` 를 같은 값으로 맞춘다.
`types` 에 `vite/client` 를 넣으면 `import.meta.env` 가 타입을 얻는다 — Task 3 의
`ssg/site.ts` 가 이 타입을 필요로 한다.

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noEmit": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "forceConsistentCasingInFileNames": true,
    "types": ["vite/client", "node"],
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["src", "ssg", "scripts", "vite.config.ts", "vitest.config.ts"]
}
```

- [ ] **Step 3: 스크립트 등록**

`package.json` 의 `scripts` 에 추가한다:

```json
"typecheck": "tsc --noEmit"
```

`build` 는 이 단계에서 **아직 바꾸지 않는다.** 먼저 기존 오류 규모를 재고 나서 결정한다.

- [ ] **Step 4: 기존 오류 규모 측정**

Run: `npm run typecheck 2>&1 | tee /tmp/tsc-baseline.txt; echo "---"; grep -c "error TS" /tmp/tsc-baseline.txt`

이 저장소는 타입 검사를 받은 적이 없으므로 오류가 나오는 것이 정상이다. **놀라지 말 것.**
다음을 기록한다:

- 총 오류 개수
- 파일별 오류 개수 (`grep -oE "^[^(]+" /tmp/tsc-baseline.txt | sort | uniq -c | sort -rn`)
- 오류 코드별 빈도 (`grep -oE "error TS[0-9]+" /tmp/tsc-baseline.txt | sort | uniq -c | sort -rn`)

- [ ] **Step 5: 이 계획이 만든 코드의 오류를 고친다**

우선순위는 **이 브랜치가 만들었거나 수정한 파일**이다:
`ssg/site.ts`, `ssg/site.test.ts`, `ssg/seo.ts`, `ssg/entry-server.tsx`,
`src/styles/tokens.ts`, `src/styles/tokens.test.ts`, `vitest.config.ts`.

이 파일들의 오류는 **전부 고친다.** 특히 `ssg/site.ts` 의 `import.meta.env` 접근은
`types: ["vite/client"]` 로 정식 타입을 얻으므로, Task 3 이 넣어둔 인라인 캐스팅
(`(import.meta as { env?: ... })`)이 불필요해졌다면 정식 타입으로 단순화한다.
단순화가 타입 검사를 통과하지 못하면 캐스팅을 유지하고 이유를 주석으로 남긴다.

- [ ] **Step 6: 기존 코드의 오류를 처리한다**

이 브랜치가 손대지 않은 legacy 파일(`src/app/pages/*`, `src/app/components/ui/*` 등)의
오류는 이 태스크의 범위가 아니다. 다만 `npm run typecheck` 가 항상 실패하면 이후
태스크가 이 명령을 신호로 쓸 수 없다. 오류 규모에 따라 다음 중 하나를 택한다:

- **오류 0개:** 그대로 둔다. Step 7 로 간다.
- **오류가 적고(20개 이하) 기계적이면:** 고친다. 무엇을 왜 고쳤는지 보고서에 남긴다.
- **오류가 많거나 판단이 필요하면:** 고치지 않는다. 대신 `tsconfig.json` 의 `include`
  는 그대로 두고, 별도로 `tsconfig.strict.json` 을 만들어 이 계획이 만드는 경로만
  검사하게 한다:

  ```json
  {
    "extends": "./tsconfig.json",
    "include": ["src/content", "src/app/i18n", "src/styles/tokens.ts", "src/styles/tokens.test.ts", "ssg"]
  }
  ```

  그리고 스크립트를 둘로 나눈다:

  ```json
  "typecheck": "tsc --noEmit -p tsconfig.strict.json",
  "typecheck:all": "tsc --noEmit"
  ```

  이렇게 하면 `npm run typecheck` 는 **초록으로 유지되어 이후 태스크의 신호로 쓸 수 있고**,
  `typecheck:all` 은 legacy 부채의 현재 규모를 언제든 볼 수 있게 남는다.
  어느 쪽을 택했는지와 그 이유를 보고서에 반드시 적는다.

- [ ] **Step 7: 번역 누락이 실제로 잡히는지 확인**

이 태스크의 존재 이유를 직접 검증한다. `ssg/site.ts` 에 의도적으로 타입 오류를 넣는다:

```ts
export const SITE_URL: number = readSiteUrl();
```

Run: `npm run typecheck`
Expected: FAIL — `Type 'string' is not assignable to type 'number'`

되돌린 뒤 다시 실행해 통과하는 것을 확인한다. **이 확인을 건너뛰지 말 것** — 설정만
해두고 실제로 아무것도 검사하지 않는 상태가 이 태스크가 막으려는 바로 그 상황이다.

- [ ] **Step 8: build 에 연결**

Step 6 에서 `typecheck` 가 초록으로 유지되는 것을 확인했다면 `build` 앞에 붙인다:

```json
"build": "npm run typecheck && node ./scripts/verify-assets.mjs && node ./scripts/prerender.mjs"
```

초록이 아니면 붙이지 않고, 그 사실을 보고서에 적는다.

- [ ] **Step 9: README 갱신**

`README.md` 의 "로컬 실행" 절 뒤에 추가한다:

```markdown
## 타입 검사

```bash
npm run typecheck
```

이 저장소는 Vite 로 빌드되는데, Vite 는 타입을 검사하지 않고 제거합니다.
타입 오류는 이 명령으로만 드러납니다.
```

Step 6 에서 스크립트를 둘로 나눴다면 `typecheck:all` 도 함께 문서화한다.

- [ ] **Step 10: 커밋**

```bash
git add tsconfig.json package.json package-lock.json README.md
git commit -m "$(cat <<'EOF'
build: TypeScript 타입 검사 도입

이 저장소는 .tsx 코드인데 tsconfig 도 typescript 의존성도 없어
타입 검사가 한 번도 돌아간 적이 없었다. Vite 는 esbuild 로 타입을
검사하지 않고 제거하므로 오류가 드러날 지점이 없었다.

이후 태스크의 영문 사전은 한국어 사전의 타입을 구현하도록 설계돼
번역 누락이 컴파일 에러로 잡히는데, 그 보장이 성립하려면 타입을
검사하는 지점이 먼저 있어야 한다.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```
