import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockups as koMockups } from "@/content/ko/mockups";

// 이 프로젝트의 vitest 환경은 "node" 라 jsdom/testing-library 가 없다 (ImageSlot.test.tsx
// 참고). ProposalCard/ChatThread/ResultDashboard 는 인자 없이 useCopy() 를 직접 호출해
// 사전을 읽으므로, 컴포넌트를 순수 함수로 호출하려면 useCopy 훅 자체를 목으로 바꿔
// React 의 훅 디스패처(useContext) 경로를 완전히 우회해야 한다 — 그러지 않으면 렌더
// 트리 밖에서 훅을 호출한다는 에러가 난다.
const { mockUseCopy } = vi.hoisted(() => ({ mockUseCopy: vi.fn() }));

vi.mock("@/app/i18n/useCopy", () => ({
  useCopy: mockUseCopy,
}));

import { ProposalCard } from "./ProposalCard";
import { ChatThread } from "./ChatThread";
import { ResultDashboard } from "./ResultDashboard";

beforeEach(() => {
  mockUseCopy.mockReturnValue({ mockups: koMockups });
});

// --- 엘리먼트 트리 순회 헬퍼 (ImageSlot.test.tsx 와 같은 패턴) ---

/**
 * ProposalCard/ChatThread/ResultDashboard 는 MockFrame·MockChrome 같은 커스텀
 * 컴포넌트에 위임한다. JSX 는 이들을 호출하지 않고 `{ type: MockChrome, props }`
 * 형태의 엘리먼트 기술자로만 남기므로, 그 안의 실제 마크업(예: MockChrome 의
 * `label` prop 이 그리는 문구)을 보려면 함수형 컴포넌트 노드를 직접 한 번 더
 * 호출해 펼쳐야 한다. MockFrame/MockChrome 은 훅을 쓰지 않으므로(frame.tsx 확인)
 * 렌더 트리 밖에서 직접 호출해도 안전하다.
 */
function expand(node: unknown): unknown {
  if (node === null || node === undefined || typeof node === "boolean") return node;
  if (typeof node === "string" || typeof node === "number") return node;
  if (Array.isArray(node)) return node.map(expand);
  if (typeof node === "object" && "type" in (node as Record<string, unknown>)) {
    const el = node as any;
    if (typeof el.type === "function") {
      return expand(el.type(el.props));
    }
    return { ...el, props: { ...el.props, children: expand(el.props?.children) } };
  }
  return node;
}

function walk(node: unknown, visit: (n: unknown) => void): void {
  if (node === null || node === undefined || typeof node === "boolean") return;
  if (typeof node === "string" || typeof node === "number") {
    visit(node);
    return;
  }
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

/** 트리 안의 모든 문자열 리프를 모은다 — "사전에서 읽었는지" 확인용. */
function collectText(node: unknown): string[] {
  const out: string[] = [];
  walk(node, (n) => {
    if (typeof n === "string") out.push(n);
  });
  return out;
}

/** 주어진 조건을 만족하는 엘리먼트를 모두 모은다. */
function collectElements(node: unknown, predicate: (el: any) => boolean): any[] {
  const out: any[] = [];
  walk(node, (n) => {
    if (n && typeof n === "object" && "type" in (n as object) && predicate(n)) {
      out.push(n);
    }
  });
  return out;
}

describe("ResultDashboard", () => {
  it("Finding 1 회귀 가드: 예시 숫자 디스클레이머를 실제로 렌더링한다", () => {
    const el = expand(ResultDashboard());
    const text = collectText(el);
    expect(text).toContain(koMockups.dashboard.disclaimer);
  });

  it("Finding 2 회귀 가드: 채널 리스트 영역이 overflow-hidden 을 가져 아래 문단과 겹치지 않는다", () => {
    const el = ResultDashboard();
    // space-y-2 는 채널 리스트를 감싸는 div 에만 붙는 클래스라 다른 min-h-0
    // 컨테이너(콘텐츠 최상위 wrapper 등)와 구분해 정확히 짚어낸다.
    const channelWrappers = collectElements(
      el,
      (n) =>
        n.type === "div" &&
        typeof n.props?.className === "string" &&
        n.props.className.includes("space-y-2"),
    );
    expect(channelWrappers.length).toBe(1);
    for (const wrapper of channelWrappers) {
      expect(wrapper.props.className).toMatch(/min-h-0/);
      expect(wrapper.props.className).toMatch(/flex-1/);
      expect(wrapper.props.className).toMatch(/overflow-hidden/);
    }
  });

  it("문구를 사전에서 읽는다 (하드코딩이 아니다, MockChrome 라벨 포함)", () => {
    const el = expand(ResultDashboard());
    const text = collectText(el);
    expect(text).toContain(koMockups.dashboard.heading);
    expect(text).toContain(koMockups.dashboard.appLabel);
  });
});

describe("ChatThread", () => {
  it("Finding 3 런타임 가드: 사용자/에이전트 말풍선이 fromUser 판별자에 따라 다르게 렌더링된다", () => {
    const el = ChatThread();
    const bubbles = collectElements(
      el,
      (n) =>
        n.type === "p" &&
        typeof n.props?.className === "string" &&
        n.props.className.includes("rounded-xl"),
    );

    expect(bubbles).toHaveLength(koMockups.chat.messages.length);

    bubbles.forEach((bubble, index) => {
      const message = koMockups.chat.messages[index];
      expect(bubble.props.children).toBe(message.text);
      if (message.fromUser) {
        expect(bubble.props.className).toMatch(/bg-invert/);
        expect(bubble.props.className).not.toMatch(/bg-panel/);
      } else {
        expect(bubble.props.className).toMatch(/bg-panel/);
        expect(bubble.props.className).not.toMatch(/bg-invert/);
      }
    });

    // 최소 하나의 사용자 발화와 하나의 에이전트 발화가 실제로 다른 스타일
    // 분기를 탔는지 확인한다 (모두 같은 분기로 빠지는 회귀를 잡기 위함).
    const userBubbleClasses = bubbles
      .filter((_, i) => koMockups.chat.messages[i].fromUser)
      .map((b) => b.props.className);
    const agentBubbleClasses = bubbles
      .filter((_, i) => !koMockups.chat.messages[i].fromUser)
      .map((b) => b.props.className);
    expect(userBubbleClasses.length).toBeGreaterThan(0);
    expect(agentBubbleClasses.length).toBeGreaterThan(0);
    expect(userBubbleClasses[0]).not.toBe(agentBubbleClasses[0]);
  });

  it("문구를 사전에서 읽는다 (하드코딩이 아니다, MockChrome 라벨 포함)", () => {
    const el = expand(ChatThread());
    const text = collectText(el);
    expect(text).toContain(koMockups.chat.appLabel);
    expect(text).toContain(koMockups.chat.fields[0].value);
  });
});

describe("ProposalCard", () => {
  it("문구를 사전에서 읽는다 (하드코딩이 아니다, MockChrome 라벨 포함)", () => {
    const el = expand(ProposalCard());
    const text = collectText(el);
    expect(text).toContain(koMockups.proposal.appLabel);
    expect(text).toContain(koMockups.proposal.heading);
    for (const item of koMockups.proposal.items) {
      expect(text).toContain(item.title);
    }
    expect(text).toContain(koMockups.proposal.approve);
  });
});
