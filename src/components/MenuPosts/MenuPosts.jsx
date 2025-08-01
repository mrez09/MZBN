import React from "react";
import styles from "./menuPosts.module.css";
import Link from "next/link";
import Image from "next/image";
import WaktuUpload from "../time/waktuUpload";

const getData = async (page, cat) => {
  const waktuUnggah = new Date(); // Contoh: Waktu unggah saat ini
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/popular`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const MenuPosts = async ({ withImage }) => {
  const data = await getData();

  return (
    <div className={styles.items}>
      {data?.map((item) => (
        <div key={item.id}>
          <Link className={styles.item} href="/">
            {withImage && (
              <div className={styles.imageContainer}>
                <Image
                  className={styles.image}
                  src={item.image}
                  alt={item.title}
                  fill
                />
              </div>
            )}
            <div className={styles.textContainer}>
              <span className={`${styles.category} ${styles[item.cat.slug]}`}>
                {item.cat.title}
              </span>
              <h3 className={styles.postTitle}>{item.title}</h3>
              <div className={styles.detail}>
                <span className={styles.username}>{item.user.name} - </span>
                <span className={styles.date}>
                  <WaktuUpload waktuUnggah={item.createdAt} />
                </span>
                <p className={styles.date}> dilihat {item.views}</p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MenuPosts;
