"use client";

import styles from './NatureMysteries.module.css';

export default function NatureMysteries() {
  return (
    <section id="nature-mysteries" className={styles.mysteries}>
      <img 
        src="homoljska-potajnica.jpg" 
        alt="Homoljska potajnica" 
        className={styles.background}
      />
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h2>  Misterije prirode 🏔️ Homoljska potajnica </h2>
        <p>
          Duboko u srcu Homolja, skrivena od pogleda, nalazi se Homoljska potajnica – 
          tajanstveni izvor iz koga izbija voda samo u određenim periodima godine.
        </p>
        <p>
          Meštani vekovima veruju da potajnica ima natprirodna svojstva, dok 
          naučnici istražuju njen jedinstveni hidrološki fenomen. 
        </p>
        <p>
    
        </p>
      </div>
    </section>
  );
}
