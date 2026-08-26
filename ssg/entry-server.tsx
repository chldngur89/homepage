import { renderToString } from "react-dom/server";
import { RouterProvider, createMemoryRouter } from "react-router";
import { appRoutes, notFoundRoute, prerenderRoutes } from "../src/app/route-config";
import { htmlLangFor, renderSeoTags } from "./seo";

export { notFoundRoute, prerenderRoutes };
export { SITE_URL } from "./site";
export { buildLlmsTxt } from "./llms";
// prerender.mjs 는 별도 TS/alias 해석 없이 순정 node 로 이 번들을 불러 쓴다.
// hasEnglish · localePath · stripLocale 은 "@/content/locales" 별칭 임포트를
// 물고 있어 vite 로 번들된 이 경로를 통해서만 안전하게 쓸 수 있다 —
// sitemap 의 xhtml:link 를 어떤 경로에 붙일지 판단하는 데 그대로 재사용한다.
export { hasEnglish, localePath, stripLocale } from "../src/app/i18n/localePath";

export async function render(url: string) {
  const pathname = url === "/" ? url : url.replace(/\/+$/, "");
  const router = createMemoryRouter(appRoutes, {
    initialEntries: [pathname],
  });

  const appHtml = renderToString(<RouterProvider router={router} />);

  return {
    appHtml,
    headTags: renderSeoTags(pathname),
    htmlLang: htmlLangFor(pathname),
  };
}
