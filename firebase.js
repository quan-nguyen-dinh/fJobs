import firebase from "firebase/compat/app";
import "firebase/compat/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBkuF_wkwI2xQNfZUYtVzymxuFgV6eEwS4",
  authDomain: "qqtalk-c1fad.firebaseapp.com",
  projectId: "qqtalk-c1fad",
  storageBucket: "qqtalk-c1fad.appspot.com",
  messagingSenderId: "725384180255",
  appId: "1:725384180255:web:42add1c7b0dc7d2faadb2a",
  measurementId: "G-DG00VB04YL"
}
// Initialize Firebase
if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}


export {firebase};