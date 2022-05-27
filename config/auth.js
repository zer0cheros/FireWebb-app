const {auth} = require('./FBconfig')
const {getAuth} = require('firebase/auth')
const fbauth = getAuth()

exports.decodeIDToken = async(req, res, next)=>{
    const header = await req.headers.cookie
if(header !== 'Authorization=Bearer%20null' && req.headers?.cookie?.startsWith('Authorization=Bearer%20')){
            const idToken = req.headers.cookie.split('Authorization=Bearer%20')[1]
            try {
                const decodedIdToken = await auth.verifyIdToken(idToken)
                req['currentUser'] = decodedIdToken
                console.log('ok');
                next()
            } catch (error) {
                console.log(error);
                res.redirect('login')
            }
            }else {
                console.log('no token');
                res.redirect('login')
            }
}
exports.adminDecodeIDToken = async(req, res, next)=>{
    const header = await req.headers.cookie
if(header !== 'Authorization=Bearer%20null' && req.headers?.cookie?.startsWith('Authorization=Bearer%20')){
            const idToken = req.headers.cookie.split('Authorization=Bearer%20')[1]
            try {
                const decodedIdToken = await auth.verifyIdToken(idToken)
                req['currentUser'] = decodedIdToken
                if(req.currentUser.admin){
                    console.log('admin');
                    next()
                }else {
                    console.log('not admin');
                    res.render('login', {
                        error: 'You don´t have the Admin privileges'
                    })
                } 
            } catch (error) {
                console.log(error);
                res.render('login', {
                    error: 'You don´t have the Admin privileges'
                })
            }
            }else {
                console.log('no token');
                res.redirect('/login')
            }
}

 