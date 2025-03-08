"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { supabase } from "../../../lib/supabaseClient";

type Species = {
  id: number;
  localName: string;
  latinName: string;
  status: "Kritično ugrožena" | "Ugrožena" | "Osetljiva";
  image: string;
  dramaticQuote: string;
  story: string;
};

export default function ProtectedSpeciesDetail({ params }: { params: { id: string } }) {
  const [species, setSpecies] = useState<Species | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSpecies() {
      const { data, error } = await supabase
        .from("protected_species")
        .select("*")
        .eq("id", params.id)
        .single();
      if (error) {
        console.error("Error fetching species:", error);
      } else {
        setSpecies(data as Species);
      }
      setLoading(false);
    }
    fetchSpecies();
  }, [params.id]);

  if (loading) return <p>Učitavanje...</p>;
  if (!species) return <p>Vrsta nije pronađena.</p>;

  return (
    <div className={styles.speciesDetail}>
      <section className={styles.heroSection} style={{ backgroundImage: `url(${species.image})` }}>
        <div className={styles.heroOverlay}>
          <h1>{species.localName}</h1>
          <p>{species.latinName}</p>
        </div>
      </section>
      <div className={styles.mainContainer}>
        <article className={styles.speciesContent}>
          <div className={styles.metaData}>
            <span>Status: {species.status}</span>
          </div>
          <blockquote className={styles.dramaticQuote}>
            {species.dramaticQuote}
          </blockquote>
          <div className={styles.story} dangerouslySetInnerHTML={{ __html: species.story }} />
        </article>
        <aside className={styles.sidebar}>
          <div className={styles.backLink}>
            <Link href="/protected-species">Nazad na listu</Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
