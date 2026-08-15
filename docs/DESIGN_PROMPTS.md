# WooriTeam 디자인·이미지 리뉴얼 프롬프트 모음

다른 AI(ChatGPT / Gemini / Midjourney / v0 등)에 그대로 붙여넣을 프롬프트입니다.
`0. 공통 브리프`를 먼저 붙이고, 그 아래 목적에 맞는 프롬프트를 이어 붙이면 됩니다.

---

## 현재 상태 진단 (프롬프트가 이렇게 짜인 이유)

| # | 문제 | 근거 |
|---|------|------|
| 1 | **브랜드 마크가 없다** | `public/favicon.png` = 네온 파란 'C' + 엄지척. 사명(WooriTeam)·이니셜과 무관하고 워드마크가 아예 없음. 헤더/푸터에서도 이 파비콘을 그대로 로고로 씀 (`Layout.tsx:46,131`) |
| 2 | **사이트에 이미지가 거의 없다** | 전체 11개 페이지에서 `<img>`는 3곳뿐(파비콘 2 + 파트너 로고 2). 나머지는 전부 lucide 아이콘 + 텍스트 카드 반복 → 스크롤 내내 같은 리듬 |
| 3 | **OG(공유) 이미지가 브랜드와 어긋난다** | `ssg/seo.ts:2` → `/flow/flow-form.png`. 밝은 배경 제품 스크린샷인데 사이트는 다크 네온톤. 게다가 이미지 안 한글이 깨져 있음("무터운", "위컷보요") — 카톡/슬랙 공유 첫인상이 이걸로 결정됨 |
| 4 | **안 쓰이는 이미지 자산** | `public/flow/*.png` 4장이 어느 페이지에서도 참조되지 않음 |
| 5 | **디자인 토큰이 두 갈래** | `src/styles/theme.css`는 shadcn 라이트 기준 토큰인데, 실제 페이지는 `slate-950 / cyan-400 / indigo-600`을 하드코딩. 색을 바꾸려면 페이지를 전부 뒤져야 하는 구조 |
| 6 | **제품 화면이 안 보인다** | "제안 → 승인 → 실행 → 반복 성장"이 핵심인데 그 화면 목업/스크린샷이 없어 말로만 설명됨 |
| 7 | **사회적 증거 시각 자산 없음** | 고객사 로고·후기 카드·수치 배지 등이 전무 (`docs/NEXT_FIXES_AND_INVESTOR_VIEW.md`에서도 지적된 항목) |

---

## 0. 공통 브리프 (모든 프롬프트 앞에 붙이기)

```
[브랜드 브리프 — WooriTeam]

회사/서비스명: WooriTeam (우리팀)
한 줄 포지셔닝: "창업자의 첫 번째 팀"
메인 CTA: "우리팀과 같이 성장하기"
핵심 루프: 제안 → 승인 → 실행 → 반복 성장 (매주 반복)
타깃 고객: 전담 마케터가 없는 1~10인 초기 스타트업 대표 (한국, 30~40대)
고객 상황: 제품은 있는데 SNS·랜딩·광고 문구를 대표가 직접 챙김. ChatGPT로 초안은
          나오지만 실행이 안 남고, 외주는 아직 부담.
차별점: 대화형 도구(ChatGPT)는 "물으면 초안을 준다". WooriTeam은
       "이번 주 할 일을 먼저 제안하고, 승인받고, 실행까지 이어간다."
제품 라인업: 같이 성장하기(메인) / CEO Rader AI / CFO Tool on AI /
            LowestAlert AI / PMS on AI

톤앤매너 원칙:
- 과장된 자동화 약속 금지. "전부 자동으로!" 대신 "이번 주 이만큼부터".
- 대표를 대체하는 게 아니라, 대표 옆에 앉은 첫 번째 팀원 느낌.
- 신뢰감 > 화려함. 투자자·심사역도 보는 사이트임.
- 한국어 사이트. 본문 한글, 브랜드명은 영문 WooriTeam 병기.

현재 디자인 (참고용 · 유지할 필요 없음):
- 배경 slate-950(#020617) 다크, 포인트 cyan-400(#22d3ee),
  버튼 cyan-500 → indigo-600 그라데이션
- rounded-2xl 카드 + slate-800 보더, lucide 아이콘, motion 진입 애니메이션
- 히어로에 blur된 cyan/indigo 원형 글로우 2개

기술 제약 (반드시 지킬 것):
- Vite + React 18 + TypeScript + Tailwind CSS v4 + shadcn/ui + lucide-react + motion/react
- 정적 prerender 배포(Vercel). 무거운 3D·비디오·외부 폰트 CDN 남발 금지
- 모바일 트래픽 80% 이상 가정. 첫 화면 로딩 2초 이내 목표
- 페이지: / /solution /technology /pricing /demo /apps /about /contact /ir /privacy /terms
```

