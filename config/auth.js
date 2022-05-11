const {auth} = require('./FBconfig')
const {getAuth} = require('firebase/auth')
const fbauth = getAuth()

const decodeIDToken = async(req, res, next)=>{
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
                res.render('login')
            }
            }else {
                console.log('no token');
                res.render('login')
            }
}

module.exports = decodeIDToken
 