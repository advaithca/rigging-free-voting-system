// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCR9VpwgyxgSTBIHzsprbWMnA2QHF4Cpg",
  authDomain: "voting-system-10ebd.firebaseapp.com",
  projectId: "voting-system-10ebd",
  storageBucket: "voting-system-10ebd.appspot.com",
  messagingSenderId: "680272915638",
  appId: "1:680272915638:web:bfc36921112afcfff30a17"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app