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
});
