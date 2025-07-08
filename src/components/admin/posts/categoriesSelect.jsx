"use client";
import { useEffect, useState } from "react";
import styles from "./categoriesSelect.module.css";

export default function CategorySelect({ onChange }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  return (
    <div className={styles.group}>
      <label htmlFor="option" className={styles.label}>
        Kategori
      </label>
      <select
        className={styles.select}
        id="category"
        name="catSlug"
        onChange={onChange}
      >
        <option value="" disabled>
          -- Pilih Kategori --
        </option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.slug}>
            {cat.title}
          </option>
        ))}
      </select>
    </div>
  );
}
