"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

// Tip za dokumentarac
type Documentary = {
  id: number;
  title: string;
  duration: string;
  releaseDate: string;
  authors: string;
  synopsis: string;
  videoUrl: string;
  category: string;
};

// Dummy podaci za dokumentarce (koristi isti niz kao i na listing strani ili prilagodi)
const dummyDocumentaries: Documentary[] = [
  {
    id: 1,
    title: "Ekološki dokumentarac 1",
    duration: "1h 30min",
    releaseDate: "2023-04-01",
    authors: "Ekipa Dosije Priroda",
    synopsis: "Ovaj film istražuje ključne ekološke izazove našeg vremena i prikazuje šokantne činjenice koje menjaju svet.",
    videoUrl: "/videos/doc1.mp4",
    category: "Najnoviji",
  },
  {
    id: 2,
    title: "Ekološki dokumentarac 2",
    duration: "1h 45min",
    releaseDate: "2023-03-25",
    authors: "Ekipa Dosije Priroda",
    synopsis: "Ekskluzivni dokumentarac koji otkriva skrivene aspekte borbe za prirodu.",
    videoUrl: "/videos/doc2.mp4",
    category: "Ekskluzivni",
  },
  // Dodaj još dummy podataka po potrebi
];

export default function DocumentaryPage({ params }: { params: { id: string } }) {
  const docId = parseInt(params.id);
  const documentary = dummyDocumentaries.find((d) => d.id === docId);

  if (!documentary) {
    return <div>Dokumentarac nije pronađen.</div>;
  }

  // Dummy povezani filmovi: uzmi 2-3 dokumentarca iz iste kategorije (osim trenutnog)
  const relatedDocs = dummyDocumentaries.filter(
    (d) => d.category === documentary.category && d.id !== documentary.id
  ).slice(0, 3);

  // Stanje za komentare (jednostavna implementacija)
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<string[]>([]);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([...comments, comment.trim()]);
      setComment("");
    }
  };

  return (
    <div className={styles.documentaryPage}>
      {/* Video plejer */}
      <section className={styles.videoSection}>
        <video controls className={styles.videoPlayer}>
          <source src={documentary.videoUrl} type="video/mp4" />
          Vaš pregledač ne podržava video.
        </video>
        <div className={styles.videoOverlay}>
          <div className={styles.metaInfo}>
            <span>{documentary.duration}</span>
            <span>{new Date(documentary.releaseDate).toLocaleDateString()}</span>
            <span>{documentary.authors}</span>
          </div>
        </div>
      </section>

      {/* Opis filma */}
      <section className={styles.descriptionSection}>
        <h1>{documentary.title}</h1>
        <p className={styles.synopsis}>{documentary.synopsis}</p>
        <div className={styles.interactiveButtons}>
          <button className={styles.donateButton} onClick={() => alert("Donacija...")}>
            Podrži ovaj film
          </button>
          <button className={styles.watchLaterButton} onClick={() => alert("Gledaj kasnije!")}>
            Gledaj kasnije
          </button>
          <div className={styles.shareSection}>
            <span>Delite:</span>
            <Link href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              typeof window !== "undefined" ? window.location.href : ""
            )}`} target="_blank">
              Facebook
            </Link>
            <Link href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
              typeof window !== "undefined" ? window.location.href : ""
            )}`} target="_blank">
              Twitter
            </Link>
            <Link href="https://www.instagram.com/" target="_blank">
              Instagram
            </Link>
          </div>
        </div>
      </section>

      {/* Rejting – jednostavan primer */}
      <section className={styles.ratingSection}>
        <h3>Oceni film:</h3>
        <div className={styles.stars}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} className={styles.star} onClick={() => alert(`Ocena: ${star}`)}>
              ★
            </span>
          ))}
        </div>
      </section>

      {/* Komentari */}
      <section className={styles.commentsSection}>
        <h3>Komentari</h3>
        <form onSubmit={handleCommentSubmit} className={styles.commentForm}>
          <textarea
            placeholder="Ostavite komentar..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
          <button type="submit">Pošalji komentar</button>
        </form>
        <div className={styles.commentsList}>
          {comments.map((c, index) => (
            <div key={index} className={styles.commentItem}>
              <p>{c}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Povezani filmovi */}
      <section className={styles.relatedSection}>
        <h3>Povezani filmovi</h3>
        <div className={styles.relatedGrid}>
          {relatedDocs.map((doc) => (
            <div key={doc.id} className={styles.relatedCard}>
              <video
                src={doc.videoUrl}
                muted
                loop
                playsInline
                className={styles.relatedVideo}
              />
              <Link href={`/documentaries/${doc.id}`} className={styles.relatedLink}>
                {doc.title}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
