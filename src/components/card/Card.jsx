import React from "react";
import styles from "./card.module.css";
import Image from "next/image";
import Link from "next/link";

const Card = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image className={styles.image} src="/samp1.png" alt="Sample 1" fill />
      </div>
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>20-02-2025 - </span>
          <span className={styles.category}>Website</span>
        </div>
        <Link className={styles.desc} href="/">
          <h1>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</h1>
        </Link>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
          aperiam a quod alias, excepturi incidunt modi reiciendis neque
          officiis repellat vero earum quisquam impedit. Eius quos voluptatem
          libero quod similique?
        </p>
        <Link className={styles.link} href="/">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Card;
