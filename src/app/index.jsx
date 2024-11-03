'use client';

import styles from './page.module.scss';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Preloader from '../components/Preloader';
import Landing from '../components/Landing';
import Projects from '../components/Projects';
import Description from '../components/Description';
import SlidingImages from '../components/SlidingImages';
import Contact from '../components/Contact';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      (async () => {
        const LocomotiveScroll = (await import('locomotive-scroll')).default;
        const locomotiveScroll = new LocomotiveScroll();

        setTimeout(() => {
          setIsLoading(false);
          if (typeof document !== 'undefined') {
            document.body.style.cursor = 'default';
            window.scrollTo(0, 0);
          }
        }, 2000);
      })();
    }
  }, []);

  if (typeof window !== 'undefined') {
    console.log("Window Test");
  }

  if (typeof document !== 'undefined') {
    console.log("doc Test");
  }

  return (
    <main>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>
      {!isLoading && (
        <>
          <Landing />
          <Description />
          <Projects />
          <SlidingImages />
          <Contact />
        </>
      )}
    </main>
  );
}
