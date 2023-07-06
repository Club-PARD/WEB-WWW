import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Auth 연결
import { getFirestore } from "firebase/firestore"; // Database 연결
import { getStorage } from "firebase/storage"; // Storage 연결
import "firebase/database"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcw8n9N8_TBoBlBD83DfX1QgwrEkI_mTA",
  authDomain: "web-9d7e6.firebaseapp.com",
  projectId: "web-9d7e6",
  storageBucket: "web-9d7e6.appspot.com",
  messagingSenderId: "355933983529",
  appId: "1:355933983529:web:774e9627b5efddf0f99d38",
  measurementId: "G-8LBTN9L7QK"
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