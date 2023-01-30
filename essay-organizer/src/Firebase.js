// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkz5knFTQPgM_0aoEb0f1EP6Vy542leW4",
  authDomain: "essay-hub-375810.firebaseapp.com",
  projectId: "essay-hub-375810",
  storageBucket: "essay-hub-375810.appspot.com",
  messagingSenderId: "933680585770",
  appId: "1:933680585770:web:a278b055e07ba38b7eb753",
  measurementId: "G-JE7MVMNN75",
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);
// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);
