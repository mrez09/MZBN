"use client";
import React, { useContext } from "react";
import styles from "./navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import AuthLinks from "../authLinks/AuthLinks";
import ThemeToggle from "../themeToggle/ThemeToggle";
import { ThemeContext } from "@/context/ThemeContext";

const Navbar = () => {
  const { toggle, theme } = useContext(ThemeContext);
  return (
    <div
      className={styles.container}
      style={
        theme === "dark"
          ? { backgroundColor: "#1e293b" }
          : { backgroundColor: "#f1f5f9" }
      }
    >
      <div className={styles.wrapper}>
        {/**<div className={styles.clear}>
         
        <Image src="/facebook.png" alt="facebook" width={24} height={24} />
        <Image src="/instagram.png" alt="instagram" width={24} height={24} />
        <Image src="/tiktok.png" alt="tiktok" width={24} height={24} />
        <Image src="/youtube.png" alt="youtube" width={24} height={24} />
         * 
        
      </div>
      */}
        <div className={styles.logo}>
          <Link href="/">
            <Image
              className={styles.logoImage}
              src="/Logo-MZ.png"
              alt="Logo-MreZ"
              width={250}
              height={75}
            />
          </Link>
        </div>
        <div className={styles.links}>
          <ThemeToggle />
          <Link href="/" className={styles.link}>
            Homepage
          </Link>
          <Link href="/" className={styles.link}>
            Contact
          </Link>
          <Link href="/" className={styles.link}>
            About
          </Link>
          <AuthLinks />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
