"use client";

import { useState } from "react";
import styles from "./page.module.css";

type Donation = {
  id: number;
  donorName: string;
  amount: number;
  status: "uspešno" | "neuspešno";
};

const dummyDonations: Donation[] = [
  { id: 1, donorName: "Anonimno", amount: 50, status: "uspešno" },
  { id: 2, donorName: "Marko", amount: 100, status: "uspešno" },
  // Dodaj više dummy podataka
];

export default function DonationsAdmin() {
  const [donations, setDonations] = useState(dummyDonations);

  return (
    <div className={styles.donationsAdmin}>
      <h1>Upravljanje donacijama</h1>
      <table className={styles.donationsTable}>
        <thead>
          <tr>
            <th>Ime donatora</th>
            <th>Iznos</th>
            <th>Status transakcije</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((d) => (
            <tr key={d.id}>
              <td>{d.donorName}</td>
              <td>${d.amount}</td>
              <td>{d.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.donationsChart}>
        {/* Placeholder za grafikon sa mesečnim donacijama */}
        <p>Grafikon mesečnih donacija (placeholder)</p>
      </div>
    </div>
  );
}
