const {auth} = require('./FBconfig')

const decodeIDToken = async(req, res, next)=>{
    const header = await req.headers.cookie
if(header !== 'Bearer null' && req.headers?.cookie?.startsWith('Bearer ')){
            const idToken = req.headers.cookie.split('Bearer ')[1]
            try {
                const decodedIdToken = await auth.verifyIdToken(idToken)
                req.currentUser = decodedIdToken
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
 