import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDcQNFdpeHTyvA-1oZ3m7crO33zcAmc-1w",
  authDomain: "chat-app-f961a.firebaseapp.com",
  projectId: "chat-app-f961a",
  storageBucket: "chat-app-f961a.appspot.com",
  messagingSenderId: "294413849912",
  appId: "1:294413849912:web:53b078d792e50bc38b5dcd",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
