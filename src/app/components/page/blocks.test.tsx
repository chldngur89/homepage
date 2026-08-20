import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { createMemoryRouter, RouterProvider } from "react-router";
import { LocaleProvider } from "@/app/i18n/LocaleContext";
import { APP_URLS } from "@/app/config/apps";
import type { Locale } from "@/content/locales";
import { ClosingCta, PageHero, useProductCta } from "./index";

/**
 * 두 가지 검사 방식을 쓴다.
 *
 * - `PageHero` 는 훅을 부르지 않으므로 저장소의 기본 패턴(ImageSlot.test.tsx)
 *   대로 **함수로 직접 호출**해 반환된 엘리먼트 트리를 순회한다.
 * - `ClosingCta` 와 `useProductCta` 는 훅(`useLocale`)을 부르므로 직접 호출이
 *   불가능하다. 대신 `LocaleLink.test.tsx` 가 쓰는 두 번째 패턴 —
 *   createMemoryRouter + renderToStaticMarkup 으로 **문자열까지 렌더** — 을
 *   쓴다. DOM 이 아니라 HTML 문자열만 만들므로 environment: "node" 에서
 *   jsdom 없이 그대로 동작한다.
 *
 * 임포트를 `./index` 에서 하는 것도 검사의 일부다. 호출부는 전부
 * `@/app/components/page` 한 경로만 쓰므로, 재수출이 빠지면 이 파일이 먼저
 * 깨진다.
 */
function findByType(node: any, type: string): any {
  if (!node || typeof node !== "object") return null;
  if (node.type === type) return node;
  const children = node.props?.children;
  if (Array.isArray(children)) {
    for (const child of children) {
      const found = findByType(child, type);
      if (found) return found;
    }
    return null;
  }
  return findByType(children, type);
}

function collectAllTypes(node: any, acc: string[] = []): string[] {
  if (!node || typeof node !== "object") return acc;
  if (typeof node.type === "string") acc.push(node.type);
  const children = node.props?.children;
  if (Array.isArray(children)) {
    for (const child of children) collectAllTypes(child, acc);
  } else {
    collectAllTypes(children, acc);
  }
  return acc;
}

const HERO = { eyebrow: "눈썹", titleLine1: "첫 줄", titleLine2: "둘째 줄" } as const;

describe("PageHero", () => {
  it("바깥 section 이 hero-h 를 aria-labelledby 로 가리킨다", () => {
    const el: any = PageHero({ ...HERO });
    expect(el.type).toBe("section");
    expect(el.props["aria-labelledby"]).toBe("hero-h");
  });

  it("제목을 <h1 id=\"hero-h\"> 로 낸다", () => {
    const el = PageHero({ ...HERO });
    const h1 = findByType(el, "h1");

    expect(h1).not.toBeNull();
    expect(h1.props.id).toBe("hero-h");
  });

  it("두 줄 제목을 <br> 로 잇는다", () => {
    const el = PageHero({ ...HERO });
    const h1 = findByType(el, "h1");

    expect(h1.props.children).toEqual(["첫 줄", expect.objectContaining({ type: "br" }), "둘째 줄"]);
  });

  it("body 가 없으면 본문 <p> 를 렌더하지 않는다 (눈썹 <p> 만 남는다)", () => {
    const withBody = collectAllTypes(PageHero({ ...HERO, body: "본문" })).filter((t) => t === "p");
    const without = collectAllTypes(PageHero({ ...HERO })).filter((t) => t === "p");

    expect(withBody).toHaveLength(2);
    expect(without).toHaveLength(1);
  });
});

function renderInRouter(element: React.ReactElement, locale: Locale) {
  const router = createMemoryRouter(
    [{ path: "/", element: <LocaleProvider locale={locale}>{element}</LocaleProvider> }],
    { initialEntries: ["/"] },
  );

  return renderToStaticMarkup(<RouterProvider router={router} />);
}

/**
 * `props` 를 비워 두면 `secondaryTo` 를 **아예 넘기지 않는다** — 기본값이
 * 살아 있는지를 재려면 undefined 를 넘기는 것으로는 부족하고 prop 자체가
 * 없어야 한다.
 */
function renderClosingCta(locale: Locale, props: { secondaryTo?: string } = {}) {
  return renderInRouter(
    <ClosingCta title="마감 제목" primaryLabel="주 버튼" secondaryLabel="보조 버튼" {...props} />,
    locale,
  );
}

