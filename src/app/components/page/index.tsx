/**
 * 페이지가 쓰는 공용 블록은 전부 이 한 경로(`@/app/components/page`)에서
 * 나간다 — 호출부가 파일 위치를 알 필요가 없다.
 *
 * **이 파일은 재수출만 한다. 여기에 무언가를 정의하지 않는다.** 정의가
 * 섞이면 `page/` 안의 다른 모듈이 그것을 쓰려고 `./index` 를 임포트하게
 * 되고, 배럴과 그 구성원 사이에 순환 임포트가 생긴다. 지금은 값을 컴포넌트
 * 본문에서만 읽어 무해해 보이지만, 번들러와 테스트 러너가 평가 순서를 두고
 * 엇갈리는 순간 원인에서 한참 떨어진 곳에서 `undefined` 로 터진다.
 */
export { SHELL, BLOCK } from "./shell";
export { Section, SectionLabel, Lines } from "./section";
export { PageHero } from "./PageHero";
export { ClosingCta } from "./ClosingCta";
export { useProductCta } from "./useProductCta";
