import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBst22DQe_OzeF9ahd0hbnlvM7u0yUidG0",
  authDomain: "monster-slayer-8f17f.firebaseapp.com",
  projectId: "monster-slayer-8f17f",
  storageBucket: "monster-slayer-8f17f.appspot.com",
  messagingSenderId: "1020366263689",
  appId: "1:1020366263689:web:c5c5bf7c20183c0d467d58",
  measurementId: "G-2M96P9T1FD",
};

const app = firebase.initializeApp(firebaseConfig);

export default app.firestore();
