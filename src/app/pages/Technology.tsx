import { motion } from "motion/react";
import { Link } from "react-router";
import { Workflow, Layers, Sparkles, ArrowRight, ClipboardCheck } from "lucide-react";
import { APP_URLS } from "@/app/config/apps";

const layers = [
  {
    phase: "01",
    title: "제안",
    body: "제품·채널 맥락을 바탕으로 이번 주 성장 과제를 정리합니다.",
    Icon: Sparkles,
  },
  {
    phase: "02",
    title: "승인",
    body: "대표님이 확인하고 이번 주 방향을 결정합니다.",
    Icon: ClipboardCheck,
  },
  {
    phase: "03",
    title: "실행",
    body: "결정된 일을 실제 실행으로 이어 갑니다.",
    Icon: Workflow,
  },
  {
    phase: "04",
    title: "반복 성장",
    body: "결과를 다음 제안에 반영해 성장 루프를 이어 갑니다.",
    Icon: Layers,
  },
];

export default function Technology() {
  return (
    <div className="bg-slate-950 min-h-screen py-24">
      <section className="max-w-4xl mx-auto px-6 mb-20 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-block px-4 py-1 rounded-full bg-indigo-900/30 text-indigo-300 font-semibold text-sm mb-6">
            기술
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            같이 성장하는
            <br />
            <span className="text-indigo-400">성장 파이프라인</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            WooriTeam은 ‘더 많은 모델’보다,
            이번 주 할 일부터 반복 성장까지 이어지는 흐름을 우선합니다.
          </p>
        </motion.div>
      </section>

      <section className="max-w-5xl mx-auto px-6 mb-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {layers.map((item, i) => {
            const Icon = item.Icon;
            return (
              <motion.div
                key={item.phase}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl border border-slate-800 bg-slate-900/40 p-7"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-indigo-300">{item.phase}</span>
                  <Icon size={18} className="text-indigo-300" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.body}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 mb-24 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">설계 원칙</h2>
        <ul className="text-left space-y-4 text-slate-300 max-w-xl mx-auto">
          <li className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <strong className="text-white">주간 루프</strong>
            <p className="text-sm text-slate-400 mt-1">제안 → 승인 → 실행 → 반복 성장을 한 사이클로 묶습니다.</p>
          </li>
          <li className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <strong className="text-white">역할 단위 확장</strong>
            <p className="text-sm text-slate-400 mt-1">같이 성장하기를 시작으로 CEO·CFO 역할을 필요할 때 붙입니다.</p>
          </li>
          <li className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <strong className="text-white">과장하지 않는 연동</strong>
            <p className="text-sm text-slate-400 mt-1">채널 자동 게시 등은 준비·연결 중인 영역으로 표시합니다.</p>
          </li>
        </ul>
      </section>

      <section className="max-w-3xl mx-auto px-6 text-center">
        <p className="text-slate-400 mb-6">구조보다 먼저, 첫 팀원의 일을 경험해 보세요.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={APP_URLS.cmo}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[48px] inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-full font-semibold"
          >
            우리팀과 같이 성장하기
            <ArrowRight size={18} />
          </a>
          <Link
            to="/solution"
            className="min-h-[48px] inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-slate-700 font-semibold text-slate-200"
          >
            솔루션 보기
          </Link>
        </div>
      </section>
    </div>
  );
}
