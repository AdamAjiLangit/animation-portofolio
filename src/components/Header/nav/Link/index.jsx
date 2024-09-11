import styles from './style.module.scss';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { slide, scale } from '../../animation';

export default function Index({ data, isActive, setSelectedIndicator }) {

  const { title, href, index } = data;

  return (
    <motion.div
      className={styles.link}
      onMouseEnter={() => { setSelectedIndicator(href) }}
      custom={index}
      variants={slide}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <motion.div
        variants={scale}
        animate={isActive ? "open" : "closed"}
        className={styles.indicator}>
      </motion.div>
      <motion.div
        className={styles.link}
        whileHover={{ x: 20 }}
      >
        <AnimatePresence mode='wait'>
          <Link href={href}>{title}</Link>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}