import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCw0CB4-YoZCjqJv-9wQfdUJzi3Uhe19QQ",
  authDomain: "pro100kexchange.firebaseapp.com",
  databaseURL: "https://pro100kexchange-default-rtdb.firebaseio.com",
  projectId: "pro100kexchange",
  storageBucket: "pro100kexchange.appspot.com",
  messagingSenderId: "595673630652",
  appId: "1:595673630652:web:b90198ebb7570c7e348db9",
  measurementId: "G-FGBJN788QT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}