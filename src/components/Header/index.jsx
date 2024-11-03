'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './style.module.scss';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import Nav from './nav';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Rounded from '../../common/RoundedButton';
import Magnetic from '../../common/Magnetic';

export default function IndexComponent() {
    const header = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const pathname = usePathname();
    const button = useRef(null);

    useEffect(() => {
        if (isActive) setIsActive(false);
    }, [pathname]);

    useEffect(() => {
        if (pathname !== '/') {
            document.getElementById('header').style.color = 'black';
            document.querySelectorAll('.indicator').forEach((indicator) => {
                indicator.style.backgroundColor = 'black';
            });
        }

        if (pathname === '/about') {
            document.querySelector('.about-indicator').style.transform = 'scale(1)';
        } else if (pathname === '/work') {
            document.querySelector('.work-indicator').style.transform = 'scale(1)';
        } else if (pathname === '/contact') {
            document.querySelector('.contact-indicator').style.transform = 'scale(1)';
        }
    }, [pathname]);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger)
        gsap.to(button.current, {
            scrollTrigger: {
                trigger: document.documentElement,
                start: 0,
                end: window.innerHeight,
                onLeave: () => { gsap.to(button.current, { scale: 1, duration: 0.25, ease: "power1.out" }) },
                onEnterBack: () => { gsap.to(button.current, { scale: 0, duration: 0.25, ease: "power1.out" }, setIsActive(false)) }
            }
        });
    }, []);

    return (
        <>
            <div className='hidden md:block'>
                <div ref={header} className={styles.header} id='header'>
                    <a href="/">
                        <Magnetic>
                            <div className={styles.logo}>
                                <p className={styles.copyright}>©</p>
                                <div className={styles.name}>
                                    <p className={styles.codeBy}>Code by</p>
                                    <p className={styles.adam}>Adam</p>
                                    <p className={styles.aji}>Aji</p>
                                </div>
                            </div>
                        </Magnetic>
                    </a>
                    <div className={styles.nav}>
                        <Magnetic>
                            <div className={styles.el}>
                                <a href='/work'>Work</a>
                                <div className={`indicator work-indicator ${styles.indicator}`}></div>
                            </div>
                        </Magnetic>
                        <Magnetic>
                            <div className={styles.el}>
                                <a href='/about'>About</a>
                                <div className={`indicator about-indicator ${styles.indicator}`}></div>
                            </div>
                        </Magnetic>
                        <Magnetic>
                            <div className={styles.el}>
                                <a href='/contact'>Contact</a>
                                <div className={`indicator contact-indicator ${styles.indicator}`}></div>
                            </div>
                        </Magnetic>
                    </div>
                    <div ref={button} className={styles.headerButtonContainer}>
                        <Rounded onClick={() => { setIsActive(!isActive) }} className={`${styles.button}`}>
                            <div className={`${styles.burger} ${isActive ? styles.burgerActive : ""}`}></div>
                        </Rounded>
                    </div>
                </div>
                <div ref={button} className={styles.headerButtonContainer}>
                    <Rounded onClick={() => { setIsActive(!isActive) }} className={`${styles.button}`}>
                        <div className={`${styles.burger} ${isActive ? styles.burgerActive : ""}`}></div>
                    </Rounded>
                </div>
                <AnimatePresence mode="wait">
                    {isActive && <Nav />}
                </AnimatePresence>
            </div>
        </>
    )
}
