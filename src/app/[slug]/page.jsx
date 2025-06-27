import React from "react";
import styles from "./singlePage.module.css";
import Image from "next/image";
import Menu from "@/components/Menu/Menu";
import Comments from "@/components/comments/Comments";

const SinglePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h1>
          <div className={styles.user}>
            <div className={styles.userImageContainer}>
              <Image
                src="/samp1.png"
                alt="sample 1"
                fill
                className={styles.avatar}
              />
            </div>
            <div className={styles.userTextContainer}>
              <span className={styles.username}>MreZ</span>
              <span className={styles.date}>20-06-2025</span>
            </div>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image src="/samp1.png" alt="" fill className={styles.image} />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div className={styles.description}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
              quidem veniam alias ratione vero numquam quae rem, consequuntur,
              voluptates quod possimus doloremque non atque blanditiis deleniti
              labore eveniet culpa iusto!
            </p>
            <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Necessitatibus eius perferendis obcaecati, velit dicta beatae
              consequatur minus laboriosam ratione incidunt in quo deserunt quos
              eaque corporis magnam autem sint fugit?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
              totam maxime libero magnam impedit eius itaque ipsam! Voluptatibus
              doloremque vel mollitia corporis labore atque officia quia, animi
              numquam illo quasi!
            </p>
          </div>
          <div className={styles.comment}>
            <Comments />
          </div>
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default SinglePage;
