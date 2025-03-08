"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { supabase } from "../../../lib/supabaseClient";

type Article = {
  id: number;
  title: string;
  intro: string;
  content: string;
  image: string;
  category: string;
  date: string;
  status: "Objavljeno" | "Skica";
  author: string;
};

export default function ArticlePage({ params }: { params: { id: string } }) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<{ name: string; comment: string }[]>([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    async function fetchArticle() {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .eq("id", params.id)
        .single();
      if (error) {
        console.error("Error fetching article:", error);
      } else {
        setArticle(data as Article);
      }
      setLoading(false);
    }
    fetchArticle();
  }, [params.id]);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && comment) {
      setComments([...comments, { name, comment }]);
      setName("");
      setComment("");
    }
  };

  if (loading) return <p>Učitavanje...</p>;
  if (!article) return <div>Članak nije pronađen.</div>;

  return (
    <div className={styles.articlePage}>
      <section
        className={styles.heroSection}
        style={{ backgroundImage: `url(${article.image})` }}
      >
        <div className={styles.heroOverlay}>
          <h1>{article.title}</h1>
        </div>
      </section>
      <div className={styles.mainContainer}>
        <article className={styles.articleContent}>
          <div className={styles.metaData}>
            <span>{new Date(article.date).toLocaleDateString()}</span>
            <span className={styles.metaCategory}>{article.category}</span>
            <span>Autor: {article.author}</span>
          </div>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>
        <aside className={styles.sidebar}>
          <div className={styles.relatedNews}>
            <h3>Povezane vesti</h3>
            {/* Implementiraj logiku za povezane vesti, npr. na osnovu kategorije */}
            <p>Nema povezanih vesti.</p>
          </div>
          <div className={styles.ecoTip}>
            <h3>Ekološki savet dana</h3>
            <p>Štedite energiju isključivanjem uređaja kada ih ne koristite.</p>
          </div>
          <div className={styles.shareButtons}>
            <h3>Delite</h3>
            <div className={styles.socialButtons}>
              <Link
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  typeof window !== "undefined" ? window.location.href : ""
                )}`}
                target="_blank"
              >
                Facebook
              </Link>
              <Link
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  typeof window !== "undefined" ? window.location.href : ""
                )}`}
                target="_blank"
              >
                Twitter
              </Link>
              <Link href="https://www.instagram.com/" target="_blank">
                Instagram
              </Link>
            </div>
          </div>
        </aside>
      </div>
      <section className={styles.commentsSection}>
        <h3>Komentari</h3>
        <form onSubmit={handleCommentSubmit} className={styles.commentForm}>
          <input
            type="text"
            placeholder="Vaše ime"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
              <strong>{c.name}</strong>
              <p>{c.comment}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
