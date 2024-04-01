// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1aRy7pweWGkfE-ZBjOp8ICGQU7iY1c7w",
  authDomain: "user-email-password-489b1.firebaseapp.com",
  projectId: "user-email-password-489b1",
  storageBucket: "user-email-password-489b1.appspot.com",
  messagingSenderId: "766913935650",
  appId: "1:766913935650:web:3b06f0cb28973241f5cd7b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;