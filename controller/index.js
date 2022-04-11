const express = require('express')
const router = express.Router()
const {index, register, login, createUser} = require('../config/router')
const {auth, db} = require('../config/FBconfig')

router.use('/', (req, res, next)=>{
    console.log('check')
    next()
})

router.get('/', index)
router.get('/register', register)
router.get('/login', login)
router.post('/register', createUser)
  
module.exports = router