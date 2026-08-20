# WooriTeam 리디자인 3: 남은 페이지 (기술·회사·앱·약관)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** IR 을 제외한 나머지 다섯 페이지를 새 디자인으로 전환하고, 그중 둘에 영문판을 붙여 사이트를 11개 중 10개까지 완성한다.

**Architecture:** 계획 2가 네 페이지에서 손으로 복사한 히어로·마감 CTA·제품 CTA 블록을 먼저 공용 프리미티브로 승격한다. 그러면 남은 다섯 페이지는 블록 조합이 되고, 계획 4의 IR 도 같은 부품을 쓴다. 카피는 페이지에서 사전으로 뽑아내되 문구를 바꾸지 않는다.

**Tech Stack:** Vite 6, React 18, React Router 7, TypeScript, Tailwind CSS 4, Vitest

**선행 문서**
- 설계: [2026-08-15-homepage-redesign-design.md](../specs/2026-08-15-homepage-redesign-design.md)
- 계획 1 인수인계: [REDESIGN_PLAN1_HANDOFF.md](../REDESIGN_PLAN1_HANDOFF.md)
- 계획 2 인수인계: [REDESIGN_PLAN2_HANDOFF.md](../REDESIGN_PLAN2_HANDOFF.md)

**이 계획의 범위:** `/technology`, `/about`, `/apps`, `/privacy`, `/terms` 다섯 페이지 + 영문 2개(`/en/technology`, `/en/about`). `/apps`, `/privacy`, `/terms` 는 한국어만. **`/ir` 은 계획 4.**

**완료 시점 상태:** 11개 중 10개가 새 디자인. `/ir` 만 다크로 남는다. 배포 게이트가 영문 3개 경로에서 **`/en/ir` 하나로** 줄어든다.

## Global Constraints

- 브랜드 표기는 항상 `WooriTeam` / `우리팀`. 한국어 문맥에서는 `우리팀`. `autocmo`, `AutoCMO`, `CMO AI Agent`, `ZeroSeller` 를 브랜드 식별자로 쓰지 않는다.
- 메인 CTA 문구는 한국어 `우리팀과 같이 성장하기`, 영어 `Grow with WooriTeam`. 목적지는 `APP_URLS.cmo`, `target="_blank"` + `rel="noopener noreferrer"`.
- 핵심 루프 표기는 `제안 → 승인 → 실행 → 반복 성장` (화살표 ` → `, 공백 포함).
- 새 코드에서 `slate-*`, `cyan-*`, `indigo-*`, `pink-*` 를 쓰지 않는다. 브랜드 토큰만.
- 진입 애니메이션은 `.rise` 하나. `motion/react` 를 새로 들이지 않는다.
- 내부 링크는 전부 `<LocaleLink>`. `localePath`/`pathHreflang` 을 손으로 호출하지 않는다.
- 영문판이 존재하는 경로는 `/`, `/solution`, `/technology`, `/pricing`, `/about`, `/contact`, `/ir` 뿐이다.
- **기존 카피를 다시 쓰지 않는다.** 사전으로 옮길 때 문구·띄어쓰기·문장부호를 그대로 유지한다.
- **개인정보처리방침과 이용약관의 문구는 한 글자도 바꾸지 않는다.** 법적 효력이 있는 문서다. 마크업만 바꾼다.
- 커밋 메시지는 한국어, 끝에 `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>`.

## 전환 레시피

계획 2와 동일하다. 기존 다크 유틸리티를 역할에 맞는 브랜드 토큰으로 옮긴다.

| 기존 | 새 토큰 |
|---|---|
| `bg-slate-950`, `bg-slate-900/30` | `bg-ground` / `bg-panel` (섹션 교대) |
| `text-white` | `text-ink` |
| `text-slate-300`, `text-slate-400` | `text-ink-2` |
| `text-slate-500`, `text-slate-600` | `text-ink-3` |
| `border-slate-800` | `border-line` (구분선) / `border-line-2` (카드) |
| `text-cyan-400`, `text-cyan-300` | `text-brand` |
| 그라데이션 버튼 | `bg-invert text-white` |
| `rounded-full` 버튼 | `rounded-[10px]` |
| `rounded-2xl` 카드 | `rounded-[14px]` + `border border-line-2` |
| blur 글로우 원형 div | 삭제 |
| `motion.div` + `initial/animate` | 섹션 단위 `className="rise"` 한 번 |

