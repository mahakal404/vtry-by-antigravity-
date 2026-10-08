import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// 1. Firebase Configuration (Keys directly coming from .env.local safely)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// God Developer Debugger: Console me check karne ke liye ki Key aa rahi hai ya nahi
console.log("Firebase API Key Debugger:", firebaseConfig.apiKey ? "✅ MILA GAYA!" : "❌ UNDEFINED (Missing!)");

// 2. Initialize Firebase safely for Next.js App Router 
// (Prevents "app already exists" error when page reloads)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// 3. Export all Firebase services to use in our V-Try app
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);