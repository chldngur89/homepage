import { dictionaries, type Dictionary } from "@/content";
import { useLocale } from "./LocaleContext";

export function useCopy(): Dictionary {
  return dictionaries[useLocale()];
}
