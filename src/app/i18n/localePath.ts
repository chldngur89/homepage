import { DEFAULT_LOCALE, EN_ROUTES, type Locale } from "@/content/locales";

const EN_PREFIX = "/en";

export function hasEnglish(path: string) {
  return (EN_ROUTES as readonly string[]).includes(path);
}

/** 한국어 기준 경로를 해당 로케일의 실제 경로로 바꾼다. */
export function localePath(path: string, locale: Locale) {
  if (locale === DEFAULT_LOCALE || !hasEnglish(path)) {
    return path;
  }

  return path === "/" ? EN_PREFIX : `${EN_PREFIX}${path}`;
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
