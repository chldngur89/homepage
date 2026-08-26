import { absoluteUrl } from "./site";
import { getSeoForPath } from "./seo";
import { home as koHome } from "../src/content/ko/home";
import { home as enHome } from "../src/content/en/home";
import { pricing as koPricing } from "../src/content/ko/pricing";
import { common as koCommon } from "../src/content/ko/common";
import { common as enCommon } from "../src/content/en/common";

/**
 * `dist/llms.txt` 생성기. [llmstxt.org](https://llmstxt.org) 관례를 따른다 —
 * H1 한 줄, 인용 블록(메타 설명) 한 문단, 그 아래 섹션별 링크 목록.
 *
 * **문구를 여기서 짓지 않는다.** 전부 한국어 사전(`src/content/ko/`)과
 * `ssg/seo.ts` 의 description 에 이미 있는 문자열을 그대로 이어 붙인다.
 * 가격은 `src/content/ko/pricing.ts` 에서 읽으므로, 다음 가격 개편 때도 이
 * 파일을 손대지 않고 값이 따라온다.
 */

/**
 * 링크 목록. label 은 전부 기존 사전 문구(nav · a11y 라벨)를 그대로 쓴다 —
 * 새로 짓지 않는다. `/privacy`·`/terms` 는 법무 문서라 "주요 경로"에서 뺀다.
 */
const KO_LINKS: readonly (readonly [path: string, label: string])[] = [
  ["/", koCommon.a11y.home],
  ["/solution", koCommon.nav.solution],
  ["/technology", koCommon.nav.technology],
  ["/pricing", koCommon.nav.pricing],
  ["/demo", koCommon.nav.demo],
  ["/apps", koCommon.nav.apps],
  ["/about", koCommon.nav.about],
  ["/contact", koCommon.nav.contact],
  ["/ir", koCommon.nav.ir],
];

const EN_LINKS: readonly (readonly [path: string, label: string])[] = [
  ["/en", enCommon.a11y.home],
  ["/en/solution", enCommon.nav.solution],
  ["/en/technology", enCommon.nav.technology],
  ["/en/pricing", enCommon.nav.pricing],
  ["/en/about", enCommon.nav.about],
  ["/en/contact", enCommon.nav.contact],
  ["/en/ir", enCommon.nav.ir],
];

function linkList(links: readonly (readonly [string, string])[]) {
  return links.map(([path, label]) => `- [${label}](${absoluteUrl(path)})`).join("\n");
}

/**
 * 요금제 요약 줄. `src/content/ko/pricing.ts` 의 값을 그대로 늘어놓기만
 * 한다 — 여기서 금액이나 조건을 새로 쓰지 않는다.
 */
function pricingLines() {
  const plans = koPricing.plans.items.map(
    (plan) => `- ${plan.name} · ${plan.price} — ${plan.period}`,
  );
  const perUse = koPricing.perUse.packages.map((pkg) => `- ${pkg.name} · ${pkg.price}`);
  const revenueShare = `- ${koPricing.revenueShare.label} · ${koPricing.revenueShare.planBodyRate}`;

  return [...plans, ...perUse, revenueShare].join("\n");
}

export function buildLlmsTxt(): string {
  const koHomeSeo = getSeoForPath("/");
  const enHomeSeo = getSeoForPath("/en");

  // 히어로 3조각(body/bodyStrong/bodyAfter)은 <strong> 강조를 위해 나뉜
  // 문자열일 뿐, 이어 붙이면 원래 한 문장이다.
  const koSummary = `${koHome.hero.body}${koHome.hero.bodyStrong}${koHome.hero.bodyAfter}`;
  const enSummary = `${enHome.hero.body}${enHome.hero.bodyStrong}${enHome.hero.bodyAfter}`;

  return `# WooriTeam

> ${koHomeSeo.description}

${koSummary}

## 요금제

${pricingLines()}

## 링크

${linkList(KO_LINKS)}

## English summary

> ${enHomeSeo.description}

${enSummary}

${linkList(EN_LINKS)}
`;
}
