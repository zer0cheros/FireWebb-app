import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyB5Cc7Xu86DBJhXfbYdY_CxctK7r30lyFk",
  authDomain: "firewebb-app.firebaseapp.com",
  projectId: "firewebb-app",
  storageBucket: "firewebb-app.appspot.com",
  messagingSenderId: "178945067357",
  appId: "1:178945067357:web:16962261e3b7feb08300b4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()
const db = getFirestore()


// html elements

const loginForm = document.getElementById('loginForm')
// lots of code

loginForm.addEventListener('submit', (e)=>{
  e.preventDefault()
  signInWithEmailAndPassword(auth, e.target.email.value, e.target.password.value)
  .then((cred)=>{
    return cred.user.getIdToken()
  }).then((token)=>{
    document.cookie = `Bearer ${token}`
    window.location.href = '/profile'
  }) 
  .catch((err)=>{
    if(err)throw err
  })
  
})