참고 구현: `src/app/pages/Solution.tsx` (가장 단순), `src/app/pages/Pricing.tsx` (긴 페이지), `src/app/pages/Contact.tsx` (폼).

## File Structure

**신규**

| 파일 | 책임 |
|------|------|
| `src/app/components/page/PageHero.tsx` | 히어로 블록 (eyebrow + 2줄 제목 + 본문) |
| `src/app/components/page/ClosingCta.tsx` | 반전 마감 CTA 블록 |
| `src/app/components/page/useProductCta.ts` | 제품 앱 외부 링크 prop 묶음 |
| `src/content/ko/technology.ts` · `en/technology.ts` | 기술 카피 |
| `src/content/ko/about.ts` · `en/about.ts` | 회사 카피 |
| `src/content/ko/apps.ts` | 앱 카피 (한국어만) |
| `src/content/ko/legal.ts` | 개인정보처리방침 + 이용약관 (한국어만) |

**수정**

| 파일 | 변경 |
|------|------|
| `src/app/pages/Home.tsx` `Solution.tsx` `Pricing.tsx` `Demo.tsx` `Contact.tsx` | 승격된 블록으로 교체 |
| `src/app/pages/Technology.tsx` `About.tsx` `Apps.tsx` `Privacy.tsx` `Terms.tsx` | 전환 |
| `src/content/index.ts` | 새 사전 4종 등록 |
| `src/content/site.json` | 죽은 키 3개 제거, `appsPage` 이관 |
| `scripts/check-html.mjs` | 검사 경로 9 → 16 확대 |

---

### Task 1: 공용 블록 승격과 선행 정리

계획 2 최종 리뷰가 지적한 사항이다. 히어로와 마감 CTA 가 네 페이지에 손으로 복사돼 있고, 각 파일이 "왜 직접 짰는지" 주석까지 달고 있다. 다섯 페이지를 더 전환하기 전에 승격한다.

**Files:**
- Create: `src/app/components/page/PageHero.tsx`, `ClosingCta.tsx`, `useProductCta.ts`
- Create: `src/app/components/page/blocks.test.tsx`
- Modify: `src/app/pages/Home.tsx`, `Solution.tsx`, `Pricing.tsx`, `Demo.tsx`, `Contact.tsx`
- Modify: `src/app/components/page/index.tsx` (재수출)
- Modify: `src/content/site.json`

**Interfaces:**
- Consumes: `SHELL`, `LocaleLink`, `useCopy`, `useLocale`, `APP_URLS`, `APP_HAS_ENGLISH`, `foreignHreflang`
- Produces:
  - `<PageHero eyebrow titleLine1 titleLine2 body?>` — `id="hero-h"` 를 `<h1>` 에 붙이고 `<section aria-labelledby="hero-h">` 로 감싼다
  - `<ClosingCta title primaryLabel secondaryLabel>` — 반전 배경, `id="cta-h"`
  - `useProductCta(): { href, target, rel, hrefLang }`
  Task 2~5 가 전부 사용한다.

- [ ] **Step 1: 무엇이 진짜 같은지 먼저 잰다**

승격 전에 다섯 페이지의 히어로와 마감 CTA 를 실제로 대조한다. **같다고 가정하지 않는다.**

```bash
for f in Home Solution Pricing Demo Contact; do
  echo "── $f"
  sed -n '/aria-labelledby="hero-h"/,/<\/section>/p' src/app/pages/$f.tsx | head -20
done
```

홈의 히어로는 제품 목업이 들어간 좌우 스플릿이라 **다른 모양일 가능성이 높다.** 마감 CTA 도 페이지마다 있는지 확인한다.

**진짜로 동일한 것만 승격한다.** 다른 것은 그대로 두고, 무엇을 왜 제외했는지 보고서에 적는다. 억지로 하나의 컴포넌트에 맞추려고 prop 을 늘리지 않는다 — 그러면 승격의 이득이 사라진다.

- [ ] **Step 2: 승격**

Step 1에서 동일하다고 확인된 블록만 옮긴다. `PageHero` 의 기준 형태(솔루션 기준):

