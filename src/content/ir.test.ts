import { describe, expect, it } from "vitest";
import { ir as ko } from "./ko/ir";
import { ir as en } from "./en/ir";

/**
 * IR 페이지는 사이트에서 유일하게 **투자자에게 보여줄 수치**를 싣는 화면이다.
 * TAM/SAM/SOM, 유닛 이코노믹스, 18개월 시나리오가 번역 도중 한 자리라도
 * 흔들리면 그건 카피 회귀가 아니라 투자자 자료의 오류다.
 *
 * **타입은 이것을 하나도 막지 못한다.** `ko/ir.ts` 는 `export const ir:
 * IrContent` 로 인터페이스를 명시하므로 문자열은 이미 `string`, 숫자는 이미
 * `number` 다 — `"55~80조 원"` 을 `"55~85조 원"` 으로 바꿔도, `value: 85` 를
 * `88` 로 바꿔도 컴파일은 통과한다. 배열도 마찬가지다: `IrContent` 는
 * `IrFunnelLevel[]` 로 선언하지 튜플이 아니라서, 영문판이 TAM/SAM/SOM 세 줄
 * 중 하나를 빠뜨려도 컴파일러는 아무 말도 하지 않는다(태스크 1에서 실제로
 * 확인했다). 그 구멍 네 개를 이 파일이 덮는다.
 *
 * 이 테스트가 실패하면 "테스트를 고치는" 것이 아니라, 수치를 정말 바꾸기로
 * 한 결정이 있었는지부터 확인한다. 결정이 있었다면 **두 로케일을 같이**
 * 고친다.
 */

/** 사전 안의 모든 `number` 를 순회 순서대로. 차트 데이터가 여기 걸린다. */
const numbers = (value: unknown): number[] => {
  if (typeof value === "number") return [value];
  if (Array.isArray(value)) return value.flatMap(numbers);
  if (value && typeof value === "object") return Object.values(value).flatMap(numbers);
  return [];
};

/**
 * 문자열 안의 숫자 표현. 투자자 수치의 절반이 `number` 가 아니라 문자열
 * 안에 있다 — TAM `"55~80조 원"`, SOM `"국내 1~10인"`, `"18개월 운영
 * 시나리오"`. `number` 만 비교하는 테스트는 정작 핵심 수치를 못 잡는다.
 *
 * 비교 전에 두 가지를 **정규화**한다. 둘 다 숫자가 아니라 조판 관습이다.
 *
 * 1. **범위 기호** — 한국어는 `1~10`, 영어는 `1–10` 으로 쓴다. 물결표는
 *    영문 투자 자료에서 쓰지 않는 기호이고, 여기서 통일을 강요하면 숫자를
 *    지키자고 영어를 망가뜨리게 된다. `~`·`–`·`—` 를 `-` 로 모은다.
 * 2. **끝에 붙은 구두점** — `"18-month"`, `"teams of 1–10."` 처럼 숫자 뒤에
 *    하이픈이나 마침표가 붙는 것은 영어 문법이지 자릿수가 아니다. 끝의
 *    숫자·`%` 가 아닌 글자를 떼어 낸다(가운데는 손대지 않으므로 `2.5`,
 *    `1,000`, `1.5%` 는 그대로다).
 *
 * 단위어(`조 원` / `trillion`)가 빠지는 것은 정규식이 이미 해 준다.
 */
const digitRuns = (value: unknown): string[] => {
  if (typeof value === "string") {
    return (value.match(/\d[\d.,~\-–%]*/g) ?? []).map((run) =>
      run.replace(/[~–—]/g, "-").replace(/[^\d%]+$/, ""),
    );
  }
  if (Array.isArray(value)) return value.flatMap(digitRuns);
  if (value && typeof value === "object") return Object.values(value).flatMap(digitRuns);
  return [];
};

/**
 * 판별자 값 — `tone`·`segment`·`stage`. 카피가 아니라 `StatusPill` 과 차트가
 * 색을 고르는 데 쓰는 태그다. 타입이 이미 잘못된 값을 막지만, 필드를 이름으로
 * 훑기 때문에 나중에 판별자가 하나 더 늘어도 자동으로 덮인다 — 열거형 필드
 * 목록을 여기 손으로 적어 두면 그 목록이 먼저 썩는다.
 */
const DISCRIMINANT_KEYS = ["segment", "stage", "tone"];

const discriminants = (value: unknown): string[] => {
  if (Array.isArray(value)) return value.flatMap(discriminants);
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, child]) =>
      DISCRIMINANT_KEYS.includes(key) && typeof child === "string"
        ? [`${key}=${child}`]
        : discriminants(child),
    );
  }
  return [];
};

/**
 * 구조만 — 키 경로와 배열 길이. 카피는 보지 않는다. 위 두 수치 검사가
 * 못 잡는 누락이 여기 걸린다: 숫자가 없는 배열 원소(예: `hero.signals` 의
 * 지원사업 한 줄, `solution.pipeline` 의 다섯 단계 중 하나)가 빠지면
 * 컴파일도 통과하고 숫자도 그대로지만 영문 페이지에서 항목이 조용히
 * 사라진다.
 *
 * **정렬하지 않는다.** 키 순서 자체가 계약이기 때문이다 — 위 두 검사는
 * 객체를 `Object.values` 순서로 훑으므로, 영문 사전이 키를 재배열하면
 * 카피가 옳아도 수치 비교가 깨진다. 순서를 여기서 같이 보면 그때 나오는
 * 실패 메시지가 "어느 경로가 밀렸는지" 를 그대로 보여 준다.
 */
const shape = (value: unknown, path = ""): string[] => {
  if (Array.isArray(value)) {
    return [
      `${path}[]=${value.length}`,
      ...value.flatMap((item, index) => shape(item, `${path}[${index}]`)),
    ];
  }
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, child]) =>
      shape(child, path ? `${path}.${key}` : key),
    );
  }
  return [`${path}:${typeof value}`];
};

describe("IR 사전", () => {
  it("두 로케일의 number 값이 순서까지 같다", () => {
    expect(numbers(en)).toEqual(numbers(ko));
  });

  it("두 로케일의 문자열 속 숫자 표현이 순서까지 같다", () => {
    expect(digitRuns(en)).toEqual(digitRuns(ko));
  });

  it("판별자 값이 번역되지 않았다", () => {
    expect(discriminants(en)).toEqual(discriminants(ko));
  });

  it("두 로케일의 구조(키 경로·배열 길이)가 같다", () => {
    expect(shape(en)).toEqual(shape(ko));
  });

  /**
   * 이 페이지가 저장소에 하나 남은 배포 게이트였다 — `/en/ir` 이
   * `<html lang="en">` 을 달고 한국어 본문을 내고 있었다. 빌드 후
   * `scripts/check-html.mjs` 가 렌더된 HTML 에서 같은 것을 보지만, 그건
   * 전체 빌드가 끝나야 돈다. 사전 단계에서 먼저 잡는 편이 싸다.
   */
  it("영문 사전에 한글이 없다", () => {
    const hangul = (value: unknown): string[] => {
      if (typeof value === "string") return value.match(/[가-힣]+/g) ?? [];
      if (Array.isArray(value)) return value.flatMap(hangul);
      if (value && typeof value === "object") return Object.values(value).flatMap(hangul);
      return [];
    };

    expect(hangul(en)).toEqual([]);
  });
});
