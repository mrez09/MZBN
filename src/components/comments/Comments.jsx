import React from "react";
import styles from "./comments.module.css";
import Image from "next/image";

const Comments = () => {
  const status = "authenticated";
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comments</h1>
      {status === "authenticated" ? (
        <div className={styles.write}>
          <textarea placeholder="Write a Comment..." className={styles.input} />
          <button className={styles.button}>Send</button>
        </div>
      ) : (
        <Link href="/login">Login to Write a Comment</Link>
      )}
      <div className={styles.comments}>
        <div className={styles.comment}>
          <div className={styles.user}>
            <Image
              className={styles.image}
              src="/samp1.png"
              alt="sample 1"
              width={50}
              height={50}
            />
            <div className={styles.userInfo}>
              <span>Mrez</span>
              <span>20-06-2025</span>
            </div>
          </div>
          <p className={styles.desc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis,
            libero sed. Labore accusamus alias, fugit nobis incidunt dolorem
            ullam ipsam libero! Nisi velit dignissimos maiores atque ut
            quibusdam fugiat accusamus.
          </p>
        </div>

        <div className={styles.comment}>
          <div className={styles.user}>
            <Image
              className={styles.image}
              src="/samp1.png"
              alt="sample 1"
              width={50}
              height={50}
            />
            <div className={styles.userInfo}>
              <span>Mrez</span>
              <span>20-06-2025</span>
            </div>
          </div>
          <p className={styles.desc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis,
            libero sed. Labore accusamus alias, fugit nobis incidunt dolorem
            ullam ipsam libero! Nisi velit dignissimos maiores atque ut
            quibusdam fugiat accusamus.
          </p>
        </div>

        <div className={styles.comment}>
          <div className={styles.user}>
            <Image
              className={styles.image}
              src="/samp1.png"
              alt="sample 1"
              width={50}
              height={50}
            />
            <div className={styles.userInfo}>
              <span>Mrez</span>
              <span>20-06-2025</span>
            </div>
          </div>
          <p className={styles.desc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis,
            libero sed. Labore accusamus alias, fugit nobis incidunt dolorem
            ullam ipsam libero! Nisi velit dignissimos maiores atque ut
            quibusdam fugiat accusamus.
          </p>
        </div>

        <div className={styles.comment}>
          <div className={styles.user}>
            <Image
              className={styles.image}
              src="/samp1.png"
              alt="sample 1"
              width={50}
              height={50}
            />
            <div className={styles.userInfo}>
              <span>Mrez</span>
              <span>20-06-2025</span>
            </div>
          </div>
          <p className={styles.desc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis,
            libero sed. Labore accusamus alias, fugit nobis incidunt dolorem
            ullam ipsam libero! Nisi velit dignissimos maiores atque ut
            quibusdam fugiat accusamus.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Comments;
