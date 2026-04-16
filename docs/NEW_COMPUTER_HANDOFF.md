# 새 컴퓨터 인수인계 / 다음 작업

이 문서는 다른 컴퓨터에서 이 프로젝트를 다시 열었을 때 바로 이어서 작업할 수 있도록 정리한 기준 문서입니다.

## 1. 지금까지 해낸 것

이번 작업에서 가장 중요한 목표는 다음이었습니다.

1. 브라우저에서 보이는 현재 화면은 유지한다.
2. NotebookLM 같은 외부 도구가 URL 소스를 읽을 때 본문 텍스트를 더 잘 추출하게 만든다.

현재 완료된 내용:

- 랜딩 페이지와 주요 하위 페이지를 **정적 prerender**하도록 변경
- 핵심 본문 텍스트가 **초기 HTML 응답**에 포함되도록 구성
- `main`, `section`, `header`, `nav`, heading hierarchy 등 시맨틱 구조 보강
- canonical, description, Open Graph, Twitter 메타 보강
- route별 JSON-LD structured data 추가
- `robots.txt`, `sitemap.xml`, `404.html` 자동 생성
- Vercel에서 prerender 결과물을 그대로 서빙할 수 있게 설정 정리

정리하면:

- 사용자 화면은 거의 그대로 유지
- 내부 구조는 크롤러 친화적으로 개선
- CSR 중심 한계를 줄이고 정적 HTML 응답으로 보강

## 2. 새 컴퓨터에서 가장 먼저 할 일

### 필수 설치

- `Node.js 24.x`
- `npm`
- `git`

검증했던 Node 버전:

- `v24.10.0`

### 프로젝트 실행 순서

```bash
git clone <repo-url>
cd Homepage
npm install
cp .env.example .env
npm run dev
```

개발 서버:

- [http://localhost:5173](http://localhost:5173)

### 배포용 결과 확인

```bash
npm run build
npm run preview
```

프리뷰 서버:

- [http://localhost:4173](http://localhost:4173)

## 3. 꼭 확인할 환경 변수

`.env.example` 기준:

```bash
VITE_FORMSPREE_FORM_ID=
# VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

확인 포인트:

- Form 문의를 실제 메일로 받을 거면 `VITE_FORMSPREE_FORM_ID` 설정
- GA4를 쓸 거면 `VITE_GA_MEASUREMENT_ID` 설정
- 새 컴퓨터에서 `.env`를 안 만들면 문의/분석 연동이 빠질 수 있음

## 4. 구조를 이해할 때 먼저 볼 파일

- `README.md`
  전체 개요와 빌드/검증 방법
- `src/app/route-config.tsx`
  전체 라우트와 prerender 대상
- `src/main.tsx`
  hydrate/client render 분기
- `scripts/prerender.mjs`
  빌드 후 정적 HTML 생성 로직
- `ssg/entry-server.tsx`
  서버 렌더 엔트리
- `ssg/seo.ts`
  메타데이터, canonical, structured data

## 5. 지금 바로 해볼 확인

새 컴퓨터에서 세팅 후 아래 세 가지를 먼저 확인하면 됩니다.

### 1) 브라우저 확인

- 홈 `/`
- 요금제 `/pricing`
- 회사소개 `/about`

화면이 기존과 동일한지 먼저 확인합니다.

### 2) 초기 HTML 확인

```bash
curl -s http://127.0.0.1:4173/ | rg "매출이 만들어지는|다채널 자동 업로드|대표님은"
curl -s http://127.0.0.1:4173/pricing/ | rg "자주 묻는 질문|무료 체험 후 자동으로 결제되나요\\?"
```

### 3) JS 없이 읽히는지 확인

- DevTools에서 JavaScript 비활성화
- 새로고침
- 핵심 본문 텍스트가 보이는지 확인

## 6. 다음에 해야 할 개발 작업

기술적으로 남은 일은 “구조 변경”보다 “검증과 운영 보강” 쪽이 많습니다.

### 우선순위 높음

- 실제 운영 도메인이 맞는지 확인
  현재 canonical 기준 URL은 `ssg/seo.ts`의 `https://autocmo.com`
- 배포 후 `view-source:`로 실제 운영 HTML 재확인
- NotebookLM에 실제 URL을 다시 넣고 읽기 품질 확인
- 문의 폼이 실제로 메일에 도착하는지 테스트

### 그다음

- 텍스트 중심 정적 페이지를 추가할지 검토
  예: `/overview`, `/faq`
- 실제 서비스 소개, 팀 소개, 후기, 스크린샷 등 실데이터 보강
- GA4 연동 여부 결정
- 커스텀 도메인/Vercel 프로젝트 설정 재확인

## 7. 새 페이지를 추가할 때 체크리스트

새 페이지를 만들면 아래 순서로 맞추는 것이 안전합니다.

1. `src/app/pages/`에 페이지 추가
2. `src/app/route-config.tsx`에 route 추가
3. `prerenderRoutes`에 경로 추가
4. `ssg/seo.ts`에 SEO 설정 추가
5. `npm run build` 후 `dist/<route>/index.html` 생성 확인
6. `curl` 또는 `view-source:`로 본문 텍스트 확인

## 8. 배포 후 확인 체크리스트

- `view-source:https://your-domain/` 에 hero/설명/FAQ 문구가 보임
- `https://your-domain/robots.txt` 접근 가능
- `https://your-domain/sitemap.xml` 접근 가능
- `curl -L https://your-domain/ | rg "<h1|매출이 만들어지는|다채널 자동 업로드"` 통과
- SNS/메신저 링크 프리뷰가 정상 출력

## 9. 운영 관점에서 남은 일

기술 외적으로는 아래가 남아 있습니다.

- 실제 연락처 반영
- 실제 후기/수치 반영
- About 팀 정보 보강
- 실제 제품 스크린샷 반영
- Formspree 실연동
- 필요 시 GA4 연결

자세한 목록은 아래 문서 참고:

- [REMAINING_PROOF_AND_TASKS.md](./REMAINING_PROOF_AND_TASKS.md)

## 10. 한 줄 요약

이 프로젝트는 지금 **“보이는 화면은 유지하면서, 초기 HTML에는 본문이 들어가는 상태”** 까지 정리되어 있습니다.  
새 컴퓨터에서는 `npm install -> .env 확인 -> npm run build -> curl/view-source 검증` 순서로 시작하면 됩니다.
