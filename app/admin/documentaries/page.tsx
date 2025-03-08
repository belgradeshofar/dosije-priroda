"use client";

import { useState } from "react";
import styles from "./page.module.css";

type Documentary = {
  id: number;
  title: string;
  duration: string;
  status: "Objavljeno" | "Skica";
};

const dummyDocs: Documentary[] = [
  { id: 1, title: "Dokumentarac 1", duration: "1h 30min", status: "Objavljeno" },
  { id: 2, title: "Dokumentarac 2", duration: "1h 45min", status: "Skica" },
  // Dodaj više dummy podataka
];

export default function DocumentariesAdmin() {
  const [docs, setDocs] = useState(dummyDocs);

  return (
    <div className={styles.docsAdmin}>
      <h1>Upravljanje dokumentarcima</h1>
      <button className={styles.addButton}>Dodaj novi dokumentarac</button>
      <table className={styles.docsTable}>
        <thead>
          <tr>
            <th>Naslov</th>
            <th>Trajanje</th>
            <th>Status</th>
            <th>Pregledi</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {docs.map((doc) => (
            <tr key={doc.id}>
              <td>{doc.title}</td>
              <td>{doc.duration}</td>
              <td>{doc.status}</td>
              <td>{/* Dodaj statičke podatke o pregledima */}</td>
              <td>
                <button className={styles.editButton}>Uredi</button>
                <button className={styles.deleteButton}>Obriši</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
