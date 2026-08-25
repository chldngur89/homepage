# IR 페이지 전환과 배포 게이트 해제 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 마지막 남은 다크 페이지 `/ir`(783줄)을 새 디자인으로 전환하고, `/en/ir` 에 영문 본문을 붙여 배포 게이트를 해제한다.

**Architecture:** `/ir` 은 공용 `Layout` 밖의 독립 페이지다(`route-config.tsx:36`, "IR 은 자체 셸을 쓴다"). 이 구조를 유지한다 — 투자자 덱은 섹션 앵커 내비(Problem/Market/Solution/Economics/Contact)와 "사이트로" 복귀 동선이 필요하고, 공용 헤더로 흡수하면 그 둘이 사라지는 대신 투자자에게 맞지 않는 마케팅 CTA 가 붙는다. 셸은 그대로 두되 브랜드 토큰으로 다시 칠한다. 카피는 이미 `src/content/ir.ts` 에 분리돼 있으므로, JSX 에서 뽑아내는 일이 아니라 **사전 체계(`ko/`+`en/`)로 편입**하는 일이다.

**Tech Stack:** Vite 6, React 18, React Router 7, TypeScript, Tailwind CSS 4, recharts, vitest

## Global Constraints

- 새 코드에서 `slate-*`, `cyan-*`, `indigo-*`, `pink-*`, `violet-*`, `emerald-*` 를 쓰지 않는다. 브랜드 토큰만: `bg-ground` `bg-panel` `bg-surface` `text-ink` `text-ink-2` `text-ink-3` `border-line` `border-line-2` `text-brand` `bg-invert`.
- 진입 애니메이션은 `.rise` 하나. `motion/react` 를 새로 들이지 않는다.
- 내부 링크는 전부 `<LocaleLink>`. `localePath`/`pathHreflang` 을 손으로 호출하지 않는다. **단 같은 페이지 안의 앵커(`#problem` 등)는 `<a href="#...">` 그대로다** — 로케일 접두사가 붙으면 안 된다.
- **기존 한국어 카피를 다시 쓰지 않는다.** 사전으로 옮길 때 문구·띄어쓰기·문장부호를 그대로 유지한다.
- **투자자용 수치를 바꾸지 않는다.** `ir.ts` 의 모든 숫자(차트 데이터, TAM/SAM/SOM, 유닛 이코노믹스)는 한 자리도 달라지지 않는다. 영문판도 같은 숫자를 쓴다.
- 브랜드 표기는 `WooriTeam` / `우리팀`.
- 커밋 메시지는 한국어, 끝에 `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>`.
- `docs/MVP_TEST_PLAN_KO.md` 는 저장소 주인의 파일이다 — 수정 금지.

## 사람이 검토해야 할 것 (차단 아님)

**태스크 6이 만드는 영문 IR 카피는 해외 투자자가 읽는 문서다.** 시장 규모, 유닛 이코노믹스, 비전 시나리오가 들어간다. 숫자는 계약상 고정이지만 **표현과 주장의 뉘앙스는 초안이며, 저장소 주인의 검토가 필요하다.** 계획은 초안을 완성해 게이트를 열고, 검토는 그 뒤에 한다(주인의 방침: "일단은 초안 완성품이라도 나오게").

## 파일 구조

| 파일 | 책임 |
|---|---|
| `src/content/ko/ir.ts` | 한국어 IR 카피 + 타입 원본 (기존 `src/content/ir.ts` 이동) |
| `src/content/en/ir.ts` | 영문 IR 카피 (`DeepWiden<KoIr>`) |
| `src/content/ir.test.ts` | 수치 동결 — 두 로케일의 숫자가 같은지 |
| `src/app/components/ir/IRCharts.tsx` | 차트 3종. 색을 토큰에서 읽는다 |
| `src/app/components/ir/IrShell.tsx` | IR 전용 배경·헤더·푸터 |
| `src/app/pages/IR.tsx` | 본문 8개 섹션 |

---

### Task 1: IR 카피를 사전 체계로 편입한다

카피를 **한 글자도 바꾸지 않고** 위치와 접근 경로만 바꾼다. 화면은 그대로 다크다.

**Files:**
- Create: `src/content/ko/ir.ts` (기존 `src/content/ir.ts` 를 `git mv`)
- Modify: `src/content/index.ts`, `src/app/pages/IR.tsx`
- Delete: `src/content/ir.ts`

**Interfaces:**
- Consumes: `useCopy` (`@/app/i18n/useCopy`), `DeepWiden` (`@/content/widen`)
- Produces: `Dictionary` 에 `ir` 키. `IrStatusTone` 은 `@/content/ko/ir` 에서 계속 export

- [ ] **Step 1: 기준선을 뜬다**

