"use state";
import React, { useContext, useRef, useState } from "react";
import styles from "./contact.module.css";
import { FaClock, FaMapLocation, FaPhone } from "react-icons/fa6";
import { ThemeContext } from "@/context/ThemeContext";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
export const dynamic = "force-dynamic";

const Contact = () => {
  const { toggle, theme } = useContext(ThemeContext);
  const form = useRef();
  const [isSent, setIsSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_c5yvgxh", //Your EmailJS Service ID
        "template_a3awzco", //Your EmailJS Template ID

        form.current,
        "WP9aiC8A8ISlfHtE5"
      )
      .then(
        () => {
          setIsSent(true);
          form.current.reset(); // Reset form fields after sending
          toast.success(
            "Message sent successfully! ✅ Please wait for our feedback. Thank you.",
            {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "dark",
            }
          );
        },
        (error) => {
          console.error("Error sending message:", error);
          toast.error("Failed to send message. Please try again.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });
        }
      );
  };
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
        {/* Toast Container */}
        <ToastContainer />
        <form
          ref={form}
          onSubmit={sendEmail}
          className={`${styles.formRetro} ${
            theme === "dark" ? styles.RetroDark : styles.RetroLight
          }`}
        >
          <h2>Connect With Me</h2>

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

          <label htmlFor="email">What&apos;s your purpose?</label>
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
