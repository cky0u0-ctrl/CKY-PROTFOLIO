import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/Resume.scss';

const SKILLS_DATA = [
  { name: 'HTML',        level: '중상', desc: '시맨틱 마크업 및 웹 접근성을 고려한 구조 설계 가능', pct: 80 },
  { name: 'CSS',         level: '중상', desc: '반응형 레이아웃 및 사용자 중심 UI 구현 가능',         pct: 80 },
  { name: 'JavaScript',  level: '중',   desc: '기능 구현 및 라이브러리 활용 가능',                   pct: 65 },
  { name: 'React',       level: '중',   desc: '프로젝트 제작 경험 보유, 심화 이해 학습 중',          pct: 70 },
  { name: 'TypeScript',  level: '하',   desc: '기본 문법 및 프로젝트 적용 경험',                     pct: 50 },
  { name: 'Figma',       level: '중',   desc: 'UI 설계 및 디자인 시스템 활용 가능',                  pct: 65 },
  { name: 'GitHub',      level: '중',   desc: '형상관리 및 배포 경험',                               pct: 65 },
  { name: 'Claude (AI)', level: '중상', desc: 'UI 구현, 코드 리팩토링, 프롬프트 기반 개발 활용',     pct: 80 },
];

const LEVEL_COLOR = { '중상': 'pink', '중': 'purple', '하': 'blue' };

