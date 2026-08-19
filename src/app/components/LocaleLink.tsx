import { Link } from "react-router";
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

export function LocaleLink({
  to,
  className,
  children,
}: {
  /** 한국어 기준 경로. 예: "/pricing", "/demo" */
  to: string;
  className?: string;
  children: ReactNode;
}) {
  const locale = useLocale();
  const resolved = resolveLocaleLink(to, locale);

  return (
    <Link to={resolved.to} hrefLang={resolved.hrefLang} className={className}>
      {children}
    </Link>
  );
}
