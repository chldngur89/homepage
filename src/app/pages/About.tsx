import { useCopy } from "@/app/i18n/useCopy";
import { ClosingCta, PageHero, Section, SectionLabel } from "@/app/components/page";

export default function About() {
  const copy = useCopy();
  const t = copy.about;
  const common = copy.common;

  return (
    <div className="bg-ground">
      <PageHero
        eyebrow={t.hero.eyebrow}
        titleLine1={t.hero.titleLine1}
        titleLine2={t.hero.titleLine2}
        body={t.hero.body}
      />

      {/* 01 미션과 비전 — 전환 전 이 섹션에는 제목이 없고 카드 두 장만
          있었다(각각 <h2 className="text-2xl">Mission</h2>, Vision). 섹션의
          heading 이 하나 필요하므로 라벨을 h2 로 승격시키고, 두 카드 제목은
          섹션 안에 들어가므로 h3 로 내린다 — 전환 전에는 둘 다 h2 라 문서
          윤곽이 평평했다. */}
      <Section id="purpose-h">
        <SectionLabel index="01" as="h2" id="purpose-h">
          {t.purpose.label}
        </SectionLabel>

        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {t.purpose.items.map((item) => (
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

      {/* 02 왜 만들었나 — 전환 전 이 섹션의 제목은 <h2>왜 만들었나</h2> 였다.
          새 디자인에서 섹션 이름이 서는 자리가 라벨이라 같은 글자를 라벨로
          옮기고 h2 로 승격시켰다(기술 02 설계 원칙과 같은 처리).

          본문을 감싸던 둥근 카드(어두운 테두리 + 반투명 배경)는 두지 않았다.
          그 테두리가 하던 일 — 어두운 배경에서 글을 떼어내는 것 —
          을 새 디자인에서는 섹션 배경(panel)이 한다. 전환된 다른 페이지에서
          카드는 항상 둘 이상이 격자로 서고, 본문만 담은 전폭 카드 한 장은
          이 디자인 언어에 없는 모양이다. 문구는 그대로다. */}
      <Section id="why-h" tone="panel">
        <SectionLabel index="02" as="h2" id="why-h">
          {t.why.label}
        </SectionLabel>

        <div className="mt-10 max-w-[38em]">
          <p className="text-[17.5px] leading-[1.75] text-ink-2">{t.why.lead}</p>
          <p className="mt-5 text-[17.5px] leading-[1.75] text-ink-2">
            {t.why.bodyBefore}
            <strong className="font-semibold text-ink">{t.why.bodyEmphasis}</strong>
            {t.why.bodyAfter}
          </p>
          <p className="mt-7 text-[14.5px] leading-[1.7] text-ink-3">{t.why.note}</p>
        </div>
      </Section>

      {/* 03 로드맵 (예정) — 전환 전 제목은 <h2>로드맵 (예정)</h2> 였고, 02와
          같은 이유로 라벨 자리로 옮겨 h2 로 승격시켰다. 세 단계는 솔루션의
          '한 사이클'·기술의 '성장 파이프라인'과 같은 순서 있는 목록이라 같은
          격자를 쓴다 — 같은 것이 페이지마다 다르게 보이면 안 된다. */}
      <Section id="roadmap-h">
        <SectionLabel index="03" as="h2" id="roadmap-h">
          {t.roadmap.label}
        </SectionLabel>

        <ol className="mt-10 grid gap-px [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
          {t.roadmap.steps.map((step) => (
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

      {/* 보조 버튼은 전환 전과 같이 문의 페이지로 간다(`<Link to="/contact">
          문의·IR 요청</Link>`). 목적지와 라벨은 한 자리에서 같이 적는다 —
          둘이 떨어져 있으면 조용히 어긋난다. */}
      <ClosingCta
        title={t.cta.title}
        primaryLabel={common.cta.primary}
        secondaryLabel={t.cta.secondary}
        secondaryTo="/contact"
      />
    </div>
  );
}
