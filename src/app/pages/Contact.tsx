import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send, MessageSquare, Calendar } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    type: "general",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 실제 환경에서는 API 호출
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        type: "general",
        message: "",
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-slate-950 min-h-screen py-24">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1 rounded-full bg-pink-900/30 text-pink-400 font-semibold text-sm mb-6">
            문의하기
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            언제든 <span className="text-cyan-400">연락</span>주세요
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            제품 문의, IR 미팅, 파트너십, 채용 등 무엇이든 환영합니다
          </p>
        </motion.div>
      </section>

      {/* Contact Methods */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Mail className="w-8 h-8" />,
              title: "이메일",
              content: "contact@zeroseller.ai",
              link: "mailto:contact@zeroseller.ai",
              color: "cyan",
            },
            {
              icon: <Phone className="w-8 h-8" />,
              title: "전화",
              content: "+82 10-1234-5678",
              link: "tel:+821012345678",
              color: "indigo",
            },
            {
              icon: <MapPin className="w-8 h-8" />,
              title: "오피스",
              content: "서울특별시 강남구 테헤란로 123",
              link: "#",
              color: "pink",
            },
          ].map((method, index) => (
            <motion.a
              key={index}
              href={method.link}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`bg-slate-800/30 backdrop-blur-xl border border-${method.color}-500/30 rounded-2xl p-8 hover:border-${method.color}-500/50 transition-all text-center group`}
            >
              <div className={`text-${method.color}-400 flex justify-center mb-4 group-hover:scale-110 transition-transform`}>
                {method.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{method.title}</h3>
              <p className="text-slate-400">{method.content}</p>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-800/30 backdrop-blur-xl border border-slate-700 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">문의 남기기</h2>

            {submitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send className="w-10 h-10 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">문의가 전송되었습니다!</h3>
                <p className="text-slate-400">
                  빠른 시일 내에 담당자가 연락드리겠습니다.
                  <br />
                  감사합니다.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                      이름 <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                      placeholder="홍길동"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                      이메일 <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                      placeholder="hong@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">회사명</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                      placeholder="(선택사항)"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">전화번호</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                      placeholder="010-1234-5678"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    문의 유형 <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    <option value="general">일반 문의</option>
                    <option value="sales">제품 구매 상담</option>
                    <option value="ir">IR 미팅 요청</option>
                    <option value="partnership">파트너십 제안</option>
                    <option value="career">채용 문의</option>
                    <option value="technical">기술 지원</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    메시지 <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                    placeholder="문의 내용을 자세히 적어주세요..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-xl font-semibold hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  문의 보내기
                </button>

                <p className="text-xs text-slate-500 text-center">
                  제출하시면 개인정보 처리방침에 동의하는 것으로 간주됩니다
                </p>
              </form>
            )}
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* IR Deck Download */}
            <div className="bg-gradient-to-br from-indigo-900/30 to-slate-900/50 border border-indigo-500/30 rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">IR 미팅 예약</h3>
                  <p className="text-slate-400">
                    투자자 및 파트너를 위한 상세한 IR 프레젠테이션을 준비했습니다
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold transition-colors text-left px-4 flex items-center justify-between">
                  <span>IR 덱 다운로드 (PDF)</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
                <button className="w-full py-3 border-2 border-indigo-500 hover:bg-indigo-500/10 rounded-xl font-semibold transition-colors">
                  온라인 미팅 예약하기
                </button>
              </div>
            </div>

            {/* Live Chat */}
            <div className="bg-gradient-to-br from-cyan-900/30 to-slate-900/50 border border-cyan-500/30 rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">실시간 채팅 상담</h3>
                  <p className="text-slate-400">
                    빠른 답변이 필요하신가요? 지금 바로 채팅으로 문의하세요
                  </p>
                </div>
              </div>
              <button className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
                <MessageSquare size={20} />
                채팅 시작하기
              </button>
              <p className="text-xs text-slate-500 mt-3 text-center">
                운영 시간: 평일 09:00 - 18:00 (KST)
              </p>
            </div>

            {/* FAQ Link */}
            <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-4">자주 묻는 질문</h3>
              <ul className="space-y-3">
                {[
                  { q: "무료 체험 기간은 얼마나 되나요?", link: "/pricing" },
                  { q: "어떤 마켓플레이스를 지원하나요?", link: "/solution" },
                  { q: "기술 스택이 궁금해요", link: "/technology" },
                  { q: "환불 정책은 어떻게 되나요?", link: "/pricing" },
                ].map((faq, i) => (
                  <li key={i}>
                    <a
                      href={faq.link}
                      className="text-slate-400 hover:text-cyan-400 transition-colors text-sm flex items-center gap-2"
                    >
                      <span className="text-cyan-400">→</span>
                      {faq.q}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href="/pricing"
                className="block w-full py-3 mt-6 border border-slate-600 hover:border-cyan-500 hover:text-cyan-400 rounded-xl font-semibold transition-all text-center"
              >
                FAQ 전체 보기
              </a>
            </div>

            {/* Social Links */}
            <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-4">소셜 미디어</h3>
              <p className="text-slate-400 text-sm mb-6">
                최신 소식과 업데이트를 팔로우하세요
              </p>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { name: "Twitter", icon: "𝕏" },
                  { name: "LinkedIn", icon: "in" },
                  { name: "Facebook", icon: "f" },
                  { name: "Instagram", icon: "📷" },
                ].map((social, i) => (
                  <a
                    key={i}
                    href="#"
                    className="aspect-square bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500 rounded-xl flex items-center justify-center text-2xl transition-all"
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Office Location Map Placeholder */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            오피스 <span className="text-cyan-400">위치</span>
          </h2>
          <p className="text-lg text-slate-400">방문 전 미리 연락 주시면 감사하겠습니다</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-800/30 backdrop-blur-xl border border-slate-700 rounded-2xl overflow-hidden"
        >
          <div className="aspect-video bg-slate-900 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-500 text-lg">서울특별시 강남구 테헤란로 123</p>
              <p className="text-slate-600 text-sm mt-2">(지도는 실제 서비스에서 표시됩니다)</p>
            </div>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-2">🚇 지하철</h4>
              <p className="text-sm text-slate-400">2호선 강남역 3번 출구 도보 5분</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">🚌 버스</h4>
              <p className="text-sm text-slate-400">강남역 정류장 하차 (간선 340, 360번)</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">🚗 주차</h4>
              <p className="text-sm text-slate-400">건물 내 유료 주차장 이용 가능</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Response Time */}
      <section className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-pink-900/20 to-slate-900/50 border border-pink-500/30 rounded-2xl p-10"
        >
          <h3 className="text-2xl font-bold text-white mb-4">평균 응답 시간</h3>
          <div className="flex items-center justify-center gap-8 mb-6">
            <div>
              <div className="text-4xl font-bold text-cyan-400 mb-2">2시간</div>
              <div className="text-sm text-slate-400">영업일 기준</div>
            </div>
            <div className="w-px h-16 bg-slate-700"></div>
            <div>
              <div className="text-4xl font-bold text-pink-400 mb-2">24시간</div>
              <div className="text-sm text-slate-400">주말/공휴일</div>
            </div>
          </div>
          <p className="text-slate-400">
            긴급한 문의는 전화로 연락주시면 더 빠르게 도와드릴 수 있습니다
          </p>
        </motion.div>
      </section>
    </div>
  );
}
