const {auth, db} = require('./FBconfig')
const { signInWithEmailAndPassword, getAuth, signOut } = require('firebase/auth')
const {getStorage, ref, uploadBytes} = require('firebase/storage')
const firebase = require('firebase/app')
const config = require('./config')
const dbRef = db.ref('info')
const dbProducts = db.ref('products')
firebase.initializeApp(config)
//const loginLimiter = require('./bruteForceLogin')




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
            userInfo: userInfo,
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
    signOut(getAuth()).then((e)=>{console.log(e);})
    res.redirect('/')
}
exports.updateProfilePicture = (req, res)=>{
    const uid = req.currentUser.uid
    auth.updateUser(uid, {
        photoURL: req.body.profileUrl
    }).then((user)=>{
        console.log(user);
    }).catch((err)=>{
        if(err) throw err
    }) 
}
exports.addProduct = (req, res)=>{
    const {productUrl, amout, product} = req.body
    const user = req.currentUser
    dbProducts.child(product).set({
        product: product,
        amout: amout,
        productUrl: productUrl,
        uid: user.uid
    })
}

exports.products = (req, res)=>{
    dbProducts.on('value', (snap)=>{
        console.log(snap.val());
        res.render('products', {
            info: snap.val()
        })

    })
}