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
 * 2026-08-26 판매 조건 변경(저장소 주인 결정): 프로 ₩99,000 → ₩29,900(월/주 1회
 * 자동화), 슈퍼 팀 ₩199,000 → 슈퍼 ₩299,900(월/매일 자동화), 건별 기본 패키지
 * ₩10,000 → ₩19,900. 프리미엄 패키지는 금액을 떼고 "연락 요청" 이 됐으므로
 * 여기서 ₩15,000 이 사라진다 — 목록이 7개에서 6개로 준 것은 그 때문이다.
 * 남은 ₩10,000,000 과 ₩50,000 은 수익 쉐어 계산 예시의 값이라 그대로다.
 */
const AMOUNTS = ["₩0", "₩10,000,000", "₩19,900", "₩29,900", "₩299,900", "₩50,000"];

/**
 * 요금제의 이름 ↔ 금액 ↔ 기능 목록의 **짝**. 집합만 비교하면 두 요금제의
 * 금액이 서로 바뀌어도(₩99,000 ↔ ₩199,000) 통과한다 — 두 플랜을 한꺼번에
 * 잘못 매긴 페이지가 초록으로 나오는 것이 이 짝 검사를 두는 이유다.
 */
const KO_PLANS = [
  {
    name: "무료",
    price: "₩0",
    features: [
      "같이 성장하기 1회 체험",
      "주간 과제 제안 맛보기",
      "승인으로 방향 결정",
      "실행·반복 성장 체험",
      "이메일 지원",
    ],
  },
  {
    name: "프로",
    price: "₩29,900",
    features: [
      "같이 성장하기 주간 루프",
      "제안 · 승인 · 실행",
      "반복 성장으로 이어가기",
      "카피·콘텐츠 지원",
      "채널 게시 연결 (준비 중)",
      "우선 이메일 지원",
    ],
  },
  {
    name: "슈퍼",
    price: "₩299,900",
    features: [
      "프로 플랜의 모든 기능",
      "한 달 내내 매일 자동 실행",
      "브랜드 톤 가이드 반영",
      "역할 AI 확장 상담",
      "우선 온보딩 지원",
      "전담 상담 채널",
    ],
  },
];

/** 영문판은 이름만 번역하고 금액은 원본 그대로다. 짝은 한국어와 같아야 한다. */
const EN_PLANS = [
  { name: "Free", price: "₩0" },
  { name: "Pro", price: "₩29,900" },
  { name: "Super", price: "₩299,900" },
];

const KO_PACKAGES = [
  { name: "기본 패키지", price: "₩19,900" },
  { name: "프리미엄 패키지", price: "연락 요청" },
];

const EN_PACKAGES = [
  { name: "Basic package", price: "₩19,900" },
  { name: "Premium package", price: "Talk to us" },
];

const KO_EXAMPLE = [
  { label: "월 판매액", value: "₩10,000,000" },
  { label: "수수료율", value: "0.5%" },
  { label: "수수료", value: "₩50,000" },
];

const EN_EXAMPLE = [
  { label: "Monthly sales", value: "₩10,000,000" },
  { label: "Fee rate", value: "0.5%" },
  { label: "Fee", value: "₩50,000" },
];

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

  it("건별 과금 패키지의 이름과 금액이 짝을 이룬 채 원본과 같다", () => {
    expect(ko.perUse.packages.map((pkg) => ({ name: pkg.name, price: pkg.price }))).toEqual(
      KO_PACKAGES,
    );
    expect(en.perUse.packages.map((pkg) => ({ name: pkg.name, price: pkg.price }))).toEqual(
      EN_PACKAGES,
    );
  });

  it("수익 쉐어 계산 예시의 라벨과 값이 짝을 이룬 채 원본과 같다", () => {
    expect(ko.revenueShare.example.rows.map((row) => ({ ...row }))).toEqual(KO_EXAMPLE);
    expect(en.revenueShare.example.rows.map((row) => ({ ...row }))).toEqual(EN_EXAMPLE);
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
