import { SHELL } from "./shell";

/**
 * 내부 페이지의 히어로. `Section` 의 기본 패딩(BLOCK)과 위아래 간격이 달라
 * `Section` 을 쓸 수 없고, 그래서 계획 1~2에서 페이지마다 손으로 복사돼
 * 있었다 — 각 사본에 "왜 직접 짰는지" 주석까지 같이 복사됐다.
 *
 * 여기 있는 형태는 솔루션·요금 페이지의 히어로와 **글자 하나까지 같은**
 * 것만 옮긴 것이다. 홈(좌우 스플릿 + 제품 목업), 데모(히어로 안에 CTA 와
 * 고지 문구), 문의(제목이 한 줄 + IR 안내 문단)는 모양이 달라 승격에서
 * 제외했다 — prop 을 늘려 억지로 삼키면 승격의 이득이 사라진다.
 */
export function PageHero({
  eyebrow,
  titleLine1,
  titleLine2,
  body,
}: {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  body?: string;
}) {
  return (
    <section aria-labelledby="hero-h" className="border-b border-line">
      <div className={`${SHELL} pb-[clamp(64px,7vw,104px)] pt-[clamp(56px,7vw,96px)]`}>
        <div className="rise">
          <p className="mb-[22px] text-[13px] font-semibold uppercase tracking-[0.1em] text-brand">
            {eyebrow}
          </p>
          <h1
            id="hero-h"
            className="max-w-[14em] text-[clamp(38px,5.2vw,60px)] font-bold leading-[1.14] tracking-[-0.035em]"
          >
            {titleLine1}
            <br />
            {titleLine2}
          </h1>
          {body && (
            <p className="mt-[26px] max-w-[34em] text-[18px] leading-[1.65] text-ink-2">{body}</p>
          )}
        </div>
      </div>
    </section>
  );
}
