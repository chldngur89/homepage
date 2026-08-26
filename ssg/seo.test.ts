import { describe, expect, it } from "vitest";
import { getSeoForPath, htmlLangFor, renderSeoTags } from "./seo";
import { dictionaries } from "../src/content";

/** `@graph` 에서 특정 `@type` 을 가진 노드 하나를 찾는다. */
function nodeOfType(graph: Record<string, unknown>[], type: string) {
  return graph.find((node) => node["@type"] === type);
}

/** `<link rel="canonical" href="...">` 태그에서 href 만 뽑아낸다. */
function canonicalHref(tags: string) {
  return tags.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
}

/** `<link rel="alternate" hreflang="lang" href="...">` 태그에서 특정 hreflang 의 href 만 뽑아낸다. */
function hreflangHref(tags: string, lang: string) {
  return tags.match(
    new RegExp(`<link rel="alternate" hreflang="${lang}" href="([^"]+)"`),
  )?.[1];
}

describe("htmlLangFor", () => {
  it("한국어 경로는 ko", () => {
    expect(htmlLangFor("/pricing")).toBe("ko");
  });

  it("영어 경로는 en", () => {
    expect(htmlLangFor("/en/pricing")).toBe("en");
    expect(htmlLangFor("/en")).toBe("en");
  });
});

describe("renderSeoTags", () => {
  it("영문판이 있는 경로에 hreflang 세 줄을 낸다", () => {
    const tags = renderSeoTags("/pricing");
    expect(tags).toContain('hreflang="ko"');
    expect(tags).toContain('hreflang="en"');
    expect(tags).toContain('hreflang="x-default"');
  });

  it("영문판이 없는 경로에는 hreflang 을 내지 않는다", () => {
    expect(renderSeoTags("/demo")).not.toContain("hreflang");
  });

  it("영어 페이지(/en/pricing): canonical 과 hreflang 이 각자의 로케일 URL 을 가리키고 서로 뒤바뀌지 않는다", () => {
    const tags = renderSeoTags("/en/pricing");
    const canonical = canonicalHref(tags);
    const koHref = hreflangHref(tags, "ko");
    const enHref = hreflangHref(tags, "en");
    const defaultHref = hreflangHref(tags, "x-default");

    // canonical 은 실제 경로(/en/pricing)를 가리켜야 한다.
    expect(canonical?.endsWith("/en/pricing")).toBe(true);

    // hreflang="ko" 는 한국어 기준 경로(/pricing)를 가리켜야 하며, /en/pricing 이면 안 된다.
    expect(koHref?.endsWith("/pricing")).toBe(true);
    expect(koHref?.endsWith("/en/pricing")).toBe(false);

    // hreflang="en" 은 /en/pricing 을 가리켜야 한다.
    expect(enHref?.endsWith("/en/pricing")).toBe(true);

    // x-default 는 한국어 URL 과 같아야 한다.
    expect(defaultHref).toBe(koHref);
    expect(defaultHref?.endsWith("/en/pricing")).toBe(false);
  });

  it("한국어 페이지(/pricing): canonical 은 한국어 URL 이고, hreflang=en 은 실제 경로가 아니라 영문판 경로(/en/pricing)를 가리킨다", () => {
    const tags = renderSeoTags("/pricing");
    const canonical = canonicalHref(tags);
    const enHref = hreflangHref(tags, "en");

    // canonical 은 /pricing(basePath 와 우연히 같음) 이지 /en/pricing 이 아니다.
    expect(canonical?.endsWith("/pricing")).toBe(true);
    expect(canonical?.endsWith("/en/pricing")).toBe(false);

    // hreflang="en" 은 "지금 보고 있는 실제 경로"(seo.path === /pricing)가 아니라
    // 영문판 경로(/en/pricing)를 가리켜야 한다. seo.path 를 그대로 쓰는 스왑 버그를 잡는다.
    expect(enHref?.endsWith("/en/pricing")).toBe(true);
  });

  it("영어 페이지의 og:locale 은 en_US 다", () => {
    expect(renderSeoTags("/en")).toContain('content="en_US"');
    expect(renderSeoTags("/")).toContain('content="ko_KR"');
  });

  it("영어 페이지의 title 에 한글이 없다", () => {
    const tags = renderSeoTags("/en");
    const title = tags.match(/<title>(.*?)<\/title>/)?.[1] ?? "";
    expect(title).not.toMatch(/[가-힣]/);
  });

  it("구조화 데이터의 inLanguage 가 로케일을 따른다", () => {
    expect(renderSeoTags("/en")).toContain("en-US");
    expect(renderSeoTags("/")).toContain("ko-KR");
  });

  it("영어 페이지의 구조화 데이터(JSON-LD)에 한글이 없다", () => {
    // inLanguage 값만 en-US 로 맞고 그 안의 description 텍스트는 한국어인
    // 상태를 잡기 위한 테스트다. WebSite 노드의 description 이
    // SEO_BY_LOCALE.ko["/"] 를 고정 참조하던 결함이 실제로 이랬다 —
    // inLanguage 태그 자체를 확인하는 위 테스트만으로는 안 걸렸다.
    const json = renderSeoTags("/en").match(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
    )?.[1];
    expect(json).toBeDefined();
    expect(JSON.parse(json as string)).toBeTruthy();
    expect(json).not.toMatch(/[가-힣]/);
  });
});

