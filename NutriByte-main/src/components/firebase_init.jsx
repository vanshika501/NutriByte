
import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCu8kaD1TTMxAntdvGeiLPibPtJiVOth6U",
  authDomain: "tanishq-final-fee.firebaseapp.com",
  databaseURL: "https://tanishq-final-fee-default-rtdb.firebaseio.com",
  projectId: "tanishq-final-fee",
  storageBucket: "tanishq-final-fee.appspot.com",
  messagingSenderId: "1001244988298",
  appId: "1:1001244988298:web:729b1bb97d858dc07a6e73"
};

// Initialize Firebase
export const FirebaseApplication = initializeApp(firebaseConfig);
export const FirebaseDatabase = getDatabase(FirebaseApplication);
