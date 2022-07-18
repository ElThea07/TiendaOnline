import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCZ5YXbS16ZG0Lg5HjxXxmgbWvtOafp_8k",
  authDomain: "tienda-digital-e6dc0.firebaseapp.com",
  projectId: "tienda-digital-e6dc0",
  storageBucket: "tienda-digital-e6dc0.appspot.com",
  messagingSenderId: "947311724064",
  appId: "1:947311724064:web:cfaa5171483d5320361e45",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const currentUserPromise = () =>
  new Promise((resolve, reject) => {
    onAuthStateChanged(
      auth,
      (user) => {
        resolve(user);
      },
      (e) => reject(e)
    );
  });

export { auth, currentUserPromise, db };
