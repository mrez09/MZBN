// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  //apiKey: "AIzaSyCK6tNqHZXFOgr1idEw8XsU-2nU_sefi0Q",
  apiKey: process.env.FIREBASE,
  authDomain: "blog-bfc1c.firebaseapp.com",
  projectId: "blog-bfc1c",
  storageBucket: "blog-bfc1c.firebasestorage.app",
  messagingSenderId: "597740722189",
  appId: "1:597740722189:web:43eeaa12752cb7d3d4dd44",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
