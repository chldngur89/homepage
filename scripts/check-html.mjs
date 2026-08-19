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
// 영어 페이지에 한글이 남으면 안 된다. <script>(JSON-LD)는 더 이상 걷어내지
// 않는다 — WebSite 노드의 description 이 로케일과 무관하게 한국어 원문을
// 공유하던 결함을 ssg/seo.ts 에서 고쳤으므로(SEO_BY_LOCALE.ko["/"] 고정 참조
// → SEO_BY_LOCALE[locale]["/"]), 이제 JSON-LD 도 이 검사가 그대로 덮는다.
// 아래 두 가지만 좁게 제외한다. 각각 정확히 무엇을 왜 빼는지 밝혀 둔다 —
// 본문을 가릴 만큼 넓은 패턴을 쓰면 진짜 혼입도 같이 숨어버리므로, 특정
// 요소·특정 속성값 하나만 지목하고 그 이상 넓히지 않는다.
function stripForLocaleCheck(html) {
  return (
    html
      // HTML 주석 — `index.html` 의 GA4 설정 안내 주석 등, 로케일과 무관하게
      // 똑같이 박혀 있는 개발자용 메모. 렌더된 페이지에 텍스트로 나타나지
      // 않고 크롤러도 본문으로 읽지 않는다 — 마케팅 카피가 아니다.
      .replace(/<!--[\s\S]*?-->/g, "")
      // ImageSlot 플레이스홀더 캡션(src/app/config/images.ts 의 subject) 하나만
      // 정확히 지목한다. 이 className("px-3 text-center text-xs leading-snug
      // text-ink-3")은 저장소 전체에서 ImageSlot.tsx 한 곳에서만 쓰인다.
      // 실제 사진이 들어오기 전까지만 사람 눈에 보이는 "이 자리에 어떤
      // 사진이 들어갈지" 안내이고, ImageSlot.tsx 가 명시적으로
      // aria-hidden="true" 로 스크린리더에서도 숨긴다 — 마케팅 카피가
      // 아니라 로케일과 무관한 개발 중 placeholder 다. `sample` 이 모두
      // false 로 바뀌면(실제 사진 교체 완료) 이 span 자체가 더 이상
      // 렌더되지 않으므로 이 예외도 자연히 없어진다.
      .replace(
        /<span aria-hidden="true" class="px-3 text-center text-xs leading-snug text-ink-3">[^<]*<\/span>/g,
        "",
      )
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
