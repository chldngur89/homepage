import { afterEach, describe, expect, it } from "vitest";
import { IMAGE_SLOTS } from "@/app/config/images";
import { ImageSlot, isCompactSlot } from "@/app/components/ImageSlot";

// 이 프로젝트의 vitest 환경은 "node" 라 jsdom/testing-library 가 없다.
// ImageSlot 은 함수 컴포넌트이므로 직접 호출하면 실제 DOM 없이도 반환된
// React 엘리먼트 트리(순수 객체)를 얻을 수 있다. 여기서는 그 트리를
// 순회해 태그 종류·props 를 검사한다 — 화면에 그려보는 렌더 테스트는
// 아니지만, "sample:true 는 <img> 를 만들지 않는다" 같은 분기 회귀는
// 이 정도로 충분히 잡아낸다.
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

describe("isCompactSlot", () => {
  it("compact 를 명시하면 그 값을 그대로 쓴다", () => {
    expect(isCompactSlot(IMAGE_SLOTS.persona, true)).toBe(true);
    expect(isCompactSlot(IMAGE_SLOTS["voice-1"], false)).toBe(false);
  });

  it("compact 를 생략하면 1 / 1 비율에서 자동으로 true 다", () => {
    expect(isCompactSlot(IMAGE_SLOTS["voice-1"])).toBe(true);
    expect(isCompactSlot(IMAGE_SLOTS["voice-2"])).toBe(true);
  });

  it("compact 를 생략하면 1 / 1 이 아닌 비율은 false 다", () => {
    expect(isCompactSlot(IMAGE_SLOTS.persona)).toBe(false);
    expect(isCompactSlot(IMAGE_SLOTS["footer-wide"])).toBe(false);
  });
});

describe("ImageSlot — sample:true 분기", () => {
  it("<img> 를 만들지 않는다", () => {
    const el = ImageSlot({ slot: "persona", alt: "대표 업무 환경" });
    expect(findByType(el, "img")).toBeNull();
    expect(collectAllTypes(el)).not.toContain("img");
  });

  it("일반 크기 슬롯은 subject 라벨을 span 으로 그린다", () => {
    const el: any = ImageSlot({ slot: "persona", alt: "대표 업무 환경" });
    const span = findByType(el, "span");
    expect(span).not.toBeNull();
    expect(span.props.children).toBe(IMAGE_SLOTS.persona.subject);
    expect(span.props["aria-hidden"]).toBe("true");
  });

  it("바깥 요소가 role=img 와 alt 를 스크린 리더용으로 갖는다", () => {
    const el: any = ImageSlot({ slot: "persona", alt: "대표 업무 환경" });
    expect(el.props.role).toBe("img");
    expect(el.props["aria-label"]).toBe("대표 업무 환경");
  });

  it("정사각(44px 아바타) 슬롯은 라벨 span 없이 테두리만 그린다", () => {
    const el: any = ImageSlot({ slot: "voice-1", alt: "피드백 남긴 사용자" });
    expect(findByType(el, "span")).toBeNull();
    // 필드/테두리 컨테이너 자체는 그대로 있어야 한다.
    expect(el.type).toBe("div");
    expect(el.props.className).toMatch(/border-line-2/);
    expect(el.props.role).toBe("img");
    expect(el.props["aria-label"]).toBe("피드백 남긴 사용자");
  });

  it("compact=false 를 명시하면 정사각 슬롯도 라벨을 그린다", () => {
    const el: any = ImageSlot({ slot: "voice-1", alt: "피드백 남긴 사용자", compact: false });
    expect(findByType(el, "span")).not.toBeNull();
  });

  it("aspect-ratio 는 레지스트리의 ratio 값을 그대로 쓴다 (사진 픽셀 크기와 무관)", () => {
    const el: any = ImageSlot({ slot: "footer-wide", alt: "사무실" });
    expect(el.props.style.aspectRatio).toBe(IMAGE_SLOTS["footer-wide"].ratio);
  });
});

describe("ImageSlot — sample:false 분기", () => {
  const slotId = "persona" as const;
  const original = { ...IMAGE_SLOTS[slotId] };

  afterEach(() => {
    IMAGE_SLOTS[slotId] = { ...original };
  });

  it("실제 사진으로 교체되면(sample:false) <img> 를 그리고 라벨은 그리지 않는다", () => {
    IMAGE_SLOTS[slotId] = { ...original, sample: false };

    const el: any = ImageSlot({ slot: slotId, alt: "대표 업무 환경" });
    const img = findByType(el, "img");

    expect(img).not.toBeNull();
    expect(img.props.src).toBe(IMAGE_SLOTS[slotId].src);
    expect(img.props.alt).toBe("대표 업무 환경");
    expect(findByType(el, "span")).toBeNull();
  });

  it("sample:false 여도 aspect-ratio 는 레지스트리 값으로 고정된다", () => {
    IMAGE_SLOTS[slotId] = { ...original, sample: false };

    const el: any = ImageSlot({ slot: slotId, alt: "대표 업무 환경" });
    expect(el.props.style.aspectRatio).toBe(original.ratio);
  });

  it("grayscale prop 은 sample:false 의 <img> 에만 적용된다", () => {
    IMAGE_SLOTS[slotId] = { ...original, sample: false };

    const grayEl: any = ImageSlot({ slot: slotId, alt: "x", grayscale: true });
    const grayImg = findByType(grayEl, "img");
    expect(grayImg.props.style).toEqual({ filter: "grayscale(1)" });

    const colorEl: any = ImageSlot({ slot: slotId, alt: "x", grayscale: false });
    const colorImg = findByType(colorEl, "img");
    expect(colorImg.props.style).toBeUndefined();
  });
});