```bash
node -e '
const fs=require("fs");
const s=fs.readFileSync("src/content/ir.ts","utf8");
const strings=(s.match(/"[^"]*[가-힣][^"]*"/g)||[]).map(x=>x.slice(1,-1));
const numbers=(s.match(/:\s*-?\d+(\.\d+)?/g)||[]).map(x=>x.replace(/:\s*/,""));
fs.writeFileSync(".superpowers/sdd/ir-baseline.json",JSON.stringify({strings,numbers},null,1));
console.log("문자열",strings.length,"숫자",numbers.length);'
```

- [ ] **Step 2: 파일을 옮긴다**

```bash
git mv src/content/ir.ts src/content/ko/ir.ts
```

`ko/ir.ts` 안에서 바꾸는 것은 **export 이름 하나뿐**이다 — `irContent` → `ir`. 다른 사전(`ko/about.ts` 의 `about` 등)과 이름 규칙을 맞춘다. 타입 `IrContent`·`IrStatusTone` 과 모든 값은 그대로 둔다.

**`DeepWiden` 별칭을 만들지 않는다.** 이 파일은 `export const ir: IrContent` 로 인터페이스를 명시하므로 다른 사전들과 사정이 다르다 — 그쪽은 `as const` 라서 문자열이 리터럴 타입이 되고 영문판이 그것을 만족할 수 없어 `DeepWiden` 이 필요하지만, 여기는 주석이 이미 문자열을 `string` 으로 넓혀 놓았다. 필요한 타입은 `IrContent` 그 자체다.

- [ ] **Step 3: 사전에 등록한다**

`src/content/index.ts` 에서 `demo`·`apps`·`legal` 이 등록된 방식을 먼저 읽는다. `ir` 은 **영문판이 있다**(`EN_ROUTES` 에 `/ir` 이 있다) — 그러나 태스크 6까지는 영문 사전이 없다. 그러므로 태스크 1에서는 `en.ir = koIr` 로 두고, **왜 임시인지와 언제 풀리는지를 주석으로 남긴다.**

```ts
/**
 * 태스크 6 까지의 임시 상태 — `/en/ir` 은 라우트가 있고 프리렌더되지만
 * 아직 한국어 본문을 낸다. 이것이 저장소에 하나 남은 배포 게이트이며
 * (`REDESIGN_PLAN1_HANDOFF.md`), 태스크 6 이 `en/ir.ts` 를 만들면
 * 이 줄이 `en/ir` 임포트로 바뀌고 게이트가 닫힌다.
 */
ir: koIr,
```

`Dictionary` 의 `ir` 멤버 타입은 **`IrContent`** 로 선언한다 — 이 계획에서 `DeepWiden` 을 쓰지 않는 유일한 멤버다. 왜 예외인지 주석으로 남긴다. 남기지 않으면 다음 사람이 "일관성" 을 이유로 `DeepWiden` 을 씌우고, 그 순간 `tone`·`segment`·`stage` 판별자가 `string` 으로 뭉개져 번역자가 상태 배지를 바꿀 수 있게 된다.

이 선언이 맞으면 `IR.tsx` 에 **캐스트가 필요 없다.** `as IrContent` 를 쓰게 됐다면 타입 선언이 틀린 것이니 캐스트를 지우고 선언을 고친다.

- [ ] **Step 4: `IR.tsx` 가 사전을 통해 읽게 한다**

```ts
// 전
import { irContent, type IrStatusTone } from "@/content/ir";
// 후
import { type IrStatusTone } from "@/content/ko/ir";
// 컴포넌트 안에서
const irContent = useCopy().ir;
```

`irContent` 라는 지역 이름을 유지하면 783줄 본문의 나머지가 손대지 않아도 된다. **본문 JSX 는 이 태스크에서 한 줄도 바꾸지 않는다.**

`IR.tsx` 상단의 모듈 스코프 상수 중 `irContent` 를 참조하는 것이 있으면 컴포넌트 안으로 내린다 — 훅은 모듈 스코프에서 못 부른다. 그런 상수가 없으면 아무것도 하지 않는다.

- [ ] **Step 5: 한 글자도 안 바뀌었음을 증명한다**

```bash
npm run build
node -e '
const fs=require("fs");
const base=JSON.parse(fs.readFileSync(".superpowers/sdd/ir-baseline.json","utf8"));
const html=fs.readFileSync("dist/ir/index.html","utf8");
const text=html.replace(/<[^>]+>/g," ").replace(/&#x27;/g,"\x27").replace(/&quot;/g,"\x22").replace(/&amp;/g,"&").replace(/\s+/g," ");
const missing=base.strings.filter(s=>!text.includes(s));
console.log("기준선 문자열",base.strings.length,"누락",missing.length);
if(missing.length) console.log(missing.slice(0,5));'
```

