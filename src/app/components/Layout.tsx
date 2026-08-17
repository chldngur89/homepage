import { Link, Outlet, useLocation } from "react-router";
import { useEffect, useState, type ReactNode } from "react";
import { useCopy } from "@/app/i18n/useCopy";
import { useLocale } from "@/app/i18n/LocaleContext";
import { hasEnglish, localePath, stripLocale } from "@/app/i18n/localePath";
import type { Locale } from "@/content/locales";

export const NAV_PATHS = [
  ["solution", "/solution"],
  ["technology", "/technology"],
  ["pricing", "/pricing"],
  ["demo", "/demo"],
  ["apps", "/apps"],
  ["about", "/about"],
  ["ir", "/ir"],
  ["contact", "/contact"],
] as const;

/** LEGAL 푸터 그룹처럼 nav 에는 없지만 영문판이 없는 경로. */
export const FOOTER_ONLY_PATHS = ["/privacy", "/terms"] as const;

/**
 * 언어 전환 버튼이 향할 경로를 계산한다. 현재 경로의 반대 로케일로
 * 이동하되, 영문판이 없는 경로(예: /demo)에서는 영문 홈으로 보낸다.
 * 순수 함수로 뽑아둔 이유는 로케일 트랩(hasEnglish/stripLocale 조합)을
 * 컴포넌트 렌더 없이 직접 테스트하기 위해서다.
 */
export function getLangSwitchTarget(pathname: string, locale: Locale): string {
  const other: Locale = locale === "ko" ? "en" : "ko";
  const { path: basePath } = stripLocale(pathname);
  return hasEnglish(basePath) ? localePath(basePath, other) : localePath("/", other);
}

/**
 * 링크가 향하는 한국어 기준 경로에 영문판이 없으면, 영문 화면에서 그
 * 링크에 붙여야 할 lang 값("ko")을 돌려준다. 한국어 화면이거나 영문판이
 * 있는 경로면 undefined — HTML lang 속성을 아예 안 붙인다.
 *
 * nav·footer·CTA 링크가 전부 이 함수 하나로 lang 을 결정하게 만든 이유는,
 * 링크마다 손으로 조건을 적다 생기는 누락(리뷰 Finding: 푸터 PRODUCT
 * 그룹의 /demo, /apps 에 lang 표시가 빠졌던 문제)을 구조적으로 막기
 * 위해서다. 새 Korean-only 경로가 생겨도 hasEnglish 만 갱신하면 이 함수를
 * 쓰는 모든 링크가 자동으로 따라온다.
 */
