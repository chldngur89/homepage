import { LocaleLink } from "@/app/components/LocaleLink";
import { SHELL } from "./shell";
import { useProductCta } from "./useProductCta";

/**
 * 페이지 마지막의 반전 배경 CTA. 주 버튼은 제품 앱으로, 보조 버튼은 데모로
 * 간다 — 라벨이 다른 두 버튼이 같은 화면으로 떨어지면 안 된다.
 *
 * 요금(보조 버튼이 /contact, 본문 문단 있음), 데모(버튼 셋), 홈(제목이
 * `<Lines>` 이고 max-w 가 다름)은 이 형태와 달라 그대로 두었고, 문의에는
 * 마감 CTA 자체가 없다.
 */
export function ClosingCta({
  title,
  primaryLabel,
  secondaryLabel,
}: {
  title: string;
  primaryLabel: string;
  secondaryLabel: string;
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
            to="/demo"
            className="flex h-[52px] items-center rounded-[10px] border border-invert-line px-[22px] text-[16px] font-semibold text-white"
          >
            {secondaryLabel}
          </LocaleLink>
        </div>
      </div>
    </section>
  );
}
