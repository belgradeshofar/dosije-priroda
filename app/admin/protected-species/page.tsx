"use client";
export const dynamic = 'force-dynamic';

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import styles from "./page.module.css";

type Species = {
  id: number;
  name: string;
  latinName: string;
  status: string;
  image: string;
  dramaticQuote: string;
  story: string;
};

export default function ProtectedSpeciesAdmin() {
  const [species, setSpecies] = useState<Species[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Species>>({
    name: "",
    latinName: "",
    status: "",
    image: "",
    dramaticQuote: "",
    story: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    async function fetchSpecies() {
      const { data, error } = await supabase
        .from("protected_species")
        .select("*")
        .order("id", { ascending: false });
      if (error) {
        console.error("Error fetching species:", error);
      } else if (data) {
        setSpecies(data as Species[]);
      }
      setLoading(false);
    }
    fetchSpecies();
  }, []);

  async function handleDelete(id: number) {
    const { error } = await supabase.from("protected_species").delete().eq("id", id);
    if (error) {
      console.error("Error deleting species:", error);
    } else {
      setSpecies(species.filter((sp) => sp.id !== id));
    }
  }

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (isEditing && formData.id) {
      const { data, error } = await supabase
        .from("protected_species")
        .update({
          name: formData.name,
          latinName: formData.latinName,
          status: formData.status,
          image: formData.image,
          dramaticQuote: formData.dramaticQuote,
          story: formData.story,
        })
        .eq("id", formData.id)
        .select();
      if (error) {
        console.error("Error updating species:", JSON.stringify(error, null, 2));
      } else if (data) {
        setSpecies(
          species.map((sp) =>
            sp.id === formData.id ? ({ ...sp, ...formData } as Species) : sp
          )
        );
      }
    } else {
      const { data, error } = await supabase
        .from("protected_species")
        .insert([
          {
            name: formData.name,
            latinName: formData.latinName,
            status: formData.status,
            image: formData.image,
            dramaticQuote: formData.dramaticQuote,
            story: formData.story,
          },
        ])
        .select();
      if (error) {
        console.error("Error adding species:", JSON.stringify(error, null, 2));
      } else if (data) {
        setSpecies([...data, ...species]);
      }
    }
    setShowForm(false);
    setFormData({
      name: "",
      latinName: "",
      status: "",
      image: "",
      dramaticQuote: "",
      story: "",
    });
    setIsEditing(false);
  }

  function openEditForm(sp: Species) {
    setIsEditing(true);
    setFormData(sp);
    setShowForm(true);
  }

  function openAddForm() {
    setIsEditing(false);
    setFormData({
      name: "",
      latinName: "",
      status: "",
      image: "",
      dramaticQuote: "",
      story: "",
    });
    setShowForm(true);
  }

  if (loading) return <p>Učitavanje...</p>;

  return (
    <div className={styles.speciesAdmin}>
      <h1>Upravljanje strogo zaštićenim vrstama</h1>
      <button className={styles.addButton} onClick={openAddForm}>
        Dodaj novu vrstu
      </button>
      <table className={styles.speciesTable}>
        <thead>
          <tr>
            <th>Naziv</th>
            <th>Latinski naziv</th>
            <th>Status pretnje</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {species.map((sp) => (
            <tr key={sp.id}>
              <td>{sp.name}</td>
              <td>{sp.latinName}</td>
              <td>{sp.status}</td>
              <td>
                <button className={styles.editButton} onClick={() => openEditForm(sp)}>
                  Uredi
                </button>
                <button className={styles.deleteButton} onClick={() => handleDelete(sp.id)}>
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
            <h2>{isEditing ? "Uredi vrstu" : "Dodaj novu vrstu"}</h2>
            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                placeholder="Naziv"
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Latinski naziv"
                value={formData.latinName || ""}
                onChange={(e) => setFormData({ ...formData, latinName: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Status pretnje (npr. Kritično ugrožena)"
                value={formData.status || ""}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="URL preview slike"
                value={formData.image || ""}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Dramatičan citat"
                value={formData.dramaticQuote || ""}
                onChange={(e) => setFormData({ ...formData, dramaticQuote: e.target.value })}
                required
              />
              <textarea
                placeholder="Priča (detaljan opis)"
                value={formData.story || ""}
                onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                required
              />
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
