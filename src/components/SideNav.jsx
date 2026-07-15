import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/components/SideNav.scss';

const SECTIONS = ['home', 'projects', 'contact'];

function SideNav() {
  const [active, setActive] = useState('home');
  const location = useLocation();

  // About 페이지, Projects 페이지에선 숨김
  const hidden = location.pathname !== '/';

  useEffect(() => {
    if (hidden) return;
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.4 }
    );
    SECTIONS.forEach(id => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [hidden]);

  if (hidden) return null;

  return (
    <aside className="side-nav">
      <span className="side-nav__label">IT'S ME</span>
      {SECTIONS.map(id => (
        <button
          key={id}
          className={`side-nav__dot ${active === id ? 'active' : ''}`}
          onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
          title={id}
          aria-label={`${id} 섹션으로 이동`}
        />
      ))}
    </aside>
  );
}

export default SideNav;
