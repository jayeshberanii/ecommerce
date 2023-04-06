const { getAllUsers } = require('../controller/UserController')
const Authorize = require('../utils/Authorize')

const route=require('express').Router()

route.get('/',Authorize,getAllUsers)

module.exports=route