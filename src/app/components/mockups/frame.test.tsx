import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { MockFrame } from "./frame";

// Fix round 1: 375px 폭에서 ResultDashboard 의 채널 바·안내문이 통째로
// 잘리는 결함이 나왔다 (박스 188px, 필요한 내용 268px). 원인은 MockFrame 이
// aspect-ratio 로 높이를 고정해, 내용이 그 안에 들어가지 못하면 overflow-hidden
// 이 조용히 잘라내는 구조였기 때문이다. 세 목업(ProposalCard/ChatThread/
// ResultDashboard) 이 모두 MockFrame 을 통해서만 비율을 받으므로, 이 파일
// 하나를 고치는 것으로 셋 다 고쳐진다.
//
// 고정폭 대신 커스텀 프로퍼티(--mock-ratio) + 미디어쿼리 클래스(.mock-frame)로
// 바꿨다: 640px(Tailwind sm) 미만에서는 aspect-ratio: auto 로 내용이 높이를
// 정하게 하고, 그 이상에서는 디자인이 의도한 비율을 그대로 고정한다. jsdom 이
// 없는 node 테스트 환경에서는 미디어쿼리 매치 결과를 직접 계산할 수 없으므로,
// 여기서는 (1) 컴포넌트가 비율 값을 인라인 style 에 고정하지 않고 커스텀
// 프로퍼티로만 넘기는지, (2) theme.css 에 그 커스텀 프로퍼티를 640px 이상에서만
// 적용하는 규칙이 실제로 존재하는지를 각각 확인해 조건부 동작을 핀으로 고정한다.

describe("MockFrame", () => {
  it("비율 값을 인라인 aspectRatio 로 고정하지 않고 --mock-ratio 커스텀 프로퍼티로 넘긴다", () => {
    const el = MockFrame({ ratio: "16 / 9", children: null }) as any;
    expect(el.props.style).toEqual({ "--mock-ratio": "16 / 9" });
    expect(el.props.style.aspectRatio).toBeUndefined();
  });

  it("mock-frame 클래스를 붙인다 (조건부 aspect-ratio 는 이 클래스가 담당)", () => {
    const el = MockFrame({ ratio: "4 / 3", children: null }) as any;
    expect(el.props.className).toMatch(/\bmock-frame\b/);
  });

  it("ratio prop 이 달라지면 커스텀 프로퍼티 값도 그대로 따라간다", () => {
    const el = MockFrame({ ratio: "16 / 11", children: null }) as any;
    expect(el.props.style["--mock-ratio"]).toBe("16 / 11");
  });
});

describe("MockFrame 의 반응형 aspect-ratio 규칙 (theme.css)", () => {
  const themeCss = readFileSync(
    fileURLToPath(new URL("../../../styles/theme.css", import.meta.url)),
    "utf-8",
  );

  it("640px 미만 기본값은 aspect-ratio: auto 다 (내용이 높이를 정한다 — 클리핑 방지)", () => {
    expect(themeCss).toMatch(/\.mock-frame\s*{\s*aspect-ratio:\s*auto;?\s*}/);
  });

  it("640px 이상에서는 --mock-ratio 로 지정한 비율을 고정한다 (데스크톱 외관 유지)", () => {
    expect(themeCss).toMatch(
      /@media \(min-width:\s*640px\)\s*{\s*\.mock-frame\s*{\s*aspect-ratio:\s*var\(--mock-ratio\);?\s*}\s*}/,
    );
  });
});
