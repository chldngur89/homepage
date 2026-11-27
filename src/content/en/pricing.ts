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
    titleLine1: "Start small,",
    titleLine2: "hand over as much as you need",
    body: "Try it lightly, hand over daily work, bring in experts when needed. An AI operations team you subscribe to at your own pace.",
  },
  plans: {
    label: "Plans",
    items: [
      {
        badge: "",
        name: "Starter",
        tagline: "Weekly automation",
        price: "₩29,000",
        period: "per month / weekly promotion support",
        features: [
          "Owner dashboard and alerts",
          "Weekly promotion task prep",
          "Content from store and product info",
          "Runs after owner approval",
          "Task history",
        ],
        cta: "Start with WooriTeam",
      },
      {
        badge: "RECOMMENDED",
        name: "Core",
        tagline: "Daily operations automation",
        price: "₩299,000",
        period: "per month / daily marketing and sales prep",
        features: [
          "Everything in Starter",
          "Daily marketing and sales task prep",
          "Approval and follow-up management",
          "Task history improves the next proposal",
          "Priority onboarding",
        ],
        cta: "Start with WooriTeam",
      },
      {
        badge: "",
        name: "Expansion",
        tagline: "Expert matching",
        price: "By quote",
        period: "Planned · separate contract",
        features: [
          "Everything in Core",
          "Matching with marketing experts for your trade",
          "Operations designed around your store",
          "Separate quote and contract",
        ],
        cta: "Contact us",
      },
    ],
  },
  faq: {
    label: "FAQ",
    items: [
      {
        q: "What can I hand over today?",
        a: "We are building promotion planning and content prep from your store and product info, owner approval, and task history. Automatic channel posting, local analysis, ad spend comparison and a unified results dashboard will follow in stages.",
      },
      {
        q: "Does anything get posted without my approval?",
        a: "No. Work WooriTeam prepares runs only after you review and approve it. You can also edit or hold it, and that history feeds the next proposal.",
      },
      {
        q: "What kind of business is it for?",
        a: "It fits owners who have products to sell and want to reach new customers. We are validating first with flower, furniture and restaurant owners in Goyang.",
      },
      {
        q: "How do payment and refunds work?",
        a: "We'll publish payment methods and refund terms alongside our Terms of Service when paid plans launch. Until then, contact us and we'll advise based on your store.",
      },
    ],
  },
  cta: {
    title: "Still deciding?",
    body: "Tell us about your store and we'll work out which tasks to hand over first.",
    secondary: "Request a consultation",
  },
};
