import { useLocale } from "@/app/i18n/LocaleContext";
import { foreignHreflang } from "@/app/i18n/localePath";
import { APP_HAS_ENGLISH, APP_URLS } from "@/app/config/apps";

/**
 * 사이트 공통 주 CTA("우리팀과 같이 성장하기")가 향하는 곳과 그 표기.
 *
 * 헤더와 아홉 페이지의 같은 라벨이 전부 여기로 온다 — 같은 문구가 페이지마다
 * 다른 곳으로 가면 안 되고, 사이트에서 구매 의도가 가장 높은 요소가 제품에
 * 닿지 않으면 더 안 된다. 외부 링크라 LocaleLink 가 아니라
 * `<a target="_blank">` 이며, 제품 UI 가 한국어뿐이라 영문 화면에서는
 * `hreflang="ko"` 를 달아 준다.
 *
 * 훅인 이유는 `foreignHreflang` 이 현재 로케일을 필요로 하기 때문이다.
 * 따라서 **컴포넌트 본문 상단에서 부른다 — JSX 안에서 부르지 않는다.**
 *
 * 계획 2에서 이 객체가 네 페이지에 그대로 복사돼 있었고, 각 사본마다 같은
 * 주석이 붙어 있었다. `APP_HAS_ENGLISH` 가 true 로 바뀌는 날 고쳐야 할
 * 자리가 하나여야 한다.
 */
export function useProductCta() {
  const locale = useLocale();

  return {
    href: APP_URLS.cmo,
    target: "_blank",
    rel: "noopener noreferrer",
    hrefLang: foreignHreflang(APP_HAS_ENGLISH, locale),
  } as const;
}
