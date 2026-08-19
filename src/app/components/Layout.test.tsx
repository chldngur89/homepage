import { describe, expect, it } from "vitest";
import { FOOTER_ONLY_PATHS, NAV_PATHS, getLangSwitchTarget } from "@/app/components/Layout";
import { foreignHreflang, hasEnglish, pathHreflang } from "@/app/i18n/localePath";
import { APP_HAS_ENGLISH } from "@/app/config/apps";

// getLangSwitchTarget 은 언어 전환 버튼의 목적지를 계산하는 순수 함수다.
// hasEnglish/stripLocale 조합에는 트랩이 있다: 영문판이 없는 한국어 전용
// 경로(/demo, /apps, /privacy, /terms)에서는 localePath(path, "en") 이
// 접두사 없는 한국어 경로를 그대로 돌려주고, 그 결과를 stripLocale 에
// 넣으면 locale 이 "en" 이 아니라 "ko" 로 나온다. 이 테스트는 그 트랩을
// 실제 컴포넌트 렌더 없이 고정한다.
describe("getLangSwitchTarget", () => {
  it("/pricing(ko) 에서는 /en/pricing 으로 보낸다", () => {
    expect(getLangSwitchTarget("/pricing", "ko")).toBe("/en/pricing");
  });

  it("/en/pricing(en) 에서는 /pricing 으로 보낸다", () => {
    expect(getLangSwitchTarget("/en/pricing", "en")).toBe("/pricing");
  });

  it("영문판이 없는 /demo(ko) 에서는 /demo 가 아니라 영문 홈(/en) 으로 보낸다", () => {
    expect(getLangSwitchTarget("/demo", "ko")).toBe("/en");
  });

  it("/en(en) 에서는 한국어 홈(/) 으로 보낸다", () => {
    expect(getLangSwitchTarget("/en", "en")).toBe("/");
  });

  it("홈(/, ko) 에서는 /en 으로 보낸다", () => {
    expect(getLangSwitchTarget("/", "ko")).toBe("/en");
  });

  it("영문판이 없는 /apps(ko) 에서도 영문 홈(/en) 으로 보낸다", () => {
    expect(getLangSwitchTarget("/apps", "ko")).toBe("/en");
  });

  it("영문판이 없는 /privacy(ko) 에서도 영문 홈(/en) 으로 보낸다", () => {
    expect(getLangSwitchTarget("/privacy", "ko")).toBe("/en");
  });

  it("결코 같은 경로에 머무르지 않는다 (모든 EN_ROUTES 왕복)", () => {
    const roundTripPaths = ["/", "/solution", "/technology", "/pricing", "/about", "/contact", "/ir"];
    for (const path of roundTripPaths) {
      const enTarget = getLangSwitchTarget(path, "ko");
      expect(enTarget).not.toBe(path);
      const backTarget = getLangSwitchTarget(enTarget, "en");
      expect(backTarget).toBe(path);
    }
  });
});

