import React from "react";
import styles from "./menuCategories.module.css";
import Link from "next/link";

const MenuCategories = () => {
  return (
    <div className={styles.categoryList}>
      <Link
        className={`${styles.categoryItem} ${styles.html}`}
        href="/blog?cat=html"
      >
        HTML
      </Link>
      <Link
        className={`${styles.categoryItem} ${styles.css}`}
        href="/blog?cat=css"
      >
        CSS
      </Link>
      <Link
        className={`${styles.categoryItem} ${styles.react}`}
        href="/blog?cat=react"
      >
        React
      </Link>
      <Link
        className={`${styles.categoryItem} ${styles.ai}`}
        href="/blog?cat=ai"
      >
        AI
      </Link>
      <Link
        className={`${styles.categoryItem} ${styles.tech}`}
        href="/blog?cat=tech"
      >
        Tech
      </Link>
      <Link
        className={`${styles.categoryItem} ${styles.coding}`}
        href="/blog?cat=coding"
      >
        Coding
      </Link>
    </div>
  );
};

export default MenuCategories;
