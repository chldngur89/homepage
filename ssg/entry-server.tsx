import { renderToString } from "react-dom/server";
import { RouterProvider, createMemoryRouter } from "react-router";
import { appRoutes, notFoundRoute, prerenderRoutes } from "../src/app/route-config";
import { htmlLangFor, renderSeoTags } from "./seo";

export { notFoundRoute, prerenderRoutes };
export { SITE_URL } from "./site";

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
