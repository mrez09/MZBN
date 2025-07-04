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
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure,
            adipisci. Pariatur, eveniet veniam! Ducimus, aliquam tempore quasi
            assumenda magnam quo distinctio praesentium quod, voluptatum, esse
            obcaecati adipisci cumque explicabo. Hic.
          </p>

          <p className={styles.servicesTitle}>
            Service yang kami berikan antara lain:
          </p>
          <ul className={styles.serviceList}>
            <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</li>
            <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</li>
            <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</li>
            <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</li>
            <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</li>
            <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</li>
            <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</li>
            <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</li>
          </ul>
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
