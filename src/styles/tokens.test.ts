import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
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
  /**
   * 밝은 면은 셋이다. 계획 1의 이 검사는 `ground` 하나만 봤고, 그래서
   * `ground` 보다 어두운 `panel` 위에서 `--ink-3` 가 4.43:1 로 미달인 것을
   * 놓쳤다 — `--ink-3` 는 `SectionLabel` 의 색이고 `tone="panel"` 섹션이
   * 홈·솔루션·요금·데모·문의에 걸쳐 아홉 개 있으므로 사이트에 실제로 떠
   * 있던 결함이다. 표면 하나만 보면 같은 종류를 계속 놓치므로 셋을 모두
   * 짝지어 본다.
   */
  // keyof 로 좁히지 않으면 BRAND_TOKENS[token] 이 string 인덱스라 타입 에러가 난다
  const surfaces: (keyof typeof BRAND_TOKENS)[] = ["ground", "panel", "surface"];
  const inks: (keyof typeof BRAND_TOKENS)[] = ["ink", "ink2", "ink3", "brand"];
  const pairs = surfaces.flatMap((surface) => inks.map((ink) => [ink, surface] as const));

  it.each(pairs)("--%s 는 %s 위에서 4.5:1 이상", (ink, surface) => {
    expect(contrastRatio(BRAND_TOKENS[ink], BRAND_TOKENS[surface])).toBeGreaterThanOrEqual(4.5);
  });

  it("반전 섹션의 본문은 invert 위에서 4.5:1 이상", () => {
    expect(
      contrastRatio(BRAND_TOKENS.invertInk2, BRAND_TOKENS.invert),
    ).toBeGreaterThanOrEqual(4.5);
  });

  /**
   * invertLine 은 반전 CTA 면 위의 헤어라인이다. 위의 4.5:1 집합에 넣지 않는
   * 이유는 그것이 본문 텍스트 기준이고 이 토큰은 글자가 아니기 때문이다 —
   * 밝은 면의 line/line-2 를 대비 검사에서 빼 둔 것과 같은 취급이다
   * (실측 1.66:1). 대신 면과 같은 색이 되어 버튼 윤곽이 통째로 사라지는
   * 회귀는 여기서 막는다.
   */
  it("반전 면의 헤어라인은 그 면과 구분된다", () => {
    expect(contrastRatio(BRAND_TOKENS.invertLine, BRAND_TOKENS.invert)).toBeGreaterThan(1.2);
  });
});

/**
 * 값의 원본은 theme.css 이고 tokens.ts 는 사본이다. 두 파일이 어긋나면 위의
 * 대비 검사는 화면에 쓰이지도 않는 색을 통과시킨다 — 검사가 있는데 아무것도
 * 지키지 못하는 상태가 된다. 실제로 --ink-3 를 고칠 때 두 파일을 손으로
 * 같이 고쳐야 했고, 그것을 지켜 주는 것이 아무것도 없었다. 여기서 묶는다.
 *
 * 한계 두 가지(현재는 둘 다 미발현 — theme.css 는 토큰당 선언 하나뿐이고
 * `.dark` 오버라이드가 없다):
 * - 한 방향뿐이다. `BRAND_TOKENS` 에 있는 토큰만 theme.css 와 대조한다.
 *   theme.css 에 새 색을 선언하고 tokens.ts(따라서 BRAND_TOKENS)에는 추가하지
 *   않으면, 그 색은 동기화 검사도 위 대비 검사도 받지 않고 화면에 나간다.
 * - 정규식이 첫 매치를 집는다 — `:root` 안에 같은 커스텀 프로퍼티가 두 번
 *   선언되면(예: 나중에 `.dark { --ink-3: ... }` 같은 오버라이드가 생기면)
 *   `match` 가 첫 값만 보고 실제로 적용되는 값(마지막 선언)을 놓칠 수 있다.
 */
describe("theme.css 와 tokens.ts 의 브랜드 토큰 값이 같다", () => {
  const themeCss = readFileSync(fileURLToPath(new URL("./theme.css", import.meta.url)), "utf-8");

  /** ink2 → --ink-2, invertInk2 → --invert-ink-2 */
  function cssName(token: string) {
    return `--${token.replace(/([A-Z])/g, "-$1").replace(/(\d)/g, "-$1").toLowerCase()}`;
  }

  it.each(Object.entries(BRAND_TOKENS))("%s", (token, value) => {
    const declared = themeCss.match(
      new RegExp(`${cssName(token)}:\\s*(#[0-9a-fA-F]{3,8})\\s*;`),
    )?.[1];

    expect(declared, `theme.css 에 ${cssName(token)} 선언이 없다`).toBeDefined();
    expect(declared?.toLowerCase()).toBe(value.toLowerCase());
  });
});