// --- 회귀 가드: 리뷰 Finding — 푸터 PRODUCT 그룹의 /demo, /apps 링크에 언어
// 표시가 빠져 있었다. nav 는 pathHreflang 상당의 조건을 갖고 있었고 LEGAL 그룹도
// 별도 조건으로 마크하고 있었지만, PRODUCT 그룹 다섯 링크는 조건 자체가 없었다.
//
// <Layout> 자체를 함수로 호출해 렌더 트리를 검사하는, 이 저장소의 기존 패턴
// (ImageSlot.test.tsx, mockups.test.tsx)을 그대로 쓰는 방법도 검토했다. 하지만
// Layout 은 useLocation()(react-router) 과 useLocale()(컨텍스트) 뿐 아니라
// useState/useEffect(React 자체 훅)까지 직접 호출한다. mockups.test.tsx 는
// useCopy 하나만 vi.mock 으로 갈아끼워 컨텍스트 훅 경로를 우회했지만, Layout 은
// React 의 훅 디스패처 자체가 필요한 useState/useEffect 를 쓰므로 같은 수법이
// 통하지 않는다 — react 패키지 자체를 모킹해야 하는데, 이는 jsdom/testing-library
// 없이 이 저장소가 유지해 온 "컴포넌트를 순수 함수로 호출" 패턴의 전제를 깨는
// 수준의 개입이라 하지 않았다. 이것이 실질적 제약이라 판단해, 대신 링크의 언어
// 표시를 결정하는 로직을 pathHreflang 순수 함수로 뽑아 그 함수를 직접 검증한다.
//
// 이 대체가 렌더 트리 검사와 동등한 이유: 수정 후 Layout.tsx 에서 표시를
// 결정하는 코드 경로는 pathHreflang(path, locale) 호출 하나뿐이다 — nav 항목은
// `.hrefLang` 필드로, 푸터 링크는 FooterLink 내부에서 이 함수를 거친다(제품
// CTA 는 사이트 밖으로 나가므로 foreignHreflang 을 직접 쓴다 — 아래 별도
// 케이스). 그 밖의 코드가 표시를 따로 계산하거나 덮어쓸 방법이 없으므로,
// Layout 이 실제로 렌더링하는 모든 경로(NAV_PATHS ∪ FOOTER_ONLY_PATHS)에 대해
// pathHreflang 을 검증하면 렌더된 모든 링크의 hreflang 속성을 검증하는 것과 같다.
//
// "하드코딩된 목록" 대신 hasEnglish(=EN_ROUTES 기준)로 기댓값을 계산하므로,
// 나중에 새 한국어 전용 경로가 NAV_PATHS/FOOTER_ONLY_PATHS 에 추가돼도 이
// 테스트가 자동으로 커버한다.
//
// 속성이 lang 이 아니라 hreflang 인 이유(리뷰 Finding): lang 은 요소 자신의
// 내용이 무슨 언어인지를 선언한다. /en 에서 이 링크들의 텍스트는 영어이므로
// lang="ko" 는 스크린 리더가 영어 단어를 한국어 음성으로 읽게 만든다. "링크가
// 가리키는 문서가 한국어" 를 뜻하는 속성은 hreflang 이다.
describe("pathHreflang — 링크의 언어 표시 (Layout 이 렌더링하는 모든 경로)", () => {
  const allLinkedPaths = [...NAV_PATHS.map(([, path]) => path), ...FOOTER_ONLY_PATHS];

  it("영문 화면에서는 영문판이 없는 경로에만 hreflang=\"ko\" 를 붙인다", () => {
    for (const path of allLinkedPaths) {
      const expected = hasEnglish(path) ? undefined : "ko";
      expect(pathHreflang(path, "en")).toBe(expected);
    }
  });

  it("한국어 화면에서는 어떤 링크에도 hreflang 을 붙이지 않는다", () => {
    for (const path of allLinkedPaths) {
      expect(pathHreflang(path, "ko")).toBeUndefined();
    }
  });

  it("Finding 회귀 가드: /demo, /apps 는 영문 화면에서 반드시 hreflang=\"ko\" 다", () => {
    expect(pathHreflang("/demo", "en")).toBe("ko");
    expect(pathHreflang("/apps", "en")).toBe("ko");
  });

  it("Finding 회귀 가드: LEGAL 그룹(/privacy, /terms)도 영문 화면에서 hreflang=\"ko\" 다", () => {
    expect(pathHreflang("/privacy", "en")).toBe("ko");
    expect(pathHreflang("/terms", "en")).toBe("ko");
  });
});

// 제품 CTA 는 사이트 밖(APP_URLS.cmo)으로 나가므로 EN_ROUTES 로 판단할 수
// 없다. 제품 앱에 영문 UI 가 있는지를 APP_HAS_ENGLISH 로 명시하고, 같은
// foreignHreflang 규칙을 태운다 — Layout 의 헤더 CTA 두 곳과 Home 의 CTA 두
// 곳이 모두 이 조합을 쓴다.
describe("foreignHreflang — 사이트 밖 제품 CTA", () => {
  it("제품 앱이 한국어 전용인 동안 영문 화면에서 hreflang=\"ko\" 다", () => {
    expect(APP_HAS_ENGLISH).toBe(false);
    expect(foreignHreflang(APP_HAS_ENGLISH, "en")).toBe("ko");
  });

  it("한국어 화면에서는 붙이지 않는다", () => {
    expect(foreignHreflang(APP_HAS_ENGLISH, "ko")).toBeUndefined();
  });

  it("대상에 영문판이 있으면 영문 화면에서도 붙이지 않는다", () => {
    expect(foreignHreflang(true, "en")).toBeUndefined();
  });
});
