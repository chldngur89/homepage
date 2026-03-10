import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import Solution from "./pages/Solution";
import Technology from "./pages/Technology";
import Pricing from "./pages/Pricing";
import Demo from "./pages/Demo";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Apps from "./pages/Apps";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "solution", Component: Solution },
      { path: "technology", Component: Technology },
      { path: "pricing", Component: Pricing },
      { path: "demo", Component: Demo },
      { path: "apps", Component: Apps },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
      { path: "privacy", Component: Privacy },
      { path: "terms", Component: Terms },
    ],
  },
]);
