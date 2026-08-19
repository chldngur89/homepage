import type { PricingCopy } from "../ko/pricing";
import type { DeepWiden } from "../widen";

/**
 * 한국어 사전이 타입의 원본이다. 키가 빠지거나 배열 원소 개수가 달라지면
 * 이 파일이 컴파일되지 않는다.
 *
 * 직역이 아니라 영어로 쓴 글이다 — 홈·솔루션 영문 사전과 같은 톤을 따른다.
 *
 * **금액과 요율은 번역하지 않는다.** `₩` 표기와 숫자를 그대로 둔다. 원화를
 * 달러로 환산하는 것은 번역이 아니라 없던 판매 조건을 만드는 일이다.
 * 요금제 이름과 산문만 옮긴다.
 */
export const pricing: DeepWiden<PricingCopy> = {
  hero: {
    eyebrow: "PRICING",
    titleLine1: "Pricing that grows",
    titleLine2: "with WooriTeam",
    body: "Start light, so a team of one to ten can put its first teammate to work",
  },

  plans: {
    label: "PLANS",
    items: [
      {
        badge: "",
        name: "Free",
        tagline: "One trial run",
        price: "₩0",
        period: "One free trial",
        features: [
          "One run of the growth loop",
          "A taste of the weekly proposal",
          "Direction set by your approval",
          "Execution and the repeat round, first-hand",
          "Email support",
        ],
        cta: "Grow with WooriTeam",
      },
      {
        badge: "Most popular",
        name: "Pro",
        tagline: "For early founding teams",
        price: "₩99,000",
        period: "Per month / unlimited use",
        features: [
          "The weekly growth loop",
          "Propose · Approve · Execute",
          "Carried into the next round",
          "Copy and content support",
          "Channel publishing (in progress)",
          "Priority email support",
        ],
        cta: "Grow with WooriTeam",
      },
      {
        badge: "",
        name: "Super Team",
        tagline: "For teams and brands",
        price: "₩199,000",
        period: "Per month / unlimited seats",
        features: [
          "Everything in Pro",
          "Collaboration across the team",
          "Your brand tone guide, applied",
          "Consulting on added AI roles",
          "Priority onboarding",
          "A dedicated support channel",
        ],
        cta: "Contact us",
      },
    ],
  },

  perUse: {
    label: "PAY PER USE",
    title: "Pay per use",
    body: "If a monthly plan is too much, pay only for what you use",
    packages: [
      {
        name: "Basic package",
        price: "₩10,000",
        items: ["Proposal + approval", "Execution flow included"],
      },
      {
        name: "Premium package",
        price: "₩15,000",
        items: ["Basic package + execution support", "One repeat-growth cycle"],
      },
    ],
    cta: "Start a per-use purchase",
  },

  revenueShare: {
    label: "REVENUE SHARE",
    title: "A revenue share model built on your success",
    body: "Your growth is our growth — a win-win partnership",
    planTitle: "Revenue Share Plan",
    planBodyBefore: "We share just ",
    planBodyRate: "0.5%",
    planBodyAfter: " of the sales revenue generated through WooriTeam",
    items: [
      "No upfront cost",
      "No revenue, no fee",
      "AI strategy reports and a transparent sales dashboard",
    ],
    example: {
      title: "Worked example",
      rows: [
        { label: "Monthly sales", value: "₩10,000,000" },
        { label: "Fee rate", value: "0.5%" },
        { label: "Fee", value: "₩50,000" },
      ],
    },
    cta: "Ask about revenue share",
  },

  faq: {
    label: "Frequently asked questions",
    items: [
      {
        q: "Will I be charged automatically after the free trial?",
        a: "No. The free trial needs no credit card, and nothing is charged automatically. You only enter payment details when you decide to move to a paid plan.",
      },
      {
        q: "Can I change plans mid-month?",
        a: "Yes, you can upgrade or downgrade at any time. An upgrade is billed pro rata for the difference; on a downgrade, the remaining balance is applied as credit against your next payment.",
      },
      {
        q: "What is the refund policy?",
        a: "If the service isn't right for you, a full refund is available within 14 days of your first payment. Credits already spent under per-use billing are excluded.",
      },
      {
        q: "Which payment methods are supported?",
        a: "Credit cards (Visa, MasterCard, AMEX), debit cards, bank transfer, KakaoPay and Naver Pay. The Super Team plan can also be issued a tax invoice.",
      },
    ],
  },

  cta: {
    title: "Still thinking it over?",
    body: "Try it free first. No card required",
    secondary: "Talk to sales",
  },
};
