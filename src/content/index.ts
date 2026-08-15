import type { Locale } from "./locales";
import { common as koCommon } from "./ko/common";
import { common as enCommon } from "./en/common";

export type Dictionary = {
  common: typeof koCommon;
};

export const dictionaries = {
  ko: { common: koCommon },
  en: { common: enCommon },
} as unknown as Record<Locale, Dictionary>;
