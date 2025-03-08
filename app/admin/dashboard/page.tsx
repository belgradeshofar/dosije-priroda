"use client";

import Link from "next/link";
import styles from "./page.module.css";

export default function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>Dosije Priroda Admin Panel</h1>
      </header>
      <nav className={styles.adminNav}>
        <ul>
          <li><Link href="/admin/news">Vesti</Link></li>
          <li><Link href="/admin/documentaries">Dokumentarci</Link></li>
          <li><Link href="/admin/protected-species">Strogo zaštićene vrste</Link></li>
          <li><Link href="/admin/users">Korisnici</Link></li>
          <li><Link href="/admin/donations">Donacije</Link></li>
          <li><Link href="/admin/login">Logout</Link></li>
        </ul>
      </nav>
      <main className={styles.main}>
        <section className={styles.introSection}>
          <p>
            Odaberite sekciju iz navigacije za upravljanje sadržajem sajta.
          </p>
        </section>
      </main>
    </div>
  );
}
