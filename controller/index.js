const express = require('express')
const router = express.Router()
const {index} = require('../config/router')

router.get('/', index)

module.exports = router