import { describe, expect, it } from "vitest";
import { hasEnglish, localePath, pathHreflang, stripLocale } from "./localePath";

describe("localePath", () => {
  it("한국어는 경로를 그대로 둔다", () => {
    expect(localePath("/pricing", "ko")).toBe("/pricing");
    expect(localePath("/", "ko")).toBe("/");
  });

  it("영어는 /en 을 앞에 붙인다", () => {
    expect(localePath("/pricing", "en")).toBe("/en/pricing");
  });

  it("영어 루트는 /en 이다", () => {
    expect(localePath("/", "en")).toBe("/en");
  });

  it("영문판이 없는 경로는 영어에서도 한국어 경로를 준다", () => {
    expect(localePath("/demo", "en")).toBe("/demo");
    expect(localePath("/privacy", "en")).toBe("/privacy");
  });
});

/**
 * 앵커·쿼리가 붙은 경로. `/ir#ir-top` 같은 교차 페이지 딥링크는 `EN_ROUTES`
 * 조회 대상이 경로 전체일 때 조용히 어긋난다 — 목록에 없는 문자열이 되므로
 * 영문 화면에서 한국어 페이지로 떨어지고, `hreflang="ko"` 까지 붙는다.
 * 계획 3이 앵커로 이동하는 `IR.tsx` 를 전환하고 `/technology`·`/about` 영문판을
 * 붙이므로, 이 형태의 링크가 다시 생기는 것을 여기서 막는다.
 */
describe("localePath — 앵커·쿼리", () => {
  it("영문판이 있는 경로의 앵커를 유지한 채 /en 을 붙인다", () => {
    expect(localePath("/ir#ir-top", "en")).toBe("/en/ir#ir-top");
    expect(pathHreflang("/ir#ir-top", "en")).toBeUndefined();
  });

  it("영문판이 없는 경로는 앵커째 한국어로 두고 hreflang 을 붙인다", () => {
    expect(localePath("/demo#x", "en")).toBe("/demo#x");
    expect(pathHreflang("/demo#x", "en")).toBe("ko");
  });

  it("쿼리도 앵커와 같게 다룬다", () => {
    expect(localePath("/ir?tab=deck", "en")).toBe("/en/ir?tab=deck");
    expect(pathHreflang("/ir?tab=deck", "en")).toBeUndefined();
    expect(localePath("/demo?utm=x", "en")).toBe("/demo?utm=x");
    expect(pathHreflang("/demo?utm=x", "en")).toBe("ko");
  });

  it("루트의 앵커도 /en 뒤에 그대로 남는다", () => {
    expect(localePath("/#top", "en")).toBe("/en#top");
  });

  it("한국어에서는 앵커째 그대로 둔다", () => {
    expect(localePath("/ir#ir-top", "ko")).toBe("/ir#ir-top");
    expect(pathHreflang("/ir#ir-top", "ko")).toBeUndefined();
  });

  it("hasEnglish 는 앵커·쿼리를 뗀 경로로 판단한다", () => {
    expect(hasEnglish("/ir#ir-top")).toBe(true);
    expect(hasEnglish("/demo#x")).toBe(false);
    expect(hasEnglish("/ir?tab=deck")).toBe(true);
  });
});

describe("stripLocale", () => {
  it("한국어 경로를 그대로 돌려준다", () => {
    expect(stripLocale("/pricing")).toEqual({ locale: "ko", path: "/pricing" });
  });

  it("/en 접두사를 떼고 영어로 표시한다", () => {
    expect(stripLocale("/en/pricing")).toEqual({ locale: "en", path: "/pricing" });
  });

  it("/en 자체는 영어 루트다", () => {
    expect(stripLocale("/en")).toEqual({ locale: "en", path: "/" });
  });

  it("경로 안에 en 이 들어간 것과 혼동하지 않는다", () => {
    expect(stripLocale("/enterprise")).toEqual({ locale: "ko", path: "/enterprise" });
  });
});

describe("hasEnglish", () => {
  it("영문판 유무를 알려준다", () => {
    expect(hasEnglish("/pricing")).toBe(true);
    expect(hasEnglish("/demo")).toBe(false);
  });
});
