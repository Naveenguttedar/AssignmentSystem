import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore/lite";
const firebaseConfig = {
  apiKey: "AIzaSyB1K1gsiambLwCHPWmUewlmRmAXpO1-NFE",
  authDomain: "teacherstudentmanagement.firebaseapp.com",
  projectId: "teacherstudentmanagement",
  storageBucket: "teacherstudentmanagement.appspot.com",
  messagingSenderId: "709281968384",
  appId: "1:709281968384:web:c5ce02bf0850ec5c58c3e5",
  measurementId: "G-42ZGL8Y4XQ",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export { app, db };
