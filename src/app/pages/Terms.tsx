import { useCopy } from "@/app/i18n/useCopy";
import { LegalDocument } from "@/app/components/page";

/** `LegalDocument` 에 이용약관 사전을 골라 넘긴다. 카피는 사전에만 있다. */
export default function Terms() {
  const copy = useCopy();
  const t = copy.legal;

  return <LegalDocument doc={t.terms} homeLink={t.homeLink} />;
}
