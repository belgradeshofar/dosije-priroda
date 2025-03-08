"use client";

import dynamic from "next/dynamic";
import styles from "./page.module.css"; // ✅ Pravilno uvoženje CSS-a

// Dinamičko učitavanje mape kako bi se izbegli problemi sa SSR
const EndangeredMap = dynamic(() => import("../components/EndangeredMap"), { ssr: false });

export default function EndangeredMapPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🌍 Mapa Ugroženih Područja</h1>
      <p className={styles.subtitle}>
        Prati ekološke incidente u realnom vremenu i pomozi u njihovom rešavanju.
      </p>
      <EndangeredMap />
    </div>
  );
}
