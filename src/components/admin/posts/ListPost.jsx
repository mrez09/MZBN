"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
export const dynamic = "force-dynamic";

const ListPost = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      //const res = await fetch("/api/admin/posts");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/admin/posts`
      );
      const data = await res.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h2>Daftar Post</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.slug}`}>
              <b>{post.title}</b>
            </Link>
            <p>{post.desc?.slice(0, 100)}...</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListPost;
