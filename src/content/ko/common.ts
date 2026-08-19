export const common = {
  brand: {
    /**
     * 로고 락업의 주 표기. 필드 이름이 언어(nameKo/nameEn)가 아니라 역할인
     * 이유는, 로케일마다 "한국어 이름 + 라틴 워드마크" 라는 구성이 그대로
     * 성립하지 않기 때문이다. 영문판에는 주 표기 하나뿐이라 markLatin 이
     * 빈 문자열이고, 그때 Layout 은 두 번째 조각을 아예 그리지 않는다.
     * 언어로 이름 붙였을 때는 영문 사전이 nameKo 에도 "WooriTeam" 을 넣을
     * 수밖에 없었고, 그 결과 헤더·푸터가 "WooriTeam WOORITEAM" 을 찍었다.
     */
    mark: "우리팀",
    /** 주 표기 옆에 작게 붙는 라틴 워드마크. 없으면 빈 문자열. */
    markLatin: "WOORITEAM",
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
