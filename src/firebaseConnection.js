import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAphcuZVcW7vyhGA8g1x6X-vAuae8cM-FU",
  authDomain: "curso-5944b.firebaseapp.com",
  projectId: "curso-5944b",
  storageBucket: "curso-5944b.appspot.com",
  messagingSenderId: "94422811794",
  appId: "1:94422811794:web:6ef2853b2387e4865e524b",
  measurementId: "G-RSF4XJ4R0C",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };
