import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAp6UwbBvcrZHejjKffwrj7Z_WN9Rupclo",
  authDomain: "n-world-v2.firebaseapp.com",
  projectId: "n-world-v2",
  storageBucket: "n-world-v2.appspot.com",
  messagingSenderId: "1098081281085",
  appId: "1:1098081281085:web:bd78581b2fe590234e7654"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAp6UwbBvcrZHejjKffwrj7Z_WN9Rupclo",
//   authDomain: "n-world-v2.firebaseapp.com",
//   projectId: "n-world-v2",
//   storageBucket: "n-world-v2.appspot.com",
//   messagingSenderId: "1098081281085",
//   appId: "1:1098081281085:web:bd78581b2fe590234e7654"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);