```tsx
<section aria-labelledby="hero-h" className="border-b border-line">
  <div className={`${SHELL} pb-[clamp(64px,7vw,104px)] pt-[clamp(56px,7vw,96px)]`}>
    <div className="rise">
      <p className="mb-[22px] text-[13px] font-semibold uppercase tracking-[0.1em] text-brand">
        {eyebrow}
      </p>
      <h1 id="hero-h" className="max-w-[14em] text-[clamp(38px,5.2vw,60px)] font-bold leading-[1.14] tracking-[-0.035em]">
        {titleLine1}<br />{titleLine2}
      </h1>
      {body && (
        <p className="mt-[26px] max-w-[34em] text-[18px] leading-[1.65] text-ink-2">{body}</p>
      )}
    </div>
  </div>
</section>
```

`ClosingCta` 의 기준 형태:

```tsx
// 훅은 컴포넌트 본문 상단에서 호출한다. JSX 안에서 부르지 않는다.
const productCta = useProductCta();

<section aria-labelledby="cta-h" className="border-b border-line bg-invert text-white">
  <div className={`${SHELL} py-[clamp(80px,9vw,132px)]`}>
    <h2 id="cta-h" className="max-w-[20em] text-[clamp(30px,4.4vw,52px)] font-bold leading-[1.18] tracking-[-0.035em]">
      {title}
    </h2>
    <div className="mt-[38px] flex flex-wrap gap-2.5">
      <a {...productCta} className="flex h-[52px] items-center rounded-[10px] bg-white px-6 text-[16px] font-semibold text-ink">
        {primaryLabel}
      </a>
      <LocaleLink to="/demo" className="flex h-[52px] items-center rounded-[10px] border border-invert-line px-[22px] text-[16px] font-semibold text-white">
        {secondaryLabel}
      </LocaleLink>
    </div>
  </div>
</section>
```

클래스 문자열을 **한 글자도 바꾸지 않는다.** 이 태스크는 순수 이동이다.

- [ ] **Step 3: 산출물이 바뀌지 않았음을 증명**

승격은 렌더 결과를 바꾸면 안 된다.

```bash
npm run build
for p in "" solution pricing demo contact en en/solution en/pricing en/contact; do
  d="dist/${p}/index.html"; [ -z "$p" ] && d="dist/index.html"
  cp "$d" "/tmp/before-$(echo ${p:-home} | tr / -).html"
done
git stash
npm run build
for p in "" solution pricing demo contact en en/solution en/pricing en/contact; do
  d="dist/${p}/index.html"; [ -z "$p" ] && d="dist/index.html"
  b="/tmp/before-$(echo ${p:-home} | tr / -).html"
  diff <(sed 's/index-[A-Za-z0-9_-]*\.js/BUNDLE/g' "$b") <(sed 's/index-[A-Za-z0-9_-]*\.js/BUNDLE/g' "$d") >/dev/null && echo "${p:-home}: 동일" || echo "${p:-home}: 차이 있음 ✗"
done
git stash pop
```

번들 파일명 해시는 정규화한다. **여덟 경로 모두 `동일` 이어야 한다.** 하나라도 다르면 승격 중 무언가 바뀐 것이므로 되돌리고 다시 한다.

- [ ] **Step 4: 홈의 수동 링크 두 곳을 `LocaleLink` 로**

`src/app/pages/Home.tsx` 에 `hrefLang={pathHreflang(...)}` 을 손으로 붙인 `<Link>` 가 두 곳 있다. 계획 2 리뷰가 지적했다 — `LocaleLink` 는 "페이지 전환 시 반드시 쓰라"고 선언해놓고 정작 기준 페이지인 홈이 수동이라, 이후 구현자가 홈을 읽고 수동 패턴을 베낀다.

두 곳을 `<LocaleLink>` 로 교체한다. 렌더 결과는 같아야 하며, Step 3의 대조에 포함된다.

- [ ] **Step 5: `site.json` 죽은 키 제거**

소비자가 없는 세 키를 지운다: `tagline`, `taglineShort`, `primaryCta`.

지우기 전에 확인한다:

```bash
grep -rn "tagline\|taglineShort\|primaryCta" src/ ssg/ scripts/
```

`site.json` 자신 외에 나오면 지우지 말고 보고한다. **`tagline` 은 이미 `ko/common.ts` 와 갈라져 있다** — `site.json` 은 `"창업자의 첫 번째 팀."`(마침표 있음), 사전은 `"창업자의 첫 번째 팀"`. 사전이 정본이다.

