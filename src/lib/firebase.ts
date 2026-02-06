import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAa8Gl7R__BOyXr-_zsL6KIQGqHDYrMGNY",
  authDomain: "internshipshub-in.firebaseapp.com",
  projectId: "internshipshub-in",
  storageBucket: "internshipshub-in.firebasestorage.app",
  messagingSenderId: "751067799679",
  appId: "1:751067799679:web:1703510b95f656aaf89f4a",
  measurementId: "G-JKX5TTBJSQ"
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
