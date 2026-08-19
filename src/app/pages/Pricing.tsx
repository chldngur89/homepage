import { useCopy } from "@/app/i18n/useCopy";
import { useLocale } from "@/app/i18n/LocaleContext";
import { foreignHreflang } from "@/app/i18n/localePath";
import { APP_HAS_ENGLISH, APP_URLS } from "@/app/config/apps";
import { LocaleLink } from "@/app/components/LocaleLink";
import { SHELL, Section, SectionLabel } from "@/app/components/page";

/**
 * 요금제 카드 버튼의 목적지. 문구는 사전이, 목적지는 코드가 정한다 — 번역이
 * 링크를 옮길 수 없게 하려는 것이다. `plans` 는 길이 3의 튜플이라(원소가
 * 빠지면 사전이 컴파일되지 않는다) 인덱스로 짝지어도 조용히 어긋나지 않는다.
 *
 * 앞의 둘은 사이트 공통 주 CTA 와 같은 제품 앱, 마지막 "슈퍼 팀" 만 문의로
 * 간다 — 전환 이전과 같다.
 */
const PLAN_CTA_TO_CONTACT = [false, false, true] as const;

const BUTTON = "flex h-12 items-center justify-center rounded-[10px] text-[15.5px] font-semibold";

export default function Pricing() {
  const locale = useLocale();
  const copy = useCopy();
  const t = copy.pricing;
  const common = copy.common;

  /**
   * 주 CTA 는 사이트의 나머지 페이지와 같이 제품 앱으로 간다. 외부 링크라
   * LocaleLink 가 아니라 <a target="_blank"> 이며, 제품 UI 가 한국어뿐이라
   * 영문 화면에서는 hreflang="ko" 를 달아 준다.
   */
  const productCta = {
    href: APP_URLS.cmo,
    target: "_blank",
    rel: "noopener noreferrer",
    hrefLang: foreignHreflang(APP_HAS_ENGLISH, locale),
  } as const;

  return (
    <div className="bg-ground">
      {/* 히어로 — 홈·솔루션과 같이 Section 의 기본 패딩 밖이라 직접 짠다 */}
      <section aria-labelledby="hero-h" className="border-b border-line">
        <div className={`${SHELL} pb-[clamp(64px,7vw,104px)] pt-[clamp(56px,7vw,96px)]`}>
          <div className="rise">
            <p className="mb-[22px] text-[13px] font-semibold uppercase tracking-[0.1em] text-brand">
              {t.hero.eyebrow}
            </p>
            <h1
              id="hero-h"
              className="max-w-[14em] text-[clamp(38px,5.2vw,60px)] font-bold leading-[1.14] tracking-[-0.035em]"
            >
              {t.hero.titleLine1}
              <br />
              {t.hero.titleLine2}
            </h1>
            <p className="mt-[26px] max-w-[34em] text-[18px] leading-[1.65] text-ink-2">
              {t.hero.body}
            </p>
          </div>
        </div>
      </section>

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

      {/* 02 건별 과금 */}
      <Section id="peruse-h" tone="panel">
        <SectionLabel index="02">{t.perUse.label}</SectionLabel>
        <h2
          id="peruse-h"
          className="max-w-[20em] text-[clamp(28px,3.6vw,38px)] font-semibold leading-[1.28] tracking-[-0.03em]"
        >
          {t.perUse.title}
        </h2>
        <p className="mt-4 max-w-[34em] text-[16.5px] leading-[1.7] text-ink-2">{t.perUse.body}</p>

        <div className="mt-11 grid gap-5 md:grid-cols-2">
          {t.perUse.packages.map((pkg) => (
            <div
              key={pkg.name}
              className="rounded-[14px] border border-line-2 bg-surface p-[clamp(24px,3vw,34px)]"
            >
              <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-ink-2">{pkg.name}</h3>
              <p className="mt-3 text-[clamp(26px,3vw,32px)] font-bold leading-[1.1] tracking-[-0.035em]">
                {pkg.price}
              </p>
              <ul className="mt-5 grid gap-2.5">
                {pkg.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[15px] leading-[1.7] text-ink-2">
                    <span aria-hidden="true" className="text-ink-3">
                      &mdash;
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap">
          <a {...productCta} className={`${BUTTON} border border-line px-5 text-ink`}>
            {t.perUse.cta}
          </a>
        </div>
      </Section>

      {/* 03 수익 쉐어 */}
      <Section id="rev-h">
        <SectionLabel index="03">{t.revenueShare.label}</SectionLabel>
        <h2
          id="rev-h"
          className="max-w-[20em] text-[clamp(28px,3.6vw,38px)] font-semibold leading-[1.28] tracking-[-0.03em]"
        >
          {t.revenueShare.title}
        </h2>
        <p className="mt-4 max-w-[34em] text-[16.5px] leading-[1.7] text-ink-2">
          {t.revenueShare.body}
        </p>

        <div className="mt-11 grid gap-[clamp(28px,4vw,56px)] md:grid-cols-2">
          <div>
            <h3 className="text-[19px] font-semibold tracking-[-0.02em]">
              {t.revenueShare.planTitle}
            </h3>
            <p className="mt-4 max-w-[28em] text-[16.5px] leading-[1.7] text-ink-2">
              {t.revenueShare.planBodyBefore}
              <strong className="font-semibold text-ink">{t.revenueShare.planBodyRate}</strong>
              {t.revenueShare.planBodyAfter}
            </p>
            <ul className="mt-6 grid gap-3">
              {t.revenueShare.items.map((item) => (
                <li key={item} className="flex gap-2.5 text-[15.5px] leading-[1.7] text-ink-2">
                  <span aria-hidden="true" className="text-brand">
                    &mdash;
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[14px] border border-line-2 bg-surface p-[clamp(24px,3vw,34px)]">
            <h3 className="text-[12.5px] font-semibold tracking-[0.12em] text-ink-3">
              {t.revenueShare.example.title}
            </h3>
            <dl className="mt-5">
              {t.revenueShare.example.rows.map((row, index) => {
                /* 마지막 줄이 합계다. 바로 위 줄의 아래 선이 이미 구분선이므로
                   합계에는 선을 더 긋지 않는다 — 그으면 헤어라인이 겹쳐 보인다. */
                const total = index === t.revenueShare.example.rows.length - 1;
                return (
                  <div
                    key={row.label}
                    className={`flex items-baseline justify-between gap-4 ${
                      total ? "pt-4" : "border-b border-line py-3.5"
                    }`}
                  >
                    <dt className={`text-[14.5px] ${total ? "font-semibold text-ink" : "text-ink-2"}`}>
                      {row.label}
                    </dt>
                    <dd
                      className={`text-right tabular-nums ${
                        total ? "text-[19px] font-bold tracking-[-0.02em]" : "text-[15.5px] font-semibold"
                      }`}
                    >
                      {row.value}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>
        </div>

        <div className="mt-9 flex flex-wrap">
          <LocaleLink to="/contact" className={`${BUTTON} border border-line px-5 text-ink`}>
            {t.revenueShare.cta}
          </LocaleLink>
        </div>
      </Section>

      {/* 04 자주 묻는 질문 — 섹션에 따로 타이틀이 없으므로 라벨 자체가 제목이다.
          dl/dt/dd 는 계획 5에서 FAQPage 구조화 데이터를 붙일 때의 근거다. */}
      <Section id="faq-h" tone="panel">
        <SectionLabel index="04" as="h2" id="faq-h">
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
