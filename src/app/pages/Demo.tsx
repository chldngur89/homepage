import { Link } from "react-router";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { ExternalLink, Check, Loader, PlayCircle, Radar } from "lucide-react";
import { APP_URLS } from "@/app/config/apps";
import siteContent from "@/content/site.json";

type DemoPageContent = {
  heroBadge: string;
  heroTitleBefore: string;
  heroTitleAccent: string;
  heroSubtitle: string;
  heroDisclaimer: string;
  primaryCta: string;
  simulateTitle: string;
  simulateSubtitle: string;
  simulateButton: string;
  simulateAgain: string;
  simulateDone: string;
  playbookLabels: string[];
  bridgeTitle: string;
  bridgeBody: string;
  bridgeRaderCta: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaPricing: string;
  ctaContact: string;
};

const demo = siteContent.demoPage as DemoPageContent;

export default function Demo() {
  const [simOpen, setSimOpen] = useState(false);
  const [simIdx, setSimIdx] = useState(0);
  const [simDone, setSimDone] = useState(false);

  const startSimulation = () => {
    setSimDone(false);
    setSimIdx(0);
    setSimOpen(true);
  };

  useEffect(() => {
    if (!simOpen || simDone) return;
    const max = demo.playbookLabels.length - 1;
    if (simIdx < max) {
      const t = setTimeout(() => setSimIdx((x) => x + 1), 720);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setSimDone(true), 640);
    return () => clearTimeout(t);
  }, [simOpen, simIdx, simDone]);

  return (
    <div className="bg-slate-950 min-h-screen py-24">
      <section className="max-w-3xl mx-auto px-6 mb-10 md:mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-block px-4 py-1 rounded-full bg-cyan-900/30 text-cyan-400 font-semibold text-sm mb-5">
            {demo.heroBadge}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 leading-[1.15]">
            <span className="text-white">{demo.heroTitleBefore}</span>
            <br />
            <span className="text-cyan-400">{demo.heroTitleAccent}</span>
          </h1>
          <p className="text-slate-400 max-w-lg mx-auto mb-8 text-base md:text-lg leading-relaxed">
            {demo.heroSubtitle}
          </p>
          <a
            href={APP_URLS.cmo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-full text-base font-semibold hover:shadow-[0_0_28px_rgba(6,182,212,0.45)] transition-all"
          >
            {demo.primaryCta}
            <ExternalLink className="w-5 h-5" />
          </a>
          <p className="text-slate-600 text-sm max-w-md mx-auto mt-6">{demo.heroDisclaimer}</p>
        </motion.div>
      </section>

      <section className="max-w-3xl mx-auto px-6 mb-10 md:mb-12">
        <div className="rounded-2xl border border-cyan-500/25 bg-gradient-to-br from-cyan-950/40 to-slate-900/60 p-6 md:p-8 text-left">
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-400/90 mb-2">
            Marketing OS
          </p>
          <h2 className="text-lg md:text-xl font-bold text-white mb-3">{demo.bridgeTitle}</h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-5">{demo.bridgeBody}</p>
          <a
            href={APP_URLS.ceoRader}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300"
          >
            <Radar className="w-4 h-4" />
            {demo.bridgeRaderCta}
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-20">
        <div className="rounded-3xl border border-slate-700 bg-slate-900/50 p-8 md:p-10">
          <div className="flex items-start gap-3 mb-6">
            <PlayCircle className="w-8 h-8 text-cyan-400 shrink-0" strokeWidth={1.5} />
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-1">{demo.simulateTitle}</h2>
              <p className="text-slate-500 text-sm">{demo.simulateSubtitle}</p>
            </div>
          </div>

          {!simOpen ? (
            <button
              type="button"
              onClick={startSimulation}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 font-semibold text-white hover:opacity-95 transition-opacity"
            >
              {demo.simulateButton}
            </button>
          ) : (
            <div className="space-y-3">
              {demo.playbookLabels.map((label, i) => {
                const active = simIdx >= i;
                const spinning = simIdx === i && !simDone;
                return (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`flex items-center gap-3 rounded-xl p-4 border ${
                      active ? "border-cyan-500/40 bg-cyan-950/20" : "border-slate-700/50 bg-slate-800/30"
                    }`}
                  >
                    <div className="shrink-0 w-8 h-8 flex items-center justify-center">
                      {simDone && active ? (
                        <Check className="w-5 h-5 text-emerald-400" />
                      ) : spinning ? (
                        <Loader className="w-5 h-5 text-cyan-400 animate-spin" />
                      ) : active ? (
                        <Check className="w-5 h-5 text-cyan-400" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-slate-600" />
                      )}
                    </div>
                    <span className={`text-sm md:text-base ${active ? "text-slate-200" : "text-slate-500"}`}>
                      {label}
                    </span>
                  </motion.div>
                );
              })}

              {simDone ? (
                <div className="pt-4 space-y-3">
                  <p className="text-center text-slate-400 text-sm">{demo.simulateDone}</p>
                  <button
                    type="button"
                    onClick={() => {
                      setSimDone(false);
                      setSimIdx(0);
                    }}
                    className="w-full py-3 rounded-xl border border-slate-600 text-slate-300 font-medium hover:bg-slate-800 transition-colors"
                  >
                    {demo.simulateAgain}
                  </button>
                </div>
              ) : (
                <p className="text-center text-xs text-slate-500 mt-2">단계가 자동으로 진행됩니다…</p>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 text-center pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">{demo.ctaTitle}</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">{demo.ctaSubtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={APP_URLS.cmo}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-full text-lg font-semibold hover:shadow-[0_0_30px_rgba(6,182,212,0.45)] transition-all inline-flex items-center justify-center gap-2"
            >
              {demo.primaryCta}
              <ExternalLink className="w-5 h-5" />
            </a>
            <Link
              to="/pricing"
              className="px-8 py-4 border-2 border-slate-600 rounded-full text-lg font-semibold hover:border-cyan-400 hover:text-cyan-400 transition-all"
            >
              {demo.ctaPricing}
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 border-2 border-slate-600 rounded-full text-lg font-semibold hover:border-cyan-400 hover:text-cyan-400 transition-all"
            >
              {demo.ctaContact}
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