`siteName`, `footer`, `appsPage` 는 아직 `IR.tsx`/`Apps.tsx` 가 읽으므로 남긴다.

- [ ] **Step 6: 테스트와 커밋**

`src/app/components/page/blocks.test.tsx` 에 프리미티브 검증을 넣는다. 저장소 패턴(함수 호출 + 엘리먼트 트리 검사)을 따른다. 최소한:
- `PageHero` 가 `<h1 id="hero-h">` 를 낸다
- `PageHero` 의 `body` 가 없으면 본문 `<p>` 를 렌더하지 않는다
- `ClosingCta` 가 `<h2 id="cta-h">` 를 낸다

```bash
npm run typecheck && npx vitest run && npm run build
git add src/app/components/page src/app/pages src/content/site.json
git commit -m "$(cat <<'EOF'
refactor: 히어로·마감 CTA 블록을 공용 프리미티브로 승격

계획 2에서 네 페이지가 같은 블록을 손으로 복사했고 각자 왜 직접
짰는지 주석까지 달았다. 다섯 페이지를 더 전환하기 전에 옮긴다.

홈의 수동 링크 두 곳을 LocaleLink 로 바꿨다. 기준 페이지가 수동
패턴이면 이후 구현자가 그걸 베낀다.

site.json 의 소비자 없는 키 세 개를 지웠다. tagline 은 사전과
마침표 하나로 이미 갈라져 있었다.

빌드 산출물이 여덟 경로 모두 승격 전후로 동일함을 확인했다.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: 기술 페이지

**Files:**
- Create: `src/content/ko/technology.ts`, `src/content/en/technology.ts`
- Modify: `src/content/index.ts`, `src/app/pages/Technology.tsx`

**Interfaces:**
- Consumes: Task 1의 `PageHero`·`ClosingCta`·`useProductCta`, `Section`·`SectionLabel`·`Lines`, `LocaleLink`, `useCopy`, `DeepWiden`
- Produces: `Dictionary` 에 `technology` 키

**현재 구조 (`src/app/pages/Technology.tsx`, 118줄):** 히어로 / 성장 파이프라인 / 마감 CTA. 하드코딩 색상 18줄.

- [ ] **Step 1: 한국어 사전 작성**

`src/content/ko/technology.ts`. **현재 `Technology.tsx` 안의 문구를 그대로 옮긴다.** 형태:

```ts
export const technology = {
  hero: { /* … */ },
  pipeline: { /* … */ },
  cta: { /* … */ },
} as const;

export type TechnologyCopy = typeof technology;
```

**`as const` 를 빠뜨리면 배열이 넓어져 영문 원소 누락이 컴파일 에러로 안 잡힌다.** 반드시 붙인다.

- [ ] **Step 2: 영어 사전 작성**

```ts
import type { TechnologyCopy } from "../ko/technology";
import type { DeepWiden } from "../widen";

export const technology: DeepWiden<TechnologyCopy> = { /* … */ };
```

영문은 직역이 아니라 영어로 쓴 글이어야 한다. 섹션 라벨은 기존 관례대로 대문자(`en/solution.ts`, `en/pricing.ts` 참조).

- [ ] **Step 3: 사전 등록**

`src/content/index.ts` 의 `Dictionary` 와 `dictionaries` 양쪽에 `technology` 를 추가한다. `satisfies` 구조를 유지한다.

- [ ] **Step 4: 번역 누락 보장 확인**

`src/content/en/technology.ts` 에서 키 하나를 지우고, 이어서 배열 원소 하나를 지운다.

Run: `npm run typecheck`
Expected: 두 경우 모두 FAIL — 키 누락은 `TS2741`, 배열 원소 누락은 `Source has N element(s) but target requires N+1`. 복구 후 통과 확인. 실제 출력을 보고서에 붙인다.

- [ ] **Step 5: 페이지 전환**

전환 레시피 적용. `PageHero` 와 `ClosingCta` 를 쓴다. 나머지 섹션은 `Section` + `SectionLabel` + `<h2 id>`.

**섹션마다 `aria-labelledby` 대상 heading 이 정확히 하나 있어야 한다.** 별도 제목이 없는 섹션은 `<SectionLabel as="h2" id="…">` 로 라벨을 승격한다.

- [ ] **Step 6: 검증**

Run: `npm run build`

브라우저에서 `/technology` 와 `/en/technology` 를 확인한다. **375px 에서는 눈으로 보지 말고 잰다** — `Layout` 의 `overflow-x-hidden` 이 넘침을 숨긴다:

```js
const vw = innerWidth, over = [];
document.querySelectorAll('main *').forEach(el => {
  const r = el.getBoundingClientRect();
  if (r.width > 0 && (r.right > vw + 0.5 || r.left < -0.5)) over.push(el.tagName);
});
console.log({ vw, scrollWidth: document.documentElement.scrollWidth, overflow: over.length });
```

확인 항목: 넘침 0 · 섹션마다 heading 1개 · `/en/technology` 본문 한글 0 · 내부 링크의 `hreflang` 정상.

- [ ] **Step 7: 커밋**

```bash
git add src/content/ko/technology.ts src/content/en/technology.ts src/content/index.ts src/app/pages/Technology.tsx
git commit -m "$(cat <<'EOF'
feat: 기술 페이지를 새 디자인으로 전환하고 영문판을 붙인다

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: 회사소개 페이지

