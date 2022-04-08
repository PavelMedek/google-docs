import firebase from "firebase";


const firebaseConfig = {
    apiKey: "AIzaSyALZfpkszi3B8vqBTBzKB_OJ5a-5tnQ4IU",
    authDomain: "docs-76f2d.firebaseapp.com",
    projectId: "docs-76f2d",
    storageBucket: "docs-76f2d.appspot.com",
    messagingSenderId: "458229817190",
    appId: "1:458229817190:web:9f92447f3fa4a0202a32a7"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();

export { db}