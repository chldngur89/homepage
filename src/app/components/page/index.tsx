import type { ReactNode } from "react";

export const SHELL = "mx-auto max-w-[1180px] px-[clamp(20px,4vw,40px)]";
export const BLOCK = "py-[clamp(72px,8vw,112px)]";

export function Section({
  id,
  tone = "ground",
  children,
}: {
  id: string;
  tone?: "ground" | "panel";
  children: ReactNode;
}) {
  return (
    <section
      aria-labelledby={id}
      className={`border-b border-line ${tone === "panel" ? "bg-panel" : "bg-ground"}`}
    >
      <div className={`${SHELL} ${BLOCK}`}>{children}</div>
    </section>
  );
}

/**
 * 기본은 시각적 라벨(`<p>`)이지만, 06 파일럿 피드백처럼 섹션에 별도의
 * `<h2>` 타이틀이 없는 경우 `as="h2"` 로 이 라벨 자체를 그 섹션의 제목으로
 * 승격시킬 수 있다 — 클래스는 그대로라 외관은 바뀌지 않는다.
 */
export function SectionLabel({
  index,
  as: Tag = "p",
  id,
  children,
}: {
  index: string;
  as?: "p" | "h2";
  id?: string;
  children: ReactNode;
}) {
  return (
    <Tag id={id} className="mb-4 text-[12.5px] font-semibold tracking-[0.12em] text-ink-3">
      {index}&nbsp;&nbsp;{children}
    </Tag>
  );
}

/** 사전의 \n 을 <br> 로 바꾼다. 제목의 줄바꿈 위치가 디자인의 일부다. */
export function Lines({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, index) => (
        <span key={index}>
          {index > 0 && <br />}
          {line}
        </span>
      ))}
    </>
  );
}
