// RichEditorWithBubble.jsx
"use client";

import React, { useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import Quill from "quill";
import styles from "./RichEditor.module.css";

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

const RichEditorWithBubble = ({ value, onChange }) => {
  const quillRef = useRef(null);
  const bubbleRef = useRef(null);

  useEffect(() => {
    const quill = quillRef.current?.getEditor();
    if (!quill) return;

    const bubble = bubbleRef.current;

    const handleSelectionChange = (range) => {
      if (!range || range.length === 0) {
        bubble.style.display = "none";
        return;
      }
      const bounds = quill.getBounds(range);
      bubble.style.display = "flex";
      bubble.style.left = `${bounds.left}px`;
      bubble.style.top = `${bounds.top - 10}px`;
    };

    quill.on("selection-change", handleSelectionChange);
    return () => quill.off("selection-change", handleSelectionChange);
  }, []);

  useEffect(() => {
    const quill = quillRef.current?.getEditor();
    if (!quill) return;

    const bubble = bubbleRef.current;
    if (!bubble) return;

    const formatButtons = bubble.querySelectorAll("[data-format]");
    formatButtons.forEach((btn) => {
      const format = btn.getAttribute("data-format");
      btn.addEventListener("click", () => {
        quill.format(format, !quill.getFormat()[format]);
      });
    });

    // Tambahkan ini di useEffect kedua
    const headerButtons = bubble.querySelectorAll(".ql-header");
    headerButtons.forEach((btn) => {
      const value = btn.getAttribute("value");
      btn.addEventListener("click", () => {
        const level = value === "" ? false : parseInt(value);
        quill.format("header", level);
      });
    });
    //baris baru
    // ✅ Tangani tombol BR
    const brButton = bubble.querySelector('[data-command="insert-br"]');
    if (brButton) {
      brButton.addEventListener("click", () => {
        const range = quill.getSelection(true);
        if (range) {
          quill.insertText(range.index, "\n", "user");
          quill.setSelection(range.index + 1, 0);
        }
      });
    }

    // Override Enter key
    //quill.keyboard.addBinding(
    //{ key: 13 },
    // {
    //   handler: function (range, context) {
    //     const currentPosition = range.index;
    //     quill.insertText(currentPosition, "\n");
    //     quill.setSelection(currentPosition + 1);
    //   },
    // }
    //);
  }, []);

  return (
    <>
      <ReactQuill
        ref={quillRef}
        className={`${styles.ql_toolbar}} ${styles.bubble_toolbar}`}
        theme="snow"
        modules={modules}
        value={value}
        onChange={onChange}
        placeholder="Write something awesome..."
        style={{ minHeight: "200px" }}
      />
      <div
        ref={bubbleRef}
        style={{
          display: "none",
          position: "absolute",
          zIndex: 10,
          background: "white",
          border: "3px solid #4682a9",
          borderRadius: "5px",
        }}
      >
        <span className={styles.ql_formats}>
          <button className="ql-header btn_ql" value="1">
            H1
          </button>
          <button className="ql-header btn_ql" value="2">
            H2
          </button>
          <button className="ql-header btn_ql" value="">
            P
          </button>
          <button className={styles.btn_ql} data-format="bold">
            B
          </button>
          <button
            className={styles.btn_ql}
            data-format="italic"
            style={{ fontStyle: "italic" }}
          >
            I
          </button>
          <button
            className={styles.btn_ql}
            data-format="underline"
            style={{ textDecoration: "underline" }}
          >
            U
          </button>
          <button
            className={styles.btn_ql}
            data-format="blockquote"
            style={{ textDecoration: "blockquote" }}
          >
            ""
          </button>
          <button className={styles.btn_ql} data-command="insert-br">
            Enter
          </button>
        </span>
      </div>
    </>
  );
};

export default RichEditorWithBubble;
