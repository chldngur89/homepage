import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowRight,
  Mail,
  ShieldCheck,
  Sparkles,
  Target,
  Workflow,
} from "lucide-react";
import { type IrStatusTone } from "@/content/ko/ir";
import { CONTACT_EMAIL } from "@/content/ko/contact";
import { useCopy } from "@/app/i18n/useCopy";
import { IrShell } from "@/app/components/ir/IrShell";
import { LocaleLink } from "@/app/components/LocaleLink";

/**
 * 본문(article) 7개 섹션이 모두 밝은 디자인이다(Task 4·5). 여기서 바꾼
 * 것은 이 주소의 **출처** 하나뿐이다 — 계획 2 Task 6 이 `site.json` 의
 * `contactEmail` 을 없앴으므로, 그대로 두면 이 줄이 조용히 폴백 리터럴로
 * 떨어져 문의 페이지와 갈라진다. 값은 동일하다. `IrShell.tsx` 도 같은
 * 상수를 독립적으로 들여온다 — 셸(헤더·푸터)과 본문이 각자 참조할 뿐,
 * 값은 하나다.
 */
const contactEmail = CONTACT_EMAIL;

/**
 * 375px 에서 4개가 서로 겹친다(실측 — Task 4 보충 3). md 미만에서는
 * absolute 를 아예 걸지 않고 2열 그리드로 흐름 배치하고, md 이상에서만
 * 이 궤도 배치를 적용한다 — 그래서 위치 유틸리티에 전부 `md:` 를 붙였다.
 */
const heroWorkflowLayout = [
  "md:left-[5%] md:top-[8%] max-w-[12rem] text-left",
  "md:right-[1%] md:top-[18%] max-w-[12.5rem] text-right",
  "md:left-[6%] md:bottom-[36%] max-w-[12.5rem] text-left",
  "md:right-[2%] md:bottom-[38%] max-w-[12.5rem] text-right",
] as const;

/**
 * 밝은 디자인에서는 원래(다크) 배지의 배색을 반전한다 — 옅은 색 배경 +
 * 진한 잉크 글자. `--color-chart-1~4` 를 배경 틴트로 쓰는 이유는 그 네
 * 색이 이미 흰 표면 위에서 서로 구별되도록 계산·테스트된 값이기
 * 때문이다(`src/styles/tokens.test.ts` "차트 색"). 글자색으로 그 네 색을
 * 그대로 쓰지 않는 이유는 `--color-chart-1` 이 흰 배경에서 3.75:1 로
 * 비텍스트 기준(3:1)은 넘어도 글자 기준(4.5:1)은 못 미치기 때문 — 그래서
 * 글자는 항상 `text-ink`, 색 구분은 배경 틴트가 맡는다. 테두리는 비텍스트라
 * 3:1 기준만 넘으면 된다.
 */
const toneStyles: Record<IrStatusTone, string> = {
  estimate: "border-chart-1/30 bg-chart-1/10 text-ink",
  goal: "border-chart-2/30 bg-chart-2/10 text-ink",
  planned: "border-chart-3/30 bg-chart-3/10 text-ink",
  under_review: "border-chart-4/30 bg-chart-4/10 text-ink",
};

