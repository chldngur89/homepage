/**
 * 한국어 사전은 as const 라 값이 리터럴 타입으로 굳는다("우리팀" 타입).
 * 영어 사전이 같은 타입을 그대로 구현하면 영어 문자열을 넣을 수 없으므로,
 * 구조는 유지하되 리프의 리터럴만 넓힌다.
 * 항목이 빠지면 여전히 컴파일 에러가 나므로 번역 누락은 계속 잡힌다.
 */
export type DeepWiden<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends readonly (infer U)[]
        ? DeepWiden<U>[]
        : { [K in keyof T]: DeepWiden<T[K]> };
