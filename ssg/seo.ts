import { SITE_URL, absoluteUrl } from "./site";
import { faqNode } from "./faq";
import { hasEnglish, localePath, stripLocale } from "../src/app/i18n/localePath";
import type { Locale } from "../src/content/locales";
import { CONTACT_EMAIL } from "../src/content/ko/contact";
import { dictionaries } from "../src/content";
import { NAV_PATHS } from "../src/app/config/navPaths";

type SeoConfig = {
  description: string;
  robots?: string;
  title: string;
};

const SEO_BY_LOCALE: Record<Locale, Record<string, SeoConfig>> = {
  ko: {
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
  },
  en: {
    "/": {
      title: "WooriTeam – A founder's first team",
      description:
        "For founders running growth without a marketer. WooriTeam proposes the week, gets your approval, executes, and folds results into the next cycle.",
    },
    "/solution": {
      title: "Solution | WooriTeam",
      description:
        "How WooriTeam works through propose, approve, execute and repeat — and how that differs from a chat AI tool.",
    },
    "/technology": {
      title: "Technology | WooriTeam",
      description:
        "The growth pipeline behind WooriTeam, from weekly proposals through execution and feedback.",
    },
    "/pricing": {
      title: "Pricing | WooriTeam",
      description:
        "Free trial, Pro and Team plans for growing with WooriTeam, with answers to common questions.",
    },
    "/about": {
      title: "About | WooriTeam",
      description:
        "WooriTeam gives early-stage teams their first teammate for growth. Our mission and direction.",
    },
    "/contact": {
      title: "Contact | WooriTeam",
      description:
        "Get in touch with WooriTeam about the product, investor meetings, or partnerships.",
    },
    "/ir": {
      title: "Investor Overview | WooriTeam",
      description:
        "Investor summary: the marketer gap in early-stage teams, WooriTeam's growth loop, and target scenarios.",
    },
  },
};

const KEYWORDS_BY_LOCALE: Record<Locale, string[]> = {
  ko: [
    "WooriTeam",
    "우리팀",
    "같이 성장하기",
    "창업자의 첫 번째 팀",
    "초기 창업 마케팅",
    "스타트업 마케팅",
    "1인 창업",
  ],
  en: [
    "WooriTeam",
    "founder's first team",
    "startup marketing",
    "early stage growth",
    "AI marketing teammate",
  ],
};

const HTML_LANG: Record<Locale, string> = { ko: "ko", en: "en" };
const OG_LOCALE: Record<Locale, string> = { ko: "ko_KR", en: "en_US" };
const IN_LANGUAGE: Record<Locale, string> = { ko: "ko-KR", en: "en-US" };

/**
 * 공유 카드 이미지의 경로. `public/` 아래에 있으므로 빌드가 그대로 복사한다.
 * `scripts/verify-assets.mjs` 가 존재와 크기(1200×630)를 확인한다 — 파일이
 * 사라지면 빌드가 멈춘다. 링크 미리보기는 산출 HTML 만 봐서는 깨진 걸 알 수
 * 없고, 남이 우리 링크를 공유할 때 비로소 드러나기 때문이다.
 */
const OG_IMAGE: Record<Locale, string> = {
  ko: "/og/default-ko.png",
  en: "/og/default-en.png",
};

/** 카드가 못 뜨는 환경에서 대신 읽히는 글. 각 카드에 실제로 적힌 문구다. */
const OG_IMAGE_ALT: Record<Locale, string> = {
  ko: "우리팀 WOORITEAM — 창업자의 첫 번째 팀",
  en: "WooriTeam — A founder's first team",
};

type ResolvedSeo = SeoConfig & {
  basePath: string;
  canonicalUrl?: string;
  keywords: string[];
  locale: Locale;
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

export function htmlLangFor(pathname: string) {
  return HTML_LANG[stripLocale(normalizePath(pathname)).locale];
}

/**
 * `홈 > 페이지` 2단 `BreadcrumbList`. 두 번째 항목의 이름은 헤더 nav 가
 * 쓰는 문구 그대로다(`NAV_PATHS` 가 헤더와 공유하는 원본이므로, 헤더에
 * 없는 이름이 빵부스러기에 나올 수 없다). 홈 항목의 이름은 헤더 로고
 * 링크의 접근성 이름(`common.a11y.home`) — 화면(스크린리더 트리)에 실제로
 * 있는 문구를 그대로 쓴다.
 *
 * 홈 자신(`/`)이거나 `NAV_PATHS` 에 없는 경로(`/privacy`, `/terms`, `/404`
 * 등 헤더 nav 에 없는 페이지)에서는 undefined — nav 에 없는 이름을 지어
 * 붙이지 않는다.
 */
function breadcrumbNode(pathname: string, locale: Locale): Record<string, unknown> | undefined {
  const { path: basePath } = stripLocale(pathname);
  if (basePath === "/") {
    return undefined;
  }

  const navEntry = NAV_PATHS.find(([, path]) => path === basePath);
  if (!navEntry) {
    return undefined;
  }

  const [key] = navEntry;
  const copy = dictionaries[locale].common;

  return {
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}${pathname}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: copy.a11y.home,
        item: absoluteUrl(localePath("/", locale)),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: copy.nav[key],
        item: absoluteUrl(pathname),
      },
    ],
  };
}

