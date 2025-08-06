"use client";
import { useContext, useEffect, useRef, useState } from "react";
import style from "../../not-found/not-found.module.css";
import { ThemeContext } from "@/context/ThemeContext";
import Link from "next/link";
// app/not-found.js
export default function NotFound() {
  const [clouds, setClouds] = useState([]);
  const { toggle, theme } = useContext(ThemeContext);
  const fullText = [..."  Error 404: Content not found... "];
  const [text, setText] = useState("");
  let index = 0;

  const starsRef = useRef(null);
  //stars

  useEffect(() => {
    if (!starsRef.current) return;

    // Kosongkan bintang sebelumnya (penting saat theme switch)
    starsRef.current.innerHTML = "";

    for (let i = 0; i < 60; i++) {
      const star = document.createElement("div");
      star.className = style.star;
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.animationDuration = `${1 + Math.random() * 3}s`;
      starsRef.current.appendChild(star);
    }
  }, [theme]); // rerun saat theme berubah

  //clouds
  useEffect(() => {
    const generateClouds = () => {
      const newClouds = Array.from({ length: 10 }, (_, i) => ({
        id: i,
        top: Math.random() * 80 + "%",
        left: Math.random() * 100 + "%",
        size: Math.random() * 100 + 50, // px
        duration: Math.random() * 30 + 30, // s
      }));
      setClouds(newClouds);
    };

    generateClouds();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setText((prev) => prev + fullText[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={style.container}>
      {theme === "dark" && <div ref={starsRef} className={style.stars}></div>}
      {theme === "light" && (
        <div className={style.cloudsContainer}>
          {clouds.map((cloud) => (
            <img
              key={cloud.id}
              src="/awan.png"
              alt="Cloud"
              className={style.cloud}
              style={{
                top: cloud.top,
                left: cloud.left,
                width: `${cloud.size}px`,
                animationDuration: `${cloud.duration}s`,
              }}
            />
          ))}
        </div>
      )}
      <h1 className={style.typing}>{text}</h1>
      <Link href="/" className={style.backLink}>
        ← Back to Home
      </Link>
    </div>
  );
}
