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
