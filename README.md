# WooriTeam Homepage

WooriTeam 랜딩·마케팅 사이트 저장소입니다.  
포지셔닝: **창업자의 첫 번째 팀** · CTA: **우리팀과 같이 성장하기**  
핵심 루프: **제안 → 승인 → 실행 → 반복 성장**

스택은 `Vite + React 18 + React Router`이며, 배포 시 **정적 prerender**로 주요 페이지 본문이 초기 HTML에 포함됩니다.

## 제품 메시지 (카피 기준)

- **고객**: 전담 마케터 없는 1~10인 초기 창업 대표
- **한 줄**: 창업자의 첫 번째 팀
- **CTA**: 우리팀과 같이 성장하기
- **루프**: 제안 → 승인 → 실행 → 반복 성장
- **공유 카피 소스**: [`src/content/site.json`](src/content/site.json), [`src/content/apps.json`](src/content/apps.json), [`src/content/ir.ts`](src/content/ir.ts)

브랜드/CTA/데모 문구를 바꿀 때는 페이지 하드코딩뿐 아니라 위 content 파일과 [`ssg/seo.ts`](ssg/seo.ts)를 같이 맞춥니다.

## 주요 페이지

| 경로 | 설명 |
|------|------|
| `/` | 홈 랜딩 |
| `/solution` | 솔루션 · ChatGPT와의 차이 |
| `/technology` | 성장 파이프라인 |
| `/pricing` | 요금제 |
| `/demo` | 시뮬레이션 데모 |
| `/apps` | 팀 구성·앱 목록 |
| `/about` | 회사소개 |
| `/contact` | 문의 |
| `/ir` | 투자자 Overview |
| `/privacy`, `/terms` | 약관 |

영문판은 `/en/` 아래 7개 경로에 있습니다: `/en`, `/en/solution`, `/en/technology`,
`/en/pricing`, `/en/about`, `/en/contact`, `/en/ir`.
`/demo`, `/apps`, `/privacy`, `/terms` 는 한국어만 제공합니다.

## 기술 스택

- `Vite 6`
- `React 18`
- `React Router 7`
- `TypeScript`
- `Tailwind CSS 4`
- `Vercel`

## 렌더링 구조

개발:

```bash
npm run dev
```

배포 빌드 순서:

1. Vite 클라이언트 번들
2. `ssg/entry-server.tsx`로 라우트 서버 렌더
3. `scripts/prerender.mjs`가 HTML·SEO 태그를 `dist/`에 주입
4. `robots.txt`, `sitemap.xml`, `404.html` 생성

최종물은 CSR-only SPA가 아니라 **정적 HTML이 포함된 배포물**입니다.

## 중요한 파일

| 파일 | 역할 |
|------|------|
| `src/app/route-config.tsx` | 라우트 · prerender 경로 |
| `src/app/pages/` | 페이지 UI·카피 |
| `src/content/site.json` | 브랜드 · 푸터 · 데모/앱 페이지 문구 |
| `src/content/apps.json` | 앱 목록·설명·URL |
| `src/content/ir.ts` | IR 카피 |
| `src/main.tsx` | hydrate / client render |
| `ssg/entry-server.tsx` | 서버 렌더 진입점 |
| `ssg/seo.ts` | title · description · OG · JSON-LD · `SITE_URL` |
| `scripts/prerender.mjs` | 빌드 후 HTML 주입 · sitemap/robots |
| `index.html` | 기본 템플릿 · head placeholder |

## 로컬 실행

권장 Node: `Node.js 24.x`

```bash
npm install
npm run dev
```

