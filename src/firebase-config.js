// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2kISWmvPuGA4zhnImgp94WpOQAroxp58",
  authDomain: "simple-dimple-auth-dc6f1.firebaseapp.com",
  projectId: "simple-dimple-auth-dc6f1",
  storageBucket: "simple-dimple-auth-dc6f1.firebasestorage.app",
  messagingSenderId: "782936225752",
  appId: "1:782936225752:web:14a8e90abe87d9cbdaa4ad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);