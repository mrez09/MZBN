import React from "react";
import styles from "./blogPage.module.css";
import CardList from "@/components/cardList/CardList";
import Menu from "@/components/Menu/Menu";

const Blogpage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Blogpage</h1>
      </div>

      <div className={styles.content}>
        <CardList />
        <Menu />
      </div>
    </div>
  );
};

export default Blogpage;
