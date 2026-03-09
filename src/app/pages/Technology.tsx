import { motion } from "motion/react";
import { Cpu, Cloud, Zap, Shield, Database, Globe } from "lucide-react";

export default function Technology() {
  return (
    <div className="bg-slate-950 min-h-screen py-24">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1 rounded-full bg-indigo-900/30 text-indigo-400 font-semibold text-sm mb-6">
            기술 스택
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            최고 수준의
            <br />
            <span className="text-indigo-400">AI 파이프라인 아키텍처</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            최상급 AI 모델의 조합과 1만 명 동시접속을 견디는 서버리스 환경
          </p>
        </motion.div>
      </section>

      {/* Architecture Pipeline */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            엔드투엔드 <span className="text-cyan-400">자동화 파이프라인</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              phase: "01",
              title: "프론트엔드",
              subtitle: "User App",
              description: "Flutter 기반의 직관적인 모바일/웹 크로스 플랫폼 채팅 인터페이스",
              color: "cyan",
              icon: <Globe className="w-8 h-8" />,
            },
            {
              phase: "02",
              title: "백엔드 / 오케스트레이션",
              subtitle: "FastAPI & LangGraph",
              description: "GCP Cloud Run 서버리스 환경. 사용자의 의도를 분석하고 AI 에이전트들에게 작업을 분배 및 취합",
              color: "indigo",
              icon: <Cpu className="w-8 h-8" />,
              highlight: true,
            },
            {
              phase: "03",
              title: "AI 생성 파이프라인",
              subtitle: "Multi-AI Engine",
              description: "GPT-4o (카피) / NanoBanana (제품샷) / VEO 3.1 (숏폼 영상)",
              color: "pink",
              icon: <Zap className="w-8 h-8" />,
              highlight: true,
            },
            {
              phase: "04",
              title: "자동 배포",
              subtitle: "RPA & API 연동",
              description: "Playwright 기반 RPA 기술로 쿠팡, 네이버 등 주요 커머스 채널 다이렉트 업로드",
              color: "yellow",
              icon: <Cloud className="w-8 h-8" />,
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-slate-800/30 backdrop-blur-xl border rounded-2xl p-6 transition-all ${
                item.highlight
                  ? `border-${item.color}-500/50 bg-gradient-to-br from-${item.color}-900/20 to-transparent`
                  : "border-slate-700 hover:border-slate-600"
              }`}
            >
              <div className={`text-${item.color}-400 text-sm font-bold mb-2`}>
                {item.phase}. {item.title}
              </div>
              <div className={`text-${item.color}-400 mb-4`}>{item.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{item.subtitle}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 text-slate-500 text-sm">
            <ArrowRightIcon className="hidden md:inline" />
            <span className="md:hidden">⬇️</span>
            데이터 흐름이 매끄럽게 연결되어 전체 프로세스가 1분 내 완료됩니다
          </div>
        </div>
      </section>

      {/* AI Models */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            최첨단 <span className="text-pink-400">AI 모델</span> 활용
          </h2>
          <p className="text-lg text-slate-400">각 영역별 최고의 AI를 선별하여 통합</p>
        </div>

        <div className="space-y-6">
          {[
            {
              name: "GPT-4o",
              provider: "OpenAI",
              purpose: "카피라이팅 & 콘텐츠 생성",
              description: "제품 특성을 분석해 매력적인 마케팅 문구와 상세 설명을 자동 생성합니다. 타겟 고객층에 맞는 톤앤매너를 자동 조절하며, SEO 최적화된 키워드를 자연스럽게 포함시킵니다.",
              color: "green",
              metrics: "응답 속도 0.8초 / 정확도 98%",
            },
            {
              name: "NanoBanana",
              provider: "Custom AI",
              purpose: "제품샷 이미지 생성",
              description: "일반 제품 사진을 스튜디오 촬영급 고퀄리티 이미지로 변환합니다. 배경 제거, 조명 보정, 그림자 생성, 스타일링까지 전문 포토그래퍼 수준의 결과물을 제공합니다.",
              color: "purple",
              metrics: "처리 속도 3초 / 해상도 4K",
            },
            {
              name: "VEO 3.1",
              provider: "Google DeepMind",
              purpose: "숏폼 영상 제작",
              description: "제품 이미지와 마케팅 메시지를 조합해 15-30초 길이의 바이럴 숏폼 영상을 자동 제작합니다. 인스타그램 릴스, 유튜브 쇼츠, 틱톡 등 각 플랫폼에 최적화된 형태로 생성됩니다.",
              color: "blue",
              metrics: "생성 시간 12초 / 1080p HD",
            },
          ].map((model, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-800/30 backdrop-blur-xl border border-slate-700 rounded-2xl p-8 hover:border-pink-500/30 transition-all"
            >
              <div className="flex items-start gap-6">
                <div className={`w-16 h-16 bg-gradient-to-br from-${model.color}-500 to-${model.color}-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-2xl font-bold text-white">{model.name}</h3>
                    <span className="px-3 py-1 bg-slate-700 rounded-full text-xs text-slate-300">
                      {model.provider}
                    </span>
                  </div>
                  <div className={`text-${model.color}-400 font-semibold mb-3`}>{model.purpose}</div>
                  <p className="text-slate-400 leading-relaxed mb-4">{model.description}</p>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Zap className="w-4 h-4" />
                    {model.metrics}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Infrastructure */}
      <section className="bg-gradient-to-br from-indigo-900/20 to-slate-950 py-24 mb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              확장 가능한 <span className="text-cyan-400">인프라</span>
            </h2>
            <p className="text-lg text-slate-400">글로벌 수준의 안정성과 성능</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Cloud className="w-10 h-10" />,
                title: "서버리스 아키텍처",
                description: "GCP Cloud Run 기반으로 사용량에 따라 자동으로 확장/축소됩니다. 트래픽이 급증해도 안정적인 서비스를 보장합니다.",
                color: "cyan",
              },
              {
                icon: <Shield className="w-10 h-10" />,
                title: "엔터프라이즈급 보안",
                description: "ISO 27001 인증 기반 데이터 암호화와 접근 제어. 사용자 정보와 제품 데이터를 안전하게 보호합니다.",
                color: "green",
              },
              {
                icon: <Database className="w-10 h-10" />,
                title: "실시간 데이터 동기화",
                description: "Firestore를 활용한 실시간 데이터 동기화로 모든 기기에서 즉시 확인 가능합니다.",
                color: "indigo",
              },
              {
                icon: <Zap className="w-10 h-10" />,
                title: "99.9% 가동률",
                description: "24/7 모니터링과 자동 장애 복구 시스템으로 언제나 안정적인 서비스를 제공합니다.",
                color: "yellow",
              },
              {
                icon: <Globe className="w-10 h-10" />,
                title: "글로벌 CDN",
                description: "전 세계 주요 지역에 분산된 CDN으로 빠른 콘텐츠 전송 속도를 보장합니다.",
                color: "pink",
              },
              {
                icon: <Cpu className="w-10 h-10" />,
                title: "최적화된 성능",
                description: "캐싱, 코드 스플리팅, 레이지 로딩 등 최신 기술로 최상의 사용자 경험을 제공합니다.",
                color: "purple",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/30 backdrop-blur-xl border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all"
              >
                <div className={`text-${feature.color}-400 mb-4`}>{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Details */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            검증된 <span className="text-indigo-400">기술 스택</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-800/30 backdrop-blur-xl border border-slate-700 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6" />
              </div>
              프론트엔드
            </h3>
            <ul className="space-y-3">
              {["Flutter (Web/iOS/Android)", "Material Design 3", "Provider State Management", "WebSocket 실시간 통신"].map(
                (tech, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    {tech}
                  </li>
                )
              )}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-800/30 backdrop-blur-xl border border-slate-700 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center">
                <Cpu className="w-6 h-6" />
              </div>
              백엔드
            </h3>
            <ul className="space-y-3">
              {["Python FastAPI", "LangGraph (AI 오케스트레이션)", "PostgreSQL + Redis", "GCP Cloud Run"].map((tech, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                  {tech}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-800/30 backdrop-blur-xl border border-slate-700 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              AI & ML
            </h3>
            <ul className="space-y-3">
              {["OpenAI GPT-4o API", "Custom NanoBanana Model", "Google VEO 3.1", "LangChain Framework"].map((tech, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300">
                  <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                  {tech}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-800/30 backdrop-blur-xl border border-slate-700 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                <Cloud className="w-6 h-6" />
              </div>
              자동화 & 배포
            </h3>
            <ul className="space-y-3">
              {["Playwright RPA", "커머스 API 연동", "CI/CD Pipeline", "Docker 컨테이너화"].map((tech, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  {tech}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Patents & IP */}
      <section className="max-w-5xl mx-auto px-6 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-indigo-900/30 to-pink-900/20 border border-indigo-500/30 rounded-2xl p-10 text-center"
        >
          <div className="text-5xl mb-6">🛡️</div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            독점적 기술 방어막
          </h3>
          <p className="text-lg text-slate-300 mb-6">
            Chat-to-Action 원천 기술에 대한 <strong className="text-cyan-400">PCT 국제 특허</strong> 출원 준비 중
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="px-4 py-2 bg-slate-800/50 rounded-full text-slate-300 border border-slate-700">
              LangGraph 복합 오케스트레이션
            </div>
            <div className="px-4 py-2 bg-slate-800/50 rounded-full text-slate-300 border border-slate-700">
              멀티 AI 통합 파이프라인
            </div>
            <div className="px-4 py-2 bg-slate-800/50 rounded-full text-slate-300 border border-slate-700">
              RPA 자동 배포 시스템
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 12H19M19 12L12 5M19 12L12 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
