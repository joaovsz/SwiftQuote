// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0SJBhYKYbqThEm8an2SL7TYnwV-J8Jc0",
  authDomain: "swiftquote-fcc03.firebaseapp.com",
  projectId: "swiftquote-fcc03",
  storageBucket: "swiftquote-fcc03.appspot.com",
  messagingSenderId: "772633274090",
  appId: "1:772633274090:web:1e4dcc3e6315c2e9fa1993",
};

// Initialize Firebase
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);

export { db, app };
