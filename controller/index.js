const express = require('express')
const router = express.Router()
const {index, register, login, createUser, profile, profileInfo, signOut, loginUser} = require('../config/router')
const decodeIDToken = require('../config/auth')
const {loginLimiter, registerLimiter} = require('../config/bruteForceLogin')

router.use('/profile', decodeIDToken)

router.get('/', index)   
router.get('/register', register)
router.get('/login', login)
router.post('/login', loginLimiter , loginUser)
router.post('/register', registerLimiter, createUser)
router.get('/profile',  profile)
router.post('/profile/save', profileInfo)
router.get('/signout', signOut)
module.exports = router