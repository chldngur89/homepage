# GEO 마무리와 남은 결함 정리 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 투자자나 잠재 고객이 ChatGPT·Claude·Perplexity 에게 "WooriTeam 이 뭐야" 라고 물었을 때 사실대로 답이 나오게 하고, 계획 3·4가 남긴 결함 중 저장소 주인의 정보가 필요 없는 것들을 닫는다.

**Architecture:** 산출 HTML 의 `@graph` 에 노드를 더하고(`ssg/seo.ts`), 크롤러용 파일을 프리렌더 단계에서 만든다(`scripts/prerender.mjs`). 새 런타임 의존성을 들이지 않는다 — 전부 빌드 시점 산출물이다.

**Tech Stack:** Vite 6, React 18, React Router 7, TypeScript, vitest

## Global Constraints

- 새 코드에서 `slate-*`, `cyan-*`, `indigo-*`, `pink-*`, `violet-*`, `emerald-*`, `rose-*`, `amber-*`, `fuchsia-*` 를 쓰지 않는다. 브랜드 토큰만.
- 진입 애니메이션은 `.rise` 하나. `motion/react` 를 새로 들이지 않는다.
- 내부 링크는 `<LocaleLink>`. 같은 페이지 안의 앵커(`#cta` 등)는 `<a href="#...">` 그대로.
- **기존 카피를 다시 쓰지 않는다.** 구조화 데이터는 화면에 **이미 보이는 문구를 그대로** 실어야 한다.
- **판매 조건과 투자자 수치를 바꾸지 않는다.** 요금·요율·IR 수치는 한 자리도.
- 브랜드 표기는 `WooriTeam` / `우리팀`. 커밋 메시지는 한국어, 끝에 `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>`.
- `docs/MVP_TEST_PLAN_KO.md` 는 저장소 주인의 파일이다 — 수정 금지.

## 이 계획이 다루지 않는 것

저장소 주인의 정보·판단이 필요해 **제외**한다. 착수하지 말 것:

- 홈의 이미지 슬롯 4개(실제 사진 필요)
- `VITE_FORMSPREE_FORM_ID`(문의 폼 전송)
- 영문 IR 카피 검토, FAQ 환불 조항 문구
- 저장소 공개 범위, 커밋 작성자 이메일

## 파일 구조

| 파일 | 책임 |
|---|---|
| `ssg/seo.ts` | `@graph` 노드 — `FAQPage`, `BreadcrumbList` 추가 |
| `ssg/faq.ts` | 구조화 데이터용 FAQ 원본. 화면 사전에서 파생한다 |
| `scripts/prerender.mjs` | `robots.txt`, `llms.txt`, `sitemap.xml`(+`xhtml:link`) |
| `src/app/pages/NotFound.tsx` | 로케일 인식 404 |
| `scripts/check-html.mjs` | 새 산출물 검증 |

---

### Task 1: 크롤러용 산출물 — robots.txt · llms.txt · sitemap 대체 언어

**Files:**
- Modify: `scripts/prerender.mjs`, `scripts/check-html.mjs`
- Test: 산출물 직접 검사(이 태스크는 빌드 산출물이 대상이라 vitest 가 아니라 check-html 이 가드다)

**Interfaces:**
- Consumes: `SITE_URL`(`ssg/site.ts`), `prerenderRoutes`·`EN_ROUTES`(`src/app/route-config.tsx`, `src/content/locales.ts`)
- Produces: `dist/llms.txt`, `xhtml:link` 가 붙은 `dist/sitemap.xml`

- [ ] **Step 1: robots.txt 에 AI 크롤러를 명시적으로 허용한다**

지금은 `User-agent: *` 하나뿐이다. 그것만으로도 기술적으로는 허용이지만, **명시적 허용을 적어 두는 이유는 나중에 누군가 `Disallow` 를 넣을 때 AI 크롤러를 같이 막지 않도록 의도를 남기려는 것**이다.

`GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`, `Claude-User`, `PerplexityBot`, `Google-Extended`, `CCBot` 을 각각 `Allow: /` 로 적는다. 왜 허용하는지(제품 특성상 LLM 답변에 노출되는 것이 유입 경로다) 주석으로 남긴다.

- [ ] **Step 2: llms.txt 를 만든다**

`dist/llms.txt` 에 사이트 요약을 낸다. [llmstxt.org](https://llmstxt.org) 관례를 따른다 — H1 한 줄, 인용 블록 한 문단, 그다음 링크 목록.

**문구를 지어내지 않는다.** 한국어 사전(`src/content/ko/`)과 `ssg/seo.ts` 의 description 에 이미 있는 문장을 쓴다. 담을 것:

- 무엇을 하는 서비스인지 (홈 히어로 + 메타 설명)
- 핵심 루프 `제안 → 승인 → 실행 → 반복 성장`
- 요금제 세 가지와 **현재 금액** — `src/content/ko/pricing.ts` 에서 읽어 온다. 하드코딩하면 다음 가격 변경 때 조용히 어긋난다
- 주요 경로 링크 (절대 URL)

한국어를 정본으로 하되 영문 요약도 함께 넣는다 — LLM 이 영어로 질문받는 경우가 많다.

- [ ] **Step 3: sitemap 에 대체 언어 링크를 넣는다**

지금 sitemap 은 `<loc>` 만 낸다. 영문판이 있는 경로(`EN_ROUTES`)에 `xhtml:link` 로 `ko`·`en`·`x-default` 를 붙인다. `<urlset>` 에 `xmlns:xhtml="http://www.w3.org/1999/xhtml"` 네임스페이스를 더해야 한다.

영문판이 없는 경로(`/demo`, `/apps`, `/privacy`, `/terms`)에는 붙이지 않는다 — 없는 번역을 있다고 말하는 것이다.

- [ ] **Step 4: check-html 에 산출물 검사를 더한다**

`dist/llms.txt` 존재와 최소 길이, `dist/robots.txt` 의 AI 크롤러 줄, `dist/sitemap.xml` 의 `xhtml:link` 개수를 검사한다.

**개수를 하드코딩하지 말고 `EN_ROUTES` 에서 기대값을 계산한다** — 경로가 늘면 검사도 같이 늘어야 한다.

- [ ] **Step 5: 일부러 깨뜨려 확인한다**

`dist/llms.txt` 를 지우고 `node ./scripts/check-html.mjs` 가 exit 1 인지 본다. 출력을 보고서에 붙이고 복구 후 초록불도 붙인다. **파이프로 종료 코드를 재지 마라** — `cmd | tail` 은 `tail` 의 코드를 준다.

- [ ] **Step 6: 커밋**

```bash
git add scripts/prerender.mjs scripts/check-html.mjs
git commit -m "$(cat <<'EOF'
feat: AI 크롤러용 산출물을 만든다 — robots 허용·llms.txt·sitemap 대체 언어

제품 특성상 LLM 답변에 노출되는 것이 유입 경로라 명시적으로 허용한다.
llms.txt 의 요금은 사전에서 읽어 온다 — 하드코딩하면 다음 가격 변경 때
조용히 어긋난다.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: FAQPage 와 BreadcrumbList 구조화 데이터

**Files:**
- Create: `ssg/faq.ts`, `ssg/faq.test.ts`
- Modify: `ssg/seo.ts`

**Interfaces:**
- Consumes: `dictionaries`(`src/content/index.ts`)
- Produces: `@graph` 의 `FAQPage`·`BreadcrumbList` 노드

- [ ] **Step 1: FAQ 원본을 사전에서 파생시킨다**

FAQ 는 두 곳에 있다 — `ko/pricing.ts` 의 `faq.items`(4개)와 `ko/contact.ts` 의 `faq`. `ssg/faq.ts` 가 로케일과 경로를 받아 해당 페이지의 FAQ 를 돌려준다.

**문답을 다시 쓰지 않는다.** 사전의 `q`·`a` 를 그대로 싣는다.

- [ ] **Step 2: 화면과 구조화 데이터가 어긋나지 않음을 테스트로 고정한다**

`ssg/faq.test.ts`:

```ts
it("FAQPage 의 문답이 화면 사전과 글자까지 같다", () => {
  const node = faqNode("/pricing", "ko");
  expect(node.mainEntity.map((e) => e.name)).toEqual(
    dictionaries.ko.pricing.faq.items.map((i) => i.q),
  );
  expect(node.mainEntity.map((e) => e.acceptedAnswer.text)).toEqual(
    dictionaries.ko.pricing.faq.items.map((i) => i.a),
  );
});
```

**이 테스트가 이 태스크의 핵심이다.** 구조화 데이터가 화면에 없는 내용을 주장하면 검색엔진이 스팸으로 취급하고, 무엇보다 사실이 아닌 말을 하는 것이다. 두 로케일 모두 덮는다.

- [ ] **Step 3: BreadcrumbList 를 만든다**

홈이 아닌 경로에 `홈 > 페이지` 2단 빵부스러기를 붙인다. 이름은 `common.nav` 의 라벨을 쓴다 — 헤더에 보이는 그 문구다. 홈에는 붙이지 않는다(자기 자신뿐이라 의미가 없다).

`item` URL 은 절대 URL 이고 로케일 접두사를 포함해야 한다.

- [ ] **Step 4: `@graph` 에 넣는다**

기존 `Organization`·`WebSite`·`SoftwareApplication`/`WebPage` 노드와 **충돌하지 않게** 더한다. `@id` 가 겹치지 않는지 확인한다.

- [ ] **Step 5: 검증**

```bash
npm run build
node -e '
const h=require("fs").readFileSync("dist/pricing/index.html","utf8");
const m=h.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
const g=JSON.parse(m[1])["@graph"];
console.log(g.map(n=>n["@type"]).join(", "));
const faq=g.find(n=>n["@type"]==="FAQPage");
console.log("FAQ 문항:", faq.mainEntity.length);'
```

JSON 이 유효하고, `FAQPage` 와 `BreadcrumbList` 가 나오며, 문항 수가 사전과 같아야 한다. `/en/pricing` 도 같이 확인한다.

- [ ] **Step 6: 커밋**

```bash
git add ssg/faq.ts ssg/faq.test.ts ssg/seo.ts
git commit -m "$(cat <<'EOF'
feat: FAQPage 와 BreadcrumbList 구조화 데이터를 붙인다

문답은 화면 사전에서 파생시키고, 테스트가 글자 단위 일치를 고정한다 —
구조화 데이터가 화면에 없는 말을 하면 사실이 아닌 주장이 된다.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: 로케일 인식 404 와 남은 결함 두 가지

**Files:**
- Modify: `src/app/pages/NotFound.tsx`, `src/content/ko/common.ts`, `src/content/en/common.ts`, `src/app/pages/Contact.tsx`, `src/app/pages/IR.tsx`
- Test: `src/app/pages/NotFound.test.tsx`

- [ ] **Step 1: 404 카피를 사전으로 옮긴다**

지금 `NotFound.tsx` 에 한국어가 하드코딩돼 있어, 영문 방문자도 한글 404 를 본다. 문구를 `common` 사전의 `notFound` 키로 옮긴다 — **문구는 그대로**, 영문판만 새로 쓴다.

- [ ] **Step 2: 경로에서 로케일을 판별한다**

`404.html` 은 문서가 하나뿐이라 프리렌더 시점에 로케일을 정할 수 없다. **클라이언트에서 `location.pathname` 이 `/en` 으로 시작하는지 보고** 로케일을 정한다.

`stripLocale`(`src/app/i18n/localePath.ts`)이 이미 그 일을 한다 — 새로 만들지 말고 그것을 쓴다.

`<html lang>` 도 같이 바꾼다. 영어 본문을 내면서 `lang="ko"` 를 선언하면 계획 4가 닫은 게이트와 같은 종류의 결함이다.

- [ ] **Step 3: 테스트**

```ts
it("/en 아래 경로에서는 영문 404 를 낸다", () => {
  // stripLocale 로 판별하는 순수 함수를 직접 테스트한다
  expect(notFoundLocale("/en/nope")).toBe("en");
  expect(notFoundLocale("/nope")).toBe("ko");
  expect(notFoundLocale("/english-lesson")).toBe("ko"); // 접두사 오탐 방지
});
```

마지막 케이스가 중요하다 — `/en` 으로 **시작하는 문자열**과 `/en` **경로 구간**은 다르다.

- [ ] **Step 4: 죽은 링크 두 곳을 링크에서 푼다**

`Contact.tsx:163`(오피스 카드)과 `:331`(소셜)이 `href="#"` 다. 눌러도 아무 일이 없다.

**실제 주소가 없으므로 링크를 지우는 게 아니라 링크가 아니게 만든다** — `<a>` 를 `<div>`/`<span>` 으로 바꿔 정보는 그대로 보이되 누를 수 있어 보이지 않게 한다. 주소가 생기면 되돌리기 쉽도록 주석에 남긴다.

- [ ] **Step 5: 차트 토큰 서열 충돌을 정리한다**

`--color-chart-4` 가 두 곳에서 다른 뜻으로 쓰인다 — `IRCharts` 에서는 "가장 두드러져야 하는" 우리팀·MRR, `IR.tsx` 의 `toneStyles` 에서는 열거 순서상 **가장 불확실한** `under_review`. 지금은 배지 틴트가 옅어 드러나지 않지만 채도를 올리면 표면화된다.

`toneStyles` 의 배정을 바꿔 `under_review` 가 `chart-4` 를 쓰지 않게 한다. **대비 측정을 다시 하고** 네 배지가 여전히 4.5:1 이상인지 보고서에 적는다.

- [ ] **Step 6: 검증과 커밋**

`npm run build` 통과. `/404.html` 을 375px 에서 확인. 영문 404 를 실제로 띄워 `<html lang>` 이 `en` 인지 본다.

```bash
git add src/app/pages/NotFound.tsx src/app/pages/NotFound.test.tsx src/content/ko/common.ts src/content/en/common.ts src/app/pages/Contact.tsx src/app/pages/IR.tsx
git commit -m "$(cat <<'EOF'
fix: 404 를 로케일 인식으로 바꾸고 죽은 링크와 토큰 충돌을 정리한다

404.html 은 문서가 하나뿐이라 경로에서 로케일을 판별한다. stripLocale 을
재사용해 "/english-lesson" 같은 접두사 오탐을 피한다.

href="#" 두 곳은 주소가 없으므로 링크가 아니게 만든다 — 눌리는데 아무
일도 없는 것보다 낫다.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: 클라이언트 마운트 콘텐츠의 로케일 가드와 마감

계획 4에서 배포 게이트가 **닫힌 척** 한 적이 있다. `check-html.mjs` 는 프리렌더 HTML 만 보는데 차트는 `useEffect` 안에서 동적 임포트된다 — 정적 검사는 한글 0자를 보고했지만 실제 영어 방문자는 차트 범례의 한글을 보고 있었다. 구현자가 정직하게 보고해서 잡혔을 뿐, 빌드는 이 부류를 **구조적으로 못 잡는다.**

**Files:**
- Create: `src/app/components/ir/IRCharts.test.ts`
- Modify: `README.md`, `docs/superpowers/REDESIGN_PLAN1_HANDOFF.md`, `docs/superpowers/REDESIGN_PLAN2_HANDOFF.md`

- [ ] **Step 1: 소스에 박힌 한글을 잡는 검사를 쓴다**

계획 4의 태스크 7이 SSR 렌더 방식을 시도했다가 **무의미함을 확인하고 버렸다** — recharts 의 `ResponsiveContainer` 가 `renderToStaticMarkup` 에서 빈 마크업을 내서, 한글을 심어도 초록불이었다. 같은 길을 다시 가지 마라.

대신 **소스 파일을 문자열로 읽어** 주석을 걷어낸 뒤 한글 리터럴이 있는지 본다. `src/content/legal.test.ts` 와 `src/content/ir.test.ts` 가 쓰는 것과 같은 종류의 검사다.

```ts
it("IRCharts 에 한글 문자열 리터럴이 없다", () => {
  const source = readFileSync(chartsPath, "utf8")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/.*$/gm, "");
  expect(source.match(/["'`][^"'`]*[가-힣][^"'`]*["'`]/g) ?? []).toEqual([]);
});
```

한국어 주석은 이 저장소의 관례이므로 **주석은 반드시 제외**한다.

- [ ] **Step 2: 일부러 깨뜨려 확인한다**

한글 문자열을 하나 심어 빨간불을 보고, 되돌려 초록불을 본다. **두 결과를 보고서에 적는다.** 이 검사는 빨간불을 본 적 없으면 믿을 수 없다 — 계획 4에서 그것 때문에 테스트 하나를 버렸다.

- [ ] **Step 3: 문서의 수치를 전부 재검증한다**

계획 3에서 이 부류의 오류가 9건, 계획 4에서도 더 나왔다. 숫자를 주장하는 모든 줄을 찾아 실제와 대조한다.

```bash
grep -nE '[0-9]+개|[0-9]+줄|[0-9]+건|[0-9]+종|[0-9]+곳' README.md docs/superpowers/REDESIGN_PLAN*.md
```

각 항목의 실제값을 명령으로 확인해 **표로** 적는다 — 주장, 옛 값, 확인에 쓴 명령, 실제값. **현재 상태를 주장하는 문장만 고친다.** 역사 서술은 그대로 둔다.

- [ ] **Step 4: 커밋**

```bash
git add src/app/components/ir/IRCharts.test.ts README.md docs/superpowers/REDESIGN_PLAN1_HANDOFF.md docs/superpowers/REDESIGN_PLAN2_HANDOFF.md
git commit -m "$(cat <<'EOF'
test: 차트 소스에 박힌 한글을 잡는 검사를 더한다

