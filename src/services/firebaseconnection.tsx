
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCjQxJuBh3kWkkSjfc6B8hRTj-hnyZJG9k",
  authDomain: "meuslinks-fdd06.firebaseapp.com",
  projectId: "meuslinks-fdd06",
  storageBucket: "meuslinks-fdd06.appspot.com",
  messagingSenderId: "701019007335",
  appId: "1:701019007335:web:8b77230b8dc0bc6cdce7c2"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export {auth, firestore};