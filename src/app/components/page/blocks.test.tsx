import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { createMemoryRouter, RouterProvider } from "react-router";
import { LocaleProvider } from "@/app/i18n/LocaleContext";
import { APP_URLS } from "@/app/config/apps";
import type { Locale } from "@/content/locales";
import { ClosingCta, LegalDocument, PageHero, useProductCta } from "./index";

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
 * `secondaryTo` 의 기본값 `"/demo"` 는 **이 헬퍼의 편의값이지 컴포넌트의
 * 기본값이 아니다.** 컴포넌트 쪽에서는 필수 prop 이며, 그 사실은 아래
 * `typeOnly_secondaryToIsRequired` 가 컴파일 타임에 고정한다.
 */
function renderClosingCta(locale: Locale, secondaryTo = "/demo") {
  return renderInRouter(
    <ClosingCta
      title="마감 제목"
      primaryLabel="주 버튼"
      secondaryLabel="보조 버튼"
      secondaryTo={secondaryTo}
    />,
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
   * 아래 세 검사는 호출부가 준 목적지가 실제로 쓰이는지를 잰다. 목적지를
   * 컴포넌트가 하드코딩하던 시절, 라벨만 바꿔 넘기는 호출부가 조용히 다른
   * 화면으로 떨어졌다 — 기술 페이지가 그랬다.
   */
  it("호출부가 준 목적지로 보조 버튼이 간다", () => {
    expect(secondaryAnchor(renderClosingCta("ko", "/demo"))).toContain('href="/demo"');
    expect(secondaryAnchor(renderClosingCta("ko", "/solution"))).toContain('href="/solution"');
  });

  it("목적지가 달라도 보조 버튼의 클래스는 그대로다", () => {
    const solution = secondaryAnchor(renderClosingCta("ko", "/solution"));
    const demo = secondaryAnchor(renderClosingCta("ko", "/demo"));

    expect(classOf(solution)).toBe(classOf(demo));
    expect(classOf(solution)).toBeTruthy();
  });

  it("영문판이 있는 목적지는 /en 으로 가고 hreflang 이 붙지 않는다", () => {
    const anchor = secondaryAnchor(renderClosingCta("en", "/solution"));

    expect(anchor).toContain('href="/en/solution"');
    // 대소문자를 접어서 본다 — React 는 이 속성을 camelCase 로 낸다.
    expect(anchor.toLowerCase()).not.toContain("hreflang");
  });
});

/**
 * 보조 버튼의 **라벨과 목적지는 짝이다.** 한쪽만 적을 수 있으면 둘이 어긋나고,
 * 그것이 기술 페이지에서 실제로 벌어진 일이다(`/solution → 솔루션 보기` 가
 * `/demo → 데모 보기` 로 바뀌었다).
 *
 * 이 보증은 런타임 검사로 표현할 수 없다 — "prop 을 빠뜨린 호출"이 애초에
 * 컴파일되지 않아야 하는 것이 요구사항이기 때문이다. 그래서 `LocaleLink.test.tsx`
 * 의 `typeOnly_hrefLangCannotBeOverridden` 과 같은 방식으로 컴파일 타임에
 * 고정한다: `@ts-expect-error` 는 "다음 줄에 타입 에러가 **있어야** 통과"이므로,
 * 누가 `secondaryTo` 를 다시 선택적으로 만들면 이 줄에 에러가 없어져
 * `npm run typecheck` 가 실패한다. 즉 `tsc --noEmit` 이 이 검사의 실행기다.
 */
function typeOnly_secondaryToIsRequired() {
  return (
    // @ts-expect-error secondaryTo 는 필수다 — 라벨만 넘기고 목적지를 빠뜨릴 수 없다
    <ClosingCta title="마감 제목" primaryLabel="주 버튼" secondaryLabel="보조 버튼" />
  );
}

void typeOnly_secondaryToIsRequired;

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

/**
 * `LegalDocument` 는 `LocaleLink`(훅 소비자)를 쓰므로 `PageHero` 처럼 직접
 * 호출할 수 없다 — `ClosingCta` 와 같은 방식(`renderInRouter` +
 * `renderToStaticMarkup`)을 쓴다.
 *
 * 이 describe 는 사전 테스트(`legal.test.ts`)가 못 잡는 구멍을 잡는다.
 * `legal.test.ts` 는 사전의 문자열만 고정할 뿐, `bullets` 배열이 실제
 * `<ul>`/`<li>` 로 렌더되는지, 목록이 없는 조항이 목록을 만들지 않는지, 홈
 * 링크가 실제로 "/" 를 가리키는 앵커인지는 전혀 보지 않는다 — 예를 들어
 * `{section.body} {section.bullets.join(" ")}` 로 바꿔도 typecheck·전체
 * 172개 테스트(사전 테스트 포함)·`check-html.mjs` 가 전부 통과하면서
 * 개인정보 1번 조항의 목록 구조만 조용히 사라진다. 그 회귀를 여기서 잡는다.
 */
const LEGAL_DOC_WITH_BULLETS = {
  title: "샘플 문서",
  updated: "최종 업데이트: 테스트",
  sections: [
    {
      heading: "1. 목록이 있는 조항",
      body: "목록이 있는 조항의 본문.",
      bullets: ["항목 A", "항목 B", "항목 C"],
    },
  ],
} as const;

const LEGAL_DOC_WITHOUT_BULLETS = {
  title: "샘플 문서",
  updated: "최종 업데이트: 테스트",
  sections: [
    {
      heading: "1. 목록이 없는 조항",
      body: "목록이 없는 조항의 본문.",
      bullets: [],
    },
  ],
} as const;

function renderLegalDocument(doc: typeof LEGAL_DOC_WITH_BULLETS | typeof LEGAL_DOC_WITHOUT_BULLETS) {
  return renderInRouter(<LegalDocument doc={doc} homeLink="← 홈으로" />, "ko");
}

describe("LegalDocument", () => {
  it("bullets 가 있는 조항은 실제 <ul> 에 항목 수만큼 <li> 를 낸다", () => {
    const html = renderLegalDocument(LEGAL_DOC_WITH_BULLETS);

    expect(html.match(/<ul\b/g) ?? []).toHaveLength(1);
    expect(html.match(/<li\b/g) ?? []).toHaveLength(3);
    expect(html).toContain("항목 A");
    expect(html).toContain("항목 B");
    expect(html).toContain("항목 C");
  });

  it("bullets 가 없는 조항은 <ul> 을 아예 렌더하지 않는다", () => {
    const html = renderLegalDocument(LEGAL_DOC_WITHOUT_BULLETS);

    expect(html).not.toMatch(/<ul\b/);
    expect(html).not.toMatch(/<li\b/);
  });

  it("맨 아래 홈 링크는 '/' 를 가리키는 앵커다", () => {
    const html = renderLegalDocument(LEGAL_DOC_WITHOUT_BULLETS);
    const anchors = html.match(/<a\b[^>]*>[^<]*<\/a>/g) ?? [];
    const homeAnchor = anchors.find((a) => a.includes("← 홈으로"));

    expect(homeAnchor).toBeDefined();
    expect(homeAnchor).toMatch(/<a\b[^>]*href="\/"/);
  });
});
