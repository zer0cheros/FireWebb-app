const {auth, db} = require('./FBconfig')
const dbRef = db.ref('info')

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
exports.profile = (req, res)=>{
    const user = req.currentUser
    let userInfo;
    //load from database
    dbRef.on('value', (snap)=>{
        userInfo = snap.val()[user.uid]
    })
    console.log(userInfo);
    //render profile + info from database and userinfo from token
    res.render('profile', {
        info: user,
        userInfo: userInfo
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
    res.cookie(' ', {maxAge: 0})
    res.redirect('/')
}