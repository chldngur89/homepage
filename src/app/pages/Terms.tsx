import { Link } from "react-router";
import { motion } from "motion/react";
import { FileText } from "lucide-react";

export default function Terms() {
  return (
    <div className="bg-slate-950 min-h-screen py-24">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-indigo-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">이용약관</h1>
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
            <h2 className="text-xl font-bold text-white mt-8 mb-4">제1조 (목적)</h2>
            <p>본 약관은 Auto C-Level AI(이하 “서비스”)가 제공하는 AutoCMO 등 AI 마케팅 자동화 서비스의 이용 조건 및 절차, 이용자와의 권리·의무 관계를 규정함을 목적으로 합니다.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mt-8 mb-4">제2조 (서비스 내용)</h2>
            <p>서비스는 상품 사진 및 마켓 선택 기반의 AI 전략 리포트, 다채널 마케팅 자동화, 대시보드 등 Zero-Click Intelligence 관련 기능을 제공합니다. 구체적인 기능은 서비스 내 안내에 따릅니다.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mt-8 mb-4">제3조 (이용 계약)</h2>
            <p>이용 계약은 이용자가 서비스 가입·결제·이용 동의 절차를 완료한 시점에 성립합니다. 서비스는 필요한 경우 가입 승인을 거부하거나 사전 고지 후 서비스 내용을 변경할 수 있습니다.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mt-8 mb-4">제4조 (금지 행위)</h2>
            <p>이용자는 법령 및 약관을 위반하거나, 서비스 운영을 방해하거나, 타인의 정보를 부정 사용하는 행위를 하여서는 안 됩니다. 위반 시 서비스 이용 제한 및 법적 조치가 있을 수 있습니다.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mt-8 mb-4">제5조 (면책)</h2>
            <p>서비스는 이용자가 생성·업로드한 콘텐츠에 대한 책임은 이용자에게 있으며, 서비스는 관련 법령이 정하는 범위 내에서만 책임을 집니다.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mt-8 mb-4">제6조 (약관 변경)</h2>
            <p>서비스는 필요한 경우 약관을 변경할 수 있으며, 변경 시 서비스 내 공지 또는 이메일 등으로 안내합니다. 변경 후에도 이용을 계속하면 변경 약관에 동의한 것으로 봅니다.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mt-8 mb-4">제7조 (문의)</h2>
            <p>약관 및 서비스 이용에 관한 문의는 홈페이지 문의하기를 이용해 주세요.</p>
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
