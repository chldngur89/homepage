import { Link } from "react-router";
import { motion } from "motion/react";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="bg-slate-950 min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center max-w-lg"
      >
        <div className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-cyan-400/30 to-indigo-500/30 bg-clip-text text-transparent mb-4">
          404
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="text-slate-400 mb-8">
          요청하신 주소가 잘못되었거나 페이지가 이동·삭제되었을 수 있습니다.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-xl font-semibold hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all"
          >
            <Home className="w-5 h-5" />
            홈으로
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-slate-600 rounded-xl font-semibold text-slate-300 hover:border-cyan-500 hover:text-cyan-400 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            이전 페이지
          </button>
        </div>
      </motion.div>
    </div>
  );
}
