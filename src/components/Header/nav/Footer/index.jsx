import { RevealLinks } from '../../linkAnimation';
import styles from './style.module.scss';

export default function index() {
  return (
    <div className={styles.footer}>
        <RevealLinks />
    </div>
  )
}
