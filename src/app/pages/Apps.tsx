import { motion } from "motion/react";
import { ArrowRight, Zap, BarChart3, BookOpen } from "lucide-react";
import { APPS } from "@/app/config/apps";

const iconByAppId: Record<string, React.ReactNode> = {
  cmo: <Zap className="w-8 h-8 text-white" />,
  "cfo-tool": <BarChart3 className="w-8 h-8 text-white" />,
  "ceo-rader": <BookOpen className="w-8 h-8 text-white" />,
};

export default function Apps() {
  return (
    <div className="bg-slate-950 min-h-screen py-24">
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-block px-4 py-1 rounded-full bg-cyan-900/30 text-cyan-400 font-semibold text-sm mb-6">
            내가 만든 앱
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-cyan-400">AutoCMO</span>와 함께 쓰는 AI 도구
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            CMO AI Agent, CFO Tool, CEO Rader를 웹에서 바로 사용하거나 새 탭에서 열어보세요.
          </p>
        </motion.div>
      </section>

      <section className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {APPS.map((app, index) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800/30 backdrop-blur-xl border border-slate-700 rounded-2xl p-8 hover:border-cyan-500/50 transition-all flex flex-col"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
                {iconByAppId[app.id] ?? <Zap className="w-8 h-8 text-white" />}
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{app.name}</h2>
              <p className="text-slate-400 text-sm mb-6 flex-1">{app.description}</p>
              <a
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 px-6 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] rounded-xl font-semibold transition-all"
              >
                바로 사용하기
                <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-slate-500 text-sm mt-10"
        >
          모든 앱은 브라우저에서 바로 사용 가능합니다. 클릭 시 새 탭에서 열립니다.
        </motion.p>
      </section>
    </div>
  );
}
