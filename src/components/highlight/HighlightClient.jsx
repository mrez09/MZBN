"use client";
import { useEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css"; // atau one-dark, vs, atom-one-dark, dll

const HighlightClient = () => {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return null;
};

export default HighlightClient;