function buildStructuredData(pathname: string, seo: SeoConfig, locale: Locale) {
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
      // 주소는 src/content/ko/contact.ts 의 CONTACT_EMAIL 하나가 원본이다.
      // 하드코딩해 두면 문의 페이지가 주소를 바꿔도 JSON-LD 는 옛 주소를 계속
      // 광고한다 — 검색엔진 쪽만 조용히 갈라지는, 눈에 띄지 않는 종류의 결함이다.
      email: `mailto:${CONTACT_EMAIL}`,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      name: "WooriTeam",
      url: SITE_URL,
      inLanguage: IN_LANGUAGE[locale],
      description: SEO_BY_LOCALE[locale]["/"].description,
    },
    {
      "@type": pathname === "/" ? "SoftwareApplication" : "WebPage",
      "@id": `${SITE_URL}${pathname}#page`,
      name: seo.title,
      url: `${SITE_URL}${pathname}`,
      inLanguage: IN_LANGUAGE[locale],
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

  const faq = faqNode(pathname, locale);
  if (faq) {
    graph.push(faq);
  }

  const breadcrumb = breadcrumbNode(pathname, locale);
  if (breadcrumb) {
    graph.push(breadcrumb);
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export function getSeoForPath(pathname: string): ResolvedSeo {
  const normalizedPath = normalizePath(pathname);
  const { locale, path } = stripLocale(normalizedPath);
  const table = SEO_BY_LOCALE[locale];
  const seo = table[path] ?? table["/"];
  const canonicalUrl =
    normalizedPath === "/404" ? undefined : absoluteUrl(normalizedPath);

  return {
    ...seo,
    locale,
    basePath: path,
    path: normalizedPath,
    canonicalUrl,
    keywords: KEYWORDS_BY_LOCALE[locale],
    robots: seo.robots ?? "index, follow",
    structuredData: buildStructuredData(normalizedPath, seo, locale),
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
    ...(hasEnglish(seo.basePath) && seo.path !== "/404"
      ? [
          `<link rel="alternate" hreflang="ko" href="${absoluteUrl(seo.basePath)}" />`,
          `<link rel="alternate" hreflang="en" href="${absoluteUrl(
            localePath(seo.basePath, "en"),
          )}" />`,
          `<link rel="alternate" hreflang="x-default" href="${absoluteUrl(seo.basePath)}" />`,
        ]
      : []),
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    ...(seo.canonicalUrl
      ? [`<meta property="og:url" content="${seo.canonicalUrl}" />`]
      : []),
    `<meta property="og:locale" content="${OG_LOCALE[seo.locale]}" />`,
    `<meta property="og:site_name" content="WooriTeam" />`,
    /**
     * 공유 카드 이미지. `twitter:card` 가 `summary_large_image` 를 선언하는데
     * 이미지가 없으면 카카오톡·슬랙·메일이 **빈 카드**를 그린다 — 링크를 받은
     * 사람이 가장 먼저 보는 화면이 그것이다.
     *
     * 절대 URL 이어야 한다. 크롤러는 상대 경로를 해석해 주지 않는다.
     *
     * 로케일별로 카드가 다르다 — 한국어 카드는 "창업자의 첫 번째 팀", 영문은
     * "A founder's first team". 영문 링크에 한글 카드가 붙으면 안 된다.
     *
     * 원본 HTML 은 `assets/og/` 에 있다. 문구가 바뀌면 그 파일을 고쳐 다시
     * 렌더한다(README 의 "공유 카드" 절 참고) — PNG 를 직접 손보지 않는다.
     */
    `<meta property="og:image" content="${absoluteUrl(OG_IMAGE[seo.locale])}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escapeHtml(OG_IMAGE_ALT[seo.locale])}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="twitter:image" content="${absoluteUrl(OG_IMAGE[seo.locale])}" />`,
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
