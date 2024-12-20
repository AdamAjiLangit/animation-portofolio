'use client';
import styles from './style.module.scss';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import Project from './components/project';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import Image from 'next/image';
import Rounded from '../../common/RoundedButton';

export const projects = [
  {
    title: "Cozy",
    src: "/images/cozy.png",
    color: "#EFE8D3",
    url: "https://cozy-adam.vercel.app/",
    date: "14 Oct 2024 - Current"
  },
  {
    title: "Rental Website",
    src: "https://adam-personal-portofolio.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhomepage.91364ca3.png&w=1920&q=95",
    color: "#ff4d33",
    url: "https://rental-motor-kudus.vercel.app/",
    date: "25 Apr 2024 - 2 Sep 2024"
  },
  {
    title: "Health Care",
    src: "https://adam-personal-portofolio.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FhealthCare.e8ddfd80.png&w=1920&q=95",
    color: "#21242b",
    url: "https://health-care-lemon.vercel.app/",
    date: "7 Sep 2024 - 18 Sep 2024"
  },
  {
    title: "Jelajah Kalbar",
    src: "https://adam-personal-portofolio.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FJelajahKalbar.a1621753.png&w=1920&q=95",
    color: "#ffa500",
    url: "https://website-kalimantan-barat.vercel.app/",
    date: "21 Sep 2023 - 21 Nov 2023"
  },
]

const scaleAnimation = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  enter: { scale: 1, x: "-50%", y: "-50%", transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } },
  closed: { scale: 0, x: "-50%", y: "-50%", transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] } }
}

export default function Home() {
  const [modal, setModal] = useState({ active: false, index: 0 })
  const { active, index } = modal;
  const modalContainer = useRef(null);
  const cursor = useRef(null);
  const cursorLabel = useRef(null);

  let xMoveContainer = useRef(null);
  let yMoveContainer = useRef(null);
  let xMoveCursor = useRef(null);
  let yMoveCursor = useRef(null);
  let xMoveCursorLabel = useRef(null);
  let yMoveCursorLabel = useRef(null);

  useEffect(() => {
    //Move Container
    xMoveContainer.current = gsap.quickTo(modalContainer.current, "left", { duration: 0.8, ease: "power3" })
    yMoveContainer.current = gsap.quickTo(modalContainer.current, "top", { duration: 0.8, ease: "power3" })
    //Move cursor
    xMoveCursor.current = gsap.quickTo(cursor.current, "left", { duration: 0.5, ease: "power3" })
    yMoveCursor.current = gsap.quickTo(cursor.current, "top", { duration: 0.5, ease: "power3" })
    //Move cursor label
    xMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "left", { duration: 0.45, ease: "power3" })
    yMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "top", { duration: 0.45, ease: "power3" })
  }, [])

  const moveItems = (x, y) => {
    xMoveContainer.current(x)
    yMoveContainer.current(y)
    xMoveCursor.current(x)
    yMoveCursor.current(y)
    xMoveCursorLabel.current(x)
    yMoveCursorLabel.current(y)
  }
  const manageModal = (active, index, x, y) => {
    moveItems(x, y)
    setModal({ active, index })
  }

  return (
    <main onMouseMove={(e) => { moveItems(e.clientX, e.clientY) }} className={styles.projects}>
      <div className={styles.body}>
        {
          projects.map((project, index) => {
            return <Project index={index} title={project.title} manageModal={manageModal} key={index} url={project.url} date={project.date} />
          })
        }
      </div>
      <Rounded>
        <p>More work</p>
      </Rounded>
      <>
        <motion.div ref={modalContainer} variants={scaleAnimation} initial="initial" animate={active ? "enter" : "closed"} className={styles.modalContainer}>
          <div style={{ top: index * -100 + "%" }} className={styles.modalSlider}>
            {
              projects.map((project, index) => {
                const { src, color, url } = project
                return <div className={styles.modal} style={{ backgroundColor: color }} key={`modal_${index}`}>
                  <Link href="/">
                    <img
                      src={`${src}`}
                      width={300}
                      height={0}
                      alt="image"
                    />
                  </Link>
                </div>
              })
            }
          </div>
        </motion.div>
        <motion.div ref={cursor} className={styles.cursor} variants={scaleAnimation} initial="initial" animate={active ? "enter" : "closed"}></motion.div>
        <motion.div ref={cursorLabel} className={styles.cursorLabel} variants={scaleAnimation} initial="initial" animate={active ? "enter" : "closed"}>View</motion.div>
      </>
    </main>
  )
}
