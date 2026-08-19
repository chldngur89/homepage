import type { Locale } from "./locales";
import type { DeepWiden } from "./widen";
import { common as koCommon } from "./ko/common";
import { common as enCommon } from "./en/common";
import { mockups as koMockups } from "./ko/mockups";
import { mockups as enMockups } from "./en/mockups";
import { home as koHome } from "./ko/home";
import { home as enHome } from "./en/home";
import { solution as koSolution } from "./ko/solution";
import { solution as enSolution } from "./en/solution";
import { pricing as koPricing } from "./ko/pricing";
import { pricing as enPricing } from "./en/pricing";
import { demo as koDemo } from "./ko/demo";
import { contact as koContact } from "./ko/contact";
import { contact as enContact } from "./en/contact";

/**
 * 한국어 사전이 구조의 원본이고, 리프의 리터럴만 넓힌 것이 사전 타입이다.
 *
 * `DeepWiden` 을 여기서 한 번 더 씌우는 이유는 두 가지다.
 *
 * 1. 아래 `satisfies` 가 실제로 영어 사전의 모양을 검사하게 만든다. 예전에는
 *    `as unknown as Record<Locale, Dictionary>` 로 잘라내고 있어서, 이 파일은
 *    영어 사전에 대해 아무것도 확인하지 않았다 — 보증 전체가 "en/*.ts 를 쓰는
 *    사람이 `: DeepWiden<XCopy>` 주석을 잊지 않는다" 는 습관에 얹혀 있었다.
 *    주석을 빠뜨린 영어 사전은 모양이 틀려도 그대로 통과했다.
 * 2. 소비자에게 한국어 리터럴 타입이 새지 않게 한다. `Dictionary` 가
 *    `typeof koCommon` 이던 시절에는 `copy.common.langLabel` 이 `/en` 화면에서도
 *    `"EN"` 타입이었다(실제 값은 `"KO"`).
 */
export type Dictionary = {
  common: DeepWiden<typeof koCommon>;
  mockups: DeepWiden<typeof koMockups>;
  home: DeepWiden<typeof koHome>;
  solution: DeepWiden<typeof koSolution>;
  pricing: DeepWiden<typeof koPricing>;
  demo: DeepWiden<typeof koDemo>;
  contact: DeepWiden<typeof koContact>;
};

export const dictionaries = {
  ko: {
    common: koCommon,
    mockups: koMockups,
    home: koHome,
    solution: koSolution,
    pricing: koPricing,
    demo: koDemo,
    contact: koContact,
  },
  en: {
    common: enCommon,
    mockups: enMockups,
    home: enHome,
    solution: enSolution,
    pricing: enPricing,
    /**
     * 의도적으로 한국어 사전이다. 오타가 아니다.
     *
     * `/demo` 는 한국어 전용 페이지다 — `src/content/locales.ts` 의
     * `EN_ROUTES` 에 없으므로 `/en/demo` 라우트 자체가 만들어지지 않고
     * (`route-config.tsx` 가 걸러낸다), 프리렌더도 한국어 한 벌만 낸다.
     * 즉 이 값은 실제 화면에서 쓰이지 않는다. 그래도 `Dictionary` 는 두
     * 로케일에 같은 키를 요구하므로 자리를 채워야 하고, 빈 객체나 캐스팅
     * 대신 한국어 사전을 그대로 넣어 타입 구멍을 만들지 않는다.
     *
     * 영문 화면에서 `/demo` 로 가는 링크는 한국어 페이지로 떨어지며
     * (`LocaleLink` 가 `hreflang="ko"` 를 붙인다) 그것이 의도된 동작이다.
     * `/demo` 의 영문판을 만들 때 할 일: `en/demo.ts` 를 추가하고,
     * `EN_ROUTES` 에 `/demo` 를 넣고, 이 줄을 `enDemo` 로 바꾼다.
     */
    demo: koDemo,
    contact: enContact,
  },
} satisfies Record<Locale, Dictionary>;