**Files:**
- Create: `src/content/ko/about.ts`, `src/content/en/about.ts`
- Modify: `src/content/index.ts`, `src/app/pages/About.tsx`

**Interfaces:**
- Consumes: Task 1의 프리미티브, `Section`·`SectionLabel`·`Lines`, `LocaleLink`, `useCopy`, `DeepWiden`
- Produces: `Dictionary` 에 `about` 키

**현재 구조 (118줄):** 히어로 / 미션 / 방향 / 마감 CTA. 하드코딩 색상 18줄. `<h2>` 가 5개로 다른 페이지보다 많다 — 섹션 구획을 먼저 파악한다.

- [ ] **Step 1: 한국어 사전 작성**

`src/content/ko/about.ts`. 현재 문구를 그대로 옮긴다. 형태:

```ts
export const about = {
  hero: { /* … */ },
  mission: { /* … */ },
  direction: { /* … */ },
  cta: { /* … */ },
} as const;

export type AboutCopy = typeof about;
```

섹션 키는 실제 페이지 구조를 보고 정한다. 위는 예시이며, `<h2>` 5개가 어떻게 묶이는지 먼저 읽는다.

`as const` 필수.

- [ ] **Step 2: 영어 사전 작성**

```ts
import type { AboutCopy } from "../ko/about";
import type { DeepWiden } from "../widen";

export const about: DeepWiden<AboutCopy> = { /* … */ };
```

- [ ] **Step 3: 사전 등록**

`src/content/index.ts` 의 `Dictionary` 와 `dictionaries` 양쪽에 `about` 을 추가한다.

- [ ] **Step 4: 번역 누락 보장 확인**

`src/content/en/about.ts` 에서 키 하나와 배열 원소 하나를 각각 지운다.

Run: `npm run typecheck`
Expected: 두 경우 모두 FAIL. 복구 후 통과. 실제 출력을 보고서에 붙인다.

- [ ] **Step 5: 페이지 전환**

전환 레시피 적용. `PageHero`·`ClosingCta` 사용. 섹션마다 heading 하나.

- [ ] **Step 6: 검증**

Run: `npm run build`

브라우저에서 `/about` 과 `/en/about` 을 확인한다. **375px 에서는 눈으로 보지 말고 잰다** — `Layout` 의 `overflow-x-hidden` 이 넘침을 숨긴다:

```js
const vw = innerWidth, over = [];
document.querySelectorAll('main *').forEach(el => {
  const r = el.getBoundingClientRect();
  if (r.width > 0 && (r.right > vw + 0.5 || r.left < -0.5)) over.push(el.tagName);
});
console.log({ vw, scrollWidth: document.documentElement.scrollWidth, overflow: over.length });
```

확인 항목: 넘침 0 · 섹션마다 heading 1개 · `/en/about` 본문 한글 0 · 내부 링크의 `hreflang` 정상.

- [ ] **Step 7: 커밋**

