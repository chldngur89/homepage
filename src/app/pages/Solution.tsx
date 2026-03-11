import { Link } from "react-router";
import { APP_URLS } from "@/app/config/apps";
import { motion } from "motion/react";
import { ArrowRight, MessageSquare, Image, Video, Upload, Check, Sparkles, BarChart2, Zap, PenLine, Camera, Film, ShoppingCart, DollarSign, Target, TrendingUp, Moon, Brain } from "lucide-react";

export default function Solution() {
  return (
    <div className="bg-slate-950 min-h-screen py-24">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1 rounded-full bg-cyan-900/30 text-cyan-400 font-semibold text-sm mb-6">
            솔루션
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-cyan-400">Zero-Click Intelligence</span>로
            <br />
            대시보드만 보면 됩니다
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            창업가·판매자를 위한 CMO AI Agent. 상품 사진과 마켓만 선택하면, AI가 실행·분석을 보고하고 최적의 다음 행동(Next Action)을 제안합니다.
          </p>
        </motion.div>
      </section>

      {/* Before vs After */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="bg-indigo-900/20 rounded-3xl p-8 md:p-12 border border-indigo-500/20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              기존 방식 vs <span className="text-cyan-400">AutoCMO</span>
            </h2>
            <p className="text-lg text-slate-400">
              파편화된 작업 흐름을 원스톱으로 통합
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Before */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-900 rounded-2xl p-8 border border-red-500/30"
            >
              <div className="text-red-400 font-bold mb-6 flex items-center gap-2 text-xl">
                <span>❌</span> 기존 방식 (Before)
              </div>
              <div className="space-y-4">
                <div className="bg-slate-800 p-4 rounded border border-slate-700">
                  <div className="font-semibold mb-2">1단계: 아이디어 구상</div>
                  <div className="text-sm text-slate-400">수동 기획 및 브레인스토밍</div>
                </div>
                <div className="flex justify-center text-slate-500 text-2xl">↓</div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-800 p-4 rounded border border-slate-700 text-sm">
                    <strong>ChatGPT</strong>
                    <div className="text-slate-400 text-xs mt-1">카피라이팅</div>
                  </div>
                  <div className="bg-slate-800 p-4 rounded border border-slate-700 text-sm">
                    <strong>Midjourney</strong>
                    <div className="text-slate-400 text-xs mt-1">이미지 생성</div>
                  </div>
                </div>
                <div className="flex justify-center text-slate-500 text-2xl">↓</div>
                <div className="bg-slate-800 p-4 rounded border border-yellow-500 text-center">
                  <div className="font-semibold text-yellow-500 mb-1">수동 편집 및 조합</div>
                  <div className="text-sm text-slate-400">포토샵/프리미어 작업 필요</div>
                </div>
                <div className="flex justify-center text-slate-500 text-2xl">↓</div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-800 p-4 rounded border border-slate-700 text-sm text-center">
                    쿠팡
                    <div className="text-slate-400 text-xs mt-1">수동 등록</div>
                  </div>
                  <div className="bg-slate-800 p-4 rounded border border-slate-700 text-sm text-center">
                    네이버
                    <div className="text-slate-400 text-xs mt-1">수동 등록</div>
                  </div>
                </div>
                <div className="text-center pt-4 border-t border-slate-700">
                  <div className="text-red-400 font-bold text-lg">소요 시간: 2-3시간+</div>
                  <div className="text-sm text-slate-400 mt-1">전문 기술 필요</div>
                </div>
              </div>
            </motion.div>

            {/* After */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-slate-900 to-indigo-900/30 rounded-2xl p-8 border border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.15)]"
            >
              <div className="text-cyan-400 font-bold mb-6 flex items-center gap-2 text-xl">
                <Sparkles className="w-5 h-5" strokeWidth={1.5} /> AutoCMO 방식 (After)
              </div>
              <div className="space-y-6 flex flex-col justify-center h-full">
                <div className="bg-slate-800/80 border border-cyan-500/30 p-6 rounded-xl text-left">
                  <div className="text-cyan-400 font-semibold mb-2 flex items-center gap-2"><BarChart2 className="w-4 h-4" strokeWidth={1.5} /> AI 전략 리포트</div>
                  <div className="text-sm text-slate-300 italic">
                    "현재 B 마켓의 전환율이 낮습니다. 경쟁사 C의 신규 프로모션 때문으로 파악되니, 즉시 반값 할인을 실행할까요?"
                  </div>
                  <button className="mt-4 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 rounded-lg text-sm font-semibold text-white transition-colors">
                    ✓ 원클릭 승인
                  </button>
                </div>

                <div className="text-center">
                  <div className="text-cyan-400 text-2xl font-bold animate-pulse py-4 flex items-center justify-center gap-2">
                    결정(Decision)에 집중
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-4 text-xs">
                    <div className="bg-slate-800/50 p-2 rounded border border-cyan-500/30">
                      <MessageSquare className="w-4 h-4 mx-auto mb-1 text-cyan-400" />
                      인사이트
                    </div>
                    <div className="bg-slate-800/50 p-2 rounded border border-cyan-500/30">
                      <Image className="w-4 h-4 mx-auto mb-1 text-cyan-400" />
                      승인 대기
                    </div>
                    <div className="bg-slate-800/50 p-2 rounded border border-cyan-500/30">
                      <Video className="w-4 h-4 mx-auto mb-1 text-cyan-400" />
                      실행
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-cyan-600 to-indigo-600 p-6 rounded-xl text-center font-bold shadow-lg">
                  <div className="mb-3 flex justify-center text-white"><Zap className="w-10 h-10" strokeWidth={1.5} /></div>
                  <div className="text-lg mb-2">실행 → 분석 → 다음 최적 행동 제안 (선순환)</div>
                  <div className="text-sm text-cyan-100">대시보드만 보시면 됩니다</div>
                </div>

                <div className="text-center pt-4 border-t border-cyan-500/30">
                  <div className="text-cyan-400 font-bold text-2xl">소요 시간: 1분</div>
                  <div className="text-sm text-slate-300 mt-1 flex items-center justify-center gap-1">전문 기술 불필요 <Sparkles className="w-4 h-4 text-cyan-400" strokeWidth={1.5} /></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works - CMO Agent 플로우 */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            어떻게 <span className="text-cyan-400">작동</span>하나요?
          </h2>
          <p className="text-lg text-slate-400 mb-4">
            4단계로 완성되는 마케팅 자동화
          </p>
          <p className="text-slate-300 max-w-2xl mx-auto">
            상품(예: <strong className="text-white">수박</strong>)만 넣으면 AI가 시나리오를 만들고, 그에 맞는 이미지·동영상을 만들어 여러 플랫폼에 올려드립니다. <span className="text-cyan-400 font-medium">대표님·판매자는 대시보드만 보시면 됩니다.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: "01",
              icon: <Upload className="w-10 h-10" />,
              title: "제품 사진 업로드",
              description: "스마트폰으로 찍은 제품 사진 1장만 있으면 충분합니다",
              color: "cyan",
            },
            {
              step: "02",
              icon: <MessageSquare className="w-10 h-10" />,
              title: "마켓 선택",
              description: "판매할 마켓(쿠팡, 네이버 등)만 선택하면 AI가 나머지를 제안합니다",
              color: "indigo",
            },
            {
              step: "03",
              icon: <Video className="w-10 h-10" />,
              title: "AI 콘텐츠 생성",
              description: "GPT-4o, NanoBanana, VEO가 모든 콘텐츠를 자동 생성",
              color: "pink",
            },
            {
              step: "04",
              icon: <Check className="w-10 h-10" />,
              title: "자동 배포",
              description: "주요 커머스 플랫폼에 최적화된 형태로 동시 업로드",
              color: "yellow",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative bg-slate-800/30 backdrop-blur-xl border border-slate-700 rounded-2xl p-8 hover:border-cyan-500/50 transition-all"
            >
              <div className={`absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-${item.color}-500 to-${item.color}-600 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg`}>
                {item.step}
              </div>
              <div className={`text-${item.color}-400 mb-4 mt-4`}>{item.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-slate-400">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* AI 전략 리포트 (대시보드) */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            대시보드: <span className="text-cyan-400">AI 전략 리포트</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            단순 판매량 그래프가 아닌, AI 분석 코멘트와 원클릭 승인 버튼이 있는 결정(Decision) 중심 화면
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-800/30 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-8 md:p-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">💬</span> AI 분석 코멘트
              </h3>
              <p className="text-slate-400 mb-4">
                예: "현재 B 마켓의 전환율이 낮습니다. 경쟁사 C의 신규 프로모션 때문으로 파악되니, 즉시 반값 할인을 실행할까요?"
              </p>
              <p className="text-sm text-slate-500">
                대시보드에서 실시간 상황과 권장 Next Action을 한눈에 확인하세요.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">✅</span> 원클릭 승인 버튼
              </h3>
              <p className="text-slate-400 mb-4">
                AI가 제안한 전략을 그대로 실행할지, 대시보드에서 한 번에 승인하세요. 다크 모드·미니멀 디자인 톤을 유지한 채 '결정'에만 집중하는 UX입니다.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* AI 마켓 가디언 */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-pink-400">AI 마켓 가디언</span> (Market Guardian)
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            우리 데이터만 보는 게 아니라, 경쟁사 활동을 실시간으로 크롤링해 대표님께 브리핑합니다
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-pink-900/20 to-indigo-900/20 border border-pink-500/30 rounded-2xl p-8 md:p-10"
        >
          <ul className="space-y-2 text-slate-400 mb-6">
            <li>· 외부 경쟁사 가격 변동, 리뷰 키워드 변화, 신규 광고 소재를 실시간 수집</li>
            <li>· AI가 분석한 인사이트를 대화형 보고로 전달</li>
          </ul>
          <div className="bg-slate-900/60 rounded-xl p-6 border border-pink-500/20">
            <div className="text-pink-400 font-semibold mb-2">AI 페르소나 대화형 보고 예시</div>
            <p className="text-slate-300 italic">
              "대표님, 지금 경쟁사들이 쓰는 카피보다 우리 AI가 생성한 'XX' 키워드 반응이 더 좋습니다. 이대로 유지하시죠."
            </p>
          </div>
        </motion.div>
      </section>

      {/* Key Features */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            핵심 <span className="text-indigo-400">기능</span>
          </h2>
        </div>

        <div className="space-y-8">
          {[
            {
              title: "지능형 카피라이팅",
              description: "제품 특성을 분석해 타겟 고객을 사로잡는 매력적인 마케팅 문구를 자동 생성합니다. SEO 최적화는 물론 각 플랫폼의 가이드라인에 완벽히 부합합니다.",
              Icon: PenLine,
              gradient: "from-cyan-500 to-blue-600",
            },
            {
              title: "프로급 제품샷 생성",
              description: "평범한 제품 사진을 전문가가 촬영한 것 같은 고퀄리티 이미지로 변환합니다. 배경 제거, 조명 보정, 스타일링까지 자동으로 처리됩니다.",
              Icon: Camera,
              gradient: "from-pink-500 to-purple-600",
            },
            {
              title: "바이럴 숏폼 영상",
              description: "SNS 트렌드를 반영한 15초~30초 숏폼 영상을 자동 제작합니다. 인스타그램 릴스, 유튜브 쇼츠, 틱톡 등에 바로 활용 가능합니다.",
              Icon: Film,
              gradient: "from-indigo-500 to-cyan-600",
            },
            {
              title: "다채널 자동 업로드",
              description: "쿠팡, 네이버 스마트스토어, 11번가, 옥션, G마켓 등 국내 주요 커머스 플랫폼에 한 번에 등록됩니다. 각 플랫폼의 규격에 맞게 자동 최적화됩니다.",
              Icon: ShoppingCart,
              gradient: "from-yellow-500 to-orange-600",
            },
          ].map((feature, index) => {
            const FeatureIcon = feature.Icon;
            return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-800/30 backdrop-blur-xl border border-slate-700 rounded-2xl p-8 hover:border-slate-600 transition-all"
            >
              <div className="flex items-start gap-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg text-white`}>
                  <FeatureIcon className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-400 text-lg leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </motion.div>
            );
          })}
        </div>
      </section>

      {/* R&D 비전 · AI2AI · Web5 딥테크 */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-cyan-400">AI2AI</span>: Web5 시대, 각 AI를 연결하는 기술
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Web2.0과 Web3.0이 합쳐지는 Web5의 생태계로 넘어갈 때, 각각의 AI가 효과적으로 연결되는 AI 기술입니다.
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-800/30 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-8 md:p-10"
        >
          <p className="text-slate-300 leading-relaxed mb-4">
            우리는 이 연결 기술을 R&D와 딥테크의 핵심으로 연구하고 있습니다. A의 객체와 B의 객체를 AI가 연결하고, 궁극적으로는 <strong className="text-cyan-400">AI와 AI를 AI가 연결하는</strong> 구조를 지향합니다.
          </p>
          <p className="text-slate-400 leading-relaxed">
            AutoCMO(CMO AI Agent)는 그 첫 번째 적용 사례이며, CFO·CEO AI 등 더 많은 에이전트를 AI2AI로 이어 나가고 있습니다.
          </p>
        </motion.div>
      </section>

      {/* Benefits */}
      <section className="bg-gradient-to-br from-indigo-900/20 to-pink-900/10 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              왜 <span className="text-cyan-400">AutoCMO</span>인가요?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "95% 시간 절약", description: "2-3시간 걸리던 작업을 1분으로 단축", Icon: Zap },
              { title: "월 30만원 비용 절감", description: "개별 AI 툴 구독료 + 디자이너 비용 절약", Icon: DollarSign },
              { title: "전문성 불필요", description: "디자인/마케팅 지식 없이도 프로급 결과물", Icon: Target },
              { title: "매출 3배 증가", description: "다채널 동시 판매로 노출과 전환율 향상", Icon: TrendingUp },
              { title: "24/7 자동화", description: "시간과 장소 제약 없이 언제든 작업 가능", Icon: Moon },
              { title: "지속적인 개선", description: "AI가 판매 데이터를 학습해 성과 최적화", Icon: Brain },
            ].map((benefit, index) => {
              const BenefitIcon = benefit.Icon;
              return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-xl p-6 text-center hover:border-cyan-500/50 transition-all"
              >
                <div className="mb-4 flex justify-center text-cyan-400"><BenefitIcon className="w-12 h-12" strokeWidth={1.5} /></div>
                <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-slate-400">{benefit.description}</p>
              </motion.div>
            );
            })}
          </div>
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
            지금 바로 체험해보세요
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            신용카드 등록 없이 무료로 시작할 수 있습니다
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={APP_URLS.cmo}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-full text-lg font-semibold hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all inline-flex items-center justify-center gap-2"
            >
              AI 마케팅 총괄(CMO) 임명하기
              <ArrowRight size={20} />
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
