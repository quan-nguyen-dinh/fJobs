import firebase from "firebase/compat/app";
import "firebase/compat/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBUE9s3pBsx_w6o2HhsVjpTxEWuPdSbNq4",
  authDomain: "pandain-6a49b.firebaseapp.com",
  projectId: "pandain-6a49b",
  storageBucket: "pandain-6a49b.appspot.com",
  messagingSenderId: "86170109225",
  appId: "1:86170109225:web:eba33f23dc591002fc2338",
  measurementId: "G-3F4X3TRDK9"
};

// Initialize Firebase
if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}


export {firebase};