import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyADsSZaf_1Ckg_-DBCL3fIKf-r6bgplk3M",
  authDomain: "testfb-de207.firebaseapp.com",
  projectId: "testfb-de207",
  storageBucket: "testfb-de207.appspot.com",
  messagingSenderId: "389787545008",
  appId: "1:389787545008:web:b8c8355199a53ba6f13a75",
  measurementId: "G-5GQFLGDJ9Q",
};

// Initialize Cloud Firestore and get a reference to the service

const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore through Firebase
const db = getFirestore(app);

export default db;
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
