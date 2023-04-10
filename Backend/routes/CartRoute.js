const { addToCart, removeFromCart, clearCart, getCart } = require('../controller/CartController')
const { Authorize } = require('../utils/Authorize')

const route=require('express').Router()

route.post('/add-to-cart',Authorize,addToCart)
route.post('/remove-from-cart',Authorize,removeFromCart)
route.get('/',Authorize,getCart)
route.delete('/',Authorize,clearCart)

module.exports=route