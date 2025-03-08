"use client";

// components/HeroSection.tsx
import { useEffect, useState } from 'react';
import styles from './HeroSection.module.css';

const getBackgroundMedia = (hour: number) => {
  // Menjamo pozadinski video u zavisnosti od doba dana
  if (hour >= 5 && hour < 12) {
    return { type: 'video', src: '/morning.mp4' };
  } else if (hour >= 12 && hour < 18) {
    return { type: 'video', src: '/day.mp4' };
  } else if (hour >= 18 && hour < 21) {
    return { type: 'video', src: '/sunset.mp4' };
  } else {
    return { type: 'video', src: '/night.mp4' };
  }
};

export default function HeroSection() {
  const [media, setMedia] = useState({ type: 'video', src: '/day.mp4' });

  useEffect(() => {
    const hour = new Date().getHours();
    const bgMedia = getBackgroundMedia(hour);
    setMedia(bgMedia);
  }, []);

  const scrollToContent = () => {
    const element = document.getElementById('main-content');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.hero}>
      {media.type === 'video' ? (
        <video className={styles.backgroundVideo} autoPlay muted loop>
          <source src={media.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div
          className={styles.backgroundImage}
          style={{ backgroundImage: `url(${media.src})` }}
        ></div>
      )}
      <div className={styles.overlay}>
        <h1 className={styles.title}>DOSIJE PRIRODA – ČUVARI ŽIVOG SVETA</h1>
        <p className={styles.mission}>
          Istražujemo, otkrivamo i branimo prirodu Srbije i sveta. Pridruži nam se u borbi za očuvanje najvrednijeg blaga – života na Zemlji.
        </p>
        <button className={styles.exploreButton} onClick={scrollToContent}>
          Istraži
        </button>
      </div>
    </section>
  );
}
