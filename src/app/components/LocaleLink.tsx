import { Link, type LinkProps } from "react-router";
import type { ReactNode } from "react";
import { localePath, pathHreflang } from "@/app/i18n/localePath";
import { useLocale } from "@/app/i18n/LocaleContext";
import type { Locale } from "@/content/locales";

/**
 * 내부 링크 하나가 필요로 하는 두 가지 — 실제 경로와 교차 로케일 표기 — 를
 * 한 번에 계산한다. 순수 함수로 분리해 둔 이유는 이것이 실제 로직이고,
 * 컴포넌트는 결과를 <Link> 에 넘기기만 하기 때문이다.
 *
 * 계획 1에서 이 계산을 링크마다 손으로 하다가 세 군데를 빠뜨렸다.
 * 페이지를 전환할 때는 반드시 LocaleLink 를 쓴다.
 */
export function resolveLocaleLink(to: string, locale: Locale) {
  return { to: localePath(to, locale), hrefLang: pathHreflang(to, locale) };
}

/**
 * `to`(한국어 기준 경로)와 `hrefLang` 은 컴포넌트가 계산하므로 호출부가
 * 지정할 수 없다 — `LinkProps` 에서 이 둘을 제외해 타입 단계에서 막는다
 * (호출부가 `hrefLang` 을 넘기면 컴파일 에러).
 *
 * 나머지는 React Router `Link` 의 prop 을 그대로 받는다 — `aria-label`,
 * `id`, `title`, `onClick` 등. 리뷰에서 지적된 문제: `Layout.tsx` 의 로고
 * 링크처럼 `aria-label` 이 필요한 내부 링크가 이미 이 저장소에 있는데
 * `LocaleLink` 가 `to`/`className`/`children` 만 받으면, 그런 링크를 쓸
 * 유일한 방법이 `localePath`/`pathHreflang` 을 손으로 다시 호출하는
 * 것뿐이다 — 그게 계획 1에서 세 링크의 표기를 빠뜨렸던 바로 그 패턴이다.
 */
type LocaleLinkProps = Omit<LinkProps, "to" | "hrefLang" | "children"> & {
  /** 한국어 기준 경로. 예: "/pricing", "/demo" */
  to: string;
  children: ReactNode;
};

export function LocaleLink({ to, children, ...rest }: LocaleLinkProps) {
  const locale = useLocale();
  const resolved = resolveLocaleLink(to, locale);

  return (
    <Link {...rest} to={resolved.to} hrefLang={resolved.hrefLang}>
      {children}
    </Link>
  );
}
