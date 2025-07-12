"use client";
import React, { useEffect, useState } from "react";
import styles from "./categoriesSelect.module.css";

export default function CategorySelect({ value, onChange }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/admin/categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Gagal ambil kategori:", error);
      }
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
        id="catSlug"
        name="catSlug"
        value={value || ""}
        onChange={onChange}
      >
        <option value="" disabled>
          -- Pilih Kategori --
        </option>
        {categories.map((cat) => (
          <option key={cat.slug} value={cat.slug}>
            {cat.title}
          </option>
        ))}
      </select>
    </div>
  );
}
