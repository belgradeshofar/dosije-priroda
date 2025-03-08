"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { supabase } from "../../lib/supabaseClient";

type Species = {
  id: number;
  localName: string;
  latinName: string;
  status: "Kritično ugrožena" | "Ugrožena" | "Osetljiva";
  image: string;
  dramaticQuote: string;
  story: string;
};

export default function ProtectedSpeciesPage() {
  const [speciesList, setSpeciesList] = useState<Species[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSpecies() {
      const { data, error } = await supabase
        .from("protected_species")
        .select("*")
        .order("id", { ascending: false });
      if (error) {
        console.error("Error fetching species:", error);
      } else if (data) {
        setSpeciesList(data as Species[]);
      }
      setLoading(false);
    }
    fetchSpecies();
  }, []);

  if (loading) return <p>Učitavanje...</p>;

  const scrollToContent = () => {
    const mainSection = document.querySelector(`.${styles.mainSection}`);
    if (mainSection) {
      mainSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={styles.protectedSpeciesPage}>
      {/* Hero sekcija */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground}>
          <video autoPlay muted loop className={styles.heroVideo}>
            <source src="protected-hero.mp4" type="video/mp4" />
            Vaš pregledač ne podržava video.
          </video>
          <div className={styles.heroOverlay}></div>
        </div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Strogo zaštićene vrste – Bitka za opstanak</h1>
          <p className={styles.heroSubtitle}>
            Svaka vrsta na ovoj listi je pred izumiranjem. Svaka priča je borba za život.
          </p>
        </div>

        <button className={styles.exploreButton} onClick={scrollToContent}>
          Istraži
        </button>

      </section>
      {/* Glavna sekcija */}
      <section className={styles.mainSection}>
        <div className={styles.speciesGrid}>
          {speciesList.map((sp) => (
            <div key={sp.id} className={styles.speciesCard}>
              <div className={styles.speciesMedia}>
                <img src={sp.image} alt={sp.localName} className={styles.speciesImage} loading="lazy" />
                <div className={styles.cardOverlay}>
                  <p className={styles.dramaticQuote}>{sp.dramaticQuote}</p>
                </div>
              </div>
              <div className={styles.speciesInfo}>
                <h2 className={styles.speciesName}>{sp.localName}</h2>
                <p className={styles.latinName}>{sp.latinName}</p>
                <p className={styles.status}>Status: {sp.status}</p>
                <p className={styles.story}>{sp.story.substring(0, 150)}...</p>
                <Link href={`/protected-species/${sp.id}`} className={styles.detailsLink}>
                  Saznaj više
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* CTA sekcija */}
      <section className={styles.ctaSection}>
        <Link href="/akcije" className={styles.ctaButton}>
          Pridruži se borbi!
        </Link>
      </section>
    </div>
  );
}
