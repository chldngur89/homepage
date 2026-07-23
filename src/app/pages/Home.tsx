import { Link } from "react-router";
import {
  ArrowRight,
  CheckCircle,
  MessageSquare,
  Users,
  Play,
  BarChart3,
  Sparkles,
  Rocket,
  ClipboardCheck,
} from "lucide-react";
import { APP_URLS } from "@/app/config/apps";
import { motion } from "motion/react";
import { useState, useEffect } from "react";

const PRIMARY_CTA = "우리팀과 같이 성장하기";

const workflow = [
  {
    step: "01",
    title: "제안",
    body: "이번 주 해야 할 성장 과제를 짧게 정리해 올립니다.",
    Icon: Sparkles,
  },
  {
    step: "02",
    title: "승인",
    body: "대표님이 확인하고 이번 주 방향을 결정합니다.",
    Icon: ClipboardCheck,
  },
  {
    step: "03",
    title: "실행",
    body: "결정된 일을 실제 실행으로 이어 갑니다.",
    Icon: Rocket,
  },
  {
    step: "04",
    title: "반복 성장",
    body: "결과를 다음 제안에 반영해 성장 루프를 이어 갑니다.",
    Icon: BarChart3,
  },
];

const comparisons = [
  {
    label: "ChatGPT · 콘텐츠 툴",
    points: [
      "질문하면 초안을 줍니다",
      "실행·게시는 대표님 몫입니다",
      "다음에 뭘 할지 다시 고민합니다",
    ],
  },
  {
    label: "WooriTeam",
    points: [
      "이번 주 할 일을 먼저 제안합니다",
      "승인 후 실행까지 이어 줍니다",
      "반복 성장으로 다음 주를 이어갑니다",
    ],
  },
];

