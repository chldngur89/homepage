import { useCopy } from "@/app/i18n/useCopy";
import { LocaleLink } from "@/app/components/LocaleLink";
import { PageHero, SHELL, Section, SectionLabel, useProductCta } from "@/app/components/page";
import type { PricingCopy } from "@/content/ko/pricing";
import type { SameShape } from "@/content/widen";

/**
 * 요금제 카드 버튼의 목적지. 문구는 사전이, 목적지는 코드가 정한다 — 번역이
 * 링크를 옮길 수 없게 하려는 것이다.
 *
 * 앞의 둘(입문형·주력형)은 사이트 공통 주 CTA 와 같은 제품 앱, 마지막
 * "확장형" 은 별도 견적이라 문의로 간다.
 *
 * 타입을 `boolean[]` 이나 `as const` 가 아니라 사전 배열에서 **파생**시킨
 * 것이 핵심이다. `[false, false, true] as const` 는 요금제와 길이가 묶여
 * 있지 않아서, 사전에 네 번째 요금제가 들어오면 `PLAN_CTA_TO_CONTACT[3]` 이
 * `undefined` → falsy 가 되고 그 요금제의 CTA 가 문의가 아니라 제품 앱으로
 * 조용히 간다 — 빌드는 초록이다. `SameShape` 가 길이를 물려주므로 이제는
 * 그 상황이 컴파일 에러다 (문의 페이지의 `FAQ_LINKS` 와 같은 장치).
 */
const PLAN_CTA_TO_CONTACT: SameShape<PricingCopy["plans"]["items"], boolean> = [
  false,
  false,
  true,
];

const BUTTON = "flex h-12 items-center justify-center rounded-[10px] text-[15.5px] font-semibold";

export default function Pricing() {
  const copy = useCopy();
  const t = copy.pricing;
  const common = copy.common;
  const productCta = useProductCta();

  return (
    <div className="bg-ground">
      <PageHero
        eyebrow={t.hero.eyebrow}
        titleLine1={t.hero.titleLine1}
        titleLine2={t.hero.titleLine2}
        body={t.hero.body}
      />

      {/* 01 요금제 — 원래 이 섹션에는 제목이 없고 카드만 나열됐다. 홈 06·솔루션
          03 과 같이 라벨을 h2 로 승격시켜 섹션의 heading 으로 쓴다. */}
      <Section id="plans-h">
        <SectionLabel index="01" as="h2" id="plans-h">
          {t.plans.label}
        </SectionLabel>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {t.plans.items.map((plan, index) => {
            /* 강조는 색이 아니라 선 두께로 준다 — 이전 디자인의 시안 테두리와
               글로우, 1.05배 확대를 대신한다. 배지가 있는 요금제가 그 하나다. */
            const featured = plan.badge !== "";

            return (
              <div
                key={plan.name}
                className={`flex flex-col rounded-[14px] border border-line-2 bg-surface p-[clamp(24px,3vw,34px)] ${
                  featured ? "border-t-2 border-t-ink" : ""
                }`}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-[23px] font-semibold tracking-[-0.02em]">{plan.name}</h3>
                  {featured ? (
                    <span className="shrink-0 text-[11.5px] font-semibold tracking-[0.08em] text-brand">
                      {plan.badge}
                    </span>
                  ) : null}
                </div>
                <p className="mt-1.5 text-[14px] text-ink-3">{plan.tagline}</p>

                <p className="mt-7 text-[clamp(30px,3.4vw,38px)] font-bold leading-[1.1] tracking-[-0.035em]">
                  {plan.price}
                </p>
                <p className="mt-2 text-[14.5px] text-ink-2">{plan.period}</p>

                <ul className="mt-7 grid gap-3 border-t border-line pt-7">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex gap-2.5 text-[15.5px] leading-[1.7] text-ink-2"
                    >
                      <span aria-hidden="true" className={featured ? "text-brand" : "text-ink-3"}>
                        &mdash;
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-9">
                  {PLAN_CTA_TO_CONTACT[index] ? (
                    <LocaleLink
                      to="/contact"
                      className={`${BUTTON} border border-line px-5 text-ink`}
                    >
                      {plan.cta}
                    </LocaleLink>
                  ) : (
                    <a
                      {...productCta}
                      className={
                        featured
                          ? `${BUTTON} bg-invert px-5 text-white`
                          : `${BUTTON} border border-line px-5 text-ink`
                      }
                    >
                      {plan.cta}
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* 02 자주 묻는 질문 — 섹션에 따로 타이틀이 없으므로 라벨 자체가 제목이다.
          dl/dt/dd 는 계획 5에서 FAQPage 구조화 데이터를 붙일 때의 근거다. */}
      <Section id="faq-h" tone="panel">
        <SectionLabel index="02" as="h2" id="faq-h">
          {t.faq.label}
        </SectionLabel>

        <dl className="mt-10 border-t-2 border-ink">
          {t.faq.items.map((item) => (
            <div key={item.q} className="border-b border-line py-[30px]">
              <dt className="max-w-[30em] text-[19px] font-semibold leading-[1.5] tracking-[-0.02em]">
                {item.q}
              </dt>
              <dd className="mt-3 max-w-[46em] text-[16px] leading-[1.75] text-ink-2">{item.a}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* 마감 CTA — 홈·솔루션과 같은 반전 블록 */}
      <section aria-labelledby="cta-h" className="border-b border-line bg-invert text-white">
        <div className={`${SHELL} py-[clamp(80px,9vw,132px)]`}>
          <h2
            id="cta-h"
            className="max-w-[20em] text-[clamp(30px,4.4vw,52px)] font-bold leading-[1.18] tracking-[-0.035em]"
          >
            {t.cta.title}
          </h2>
          <p className="mt-6 max-w-[28em] text-[18px] leading-[1.65] text-invert-ink-2">
            {t.cta.body}
          </p>

          <div className="mt-[38px] flex flex-wrap gap-2.5">
            <a
              {...productCta}
              className="flex h-[52px] items-center rounded-[10px] bg-white px-6 text-[16px] font-semibold text-ink"
            >
              {common.cta.primary}
            </a>
            <LocaleLink
              to="/contact"
              className="flex h-[52px] items-center rounded-[10px] border border-invert-line px-[22px] text-[16px] font-semibold text-white"
            >
              {t.cta.secondary}
            </LocaleLink>
          </div>
        </div>
      </section>
    </div>
  );
}
