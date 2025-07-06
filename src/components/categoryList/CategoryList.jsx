import React from "react";
//import styles from "./CategoryList.module.css";
import styles from "./categoryList.module.css";
import Link from "next/link";
import Image from "next/image";
import prisma from "@/utils/connect";

const getData = async () => {
  const categories = await prisma.category.findMany({
    take: 6,
    orderBy: {
      id: "desc",
    },
  });
  return categories;
};

const CategoryList = async () => {
  const data = await getData();
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Popular Categories</h1>
      <div className={styles.categories}>
        {data?.map((item) => (
          <Link
            //href="blog?cat=html"
            href={`/blog?cat=${item.slug}`}
            className={`${styles.category} ${styles[item.slug]}`}
            key={item._id}
          >
            <Image
              src={item.img}
              alt={item.title}
              width={32}
              height={32}
              className={styles.image}
            ></Image>
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
