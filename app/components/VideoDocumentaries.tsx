"use client";

import { useEffect, useState } from "react";
import styles from './VideoDocumentaries.module.css';

const documentaries = [
  { id: 1, instagramUrl: 'https://www.instagram.com/reel/DFifz0bOTw9/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
  { id: 2, instagramUrl: 'https://www.instagram.com/reel/DFf84yEuBm3/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==s' },
  { id: 3, instagramUrl: 'https://www.instagram.com/reel/DFI912YOt9e/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
];

export default function VideoDocumentaries() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Dinamički učitavamo Instagram skriptu nakon renderovanja klijenta
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.instagram.com/embed.js";
    document.body.appendChild(script);
    
  }, []);

  return (
    <section id="video-documentaries" className={styles.documentaries}>
      <h2 className={styles.heading}>🎥 Na terenu:</h2>
      <div className={styles.grid}>
        {documentaries.map((doc) => (
          <div key={doc.id} className={styles.videoContainer}>
            {isClient && (
              <blockquote
                className="instagram-media"
                data-instgrm-permalink={doc.instagramUrl}
                data-instgrm-version="14"
              ></blockquote>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
