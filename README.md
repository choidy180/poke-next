<!-- PROJECT BANNER -->
<p align="center">
  <img src="./assets/cover.png" alt="Project Banner" width="100%" />
</p>

<h1 align="center">🎬 TMDB Movie Explorer</h1>
<p align="center">
  <b>Next.js + Firebase + TMDB API</b> 기반의 한국 영화/드라마 탐색 웹앱
</p>

<!-- BADGES -->
<p align="center">
  <!-- Status -->
  <a href="https://github.com/username/repo/actions">
    <img src="https://img.shields.io/github/actions/workflow/status/username/repo/ci.yml?label=CI&logo=githubactions&logoColor=white" />
  </a>
  <a href="https://github.com/username/repo">
    <img src="https://img.shields.io/github/languages/top/username/repo?logo=typescript&label=TypeScript" />
  </a>
  <a href="https://github.com/username/repo/stargazers">
    <img src="https://img.shields.io/github/stars/username/repo?style=social" />
  </a>
  <a href="https://github.com/username/repo/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/username/repo?color=blue" />
  </a>
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen?logo=github" />
  <img src="https://img.shields.io/badge/Made%20with-❤️-ff69b4" />
</p>

<p align="center">
  <a href="#-features">Features</a> ·
  <a href="#-tech-stack">Tech Stack</a> ·
  <a href="#-quick-start">Quick Start</a> ·
  <a href="#-screenshots">Screenshots</a> ·
  <a href="#-api--env">API & ENV</a> ·
  <a href="#-project-structure">Structure</a> ·
  <a href="#-contributing">Contributing</a>
</p>

---

## ✨ Features
- ⚡ **초고속 검색**: TMDB 인기/최신/키워드 검색 & 필터
- 🌐 **다국어 지원**: ko/en 자동 로케일 스위칭
- 🔐 **Firebase Auth**: 이메일/비밀번호 로그인
- ⭐ **즐겨찾기**: Firestore 북마크 & 무한 스크롤
- 🎨 **스타일**: styled-components + 다크 테마
- 📱 **반응형**: 모바일·태블릿·데스크톱 최적화

---

## 🧰 Tech Stack
<p>
  <img src="https://img.shields.io/badge/Next.js-000?logo=next.js" />
  <img src="https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=000" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff" />
  <img src="https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=000" />
  <img src="https://img.shields.io/badge/TMDB_API-01d277?logo=themoviedatabase&logoColor=fff" />
  <img src="https://img.shields.io/badge/styled--components-DB7093?logo=styled-components&logoColor=fff" />
  <img src="https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=fff" />
  <img src="https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=000" />
  <img src="https://img.shields.io/badge/Vercel-000?logo=vercel&logoColor=fff" />
</p>

---

## 🧭 Live
- 🌐 데모: **https://your-demo-link.com**
- 📦 패키지: `npm create next-app` 기반

---

## 🚀 Quick Start
```bash
# 1) 프로젝트 복제
git clone https://github.com/username/repo.git
cd repo

# 2) 패키지 설치
npm install

# 3) 환경변수 설정
cp .env.example .env.local
# 파일 열어서 TMDB, Firebase 키 입력

# 4) 개발 서버
npm run dev
# http://localhost:3000