```bash
git add src/content/ko/about.ts src/content/en/about.ts src/content/index.ts src/app/pages/About.tsx
git commit -m "$(cat <<'EOF'
feat: 회사소개 페이지를 새 디자인으로 전환하고 영문판을 붙인다

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: 앱 페이지

**한국어 전용이다.** 영문 사전을 만들지 않는다. `site.json` 의 `appsPage` 를 흡수한다.

**Files:**
- Create: `src/content/ko/apps.ts`
- Modify: `src/content/index.ts`, `src/app/pages/Apps.tsx`, `src/content/site.json`

**Interfaces:**
- Consumes: Task 1의 프리미티브, `Section`·`SectionLabel`, `LocaleLink`, `useCopy`
- Produces: `Dictionary` 에 `apps` 키 (한국어만 — `en` 에도 한국어 사전을 등록)

**현재 구조 (155줄):** 히어로 / 앱 목록. `siteContent.appsPage` 를 읽고, `src/content/apps.json` 의 앱 목록도 읽는다.

- [ ] **Step 1: `site.json` 의 `appsPage` 를 사전으로 옮긴다**

`src/content/site.json` 의 `appsPage` 객체를 **값 그대로** `src/content/ko/apps.ts` 로 옮기고, `site.json` 에서 그 키를 지운다.

**`src/content/apps.json` 은 건드리지 않는다** — 앱 목록·URL 데이터이며 카피가 아니다. 계속 그대로 읽는다.

지우기 전에 확인한다:

```bash
grep -rn "appsPage" src/ ssg/
```

- [ ] **Step 2: 사전 등록**

`Dictionary` 에 `apps` 를 추가한다. **한국어 전용이므로 `dictionaries.en.apps` 에도 한국어 사전을 그대로 넣는다.** `/apps` 가 `EN_ROUTES` 에 없어 영문 화면에서 접근하면 한국어를 보게 되며, 그것이 의도된 동작이다. `demo` 가 같은 방식이므로 `src/content/index.ts` 의 그 주석을 참고하고, 같은 취지의 주석을 남긴다.

- [ ] **Step 3: 타입 검사**

Run: `npm run typecheck`
Expected: 통과. `site.json` 에서 `appsPage` 를 지웠으므로 `Apps.tsx` 가 아직 읽고 있으면 여기서 잡힌다.

- [ ] **Step 4: 페이지 전환**

전환 레시피 적용. `PageHero` 사용. 앱 카드는 `rounded-[14px] border border-line-2` 헤어라인으로.

앱 아이콘 이미지(`public/apps/*.png`)는 그대로 쓴다. 다크 배경을 전제로 만들어진 이미지가 라이트 배경에서 어색하면 **바꾸지 말고 보고한다** — 이미지 교체는 이 태스크의 범위가 아니다.

- [ ] **Step 5: 검증**

Run: `npm run build`

브라우저에서 `/apps` 를 확인한다. 영문 경로는 없다. **375px 에서는 눈으로 보지 말고 잰다** — `Layout` 의 `overflow-x-hidden` 이 넘침을 숨긴다:

```js
const vw = innerWidth, over = [];
document.querySelectorAll('main *').forEach(el => {
  const r = el.getBoundingClientRect();
  if (r.width > 0 && (r.right > vw + 0.5 || r.left < -0.5)) over.push(el.tagName);
});
console.log({ vw, scrollWidth: document.documentElement.scrollWidth, overflow: over.length });
```

확인 항목: 넘침 0 · 섹션마다 heading 1개 · 앱 카드가 세로로 쌓이고 잘리지 않음.

- [ ] **Step 6: 커밋**

```bash
git add src/content/ko/apps.ts src/content/index.ts src/content/site.json src/app/pages/Apps.tsx
git commit -m "$(cat <<'EOF'
feat: 앱 페이지를 새 디자인으로 전환한다

site.json 의 appsPage 를 사전으로 옮겼다. apps.json 은 앱 목록
데이터이므로 그대로 둔다.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 5: 개인정보처리방침과 이용약관

**법적 효력이 있는 문서다. 문구를 한 글자도 바꾸지 않는다.**

두 페이지를 한 태스크로 묶는 이유는 구조가 같고(제목 + 조항 목록) 둘 다 짧으며, 같은 사전 파일을 공유하는 게 자연스럽기 때문이다.

**Files:**
- Create: `src/content/ko/legal.ts`
- Modify: `src/content/index.ts`, `src/app/pages/Privacy.tsx`, `src/app/pages/Terms.tsx`

**Interfaces:**
- Consumes: `SHELL`, `Section`, `useCopy`
- Produces: `Dictionary` 에 `legal` 키 (한국어만)

**현재 구조:** `Privacy.tsx` 72줄 / `Terms.tsx` 73줄. 각각 `<h1>` 하나에 `<h2>` 6~7개의 조항. 하드코딩 색상 7줄씩.

- [ ] **Step 1: 전환 전 원문의 지문을 뜬다**

문구 보존을 증명할 기준선을 먼저 만든다.

```bash
node -e '
const fs=require("fs");
for (const f of ["Privacy","Terms"]) {
  const src=fs.readFileSync(`src/app/pages/${f}.tsx`,"utf8");
  const text=src.match(/>[^<>{}]*[가-힣][^<>{}]*</g)||[];
  const norm=text.map(s=>s.slice(1,-1).trim()).filter(Boolean);
  fs.writeFileSync(`/tmp/legal-${f}.json`, JSON.stringify(norm,null,1));
  console.log(f, norm.length, "개 문자열");
}'
```

- [ ] **Step 2: 사전 작성**

`src/content/ko/legal.ts` 에 두 문서를 담는다:

```ts
export const legal = {
  privacy: { title: "…", sections: [ { heading: "…", body: "…" }, /* … */ ] },
  terms: { title: "…", sections: [ /* … */ ] },
} as const;

