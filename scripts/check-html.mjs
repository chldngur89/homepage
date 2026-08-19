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

// 로케일이 섞이지 않는가.
//
// 영어 페이지에 한글이 남으면 안 되지만, 아래 세 가지는 검사 대상에서 뺀다.
// 이걸 빼지 않으면 정상적으로 빌드된 영어 페이지도 매번 걸린다 — 그러면
// "실패가 흔한 일"이 되어 정작 진짜 혼입이 나도 아무도 눈여겨보지 않는다.
//
// 1. <script> (JSON-LD) — WebSite 엔티티의 description 은 ssg/seo.ts 에서
//    로케일과 무관하게 한국어 원문 하나를 공유한다. 같은 @id 를 가리키는
//    사이트 전역 메타데이터라 의도된 설계다. 크롤러가 실제로 읽는 마케팅
//    카피는 본문(body)에 있으므로, 이 블록을 제거해도 검사가 "아무것도
//    안 보는" 상태가 되지는 않는다 — 본문은 그대로 남아 검사 대상이 된다.
// 2. HTML 주석 — `index.html` 의 GA4 설정 안내 주석 등, 로케일과 무관하게
//    동일하게 박혀 있는 개발자용 메모다.
// 3. aria-hidden="true" 요소 — `ImageSlot`(src/app/config/images.ts 의
//    subject)의 플레이스홀더 캡션이 여기 해당한다. 실제 사진이 들어오기
//    전까지 사람 눈에만 보이는 내부 안내 문구이고, 스크린리더에서도
//    명시적으로 숨겨져 있다(`ImageSlot.tsx` 주석 참고) — 마케팅 카피가
//    아니라 로케일과 무관한 개발 중 placeholder 다.
// 4. aria-label="..." 값 — 언어 전환 버튼의 aria-label 은 의도적으로 두
//    언어를 함께 담는다("Switch language / 언어 전환"). 어느 로케일에서
//    봐도 버튼의 목적을 알 수 있게 하려는 설계이지, 혼입이 아니다.
function stripForLocaleCheck(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<([a-z][a-z0-9]*)\b[^>]*\baria-hidden="true"[^>]*>[\s\S]*?<\/\1>/gi, "")
    .replace(/\baria-label="[^"]*"/g, "");
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
