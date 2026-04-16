import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  ChevronLeft,
  Mail,
  ShieldCheck,
  Sparkles,
  Target,
  Workflow,
} from "lucide-react";
import {
  irContent,
  type IrStatusTone,
} from "@/content/ir";
import siteContent from "@/content/site.json";

const siteData = siteContent as {
  contactEmail?: string;
  footer?: { copyright?: string };
  siteName?: string;
};

const siteName = siteData.siteName ?? "Auto C-Level AI";
const contactEmail = siteData.contactEmail ?? "chldngur89@gmail.com";
const copyright = siteData.footer?.copyright ?? "© 2026 Auto C-Level AI. All rights reserved.";

const deckNav = [
  { href: "#problem", label: "Problem" },
  { href: "#market", label: "Market" },
  { href: "#solution", label: "Solution" },
  { href: "#economics", label: "Economics" },
  { href: "#cta", label: "Contact" },
] as const;

const heroWorkflowLayout = [
  "left-[5%] top-[10%] max-w-[12rem] text-left",
  "right-[1%] top-[31%] max-w-[13rem] text-right",
  "left-[12%] bottom-[34%] max-w-[13.5rem] text-left",
] as const;

const toneStyles: Record<IrStatusTone, string> = {
  estimate: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  goal: "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
  planned: "border-blue-400/30 bg-blue-400/10 text-blue-200",
  under_review: "border-fuchsia-400/30 bg-fuchsia-400/10 text-fuchsia-200",
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
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.48, delay }}
      className={className}
    >
      {children}
    </motion.div>
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
      <p className="text-xs font-medium uppercase tracking-[0.32em] text-cyan-300/80">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-8 text-slate-300 md:text-lg">
        {description}
      </p>
    </div>
  );
}

