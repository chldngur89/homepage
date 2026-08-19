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
};

export const dictionaries = {
  ko: {
    common: koCommon,
    mockups: koMockups,
    home: koHome,
    solution: koSolution,
    pricing: koPricing,
  },
  en: {
    common: enCommon,
    mockups: enMockups,
    home: enHome,
    solution: enSolution,
    pricing: enPricing,
  },
} satisfies Record<Locale, Dictionary>;