export type LegalCopy = typeof legal;
```

**본문을 그대로 옮긴다.** 줄바꿈·띄어쓰기·문장부호·조항 번호를 유지한다. 문단이 여러 개인 조항은 `\n\n` 으로 잇거나 배열로 나눈다 — 어느 쪽이든 렌더 결과가 원문과 같아야 한다.

- [ ] **Step 3: 사전 등록**

`Dictionary` 에 `legal` 을 추가하고, 한국어 전용이므로 `en` 에도 한국어 사전을 등록한다. 이유를 주석으로 남긴다 — **법무 문서는 한국어본이 정본이며 영문 번역을 올리지 않는 것이 설계 결정이다**(설계 문서 2절 비목표).

- [ ] **Step 4: 페이지 전환**

전환 레시피 적용. 두 페이지 모두:
- `<h1>` 하나, 조항마다 `<h2>`
- 본문은 `text-ink-2`, `leading-[1.8]` 정도의 읽기 편한 행간
- 카드나 그리드로 쪼개지 않는다. 법무 문서는 순서대로 읽는 문서다
- `Section` 을 쓰되 `aria-labelledby` 는 각 조항의 `<h2>` 를 가리키게 한다

- [ ] **Step 5: 문구가 한 글자도 안 바뀌었음을 증명**

빌드 후 산출 HTML 에서 텍스트를 뽑아 Step 1의 기준선과 대조한다.

```bash
npm run build
node -e '
const fs=require("fs");
for (const [f,p] of [["Privacy","privacy"],["Terms","terms"]]) {
  const base=JSON.parse(fs.readFileSync(`/tmp/legal-${f}.json`,"utf8"));
  const html=fs.readFileSync(`dist/${p}/index.html`,"utf8");
  const main=(html.match(/<main[^>]*>([\s\S]*?)<\/main>/)||[])[1]||"";
  const text=main.replace(/<[^>]+>/g," ").replace(/\s+/g," ");
  const missing=base.filter(s=>!text.includes(s));
  console.log(f, "기준선", base.length, "누락", missing.length);
  if (missing.length) console.log("  누락분:", missing.slice(0,5));
}'
```

**누락 0 이어야 한다.** 하나라도 있으면 전환 중 문구가 바뀐 것이므로 되돌리고 다시 한다. 기준선을 고쳐서 맞추지 않는다.

- [ ] **Step 6: 검증과 커밋**

`/privacy` 와 `/terms` 를 375px 에서 측정한다(넘침 0, 섹션마다 heading 1개).

```bash
npm run typecheck && npx vitest run && npm run build
git add src/content/ko/legal.ts src/content/index.ts src/app/pages/Privacy.tsx src/app/pages/Terms.tsx
git commit -m "$(cat <<'EOF'
feat: 개인정보처리방침과 이용약관을 새 디자인으로 전환한다