- 개발: [http://localhost:5173](http://localhost:5173)

## 타입 검사

```bash
npm run typecheck
```

이 저장소는 Vite 로 빌드되는데, Vite 는 타입을 검사하지 않고 제거합니다.
타입 오류는 이 명령으로만 드러납니다. `npm run build` 에도 포함되어 있습니다.

타입 검사는 번역 누락도 잡습니다. 한국어 사전(`src/content/ko/`)이 타입의
원본이고 영어 사전은 같은 구조를 구현해야 하므로, 항목이 빠지면 —
객체 키든 배열 원소든 — `tsc` 가 멈춥니다.

## 테스트

```bash
npm run test        # 1회 실행
npm run test:watch  # 감시 모드
```

## 배포 전 검사 (`npm run verify`)

```bash
npm run verify
```

`typecheck` → `test` → `verify-assets` 를 순서대로 돌립니다. `npm run build`
가 프리렌더보다 **먼저** 이 명령을 부르므로, 타입 오류나 실패한 테스트는
느린 렌더 단계에 들어가기 전에 빌드를 세웁니다. Vercel 배포는
`npm run build` 를 실행하므로 배포 경로에도 그대로 걸립니다.

## 배포 전 확인

```bash
npm run build
npm run preview
```

- 프리뷰: [http://localhost:4173](http://localhost:4173)

`npm run build`에 포함되는 것:

- `npm run verify` (타입 검사 · 테스트 · 자산 검사)
- 주요 라우트 prerender
- 초기 HTML · SEO 메타
- `robots.txt` · `sitemap.xml`
- `scripts/check-html.mjs` 프리렌더 산출물 검사

## 환경 변수

`.env.example` 기준:

```bash
VITE_FORMSPREE_FORM_ID=
# VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

```bash
cp .env.example .env
```

## 크롤러 / NotebookLM 검증

### 공유 카드 (og:image)

링크를 카카오톡·슬랙·메일에 붙였을 때 뜨는 미리보기 카드입니다. 로케일마다 다릅니다.

| | |
|---|---|
| 원본 | `assets/og/default-ko.html`, `assets/og/default-en.html` |
| 산출물 | `public/og/default-ko.png`, `public/og/default-en.png` (1200×630) |
| 참조 | `ssg/seo.ts` 의 `OG_IMAGE` / `OG_IMAGE_ALT` |

**PNG 를 직접 편집하지 않습니다.** 문구나 디자인이 바뀌면 HTML 을 고치고 다시 렌더합니다:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --hide-scrollbars --virtual-time-budget=4000 \
  --window-size=1200,630 --screenshot=public/og/default-ko.png \
  "file://$PWD/assets/og/default-ko.html"
```

`--virtual-time-budget` 은 Pretendard 웹폰트가 내려올 시간을 줍니다. 짧으면 시스템 폰트로 렌더됩니다.

카드에 적힌 문구는 사이트의 실제 카피에서 가져온 것입니다(홈 히어로, 메타 설명). 카드만 따로 바꾸면 링크를 눌렀을 때 다른 말이 나오므로, 사이트 카피와 함께 고칩니다.

`scripts/verify-assets.mjs` 가 두 파일의 존재와 1200×630 규격을 검사하며, 어긋나면 빌드가 멈춥니다 — 미리보기가 깨진 것은 남이 우리 링크를 공유한 뒤에야 드러나기 때문입니다.

### 자동 검증

```bash
npm run build
```

빌드 마지막에 `scripts/check-html.mjs`가 프리렌더 산출물을 검사합니다.

**전환한 18개 경로** — `/`, `/solution`, `/pricing`, `/demo`, `/contact`,
`/en`, `/en/solution`, `/en/pricing`, `/en/contact`, `/technology`, `/about`,
`/apps`, `/privacy`, `/terms`, `/en/technology`, `/en/about`, `/ir`, `/en/ir`:

- 초기 HTML 에 본문이 들어 있는지 (빈 SPA 셸이 아닌지) · 홈은 핵심 문구까지
- 한국어·영어 페이지에 상대 언어가 섞이지 않았는지
- `<html lang>` 과 `hreflang` 이 로케일에 맞는지
- 이전 브랜드 흔적이 남지 않았는지

경로 목록은 같은 파일의 `PAGES` 배열입니다. 페이지를 새 디자인으로 전환하면
거기에 한 줄만 더하면 됩니다.

**프리렌더된 모든 문서** — 위 18개 경로 + `404.html`(총 19개 문서). 이
검사는 전환 여부와 무관하게 모든 프리렌더 문서에 적용되도록 설계되어
있습니다 — 계획 4 완료 시점 기준 전환 대상 페이지는 더 이상 없습니다:

- `aria-labelledby` 가 가리키는 `h1`~`h6` 이 문서에 정확히 하나 있는지
- 한 문서 안에서 `id` 가 중복되지 않는지
- 문서에 `h1` 이 정확히 하나 있는지

정규식으로 HTML 을 훑는 방식이라 완전한 파서가 아닙니다. 멀쩡한 마크업을
실패시키지 않도록 미탐 쪽으로 기울여 놨으며, 한계는 스크립트 주석에 있습니다.

### View Source

- `view-source:https://your-domain/`
- `view-source:https://your-domain/pricing/`

핵심 문구가 HTML에 들어 있는지 확인합니다.

### curl

```bash
curl -s http://127.0.0.1:4173/ | rg "첫 번째 팀|제안 → 승인 → 실행 → 반복 성장|우리팀과 같이 성장하기"
curl -s http://127.0.0.1:4173/pricing/ | rg "요금제|우리팀과 같이 성장하기"
```

### JS 비활성

DevTools에서 JavaScript 끄고 새로고침했을 때 본문이 보이는지 확인합니다.

## 새 페이지 추가 시

1. `src/app/pages/`에 컴포넌트 추가
2. `src/app/route-config.tsx`에 라우트 추가
3. 같은 파일의 `prerenderRoutes`에 경로 추가
4. `ssg/seo.ts`에 SEO 설정 추가

## Git / Push 메모

이 저장소 remote는 SSH 기준입니다.

```bash
git remote -v
# origin  git@github.com:chldngur89/homepage.git
```

HTTPS 비밀번호 로그인은 GitHub에서 지원하지 않습니다. SSH 키 또는 Personal Access Token을 사용하세요.

## 배포 메모

- `vercel.json`은 최소 설정입니다. prerender된 정적 HTML이 우선 서빙됩니다.
- canonical / 구조화 데이터 기준 URL은 현재 `ssg/seo.ts`의 `SITE_URL` (`https://autocmo.com`)입니다.
- 운영 도메인이 바뀌면 `SITE_URL`을 먼저 수정하세요.

## 추천 점검 순서

1. `npm install`
2. `npm run dev`
3. `npm run build`
4. `npm run preview`
5. `curl`로 HTML 확인
6. 배포 후 `view-source:` 재확인

## 관련 문서

- [새 컴퓨터 인수인계 / 다음 작업](./docs/NEW_COMPUTER_HANDOFF.md)
- [남은 검증 및 운영 작업](./docs/REMAINING_PROOF_AND_TASKS.md)
