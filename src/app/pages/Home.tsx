import { Link } from "react-router";
import { useCopy } from "@/app/i18n/useCopy";
import { useLocale } from "@/app/i18n/LocaleContext";
import { foreignHreflang, localePath, pathHreflang } from "@/app/i18n/localePath";
import { APP_HAS_ENGLISH, APP_URLS } from "@/app/config/apps";
import { ImageSlot } from "@/app/components/ImageSlot";
import { ProposalCard } from "@/app/components/mockups/ProposalCard";
import { ChatThread } from "@/app/components/mockups/ChatThread";
import { ResultDashboard } from "@/app/components/mockups/ResultDashboard";
import type { ReactNode } from "react";

const SHELL = "mx-auto max-w-[1180px] px-[clamp(20px,4vw,40px)]";
const BLOCK = "py-[clamp(72px,8vw,112px)]";

function Section({
  id,
  tone = "ground",
  children,
}: {
  id: string;
  tone?: "ground" | "panel";
  children: ReactNode;
}) {
  return (
    <section
      aria-labelledby={id}
      className={`border-b border-line ${tone === "panel" ? "bg-panel" : "bg-ground"}`}
    >
      <div className={`${SHELL} ${BLOCK}`}>{children}</div>
    </section>
  );
}

/**
 * 기본은 시각적 라벨(`<p>`)이지만, 06 파일럿 피드백처럼 섹션에 별도의
 * `<h2>` 타이틀이 없는 경우 `as="h2"` 로 이 라벨 자체를 그 섹션의 제목으로
 * 승격시킬 수 있다 — 클래스는 그대로라 외관은 바뀌지 않는다.
 */
function SectionLabel({
  index,
  as: Tag = "p",
  id,
  children,
}: {
  index: string;
  as?: "p" | "h2";
  id?: string;
  children: ReactNode;
}) {
  return (
    <Tag id={id} className="mb-4 text-[12.5px] font-semibold tracking-[0.12em] text-ink-3">
      {index}&nbsp;&nbsp;{children}
    </Tag>
  );
}

/** 사전의 \n 을 <br> 로 바꾼다. 제목의 줄바꿈 위치가 디자인의 일부다. */
function Lines({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, index) => (
        <span key={index}>
          {index > 0 && <br />}
          {line}
        </span>
      ))}
    </>
  );
}

