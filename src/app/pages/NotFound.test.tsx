import { describe, expect, it } from "vitest";
import { notFoundLocale } from "./NotFound";

/**
 * `notFoundLocale` 은 404 문구의 로케일을 실제 경로에서 판별하는 순수
 * 함수다. `NotFound` 자체는 `useState`/`useEffect`(React 훅 디스패처가
 * 필요하다)를 직접 부르므로, 이 저장소가 유지해 온 "컴포넌트를 순수 함수로
 * 호출" 패턴(Home.test.tsx, Layout.test.tsx)이 통하지 않는다 — Layout.test.tsx
 * 가 같은 이유로 `getLangSwitchTarget` 순수 함수만 검증하는 것과 같은 선택.
 * `stripLocale` 을 감싸기만 하는 로직이므로 이 함수 하나를 검증하면 컴포넌트가
 * 실제로 쓰는 판별 경로 전체를 검증하는 것과 같다.
 */
describe("notFoundLocale", () => {
  it("/en 아래 경로에서는 영문 404 를 낸다", () => {
    expect(notFoundLocale("/en/nope")).toBe("en");
  });

  it("/en 이 없는 경로에서는 한국어 404 를 낸다", () => {
    expect(notFoundLocale("/nope")).toBe("ko");
  });

  /**
   * 접두사 오탐 방지 — 이 케이스가 핵심이다. `/en` 으로 **시작하는 문자열**과
   * `/en` **경로 구간**은 다르다. `pathname.startsWith("/en")` 이었다면
   * `/english-lesson` 도 영문으로 오탐했을 것이다. `stripLocale` 은
   * `/en` 또는 `/en/...` 형태만 골라내므로 이 경로는 한국어로 판별된다.
   */
  it("/en 으로 시작하지만 /en 경로 구간이 아닌 경로는 오탐하지 않는다", () => {
    expect(notFoundLocale("/english-lesson")).toBe("ko");
  });

  it("영문 루트(/en, /en/)도 영문으로 판별한다", () => {
    expect(notFoundLocale("/en")).toBe("en");
    expect(notFoundLocale("/en/")).toBe("en");
  });
});
