import React, { useEffect, useRef, useState } from 'react';
import styles from './style.module.scss';
import gsap from 'gsap';
import Magnetic from '../Magnetic';

export default function IndexComponent({ children, backgroundColor = "#455CE9", ...attributes }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Adjust the breakpoint as needed
  const circle = useRef(null);
  const timeline = useRef(null);
  let timeoutId = null;

  useEffect(() => {
    // Update the state when the screen size changes
    const handleResize = () => setIsMobile(window.innerWidth < 768);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    timeline.current = gsap.timeline({ paused: true });
    timeline.current
      .to(circle.current, { top: "-25%", width: "150%", duration: 0.4, ease: "power3.in" }, "enter")
      .to(circle.current, { top: "-150%", width: "125%", duration: 0.25 }, "exit");
  }, []);

  const manageMouseEnter = () => {
    if (timeoutId) clearTimeout(timeoutId);
    timeline.current.tweenFromTo('enter', 'exit');
  };

  const manageMouseLeave = () => {
    timeoutId = setTimeout(() => {
      timeline.current.play();
    }, 300);
  };

  return (
    <>
      {isMobile ? (
        <div
          className={styles.roundedButton}
          style={{ overflow: "hidden" }}
          onMouseEnter={manageMouseEnter}
          onMouseLeave={manageMouseLeave}
          {...attributes}
        >
          {children}
          <div
            ref={circle}
            style={{ backgroundColor }}
            className={styles.circle}
          ></div>
        </div>
      ) : (
        <Magnetic>
          <div
            className={styles.roundedButton}
            style={{ overflow: "hidden" }}
            onMouseEnter={manageMouseEnter}
            onMouseLeave={manageMouseLeave}
            {...attributes}
          >
            {children}
            <div
              ref={circle}
              style={{ backgroundColor }}
              className={styles.circle}
            ></div>
          </div>
        </Magnetic>
      )}
    </>
  );
}
