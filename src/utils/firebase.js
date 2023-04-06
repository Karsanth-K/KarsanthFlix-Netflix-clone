import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBjwYNbscVt3kL0ZjvNVgV3s_Syvo7QxoY",
  authDomain: "netflix-clone-d36f0.firebaseapp.com",
  projectId: "netflix-clone-d36f0",
  storageBucket: "netflix-clone-d36f0.appspot.com",
  messagingSenderId: "688301251204",
  appId: "1:688301251204:web:bc4fd2f65a61d0bd10c0d1",
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);