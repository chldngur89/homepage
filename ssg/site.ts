/**
 * 사이트 절대 URL 의 유일한 정의처.
 * canonical, hreflang, sitemap, OG, JSON-LD 가 모두 이 값을 기준으로 생성된다.
 * 운영 도메인이 정해지면 VITE_SITE_URL 환경변수만 설정하면 된다.
 */
const FALLBACK_SITE_URL = "https://autocmo.com";

function readSiteUrl() {
  // Vite 는 빌드 시 import.meta.env.VITE_SITE_URL 을 리터럴로 치환한다.
  // vitest 와 node 실행 경로에서는 값이 없으므로 process.env 로 떨어진다.
  // `as` 캐스팅 없이 쓰면 tsconfig 에 vite/client 타입이 없을 때 에러가 난다.
  const fromVite = (import.meta as { env?: Record<string, string | undefined> }).env
    ?.VITE_SITE_URL;
  const fromNode =
    typeof process !== "undefined" ? process.env?.VITE_SITE_URL : undefined;

  return (fromVite ?? fromNode ?? FALLBACK_SITE_URL).replace(/\/+$/, "");
}

export const SITE_URL = readSiteUrl();

export function absoluteUrl(pathname: string) {
  const normalized = `/${pathname.replace(/^\/+/, "")}`;
  return `${SITE_URL}${normalized}`;
}
