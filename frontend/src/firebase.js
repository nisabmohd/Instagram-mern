import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCJRWgEM0Yp6gvzBo6vO1hSzCmz7x88dh8",
  authDomain: "instagram-4b51d.firebaseapp.com",
  projectId: "instagram-4b51d",
  storageBucket: "instagram-4b51d.appspot.com",
  messagingSenderId: "191152757312",
  appId: "1:191152757312:web:d3c2b7fc670866e6c05da5"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
export const db = getFirestore(app);