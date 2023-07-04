import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Auth 연결
import { getFirestore } from "firebase/firestore"; // Database 연결
import { getStorage } from "firebase/storage"; // Storage 연결
import "firebase/database"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8mOgys_zTpUhAdqcaS9Zkcrcq-sSnYJg",
  authDomain: "shimple-f8b9d.firebaseapp.com",
  projectId: "shimple-f8b9d",
  storageBucket: "shimple-f8b9d.appspot.com",
  messagingSenderId: "1050577012644",
  appId: "1:1050577012644:web:b792ea81c24061f2d72331",
  measurementId: "G-BVLDKJGBRR"
};

//const firestore = getFirestore(firebase);
const app = initializeApp(firebaseConfig); // Firebase 초기화


//const auth = getAuth(app); // 유저 정보 관리
//const dbService = getFirestore(app); // DB 관리 
//const storage = getStorage(app); // 파일이나 사진 등 텍스트가 아닌 내용 저장  

//export { app, auth, dbService, storage };
export const firebaseInstance= firebaseConfig;
export const authService= getAuth(app);
export const dbService= getFirestore();
export const StorageService= getStorage();