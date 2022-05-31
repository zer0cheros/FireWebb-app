import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getStorage, uploadBytes, getDownloadURL, ref } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyB5Cc7Xu86DBJhXfbYdY_CxctK7r30lyFk",
  authDomain: "firewebb-app.firebaseapp.com",
  databaseURL: "https://firewebb-app-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "firewebb-app",
  storageBucket: "firewebb-app.appspot.com",
  messagingSenderId: "178945067357",
  appId: "1:178945067357:web:16962261e3b7feb08300b4"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()


// html elements
const cart = document.getElementById('cart')
const cartBtn = document.getElementById('cartBtn')
const exampleModal = document.getElementById('exampleModal')
const closeModal = document.getElementById('close')
let modalBody = document.querySelector('.modal-body')
let cartAmount = JSON.parse(localStorage.cart)
console.log(cartAmount);
cart.innerHTML = cartAmount.length
cartBtn.addEventListener('click',(e)=>{
  e.preventDefault()
  exampleModal.style.display = 'block'
})
cartAmount.forEach(item=>{
  const div = document.createElement('div')
    div.innerHTML = `<h1>${item.product_name}</h1><br><img style="max-width: 80px; "src="${item.product_img}">`
    modalBody.appendChild(div)
})
closeModal.addEventListener('click',(e)=>{
  e.preventDefault()
  exampleModal.style.display = 'none'
})

/*
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
*/


