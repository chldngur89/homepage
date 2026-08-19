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

const apps = JSON.parse(await readFile(path.join(process.cwd(), "src/content/apps.json"), "utf8"));
const productUrl = apps.apps.find((app) => app.id === "cmo").url;

// 초기 HTML 에 본문이 들어 있는가 (크롤러 · NotebookLM 이 보는 내용)
check("한국어 홈에 포지셔닝 문구 없음", ko.includes("첫 번째 팀"));
check("한국어 홈에 성장 루프 없음", ko.includes("제안 → 승인 → 실행 → 반복 성장"));
check("한국어 홈에 CTA 없음", ko.includes("우리팀과 같이 성장하기"));
check("영어 홈에 포지셔닝 문구 없음", en.includes("first team"));
check("영어 홈에 CTA 없음", en.includes("Grow with WooriTeam"));

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

// 로케일이 섞이지 않는가.
//
// 영어 페이지에 한글이 남으면 안 된다. <script>(JSON-LD)는 더 이상 걷어내지
// 않는다 — WebSite 노드의 description 이 로케일과 무관하게 한국어 원문을
// 공유하던 결함을 ssg/seo.ts 에서 고쳤으므로(SEO_BY_LOCALE.ko["/"] 고정 참조
// → SEO_BY_LOCALE[locale]["/"]), 이제 JSON-LD 도 이 검사가 그대로 덮는다.
//
// ImageSlot 의 플레이스홀더 캡션을 빼주던 예외도 없앴다. 그 예외는 원인을
// 고치지 않고 가드를 넓힌 것이었다 — `/en` 이 "대표의 업무 환경 — 책상 /
// 노트 / 화면 (권장 1200×960)" 같은 한국어 제작 메모를 본문 텍스트로 찍고
// 있었고, 검사는 그것을 눈감아 주고 있었다. 이제 ImageSlot 이 언어 없는
// 점선 프레임만 그리므로(src/app/components/ImageSlot.tsx) 예외가 필요 없다.
//
// 남은 예외는 하나뿐이다. 정확히 무엇을 왜 빼는지 밝혀 둔다 — 본문을 가릴
// 만큼 넓은 패턴을 쓰면 진짜 혼입도 같이 숨어버리므로, 특정 요소·특정
// 속성값 하나만 지목하고 그 이상 넓히지 않는다.
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

check("한국어 홈에 영문 CTA 혼입", !ko.includes("Grow with WooriTeam"));
check("영어 홈에 한글 혼입", !/[가-힣]/.test(stripForLocaleCheck(en)));

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
