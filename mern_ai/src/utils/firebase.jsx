// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIHExfgmfWkE_x0JiG5XqiJRgGES3uOM0",
  authDomain: "mernai-da2c3.firebaseapp.com",
  projectId: "mernai-da2c3",
  storageBucket: "mernai-da2c3.firebasestorage.app",
  messagingSenderId: "289841628508",
  appId: "1:289841628508:web:a9177c168ab623e8f1ad99",
  measurementId: "G-TRLBHM3V82"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth, provider};