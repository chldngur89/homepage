import { useCopy } from "@/app/i18n/useCopy";
import { MockChrome, MockFrame } from "./frame";

export function ResultDashboard() {
  const { dashboard } = useCopy().mockups;

  return (
    <MockFrame ratio="16 / 9">
      <MockChrome label={dashboard.appLabel} />
      <div className="flex min-h-0 flex-1 flex-col px-5 py-4">
        <p className="text-[15px] font-semibold tracking-[-0.01em] text-ink">
          {dashboard.heading}
        </p>

        <div className="mt-3 grid grid-cols-4 border-t-2 border-ink">
          {dashboard.stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`py-3 ${index < 3 ? "border-r border-line" : ""} ${
                index === 0 ? "pr-3" : "px-3"
              }`}
            >
              <p className="truncate text-[10.5px] text-ink-3">{stat.label}</p>
              <p
                className={`mt-1 text-[19px] font-semibold tracking-[-0.02em] ${
                  stat.highlight ? "text-brand" : "text-ink"
                }`}
              >
                {stat.value}
                <span className="text-[11px] font-medium text-ink-2">{stat.unit}</span>
              </p>
            </div>
          ))}
        </div>

        <div className="mt-3 min-h-0 flex-1 space-y-2 border-t border-line pt-3">
          {dashboard.channels.map((channel) => (
            <div key={channel.name} className="flex items-center gap-3">
              <span className="w-24 shrink-0 truncate text-[11px] text-ink-2">
                {channel.name}
              </span>
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-panel">
                <span
                  className="block h-full rounded-full bg-brand"
                  style={{ width: `${channel.share}%` }}
                />
              </span>
              <span className="w-9 shrink-0 text-right text-[11px] tabular-nums text-ink-3">
                {channel.share}%
              </span>
            </div>
          ))}
        </div>

        <p className="mt-3 border-t border-line pt-3 text-[11.5px] leading-[1.55] text-ink-2">
          <strong className="font-semibold text-ink">{dashboard.nextLabel} — </strong>
          {dashboard.next}
        </p>
      </div>
    </MockFrame>
  );
}
