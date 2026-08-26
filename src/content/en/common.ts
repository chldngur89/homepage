import type { CommonCopy } from "../ko/common";
import type { DeepWiden } from "../widen";

/** 한국어 사전이 타입의 원본이다. 항목이 빠지면 이 파일이 컴파일되지 않는다. */
export const common: DeepWiden<CommonCopy> = {
  brand: {
    mark: "WooriTeam",
    // 영문 락업은 주 표기 하나뿐이다. 한국어 락업의 "우리팀 WOORITEAM" 을
    // 그대로 흉내 내면 "WooriTeam WOORITEAM" 이 되어 이름을 두 번 찍는다.
    // 빈 문자열이면 Layout 이 두 번째 조각을 그리지 않는다.
    markLatin: "",
    tagline: "A founder's first team",
  },
  cta: {
    primary: "Grow with WooriTeam",
    secondary: "See how it works",
    demo: "See the demo",
  },
  nav: {
    solution: "Solution",
    technology: "Technology",
    pricing: "Pricing",
    demo: "Demo",
    apps: "Apps",
    about: "About",
    ir: "IR",
    contact: "Contact",
  },
  a11y: {
    home: "WooriTeam home",
    mainNav: "Main navigation",
    mobileNav: "Mobile navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    switchLang: "Switch language / 언어 전환",
  },
  footer: {
    groups: {
      product: "PRODUCT",
      company: "COMPANY",
      legal: "LEGAL",
    },
    links: {
      privacy: "Privacy",
      terms: "Terms",
      about: "About",
      contact: "Contact",
    },
    copyright: "© 2026 WooriTeam. All rights reserved.",
  },
  langLabel: "KO",
  notFound: {
    title: "Page not found",
    description: "The address may be incorrect, or the page may have moved or been removed.",
    home: "Go home",
    back: "Go back",
  },
};
