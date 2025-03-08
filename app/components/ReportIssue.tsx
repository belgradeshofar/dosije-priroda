"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import styles from "./ReportIssue.module.css";

export default function ReportIssue() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.from("ecological_incidents").insert([
      { title, description, latitude: parseFloat(latitude), longitude: parseFloat(longitude) }
    ]);

    if (error) console.error(error);
    else {
      alert("Ekološki problem prijavljen!");
      setTitle("");
      setDescription("");
      setLatitude("");
      setLongitude("");
    }

    setLoading(false);
  };

  return (
    <div className={styles.reportForm}>
      <h2>🆘 Prijavi ekološki problem</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Naslov problema" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Opis problema" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="number" placeholder="Latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} required />
        <input type="number" placeholder="Longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} required />
        <button type="submit" disabled={loading}>{loading ? "Šalje se..." : "Prijavi problem"}</button>
      </form>
    </div>
  );
}
