import { describe, expect, it } from "vitest";
import { prerenderRoutes } from "./route-config";

describe("prerenderRoutes", () => {
  it("한국어 11개와 영어 7개, 합쳐서 18개다", () => {
    expect(prerenderRoutes).toHaveLength(18);
  });

  it("한국어 경로를 모두 포함한다", () => {
    for (const path of [
      "/", "/solution", "/technology", "/pricing", "/demo",
      "/apps", "/about", "/contact", "/ir", "/privacy", "/terms",
    ]) {
      expect(prerenderRoutes).toContain(path);
    }
  });

  it("영어 경로 7개를 포함한다", () => {
    for (const path of [
      "/en", "/en/solution", "/en/technology", "/en/pricing",
      "/en/about", "/en/contact", "/en/ir",
    ]) {
      expect(prerenderRoutes).toContain(path);
    }
  });

  it("영문판이 없는 경로의 /en 판을 만들지 않는다", () => {
    for (const path of ["/en/demo", "/en/apps", "/en/privacy", "/en/terms"]) {
      expect(prerenderRoutes).not.toContain(path);
    }
  });

  it("중복이 없다", () => {
    expect(new Set(prerenderRoutes).size).toBe(prerenderRoutes.length);
  });
});
