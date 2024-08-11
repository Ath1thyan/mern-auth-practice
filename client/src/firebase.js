// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-practice-40692.firebaseapp.com",
  projectId: "mern-auth-practice-40692",
  storageBucket: "mern-auth-practice-40692.appspot.com",
  messagingSenderId: "31891281374",
  appId: "1:31891281374:web:06d001f962ac07cf62394f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);