**누락 0 이어야 한다.** 기준선을 고쳐서 맞추지 않는다.

- [ ] **Step 6: 커밋**

```bash
git add -A src/content src/app/pages/IR.tsx
git commit -m "$(cat <<'EOF'
refactor: IR 카피를 로케일 사전 체계로 편입한다

src/content/ir.ts 를 src/content/ko/ir.ts 로 옮기고 Dictionary 에
등록했다. 카피와 수치는 한 글자도 바뀌지 않았고 화면도 그대로다.

/en/ir 은 아직 한국어 사전을 참조한다 — 태스크 6 이 영문 사전을
만들면 그 줄이 바뀌고 배포 게이트가 닫힌다.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: 차트 색을 브랜드 토큰에서 읽는다

**Files:**
- Modify: `src/app/components/ir/IRCharts.tsx`, `src/styles/theme.css`, `src/styles/tokens.ts`
- Test: `src/styles/tokens.test.ts`

**Interfaces:**
- Consumes: `tokens.ts` 의 토큰 객체
- Produces: `--chart-1` ~ `--chart-4` 토큰. 다른 차트가 생기면 여기서 가져간다

- [ ] **Step 1: 현재 색을 기록한다**

`IRCharts.tsx` 에 하드코딩된 헥스는 8개다: `#38bdf8` `#22d3ee` `#c084fc` `#a78bfa` `#fb7185` `#cbd5e1` `#94a3b8`, 그리고 `var(--color-wooriteam)` 계열 3개는 이미 변수다. 어느 색이 **어느 계열(시리즈)** 을 표현하는지 먼저 적는다 — 색을 바꿔도 "우리팀 vs 경쟁" 같은 의미 대응이 어긋나면 안 된다.

- [ ] **Step 2: 토큰을 정의한다**

`src/styles/theme.css` 의 `@theme inline` 블록에 4개를 더한다. 밝은 배경(`--surface`) 위에서 서로 구별되고 각각 대비 3:1 이상이어야 한다(비텍스트 대비 기준, WCAG 1.4.11).

```css
--color-chart-1: #2F6F4E;
--color-chart-2: #B4703A;
--color-chart-3: #4A5A8A;
--color-chart-4: #8A5A6E;
```

**위 값은 출발점이다.** Step 3 의 테스트가 통과할 때까지 조정한다 — 값을 맞추려고 테스트를 낮추지 않는다.

`src/styles/tokens.ts` 에 같은 값을 미러링한다(기존 토큰이 그렇게 돼 있다).

- [ ] **Step 3: 대비 테스트를 먼저 쓴다**

`src/styles/tokens.test.ts` 에 더한다. 기존 대비 헬퍼를 재사용한다.

기존 파일이 이미 `import { BRAND_TOKENS, contrastRatio } from "./tokens";` 를 쓰고 있다. 같은 것을 쓴다 — 새 헬퍼를 만들지 않는다.

```ts
describe("차트 색", () => {
  const chartTokens = [
    BRAND_TOKENS.chart1,
    BRAND_TOKENS.chart2,
    BRAND_TOKENS.chart3,
    BRAND_TOKENS.chart4,
  ];

  it("네 색 모두 surface 위에서 3:1 이상이다", () => {
    for (const color of chartTokens) {
      expect(contrastRatio(color, BRAND_TOKENS.surface)).toBeGreaterThanOrEqual(3);
    }
  });

  it("네 색이 서로 구별된다 (모든 쌍 1.6:1 이상)", () => {
    for (let i = 0; i < chartTokens.length; i += 1) {
      for (let j = i + 1; j < chartTokens.length; j += 1) {
        expect(contrastRatio(chartTokens[i], chartTokens[j])).toBeGreaterThanOrEqual(1.6);
      }
    }
  });
});
```

`tokens.test.ts` 에는 `theme.css` ↔ `tokens.ts` 동기화 검사가 이미 있다(`cssName` 헬퍼). 새 토큰 4개가 그 검사에도 자동으로 걸리는지 확인하고, 안 걸리면 걸리게 한다 — 두 파일이 갈라지는 것이 이 검사의 존재 이유다.

- [ ] **Step 4: 테스트를 돌려 실패를 본다**

Run: `npx vitest run src/styles/tokens.test.ts`
Expected: 아직 `tokens.chart1` 이 없으므로 typecheck 또는 테스트가 실패한다.

- [ ] **Step 5: 하드코딩 헥스를 토큰으로 바꾼다**

`IRCharts.tsx` 의 8개 헥스를 `var(--color-chart-N)` 로 바꾼다. recharts 의 `fill`/`stroke` 는 CSS 변수를 받는다. 이미 변수를 쓰던 3개(`--color-wooriteam` 등)는 그 변수들이 어디서 정의되는지 확인하고, 정의되지 않았다면 함께 토큰으로 옮긴다.

