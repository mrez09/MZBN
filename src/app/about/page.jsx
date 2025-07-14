import React from "react";
import styles from "./about.module.css";

const PageAbout = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        {/* Text Section */}
        <div className={styles.text}>
          <h4 className={styles.subHeading}>SELAMAT DATANG DI</h4>
          <h1 className={styles.title}>
            <span className={styles.bold}>MZ</span> Learning
          </h1>
          <p className={styles.description}>
            Kami adalah platform berbagi informasi, inspirasi, dan edukasi
            seputar dunia teknologi, desain, dan gaya hidup digital.
          </p>
          <p className={styles.description}>
            Misi kami adalah menyajikan konten berkualitas dan bermanfaat bagi
            semua kalangan, mulai dari pemula hingga profesional.
          </p>
          <p className={styles.description}>
            Temukan artikel-artikel menarik, tutorial praktis, serta tips
            terkini yang siap memperkaya wawasanmu setiap hari.
          </p>
        </div>

        {/* Image Section */}
        <div className={styles.imageWrapper}>
          <img src="/building.jpg" alt="Law Library" className={styles.image} />
        </div>
      </div>
    </section>
  );
};

export default PageAbout;
