import React, { useEffect, useRef, useState } from 'react';
import '../styles/components/SkillCircle.scss';

function SkillCircle({ name, pct, color }) {
  const [filled, setFilled] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setFilled(true); },
      { threshold: 0.3 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div className="skill-circle-wrap" ref={ref}>
      <div className="skill-circle">
        <div
          className={`skill-circle__water skill-circle__water--${color}`}
          style={{ height: filled ? `${pct}%` : '0%' }}
        />
        <span className="skill-circle__label">{pct}%</span>
      </div>
      <h4 className="skill-circle__name">{name}</h4>
    </div>
  );
}

export default SkillCircle;
