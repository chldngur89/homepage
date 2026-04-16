# Auto C-Level AI Homepage

Auto C-Level AI 랜딩 사이트 저장소입니다.  
현재 구조는 `Next.js`가 아니라 `Vite + React 18 + React Router` 기반이며, 배포 시에는 **정적 prerender**를 통해 각 주요 페이지의 핵심 텍스트가 초기 HTML에 포함되도록 구성되어 있습니다.

이 저장소의 핵심 목적은 두 가지입니다.

1. 브라우저에서 보이는 현재 UI를 유지한다.
2. NotebookLM, 검색엔진, 링크 프리뷰, 문서 추출 도구가 **JS 실행 전에도 본문을 읽을 수 있게** 만든다.

## 현재 상태

- 메인/소개/요금제/FAQ 등 주요 페이지는 빌드 시 HTML로 미리 생성됩니다.
- `View Source`, `curl`, JS 비활성 환경에서도 핵심 텍스트가 응답 HTML에 포함됩니다.
- `robots.txt`, `sitemap.xml`, canonical, Open Graph, Twitter 메타, JSON-LD가 함께 생성됩니다.
- 화면에 보이는 문구와 레이아웃을 바꾸지 않고 내부 구조만 보강한 상태입니다.

## 기술 스택

- `Vite 6`
- `React 18`
- `React Router 7`
- `TypeScript`
- `Tailwind CSS 4`
- `Vercel`

## 렌더링 구조

개발 시에는 일반적인 SPA처럼 동작합니다.

- `npm run dev`
- 브라우저에서 JS가 실행되며 앱이 렌더링됩니다.

배포용 빌드 시에는 아래 순서로 동작합니다.

1. Vite가 클라이언트 번들을 빌드합니다.
2. `ssg/entry-server.tsx`가 각 라우트를 서버에서 렌더링합니다.
3. `scripts/prerender.mjs`가 prerender된 HTML과 SEO 태그를 `dist/`에 주입합니다.
4. `robots.txt`, `sitemap.xml`, `404.html`도 함께 생성합니다.

즉, 최종 산출물은 CSR 전용 SPA가 아니라 **정적 HTML이 포함된 배포물**입니다.

## 중요한 파일

- `src/app/route-config.tsx`
  라우트 정의와 prerender 대상 경로 목록
- `src/main.tsx`
  prerender된 HTML이 있으면 hydrate, 없으면 client render
- `ssg/entry-server.tsx`
  서버 렌더 진입점
- `ssg/seo.ts`
  라우트별 `title`, `description`, canonical, OG, JSON-LD
- `scripts/prerender.mjs`
  빌드 후 HTML 주입, sitemap/robots 생성
- `index.html`
  기본 템플릿과 head placeholder

## 로컬 실행

권장 Node 버전: `Node.js 24.x`  
현재 마지막 검증 환경: `v24.10.0`

```bash
npm install
npm run dev
```

기본 개발 서버:

- [http://localhost:5173](http://localhost:5173)

## 배포 전 확인

```bash
npm run build
npm run preview
```

기본 프리뷰 서버:

- [http://localhost:4173](http://localhost:4173)

`npm run build`는 단순 번들링이 아니라 아래까지 포함합니다.

- 각 주요 라우트 prerender
- 초기 HTML 주입
- SEO 메타 생성
- `robots.txt` 생성
- `sitemap.xml` 생성

## 환경 변수

`.env.example` 기준:

```bash
VITE_FORMSPREE_FORM_ID=
# VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

- `VITE_FORMSPREE_FORM_ID`
  문의 폼을 Formspree로 연결할 때 사용합니다.
- `VITE_GA_MEASUREMENT_ID`
  GA4를 연결할 때 사용합니다.

처음 세팅할 때:

```bash
cp .env.example .env
```

## NotebookLM / 크롤러 검증 방법

### 1. View Page Source

배포 후 브라우저에서:

- `view-source:https://your-domain/`
- `view-source:https://your-domain/pricing/`

여기서 hero 문구, 설명 문구, FAQ 텍스트가 실제 HTML에 들어 있는지 확인합니다.

### 2. `curl`로 초기 HTML 확인

```bash
curl -s http://127.0.0.1:4173/ | rg "매출이 만들어지는|다채널 자동 업로드|대표님은"
curl -s http://127.0.0.1:4173/pricing/ | rg "자주 묻는 질문|무료 체험 후 자동으로 결제되나요\\?"
```

### 3. JS 비활성 환경 확인

- 브라우저 DevTools에서 JavaScript를 비활성화
- 페이지 새로고침
- 본문 텍스트가 그대로 보이는지 확인

이 세 가지가 통과되면 NotebookLM 같은 도구가 읽을 가능성이 크게 올라갑니다.

## 새 페이지를 추가할 때

새 텍스트 중심 페이지를 추가하면 아래 네 군데를 같이 업데이트하는 것이 안전합니다.

1. `src/app/pages/`에 페이지 컴포넌트 추가
2. `src/app/route-config.tsx`에 라우트 추가
3. `src/app/route-config.tsx`의 `prerenderRoutes`에 경로 추가
4. `ssg/seo.ts`에 해당 경로의 SEO 설정 추가

이 네 군데가 맞아야 해당 페이지가:

- 라우팅되고
- prerender되고
- 초기 HTML에 들어가고
- sitemap/canonical/OG까지 맞춰집니다

## 배포 메모

- Vercel 설정 파일은 현재 최소화되어 있습니다: `vercel.json`
- catch-all rewrite를 제거한 상태라, prerender된 정적 HTML이 우선 서빙됩니다.
- canonical 및 구조화 데이터 기준 사이트 URL은 현재 `https://autocmo.com`으로 설정되어 있습니다.
- 실제 운영 도메인이 달라지면 `ssg/seo.ts`의 `SITE_URL`을 먼저 수정해야 합니다.

## 추천 점검 순서

1. `npm install`
2. `npm run dev`
3. `npm run build`
4. `npm run preview`
5. `curl`로 HTML 확인
6. Vercel 배포 후 `view-source:`로 한 번 더 확인

## 관련 문서

- [새 컴퓨터 인수인계 / 다음 작업](./docs/NEW_COMPUTER_HANDOFF.md)
- [남은 검증 및 운영 작업](./docs/REMAINING_PROOF_AND_TASKS.md)
