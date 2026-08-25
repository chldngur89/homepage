import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const distDir = path.join(process.cwd(), "dist");
const failures = [];

function distPath(route) {
  return route === "/"
    ? path.join(distDir, "index.html")
    : path.join(distDir, route.slice(1), "index.html");
}

/** 없으면 null. 스택 트레이스 대신 어느 경로가 안 나왔는지 말해 주기 위한 것이다. */
async function read(route) {
  try {
    return await readFile(distPath(route), "utf8");
  } catch {
    return null;
  }
}

function check(label, condition) {
  if (!condition) failures.push(label);
}

function report() {
  console.error("[check-html] 검증 실패");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

/**
 * 검사 대상 경로. **전환한 페이지가 늘면 여기에 한 줄만 더한다.**
 *
 * locale     — `<html lang>` 기대값이자 본문 언어.
 * hasEnglish — `EN_ROUTES` 에 있어 hreflang 3줄(ko·en·x-default)이 나와야 하는가.
 *              `/demo` 처럼 영문판이 없는 경로는 hreflang 이 아예 없어야 한다.
 *
 * `/en/technology`·`/en/about` 은 계획 3에서, `/en/ir` 은 계획 4 태스크 6
 * 에서 영문 본문이 채워지며 차례로 이 목록에 들어왔다(셋 다 `<main>` 기준
 * 한글 0자). 특히 `/en/ir` 은 저장소에 하나 남아 있던 배포 게이트였다 —
 * 프리렌더되고 sitemap·hreflang 에도 있으면서 `lang="en"` 을 달고 한국어
 * 본문을 내고 있었고, 이 목록에서 빠져 있어 검사가 그것을 보지 못했다.
 * 이제 프리렌더되는 경로가 전부 여기 있다.
 */
const PAGES = [
  { route: "/", locale: "ko", hasEnglish: true },
  { route: "/solution", locale: "ko", hasEnglish: true },
  { route: "/pricing", locale: "ko", hasEnglish: true },
  { route: "/demo", locale: "ko", hasEnglish: false },
  { route: "/contact", locale: "ko", hasEnglish: true },
  { route: "/en", locale: "en", hasEnglish: true },
  { route: "/en/solution", locale: "en", hasEnglish: true },
  { route: "/en/pricing", locale: "en", hasEnglish: true },
  { route: "/en/contact", locale: "en", hasEnglish: true },
  { route: "/technology", locale: "ko", hasEnglish: true },
  { route: "/about", locale: "ko", hasEnglish: true },
  { route: "/apps", locale: "ko", hasEnglish: false },
  { route: "/privacy", locale: "ko", hasEnglish: false },
  { route: "/terms", locale: "ko", hasEnglish: false },
  { route: "/en/technology", locale: "en", hasEnglish: true },
  { route: "/en/about", locale: "en", hasEnglish: true },
  { route: "/ir", locale: "ko", hasEnglish: true },
  { route: "/en/ir", locale: "en", hasEnglish: true },
];

/**
 * 로케일이 섞이지 않는가.
 *
 * 영어 페이지에 한글이 남으면 안 된다. `<script>`(JSON-LD)는 더 이상 걷어내지
 * 않는다 — WebSite 노드의 description 이 로케일과 무관하게 한국어 원문을
 * 공유하던 결함을 ssg/seo.ts 에서 고쳤으므로(SEO_BY_LOCALE.ko["/"] 고정 참조
 * → SEO_BY_LOCALE[locale]["/"]), 이제 JSON-LD 도 이 검사가 그대로 덮는다.
 *
 * ImageSlot 의 플레이스홀더 캡션을 빼주던 예외도 없앴다. 그 예외는 원인을
 * 고치지 않고 가드를 넓힌 것이었다 — `/en` 이 "대표의 업무 환경 — 책상 /
 * 노트 / 화면 (권장 1200×960)" 같은 한국어 제작 메모를 본문 텍스트로 찍고
 * 있었고, 검사는 그것을 눈감아 주고 있었다. 이제 ImageSlot 이 언어 없는
 * 점선 프레임만 그리므로(src/app/components/ImageSlot.tsx) 예외가 필요 없다.
 *
 * 남은 예외는 하나뿐이다. 정확히 무엇을 왜 빼는지 밝혀 둔다 — 본문을 가릴
 * 만큼 넓은 패턴을 쓰면 진짜 혼입도 같이 숨어버리므로, 특정 요소·특정
 * 속성값 하나만 지목하고 그 이상 넓히지 않는다.
 */
function stripForLocaleCheck(html) {
  return (
    html
      // HTML 주석 — `index.html` 의 GA4 설정 안내 주석 등, 로케일과 무관하게
      // 똑같이 박혀 있는 개발자용 메모. 렌더된 페이지에 텍스트로 나타나지
      // 않고 크롤러도 본문으로 읽지 않는다 — 마케팅 카피가 아니다.
      .replace(/<!--[\s\S]*?-->/g, "")
      // 언어 전환 버튼의 aria-label 값 하나만 정확히 지목한다(모든
      // aria-label 을 지우는 게 아니다). 이 라벨은 src/content/en/common.ts ·
      // ko/common.ts 양쪽에서 의도적으로 두 언어를 함께 담는다
      // ("Switch language / 언어 전환") — 어느 로케일에서 봐도 버튼의
      // 목적을 알 수 있게 하려는 설계이지 혼입이 아니다.
      .replace(/aria-label="Switch language \/ 언어 전환"/g, "")
  );
}

/** `<div id="root">` 안의 눈에 보이는 글자 수. 빈 SPA 셸이면 0 에 가깝다. */
function bodyTextLength(html) {
  const root = html.match(/<div id="root">([\s\S]*)<\/div>/)?.[1] ?? "";
  return root
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim().length;
}

/**
 * `<main>` 안쪽 마크업만. 헤더 nav · 푸터는 로케일과 무관하게 항상
 * 그 페이지의 로케일로 렌더되므로, "본문에 한국어가 있는가" 를 문서
 * 전체에서 찾으면 라우트 본문이 통째로 다른 언어로 샜어도 크롬의
 * 한글만으로 항상 통과한다 — 아무것도 가려내지 못하는 검사가 된다.
 * 판별력을 주려면 본문(main) 안쪽만 봐야 한다.
 */
function mainHtml(html) {
  return html.match(/<main\b[^>]*>([\s\S]*)<\/main>/)?.[1] ?? "";
}

// 위(천장): 가장 짧은 페이지(/demo)가 547자다. 프리렌더가 빠져 셸만 나가는
// 회귀를 잡는 것이 목적이므로 실제 최솟값보다 넉넉히 아래에 둔다 — 문구
// 한 줄 줄었다고 빌드를 깨자는 검사가 아니다.
//
// 아래(바닥) — 이쪽이 이 숫자의 존재 이유다: 헤더·nav·푸터만 있고 라우트
// 본문이 통째로 비어도(레이아웃은 렌더됐지만 그 라우트만 빈 셸인 회귀)
// 크롬만으로 한국어 경로는 188자, `/en` 경로는 254자가 잡힌다. 300은
// "프리렌더 자체가 빠졌다"뿐 아니라 "레이아웃은 나갔는데 라우트 본문이
// 비었다"도 같이 잡는 하한이다. `/en` 쪽 여유는 254 → 300, 46자뿐이다 —
// 영문 푸터 링크 하나만 늘어도 크롬이 300을 넘어 `/en` 전체에서 이 검사가
// 무력화될 수 있으니, 이 숫자를 올릴 때는 크롬만으로 다시 재보고 여유를
// 확인할 것.
const MIN_BODY_TEXT = 300;

const pageHtml = new Map();
for (const page of PAGES) {
  const html = await read(page.route);
  if (html === null) {
    failures.push(
      `${page.route} 가 프리렌더되지 않았다 (${path.relative(process.cwd(), distPath(page.route))} 없음)`,
    );
    continue;
  }
  pageHtml.set(page.route, html);
}

// 파일 자체가 없으면 그 아래 검사는 전부 의미가 없다. 여기서 끊어야 원인이
// 스무 줄짜리 파생 실패에 묻히지 않는다.
if (failures.length > 0) report();

for (const { route, locale, hasEnglish } of PAGES) {
  const html = pageHtml.get(route);

  check(
    `${route} 의 초기 HTML 에 본문이 없다 (빈 SPA 셸)`,
    bodyTextLength(html) >= MIN_BODY_TEXT,
  );

  check(`${route} 의 <html lang> 이 ${locale} 이 아니다`, html.includes(`<html lang="${locale}">`));

  // `hreflang` 부분 문자열을 문서 전체에서 세면 안 된다 — `LocaleLink` 가
  // 찍는 앵커의 `hrefLang` 마커(camelCase)까지 같이 잡힌다. React 는 JSX
  // 프로퍼티명 `hrefLang` 을 그대로 출력하므로 대소문자만으로 우연히
  // 갈리는 것이다. 실제 <head> 의 `<link rel="alternate">` 만 `<link>`
  // 요소 단위로 세되, `hreflang` 속성 자체는 대소문자를 구분하지 않는
  // HTML 속성이므로 대소문자 무시로 찾는다 — 아래 "영어 홈의 한국어 전용
  // 링크에 hreflang 표시 없음" 검사가 앵커에 대해 같은 이유로 같은 일을 한다.
  // (줄 번호로 가리키면 검사가 하나 늘 때마다 주석이 썩는다.)
  const alternateLinkCount = (html.match(/<link\b[^>]*>/gi) ?? []).filter(
    (tag) => /\brel="alternate"/i.test(tag) && /\bhreflang="/i.test(tag),
  ).length;
  if (hasEnglish) {
    check(
      `${route} 에 hreflang 3줄이 없다 (실제 ${alternateLinkCount}줄)`,
      alternateLinkCount === 3,
    );
  } else {
    check(
      `${route} 는 영문판이 없는데 hreflang 이 있다 (${alternateLinkCount}줄)`,
      alternateLinkCount === 0,
    );
  }

  const stripped = stripForLocaleCheck(html);
  if (locale === "en") {
    check(`${route} 에 한글이 섞여 있다`, !/[가-힣]/.test(stripped));
  } else {
    // 문서 전체(헤더 nav·푸터 포함)에서 한글을 찾으면 한국어 라우트는
    // 항상 통과한다 — 그 크롬이 로케일과 무관하게 늘 한국어이기
    // 때문이다. `<main>` 안쪽만 봐서, 라우트 본문 자체가 (예: 로케일
    // 배선 결함으로) 한국어를 잃는 경우를 실제로 잡는다.
    check(
      `${route} 의 <main> 본문에 한국어가 없다`,
      /[가-힣]/.test(stripForLocaleCheck(mainHtml(html))),
    );
  }

  check(`${route} 에 이전 브랜드명 CMO AI Agent 가 남아 있다`, !html.includes("CMO AI Agent"));
  check(`${route} 에 flow-form 자산 참조가 남아 있다`, !html.includes("flow-form"));
}

const ko = pageHtml.get("/");
const en = pageHtml.get("/en");

const apps = JSON.parse(await readFile(path.join(process.cwd(), "src/content/apps.json"), "utf8"));
const productUrl = apps.apps.find((app) => app.id === "cmo").url;

// 홈의 핵심 문구가 초기 HTML 에 들어 있는가 (크롤러 · NotebookLM 이 보는 내용)
check("한국어 홈에 포지셔닝 문구 없음", ko.includes("첫 번째 팀"));
check("한국어 홈에 성장 루프 없음", ko.includes("제안 → 승인 → 실행 → 반복 성장"));
check("한국어 홈에 CTA 없음", ko.includes("우리팀과 같이 성장하기"));
check("영어 홈에 포지셔닝 문구 없음", en.includes("first team"));
check("영어 홈에 CTA 없음", en.includes("Grow with WooriTeam"));
check("한국어 홈에 영문 CTA 혼입", !ko.includes("Grow with WooriTeam"));

// 주 CTA 가 제품에 닿는가.
//
// 리뷰 Finding: 헤더와 히어로의 주 CTA 만 /demo 로 바뀌어 있었고, 나머지 여덟
// 페이지의 똑같은 라벨은 제품 앱으로 가고 있었다. 같은 문구가 페이지마다 다른
// 곳으로 가는 상태였고, 사이트에서 구매 의도가 가장 높은 요소가 제품에 닿지
// 않았다. 목적지는 눈으로 보이지 않아 조용히 어긋나므로 여기서 고정한다.
function ctaTargets(html, label) {
  const anchors = html.match(new RegExp(`<a [^>]*>${label}</a>`, "g")) ?? [];
  return anchors.map((anchor) => anchor.match(/href="([^"]*)"/)?.[1]);
}

for (const [name, html, label] of [
  ["한국어 홈", ko, "우리팀과 같이 성장하기"],
  ["영어 홈", en, "Grow with WooriTeam"],
]) {
  const targets = ctaTargets(html, label);
  check(`${name}에 주 CTA 링크가 없음`, targets.length > 0);
  check(
    `${name}의 주 CTA 가 제품(${productUrl})으로 가지 않음`,
    targets.every((href) => href === productUrl),
  );
}

// 영문 화면에서 한국어 전용 링크가 언어 표시를 갖는가.
//
// 속성은 lang 이 아니라 hreflang 이다 — lang 은 요소 자신의 내용 언어를
// 뜻하는데 /en 에서 링크 텍스트는 영어다. React 는 JSX 의 hrefLang 을 그대로
// 출력하고 HTML 속성명은 대소문자를 구분하지 않으므로 대소문자 무시로 찾는다.
check("영어 홈의 한국어 전용 링크에 hreflang 표시 없음", /<a [^>]*hreflang="ko"/i.test(en));
check("한국어 홈에 불필요한 hreflang 표시", !/<a [^>]*hreflang=/i.test(ko));

// 목업 안 문구가 텍스트로 남는가 (GEO)
check("한국어 홈에 목업 문구 없음", ko.includes("이번 주 할 일"));
check("영어 홈에 목업 문구 없음", en.includes("this week"));

// ─────────────────────────────────────────────────────────────────────────
// heading 구조 — 프리렌더된 **모든** 문서
//
// 계획 1에서 홈의 06 섹션이 `<h2>` 없이 나갔다. `aria-labelledby` 가 `<p>`
// 안의 `<span>` 을 가리키는 바람에 스크린리더의 문서 개요에서 한 섹션이
// 통째로 빠져 있었다. 그때 넣은 방어는 `Home.test.tsx` 안이라 홈만 봤다.
// 여기서 보면 아직 전환하지 않은 페이지까지 전부 덮인다.
//
// **한계.** 정규식으로 HTML 을 훑는다. 진짜 파서가 아니므로 다음은 못 본다:
//   - 속성값 안에 `>` 가 들어 있으면 태그 경계를 잘못 잡는다
//   - 홑따옴표 속성(`id='x'`)·속성 없는 heading
//   - `<script>` · `<style>` · 주석 안의 내용은 아예 보지 않는다
//     (JSON-LD 의 `"@id"` 를 element id 로 착각하지 않게 하려는 것이다)
// 그래서 **오탐이 아니라 미탐 쪽으로** 기울여 놨다. 확실히 위반인 경우만
// 실패시킨다 — 못 잡는 위반이 있는 것은 받아들이되, 멀쩡한 마크업을
// 실패시켜 이 검사를 느슨하게 만들 이유를 주지는 않는다.
// ─────────────────────────────────────────────────────────────────────────

async function htmlDocuments(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "assets") continue;
      found.push(...(await htmlDocuments(full)));
    } else if (entry.name.endsWith(".html")) {
      found.push(full);
    }
  }
  return found;
}

