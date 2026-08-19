import { describe, expect, it } from "vitest";
import { Section, SectionLabel, Lines } from "./index";

describe("Section", () => {
  it("aria-labelledby 에 id 를 연결한다", () => {
    const el = Section({ id: "x-h", children: null }) as { props: Record<string, unknown> };
    expect(el.props["aria-labelledby"]).toBe("x-h");
  });

  it("tone='panel' 이면 bg-panel 을 쓴다", () => {
    const el = Section({ id: "x-h", tone: "panel", children: null }) as { props: { className: string } };
    expect(el.props.className).toContain("bg-panel");
  });

  it("기본 tone 은 bg-ground 다", () => {
    const el = Section({ id: "x-h", children: null }) as { props: { className: string } };
    expect(el.props.className).toContain("bg-ground");
  });
});

describe("SectionLabel", () => {
  it("기본은 p 다", () => {
    const el = SectionLabel({ index: "01", children: "라벨" }) as { type: string };
    expect(el.type).toBe("p");
  });

  it("as='h2' 면 heading 으로 승격되고 클래스는 같다", () => {
    const p = SectionLabel({ index: "01", children: "라벨" }) as { type: string; props: { className: string } };
    const h = SectionLabel({ index: "01", as: "h2", children: "라벨" }) as { type: string; props: { className: string } };
    expect(h.type).toBe("h2");
    expect(h.props.className).toBe(p.props.className);
  });
});

describe("Lines", () => {
  it("줄바꿈 개수만큼 조각을 만든다", () => {
    const el = Lines({ text: "가\n나\n다" }) as { props: { children: unknown[] } };
    expect(el.props.children).toHaveLength(3);
  });
});
