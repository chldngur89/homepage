import { describe, expect, it } from "vitest";
import { IMAGE_SLOTS } from "./images";

describe("IMAGE_SLOTS", () => {
  it("슬롯 4개를 정의한다", () => {
    expect(Object.keys(IMAGE_SLOTS)).toHaveLength(4);
  });

  it("모든 src 가 /img/ 아래를 가리킨다", () => {
    for (const spec of Object.values(IMAGE_SLOTS)) {
      expect(spec.src).toMatch(/^\/img\/[a-z0-9-]+\.png$/);
    }
  });

  it("모든 슬롯에 비율과 설명이 있다", () => {
    for (const spec of Object.values(IMAGE_SLOTS)) {
      expect(spec.ratio).toMatch(/^\d+(\.\d+)?\s*\/\s*\d+(\.\d+)?$/);
      expect(spec.subject.length).toBeGreaterThan(0);
    }
  });

  it("아바타 슬롯은 정사각이다", () => {
    expect(IMAGE_SLOTS["voice-1"].ratio).toBe("1 / 1");
    expect(IMAGE_SLOTS["voice-2"].ratio).toBe("1 / 1");
  });
});
