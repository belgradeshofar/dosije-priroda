"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LogoutButton from "./components/LogoutButton";
import styles from "./page.module.css";

export default function AdminPanel() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
    } else {
      setIsLoggedIn(true);
    }
  }, [router]);

  if (!isLoggedIn) {
    return <p>Učitavanje...</p>;
  }

  return (
    <div className={styles.adminPanel}>
      <header className={styles.header}>
        <div className={styles.topBar}>
          <h1>Dosije Priroda Admin Panel</h1>
          <LogoutButton />
        </div>
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link href="/admin/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/admin/news">Vesti</Link>
            </li>
            <li>
              <Link href="/admin/documentaries">Dokumentarci</Link>
            </li>
            <li>
              <Link href="/admin/protected-species">Strogo zaštićene vrste</Link>
            </li>
            <li>
              <Link href="/admin/users">Korisnici</Link>
            </li>
            <li>
              <Link href="/admin/donations">Donacije</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className={styles.main}>
        <section className={styles.dashboardIntro}>
          <p>
            Dobrodošli u admin panel Dosije Priroda. Odaberite sekciju iz navigacije za upravljanje sadržajem sajta.
          </p>
        </section>
      </main>
    </div>
  );
}
