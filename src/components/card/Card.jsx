import React from "react";
import styles from "./card.module.css";
import Image from "next/image";
import Link from "next/link";

const Card = ({ key, item }) => {
  return (
    <div className={styles.container} key={key}>
      <div className={styles.imageContainer}>
        <Image className={styles.image} src="/samp1.png" alt="Sample 1" fill />
      </div>
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>
            {item.createdAt.substring(0, 10)} -{" "}
          </span>
          <Link className={styles.desc} href={`/blog?cat=${item.catSlug}`}>
            <span className={styles.category}>{item.catSlug}</span>
          </Link>
        </div>
        <Link className={styles.desc} href={`/${item.title}`}>
          <h1>{item.title}</h1>
        </Link>
        <div
          className={styles.desc}
          dangerouslySetInnerHTML={{ __html: item?.desc.substring(0, 150) }}
        />
        <Link className={styles.link} href={`/${item.title}`}>
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Card;
