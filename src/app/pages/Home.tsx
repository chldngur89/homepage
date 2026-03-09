import { Link } from "react-router";
import { ArrowRight, Zap, Target, TrendingUp, CheckCircle, Star } from "lucide-react";
import { motion } from "motion/react";

export default function Home() {
  return (
    <div className="bg-slate-950">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 via-slate-950 to-slate-950"></div>
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-32 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-900/50 text-cyan-400 font-semibold text-sm mb-8 border border-cyan-500/30"
          >
            <Zap size={16} className="text-yellow-400" />
            당신만의 AI 마케팅 총괄, CMO
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8 tracking-tight leading-tight"
          >
            <span className="bg-gradient-to-r from-cyan-400 via-pink-400 to-indigo-500 bg-clip-text text-transparent">
              ZeroSeller
            </span>
            <br />
            <span className="text-white">액셔너블 AI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl lg:text-3xl text-slate-300 font-light mb-6 leading-relaxed max-w-4xl mx-auto"
          >
            사진 한 장과 채팅 한 줄로{" "}
            <strong className="text-white font-bold">1분 만에 판매를 시작</strong>하는
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl md:text-2xl text-cyan-400 font-semibold mb-12"
          >
            'Chat-to-Action' 마케팅 에이전트
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Link
              to="/demo"
              className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-full text-lg font-semibold hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all flex items-center gap-2"
            >
              무료로 시작하기
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 border-2 border-slate-600 rounded-full text-lg font-semibold hover:border-cyan-400 hover:text-cyan-400 transition-all"
            >
              IR 미팅 요청하기
            </Link>
          </motion.div>

          {/* Quick Value Props */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/50 transition-colors">
              <div className="text-4xl mb-3">📸</div>
              <h3 className="text-lg font-bold text-white mb-2">제품 사진 업로드</h3>
              <p className="text-sm text-slate-400">단 1장</p>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 hover:border-pink-500/50 transition-colors">
              <div className="text-4xl mb-3">💬</div>
              <h3 className="text-lg font-bold text-white mb-2">채팅 명령 입력</h3>
              <p className="text-sm text-slate-400">"여름 프로모션 해줘"</p>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/50 transition-colors">
              <div className="text-4xl mb-3">🛒</div>
              <h3 className="text-lg font-bold text-white mb-2">다채널 동시 판매</h3>
              <p className="text-sm text-cyan-400 font-bold">1분 내 완료</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1 rounded-full bg-pink-900/30 text-pink-400 font-semibold text-sm mb-4"
            >
              현실의 문제
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-6"
            >
              1인 셀러의 <span className="text-pink-500">3대 병목 현상</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg text-slate-400 max-w-2xl mx-auto"
            >
              성장을 가로막는 것은 '제품'이 아니라 '파편화된 마케팅 실행력'입니다.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "⏳",
                title: "시간 및 전문성 부재",
                description:
                  "1인 창업가는 제품 소싱만으로도 벅찹니다. 디자인, 카피라이팅 등 마케팅 전문 기술을 학습하고 실행할 절대적인 시간이 부족합니다.",
                color: "cyan",
              },
              {
                icon: "🧩",
                title: "툴 파편화 및 고비용",
                description:
                  "ChatGPT, Midjourney 등 수많은 AI 툴을 개별 구독하고, 결과물을 수동으로 옮겨가며 작업해야 하는 심각한 실행의 단절이 발생합니다.",
                color: "pink",
              },
              {
                icon: "🕸️",
                title: "다채널 운영 복잡성",
                description:
                  "쿠팡, 네이버 스마트스토어, 11번가 등 마켓마다 다른 규격과 정책에 맞춰 등록하고 관리하는 과정에서 극심한 피로도가 유발됩니다.",
                color: "indigo",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-slate-800/30 backdrop-blur-xl border-t-4 border-${item.color}-500 rounded-2xl p-8 hover:bg-slate-800/50 transition-colors`}
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Preview */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1 rounded-full bg-cyan-900/30 text-cyan-400 font-semibold text-sm mb-4"
            >
              하나의 솔루션
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-6"
            >
              단 하나의 솔루션: <span className="text-cyan-400">Chat-to-Action</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg text-slate-400 max-w-2xl mx-auto mb-8"
            >
              제로셀러는 흩어진 모든 마케팅 과정을 하나의 '채팅창'으로 완벽히 통합했습니다.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Link
                to="/solution"
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
              >
                자세히 알아보기 <ArrowRight size={20} />
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-indigo-900/20 to-pink-900/10 border border-cyan-500/30 rounded-3xl p-12 text-center shadow-[0_0_50px_rgba(6,182,212,0.1)]"
          >
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="flex items-center justify-center gap-4">
                <div className="px-6 py-4 bg-indigo-600/80 rounded-xl font-bold text-lg">
                  📱 채팅 + 사진 입력
                </div>
              </div>
              <div className="text-cyan-400 text-2xl font-bold animate-pulse">
                ⬇️ 원클릭 자동화 ⬇️
              </div>
              <div className="flex items-center justify-center gap-4">
                <div className="px-6 py-4 bg-gradient-to-r from-cyan-600 to-indigo-600 rounded-xl font-bold text-lg shadow-lg">
                  🚀 다채널 마켓 동시 업로드 완료
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "1분", label: "설정에서 판매까지" },
              { value: "10+", label: "지원 마켓플레이스" },
              { value: "95%", label: "시간 절약" },
              { value: "3배", label: "매출 증가율" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-6"
            >
              모든 것을 자동화하는 <span className="text-indigo-400">AI 파워</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="w-8 h-8" />,
                title: "스마트 카피라이팅",
                description: "GPT-4o 기반 맞춤형 제품 설명과 마케팅 문구 자동 생성",
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "AI 이미지 생성",
                description: "NanoBanana로 전문가 수준의 제품샷과 배너 제작",
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "숏폼 영상 제작",
                description: "VEO 3.1로 SNS용 바이럴 숏폼 영상 자동 생성",
              },
              {
                icon: <CheckCircle className="w-8 h-8" />,
                title: "다채널 자동 업로드",
                description: "쿠팡, 네이버, 11번가 등 주요 커머스 동시 등록",
              },
              {
                icon: <Star className="w-8 h-8" />,
                title: "실시간 분석",
                description: "판매 데이터와 트렌드 분석으로 최적화 제안",
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "24/7 자동화",
                description: "서버리스 아키텍처로 언제든 즉시 작업 처리",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/30 backdrop-blur-xl border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]"
              >
                <div className="text-cyan-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/technology"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
            >
              기술 스택 자세히 보기 <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-indigo-900/20 via-pink-900/10 to-slate-950">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            지금 바로 <span className="text-cyan-400">무료</span>로 시작하세요
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl text-slate-300 mb-8"
          >
            신용카드 등록 없이 바로 체험 가능합니다
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/demo"
              className="px-10 py-5 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-full text-xl font-semibold hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all"
            >
              무료 체험 시작하기
            </Link>
            <Link
              to="/pricing"
              className="px-10 py-5 border-2 border-slate-600 rounded-full text-xl font-semibold hover:border-cyan-400 hover:text-cyan-400 transition-all"
            >
              요금제 보기
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
