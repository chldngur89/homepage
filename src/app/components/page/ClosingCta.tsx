import { LocaleLink } from "@/app/components/LocaleLink";
import { SHELL } from "./shell";
import { useProductCta } from "./useProductCta";

/**
 * 페이지 마지막의 반전 배경 CTA. 주 버튼은 제품 앱으로 가고(모든 페이지가
 * 같다), 보조 버튼의 목적지는 **호출부가 라벨과 함께 짝으로 준다.**
 *
 * 목적지를 컴포넌트가 하드코딩하고 라벨만 받으면, 라벨과 목적지가 조용히
 * 어긋난다 — 실제로 기술 페이지를 전환할 때 그렇게 됐다. 전환 전 그 페이지의
 * 보조 버튼은 `/solution` → "솔루션 보기" 였는데, 라벨만 넘기는 구조라
 * 디자인만 바꾸는 작업이 링크 목적지까지 `/demo` 로 바꿔 버렸다. 이제 둘을
 * 한 자리에서 같이 적는다.
 *
 * 기본값이 `/demo` 인 이유는 이 컴포넌트가 그런 페이지에서 승격됐고 지금도
 * 솔루션 페이지가 그렇게 쓰기 때문이다 — 기본값을 지우면 그 호출부가
 * 목적지를 다시 손으로 적어야 한다. 다른 곳으로 보내려면 `secondaryTo` 를
 * 넘긴다. 값은 **한국어 기준 경로**이고, `/en` 접두사와 `hreflang` 은
 * `LocaleLink` 가 알아서 붙인다.
 *
 * 요금(보조 버튼이 /contact, 본문 문단 있음), 데모(버튼 셋), 홈(제목이
 * `<Lines>` 이고 max-w 가 다름)은 이 형태와 달라 그대로 두었고, 문의에는
 * 마감 CTA 자체가 없다.
 */
export function ClosingCta({
  title,
  primaryLabel,
  secondaryLabel,
  secondaryTo = "/demo",
}: {
  title: string;
  primaryLabel: string;
  secondaryLabel: string;
  /** 보조 버튼이 갈 한국어 기준 경로. 예: "/demo", "/solution". */
  secondaryTo?: string;
}) {
  // 훅은 컴포넌트 본문 상단에서 호출한다. JSX 안에서 부르지 않는다.
  const productCta = useProductCta();

  return (
    <section aria-labelledby="cta-h" className="border-b border-line bg-invert text-white">
      <div className={`${SHELL} py-[clamp(80px,9vw,132px)]`}>
        <h2
          id="cta-h"
          className="max-w-[20em] text-[clamp(30px,4.4vw,52px)] font-bold leading-[1.18] tracking-[-0.035em]"
        >
          {title}
        </h2>

        <div className="mt-[38px] flex flex-wrap gap-2.5">
          <a
            {...productCta}
            className="flex h-[52px] items-center rounded-[10px] bg-white px-6 text-[16px] font-semibold text-ink"
          >
            {primaryLabel}
          </a>
          <LocaleLink
            to={secondaryTo}
            className="flex h-[52px] items-center rounded-[10px] border border-invert-line px-[22px] text-[16px] font-semibold text-white"
          >
            {secondaryLabel}
          </LocaleLink>
        </div>
      </div>
    </section>
  );
}
