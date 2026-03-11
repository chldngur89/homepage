import { Link } from "react-router";
import { ArrowRight, Zap, Target, TrendingUp, CheckCircle, Star, Camera, Sparkles, BarChart3, Clock, Puzzle, Globe, ClipboardList, ArrowDown } from "lucide-react";
import { APP_URLS } from "@/app/config/apps";
import { motion } from "motion/react";
import { useState, useEffect } from "react";

export default function Home() {
  const [showStickyCta, setShowStickyCta] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowStickyCta(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-900/50 text-cyan-400 font-semibold text-sm mb-6 border border-cyan-500/30"
          >
            <Zap size={16} className="text-yellow-400" />
            이미지만 넣으세요. 등록부터 성과 보고까지 Zero-Click.
          </motion.div>

          {/* Brand */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-lg md:text-xl text-slate-400 font-medium mb-4"
          >
            <span className="bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent font-bold">AutoCMO</span>
            <span className="text-slate-500"> · CMO AI Agent</span>
          </motion.p>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight text-white max-w-4xl mx-auto"
          >
            <span className="block leading-[1.15]">말 걸지 마세요 .</span>
            <span className="block mt-2 md:mt-3 leading-[1.15] text-white/95">AI가 알아서 보고 합니다.</span>
          </motion.h1>

          {/* Sub Heading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-300 font-light mb-4 leading-relaxed max-w-3xl mx-auto"
          >
            이미지 한 장이면 국내외 모든 쇼핑몰 등록 완료.
            <br className="hidden sm:block" />
            대표님은 대시보드에 올라오는 AI의 전략 보고서에 <strong className="text-cyan-400">&apos;승인&apos;</strong> 버튼만 누르시면 됩니다.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-lg text-cyan-400/90 font-semibold mb-12"
          >
            진짜 마케팅 총괄(CMO)은 대표님을 대신해 먼저 고민합니다.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <a
              href={APP_URLS.cmo}
              target="_blank"
              rel="noopener noreferrer"
              className="group min-h-[48px] inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-full text-lg font-semibold hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all"
            >
              AI 마케팅 총괄(CMO) 임명하기
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </a>
            <Link
              to="/contact"
              className="min-h-[48px] inline-flex items-center justify-center px-8 py-4 border-2 border-slate-600 rounded-full text-lg font-semibold hover:border-cyan-400 hover:text-cyan-400 transition-all"
            >
              IR 미팅 요청하기
            </Link>
          </motion.div>

          {/* 대시보드 미리보기: 올린 결과만 보면 됨 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 text-left shadow-xl">
              <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold mb-3">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                대시보드 인사이트
              </div>
              <p className="text-white font-medium mb-2">
                인사이트는 데이터에서, 실행은 AI 대시보드 승인 한 번으로.
              </p>
              <p className="text-slate-400 text-sm mb-4">
                경쟁사보다 먼저 움직이는 AI, 대표님은 리포트만 확인하세요.
              </p>
              <div className="flex flex-wrap gap-2">
                {["인스타그램", "해외 상품페이지", "블로그", "동영상"].map((label) => (
                  <span key={label} className="px-3 py-1 bg-slate-800 rounded-lg text-slate-300 text-xs font-medium">
                    {label}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-slate-500 text-sm text-center mt-3">
              마케팅의 시작은 이미지 한 장, 끝은 AI의 자동화된 성공 보고서.
            </p>
          </motion.div>

          {/* 주력 플로우: 이미지/글 → 제작 → 업로드 → 대시보드 */}
          <p className="text-slate-500 text-sm mb-4">이미지만 넣으세요. 등록부터 성과 보고까지 Zero-Click.</p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          >
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/50 transition-colors">
              <div className="mb-3 flex text-cyan-400"><Camera className="w-10 h-10" strokeWidth={1.5} /></div>
              <h3 className="text-lg font-bold text-white mb-2">1. 이미지·글만 넣기</h3>
              <p className="text-sm text-slate-400">상품 사진이나 설명만 넣으면 됩니다</p>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 hover:border-pink-500/50 transition-colors">
              <div className="mb-3 flex text-pink-400"><Sparkles className="w-10 h-10" strokeWidth={1.5} /></div>
              <h3 className="text-lg font-bold text-white mb-2">2. AI가 전부 제작</h3>
              <p className="text-sm text-slate-400">시나리오·이미지·동영상·블로그·상품페이지 자동 생성</p>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/50 transition-colors">
              <div className="mb-3 flex text-indigo-400"><Zap className="w-10 h-10" strokeWidth={1.5} /></div>
              <h3 className="text-lg font-bold text-white mb-2">3. 채널에 자동 업로드</h3>
              <p className="text-sm text-slate-400">인스타·해외 상품 페이지 등에 올려드립니다</p>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/50 transition-colors">
              <div className="mb-3 flex text-cyan-400"><BarChart3 className="w-10 h-10" strokeWidth={1.5} /></div>
              <h3 className="text-lg font-bold text-white mb-2">4. 대시보드만 보기</h3>
              <p className="text-sm text-cyan-400 font-bold">올린 결과·현황만 확인하시면 됩니다</p>
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
              창업가·판매자의 <span className="text-pink-500">3대 병목 현상</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg text-slate-400 max-w-2xl mx-auto"
            >
              성장을 가로막는 것은 '제품'이 아니라 '파편화된 마케팅 실행력'입니다. 창업가와 판매자에게 진정한 편리함을 드리는 것이 목표입니다.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                Icon: Clock,
                title: "시간 및 전문성 부재",
                description:
                  "창업가·판매자는 제품 소싱만으로도 벅찹니다. 디자인, 카피라이팅 등 마케팅 전문 기술을 학습하고 실행할 절대적인 시간이 부족해 편리하게 운영하기 어렵습니다.",
                color: "cyan",
              },
              {
                Icon: Puzzle,
                title: "툴 파편화 및 고비용",
                description:
                  "ChatGPT, Midjourney 등 수많은 AI 툴을 개별 구독하고, 결과물을 수동으로 옮겨가며 작업해야 하는 심각한 실행의 단절이 발생합니다.",
                color: "pink",
              },
              {
                Icon: Globe,
                title: "다채널 운영 복잡성",
                description:
                  "쿠팡, 네이버 스마트스토어, 11번가 등 마켓마다 다른 규격과 정책에 맞춰 등록하고 관리하는 과정에서 극심한 피로도가 유발됩니다.",
                color: "indigo",
              },
            ].map((item, index) => {
              const Icon = item.Icon;
              return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-slate-800/30 backdrop-blur-xl border-t-4 border-${item.color}-500 rounded-2xl p-8 hover:bg-slate-800/50 transition-colors`}
              >
                <div className="mb-4 flex text-slate-300"><Icon className="w-12 h-12" strokeWidth={1.5} /></div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.description}</p>
              </motion.div>
            );
            })}
          </div>
        </div>
      </section>

      {/* 경쟁사 분석 섹션 - 자동 마케팅 그 다음 */}
      <section className="py-24 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center lg:text-left"
            >
              <div className="inline-block px-4 py-1 rounded-full bg-slate-700/50 text-slate-300 font-semibold text-sm mb-4">
                그 다음: 경쟁사 분석
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                자동 마케팅이 돌아가는 그다음, 경쟁사는?
              </h2>
              <p className="text-xl text-cyan-400 font-semibold mb-4">
                대표님보다 먼저 시장을 읽습니다.
              </p>
              <p className="text-slate-400 leading-relaxed">
                이미지 넣고 콘텐츠가 채널에 올라간 뒤, 경쟁사 가격·프로모션·리뷰 변화를 AI가 모니터링해 대시보드에 요약해서 보고합니다. 실시간 경쟁사 추적 및 AI 전략 리포트.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-900/50 border border-slate-700 rounded-2xl p-6"
            >
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-xl">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <div>
                    <p className="text-white font-medium text-sm">경쟁사 A · 가격 인하 감지</p>
                    <p className="text-slate-500 text-xs mt-0.5">AI 전략: 프로모션 강화 제안 대기 중</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-xl">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <div>
                    <p className="text-white font-medium text-sm">경쟁사 B · 신규 상품 출시</p>
                    <p className="text-slate-500 text-xs mt-0.5">AI 전략: 카피·키워드 대응안 보고 완료</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-xl">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <div>
                    <p className="text-white font-medium text-sm">시장 트렌드 · 검색량 상승</p>
                    <p className="text-slate-500 text-xs mt-0.5">AI 전략: 노출 강화 권장</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solution Preview */}
      <section className="py-24 bg-slate-900/20">
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
              단 하나의 솔루션: <span className="text-cyan-400">Zero-Click Intelligence</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg text-slate-400 max-w-2xl mx-auto mb-4"
            >
              명령하는 툴이 아니라, <strong className="text-white">AI가 분석해서 보고하는 대시보드</strong>입니다. 실행·전략 수립은 AI가 하고, 대표님은 인사이트 요약과 승인 대기만 확인하세요.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm text-slate-500 max-w-2xl mx-auto mb-8"
            >
              우리만의 <strong className="text-slate-400">AI2AI</strong> 기술로 추후 CFO Tool AI, CEO Reader AI 등 다른 AI도 대시보드에 붙여 보고받을 수 있습니다.
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
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <div className="px-6 py-4 bg-slate-800/80 rounded-xl font-bold text-lg border border-cyan-500/30 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-cyan-400 shrink-0" strokeWidth={1.5} />
                  AI 분석 코멘트
                </div>
                <div className="px-6 py-4 bg-indigo-600/80 rounded-xl font-bold text-lg flex items-center gap-2">
                  <ClipboardList className="w-5 h-5 text-indigo-200 shrink-0" strokeWidth={1.5} />
                  승인 대기 중인 전략
                </div>
              </div>
              <div className="text-cyan-400 text-2xl font-bold animate-pulse flex items-center justify-center gap-2">
                <ArrowDown className="w-6 h-6" strokeWidth={1.5} />
                원클릭 승인
                <ArrowDown className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <div className="flex items-center justify-center gap-4">
                <div className="px-6 py-4 bg-gradient-to-r from-cyan-600 to-indigo-600 rounded-xl font-bold text-lg shadow-lg flex items-center gap-2">
                  <Zap className="w-5 h-5 text-white shrink-0" strokeWidth={1.5} />
                  실행 → 분석 → 다음 최적 행동 제안 (선순환)
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
              { value: "AI 보고", label: "실시간 전략 리포트" },
              { value: "원클릭", label: "승인으로 실행" },
              { value: "선순환", label: "분석 → 승인 → 매출 최적화" },
              { value: "Zero Search", label: "찾아보지 않아도 됨" },
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
              찾아보지 않아도 됩니다. <span className="text-indigo-400">Zero Search</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg text-slate-400 max-w-2xl mx-auto mb-4"
            >
              AI가 시장·경쟁사·트렌드를 찾아와 대시보드에 보고합니다. 배우지 않아도 되고, 채팅으로 물어볼 필요도 없습니다.
            </motion.p>
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

      {/* Social Proof: Testimonials + Partners */}
      <section className="py-24 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1 rounded-full bg-cyan-900/30 text-cyan-400 font-semibold text-sm mb-4"
            >
              검증과 신뢰
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-2"
            >
              이미 <span className="text-cyan-400">검증</span>되고 있습니다
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-slate-500 text-sm mb-8"
            >
              많은 창업가·판매자가 이미 AutoCMO로 마케팅을 운영하고 있습니다
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[
              { quote: "기존에 2시간 넘게 걸리던 마켓 등록이 10분 안에 끝났어요. 전환율도 40% 넘게 올랐습니다.", author: "김민준", role: "패션 브랜드 대표" },
              { quote: "AI 전략 리포트만 보고 원클릭 승인하는 흐름이 정말 직관적이에요. 찾아보지 않아도 돼서 좋습니다.", author: "이서연", role: "푸드 소셜커머스" },
              { quote: "경쟁사 가격 변동 알림 받고 대응 전략 승인만 했는데 실제로 주문량이 늘었어요. 대시보드가 진짜 보고해주네요.", author: "박지훈", role: "생활용품 셀러" },
              { quote: "채팅으로 일일이 물어보는 게 아니라 들어가면 이미 정리돼 있어서 시간이 엄청 줄었습니다.", author: "최유나", role: "뷰티 크리에이터" },
              { quote: "쿠팡, 네이버, 11번가 한 번에 올라가게 해줘서 재고 관리만 하면 됩니다. 마케팅은 AI가 다 해줘요.", author: "정현우", role: "가전 제품 판매" },
              { quote: "무료 체험 해보고 바로 유료 전환했어요. ROI가 확실해서 팀원들도 같이 쓰고 있습니다.", author: "한소희", role: "스타트업 공동대표" },
              { quote: "카피·이미지 자동 생성하고 대시보드에서 승인만 누르니까 저녁에 10분이면 끝나요. 전에 같았으면 새벽까지 했을 겁니다.", author: "오준혁", role: "잡화 셀러" },
              { quote: "IR 미팅 때 투자자분들께 대시보드 보여드렸는데 반응이 좋았어요. '이미 쓰는 사람이 많다'는 게 말이 됐습니다.", author: "윤도현", role: "이커머스 창업" },
              { quote: "경쟁사 분석이 자동으로 올라오는 게 신기해요. 가격 전략 세울 때 바로 참고하고 있어요.", author: "강수빈", role: "식품 유통" },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-6"
              >
                <p className="text-slate-300 italic mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold">{t.author[0]}</div>
                  <div>
                    <div className="font-semibold text-white">{t.author}</div>
                    <div className="text-sm text-slate-500">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center pt-8 border-t border-slate-700"
          >
            <p className="text-slate-500 text-sm mb-6">정부지원사업 · 파트너</p>
            <div className="flex flex-wrap justify-center gap-8 items-center">
              {["예창패", "청창사", "VC", "엔젤투자자", "TIPS"].map((label, i) => (
                <div key={i} className="px-6 py-3 bg-slate-800/50 rounded-xl border border-slate-700 text-slate-400 font-medium text-sm">
                  {label}
                </div>
              ))}
            </div>
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
            마케팅의 시작은 이미지 한 장,<br />끝은 AI의 <span className="text-cyan-400">자동화된 성공 보고서</span>.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl text-slate-300 mb-8"
          >
            말 걸지 마세요. AI가 알아서 보고 합니다. 신용카드 없이 체험 가능.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href={APP_URLS.cmo}
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-full text-xl font-semibold hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all"
            >
              AI 마케팅 총괄(CMO) 임명하기
            </a>
            <Link
              to="/pricing"
              className="px-10 py-5 border-2 border-slate-600 rounded-full text-xl font-semibold hover:border-cyan-400 hover:text-cyan-400 transition-all"
            >
              요금제 보기
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Sticky CTA (모바일·스크롤 시) */}
      {showStickyCta && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800 md:hidden"
        >
          <div className="flex gap-3 max-w-lg mx-auto">
            <a
              href={APP_URLS.cmo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-h-[48px] flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-xl font-semibold text-sm"
            >
              CMO 임명하기
              <ArrowRight size={18} />
            </a>
            <Link
              to="/contact"
              className="flex-1 min-h-[48px] flex items-center justify-center py-3 px-4 border-2 border-slate-600 rounded-xl font-semibold text-sm hover:border-cyan-400 hover:text-cyan-400"
            >
              문의하기
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}
