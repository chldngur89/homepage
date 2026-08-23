import { LocaleLink } from "@/app/components/LocaleLink";
import { SHELL } from "./shell";

/**
 * `useCopy()` 가 돌려주는 사전은 `DeepWiden<typeof koLegal>` 이라 리프
 * 리터럴이 `string` 으로 넓혀져 있다 — `@/content/ko/legal` 의 `LegalCopy` 를
 * 그대로 쓰면 `as const` 리터럴 타입을 요구해서 `useCopy().legal.privacy` 가
 * 넘어오지 못한다. 이 컴포넌트가 실제로 읽는 모양만 여기서 다시 적는다.
 */
type LegalDoc = {
  title: string;
  updated: string;
  sections: readonly {
    heading: string;
    body: string;
    bullets: readonly string[];
  }[];
};

/**
 * 개인정보처리방침·이용약관 공용 골격. 두 문서는 제목 + "최종 업데이트" 줄
 * + 조항 목록 + 맨 아래 홈 링크로 구조가 완전히 같고, 다른 것은 사전 키
 * (`privacy` / `terms`) 하나뿐이다 — `Privacy.tsx`/`Terms.tsx` 는 이 컴포넌트에
 * 사전을 골라 넘기는 얇은 래퍼가 된다.
 *
 * **`Section` 프리미티브를 쓰지 않는다.** `Section`(`./section.tsx`)은
 * `aria-labelledby` 를 하나만 받고 그 안에 `BLOCK`(72~112px 패딩)과 전폭
 * 헤어라인을 두른다. 조항마다 `Section` 을 쓰면 7개 조항 사이에 그 패딩과
 * 헤어라인이 들어가 "순서대로 읽는 문서" 가 카드 그리드처럼 쪼개진다. 대신
 * 조항마다 패딩 없는 맨 `<section aria-labelledby={id}>` + `<h2 id={id}>` 를
 * 쓰고, 문서 전체를 `SHELL` 로 한 번만 감싼다. 조항 사이 간격은 `mt` 로만
 * 준다.
 *
 * `SHELL` 은 반드시 `./shell` 에서 가져온다 — 배럴(`./index`)에서 가져오면
 * index → LegalDocument → index 순환 임포트가 생긴다(`index.tsx` 상단 주석
 * 참고, 이 계획에서 이미 한 번 고친 함정이다).
 *
 * 법무 문서라 카피는 한 글자도 다시 쓰지 않는다 — 이 컴포넌트가 하는 일은
 * 마크업과 시각 언어뿐이다.
 */
export function LegalDocument({
  doc,
  homeLink,
}: {
  doc: LegalDoc;
  homeLink: string;
}) {
  return (
    <div className="bg-ground">
      <div className={`${SHELL} py-[clamp(56px,7vw,96px)]`}>
        <div className="rise">
          <h1 className="text-[clamp(30px,4vw,44px)] font-bold leading-[1.2] tracking-[-0.03em]">
            {doc.title}
          </h1>
          <p className="mt-3 text-[15px] text-ink-3">{doc.updated}</p>
        </div>

        <div className="mt-[clamp(40px,5vw,64px)] space-y-[clamp(40px,5vw,56px)]">
          {doc.sections.map((section, index) => {
            const headingId = `legal-h-${index}`;

            return (
              <section key={headingId} aria-labelledby={headingId}>
                <h2 id={headingId} className="text-[20px] font-bold tracking-[-0.02em]">
                  {section.heading}
                </h2>
                <p className="mt-4 text-[15.5px] leading-[1.8] text-ink-2">{section.body}</p>
                {section.bullets.length > 0 && (
                  <ul className="mt-4 list-disc space-y-2 pl-6 text-[15.5px] leading-[1.8] text-ink-2">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </section>
            );
          })}
        </div>

        <div className="mt-[clamp(48px,6vw,72px)] border-t border-line pt-8">
          <LocaleLink to="/" className="text-[15px] font-semibold text-brand">
            {homeLink}
          </LocaleLink>
        </div>
      </div>
    </div>
  );
}
