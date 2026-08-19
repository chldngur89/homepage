import { useState, useEffect } from "react";
import { useCopy } from "@/app/i18n/useCopy";
import { useLocale } from "@/app/i18n/LocaleContext";
import { foreignHreflang } from "@/app/i18n/localePath";
import { APP_HAS_ENGLISH, APP_URLS } from "@/app/config/apps";
import { LocaleLink } from "@/app/components/LocaleLink";
import { SHELL, Section, SectionLabel } from "@/app/components/page";

/**
 * 시뮬레이션 한 단계의 표시 상태.
 *
 * 전환 전에는 lucide 아이콘 세 개(Check 초록 / Check 시안 / Loader 시안)와
 * 회색 점이 이 자리를 채웠다. 새 디자인에는 아이콘 세트가 없으므로 마커
 * 하나로 그린다. 분기가 넷에서 셋으로 줄었는데, 값이 달라진 것이 아니라
 * 두 분기가 원래 같은 그림이었기 때문이다.
 *
 * - 전환 전 첫 두 분기(`simDone && active` → 초록 체크, `active` → 시안 체크)는
 *   같은 체크 표시였고 색만 달랐다. 새 팔레트에는 초록 액센트가 없어 하나로
 *   합쳐진다.
 * - `spinning` 은 정의상 `!simDone` 이므로 `simDone` 인 동안에는 절대 참이
 *   아니다. 따라서 "spinning 먼저, 그 다음 active" 순서는 전환 전 순서와
 *   결과가 완전히 같다.
 */
type StepState = "done" | "running" | "waiting";

function StepMarker({ state }: { state: StepState }) {
  return (
    <span aria-hidden="true" className="flex h-5 w-5 shrink-0 items-center justify-center">
      {state === "done" ? (
        <span className="text-[15px] leading-none text-brand">&#10003;</span>
      ) : state === "running" ? (
        <span className="h-[15px] w-[15px] animate-spin rounded-full border-2 border-line-2 border-t-brand motion-reduce:animate-none" />
      ) : (
        <span className="h-[6px] w-[6px] rounded-full bg-line" />
      )}
    </span>
  );
}

