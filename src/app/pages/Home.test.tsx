import { describe, expect, it, vi } from "vitest";
import { common as koCommon } from "@/content/ko/common";
import { home as koHome } from "@/content/ko/home";
import { mockups as koMockups } from "@/content/ko/mockups";

// 이 저장소의 vitest 환경은 "node" 라 jsdom/testing-library 가 없다
// (ImageSlot.test.tsx, mockups.test.tsx 참고). Home 은 useLocale()(컨텍스트) 와
// useCopy()(내부에서 다시 useLocale 을 부르는 컨텍스트 훅)를 직접 호출하므로,
// 컴포넌트를 순수 함수로 호출하려면 두 훅 모두를 목으로 갈아끼워 React 의 훅
// 디스패처(useContext) 경로를 완전히 우회해야 한다 — 그러지 않으면 렌더 트리
// 밖에서 훅을 호출한다는 에러가 난다. useCopy 하나만 mock 한 mockups.test.tsx와
// 달리, Home 은 useLocale 을 별도로 직접 부르므로(내부 링크 경로 계산용) 두
// 모듈을 각각 mock 한다.
const { mockUseCopy, mockUseLocale } = vi.hoisted(() => ({
  mockUseCopy: vi.fn(),
  mockUseLocale: vi.fn(),
}));

vi.mock("@/app/i18n/useCopy", () => ({ useCopy: mockUseCopy }));
vi.mock("@/app/i18n/LocaleContext", () => ({ useLocale: mockUseLocale }));

import Home from "./Home";

// describe 블록 본문은 (수집 단계에서) beforeEach 보다 먼저, 동기적으로 실행되므로
// Home() 을 호출하기 전에 여기서 직접 mock 반환값을 채운다. Home 자신은
// copy.home/copy.common 만 읽지만, 트리 안에는 ProposalCard/ChatThread/
// ResultDashboard(각자 copy.mockups 를 읽는다)도 실제로 박혀 있으므로 세 키를
// 모두 채워야 그 목업들도 에러 없이 펼쳐진다.
mockUseCopy.mockReturnValue({ home: koHome, common: koCommon, mockups: koMockups });
mockUseLocale.mockReturnValue("ko");

// --- 엘리먼트 트리 순회 헬퍼 (ImageSlot.test.tsx, mockups.test.tsx 와 같은 패턴) ---

/**
 * 함수형 컴포넌트 엘리먼트를 실제로 한 번 더 호출해 그 안의 마크업을 펼친다.
 * Home 내부의 Section/SectionLabel/Lines, ImageSlot 은 훅을 쓰지 않아 안전하게
 * 펼쳐지지만, react-router 의 <Link> 는 Router 컨텍스트가 있어야 하는 훅을 써서
 * 렌더 트리 밖에서 호출하면 던진다 — 이 테스트는 헤딩 구조만 보면 되고 Link
 * 내부까지 볼 필요가 없으므로, 그런 경우는 펼치지 않고 이미 만들어진
 * children 만 그대로 내려가며 opaque 노드로 남긴다.
 */
function expand(node: unknown): unknown {
  if (node === null || node === undefined || typeof node === "boolean") return node;
  if (typeof node === "string" || typeof node === "number") return node;
  if (Array.isArray(node)) return node.map(expand);
  if (typeof node === "object" && "type" in (node as Record<string, unknown>)) {
    const el = node as any;
    if (typeof el.type === "function") {
      try {
        return expand(el.type(el.props));
      } catch {
        return { ...el, props: { ...el.props, children: expand(el.props?.children) } };
      }
    }
    return { ...el, props: { ...el.props, children: expand(el.props?.children) } };
  }
  return node;
}

function walk(node: unknown, visit: (n: unknown) => void): void {
  if (node === null || node === undefined || typeof node === "boolean") return;
  if (typeof node === "string" || typeof node === "number") return;
  if (Array.isArray(node)) {
    for (const child of node) walk(child, visit);
    return;
  }
  if (typeof node === "object" && "type" in (node as Record<string, unknown>)) {
    visit(node);
    const children = (node as any).props?.children;
    walk(children, visit);
  }
}

describe("Home — 섹션마다 aria-labelledby 가 가리키는 heading 이 실제로 존재한다", () => {
  const tree = expand(Home());

  const labelledByIds: string[] = [];
  walk(tree, (n: any) => {
    const target = n.props?.["aria-labelledby"];
    if (typeof target === "string") labelledByIds.push(target);
  });

  const headings: { id: string; tag: string }[] = [];
  walk(tree, (n: any) => {
    if ((n.type === "h1" || n.type === "h2") && typeof n.props?.id === "string") {
      headings.push({ id: n.props.id, tag: n.type });
    }
  });

  it("최소 9개의 aria-labelledby 섹션이 있다 (히어로 + 01~07 + CTA)", () => {
    expect(labelledByIds.length).toBeGreaterThanOrEqual(9);
  });

  it.each(labelledByIds)(
    "회귀 가드: aria-labelledby=\"%s\" 를 만족하는 h1/h2 가 정확히 하나 존재한다",
    (id) => {
      const matches = headings.filter((h) => h.id === id);
      expect(matches).toHaveLength(1);
    },
  );

  it("Fix round 2 회귀 가드: voice-h(06 파일럿 피드백)는 h2 로 렌더링된다 (라벨 span 이 아니다)", () => {
    const match = headings.find((h) => h.id === "voice-h");
    expect(match).toBeDefined();
    expect(match?.tag).toBe("h2");
  });

  it("heading id 는 서로 중복되지 않는다", () => {
    const ids = headings.map((h) => h.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
