// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCobZJbD2r3Qbr7ArXU8MwWVOPzENhyf2Y",
    authDomain: "vuejs2023-9d348.firebaseapp.com",
    projectId: "vuejs2023-9d348",
    storageBucket: "vuejs2023-9d348.appspot.com",
    messagingSenderId: "280310102954",
    appId: "1:280310102954:web:8eba158bf7bd7330d309d3",
    measurementId: "G-8LT6VV056W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore();