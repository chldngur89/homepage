import { dictionaries } from "../src/content";
import { stripLocale } from "../src/app/i18n/localePath";
import type { Locale } from "../src/content/locales";
import { SITE_URL } from "./site";

export type FaqItem = { q: string; a: string };

/** `FAQPage` 노드의 모양. 테스트가 `mainEntity` 를 타입 안전하게 순회하는 데 쓴다. */
export type FaqPageNode = {
  "@type": "FAQPage";
  "@id": string;
  mainEntity: {
    "@type": "Question";
    name: string;
    acceptedAnswer: {
      "@type": "Answer";
      text: string;
    };
  }[];
};

/**
 * 화면에 문답이 실제로 렌더되는 페이지만 돌려준다.
 *
 * FAQ 텍스트는 두 사전에 있다 — `pricing.faq.items`(`Pricing.tsx` 가
 * `dl/dt/dd` 로 `q`·`a` 를 그대로 렌더한다)와 `contact.faq.items`. 그런데
 * `contact.faq.items` 는 `q`/`a` 쌍이 아니라 질문 **문자열 배열**일 뿐이다
 * (`ContactCopy["faq"]["items"]: readonly string[]`). `Contact.tsx` 는 각
 * 질문을 `FAQ_LINKS` 를 따라 다른 페이지(주로 /pricing)로 보내는 링크로만
 * 렌더할 뿐, 그 답을 이 페이지에 싣지 않는다.
 *
 * FAQPage 의 `acceptedAnswer` 를 채우려면 화면에 없는 텍스트를 지어내야
 * 하므로, 여기서는 `/contact` 를 다루지 않는다 — 문답을 다시 쓰지 않는다는
 * 규칙과 별개로, 애초에 실을 답 자체가 그 페이지엔 없다.
 */
export function faqItems(pathname: string, locale: Locale): FaqItem[] | undefined {
  const { path } = stripLocale(pathname);
  if (path !== "/pricing") return undefined;

  return dictionaries[locale].pricing.faq.items.map((item) => ({ q: item.q, a: item.a }));
}

/**
 * `FAQPage` JSON-LD 노드. `faqItems` 가 undefined 를 돌려주는 페이지(예:
 * /contact)에서는 이 함수도 undefined 를 돌려준다 — 화면에 없는 답을
 * 구조화 데이터에만 지어 넣지 않기 위해서다.
 */
export function faqNode(pathname: string, locale: Locale): FaqPageNode | undefined {
  const items = faqItems(pathname, locale);
  if (!items || items.length === 0) return undefined;

  return {
    "@type": "FAQPage",
    "@id": `${SITE_URL}${pathname}#faq`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}