---

## 1. 브랜드·디자인 시스템 설계 프롬프트

> **대상 AI:** ChatGPT / Claude / Gemini (텍스트)
> **얻는 것:** 컬러·타이포·컴포넌트 규칙이 정리된 디자인 시스템 문서

```
위 브랜드 브리프를 읽고, WooriTeam 홈페이지의 디자인 시스템을 새로 제안해 주세요.

먼저 서로 확실히 다른 방향 3가지를 각각 한 문단으로 제안하세요.
각 방향마다: 컨셉 이름 / 한 줄 설명 / 무드 키워드 5개 / 이 방향이 어떤 인상을 주는지 /
현재 다크+시안 톤 대비 무엇이 달라지는지.

방향 3개는 아래 축에서 서로 겹치지 않게 잡으세요.
(a) 라이트 vs 다크 / (b) 기술적·정밀함 vs 사람냄새·따뜻함 / (c) 대담한 타이포 vs 절제된 여백

그다음, 3개 중 "1~10인 초기 창업 대표에게 신뢰를 주면서 투자자에게도 통할" 방향을
하나 추천하고 이유를 3줄로 쓰세요.

추천 방향에 대해 아래를 표와 코드로 구체화하세요.

1) 컬러 토큰
   - background / surface / surface-raised / border / text-primary /
     text-secondary / text-muted / accent / accent-hover / success / warning / danger
   - 각각 HEX + OKLCH 값, 라이트/다크 두 벌
   - 본문 텍스트와 배경, 버튼 텍스트와 버튼 배경의 WCAG 대비율을 숫자로 명시 (AA 4.5:1 이상)
   - Tailwind CSS v4 @theme 형식의 CSS 변수 블록으로 출력

2) 타이포그래피
   - 한글 본문에 적합한 웹폰트 추천 2안 (Pretendard 등, self-host 가능한 것)
   - 영문/숫자용 보조 서체
   - 스케일: display / h1 / h2 / h3 / body-lg / body / caption
     각각 px, line-height, letter-spacing, font-weight
   - 한글 줄바꿈 규칙(break-keep, 최대 줄길이) 포함

3) 레이아웃·간격
   - 컨테이너 최대폭, 섹션 상하 패딩(모바일/데스크톱), 8pt 기반 스페이싱 스케일
   - 카드 radius / border / shadow 규칙 (지금은 rounded-2xl + slate-800 보더 일괄 적용이라 위계가 없음)

4) 컴포넌트 규칙
   - 버튼 3종(primary/secondary/ghost) 상태별 스타일
   - 카드 3종(기본/강조/비활성)
   - 배지, 섹션 헤더(작은 라벨 + 제목 + 설명), 가격 카드, 비교 테이블

5) 모션
   - 진입 애니메이션 duration/easing 기준값, 과하지 않은 선의 가이드
   - prefers-reduced-motion 대응

6) 마지막에 "하지 말 것" 목록 10개
   (예: 의미 없는 글로우, 모든 카드에 같은 보더, AI 스톡 일러스트 등)

출력은 개발자가 그대로 옮길 수 있게 표 + 코드블록 위주로. 설명은 짧게.
```

---

## 2. 로고 · 심볼 이미지 생성 프롬프트

> **대상 AI:** Midjourney / DALL·E / Ideogram / Nano Banana(Gemini 이미지)
> **주의:** 이미지 AI는 한글·영문 글자를 자주 깨뜨립니다. **글자가 들어간 워드마크는 이미지 AI 말고 벡터로 직접 만들거나 SVG 생성 프롬프트(3번)를 쓰세요.** 아래는 글자 없는 심볼 전용입니다.

