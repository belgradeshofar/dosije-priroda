"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

export default function SupportPage() {
  // Stanje za "Moje obećanje prirodi"
  const [pledge, setPledge] = useState("");
  const [thankYou, setThankYou] = useState("");

  const handlePledge = () => {
    if (pledge.trim() !== "") {
      setThankYou(`Hvala! Tvoje obećanje: "${pledge}" inspiriše nas!`);
    }
  };

  return (
    <div className={styles.supportPage}>
      {/* 1. Hero sekcija – Moćna ekološka poruka */}
      <section className={styles.heroSection}>
        <video autoPlay muted loop className={styles.heroVideo}>
          <source src="/videos/support-hero.mp4" type="video/mp4" />
          Vaš pregledač ne podržava video.
        </video>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Planeta treba tvoju pomoć – DAJMO PRIRODI GLAS!
          </h1>
          <p className={styles.heroSubtitle}>
            Svaka donacija, svaka akcija, svaki glas – pravi razliku. Učini nešto danas.
          </p>
          <button className={styles.supportNowButton}>
            Podrži nas odmah
          </button>
        </div>
      </section>

      {/* 2. Opcije podrške – Svi mogu pomoći! */}
      <section className={styles.optionsSection}>
        <h2>Opcije podrške</h2>
        <div className={styles.optionsGrid}>
          <div className={styles.optionCard}>
            <h3>Doniraj za Dosije Priroda 💚</h3>
            <button className={styles.optionButton}>Doniraj sada</button>
          </div>
          <div className={styles.optionCard}>
            <h3>Postani ekološki heroj 🌍</h3>
            <button className={styles.optionButton}>Prijavi se za volontiranje</button>
          </div>
          <div className={styles.optionCard}>
            <h3>Širi istinu 📢</h3>
            <button className={styles.optionButton}>Podeli kampanju</button>
          </div>
        </div>
      </section>

      {/* 3. Transparentnost – Gde ide tvoja pomoć? */}
      <section className={styles.transparencySection}>
        <h2>Gde ide tvoja pomoć?</h2>
        <div className={styles.fundsDiagram}>
          <img src="/images/funds-diagram.png" alt="Dijagram trošenja sredstava" loading="lazy" />
        </div>
        <p className={styles.fundsInfo}>
          50% na terenska istraživanja, 30% na podizanje svesti, 20% na dokumentarne projekte.
        </p>
        <Link href="/reports" className={styles.reportsButton}>
          Pogledaj izveštaje
        </Link>
      </section>

      {/* 4. Priče ljudi koji su pomogli */}
      <section className={styles.storiesSection}>
        <h2>Priče ljudi koji su pomogli</h2>
        <div className={styles.testimonials}>
          <div className={styles.testimonialCard}>
            <img src="/images/testimonial1.jpg" alt="Donator 1" loading="lazy" />
            <p>"Doniranjem sam osetio da mogu promeniti svet!"</p>
          </div>
          <div className={styles.testimonialCard}>
            <img src="/images/testimonial2.jpg" alt="Donator 2" loading="lazy" />
            <p>"Volontiranje mi je dalo snagu da verujem u bolje sutra."</p>
          </div>
          <div className={styles.testimonialCard}>
            <img src="/images/testimonial3.jpg" alt="Donator 3" loading="lazy" />
            <p>"Moje obećanje prirodi me inspiriše svakodnevno."</p>
          </div>
        </div>
        <div className={styles.pledgeSection}>
          <h3>Moje obećanje prirodi</h3>
          <input
            type="text"
            placeholder="Šta ćeš učiniti za prirodu?"
            value={pledge}
            onChange={(e) => setPledge(e.target.value)}
          />
          <button onClick={handlePledge} className={styles.pledgeButton}>
            Obećavam!
          </button>
          {thankYou && <p className={styles.thankYouMessage}>{thankYou}</p>}
        </div>
      </section>

      {/* 5. CTA sekcija – Masovni pokret! */}
      <section className={styles.ctaSection}>
        <h2>NE MOŽEŠ DONIRATI? NIJE PROBLEM!</h2>
        <div className={styles.ctaOptions}>
          <button className={styles.ctaButton}>Podeli ovu kampanju</button>
          <button className={styles.ctaButton}>Prijavi ekološki problem</button>
          <button className={styles.ctaButton}>Napravi svoju mini-kampanju</button>
        </div>
      </section>
    </div>
  );
}
