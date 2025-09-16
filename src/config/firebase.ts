import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase configuration
// Replace these with your actual Firebase config values
const firebaseConfig = {
    apiKey: "AIzaSyCKA-KypQTucH01aTJ8WPiM7LYXTQcgL3c",
    authDomain: "pakasian-protein-nimko.firebaseapp.com",
    databaseURL: "https://pakasian-protein-nimko-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "pakasian-protein-nimko",
    storageBucket: "pakasian-protein-nimko.firebasestorage.app",
    messagingSenderId: "375303378562",
    appId: "1:375303378562:web:ea7acf7483b2af10cd869b",
    measurementId: "G-6EZ1B4KWY1"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
