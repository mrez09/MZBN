import React from "react";
import styles from "./menuCategories.module.css";
import Link from "next/link";
export const dynamic = "force-dynamic";

/*const getData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/categories`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};*/

const MenuCategories = async () => {
  const data = await getData();
  return (
    <div className={styles.categoryList}>
      {/*data?.map((item) => (
        <Link
          className={`${styles.categoryItem} ${styles[item.slug]}`}
          href={`/blog?cat=${item.slug}`}
          key={item._id}
        >
          {item.title}
        </Link>
      ))*/}
    </div>
  );
};

export default MenuCategories;
