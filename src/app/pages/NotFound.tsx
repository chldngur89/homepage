import { useEffect, useState } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { LocaleLink } from "@/app/components/LocaleLink";
import { LocaleProvider } from "@/app/i18n/LocaleContext";
import { stripLocale } from "@/app/i18n/localePath";
import { dictionaries } from "@/content";
import { DEFAULT_LOCALE, type Locale } from "@/content/locales";

/**
 * 실제 경로에서 404 문구의 로케일을 판별하는 순수 함수.
 *
 * `404.html` 은 프리렌더된 문서가 `/404` 하나뿐이다(`scripts/prerender.mjs`
 * 가 `/404` 만 렌더해 이 파일 하나로 저장한다) — 존재하지 않는 모든 경로가
 * 이 문서 하나로 응답을 받으므로, 로케일을 빌드 시점에 정할 수 없다. 그래서
 * 실제 로케일은 브라우저에서 `location.pathname` 을 보고 판별한다.
 *
 * `stripLocale` 을 새로 만들지 않고 재사용하는 이유: `pathname.startsWith("/en")`
 * 같은 순진한 검사는 "/en" 으로 **시작하는 문자열**과 "/en" **경로 구간**을
 * 구분하지 못해 `/english-lesson` 같은 경로까지 영문으로 오탐한다.
 * `stripLocale` 은 `/en` 또는 `/en/...` 형태만 골라내므로 이 오탐이 없다.
 */
export function notFoundLocale(pathname: string): Locale {
  return stripLocale(pathname).locale;
}

/**
 * 하이드레이션 이전(SSR)에는 `window` 가 없다. `/404` 를 렌더하는
 * `ssg/entry-server.tsx` 의 결과는 `ssg/seo.ts` 의 `htmlLangFor("/404")` 가
 * "ko" 를 주는 것과 같은 이유로 기본 로케일(ko)이다 — 첫 상태를
 * `DEFAULT_LOCALE` 로 두는 이유는 그 SSR 산출물과 클라이언트 첫 렌더가
 * 어긋나면 리액트가 하이드레이션 경고를 내기 때문이다.
 *
 * 그래서 로케일 전환은 마운트 이후 `useEffect` 에서 일어난다 — `/en/...`
 * 아래에서 404 를 만나면 아주 잠깐 한국어로 그려졌다가 곧바로 영문으로
 * 바뀐다. `<html lang>` 도 같은 자리에서 함께 바꾼다: 영문 본문을 내보내면서
 * `lang="ko"` 를 선언한 채로 두는 것은 계획 4가 닫은 게이트(`/en/ir` 이
 * `lang="en"` 을 달고 한국어 본문을 내던 결함)와 같은 종류의 결함이다.
 */
export default function NotFound() {
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    const detected = notFoundLocale(window.location.pathname);
    setLocale(detected);
    document.documentElement.lang = detected;
  }, []);

  const t = dictionaries[locale].common.notFound;

  return (
    // 404 라우트는 route-config.tsx 에서 로케일 래퍼(<LocaleProvider>) 밖의
    // catch-all("*")로 붙어 있어, 여기서 직접 감싸지 않으면 안의 <LocaleLink>
    // 가 컨텍스트 기본값(ko)만 보고 "홈으로" 버튼을 항상 "/" 로 보낸다 —
    // 영문 문구를 보여주면서 한국어 홈으로 보내는 것도 같은 종류의 결함이다.
    <LocaleProvider locale={locale}>
      <div className="bg-ground min-h-screen flex items-center justify-center px-6">
        <div className="rise text-center max-w-lg">
          <div className="text-8xl md:text-9xl font-bold text-ink-3 mb-4">404</div>
          <h1 className="text-2xl md:text-3xl font-bold text-ink mb-3">{t.title}</h1>
          <p className="text-ink-2 mb-8">{t.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <LocaleLink
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-invert text-white rounded-xl font-semibold transition-all"
            >
              <Home className="w-5 h-5" />
              {t.home}
            </LocaleLink>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-line rounded-xl font-semibold text-ink transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              {t.back}
            </button>
          </div>
        </div>
      </div>
    </LocaleProvider>
  );
}
