import firebase from "firebase";
import "firebase/storage";

const config = {
    apiKey: "AIzaSyBgTYcSQ_iqylVCuaCtzkgulg_UgWxjAY4",
    authDomain: "rudainanativemobileapp.firebaseapp.com",
    databaseURL: "https://rudainanativemobileapp.firebaseio.com",
    projectId: "rudainanativemobileapp",
    storageBucket: "rudainanativemobileapp.appspot.com",
    messagingSenderId: "85488583410",
    appId: "1:85488583410:web:c984601c2ecc411aba466b",
    measurementId: "G-NFSY9DW113"
};

const app = firebase.initializeApp(config);
const storage = firebase.storage();

// export {base , app , storage}
export { app , storage , firebase as default}