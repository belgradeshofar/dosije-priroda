"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";
import styles from "./ProtectedSpecies.module.css";

type Species = {
  id: number;
  name: string;
  status: string;
  image: string;
  dramaticQuote: string;
};

export default function ProtectedSpeciesSection() {
  const [speciesList, setSpeciesList] = useState<Species[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSpecies() {
      const { data, error } = await supabase
        .from("protected_species")
        .select("id, name, status, image, dramaticQuote")
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

  return (
    <section id="protected-species" className={styles.protectedSpecies}>
      <h2>Strogo zaštićene vrste</h2>
      <div className={styles.grid}>
        {speciesList.map((item) => (
          <Link key={item.id} href={`/protected-species/${item.id}`} className={styles.cardLink}>
            <div className={styles.card}>
              <img src={item.image} alt={item.name} className={styles.image} />
              <h3 className={styles.name}>{item.name}</h3>
              <p className={styles.fact}>{item.dramaticQuote}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
