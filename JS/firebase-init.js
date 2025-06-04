
// Firebase configuration for CryptoNest
const firebaseConfig = {
  apiKey: "AIzaSyDlBLX0WhoRBmYzwqikkY8XKMoT8sb9HgM",
  authDomain: "cryptoinvestment-95d81.firebaseapp.com",
  projectId: "cryptoinvestment-95d81",
  storageBucket: "cryptoinvestment-95d81.firebasestorage.app",
  messagingSenderId: "883375399892",
  appId: "1:883375399892:web:5dd60f6c7fb06893ecac41",
  measurementId: "G-8P63M7QSQ3"
};

// Initialize Firebase using the compat API (global firebase object)
firebase.initializeApp(firebaseConfig);
// Optional: firebase.analytics();

// Initialize Firestore
window.db = firebase.firestore();