function StatusPill({
  children,
  tone,
}: {
  children: ReactNode;
  tone: IrStatusTone;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium tracking-[0.18em] ${toneStyles[tone]}`}
    >
      {children}
    </span>
  );
}

/**
 * 사이트 전체의 진입 애니메이션은 `.rise` 하나다(theme.css) — `motion/react`
 * 의 스크롤 트리거 페이드 대신 CSS 애니메이션으로 옮긴다. `delay` 는 모든
 * 호출부가 넘기는 값을 그대로 받아 `animation-delay` 로 적용한다.
 */
function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div
      className={`rise ${className ?? ""}`}
      style={delay ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}

type IrChartsModule = typeof import("@/app/components/ir/IRCharts");

function useIrCharts() {
  const [charts, setCharts] = useState<IrChartsModule | null>(null);

  useEffect(() => {
    let cancelled = false;

    import("@/app/components/ir/IRCharts").then((module) => {
      if (!cancelled) {
        setCharts(module);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return charts;
}

function SectionIntro({
  align = "left",
  eyebrow,
  description,
  title,
}: {
  align?: "center" | "left";
  eyebrow: string;
  description: string;
  title: string;
}) {
  const alignmentClass = align === "center" ? "mx-auto text-center" : "text-left";
  const widthClass = align === "center" ? "max-w-3xl" : "max-w-2xl";

  return (
    <div className={`${alignmentClass} ${widthClass}`}>
      <p className="text-xs font-medium uppercase tracking-[0.32em] text-brand">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-8 text-ink-2 md:text-lg">
        {description}
      </p>
    </div>
  );
}

export default function IR() {
  const irContent = useCopy().ir;
  const charts = useIrCharts();
  const ExecutionGapChart = charts?.ExecutionGapChart;
  const AdvantageRadarChart = charts?.AdvantageRadarChart;
  const VisionScenarioChart = charts?.VisionScenarioChart;
  /**
   * 도넛 중앙의 큰 수치는 차트가 실제로 그리는 데이터에서 읽는다 — 예전엔
   * "90%" 를 하드코딩해 두어 `executionGap.chart` 의 실제 값(manual: 85)과
   * 모순됐다(저장소 주인 확인, 85%가 맞는 값). 리터럴을 다시 박지 않고
   * 데이터에서 끌어와야 다음에 데이터가 바뀔 때 같은 모순이 재발하지 않는다.
   */
  const manualShare = irContent.executionGap.chart.find(
    (slice) => slice.segment === "manual",
  )?.value;

  return (
    <IrShell>
      <article>
          <section className="relative overflow-hidden border-b border-line">
            <div className="rise mx-auto grid max-w-7xl gap-14 px-6 pb-20 pt-14 lg:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)] lg:pb-24 lg:pt-20">
              <div className="relative z-10 max-w-3xl">
                <span className="inline-flex rounded-full border border-line bg-panel px-4 py-1.5 text-xs font-medium uppercase tracking-[0.32em] text-ink-2">
                  {irContent.hero.badge}
                </span>
                <p className="mt-8 text-xs font-medium uppercase tracking-[0.38em] text-ink-3">
                  First AI teammate for founders
                </p>
                <h1 className="mt-5 max-w-[13ch] whitespace-pre-line break-keep text-[2.35rem] font-semibold tracking-[-0.04em] text-ink leading-[1.08] sm:text-[2.7rem] md:max-w-[14ch] md:text-[3.45rem] xl:text-[3.95rem] xl:leading-[1.04]">
                  {irContent.hero.title}
                </h1>
                <p className="mt-8 max-w-2xl text-base leading-8 text-ink-2 md:text-lg">
                  {irContent.hero.description}
                </p>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-ink-3">
                  {irContent.hero.note}
                </p>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <a
                    href={`mailto:${contactEmail}?subject=${encodeURIComponent(irContent.cta.emailSubject)}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-invert px-6 py-3 text-sm font-medium text-white"
                  >
                    {irContent.cta.primaryLabel}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <LocaleLink
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-medium text-ink"
                  >
                    {irContent.cta.secondaryLabel}
                  </LocaleLink>
                </div>
              </div>

              <div className="relative z-10">
                {/*
                  md 미만에서는 흐름 배치(캡션 → 2열 카드 그리드 → 시그널
                  그리드), md 이상에서만 궤도(links absolute) 배치 — 보충 3.
                  링과 중앙 텍스트 스택은 궤도가 있을 때만 의미가 있는
                  장식이라 md 미만에서는 아예 숨긴다(카드 제목에 이미 같은
                  단어가 있어 정보 손실은 없다). 캡션 문구만 모바일 전용
                  줄로 한 번 더 보여준다.
                */}
                <div className="relative mx-auto max-w-[35rem] md:min-h-[40rem]">
                  <div className="hidden md:block">
                    <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-line" />
                    <div className="absolute left-1/2 top-1/2 h-[21rem] w-[21rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-line" />
                    <div className="absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-line" />
                  </div>

                  <p className="text-center text-[11px] font-medium uppercase tracking-[0.38em] text-brand md:hidden">
                    {irContent.hero.workflowCaption}
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-3 md:mt-0 md:contents">
                    {irContent.hero.workflow.map((step, index) => (
                      <div
                        key={step.title}
                        className={`rounded-3xl border border-line bg-surface px-5 py-4 md:absolute ${heroWorkflowLayout[index]}`}
                      >
                        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-brand">
                          {step.title}
                        </p>
                        <p className="mt-3 text-sm leading-6 text-ink-2">{step.body}</p>
                      </div>
                    ))}
                  </div>

                  <div className="hidden md:absolute md:inset-x-0 md:top-[16%] md:flex md:justify-center">
                    <div className="text-center">
                      <p className="text-[11px] font-medium uppercase tracking-[0.38em] text-brand">
                        {irContent.hero.workflowCaption}
                      </p>
                      <p className="mt-4 text-4xl font-semibold leading-none text-ink md:text-[3.45rem]">
                        Propose
                      </p>
                      <p className="mt-2 text-4xl font-semibold leading-none text-ink md:text-[3.45rem]">
                        Approve
                      </p>
                      <p className="mt-2 text-4xl font-semibold leading-none text-ink md:text-[3.45rem]">
                        Execute
                      </p>
                      <p className="mt-2 text-4xl font-semibold leading-none text-ink md:text-[3.45rem]">
                        Grow
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3 border-t border-line pt-6 sm:grid-cols-2 md:absolute md:inset-x-0 md:bottom-0 md:mt-0 md:border-t md:px-4 md:pb-5 md:pt-6">
                    {irContent.hero.signals.map((signal) => (
                      <div key={signal.label} className="rounded-2xl bg-surface px-4 py-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-medium text-ink">{signal.label}</p>
                            <p className="mt-1 text-xs leading-5 text-ink-3">{signal.note}</p>
                          </div>
                          <StatusPill tone={signal.tone}>{signal.value}</StatusPill>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="problem" className="border-b border-line">
            <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
              <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.94fr)]">
                <Reveal>
                  <SectionIntro
                    eyebrow="Problem"
                    title={irContent.executionGap.title}
                    description={irContent.executionGap.description}
                  />

                  <div className="mt-10 space-y-6 text-base leading-8 text-ink-2">
                    {irContent.executionGap.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  <div className="mt-10 space-y-4">
                    {irContent.executionGap.points.map((point, index) => (
                      <article
                        key={point.title}
                        className="border-l border-line pl-5"
                      >
                        <p className="text-xs font-medium uppercase tracking-[0.28em] text-ink-3">
                          0{index + 1}
                        </p>
                        <h3 className="mt-2 text-lg font-medium text-ink">{point.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-ink-2">{point.body}</p>
                      </article>
                    ))}
                  </div>
                </Reveal>

                <Reveal delay={0.08}>
                  <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface px-6 py-8 md:px-8">
                    <p className="relative text-xs font-medium uppercase tracking-[0.32em] text-ink-3">
                      Workload Imbalance
                    </p>
                    <div className="relative mt-6">
                      {ExecutionGapChart ? (
                        <ExecutionGapChart data={irContent.executionGap.chart} />
                      ) : (
                        <div className="mx-auto flex h-[22rem] max-w-[28rem] items-center justify-center">
                          <div
                            className="relative h-64 w-64 rounded-full"
                            style={{
                              background:
                                "conic-gradient(var(--color-chart-2) 0deg 324deg, var(--color-chart-1) 324deg 360deg)",
                            }}
                          >
                            <div className="absolute inset-[3.25rem] rounded-full bg-surface" />
                          </div>
                        </div>
                      )}

                      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                        <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-ink-3">
                          Manual
                        </p>
                        <p className="mt-3 text-5xl font-semibold text-ink">{manualShare}%</p>
                        <p className="mt-3 max-w-[11rem] text-center text-sm leading-6 text-ink-2">
                          {irContent.executionGap.chartCaption}
                        </p>
                      </div>
                    </div>

                    <p className="relative mt-8 text-sm leading-7 text-ink-2">
                      {irContent.executionGap.chartFootnote}
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          <section id="market" className="border-b border-line bg-panel">
            <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
              <Reveal>
                <SectionIntro
                  align="center"
                  eyebrow="Market"
                  title={irContent.market.title}
                  description={irContent.market.description}
                />
              </Reveal>

              <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
                <Reveal>
                  <div className="flex flex-col items-center gap-3">
                    {irContent.market.funnel.map((level, index) => {
                      const width = [100, 82, 64][index];

                      return (
                        <article
                          key={level.stage}
                          style={{ width: `${width}%` }}
                          className="relative overflow-hidden rounded-[1.75rem] border border-line bg-surface px-6 py-7 sm:px-8"
                        >
                          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                            <div>
                              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-ink-3">
                                {level.stage}
                              </p>
                              <h3 className="mt-3 text-3xl font-semibold text-ink">
                                {level.value}
                              </h3>
                            </div>
                            <StatusPill tone={level.tone}>{level.note}</StatusPill>
                          </div>
                          <p className="mt-6 max-w-xl text-sm leading-7 text-ink-2">
                            {level.description}
                          </p>
                        </article>
                      );
                    })}
                  </div>
                  <p className="mt-6 text-center text-sm leading-7 text-ink-3">
                    {irContent.market.note}
                  </p>
                </Reveal>

                <Reveal delay={0.08} className="flex h-full flex-col justify-between">
                  <div className="space-y-8">
                    <div className="border-t border-line pt-6">
                      <p className="text-xs font-medium uppercase tracking-[0.32em] text-brand">
                        Why This Segment
                      </p>
                      <p className="mt-4 text-lg leading-8 text-ink-2">
                        {irContent.market.segmentBody}
                      </p>
                    </div>
                    <div className="border-t border-line pt-6">
                      <p className="text-xs font-medium uppercase tracking-[0.32em] text-brand">
                        Lock-in
                      </p>
                      <h3 className="mt-4 text-2xl font-semibold text-ink">
                        {irContent.market.lockIn.title}
                      </h3>
                      <p className="mt-4 text-base leading-8 text-ink-2">
                        {irContent.market.lockIn.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          <section id="solution" className="border-b border-line">
            <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
              <div className="grid gap-14 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
                <Reveal>
                  <SectionIntro
                    eyebrow="Solution"
                    title={irContent.solution.title}
                    description={irContent.solution.description}
                  />
                </Reveal>

                <Reveal delay={0.08}>
                  <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface px-6 py-8 md:px-8">
                    <div className="flex items-center gap-3 text-brand">
                      <Workflow className="h-5 w-5" />
                      <p className="text-xs font-medium uppercase tracking-[0.32em] text-brand">
                        Pipeline
                      </p>
                    </div>
                    <div className="mt-8 grid gap-5 md:grid-cols-5">
                      {irContent.solution.pipeline.map((step, index) => (
                        <article key={step.title} className="relative">
                          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-ink-3">
                            Step 0{index + 1}
                          </p>
                          <h3 className="mt-3 text-lg font-medium text-ink">{step.title}</h3>
                          <p className="mt-3 text-sm leading-7 text-ink-2">{step.body}</p>
                          {index < irContent.solution.pipeline.length - 1 ? (
                            <div className="mt-4 hidden items-center gap-2 text-ink-3 md:flex">
                              <div className="h-px flex-1 bg-line" />
                              <ArrowRight className="h-4 w-4" />
                            </div>
                          ) : null}
                        </article>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>

              <div className="mt-14 grid gap-8 border-t border-line pt-10 md:grid-cols-3 md:gap-0">
                {irContent.solution.pillars.map((pillar, index) => (
                  <Reveal
                    key={pillar.title}
                    delay={index * 0.05}
                    className={`${index > 0 ? "md:border-l md:border-line md:pl-8" : "md:pr-8"}`}
                  >
                    <article className="h-full">
                      <div className="flex items-center gap-3 text-ink">
                        {index === 0 ? (
                          <ShieldCheck className="h-5 w-5 text-brand" />
                        ) : index === 1 ? (
                          <Sparkles className="h-5 w-5 text-brand" />
                        ) : (
                          <Target className="h-5 w-5 text-brand" />
                        )}
                        <h3 className="text-xl font-medium">{pillar.title}</h3>
                      </div>
                      <p className="mt-4 text-sm leading-7 text-ink-2">{pillar.body}</p>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section className="border-b border-line bg-panel">
            <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
              <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)]">
                <Reveal>
                  <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface px-6 py-8 md:px-8">
                    <p className="text-xs font-medium uppercase tracking-[0.32em] text-ink-3">
                      Relative Capability Map
                    </p>
                    {AdvantageRadarChart ? (
                      <AdvantageRadarChart
                        data={irContent.advantage.chart}
                        legend={irContent.advantage.chartLegend}
                      />
                    ) : (
                      <div className="mt-8 grid gap-4 sm:grid-cols-2">
                        {irContent.advantage.chart.map((point) => (
                          <div
                            key={point.subject}
                            className="rounded-2xl border border-line bg-panel px-4 py-4"
                          >
                            <p className="text-sm font-medium text-ink">{point.subject}</p>
                            <div className="mt-3 space-y-2 text-xs text-ink-2">
                              <div className="flex items-center justify-between">
                                <span>{irContent.advantage.chartLegend.wooriteam}</span>
                                <span>{point.wooriteam}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span>{irContent.advantage.chartLegend.aiTool}</span>
                                <span>{point.aiTool}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span>{irContent.advantage.chartLegend.designTool}</span>
                                <span>{point.designTool}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    <p className="mt-6 text-sm leading-7 text-ink-3">
                      {irContent.advantage.chartNote}
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={0.08}>
                  <SectionIntro
                    eyebrow="Advantage"
                    title={irContent.advantage.title}
                    description={irContent.advantage.description}
                  />
                  <div className="mt-10 space-y-5">
                    {irContent.advantage.points.map((point, index) => (
                      <article
                        key={point.title}
                        className="rounded-[1.5rem] border border-line bg-surface px-5 py-5"
                      >
                        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-ink-3">
                          0{index + 1}
                        </p>
                        <h3 className="mt-3 text-xl font-medium text-ink">{point.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-ink-2">{point.body}</p>
                      </article>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          <section id="economics" className="border-b border-line">
            <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
              <Reveal>
                <SectionIntro
                  eyebrow="Economics & Vision"
                  title={irContent.economics.title}
                  description={irContent.economics.description}
                />
              </Reveal>

              <div className="mt-14 overflow-hidden rounded-[2rem] border border-line">
                <div className="grid md:grid-cols-3">
                  {irContent.economics.metrics.map((metric, index) => (
                    <Reveal
                      key={metric.label}
                      delay={index * 0.05}
                      className={`${index > 0 ? "border-t border-line md:border-l md:border-t-0" : ""}`}
                    >
                      <article className="bg-surface px-6 py-8 md:px-8">
                        <StatusPill tone={metric.tone}>{metric.label}</StatusPill>
                        <p className="mt-5 text-4xl font-semibold text-ink">{metric.value}</p>
                        <p className="mt-4 text-sm leading-7 text-ink-2">{metric.note}</p>
                      </article>
                    </Reveal>
                  ))}
                </div>
              </div>

              <div className="mt-14 grid gap-14 lg:grid-cols-[minmax(0,1.16fr)_minmax(0,0.84fr)]">
                <Reveal>
                  <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface px-6 py-8 md:px-8">
                    <p className="text-xs font-medium uppercase tracking-[0.32em] text-ink-3">
                      Scenario Trajectory
                    </p>
                    <h3 className="mt-4 text-2xl font-semibold text-ink">
                      {irContent.vision.title}
                    </h3>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-ink-2">
                      {irContent.vision.description}
                    </p>
                    {VisionScenarioChart ? (
                      <VisionScenarioChart
                        data={irContent.vision.trajectory}
                        legend={irContent.vision.chartLegend}
                        units={irContent.vision.trajectoryFallback}
                      />
                    ) : (
                      <div className="mt-10 grid gap-4 sm:grid-cols-2">
                        {irContent.vision.trajectory.map((point) => (
                          <div
                            key={point.month}
                            className="rounded-2xl border border-line bg-panel px-4 py-4"
                          >
                            <p className="text-sm font-medium text-ink">{point.month}</p>
                            <p className="mt-3 text-xs text-ink-2">
                              {irContent.vision.trajectoryFallback.subscriberLabel}
                              {point.subscribers.toLocaleString()}
                              {irContent.vision.trajectoryFallback.subscriberUnit}
                            </p>
                            <p className="mt-1 text-xs text-ink-2">
                              {irContent.vision.trajectoryFallback.mrrLabel}
                              {point.mrr}
                              {irContent.vision.trajectoryFallback.mrrUnit}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </Reveal>

                <Reveal delay={0.08}>
                  <div className="space-y-5">
                    {irContent.vision.roadmap.map((item) => (
                      <article
                        key={item.phase}
                        className="rounded-[1.75rem] border border-line bg-surface px-5 py-5"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <p className="text-sm font-medium uppercase tracking-[0.22em] text-brand">
                            {item.phase}
                          </p>
                          <StatusPill tone={item.tone}>{item.statusLabel}</StatusPill>
                        </div>
                        <h3 className="mt-4 text-xl font-medium text-ink">{item.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-ink-2">{item.body}</p>
                      </article>
                    ))}
                  </div>

                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    {irContent.vision.statuses.map((status) => (
                      <article
                        key={status.label}
                        className="rounded-[1.5rem] border border-line bg-surface px-5 py-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="text-sm font-medium text-ink">{status.label}</h3>
                            <p className="mt-2 text-xs leading-6 text-ink-3">{status.note}</p>
                          </div>
                          <StatusPill tone={status.tone}>{status.value}</StatusPill>
                        </div>
                      </article>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          <section id="cta">
            <div className="mx-auto max-w-4xl px-6 py-20 lg:py-24">
              <Reveal>
                <div className="rounded-[2.25rem] border border-line bg-panel px-6 py-10 text-center md:px-10 md:py-14">
                  <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full border border-brand/30 bg-brand/10 text-brand">
                    <Mail className="h-6 w-6" />
                  </div>
                  <p className="mt-6 text-xs font-medium uppercase tracking-[0.32em] text-brand">
                    Contact
                  </p>
                  <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
                    {irContent.cta.title}
                  </h2>
                  <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-ink-2">
                    {irContent.cta.description}
                  </p>

                  <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                    <a
                      href={`mailto:${contactEmail}?subject=${encodeURIComponent(irContent.cta.emailSubject)}`}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-invert px-6 py-3 text-sm font-medium text-white"
                    >
                      {irContent.cta.primaryLabel}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                    <LocaleLink
                      to="/contact"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-medium text-ink"
                    >
                      {irContent.cta.secondaryLabel}
                    </LocaleLink>
                  </div>

                  <p className="mt-8 text-sm text-ink-3">{contactEmail}</p>
                  <p className="mx-auto mt-6 max-w-3xl text-xs leading-6 text-ink-3">
                    {irContent.cta.disclosure}
                  </p>
                </div>
              </Reveal>
            </div>
          </section>
      </article>
    </IrShell>
  );
}