export function foreignLang(path: string, locale: Locale): "ko" | undefined {
  return locale === "en" && !hasEnglish(path) ? "ko" : undefined;
}

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const locale = useLocale();
  const copy = useCopy().common;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMenuOpen(false);
  }, [location.pathname]);

  const to = (path: string) => localePath(path, locale);
  const switchTo = getLangSwitchTarget(location.pathname, locale);

  const navItems = NAV_PATHS.map(([key, path]) => ({
    key,
    path,
    label: copy.nav[key],
    lang: foreignLang(path, locale),
  }));

  return (
    <div className="min-h-screen overflow-x-hidden bg-ground text-ink">
      <header className="sticky top-0 z-50 border-b border-line bg-ground/[.92] backdrop-blur-[8px] backdrop-saturate-[1.2]">
        <div className="mx-auto flex h-[70px] max-w-[1180px] items-center justify-between gap-6 px-[clamp(20px,4vw,40px)]">
          <Link to={to("/")} aria-label={copy.a11y.home} className="flex items-baseline gap-2">
            <span className="text-[19px] font-bold tracking-[-0.02em]">{copy.brand.nameKo}</span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-3">
              {copy.brand.nameEn}
            </span>
          </Link>

          <nav aria-label={copy.a11y.mainNav} className="hidden items-center gap-[26px] lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={to(item.path)}
                lang={item.lang}
                className="text-[14.5px] font-medium text-ink-2 transition-colors hover:text-brand"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <Link
              to={switchTo}
              aria-label={copy.a11y.switchLang}
              className="flex h-[34px] items-center rounded-lg border border-line px-2.5 text-[12px] font-semibold tracking-[0.04em] text-ink-2 transition-colors hover:text-brand"
            >
              {copy.langLabel}
            </Link>
            <Link
              to={to("/demo")}
              lang={foreignLang("/demo", locale)}
              className="hidden h-10 items-center whitespace-nowrap rounded-[10px] bg-invert px-4 text-[14px] font-semibold text-white lg:flex"
            >
              {copy.cta.primary}
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? copy.a11y.closeMenu : copy.a11y.openMenu}
              aria-expanded={menuOpen}
              className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-line lg:hidden"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                {menuOpen ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-line bg-surface lg:hidden">
            <nav aria-label={copy.a11y.mobileNav} className="mx-auto grid max-w-[1180px] gap-0.5 px-5 pb-5 pt-3">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  to={to(item.path)}
                  lang={item.lang}
                  className="border-b border-line-2 px-1 py-3.5 text-[16px] font-semibold"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to={to("/demo")}
                lang={foreignLang("/demo", locale)}
                className="mt-3.5 flex h-[50px] items-center justify-center rounded-[10px] bg-invert text-[15px] font-semibold text-white"
              >
                {copy.cta.primary}
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main id="main-content">
        <Outlet />
      </main>

      <footer className="border-t border-line bg-ground">
        <div className="mx-auto max-w-[1180px] px-[clamp(20px,4vw,40px)] pb-7 pt-[clamp(52px,6vw,80px)]">
          <div className="grid gap-[clamp(36px,5vw,56px)] md:grid-cols-[40fr_60fr]">
            <div>
              <p className="text-[22px] font-bold tracking-[-0.02em]">
                {copy.brand.nameKo}{" "}
                <span className="align-middle text-[12px] font-semibold tracking-[0.14em] text-ink-3">
                  {copy.brand.nameEn}
                </span>
              </p>
              <p className="mt-2.5 text-[16px] text-ink-2">{copy.brand.tagline}</p>
            </div>

            <div className="grid gap-7 sm:grid-cols-3">
              <FooterGroup title={copy.footer.groups.product}>
                <FooterLink path="/solution" locale={locale}>{copy.nav.solution}</FooterLink>
                <FooterLink path="/technology" locale={locale}>{copy.nav.technology}</FooterLink>
                <FooterLink path="/pricing" locale={locale}>{copy.nav.pricing}</FooterLink>
                <FooterLink path="/demo" locale={locale}>{copy.nav.demo}</FooterLink>
                <FooterLink path="/apps" locale={locale}>{copy.nav.apps}</FooterLink>
              </FooterGroup>
              <FooterGroup title={copy.footer.groups.company}>
                <FooterLink path="/about" locale={locale}>{copy.footer.links.about}</FooterLink>
                <FooterLink path="/ir" locale={locale}>{copy.nav.ir}</FooterLink>
                <FooterLink path="/contact" locale={locale}>{copy.footer.links.contact}</FooterLink>
              </FooterGroup>
              <FooterGroup title={copy.footer.groups.legal}>
                <FooterLink path="/privacy" locale={locale}>{copy.footer.links.privacy}</FooterLink>
                <FooterLink path="/terms" locale={locale}>{copy.footer.links.terms}</FooterLink>
              </FooterGroup>
            </div>
          </div>

          <p className="mt-[clamp(40px,5vw,64px)] border-t border-line pt-5.5 text-[13px] text-ink-3">
            {copy.footer.copyright}
          </p>
        </div>
      </footer>
    </div>
  );
}

function FooterGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <nav aria-label={title}>
      <p className="mb-3.5 text-[12px] font-semibold tracking-[0.1em] text-ink-3">{title}</p>
      <ul className="grid gap-2.5 text-[15px]">{children}</ul>
    </nav>
  );
}

/**
 * 한국어 기준 경로(path)와 locale 만 받아 실제 이동 경로(to)와 lang 표시를
 * 내부에서 계산한다. 호출부가 lang 을 직접 넘기지 않게 만든 이유는, 링크마다
 * 손으로 lang 조건을 적다 보면 하나쯤 빠뜨리기 쉽기 때문이다(리뷰 Finding:
 * 푸터 PRODUCT 그룹의 /demo, /apps 가 그렇게 빠졌었다). foreignLang 하나로
 * 통일하면 이 컴포넌트를 쓰는 한 그런 누락이 날 수 없다.
 */
function FooterLink({
  path,
  locale,
  children,
}: {
  path: string;
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <li>
      <Link
        to={localePath(path, locale)}
        lang={foreignLang(path, locale)}
        className="text-ink transition-colors hover:text-brand"
      >
        {children}
      </Link>
    </li>
  );
}