- [ ] **Step 6: 테스트 통과와 육안 확인**

```bash
npx vitest run src/styles/tokens.test.ts
npm run build
```

빌드 후 브라우저에서 `/ir` 의 차트 3종을 연다. **범례와 축 라벨이 읽히는지, 시리즈끼리 구분되는지 눈으로 본다.** 대비 수치가 통과해도 서로 비슷해 보이면 값을 조정한다. 배경은 아직 다크이므로, 이 시점의 판단 기준은 "태스크 3 이후 밝은 배경에서 어떨지" 다 — 밝은 배경 샘플을 따로 띄워 확인한다.

- [ ] **Step 7: 커밋**

```bash
git add src/app/components/ir/IRCharts.tsx src/styles/theme.css src/styles/tokens.ts src/styles/tokens.test.ts
git commit -m "$(cat <<'EOF'
feat: IR 차트 색을 브랜드 토큰으로 옮긴다

하드코딩 헥스 8개를 --color-chart-1~4 로 바꿨다. 밝은 표면 위
대비 3:1 과 시리즈 간 구별을 테스트가 강제한다.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: IR 전용 셸을 전환한다

배경·헤더·푸터. 본문은 다음 두 태스크가 맡는다.

**Files:**
- Create: `src/app/components/ir/IrShell.tsx`
- Modify: `src/app/pages/IR.tsx`, `src/content/ko/ir.ts`

**Interfaces:**
- Consumes: `LocaleLink`, `useCopy`
- Produces: `IrShell({ children })` — 배경 + 헤더 + `<main>` + 푸터. 본문은 `children`

- [ ] **Step 1: 셸의 카피를 사전으로 옮긴다**

`IR.tsx` 의 셸에 하드코딩된 한국어가 3개 있다: `사이트로`(헤더 복귀 링크), `IR 요청`(헤더 CTA), `사이트 홈`(푸터 링크). `ko/ir.ts` 에 `shell` 키를 만들어 옮긴다. **문구는 그대로.**

```ts
shell: {
  eyebrow: "Investor Overview",
  backToSite: "사이트로",
  requestIr: "IR 요청",
  homeLink: "사이트 홈",
  nav: [
    { href: "#problem", label: "Problem" },
    { href: "#market", label: "Market" },
    { href: "#solution", label: "Solution" },
    { href: "#economics", label: "Economics" },
    { href: "#cta", label: "Contact" },
  ],
},
```

`deckNav` 상수는 사전으로 흡수되므로 `IR.tsx` 에서 지운다. `Investor Overview` 는 원래 하드코딩 영어였고 그대로 둔다.

- [ ] **Step 2: `IrShell.tsx` 를 만든다**

전환 규칙:
- 고정 그라데이션 배경(`radial-gradient` 2개 + `linear-gradient`)을 **통째로 없앤다.** 밝은 디자인에는 `bg-ground` 하나면 된다.
- 헤더: `fixed` 유지(덱은 긴 스크롤이라 섹션 내비가 따라와야 한다). `border-b border-line bg-ground/[.92] backdrop-blur-[8px]` — 공용 `Layout.tsx:76` 과 같은 처리.
- `AI` 원형 배지(`border-cyan-400/30 bg-cyan-400/10 text-cyan-200`)를 없앤다. 대신 공용 헤더와 같은 워드마크 락업을 쓴다 — `useCopy().common.brand.mark` + `markLatin`. 투자자가 보는 페이지가 사이트와 다른 이름표를 달고 있을 이유가 없다.
- 섹션 내비: `text-ink-2 hover:text-brand`. `href="#..."` 그대로 — **`LocaleLink` 로 바꾸지 않는다.**
- "사이트로"/"사이트 홈" 은 `<LocaleLink to="/">`.
- "IR 요청" CTA: `bg-invert text-white`. `href="#cta"` 유지.
- `lucide-react` 아이콘(`ChevronLeft`, `ArrowRight`)은 유지한다 — 전환 대상은 색이지 아이콘이 아니다. 색 클래스만 `currentColor` 로 흐르게 한다.
- `<main id="ir-top" className="pt-20">` 의 `pt` 는 고정 헤더 높이에 맞춰 재측정한다.
- 푸터: `border-t border-line`, `text-ink-3`.

- [ ] **Step 3: `IR.tsx` 가 `IrShell` 을 쓰게 한다**

`IR.tsx` 의 배경 `<div>`, `<header>`, `<footer>` 를 지우고 `<IrShell>` 로 감싼다. `<article>` 안의 본문 섹션들은 이 태스크에서 **한 줄도 바꾸지 않는다** — 다크 상태 그대로 남는다.

- [ ] **Step 4: 확인**

```bash
npm run build
```

브라우저에서 `/ir` 을 연다. 헤더와 푸터가 밝고 본문은 아직 어두운, 반쯤 전환된 상태가 정상이다. 확인할 것:
- 섹션 내비 5개가 각 섹션으로 실제로 점프하는가
- `/en/ir` 에서 "사이트로" 가 `/en` 으로 가는가
- 375px 에서 헤더가 넘치지 않는가

- [ ] **Step 5: 커밋**

```bash
git add src/app/components/ir/IrShell.tsx src/app/pages/IR.tsx src/content/ko/ir.ts
git commit -m "$(cat <<'EOF'
feat: IR 전용 셸을 새 디자인으로 전환한다