export default function Home() {
  const [showStickyCta, setShowStickyCta] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowStickyCta(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bg-slate-950">
      <section
        aria-labelledby="home-hero-title"
        className="relative min-h-[92vh] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/25 via-slate-950 to-slate-950" />
        <div className="absolute top-24 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-16 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />

        <header className="relative max-w-4xl mx-auto px-6 py-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-900/40 text-cyan-300 font-medium text-sm mb-8 border border-cyan-500/25"
          >
            <Users size={15} />
            전담 마케터 없는 1~10인 팀을 위한
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="text-lg text-slate-400 font-medium mb-4"
          >
            <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent font-bold">
              WooriTeam
            </span>
          </motion.p>

          <motion.h1
            id="home-hero-title"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight text-white leading-[1.12]"
          >
            창업자의
            <br />
            <span className="text-cyan-400">첫 번째 팀</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto"
          >
            이번 주 할 일을 함께 정리하고,
            <br className="hidden sm:block" />
            <strong className="text-cyan-400">제안 → 승인 → 실행 → 반복 성장</strong>으로 이어 갑니다.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <a
              href={APP_URLS.cmo}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[48px] inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-full text-base font-semibold text-white hover:shadow-[0_0_28px_rgba(6,182,212,0.35)] transition-all"
            >
              {PRIMARY_CTA}
              <ArrowRight size={18} />
            </a>
            <Link
              to="/solution"
              className="min-h-[48px] inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-base font-semibold text-slate-200 border border-slate-700 hover:border-cyan-500/50 hover:text-white transition-all"
            >
              작동 방식 보기
            </Link>
          </motion.div>
        </header>
      </section>

      <section className="py-20 md:py-24 border-t border-slate-900" aria-labelledby="who-title">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-cyan-400 text-sm font-semibold mb-3 tracking-wide">누구를 위한가</p>
            <h2 id="who-title" className="text-3xl md:text-4xl font-bold text-white mb-4">
              마케터를 뽑기 전인 대표님
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
              제품은 있는데 SNS·랜딩·광고 문구를 매번 직접 챙기는 1~10인 초기 팀.
              WooriTeam은 그 자리를 채우는 첫 번째 팀원입니다.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { title: "전담 마케터가 없다", body: "대표·공동창업자가 콘텐츠와 채널을 직접 돌립니다." },
              { title: "툴은 많은데 손이 부족하다", body: "ChatGPT로 초안은 나와도, 실행 큐가 남지 않습니다." },
              { title: "외주는 아직 이르다", body: "매달 고정비보다, 이번 주 할 일부터 정리하고 싶습니다." },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6"
              >
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-slate-900/30" aria-labelledby="work-title">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-cyan-400 text-sm font-semibold mb-3 tracking-wide">같이 성장하기</p>
            <h2 id="work-title" className="text-3xl md:text-4xl font-bold text-white mb-4">
              첫 번째 팀원이 하는 일
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              막연한 자동화 약속이 아니라, 매주 반복되는 성장 루프입니다.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {workflow.map((item, i) => {
              const Icon = item.Icon;
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.06 }}
                  className="relative rounded-2xl border border-slate-800 bg-slate-950/80 p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-cyan-400/80">{item.step}</span>
                    <Icon size={18} className="text-cyan-400" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28" aria-labelledby="diff-title">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-cyan-400 text-sm font-semibold mb-3 tracking-wide">차이</p>
            <h2 id="diff-title" className="text-3xl md:text-4xl font-bold text-white mb-4">
              대화형 도구와, 팀원의 차이
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              초안을 받는 것과, 승인·실행·반복 성장까지 함께하는 것은 다릅니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {comparisons.map((col, idx) => (
              <div
                key={col.label}
                className={`rounded-2xl border p-7 ${
                  idx === 1
                    ? "border-cyan-500/40 bg-cyan-950/20"
                    : "border-slate-800 bg-slate-900/30"
                }`}
              >
                <div className="flex items-center gap-2 mb-5">
                  {idx === 0 ? (
                    <MessageSquare size={18} className="text-slate-400" />
                  ) : (
                    <CheckCircle size={18} className="text-cyan-400" />
                  )}
                  <h3
                    className={`font-bold ${idx === 1 ? "text-cyan-300" : "text-slate-300"}`}
                  >
                    {col.label}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {col.points.map((p) => (
                    <li key={p} className="flex gap-2 text-sm text-slate-300 leading-relaxed">
                      <span className={idx === 1 ? "text-cyan-400" : "text-slate-600"}>•</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-slate-900/30 border-y border-slate-900" aria-labelledby="scope-title">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 id="scope-title" className="text-3xl md:text-4xl font-bold text-white mb-4">
              지금은 이만큼부터
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              모든 마케팅을 한 번에 맡기지 않습니다. 첫 역할에 집중합니다.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-7">
              <h3 className="text-cyan-300 font-semibold mb-4">지금 시작하는 일</h3>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex gap-2"><CheckCircle size={16} className="text-cyan-400 shrink-0 mt-0.5" />주간 성장 과제 제안</li>
                <li className="flex gap-2"><CheckCircle size={16} className="text-cyan-400 shrink-0 mt-0.5" />승인으로 방향 결정</li>
                <li className="flex gap-2"><CheckCircle size={16} className="text-cyan-400 shrink-0 mt-0.5" />실행으로 이어가기</li>
                <li className="flex gap-2"><CheckCircle size={16} className="text-cyan-400 shrink-0 mt-0.5" />반복 성장 루프</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-7">
              <h3 className="text-slate-400 font-semibold mb-4">이후 확장 (준비·연결 중)</h3>
              <ul className="space-y-3 text-sm text-slate-500">
                <li>· 채널별 자동 게시 연결</li>
                <li>· 경쟁 시장 모니터링</li>
                <li>· CFO·CEO 역할 연동</li>
              </ul>
              <p className="mt-5 text-xs text-slate-600 leading-relaxed">
                데모는 시뮬레이션입니다. 실제 실행은 WooriTeam 앱에서 이어집니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-28" aria-labelledby="cta-title">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 id="cta-title" className="text-3xl md:text-5xl font-bold text-white mb-5">
            첫 번째 팀원을
            <br />
            <span className="text-cyan-400">만나보세요</span>
          </h2>
          <p className="text-slate-400 text-lg mb-10">
            이번 주 할 일부터 함께 정리해 드립니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={APP_URLS.cmo}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[48px] inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-full text-base font-semibold text-white hover:shadow-[0_0_28px_rgba(6,182,212,0.35)] transition-all"
            >
              {PRIMARY_CTA}
              <ArrowRight size={18} />
            </a>
            <Link
              to="/demo"
              className="min-h-[48px] inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-base font-semibold text-slate-200 border border-slate-700 hover:border-cyan-500/50 transition-all"
            >
              <Play size={16} />
              데모 보기
            </Link>
          </div>
        </div>
      </section>

      {showStickyCta && (
        <div className="md:hidden fixed bottom-0 inset-x-0 z-40 p-3 bg-slate-950/95 border-t border-slate-800 backdrop-blur-lg">
          <div className="flex gap-2">
            <a
              href={APP_URLS.cmo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-h-[48px] inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 text-sm font-semibold"
            >
              {PRIMARY_CTA}
            </a>
            <Link
              to="/contact"
              className="min-h-[48px] px-4 inline-flex items-center justify-center rounded-full border border-slate-700 text-sm font-medium text-slate-300"
            >
              문의
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
