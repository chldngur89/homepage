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

## 배포 전 확인

```bash
npm run build
npm run preview
```

- 프리뷰: [http://localhost:4173](http://localhost:4173)

`npm run build`에 포함되는 것:

- 주요 라우트 prerender
- 초기 HTML · SEO 메타
- `robots.txt` · `sitemap.xml`

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
