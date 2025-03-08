"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient"; // Povezivanje sa Supabase
import styles from "./page.module.css";

export default function ContactPage() {
  // Stanja za kontakt formu
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Prijava ekološkog problema");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const { data, error } = await supabase
      .from("contact_messages")
      .insert([{ name, email, subject, message }]);

    if (error) {
      setError("Došlo je do greške. Pokušajte ponovo.");
      console.error("Greška prilikom slanja poruke:", error);
    } else {
      setSuccess(true);
      setName("");
      setEmail("");
      setSubject("Prijava ekološkog problema");
      setMessage("");
    }
    setLoading(false);
  };

  const handleLiveChat = () => {
    alert("Otvaranje live chata...");
  };

  return (
    <div className={styles.contactPage}>
      {/* 1. Hero sekcija */}
      <section className={styles.heroSection}>
        <video autoPlay muted loop className={styles.heroVideo}>
          <source src="contact-hero.mp4" type="video/mp4" />
          Vaš pregledač ne podržava video.
        </video>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Poveži se sa nama</h1>
          <p className={styles.heroSubtitle}>
            Tvoj glas može da napravi razliku. Kontaktiraj nas i postani deo pokreta.
          </p>
        </div>
      </section>

      {/* 2. Kontakt forma */}
      <section className={styles.formSection}>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.contactForm}>
            <input
              type="text"
              placeholder="Ime i prezime"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <select value={subject} onChange={(e) => setSubject(e.target.value)} required>
              <option value="Prijava ekološkog problema">Prijava ekološkog problema</option>
              <option value="Saradnja">Saradnja</option>
              <option value="Mediji">Mediji</option>
              <option value="Opšta pitanja">Opšta pitanja</option>
            </select>
            <textarea
              placeholder="Tekst poruke"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <button type="submit" className={styles.sendButton} disabled={loading}>
              {loading ? "Šalje se..." : "Pošalji poruku"}
            </button>
            {success && <p className={styles.successMessage}>Poruka je uspešno poslata!</p>}
            {error && <p className={styles.errorMessage}>{error}</p>}
          </form>
          <button className={styles.liveChatButton} onClick={handleLiveChat}>
            Razgovaraj sa nama uživo
          </button>
        </div>
      </section>

      {/* 3. Prikaz tima Dosije Priroda */}
      <section className={styles.teamSection}>
        <h2>Upoznaj naš tim</h2>
        <div className={styles.teamGrid}>
          {["Ana", "Marko", "Jelena", "Petar"].map((member, index) => (
            <div key={index} className={styles.teamCard}>
              <img
                src={`/images/team${index + 1}.jpg`}
                alt={member}
                className={styles.teamImage}
              />
              <h3>{member}</h3>
              <p>Stručnjak za ekologiju</p>
              <Link href={`/contact?to=${member}`} className={styles.teamMessageButton}>
                Pošalji poruku
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Mapa – Gde se nalazimo u ekosistemu */}
      <section className={styles.mapSection}>
        <h2>Gde se nalazimo u ekosistemu</h2>
        <div className={styles.mapContainer}>
          <img src="/images/map-placeholder.jpg" alt="Interaktivna mapa" className={styles.mapImage} />
          <button className={styles.reportButton}>Prijavi problem na mapi!</button>
        </div>
      </section>

      {/* 5. Društvene mreže */}
      <section className={styles.socialSection}>
        <h2>Prati nas i pomozi nam da širimo istinu o prirodi!</h2>
        <div className={styles.socialIcons}>
          <Link href="https://facebook.com" target="_blank">
            <img src="/images/facebook-icon.png" alt="Facebook" />
          </Link>
          <Link href="https://twitter.com" target="_blank">
            <img src="/images/twitter-icon.png" alt="Twitter" />
          </Link>
          <Link href="https://instagram.com" target="_blank">
            <img src="/images/instagram-icon.png" alt="Instagram" />
          </Link>
        </div>
      </section>
    </div>
  );
}