```
Design a minimal, flat vector logo mark for a startup called "WooriTeam".

Concept: the founder's first teammate. Not a mascot, not a robot.
The mark should suggest either (a) two or three simple shapes standing side by side
as a small team, or (b) a continuous loop that returns to its start
(propose → approve → execute → grow again).

Style requirements:
- Flat vector, geometric, single continuous line weight
- Maximum 2 colors, works in pure 1-color black on white
- No gradients, no glow, no neon, no drop shadow, no 3D bevel
- No text, no letters, no numbers anywhere in the image
- No thumbs-up, no handshake, no lightbulb, no rocket, no generic AI-brain cliché
- Centered on a plain white background, generous margin
- Must stay readable at 32x32 pixels

Deliver 6 distinct concepts on one sheet, in a 3x2 grid, each clearly separated.
--ar 3:2 --style raw
```

**변형 프롬프트 (앱 아이콘용, 라운드 스퀘어):**

```
App icon for "WooriTeam", 1024x1024, rounded-square iOS style.
A single flat geometric symbol centered on a solid deep-navy (#0B1220) background,
symbol in a clear cyan-to-blue tone. Flat vector, no text, no letters,
no glow, no bevel, no gloss, no reflection. Bold and legible at 60x60 pixels.
Minimal, corporate-grade, calm.
```

---

## 3. 워드마크 · 로고를 SVG 코드로 받는 프롬프트

> **대상 AI:** ChatGPT / Claude (코드 생성)
> **왜:** 이미지 AI가 만든 로고는 글자가 깨지고 벡터가 아니라 실무에서 못 씁니다. SVG로 받으면 바로 `public/`에 넣을 수 있습니다.

```
WooriTeam의 로고를 SVG 코드로 만들어 주세요. 이미지가 아니라 순수 SVG 마크업으로요.

3종 세트가 필요합니다.
1) 심볼 마크 (정사각 1:1, viewBox 0 0 48 48) — 글자 없음
2) 가로형 로고 (심볼 + "WooriTeam" 워드마크, 왼쪽 정렬)
3) 파비콘용 축약형 (16x16에서도 형태가 뭉개지지 않는 단순화 버전)

제약:
- path 개수 최대 6개, 단순한 기하 도형 위주
- fill은 currentColor를 쓰거나 CSS 변수로 빼서, 다크/라이트 배경 모두에서 쓸 수 있게
- 그라데이션·필터·마스크 금지 (파비콘에서 깨짐)
- 워드마크 글자는 <text>가 아니라 path로 (폰트 의존 제거).
  path 변환이 어려우면 <text>로 주되, 대체용 시스템 폰트 스택을 명시
- 심볼 컨셉: "제안 → 승인 → 실행 → 반복"이 돌아오는 닫힌 루프,
  또는 나란히 선 3개의 단순 형태(대표 + 팀원)

각 SVG마다 아래를 같이 주세요:
- 왜 이 형태인지 2줄 설명
- 최소 사용 크기
- 배경색별 권장 조합 (다크 배경 / 라이트 배경 / 단색 인쇄)

서로 다른 컨셉 3안을 제시하고, 각 안마다 위 3종을 다 만들어 주세요.
```

---

## 4. 히어로 · 섹션 배경 이미지 생성 프롬프트

> **대상 AI:** Midjourney / DALL·E / Nano Banana
> **용도:** 홈 히어로 뒤 배경, 섹션 구분용 추상 비주얼

```
Abstract background artwork for a B2B SaaS landing page hero section.

Subject: a weekly cycle that keeps returning — four connected stages flowing
into each other and looping back. Represent it abstractly with soft geometric
forms, thin connecting lines, and layered translucent planes.

Mood: calm, credible, quietly technical. A small team's steady weekly rhythm.
Not futuristic sci-fi, not cyberpunk, not neon.

Color: deep navy base (#0B1220) with restrained cyan and indigo accents.
Mostly dark and empty on the left and center so white Korean headline text
stays fully readable on top.

Style: flat vector meets soft gradient mesh. Subtle grain. No people, no faces,
no hands, no robots, no brains, no circuit boards, no floating UI screenshots,
no text, no letters, no logos.

Composition: wide banner, negative space dominant, visual interest concentrated
in the right third only.

--ar 16:9 --style raw
```

**섹션용 소형 일러스트 (4단계 루프 카드용):**

```
A set of 4 minimal flat vector spot illustrations on a dark navy (#0B1220)
background, one per concept: (1) a proposal document being lifted up,
(2) a checkmark approval, (3) a task moving into motion, (4) a rising repeated cycle.

Consistent style across all 4: single 2px line weight, one cyan accent color plus
white lines, flat, geometric, no shading, no text, no people, no faces.
Each illustration square, centered, generous padding.
Present as a 2x2 grid with clear separation.

--ar 1:1 --style raw
```

