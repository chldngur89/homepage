import appsData from "@/content/apps.json";

export type AppItem = (typeof appsData.apps)[number];

export const APP_URLS = {
  cmo: appsData.apps.find((a) => a.id === "cmo")?.url ?? "https://web-neon-nu-89.vercel.app/",
  cfoTool: appsData.apps.find((a) => a.id === "cfo-tool")?.url ?? "https://cfo-tool-pied.vercel.app/",
  ceoRader: appsData.apps.find((a) => a.id === "ceo-rader")?.url ?? "https://ceo-rader.vercel.app/",
} as const;

export const APPS = appsData.apps;

/**
 * 제품 앱(APP_URLS.cmo 등)은 한국어 UI 만 제공한다. 영문 화면에서 제품으로
 * 가는 CTA 에 `hreflang="ko"` 를 붙이는 근거이며, 영문 UI 가 생기면 이 값만
 * true 로 바꾸면 된다.
 */
export const APP_HAS_ENGLISH = false;
