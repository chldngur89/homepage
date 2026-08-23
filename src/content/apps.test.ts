import { describe, expect, it } from "vitest";
import { CTO_APP_IDS } from "@/app/pages/Apps";
import { APPS } from "@/app/config/apps";

/**
 * `CTO_APP_IDS`(`src/app/pages/Apps.tsx`)는 `apps.json` 의 `id` 를 문자열로
 * 손으로 적은 목록이다. 오타가 나도 `indexOf` 가 -1 을 돌려주고 `listOrder` 가
 * 0 이 될 뿐이라, 그 앱은 **조용히** 원래 자리에 남고 배지도 잃는다. typecheck
 * 도 테스트도 `check-html` 도 이걸 못 잡는다(`check-html.mjs` 는 `/apps` 를
 * 아직 안 본다) — 그래서 여기서 데이터-코드 정합성을 직접 잡는다.
 *
 * 요금 페이지의 "대표 플랜은 정확히 하나, 인덱스 1" 테스트(`pricing.test.ts`)와
 * 같은 종류의 가드다.
 */
describe("CTO_APP_IDS 와 apps.json 의 정합성", () => {
  it("CTO_APP_IDS 의 모든 id 가 APPS 안에 실제로 존재한다", () => {
    const knownIds = new Set(APPS.map((app) => app.id));
    for (const id of CTO_APP_IDS) {
      expect(knownIds.has(id)).toBe(true);
    }
  });
});