function SkillBar({ name, level, desc, pct }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="skill-bar-item"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="skill-bar-item__top">
        <span className="skill-bar-item__name">{name}</span>
        <span className={`skill-bar-item__level level-${LEVEL_COLOR[level]}`}>{level}</span>
      </div>
      <div className="skill-bar-item__track">
        <div
          className={`skill-bar-item__fill fill-${LEVEL_COLOR[level]}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {hovered && <p className="skill-bar-item__desc">{desc}</p>}
    </div>
  );
}

function Resume() {
  return (
    <div className="resume-page">

      {/* 배경 블롭 */}
      <div className="resume-blob resume-blob--1" />
      <div className="resume-blob resume-blob--2" />
      <div className="resume-bg-text">RESUME</div>

      <div className="resume-inner">

        {/* ── 상단 헤더 */}
        <header className="resume-header">
          <div className="resume-header__left">
            <p className="resume-header__eyebrow">WEB PUBLISHER · FRONTEND DEVELOPER</p>
            <h1 className="resume-header__name">
              최기연
              <span className="resume-header__name-en">Choi Ki Yeon</span>
            </h1>
            <p className="resume-header__tagline">
              <strong>AI를 적극 활용하는 웹디자인 퍼블리셔</strong>로서,<br />
              사용자의 손끝에서 시작되는 경험을 코드로 완성합니다
            </p>
          </div>
          <div className="resume-header__right">
            <div className="resume-contact-card">
              <div className="resume-contact-card__apply">
                <span className="resume-contact-card__field-tag">지원분야</span>
                <span>UIUX디자인, 프론트앤드</span>
              </div>
              <ul className="resume-contact-list">
                <li><span>📅</span> 2000.06.28</li>
                <li><span>📱</span> 010-9084-8074</li>
                <li><span>📧</span> cky0u0@gmail.com</li>
                <li><span>📍</span> 서울특별시 강동구</li>
                <li><span>💰</span> 희망연봉 3,400 (협의가능)</li>
              </ul>
            </div>
          </div>
        </header>

        <div className="resume-grid">

          {/* ── 왼쪽 */}
          <div className="resume-left">

            {/* 자기소개 */}
            <section className="resume-section">
              <h2 className="resume-section__title">
                <span className="resume-section__icon">👋</span> 자기소개
              </h2>
              <div className="resume-intro">
                <p>
                  <strong>AI를 적극 활용하는 웹디자인 퍼블리셔</strong>로서, ChatGPT·Claude 등을
                  실무에 접목해 디자인 구현 속도와 코드 품질을 동시에 끌어올리고 있습니다.
                </p>
                <p>
                  치과위생사로 근무하며 환자 경험과 소통의 중요성을 배웠고,
                  그 과정에서 <strong>사용자 중심 사고</strong>를 자연스럽게 체득했습니다.
                </p>
                <p>
                  이후 웹 개발에 입문하여 HTML/CSS부터 React, Next.js까지 빠르게 학습하며
                  <strong>픽셀 단위의 꼼꼼함</strong>을 무기로 성장해왔습니다.
                </p>
                <p>
                  현재는 Firebase, TypeScript, Zustand 등을 활용한 실전 프로젝트를 통해
                  디자인과 개발 사이의 간극을 메우는 <strong>웹퍼블리셔·프론트엔드 개발자</strong>로
                  자리매김하고 있습니다.
                </p>
              </div>
            </section>

            {/* 학력 */}
            <section className="resume-section">
              <h2 className="resume-section__title">
                <span className="resume-section__icon">🎓</span> 학력
              </h2>
              <div className="resume-timeline">
                <div className="resume-timeline__item">
                  <div className="resume-timeline__period">2021 – 2024</div>
                  <div className="resume-timeline__content">
                    <h4>경복대학교</h4>
                    <p>학점 3.6 / 경기도</p>
                  </div>
                </div>
                <div className="resume-timeline__item">
                  <div className="resume-timeline__period">2016 – 2019</div>
                  <div className="resume-timeline__content">
                    <h4>상일여자고등학교</h4>
                    <p>서울</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 교육 */}
            <section className="resume-section">
              <h2 className="resume-section__title">
                <span className="resume-section__icon">📚</span> 교육 이수
              </h2>
              <div className="resume-edu-card">
                <div className="resume-edu-card__header">
                  <h4>UIUX 디자인 웹 프론트앤드개발 부트캠프</h4>
                  <span className="resume-edu-card__date">2025.07.17 – 2026.01.08</span>
                </div>
                <p className="resume-edu-card__org">이젠아카데미 DX센터</p>
                <p className="resume-edu-card__desc">
                  HTML/CSS/JavaScript 기반 반응형 웹 퍼블리싱 및 UI 구현을 학습하였으며,
                  Figma를 활용한 UI/UX 설계와 React·TypeScript 기반 프론트엔드 개발 프로젝트를 진행하였습니다.
                  반응형 웹 리뉴얼 프로젝트 수행을 통해 디자인·퍼블리싱·프론트엔드 개발 역량을 강화하였습니다.
                </p>
              </div>
            </section>

          </div>

          {/* ── 오른쪽 */}
          <div className="resume-right">

            {/* 기술 스택 */}
            <section className="resume-section">
              <h2 className="resume-section__title">
                <span className="resume-section__icon">⚡</span> 보유 기술
              </h2>
              <div className="skill-bars">
                {SKILLS_DATA.map(s => (
                  <SkillBar key={s.name} {...s} />
                ))}
              </div>
            </section>

            {/* 강점 */}
            <section className="resume-section">
              <h2 className="resume-section__title">
                <span className="resume-section__icon">✨</span> 핵심 강점
              </h2>
              <div className="resume-strengths">
                {[
                  { icon: '🎯', title: '픽셀 퍼펙트',  desc: '디자인과 구현 사이의 차이를 최소화합니다' },
                  { icon: '📱', title: '반응형 설계',   desc: '모든 디바이스에서 일관된 UX를 제공합니다' },
                  { icon: '⚡', title: '빠른 학습력',   desc: '새로운 기술 스택을 빠르게 습득합니다'     },
                  { icon: '🤝', title: '협업 커뮤니케이션', desc: '팀원과의 원활한 소통을 중시합니다'  },
                ].map(s => (
                  <div className="resume-strength-card" key={s.title}>
                    <span className="resume-strength-card__icon">{s.icon}</span>
                    <div>
                      <h4>{s.title}</h4>
                      <p>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>

        {/* 하단 CTA */}
        <div className="resume-cta">
          <Link to="/contact" className="btn btn-fill">스카우트 제안하기 →</Link>
          <Link to="/about"   className="btn btn-ghost">더 알아보기</Link>
          <Link to="/"        className="btn btn-ghost">← 홈으로</Link>
        </div>

      </div>
    </div>
  );
}

export default Resume;
