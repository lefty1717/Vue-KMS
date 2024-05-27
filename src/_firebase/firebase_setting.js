// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhWxxJcA4ix8aQYKPNJdtE99RriAWjuFs",
  authDomain: "kkms-c0f35.firebaseapp.com",
  projectId: "kkms-c0f35",
  storageBucket: "kkms-c0f35.appspot.com",
  messagingSenderId: "47126188589",
  appId: "1:47126188589:web:860efe3106e6bf870a1ea4"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore();