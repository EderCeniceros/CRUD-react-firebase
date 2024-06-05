import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpJUhPL-LsvfrQQG0P4UeKq0gQf4F-QTY",
  authDomain: "carritoej24pw-4ae45.firebaseapp.com",
  projectId: "carritoej24pw-4ae45",
  storageBucket: "carritoej24pw-4ae45.appspot.com",
  messagingSenderId: "820150958777",
  appId: "1:820150958777:web:885ccaeed4f1a65c74f968",
  measurementId: "G-06NRKG9GB5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);