/**
 * 페이지 골격의 폭과 세로 리듬. 배럴(`index.tsx`)이 아니라 이 별도 모듈에
 * 있는 이유는 순환 임포트를 끊기 위해서다 — `PageHero`·`ClosingCta` 가
 * `SHELL` 을 쓰는데 그것을 배럴에서 가져오면 index → PageHero → index 고리가
 * 생긴다. 값을 컴포넌트 본문에서만 읽는 동안에는 무해하지만, 배럴을 쓰는
 * 페이지가 늘고 `page/` 가 자라면 번들러와 테스트 러너가 평가 순서를 두고
 * 엇갈리는 순간 원인에서 한참 떨어진 곳에서 `undefined` 로 터진다.
 *
 * 호출부는 이 파일을 알 필요가 없다. `index.tsx` 가 그대로 재수출하므로
 * `import { SHELL } from "@/app/components/page"` 는 전과 똑같이 동작한다.
 */
export const SHELL = "mx-auto max-w-[1180px] px-[clamp(20px,4vw,40px)]";
export const BLOCK = "py-[clamp(72px,8vw,112px)]";
