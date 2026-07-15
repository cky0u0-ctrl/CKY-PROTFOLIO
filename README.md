👩‍💻 Choi KiYeon — Web Publisher Portfolio

<img width="1913" height="937" alt="최기연포트폴리오오옹" src="https://github.com/user-attachments/assets/1675695b-63d6-41a3-9fec-558d8a02be44" />


React 기반 포트폴리오 사이트

배포사이트 : https://cky-protfolio.vercel.app

## 기술 스택
- React 18
- React Router DOM v6
- CSS (컴포넌트별 모듈)
- Plus Jakarta Sans + JetBrains Mono (Google Fonts)

## 실행 방법
```bash
npm install
npm start
```

## 빌드
```bash
npm run build
```

## 파일 구조
```
src/
├── App.js
├── index.js
├── data/
│   ├── projects.js   ← 프로젝트 데이터
│   └── skills.js     ← 스킬 데이터
├── styles/
│   └── global.css    ← 전역 CSS 변수 & 유틸
├── components/
│   ├── CustomCursor  ← 치아요정 커서
│   ├── GNB           ← 상단 네비
│   ├── SideNav       ← IT'S ME 점 네비
│   ├── LockSection   ← 스크롤 잠금 해제 섹션
│   ├── ScrollHint    ← 스크롤 힌트 화살표
│   └── SkillCircle   ← 물 채우기 스킬 원
└── pages/
    ├── Home.js           ← 메인 (Hero / Projects / Contact)
    ├── ProjectDetail.js  ← 프로젝트 상세
    └── sections/
        └── AboutSwiper.js ← About 5슬라이드 스와이퍼

public/
├── tooth.png    ← 커서 이미지
├── profile.png  ← 히어로 프로필 사진
└── avatar.png   ← About 3D 아바타
```

## 배포 (GitHub Pages)
```bash
npm install gh-pages --save-dev
```
package.json에 추가:
```json
"homepage": "https://{username}.github.io/{repo}",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```
```bash
npm run deploy
```
