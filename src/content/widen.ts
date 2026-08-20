/**
 * 한국어 사전은 as const 라 값이 리터럴 타입으로 굳는다("우리팀" 타입).
 * 영어 사전이 같은 타입을 그대로 구현하면 영어 문자열을 넣을 수 없으므로,
 * 구조는 유지하되 리프의 리터럴만 넓힌다.
 * 항목이 빠지면 여전히 컴파일 에러가 나므로 번역 누락은 계속 잡힌다.
 *
 * 배열을 위한 별도 분기(`T extends readonly (infer U)[] ? DeepWiden<U>[]`)를
 * 두지 않는 것이 핵심이다. 그 분기는 `as const` 가 만들어 준 튜플
 * (길이가 고정된 `readonly [A, B]`)을 길이 제한이 없는 `DeepWiden<U>[]` 로
 * 되돌려 놓았고, 그 결과 배열 원소가 통째로 빠져도 컴파일이 통과했다
 * (예: en/home.ts 의 hero.assurances 를 2개 → 1개로 줄여도 에러가 없었다).
 * 홈페이지 카피는 대부분 배열이라, 이 구멍이 "번역 누락 = 컴파일 에러"
 * 라는 보증의 대부분을 무력화했다.
 *
 * 아래의 매핑 타입은 homomorphic 이라 배열·튜플에 적용하면 배열성과
 * 길이(그리고 readonly 여부)를 그대로 보존한다. 따라서 원소가 하나라도
 * 빠지거나 늘면 타입 에러가 난다.
 */
export type DeepWiden<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : { [K in keyof T]: DeepWiden<T[K]> };

/**
 * 튜플 `T` 와 **모양이 같고**(배열성·길이·readonly 보존) 원소가 전부 `V` 인
 * 타입. 사전 배열과 인덱스로 짝지어 쓰는 코드 쪽 배열의 타입을 사전에서
 * **파생**시키기 위한 것이다 — 문구는 사전이, 목적지·동작은 코드가 정하되
 * 둘의 길이는 컴파일러가 묶어 둔다.
 *
 * `Contact.tsx` 의 `FAQ_LINKS`(사전 FAQ 항목 → 링크 목적지)와 `Pricing.tsx` 의
 * `PLAN_CTA_TO_CONTACT`(요금제 → CTA 목적지)가 이것을 쓴다. 사전에 항목이
 * 하나 늘거나 줄면 짝지은 배열이 컴파일되지 않는다. 이 보증이 없으면
 * `PLAN_CTA_TO_CONTACT[3]` 이 `undefined` → falsy 가 되어, 새 요금제의 CTA 가
 * 조용히 제품 앱으로 가면서 빌드는 초록으로 끝난다.
 *
 * `T` 가 **타입 매개변수**여야 매핑이 homomorphic 이 되어 배열성과 길이가
 * 보존된다 — 구체 타입을 그 자리에 직접 쓰면
 * (`{ [K in keyof Foo["items"]]: string }`) TypeScript 가 `length`·`map` 같은
 * 배열 멤버까지 `string` 으로 바꿔 버린다. 위 `DeepWiden` 이 배열 원소 누락을
 * 잡아내는 것과 같은 원리다.
 */
export type SameShape<T, V> = { [K in keyof T]: V };