배경 그라데이션을 걷어내고 헤더·푸터를 브랜드 토큰으로 옮겼다.
AI 원형 배지를 공용 워드마크 락업으로 바꿨다 — 투자자 페이지가
사이트와 다른 이름표를 달고 있을 이유가 없다.

섹션 앵커 내비는 유지한다. 덱은 긴 스크롤이라 필요하다.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: 본문 전반부 — 히어로 · 실행 격차 · 시장

**Files:**
- Modify: `src/app/pages/IR.tsx`

**Interfaces:**
- Consumes: `IrShell`, `SHELL`(`@/app/components/page`), `Reveal`/`SectionHeading` (IR 내부 헬퍼)

- [ ] **Step 1: 내부 헬퍼 두 개를 먼저 전환한다**

`IR.tsx` 안의 `Reveal`(`motion.div` 래퍼)과 `SectionHeading`(`IR.tsx:128-140`)은 모든 섹션이 공유한다. 여기부터 바꿔야 아래 작업이 일관된다.

- `Reveal` → `motion.div` 를 지우고 `<div className="rise">` 로. `motion/react` 임포트를 지운다.
- `SectionHeading` → `text-white` 를 `text-ink` 로, 나머지 색 클래스를 토큰으로.

- [ ] **Step 2: 히어로 섹션**

`IR.tsx:206-313`. 전환 규칙:
- `border-white/10` → `border-line`
- `text-white` → `text-ink`, `text-slate-300/400` → `text-ink-2`, `text-slate-500` → `text-ink-3`
- `bg-slate-900/30` 같은 반투명 다크 면 → `bg-panel`
- 그라데이션 채운 버튼 → `bg-invert text-white`
- `heroWorkflowLayout` 의 절대 배치 4개는 **375px 에서 반드시 확인한다** — 절대 배치는 좁은 화면에서 겹친다. 겹치면 모바일에서 흐름 배치로 떨어뜨린다.

- [ ] **Step 3: 실행 격차 섹션 (`#problem`)**

`IR.tsx:315-397`. 같은 규칙. 이 섹션은 `ExecutionGapChart` 를 쓴다 — 태스크 2의 토큰 색이 밝은 배경에서 실제로 읽히는지 여기서 처음 확인된다.

- [ ] **Step 4: 시장 섹션 (`#market`)**

`IR.tsx:399-477`. TAM/SAM/SOM 막대의 `width = [100, 82, 64][index]` 와 `gradientClass` 가 있다. 폭 숫자는 그대로 두고 `gradientClass` 만 토큰 배경으로 바꾼다.

- [ ] **Step 5: 확인**

```bash
npm run build
```

- 세 섹션에 `slate-|cyan-|indigo-|pink-|violet-|emerald-` 가 남아 있지 않은지 grep
- 375px 에서 가로 넘침 0 (특히 히어로의 절대 배치와 시장 막대)
- `aria-labelledby` 가 있다면 대상 heading 이 정확히 하나
- 수치가 그대로인지 — 태스크 1의 기준선 대조를 다시 돌린다

- [ ] **Step 6: 커밋**

```bash
git add src/app/pages/IR.tsx
git commit -m "$(cat <<'EOF'
feat: IR 본문 전반부를 새 디자인으로 전환한다

공용 헬퍼(Reveal, SectionHeading)와 히어로·실행 격차·시장 세 섹션.
motion/react 를 걷어내고 .rise 로 옮겼다.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 5: 본문 후반부 — 솔루션 · 우위 · 이코노믹스 · 비전 · CTA

**Files:**
- Modify: `src/app/pages/IR.tsx`

- [ ] **Step 1: 솔루션 (`#solution`)**

`IR.tsx:479-543`. 태스크 4 Step 2 의 전환 규칙을 그대로 적용한다.

- [ ] **Step 2: 우위 섹션**

`IR.tsx:545-611`. `AdvantageRadarChart` 를 쓴다. 레이더 차트는 면이 겹치므로 토큰 색의 투명도 처리를 여기서 확인한다.