export default function IR() {
  const charts = useIrCharts();
  const ExecutionGapChart = charts?.ExecutionGapChart;
  const AdvantageRadarChart = charts?.AdvantageRadarChart;
  const VisionScenarioChart = charts?.VisionScenarioChart;

  return (
    <div className="bg-slate-950 text-slate-100">
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at top, rgba(34, 211, 238, 0.12), transparent 35%), radial-gradient(circle at 80% 10%, rgba(129, 140, 248, 0.16), transparent 28%), linear-gradient(180deg, #020617 0%, #020617 52%, #0f172a 100%)",
        }}
      />

      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 text-sm font-semibold text-cyan-200">
              AI
            </span>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-slate-500">
                {siteName}
              </p>
              <p className="text-sm font-medium text-white">Investor Overview</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-slate-400 lg:flex">
            {deckNav.map((item) => (
              <a key={item.href} href={item.href} className="transition-colors hover:text-white">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="hidden items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition-colors hover:border-cyan-400/30 hover:text-white sm:inline-flex"
            >
              <ChevronLeft className="h-4 w-4" />
              사이트로
            </Link>
            <a
              href="#cta"
              className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-4 py-2 text-sm font-medium text-slate-950 transition-colors hover:bg-cyan-300"
            >
              IR 요청
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      <main id="ir-top" className="pt-20">
        <article>
          <section className="relative overflow-hidden border-b border-white/10">
            <div className="mx-auto grid max-w-7xl gap-14 px-6 pb-20 pt-14 lg:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)] lg:pb-24 lg:pt-20">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.52 }}
                className="relative z-10 max-w-3xl"
              >
                <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.32em] text-cyan-200">
                  {irContent.hero.badge}
                </span>
                <p className="mt-8 text-xs font-medium uppercase tracking-[0.38em] text-slate-500">
                  Execution Gap to Marketing OS
                </p>
                <h1 className="mt-5 max-w-[13ch] whitespace-pre-line break-keep text-[2.35rem] font-semibold tracking-[-0.04em] text-white leading-[1.08] sm:text-[2.7rem] md:max-w-[14ch] md:text-[3.45rem] xl:text-[3.95rem] xl:leading-[1.04]">
                  {irContent.hero.title}
                </h1>
                <p className="mt-8 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                  {irContent.hero.description}
                </p>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-500">
                  {irContent.hero.note}
                </p>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <a
                    href={`mailto:${contactEmail}?subject=${encodeURIComponent(irContent.cta.emailSubject)}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-slate-950 transition-colors hover:bg-slate-200"
                  >
                    {irContent.cta.primaryLabel}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-cyan-400/30 hover:bg-white/5"
                  >
                    {irContent.cta.secondaryLabel}
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.52, delay: 0.12 }}
                className="relative z-10"
              >
                <div className="relative mx-auto min-h-[40rem] max-w-[35rem]">
                  <div
                    className="absolute inset-0 rounded-[2.5rem]"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at center, rgba(34, 211, 238, 0.14), transparent 58%), radial-gradient(circle at 65% 30%, rgba(129, 140, 248, 0.18), transparent 28%)",
                    }}
                  />
                  <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/20" />
                  <div className="absolute left-1/2 top-1/2 h-[21rem] w-[21rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
                  <div className="absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />

                  {irContent.hero.workflow.map((step, index) => (
                    <div
                      key={step.title}
                      className={`absolute ${heroWorkflowLayout[index]} rounded-3xl border border-white/10 bg-white/[0.06] px-5 py-4 backdrop-blur-sm`}
                    >
                      <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-cyan-200/80">
                        {step.title}
                      </p>
                      <p className="mt-3 text-sm leading-6 text-slate-200">{step.body}</p>
                    </div>
                  ))}

                  <div className="absolute inset-x-0 top-[16%] flex justify-center">
                    <div className="text-center">
                      <p className="text-[11px] font-medium uppercase tracking-[0.38em] text-cyan-200/70">
                        Marketing OS
                      </p>
                      <p className="mt-4 text-4xl font-semibold leading-none text-white md:text-[3.45rem]">
                        Generate
                      </p>
                      <p className="mt-2 text-4xl font-semibold leading-none text-white md:text-[3.45rem]">
                        Deploy
                      </p>
                      <p className="mt-2 text-4xl font-semibold leading-none text-white md:text-[3.45rem]">
                        Report
                      </p>
                    </div>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 grid gap-3 border-t border-white/10 px-4 pb-5 pt-6 sm:grid-cols-2">
                    {irContent.hero.signals.map((signal) => (
                      <div key={signal.label} className="rounded-2xl bg-white/[0.03] px-4 py-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-medium text-white">{signal.label}</p>
                            <p className="mt-1 text-xs leading-5 text-slate-500">{signal.note}</p>
                          </div>
                          <StatusPill tone={signal.tone}>{signal.value}</StatusPill>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          <section id="problem" className="border-b border-white/10">
            <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
              <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.94fr)]">
                <Reveal>
                  <SectionIntro
                    eyebrow="Problem"
                    title={irContent.executionGap.title}
                    description={irContent.executionGap.description}
                  />

                  <div className="mt-10 space-y-6 text-base leading-8 text-slate-300">
                    {irContent.executionGap.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  <div className="mt-10 space-y-4">
                    {irContent.executionGap.points.map((point, index) => (
                      <article
                        key={point.title}
                        className="border-l border-white/10 pl-5"
                      >
                        <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-500">
                          0{index + 1}
                        </p>
                        <h3 className="mt-2 text-lg font-medium text-white">{point.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-slate-400">{point.body}</p>
                      </article>
                    ))}
                  </div>
                </Reveal>

                <Reveal delay={0.08}>
                  <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] px-6 py-8 md:px-8">
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-32"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at top, rgba(251, 113, 133, 0.18), transparent 62%)",
                      }}
                    />
                    <p className="relative text-xs font-medium uppercase tracking-[0.32em] text-slate-500">
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
                                "conic-gradient(#fb7185 0deg 324deg, #38bdf8 324deg 360deg)",
                            }}
                          >
                            <div className="absolute inset-[3.25rem] rounded-full bg-slate-950/95" />
                          </div>
                        </div>
                      )}

                      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                        <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-rose-200/80">
                          Manual
                        </p>
                        <p className="mt-3 text-5xl font-semibold text-white">90%</p>
                        <p className="mt-3 max-w-[11rem] text-center text-sm leading-6 text-slate-400">
                          운영 시간이 수작업에 묶인 상태를 가정한 비교
                        </p>
                      </div>
                    </div>

                    <p className="relative mt-8 text-sm leading-7 text-slate-400">
                      생성 툴만으로는 전략 시간이 늘어나지 않습니다. 핵심은 생성 이후의
                      등록, 배포, 리포팅 과정을 자동화해 창업가의 시간을 다시 확보하는
                      것입니다.
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          <section id="market" className="border-b border-white/10 bg-slate-900/30">
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
                      const gradientClass =
                        level.stage === "TAM"
                          ? "from-slate-900 via-indigo-500/20 to-cyan-300/20"
                          : level.stage === "SAM"
                            ? "from-slate-900 via-cyan-400/18 to-cyan-200/12"
                            : "from-slate-900 via-fuchsia-500/18 to-fuchsia-300/14";

                      return (
                        <article
                          key={level.stage}
                          style={{ width: `${width}%` }}
                          className={`relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-r ${gradientClass} px-6 py-7 sm:px-8`}
                        >
                          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                            <div>
                              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/70">
                                {level.stage}
                              </p>
                              <h3 className="mt-3 text-3xl font-semibold text-white">
                                {level.value}
                              </h3>
                            </div>
                            <StatusPill tone={level.tone}>{level.note}</StatusPill>
                          </div>
                          <p className="mt-6 max-w-xl text-sm leading-7 text-slate-300">
                            {level.description}
                          </p>
                        </article>
                      );
                    })}
                  </div>
                  <p className="mt-6 text-center text-sm leading-7 text-slate-500">
                    {irContent.market.note}
                  </p>
                </Reveal>

                <Reveal delay={0.08} className="flex h-full flex-col justify-between">
                  <div className="space-y-8">
                    <div className="border-t border-white/10 pt-6">
                      <p className="text-xs font-medium uppercase tracking-[0.32em] text-cyan-300/80">
                        Why This Segment
                      </p>
                      <p className="mt-4 text-lg leading-8 text-slate-200">
                        첫 번째 진입 시장은 마케팅 전담 인력이 없고, 업로드와 운영을 혼자
                        처리해야 하는 초기 셀러입니다.
                      </p>
                    </div>
                    <div className="border-t border-white/10 pt-6">
                      <p className="text-xs font-medium uppercase tracking-[0.32em] text-cyan-300/80">
                        Lock-in
                      </p>
                      <h3 className="mt-4 text-2xl font-semibold text-white">
                        {irContent.market.lockIn.title}
                      </h3>
                      <p className="mt-4 text-base leading-8 text-slate-300">
                        {irContent.market.lockIn.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          <section id="solution" className="border-b border-white/10">
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
                  <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] px-6 py-8 md:px-8">
                    <div className="flex items-center gap-3 text-cyan-200">
                      <Workflow className="h-5 w-5" />
                      <p className="text-xs font-medium uppercase tracking-[0.32em] text-cyan-200/80">
                        Pipeline
                      </p>
                    </div>
                    <div className="mt-8 grid gap-5 md:grid-cols-5">
                      {irContent.solution.pipeline.map((step, index) => (
                        <article key={step.title} className="relative">
                          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-slate-500">
                            Step 0{index + 1}
                          </p>
                          <h3 className="mt-3 text-lg font-medium text-white">{step.title}</h3>
                          <p className="mt-3 text-sm leading-7 text-slate-400">{step.body}</p>
                          {index < irContent.solution.pipeline.length - 1 ? (
                            <div className="mt-4 hidden items-center gap-2 text-cyan-300/50 md:flex">
                              <div className="h-px flex-1 bg-cyan-300/20" />
                              <ArrowRight className="h-4 w-4" />
                            </div>
                          ) : null}
                        </article>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>

              <div className="mt-14 grid gap-8 border-t border-white/10 pt-10 md:grid-cols-3 md:gap-0">
                {irContent.solution.pillars.map((pillar, index) => (
                  <Reveal
                    key={pillar.title}
                    delay={index * 0.05}
                    className={`${index > 0 ? "md:border-l md:border-white/10 md:pl-8" : "md:pr-8"}`}
                  >
                    <article className="h-full">
                      <div className="flex items-center gap-3 text-white">
                        {index === 0 ? (
                          <ShieldCheck className="h-5 w-5 text-cyan-300" />
                        ) : index === 1 ? (
                          <Sparkles className="h-5 w-5 text-cyan-300" />
                        ) : (
                          <Target className="h-5 w-5 text-cyan-300" />
                        )}
                        <h3 className="text-xl font-medium">{pillar.title}</h3>
                      </div>
                      <p className="mt-4 text-sm leading-7 text-slate-400">{pillar.body}</p>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section className="border-b border-white/10 bg-slate-900/35">
            <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
              <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)]">
                <Reveal>
                  <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] px-6 py-8 md:px-8">
                    <p className="text-xs font-medium uppercase tracking-[0.32em] text-slate-500">
                      Relative Capability Map
                    </p>
                    {AdvantageRadarChart ? (
                      <AdvantageRadarChart data={irContent.advantage.chart} />
                    ) : (
                      <div className="mt-8 grid gap-4 sm:grid-cols-2">
                        {irContent.advantage.chart.map((point) => (
                          <div
                            key={point.subject}
                            className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-4"
                          >
                            <p className="text-sm font-medium text-white">{point.subject}</p>
                            <div className="mt-3 space-y-2 text-xs text-slate-400">
                              <div className="flex items-center justify-between">
                                <span>Marketing OS</span>
                                <span>{point.autocmo}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span>단일 AI 툴</span>
                                <span>{point.aiTool}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span>디자인 템플릿 툴</span>
                                <span>{point.designTool}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    <p className="mt-6 text-sm leading-7 text-slate-500">
                      기능 범주별 상대 비교를 돕기 위한 정성 점수입니다. 핵심은 생성
                      기능 자체보다 생성 이후 운영 공백을 어떻게 줄이는가에 있습니다.
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
                        className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] px-5 py-5"
                      >
                        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-slate-500">
                          0{index + 1}
                        </p>
                        <h3 className="mt-3 text-xl font-medium text-white">{point.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-slate-400">{point.body}</p>
                      </article>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          <section id="economics" className="border-b border-white/10">
            <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
              <Reveal>
                <SectionIntro
                  eyebrow="Economics & Vision"
                  title={irContent.economics.title}
                  description={irContent.economics.description}
                />
              </Reveal>

              <div className="mt-14 overflow-hidden rounded-[2rem] border border-white/10">
                <div className="grid md:grid-cols-3">
                  {irContent.economics.metrics.map((metric, index) => (
                    <Reveal
                      key={metric.label}
                      delay={index * 0.05}
                      className={`${index > 0 ? "border-t border-white/10 md:border-l md:border-t-0" : ""}`}
                    >
                      <article className="bg-white/[0.03] px-6 py-8 md:px-8">
                        <StatusPill tone={metric.tone}>{metric.label}</StatusPill>
                        <p className="mt-5 text-4xl font-semibold text-white">{metric.value}</p>
                        <p className="mt-4 text-sm leading-7 text-slate-400">{metric.note}</p>
                      </article>
                    </Reveal>
                  ))}
                </div>
              </div>

              <div className="mt-14 grid gap-14 lg:grid-cols-[minmax(0,1.16fr)_minmax(0,0.84fr)]">
                <Reveal>
                  <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] px-6 py-8 md:px-8">
                    <p className="text-xs font-medium uppercase tracking-[0.32em] text-slate-500">
                      Scenario Trajectory
                    </p>
                    <h3 className="mt-4 text-2xl font-semibold text-white">
                      {irContent.vision.title}
                    </h3>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
                      {irContent.vision.description}
                    </p>
                    {VisionScenarioChart ? (
                      <VisionScenarioChart data={irContent.vision.trajectory} />
                    ) : (
                      <div className="mt-10 grid gap-4 sm:grid-cols-2">
                        {irContent.vision.trajectory.map((point) => (
                          <div
                            key={point.month}
                            className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-4"
                          >
                            <p className="text-sm font-medium text-white">{point.month}</p>
                            <p className="mt-3 text-xs text-slate-400">
                              유료 구독자 {point.subscribers.toLocaleString()}명
                            </p>
                            <p className="mt-1 text-xs text-slate-400">
                              MRR {point.mrr}백만원
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
                        className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] px-5 py-5"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <p className="text-sm font-medium uppercase tracking-[0.22em] text-cyan-200/80">
                            {item.phase}
                          </p>
                          <StatusPill tone={item.tone}>
                            {item.tone === "under_review" ? "검토" : "예정"}
                          </StatusPill>
                        </div>
                        <h3 className="mt-4 text-xl font-medium text-white">{item.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-slate-400">{item.body}</p>
                      </article>
                    ))}
                  </div>

                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    {irContent.vision.statuses.map((status) => (
                      <article
                        key={status.label}
                        className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] px-5 py-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="text-sm font-medium text-white">{status.label}</h3>
                            <p className="mt-2 text-xs leading-6 text-slate-500">{status.note}</p>
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
                <div
                  className="rounded-[2.25rem] border border-white/10 px-6 py-10 text-center md:px-10 md:py-14"
                  style={{
                    backgroundImage:
                      "linear-gradient(180deg, rgba(34, 211, 238, 0.08), rgba(2, 6, 23, 0.2))",
                  }}
                >
                  <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-200">
                    <Mail className="h-6 w-6" />
                  </div>
                  <p className="mt-6 text-xs font-medium uppercase tracking-[0.32em] text-cyan-200/80">
                    Contact
                  </p>
                  <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                    {irContent.cta.title}
                  </h2>
                  <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300">
                    {irContent.cta.description}
                  </p>

                  <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                    <a
                      href={`mailto:${contactEmail}?subject=${encodeURIComponent(irContent.cta.emailSubject)}`}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-slate-950 transition-colors hover:bg-slate-200"
                    >
                      {irContent.cta.primaryLabel}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-cyan-400/30 hover:bg-white/5"
                    >
                      {irContent.cta.secondaryLabel}
                    </Link>
                  </div>

                  <p className="mt-8 text-sm text-slate-500">{contactEmail}</p>
                  <p className="mx-auto mt-6 max-w-3xl text-xs leading-6 text-slate-500">
                    {irContent.cta.disclosure}
                  </p>
                </div>
              </Reveal>
            </div>
          </section>
        </article>
      </main>

      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>{copyright}</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/" className="transition-colors hover:text-white">
              사이트 홈
            </Link>
            <a href={`mailto:${contactEmail}`} className="transition-colors hover:text-white">
              {contactEmail}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
