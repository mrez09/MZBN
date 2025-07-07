"use client";
import React, { useState } from "react";
import styles from "./comments.module.css";
import Image from "next/image";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import Link from "next/link";
export const dynamic = "force-dynamic";

const fetcher = async (url) => {
  const res = await fetch(url);

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }

  return data;
};

const Comments = ({ postSlug }) => {
  const { status } = useSession();

  const { data, mutate, isLoading } = useSWR(
    `/api/comments?postSlug=${postSlug}`,
    fetcher,
    { revalidateOnMount: false }
  );

  const [desc, setDesc] = useState("");

  const handleSubmit = async () => {
    if (!desc.trim()) return; // Cegah kirim kosong

    await fetch(`/api/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // penting!
      },
      body: JSON.stringify({ desc, postSlug }),
    });
    setDesc(""); // Kosongkan form setelah submit
    mutate();
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comments</h1>
      {status === "authenticated" ? (
        <div className={styles.write}>
          <textarea
            placeholder="write a comment..."
            className={styles.input}
            onChange={(e) => setDesc(e.target.value)}
          />
          <button className={styles.button} onClick={handleSubmit}>
            Send
          </button>
        </div>
      ) : (
        <Link href="/login">Login to write a comment</Link>
      )}
      <div className={styles.comments}>
        {isLoading
          ? "loading"
          : data?.map((item) => (
              <div className={styles.comment} key={item._id}>
                <div className={styles.user}>
                  {item?.user?.image && (
                    <Image
                      className={styles.image}
                      src={item.user.image}
                      alt="sample 1"
                      width={50}
                      height={50}
                    />
                  )}
                  <div className={styles.userInfo}>
                    <span className={styles.username}>{item.user.name}</span>
                    <span className={styles.date}>
                      {new Date(item.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
                <p className={styles.desc}>{item.desc}</p>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Comments;
