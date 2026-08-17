import type { ReactNode } from "react";

/** 목업 상단의 앱 바. 실제 제품처럼 보이되 브랜드 팔레트를 벗어나지 않는다. */
export function MockChrome({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-line-2 bg-panel px-4 py-2.5">
      <span className="flex gap-1.5" aria-hidden="true">
        <span className="h-2 w-2 rounded-full bg-line" />
        <span className="h-2 w-2 rounded-full bg-line" />
        <span className="h-2 w-2 rounded-full bg-line" />
      </span>
      <span className="ml-1 text-[11px] font-semibold tracking-[0.08em] text-ink-3">
        {label}
      </span>
    </div>
  );
}

export function MockFrame({
  ratio,
  children,
  className = "",
}: {
  ratio: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`w-full overflow-hidden rounded-[14px] border border-line-2 bg-surface shadow-[0_1px_2px_rgba(0,0,0,.04),0_8px_24px_rgba(0,0,0,.04)] ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <div className="flex h-full flex-col">{children}</div>
    </div>
  );
}