export default function Demo() {
  const locale = useLocale();
  const copy = useCopy();
  /**
   * 지역 변수 이름이 `demo` 인 것은 우연이 아니다. 전환 전에는 모듈 상수
   * (`const demo = siteContent.demoPage`)였고, 아래 상태 머신이 그 이름으로
   * `demo.playbookLabels` 를 읽는다. 이름과 경로를 그대로 두면 이번 전환이
   * 로직에 손대지 않았다는 것이 diff 로 드러난다.
   */
  const demo = copy.demo;
  const common = copy.common;

  /**
   * 주 CTA 는 사이트의 나머지 페이지와 같이 제품 앱으로 간다. 외부 링크라
   * LocaleLink 가 아니라 <a target="_blank"> 다.
   *
   * `/demo` 는 한국어 전용이라 `locale` 이 항상 "ko" 이고 이 표기는 지금
   * 아무것도 출력하지 않는다. 그래도 솔루션·요금 페이지와 같은 모양을
   * 유지하는 이유는, EN_ROUTES 에 `/demo` 가 들어가는 순간 표시가 저절로
   * 따라오게 하기 위해서다 — 계획 1에서 링크마다 손으로 표기를 달다가 세
   * 군데를 빠뜨렸던 것이 이 형태를 쓰는 이유다.
   */
  const externalCta = (href: string) =>
    ({
      href,
      target: "_blank",
      rel: "noopener noreferrer",
      hrefLang: foreignHreflang(APP_HAS_ENGLISH, locale),
    }) as const;

  const [simOpen, setSimOpen] = useState(false);
  const [simIdx, setSimIdx] = useState(0);
  const [simDone, setSimDone] = useState(false);

  const startSimulation = () => {
    setSimDone(false);
    setSimIdx(0);
    setSimOpen(true);
  };

  useEffect(() => {
    if (!simOpen || simDone) return;
    const max = demo.playbookLabels.length - 1;
    if (simIdx < max) {
      const t = setTimeout(() => setSimIdx((x) => x + 1), 720);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setSimDone(true), 640);
    return () => clearTimeout(t);
  }, [simOpen, simIdx, simDone]);

  return (
    <div className="bg-ground">
      {/* 히어로 — 홈·솔루션·요금과 같이 Section 의 기본 패딩 밖이라 직접 짠다 */}
      <section aria-labelledby="hero-h" className="border-b border-line">
        <div className={`${SHELL} pb-[clamp(64px,7vw,104px)] pt-[clamp(56px,7vw,96px)]`}>
          <div className="rise">
            <p className="mb-[22px] text-[13px] font-semibold uppercase tracking-[0.1em] text-brand">
              {demo.hero.eyebrow}
            </p>
            <h1
              id="hero-h"
              className="max-w-[14em] text-[clamp(38px,5.2vw,60px)] font-bold leading-[1.14] tracking-[-0.035em]"
            >
              {demo.hero.titleLine1}
              <br />
              {demo.hero.titleLine2}
            </h1>
            <p className="mt-[26px] max-w-[34em] text-[18px] leading-[1.65] text-ink-2">
              {demo.hero.body}
            </p>

            <div className="mt-[34px] flex flex-wrap gap-2.5">
              <a
                {...externalCta(APP_URLS.cmo)}
                className="flex h-12 items-center rounded-[10px] bg-invert px-[22px] text-[15.5px] font-semibold text-white"
              >
                {common.cta.primary}
              </a>
            </div>

            <p className="mt-[26px] max-w-[30em] border-t border-line pt-6 text-[14px] leading-[1.7] text-ink-3">
              {demo.hero.disclaimer}
            </p>
          </div>
        </div>
      </section>

      {/* 01 다음 역할 — CEO Rader 브리지 */}
      <Section id="bridge-h">
        <SectionLabel index="01">{demo.bridge.label}</SectionLabel>
        <h2
          id="bridge-h"
          className="max-w-[20em] text-[clamp(28px,3.6vw,38px)] font-semibold leading-[1.28] tracking-[-0.03em]"
        >
          {demo.bridge.title}
        </h2>
        <p className="mt-4 max-w-[34em] text-[16.5px] leading-[1.7] text-ink-2">
          {demo.bridge.body}
        </p>

        <div className="mt-8 flex flex-wrap">
          <a
            {...externalCta(APP_URLS.ceoRader)}
            className="flex h-12 items-center rounded-[10px] border border-line px-5 text-[15.5px] font-semibold text-ink"
          >
            {demo.bridge.cta}
          </a>
        </div>
      </Section>

      {/* 02 시뮬레이션 */}
      <Section id="sim-h" tone="panel">
        <SectionLabel index="02">{demo.simulate.label}</SectionLabel>
        <h2
          id="sim-h"
          className="max-w-[20em] text-[clamp(28px,3.6vw,38px)] font-semibold leading-[1.28] tracking-[-0.03em]"
        >
          {demo.simulate.title}
        </h2>
        <p className="mt-4 max-w-[34em] text-[16.5px] leading-[1.7] text-ink-2">
          {demo.simulate.subtitle}
        </p>

        <div className="mt-10 rounded-[14px] border border-line-2 bg-surface p-[clamp(22px,3vw,34px)]">
          {!simOpen ? (
            <button
              type="button"
              onClick={startSimulation}
              className="flex h-12 w-full items-center justify-center rounded-[10px] bg-invert text-[15.5px] font-semibold text-white"
            >
              {demo.simulate.button}
            </button>
          ) : (
            <div>
              {/* 단계 목록 — 홈 ProposalCard 와 같은 헤어라인 리듬 */}
              <ol className="border-t border-line-2">
                {demo.playbookLabels.map((label, i) => {
                  const active = simIdx >= i;
                  const spinning = simIdx === i && !simDone;
                  return (
                    <li
                      key={label}
                      className="flex items-center gap-3 border-b border-line-2 py-[15px]"
                    >
                      <StepMarker state={spinning ? "running" : active ? "done" : "waiting"} />
                      <span
                        className={`text-[15.5px] leading-[1.6] ${
                          active ? "text-ink" : "text-ink-3"
                        }`}
                      >
                        {label}
                      </span>
                    </li>
                  );
                })}
              </ol>

              {/* 진행 상태는 화면에만 남기지 않는다 — 완료 문구가 뜰 때
                  스크린리더에도 전해지도록 live 영역으로 감싼다. */}
              <div aria-live="polite" className="mt-6">
                {simDone ? (
                  <div className="grid gap-4">
                    <p className="text-[15px] leading-[1.7] text-ink-2">{demo.simulate.done}</p>
                    <button
                      type="button"
                      onClick={() => {
                        setSimDone(false);
                        setSimIdx(0);
                      }}
                      className="flex h-12 w-full items-center justify-center rounded-[10px] border border-line text-[15.5px] font-semibold text-ink"
                    >
                      {demo.simulate.again}
                    </button>
                  </div>
                ) : (
                  <p className="text-[14px] text-ink-3">{demo.simulate.running}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* 마감 CTA — 홈·솔루션·요금과 같은 반전 블록 */}
      <section aria-labelledby="cta-h" className="border-b border-line bg-invert text-white">
        <div className={`${SHELL} py-[clamp(80px,9vw,132px)]`}>
          <h2
            id="cta-h"
            className="max-w-[20em] text-[clamp(30px,4.4vw,52px)] font-bold leading-[1.18] tracking-[-0.035em]"
          >
            {demo.cta.title}
          </h2>
          <p className="mt-6 max-w-[28em] text-[18px] leading-[1.65] text-invert-ink-2">
            {demo.cta.body}
          </p>

          <div className="mt-[38px] flex flex-wrap gap-2.5">
            <a
              {...externalCta(APP_URLS.cmo)}
              className="flex h-[52px] items-center rounded-[10px] bg-white px-6 text-[16px] font-semibold text-ink"
            >
              {common.cta.primary}
            </a>
            <LocaleLink
              to="/pricing"
              className="flex h-[52px] items-center rounded-[10px] border border-invert-line px-[22px] text-[16px] font-semibold text-white"
            >
              {demo.cta.pricing}
            </LocaleLink>
            <LocaleLink
              to="/contact"
              className="flex h-[52px] items-center rounded-[10px] border border-invert-line px-[22px] text-[16px] font-semibold text-white"
            >
              {demo.cta.contact}
            </LocaleLink>
          </div>
        </div>
      </section>
    </div>
  );
}
