import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyByiuOUNRpaUFC1bORHFQx0fLpmUohfw4o",
  authDomain: "mern-blog-67c84.firebaseapp.com",
  projectId: "mern-blog-67c84",
  storageBucket: "mern-blog-67c84.appspot.com",
  messagingSenderId: "696173328423",
  appId: "1:696173328423:web:8146f56e5ca378d7f5f602"
};

export const app = initializeApp(firebaseConfig);