export default function Home() {
  const locale = useLocale();
  const copy = useCopy();
  const t = copy.home;
  const common = copy.common;
  const to = (path: string) => localePath(path, locale);

  /**
   * 메인 CTA("우리팀과 같이 성장하기")는 제품 앱으로 간다 — 헤더와 나머지
   * 여덟 페이지의 같은 라벨이 향하는 곳과 같다. 같은 문구가 페이지마다 다른
   * 곳으로 가면 안 되고, 사이트에서 구매 의도가 가장 높은 요소가 제품에
   * 닿지 않으면 더 안 된다.
   */
  const productCta = {
    href: APP_URLS.cmo,
    target: "_blank",
    rel: "noopener noreferrer",
    hrefLang: foreignHreflang(APP_HAS_ENGLISH, locale),
  } as const;

  return (
    <div className="bg-ground">
      {/* 히어로 */}
      <section aria-labelledby="hero-h" className="border-b border-line">
        <div className={`${SHELL} pb-[clamp(64px,7vw,104px)] pt-[clamp(56px,7vw,96px)]`}>
          <div className="rise grid items-center gap-[clamp(40px,5vw,64px)] lg:grid-cols-[55fr_45fr]">
            <div>
              <p className="mb-[22px] text-[13px] font-semibold uppercase tracking-[0.1em] text-brand">
                {t.hero.eyebrow}
              </p>
              <h1
                id="hero-h"
                className="text-[clamp(38px,5.2vw,60px)] font-bold leading-[1.14] tracking-[-0.035em]"
              >
                {t.hero.titleLine1}
                <br />
                {t.hero.titleLine2}
              </h1>
              <p className="mt-[26px] max-w-[30em] text-[18px] leading-[1.65] text-ink-2">
                {t.hero.body}
                <strong className="font-semibold text-ink">{t.hero.bodyStrong}</strong>
                {t.hero.bodyAfter}
              </p>

              <div className="mt-[34px] flex flex-wrap gap-2.5">
                <a
                  {...productCta}
                  className="flex h-12 items-center rounded-[10px] bg-invert px-[22px] text-[15.5px] font-semibold text-white"
                >
                  {common.cta.primary}
                </a>
                <Link
                  to={to("/solution")}
                  hrefLang={pathHreflang("/solution", locale)}
                  className="flex h-12 items-center rounded-[10px] border border-line px-5 text-[15.5px] font-semibold text-ink"
                >
                  {common.cta.secondary}
                </Link>
              </div>

              <ul className="mt-[34px] flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6">
                {t.hero.assurances.map((item) => (
                  <li key={item} className="flex items-center gap-[7px] text-[13.5px] text-ink-2">
                    <span aria-hidden="true" className="h-[5px] w-[5px] rounded-full bg-brand" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <figure className="m-0">
              <ProposalCard />
              <figcaption className="mt-3 text-[13px] text-ink-3">{t.hero.caption}</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 01 누구를 위한가 */}
      <Section id="who-h">
        <div className="grid gap-[clamp(36px,5vw,72px)] lg:grid-cols-[44fr_56fr]">
          <div>
            <SectionLabel index="01">{t.who.label}</SectionLabel>
            <h2
              id="who-h"
              className="text-[clamp(28px,3.6vw,40px)] font-semibold leading-[1.25] tracking-[-0.03em]"
            >
              <Lines text={t.who.title} />
            </h2>
            <ImageSlot slot="persona" alt={t.who.photoAlt} className="mt-8 rounded-[14px] border border-line-2" />
          </div>

          <dl className="grid content-start border-t-2 border-ink">
            {t.who.items.map((item) => (
              <div key={item.term} className="border-b border-line py-[30px]">
                <dt className="text-[22px] font-semibold tracking-[-0.02em]">{item.term}</dt>
                <dd className="mt-2.5 text-[16.5px] leading-[1.7] text-ink-2">{item.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* 02 성장 루프 */}
      <Section id="loop-h" tone="panel">
        <SectionLabel index="02">{t.loop.label}</SectionLabel>
        <h2
          id="loop-h"
          className="max-w-[20em] text-[clamp(28px,3.6vw,38px)] font-semibold leading-[1.28] tracking-[-0.03em]"
        >
          {t.loop.title}
        </h2>

        <ol className="mt-14 grid gap-px [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
          {t.loop.steps.map((step) => (
            <li key={step.step} className="bg-surface px-6 pb-7 pt-[26px] shadow-[0_0_0_1px_var(--line-2)]">
              <span className="block text-[12px] font-bold tracking-[0.1em] text-brand">
                {step.step}
              </span>
              <h3 className="mt-3 text-[23px] font-semibold tracking-[-0.02em]">{step.title}</h3>
              <p className="mt-3.5 text-[15.5px] leading-[1.7] text-ink-2">{step.body}</p>
            </li>
          ))}
        </ol>

        <p className="mt-[22px] flex items-center gap-2.5 text-[14px] text-ink-2">
          <span aria-hidden="true" className="text-[16px]">
            &#8630;
          </span>
          {t.loop.note}
        </p>
      </Section>

      {/* 03 제품 화면 */}
      <Section id="chat-h">
        <div className="grid items-center gap-[clamp(36px,5vw,64px)] lg:grid-cols-[38fr_62fr]">
          <div>
            <SectionLabel index="03">{t.product.label}</SectionLabel>
            <h2
              id="chat-h"
              className="text-[clamp(26px,3.2vw,34px)] font-semibold leading-[1.3] tracking-[-0.03em]"
            >
              <Lines text={t.product.title} />
            </h2>
            <p className="mt-5 text-[16.5px] leading-[1.7] text-ink-2">{t.product.body}</p>
            <ul className="mt-6 grid gap-2.5">
              {t.product.items.map((item) => (
                <li key={item} className="flex gap-2.5 text-[15.5px] text-ink-2">
                  <span aria-hidden="true" className="text-brand">
                    &mdash;
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <figure className="m-0">
            <ChatThread />
            <figcaption className="mt-3 text-[13px] text-ink-3">{t.product.caption}</figcaption>
          </figure>
        </div>
      </Section>

      {/* 04 비교표 */}
      <Section id="cmp-h" tone="panel">
        <SectionLabel index="04">{t.compare.label}</SectionLabel>
        <h2
          id="cmp-h"
          className="mb-3 max-w-[22em] text-[clamp(28px,3.6vw,38px)] font-semibold leading-[1.28] tracking-[-0.03em]"
        >
          {t.compare.title}
        </h2>
        <p className="mb-9 text-[15px] text-ink-3">{t.compare.subtitle}</p>

        <div className="overflow-x-auto rounded-[14px] border border-line-2 bg-surface">
          <table className="w-full min-w-[640px] border-collapse text-[16px]">
            <thead>
              <tr>
                <th scope="col" className="w-[22%] border-b-2 border-ink px-6 py-[18px]" />
                <th
                  scope="col"
                  className="border-b-2 border-ink px-6 py-[18px] text-left font-semibold text-ink-2"
                >
                  {t.compare.headTool}
                </th>
                <th scope="col" className="border-b-2 border-ink px-6 py-[18px] text-left font-bold">
                  {t.compare.headUs}
                </th>
              </tr>
            </thead>
            <tbody>
              {t.compare.rows.map((row, index) => {
                const last = index === t.compare.rows.length - 1;
                const cell = last ? "px-6 py-5" : "border-b border-line px-6 py-5";
                return (
                  <tr key={row.key}>
                    <th scope="row" className={`${cell} text-left font-semibold`}>
                      {row.key}
                    </th>
                    <td className={`${cell} text-ink-2`}>{row.tool}</td>
                    <td className={`${cell} ${last ? "font-bold" : "font-semibold"}`}>{row.us}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Section>

      {/* 05 결과 */}
      <Section id="dash-h">
        <SectionLabel index="05">{t.results.label}</SectionLabel>
        <h2
          id="dash-h"
          className="mb-10 max-w-[24em] text-[clamp(28px,3.6vw,38px)] font-semibold leading-[1.28] tracking-[-0.03em]"
        >
          {t.results.title}
        </h2>
        <ResultDashboard />
      </Section>

      {/* 06 파일럿 피드백 — 디자인에 별도 타이틀이 없어, 이 라벨 자체가 섹션 제목이다 */}
      <Section id="voice-h" tone="panel">
        <SectionLabel index="06" as="h2" id="voice-h">
          {t.voices.label}
        </SectionLabel>
        <div className="mt-10 grid gap-[clamp(32px,4vw,56px)] md:grid-cols-2">
          {t.voices.quotes.map((item, index) => (
            <figure key={item.who} className="m-0 border-t-2 border-ink pt-[26px]">
              <blockquote className="text-[clamp(20px,2.2vw,25px)] font-medium leading-[1.5] tracking-[-0.02em]">
                {item.quote}
              </blockquote>
              <figcaption className="mt-[22px] flex items-center gap-3">
                <ImageSlot
                  slot={index === 0 ? "voice-1" : "voice-2"}
                  alt={item.alt}
                  className="!w-11 shrink-0 rounded-full"
                />
                <span className="text-[14.5px] text-ink-2">{item.who}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-8 text-[13px] text-ink-3">{t.voices.note}</p>
      </Section>

      {/* 07 현재 범위 */}
      <Section id="scope-h">
        <div className="grid gap-[clamp(36px,5vw,64px)] lg:grid-cols-[40fr_60fr]">
          <div>
            <SectionLabel index="07">{t.scope.label}</SectionLabel>
            <h2
              id="scope-h"
              className="text-[clamp(26px,3.2vw,34px)] font-semibold leading-[1.3] tracking-[-0.03em]"
            >
              <Lines text={t.scope.title} />
            </h2>
          </div>

          <ol className="grid">
            {t.scope.stages.map((stage, index) => (
              <li
                key={stage.title}
                className={`grid grid-cols-[96px_1fr] gap-5 py-[26px] ${
                  index === 0 ? "border-t-2 border-ink" : "border-t border-line"
                } ${index === t.scope.stages.length - 1 ? "border-b border-line" : ""}`}
              >
                <span
                  className={`pt-[5px] text-[13px] font-semibold tracking-[0.06em] ${
                    stage.current ? "text-brand" : "text-ink-3"
                  }`}
                >
                  {stage.when}
                </span>
                <div>
                  <h3 className="text-[19px] font-semibold">{stage.title}</h3>
                  <p className="mt-2 text-[15.5px] leading-[1.7] text-ink-2">{stage.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* CTA */}
      <section aria-labelledby="cta-h" className="border-b border-line bg-invert text-white">
        <div className={`${SHELL} py-[clamp(80px,9vw,132px)]`}>
          <h2
            id="cta-h"
            className="max-w-[24em] text-[clamp(30px,4.4vw,52px)] font-bold leading-[1.18] tracking-[-0.035em]"
          >
            <Lines text={t.cta.title} />
          </h2>
          <p className="mt-6 max-w-[28em] text-[18px] leading-[1.65] text-invert-ink-2">
            {t.cta.body}
          </p>
          {/*
            두 버튼은 라벨이 다르므로 목적지도 달라야 한다. 예전에는 둘 다
            /demo 로 가서, 나란히 놓인 서로 다른 문구가 같은 화면으로
            떨어졌다. 이제 주 버튼은 제품 앱으로, 보조 버튼은 데모로 간다.
          */}
          <div className="mt-[38px] flex flex-wrap gap-2.5">
            <a
              {...productCta}
              className="flex h-[52px] items-center rounded-[10px] bg-white px-6 text-[16px] font-semibold text-ink"
            >
              {common.cta.primary}
            </a>
            <Link
              to={to("/demo")}
              hrefLang={pathHreflang("/demo", locale)}
              className="flex h-[52px] items-center rounded-[10px] border border-[#3A3A38] px-[22px] text-[16px] font-semibold text-white"
            >
              {common.cta.demo}
            </Link>
          </div>
        </div>
      </section>

      <ImageSlot
        slot="footer-wide"
        alt={t.footerImageAlt}
        className="h-[clamp(220px,26vw,380px)]"
      />
    </div>
  );
}
