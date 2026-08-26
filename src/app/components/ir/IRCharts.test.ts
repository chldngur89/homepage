import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

/**
 * `IRCharts.tsx` 는 `IR.tsx` 의 `useEffect` 안에서 동적 import 되는 클라이언트
 * 전용 컴포넌트다 — 프리렌더 단계(`scripts/prerender.mjs`)에서 실행되지 않고,
 * `scripts/check-html.mjs` 가 보는 정적 HTML에도 이 파일이 그리는 마크업은
 * 없다. 이전 계획에서 바로 그 사각지대 때문에 `/en/ir`의 차트 범례가 영문
 * 페이지에서 한국어로 떴다 — 정적 검사는 한글 0자를 보고했고 결론은 틀렸다.
 *
 * SSR 렌더 테스트로 이 자리를 덮으려는 시도는 이미 있었고 버려졌다: recharts
 * 의 `ResponsiveContainer`가 `renderToStaticMarkup`에서 빈 마크업을 내서,
 * 한글을 심어도 초록불이었다(계획 4 태스크 7). 그래서 여기서는 렌더링을
 * 흉내 내지 않는다 — **소스 파일을 문자열로 읽어 주석을 걷어낸 뒤 한글
 * 문자열 리터럴이 있는지만 본다.**
 *
 * 이 파일 자체가 한국어 주석으로 가득하다(이 저장소의 관례). 주석을 먼저
 * 제거하지 않으면 이 검사는 정상 코드에서도 항상 빨간불이 된다 — 그래서
 * 블록 주석과 라인 주석을 먼저 걷어낸다.
 *
 * 이 검사가 실패하면 라벨을 사전(`content/ko/ir.ts`, `content/en/ir.ts`)에서
 * 가져오도록 고친다. 이 파일에 카피 문자열을 직접 두지 않는 것이 계약이다.
 */
const chartsPath = fileURLToPath(new URL("./IRCharts.tsx", import.meta.url));

describe("IRCharts 소스", () => {
  it("한글 문자열 리터럴이 없다", () => {
    const source = readFileSync(chartsPath, "utf8")
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\/\/.*$/gm, "");

    expect(source.match(/["'`][^"'`]*[가-힣][^"'`]*["'`]/g) ?? []).toEqual([]);
  });
});
