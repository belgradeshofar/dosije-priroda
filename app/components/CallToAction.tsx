"use client";

// components/CallToAction.tsx
import styles from './CallToAction.module.css';

export default function CallToAction() {
  return (
    <section id="call-to-action" className={styles.cta}>
      <div className={styles.overlay}>
        <h2>Pridruži se akciji!</h2>
        <button
          className={styles.ctaButton}
          onClick={() => (window.location.href = '/volunteer')}
        >
          Postani deo pokreta
        </button>
      </div>
    </section>
  );
}
