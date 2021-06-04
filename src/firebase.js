import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDi4SDXgZ0kwdtsT0LHrP8f2ZIcE9oK2ag",
  authDomain: "monster-slayer-5d861.firebaseapp.com",
  projectId: "monster-slayer-5d861",
  storageBucket: "monster-slayer-5d861.appspot.com",
  messagingSenderId: "532855348128",
  appId: "1:532855348128:web:d3dcf8d4e580b7680f62c5",
  measurementId: "G-JX9PTY7C94",
};

const app = firebase.initializeApp(firebaseConfig);

export default app.firestore();
