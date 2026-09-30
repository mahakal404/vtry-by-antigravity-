import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDXbe34td5TMoDQVs_jJQvpT6itvQZan7c",
  authDomain: "v-try-webapp.firebaseapp.com",
  projectId: "v-try-webapp",
  storageBucket: "v-try-webapp.firebasestorage.app",
  messagingSenderId: "1000654603337",
  appId: "1:1000654603337:web:76a5c96ac68dfdde8beb98"
};

// Initialize Firebase safely for Next.js App Router (prevents "app already exists" error during fast refresh)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
