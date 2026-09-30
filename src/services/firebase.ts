import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDemoKeyOilIndiaNWIS2026Secure001",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "oil-india-ertmac-nwis.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "oil-india-ertmac-nwis",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "oil-india-ertmac-nwis.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "928374651029",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:928374651029:web:a1b2c3d4e5f67890abcdef"
};

// Initialize Firebase safely
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const isFirebaseConfigured = (): boolean => {
  const key = import.meta.env.VITE_FIREBASE_API_KEY;
  return Boolean(key && !key.includes('DemoKey'));
};

export const getFirebaseProjectInfo = () => ({
  projectId: firebaseConfig.projectId,
  authDomain: firebaseConfig.authDomain,
  isLive: isFirebaseConfigured()
});
