import type { Locale } from "./locales";
import { common as koCommon } from "./ko/common";
import { common as enCommon } from "./en/common";
import { mockups as koMockups } from "./ko/mockups";
import { mockups as enMockups } from "./en/mockups";

export type Dictionary = {
  common: typeof koCommon;
  mockups: typeof koMockups;
};

export const dictionaries = {
  ko: { common: koCommon, mockups: koMockups },
  en: { common: enCommon, mockups: enMockups },
} as unknown as Record<Locale, Dictionary>;
