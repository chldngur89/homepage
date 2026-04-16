import { Link } from "react-router";
import { ArrowRight, Zap, Target, TrendingUp, CheckCircle, Star, Camera, Sparkles, BarChart3, Clock, Puzzle, Globe, ClipboardList, ArrowDown, Wallet, UploadCloud, FileSpreadsheet, Gauge, Layers, ShieldCheck } from "lucide-react";
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
      <section
        aria-labelledby="home-hero-title"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 via-slate-950 to-slate-950"></div>
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>

        <header className="relative max-w-7xl mx-auto px-6 py-32 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-900/50 text-cyan-400 font-semibold text-sm mb-6 border border-cyan-500/30"
          >
            <Zap size={16} className="text-yellow-400" />
            AI 기능이 아니라, 매출을 만드는 Marketing OS
          </motion.div>

          {/* Brand */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-lg md:text-xl text-slate-400 font-medium mb-4"
          >
            <span className="bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent font-bold">Auto C-Level AI</span>
            <span className="text-slate-500"> · Marketing OS</span>
          </motion.p>

          {/* Main Heading */}
          <motion.h1
            id="home-hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight text-white max-w-4xl mx-auto"
          >
            <span className="block leading-[1.15]">매출이 만들어지는</span>
            <span className="block mt-2 md:mt-3 leading-[1.15] text-white/95">
              <span className="text-cyan-400">Marketing OS</span>로 바꾸세요
            </span>
          </motion.h1>

          {/* Sub Heading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-300 font-light mb-4 leading-relaxed max-w-3xl mx-auto"
          >
            <strong className="text-white font-semibold">이미지/글 입력</strong>만 하면
            <span className="text-white"> 계획</span> → <span className="text-white">제작</span> → <span className="text-white">업로드</span> → <span className="text-white">성과 보고</span>까지 자동으로 굴러갑니다.
            <br className="hidden sm:block" />
            대표님은 <strong className="text-cyan-400">&apos;대시보드 승인&apos;</strong>만 하시면 됩니다.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-lg text-slate-400 mb-10"
          >
            “생성”에서 끝나는 AI가 아니라, “실행”까지 이어주는 운영 시스템입니다.
          </motion.p>

          {/* ROI Badges */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            {[
              { label: "전환율 20~40% 개선*", Icon: Gauge },
              { label: "등록/운영 2시간 → 10분*", Icon: Clock },
              { label: "다채널 자동 업로드", Icon: UploadCloud },
            ].map((b) => {
              const Icon = b.Icon;
              return (
                <span
                  key={b.label}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/60 border border-slate-700 text-slate-200 text-sm font-semibold"
                >
                  <Icon className="w-4 h-4 text-cyan-400" />
                  {b.label}
                </span>
              );
            })}
          </motion.div>
          <p className="text-slate-500 text-xs mb-10">
            * 업종/채널/상품에 따라 상이합니다. (보수적 가이드 범위)
          </p>

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
              CMO 임명하기
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </a>
            <a
              href="#roi"
              className="min-h-[48px] inline-flex items-center justify-center px-8 py-4 border-2 border-slate-600 rounded-full text-lg font-semibold hover:border-cyan-400 hover:text-cyan-400 transition-all"
            >
              성과 예시 보기
            </a>
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
              “툴”이 아니라 “운영”이 남습니다. 대표님은 승인만.
            </p>
          </motion.div>

          {/* 주력 플로우: 시스템 파이프라인 */}
          <p className="text-slate-500 text-sm mb-4">Execution Gap(생성→실행)을 없애는 파이프라인</p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          >
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/50 transition-colors">
              <div className="mb-3 flex text-cyan-400"><Camera className="w-10 h-10" strokeWidth={1.5} /></div>
              <h3 className="text-lg font-bold text-white mb-2">1) 입력</h3>
              <p className="text-sm text-slate-400">이미지/글만 넣습니다</p>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 hover:border-pink-500/50 transition-colors">
              <div className="mb-3 flex text-pink-400"><Sparkles className="w-10 h-10" strokeWidth={1.5} /></div>
              <h3 className="text-lg font-bold text-white mb-2">2) 계획</h3>
              <p className="text-sm text-slate-400">시나리오·광고 계획을 잡습니다</p>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/50 transition-colors">
              <div className="mb-3 flex text-indigo-400"><Zap className="w-10 h-10" strokeWidth={1.5} /></div>
              <h3 className="text-lg font-bold text-white mb-2">3) 제작·배포</h3>
              <p className="text-sm text-slate-400">이미지/영상/템플릿 생성 후 업로드</p>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/50 transition-colors">
              <div className="mb-3 flex text-cyan-400"><BarChart3 className="w-10 h-10" strokeWidth={1.5} /></div>
              <h3 className="text-lg font-bold text-white mb-2">4) 운영</h3>
              <p className="text-sm text-cyan-400 font-bold">대시보드에서 승인만 합니다</p>
            </div>
          </motion.div>
          <p className="text-slate-300 text-center mt-8 max-w-2xl mx-auto text-sm md:text-base">
            <strong className="text-white">수박을 넣거나 글을 치면</strong> 이미지가 만들어지고, 우리 템플릿으로 올리면 <span className="text-cyan-400 font-medium">대시보드만 보면 됩니다.</span> 그 이후에는 AI가 알아서 해줍니다.
          </p>

          {/* 실제 화면으로 보는 플로우 (수박 예시) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          >
            <div className="bg-slate-900/50 border border-slate-700 rounded-2xl overflow-hidden">
              <div className="aspect-video bg-slate-800 flex items-center justify-center p-2">
                <img src="/flow/flow-scenario.png" alt="이미지를 넣거나 글을 입력" className="w-full h-full object-contain rounded-lg" />
              </div>
              <div className="p-4">
                <span className="text-cyan-400 font-bold text-sm">1</span>
                <p className="text-white font-medium mt-1">이미지를 넣거나 글을 입력</p>
                <p className="text-slate-500 text-xs mt-1">상품 사진·이름만 넣으면 됩니다</p>
              </div>
            </div>
            <div className="bg-slate-900/50 border border-slate-700 rounded-2xl overflow-hidden">
              <div className="aspect-video bg-slate-800 flex items-center justify-center p-2">
                <img src="/flow/flow-watermelon.png" alt="시나리오 및 광고 계획 만들기" className="w-full h-full object-contain rounded-lg" />
              </div>
              <div className="p-4">
                <span className="text-pink-400 font-bold text-sm">2</span>
                <p className="text-white font-medium mt-1">시나리오 및 광고 계획 만들기</p>
                <p className="text-slate-500 text-xs mt-1">AI가 마케팅 시나리오·광고 계획을 제안합니다</p>
              </div>
            </div>
            <div className="bg-slate-900/50 border border-slate-700 rounded-2xl overflow-hidden">
              <div className="aspect-video bg-slate-800 flex items-center justify-center p-2">
                <img src="/flow/flow-form.png" alt="이미지 생성 결과" className="w-full h-full object-contain rounded-lg" />
              </div>
              <div className="p-4">
                <span className="text-indigo-400 font-bold text-sm">3</span>
                <p className="text-white font-medium mt-1">광고 동영상 및 광고 이미지 생성 · 템플릿 생성</p>
                <p className="text-slate-500 text-xs mt-1">시나리오에 맞는 광고 이미지·동영상·템플릿 자동 생성</p>
              </div>
            </div>
            <div className="bg-slate-900/50 border border-slate-700 rounded-2xl overflow-hidden">
              <div className="aspect-video bg-slate-800 flex items-center justify-center p-2">
                <img src="/flow/flow-dashboard.png" alt="플랫폼 연결 대시보드" className="w-full h-full object-contain rounded-lg" />
              </div>
              <div className="p-4">
                <span className="text-cyan-400 font-bold text-sm">4</span>
                <p className="text-white font-medium mt-1">대시보드만 보면 됨</p>
                <p className="text-slate-500 text-xs mt-1">그 이후에는 AI가 알아서 해줍니다</p>
              </div>
            </div>
          </motion.div>
        </header>
      </section>

      {/* Before / After */}
      <section
        aria-labelledby="before-after-title"
        className="py-24 border-t border-slate-800/50"
        id="before-after"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-block px-4 py-1 rounded-full bg-slate-800/60 text-slate-200 font-semibold text-sm mb-4">
              Before / After
            </div>
            <h2 id="before-after-title" className="text-3xl md:text-5xl font-bold mb-4 text-white">
              “생성”에서 끝나는 AI vs <span className="text-cyan-400">실행까지 가는 시스템</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Marketing OS는 콘텐츠를 만드는 것을 넘어, 업로드·운영·보고까지 이어서 “매출”로 연결합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-slate-900/30 border border-red-500/30 rounded-2xl p-8"
            >
              <div className="flex items-center gap-2 text-red-300 font-bold mb-6">
                <span className="w-2 h-2 rounded-full bg-red-400" />
                Before: 툴 조합 + 수동 운영
              </div>
              <ul className="space-y-4 text-slate-300">
                {[
                  "카피/이미지/영상 툴을 따로 써서 결과물을 모읍니다",
                  "마켓별 규격에 맞춰 수동 업로드합니다",
                  "성과 리포트를 엑셀/메모로 정리합니다",
                  "다음 액션은 감으로 결정하고 반복 시행착오를 겪습니다",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <span className="mt-1 w-2 h-2 rounded-full bg-red-400/80 shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 p-4 bg-slate-950/50 border border-slate-700 rounded-xl text-sm text-slate-400">
                결과: <span className="text-white font-semibold">시간 소모</span> + <span className="text-white font-semibold">실행 누락</span> +{" "}
                <span className="text-white font-semibold">매출 정체</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="bg-gradient-to-br from-cyan-900/25 to-indigo-900/20 border border-cyan-500/30 rounded-2xl p-8"
            >
              <div className="flex items-center gap-2 text-cyan-300 font-bold mb-6">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                After: Marketing OS
              </div>
              <ul className="space-y-4 text-slate-200">
                {[
                  "이미지/글 입력 → 시나리오/광고 계획 자동 제안",
                  "광고 이미지·동영상·템플릿 자동 생성",
                  "다채널 업로드 + 운영 현황이 대시보드에 자동 보고",
                  "AI가 Next Action을 제안하고 대표님은 승인만",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" strokeWidth={1.5} />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                {[
                  { Icon: Clock, title: "시간", value: "2시간 → 10분*" },
                  { Icon: Wallet, title: "비용", value: "툴 구독·외주 ↓*" },
                  { Icon: Gauge, title: "성과", value: "전환율 20~40%*" },
                ].map((s) => {
                  const Icon = s.Icon;
                  return (
                    <div key={s.title} className="bg-slate-950/40 border border-slate-700 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Icon className="w-4 h-4 text-cyan-400" />
                        {s.title}
                      </div>
                      <div className="text-white font-bold mt-2">{s.value}</div>
                    </div>
                  );
                })}
              </div>
              <p className="text-slate-500 text-xs mt-4">* 보수적 가이드 범위. 업종/채널/상품에 따라 상이</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section aria-labelledby="problem-title" className="py-24 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1 rounded-full bg-pink-900/30 text-pink-400 font-semibold text-sm mb-4"
            >
              Problem
            </motion.div>
            <motion.h2
              id="problem-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-6"
            >
              셀러의 시간은 <span className="text-pink-500">업로드</span>에서 사라집니다
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg text-slate-400 max-w-2xl mx-auto"
            >
              AI로 카피/이미지는 만들었는데, 결국 매출은 그대로인 이유. 생성과 실행 사이의 “Execution Gap” 때문입니다.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                Icon: Clock,
                title: "하루가 ‘업로드’로 끝남",
                description:
                  "상품 등록, 옵션/상세페이지/규격 맞추기, 채널별 정책 대응까지. 실행만 하다 하루가 끝납니다.",
                color: "cyan",
              },
              {
                Icon: Puzzle,
                title: "툴은 늘고, 매출은 그대로",
                description:
                  "카피/이미지/영상 생성 툴을 따로 쓰고, 결과물을 옮기고, 다시 조합합니다. 비용과 누락이 커집니다.",
                color: "pink",
              },
              {
                Icon: Globe,
                title: "채널이 늘수록 복잡도 폭발",
                description:
                  "쿠팡·네이버·11번가 등 ‘규격/정책/운영 방식’이 달라서 반복 작업이 쌓입니다. 결국 확장을 포기합니다.",
                color: "indigo",
              },
              {
                Icon: FileSpreadsheet,
                title: "리포트는 엑셀로, 결정은 감으로",
                description:
                  "성과 확인/정리/보고가 늦어지면 타이밍을 놓칩니다. 결국 ‘다음 액션’을 감으로 결정합니다.",
                color: "yellow",
              },
              {
                Icon: Wallet,
                title: "외주·툴 구독비가 새는 구조",
                description:
                  "디자인/영상 외주와 각종 구독료가 누적됩니다. ROI가 불명확한데도 계속 비용이 나갑니다.",
                color: "cyan",
              },
              {
                Icon: UploadCloud,
                title: "생성은 됐는데, ‘실행’이 안 됨",
                description:
                  "좋은 소재가 있어도 업로드·운영이 막혀서 매출로 이어지지 않습니다. Execution Gap이 핵심 병목입니다.",
                color: "pink",
              },
            ].map((item, index) => {
              const Icon = item.Icon;
              return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className={`bg-slate-800/30 backdrop-blur-xl border-t-4 border-${item.color}-500 rounded-2xl p-8 hover:bg-slate-800/50 transition-colors`}
              >
                <div className="mb-4 flex text-slate-300"><Icon className="w-12 h-12" strokeWidth={1.5} /></div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.description}</p>
              </motion.div>
            );
            })}
          </div>

          <div className="text-center mt-12">
            <a
              href={APP_URLS.cmo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900/60 border border-cyan-500/30 rounded-full font-semibold text-cyan-300 hover:bg-slate-900/80 hover:border-cyan-500/50 transition-all"
            >
              내 상품으로 1회 무료 실행
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* ROI */}
      <section
        aria-labelledby="roi-title"
        className="py-24 border-t border-slate-800/50"
        id="roi"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-block px-4 py-1 rounded-full bg-cyan-900/30 text-cyan-400 font-semibold text-sm mb-4">
              ROI · 신뢰
            </div>
            <h2 id="roi-title" className="text-3xl md:text-5xl font-bold mb-4 text-white">
              결과로 <span className="text-cyan-400">설득</span>합니다
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Marketing OS는 “시간 절감”을 넘어, “실행 속도”를 올려 매출로 연결하는 시스템입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                Icon: Gauge,
                title: "전환율",
                value: "+20~40%",
                desc: "소재·카피·템플릿 자동화 → 업로드 속도 향상 → 테스트 횟수 증가",
              },
              {
                Icon: Clock,
                title: "등록/운영 시간",
                value: "2시간 → 10분",
                desc: "생성부터 업로드·보고까지 한 번에 연결",
              },
              {
                Icon: Layers,
                title: "실행 범위",
                value: "다채널",
                desc: "쿠팡·네이버·11번가 등 채널 확장에 맞춰 운영 복잡도 감소",
              },
            ].map((k) => {
              const Icon = k.Icon;
              return (
                <motion.div
                  key={k.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-slate-800/30 backdrop-blur-xl border border-slate-700 rounded-2xl p-8"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-slate-400 text-sm font-semibold">{k.title}</div>
                      <div className="text-white text-3xl font-extrabold">{k.value}</div>
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{k.desc}</p>
                  <p className="text-slate-500 text-xs mt-4">* 보수적 가이드 범위. 업종/채널/상품에 따라 상이</p>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <a
              href={APP_URLS.cmo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-full font-semibold hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all"
            >
              전환율 개선 플로우 적용하기
              <ArrowRight className="w-5 h-5" />
            </a>
            <p className="text-slate-500 text-xs mt-3">무료 1회로 실행해 볼 수 있습니다.</p>
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
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="inline-block px-4 py-1 rounded-full bg-slate-700/50 text-slate-300 font-semibold text-sm">
                  그 다음: 경쟁사 분석
                </span>
                <a
                  href={APP_URLS.ceoRader}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 text-xs font-medium transition-colors"
                >
                  CEO Rader 앱
                  <ArrowRight className="w-3 h-3" />
                </a>
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

      {/* Operating System Proof */}
      <section className="py-24 bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1 rounded-full bg-cyan-900/30 text-cyan-400 font-semibold text-sm mb-4"
            >
              운영 시스템
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-6"
            >
              보고 → 승인 → 실행 → 학습
              <br />
              <span className="text-cyan-400">매출 최적화 루프</span>가 돌아갑니다
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg text-slate-400 max-w-2xl mx-auto mb-4"
            >
              명령하는 툴이 아니라, <strong className="text-white">AI가 분석해서 먼저 보고하는 대시보드</strong>입니다.
              실행·전략 수립은 AI가 하고, 대표님은 <strong className="text-cyan-400">승인</strong>만 합니다.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm text-slate-500 max-w-2xl mx-auto mb-8"
            >
              우리만의 <strong className="text-slate-400">AI2AI</strong> 기술로 CFO Tool on AI·CEO Rader AI·LowestAlert AI·PMS on AI 등 <strong className="text-cyan-400">너한테 필요한 모든 걸</strong> 이어 드립니다.
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
                시스템 작동 방식 보기 <ArrowRight size={20} />
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

          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { Icon: ShieldCheck, title: "운영 신뢰", desc: "대시보드 보고·승인 중심 UX" },
              { Icon: FileSpreadsheet, title: "보고 자동화", desc: "성과/현황이 자동으로 정리" },
              { Icon: UploadCloud, title: "실행 자동화", desc: "업로드/배포까지 연결" },
            ].map((x) => {
              const Icon = x.Icon;
              return (
                <div key={x.title} className="bg-slate-900/40 border border-slate-700 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-2 text-slate-200 font-semibold">
                    <Icon className="w-5 h-5 text-cyan-400" />
                    {x.title}
                  </div>
                  <p className="text-slate-400 text-sm">{x.desc}</p>
                </div>
              );
            })}
          </div>
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
              { value: "OS", label: "운영 시스템으로 통합" },
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
      <section aria-labelledby="features-title" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2
              id="features-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-6"
            >
              “기능”이 아니라 “운영 결과”를 만듭니다
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg text-slate-400 max-w-2xl mx-auto mb-4"
            >
              필요한 건 “더 많은 기능”이 아니라, 실행이 빠르게 반복되는 시스템입니다. Marketing OS는 운영에 필요한 필수 기능만 묶어 ‘파이프라인’으로 제공합니다.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="w-8 h-8" />,
                title: "카피·문구 자동화",
                description: "채널별 톤과 목적에 맞춘 문구가 자동 생성됩니다",
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "광고 이미지·템플릿",
                description: "시나리오에 맞는 이미지/템플릿이 자동 생성됩니다",
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "광고 동영상 제작",
                description: "SNS/쇼핑몰용 영상 소재가 자동 생성됩니다",
              },
              {
                icon: <CheckCircle className="w-8 h-8" />,
                title: "다채널 자동 업로드",
                description: "쿠팡, 네이버, 11번가 등 주요 커머스 동시 등록",
              },
              {
                icon: <Star className="w-8 h-8" />,
                title: "대시보드 리포트",
                description: "현황·성과·승인 대기 전략이 한 화면에 올라옵니다",
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "24/7 운영 자동화",
                description: "대표님이 자는 시간에도 시스템은 돌아갑니다",
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
              기술·아키텍처 보기 <ArrowRight size={20} />
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
              이미 <span className="text-cyan-400">사용</span>되고 있습니다
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-slate-500 text-sm mb-8"
            >
              “툴”이 아니라 “운영 시스템”으로 쓰이고 있습니다
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[
              { quote: "기존에 2시간 넘게 걸리던 마켓 등록이 10분 안에 끝났어요. 전환율도 40% 넘게 올랐습니다.", author: "김민준", role: "패션 브랜드 대표" },
              { quote: "카피·이미지 자동 생성하고 대시보드에서 승인만 누르니까 저녁에 10분이면 끝나요. 전에 같았으면 새벽까지 했을 겁니다.", author: "오준혁", role: "잡화 셀러" },
              { quote: "AI 전략 리포트만 보고 원클릭 승인하는 흐름이 정말 직관적이에요. 찾아보지 않아도 돼서 좋습니다.", author: "이서연", role: "푸드 소셜커머스" },
              { quote: "경쟁사 가격 변동 알림 받고 대응 전략 승인만 했는데 실제로 주문량이 늘었어요. 대시보드가 진짜 보고해주네요.", author: "박지훈", role: "생활용품 셀러" },
              { quote: "채팅으로 일일이 물어보는 게 아니라 들어가면 이미 정리돼 있어서 시간이 엄청 줄었습니다.", author: "최유나", role: "뷰티 크리에이터" },
              { quote: "쿠팡, 네이버, 11번가 한 번에 올라가게 해줘서 재고 관리만 하면 됩니다. 마케팅은 AI가 다 해줘요.", author: "정현우", role: "가전 제품 판매" },
              { quote: "1회 무료로 실행해보고 바로 유료 전환했어요. ROI가 확실해서 팀원들도 같이 쓰고 있습니다.", author: "한소희", role: "스타트업 공동대표" },
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
            <p className="text-slate-500 text-sm mb-6">지원사업 · 파트너 검토 현황</p>
            <div className="flex flex-wrap justify-center gap-8 items-center">
              {["예창패 지원중", "청창사 지원중", "TIPS 검토 중", "민간 투자 검토 중", "민간 파트너 검토 중"].map((label, i) => (
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
            오늘, <span className="text-cyan-400">Marketing OS</span>를 켜세요
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl text-slate-300 mb-8"
          >
            1회 무료로 실행해 보고, 대시보드가 “먼저 보고”하는 운영을 경험해 보세요. 신용카드 없이 시작 가능합니다.
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
              오늘 Marketing OS 켜기
            </a>
            <Link
              to="/pricing"
              className="px-10 py-5 border-2 border-slate-600 rounded-full text-xl font-semibold hover:border-cyan-400 hover:text-cyan-400 transition-all"
            >
              프로 무제한 보기
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
