import { Link } from "react-router";
import { APP_URLS } from "@/app/config/apps";
import { motion } from "motion/react";
import { Target, Lightbulb, ArrowRight, Users } from "lucide-react";

const PRIMARY_CTA = "우리팀과 같이 성장하기";

export default function About() {
  return (
    <div className="bg-slate-950 min-h-screen py-24">
      <section className="max-w-4xl mx-auto px-6 mb-20 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-block px-4 py-1 rounded-full bg-indigo-900/30 text-indigo-300 font-semibold text-sm mb-6">
            회사소개
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            초기 창업팀에
            <br />
            <span className="text-cyan-400">첫 번째 팀원</span>을
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            WooriTeam은 전담 마케터 없는 1~10인 대표가
            혼자 성장 과제를 붙잡지 않도록 돕습니다.
          </p>
        </motion.div>
      </section>

      <section className="max-w-5xl mx-auto px-6 mb-24">
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-cyan-500/30 bg-cyan-950/20 p-8"
          >
            <Target className="w-8 h-8 text-cyan-400 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-3">Mission</h2>
            <p className="text-slate-300 leading-relaxed">
              전담 마케터를 채용하기 전인 팀에,
              같이 성장하는 첫 번째 팀원을 제공합니다.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-indigo-500/30 bg-indigo-950/20 p-8"
          >
            <Lightbulb className="w-8 h-8 text-indigo-300 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-3">Vision</h2>
            <p className="text-slate-300 leading-relaxed">
              대화형 도구를 넘어, 역할별로 붙일 수 있는 팀을 만듭니다.
              대표님은 방향에 집중하고, 팀원은 제안·승인·실행·반복 성장을 맡습니다.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 mb-24">
        <div className="text-center mb-8">
          <Users className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
          <h2 className="text-3xl font-bold text-white">왜 만들었나</h2>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8 md:p-10 space-y-5 text-slate-300 leading-relaxed">
          <p>
            초기 창업팀은 ChatGPT로 카피를 쓰고, 여러 툴로 이미지를 만든 뒤에도
            “그래서 이번 주에 뭘 하지?”를 다시 혼자 결정합니다.
          </p>
          <p>
            WooriTeam은 그 공백을 <strong className="text-white">같이 성장하기</strong>로 채웁니다.
            이번 주 할 일부터 승인·실행·반복 성장까지 함께합니다.
          </p>
          <p className="text-sm text-slate-500">
            채널 자동 게시·추가 역할은 준비·연결 중이며, 사실처럼 단정하지 않습니다.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 mb-24">
        <h2 className="text-3xl font-bold text-white text-center mb-10">로드맵 (예정)</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { phase: "Phase 1", title: "같이 성장하기 실증", body: "제안 → 승인 → 실행 → 반복 성장 루프를 초기 창업팀과 검증합니다." },
            { phase: "Phase 2", title: "성장 루프 고도화", body: "대표가 빠르게 이번 주를 정리할 수 있게 다듬습니다." },
            { phase: "Phase 3", title: "역할 확장", body: "CEO·CFO 등 필요한 역할을 팀처럼 이어 붙입니다." },
          ].map((r) => (
            <div key={r.phase} className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
              <p className="text-xs text-cyan-400 font-mono mb-2">{r.phase} · 예정</p>
              <h3 className="text-white font-bold mb-2">{r.title}</h3>
              <p className="text-sm text-slate-400">{r.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">함께 이야기해요</h2>
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
            to="/contact"
            className="min-h-[48px] inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-slate-700 font-semibold text-slate-200"
          >
            문의·IR 요청
          </Link>
        </div>
      </section>
    </div>
  );
}
