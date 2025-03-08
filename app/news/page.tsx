"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./news.module.css";
import { supabase } from "../../lib/supabaseClient";

type Article = {
  id: number;
  title: string;
  intro: string;
  image: string;
  category: string;
  date: string;
  status: "Objavljeno" | "Skica";
  content: string;
};

const categories = ["Svi", "Zagađenje", "Zaštićene vrste", "Istraživanja"];

function HeroSection() {
  const scrollToNews = () => {
    const newsSection = document.getElementById("news-section");
    if (newsSection) {
      newsSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section className={styles.hero}>
      <div className={styles.heroOverlay}>
        <h1>Najnovije priče iz sveta prirode</h1>
        <p>
          Nezavisno istražujemo ekološke izazove i otkrivamo priče koje drugi ignorišu.
        </p>
        <button onClick={scrollToNews} className={styles.heroButton}>
          Čitaj priče
        </button>
      </div>
    </section>
  );
}

function FilterBar({
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
}: {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}) {
  return (
    <div className={styles.filterBar}>
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Pretraga vesti..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}

function NewsCard({ article }: { article: Article }) {
  let categoryColor = "";
  switch (article.category) {
    case "Zagađenje":
      categoryColor = "#e74c3c";
      break;
    case "Zaštićene vrste":
      categoryColor = "#27ae60";
      break;
    case "Istraživanja":
      categoryColor = "#2980b9";
      break;
    default:
      categoryColor = "#333";
  }
  return (
    <div className={styles.newsCard}>
      <div className={styles.imageWrapper}>
        <img src={article.image} alt={article.title} className={styles.cardImage} />
      </div>
      <div className={styles.cardContent}>
        <span className={styles.category} style={{ backgroundColor: categoryColor }}>
          {article.category}
        </span>
        <h3>{article.title}</h3>
        <p>{article.intro}</p>
        <Link href={`/news/${article.id}`} className={styles.readMoreButton}>
          Pročitaj više
        </Link>
      </div>
    </div>
  );
}

function NewsGrid({ articles }: { articles: Article[] }) {
  return (
    <div className={styles.newsGrid}>
      {articles.map((article) => (
        <NewsCard key={article.id} article={article} />
      ))}
    </div>
  );
}

function Sidebar() {
  // Možeš učitati popularne vesti iz Supabase ili koristiti dummy podatke
  const popularNews: Article[] = [
    { id: 101, title: "Popularna vest 1", image: "/images/popular1.jpg", intro: "", category: "Zagađenje", date: "", status:"Objavljeno", content:"" },
    { id: 102, title: "Popularna vest 2", image: "/images/popular2.jpg", intro: "", category: "Zaštićene vrste", date:"", status:"Objavljeno", content:"" },
    { id: 103, title: "Popularna vest 3", image: "/images/popular3.jpg", intro: "", category: "Istraživanja", date:"", status:"Objavljeno", content:"" },
  ];
  const dailyTip = "Danas: Sačuvajte prirodu – reciklirajte, štedite energiju i podržite lokalne inicijative!";
  return (
    <aside className={styles.sidebar}>
      <div className={styles.popularNews}>
        <h3>Najčitanije vesti</h3>
        {popularNews.map((news) => (
          <div key={news.id} className={styles.popularItem}>
            <img src={news.image} alt={news.title} className={styles.popularImage} />
            <Link href={`/news/${news.id}`}>{news.title}</Link>
          </div>
        ))}
      </div>
      <div className={styles.dailyTip}>
        <h3>Ekološki savet dana</h3>
        <p>{dailyTip}</p>
      </div>
    </aside>
  );
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  return (
    <div className={styles.pagination}>
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        Prethodna
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={page === currentPage ? styles.activePage : ""}
        >
          {page}
        </button>
      ))}
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        Sledeća
      </button>
    </div>
  );
}

export default function NewsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Svi");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Učitaj članke iz Supabase
  useEffect(() => {
    async function fetchArticles() {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .order("date", { ascending: false });
      if (error) {
        console.error("Error fetching articles:", error);
      } else if (data) {
        setArticles(data as Article[]);
      }
      setLoading(false);
    }
    fetchArticles();
  }, []);

  // Filtriranje članaka
  const filteredArticles = articles.filter((article) => {
    const matchesCategory = selectedCategory === "Svi" || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.intro.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Paginacija – 4 članka po stranici
  const articlesPerPage = 4;
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + articlesPerPage);

  if (loading) return <p>Učitavanje...</p>;

  return (
    <div className={styles.newsPage}>
      <HeroSection />
      <div id="news-section" className={styles.mainContent}>
        <FilterBar
          selectedCategory={selectedCategory}
          onCategoryChange={(cat) => {
            setSelectedCategory(cat);
            setCurrentPage(1);
          }}
          searchQuery={searchQuery}
          onSearchChange={(query) => {
            setSearchQuery(query);
            setCurrentPage(1);
          }}
        />
        <div className={styles.contentWrapper}>
          <div className={styles.articles}>
            <NewsGrid articles={paginatedArticles} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
