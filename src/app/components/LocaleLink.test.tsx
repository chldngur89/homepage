import { describe, expect, it } from "vitest";
import { resolveLocaleLink } from "./LocaleLink";

describe("resolveLocaleLink", () => {
  it("한국어에서는 경로를 그대로 쓰고 hrefLang 을 붙이지 않는다", () => {
    const { to, hrefLang } = resolveLocaleLink("/pricing", "ko");
    expect(to).toBe("/pricing");
    expect(hrefLang).toBeUndefined();
  });

  it("영어에서 영문판이 있는 경로는 /en 을 붙이고 hrefLang 이 없다", () => {
    const { to, hrefLang } = resolveLocaleLink("/pricing", "en");
    expect(to).toBe("/en/pricing");
    expect(hrefLang).toBeUndefined();
  });

  it("영어에서 한국어 전용 경로는 원 경로를 쓰고 hrefLang='ko' 를 붙인다", () => {
    const { to, hrefLang } = resolveLocaleLink("/demo", "en");
    expect(to).toBe("/demo");
    expect(hrefLang).toBe("ko");
  });

  it("한국어에서 한국어 전용 경로에는 hrefLang 을 붙이지 않는다", () => {
    const { to, hrefLang } = resolveLocaleLink("/demo", "ko");
    expect(hrefLang).toBeUndefined();
  });
});
