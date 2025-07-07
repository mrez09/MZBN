import React from "react";
import styles from "./blogPage.module.css";
import CardList from "@/components/cardList/CardList";
import Menu from "@/components/Menu/Menu";

const Blogpage = ({ searchParams }) => {
  const page = parseInt(searchParams.page) || 1;
  const { cat } = searchParams;
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{cat} Blogpage</h1>
      </div>

      <div className={styles.content}>
        {
          //<CardList page={page} cat={cat} />
          //<Menu />
        }
      </div>
    </div>
  );
};

export default Blogpage;
