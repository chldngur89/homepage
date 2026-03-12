import { motion } from "motion/react";
import { Check, Zap, Crown, Rocket } from "lucide-react";
import { Link } from "react-router";
import { APP_URLS } from "@/app/config/apps";

export default function Pricing() {
  return (
    <div className="bg-slate-950 min-h-screen py-24">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1 rounded-full bg-yellow-900/30 text-yellow-400 font-semibold text-sm mb-6">
            요금제
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            성장에 맞는 <span className="text-yellow-400">합리적인 가격</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            사용한 만큼만 지불하거나, 월정액으로 무제한 활용하세요
          </p>
        </motion.div>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-800/30 backdrop-blur-xl border border-slate-700 rounded-2xl p-8 hover:border-slate-600 transition-all"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-slate-300" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">무료 체험</h3>
                <p className="text-sm text-slate-400">시작하기 좋은</p>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-4xl font-bold text-white mb-2">₩0</div>
              <div className="text-slate-400">첫 3회 무료</div>
            </div>

            <ul className="space-y-4 mb-8">
              {[
                "3회 무료 마케팅 패키지 생성",
                "기본 AI 카피라이팅",
                "기본 이미지 생성",
                "2개 마켓 업로드",
                "이메일 지원",
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300">
                  <Check className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <a
              href={APP_URLS.cmo}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 px-6 text-center bg-slate-700 hover:bg-slate-600 rounded-xl font-semibold transition-colors"
            >
              AI 마케팅 총괄(CMO) 임명하기
            </a>
          </motion.div>

          {/* Pro Plan - Most Popular */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative bg-gradient-to-br from-cyan-900/30 to-indigo-900/30 backdrop-blur-xl border-2 border-cyan-500 rounded-2xl p-8 shadow-[0_0_50px_rgba(6,182,212,0.2)] scale-105"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-full text-sm font-bold">
              가장 인기있는
            </div>

            <div className="flex items-center gap-3 mb-6 mt-2">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">프로</h3>
                <p className="text-sm text-cyan-400">창업가·판매자를 위한</p>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-4xl font-bold text-white mb-2">₩49,000</div>
              <div className="text-slate-400">월 / 무제한 사용</div>
            </div>

            <ul className="space-y-4 mb-8">
              {[
                "무제한 마케팅 패키지 생성",
                "고급 AI 카피라이팅 (GPT-4o)",
                "프리미엄 이미지 생성",
                "숏폼 영상 제작 (월 30개)",
                "전체 마켓 업로드 (10+)",
                "AI 전략 리포트 대시보드",
                "우선 이메일/채팅 지원",
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300">
                  <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <a
              href={APP_URLS.cmo}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 px-6 text-center bg-gradient-to-r from-cyan-500 to-indigo-600 hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] rounded-xl font-semibold transition-all"
            >
              CMO 임명하기
            </a>
          </motion.div>

          {/* Business Plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-slate-800/30 backdrop-blur-xl border border-slate-700 rounded-2xl p-8 hover:border-indigo-500/50 transition-all"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-pink-600 rounded-xl flex items-center justify-center">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">비즈니스</h3>
                <p className="text-sm text-slate-400">팀/브랜드를 위한</p>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-4xl font-bold text-white mb-2">₩149,000</div>
              <div className="text-slate-400">월 / 팀 5명까지</div>
            </div>

            <ul className="space-y-4 mb-8">
              {[
                "프로 플랜의 모든 기능",
                "무제한 숏폼 영상 제작",
                "AI 트렌드 분석 & 추천",
                "브랜드 커스터마이징",
                "팀 협업 기능",
                "API 접근 권한",
                "전담 계정 매니저",
                "24/7 전화 지원",
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300">
                  <Check className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/contact"
              className="block w-full py-3 px-6 text-center bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold transition-colors"
            >
              문의하기
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Pay-per-Use Option */}
      <section className="max-w-5xl mx-auto px-6 mb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-pink-900/20 to-slate-900/50 border border-pink-500/30 rounded-2xl p-10"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-4">
              건별 과금 옵션
            </h3>
            <p className="text-lg text-slate-400">
              월정액이 부담스럽다면 사용한 만큼만 지불하세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <div className="text-cyan-400 font-bold mb-2">기본 패키지</div>
              <div className="text-3xl font-bold text-white mb-3">₩10,000</div>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" />
                  AI 카피 + 이미지 생성
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" />
                  5개 마켓 업로드
                </li>
              </ul>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <div className="text-pink-400 font-bold mb-2">프리미엄 패키지</div>
              <div className="text-3xl font-bold text-white mb-3">₩15,000</div>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-pink-400" />
                  기본 패키지 + 숏폼 영상
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-pink-400" />
                  10+ 마켓 업로드
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <a
              href={APP_URLS.cmo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-pink-600 hover:bg-pink-500 rounded-xl font-semibold transition-colors"
            >
              건별 구매 시작하기
            </a>
          </div>
        </motion.div>
      </section>

      {/* Revenue Share Model */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            성공 기반 <span className="text-green-400">수익 쉐어 모델</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            당신의 성장이 우리의 성장입니다. Win-Win 파트너십
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-gradient-to-br from-green-900/20 to-slate-900/50 border border-green-500/30 rounded-2xl p-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">💚 수익 쉐어 플랜</h3>
              <p className="text-slate-300 mb-6">
                CMO AI Agent를 통해 발생한 판매 매출의 단 <strong className="text-green-400">0.5%</strong>만 공유
              </p>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-400" />
                  초기 비용 부담 없음
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-400" />
                  매출이 없으면 수수료도 없음
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-400" />
                  AI 전략 리포트·투명한 판매 집계 대시보드
                </li>
              </ul>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6">
              <div className="text-green-400 font-bold mb-3">계산 예시</div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-slate-700 pb-2">
                  <span className="text-slate-400">월 판매액</span>
                  <span className="text-white font-semibold">₩10,000,000</span>
                </div>
                <div className="flex justify-between border-b border-slate-700 pb-2">
                  <span className="text-slate-400">수수료율</span>
                  <span className="text-green-400 font-semibold">0.5%</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-white font-bold">수수료</span>
                  <span className="text-green-400 font-bold text-lg">₩50,000</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/contact"
              className="inline-block px-8 py-3 bg-green-600 hover:bg-green-500 rounded-xl font-semibold transition-colors"
            >
              수익 쉐어 문의하기
            </Link>
          </div>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-6 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            자주 묻는 질문
          </h2>
        </div>

        <div className="space-y-4">
          {[
            {
              q: "무료 체험 후 자동으로 결제되나요?",
              a: "아니요. 무료 체험은 신용카드 등록 없이 이용 가능하며, 자동 결제는 발생하지 않습니다. 유료 플랜으로 전환하고 싶을 때만 결제 정보를 입력하시면 됩니다.",
            },
            {
              q: "월 중간에 플랜을 변경할 수 있나요?",
              a: "네, 언제든지 플랜을 업그레이드하거나 다운그레이드할 수 있습니다. 업그레이드 시 차액을 일할 계산하여 청구되며, 다운그레이드 시 남은 금액은 다음 결제에서 크레딧으로 적용됩니다.",
            },
            {
              q: "환불 정책은 어떻게 되나요?",
              a: "서비스에 만족하지 못하셨다면 첫 결제 후 14일 이내 전액 환불이 가능합니다. 단, 건별 과금의 경우 사용된 크레딧은 환불 대상에서 제외됩니다.",
            },
            {
              q: "지원하는 결제 수단은 무엇인가요?",
              a: "신용카드(Visa, MasterCard, AMEX), 체크카드, 계좌이체, 카카오페이, 네이버페이를 지원합니다. 비즈니스 플랜은 세금계산서 발행도 가능합니다.",
            },
          ].map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-800/30 backdrop-blur-xl border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all"
            >
              <h3 className="text-lg font-bold text-white mb-3">{faq.q}</h3>
              <p className="text-slate-400 leading-relaxed">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            아직 고민 중이신가요?
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            무료로 먼저 체험해보세요. 카드 등록 불필요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={APP_URLS.cmo}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-full text-lg font-semibold hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all"
            >
              AI 마케팅 총괄(CMO) 임명하기
            </a>
            <Link
              to="/contact"
              className="px-8 py-4 border-2 border-slate-600 rounded-full text-lg font-semibold hover:border-cyan-400 hover:text-cyan-400 transition-all"
            >
              영업팀과 상담하기
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
