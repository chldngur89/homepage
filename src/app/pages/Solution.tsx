import { useCopy } from "@/app/i18n/useCopy";
import { ClosingCta, PageHero, Section, SectionLabel } from "@/app/components/page";

/**
 * 비교 섹션의 두 열. 같은 마크업을 강조만 바꿔 두 번 쓰므로 한 곳에 둔다.
 * 강조 쪽만 흰 카드(surface)로 띄우고, 눌러 둘 쪽은 배경 없이 헤어라인
 * 아웃라인만 남긴다 — 이전 디자인의 시안(cyan) 테두리·배경이 하던 구분을
 * 그라데이션이나 글로우 없이 대신한다.
 */
function CompareCard({
  emphasis,
  items,
  title,
}: {
  emphasis: boolean;
  items: readonly string[];
  title: string;
}) {
  return (
    <div
      className={`rounded-[14px] border border-line-2 p-[clamp(24px,3vw,34px)] ${
        emphasis ? "bg-surface" : ""
      }`}
    >
      <h3
        className={`text-[19px] font-semibold tracking-[-0.02em] ${
          emphasis ? "text-ink" : "text-ink-2"
        }`}
      >
        {title}
      </h3>
      <ul className="mt-5 grid gap-3">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 text-[15.5px] leading-[1.7] text-ink-2">
            <span aria-hidden="true" className={emphasis ? "text-brand" : "text-ink-3"}>
              &mdash;
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Solution() {
  const copy = useCopy();
  const t = copy.solution;
  const common = copy.common;

  return (
    <div className="bg-ground">
      <PageHero
        eyebrow={t.hero.eyebrow}
        titleLine1={t.hero.titleLine1}
        titleLine2={t.hero.titleLine2}
        body={t.hero.body}
      />

      {/* 01 ChatGPT 와의 차이 */}
      <Section id="diff-h">
        <SectionLabel index="01">{t.difference.label}</SectionLabel>
        <h2
          id="diff-h"
          className="max-w-[22em] text-[clamp(28px,3.6vw,38px)] font-semibold leading-[1.28] tracking-[-0.03em]"
        >
          {t.difference.title}
        </h2>

        <div className="mt-11 grid gap-5 md:grid-cols-2">
          <CompareCard
            emphasis={false}
            title={t.difference.tool.title}
            items={t.difference.tool.items}
          />
          <CompareCard emphasis title={t.difference.us.title} items={t.difference.us.items} />
        </div>
      </Section>

      {/* 02 한 사이클 */}
      <Section id="cycle-h" tone="panel">
        <SectionLabel index="02">{t.cycle.label}</SectionLabel>
        <h2
          id="cycle-h"
          className="max-w-[20em] text-[clamp(28px,3.6vw,38px)] font-semibold leading-[1.28] tracking-[-0.03em]"
        >
          {t.cycle.title}
        </h2>

        <ol className="mt-14 grid gap-px [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
          {t.cycle.steps.map((step) => (
            <li
              key={step.step}
              className="bg-surface px-6 pb-7 pt-[26px] shadow-[0_0_0_1px_var(--line-2)]"
            >
              <span className="block text-[12px] font-bold tracking-[0.1em] text-brand">
                {step.step}
              </span>
              <h3 className="mt-3 text-[23px] font-semibold tracking-[-0.02em]">{step.title}</h3>
              <p className="mt-3.5 text-[15.5px] leading-[1.7] text-ink-2">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 03 지금과 이후 — 원래 이 섹션에는 제목이 없었다. 홈 06(파일럿 피드백)과
          같이 라벨 자체를 h2 로 승격시켜 섹션의 heading 으로 쓴다. */}
      <Section id="scope-h">
        <SectionLabel index="03" as="h2" id="scope-h">
          {t.scope.label}
        </SectionLabel>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="rounded-[14px] border border-line-2 bg-surface p-[clamp(24px,3vw,34px)]">
            <h3 className="text-[19px] font-semibold tracking-[-0.02em] text-brand">
              {t.scope.now.title}
            </h3>
            <ul className="mt-5 grid gap-3">
              {t.scope.now.items.map((item) => (
                <li key={item} className="flex gap-2.5 text-[15.5px] leading-[1.7] text-ink-2">
                  <span aria-hidden="true" className="text-brand">
                    &mdash;
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[14px] border border-line-2 p-[clamp(24px,3vw,34px)]">
            <h3 className="text-[19px] font-semibold tracking-[-0.02em] text-ink-2">
              {t.scope.next.title}
            </h3>
            <ul className="mt-5 grid gap-3">
              {t.scope.next.items.map((item) => (
                <li key={item} className="flex gap-2.5 text-[15.5px] leading-[1.7] text-ink-3">
                  <span aria-hidden="true">&middot;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <ClosingCta
        title={t.cta.title}
        primaryLabel={common.cta.primary}
        secondaryLabel={common.cta.demo}
      />
    </div>
  );
}
