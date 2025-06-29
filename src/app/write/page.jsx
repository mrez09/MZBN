"use client";
import React, { useState } from "react";
import styles from "./write.module.css";
import Image from "next/image";
import { FaFile, FaImage, FaPlus, FaVideo, FaYoutube } from "react-icons/fa6";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Writepage = () => {
  const { status } = useSession();

  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  //console.log(data, status);
  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (status === "authenticated") {
    router.push("/");
  }

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Write Title... "
        className={styles.input}
      />
      <div className={styles.editor}>
        <button className={styles.button} onClick={() => setOpen(!open)}>
          <FaPlus alt="" size={25} className={styles.FaButton} />
        </button>
        {open && (
          <div className={styles.add}>
            <button className={styles.addButton}>
              <FaPlus alt="Plus" size={20} className={styles.FaButton} />
            </button>
            <button className={styles.addButton}>
              <FaFile alt="File" size={20} className={styles.FaButton} />
            </button>
            <button className={styles.addButton}>
              <FaVideo alt="Video" size={20} className={styles.FaButton} />
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
      <button className={styles.publish}>Publish</button>
    </div>
  );
};

export default Writepage;
