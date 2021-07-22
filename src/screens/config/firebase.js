import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBNm1hJGXlRi3AzRSFTkvvzt0xFTLNntMk",
  authDomain: "reactjspractice-5e32f.firebaseapp.com",
  projectId: "reactjspractice-5e32f",
  storageBucket: "reactjspractice-5e32f.appspot.com",
  messagingSenderId: "887362108475",
  appId: "1:887362108475:web:9bb166eb9422fd3b05301e",
};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
export { firebase, db };

//   // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// var db = firebase.firestore();

// export default db;
