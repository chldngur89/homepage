import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { build } from "vite";

const currentFilePath = fileURLToPath(import.meta.url);
const rootDir = path.resolve(path.dirname(currentFilePath), "..");
const distDir = path.join(rootDir, "dist");
const ssrDir = path.join(rootDir, ".ssr");

function withTrailingSlash(url) {
  return url.endsWith("/") ? url : `${url}/`;
}

function toOutputPath(routePath) {
  if (routePath === "/") {
    return path.join(distDir, "index.html");
  }

  if (routePath === "/404") {
    return path.join(distDir, "404.html");
  }

  return path.join(distDir, routePath.replace(/^\//, ""), "index.html");
}

function injectHtml(template, { appHtml, headTags, htmlLang }) {
  return template
    .replace(/<html lang="[^"]*">/, `<html lang="${htmlLang}">`)
    .replace(
      /<!--app-head:start-->[\s\S]*?<!--app-head:end-->/,
      `<!--app-head:start-->\n  ${headTags}\n  <!--app-head:end-->`,
    )
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
}

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

async function writeFile(filePath, contents) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, contents, "utf8");
}

/**
 * AI 크롤러를 명시적으로 허용한다. `User-agent: *` / `Allow: /` 만으로도
 * 기술적으로는 이미 허용이지만, 이름을 하나씩 적어 두는 이유는 나중에 누군가
 * `Disallow` 를 넣을 때 이 크롤러들이 함께 막히지 않도록 의도를 남기려는
 * 것이다 — 제품 특성상 LLM 답변에 노출되는 것이 유입 경로다.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "PerplexityBot",
  "Google-Extended",
  "CCBot",
];

/**
 * sitemap 의 `<url>` 항목에 붙일 `xhtml:link` 대체 언어 3줄(ko·en·x-default).
 * `EN_ROUTES` 에 없는 경로(`/demo`, `/apps`, `/privacy`, `/terms` 등)는 영문판이
 * 없으므로 빈 문자열을 돌려준다 — 없는 번역을 있다고 말하지 않는다.
 *
 * ko 항목과 en 항목 양쪽에 똑같이 3줄을 붙인다(자기 자신을 가리키는 줄
 * 포함) — `ssg/seo.ts` 가 `<head>` 의 hreflang 을 만드는 방식과 같다.
 */
function alternateLinksFor(routePath, urlFor, { hasEnglish, localePath, stripLocale }) {
  const { path: koPath } = stripLocale(routePath);
  if (!hasEnglish(koPath)) return "";

  const enPath = localePath(koPath, "en");
  const alternates = [
    { hreflang: "ko", href: urlFor(koPath) },
    { hreflang: "en", href: urlFor(enPath) },
    { hreflang: "x-default", href: urlFor(koPath) },
  ];

  return alternates
    .map((alt) => `\n    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}" />`)
    .join("");
}

async function writeSitemap(routes, siteUrl, localeHelpers) {
  const base = withTrailingSlash(siteUrl);
  const urlFor = (pathname) => escapeXml(new URL(pathname, base).toString());

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${routes
  .map(
    (route) => `  <url>
    <loc>${urlFor(route)}</loc>${alternateLinksFor(route, urlFor, localeHelpers)}
  </url>`,
  )
  .join("\n")}
</urlset>
`;

  await writeFile(path.join(distDir, "sitemap.xml"), xml);
}

async function writeRobots(siteUrl) {
  const aiCrawlerRules = AI_CRAWLERS.map((bot) => `User-agent: ${bot}\nAllow: /`).join("\n\n");

  const robots = `User-agent: *
Allow: /

# AI 크롤러를 명시적으로 허용한다 — 제품 특성상 LLM 답변에 노출되는 것이
# 유입 경로다. 나중에 Disallow 를 추가할 때 아래 크롤러들이 함께 막히지
# 않도록 의도를 남겨 둔다.
${aiCrawlerRules}

Sitemap: ${withTrailingSlash(siteUrl)}sitemap.xml
`;

  await writeFile(path.join(distDir, "robots.txt"), robots);
}

async function writeLlmsTxt(contents) {
  await writeFile(path.join(distDir, "llms.txt"), contents);
}

async function main() {
  console.log("[prerender] build client bundle");
  await build({
    root: rootDir,
    logLevel: "info",
  });

  console.log("[prerender] build server bundle");
  await build({
    root: rootDir,
    logLevel: "error",
    build: {
      ssr: "ssg/entry-server.tsx",
      outDir: ssrDir,
      emptyOutDir: true,
      rollupOptions: {
        output: {
          entryFileNames: "entry-server.js",
          format: "es",
        },
      },
    },
  });

  console.log("[prerender] load server renderer");
  const renderer = await import(
    `${pathToFileURL(path.join(ssrDir, "entry-server.js")).href}?t=${Date.now()}`
  );
  console.log("[prerender] render routes");
  const template = await fs.readFile(path.join(distDir, "index.html"), "utf8");
  const routes = [...renderer.prerenderRoutes, renderer.notFoundRoute];

  for (const route of routes) {
    const html = injectHtml(template, await renderer.render(route));
    await writeFile(toOutputPath(route), html);
  }

  await writeSitemap(renderer.prerenderRoutes, renderer.SITE_URL, {
    hasEnglish: renderer.hasEnglish,
    localePath: renderer.localePath,
    stripLocale: renderer.stripLocale,
  });
  await writeRobots(renderer.SITE_URL);
  await writeLlmsTxt(renderer.buildLlmsTxt());
  await fs.rm(ssrDir, { recursive: true, force: true });
  console.log("[prerender] done");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
