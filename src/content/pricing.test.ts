import { describe, expect, it } from "vitest";
import { pricing as ko } from "./ko/pricing";
import { pricing as en } from "./en/pricing";
import { common as koCommon } from "./ko/common";
import { common as enCommon } from "./en/common";

/**
 * 요금 페이지는 사이트에서 유일하게 **실제 판매 조건**을 싣는 화면이다.
 * 금액·요율이 디자인 작업 중에 조용히 흔들리면 그건 스타일 회귀가 아니라
 * 상거래 오류다. 눈으로는 잘 안 보이고(₩199,000 → ₩199,00) 리뷰도 놓치기
 * 쉬우므로 여기서 값 자체를 고정한다.
 *
 * 이 테스트가 실패하면 "테스트를 고치는" 것이 아니라, 값을 정말 바꾸기로
 * 한 결정이 있었는지부터 확인한다.
 */

/** 사전 객체 안의 모든 문자열을 모은다. */
function strings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (value && typeof value === "object") return Object.values(value).flatMap(strings);
  return [];
}

function amounts(dictionary: unknown): string[] {
  return [...new Set(strings(dictionary).flatMap((s) => s.match(/₩[\d,]+/g) ?? []))].sort();
}

function rates(dictionary: unknown): string[] {
  return [...new Set(strings(dictionary).flatMap((s) => s.match(/\d+(?:\.\d+)?%/g) ?? []))].sort();
}

/** 전환 이전 Pricing.tsx 에 하드코딩돼 있던 금액 전부. */
const AMOUNTS = ["₩0", "₩10,000", "₩10,000,000", "₩15,000", "₩199,000", "₩50,000", "₩99,000"];

describe("요금 사전의 판매 조건", () => {
  it("한국어 사전의 금액이 전환 이전과 같다", () => {
    expect(amounts(ko)).toEqual(AMOUNTS);
  });

  it("영어 사전이 금액을 환산하지 않고 원화 표기 그대로 둔다", () => {
    expect(amounts(en)).toEqual(AMOUNTS);
  });

  it("수익 쉐어 요율이 두 로케일 모두 0.5% 하나뿐이다", () => {
    expect(rates(ko)).toEqual(["0.5%"]);
    expect(rates(en)).toEqual(["0.5%"]);
    expect(ko.revenueShare.planBodyRate).toBe("0.5%");
    expect(en.revenueShare.planBodyRate).toBe("0.5%");
  });

  it("요금제 세 개와 FAQ 네 개가 두 로케일에서 같다", () => {
    expect(ko.plans.items).toHaveLength(3);
    expect(en.plans.items).toHaveLength(ko.plans.items.length);
    expect(ko.faq.items).toHaveLength(4);
    expect(en.faq.items).toHaveLength(ko.faq.items.length);
  });

  it("요금제별 금액이 두 로케일에서 같은 순서로 같다", () => {
    expect(en.plans.items.map((plan) => plan.price)).toEqual(ko.plans.items.map((p) => p.price));
    expect(en.perUse.packages.map((pkg) => pkg.price)).toEqual(
      ko.perUse.packages.map((p) => p.price),
    );
    expect(en.revenueShare.example.rows.map((row) => row.value)).toEqual(
      ko.revenueShare.example.rows.map((r) => r.value),
    );
  });

  /**
   * 앞의 두 요금제 버튼은 사이트 공통 주 CTA 와 같은 라벨을 쓴다. 같은 문구가
   * 화면마다 달라 보이면 안 된다 — 계획의 전역 제약이기도 하다.
   */
  it("요금제 카드의 주 CTA 라벨이 공통 CTA 와 같다", () => {
    expect(ko.plans.items[0].cta).toBe(koCommon.cta.primary);
    expect(ko.plans.items[1].cta).toBe(koCommon.cta.primary);
    expect(en.plans.items[0].cta).toBe(enCommon.cta.primary);
    expect(en.plans.items[1].cta).toBe(enCommon.cta.primary);
  });

  it("영어 사전에 한글이 남아 있지 않다", () => {
    expect(strings(en).filter((s) => /[가-힣]/.test(s))).toEqual([]);
  });
});
