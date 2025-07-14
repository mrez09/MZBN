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
//react toes
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Writepage = () => {
  const { data: session, status } = useSession();

  const router = useRouter();

  const [postStatus, setPostStatus] = useState("DRAFT");
  const [startDate, setStartDate] = useState(new Date());

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [isFeatured, setisFeatured] = useState(false);

  //upload animation
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [submitProgress, setSubmitProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(""); // result from imagekit

  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  //Preview Image Handle
  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setUploading(true);
    setUploadProgress(0);

    // Prepare form data
    const formData = new FormData();
    formData.append("file", selectedFile);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/upload");
    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(percent);
      }
    });

    xhr.onload = () => {
      setUploading(false);
      if (xhr.status === 200) {
        const res = JSON.parse(xhr.responseText);
        setImageUrl(res.url);
        setPreview(res.url); // show preview
        toast.success("Berhasil diUpload!");
      } else {
        toast.error("Upload gagal!");
      }
    };

    xhr.onerror = () => {
      setUploading(false);
      toast.error("Terjadi kesalahan saat mengupload!");
    };

    xhr.send(formData);
  };

  //submit handle
  const handleSubmit = async () => {
    if (!imageUrl) {
      toast.error("Tunggu gambar selesai diupload!");
      return;
    }

    setSubmitting(true);
    setSubmitProgress(0);

    //console.log({
    //title,
    //value, // ini adalah `desc`
    //slug: slugify(title),
    //catSlug,
    //file,
    //isFeatured,
    //startDate,
    //});
    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", value);
    formData.append("slug", slugify(title));
    formData.append("catSlug", catSlug);
    formData.append("isFeatured", isFeatured);
    formData.append("createdAt", startDate.toISOString());
    formData.append("imageUrl", imageUrl);
    formData.append("status", postStatus);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/posts");

    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        setSubmitProgress(percent);
      }
    });

    xhr.onload = () => {
      setSubmitting(false);
      if (xhr.status === 200) {
        toast.success("Berhasil dipublish!");
        const data = JSON.parse(xhr.responseText);
        setTimeout(() => {
          router.push(`/posts/${data.slug}`);
        }, 1500); // beri delay agar toast sempat tampil
      } else {
        //console.error("Upload failed:", xhr.responseText);
        toast.error("Gagal dipublish: " + xhr.responseText);
      }
    };

    xhr.onerror = () => {
      setSubmitting(false);
      toast.error("Terjadi kesalahan jaringan!");
    };

    xhr.send(formData);

    //const data = await res.json();
    //console.log("🧪 Post response:", data);
  };

  if (status === "loading")
    return <p className={styles.container}>Loading...</p>;
  if (!session || session.user.role !== "admin") {
    toast.error("Silakan login sebagai admin.");
    router.push("/login");
    return null;
  }
  console.log("Session:", session);
  console.log("Role:", session?.user?.role);

  return (
    <div className={styles.container}>
      <ToastContainer position="top-right" autoClose={3000} />
      {/* Publish */}
      {submitting && (
        <div className={styles.SubmitProgress}>
          <div className={styles.loading_spinner}>
            <p>Publish... {submitProgress}%</p>
            <div className={styles.progress_bar}>
              <div
                className={styles.progress}
                style={{ width: `${submitProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

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

          {/** */}
          <div className={styles.group}>
            <label htmlFor="Status" className={styles.label}>
              Status
            </label>
            <select
              className={styles.select}
              id="status"
              name="status"
              value={postStatus}
              onChange={(e) => setPostStatus(e.target.value)}
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>
        </div>
      </div>

      <div className={styles.form_group}>
        <div className={styles.row}>
          {/* Preview gambar */}
          {preview && (
            <div className={styles.preview_wrapper}>
              <img
                src={preview}
                alt="Preview"
                className={styles.preview_image}
              />
            </div>
          )}

          {/* Animasi Loading + Progress Bar */}
          {uploading && (
            <div className={styles.loading_spinner}>
              <p>Uploading... {uploadProgress}%</p>
              <div className={styles.progress_bar}>
                <div
                  className={styles.progress}
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}
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
              onChange={handleFileChange}
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
