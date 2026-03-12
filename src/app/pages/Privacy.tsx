import { Link } from "react-router";
import { motion } from "motion/react";
import { Shield } from "lucide-react";

export default function Privacy() {
  return (
    <div className="bg-slate-950 min-h-screen py-24">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-cyan-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">개인정보처리방침</h1>
          </div>
          <p className="text-slate-400">최종 업데이트: 2026년 3월</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="prose prose-invert prose-slate max-w-none space-y-6 text-slate-300"
        >
          <section>
            <h2 className="text-xl font-bold text-white mt-8 mb-4">1. 수집하는 개인정보</h2>
            <p>Auto C-Level AI는 서비스 이용·문의·IR 요청 시 아래 정보를 수집할 수 있습니다.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>필수: 이름, 이메일, 문의 내용</li>
              <li>선택: 전화번호, 회사명 (문의 유형에 따라)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mt-8 mb-4">2. 이용 목적</h2>
            <p>수집한 정보는 문의 응답, 서비스 안내, IR 미팅 및 파트너십 검토에만 사용됩니다.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mt-8 mb-4">3. 보관 기간</h2>
            <p>문의 및 IR 목적 달성 후 필요한 기간 동안 보관하며, 관계 법령에 따라 파기합니다.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mt-8 mb-4">4. 제3자 제공</h2>
            <p>원칙적으로 이용자의 동의 없이 제3자에게 제공하지 않습니다. 법령에 따른 경우에만 예외로 합니다.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mt-8 mb-4">5. 분석 도구</h2>
            <p>웹사이트 이용 통계 및 개선을 위해 Google Analytics 등 분석 도구를 사용할 수 있습니다. 수집 데이터는 익명화·집계에 활용될 수 있으며, 개인정보처리방침의 범위 내에서 운영됩니다.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mt-8 mb-4">6. 문의</h2>
            <p>개인정보 처리에 관한 문의는 문의하기 페이지를 통해 남겨 주시면 됩니다.</p>
          </section>
        </motion.div>

        <div className="mt-16 pt-8 border-t border-slate-800">
          <Link to="/" className="text-cyan-400 hover:text-cyan-300 font-medium">
            ← 홈으로
          </Link>
        </div>
      </div>
    </div>
  );
}
