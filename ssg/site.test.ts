import { describe, expect, it } from "vitest";
import { absoluteUrl, SITE_URL } from "./site";

describe("SITE_URL", () => {
  it("프로토콜을 포함하고 끝에 슬래시가 없다", () => {
    expect(SITE_URL).toMatch(/^https?:\/\//);
    expect(SITE_URL.endsWith("/")).toBe(false);
  });
});

describe("absoluteUrl", () => {
  it("루트 경로를 슬래시 하나로 만든다", () => {
    expect(absoluteUrl("/")).toBe(`${SITE_URL}/`);
  });

  it("하위 경로를 붙인다", () => {
    expect(absoluteUrl("/pricing")).toBe(`${SITE_URL}/pricing`);
  });

  it("경로가 겹쳐도 슬래시가 두 번 들어가지 않는다", () => {
    expect(absoluteUrl("//pricing")).not.toContain("///");
  });
});