- [ ] **Step 3: 이코노믹스 (`#economics`)**

`IR.tsx:613-716`. **유닛 이코노믹스 숫자가 있다. 한 자리도 바꾸지 않는다.**

- [ ] **Step 4: 비전과 CTA (`#cta`)**

`IR.tsx:718-765`. `VisionScenarioChart`. CTA 는 `contactEmail` 과 `disclosure` 를 낸다 — 메일 주소는 `CONTACT_EMAIL` 에서 오고 문의 페이지와 같아야 한다.

- [ ] **Step 5: 전면 확인**

```bash
npm run build
grep -nE 'slate-|cyan-|indigo-|pink-|violet-|emerald-|motion/react' src/app/pages/IR.tsx src/app/components/ir/*.tsx
```

**grep 결과가 비어 있어야 한다**(주석 안 언급은 예외로 두되 보고서에 적는다).

- 태스크 1 기준선 대조: 문자열 누락 0
- 숫자 대조: `ir-baseline.json` 의 `numbers` 배열이 `ko/ir.ts` 에 그대로 있는지
- 375px·1024px·1440px 에서 전 섹션 확인. 차트 3종이 모두 읽히는지
- `<h1>` 이 정확히 하나

- [ ] **Step 6: 커밋**

```bash
git add src/app/pages/IR.tsx
git commit -m "$(cat <<'EOF'
feat: IR 본문 후반부를 새 디자인으로 전환한다

솔루션·우위·이코노믹스·비전·CTA 다섯 섹션. 이로써 11개 페이지가
전부 새 디자인이다.

투자자 수치는 한 자리도 바뀌지 않았다.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 6: 영문 IR 사전

**이 태스크가 배포 게이트를 닫는다.**

**Files:**
- Create: `src/content/en/ir.ts`, `src/content/ir.test.ts`
- Modify: `src/content/index.ts`

**Interfaces:**
- Consumes: `IrContent` (`@/content/ko/ir`)
- Produces: `en.ir` — `/en/ir` 의 본문

- [ ] **Step 1: 영문 사전을 쓴다**

`src/content/en/ir.ts` 를 만든다. **다른 영문 사전과 달리 `DeepWiden` 을 쓰지 않는다** — `ko/ir.ts` 는 `as const` 가 아니라 `export const ir: IrContent` 로 인터페이스를 명시하므로 문자열이 이미 `string` 이다. `DeepWiden` 을 씌우면 얻는 것 없이 `IrStatusTone`·`segment`·`stage` 판별자만 `string` 으로 뭉개진다(태스크 1에서 실제로 겪고 되돌린 문제다).

```ts
import type { IrContent } from "@/content/ko/ir";

export const ir: IrContent = { /* … */ };
```

**타입이 강제하는 것:** 키 누락, 그리고 **판별자 값** — `tone` 에 `"estimate" | "goal" | "planned" | "under_review"` 이외의 값을 쓰면 컴파일이 깨진다. 번역자가 상태 배지를 바꿀 수 없다.

**타입이 강제하지 *못하는* 것: 배열 길이.** `IrContent` 는 배열을 `IrFunnelLevel[]` 로 선언하므로 튜플이 아니고, 영문판이 TAM/SAM/SOM 세 줄 중 하나를 빠뜨려도 컴파일은 통과한다. 이것이 Step 2 의 수치 테스트가 필요한 이유다 — 원소가 빠지면 숫자 배열의 길이가 달라져 테스트가 잡는다.

**지켜야 할 것:**
- **숫자는 전부 한국어판과 같다.** 차트 데이터, TAM/SAM/SOM, 유닛 이코노믹스, 백분율. 통화 표기가 필요하면 원화 그대로 두고 괄호로 환산을 붙이지 않는다 — 환율은 계획이 정할 일이 아니다.
- `tone`, `segment`, `stage` 같은 **열거형 값은 번역하지 않는다**(`"TAM"`, `"manual"`, `"strategic"`). 이것들은 코드가 분기하는 값이다.
- 이미 영어인 문자열(`"Investor Overview"`, 섹션 내비 라벨 5개)은 그대로 둔다.
- 한국 시장 고유 개념은 설명을 덧붙이지 말고 직역하지도 말고, 해외 투자자가 아는 표현으로 옮긴다.

- [ ] **Step 2: 수치 동결 테스트를 쓴다**

`src/content/ir.test.ts`:

**주의 — 수치의 절반은 `number` 가 아니라 문자열 안에 있다.** `market.funnel[].value` 는 `"55~80조 원"` 같은 **문자열**이고, TAM/SAM/SOM 이 전부 이 모양이다. `number` 만 비교하는 테스트는 투자자 수치의 핵심을 못 잡는다. 그래서 두 가지를 다 본다.

```ts
import { describe, expect, it } from "vitest";
import { ir as ko } from "@/content/ko/ir";
import { ir as en } from "@/content/en/ir";

