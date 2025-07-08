"use client";
import dynamic from "next/dynamic";
//export const dynamic = "force-dynamic"; // ✅ FIX Next build error on document
import React, { useEffect, useState } from "react";
import styles from "./write.module.css";
import { FaFile, FaImage, FaPlus, FaVideo, FaYoutube } from "react-icons/fa6";
//import ReactQuill from "react-quill";
import CategorySelect from "@/components/admin/posts/categoriesSelect";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

//date picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Writepage = () => {
  const { status } = useSession();
  const [startDate, setStartDate] = useState(new Date());

  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [isFeatured, setisFeatured] = useState(false);

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleSubmit = async () => {
    console.log({
      title,
      value, // ini adalah `desc`
      slug: slugify(title),
      catSlug,
      file,
      isFeatured,
      startDate,
    });
    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", value);
    formData.append("slug", slugify(title));
    formData.append("catSlug", catSlug);
    formData.append("isFeatured", isFeatured);
    formData.append("createdAt", startDate.toISOString());
    if (file) formData.append("file", file);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("🧪 Post response:", data);

      if (res.ok) {
        router.push(`/posts/${data.slug}`);
      } else {
        console.error("🚨 Error creating post:", data.message);
      }
    } catch (err) {
      console.error("Submit failed:", err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form_title}>
        <label htmlFor="title" className={styles.label}>
          Title
        </label>
        <input
          type="text"
          placeholder="Write Title..."
          className={styles.title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className={styles.form_group}>
        <div className={styles.row}>
          {/* IS FEATURED DIPINDAH KE PALING KIRI */}
          <div className={styles.group}>
            <label htmlFor="isFeatured" className={styles.label}>
              Is Featured
            </label>
            <select
              className={styles.select}
              id="isFeatured"
              name="isFeatured"
              value={isFeatured}
              onChange={(e) => setisFeatured(e.target.value === "true")}
            >
              <option value="" disabled>
                -- Pilih Status --
              </option>
              <option value="true">Rekomendasi</option>
              <option value="false">Tidak direkomendasikan</option>
            </select>
          </div>

          {/* KATEGORI */}

          <CategorySelect onChange={(e) => setCatSlug(e.target.value)} />

          {/* TANGGAL */}
          <div className={styles.group}>
            <label htmlFor="date" className={styles.label}>
              Select Date
            </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy-MM-dd"
              className={styles.input}
            />
          </div>
        </div>
      </div>
      <div className={styles.editor}>
        <button className={styles.button} onClick={() => setOpen(!open)}>
          <FaPlus size={25} className={styles.FaButton} />
        </button>
        {open && (
          <div className={styles.add}>
            <input
              type="file"
              id="image"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
            />
            <label htmlFor="image" className={styles.addButton}>
              <FaImage size={20} className={styles.FaButton} />
            </label>
            <button className={styles.addButton}>
              <FaFile size={20} className={styles.FaButton} />
            </button>
            <button className={styles.addButton}>
              <FaVideo size={20} className={styles.FaButton} />
            </button>
          </div>
        )}
        <ReactQuill
          className={styles.textArea}
          theme="snow"
          value={value}
          onChange={setValue}
          placeholder="Write Something..."
        />
      </div>
      <button className={styles.publish} onClick={handleSubmit}>
        Publish
      </button>
    </div>
  );
};

export default Writepage;
