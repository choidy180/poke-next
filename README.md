<!-- Header / Title -->
<h1 align="center">🎉 Awesome Project Name</h1>
<p align="center">Next.js + Firebase + TMDB 기반의 화려한 영화 탐색 웹앱</p>

<!-- Badges -->
<p align="center">
  <a href="https://github.com/username/repo/stargazers">
    <img src="https://img.shields.io/github/stars/username/repo?style=for-the-badge&logo=github&label=Stars" alt="stars">
  </a>
  <a href="https://github.com/username/repo/forks">
    <img src="https://img.shields.io/github/forks/username/repo?style=for-the-badge&logo=github&label=Forks" alt="forks">
  </a>
  <a href="https://github.com/username/repo/issues">
    <img src="https://img.shields.io/github/issues/username/repo?style=for-the-badge&logo=gitbook&label=Issues" alt="issues">
  </a>
  <a href="https://github.com/username/repo/actions">
    <img src="https://img.shields.io/github/actions/workflow/status/username/repo/ci.yml?style=for-the-badge&logo=githubactions&label=CI" alt="ci">
  </a>
  <a href="./LICENSE">
    <img src="https://img.shields.io/github/license/username/repo?style=for-the-badge&logo=opensourceinitiative&label=License" alt="license">
  </a>
</p>

<!-- Quick Links -->
<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-demo">Demo</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-project-structure">Structure</a> •
  <a href="#-scripts">Scripts</a> •
  <a href="#-api-endpoints">API</a> •
  <a href="#-contributing">Contributing</a>
</p>

---

## ✨ Features
- 🎬 **TMDB 통합**: 한국어/영문 다국어 검색, 장르/평점/년도 필터
- ⚡ **초고속 UI**: Next.js App Router + React Server Components
- 🔐 **Firebase Auth**: Email/Password, Google 소셜 로그인
- 🎨 **스타일**: styled-components + 애니메이션(Framer Motion)
- 📱 **반응형 레이아웃**: 모바일 ~ 데스크톱 최적화
- 🧪 **테스트**: Vitest + React Testing Library
- 🚀 **배포**: Vercel 1-Click Deploy

---

## 🔥 Demo
> 실서비스/프리뷰 링크를 여기에!
- Live: https://your-demo-link.com
- Storybook: https://storybook.your-link.com

<p align="center">
  <img src="./assets/demo-hero.gif" alt="demo gif" width="840">
</p>

---

## 🧰 Tech Stack
<!-- Colorful Tech Badges -->
<p>
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs" />
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=000" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=fff" />
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=000" />
  <img src="https://img.shields.io/badge/TMDB-01D277?style=for-the-badge&logo=themoviedatabase" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel" />
  <img src="https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=fff" />
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint" />
  <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=000" />
</p>

---

## ⚙️ Quick Start
```bash
# 1) Clone
git clone https://github.com/username/repo.git
cd repo

# 2) Install
pnpm i    # or npm i / yarn

# 3) Env
cp .env.example .env.local
# .env.local에 키 입력 (아래 표 참고)

# 4) Dev
pnpm dev  # http://localhost:3000
