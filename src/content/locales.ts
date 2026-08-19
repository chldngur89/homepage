export type Locale = "ko" | "en";

export const LOCALES = ["ko", "en"] as const satisfies readonly Locale[];

export const DEFAULT_LOCALE: Locale = "ko";

/** 영문판이 존재하는 경로. 이 목록에 없으면 영문 화면에서도 한국어 경로로 이동한다. */
export const EN_ROUTES = [
  "/",
  "/solution",
  "/technology",
  "/pricing",
  "/about",
  "/contact",
  "/ir",
] as const satisfies readonly string[];
