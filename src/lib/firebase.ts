import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyD73vsaDzS-GZLdxbxhLFUnwKUydnI_F7Y",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "shopygo-7dbc6.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "shopygo-7dbc6",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "shopygo-7dbc6.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "622488295456",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:622488295456:web:969510902379e1129b4445",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-MT1876ZRBW"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

let auth: ReturnType<typeof getAuth>;
try {
  auth = typeof window !== "undefined" ? getAuth(app) : ({} as any);
} catch (error) {
  console.error("Erro ao inicializar Firebase Auth no LyonsGo:", error);
  auth = {} as any;
}

const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, googleProvider };
