import firebase from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyB5PX1_2Er4JynfZaay_j8fFkBoYOWYt84",
  authDomain: "pantry-2d944.firebaseapp.com",
  projectId: "pantry-2d944"
};

const firebaseApp = firebase.initializeApp(config);

export const fireAuth = firebaseApp.auth();
