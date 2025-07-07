"use client";
import React, { useEffect, useState } from "react";
import styles from "./featured.module.css";
import Image from "next/image";
import Link from "next/link";

const Featured = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/featured`)
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error("Fetch error:", err));
  }, []);

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
