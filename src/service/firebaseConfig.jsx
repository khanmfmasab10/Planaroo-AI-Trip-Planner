// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfSKekySa30-xcXER_rNyJJdp_cEybjlI",
  authDomain: "planaroo-b8bb8.firebaseapp.com",
  projectId: "planaroo-b8bb8",
  storageBucket: "planaroo-b8bb8.firebasestorage.app",
  messagingSenderId: "815811355363",
  appId: "1:815811355363:web:aefd8f91ff4fafadaadbd6",
  measurementId: "G-EZ38LYGTRX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
//const analytics = getAnalytics(app);