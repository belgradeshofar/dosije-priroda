"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";
import styles from "./LatestStories.module.css";

type Article = {
  id: number;
  title: string;
  intro: string;
  image: string;
};

export default function LatestStories() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      const { data, error } = await supabase
        .from("news")
        .select("id, title, intro, image")
        .order("date", { ascending: false })
        .limit(3);
      if (error) {
        console.error("Error fetching articles:", error);
      } else if (data) {
        setArticles(data as Article[]);
      }
      setLoading(false);
    }
    fetchArticles();
  }, []);

  if (loading) return <p>Učitavanje...</p>;

  return (
    <section id="latest-stories" className={styles.latestStories}>
      <h2>Najnovije priče</h2>
      <div className={styles.grid}>
        {articles.map((article) => (
          <Link key={article.id} href={`/news/${article.id}`} className={styles.card}>
            <div className={styles.imageContainer}>
              <img src={article.image} alt={article.title} className={styles.image} />
            </div>
            <h3 className={styles.cardTitle}>{article.title}</h3>
            <p className={styles.cardDescription}>{article.intro}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