/** 렌더된 HTML 에서 보조 버튼(두 번째 `<a>`)의 여는 태그를 꺼낸다. */
function secondaryAnchor(html: string) {
  const tags = html.match(/<a\b[^>]*>/g) ?? [];

  expect(tags).toHaveLength(2);
  return tags[1];
}

function classOf(tag: string) {
  return /class="([^"]*)"/.exec(tag)?.[1];
}

describe("ClosingCta", () => {
  it("제목을 <h2 id=\"cta-h\"> 로 내고 section 이 그것을 가리킨다", () => {
    const html = renderClosingCta("ko");

    expect(html).toMatch(/<h2 [^>]*id="cta-h"/);
    expect(html).toContain("마감 제목");
    expect(html).toMatch(/<section [^>]*aria-labelledby="cta-h"/);
  });

  it("주 버튼은 제품 앱으로, 보조 버튼은 /demo 로 간다", () => {
    const html = renderClosingCta("ko");

    expect(html).toContain(`<a href="${APP_URLS.cmo}" target="_blank" rel="noopener noreferrer"`);
    expect(html).toMatch(/<a [^>]*href="\/demo"/);
  });

  it("영문 화면에서는 한국어 전용 대상 두 곳에 hreflang='ko' 가 붙는다", () => {
    const ko = renderClosingCta("ko");
    const en = renderClosingCta("en");

    expect(ko).not.toContain("hrefLang");
    expect(en.match(/hrefLang="ko"/g)).toHaveLength(2);
  });

  /**
   * 아래 네 검사는 짝을 이룬다. 기본값은 **솔루션 페이지**를 지키고
   * (그 호출부는 `secondaryTo` 를 넘기지 않는다), 덮어쓰기는 **기술 페이지**가
   * 전환 전의 `/solution` 으로 돌아가게 한다. 목적지를 컴포넌트가 하드코딩하던
   * 시절, 라벨만 바꿔 넘기는 호출부가 조용히 다른 화면으로 떨어졌다.
   */
  it("secondaryTo 를 생략하면 보조 버튼은 /demo 로 간다", () => {
    expect(secondaryAnchor(renderClosingCta("ko"))).toContain('href="/demo"');
  });

  it("secondaryTo 로 보조 버튼의 목적지를 바꾼다", () => {
    expect(secondaryAnchor(renderClosingCta("ko", { secondaryTo: "/solution" }))).toContain(
      'href="/solution"',
    );
  });

  it("목적지를 바꿔도 보조 버튼의 클래스는 그대로다", () => {
    const overridden = secondaryAnchor(renderClosingCta("ko", { secondaryTo: "/solution" }));
    const fallback = secondaryAnchor(renderClosingCta("ko"));

    expect(classOf(overridden)).toBe(classOf(fallback));
    expect(classOf(overridden)).toBeTruthy();
  });

  it("영문판이 있는 목적지는 /en 으로 가고 hreflang 이 붙지 않는다", () => {
    const anchor = secondaryAnchor(renderClosingCta("en", { secondaryTo: "/solution" }));

    expect(anchor).toContain('href="/en/solution"');
    // 대소문자를 접어서 본다 — React 는 이 속성을 camelCase 로 낸다.
    expect(anchor.toLowerCase()).not.toContain("hreflang");
  });
});

function readProductCta(locale: Locale) {
  let captured: ReturnType<typeof useProductCta> | undefined;

  function Probe() {
    captured = useProductCta();
    return null;
  }

  renderToStaticMarkup(
    <LocaleProvider locale={locale}>
      <Probe />
    </LocaleProvider>,
  );

  return captured!;
}

describe("useProductCta", () => {
  it("제품 앱으로 가는 새 탭 링크를 만든다", () => {
    expect(readProductCta("ko")).toEqual({
      href: APP_URLS.cmo,
      target: "_blank",
      rel: "noopener noreferrer",
      hrefLang: undefined,
    });
  });

  it("영문 화면에서만 hreflang='ko' 를 붙인다 (제품 UI 가 한국어뿐이라서)", () => {
    expect(readProductCta("ko").hrefLang).toBeUndefined();
    expect(readProductCta("en").hrefLang).toBe("ko");
  });
});
