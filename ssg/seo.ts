const SITE_URL = "https://autocmo.com";
const OG_IMAGE_PATH = "/flow/flow-form.png";
const OG_IMAGE_WIDTH = 1024;
const OG_IMAGE_HEIGHT = 696;
const DEFAULT_KEYWORDS = [
  "WooriTeam",
  "우리팀",
  "같이 성장하기",
  "창업자의 첫 번째 팀",
  "초기 창업 마케팅",
  "스타트업 마케팅",
  "1인 창업",
];

type SeoConfig = {
  description: string;
  robots?: string;
  title: string;
};

const routeSeo: Record<string, SeoConfig> = {
  "/": {
    title: "WooriTeam – 창업자의 첫 번째 팀 | 우리팀과 같이 성장하기",
    description:
      "전담 마케터 없는 1~10인 초기 창업 대표를 위한 WooriTeam. 제안 → 승인 → 실행 → 반복 성장으로 우리팀과 같이 성장합니다.",
  },
  "/solution": {
    title: "솔루션 | WooriTeam",
    description:
      "같이 성장하기가 제안 → 승인 → 실행 → 반복 성장으로 일하는 방식과 ChatGPT와의 차이를 확인하세요.",
  },
  "/technology": {
    title: "기술 | WooriTeam",
    description:
      "제안부터 반복 성장까지 이어지는 WooriTeam의 성장 파이프라인을 소개합니다.",
  },
  "/pricing": {
    title: "요금제 | WooriTeam",
    description:
      "WooriTeam과 같이 성장하기 위한 무료 체험, 프로, 팀 요금제와 자주 묻는 질문을 확인하세요.",
  },
  "/demo": {
    title: "데모 | WooriTeam",
    description:
      "제안 → 승인 → 실행 → 반복 성장 한 사이클이 어떻게 도는지 데모로 확인하세요.",
  },
  "/apps": {
    title: "앱 | WooriTeam",
    description:
      "같이 성장하기를 시작으로 CEO Rader, CFO Tool 등 WooriTeam 구성을 확인하세요.",
  },
  "/about": {
    title: "회사소개 | WooriTeam",
    description:
      "초기 창업팀에 첫 번째 팀원을 제공하는 WooriTeam의 미션과 방향을 소개합니다.",
  },
  "/contact": {
    title: "문의하기 | WooriTeam",
    description:
      "서비스 문의, IR 미팅 요청, 파트너십 상담 등 WooriTeam과의 연락 방법을 확인하세요.",
  },
  "/ir": {
    title: "Investor Overview | WooriTeam",
    description:
      "투자자 공유용 IR 요약. 초기 창업팀의 마케터 공백과 WooriTeam의 성장 루프, 목표 시나리오를 확인하세요.",
  },
  "/privacy": {
    title: "개인정보처리방침 | WooriTeam",
    description:
      "WooriTeam의 개인정보 수집 항목, 이용 목적, 보관 기간, 문의 방법을 안내합니다.",
  },
  "/terms": {
    title: "이용약관 | WooriTeam",
    description:
      "WooriTeam 서비스 이용 조건, 금지 행위, 면책과 약관 변경 기준을 안내합니다.",
  },
  "/404": {
    title: "페이지를 찾을 수 없습니다 | WooriTeam",
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
      name: "WooriTeam",
      url: SITE_URL,
      logo: `${SITE_URL}/apple-touch-icon.png`,
      email: "mailto:chldngur89@gmail.com",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      name: "WooriTeam",
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
              description: "우리팀과 같이 성장하기",
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
    `<meta name="author" content="WooriTeam" />`,
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
    `<meta property="og:image:alt" content="WooriTeam 미리보기" />`,
    ...(seo.canonicalUrl
      ? [`<meta property="og:url" content="${seo.canonicalUrl}" />`]
      : []),
    `<meta property="og:locale" content="ko_KR" />`,
    `<meta property="og:site_name" content="WooriTeam" />`,
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
