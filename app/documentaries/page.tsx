"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./documentaries.module.css";

// Definicija tipa za dokumentarac
type Documentary = {
  id: number;
  title: string;
  description: string;
  videoUrl: string; // URL video zapisa (može biti YouTube embed URL ili lokalni put)
  category: string;
  releaseDate: string;
};

// Dummy podaci – prilagodi po potrebi
const dummyDocumentaries: Documentary[] = [
  {
    id: 1,
    title: "Ekološki dokumentarac 1",
    description: "Novi film o ekološkim izazovima koji menja svet.",
    videoUrl: "/videos/doc1.mp4",
    category: "Najnoviji",
    releaseDate: "2023-04-01",
  },
  {
    id: 2,
    title: "Ekološki dokumentarac 2",
    description: "Ekskluzivni pogled na borbu za prirodu.",
    videoUrl: "/videos/doc2.mp4",
    category: "Ekskluzivni",
    releaseDate: "2023-03-25",
  },
  {
    id: 3,
    title: "Ekološki dokumentarac 3",
    description: "Priča o šokantnim ekološkim problemima.",
    videoUrl: "/videos/doc3.mp4",
    category: "Šokantni ekološki problemi",
    releaseDate: "2023-03-10",
  },
  // Dodaj još dokumentaraca po potrebi
];

export default function DocumentariesPage() {
  // Opcionalno: filtriranje ili sortiranje po kategoriji, najgledanijim itd.
  const [documentaries, setDocumentaries] = useState<Documentary[]>([]);

  // Simuliramo učitavanje podataka
  useEffect(() => {
    setDocumentaries(dummyDocumentaries);
  }, []);

  // Izračunaj ukupan broj filmova (za mali overlay)
  const totalFilms = documentaries.length;

  // Funkcija za "Gledaj sada" – otvara prvi dokumentarac
  const handleWatchNow = () => {
    if (documentaries.length > 0) {
      window.location.href = `/documentaries/${documentaries[0].id}`;
    }
  };

  return (
    <div className={styles.documentariesPage}>
      {/* Hero sekcija */}
      <section className={styles.heroSection}>
        <video autoPlay muted loop className={styles.heroVideo}>
          <source src="/videos/hero-trailer.mp4" type="video/mp4" />
          Vaš pregledač ne podržava video.
        </video>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Ekološki dokumentarci koji menjaju svet
          </h1>
          <p className={styles.heroSubtitle}>
            Pogledaj istraživanja Dosije Priroda i druge šokantne priče o prirodi.
          </p>
          <button className={styles.watchNowButton} onClick={handleWatchNow}>
            Gledaj sada
          </button>
          <div className={styles.filmCountOverlay}>
            {totalFilms} filmova
          </div>
        </div>
      </section>

      {/* Grid prikaz dokumentaraca */}
      <section className={styles.gridSection}>
        <div className={styles.documentariesGrid}>
          {documentaries.map((doc) => (
            <div key={doc.id} className={styles.docCard}>
              <div className={styles.videoWrapper}>
                <video
                  src={doc.videoUrl}
                  muted
                  loop
                  playsInline
                  className={styles.docVideo}
                  preload="metadata"
                />
                <div className={styles.cardOverlay}>
                  <p className={styles.docDescription}>{doc.description}</p>
                </div>
              </div>
              <div className={styles.cardContent}>
                <h2 className={styles.docTitle}>{doc.title}</h2>
                <Link href={`/documentaries/${doc.id}`} className={styles.moreButton}>
                  Pogledaj više
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
