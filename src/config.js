import firebase from 'firebase'
var firebaseConfig = {
  apiKey: "AIzaSyB12HK3OWg8WnelP67CVJfIQRCUHtHTsIo",
  authDomain: "citihackathon2021.firebaseapp.com",
  projectId: "citihackathon2021",
  storageBucket: "citihackathon2021.appspot.com",
  messagingSenderId: "672053069671",
  appId: "1:672053069671:web:c479a8553dc752209051c2",
  measurementId: "G-T25QY5E5F1"
};
  
const firebaseApp=firebase.initializeApp(firebaseConfig);
const db=firebase.firestore();

export default db;