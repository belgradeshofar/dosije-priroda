"use client";

import { useState } from "react";
import styles from "./page.module.css";

type User = {
  id: number;
  name: string;
  email: string;
  role: "admin" | "urednik" | "volonter";
};

const dummyUsers: User[] = [
  { id: 1, name: "Admin Korisnik", email: "admin@example.com", role: "admin" },
  { id: 2, name: "Urednik Korisnik", email: "urednik@example.com", role: "urednik" },
];

export default function UsersAdmin() {
  const [users, setUsers] = useState(dummyUsers);

  return (
    <div className={styles.usersAdmin}>
      <h1>Upravljanje korisnicima</h1>
      <button className={styles.addButton}>Dodaj novog administratora/urednika</button>
      <table className={styles.usersTable}>
        <thead>
          <tr>
            <th>Ime</th>
            <th>Email</th>
            <th>Uloga</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
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
