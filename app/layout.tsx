// app/layout.tsx
import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import styles from "./layout.module.css";
import SupportButton from "./components/SupportButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dosije Priroda",
  description: "Čuvari živog sveta",
};

// Napomena: StrictMode nije ovde korišćen kako bi se izbegle greške u vezi sa ReactDOM.findDOMNode (potrebno za react-quill).
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sr">
      <body className={inter.className}>
        <header className={styles.header}>
          <div className={styles.logo}>
            <Link href="/">Dosije Priroda</Link>
          </div>
          <nav className={styles.nav}>
            <ul>
              <li>
                <Link href="/">Početna</Link>
              </li>
              <li>
                <Link href="/news">Tekstovi</Link>
              </li>
              <li>
  <Link href="https://www.instagram.com/dosijepriroda/" target="_blank" rel="noopener noreferrer">
  🎥 Na terenu
  </Link>
</li>

              <li>
                <Link href="/protected-species">Strogo zaštićene vrste</Link>
              </li>
              <li>
                <Link href="/contact">Kontakt</Link>
              </li>
            </ul>
          </nav>
          <div className={styles.support}>
            <SupportButton />
          </div>
        </header>
        {children}
        <footer className={styles.footer}>
          <p>Dosije Priroda – Glas prirode u digitalnom svetu.</p>
          <div className={styles.social}>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              Facebook
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              Twitter
            </a>
            <a href="mailto:info@dosijepriroda.com">Email</a>
          </div>
          <p>&copy; {new Date().getFullYear()} Dosije Priroda</p>
        </footer>
      </body>
    </html>
  );
}
