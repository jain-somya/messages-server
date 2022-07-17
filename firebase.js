// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, collection } from "firebase/firestore";
//import { collection, getDocs } from "firebase/firestore";

//import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyBTMAbijRV8EBOx73AgQwEPsJdOppo2h0I",
  authDomain: "messages-app-3ab64.firebaseapp.com",
  projectId: "messages-app-3ab64",
  storageBucket: "messages-app-3ab64.appspot.com",
  messagingSenderId: "195550057094",
  appId: "1:195550057094:web:7533227c9b68138f0db707",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const Contacts = collection(db, "Contacts");
const Messages = collection(db, "Messages");
export default { Messages, Contacts };