/** 주석 · script · style 을 걷어낸, 마크업만 남은 사본 */
function scannable(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ");
}

const documents = (await htmlDocuments(distDir)).sort();

// 이 검사가 조용히 0개를 훑고 통과하지 않도록, sitemap 에 실린 경로의 산출
// 파일이 실제로 위 목록에 있는지 먼저 확인한다. sitemap 은 prerenderRoutes
// 에서 생성되므로 경로가 늘면 여기도 저절로 늘어난다.
//
// 위 `pageHtml` 채우는 루프와 같은 취급 — sitemap.xml 자체가 없으면 raw
// ENOENT 스택 대신 조치 가능한 실패로 보고하고 바로 끊는다. 그 아래 모든
// sitemap 대조 검사는 이 파일이 있다는 전제이므로 계속해도 의미가 없다.
let sitemap;
try {
  sitemap = await readFile(path.join(distDir, "sitemap.xml"), "utf8");
} catch {
  failures.push("dist/sitemap.xml 이 없다 (사이트맵이 생성되지 않았다)");
  report();
}
const sitemapPaths = [...sitemap.matchAll(/<loc>([^<]*)<\/loc>/g)].map((match) => {
  const pathname = new URL(match[1]).pathname.replace(/^\/|\/$/g, "");
  return pathname === "" ? path.join(distDir, "index.html") : path.join(distDir, pathname, "index.html");
});
check("sitemap 에 경로가 하나도 없다", sitemapPaths.length > 0);
for (const filePath of sitemapPaths) {
  check(
    `sitemap 의 ${path.relative(distDir, filePath)} 가 프리렌더되지 않았다`,
    documents.includes(filePath),
  );
}

