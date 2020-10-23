import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAopig9WWN35FvywL34ms6rprjkSbMd3Ts",
    authDomain: "boggle-react-app.firebaseapp.com",
    databaseURL: "https://boggle-react-app.firebaseio.com",
    projectId: "boggle-react-app",
    storageBucket: "boggle-react-app.appspot.com",
    messagingSenderId: "870691079546",
    appId: "1:870691079546:web:53a4813efc06a30ad502c3",
    measurementId: "G-QNX4Y65NDP"
  };

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const auth = firebase.auth();
export const firestore = firebase.firestore();