import { Link } from "react-router";
import { APP_URLS } from "@/app/config/apps";
import { motion } from "motion/react";
import {
  ArrowRight,
  CheckCircle,
  MessageSquare,
  Sparkles,
  BarChart3,
  Rocket,
  ClipboardCheck,
} from "lucide-react";

const PRIMARY_CTA = "우리팀과 같이 성장하기";

const steps = [
  {
    title: "제안",
    body: "제품·채널 맥락을 보고, 이번 주 손대면 좋은 일을 짧게 정리합니다.",
    Icon: Sparkles,
  },
  {
    title: "승인",
    body: "대표님이 확인하고 이번 주 방향을 결정합니다.",
    Icon: ClipboardCheck,
  },
  {
    title: "실행",
    body: "결정된 일을 실제 실행으로 이어 갑니다.",
    Icon: Rocket,
  },
  {
    title: "반복 성장",
    body: "결과를 다음 제안에 반영해 성장 루프를 이어 갑니다.",
    Icon: BarChart3,
  },
];

export default function Solution() {
  return (
    <div className="bg-slate-950 min-h-screen py-24">
      <section className="max-w-4xl mx-auto px-6 mb-20 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-block px-4 py-1 rounded-full bg-cyan-900/30 text-cyan-400 font-semibold text-sm mb-6">
            솔루션
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            같이 성장하는
            <br />
            <span className="text-cyan-400">일하는 방식</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            전담 마케터 없는 1~10인 팀을 위해,
            제안 → 승인 → 실행 → 반복 성장 루프를 맡는 첫 번째 팀원입니다.
          </p>
        </motion.div>
      </section>

      <section className="max-w-5xl mx-auto px-6 mb-28">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            ChatGPT와 무엇이 다른가
          </h2>
          <p className="text-slate-400">초안을 받는 도구가 아니라, 승인·실행·반복 성장까지 이어지는 팀원입니다.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8"
          >
            <div className="flex items-center gap-2 text-slate-400 font-semibold mb-5">
              <MessageSquare size={18} />
              대화형 도구
            </div>
            <ul className="space-y-3 text-sm text-slate-300">
              <li>질문하면 초안을 줍니다</li>
              <li>실행은 다시 대표님 몫입니다</li>
              <li>다음에 뭘 할지 매번 처음부터 묻습니다</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-cyan-500/40 bg-cyan-950/20 p-8"
          >
            <div className="flex items-center gap-2 text-cyan-300 font-semibold mb-5">
              <CheckCircle size={18} />
              WooriTeam
            </div>
            <ul className="space-y-3 text-sm text-slate-200">
              <li>이번 주 할 일을 먼저 제안합니다</li>
              <li>승인 후 실행까지 이어 줍니다</li>
              <li>반복 성장으로 다음 주를 이어갑니다</li>
            </ul>
          </motion.div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 mb-28">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">한 사이클</h2>
          <p className="text-slate-400">매주 반복되는 성장 루프입니다.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s, i) => {
            const Icon = s.Icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6"
              >
                <Icon size={18} className="text-cyan-400 mb-3" />
                <h3 className="text-white font-bold mb-2">{s.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{s.body}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 mb-20">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-800 p-7 bg-slate-900/40">
            <h3 className="text-cyan-300 font-semibold mb-4">지금 다루는 일</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex gap-2"><CheckCircle size={16} className="text-cyan-400 shrink-0 mt-0.5" />주간 성장 과제 제안</li>
              <li className="flex gap-2"><CheckCircle size={16} className="text-cyan-400 shrink-0 mt-0.5" />승인으로 방향 결정</li>
              <li className="flex gap-2"><CheckCircle size={16} className="text-cyan-400 shrink-0 mt-0.5" />실행으로 이어가기</li>
              <li className="flex gap-2"><CheckCircle size={16} className="text-cyan-400 shrink-0 mt-0.5" />반복 성장</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-800 p-7 bg-slate-950">
            <h3 className="text-slate-400 font-semibold mb-4">이후 연결 (준비 중)</h3>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>· 채널 자동 게시</li>
              <li>· 경쟁·시장 모니터링</li>
              <li>· CEO / CFO 역할 연동</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 text-center pb-8">
        <h2 className="text-3xl font-bold text-white mb-6">첫 번째 팀원부터 시작해 보세요</h2>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={APP_URLS.cmo}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[48px] inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-full font-semibold"
          >
            {PRIMARY_CTA}
            <ArrowRight size={18} />
          </a>
          <Link
            to="/demo"
            className="min-h-[48px] inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-slate-700 font-semibold text-slate-200"
          >
            데모 보기
          </Link>
        </div>
      </section>
    </div>
  );
}