계획 4에서 배포 게이트가 닫힌 척 한 적이 있다 — check-html 은 프리렌더
HTML 만 보는데 차트는 클라이언트에서 마운트된다. SSR 렌더 검사는 recharts
가 빈 마크업을 내 무의미했으므로(계획 4에서 확인) 소스를 직접 훑는다.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

## 완료 기준

- [ ] `npm run build` 통과
- [ ] `robots.txt` 에 AI 크롤러 8종이 명시적으로 허용돼 있다
- [ ] `llms.txt` 가 있고 **현재 요금**이 사전에서 파생돼 들어 있다
- [ ] sitemap 의 영문판 있는 경로에 `xhtml:link` 3줄씩 붙는다
- [ ] `FAQPage` 의 문답이 화면 사전과 글자까지 같다 (테스트가 강제)
- [ ] `BreadcrumbList` 가 홈 외 경로에 붙고 URL 이 로케일 접두사를 포함한다
- [ ] `/en` 아래 404 가 영문이고 `<html lang="en">` 이다
- [ ] `href="#"` 가 저장소에 없다
- [ ] `IRCharts` 에 한글 리터럴이 없음을 테스트가 강제하고, 그 테스트가 빨간불을 본 적 있다
- [ ] 문서의 수치가 실제와 일치한다

## 남는 것 (저장소 주인 몫)

- 홈 이미지 슬롯 4개 — 실제 사진
- `VITE_FORMSPREE_FORM_ID` — 문의 폼 전송
- 오피스·소셜 실제 주소 (생기면 Task 3 Step 4 를 되돌린다)
- 영문 IR 카피 검토, FAQ 환불 조항
- 저장소 공개 범위, 커밋 작성자 이메일
