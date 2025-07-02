"use state";
import React, { useContext } from "react";
import styles from "./contact.module.css";
import { FaClock, FaMapLocation, FaPhone } from "react-icons/fa6";
import { ThemeContext } from "@/context/ThemeContext";

const Contact = () => {
  const { toggle, theme } = useContext(ThemeContext);
  return (
    <div className={styles.wrapper}>
      {/* Kiri: Info Kontak */}
      <div className={styles.info}>
        <h1>Reach Out And Say Hello</h1>
        <p className={styles.description}>
          Get in Touch through any of the channels below. I’d love to hear from
          you—reach out for any opportunities or questions!
        </p>

        <div className={styles.detailGroup}>
          <div className={styles.detail}>
            <span
              className={`${styles.contactIcons} ${
                theme === "dark" ? styles.dark : styles.light
              }`}
            >
              <FaMapLocation className={styles.FaContact} />
            </span>
            <div>
              <h4>Our Address</h4>
              <p>
                P.Sherman, 42 Wallaby Way, Sydney.
                <br />
              </p>
            </div>
          </div>

          <div className={styles.detail}>
            <span
              className={`${styles.contactIcons} ${
                theme === "dark" ? styles.dark : styles.light
              }`}
            >
              <FaPhone className={styles.FaContact} />
            </span>
            <div>
              <h4>Contact</h4>
              <p>+62 1 23 45 67 89 Mineral-Town, 9h-18h</p>
            </div>
          </div>

          <div className={styles.detail}>
            <span
              className={`${styles.contactIcons} ${
                theme === "dark" ? styles.dark : styles.light
              }`}
            >
              <FaClock className={styles.FaContact} />
            </span>
            <div>
              <h4>Working hours</h4>
              <p>
                Monday - Friday: 08:00 - 17:00
                <br />
                Saturday & Sunday: 08:00 - 12:00
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Kanan: Form */}
      <div
        className={styles.formContainer}
        style={
          theme === "dark"
            ? { backgroundColor: "white" }
            : { backgroundColor: "#1e293b" }
        }
      >
        <h3
          className={`${styles.ReadyToGo} ${
            theme === "dark" ? styles.TextDark : styles.TextLight
          }`}
        >
          Ready to Get Started?
        </h3>
        <form
          className={`${styles.formRetro} ${
            theme === "dark" ? styles.RetroDark : styles.RetroLight
          }`}
        >
          <h2
            className={theme === "dark" ? styles.RetroDark : styles.RetroLight}
          >
            Connect With Me
          </h2>

          <label htmlFor="name">Email</label>
          <input
            type="email"
            name="user_email"
            placeholder="Enter Your Email Before Start"
            required
            id="name"
          />

          <label htmlFor="surname">Nick Name</label>
          <input
            type="text"
            name="user_name"
            placeholder="Enter Your Name Before Start"
            required
            id="surname"
          />

          <label htmlFor="email">What's your purpose?</label>
          <input
            type="text"
            name="subject"
            placeholder="Explain Your Purpose"
            required
            id="email"
          />

          <label htmlFor="message">Break it down for me.</label>
          <textarea
            id="message"
            name="message"
            placeholder="Please provide more information"
            rows="4"
            required
          ></textarea>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
