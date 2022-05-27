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
const storage = getStorage()
const updateProfilePicture = ref(storage, `profilePic`)
const addProducts = ref(storage, `products`)

const uploadPictureForm = document.getElementById('uploadBtn')
const uploadProducts = document.getElementById('uploadProductFile')
const addProductFrom = document.getElementById('addProductFrom')
console.log(uploadPictureForm);
document.getElementById('uploadFile').addEventListener('change', (e)=>{
  let profileUrl;
  e.preventDefault()
  let files = e.target.files[0]
  uploadBytes(ref(updateProfilePicture, files.name), files).then((data)=>{
      console.log('uploaded to storage +' + files.name);
  getDownloadURL(ref(updateProfilePicture, files.name))
  .then((url)=>{
    profileUrl = url
    console.log(profileUrl);
    })
  })
  uploadPictureForm.addEventListener('click', (e)=>{
    e.preventDefault()
    fetch('/profile/update', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({profileUrl})
    }).then(res=>res.json())
    window.location.href = '/profile'
  })
})

uploadProducts.addEventListener('change', (e)=>{
    let productUrl;
    e.preventDefault()
    let files = e.target.files[0]
    uploadBytes(ref(addProducts, files.name), files).then((data)=>{
        console.log('uploaded to storage +' + files.name);
    getDownloadURL(ref(addProducts, files.name))
    .then((url)=>{
      productUrl = url
      })
    })
    addProductFrom.addEventListener('submit', (e)=>{
      e.preventDefault()
      let amout = e.target.amout.value 
      let product = e.target.product.value 
      fetch('/profile/addProducts', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({productUrl, product, amout})
      }).then(res=>res.json())
      window.location.href = '/profile'
    })
  })