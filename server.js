const express = require('express')
const session = require('express-session')
const sessionConfig = require('./config/session')
const expressLayout = require('express-ejs-layouts')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const server = express()
const indexRouter = require('./controller/index')
const helmet = require('helmet')

//view engine 
server.set('view engine', 'ejs') 
server.set('layout', 'layouts/layout')
server.use(expressLayout)
server.use(cookieParser())
//server.use(helmet())
server.use(session(sessionConfig))
server.use(express.urlencoded({extended:true}))
server.use(express.json())
server.use(express.static('public'))
//server.use(decodedIdToken)
server.use('/', indexRouter)

if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1); // trust first proxy
    sessionConfig.cookie.secure = true; // serve secure cookies
}


server.listen(process.env.PORT, ()=>{
    console.log('Connected');
})

