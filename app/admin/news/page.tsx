"use client";

export const dynamic = 'force-dynamic';

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import styles from "./page.module.css";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";

type NewsArticle = {
  id: number;
  title: string;
  intro: string;
  image: string;
  content: string;
  date: string;
  status: "Objavljeno" | "Skica";
};

export default function NewsAdmin() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<NewsArticle>>({
    content: "",
    status: "Objavljeno",
    image: "",
    intro: ""
  });
  const [isEditing, setIsEditing] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit, ImageExtension, Underline],
    content: formData.content || "",
    onUpdate({ editor }) {
      setFormData((prev) => ({ ...prev, content: editor.getHTML() }));
    },
  });

  useEffect(() => {
    if (editor && formData.content !== undefined) {
      editor.commands.setContent(formData.content || "");
    }
  }, [formData.content, editor]);

  useEffect(() => {
    async function fetchNews() {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .order("date", { ascending: false });
      if (error) {
        console.error("Error fetching news:", error);
      } else if (data) {
        setNews(data as NewsArticle[]);
      }
      setLoading(false);
    }
    fetchNews();
  }, []);

  async function handleDelete(id: number) {
    const { error } = await supabase.from("news").delete().eq("id", id);
    if (error) {
      console.error("Error deleting article:", error);
    } else {
      setNews(news.filter((article) => article.id !== id));
    }
  }

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (isEditing && formData.id) {
      const { data, error } = await supabase
        .from("news")
        .update({
          title: formData.title,
          intro: formData.intro,
          image: formData.image,
          content: formData.content,
          status: formData.status || "Objavljeno",
          date: formData.date,
        })
        .eq("id", formData.id)
        .select();
      if (error) {
        console.error("Error updating article:", JSON.stringify(error, null, 2));
      } else if (data) {
        setNews(
          news.map((article) =>
            article.id === formData.id
              ? ({ ...article, ...formData } as NewsArticle)
              : article
          )
        );
      }
    } else {
      const { data, error } = await supabase
        .from("news")
        .insert([
          {
            title: formData.title,
            intro: formData.intro,
            image: formData.image,
            content: formData.content,
            status: formData.status || "Objavljeno",
            date: formData.date || new Date().toISOString(),
          },
        ])
        .select();
      if (error) {
        console.error("Error adding article:", JSON.stringify(error, null, 2));
      } else if (data) {
        setNews([...data, ...news]);
      }
    }
    setShowForm(false);
    setFormData({ content: "", status: "Objavljeno", image: "", intro: "" });
    setIsEditing(false);
    if (editor) {
      editor.commands.setContent("");
    }
  }

  function openEditForm(article: NewsArticle) {
    setIsEditing(true);
    setFormData(article);
    setShowForm(true);
    if (editor) {
      editor.commands.setContent(article.content || "");
    }
  }

  function openAddForm() {
    setIsEditing(false);
    setFormData({ content: "", status: "Objavljeno", image: "", intro: "" });
    setShowForm(true);
    if (editor) {
      editor.commands.setContent("");
    }
  }

  if (loading) return <p>Učitavanje...</p>;

  return (
    <div className={styles.newsAdmin}>
      <h1>Upravljanje vestima</h1>
      <button className={styles.addButton} onClick={openAddForm}>
        Dodaj novu vest
      </button>
      <table className={styles.newsTable}>
        <thead>
          <tr>
            <th>Naslov</th>
            <th>Datum objave</th>
            <th>Status</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {news.map((article) => (
            <tr key={article.id}>
              <td>{article.title}</td>
              <td>{new Date(article.date).toLocaleDateString()}</td>
              <td>{article.status}</td>
              <td>
                <button
                  className={styles.editButton}
                  onClick={() => openEditForm(article)}
                >
                  Uredi
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(article.id)}
                >
                  Obriši
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showForm && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>{isEditing ? "Uredi vest" : "Dodaj novu vest"}</h2>
            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                placeholder="Naslov"
                value={formData.title || ""}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Kratki opis (intro)"
                value={formData.intro || ""}
                onChange={(e) =>
                  setFormData({ ...formData, intro: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="URL preview slike"
                value={formData.image || ""}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                required
              />
              <input
                type="date"
                value={
                  formData.date
                    ? formData.date.split("T")[0]
                    : new Date().toISOString().split("T")[0]
                }
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                required
              />
              <div className={styles.toolbar}>
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleBold().run()}
                >
                  Bold
                </button>
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleItalic().run()}
                >
                  Italic
                </button>
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleUnderline().run()}
                >
                  Underline
                </button>
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().setParagraph().run()}
                >
                  Paragraph
                </button>
                <button
                  type="button"
                  onClick={() =>
                    editor?.chain().focus().toggleHeading({ level: 2 }).run()
                  }
                >
                  H2
                </button>
                <button
                  type="button"
                  onClick={() =>
                    editor?.chain().focus().toggleHeading({ level: 3 }).run()
                  }
                >
                  H3
                </button>
                <button
                  type="button"
                  onClick={() =>
                    editor?.chain().focus().toggleBlockquote().run()
                  }
                >
                  Quote
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const url = prompt("Unesite URL slike (za članak):");
                    if (url && editor) {
                      editor.chain().focus().setImage({ src: url }).run();
                    }
                  }}
                >
                  Insert Image (u članak)
                </button>
              </div>
              <div className={styles.editorWrapper}>
                {editor ? (
                  <EditorContent editor={editor} />
                ) : (
                  <p>Učitavanje editora...</p>
                )}
              </div>
              <select
                value={formData.status || "Objavljeno"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as "Objavljeno" | "Skica",
                  })
                }
                required
              >
                <option value="Objavljeno">Objavljeno</option>
                <option value="Skica">Skica</option>
              </select>
              <div className={styles.modalActions}>
                <button type="submit">{isEditing ? "Uredi" : "Dodaj"}</button>
                <button type="button" onClick={() => setShowForm(false)}>
                  Odustani
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
