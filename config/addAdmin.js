const {auth} = require('./FBconfig')

uid  = 'touJQNWctvXhow8cY1dQ1PzNgdk1'

auth.setCustomUserClaims(uid, {admin: true}).then(()=>{
    console.log('created an new admin');
})