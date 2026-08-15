import type { CommonCopy } from "../ko/common";
import type { DeepWiden } from "../widen";

/** 한국어 사전이 타입의 원본이다. 항목이 빠지면 이 파일이 컴파일되지 않는다. */
export const common: DeepWiden<CommonCopy> = {
  brand: {
    nameKo: "WooriTeam",
    nameEn: "WOORITEAM",
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
};
