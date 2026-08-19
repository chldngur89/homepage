import { describe, expect, it } from "vitest";
import { htmlLangFor, renderSeoTags } from "./seo";

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