---

## 5. OG(공유) 이미지 프롬프트

> **왜 급한가:** 지금 카톡·슬랙에 링크를 공유하면 `/flow/flow-form.png`(밝은 배경 + 한글 깨진 수박 이미지)가 뜹니다. 사이트 톤과 정반대입니다.
> **권장:** 이미지 AI 대신 **HTML/CSS로 1200×630을 만들어 스크린샷** — 한글이 안 깨집니다.

```
1200x630 OG 이미지를 만들 HTML + CSS를 작성해 주세요.
브라우저에서 열어 스크린샷하면 그대로 og:image로 쓸 수 있어야 합니다.

내용:
- 좌측 상단: WooriTeam 로고 자리 (48x48 플레이스홀더 박스 + "WooriTeam" 텍스트)
- 가운데: "창업자의 첫 번째 팀" — 크고 굵게, 한 줄 (break-keep으로 한글 어절 안 깨지게)
- 그 아래: "제안 → 승인 → 실행 → 반복 성장" — 작게, 흐린 색
- 하단: wooriteam 도메인 텍스트
- 배경: 딥네이비 단색 + 우측 하단에만 아주 은은한 시안 글로우

제약:
- 외부 폰트 CDN 금지. Pretendard가 없을 때를 대비해
  system-ui, -apple-system, "Apple SD Gothic Neo", "Malgun Gothic" 폴백 스택 명시
- 정확히 1200x630px 고정, overflow 없음
- 텍스트는 이미지가 아닌 실제 텍스트로 (한글 깨짐 방지)
- 인라인 CSS 단일 HTML 파일

같은 레이아웃의 변형 3개도 주세요:
(a) 제품 소개용 (위 기본)
(b) IR/투자자용 — 문구를 투자자 대상으로
(c) 요금제/데모 페이지용
```

---

## 6. 페이지 UI 리디자인 프롬프트

> **대상 AI:** v0 / Figma Make / Lovable / Claude(코드)
> **주의:** 기존 코드를 통째로 갈아엎지 않게, 아래처럼 범위를 못 박아야 합니다.

```
[공통 브리프 붙여넣기]

WooriTeam 홈페이지의 홈(/) 페이지를 리디자인해 주세요.

현재 구조 (유지할 정보 순서):
1. 히어로 — 배지("전담 마케터 없는 1~10인 팀을 위한") + h1("창업자의 첫 번째 팀")
   + 서브카피(제안→승인→실행→반복 성장) + CTA 2개
2. "누구를 위한가" — 3개 카드 (전담 마케터 없음 / 툴은 많은데 손 부족 / 외주는 아직 이름)
3. "첫 번째 팀원이 하는 일" — 4단계 루프 카드 (제안·승인·실행·반복 성장)
4. "대화형 도구와, 팀원의 차이" — 2열 비교 (ChatGPT vs WooriTeam)
5. "지금은 이만큼부터" — 지금 하는 일 / 이후 확장 2열
6. 마무리 CTA
7. 모바일 하단 sticky CTA (스크롤 500px 이후 노출)

요구사항:
- 카피는 그대로 두고 레이아웃·시각 위계·리듬만 바꿀 것
- 지금 문제: 섹션 6개가 전부 "작은 라벨 + 굵은 제목 + 회색 설명 + rounded-2xl 카드 그리드"로
  똑같이 생겨서 스크롤 리듬이 단조로움. 섹션마다 다른 레이아웃 유형을 쓸 것
  (그리드 / 좌우 분할 / 타임라인 / 비교 테이블 / 전면 강조 등)
- 4단계 루프(3번 섹션)는 카드 4개 나열이 아니라 "루프가 돈다"는 게 시각적으로 보이게
- 제품 화면 목업 자리를 최소 1곳 만들 것 (실제 스크린샷은 나중에 교체, 지금은 플레이스홀더)
- 사회적 증거 슬롯(고객사 로고 줄 or 후기 카드 2~3개)을 CTA 근처에 추가
- 색은 하드코딩하지 말고 CSS 변수/Tailwind 토큰으로. 나중에 테마 교체가 가능해야 함

기술 제약:
- Tailwind CSS v4 + shadcn/ui + lucide-react + motion/react만 사용. 새 라이브러리 추가 금지
- 이미지는 <img src="/placeholder/..."> 형태 플레이스홀더로 두고, 필요한 이미지 목록을
  파일명·용도·권장 사이즈 표로 따로 정리해 줄 것
- 모바일 우선. 터치 타겟 48px 이상. 반응형 브레이크포인트 명시
- 접근성: 섹션마다 aria-labelledby, 대비 AA 이상

출력: 완성된 React + TypeScript 컴포넌트 코드 + 필요한 이미지 목록 표.
```

