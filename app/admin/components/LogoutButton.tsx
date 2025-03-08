"use client";
import { useRouter } from "next/navigation";
import styles from "./LogoutButton.module.css";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    // Briši token iz localStorage-a
    localStorage.removeItem("adminToken");
    // Preusmeri na login stranicu
    router.push("/admin/login");
  };

  return (
    <button className={styles.logoutButton} onClick={handleLogout}>
      Odjavi se
    </button>
  );
}
