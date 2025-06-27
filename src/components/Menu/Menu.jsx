import React from "react";
import styles from "./menu.module.css";
import Link from "next/link";
import Image from "next/image";
import MenuPosts from "../MenuPosts/MenuPosts";
import MenuCategories from "../MenuCategories/MenuCategories";

const Menu = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.subtitle}>{"What's Hot"}</h2>
      <h1 className={styles.title}>Most Popular</h1>

      <MenuPosts withImage={true} />
      <h2 className={styles.subtitle}>Discover by Topic</h2>
      <h1 className={styles.title}>Categories</h1>
      <MenuCategories />

      <h2 className={styles.subtitle}>Chosen by the Editor</h2>
      <h1 className={styles.title}>Editor Pick</h1>
      <MenuPosts withImage={false} />
    </div>
  );
};

export default Menu;
