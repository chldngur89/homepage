import type { ReactNode } from "react";
import { ArrowRight, ChevronLeft } from "lucide-react";
import { LocaleLink } from "@/app/components/LocaleLink";
import { SHELL } from "@/app/components/page";
import { useCopy } from "@/app/i18n/useCopy";
import { CONTACT_EMAIL } from "@/content/ko/contact";
import siteContent from "@/content/site.json";

const siteData = siteContent as {
  footer?: { copyright?: string };
};

/**
 * `site.json` 의 `contactEmail` 은 계획 2 Task 6 에서 없어졌다 — 문의
 * 페이지와 같은 출처(`CONTACT_EMAIL`)를 써서 조용히 갈라지지 않게 한다.
 * `IR.tsx` 의 본문(article)도 같은 상수를 독립적으로 들여온다 — 셸과
 * 본문이 같은 파일을 각자 참조할 뿐, 값은 하나다.
 */
const contactEmail = CONTACT_EMAIL;
const copyright = siteData.footer?.copyright ?? "© 2026 WooriTeam. All rights reserved.";

/**
 * IR 전용 셸 — 배경 · 고정 헤더 · `<main>` · 푸터.
 *
 * `/ir` 은 `route-config.tsx` 의 `standalonePages` 에 있어 공용 `Layout`
 * 밖에서 렌더된다. 투자자 덱은 긴 스크롤에 섹션 앵커 내비가 따라와야 하고
 * "사이트로 돌아가기" 진입점이 따로 필요해서다 — 그 구조는 유지하고, 이
 * 셸이 입는 색만 `Layout.tsx` 와 같은 디자인 토큰으로 바꾼다.
 *
 * 본문(children)은 계획 4 Task 4·5 전까지 다크 디자인 그대로 남는다 —
 * 헤더·푸터·배경만 밝게 바뀐 반쯤 전환된 상태가 이 태스크의 정상 종료
 * 지점이다.
 */
export function IrShell({ children }: { children: ReactNode }) {
  const copy = useCopy();
  const brand = copy.common.brand;
  const shell = copy.ir.shell;

  return (
    <div className="min-h-screen bg-ground text-ink">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-ground/[.92] backdrop-blur-[8px] backdrop-saturate-[1.2]">
        <div className={`${SHELL} flex h-[70px] items-center justify-between gap-6`}>
          <LocaleLink to="/" aria-label={copy.common.a11y.home} className="flex items-baseline gap-2">
            <span className="text-[19px] font-bold tracking-[-0.02em]">{brand.mark}</span>
            {/* 라틴 워드마크가 비어 있는 로케일(영문)에서는 조각 자체를 그리지
                않는다 — Layout.tsx:82-86 과 같은 규칙. 그리면 "우리팀 WOORITEAM"
                처럼 이름이 두 번 찍힌다. */}
            {brand.markLatin ? (
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-3">
                {brand.markLatin}
              </span>
            ) : null}
          </LocaleLink>
          {/*
            예전에는 이 옆에 원형 "AI" 배지(cyan 톤)와 "{siteName} / Investor
            Overview" 두 줄 텍스트가 따로 있었다. 투자자가 보는 페이지가
            사이트와 다른 이름표를 달고 있을 이유가 없어 공용 헤더와 같은
            워드마크 락업 하나로 합쳤다 — 계획 4 Task 3 보충 4.
          */}

          <nav aria-label={shell.eyebrow} className="hidden items-center gap-6 text-sm lg:flex">
            {shell.nav.map((item) => (
              // 같은 페이지 안의 섹션 앵커라 LocaleLink 로 바꾸지 않는다 —
              // 로케일 접두사가 붙으면 안 되는 자리다.
              <a
                key={item.href}
                href={item.href}
                className="text-ink-2 transition-colors hover:text-brand"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <LocaleLink
              to="/"
              className="hidden items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-ink-2 transition-colors hover:text-brand sm:inline-flex"
            >
              <ChevronLeft className="h-4 w-4" />
              {shell.backToSite}
            </LocaleLink>
            <a
              href="#cta"
              className="inline-flex items-center gap-2 rounded-full bg-invert px-4 py-2 text-sm font-medium text-white"
            >
              {shell.requestIr}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      {/* pt 는 위 고정 헤더의 실측 높이(71px = 70px 콘텐츠 + 1px 하단
          보더)에 맞춘 값이다 — 계산이 아니라 브라우저 실측(task-3-report.md
          참고)으로 정했다. */}
      <main id="ir-top" className="pt-[71px]">
        {children}
      </main>

      <footer className="border-t border-line py-8">
        <div
          className={`${SHELL} flex flex-col gap-4 text-sm text-ink-3 md:flex-row md:items-center md:justify-between`}
        >
          <p>{copyright}</p>
          <div className="flex flex-wrap items-center gap-4">
            <LocaleLink to="/" className="transition-colors hover:text-brand">
              {shell.homeLink}
            </LocaleLink>
            <a href={`mailto:${contactEmail}`} className="transition-colors hover:text-brand">
              {contactEmail}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
