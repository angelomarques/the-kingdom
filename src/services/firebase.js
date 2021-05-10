import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA3QBty-cnVfk6OgqqjMbI58_Eu8PG4pQY",
  authDomain: "the-productivity-app.firebaseapp.com",
  projectId: "the-productivity-app",
  storageBucket: "the-productivity-app.appspot.com",
  messagingSenderId: "630140392559",
  appId: "1:630140392559:web:b868e8a3305d53948da99a",
  measurementId: "G-2Z6FNEWJT1",
};

// Initialize Firebase
const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

// Firebase services
export const auth = app.auth();
export const db = firebase.firestore();
export const fs = firebase.firestore;

export default app;
