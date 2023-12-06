// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyDRG8b6vT-tU2K45lhsMgTLh1dAbrEZfu4",
  authDomain: "chat-application-847b6.firebaseapp.com",
  projectId: "chat-application-847b6",
  storageBucket: "chat-application-847b6.appspot.com",
  messagingSenderId: "19853259396",
  appId: "1:19853259396:web:5a29bd6182061110e248d1",
  measurementId: "G-6B845W25QB"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);