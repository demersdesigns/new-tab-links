import firebase from 'firebase'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyC-O1NS5ZiPXXFns92BKkwbkcUqoMG0EHs",
  authDomain: "new-tab-links.firebaseapp.com",
  databaseURL: "https://new-tab-links.firebaseio.com",
  projectId: "new-tab-links",
  storageBucket: "new-tab-links.appspot.com",
  messagingSenderId: "394726225043"
};

firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;