import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_API_KEY,
  authDomain: "shopnow-83669.firebaseapp.com",
  projectId: "shopnow-83669",
  storageBucket: "shopnow-83669.appspot.com",
  messagingSenderId: "143065122695",
  appId: "1:143065122695:web:459f7da62206c968e6b522"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const provider = new GoogleAuthProvider(); //signing in with google 

export default app;