---

## 7. 제품 화면 목업 프롬프트

> **왜:** "제안 → 승인 → 실행"이 실제로 어떻게 생겼는지 보여주는 화면이 사이트에 없습니다. 스크린샷 대신 목업 UI를 코드로 만들어 캡처하는 게 가장 빠르고 한글도 안 깨집니다.

```
WooriTeam 제품 화면 목업을 HTML + Tailwind로 만들어 주세요.
실제 제품 스크린샷처럼 보이되, 실제 데이터는 그럴듯한 더미로 채웁니다.

3개 화면이 필요합니다.
1) 주간 제안 화면 — "이번 주 성장 과제" 3건이 카드로 제안되어 있고
   각각 [승인] [수정] 버튼. 각 과제에 예상 소요시간과 근거 한 줄
2) 승인 후 실행 진행 화면 — 승인된 과제가 진행 중/완료 상태로 보이는 리스트
3) 반복 성장 화면 — 지난 4주 결과가 간단한 지표 카드 + 미니 라인차트로 요약,
   그 결과가 다음 주 제안에 어떻게 반영됐는지 한 줄

제약:
- 한국어 UI. 초기 스타트업 대표가 볼 화면이라 용어는 쉽게
- 다크 테마(딥네이비 배경), 시안 포인트 — 사이트 톤과 일치
- 데스크톱 1440x900 기준, 브라우저 크롬(주소창) 없이 앱 화면만
- 차트는 외부 라이브러리 없이 인라인 SVG로
- 더미 데이터는 실제 초기 스타트업이 할 법한 과제로
  (예: "인스타 릴스 3편 기획", "랜딩 히어로 카피 A/B", "고객 인터뷰 2건")
- 과장 금지: 지표는 현실적인 작은 숫자로

각 화면을 독립된 HTML 파일로 주세요. 스크린샷해서 랜딩 페이지에 넣을 겁니다.
```

---

## 8. 붙여넣기 순서 추천

| 순서 | 프롬프트 | 대상 AI | 결과물 |
|------|----------|---------|--------|
| 1 | `0 + 1` | ChatGPT / Claude | 디자인 시스템 문서 (색·폰트·간격 확정) |
| 2 | `0 + 3` | ChatGPT / Claude | 로고 SVG 3안 → `public/`에 교체 |
| 3 | `0 + 5` | ChatGPT / Claude | OG 이미지 HTML → 스크린샷 → `ssg/seo.ts` 경로 교체 |
| 4 | `0 + 7` | ChatGPT / Claude | 제품 목업 3장 → 랜딩에 삽입 |
| 5 | `0 + 4` | Midjourney / Nano Banana | 히어로 배경 · 섹션 일러스트 |
| 6 | `0 + 6` | v0 / Claude | 홈 페이지 리디자인 코드 |

1번(디자인 시스템)을 먼저 확정하고, 그 결과의 색상 HEX를 2~6번 프롬프트에 넣어서 돌리면 결과물 톤이 서로 맞습니다. 순서를 바꾸면 로고 색과 배경 색이 따로 노는 일이 생깁니다.

---

## 9. 이미지 AI에 쓸 때 주의 (실패 사례 기반)

- **글자를 이미지 AI에게 시키지 말 것.** 지금 OG로 쓰이는 `/flow/flow-form.png` 안의 한글이 "무터운", "위컷보요"로 깨져 있습니다. 글자가 필요하면 HTML/CSS로 만들어 캡처하세요.
- **네온·글로우 금지어를 프롬프트에 명시.** 안 쓰면 기본값으로 사이버펑크가 나옵니다.
- **사람·손·얼굴 제외.** AI 생성 인물은 스타트업 사이트에서 신뢰를 깎습니다.
- **1개 이미지에 1개 컨셉.** 여러 요소를 넣으면 전부 어중간해집니다.
- **결과물을 `public/`에 넣기 전 WebP 변환.** 지금 `acnow-logo-wide.png`가 485KB입니다. 로딩 2초 목표에 직접 영향.
