import type { ReactNode } from "react";
import { BLOCK, SHELL } from "./shell";

/**
 * 페이지 본문을 이루는 섹션 프리미티브. 배럴(`index.tsx`)이 아니라 여기
 * 있는 이유는 `shell.ts` 와 같다 — 배럴은 재수출만 하고 아무것도 정의하지
 * 않아야, `page/` 안에 새 모듈이 생겼을 때 그 모듈이 `Section` 이나
 * `Lines` 를 쓰려고 `./index` 를 임포트해 순환을 되살리는 일이 없다.
 *
 * 호출부는 이 파일을 알 필요가 없다. `index.tsx` 가 재수출하므로
 * `import { Section } from "@/app/components/page"` 는 전과 똑같이 동작한다.
 */

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
