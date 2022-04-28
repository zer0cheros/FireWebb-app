const {auth, db} = require('./FBconfig')
const { signInWithEmailAndPassword, getAuth } = require('firebase/auth')
const firebase = require('firebase/app')
const config = require('./config')
const dbRef = db.ref('info')
firebase.initializeApp(config)
const loginLimiter = require('./bruteForceLogin')



exports.index = (req, res)=>{
    res.render('index')
}
exports.register = (req, res)=>{
    res.render('register')
}
exports.login = (req, res)=>{
    res.render('login')
}
exports.createUser = (req, res)=>{
    const {email, name, password} = req.body
    auth.createUser({
        displayName: name,
        email: email,
        password: password
    }).then((cred)=>{
        console.log(cred);
    }).catch((err)=>{
        console.log(err);
    })
    res.redirect('/login')
}
exports.loginUser = (req,res, next)=>{
    const {email, password}= req.body
    signInWithEmailAndPassword(getAuth(), email, password)
    .then((data)=>{
        return data.user.getIdToken()
    })
    .then((token)=>{
        res.cookie('Authorization', 'Bearer ' + token, { expires: 0, httpOnly: true, sameSite: 'strict'})
        next()
        res.redirect('/profile')
    }).catch((err)=>{
        console.log(err);
    })
}
exports.profile = (req, res)=>{
    const user = req.currentUser
    let userInfo;
    //load from database
    dbRef.on('value', (snap)=>{
        userInfo = snap.val()[user.uid]
        //render profile + info from database and userinfo from token
        res.render('profile', {
            info: user,
            userInfo: userInfo
        })
    })
    
    
    
}
exports.profileInfo = (req, res)=>{
    const info = req.body.info
    const user = req.currentUser
    //save to database
    dbRef.child(user.uid).set({
        info: info
    })
    res.redirect('/profile')
}
exports.signOut = (req, res)=>{
    res.cookie('Authorization', {maxAge: 0})
    res.redirect('/')
}