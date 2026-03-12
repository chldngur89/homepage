# Auto C-Level AI Homepage

CMO AI Agent · Zero-Click Intelligence 랜딩/홈페이지 (React + Vite + TypeScript). 창업가·판매자를 위한 편리함, AI2AI로 CFO·CEO AI 확장.

- **로컬 개발**: 이 저장소는 **로컬에서 잘 돌아가는 것**을 기준으로 개발합니다.
- **배포**: Vercel에 배포됨 → [https://homepage-roan-kappa.vercel.app/](https://homepage-roan-kappa.vercel.app/)

---

## 로컬에서 실행하기 (일상 워크플로우)

```bash
# 1. 최초 1회 또는 package.json 변경 후
npm install

# 2. 개발 서버 실행 (핫 리로드)
npm run dev
```

브라우저에서 **http://localhost:5173/** 로 접속합니다. 코드 수정 시 자동 반영됩니다.

---

## 로컬에서 “배포와 동일한 상태” 확인하기

Vercel에 올리기 전에, **빌드 결과물이 로컬에서 정상인지** 확인하려면:

```bash
npm run build    # dist/ 생성
npm run preview  # dist/ 기준으로 로컬 서버 실행 (기본 http://localhost:4173)
```

`preview`로 SPA 라우팅(/solution, /about 등)과 화면이 문제없이 나오면, Vercel 배포 결과도 동일하게 나올 가능성이 높습니다.

---

## 요약

| 목적           | 명령어           | 접속 주소              |
|----------------|------------------|------------------------|
| 일상 개발      | `npm run dev`    | http://localhost:5173  |
| 배포 전 확인   | `npm run build` → `npm run preview` | http://localhost:4173  |
| 실제 서비스    | Vercel 자동 배포 | https://homepage-roan-kappa.vercel.app/ |

---

## 환경 변수 (선택)

- **문의 폼 연동**: [Formspree](https://formspree.io)에서 폼 생성 후 Form ID를 `.env`에 설정하면 문의가 이메일로 전달됩니다.
  ```bash
  cp .env.example .env
  # .env 에서 VITE_FORMSPREE_FORM_ID=your_form_id 로 수정
  ```
- **Google Analytics**: `index.html` 내 GA4 주석을 해제하고 측정 ID를 넣으면 됩니다. 개인정보처리방침에 분석 도구 안내가 포함되어 있습니다.

## 원본

Figma 디자인 기반 코드 번들 (아이디어 회의 진행):  
https://www.figma.com/design/Ne8ymOd8rPdTZccxaal8LS/
