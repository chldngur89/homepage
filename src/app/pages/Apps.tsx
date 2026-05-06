import { motion } from "motion/react";
import { ArrowRight, Zap, BarChart3, BookOpen, Activity, Bell, Calendar } from "lucide-react";
import { APPS } from "@/app/config/apps";
import siteContent from "@/content/site.json";

const appPriority: Record<string, number> = {
  mebody: 1,
  "aircon-call": 2,
};

/** CTO 활동 앱은 마지막에 모아 배치 */
const sortedApps = [...APPS].sort((a, b) => (appPriority[a.id] ?? 0) - (appPriority[b.id] ?? 0));

const airconCallBrand = {
  companyMarkSrc: "/apps/living-bridge-mark-square.png",
  serviceMarkSrc: "/apps/acnow-mark-square.png",
  title: "리빙브릿지의 ACnow",
} as const;

const iconByAppId: Record<string, React.ReactNode> = {
  cmo: <Zap className="w-8 h-8 text-white" />,
  "cfo-tool": <BarChart3 className="w-8 h-8 text-white" />,
  "ceo-rader": <BookOpen className="w-8 h-8 text-white" />,
  "lowest-alert": <Bell className="w-8 h-8 text-white" />,
  pms: <Calendar className="w-8 h-8 text-white" />,
  mebody: <Activity className="w-8 h-8 text-white" />,
};

const specialCardStyles = {
  mebody: {
    cardClass: "bg-slate-800/30 border-slate-700",
    hoverBorder: "hover:border-emerald-500/50",
    iconClass: "w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600",
    buttonClass: "bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]",
    badgeClass: "bg-emerald-900/40 text-emerald-300",
    badgeLabel: "CTO 활동",
  },
  "aircon-call": {
    cardClass:
      "bg-gradient-to-br from-white/[0.10] via-slate-900/95 to-blue-950/80 border-slate-200/15 shadow-[0_18px_70px_rgba(59,130,246,0.12)]",
    hoverBorder: "hover:border-sky-200/50",
    titleClass: "text-slate-50",
    descriptionClass: "text-slate-300",
    buttonClass:
      "bg-white text-blue-700 hover:bg-sky-50 hover:shadow-[0_0_24px_rgba(255,255,255,0.22)]",
    badgeClass: "bg-white/95 text-blue-700 shadow-[0_8px_16px_rgba(255,255,255,0.08)]",
    badgeLabel: "CTO 활동",
  },
} as const;

const defaultCardStyles = {
  cardClass: "bg-slate-800/30 border-slate-700",
  hoverBorder: "hover:border-cyan-500/50",
  iconClass: "w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600",
  titleClass: "text-white",
  descriptionClass: "text-slate-400",
  buttonClass: "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]",
};

export default function Apps() {
  return (
    <div className="bg-slate-950 min-h-screen py-24">
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-block px-4 py-1 rounded-full bg-cyan-900/30 text-cyan-400 font-semibold text-sm mb-6">
            {siteContent.appsPage?.badge ?? "웹/앱 서비스"}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-cyan-400">{siteContent.appsPage?.titleHighlight ?? "너한테 필요한 모든 걸"}</span> 다 이어 줍니다
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            {siteContent.appsPage?.description ?? "Marketing OS 앱 AutoCMO, ACnow, CEO Rader AI, CFO Tool on AI, LowestAlert AI, PMS on AI까지 웹에서 바로 사용하거나 새 탭에서 열어보세요."}
          </p>
        </motion.div>
      </section>

      <section className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sortedApps.map((app, index) => {
            const isAirconCall = app.id === "aircon-call";
            const specialStyles = specialCardStyles[app.id as keyof typeof specialCardStyles];
            const cardClass = specialStyles?.cardClass ?? defaultCardStyles.cardClass;
            const hoverBorder = specialStyles?.hoverBorder ?? defaultCardStyles.hoverBorder;
            const iconClass = specialStyles?.iconClass ?? defaultCardStyles.iconClass;
            const titleClass = specialStyles?.titleClass ?? defaultCardStyles.titleClass;
            const descriptionClass = specialStyles?.descriptionClass ?? defaultCardStyles.descriptionClass;
            const buttonClass = specialStyles?.buttonClass ?? defaultCardStyles.buttonClass;
            return (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-2xl p-8 transition-all flex flex-col border backdrop-blur-xl ${cardClass} ${hoverBorder}`}
              >
                {isAirconCall ? (
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-[1.35rem] bg-white p-2 shadow-[0_16px_32px_rgba(255,255,255,0.08)]">
                      <img src={airconCallBrand.companyMarkSrc} alt="리빙브릿지 로고" className="h-full w-full object-contain" />
                    </div>
                    <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-[1.35rem] bg-white p-2 shadow-[0_16px_32px_rgba(255,255,255,0.08)]">
                      <img src={airconCallBrand.serviceMarkSrc} alt="ACnow 로고" className="h-full w-full object-contain" />
                    </div>
                  </div>
                ) : (
                  <div className={`mb-6 flex items-center justify-center overflow-hidden ${iconClass}`}>
                    {iconByAppId[app.id] ?? <Zap className="w-8 h-8 text-white" />}
                  </div>
                )}
                <div className="mb-2 flex items-start gap-2">
                  <h2 className={`min-w-0 flex-1 text-xl font-bold break-words ${titleClass}`}>{isAirconCall ? airconCallBrand.title : app.name}</h2>
                  {specialStyles && (
                    <span className={`mt-0.5 shrink-0 px-2 py-0.5 rounded-md text-xs font-medium ${specialStyles.badgeClass}`}>{specialStyles.badgeLabel}</span>
                  )}
                </div>
                <p className={`text-sm mb-6 flex-1 ${descriptionClass}`}>{app.description}</p>
                <a
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl font-semibold transition-all ${buttonClass}`}
                >
                  바로 사용하기
                  <ArrowRight className="w-5 h-5" />
                </a>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-slate-500 text-sm mt-10"
        >
          모든 앱은 브라우저에서 바로 사용 가능합니다. 클릭 시 새 탭에서 열립니다.
        </motion.p>
      </section>
    </div>
  );
}
