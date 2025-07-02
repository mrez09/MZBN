"use client";
import React, { useState } from "react";
import styles from "./contact.module.css";
import { FaClock, FaMapLocation, FaPhone } from "react-icons/fa6";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", { name, email, message });
  };
  return (
    <div className={styles.container}>
      <div className={styles.contactInfo}>
        <h5>CONTACT</h5>
        <h1>Get in Touch</h1>
      </div>
      <div className={styles.wrapper}>
        {/* Kiri: Info Kontak */}
        <div className={styles.info}>
          <h2>Reach Out And Say Hello</h2>
          <p className={styles.description}>
            Get in Touch through any of the channels below. We're eager to hear
            from you!.
          </p>

          <div className={styles.detailGroup}>
            <div className={styles.detail}>
              <span>
                <FaMapLocation />
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
              <span>
                <FaPhone />
              </span>
              <div>
                <h4>Contact</h4>
                <p>+62 1 23 45 67 89 Mineral-Town, 9h-18h</p>
              </div>
            </div>

            <div className={styles.detail}>
              <span>
                <FaClock />
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
        <div className={styles.formContainer}>
          <h3 className={styles.ReadyToGo}>Ready to Get Started?</h3>
          <form className={styles.formRetro}>
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
    </div>
  );
};

export default ContactPage;