describe("구조화 데이터 @graph — FAQPage", () => {
  it("/pricing 의 @graph 에 FAQPage 가 있고 문항 수가 사전과 같다(ko)", () => {
    const graph = getSeoForPath("/pricing").structuredData!["@graph"] as Record<
      string,
      unknown
    >[];
    const faq = nodeOfType(graph, "FAQPage") as
      | { mainEntity: { name: string }[] }
      | undefined;

    expect(faq).toBeDefined();
    expect(faq!.mainEntity).toHaveLength(dictionaries.ko.pricing.faq.items.length);
  });

  it("/en/pricing 의 @graph 에 FAQPage 가 있고 문항 수가 영어 사전과 같다", () => {
    const graph = getSeoForPath("/en/pricing").structuredData!["@graph"] as Record<
      string,
      unknown
    >[];
    const faq = nodeOfType(graph, "FAQPage") as
      | { mainEntity: { name: string }[] }
      | undefined;

    expect(faq).toBeDefined();
    expect(faq!.mainEntity).toHaveLength(dictionaries.en.pricing.faq.items.length);
  });

  it("/contact 의 @graph 에는 FAQPage 가 없다 — 화면에 답이 없는 질문 링크만 있기 때문이다", () => {
    const graph = getSeoForPath("/contact").structuredData!["@graph"] as Record<
      string,
      unknown
    >[];
    expect(nodeOfType(graph, "FAQPage")).toBeUndefined();
  });

  it("FAQ 가 없는 페이지(예: /about)의 @graph 에는 FAQPage 가 없다", () => {
    const graph = getSeoForPath("/about").structuredData!["@graph"] as Record<
      string,
      unknown
    >[];
    expect(nodeOfType(graph, "FAQPage")).toBeUndefined();
  });
});

describe("구조화 데이터 @graph — BreadcrumbList", () => {
  it("/pricing 의 두 번째 항목 이름이 헤더 nav 라벨(common.nav.pricing)과 같다(ko)", () => {
    const graph = getSeoForPath("/pricing").structuredData!["@graph"] as Record<
      string,
      unknown
    >[];
    const crumb = nodeOfType(graph, "BreadcrumbList") as
      | { itemListElement: { name: string; item: string; position: number }[] }
      | undefined;

    expect(crumb).toBeDefined();
    expect(crumb!.itemListElement).toHaveLength(2);
    expect(crumb!.itemListElement[1].name).toBe(dictionaries.ko.common.nav.pricing);
    expect(crumb!.itemListElement[1].item.endsWith("/pricing")).toBe(true);
  });

  it("/en/contact 의 두 번째 항목 이름이 영문 nav 라벨(common.nav.contact)과 같고 URL 에 /en 이 붙는다", () => {
    const graph = getSeoForPath("/en/contact").structuredData!["@graph"] as Record<
      string,
      unknown
    >[];
    const crumb = nodeOfType(graph, "BreadcrumbList") as
      | { itemListElement: { name: string; item: string; position: number }[] }
      | undefined;

    expect(crumb).toBeDefined();
    expect(crumb!.itemListElement[1].name).toBe(dictionaries.en.common.nav.contact);
    expect(crumb!.itemListElement[1].item.endsWith("/en/contact")).toBe(true);
    // 홈 항목도 로케일 접두사를 포함해야 한다.
    expect(crumb!.itemListElement[0].item.endsWith("/en")).toBe(true);
  });

  it("홈(/, /en)에는 BreadcrumbList 가 없다 — 자기 자신뿐이라 의미가 없다", () => {
    const koGraph = getSeoForPath("/").structuredData!["@graph"] as Record<string, unknown>[];
    const enGraph = getSeoForPath("/en").structuredData!["@graph"] as Record<string, unknown>[];
    expect(nodeOfType(koGraph, "BreadcrumbList")).toBeUndefined();
    expect(nodeOfType(enGraph, "BreadcrumbList")).toBeUndefined();
  });

  it("헤더 nav 에 없는 경로(/privacy)에는 BreadcrumbList 가 없다 — nav 에 없는 이름을 지어 붙이지 않는다", () => {
    const graph = getSeoForPath("/privacy").structuredData!["@graph"] as Record<
      string,
      unknown
    >[];
    expect(nodeOfType(graph, "BreadcrumbList")).toBeUndefined();
  });

  it("@id 가 기존 Organization·WebSite·WebPage 노드와 겹치지 않는다", () => {
    const graph = getSeoForPath("/pricing").structuredData!["@graph"] as Record<
      string,
      unknown
    >[];
    const ids = graph.map((node) => node["@id"]);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
