import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC_I2haLy3ywRsqoHLE0ue4AJOhaBNKtA4",
  authDomain: "daon-8065b.firebaseapp.com",
  projectId: "daon-8065b",
  storageBucket: "daon-8065b.appspot.com",
  messagingSenderId: "688896094418",
  appId: "1:688896094418:web:1af00a997bfa5abdf17d0b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

