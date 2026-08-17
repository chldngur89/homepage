import { describe, expect, it } from "vitest";
import { htmlLangFor, renderSeoTags } from "./seo";

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

  it("영어 페이지의 canonical 은 /en 을 포함한다", () => {
    expect(renderSeoTags("/en/pricing")).toContain('rel="canonical" href="');
    expect(renderSeoTags("/en/pricing")).toContain("/en/pricing");
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
});
