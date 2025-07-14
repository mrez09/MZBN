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
import "quill/dist/quill.core.css"; // penting untuk ikon default
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import Quill from "quill";
import RichEditorWithBubble from "@/components/admin/posts/RichEditorWithBubble";

const EditWrite = () => {
  const { slug } = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [status, setPostStatus] = useState("DRAFT");
  const [startDate, setStartDate] = useState(new Date());

  const [loading, setLoading] = useState(false);
  //upload animation
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [submitProgress, setSubmitProgress] = useState(0);

  //image update
  const [imageUrl, setImageUrl] = useState(""); // result from imagekit
  const [imageFileId, setImageFileId] = useState("");
  const [oldImageFileId, setOldImageFileId] = useState("");

  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

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
        setPostStatus(data.status);
        setStartDate(new Date(data.createdAt));
        setImageUrl(data.image || "");
        setOldImageFileId(data.imageFileId || "");
        console.log("Set kategori:", data.catSlug); // tambahkan setelah fetch
        console.log("Current state:", catSlug);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    console.log("✅ catSlug ter-update:", catSlug);
    if (slug) fetchPost();
  }, [slug]);

  //Preview Image Handle
  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setUploading(true);
    setUploadProgress(0);

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
        setImageFileId(res.fileId); // ✅ simpan ID baru
        setPreview(res.url);
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

  const handleUpdate = async () => {
    setLoading(true);
    setSubmitting(true);
    setSubmitProgress(0);

    const xhr = new XMLHttpRequest();
    xhr.open("PUT", `/api/posts/${slug}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        setSubmitProgress(percent); // ✅ tampilkan progress
      }
    });

    xhr.onload = () => {
      setLoading(false);
      setSubmitting(false);
      if (xhr.status === 200) {
        toast.success("Post updated successfully!");
        router.push(`/posts/${slug}`);
      } else {
        toast.error("Failed to update post");
      }
    };

    xhr.onerror = () => {
      setLoading(false);
      setSubmitting(false);
      toast.error("Something went wrong");
    };

    const jsonBody = JSON.stringify({
      title,
      desc,
      catSlug,
      isFeatured,
      status: status,
      createdAt: startDate,
      image: imageUrl,
      imageFileId,
    });

    xhr.send(jsonBody);
  };

  //react quil
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      ["blockquote", "code-block"],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  return (
    <div className={styles.container}>
      <ToastContainer position="top-right" autoClose={3000} />
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
            className={styles.select_max}
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

          {/**Status */}
          <div className={styles.group}>
            <label htmlFor="status" className={styles.label}>
              Status
            </label>
            <select
              className={styles.select}
              id="status"
              name="status"
              value={status}
              onChange={(e) => setPostStatus(e.target.value)}
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>
        </div>
      </div>

      {/**Preview Gambar */}
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
              style={{ display: "none" }}
              onChange={handleFileChange}
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
        <RichEditorWithBubble value={desc} onChange={setDesc} />
      </div>

      <button className={styles.publish} onClick={handleUpdate}>
        Update
      </button>
    </div>
  );
};

export default EditWrite;
