import { getFirestore } from "firebase/firestore"
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDjhYK0bX0v8mj8NcnMgkh9seRyJDph2JI",
  authDomain: "fullstack-822ca.firebaseapp.com",
  projectId: "fullstack-822ca",
  storageBucket: "fullstack-822ca.firebasestorage.app",
  messagingSenderId: "229340354811",
  appId: "1:229340354811:web:86e041f0508e152be5b85e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
