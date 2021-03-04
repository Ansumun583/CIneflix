import firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgOeuSQBxObSkgiiVDYUYpuU2OP1919_w",
  authDomain: "cineflix-ee1ac.firebaseapp.com",
  projectId: "cineflix-ee1ac",
  storageBucket: "cineflix-ee1ac.appspot.com",
  messagingSenderId: "812373473973",
  appId: "1:812373473973:web:93b69a5f3de170f5015cfc",
  measurementId: "G-M0VT5CZ8VW"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db =firebaseApp.firestore();
  const auth = firebase.auth();

  export {auth}
  export default db;