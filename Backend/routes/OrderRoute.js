const { placeOrder, cancelOrder, receiveOrder, getOrder, getAllOrders } = require('../controller/OrderController')
const { Authorize, AdminAuthorize } = require('../utils/Authorize')

const route=require('express').Router()

route.post('/',Authorize,placeOrder) //place order
route.delete('/',Authorize,cancelOrder) //cancel order
route.put('/',AdminAuthorize,receiveOrder) //receive order
route.get('/one',Authorize,getOrder) //get own order
route.get('/all',AdminAuthorize,getAllOrders) //get all orders

module.exports=route