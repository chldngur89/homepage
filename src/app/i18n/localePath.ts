import { DEFAULT_LOCALE, EN_ROUTES, type Locale } from "@/content/locales";

const EN_PREFIX = "/en";

/**
 * 경로에서 `#앵커`·`?쿼리` 를 떼어낸다. `EN_ROUTES` 는 순수한 경로만 담고
 * 있으므로, 조회는 앞쪽 조각으로만 해야 한다.
 *
 * 이 분리가 없으면 `/ir#ir-top` 같은 딥링크가 목록에 없는 문자열이 되어
 * `hasEnglish` 가 false 가 되고, 영문 화면에서 (1) `/en` 접두사를 잃어
 * 한국어 페이지로 떨어지며 (2) 영문판이 **있는** 대상에 `hreflang="ko"` 가
 * 붙는다. 계획 3이 앵커로 이동하는 `IR.tsx` 를 전환하고 `/technology`·
 * `/about` 영문판을 붙이므로 교차 페이지 딥링크가 다시 생긴다.
 */
function splitSuffix(path: string): [base: string, suffix: string] {
  const at = path.search(/[#?]/);
  return at === -1 ? [path, ""] : [path.slice(0, at), path.slice(at)];
}

export function hasEnglish(path: string) {
  const [base] = splitSuffix(path);
  return (EN_ROUTES as readonly string[]).includes(base);
}

/** 한국어 기준 경로를 해당 로케일의 실제 경로로 바꾼다. 앵커·쿼리는 보존된다. */
export function localePath(path: string, locale: Locale) {
  if (locale === DEFAULT_LOCALE || !hasEnglish(path)) {
    return path;
  }

  const [base, suffix] = splitSuffix(path);
  return `${EN_PREFIX}${base === "/" ? "" : base}${suffix}`;
}

/**
 * 링크 대상이 한국어로만 제공될 때, 영문 화면에서 그 링크에 붙여야 할
 * `hreflang` 값("ko")을 돌려준다. 한국어 화면이거나 대상에 영문판이 있으면
 * undefined — 속성을 아예 안 붙인다.
 *
 * `lang` 이 아니라 `hreflang` 인 이유: `lang` 은 그 요소 **자신의 내용**이
 * 무슨 언어인지를 선언한다. 그런데 `/en` 에서 이 링크들의 텍스트는 영어다
 * ("Demo", "Privacy"). `lang="ko"` 를 붙이면 스크린 리더가 영어 단어를
 * 한국어 음성으로 읽는다. "링크가 가리키는 문서가 한국어" 를 뜻하는 속성은
 * `hreflang` 이다.
 */
export function foreignHreflang(targetHasEnglish: boolean, locale: Locale): "ko" | undefined {
  return locale === "en" && !targetHasEnglish ? "ko" : undefined;
}

/**
 * 사이트 내부 경로용 `foreignHreflang`. 경로 하나만 넘기면 EN_ROUTES 를 보고
 * 알아서 판단한다.
 *
 * nav·footer·CTA 링크가 전부 이 함수 하나로 표시를 결정하게 만든 이유는,
 * 링크마다 손으로 조건을 적다 생기는 누락(리뷰 Finding: 푸터 PRODUCT 그룹의
 * /demo, /apps 에 표시가 빠졌던 문제)을 구조적으로 막기 위해서다. 새
 * Korean-only 경로가 생겨도 EN_ROUTES 만 갱신하면 이 함수를 쓰는 모든 링크가
 * 자동으로 따라온다.
 */
export function pathHreflang(path: string, locale: Locale): "ko" | undefined {
  return foreignHreflang(hasEnglish(path), locale);
}

/** 실제 경로에서 로케일과 한국어 기준 경로를 분리한다. */
export function stripLocale(pathname: string): { locale: Locale; path: string } {
  if (pathname === EN_PREFIX || pathname === `${EN_PREFIX}/`) {
    return { locale: "en", path: "/" };
  }

  if (pathname.startsWith(`${EN_PREFIX}/`)) {
    return { locale: "en", path: pathname.slice(EN_PREFIX.length) };
  }

  return { locale: DEFAULT_LOCALE, path: pathname };
}
