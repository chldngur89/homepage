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