let labelledbyChecked = 0;

for (const filePath of documents) {
  const name = path.relative(distDir, filePath);
  const html = scannable(await readFile(filePath, "utf8"));

  // 문서에 h1 이 정확히 하나
  const h1Count = (html.match(/<h1[\s>]/gi) ?? []).length;
  check(`${name} 의 h1 이 ${h1Count}개다 (정확히 1개여야 한다)`, h1Count === 1);

  // 한 문서 안에서 id 가 중복되지 않는다.
  // `\s` 를 앞에 둬서 data-id · aria-labelledby 같은 다른 속성에 걸리지 않게 한다.
  const ids = [...html.matchAll(/\sid="([^"]*)"/g)].map((match) => match[1]);
  const duplicated = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
  check(`${name} 에 중복 id 가 있다: ${duplicated.join(", ")}`, duplicated.length === 0);

  // aria-labelledby 가 가리키는 heading 이 정확히 하나 있다
  const headingIds = [...html.matchAll(/<h[1-6]\b[^>]*?\sid="([^"]*)"/gi)].map((match) => match[1]);
  for (const [, value] of html.matchAll(/\saria-labelledby="([^"]*)"/g)) {
    const targets = value.trim().split(/\s+/).filter(Boolean);
    // IDREFS 는 여러 개를 띄어쓰기로 나열할 수 있고 그중 일부는 heading 이
    // 아닌 설명일 수 있다. 미탐 쪽으로 기울인다 — 하나만 가리키는, 판단이
    // 명확한 경우만 검사한다.
    if (targets.length !== 1) continue;
    const [target] = targets;
    const matched = headingIds.filter((id) => id === target).length;
    labelledbyChecked += 1;
    check(
      `${name} 의 aria-labelledby="${target}" 가 가리키는 h1~h6 이 ${matched}개다 (정확히 1개여야 한다)`,
      matched === 1,
    );
  }
}

console.log(
  `[check-html] 경로 ${PAGES.length}개 · heading 문서 ${documents.length}개 · aria-labelledby ${labelledbyChecked}건`,
);

if (failures.length > 0) report();

console.log("[check-html] 통과");
