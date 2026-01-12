// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBf-Mf2vhKq29MWa3HfJpu5awTqkNfI214",
  authDomain: "the-move-db.firebaseapp.com",
  projectId: "the-move-db",
  storageBucket: "the-move-db.firebasestorage.app",
  messagingSenderId: "963427711008",
  appId: "1:963427711008:web:35f5c69d9b3113e3f22445"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);