import type { Locale } from "./locales";
import { common as koCommon } from "./ko/common";
import { common as enCommon } from "./en/common";
import { mockups as koMockups } from "./ko/mockups";
import { mockups as enMockups } from "./en/mockups";
import { home as koHome } from "./ko/home";
import { home as enHome } from "./en/home";

export type Dictionary = {
  common: typeof koCommon;
  mockups: typeof koMockups;
  home: typeof koHome;
};

export const dictionaries = {
  ko: { common: koCommon, mockups: koMockups, home: koHome },
  en: { common: enCommon, mockups: enMockups, home: enHome },
} as unknown as Record<Locale, Dictionary>;
