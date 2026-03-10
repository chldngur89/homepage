import appsData from "@/content/apps.json";

export type AppItem = (typeof appsData.apps)[number];

export const APP_URLS = {
  cmo: appsData.apps.find((a) => a.id === "cmo")?.url ?? "https://web-neon-nu-89.vercel.app/",
  cfoTool: appsData.apps.find((a) => a.id === "cfo-tool")?.url ?? "https://cfo-tool-pied.vercel.app/",
  ceoRader: appsData.apps.find((a) => a.id === "ceo-rader")?.url ?? "https://ceo-rader.vercel.app/",
} as const;

export const APPS = appsData.apps;
