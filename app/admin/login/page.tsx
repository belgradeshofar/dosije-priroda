"use client";
export const dynamic = 'force-dynamic';

import { supabase } from "../../../lib/supabaseClient";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      setErrorMsg(error.message);
    } else {
      // Ako je login uspešan, preusmeri na dashboard
      router.push("/admin/dashboard");
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.backgroundOverlay}></div>
      <form className={styles.loginForm} onSubmit={handleLogin}>
        <h1>Pristup Admin Panelu – Samo za čuvare prirode</h1>
        {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Lozinka"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Prijavi se</button>
      </form>
    </div>
  );
}
