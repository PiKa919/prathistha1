import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

    apiKey: "AIzaSyBIeLlEhpodf_4hX1DuhXsbkK7iPOdPCPM",
  
    authDomain: "pratishtha-web-app.firebaseapp.com",
  
    databaseURL: "https://pratishtha-web-app-default-rtdb.asia-southeast1.firebasedatabase.app",
  
    projectId: "pratishtha-web-app",
  
    storageBucket: "pratishtha-web-app.appspot.com",
  
    messagingSenderId: "109707824816",
  
    appId: "1:109707824816:web:64794cfb441da8eb8f3575",
  
    measurementId: "G-SEJBL2JSSN"
  
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and Firestore
export const database = getDatabase(app);
export const firestore = getFirestore(app);

