import { isValidElement, type ReactNode } from "react";
import { describe, expect, it } from "vitest";
import { matchRoutes, type RouteObject } from "react-router";
import { appRoutes, prerenderRoutes } from "./route-config";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import IR from "./pages/IR";
import Demo from "./pages/Demo";
import NotFound from "./pages/NotFound";

describe("prerenderRoutes", () => {
  it("한국어 11개와 영어 7개, 합쳐서 18개다", () => {
    expect(prerenderRoutes).toHaveLength(18);
  });

  it("한국어 경로를 모두 포함한다", () => {
    for (const path of [
      "/", "/solution", "/technology", "/pricing", "/demo",
      "/apps", "/about", "/contact", "/ir", "/privacy", "/terms",
    ]) {
      expect(prerenderRoutes).toContain(path);
    }
  });

  it("영어 경로 7개를 포함한다", () => {
    for (const path of [
      "/en", "/en/solution", "/en/technology", "/en/pricing",
      "/en/about", "/en/contact", "/en/ir",
    ]) {
      expect(prerenderRoutes).toContain(path);
    }
  });

  it("영문판이 없는 경로의 /en 판을 만들지 않는다", () => {
    for (const path of ["/en/demo", "/en/apps", "/en/privacy", "/en/terms"]) {
      expect(prerenderRoutes).not.toContain(path);
    }
  });

  it("중복이 없다", () => {
    expect(new Set(prerenderRoutes).size).toBe(prerenderRoutes.length);
  });
});

/**
 * prerenderRoutes 는 appRoutes 와 별개로 만들어진 문자열 배열이라, 이 배열의
 * 모양만으로는 실제 라우트 트리가 그 URL 을 올바른 컴포넌트로 풀어내는지
 * 보장하지 못한다. 여기서는 matchRoutes 로 appRoutes 자체를 실제 URL 에
 * 대해 해석해서, 매치된 라우트 체인이 기대한 컴포넌트를 포함(하거나
 * 포함하지 않)하는지 직접 검증한다.
 */
function collectRenderables(route: RouteObject): unknown[] {
  const items: unknown[] = [];

  if (route.Component) {
    items.push(route.Component);
  }

  // route.element 는 <Wrapper><Layout /></Wrapper> 처럼 중첩된 JSX 일 수
  // 있다. children 체인을 한 겹씩 벗겨서 실제로 렌더되는 컴포넌트 타입을
  // 전부 모은다.
  let node: ReactNode = route.element ?? null;
  while (isValidElement(node)) {
    items.push(node.type);
    node = (node.props as { children?: ReactNode } | null)?.children ?? null;
  }

  return items;
}

function renderablesFor(pathname: string): unknown[] {
  const matches = matchRoutes(appRoutes, pathname);
  if (!matches) return [];
  return matches.flatMap((match) => collectRenderables(match.route as RouteObject));
}

describe("appRoutes는 실제 URL을 올바른 컴포넌트로 해석한다", () => {
  it("/ 는 Home 으로 해석된다", () => {
    expect(renderablesFor("/")).toContain(Home);
  });

  it("/pricing 은 Pricing 으로 해석된다", () => {
    expect(renderablesFor("/pricing")).toContain(Pricing);
  });

  it("/en 은 Home 으로 해석된다", () => {
    expect(renderablesFor("/en")).toContain(Home);
  });

  it("/en/pricing 은 Pricing 으로 해석된다", () => {
    expect(renderablesFor("/en/pricing")).toContain(Pricing);
  });

  it("/ir 은 IR 로 해석되고, Layout 밑에 중첩되지 않는다", () => {
    const renderables = renderablesFor("/ir");
    expect(renderables).toContain(IR);
    expect(renderables).not.toContain(Layout);
  });

  it("/en/ir 은 IR 로 해석되고, Layout 밑에 중첩되지 않는다", () => {
    const renderables = renderablesFor("/en/ir");
    expect(renderables).toContain(IR);
    expect(renderables).not.toContain(Layout);
  });

  it("/en/demo 는 Demo 가 아니라 catch-all(NotFound) 로 떨어진다", () => {
    const renderables = renderablesFor("/en/demo");
    expect(renderables).not.toContain(Demo);
    expect(renderables).toContain(NotFound);
  });

  it("/enterprise 는 /en 트리로 오인되지 않는다 (접두사 충돌 가드)", () => {
    const renderables = renderablesFor("/enterprise");
    expect(renderables).not.toContain(Home);
    expect(renderables).toContain(NotFound);
  });
});
