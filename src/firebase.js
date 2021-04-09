import firebase from "firebase/app";
import "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA7xjDM3Mdj1r2De8CVwrbRnr4o3gV0Kb4",
    authDomain: "react-todolist-78468.firebaseapp.com",
    databaseURL: "https://react-todolist-78468-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "react-todolist-78468",
    storageBucket: "react-todolist-78468.appspot.com",
    messagingSenderId: "895051756377",
    appId: "1:895051756377:web:154073ad91197410e71248",
    measurementId: "G-4PHKF7WVZM"
};

//Initialize firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}


export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();