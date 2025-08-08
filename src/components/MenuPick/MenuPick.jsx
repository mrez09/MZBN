import React from "react";
import styles from "./menuPick.module.css";
import Link from "next/link";
import Image from "next/image";
import WaktuUpload from "../time/waktuUpload";

const getData = async (page, cat) => {
  const waktuUnggah = new Date(); // Contoh: Waktu unggah saat ini
  //coba ulang
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/pick`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const MenuPick = async ({ withImage }) => {
  const data = await getData();

  return (
    <div className={styles.items}>
      {data?.map((item) => (
        <div className={styles.item}>
          {withImage && (
            <div className={styles.imageContainer}>
              <Link href={`/posts/${item.slug}`}>
                <Image
                  className={styles.image}
                  src={item.image}
                  alt={item.title}
                  fill
                />
              </Link>
            </div>
          )}
          <div className={styles.textContainer}>
            <Link href={`/blog?cat=${item.cat.slug}`}>
            <span className={`${styles.category} ${styles[item.cat.slug]}`}>
              {item.cat.title}
            </span>
            </Link>
            <Link href={`/posts/${item.slug}`}>
              <h3 className={styles.postTitle}>{item.title}</h3>
            </Link>
            <div className={styles.detail}>
              <span className={styles.username}>{item.user.name} - </span>
              <span className={styles.date}>
                <WaktuUpload waktuUnggah={item.createdAt} />
              </span>
              <p className={styles.date}> dilihat {item.views}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuPick;
