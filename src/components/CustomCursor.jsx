import React, { useEffect, useRef } from 'react';
import '../styles/components/CustomCursor.scss';

function CustomCursor() {
  const sparkleRef = useRef(null);
  const mouse      = useRef({ x: 0, y: 0 });
  const pos        = useRef({ x: 0, y: 0 });
  const rafRef     = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.18;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.18;
      if (sparkleRef.current) {
        sparkleRef.current.style.left = pos.current.x + 'px';
        sparkleRef.current.style.top  = pos.current.y + 'px';
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="cursor-sparkle" ref={sparkleRef}>
      <svg viewBox="0 0 24 24" className="cursor-sparkle__icon" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 0
             C12.6 5.2 13.6 8.4 15.5 10.3
             C17.4 12.2 20.6 13.2 24 13.8
             C20.6 14.4 17.4 15.4 15.5 17.3
             C13.6 19.2 12.6 22.4 12 27.6
             C11.4 22.4 10.4 19.2 8.5 17.3
             C6.6 15.4 3.4 14.4 0 13.8
             C3.4 13.2 6.6 12.2 8.5 10.3
             C10.4 8.4 11.4 5.2 12 0 Z"
        />
      </svg>
    </div>
  );
}

export default CustomCursor;
