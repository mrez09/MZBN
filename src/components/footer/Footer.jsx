"use client";
import React, { useContext } from "react";
import styles from "./footer.module.css";
import Image from "next/image";
import Link from "next/link";
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaMapPin,
  FaPhone,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { RiMapPinFill } from "react-icons/ri";
import { ThemeContext } from "@/context/ThemeContext";

const Footer = () => {
  const { toggle, theme } = useContext(ThemeContext);
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.logo}>
          <Image
            className={styles.logoImage}
            src="/Logo-MreZ.png"
            alt="MreZ Learning"
            width={50}
            height={50}
          />
        </div>
        <p className={styles.desc}>
          Kami adalah platform berbagi informasi, inspirasi, dan edukasi seputar
          dunia teknologi, desain, dan gaya hidup digital. <br />
          Motto Kami : "Coding joyfully, learning daily."
        </p>

        <div className={styles.icons}>
          <span
            className={`${styles.socialIcons} ${
              theme === "dark" ? styles.dark : styles.light
            }`}
          >
            <FaFacebook className={styles.FaSocial} />
          </span>
          <span
            className={`${styles.socialIcons} ${
              theme === "dark" ? styles.dark : styles.light
            }`}
          >
            <FaInstagram className={styles.FaSocial} />
          </span>
          <span
            className={`${styles.socialIcons} ${
              theme === "dark" ? styles.dark : styles.light
            }`}
          >
            <FaTiktok className={styles.FaSocial} />
          </span>
          <span
            className={`${styles.socialIcons} ${
              theme === "dark" ? styles.dark : styles.light
            }`}
          >
            <FaYoutube className={styles.FaSocial} />
          </span>
          <span
            className={`${styles.socialIcons} ${
              theme === "dark" ? styles.dark : styles.light
            }`}
          >
            <FaTwitter className={styles.FaSocial} />
          </span>
        </div>
      </div>
      <div className={styles.links}>
        <div className={styles.list}>
          <span className={styles.listTitle}>Navigation</span>
          <Link href="/">HomePage</Link>
          <Link href="https://mrizkies.web.id">Portofolio</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Support</span>
          <Link href="/">Help Center</Link>
          <Link href="/">FAQ</Link>
          <Link href="/">Privacy Policy</Link>
          <Link href="/">Terms of Service</Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Contact</span>

          <div className={styles.address}>
            <RiMapPinFill className={styles.FaIcon} />
            <span>Jalanin Aja Dulu, Nyaman Kemudian, mwuhehe.</span>
          </div>
          {/** 
           *
          <div className={styles.address}>
            <FaPhone className={styles.FaIcon} />
            <span>+62 1 23 45 67 89 Mineral-Town, 9h-18h</span>
          </div>
            */}
          <div className={styles.address}>
            <FaEnvelope className={styles.FaIcon} />
            <span>
              mrez@mrizkies.web.id
              <br />
              support@mrizkies.web.id
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
