import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { createMemoryRouter, RouterProvider } from "react-router";
import { LocaleProvider } from "@/app/i18n/LocaleContext";
import { LocaleLink, resolveLocaleLink } from "./LocaleLink";

describe("resolveLocaleLink", () => {
  it("한국어에서는 경로를 그대로 쓰고 hrefLang 을 붙이지 않는다", () => {
    const { to, hrefLang } = resolveLocaleLink("/pricing", "ko");
    expect(to).toBe("/pricing");
    expect(hrefLang).toBeUndefined();
  });

  it("영어에서 영문판이 있는 경로는 /en 을 붙이고 hrefLang 이 없다", () => {
    const { to, hrefLang } = resolveLocaleLink("/pricing", "en");
    expect(to).toBe("/en/pricing");
    expect(hrefLang).toBeUndefined();
  });

  it("영어에서 한국어 전용 경로는 원 경로를 쓰고 hrefLang='ko' 를 붙인다", () => {
    const { to, hrefLang } = resolveLocaleLink("/demo", "en");
    expect(to).toBe("/demo");
    expect(hrefLang).toBe("ko");
  });

  it("한국어에서 한국어 전용 경로에는 hrefLang 을 붙이지 않는다", () => {
    const { to, hrefLang } = resolveLocaleLink("/demo", "ko");
    expect(hrefLang).toBeUndefined();
  });
});

/**
 * <LocaleLink> 는 <Link> 를 감싸므로 React Router 의 Router 컨텍스트
 * 없이는 렌더할 수 없다 (useHref 등 내부 훅이 <Router> 를 요구한다).
 * jsdom 없이도 되는 방법: ssg/entry-server.tsx 가 실제 prerender 에 쓰는
 * 것과 같은 조합 — createMemoryRouter + RouterProvider 를
 * react-dom/server 의 renderToStaticMarkup 으로 문자열까지 렌더한다.
 * DOM 이 아니라 HTML 문자열만 만들므로 environment: "node" 에서 그대로
 * 동작한다.
 */
function renderLocaleLink(props: Parameters<typeof LocaleLink>[0]) {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element: (
          <LocaleProvider locale="ko">
            <LocaleLink {...props} />
          </LocaleProvider>
        ),
      },
    ],
    { initialEntries: ["/"] },
  );

  return renderToStaticMarkup(<RouterProvider router={router} />);
}

describe("LocaleLink", () => {
  it("aria-label 처럼 소유하지 않은 prop 은 그대로 <a> 에 전달된다", () => {
    const html = renderLocaleLink({
      to: "/pricing",
      "aria-label": "가격 페이지로 이동",
      children: "가격",
    });

    expect(html).toContain('aria-label="가격 페이지로 이동"');
  });

  it("계산된 to/hrefLang 은 호출부의 rest prop 과 무관하게 렌더 결과에 반영된다", () => {
    // 한국어 전용 경로(/demo)를 한국어 로케일에서 렌더 — hrefLang 없이
    // 원래 경로 그대로 나가야 한다. id 같은 무관한 prop 을 같이 넘겨도
    // to 계산에는 영향이 없다.
    const html = renderLocaleLink({ to: "/demo", id: "cta-demo", children: "데모" });

    expect(html).toContain('href="/demo"');
    expect(html).not.toContain("hreflang");
  });
});

/**
 * `to` 와 `hrefLang` 은 컴포넌트가 계산하는 값이라 런타임 테스트로 "덮어쓸
 * 수 없음"을 증명할 수 없다 (덮어쓰려는 코드 자체가 컴파일되지 않는다).
 * 대신 컴파일 타임에 고정한다: 아래 줄은 `hrefLang` 을 프로퍼티로 받지
 * 않는 LocaleLinkProps 타입 때문에 타입 에러가 나야 하고, `@ts-expect-error`
 * 는 "다음 줄에 타입 에러가 있어야 통과"이므로 만약 LocaleLink 가 다시
 * hrefLang 을 받아주게 바뀌면 이 줄 자체가 `npm run typecheck` 에서
 * 실패한다 — 즉 이 가드는 `tsc --noEmit` 이 곧 테스트다.
 */
function typeOnly_hrefLangCannotBeOverridden() {
  return (
    // @ts-expect-error hrefLang 은 LocaleLink 가 계산하는 값이라 호출부가 넘길 수 없다
    <LocaleLink to="/demo" hrefLang="en">
      데모
    </LocaleLink>
  );
}

void typeOnly_hrefLangCannotBeOverridden;
