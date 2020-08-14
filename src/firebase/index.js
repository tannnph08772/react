import firebase from 'firebase/app';
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDaoUFzCGnq4FuQKG3Z-9MNlGM4s8zLsuM",
  authDomain: "react-filebase-f2e1f.firebaseapp.com",
  databaseURL: "https://react-filebase-f2e1f.firebaseio.com",
  projectId: "react-filebase-f2e1f",
  storageBucket: "react-filebase-f2e1f.appspot.com",
  messagingSenderId: "357919627865",
  appId: "1:357919627865:web:d59d64aa779afada762f48",
  measurementId: "G-GD3J1TBHLC"
};
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {
    storage, firebase as default
}