/**
 * 투자자 수치는 계약에 준한다. 번역하다 한 자리가 달라져도 타입은 통과한다 —
 * `DeepWiden` 은 number 를 number 로, string 을 string 으로만 넓힌다.
 *
 * `number` 로 들어 있는 값(차트 데이터)과 **문자열 안에 든 값**(TAM "55~80조 원",
 * 유닛 이코노믹스의 백분율)을 모두 뽑아 순서까지 비교한다. 단위어(조 원 /
 * trillion KRW)는 당연히 달라지므로 숫자 부분만 본다.
 */
const numbers = (value: unknown): number[] => {
  if (typeof value === "number") return [value];
  if (Array.isArray(value)) return value.flatMap(numbers);
  if (value && typeof value === "object") return Object.values(value).flatMap(numbers);
  return [];
};

/** 문자열 안의 숫자 표현. "55~80조 원" → "55~80", "1.5%" → "1.5%" */
const digitRuns = (value: unknown): string[] => {
  if (typeof value === "string") return value.match(/\d[\d.,~\-–%]*/g) ?? [];
  if (Array.isArray(value)) return value.flatMap(digitRuns);
  if (value && typeof value === "object") return Object.values(value).flatMap(digitRuns);
  return [];
};

describe("IR 수치", () => {
  it("두 로케일의 number 값이 순서까지 같다", () => {
    expect(numbers(en)).toEqual(numbers(ko));
  });

  it("두 로케일의 문자열 속 숫자 표현이 순서까지 같다", () => {
    expect(digitRuns(en)).toEqual(digitRuns(ko));
  });

  it("열거형 값이 번역되지 않았다", () => {
    const stages = (doc: typeof ko) => doc.market.funnel.map((level) => level.stage);
    const tones = (doc: typeof ko) => doc.market.funnel.map((level) => level.tone);
    expect(stages(en)).toEqual(stages(ko));
    expect(tones(en)).toEqual(tones(ko));
  });
});
```

`executionGap`·`advantage`·`economics` 에도 `tone`/`segment` 열거형이 있다. `ko/ir.ts` 의 타입 선언에서 열거형 필드를 전부 찾아 같은 방식으로 덮는다.

**두 번째 테스트가 초록불이 되게 하려고 영문 문구를 억지로 비틀지 않는다.** 숫자 표현의 **순서**가 다르면 그건 문장 구조가 달라진 것이므로 정상일 수 있다 — 그 경우 순서 비교 대신 정렬 후 비교로 바꾸되, **왜 바꿨는지 주석에 남기고 보고서에 적는다.**

- [ ] **Step 3: 테스트를 돌려 실패를 본다**

Run: `npx vitest run src/content/ir.test.ts`
Expected: `en/ir.ts` 가 없으므로 실패.

- [ ] **Step 4: 등록을 바꾼다**

`src/content/index.ts` 에서 태스크 1이 남긴 임시 줄을 바꾼다:

```ts
// 전: ir: koIr,  (+ 임시 상태 주석)
// 후: ir: enIr,
```

**태스크 1이 남긴 임시 주석을 지운다** — 사실이 아니게 된다.

- [ ] **Step 5: 영문 본문에 한국어가 없음을 확인한다**

```bash
npm run build
node -e '
const fs=require("fs");
const html=fs.readFileSync("dist/en/ir/index.html","utf8");
const main=(html.match(/<main[^>]*>([\s\S]*?)<\/main>/)||[])[1]||"";
const ko=(main.match(/[가-힣]/g)||[]).length;
console.log("/en/ir <main> 한글 글자수:", ko);
if(ko>0){const s=main.replace(/<[^>]+>/g," ").match(/[^\s]*[가-힣][^\s]*/g)||[];console.log(s.slice(0,10));}'
```

**0 이어야 한다.**

- [ ] **Step 6: 커밋**

```bash
git add src/content/en/ir.ts src/content/ir.test.ts src/content/index.ts
git commit -m "$(cat <<'EOF'
feat: IR 페이지 영문판을 붙여 배포 게이트를 닫는다

/en/ir 이 영어라고 선언하면서 한국어 본문을 내던 마지막 경로였다.
투자자 수치는 두 로케일이 같은 값을 쓰며 테스트가 강제한다.

영문 카피는 초안이며 저장소 주인의 검토가 필요하다.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 7: 검증 확대와 게이트 해제

**Files:**
- Modify: `scripts/check-html.mjs`, `README.md`, `docs/superpowers/REDESIGN_PLAN1_HANDOFF.md`, `docs/superpowers/REDESIGN_PLAN2_HANDOFF.md`

- [ ] **Step 1: 검사 경로를 18개로**

