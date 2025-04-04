import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
//import { getFirestore } from "firebase/firestore"
import { getDatabase } from "firebase/database";


//Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCBo06Nuao9Cm6LY-5DrBaYslukCxvPxic",
    authDomain: "bookscout-904ac.firebaseapp.com",
    databaseURL: "https://bookscout-904ac-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "bookscout-904ac",
    storageBucket: "bookscout-904ac.firebasestorage.app",
    messagingSenderId: "480730788675",
    appId: "1:480730788675:web:6328f24477c20a656df5f6"
};

  //Initializa firebase
const app = initializeApp(firebaseConfig);

export const FIREBASE_APP = app;
export const FIREBASE_AUTH = getAuth(app);
//export const FIREBASE_DB = getFirestore(app);
export const REALTIME_DB = getDatabase(app);