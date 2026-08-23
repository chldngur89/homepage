import { useCopy } from "@/app/i18n/useCopy";
import { LegalDocument } from "@/app/components/page";

/** `LegalDocument` 에 개인정보처리방침 사전을 골라 넘긴다. 카피는 사전에만 있다. */
export default function Privacy() {
  const copy = useCopy();
  const t = copy.legal;

  return <LegalDocument doc={t.privacy} homeLink={t.homeLink} />;
}
