import firebase from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: ,
  authDomain: ,
  projectId: 
};

const firebaseApp = firebase.initializeApp(config);

export const fireAuth = firebaseApp.auth();