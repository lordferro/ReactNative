import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB53DDU3m59YA3mPto08UcwCqHLQ7mNhf0",
  authDomain: "rn-social-966af.firebaseapp.com",
  projectId: "rn-social-966af",
  storageBucket: "rn-social-966af.appspot.com",
  messagingSenderId: "699054116705",
  appId: "1:699054116705:web:0f7d4a67f875a6c354ff20",
  measurementId: "G-5Z2HTFSL53",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
