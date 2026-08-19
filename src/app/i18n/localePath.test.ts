import { describe, expect, it } from "vitest";
import { hasEnglish, localePath, stripLocale } from "./localePath";

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
