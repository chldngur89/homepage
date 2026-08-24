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
 * 문서 폭을 감싸는 좁은 칼럼. 전환 전 페이지는 `max-w-3xl mx-auto px-6` 로
 * 720px 본문 폭을 **가운데 정렬**로 냈다 — 새 디자인의 `SHELL`(1180px)을
 * 그대로 쓰면 문단 폭이 1100px 로 거의 두 배가 되어, 법무 문서처럼 순서대로
 * 읽는 화면에서 줄이 지나치게 길어진다. `<h1>`·조항·목록·홈 링크를 전부 이
 * 칼럼 안에 두어 왼쪽 정렬 기준이 하나로 맞게 한다.
 *
 * `em` 이 아니라 고정 px 를 쓴다 — 래퍼에 `em` 을 쓰면 래퍼 자신이 상속한
 * font-size(16px, 문서 기본값)를 기준으로 계산되지, 안에 있는 15.5px 본문을
 * 기준으로 계산되지 않는다. 의도한 측정값과 조용히 어긋나는 함정이다.
 *
 * **폭 값은 계산이 아니라 실측으로 정했다.** 720px 를 먼저 시도했더니(1440px
 * 데스크톱, `Range.getClientRects()`로 실제 줄바꿈 지점을 측정) 이용약관
 * 제1조(91자)가 두 줄(70자·21자)로만 접혔다 — Pretendard 15.5px 에서 한글
 * 한 글자가 예상보다 좁아(약 9.9px) 720px 는 줄당 70자에 가깝게 수용한다,
 * 목표(약 45자)의 1.5배 이상이라 그대로 쓸 수 없었다. 420px 로 좁히니 평균
 * 37.7자/줄, 480px 로 좁히니 평균 43.2자/줄(약관, 조항 10줄 표본)·41.8자/줄
 * (개인정보, 조항 5줄 표본) — 목표에 근접해 480px 로 확정했다.
 *
 * **`mx-auto` 로 가운데 정렬한다 — SHELL 안에서 왼쪽 붙임이 아니다.** 480px
 * 칼럼을 1180px `SHELL` 안에 왼쪽 정렬로 두면 오른쪽에 약 700px 의 빈 여백이
 * 남아 데스크톱에서 페이지 절반 이상이 비어 보인다(1440px 기준 칼럼 오른쪽
 * 끝이 x=650, 뷰포트의 약 55%가 미사용). 전환 전 페이지도 `mx-auto` 로
 * 가운데 정렬돼 있었으므로, 이것은 새 디자인 결정이 아니라 이 두 페이지가
 * 원래 갖고 있던 배치를 그대로 지키는 것이다. **그 결과 `<h1>` 이 다른 아홉
 * 페이지의 제목보다 안쪽(가운데)에 선다 — 의도된 차이이니 다른 페이지와
 * 맞추겠다고 되돌리지 않는다.** 히어로의 나머지(섹션 래퍼, 헤어라인, 패딩,
 * `<h1>` 스케일)는 아래 주석대로 다른 아홉 페이지와 여전히 같다 — 달라지는
 * 것은 이 칼럼의 배치(가운데 정렬)뿐이다.
 */
const COLUMN = "mx-auto max-w-[480px]";

/**
 * 개인정보처리방침·이용약관 공용 골격. 두 문서는 제목 + "최종 업데이트" 줄
 * + 조항 목록 + 맨 아래 홈 링크로 구조가 완전히 같고, 다른 것은 사전 키
 * (`privacy` / `terms`) 하나뿐이다 — `Privacy.tsx`/`Terms.tsx` 는 이 컴포넌트에
 * 사전을 골라 넘기는 얇은 래퍼가 된다.
 *
 * **히어로 골격은 다른 아홉 페이지와 글자 하나까지 같다** — eyebrow 조각만
 * 뺐다(보충 5). `aria-labelledby="hero-h"` 섹션, 헤어라인, 표준 비대칭 패딩
 * (`pb-[clamp(64px,7vw,104px)] pt-[clamp(56px,7vw,96px)]`), `<h1>` 의 표준
 * 스케일(`text-[clamp(38px,5.2vw,60px)] leading-[1.14] tracking-[-0.035em]
 * max-w-[14em]`) 은 `PageHero.tsx`·`Apps.tsx`·`Contact.tsx`·`Demo.tsx`·
 * `Home.tsx` 와 전부 같다. 스케일이 틀렸다면 열 페이지 전부를 한 번에 고칠
 * 일이지, 이 페이지 혼자 조용히 벗어날 일이 아니다.
 *
 * 골격 중 **유일하게 다른 하나**는 `<h1>` 을 담는 칼럼의 **배치**다 — 다른
 * 아홉 페이지는 `SHELL` 안에서 왼쪽 정렬이고, 이 두 페이지는 `COLUMN`
 * (`mx-auto`)으로 가운데 정렬된다. 그 결과 `<h1>` 이 다른 페이지의 제목보다
 * 안쪽에 선다. 이것은 실수가 아니라 `COLUMN` 의 의도된 트레이드오프다 —
 * 이유는 위 `COLUMN` 주석 참고. 다른 페이지와 맞추겠다고 여기 왼쪽 정렬로
 * 되돌리지 않는다.
 *
 * **`Section` 프리미티브를 쓰지 않는다.** `Section`(`./section.tsx`)은
 * `aria-labelledby` 를 하나만 받고 그 안에 `BLOCK`(72~112px 패딩)과 전폭
 * 헤어라인을 두른다. 조항마다 `Section` 을 쓰면 7개 조항 사이에 그 패딩과
 * 헤어라인이 들어가 "순서대로 읽는 문서" 가 카드 그리드처럼 쪼개진다. 대신
 * 조항마다 패딩 없는 맨 `<section aria-labelledby={id}>` + `<h2 id={id}>` 를
 * 쓴다. 조항 사이 간격은 `mt`/`space-y` 로만 준다.
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
      <section aria-labelledby="hero-h" className="border-b border-line">
        <div className={`${SHELL} pb-[clamp(64px,7vw,104px)] pt-[clamp(56px,7vw,96px)]`}>
          <div className={`rise ${COLUMN}`}>
            <h1
              id="hero-h"
              className="max-w-[14em] text-[clamp(38px,5.2vw,60px)] font-bold leading-[1.14] tracking-[-0.035em]"
            >
              {doc.title}
            </h1>
            <p className="mt-[26px] text-[15px] text-ink-3">{doc.updated}</p>
          </div>
        </div>
      </section>

      <div className={SHELL}>
        <div className={`${COLUMN} py-[clamp(56px,7vw,96px)]`}>
          <div className="space-y-[clamp(40px,5vw,56px)]">
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
            <LocaleLink
              to="/"
              className="text-[15px] font-semibold text-brand underline underline-offset-4"
            >
              {homeLink}
            </LocaleLink>
          </div>
        </div>
      </div>
    </div>
  );
}
