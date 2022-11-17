import firebase from "firebase";
import 'firebase/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDtCaDqGTsHg4VB0XhJPSd64OUO-OiRpjo",
    authDomain: "crud-web1-ab3c7.firebaseapp.com",
    projectId: "crud-web1-ab3c7",
    storageBucket: "crud-web1-ab3c7.appspot.com",
    messagingSenderId: "873876112366",
    appId: "1:873876112366:web:8c8fee338ec16eb483c4ff",
    measurementId: "G-BYQ8N7XXDL"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export {firebase}