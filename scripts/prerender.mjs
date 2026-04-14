import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { build } from "vite";

const currentFilePath = fileURLToPath(import.meta.url);
const rootDir = path.resolve(path.dirname(currentFilePath), "..");
const distDir = path.join(rootDir, "dist");
const ssrDir = path.join(rootDir, ".ssr");
const siteUrl = "https://autocmo.com";

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

function injectHtml(template, { appHtml, headTags }) {
  return template
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

async function writeSitemap(routes) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${escapeXml(new URL(route, withTrailingSlash(siteUrl)).toString())}</loc>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

  await writeFile(path.join(distDir, "sitemap.xml"), xml);
}

async function writeRobots() {
  const robots = `User-agent: *
Allow: /

Sitemap: ${withTrailingSlash(siteUrl)}sitemap.xml
`;

  await writeFile(path.join(distDir, "robots.txt"), robots);
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

  await writeSitemap(renderer.prerenderRoutes);
  await writeRobots();
  await fs.rm(ssrDir, { recursive: true, force: true });
  console.log("[prerender] done");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
