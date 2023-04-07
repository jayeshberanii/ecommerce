const { getAllUsers, getUser, deleteUser, editUser } = require('../controller/UserController')
const {Authorize, AdminAuthorize} = require('../utils/Authorize')

const route=require('express').Router()

route.get('/',AdminAuthorize,getAllUsers)
route.get('/:id',Authorize,getUser)
route.delete('/:id',Authorize,deleteUser)
route.put('/:id',Authorize,editUser)

module.exports=route