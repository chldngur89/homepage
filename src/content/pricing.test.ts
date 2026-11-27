import { describe, expect, it } from "vitest";
import { pricing as ko } from "./ko/pricing";
import { pricing as en } from "./en/pricing";
import { common as koCommon } from "./ko/common";
import { common as enCommon } from "./en/common";

/**
 * 요금 페이지는 사이트에서 유일하게 **실제 판매 조건**을 싣는 화면이다.
 * 금액·요율·기능 목록이 디자인 작업이나 번역 중에 조용히 흔들리면 그건 스타일
 * 회귀가 아니라 상거래 오류다. 눈으로는 잘 안 보이고(₩199,000 → ₩199,00)
 * 리뷰도 놓치기 쉬우므로 여기서 값 자체를 고정한다.
 *
 * 아래 리터럴은 **전환 이전 `Pricing.tsx`(커밋 08a1afb)에서 기계적으로 뽑은
 * 것**이다. 사전에서 옮겨 적은 것이 아니므로, 사전이 틀리면 여기서 걸린다.
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

/**
 * 사전에 등장하는 금액 전부.
 *
 * 2026-11-27 판매 조건 변경(저장소 주인 결정, 2026-11 IR 덱 13쪽 기준):
 * 무료 ₩0/프로 ₩29,900/슈퍼 ₩299,900 → 입문형 ₩29,000/주력형 ₩299,000/
 * 확장형 "별도 견적". 건별 과금(₩19,900)과 수익 쉐어(0.5%, 예시 ₩10,000,000·
 * ₩50,000)는 페이지에서 빠졌으므로 목록에서도 사라진다.
 */
const AMOUNTS = ["₩29,000", "₩299,000"];

/**
 * 요금제의 이름 ↔ 금액 ↔ 기능 목록의 **짝**. 집합만 비교하면 두 요금제의
 * 금액이 서로 바뀌어도 통과한다 — 그래서 짝을 따로 검사한다.
 */
const KO_PLANS = [
  {
    name: "입문형",
    price: "₩29,000",
    features: [
      "사장님 대시보드와 알림",
      "주 1회 홍보 업무 준비",
      "매장·상품 정보 기반 콘텐츠",
      "사장님 승인 후 실행",
      "업무 이력 기록",
    ],
  },
  {
    name: "주력형",
    price: "₩299,000",
    features: [
      "입문형의 모든 기능",
      "매일 마케팅·판매 업무 준비",
      "승인과 후속 관리",
      "업무 이력으로 다음 제안 개선",
      "우선 온보딩 지원",
    ],
  },
  {
    name: "확장형",
    price: "별도 견적",
    features: [
      "주력형의 모든 기능",
      "업종별 마케팅 전문가 매칭",
      "가게 상황에 맞춘 운영 설계",
      "별도 견적 및 계약",
    ],
  },
];

/** 영문판은 이름만 번역하고 금액은 원본 그대로다. 짝은 한국어와 같아야 한다. */
const EN_PLANS = [
  { name: "Starter", price: "₩29,000" },
  { name: "Core", price: "₩299,000" },
  { name: "Expansion", price: "By quote" },
];

describe("요금 사전의 판매 조건", () => {
  it("한국어 사전의 금액이 전환 이전과 같다", () => {
    expect(amounts(ko)).toEqual(AMOUNTS);
  });

  it("영어 사전이 금액을 환산하지 않고 원화 표기 그대로 둔다", () => {
    expect(amounts(en)).toEqual(AMOUNTS);
  });

  it("두 로케일 모두 요율(%) 표기가 없다 — 수익 쉐어는 판매 조건에서 빠졌다", () => {
    expect(rates(ko)).toEqual([]);
    expect(rates(en)).toEqual([]);
  });

  it("요금제 세 개와 FAQ 네 개가 두 로케일에서 같다", () => {
    expect(ko.plans.items).toHaveLength(3);
    expect(en.plans.items).toHaveLength(ko.plans.items.length);
    expect(ko.faq.items).toHaveLength(4);
    expect(en.faq.items).toHaveLength(ko.faq.items.length);
  });

  /**
   * 금액을 **어느 요금제에 붙였는지**까지 본다. 집합 비교(위 두 개)는 금액이
   * 사라지거나 자릿수가 틀어지는 것은 잡지만, 두 요금제 사이에서 자리가
   * 바뀌는 것은 잡지 못한다.
   */
  it("요금제의 이름과 금액이 짝을 이룬 채 원본과 같다", () => {
    expect(ko.plans.items.map((plan) => ({ name: plan.name, price: plan.price }))).toEqual(
      KO_PLANS.map((plan) => ({ name: plan.name, price: plan.price })),
    );
    expect(en.plans.items.map((plan) => ({ name: plan.name, price: plan.price }))).toEqual(
      EN_PLANS,
    );
  });

  /**
   * `DeepWiden` 은 기능 줄이 **빠지면** arity 로 잡지만, 다시 쓰이는 것은
   * 잡지 못한다. 기능 목록도 판매 조건이라 문구를 고정한다.
   */
  it("한국어 요금제의 기능 목록이 한 줄도 바뀌지 않았다", () => {
    expect(ko.plans.items.map((plan) => plan.features)).toEqual(
      KO_PLANS.map((plan) => plan.features),
    );
  });

  /**
   * 강조 요금제(2px 잉크 상단선 + 채운 버튼)는 `badge` 가 비어 있지 않은
   * 카드로 정해진다 — 번역자가 고칠 수 있는 문자열이다. 두 번째 카드에도
   * 배지가 붙으면 두 장이 함께 강조되고 아무 경고도 나지 않는다.
   */
  it("강조 요금제가 두 로케일 모두 정확히 하나이고 같은 자리다", () => {
    const badged = (items: readonly { badge: string }[]) =>
      items.flatMap((plan, index) => (plan.badge === "" ? [] : [index]));

    expect(badged(ko.plans.items)).toEqual([1]);
    expect(badged(en.plans.items)).toEqual([1]);
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
