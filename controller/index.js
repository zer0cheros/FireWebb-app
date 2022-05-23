const express = require('express')
const router = express.Router()
const {index, register, admin, login, products, createUser, addProduct, updateProfilePicture, profile, profileInfo, signOut, loginUser} = require('../config/router')
const decodeIDToken = require('../config/auth')
const {loginLimiter, registerLimiter} = require('../config/bruteForceLogin')



router.use('/profile', decodeIDToken)
router.use('/admin',decodeIDToken, admin)
router.get('/', index)   
router.get('/register', register)
router.get('/login', login)
router.post('/login', loginLimiter , loginUser)
router.post('/register', registerLimiter, createUser)
router.get('/profile',  profile)
router.get('/products',  products)
router.post('/profile/save', profileInfo)
router.post('/profile/update', updateProfilePicture)
router.post('/profile/addProducts', addProduct)
router.get('/signout', signOut)
module.exports = router