'use client';

import styles from './style.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import Rounded from '../../common/RoundedButton';
import Magnetic from '../../common/Magnetic';
import { useRef, useEffect, useState } from 'react';
import { useScroll, motion, useTransform, useSpring } from 'framer-motion';

export default function IndexComponent() {
    const container = useRef(null);
    const [isMobile, setIsMobile] = useState(false);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end end"]
    })

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const x = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 0 : 250])
    const y = useTransform(scrollYProgress, [0, 1], [-500, isMobile ? 0 : 0])
    const rotate = useTransform(scrollYProgress, [0, 1], [120, isMobile ? 0 : 90])
    const margin = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 0 : -100])
    return (
        <motion.div style={{ y }} ref={container} className={styles.contact}>
            <div className={styles.body}>
                <div className={styles.title}>
                    {/* <span>
                        <div className={styles.imageContainer}>
                            <Image
                                fill={true}
                                alt={"image"}
                                src={`/images/backgroundVeryLow.jpg`}
                                className='brightness-50'
                            />
                        </div>
                    </span> */}
                    <div className={styles.working}>
                        <h2>Let&apos;s work</h2>
                        <h2>together</h2>
                    </div>
                    <motion.div style={{ x: isMobile ? 200 : x }} className={styles.buttonContainer}>
                        <Rounded backgroundColor={"#334BD3"} className={styles.button}>
                            <p>Get in touch</p>
                        </Rounded>
                    </motion.div>
                    <motion.svg style={{ rotate: isMobile ? 0 : rotate, scale: 2, margin }} width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z" fill="white" />
                    </motion.svg>
                </div>
                <div className={styles.nav}>
                    <Rounded>
                        <p>adam.aji2007@gmail.com</p>
                    </Rounded>
                </div>
                <div className={styles.info}>
                    <div className={styles.desc}>
                        <span>
                            <h3>Version</h3>
                            <p>2022 © Edition</p>
                        </span>
                        <span>
                            <h3>Local Time</h3>
                            <p>11:49 PM GMT+2</p>
                        </span>
                    </div>
                    <div className="border border-white"></div>
                    <div>
                        <span>
                            <h3>socials</h3>
                            <Magnetic>
                                <Link href="https://www.instagram.com/zein_wx/">
                                    <p>Instagram</p>
                                </Link>
                            </Magnetic>
                        </span>
                        <Magnetic>
                            <Link href="https://www.linkedin.com/in/adam-aji-langit-817670267/">
                                <p>Linkedin</p>
                            </Link>
                        </Magnetic>
                        <Magnetic>
                            <Link href="https://github.com/AdamAjiLangit">
                                <p>Github</p>
                            </Link>
                        </Magnetic>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
