/**
 * 사이트 절대 URL 의 유일한 정의처.
 * canonical, hreflang, sitemap, OG, JSON-LD 가 모두 이 값을 기준으로 생성된다.
 *
 * **폴백은 반드시 이 사이트가 실제로 사는 주소여야 한다.** 예전 값이었던
 * `https://autocmo.com` 은 이 사이트가 아니라 다른 서비스였다 — 그 상태로는
 * canonical 이 남의 주소를 가리키고, 공유 카드 이미지(`og:image`)가 없는
 * 도메인에서 로드를 시도해 카카오톡·슬랙 미리보기가 통째로 깨진다.
 * "도메인이 아직 미정" 은 폴백을 아무 값이나 둬도 된다는 뜻이 아니다.
 *
 * 운영 도메인이 정해지면 `VITE_SITE_URL` 만 설정하면 되고(빌드 환경변수),
 * 그때 이 폴백도 함께 새 도메인으로 옮긴다 — 환경변수가 빠진 빌드가
 * 조용히 옛 주소를 내보내지 않도록.
 */
const FALLBACK_SITE_URL = "https://homepage-roan-kappa.vercel.app";

function readSiteUrl() {
  // Vite 는 빌드 시 import.meta.env.VITE_SITE_URL 을 리터럴로 치환한다.
  // vitest 와 node 실행 경로에서는 값이 없으므로 process.env 로 떨어진다.
  // tsconfig 의 types: ["vite/client", "node"] 가 정식 타입을 제공하므로
  // 캐스팅 없이 접근한다.
  const fromVite = import.meta.env.VITE_SITE_URL;
  const fromNode = typeof process !== "undefined" ? process.env.VITE_SITE_URL : undefined;

  return (fromVite ?? fromNode ?? FALLBACK_SITE_URL).replace(/\/+$/, "");
}

export const SITE_URL = readSiteUrl();

export function absoluteUrl(pathname: string) {
  const normalized = `/${pathname.replace(/^\/+/, "")}`;
  return `${SITE_URL}${normalized}`;
}
