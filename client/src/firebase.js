// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "washwheels-de6e4.firebaseapp.com",
  projectId: "washwheels-de6e4",
  storageBucket: "washwheels-de6e4.appspot.com",
  messagingSenderId: "315953046538",
  appId: "1:315953046538:web:94f60eb159342e7141ebf3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);