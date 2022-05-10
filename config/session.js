require('dotenv').config()

const sessionConfig = {
    secret: process.env.SECRET,
    name: 'FireWebb-App',
    resave: false,
    saveUninitialized: false,
    cookie : {
      //sameSite: 'strict',
      httpOnly: true,
      maxAge: 1000*60*30
    }
}

module.exports = sessionConfig
  
