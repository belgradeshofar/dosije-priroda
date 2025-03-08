"use client";

import React from 'react';
import styles from './SupportButton.module.css';

export default function SupportButton() {
  const handleClick = () => {
    window.location.href = '/support';
  };

  return (
    <button className={styles.supportButton} onClick={handleClick}>
      Podrži nas
    </button>
  );
}
