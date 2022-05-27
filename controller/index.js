const express = require('express')
const router = express.Router()
const {index, addAdmins, deleteUsers, register, admin, login, products, createUser, addProduct, updateProfilePicture, profile, profileInfo, signOut, loginUser} = require('../config/router')
const {decodeIDToken, adminDecodeIDToken} = require('../config/auth')
const {loginLimiter, registerLimiter} = require('../config/bruteForceLogin')



router.use('/profile', decodeIDToken)
router.use('/admin', adminDecodeIDToken)
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
router.get('/admin', admin)
router.post('/admin/delete/:uid', deleteUsers)
router.post('/admin/make/:uid', addAdmins)
router.get('/signout', signOut)
module.exports = router