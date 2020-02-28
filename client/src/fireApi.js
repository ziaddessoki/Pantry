import firebase from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBhhESbbxKj1B-E2U1-l8YUmq0rR3yKHys",
  authDomain: "recipe-app-auth-protection.firebaseapp.com",
  projectId: "recipe-app-auth-protection"
};

const firebaseApp = firebase.initializeApp(config);

export const fireAuth = firebaseApp.auth();