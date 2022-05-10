import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
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
const db = getFirestore()
const storage = getStorage()
const updateProfilePicture = ref(storage, `ProfilePicture`)

onAuthStateChanged(auth, (user)=>{
  console.log(user);
})
// html elements
function signOutFB(){
  signOut(auth).then((e)=>{console.log(e);})
}
const uploadPictureForm = document.getElementById('profilePic')
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
  uploadPictureForm.addEventListener('submit', (e)=>{
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


