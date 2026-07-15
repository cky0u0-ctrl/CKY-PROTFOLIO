import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/components/GNB.scss';

const NAV_ITEMS = [
  { label: 'Home',     to: '/',        hash: 'home'     },
  { label: 'Projects', to: '/projects',hash: ''         },
  { label: 'About',    to: '/about',   hash: ''         },
  { label: 'Resume',   to: '/resume',  hash: ''         },
  { label: 'Contact',  to: '/contact', hash: ''         },
];

function Logo() {
  return (
    <Link to="/" className="gnb__logo" aria-label="홈으로">
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 14 C10 10 13 8 16 8 C18 8 20 9 22 11 C24 9 26 8 28 8 C31 8 34 10 34 14 C34 20 31 28 29 33 C28 36 27 37 26 37 C25 37 24.5 36 24 34 C23.5 32 23 30 22 30 C21 30 20.5 32 20 34 C19.5 36 19 37 18 37 C17 37 16 36 15 33 C13 28 10 20 10 14Z"
          fill="white" stroke="#FFCEF3" strokeWidth="1.5" />
        <path d="M15 13 C15 11.5 16.5 11 18 11 C19 11 20 11.5 20.5 12"
          stroke="#CABBE9" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
        <path d="M22 20 C22 20 18 17 18 14.5 C18 13 19 12 20.5 12 C21.3 12 22 12.5 22 12.5 C22 12.5 22.7 12 23.5 12 C25 12 26 13 26 14.5 C26 17 22 20 22 20Z"
          fill="#FF69B4" opacity="0.85" />
        <text x="7" y="42" fontSize="7" fontWeight="800" fontFamily="monospace" fill="#CABBE9">&lt;/&gt;</text>
        <circle cx="34" cy="9"  r="1.5" fill="#A1EAFB" />
        <circle cx="38" cy="14" r="1"   fill="#FFCEF3" />
        <circle cx="31" cy="5"  r="1"   fill="#CABBE9" />
      </svg>
      <span className="gnb__logo-text">
        <span className="gnb__logo-ky">KY</span>
        <span className="gnb__logo-dot">♥</span>
      </span>
    </Link>
  );
}

function GNB() {
  const [active, setActive] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname;
    if (path === '/about')   { setActive('about');   return; }
    if (path === '/resume')  { setActive('resume');  return; }
    if (path === '/contact') { setActive('contact'); return; }
    if (path === '/auth')    { setActive('');        return; }
    if (path.startsWith('/projects')) { setActive('projects'); return; }

    const sections = ['home'];
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.4 }
    );
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [location]);

  const handleNav = (e, item) => {
    e.preventDefault();
    if (item.hash) {
      if (location.pathname === '/') {
        document.getElementById(item.hash)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/');
        setTimeout(() => {
          document.getElementById(item.hash)?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    } else {
      navigate(item.to);
    }
  };

  return (
    <nav className="gnb">
      <Logo />
      <ul className="gnb__list">
        {NAV_ITEMS.map(item => {
          const id = item.hash || item.label.toLowerCase();
          return (
            <li key={item.label}>
              <a
                href={item.to}
                className={`gnb__link ${active === id ? 'active' : ''}`}
                onClick={(e) => handleNav(e, item)}
              >
                {item.label}
                {item.label === 'Contact' && <span className="gnb__link-badge">채용</span>}
              </a>
            </li>
          );
        })}
      </ul>
      <div className="gnb__spacer" />
    </nav>
  );
}

export default GNB;
