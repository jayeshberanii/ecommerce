const { userRegister, userLogin, handleRefresh } = require('../controller/AuthController')

const route=require('express').Router()

route.post('/register',userRegister)  //Register User
route.post('/login',userLogin)  //Login User
route.get('/refresh',handleRefresh)  //Handle Refresh

module.exports=route