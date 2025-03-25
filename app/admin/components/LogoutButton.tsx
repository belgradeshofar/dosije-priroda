"use client";
import { useRouter } from "next/navigation";
import styles from "./LogoutButton.module.css";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  };

  return (
    <button className={styles.logoutButton} onClick={handleLogout}>
      Odjavi se
    </button>
  );
}