법적 효력이 있는 문서이므로 문구는 한 글자도 바꾸지 않고
마크업과 시각 언어만 전환했다. 전환 전 원문에서 뽑은 문자열이
산출 HTML 에 전부 남아 있음을 확인했다.

한국어본이 정본이며 영문판을 만들지 않는다(설계 2절 비목표).

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 6: 검증 범위 확대와 마감

**Files:**
- Modify: `scripts/check-html.mjs`
- Modify: `README.md`
- Modify: `docs/superpowers/REDESIGN_PLAN2_HANDOFF.md`

- [ ] **Step 1: 검사 경로 확대**

`scripts/check-html.mjs` 의 `PAGES` 배열에 이번에 전환한 경로를 더한다.

추가: `/technology`, `/about`, `/apps`, `/privacy`, `/terms`, `/en/technology`, `/en/about`

**`/en/ir` 은 아직 추가하지 않는다** — 계획 4까지 한국어 본문이라 로케일 혼입 검사에서 실패한다. `PAGES` 위 주석에 그 사실을 남기고, 남은 게이트가 `/en/ir` 하나임을 적는다.

- [ ] **Step 2: 검사가 실제로 실패하는지 확인**

새로 추가한 경로 중 하나의 `dist` HTML 을 일부러 훼손하고 `node ./scripts/check-html.mjs` 가 잡는지 확인한 뒤 복구한다. 실제 출력을 보고서에 붙인다.

- [ ] **Step 3: 빌드 확인**

Run: `npm run build`
Expected: `[check-html] 통과`, 경로 수가 16개로 늘어난다.

- [ ] **Step 4: 문서 갱신**

`README.md` 의 자동 검증 절에 경로 수 변경을 반영한다.

`docs/superpowers/REDESIGN_PLAN2_HANDOFF.md` 의 릴리스 게이트를 갱신한다 — **남은 것은 `/en/ir` 하나**다. `/en/technology` 와 `/en/about` 이 영문 본문을 갖게 됐으므로, `/en/contact` 의 능동 유입 동선 중 `/en/technology` 로 가는 것은 해소됐고 `/en/ir` 로 가는 둘만 남는다.

- [ ] **Step 5: 커밋**

```bash
git add scripts/check-html.mjs README.md docs/superpowers/REDESIGN_PLAN2_HANDOFF.md
git commit -m "$(cat <<'EOF'
feat: 산출 HTML 검증 범위를 전환한 페이지까지 확대

검사 경로를 9개에서 16개로 늘렸다.

릴리스 게이트 갱신: 영어를 선언하면서 한국어 본문을 내는 경로가
3개에서 /en/ir 하나로 줄었다.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

## 완료 기준

- [ ] `npm run build` 통과 (typecheck → 테스트 → 자산 → prerender → HTML 검증)
- [ ] `/technology`, `/about`, `/apps`, `/privacy`, `/terms` 가 새 디자인
- [ ] `/en/technology`, `/en/about` 이 영문 카피
- [ ] 개인정보처리방침·이용약관의 문구가 전환 전과 문자 단위로 동일
- [ ] 다섯 페이지에 `slate-*`, `cyan-*`, `indigo-*`, `pink-*` 가 없다
- [ ] 모든 내부 링크가 `LocaleLink` 를 통한다
- [ ] 375px 에서 다섯 페이지 모두 가로 넘침이 없다 (측정 기준)
- [ ] 섹션마다 `aria-labelledby` 대상 heading 이 정확히 하나
- [ ] 배포 게이트가 `/en/ir` 하나로 줄었다

## 다음 계획

- **계획 4:** `/ir` (783줄) + `IRCharts` 차트 색 토큰화 + 영문판. 완료 시 **11개 페이지 전부 새 디자인**이고 배포 게이트가 해제된다.
- **계획 5:** 브랜드 자산과 GEO 마무리 — 파비콘, OG 카드, `FAQPage`/`Product`/`BreadcrumbList` 구조화 데이터, `llms.txt`, `robots.txt` AI 크롤러 허용, sitemap `xhtml:link` alternate.
- **미뤄둔 콘텐츠 결정 5건:** 실시간 채팅 버튼, 오피스 카드 링크, 소셜 링크 4개, `VITE_FORMSPREE_FORM_ID`, 모바일 스티키 CTA. 계획 5 전후로 한 번에 정리한다.