`scripts/check-html.mjs` 의 `PAGES` 에 두 줄을 더한다:

```js
  { route: "/ir", locale: "ko", hasEnglish: true },
  { route: "/en/ir", locale: "en", hasEnglish: true },
```

**`PAGES` 위의 "일부러 빠진 것 — `/en/ir`" 주석 문단을 통째로 지운다.** 더 이상 빠진 것이 없다. 주석이 남으면 다음 사람이 없는 게이트를 찾는다.

- [ ] **Step 2: 검사가 실제로 무는지 확인**

`dist/en/ir/index.html` 에 한국어 한 문장을 일부러 넣고 `node ./scripts/check-html.mjs` 가 exit 1 로 잡는지 본다. 출력을 보고서에 붙이고 복구한 뒤 초록불도 붙인다.

- [ ] **Step 3: 게이트를 해제한다**

`docs/superpowers/REDESIGN_PLAN1_HANDOFF.md` 의 `## ⚠️ 릴리스 게이트` 절 전체를 다시 쓴다. 기존 갱신 마커(`> 계획 2 완료로 갱신`, `> 계획 3 완료로 갱신`)와 같은 형식으로 `> 계획 4 완료(YYYY-MM-DD)로 갱신` 을 더하되, **이제 남은 경로가 0개이므로 경고 절 자체를 "해제됨" 으로 바꾼다.** 무엇이 게이트였고 무엇이 그것을 닫았는지는 기록으로 남긴다.

`REDESIGN_PLAN2_HANDOFF.md` 의 게이트 절도 같은 방식으로 정리한다.

- [ ] **Step 4: 모든 수치를 재검증한다**

두 핸드오프 문서와 `README.md` 에서 숫자를 주장하는 모든 줄을 찾아 실제와 대조한다. 계획 3에서 이 부류의 오류가 9건 나왔다.

```bash
grep -nE '[0-9]+개|[0-9]+줄|[0-9]+건|[0-9]+종' README.md docs/superpowers/REDESIGN_PLAN*.md
```

각 항목의 실제값을 명령으로 확인해 보고서에 표로 적는다: 검사 경로 수, 프리렌더 문서 수, 테스트 수, `IR.tsx` 줄 수, `site.json` 을 실제로 import 하는 파일 수.

**현재 상태를 주장하는 문장만 고친다.** "계획 1이 도입했다" 같은 역사 서술은 그대로 둔다.

- [ ] **Step 5: 커밋**

```bash
git add scripts/check-html.mjs README.md docs/superpowers/REDESIGN_PLAN1_HANDOFF.md docs/superpowers/REDESIGN_PLAN2_HANDOFF.md
git commit -m "$(cat <<'EOF'
feat: 검증에 IR 두 경로를 더하고 배포 게이트를 해제한다

검사 경로 16개 → 18개. 영어라고 선언하면서 한국어 본문을 내는
경로가 0개가 되어 게이트가 닫혔다.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

## 완료 기준

- [ ] `npm run build` 통과 (typecheck → 테스트 → 자산 → prerender → HTML 검증)
- [ ] **11개 페이지 전부 새 디자인** — 다크 페이지가 남아 있지 않다
- [ ] `IR.tsx` 와 `ir/` 아래에 `slate-*`·`cyan-*`·`indigo-*`·`pink-*`·`violet-*`·`emerald-*`·`motion/react` 가 없다
- [ ] 차트 색 4종이 밝은 표면 위 대비 3:1 이상이고 서로 구별된다 (테스트가 강제)
- [ ] IR 카피의 한국어 문구가 전환 전과 문자 단위로 동일
- [ ] **투자자 수치가 두 로케일에서 같다** (테스트가 강제)
- [ ] `/en/ir` 의 `<main>` 에 한글 0자
- [ ] 375px 에서 `/ir` 가로 넘침 0
- [ ] 검사 경로 18개, `check-html.mjs` 에 "일부러 빠진 것" 주석 없음
- [ ] **배포 게이트 해제** — 두 핸드오프 문서에 남은 게이트 0개

## 다음 계획

- **계획 5:** 브랜드 자산과 GEO 마무리 — 파비콘, OG 카드, `FAQPage`/`Product`/`BreadcrumbList` 구조화 데이터, `llms.txt`, `robots.txt` AI 크롤러 허용, sitemap `xhtml:link` alternate.
- **사람이 정할 것:** 영문 IR 카피 검토(태스크 6), 미뤄둔 콘텐츠 결정 5건(실시간 채팅 버튼, 오피스 카드 링크, 소셜 링크 4개, `VITE_FORMSPREE_FORM_ID`, 모바일 스티키 CTA), 계획 3이 미뤄둔 결함 7건(전부 사이트 전체 단위 정리 대상).
