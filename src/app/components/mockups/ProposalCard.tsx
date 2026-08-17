import { useCopy } from "@/app/i18n/useCopy";
import { MockChrome, MockFrame } from "./frame";

export function ProposalCard() {
  const { proposal } = useCopy().mockups;

  return (
    <MockFrame ratio="4 / 3">
      <MockChrome label={proposal.appLabel} />
      <div className="flex min-h-0 flex-1 flex-col px-5 py-4">
        <div className="flex items-baseline justify-between">
          <p className="text-[15px] font-semibold tracking-[-0.01em] text-ink">
            {proposal.heading}
          </p>
          <p className="text-[11px] text-ink-3">{proposal.weekLabel}</p>
        </div>

        <ul className="mt-3 min-h-0 flex-1 divide-y divide-line-2 overflow-hidden border-t border-line-2">
          {proposal.items.map((item) => (
            <li key={item.title} className="flex items-center gap-3 py-2.5">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
              />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-medium text-ink">
                  {item.title}
                </span>
                <span className="block truncate text-[11px] text-ink-3">{item.meta}</span>
              </span>
              <span className="shrink-0 rounded-md bg-panel px-2 py-0.5 text-[10px] font-semibold text-ink-2">
                {item.state}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-3 flex items-center gap-2 border-t border-line-2 pt-3">
          <span className="flex h-8 items-center rounded-lg bg-invert px-3 text-[12px] font-semibold text-white">
            {proposal.approve}
          </span>
          <span className="flex h-8 items-center rounded-lg border border-line px-3 text-[12px] font-semibold text-ink-2">
            {proposal.review}
          </span>
          <span className="ml-auto text-[11px] text-ink-3">{proposal.approveHint}</span>
        </div>
      </div>
    </MockFrame>
  );
}
