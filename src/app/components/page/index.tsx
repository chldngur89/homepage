import type { ReactNode } from "react";
import { BLOCK, SHELL } from "./shell";

/**
 * 페이지가 쓰는 공용 블록은 전부 이 한 경로(`@/app/components/page`)에서
 * 나간다 — 호출부가 파일 위치를 알 필요가 없다.
 *
 * `SHELL`/`BLOCK` 은 `./shell` 이 정의하고 여기서 재수출만 한다 — 배럴과
 * 그 구성원 사이의 순환 임포트를 만들지 않기 위해서다.
 */
export { SHELL, BLOCK } from "./shell";
export { PageHero } from "./PageHero";
export { ClosingCta } from "./ClosingCta";
export { useProductCta } from "./useProductCta";

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
