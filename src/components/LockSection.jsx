import React, { useEffect, useRef, useState } from 'react';
import '../styles/components/LockSection.scss';

function LockSection({ children, sectionId }) {
  const [visible, setVisible] = useState(false);
  const secRef = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (secRef.current) io.observe(secRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <section className={`section reveal-section ${visible ? 'reveal-section--visible' : ''}`} id={sectionId} ref={secRef}>
      {children}
    </section>
  );
}

export default LockSection;
