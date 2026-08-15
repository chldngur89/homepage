export const common = {
  brand: {
    nameKo: "우리팀",
    nameEn: "WOORITEAM",
    tagline: "창업자의 첫 번째 팀",
  },
  cta: {
    primary: "우리팀과 같이 성장하기",
    secondary: "어떻게 일하는지 보기",
    demo: "데모 보기",
  },
  nav: {
    solution: "솔루션",
    technology: "기술",
    pricing: "요금",
    demo: "데모",
    apps: "Apps",
    about: "회사",
    ir: "IR",
    contact: "문의",
  },
  a11y: {
    home: "우리팀 홈",
    mainNav: "주요 메뉴",
    mobileNav: "모바일 메뉴",
    openMenu: "메뉴 열기",
    closeMenu: "메뉴 닫기",
    switchLang: "언어 전환 / Switch language",
  },
  footer: {
    groups: {
      product: "PRODUCT",
      company: "COMPANY",
      legal: "LEGAL",
    },
    links: {
      privacy: "개인정보처리방침",
      terms: "이용약관",
      about: "회사 소개",
      contact: "문의하기",
    },
    copyright: "© 2026 WooriTeam. All rights reserved.",
  },
  langLabel: "EN",
} as const;

export type CommonCopy = typeof common;
