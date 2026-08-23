import { useCopy } from "@/app/i18n/useCopy";
import { APPS } from "@/app/config/apps";
import { SHELL, Section, SectionLabel } from "@/app/components/page";

/**
 * CTO 로 참여한 프로젝트. **나열 순서가 곧 화면의 배치 순서다** — 이 앱들은
 * 목록 마지막에 여기 적힌 차례대로 모여 선다.
 *
 * 전환 전에는 이 사실이 **두 곳에** 나뉘어 있었다. 순서는 `appPriority`
 * (`{ mebody: 1, "aircon-call": 2 }`) 가, "배지를 단다" 는 카드 색을 정하는
 * `specialCardStyles` 의 키가 들고 있었고(`specialStyles &&` 가 배지의
 * 조건이었다), 두 표의 키 목록이 우연히 같아서 맞아떨어지고 있었다. 한쪽에만
 * 앱을 추가하면 배지 없이 마지막에 서거나 배지를 단 채 앞줄에 서는데, 어느
 * 쪽도 빌드를 깨지 않는다. 색 표는 다크 전용이라 전환에서 통째로 사라지므로,
 * 남는 사실 하나를 한 자리에만 적는다.
 *
 * 문구는 사전(`list.ctoBadge`)이, 대상은 코드가 정한다 — 번역이 어느 앱에
 * 배지가 붙는지를 바꿀 수 없게 한다(요금 페이지의 `PLAN_CTA_TO_CONTACT` 와
 * 같은 취지).
 */
const CTO_APP_IDS: readonly string[] = ["mebody", "aircon-call"];

/** CTO 활동 앱은 마지막에 모아 배치. 나머지는 `apps.json` 의 순서 그대로다. */
const listOrder = (id: string) => CTO_APP_IDS.indexOf(id) + 1;
const sortedApps = [...APPS].sort((a, b) => listOrder(a.id) - listOrder(b.id));

/**
 * ACnow 카드에만 붙는 제휴사·서비스 마크. 대체 텍스트는 사전에 있고 여기에는
 * 경로만 둔다 — 자산 경로는 카피가 아니다.
 *
 * 두 PNG 는 흰 바탕이 이미지 안에 구워져 있다. 전환 전 다크 배경에서는 그래서
 * 흰 타일(`bg-white`)로 한 번 더 감싸야 했는데, 카드가 흰색(`bg-surface`)이 된
 * 지금은 이미지의 흰 바탕이 카드와 그대로 이어져 타일이 필요 없다. 대신 다른
 * 카드 요소와 같은 헤어라인만 둘러 마크의 경계를 만든다.
 */
const AIRCON_CALL_ID = "aircon-call";
const airconCallMarkSrc = {
  company: "/apps/living-bridge-mark-square.png",
  service: "/apps/acnow-mark-square.png",
} as const;

const MARK =
  "flex h-12 w-12 items-center justify-center overflow-hidden rounded-[10px] border border-line-2 bg-surface p-1.5";

export default function Apps() {
  const copy = useCopy();
  const t = copy.apps;

  return (
    <div className="bg-ground">
      {/* 히어로 — `PageHero` 를 쓰지 않고 직접 짰다. 이 페이지의 제목은
          한 줄인데 `PageHero` 는 `titleLine1`/`titleLine2` 두 조각을 받아
          가운데에 `<br>` 를 넣는다. 빈 문자열을 두 번째 줄로 넘기면 제목
          아래에 빈 줄이 하나 생기고, 한 줄짜리를 받자고 prop 을 늘리면
          승격의 이득이 사라진다(`PageHero` 주석의 홈·데모·문의 제외 사유와
          같다). 그래서 골격 — `aria-labelledby="hero-h"` 섹션, `SHELL`,
          같은 패딩, `id="hero-h"` 를 단 `<h1>` — 은 글자 하나까지 그대로
          따르고 제목만 한 줄로 둔다. 같은 시스템으로 읽혀야 한다. */}
      <section aria-labelledby="hero-h" className="border-b border-line">
        <div className={`${SHELL} pb-[clamp(64px,7vw,104px)] pt-[clamp(56px,7vw,96px)]`}>
          <div className="rise">
            <p className="mb-[22px] text-[13px] font-semibold uppercase tracking-[0.1em] text-brand">
              {t.hero.eyebrow}
            </p>
            <h1
              id="hero-h"
              className="max-w-[14em] text-[clamp(38px,5.2vw,60px)] font-bold leading-[1.14] tracking-[-0.035em]"
            >
              {t.hero.title}
            </h1>
            <p className="mt-[26px] max-w-[34em] text-[18px] leading-[1.65] text-ink-2">
              {t.hero.body}
            </p>
          </div>
        </div>
      </section>

      {/* 01 앱 목록 — 전환 전 이 섹션에는 제목이 없고 카드만 나열됐다.
          섹션의 heading 이 하나 필요하므로 라벨을 h2 로 승격시킨다
          (요금 01·회사 01·홈 06 과 같은 처리). 카드 제목은 그 안으로
          들어가므로 h2 에서 h3 로 내린다 — 전환 전에는 카드 제목이 페이지
          전체에서 유일한 h2 라 h1 바로 아래에 카드 일곱 개가 나란히 서
          있었다. */}
      <Section id="apps-h">
        <SectionLabel index="01" as="h2" id="apps-h">
          {t.list.label}
        </SectionLabel>

        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {sortedApps.map((app) => {
            const isAirconCall = app.id === AIRCON_CALL_ID;

            return (
              <li
                key={app.id}
                className="flex flex-col rounded-[14px] border border-line-2 bg-surface p-[clamp(24px,3vw,34px)]"
              >
                {isAirconCall && (
                  <div className="mb-6 flex items-center gap-3">
                    <div className={MARK}>
                      <img
                        src={airconCallMarkSrc.company}
                        alt={t.airconCall.companyMarkAlt}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div className={MARK}>
                      <img
                        src={airconCallMarkSrc.service}
                        alt={t.airconCall.serviceMarkAlt}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-start justify-between gap-3">
                  <h3 className="min-w-0 text-[19px] font-semibold tracking-[-0.02em]">
                    {isAirconCall ? t.airconCall.title : app.name}
                  </h3>
                  {CTO_APP_IDS.includes(app.id) && (
                    <span className="mt-1 shrink-0 text-[11.5px] font-semibold tracking-[0.08em] text-brand">
                      {t.list.ctoBadge}
                    </span>
                  )}
                </div>

                <p className="mt-3 text-[15.5px] leading-[1.7] text-ink-2">{app.description}</p>

                {/* 앱으로 가는 링크는 전부 외부 주소라 `LocaleLink` 가 아니라
                    `<a target="_blank">` 이다. 목적지는 전환 전과 같이
                    `apps.json` 의 `url` 을 그대로 쓴다. */}
                <div className="mt-auto pt-9">
                  <a
                    href={app.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 items-center justify-center rounded-[10px] bg-invert px-5 text-[15.5px] font-semibold text-white"
                  >
                    {t.list.cta}
                  </a>
                </div>
              </li>
            );
          })}
        </ul>

        <p className="mt-8 text-[14.5px] leading-[1.7] text-ink-3">{t.list.note}</p>
      </Section>
    </div>
  );
}
