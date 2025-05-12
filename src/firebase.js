// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKhDNoMrXidkBcEeeAOLNIwqkcYJpAB4A",
  authDomain: "sample-firebase-ai-app-8a80f.firebaseapp.com",
  projectId: "sample-firebase-ai-app-8a80f",
  storageBucket: "sample-firebase-ai-app-8a80f.firebasestorage.app",
  messagingSenderId: "325789189568",
  appId: "1:325789189568:web:5d9f388756bf38f035b425"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
