import { describe, expect, it } from "vitest";
import { dictionaries } from "../src/content";
import { faqItems, faqNode } from "./faq";

/**
 * 이 파일의 핵심 주장: `FAQPage` 구조화 데이터의 문답은 화면 사전(`q`·`a`)과
 * 글자 하나까지 같아야 한다. 구조화 데이터가 화면에 없는 말을 하면
 * 검색엔진이 스팸으로 보기 이전에, 그냥 사실이 아닌 말을 하는 것이다.
 */
describe("faqNode — /pricing (문답이 실제로 dl/dt/dd 로 렌더되는 페이지)", () => {
  it("한국어: FAQPage 의 질문이 화면 사전(pricing.faq.items)의 q 와 글자까지 같다", () => {
    const node = faqNode("/pricing", "ko");
    expect(node).toBeDefined();
    expect(node!.mainEntity.map((e) => e.name)).toEqual(
      dictionaries.ko.pricing.faq.items.map((i) => i.q),
    );
  });

  it("한국어: FAQPage 의 답이 화면 사전의 a 와 글자까지 같다", () => {
    const node = faqNode("/pricing", "ko");
    expect(node).toBeDefined();
    expect(node!.mainEntity.map((e) => e.acceptedAnswer.text)).toEqual(
      dictionaries.ko.pricing.faq.items.map((i) => i.a),
    );
  });

  it("영어: FAQPage 의 질문·답이 화면 사전(en/pricing.faq.items)과 글자까지 같다", () => {
    const node = faqNode("/en/pricing", "en");
    expect(node).toBeDefined();
    expect(node!.mainEntity.map((e) => e.name)).toEqual(
      dictionaries.en.pricing.faq.items.map((i) => i.q),
    );
    expect(node!.mainEntity.map((e) => e.acceptedAnswer.text)).toEqual(
      dictionaries.en.pricing.faq.items.map((i) => i.a),
    );
  });

  it("문항 수가 두 로케일 모두 사전의 faq.items 개수와 같다(4개)", () => {
    expect(faqItems("/pricing", "ko")).toHaveLength(dictionaries.ko.pricing.faq.items.length);
    expect(faqItems("/en/pricing", "en")).toHaveLength(dictionaries.en.pricing.faq.items.length);
    expect(dictionaries.ko.pricing.faq.items).toHaveLength(4);
  });

  it("FAQPage 노드의 @type 과 @id 가 정확하다", () => {
    const node = faqNode("/pricing", "ko")!;
    expect(node["@type"]).toBe("FAQPage");
    expect(node["@id"]).toContain("/pricing#faq");
    expect(node.mainEntity.every((e: { "@type": string }) => e["@type"] === "Question")).toBe(
      true,
    );
    expect(
      node.mainEntity.every(
        (e: { acceptedAnswer: { "@type": string } }) => e.acceptedAnswer["@type"] === "Answer",
      ),
    ).toBe(true);
  });
});

describe("faqNode — /contact (질문은 있지만 답은 화면에 없는 페이지)", () => {
  /**
   * `ko/contact.ts` 의 `faq.items` 는 `q`/`a` 쌍이 아니라 질문 **문자열
   * 배열**이다. `Contact.tsx` 는 각 질문을 `FAQ_LINKS` 를 따라 다른
   * 페이지(주로 /pricing)로 보내는 링크로만 렌더하고, 그 답을 이 페이지에
   * 싣지 않는다. 여기서 FAQPage 를 만들면 `acceptedAnswer.text` 를 화면에
   * 없는 텍스트로 지어내야 하므로, `/contact` 는 FAQPage 를 내지 않는다.
   */
  it("/contact 는 FAQPage 를 내지 않는다 — 화면에 답이 없기 때문이다", () => {
    expect(faqNode("/contact", "ko")).toBeUndefined();
    expect(faqNode("/en/contact", "en")).toBeUndefined();
    expect(faqItems("/contact", "ko")).toBeUndefined();
  });
});

describe("faqNode — 그 밖의 페이지", () => {
  it("FAQ 가 없는 페이지에서는 undefined", () => {
    expect(faqNode("/", "ko")).toBeUndefined();
    expect(faqNode("/about", "ko")).toBeUndefined();
  });
});
