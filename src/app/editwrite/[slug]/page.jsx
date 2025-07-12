"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dynamic from "next/dynamic";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./write.module.css";
import { FaFile, FaImage, FaPlus, FaVideo, FaYoutube } from "react-icons/fa6";
import CategorySelect from "@/components/admin/posts/categoriesSelect";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const EditWrite = () => {
  const { slug } = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${slug}`);
        if (!res.ok) throw new Error("Gagal fetch post");

        const data = await res.json();
        setTitle(data.title);
        setDesc(data.desc);
        setCatSlug(data.catSlug || ""); // ini yang dikirim ke CategorySelect
        setIsFeatured(data.isFeatured);
        setStartDate(new Date(data.createdAt));
        console.log("Set kategori:", data.catSlug); // tambahkan setelah fetch
        console.log("Current state:", catSlug);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    console.log("✅ catSlug ter-update:", catSlug);
    if (slug) fetchPost();
  }, [slug]);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/posts/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          desc,
          catSlug,
          isFeatured,
          createdAt: startDate,
        }),
      });

      if (res.ok) {
        toast.success("Post updated successfully!");
        router.push(`/posts/${slug}`);
      } else {
        toast.error("Failed to update post");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer position="top-right" autoClose={3000} />
      <h1>Edit Post</h1>

      <div className={styles.form_title}>
        <label htmlFor="title" className={styles.label}>
          Title
        </label>
        <input
          type="text"
          value={title}
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
              onChange={(e) => setIsFeatured(e.target.value === "true")}
            >
              <option value="" disabled>
                -- Pilih Status --
              </option>
              <option value="true">Rekomendasi</option>
              <option value="false">Tidak direkomendasikan</option>
            </select>
          </div>

          {/* KATEGORI */}

          <CategorySelect
            key={catSlug}
            value={catSlug}
            onChange={(e) => setCatSlug(e.target.value)}
          />

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
            <input type="file" id="image" style={{ display: "none" }} />
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
          value={desc}
          onChange={setDesc}
          placeholder="Write Something..."
        />
      </div>

      <button className={styles.publish} onChange={handleUpdate}>
        Publish
      </button>
    </div>
  );
};

export default EditWrite;
