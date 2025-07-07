"use client";
import React, { useState } from "react";
import styles from "./contact.module.css";
import { FaClock, FaMapLocation, FaPhone } from "react-icons/fa6";
import Contact from "@/components/contact/Contact";
export const dynamic = "force-dynamic";

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
      <Contact />
    </div>
  );
};

export default ContactPage;
