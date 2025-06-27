import React from "react";
import styles from "./CategoryList.module.css";
import Link from "next/link";
import Image from "next/image";

const CategoryList = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Popular Categories</h1>
      <div className={styles.categories}>
        <Link
          href="blog?cat=html"
          className={`${styles.category} ${styles.html}`}
        >
          <Image
            src="/html.png"
            alt="HTML"
            width={32}
            height={32}
            className={styles.image}
          ></Image>
          HTML
        </Link>
        <Link
          href="blog?cat=css"
          className={`${styles.category} ${styles.css}`}
        >
          <Image
            src="/css.png"
            alt="CSS"
            width={32}
            height={32}
            className={styles.image}
          ></Image>
          CSS
        </Link>
        <Link
          href="blog?cat=react"
          className={`${styles.category} ${styles.react}`}
        >
          <Image
            src="/reactjs.png"
            alt="reactjs"
            width={32}
            height={32}
            className={styles.image}
          ></Image>
          React
        </Link>
        <Link href="blog?cat=ai" className={`${styles.category} ${styles.ai}`}>
          <Image
            src="/ai.png"
            alt="AI"
            width={32}
            height={32}
            className={styles.image}
          ></Image>
          AI
        </Link>
        <Link
          href="blog?cat=tech"
          className={`${styles.category} ${styles.tech}`}
        >
          <Image
            src="/tech.png"
            alt="tech"
            width={32}
            height={32}
            className={styles.image}
          ></Image>
          Tech
        </Link>
        <Link
          href="blog?cat=code"
          className={`${styles.category} ${styles.code}`}
        >
          <Image
            src="/code.png"
            alt="Coding"
            width={32}
            height={32}
            className={styles.image}
          ></Image>
          Coding
        </Link>
      </div>
    </div>
  );
};

export default CategoryList;
