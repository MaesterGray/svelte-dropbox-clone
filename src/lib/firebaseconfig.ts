import { getApp,getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5HudCnlzPFwMZ_BG4eptrPfBq2yKb2ZU",
  authDomain: "dropboxclone-7055e.firebaseapp.com",
  projectId: "dropboxclone-7055e",
  storageBucket: "dropboxclone-7055e.appspot.com",
  messagingSenderId: "707371486592",
  appId: "1:707371486592:web:a34f512c28cd89e69a0565"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig); 
const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage(app)

export {auth,db,storage}