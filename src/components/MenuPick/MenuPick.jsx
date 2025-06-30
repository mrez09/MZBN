import React from "react";
import styles from "./menuPick.module.css";
import Link from "next/link";
import Image from "next/image";
import WaktuUpload from "../time/waktuUpload";

const getData = async (page, cat) => {
  const waktuUnggah = new Date(); // Contoh: Waktu unggah saat ini
  const res = await fetch("http://localhost:3000/api/pick", {
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
      ))}
    </div>
  );
};

export default MenuPick;
