const { userRegister, userLogin } = require('../controller/AuthController')

const route=require('express').Router()

route.post('/register',userRegister)  //Register User
route.post('/login',userLogin)  //Login User

module.exports=route