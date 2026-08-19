import type { ReactNode } from "react";
import type { RouteObject } from "react-router";
import { Layout } from "./components/Layout";
import { ScrollRoot } from "./components/ScrollRoot";
import { LocaleProvider } from "./i18n/LocaleContext";
import { hasEnglish, localePath } from "./i18n/localePath";
import { EN_ROUTES, type Locale } from "@/content/locales";
import Home from "./pages/Home";
import Solution from "./pages/Solution";
import Technology from "./pages/Technology";
import Pricing from "./pages/Pricing";
import Demo from "./pages/Demo";
import About from "./pages/About";
import Contact from "./pages/Contact";
import IR from "./pages/IR";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Apps from "./pages/Apps";
import NotFound from "./pages/NotFound";

/** 레이아웃 안에 들어가는 페이지. path 는 한국어 기준 경로다. */
const layoutPages = [
  { path: "/", Component: Home, index: true },
  { path: "/solution", Component: Solution },
  { path: "/technology", Component: Technology },
  { path: "/pricing", Component: Pricing },
  { path: "/demo", Component: Demo },
  { path: "/apps", Component: Apps },
  { path: "/about", Component: About },
  { path: "/contact", Component: Contact },
  { path: "/privacy", Component: Privacy },
  { path: "/terms", Component: Terms },
] as const;

/** 레이아웃 밖의 페이지. IR 은 자체 셸을 쓴다. */
const standalonePages = [{ path: "/ir", Component: IR }] as const;

function localeWrapper(locale: Locale) {
  return function LocaleBoundary({ children }: { children: ReactNode }) {
    return <LocaleProvider locale={locale}>{children}</LocaleProvider>;
  };
}

function buildLocaleRoutes(locale: Locale): RouteObject[] {
  const prefix = locale === "en" ? "/en" : "";
  const available = (path: string) => locale === "ko" || hasEnglish(path);

  const Wrapper = localeWrapper(locale);

  const layoutChildren: RouteObject[] = layoutPages
    .filter((page) => available(page.path))
    .map((page) =>
      page.path === "/"
        ? { index: true, Component: page.Component }
        : { path: page.path.slice(1), Component: page.Component },
    );

  const routes: RouteObject[] = [
    {
      path: prefix === "" ? "/" : prefix,
      element: (
        <Wrapper>
          <Layout />
        </Wrapper>
      ),
      children: layoutChildren,
    },
  ];

  for (const page of standalonePages) {
    if (!available(page.path)) continue;
    const { Component } = page;
    routes.push({
      path: `${prefix}${page.path}`,
      element: (
        <Wrapper>
          <Component />
        </Wrapper>
      ),
    });
  }

  return routes;
}

export const appRoutes: RouteObject[] = [
  {
    Component: ScrollRoot,
    children: [
      ...buildLocaleRoutes("ko"),
      ...buildLocaleRoutes("en"),
      { path: "*", Component: NotFound },
    ],
  },
];

const koRoutes = [
  ...layoutPages.map((page) => page.path),
  ...standalonePages.map((page) => page.path),
];

const enRoutes = EN_ROUTES.map((path) => localePath(path, "en"));

export const prerenderRoutes: string[] = [...koRoutes, ...enRoutes];

export const notFoundRoute = "/404";
