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
import { technology as koTechnology } from "./ko/technology";
import { technology as enTechnology } from "./en/technology";
import { pricing as koPricing } from "./ko/pricing";
import { pricing as enPricing } from "./en/pricing";
import { about as koAbout } from "./ko/about";
import { about as enAbout } from "./en/about";
import { demo as koDemo } from "./ko/demo";
import { apps as koApps } from "./ko/apps";
import { contact as koContact } from "./ko/contact";
import { contact as enContact } from "./en/contact";
import { legal as koLegal } from "./ko/legal";
import { ir as koIr, type IrContent } from "./ko/ir";
import { ir as enIr } from "./en/ir";

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
  technology: DeepWiden<typeof koTechnology>;
  pricing: DeepWiden<typeof koPricing>;
  about: DeepWiden<typeof koAbout>;
  demo: DeepWiden<typeof koDemo>;
  apps: DeepWiden<typeof koApps>;
  contact: DeepWiden<typeof koContact>;
  legal: DeepWiden<typeof koLegal>;
  /**
   * 다른 멤버와 달리 `DeepWiden` 을 씌우지 않는다. `ko/ir.ts` 는 `as const`
   * 가 아니라 `export const ir: IrContent = {...}` 로 타입을 명시적으로
   * 선언한다 — 그 시점에 이미 모든 문자열이 리터럴이 아니라 `string` 으로
   * 넓혀져 있다. `DeepWiden` 이 여기서 하는 일은 카피를 넓히는 게 아니라
   * `IrStatusTone`(`"estimate"|"goal"|"planned"|"under_review"`) 과
   * `IrChartSlice["segment"]`(`"manual"|"strategic"`),
   * `IrFunnelLevel["stage"]`(`"TAM"|"SAM"|"SOM"`) 같은, 콘텐츠가 아니라
   * `StatusPill`·차트가 색상·스타일을 고르는 데 쓰는 판별 태그를 부수는
   * 것뿐이다. 이 셋이 넓혀지면 `IR.tsx` 의 `tone={signal.tone}` 같은 자리가
   * 전부 타입 에러가 난다. 그래서 `ir` 은 `IrContent` 를 그대로 쓴다 —
   * 다른 멤버와 다르게 보여도 오타가 아니다. 이 불일치를 "고치려고"
   * `DeepWiden<typeof koIr>` 로 되돌리면 위 판별 태그가 다시 부서진다.
   */
  ir: IrContent;
};

export const dictionaries = {
  ko: {
    common: koCommon,
    mockups: koMockups,
    home: koHome,
    solution: koSolution,
    technology: koTechnology,
    pricing: koPricing,
    about: koAbout,
    demo: koDemo,
    apps: koApps,
    contact: koContact,
    legal: koLegal,
    ir: koIr,
  },
  en: {
    common: enCommon,
    mockups: enMockups,
    home: enHome,
    solution: enSolution,
    technology: enTechnology,
    pricing: enPricing,
    about: enAbout,
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
    /**
     * `demo` 와 같은 이유로 한국어 사전이다. 오타가 아니다.
     *
     * `/apps` 도 `EN_ROUTES` 에 없어 `/en/apps` 라우트가 만들어지지 않고
     * 프리렌더도 한국어 한 벌만 낸다. 그래서 이 값은 실제 화면에 뜨지
     * 않지만, `Dictionary` 가 두 로케일에 같은 키를 요구하므로 자리를
     * 채워야 한다 — 빈 객체나 캐스팅 대신 한국어 사전을 그대로 넣어 타입
     * 구멍을 만들지 않는다.
     *
     * `/apps` 는 앱 목록 자체가 한국어 제품이라 영문판 계획이 없다. 만들게
     * 되면 할 일은 `demo` 와 같다: `en/apps.ts` 를 추가하고, `EN_ROUTES` 에
     * `/apps` 를 넣고, 이 줄을 `enApps` 로 바꾼다.
     */
    apps: koApps,
    contact: enContact,
    /**
     * `demo`·`apps` 와 같은 이유로 한국어 사전이다. 오타가 아니다.
     *
     * `/privacy` 와 `/terms` 도 `EN_ROUTES` 에 없어 영문 경로가 아예
     * 만들어지지 않는다(`Layout.tsx` 의 `FOOTER_ONLY_PATHS` 가 이 두 경로를
     * nav 에는 없지만 영문판도 없는 경로로 명시한다). `Dictionary` 가 두
     * 로케일에 같은 키를 요구하므로 자리는 채우되, 빈 객체나 캐스팅 대신
     * 한국어 사전을 그대로 넣어 타입 구멍을 만들지 않는다.
     *
     * 법무 문서는 특히 번역판을 두지 않는 것이 설계 결정이다 — 한국어본이
     * 정본이며 번역 과정에서 법적 의미가 흔들리는 것을 피하기 위해서다
     * (설계 문서 2절 비목표). 영문판을 만들 계획은 없다.
     */
    legal: koLegal,
    ir: enIr,
  },
} satisfies Record<Locale, Dictionary>;
