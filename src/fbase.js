import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Auth 연결
import { getFirestore } from "firebase/firestore"; // Database 연결
import { getStorage } from "firebase/storage"; // Storage 연결
import "firebase/database"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCmHFFXzmWNKN477wYKePpNOgoFVfgD9OQ",
//   authDomain: "fir-2-bc3cb.firebaseapp.com",
//   projectId: "fir-2-bc3cb",
//   storageBucket: "fir-2-bc3cb.appspot.com",
//   messagingSenderId: "610342771096",
//   appId: "1:610342771096:web:44871d1972fb0bad96b3ed",
//   measurementId: "G-ZM398EKKN6"
// };
const firebaseConfig = {
  apiKey: "AIzaSyALzl_8vAAW1D9-aC9dN0P2jn7i0Dt-S5s",
  authDomain: "shimple-6b8b2.firebaseapp.com",
  projectId: "shimple-6b8b2",
  storageBucket: "shimple-6b8b2.appspot.com",
  messagingSenderId: "343633007627",
  appId: "1:343633007627:web:2f04d92da6b9cc5f7f230e",
  measurementId: "G-G47RD6GY5D"
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