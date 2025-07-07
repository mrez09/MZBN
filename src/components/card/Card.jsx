import React from "react";
import styles from "./card.module.css";
import Image from "next/image";
import Link from "next/link";
import WaktuUpload from "../time/waktuUpload";
export const dynamic = "force-dynamic";

const baseURL = "https://ik.imagekit.io/uv0kfnhyiv/";
const Card = ({ key, item }) => {
  const waktuUnggah = new Date(); // Contoh: Waktu unggah saat ini
  return (
    <div className={styles.container} key={key}>
      <div className={styles.imageContainer}>
        {item.image && (
          <Image
            className={styles.image}
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
          />
        )}
      </div>
      <div className={styles.textContainer}>
        <Link href={`/posts/${item.slug}`}>
          <h1>{item.title}</h1>
        </Link>
        <div className={styles.detail}>
          <span className={styles.date}>
            <WaktuUpload waktuUnggah={item.createdAt} /> -{" "}
          </span>

          <Link className={styles.desc} href={`/blog?cat=${item.catSlug}`}>
            <span className={styles.category}>{item.catSlug}</span>
          </Link>
        </div>
        <div
          className={styles.desc}
          dangerouslySetInnerHTML={{ __html: item?.desc.substring(0, 150) }}
        />
        <Link className={styles.link} href={`/posts/${item.slug}`}>
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Card;
