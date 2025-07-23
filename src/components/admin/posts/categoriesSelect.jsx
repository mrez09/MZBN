"use client";
import React, { useEffect, useState } from "react";
import styles from "./categoriesSelect.module.css";
import Select from "react-select";
export const dynamic = "force-dynamic";

export default function CategorySelect({ value, onChange }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        //const res = await fetch("/api/admin/categories");
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SITE_URL}/api/admin/categories`
        );
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Gagal ambil kategori:", error);
      }
    };
    fetchCategories();
  }, []);

  const options = categories.map((cat) => ({
    value: cat.slug,
    label: cat.title,
  }));

  return (
    <div className={styles.group}>
      <label htmlFor="option" className={styles.label}>
        Kategori
      </label>

      <Select
        options={options}
        value={options.find((opt) => opt.value === value)}
        onChange={(selected) => onChange({ target: { value: selected.value } })}
        styles={{
          menu: (provided) => ({
            ...provided,
            maxHeight: "150px",
            overflowY: "auto",
          }),
        }}
      />

      {/*
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
      */}
    </div>
  );
}
