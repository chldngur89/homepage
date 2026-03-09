import { Link } from "react-router";
import { motion } from "motion/react";
import { Target, Lightbulb, Users, TrendingUp, Globe, Award } from "lucide-react";

export default function About() {
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
            회사소개
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            누구나 아이디어만으로
            <br />
            <span className="text-cyan-400">글로벌 브랜드</span>를 가지는 세상
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            AutoCMO는 창업가와 판매자의 편리함을 위해 최첨단 AI 기술로 마케팅 장벽을 허물고 있습니다
          </p>
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-cyan-900/20 to-slate-900/50 border border-cyan-500/30 rounded-2xl p-10"
          >
            <div className="w-16 h-16 bg-cyan-500 rounded-2xl flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Mission</h2>
            <p className="text-lg text-slate-300 leading-relaxed">
              전문 지식과 막대한 비용이 필요했던 마케팅을 누구나 쉽게 활용할 수 있도록 민주화합니다.
              AI의 힘으로 창업가·판매자도 대기업과 동등하게 경쟁할 수 있는 환경을 만들고, 일상의 편리함을 드립니다.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-indigo-900/20 to-slate-900/50 border border-indigo-500/30 rounded-2xl p-10"
          >
            <div className="w-16 h-16 bg-indigo-500 rounded-2xl flex items-center justify-center mb-6">
              <Lightbulb className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Vision</h2>
            <p className="text-lg text-slate-300 leading-relaxed">
              2030년까지 글로벌 1위 AI 마케팅 자동화 플랫폼이 되어, 전 세계 1억 명의 개인 브랜드 오너를 탄생시킵니다.
              아이디어와 열정만 있다면 누구나 성공할 수 있는 세상을 만듭니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-5xl mx-auto px-6 mb-32">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-pink-400">AutoCMO</span>의 시작
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-800/30 backdrop-blur-xl border border-slate-700 rounded-2xl p-10"
        >
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              AutoCMO는 창업가·판매자의 불편함을 덜어주고자 하는 경험에서 시작되었습니다. 좋은 제품 아이디어는 있었지만,
              마케팅 전문 지식이 없어 ChatGPT로 카피를 쓰고, Midjourney로 이미지를 만들고, 다시 포토샵으로 편집하고,
              각 마켓마다 수동으로 업로드하는 과정에서 <strong className="text-white">하루 종일 시간을 낭비</strong>했습니다.
            </p>
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              "이 모든 과정을 자동화할 수는 없을까?" 라는 단순한 질문에서 출발한 AutoCMO는, 이제 창업가와 판매자들이
              시간과 비용을 절약하고 매출을 늘릴 수 있도록 편리함을 제공하고 있습니다.
            </p>
            <p className="text-lg text-slate-300 leading-relaxed">
              우리는 기술이 소수의 전문가만을 위한 것이 아니라, <strong className="text-cyan-400">모두를 위한 것</strong>이라고 믿습니다.
              그래서 가장 복잡한 AI 기술을 대시보드 하나로—찾아보지 않아도, 배우지 않아도 되게 만들었습니다.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Agent2Agent: CMO → CFO·CEO 확장 */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-cyan-400">Agent2Agent</span> 기술로 AI를 계속 붙입니다
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            지금은 CMO AI Agent가 주력이지만, 우리만의 Agent2Agent 기술로 새로운 AI가 나올 때마다 쉽게 붙여 쓸 수 있습니다.
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-cyan-900/20 to-indigo-900/20 border border-cyan-500/30 rounded-2xl p-8 md:p-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">지금: CMO AI Agent</h3>
              <p className="text-slate-400 mb-4">
                마케팅·판매를 대시보드 하나로. 창업가·판매자에게 Zero-Click 편리함을 제공합니다.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-4">앞으로: CFO·CEO AI까지</h3>
              <p className="text-slate-400 mb-4">
                우리가 만든 <strong className="text-cyan-400">CFO Tool AI</strong>, <strong className="text-cyan-400">CEO Reader AI</strong> 등 다른 에이전트를 Agent2Agent로 쉽게 연결합니다. AutoCMO를 쓰는 CEO와 쓰지 않는 CEO의 격차가 분명해지도록, 그리고 새 AI가 나올 때마다 바로 붙여 쓸 수 있도록 만듭니다.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Roadmap */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            정부지원사업 기반 <span className="text-green-400">스케일업 로드맵</span>
          </h2>
          <p className="text-lg text-slate-400">
            비희석 자금을 레버리지하여 리스크를 최소화하고 글로벌로 도약합니다
          </p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-500 via-pink-500 to-cyan-500"></div>

          <div className="space-y-16">
            {[
              {
                phase: "Phase 1",
                title: "예비창업패키지 (~2천만 원)",
                period: "2025 Q2-Q3",
                description:
                  "초기 자금 확보 및 MVP 개발 완료. 창업가·판매자 대상 클로즈드 베타 테스트를 진행하여 초기 PMF(Product-Market Fit)를 검증하고 성공 레퍼런스를 확보합니다.",
                color: "yellow",
                status: "진행중",
              },
              {
                phase: "Phase 2",
                title: "청년창업사관학교 (~7천만 원)",
                period: "2025 Q4 - 2026 Q2",
                description:
                  "하이브리드 AI 서버 인프라를 구축하고 글로벌 표준 UI/UX로 고도화합니다. 특히 Zero-Click Intelligence·Self-Reflecting Strategy Loop 원천 기술에 대한 해외 특허(PCT) 출원을 통해 독점적 진입장벽을 형성합니다.",
                color: "pink",
                status: "예정",
              },
              {
                phase: "Phase 3",
                title: "Seed 투자 유치 & TIPS 진입",
                period: "2026 Q3-Q4",
                description:
                  "3억 원 규모의 시드 투자 유치 완료 후 TIPS 프로그램에 진입. R&D를 극대화하여 일본, 대만, 미국 등 크로스보더 커머스 솔루션으로 본격적인 글로벌 확장을 시작합니다.",
                color: "cyan",
                status: "목표",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 ${
                  index % 2 === 0 ? "md:pr-16" : "md:pl-16 md:flex-row-reverse"
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 top-0 -translate-x-1/2">
                  <div className={`w-8 h-8 bg-${item.color}-500 rounded-full border-4 border-slate-950 shadow-lg`}></div>
                </div>

                {/* Content */}
                <div className={`${index % 2 === 0 ? "md:col-start-1" : "md:col-start-2"} ml-12 md:ml-0`}>
                  <div
                    className={`bg-slate-800/30 backdrop-blur-xl border border-${item.color}-500/30 rounded-2xl p-8 hover:border-${item.color}-500/50 transition-all`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 bg-${item.color}-900/30 text-${item.color}-400 rounded-full text-sm font-bold`}>
                        {item.phase}
                      </span>
                      <span className="text-sm text-slate-500">{item.period}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-slate-400 leading-relaxed mb-4">{item.description}</p>
                    <div className={`inline-block px-3 py-1 bg-slate-900 text-${item.color}-400 rounded-lg text-xs font-semibold`}>
                      {item.status}
                    </div>
                  </div>
                </div>

                {/* Empty space for alternating layout */}
                <div className="hidden md:block"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Opportunity */}
      <section className="bg-gradient-to-br from-indigo-900/20 to-slate-950 py-24 mb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              폭발적인 <span className="text-yellow-400">시장 기회</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Globe className="w-10 h-10" />,
                title: "TAM",
                subtitle: "글로벌 크로스보더 커머스",
                value: "$2.5T",
                description: "전세계 크리에이터 이코노미 시장",
                color: "indigo",
              },
              {
                icon: <TrendingUp className="w-10 h-10" />,
                title: "SAM",
                subtitle: "국내 온라인 창업가·판매자",
                value: "120만 명",
                description: "다채널 운영 창업가·판매자 시장",
                color: "pink",
              },
              {
                icon: <Target className="w-10 h-10" />,
                title: "SOM",
                subtitle: "초기 타겟 시장",
                value: "15만 명",
                description: "신규 진입 창업가·판매자",
                color: "cyan",
              },
            ].map((market, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-slate-800/30 backdrop-blur-xl border border-${market.color}-500/30 rounded-2xl p-8 text-center hover:border-${market.color}-500/50 transition-all`}
              >
                <div className={`text-${market.color}-400 flex justify-center mb-4`}>{market.icon}</div>
                <div className={`text-${market.color}-400 font-bold text-lg mb-2`}>{market.title}</div>
                <h3 className="text-xl font-bold text-white mb-3">{market.subtitle}</h3>
                <div className="text-4xl font-bold text-white mb-3">{market.value}</div>
                <p className="text-sm text-slate-400">{market.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            우리의 <span className="text-cyan-400">핵심 가치</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: "🚀",
              title: "고객 성공 우선",
              description: "우리의 성공은 고객의 매출 증가로 증명됩니다",
            },
            {
              icon: "⚡",
              title: "빠른 실행",
              description: "완벽함보다 빠른 출시와 지속적인 개선을 추구합니다",
            },
            {
              icon: "🤝",
              title: "투명한 소통",
              description: "고객, 투자자, 팀과의 솔직하고 열린 대화를 중시합니다",
            },
            {
              icon: "🎯",
              title: "데이터 기반 의사결정",
              description: "직관보다 데이터와 사용자 피드백을 우선합니다",
            },
          ].map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800/30 backdrop-blur-xl border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all"
            >
              <div className="text-5xl mb-4">{value.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
              <p className="text-slate-400">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="max-w-5xl mx-auto px-6 mb-32">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            수상 및 <span className="text-yellow-400">인증</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Award className="w-8 h-8" />,
              title: "예비창업패키지 선정",
              year: "2025",
            },
            {
              icon: <Award className="w-8 h-8" />,
              title: "강원 스타트업 경진대회 우수상",
              year: "2025",
            },
            {
              icon: <Award className="w-8 h-8" />,
              title: "AI 혁신 챌린지 TOP 10",
              year: "2025",
            },
          ].map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-yellow-900/20 to-slate-900/50 border border-yellow-500/30 rounded-xl p-6 text-center"
            >
              <div className="text-yellow-400 flex justify-center mb-4">{award.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2">{award.title}</h3>
              <p className="text-sm text-slate-400">{award.year}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            열정적인 <span className="text-pink-400">팀</span>
          </h2>
          <p className="text-lg text-slate-400">
            AI, 커머스, 마케팅 전문가들이 모여 혁신을 만들어갑니다
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "김혁신",
              role: "CEO & Co-founder",
              bio: "전 커머스 창업가, AI 기술로 창업가·판매자에게 편리함을 전하는 것을 꿈꿉니다",
              image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
            },
            {
              name: "박기술",
              role: "CTO & Co-founder",
              bio: "전 네이버 AI Lab, 10년+ 백엔드 & ML 경험",
              image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
            },
            {
              name: "이성장",
              role: "Head of Growth",
              bio: "전 쿠팡 마케팅, 퍼포먼스 마케팅 전문가",
              image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
            },
          ].map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800/30 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 hover:border-pink-500/50 transition-all"
            >
              <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-pink-500/30">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold text-white text-center mb-2">{member.name}</h3>
              <div className="text-cyan-400 text-center font-semibold mb-3">{member.role}</div>
              <p className="text-sm text-slate-400 text-center leading-relaxed">{member.bio}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-400 mb-6">우리와 함께 혁신을 만들어갈 인재를 찾습니다</p>
          <Link
            to="/contact"
            className="inline-block px-8 py-3 bg-pink-600 hover:bg-pink-500 rounded-xl font-semibold transition-colors"
          >
            채용 문의하기
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-indigo-900/30 to-pink-900/20 border border-indigo-500/30 rounded-2xl p-12"
        >
          <Users className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            이 여정에 <span className="text-cyan-400">함께</span> 하시겠습니까?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            투자자, 파트너, 인재 모두 환영합니다
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-full text-lg font-semibold hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all"
            >
              IR 미팅 요청하기
            </Link>
            <Link
              to="/demo"
              className="px-8 py-4 border-2 border-slate-600 rounded-full text-lg font-semibold hover:border-cyan-400 hover:text-cyan-400 transition-all"
            >
              무료 체험하기
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
