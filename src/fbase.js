import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Auth 연결
import { getFirestore } from "firebase/firestore"; // Database 연결
import { getStorage } from "firebase/storage"; // Storage 연결
import "firebase/database"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuJdRecJVFByhmcXA6SjrjQ563FuemQNA",
  authDomain: "shim-c117d.firebaseapp.com",
  projectId: "shim-c117d",
  storageBucket: "shim-c117d.appspot.com",
  messagingSenderId: "684181242711",
  appId: "1:684181242711:web:8a63e6c3594ac31e173412",
  measurementId: "G-F9DY1T9Y35"
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