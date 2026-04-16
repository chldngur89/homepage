import { Link } from "react-router";
import { motion } from "motion/react";
import {
  Target,
  Zap,
  TrendingUp,
  Award,
  Calendar,
  Mail,
  ArrowRight,
  BarChart3,
  Globe,
  Shield,
} from "lucide-react";
import siteContent from "@/content/site.json";

const contactEmail = (siteContent as { contactEmail?: string }).contactEmail ?? "chldngur89@gmail.com";

export default function IR() {
  return (
    <div className="bg-slate-950 min-h-screen py-24">
      {/* Hero: 한 줄 요약 */}
      <section className="max-w-4xl mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-block px-4 py-1 rounded-full bg-cyan-900/30 text-cyan-400 font-semibold text-sm mb-6 border border-cyan-500/30">
            Investor Relations
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            말 걸 필요 없는 능동 AI,
            <br />
            <span className="text-cyan-400">창업가의 자율주행 AI 파트너</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-4">
            {siteContent.siteName} · AutoCMO로 이미지 한 장이면 시나리오·이미지·동영상·상품페이지 자동 제작 후
            인스타·네이버·쿠팡 등 다채널 업로드. 대표님은 대시보드에 올라오는 AI 전략 보고서에 승인만 누르시면 됩니다.
          </p>
        </motion.div>
      </section>

      {/* 핵심 메시지 3줄 */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              Icon: Zap,
              title: "Problem",
              text: "창업가·판매자는 마케팅에 시간과 비용을 쓰고, 여러 도구를 오가며 수동 업로드에 지칩니다.",
            },
            {
              Icon: BarChart3,
              title: "Solution",
              text: "AutoCMO가 시나리오·이미지·동영상·상품페이지를 자동 제작하고, 다채널 업로드·대시보드 보고까지 한 번에.",
            },
            {
              Icon: Target,
              title: "Why Us",
              text: "AI2AI 기술로 CMO뿐 아니라 CFO·CEO·PMS 등 C-Level AI를 이어 나가며, 국내 특허·정부지원으로 검증 중.",
            },
          ].map((item, i) => {
            const Icon = item.Icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-800/30 border border-slate-700 rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h2 className="text-lg font-bold text-white">{item.title}</h2>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{item.text}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 트랙션 · 지원 현황 */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-bold text-white mb-6 text-center"
        >
          지원 검토 현황
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "예비창업패키지", value: "지원 예정", sub: "" },
            { label: "청년창업사관학교", value: "지원 예정", sub: "" },
            { label: "TIPS", value: "검토 예정", sub: "" },
            { label: "정부·파트너", value: "논의 예정", sub: "" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 text-center"
            >
              <p className="text-slate-500 text-xs font-medium mb-1">{item.label}</p>
              <p className="text-white font-bold text-lg">{item.value}</p>
              {item.sub && <p className="text-slate-500 text-xs mt-1">{item.sub}</p>}
            </motion.div>
          ))}
        </div>
      </section>

      {/* 시장 기회 요약 */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-bold text-white mb-6 text-center"
        >
          시장 기회
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { Icon: Globe, title: "TAM", value: "$2.5T", desc: "글로벌 크로스보더 커머스" },
            { Icon: TrendingUp, title: "SAM", value: "120만 명", desc: "국내 다채널 창업가·판매자" },
            { Icon: Target, title: "SOM", value: "15만 명", desc: "초기 타겟 신규 진입 창업가" },
          ].map((item, i) => {
            const Icon = item.Icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-slate-800/30 border border-cyan-500/30 rounded-xl p-6 text-center"
              >
                <Icon className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                <p className="text-cyan-400 font-bold text-sm mb-1">{item.title}</p>
                <p className="text-white font-bold text-xl mb-1">{item.value}</p>
                <p className="text-slate-500 text-sm">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 수상·인증 */}
      <section className="max-w-3xl mx-auto px-6 mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-bold text-white mb-6 text-center"
        >
          지원 및 도전 예정
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4"
        >
          {["예비창업패키지 지원 예정", "강원 스타트업 경진대회 출전 예정", "AI 혁신 챌린지 도전 예정"].map(
            (award, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-full"
              >
                <Award className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span className="text-slate-300 text-sm">{award}</span>
              </div>
            )
          )}
        </motion.div>
      </section>

      {/* 로드맵 한눈에 */}
      <section className="max-w-4xl mx-auto px-6 mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center gap-2"
        >
          <Calendar className="w-6 h-6 text-cyan-400" />
          로드맵
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          {[
            { phase: "Phase 1", title: "예비창업패키지 지원", period: "", status: "예정" },
            { phase: "Phase 2", title: "청년창업사관학교 지원", period: "", status: "예정" },
            { phase: "Phase 3", title: "Seed 투자 및 TIPS 검토", period: "", status: "예정" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex flex-wrap items-center justify-between gap-3 bg-slate-800/30 border border-slate-700 rounded-xl px-5 py-4"
            >
              <span className="text-cyan-400 font-semibold">{item.phase}</span>
              <span className="text-white font-medium">{item.title}</span>
              {item.period && <span className="text-slate-500 text-sm">{item.period}</span>}
              <span className="px-3 py-1 bg-slate-700 rounded-lg text-slate-300 text-xs font-medium">{item.status}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* 기술·차별화 한 줄 */}
      <section className="max-w-3xl mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-start gap-4 p-6 bg-slate-800/30 border border-cyan-500/30 rounded-2xl"
        >
          <Shield className="w-10 h-10 text-cyan-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-lg font-bold text-white mb-2">기술·차별화</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              국내 특허 2건(2026.01.13 출원), AI2AI로 CMO·CFO·CEO·PMS 등 에이전트 확장. 이기종 보안 로그 자동 스키마
              매핑 연구(ESORICS 2026) 등 R&D 기반 딥테크.
            </p>
          </div>
        </motion.div>
      </section>

      {/* CTA: IR 자료 요청 · 미팅 요청 */}
      <section className="max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-cyan-900/20 to-indigo-900/20 border border-cyan-500/30 rounded-2xl p-10 text-center"
        >
          <Mail className="w-14 h-14 text-cyan-400 mx-auto mb-6" />
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            IR 자료 · 미팅 요청
          </h2>
          <p className="text-slate-400 mb-8">
            투자·파트너십·미디어 문의는 아래 버튼으로 요청해 주시면 담당자가 안내드립니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`mailto:${contactEmail}?subject=${encodeURIComponent("[Auto C-Level AI] IR 자료 요청")}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-cyan-600 hover:bg-cyan-500 rounded-full font-semibold transition-colors"
            >
              IR 자료 요청하기
              <ArrowRight className="w-5 h-5" />
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 rounded-full font-semibold transition-colors"
            >
              문의·미팅 요청하기
            </Link>
          </div>
          <p className="text-slate-500 text-sm mt-6">{contactEmail}</p>
        </motion.div>
      </section>
    </div>
  );
}
