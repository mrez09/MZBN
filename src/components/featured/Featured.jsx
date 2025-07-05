import React from "react";
import styles from "./featured.module.css";
import Image from "next/image";
import Link from "next/link";

const getData = async (page, cat) => {
  const waktuUnggah = new Date(); // Contoh: Waktu unggah saat ini
  const res = await fetch("http://localhost:3000/api/featured", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const Featured = async () => {
  const data = await getData();

  return (
    <>
      {data?.map((item) => (
        <div className={styles.container} key={item.id}>
          <h1 className={styles.title}>
            <b>Hey, Iam MreZ Here!</b> Discover my stories and creative ideas.
          </h1>

          <div className={styles.post}>
            <div className={styles.imgContainer}>
              <Image className={styles.image} src={item.image} alt="" fill />
            </div>
            <div className={styles.textContainer}>
              <h1 className={styles.postTitle}>{item.title}</h1>
              <span className={`${styles.categoryItem} ${styles[item.slug]}`}>
                {item.cat.title}
              </span>
              <div
                className={styles.description}
                dangerouslySetInnerHTML={{
                  __html: item.desc.substring(0, 150),
                }}
              />
              <Link href={`/posts/${item.slug}`}>
                <button className={styles.button}>Read More</button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Featured;
