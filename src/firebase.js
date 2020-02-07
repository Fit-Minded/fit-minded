import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyB3cZDm0W1a3qoSRpO_lQ3ZCMIoNJ-sOCA',
  authDomain: 'fit-minded.firebaseapp.com',
  databaseURL: 'https://fit-minded.firebaseio.com',
  projectId: 'fit-minded',
  storageBucket: 'fit-minded.appspot.com',
  messagingSenderId: '775497203384',
  appId: '1:775497203384:web:12ae514b24683b0e07fe4d'
};

firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
export const singInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();
export default firebase;
