const express = require('express')
const router = express.Router()
const {index, register, login, createUser, profile, profileInfo, signOut} = require('../config/router')
const {auth, db} = require('../config/FBconfig')
const decodeIDToken = require('../config/auth')

router.use((req,res,next)=>{ 
    next()
})

router.get('/', index)   
router.get('/register', register)
router.get('/login', login)
router.post('/register', createUser)
router.get('/profile', decodeIDToken, profile)
router.post('/profile/save', decodeIDToken, profileInfo)
router.get('/signout', signOut)
module.exports = router