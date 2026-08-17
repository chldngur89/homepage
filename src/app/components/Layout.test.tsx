import { describe, expect, it } from "vitest";
import { FOOTER_ONLY_PATHS, NAV_PATHS, foreignLang, getLangSwitchTarget } from "@/app/components/Layout";
import { hasEnglish } from "@/app/i18n/localePath";

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

// --- 회귀 가드: 리뷰 Finding — 푸터 PRODUCT 그룹의 /demo, /apps 링크에 lang="ko" 가
// 빠져 있었다. nav 는 foreignLang 상당의 조건을 갖고 있었고 LEGAL 그룹도 별도
// 조건으로 마크하고 있었지만, PRODUCT 그룹 다섯 링크는 조건 자체가 없었다.
//
// <Layout> 자체를 함수로 호출해 렌더 트리를 검사하는, 이 저장소의 기존 패턴
// (ImageSlot.test.tsx, mockups.test.tsx)을 그대로 쓰는 방법도 검토했다. 하지만
// Layout 은 useLocation()(react-router) 과 useLocale()(컨텍스트) 뿐 아니라
// useState/useEffect(React 자체 훅)까지 직접 호출한다. mockups.test.tsx 는
// useCopy 하나만 vi.mock 으로 갈아끼워 컨텍스트 훅 경로를 우회했지만, Layout 은
// React 의 훅 디스패처 자체가 필요한 useState/useEffect 를 쓰므로 같은 수법이
// 통하지 않는다 — react 패키지 자체를 모킹해야 하는데, 이는 jsdom/testing-library
// 없이 이 저장소가 유지해 온 "컴포넌트를 순수 함수로 호출" 패턴의 전제를 깨는
// 수준의 개입이라 하지 않았다. 이것이 실질적 제약이라 판단해, 대신 링크의 lang
// 여부를 결정하는 로직을 foreignLang 순수 함수로 뽑아 그 함수를 직접 검증한다.
//
// 이 대체가 렌더 트리 검사와 동등한 이유: 수정 후 Layout.tsx 에서 lang 을
// 결정하는 코드 경로는 foreignLang(path, locale) 호출 하나뿐이다 — nav 항목은
// `.lang` 필드로, 푸터 링크는 FooterLink 내부에서, CTA 두 곳은 인라인으로 전부
// 이 함수를 거친다. 그 밖의 코드가 lang 을 따로 계산하거나 덮어쓸 방법이 없으므로,
// Layout 이 실제로 렌더링하는 모든 경로(NAV_PATHS ∪ FOOTER_ONLY_PATHS)에 대해
// foreignLang 을 검증하면 렌더된 모든 링크의 lang 속성을 검증하는 것과 같다.
//
// "하드코딩된 목록" 대신 hasEnglish(=EN_ROUTES 기준)로 기댓값을 계산하므로,
// 나중에 새 한국어 전용 경로가 NAV_PATHS/FOOTER_ONLY_PATHS 에 추가돼도 이
// 테스트가 자동으로 커버한다.
describe("foreignLang — 링크의 lang 표시 (Layout 이 렌더링하는 모든 경로)", () => {
  const allLinkedPaths = [...NAV_PATHS.map(([, path]) => path), ...FOOTER_ONLY_PATHS];

  it("영문 화면에서는 영문판이 없는 경로에만 lang=\"ko\" 를 붙인다", () => {
    for (const path of allLinkedPaths) {
      const expected = hasEnglish(path) ? undefined : "ko";
      expect(foreignLang(path, "en")).toBe(expected);
    }
  });

  it("한국어 화면에서는 어떤 링크에도 lang 을 붙이지 않는다", () => {
    for (const path of allLinkedPaths) {
      expect(foreignLang(path, "ko")).toBeUndefined();
    }
  });

  it("Finding 회귀 가드: /demo, /apps 는 영문 화면에서 반드시 lang=\"ko\" 다", () => {
    expect(foreignLang("/demo", "en")).toBe("ko");
    expect(foreignLang("/apps", "en")).toBe("ko");
  });

  it("Finding 회귀 가드: LEGAL 그룹(/privacy, /terms)도 영문 화면에서 lang=\"ko\" 다", () => {
    expect(foreignLang("/privacy", "en")).toBe("ko");
    expect(foreignLang("/terms", "en")).toBe("ko");
  });
});
