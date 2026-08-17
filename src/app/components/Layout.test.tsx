import { describe, expect, it } from "vitest";
import { getLangSwitchTarget } from "@/app/components/Layout";

// getLangSwitchTarget 은 언어 전환 버튼의 목적지를 계산하는 순수 함수다.
// hasEnglish/stripLocale 조합에는 트랩이 있다: 영문판이 없는 한국어 전용
// 경로(/demo, /apps, /privacy, /terms)에서는 localePath(path, "en") 이
// 접두사 없는 한국어 경로를 그대로 돌려주고, 그 결과를 stripLocale 에
// 넣으면 locale 이 "en" 이 아니라 "ko" 로 나온다. 이 테스트는 그 트랩을
// 실제 컴포넌트 렌더 없이 고정한다.
describe("getLangSwitchTarget", () => {
  it("/pricing(ko) 에서는 /en/pricing 으로 보낸다", () => {
    expect(getLangSwitchTarget("/pricing", "ko")).toBe("/en/pricing");
  });

  it("/en/pricing(en) 에서는 /pricing 으로 보낸다", () => {
    expect(getLangSwitchTarget("/en/pricing", "en")).toBe("/pricing");
  });

  it("영문판이 없는 /demo(ko) 에서는 /demo 가 아니라 영문 홈(/en) 으로 보낸다", () => {
    expect(getLangSwitchTarget("/demo", "ko")).toBe("/en");
  });

  it("/en(en) 에서는 한국어 홈(/) 으로 보낸다", () => {
    expect(getLangSwitchTarget("/en", "en")).toBe("/");
  });

  it("홈(/, ko) 에서는 /en 으로 보낸다", () => {
    expect(getLangSwitchTarget("/", "ko")).toBe("/en");
  });

  it("영문판이 없는 /apps(ko) 에서도 영문 홈(/en) 으로 보낸다", () => {
    expect(getLangSwitchTarget("/apps", "ko")).toBe("/en");
  });

  it("영문판이 없는 /privacy(ko) 에서도 영문 홈(/en) 으로 보낸다", () => {
    expect(getLangSwitchTarget("/privacy", "ko")).toBe("/en");
  });

  it("결코 같은 경로에 머무르지 않는다 (모든 EN_ROUTES 왕복)", () => {
    const roundTripPaths = ["/", "/solution", "/technology", "/pricing", "/about", "/contact", "/ir"];
    for (const path of roundTripPaths) {
      const enTarget = getLangSwitchTarget(path, "ko");
      expect(enTarget).not.toBe(path);
      const backTarget = getLangSwitchTarget(enTarget, "en");
      expect(backTarget).toBe(path);
    }
  });
});
