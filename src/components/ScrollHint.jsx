import React, { useEffect, useState } from 'react';
import '../styles/components/ScrollHint.scss';

function ScrollHint() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('home');
    if (!hero) return;
    const io = new IntersectionObserver(
      ([e]) => setHidden(!e.isIntersecting),
      { threshold: 0.5 }
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <div className={`scroll-hint ${hidden ? 'hidden' : ''}`}>
      <span>아래로 스크롤하세요</span>
      <div className="scroll-hint__arrow">
        <span /><span /><span />
      </div>
    </div>
  );
}

export default ScrollHint;
