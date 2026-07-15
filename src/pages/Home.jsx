import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import LockSection from '../components/LockSection';
import ScrollHint from '../components/ScrollHint';
import PROJECTS from '../data/projects';
import '../styles/pages/Home.scss';

const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

function CodeCard() {
  return (
    <div className="code-card float-y2">
      <div className="code-card__bar">
        <span className="dot dot-r" /><span className="dot dot-y" /><span className="dot dot-g" />
        <span className="code-card__filename">it's me.js</span>
      </div>
      <div className="code-card__body">
        <div><span className="ln">5</span></div>
        <div><span className="ln">6</span><span className="kw">const </span><span className="fn">publisher</span><span className="pu"> = {'{'}</span></div>
        <div><span className="ln">7</span>&nbsp;&nbsp;<span className="ky">name</span><span className="pu"> : </span><span className="st">"Choi Ki Yeon"</span><span className="pu">,</span></div>
        <div><span className="ln">8</span>&nbsp;&nbsp;<span className="ky">role</span><span className="pu"> : </span><span className="st">"web publisher"</span><span className="pu">,</span></div>
        <div><span className="ln">9</span>&nbsp;&nbsp;<span className="ky">skills</span><span className="pu">:[</span><span className="st">"HTML"</span><span className="pu">,</span><span className="st">"CSS"</span><span className="pu">,</span></div>
        <div><span className="ln">10</span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="st">"React"</span><span className="pu">,</span><span className="st">"SCSS"</span></div>
        <div><span className="ln">11</span>&nbsp;&nbsp;<span className="pu">],</span></div>
        <div><span className="ln">12</span>&nbsp;&nbsp;<span className="ky">passion</span><span className="pu">:</span><span className="bo">true</span></div>
        <div><span className="ln">13</span><span className="pu">{'}'}</span></div>
      </div>
    </div>
  );
}

/* ── 메일 전송 폼 */
function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setStatus('error');
      setErrorMsg('메일 전송 설정이 아직 안 되어있어요. .env에 EmailJS 키를 등록해주세요.');
      return;
    }

    setStatus('sending');
    setErrorMsg('');
    // alert('지금 쓰는 TEMPLATE_ID: ' + EMAILJS_TEMPLATE_ID);
    // alert(JSON.stringify({
    //   service: EMAILJS_SERVICE_ID,
    //   template: EMAILJS_TEMPLATE_ID,
    //   key: EMAILJS_PUBLIC_KEY,
    // }));
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          to_email: 'cky0u0@gmail.com',
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      alert('EmailJS 에러: status=' + err.status + ' / text=' + err.text);
      setStatus('error');
      setErrorMsg('전송에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input
        type="text" name="name" placeholder="이름"
        className="contact-form__input"
        value={form.name} onChange={handleChange} required
      />
      <input
        type="email" name="email" placeholder="보내는 사람 이메일주소"
        className="contact-form__input"
        value={form.email} onChange={handleChange} required
      />
      <textarea
        name="message" placeholder="메시지를 입력해주세요"
        className="contact-form__textarea" rows={5}
        value={form.message} onChange={handleChange} required
      />

      {status === 'success' && (
        <p className="contact-form__status contact-form__status--ok">
          메시지가 성공적으로 전송되었습니다! 😊
        </p>
      )}
      {status === 'error' && (
        <p className="contact-form__status contact-form__status--error">
          {errorMsg}
        </p>
      )}

      <button type="submit" className="btn btn-fill" disabled={status === 'sending'}>
        {status === 'sending' ? '전송 중...' : '보내기 →'}
      </button>
    </form>
  );
}

function Home() {
  return (
    <>
      <ScrollHint />

      {/* ── HERO */}
      <LockSection sectionId="home">
        <div className="blob blob-pink" />
        <div className="blob blob-purple" />
        <div className="hero">
          <div className="hero__left">
            <p className="eyebrow">WEB PUBLISHER PORTFOLIO</p>
            <h1 className="hero__title">
              안녕하세요,<br />
              <span className="grad-pink">웹퍼블리셔</span><br />
              <span className="grad-purple">Choi KiYeon</span>입니다
            </h1>
            <p className="hero__desc">
              사용자 경험을 최우선으로 생각하며<br />
              픽셀 단위까지 꼼꼼하게 구현하는 프론트엔드 퍼블리셔 입니다.
            </p>
            <div className="hero__cta">
              <a href="#projects" className="btn btn-fill">프로젝트 보기</a>
              <Link to="/about" className="btn btn-ghost">자기소개 보기 →</Link>
            </div>
          </div>
          <div className="hero__right">
            <div className="hero__circle" />
            <div className="hero__photo float-y">
              <img src="/profile.png" alt="Choi KiYeon" />
            </div>
            <div className="hero__headline float-slow">
              <span>CREATING</span>
              <span>PERSONAL</span>
              <span>VALUE</span>
            </div>
            <CodeCard />
          </div>
        </div>
      </LockSection>

      {/* ── PROJECTS 미리보기 */}
      <LockSection sectionId="projects">
        <div className="projects-preview">
          <div className="projects-preview__header">
            <p className="eyebrow">SELECTED WORK!</p>
            <h2 className="projects-preview__title grad-purple">PROJECTS</h2>
            <p className="projects-preview__sub">웹 퍼블리싱 실력을 담은 {PROJECTS.length}개의 프로젝트 입니다.</p>
          </div>
          <div className="project-grid">
            {PROJECTS.map((p, i) => (
              <Link
                to={`/projects/${p.id}`}
                key={p.id}
                className={`project-card ${i === 0 ? 'project-card--featured' : ''}`}
              >
                <div className="project-card__thumb" style={!p.thumb ? { background: p.cardBg } : undefined}>
                  {p.thumb
                    ? <img className="project-card__thumb-img" src={p.thumb} alt={p.name} />
                    : <span className="project-card__thumb-label">{p.name.split(' ')[0]}</span>}
                </div>
                <div className="project-card__info">
                  <span className={`project-card__tag tag-${p.tagType}`}>{p.tagLabel}</span>
                  <h3 className="project-card__name">{p.name}</h3>
                </div>
              </Link>
            ))}
          </div>
          <div className="projects-preview__more">
            <Link to="/projects" className="btn btn-pill">전체 프로젝트 보러가기 →</Link>
          </div>
        </div>
      </LockSection>

      {/* ── CONTACT */}
      <section className="section" id="contact">
        <div className="contact-page">
          <div className="contact-page__left">
            <p className="eyebrow">GET IN TOUCH</p>
            <h2 className="contact-page__title">USEALLY<br />DESIGN</h2>
            <div className="contact-card">
              <h3 className="contact-card__title">CONTACT ME</h3>
              <ul className="contact-card__list">
                <li>📧 cky0u0@gmail.com</li>
                <li>📱 010-9084-8074</li>
                <li>🔗 github.com/choi-kiyeon</li>
              </ul>
            </div>
          </div>
          <div className="contact-page__right">
            <p className="contact-page__big">메일보내기폼</p>
            <ContactForm />
          </div>
        </div>
        <footer className="footer">
          <p>© 2026 Choi KiYeon. Designed &amp; Built with ♥</p>
        </footer>
      </section>
    </>
  );
}

export default Home;
