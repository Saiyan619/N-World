import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import {getStorage} from 'firebase/storage'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAb3n94VDntK6bdSGEKvRUyWrk0tGoVC2M",
  authDomain: "n-world-cba49.firebaseapp.com",
  projectId: "n-world-cba49",
  storageBucket: "n-world-cba49.appspot.com",
  messagingSenderId: "518491205376",
  appId: "1:518491205376:web:31f51a6d37649f4c9e8de5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();/* FOR GOOGLE AUTH */
export const db = getFirestore(app);
export const storage = getStorage(app);
