import React from "react";
import styles from "./menuPosts.module.css";
import Link from "next/link";
import Image from "next/image";

const MenuPosts = ({ withImage }) => {
  return (
    <div className={styles.items}>
      <Link className={styles.item} href="/">
        {withImage && (
          <div className={styles.imageContainer}>
            <Image
              className={styles.image}
              src="/samp1.png"
              alt="sample 1"
              fill
            />
          </div>
        )}
        <div className={styles.textContainer}>
          <span className={`${styles.category} ${styles.html}`}>HTML</span>
          <h3 className={styles.postTitle}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </h3>
          <div className={styles.detail}>
            <span className={styles.username}>MreZ - </span>
            <span className={styles.date}>20-06-2025</span>
          </div>
        </div>
      </Link>
      <Link className={styles.item} href="/">
        {withImage && (
          <div className={styles.imageContainer}>
            <Image
              className={styles.image}
              src="/samp1.png"
              alt="sample 1"
              fill
            />
          </div>
        )}
        <div className={styles.textContainer}>
          <span className={`${styles.category} ${styles.tech}`}>Tech</span>
          <h3 className={styles.postTitle}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </h3>
          <div className={styles.detail}>
            <span className={styles.username}>MreZ - </span>
            <span className={styles.date}>20-06-2025</span>
          </div>
        </div>
      </Link>
      <Link className={styles.item} href="/">
        {withImage && (
          <div className={styles.imageContainer}>
            <Image
              className={styles.image}
              src="/samp1.png"
              alt="sample 1"
              fill
            />
          </div>
        )}
        <div className={styles.textContainer}>
          <span className={`${styles.category} ${styles.react}`}>React</span>
          <h3 className={styles.postTitle}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </h3>
          <div className={styles.detail}>
            <span className={styles.username}>MreZ - </span>
            <span className={styles.date}>20-06-2025</span>
          </div>
        </div>
      </Link>
      <Link className={styles.item} href="/">
        {withImage && (
          <div className={styles.imageContainer}>
            <Image
              className={styles.image}
              src="/samp1.png"
              alt="sample 1"
              fill
            />
          </div>
        )}

        <div className={styles.textContainer}>
          <span className={`${styles.category} ${styles.coding}`}>Coding</span>
          <h3 className={styles.postTitle}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </h3>
          <div className={styles.detail}>
            <span className={styles.username}>MreZ - </span>
            <span className={styles.date}>20-06-2025</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MenuPosts;
