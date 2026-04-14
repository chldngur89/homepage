const SITE_URL = "https://autocmo.com";
const OG_IMAGE_PATH = "/flow/flow-form.png";
const OG_IMAGE_WIDTH = 1024;
const OG_IMAGE_HEIGHT = 696;
const DEFAULT_KEYWORDS = [
  "Auto C-Level AI",
  "AutoCMO",
  "CMO AI",
  "마케팅 자동화",
  "AI 대시보드",
  "창업 마케팅",
  "Zero-Click",
  "능동 AI",
  "자율주행 AI",
];

type SeoConfig = {
  description: string;
  robots?: string;
  title: string;
};

const routeSeo: Record<string, SeoConfig> = {
  "/": {
    title:
      "Auto C-Level AI – 말 걸 필요 없는 능동 AI, 창업가의 자율주행 AI 파트너 | AutoCMO",
    description:
      "말 걸 필요 없는 능동 AI, 창업가의 자율주행 AI 파트너. Auto C-Level AI. 이미지 한 장이면 시나리오·이미지·동영상·상품페이지 자동 제작 후 인스타·네이버·쿠팡 등 업로드. AutoCMO 무료 체험 가능.",
  },
  "/solution": {
    title: "솔루션 | Auto C-Level AI",
    description:
      "이미지/글 입력부터 시나리오·제작·업로드·성과 보고까지 이어지는 AutoCMO Marketing OS 솔루션을 확인하세요.",
  },
  "/technology": {
    title: "기술 | Auto C-Level AI",
    description:
      "AI2AI 기반 Auto C-Level AI의 기술 구조와 Marketing OS 아키텍처를 소개합니다.",
  },
  "/pricing": {
    title: "요금제 | Auto C-Level AI",
    description:
      "AutoCMO의 무료 체험, 프로, 슈퍼 팀 요금제와 자주 묻는 질문을 확인하세요.",
  },
  "/demo": {
    title: "데모 | Auto C-Level AI",
    description:
      "Marketing OS의 실행 파이프라인이 어떻게 동작하는지 데모로 확인하세요.",
  },
  "/apps": {
    title: "앱 | Auto C-Level AI",
    description:
      "AutoCMO, CEO Rader AI, CFO Tool on AI 등 Auto C-Level AI 앱 구성을 확인하세요.",
  },
  "/about": {
    title: "회사소개 | Auto C-Level AI",
    description:
      "Auto C-Level AI의 미션, 비전, 시장 배경, 핵심 가치와 팀의 방향을 소개합니다.",
  },
  "/contact": {
    title: "문의하기 | Auto C-Level AI",
    description:
      "서비스 문의, IR 미팅 요청, 파트너십 상담 등 Auto C-Level AI와의 연락 방법을 확인하세요.",
  },
  "/ir": {
    title: "IR | Auto C-Level AI",
    description:
      "Auto C-Level AI의 IR 핵심 내용, 트랙션, 시장 기회, 로드맵을 확인하세요.",
  },
  "/privacy": {
    title: "개인정보처리방침 | Auto C-Level AI",
    description:
      "Auto C-Level AI의 개인정보 수집 항목, 이용 목적, 보관 기간, 문의 방법을 안내합니다.",
  },
  "/terms": {
    title: "이용약관 | Auto C-Level AI",
    description:
      "Auto C-Level AI 서비스 이용 조건, 금지 행위, 면책과 약관 변경 기준을 안내합니다.",
  },
  "/404": {
    title: "페이지를 찾을 수 없습니다 | Auto C-Level AI",
    description: "요청하신 페이지가 존재하지 않거나 이동되었습니다.",
    robots: "noindex, nofollow",
  },
};

type ResolvedSeo = SeoConfig & {
  canonicalUrl?: string;
  keywords: string[];
  ogImageUrl: string;
  ogImageHeight: number;
  ogImageWidth: number;
  path: string;
  robots: string;
  structuredData?: Record<string, unknown>;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function normalizePath(pathname: string) {
  if (!pathname || pathname === "/") {
    return "/";
  }

  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

function buildStructuredData(pathname: string, seo: SeoConfig) {
  if (pathname === "/404") {
    return undefined;
  }

  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}#organization`,
      name: "Auto C-Level AI",
      url: SITE_URL,
      logo: `${SITE_URL}/apple-touch-icon.png`,
      email: "mailto:chldngur89@gmail.com",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      name: "Auto C-Level AI",
      url: SITE_URL,
      inLanguage: "ko-KR",
      description: routeSeo["/"].description,
    },
    {
      "@type": pathname === "/" ? "SoftwareApplication" : "WebPage",
      "@id": `${SITE_URL}${pathname}#page`,
      name: seo.title,
      url: `${SITE_URL}${pathname}`,
      inLanguage: "ko-KR",
      description: seo.description,
      isPartOf: { "@id": `${SITE_URL}#website` },
      publisher: { "@id": `${SITE_URL}#organization` },
      ...(pathname === "/"
        ? {
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "KRW",
              description: "1회 무료 실행 가능",
            },
          }
        : {}),
    },
  ];

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export function getSeoForPath(pathname: string): ResolvedSeo {
  const normalizedPath = normalizePath(pathname);
  const seo = routeSeo[normalizedPath] ?? routeSeo["/"];
  const canonicalUrl =
    normalizedPath === "/404" ? undefined : `${SITE_URL}${normalizedPath}`;

  return {
    ...seo,
    path: normalizedPath,
    canonicalUrl,
    keywords: DEFAULT_KEYWORDS,
    ogImageUrl: `${SITE_URL}${OG_IMAGE_PATH}`,
    ogImageWidth: OG_IMAGE_WIDTH,
    ogImageHeight: OG_IMAGE_HEIGHT,
    robots: seo.robots ?? "index, follow",
    structuredData: buildStructuredData(normalizedPath, seo),
  };
}

export function renderSeoTags(pathname: string) {
  const seo = getSeoForPath(pathname);
  const tags = [
    `<title>${escapeHtml(seo.title)}</title>`,
    `<meta name="description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="keywords" content="${escapeHtml(seo.keywords.join(", "))}" />`,
    `<meta name="author" content="Auto C-Level AI" />`,
    `<meta name="robots" content="${seo.robots}" />`,
    ...(seo.canonicalUrl
      ? [`<link rel="canonical" href="${seo.canonicalUrl}" />`]
      : []),
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    `<meta property="og:image" content="${seo.ogImageUrl}" />`,
    `<meta property="og:image:width" content="${seo.ogImageWidth}" />`,
    `<meta property="og:image:height" content="${seo.ogImageHeight}" />`,
    `<meta property="og:image:alt" content="Auto C-Level AI 서비스 미리보기" />`,
    ...(seo.canonicalUrl
      ? [`<meta property="og:url" content="${seo.canonicalUrl}" />`]
      : []),
    `<meta property="og:locale" content="ko_KR" />`,
    `<meta property="og:site_name" content="Auto C-Level AI" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="twitter:image" content="${seo.ogImageUrl}" />`,
    ...(seo.structuredData
      ? [
          `<script type="application/ld+json">${JSON.stringify(
            seo.structuredData,
          )}</script>`,
        ]
      : []),
  ];

  return tags.join("\n  ");
}
