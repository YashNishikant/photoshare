
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth, GoogleAuthProvider, ProviderId} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAWA48tb7yp1r_FHJy9yZcWTme3do7hc-M",
  authDomain: "projectshare-987f3.firebaseapp.com",
  projectId: "projectshare-987f3",
  storageBucket: "projectshare-987f3.appspot.com",
  messagingSenderId: "732936359980",
  appId: "1:732936359980:web:2d4ff0982679801adb8189"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();