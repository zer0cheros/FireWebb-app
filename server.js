const express = require('express')
const expressLayout = require('express-ejs-layouts')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const server = express()
const indexRouter = require('./controller/index')
const decodedIdToken = require('./config/auth')

//view engine 
server.set('view engine', 'ejs') 
server.set('layout', 'layouts/layout')
server.use(expressLayout)
server.use(cookieParser())
server.use(express.urlencoded({extended:true}))
server.use(express.json())
server.use(express.static('public'))
//server.use(decodedIdToken)
server.use('/', indexRouter)






server.listen(process.env.PORT, ()=>{
    console.log('Connected');
})

