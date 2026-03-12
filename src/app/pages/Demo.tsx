import { Link } from "react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { Upload, Send, Loader, Check, Download, Smartphone, ExternalLink, Camera, Lightbulb, PenLine, Image as ImageIcon, Zap } from "lucide-react";
import { APP_URLS } from "@/app/config/apps";

export default function Demo() {
  const [step, setStep] = useState<"upload" | "chat" | "processing" | "result">("upload");
  const [message, setMessage] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        setStep("chat");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setStep("processing");
      setTimeout(() => {
        setStep("result");
      }, 3000);
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen py-24">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-block px-4 py-1 rounded-full bg-cyan-900/30 text-cyan-400 font-semibold text-sm mb-6">
            CMO 임명하기
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-cyan-400">1분</span>이면 충분합니다
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
            창업가·판매자를 위해 제품 사진과 간단한 메시지로 전문가 수준의 마케팅 콘텐츠를 만들어보세요
          </p>
          <a
            href={APP_URLS.cmo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-full text-xl font-semibold hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all mb-6"
          >
            지금 AutoCMO 앱에서 사용하기
            <ExternalLink className="w-5 h-5" />
          </a>
          <p className="text-slate-500 text-sm max-w-2xl mx-auto">
            아래는 체험용 시뮬레이션입니다. 실제 앱에서는 <strong className="text-slate-400">대시보드 AI 전략 리포트</strong>와 <strong className="text-slate-400">원클릭 승인</strong>으로 실시간 운영을 경험하실 수 있습니다.
          </p>
        </motion.div>
      </section>

      {/* Interactive Demo */}
      <section className="max-w-5xl mx-auto px-6 mb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-3xl p-8 md:p-12"
        >
          {/* Step Upload */}
          {step === "upload" && (
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Upload className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">제품 사진을 업로드하세요</h2>
              <p className="text-slate-400 mb-8">스마트폰으로 찍은 사진도 OK!</p>

              <label className="block">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="cursor-pointer border-2 border-dashed border-slate-600 hover:border-cyan-500 rounded-2xl p-12 transition-all">
                  <div className="mb-4 flex justify-center text-cyan-400"><Camera className="w-16 h-16" strokeWidth={1.5} /></div>
                  <div className="text-lg text-slate-300 font-semibold mb-2">
                    클릭하거나 드래그하여 업로드
                  </div>
                  <div className="text-sm text-slate-500">JPG, PNG, WEBP (최대 10MB)</div>
                </div>
              </label>

              <div className="mt-8 text-sm text-slate-500">
                실제 사진이 없다면 데모 이미지로 체험하기:
                <button
                  onClick={() => {
                    setUploadedImage("https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800");
                    setStep("chat");
                  }}
                  className="ml-2 text-cyan-400 hover:text-cyan-300 underline"
                >
                  샘플 이미지 사용
                </button>
              </div>
            </div>
          )}

          {/* Step Chat */}
          {step === "chat" && (
            <div>
              <div className="flex items-start gap-6 mb-8">
                <div className="w-32 h-32 rounded-xl overflow-hidden border-2 border-cyan-500 flex-shrink-0">
                  {uploadedImage && (
                    <img src={uploadedImage} alt="Product" className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-green-400 mb-2">
                    <Check className="w-5 h-5" />
                    <span className="font-semibold">이미지 업로드 완료</span>
                  </div>
                  <button
                    onClick={() => {
                      setUploadedImage(null);
                      setStep("upload");
                    }}
                    className="text-sm text-slate-500 hover:text-slate-300 underline"
                  >
                    다른 이미지 선택
                  </button>
                </div>
              </div>

              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Send className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4 text-center">
                어떤 마케팅을 원하시나요?
              </h2>
              <p className="text-slate-400 mb-8 text-center">
                자연스럽게 말하듯이 입력하세요
              </p>

              <form onSubmit={handleSubmit}>
                <div className="bg-slate-800 rounded-2xl p-4 mb-4">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder='예시: "여름 프로모션으로 20% 할인 강조해서 만들어줘"'
                    className="w-full bg-transparent text-white placeholder-slate-500 resize-none outline-none"
                    rows={4}
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={!message.trim()}
                    className="flex-1 py-4 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-xl font-semibold hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Send size={20} />
                    생성 시작
                  </button>
                </div>
              </form>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                {[
                  "봄맞이 신상품 출시 이벤트",
                  "여름 휴가 특가 세일",
                  "추석 선물용으로 홍보",
                ].map((example, i) => (
                  <button
                    key={i}
                    onClick={() => setMessage(example)}
                    className="py-2 px-4 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors text-left flex items-center gap-2"
                  >
                    <Lightbulb className="w-4 h-4 text-cyan-400 shrink-0" strokeWidth={1.5} /> {example}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step Processing */}
          {step === "processing" && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
                <Loader className="w-10 h-10 text-white animate-spin" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">AI가 작업 중입니다</h2>
              <p className="text-slate-400 mb-12">잠시만 기다려주세요...</p>

              <div className="max-w-2xl mx-auto space-y-6">
                {[
                  { label: "제품 분석 중", delay: 0 },
                  { label: "마케팅 카피 생성 중", delay: 0.5 },
                  { label: "이미지 최적화 중", delay: 1 },
                  { label: "마켓 업로드 준비 중", delay: 1.5 },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: item.delay }}
                    className="flex items-center gap-4 bg-slate-800/50 rounded-xl p-4"
                  >
                    <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-slate-300">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Step Result */}
          {step === "result" && (
            <div>
              <div className="text-center mb-12">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">완성되었습니다!</h2>
                <p className="text-slate-400">소요 시간: <strong className="text-cyan-400">47초</strong></p>
              </div>

              <div className="space-y-6 mb-8">
                {/* Generated Copy */}
                <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2"><PenLine className="w-5 h-5 text-cyan-400" strokeWidth={1.5} /> 생성된 마케팅 카피</h3>
                    <button className="text-sm text-cyan-400 hover:text-cyan-300">복사</button>
                  </div>
                  <div className="bg-slate-900 rounded-xl p-4 text-slate-300 leading-relaxed">
                    <p className="mb-3">
                      <strong className="text-white">여름 대특가! 지금이 기회입니다</strong>
                    </p>
                    <p>
                      무더운 여름, 시원한 가격으로 만나보세요! 프리미엄 품질은 그대로, 가격은 20% 할인된 특별한 기회.
                      한정 수량이니 서두르세요. 지금 구매하고 올 여름을 더욱 특별하게 만드세요!
                    </p>
                  </div>
                </div>

                {/* Generated Images */}
                <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2"><ImageIcon className="w-5 h-5 text-cyan-400" strokeWidth={1.5} /> 최적화된 제품 이미지</h3>
                    <button className="text-sm text-cyan-400 hover:text-cyan-300">다운로드</button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {uploadedImage && (
                      <>
                        <div className="aspect-square bg-slate-900 rounded-xl overflow-hidden">
                          <img src={uploadedImage} alt="Generated 1" className="w-full h-full object-cover" />
                        </div>
                        <div className="aspect-square bg-slate-900 rounded-xl overflow-hidden">
                          <img src={uploadedImage} alt="Generated 2" className="w-full h-full object-cover opacity-90" />
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Upload Status */}
                <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Zap className="w-5 h-5 text-cyan-400" strokeWidth={1.5} /> 마켓 업로드 현황</h3>
                  <div className="space-y-3">
                    {[
                      { name: "쿠팡", status: "완료" },
                      { name: "네이버 스마트스토어", status: "완료" },
                      { name: "11번가", status: "완료" },
                      { name: "G마켓", status: "완료" },
                    ].map((market, i) => (
                      <div key={i} className="flex items-center justify-between bg-slate-900 rounded-lg p-3">
                        <span className="text-slate-300">{market.name}</span>
                        <span className="flex items-center gap-2 text-green-400 font-semibold">
                          <Check size={16} />
                          {market.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setStep("upload");
                    setMessage("");
                    setUploadedImage(null);
                  }}
                  className="flex-1 py-4 bg-slate-700 hover:bg-slate-600 rounded-xl font-semibold transition-colors"
                >
                  다시 시도하기
                </button>
                <button className="flex-1 py-4 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-xl font-semibold hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all flex items-center justify-center gap-2">
                  <Download size={20} />
                  전체 다운로드
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </section>

      {/* App Download Section */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="bg-gradient-to-br from-indigo-900/30 to-pink-900/20 border border-indigo-500/30 rounded-3xl p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-1 rounded-full bg-indigo-900/50 text-indigo-400 font-semibold text-sm mb-4">
                모바일 앱
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                <span className="text-cyan-400">언제 어디서나</span>
                <br />
                스마트폰으로 쉽게
              </h2>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                iOS와 Android 앱을 다운로드하고 이동 중에도 마케팅 콘텐츠를 생성하세요.
                푸시 알림으로 업로드 완료 시점을 실시간으로 확인할 수 있습니다.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex items-center justify-center gap-3 px-6 py-3 bg-black rounded-xl hover:bg-slate-900 transition-colors border border-slate-700">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="white">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs text-slate-400">Download on the</div>
                    <div className="text-lg font-semibold">App Store</div>
                  </div>
                </button>

                <button className="flex items-center justify-center gap-3 px-6 py-3 bg-black rounded-xl hover:bg-slate-900 transition-colors border border-slate-700">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="white">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs text-slate-400">GET IT ON</div>
                    <div className="text-lg font-semibold">Google Play</div>
                  </div>
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="relative w-64 h-[500px] mx-auto bg-slate-800 rounded-[3rem] border-8 border-slate-900 shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-slate-900 rounded-b-3xl"></div>
                <div className="w-full h-full bg-gradient-to-br from-cyan-500/20 to-indigo-600/20 flex items-center justify-center">
                  <Smartphone className="w-24 h-24 text-cyan-400" />
                </div>
              </div>
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-pink-500/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            마음에 드셨나요?
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            지금 바로 무료로 시작하거나 더 많은 기능을 확인해보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/pricing"
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-full text-lg font-semibold hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all"
            >
              요금제 보기
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 border-2 border-slate-600 rounded-full text-lg font-semibold hover:border-cyan-400 hover:text-cyan-400 transition-all"
            >
              문의하기
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
