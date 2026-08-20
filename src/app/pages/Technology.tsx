import { useCopy } from "@/app/i18n/useCopy";
import { ClosingCta, PageHero, Section, SectionLabel } from "@/app/components/page";

export default function Technology() {
  const copy = useCopy();
  const t = copy.technology;
  const common = copy.common;

  return (
    <div className="bg-ground">
      <PageHero
        eyebrow={t.hero.eyebrow}
        titleLine1={t.hero.titleLine1}
        titleLine2={t.hero.titleLine2}
        body={t.hero.body}
      />

      {/* 01 성장 파이프라인 — 전환 전 이 섹션에는 제목이 없고 카드 네 장만
          있었다. 섹션의 heading 이 하나 필요하므로 라벨을 h2 로 승격시킨다
          (솔루션 03, 홈 06과 같은 처리). 네 단계는 솔루션의 '한 사이클'과
          같은 내용이라 같은 격자를 쓴다 — 같은 것이 페이지마다 다르게
          보이면 안 된다. */}
      <Section id="pipeline-h">
        <SectionLabel index="01" as="h2" id="pipeline-h">
          {t.pipeline.label}
        </SectionLabel>

        <ol className="mt-10 grid gap-px [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
          {t.pipeline.steps.map((step) => (
            <li
              key={step.phase}
              className="bg-surface px-6 pb-7 pt-[26px] shadow-[0_0_0_1px_var(--line-2)]"
            >
              <span className="block text-[12px] font-bold tracking-[0.1em] text-brand">
                {step.phase}
              </span>
              <h3 className="mt-3 text-[23px] font-semibold tracking-[-0.02em]">{step.title}</h3>
              <p className="mt-3.5 text-[15.5px] leading-[1.7] text-ink-2">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 02 설계 원칙 — 전환 전 이 섹션의 제목은 <h2>설계 원칙</h2> 이었다.
          새 디자인에서 섹션 이름이 서는 자리가 라벨이라 같은 글자를 라벨로
          옮기고 h2 로 승격시켰다. 이름은 그대로이고 자리만 옮긴 것이다. */}
      <Section id="principles-h" tone="panel">
        <SectionLabel index="02" as="h2" id="principles-h">
          {t.principles.label}
        </SectionLabel>

        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {t.principles.items.map((item) => (
            <li
              key={item.title}
              className="rounded-[14px] border border-line-2 bg-surface p-[clamp(24px,3vw,34px)]"
            >
              <h3 className="text-[19px] font-semibold tracking-[-0.02em]">{item.title}</h3>
              <p className="mt-3 text-[15.5px] leading-[1.7] text-ink-2">{item.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 보조 버튼은 전환 전과 같이 솔루션 페이지로 간다. 목적지와 라벨은
          한 자리에서 같이 적는다 — 둘이 떨어져 있으면 조용히 어긋난다. */}
      <ClosingCta
        title={t.cta.title}
        primaryLabel={common.cta.primary}
        secondaryLabel={t.cta.secondary}
        secondaryTo="/solution"
      />
    </div>
  );
}
