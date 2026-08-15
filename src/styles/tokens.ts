/**
 * theme.css 의 브랜드 토큰과 같은 값을 TypeScript 에서도 참조하기 위한 사본.
 * theme.css 를 고치면 이 파일도 함께 고쳐야 하며, tokens.test.ts 가 대비를 검증한다.
 */
export const BRAND_TOKENS = {
  ground: "#F7F7F4",
  surface: "#FFFFFF",
  panel: "#F0F0EC",
  ink: "#161616",
  ink2: "#5E5E59",
  // 디자인 원본은 #8B8B85 였으나 ground 위 대비가 3.19:1 로 AA 미달이라 조정함
  ink3: "#6F6F69",
  line: "#DEDED8",
  line2: "#E4E4DF",
  brand: "#4F6B5B",
  invert: "#111111",
  invertInk2: "#B9B9B3",
} as const satisfies Record<string, string>;

function channelToLinear(value: number) {
  const c = value / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function relativeLuminance(hex: string) {
  const normalized = hex.replace("#", "");
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);

  return (
    0.2126 * channelToLinear(r) +
    0.7152 * channelToLinear(g) +
    0.0722 * channelToLinear(b)
  );
}

export function contrastRatio(hexA: string, hexB: string) {
  const a = relativeLuminance(hexA);
  const b = relativeLuminance(hexB);
  const lighter = Math.max(a, b);
  const darker = Math.min(a, b);

  return (lighter + 0.05) / (darker + 0.05);
}
