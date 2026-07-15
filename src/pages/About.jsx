import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import SkillCircle from '../components/SkillCircle';
import SKILLS from '../data/skills';
import '../styles/pages/About.scss';

const SLIDES = [
  { id: 'profile', label: 'About Me' },
  { id: 'story',   label: 'My Story' },
  { id: 'skills',  label: 'Skills'   },
  { id: 'journey', label: 'Journey'  },
  { id: 'connect', label: 'Connect'  },
];

function About() {
  const [current, setCurrent]       = useState(0);
  const [skillGroup, setSkillGroup] = useState(0);

  const goTo = useCallback((idx) => {
    setCurrent(idx);
    if (idx === 2) setSkillGroup(0);
  }, []);

  useEffect(() => {
    let cooldown = false;
    const onWheel = (e) => {
      e.preventDefault();
      if (cooldown) return;
      cooldown = true;
      setTimeout(() => (cooldown = false), 700);
      if (e.deltaY > 0) setCurrent(p => Math.min(p + 1, SLIDES.length - 1));
      else              setCurrent(p => Math.max(p - 1, 0));
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowDown') setCurrent(p => Math.min(p + 1, SLIDES.length - 1));
      if (e.key === 'ArrowUp')   setCurrent(p => Math.max(p - 1, 0));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="about-page">

      {/* 왼쪽 네비 */}
      <nav className="about-sidenav">
        <Link to="/" className="about-sidenav__back">HOME</Link>
        <div className="about-sidenav__dots">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              className={`about-sidenav__dot ${current === i ? 'active' : ''}`}
              onClick={() => goTo(i)}
              title={s.label}
            >
              <span className="about-sidenav__tooltip">{s.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="about-slides">

        {/* ── 슬라이드 0 : 프로필 */}
        <div className={`aslide ${current === 0 ? 'active' : current > 0 ? 'prev' : ''}`}>
          {/* 배경 */}
          <div className="bg-blob slide-profile-bg1" />
          <div className="bg-blob slide-profile-bg2" />
          <div className="bg-text slide-profile-bgtext">HELLO</div>

          <div className="aslide__inner">
            <div className="about-profile">
              <div className="about-profile__left">
                <div className="bubble-chat">안녕하세요 👋</div>
                <img src="/avatar.png" alt="아바타" className="about-profile__avatar" />
                <div className="bubble-dots">
                  <span /><span /><span />
                </div>
              </div>
              <div className="about-profile__card">
                <span className="about-profile__card-label">ABOUT ME</span>
                <div className="about-profile__name">
                  <strong>Choi KiYeon</strong>
                  <span>최기연</span>
                </div>
                <p className="about-profile__tagline">
                  사용자의 손끝에서 시작되는 경험을<br />
                  코드로 완성하는 웹퍼블리셔 입니다
                </p>
                <div className="about-profile__tags">
                  <span className="pill pill-purple">React</span>
                  <span className="pill pill-pink">Next.js</span>
                  <span className="pill pill-blue">TypeScript</span>
                  <span className="pill pill-purple">Firebase</span>
                  <span className="pill pill-pink">SCSS</span>
                </div>
              </div>
            </div>
          </div>
          <button className="aslide__next" onClick={() => goTo(1)}>My Story ↓</button>
        </div>

        {/* ── 슬라이드 1 : My Story */}
        <div className={`aslide ${current === 1 ? 'active' : current > 1 ? 'prev' : ''}`}>
          <div className="bg-blob slide-story-bg1" />
          <div className="bg-blob slide-story-bg2" />
          <div className="bg-text slide-story-bgtext">STORY</div>

          <div className="aslide__inner">
            <h2 className="about-big-title">My Story</h2>
            <div className="about-story__grid">
              <p className="about-story__body">
                치과위생사로 일하면서 늘 사용자의 불편함을 먼저 생각했습니다.<br /><br />
                그 시선이 웹으로 옮겨왔고, 지금은 픽셀 단위까지 꼼꼼하게 구현하는
                퍼블리셔로 성장하고 있습니다.<br /><br />
                디자인과 코드 사이 어딘가에서, 사람들이 더 편하게 쓸 수 있는
                웹을 만드는 것이 제 목표입니다.
              </p>
              <div className="about-story__cards">
                {[
                  { icon: '🎯', label: '픽셀 퍼펙트' },
                  { icon: '📱', label: '반응형 웹'   },
                  { icon: '⚡', label: '빠른 학습력' },
                  { icon: '🤝', label: '협업 커뮤니티'},
                ].map(c => (
                  <div className="story-card" key={c.label}>
                    <div>
                      <div style={{ fontSize:'2rem', marginBottom:'.5rem' }}>{c.icon}</div>
                      <span>{c.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button className="aslide__next" onClick={() => goTo(2)}>Skills ↓</button>
        </div>

        {/* ── 슬라이드 2 : Skills */}
        <div className={`aslide ${current === 2 ? 'active' : current > 2 ? 'prev' : ''}`}>
          <div className="bg-blob slide-skills-bg1" />
          <div className="bg-blob slide-skills-bg2" />
          <div className="bg-text slide-skills-bgtext">SKILL</div>

          <div className="aslide__inner">
            <p className="eyebrow">What I Can Do</p>
            <h2 className="about-skills__title">Skills</h2>
            <div className="skill-tabs">
              {SKILLS.map((g, i) => (
                <button
                  key={g.group}
                  className={`skill-tab ${skillGroup === i ? 'active' : ''}`}
                  onClick={() => setSkillGroup(i)}
                >
                  {g.group}
                </button>
              ))}
            </div>
            <div className="skill-circles">
              {SKILLS[skillGroup].items.map(s => (
                <SkillCircle key={`${skillGroup}-${s.name}`} name={s.name} pct={s.pct} color={s.color} />
              ))}
            </div>
          </div>
          <button className="aslide__next" onClick={() => goTo(3)}>Journey ↓</button>
        </div>

        {/* ── 슬라이드 3 : Journey */}
        <div className={`aslide ${current === 3 ? 'active' : current > 3 ? 'prev' : ''}`}>
          <div className="bg-blob slide-journey-bg1" />
          <div className="bg-text slide-journey-bgtext">JOURNEY</div>

          <div className="aslide__inner">
            <h2 className="about-big-title">Journey</h2>
            <p className="about-journey__sub">성장과정</p>
            <div className="timeline">
              <div className="timeline__line" />
              {[
                {
                  year: '2024',
                  title: '치과위생사 경력',
                  desc: '사용자 중심 사고방식을 키웠으며 꼼꼼한 작업 습관을 형성했습니다. 현장에서 쌓은 소통 능력과 책임감이 개발자로서의 기초가 되었습니다.',
                },
                {
                  year: '2025',
                  title: '웹퍼블리싱 입문',
                  desc: 'HTML/CSS 기초부터 시작하여 반응형 웹 레이아웃을 학습했습니다. 클론코딩으로 실력을 키우며 JavaScript와 SCSS를 익혔습니다.',
                },
                {
                  year: '2026',
                  title: 'React / Next.js 풀스택',
                  desc: 'Firebase, TypeScript, Zustand를 활용한 실전 프로젝트 완성. 5인 팀 프로젝트와 개인 사이드 프로젝트를 통해 실무 역량을 쌓았습니다.',
                  isActive: true,
                },
              ].map(item => (
                <div className="timeline__item" key={item.year}>
                  <div className="timeline__year">{item.year}</div>
                  <div className={`timeline__dot ${item.isActive ? 'active' : ''}`} />
                  <div className="timeline__content">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="aslide__next" onClick={() => goTo(4)}>Connect ↓</button>
        </div>

        {/* ── 슬라이드 4 : Connect */}
        <div className={`aslide ${current === 4 ? 'active' : ''}`}>
          <div className="bg-blob slide-connect-bg1" />
          <div className="bg-text slide-connect-bgtext">HELLO</div>

          <div className="aslide__inner">
            <div className="about-connect">
              <p className="about-connect__eyebrow">
                함께 한층 더 나은 경험을 만들어 볼까요
              </p>
              <h2 className="about-connect__title">
                새로운 기회와 협업을 환영합니다<br />
                편하게 연락주세요 ♥
              </h2>
              <div className="about-connect__btns">
                <Link to="/#contact" className="btn btn-fill">Contact Me →</Link>
                <Link to="/"         className="btn btn-ghost">← 홈으로</Link>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 하단 인디케이터 */}
      <div className="about-indicator">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            className={`about-indicator__item ${current === i ? 'active' : ''}`}
            onClick={() => goTo(i)}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default About;
